import { Component } from '@angular/core';
import {
	CinematicCamera, NgxBaseComponent, NgxCameraComponent, IRendererTimer, THREE, IRendererEvent, Vector2, IRendererInfo, I3JS
} from 'ngx3js';

@Component({
	selector: 'app-webgl-camera-cinematic',
	templateUrl: './webgl-camera-cinematic.component.html',
	styleUrls: ['./webgl-camera-cinematic.component.scss'],
})
export class WebglCameraCinematicComponent extends NgxBaseComponent<{
	focalLength: number;
	fstop: number;
	showFocus: boolean;
	focalDepth: number;
}> {
	constructor() {
		super(
			{
				focalLength: 15,
				fstop: 2.8,
				showFocus: false,
				focalDepth: 3,
			},
			[
				{
					name: 'focalLength',
					type: 'number',
					listen: true,
					min: 1,
					max: 135,
					step: 0.01,
					change: () => {
						this.matChanger();
					},
				},
				{
					name: 'fstop',
					type: 'number',
					listen: true,
					min: 1.8,
					max: 22,
					step: 0.01,
					change: () => {
						this.matChanger();
					},
				},
				{
					name: 'focalDepth',
					type: 'number',
					listen: true,
					min: 0.1,
					max: 100,
					step: 0.001,
					change: () => {
						this.matChanger();
					},
				},
				{
					name: 'showFocus',
					type: 'checkbox',
					listen: true,
					change: () => {
						this.matChanger();
					},
				},
			]
		, false, false);
	}

	setCamera(camera: NgxCameraComponent) {
		super.setCamera(camera);
		this.matChanger();
	}

	onDocumentMouseMove(event : IRendererEvent) {
		this.mouse = event.mouse;
	}

	mouse : Vector2 = null;


	matChanger() {
		if (this.camera !== null) {
			const camera : any = this.camera.getObject3d() as any;
			const postprocessing = camera.postprocessing as any;
			for (const e in this.controls) {
				if (e in postprocessing.bokeh_uniforms) {
					postprocessing.bokeh_uniforms[e].value = this.controls[e];
				}
			}
			postprocessing.bokeh_uniforms[ 'znear' ].value = camera.near;
			postprocessing.bokeh_uniforms[ 'zfar' ].value = camera.far;
			camera.setLens( this.controls.focalLength, camera.frameHeight, this.controls.fstop, camera.coc );
			this.controls.focalDepth = camera.postprocessing.bokeh_uniforms[ 'focalDepth' ].value;
		}
	}

	boxes: {
		color: number;
		x: number;
		y: number;
		z: number;
	}[] = [];

	beforeRender : (info: IRendererInfo) => boolean = null;

	ngOnInit() {
		this.beforeRender = (info: IRendererInfo) => {
			const camera = info.cameras[0] as CinematicCamera;
			const scene = info.scenes[0];
			const renderer = info.renderer as I3JS.WebGL1Renderer;
			if ( camera.postprocessing.enabled ) {
				camera.renderCinematic( scene, renderer );
			} else {
				scene.overrideMaterial = null;
				renderer.clear();
				renderer.render( scene, camera );

			}
			return true;
		}
		this.boxes = [];
		for (let i = 0; i < 500; i++) {
			this.boxes.push({
				color: Math.random() * 0xffffff,
				x: Math.random() * 800 - 400,
				y: Math.random() * 800 - 400,
				z: Math.random() * 800 - 400,
			});
		}
	}

	INTERSECTED : any = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.camera !== null) {
			const radius = 100;
			const theta = timer.elapsedTime * 2;
			this.camera.setPosition(
				radius * Math.sin(THREE.MathUtils.degToRad(theta)),
				radius * Math.sin(THREE.MathUtils.degToRad(theta)),
				radius * Math.cos(THREE.MathUtils.degToRad(theta))
			);
			this.camera.setLookat(0, 0, 0);
			const intersects = this.camera.getIntersections(this.mouse, this.meshChildren);

			if ( intersects.length > 0 ) {
				const targetDistance = intersects[ 0 ].distance;
				const camera : CinematicCamera = this.cameraObject3d as any;
				camera.focusAt( targetDistance ); // using Cinematic camera focusAt method
				if ( this.INTERSECTED != intersects[ 0 ].object ) {
					if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
					this.INTERSECTED = intersects[ 0 ].object;
					this.INTERSECTED.currentHex = this.INTERSECTED.material.emissive.getHex();
					this.INTERSECTED.material.emissive.setHex( 0xff0000 );
				}
			} else {
				if ( this.INTERSECTED ) this.INTERSECTED.material.emissive.setHex( this.INTERSECTED.currentHex );
				this.INTERSECTED = null;
			}			
		}
	}
}
