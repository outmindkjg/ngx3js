import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-shadowmap-performance',
	templateUrl: './webgl-shadowmap-performance.component.html',
	styleUrls: ['./webgl-shadowmap-performance.component.scss'],
})
export class WebglShadowmapPerformanceComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.horsePositions = [];
		for (let i = -600; i < 601; i += 2) {
			const z = (i > 0 ? 150 : -150) + i * 10;
			this.horsePositions.push({
				x: 100 - Math.random() * 3000,
				y: this.floor,
				z: z,
				delay: 100 - Math.random() * 1000,
			});
		}
	}
	floor: number = -250;
	horsePositions: { x: number; y: number; z: number; delay: number }[] = [];

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			const children = this.mesh.getObject3d().children;
			const delta = timer.delta;

			children.forEach((morph) => {
				if (morph.userData.speed == undefined) {
					morph.userData.speed = 300 + Math.random() * 200;
				}
				morph.position.x += morph.userData.speed * delta;
				if (morph.position.x > 2000) {
					morph.position.x = -1000 - Math.random() * 500;
				}
			});
		}
	}
}
