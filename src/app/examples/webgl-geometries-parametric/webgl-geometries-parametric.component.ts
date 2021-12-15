import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometries-parametric',
	templateUrl: './webgl-geometries-parametric.component.html',
	styleUrls: ['./webgl-geometries-parametric.component.scss'],
})
export class WebglGeometriesParametricComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	points: { x: number; y: number }[] = [];
	ngOnInit() {
		for (let i = 0; i < 50; i++) {
			this.points.push({
				x: Math.sin(i * 0.2) * Math.sin(i * 0.1) * 15 + 50,
				y: (i - 5) * 2,
			});
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		const elapsedTime = timer.elapsedTime / 10;
		if (this.camera !== null) {
			this.camera.setPosition(
				Math.cos(elapsedTime) * 800,
				null,
				Math.sin(elapsedTime) * 800
			);
			this.camera.setLookat(0, 0, 0);
		}
		if (this.meshObject3d !== null && this.meshChildren !== null) {
			this.meshChildren.forEach((child) => {
				child.rotation.x = elapsedTime * 5;
				child.rotation.y = elapsedTime * 2.5;
			});
		}
	}
}
