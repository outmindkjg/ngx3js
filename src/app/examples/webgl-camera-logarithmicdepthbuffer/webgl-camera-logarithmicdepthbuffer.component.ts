import { Component } from '@angular/core';
import {
	BaseComponent,
	CameraComponent,
	RendererComponent,
	RendererTimer,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-camera-logarithmicdepthbuffer',
	templateUrl: './webgl-camera-logarithmicdepthbuffer.component.html',
	styleUrls: ['./webgl-camera-logarithmicdepthbuffer.component.scss'],
})
export class WebglCameraLogarithmicdepthbufferComponent extends BaseComponent<{
	screenRate: number;
	reset: () => void;
}> {
	constructor() {
		super(
			{
				screenRate: 30,
				reset: () => {
					this.mouse = [0.5, 0.5];
					this.zoompos = -100;
					this.minzoomspeed = 0.015;
					this.zoomspeed = this.minzoomspeed;
				},
			},
			[
				{ name: 'screenRate', type: 'number', min: 0, max: 100 },
				{ name: 'reset', type: 'button' },
			]
		);
	}

	labelData: { size: number; scale: number; label: string; color?: number }[] =
		[
			{ size: 0.01, scale: 0.0001, label: 'microscopic (1µm)' },
			{ size: 0.01, scale: 0.1, label: 'minuscule (1mm)' },
			{ size: 0.01, scale: 1.0, label: 'tiny (1cm)' },
			{ size: 1, scale: 1.0, label: 'child-sized (1m)' },
			{ size: 10, scale: 1.0, label: 'tree-sized (10m)' },
			{ size: 100, scale: 1.0, label: 'building-sized (100m)' },
			{ size: 1000, scale: 1.0, label: 'medium (1km)' },
			{ size: 10000, scale: 1.0, label: 'city-sized (10km)' },
			{ size: 3400000, scale: 1.0, label: 'moon-sized (3,400 Km)' },
			{ size: 12000000, scale: 1.0, label: 'planet-sized (12,000 km)' },
			{ size: 1400000000, scale: 1.0, label: 'sun-sized (1,400,000 km)' },
			{ size: 7.47e12, scale: 1.0, label: 'solar system-sized (50Au)' },
			{ size: 9.4605284e15, scale: 1.0, label: 'gargantuan (1 light year)' },
			{ size: 3.08567758e16, scale: 1.0, label: 'ludicrous (1 parsec)' },
			{ size: 1e19, scale: 1.0, label: 'mind boggling (1000 light years)' },
		];

	mouse = [0.5, 0.5];
	zoompos = -100;
	minzoomspeed = 0.015;
	zoomspeed = this.minzoomspeed;

	ngOnInit() {
		this.labelData.forEach((label) => {
			label.color = new THREE.Color().setHSL(Math.random(), 0.5, 0.5).getHex();
		});
	}

	renderer: RendererComponent = null;

	setRenderer(renderer: RendererComponent) {
		this.renderer = renderer;
	}

	camera1: THREE.Camera = null;

	setCamera1(camera: CameraComponent) {
		this.camera1 = camera.getCamera();
	}

	camera2: THREE.Camera = null;

	setCamera2(camera: CameraComponent) {
		this.camera2 = camera.getCamera();
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		const minzoom = this.labelData[0].size * this.labelData[0].scale * 1;
		const maxzoom =
			this.labelData[this.labelData.length - 1].size *
			this.labelData[this.labelData.length - 1].scale *
			100;
		let damping = Math.abs(this.zoomspeed) > this.minzoomspeed ? 0.95 : 1.0;
		const zoom = THREE.MathUtils.clamp(
			Math.pow(Math.E, this.zoompos),
			minzoom,
			maxzoom
		);
		this.zoompos = Math.log(zoom);
		if (
			(zoom == minzoom && this.zoomspeed < 0) ||
			(zoom == maxzoom && this.zoomspeed > 0)
		) {
			damping = 0.85;
		}
		this.zoompos += this.zoomspeed;
		this.zoomspeed *= damping;
		if (this.camera1 !== null) {
			this.camera1.position.set(
				Math.sin(0.5 * Math.PI * (this.mouse[0] - 0.5)) * zoom,
				Math.sin(0.5 * Math.PI * (this.mouse[1] - 0.5)) * zoom,
				Math.cos(0.5 * Math.PI * (this.mouse[0] - 0.5)) * zoom
			);
			this.camera1.lookAt(0, 0, 0);
			if (this.camera2 !== null) {
				this.camera2.position.copy(this.camera1.position);
				this.camera2.quaternion.copy(this.camera1.quaternion);
			}
		}
	}
}
