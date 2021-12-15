import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-effects-parallaxbarrier',
	templateUrl: './webgl-effects-parallaxbarrier.component.html',
	styleUrls: ['./webgl-effects-parallaxbarrier.component.scss'],
})
export class WebglEffectsParallaxbarrierComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	models: { x: number; y: number; z: number; scale: number }[] = [];

	ngOnInit() {
		this.models = [];
		for (let i = 0; i < 500; i++) {
			this.models.push({
				x: Math.random() * 10 - 5,
				y: Math.random() * 10 - 5,
				z: Math.random() * 10 - 5,
				scale: Math.random() * 3 + 1,
			});
		}
	}

	spheres: NgxMeshComponent[] = [];
	setSpheres(sphere: NgxMeshComponent) {
		this.spheres.push(sphere);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		const elapsedTime = 0.01 * timer.elapsedTime;
		this.spheres.forEach((sphere, idx) => {
			sphere.setPosition(
				5 * Math.cos(elapsedTime + idx),
				5 * Math.sin(elapsedTime + idx * 1.1),
				null
			);
		});
	}
}
