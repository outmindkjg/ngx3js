import { Component } from '@angular/core';
import { BaseComponent, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-extrude-shapes',
	templateUrl: './webgl-geometry-extrude-shapes.component.html',
	styleUrls: ['./webgl-geometry-extrude-shapes.component.scss'],
})
export class WebglGeometryExtrudeShapesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	extrudePath: { x: number; y: number; z: number }[] = [
		{ x: -60, y: -100, z: 60 },
		{ x: -60, y: 20, z: 60 },
		{ x: -60, y: 120, z: 60 },
		{ x: 60, y: 20, z: -60 },
		{ x: 60, y: -100, z: -60 },
	];

	shapes1: { x: number; y: number }[] = [];
	shapes2: { x: number; y: number }[] = [];

	randomPoints: { x: number; y: number; z: number }[] = [];

	ngOnInit(): void {
		this.shapes1 = [];
		const count = 3;
		for (let i = 0; i < count; i++) {
			const l = 20;
			const a = ((2 * i) / count) * Math.PI;
			this.shapes1.push({ x: Math.cos(a) * l, y: Math.sin(a) * l });
		}
		this.randomPoints = [];
		for (let i = 0; i < 10; i++) {
			this.randomPoints.push({
				x: (i - 4.5) * 50,
				y: N3js.MathUtils.randFloat(-50, 50),
				z: N3js.MathUtils.randFloat(-50, 50),
			});
		}
		this.shapes2 = [];
		const numPts = 5;
		for (let i = 0; i < numPts * 2; i++) {
			const l = i % 2 == 1 ? 10 : 20;
			const a = (i / numPts) * Math.PI;
			this.shapes2.push({ x: Math.cos(a) * l, y: Math.sin(a) * l });
		}
	}
}
