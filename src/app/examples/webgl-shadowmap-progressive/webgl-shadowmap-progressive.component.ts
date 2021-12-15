import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxMeshComponent,
	NgxViewerComponent, IRendererTimer, THREE
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
			]
		);
	}

	ngOnInit() {}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.lightmapObjects = [];
		this.dirLights = [];
		const lightTarget = new THREE.Group();
		lightTarget.position.set(0, 20, 0);
		for (let l = 0; l < 8; l++) {
			const dirLight = new THREE.DirectionalLight(0xffffff, 1.0 / 8);
			dirLight.name = 'Dir. Light ' + l;
			dirLight.position.set(200, 200, 200);
			dirLight.castShadow = true;
			dirLight.shadow.camera.near = 100;
			dirLight.shadow.camera.far = 5000;
			dirLight.shadow.camera.right = 150;
			dirLight.shadow.camera.left = -150;
			dirLight.shadow.camera.top = 150;
			dirLight.shadow.camera.bottom = -150;
			dirLight.shadow.mapSize.width = 512;
			dirLight.shadow.mapSize.height = 512;
			// this.lightmapObjects.push( dirLight );
			this.dirLights.push(dirLight);
			dirLight.target = lightTarget;
		}
		this.meshObject3d.traverse((child: any) => {
			if (child.isMesh) {
				child.name = 'Loaded Mesh';
				child.castShadow = true;
				child.receiveShadow = true;
				child.material = new THREE.MeshPhongMaterial();
				// This adds the model to the lightmap
				// this.lightmapObjects.push( child );
			} else {
				child.layers.disableAll();
			}
		});
		this.progressiveSurfacemap.addObjectsToLightMap(this.lightmapObjects);
	}
	dirLights: any[] = [];
	lightmapObjects: any[] = [];

	setProgressiveSurfacemap(viewer: NgxViewerComponent) {
		this.progressiveSurfacemap = viewer.getViewer();
	}

	progressiveSurfacemap: any = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
	}
}
