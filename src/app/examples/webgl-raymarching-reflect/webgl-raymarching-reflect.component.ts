import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent, NgxMeshComponent,
	NgxRendererComponent,
	IRendererTimer,
	NgxMaterialComponent,
	Vector2,
	THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-raymarching-reflect',
	templateUrl: './webgl-raymarching-reflect.component.html',
	styleUrls: ['./webgl-raymarching-reflect.component.scss'],
})
export class WebglRaymarchingReflectComponent extends NgxBaseComponent<{
	saveImage: () => void;
	resolution: string;
}> {
	constructor() {
		super(
			{
				saveImage: () => {
					if (this.renderer !== null) {
						this.renderer.getCanvasJson((json) => {}, {
							width: 200,
							height: 200,
							name: 'auto',
						});
					}
				},
				resolution: '512',
			},
			[
				{ name: 'saveImage', title: 'Save Image', type: 'button' },
				{
					name: 'resolution',
					title: 'Resolution',
					type: 'select',
					select: ['256', '512', '800', 'full'],
					change: () => {
						this.changeSize();
					},
				},
			]
			,false , false);
	}

	ngOnInit(): void {
		this.changeSize();
	}

	setRender(renderer: NgxRendererComponent) {
		super.setRender(renderer);
		this.subscribeRefer('windowSize',
			renderer.sizeSubscribe().subscribe(() => {
				if (this.renderer !== null && this.material !== null && this.cameraObject3d !== null) {
					const width = window.innerWidth;
					const height = window.innerHeight;
					if ((width !== this.width || height !== this.height) && this.controls.resolution !== 'full') {
						this.changeSize();
					} else {
						const renderer : I3JS.WebGL1Renderer = this.renderer.renderer as any;
						const size : I3JS.Vector2 = new THREE.Vector2();
						renderer.getSize(size);
						const material = this.material;
						const camera = this.cameraObject3d;
						material.uniforms.resolution.value.set( size.x, size.y );
						material.uniforms.cameraProjectionMatrixInverse.value.copy( camera.projectionMatrixInverse );
					}
				}
			})
		);
	}

	setRayMarchingMaterial(matrial : NgxMaterialComponent) {
		this.material = matrial.getMaterial();
	}
	
	material : I3JS.RawShaderMaterial = null;

	resolution : number = 512;
	sizeType : string = "fixed";
	left : number = 0;
	top : number = 0;
	width : number = 0;
	height : number = 0;
	changeSize() {
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		if (this.controls.resolution !== 'full') {
			this.resolution = parseInt(this.controls.resolution);
			this.left = (this.width - this.resolution) / 2;
			this.top = (this.height - this.resolution) / 2;
			this.sizeType = 'fixed';
		} else {
			this.resolution = -1;
			this.sizeType = 'auto';
			this.left = 0;
			this.top = 0;
		}
	}

	setDolly(mesh: NgxMeshComponent) {
		this.dolly = mesh.getObject3d();
		this.cameraObject3d = this.dolly.children[0] as any;
	}

	dolly: I3JS.Object3D = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.dolly !== null) {
			const elapsedTime = timer.elapsedTime;
			this.dolly.position.z = -elapsedTime;
		}
	}
}
