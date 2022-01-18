import { Component } from '@angular/core';
import {
	I3JS, IRendererTimer, NgxBaseComponent, NgxControlComponent, NgxMeshComponent, NgxRendererComponent, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-shadowmap-progressive',
	templateUrl: './webgl-shadowmap-progressive.component.html',
	styleUrls: ['./webgl-shadowmap-progressive.component.scss'],
})
export class WebglShadowmapProgressiveComponent extends NgxBaseComponent<{
	enable: boolean;
	blurEdges: boolean;
	blendWindow: number;
	lightRadius: number;
	ambientWeight: number;
	debugLightmap: boolean;
}> {
	constructor() {
		super(
			{
				enable: true,
				blurEdges: true,
				blendWindow: 200,
				lightRadius: 50,
				ambientWeight: 0.5,
				debugLightmap: false,
			},
			[
				{ name: 'enable', title: 'Enable', type: 'checkbox' },
				{ name: 'blurEdges', title: 'Blur Edges', type: 'checkbox' },
				{
					name: 'blendWindow',
					title: 'Blend Window',
					type: 'number',
					min: 1,
					max: 500,
					step: 1,
				},
				{
					name: 'lightRadius',
					title: 'Light Radius',
					type: 'number',
					min: 0,
					max: 200,
					step: 10,
				},
				{
					name: 'ambientWeight',
					title: 'Ambient Weight',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.1,
				},
				{ name: 'enable', title: 'Debug Lightmap', type: 'checkbox' },
			],
			false,
			false
		);
	}

	ngOnInit() {
	}

	dirLights: I3JS.DirectionalLight[] = [];

	setLightOrigin(mesh: NgxMeshComponent) {
		this.lightOrigin = mesh.getObject3d();
	}

	private lightOrigin: I3JS.Object3D = null;

	setLightTarget(mesh: NgxMeshComponent) {
		this.lightTarget = mesh.getObject3d();
	}

	private lightTarget: I3JS.Object3D = null;

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.meshObject3d.traverse((child : any) => {
			if (child.isMesh) {
				child.material = new THREE.MeshPhongMaterial();
			} else if (child.isLineSegments){
				child.parent.remove(child);
			}
		})
		this.meshTransformControl.attach(this.meshObject3d);
	}

	setGround(mesh: NgxMeshComponent) {
		this.groundMesh = mesh.getObject3d();
	}
	
	private groundMesh : I3JS.Object3D = null;

	lightmapObjects: any[] = [];

	private orbitControls: I3JS.OrbitControls = null;

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.progressiveSurfacemap = new THREE.ProgressiveLightMap(
			this.renderer.renderer as any,
			1024
		);
		this.dirLights = [];
		for ( let l = 0; l < 8; l ++ ) {
			const dirLight = new THREE.DirectionalLight( 0xffffff, 1.0 / 8 );
			dirLight.name = 'Dir. Light ' + l;
			dirLight.position.set( 200, 200, 200 );
			dirLight.castShadow = true;
			dirLight.shadow.camera.near = 100;
			dirLight.shadow.camera.far = 5000;
			dirLight.shadow.camera.right = 150;
			dirLight.shadow.camera.left = - 150;
			dirLight.shadow.camera.top = 150;
			dirLight.shadow.camera.bottom = - 150;
			dirLight.shadow.mapSize.width = 512;
			dirLight.shadow.mapSize.height = 512;
			this.dirLights.push( dirLight );
		}

		this.getTimeout(2000).then(() => {
			this.orbitControls = this.renderer.getRenderControl().getControl();
			this.IightOriginTransformControl.attach(this.lightOrigin);
			this.dirLights.forEach((light) => {
				light.target = this.lightTarget;
			});
			const lightmapObjects:I3JS.Object3D[] = [];
			this.meshObject3d.traverse((child : any) => {
				if (child.isMesh) {
					lightmapObjects.push(child);
				}
			})
			this.dirLights.forEach(light => {
				lightmapObjects.push(light);
			});
			lightmapObjects.push(this.groundMesh);
			this.progressiveSurfacemap.addObjectsToLightMap( lightmapObjects );

		});
	}

	setTransformControl(control: NgxControlComponent, type: string) {
		switch (type) {
			case 'lightOrigin':
				this.IightOriginTransformControl = control.getControl();
				break;
			case 'mesh':
				this.meshTransformControl = control.getControl();
				break;
		}
	}

	private IightOriginTransformControl: I3JS.TransformControls = null;
	private meshTransformControl: I3JS.TransformControls = null;

	transformControlsEvent(event: any) {
		switch (event.type) {
			case 'dragging-changed':
				this.orbitControls.enabled = !event.event.value;
				break;
		}
	}

	progressiveSurfacemap: I3JS.ProgressiveLightMap = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.progressiveSurfacemap && this.lightOrigin && this.meshObject3d) {
			if (this.controls.enable) {
				const progressiveSurfacemap = this.progressiveSurfacemap;
				progressiveSurfacemap.update(
					this.cameraObject3d,
					this.controls.blendWindow,
					this.controls.blurEdges
				);
				if (!progressiveSurfacemap.firstUpdate) {
					progressiveSurfacemap.showDebugLightmap(this.controls.debugLightmap);
				}
			}
			// Manually Update the Directional Lights
			const lightRadius = this.controls.lightRadius;
			const lightOrigin = this.lightOrigin;
			const meshPosition = this.meshObject3d.position;
			this.dirLights.forEach((light) => {
				// Sometimes they will be sampled from the target direction
				// Sometimes they will be uniformly sampled from the upper hemisphere
				if (Math.random() > this.controls.ambientWeight) {
					light.position.set(
						lightOrigin.position.x + Math.random() * lightRadius,
						lightOrigin.position.y + Math.random() * lightRadius,
						lightOrigin.position.z + Math.random() * lightRadius
					);
				} else {
					// Uniform Hemispherical Surface Distribution for Ambient Occlusion
					const lambda = Math.acos(2 * Math.random() - 1) - 3.14159 / 2.0;
					const phi = 2 * 3.14159 * Math.random();
					light.position.set(
						Math.cos(lambda) * Math.cos(phi) * 300 + meshPosition.x,
						Math.abs(Math.cos(lambda) * Math.sin(phi) * 300) +
							meshPosition.y +
							20,
						Math.sin(lambda) * 300 + meshPosition.z
					);
				}
			});
		}
	}
}
