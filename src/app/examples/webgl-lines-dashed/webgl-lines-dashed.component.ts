import { Component } from '@angular/core';
import { BaseComponent, GeometryUtils, I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-lines-dashed',
	templateUrl: './webgl-lines-dashed.component.html',
	styleUrls: ['./webgl-lines-dashed.component.scss'],
})
export class WebglLinesDashedComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const subdivisions = 6;
		const recursion = 1;

		const points = GeometryUtils.hilbert3D(
			N3js.getVector3(0, 0, 0),
			25.0,
			recursion,
			0,
			1,
			2,
			3,
			4,
			5,
			6,
			7
		);
		const spline = N3js.getCatmullRomCurve3(points);

		this.samples = spline.getPoints(points.length * subdivisions);
		const width = 50 * 0.5;
		const height = 50 * 0.5;
		const depth = 50 * 0.5;
		this.position = [];
		this.position.push(
			-width,
			-height,
			-depth,
			-width,
			height,
			-depth,
			-width,
			height,
			-depth,
			width,
			height,
			-depth,
			width,
			height,
			-depth,
			width,
			-height,
			-depth,
			width,
			-height,
			-depth,
			-width,
			-height,
			-depth,
			-width,
			-height,
			depth,
			-width,
			height,
			depth,
			-width,
			height,
			depth,
			width,
			height,
			depth,
			width,
			height,
			depth,
			width,
			-height,
			depth,
			width,
			-height,
			depth,
			-width,
			-height,
			depth,
			-width,
			-height,
			-depth,
			-width,
			-height,
			depth,
			-width,
			height,
			-depth,
			-width,
			height,
			depth,
			width,
			height,
			-depth,
			width,
			height,
			depth,
			width,
			-height,
			-depth,
			width,
			-height,
			depth
		);
	}

	samples: I3JS.IVector3[] = [];
	position: number[] = [];
}
