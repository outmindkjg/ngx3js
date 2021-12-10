import { Component } from '@angular/core';
import {
	BaseComponent,
	CameraComponent, CinematicCamera, N3js, RendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-camera-cinematic',
	templateUrl: './webgl-camera-cinematic.component.html',
	styleUrls: ['./webgl-camera-cinematic.component.scss'],
})
export class WebglCameraCinematicComponent extends BaseComponent<{
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
		);
	}

	camera: CameraComponent = null;

	setCamera(camera: CameraComponent) {
		this.camera = camera;
		this.matChanger();
	}

	matChanger() {
		if (this.camera !== null) {
			const camera = this.camera.getObject3d() as CinematicCamera;
			const postprocessing = camera.postprocessing as any;
			for (const e in this.controls) {
				if (e in postprocessing.bokeh_uniforms) {
					postprocessing.bokeh_uniforms[e].value = this.controls[e];
				}
			}
			postprocessing.bokeh_uniforms['znear'].value = camera.near;
			postprocessing.bokeh_uniforms['zfar'].value = camera.far;
			// * @deprecated Use {@link PerspectiveCamera#setFocalLength .setFocalLength()}
			// and {@link PerspectiveCamera#filmGauge .filmGauge} instead.
			camera.setFocalLength(this.controls.focalLength);
			// camera.setfstop(this.controls.focalLength);
			// camera.setLens( this.controls.focalLength, camera.frameHeight, EffectController.fstop, camera.coc );
			this.controls.focalDepth =
				postprocessing.bokeh_uniforms['focalDepth'].value;
		}
	}

	boxes: {
		color: number;
		x: number;
		y: number;
		z: number;
	}[] = [];

	ngOnInit() {
		this.boxes = [];
		for (let i = 0; i < 1500; i++) {
			this.boxes.push({
				color: Math.random() * 0xffffff,
				x: Math.random() * 800 - 400,
				y: Math.random() * 800 - 400,
				z: Math.random() * 800 - 400,
			});
		}
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.camera !== null) {
			const radius = 100;
			const theta = timer.elapsedTime * 2;
			this.camera.setPosition(
				radius * Math.sin(N3js.MathUtils.degToRad(theta)),
				radius * Math.sin(N3js.MathUtils.degToRad(theta)),
				radius * Math.cos(N3js.MathUtils.degToRad(theta))
			);
			this.camera.setLookat(0, 0, 0);
		}
	}
}
