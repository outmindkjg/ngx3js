import { Component } from '@angular/core';
import { BaseComponent, THREE, NURBSCurve, NURBSSurface, INURBSSurface } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-nurbs',
	templateUrl: './webgl-geometry-nurbs.component.html',
	styleUrls: ['./webgl-geometry-nurbs.component.scss'],
})
export class WebglGeometryNurbsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	nurbsCurvePoints: any = null;
	controlPoints: any = null;
	nurbsSurface: INURBSSurface = null;
	ngOnInit() {
		const nurbsControlPoints = [];
		const nurbsKnots = [];
		const nurbsDegree = 3;
		for (let i = 0; i <= nurbsDegree; i++) {
			nurbsKnots.push(0);
		}

		for (let i = 0, j = 20; i < j; i++) {
			nurbsControlPoints.push(
				new THREE.Vector4(
					Math.random() * 400 - 200,
					Math.random() * 400,
					Math.random() * 400 - 200,
					1 // weight of control point: higher means stronger attraction
				)
			);
			const knot = (i + 1) / (j - nurbsDegree);
			nurbsKnots.push(THREE.MathUtils.clamp(knot, 0, 1));
		}
		const nurbsCurve = new NURBSCurve(
			nurbsDegree,
			nurbsKnots,
			nurbsControlPoints,
			null,
			null
		);
		this.controlPoints = nurbsCurve['controlPoints'];
		this.nurbsCurvePoints = nurbsCurve.getPoints(200);

		const nsControlPoints = [
			[
				new THREE.Vector4(-200, -200, 100, 1),
				new THREE.Vector4(-200, -100, -200, 1),
				new THREE.Vector4(-200, 100, 250, 1),
				new THREE.Vector4(-200, 200, -100, 1),
			],
			[
				new THREE.Vector4(0, -200, 0, 1),
				new THREE.Vector4(0, -100, -100, 5),
				new THREE.Vector4(0, 100, 150, 5),
				new THREE.Vector4(0, 200, 0, 1),
			],
			[
				new THREE.Vector4(200, -200, -100, 1),
				new THREE.Vector4(200, -100, 200, 1),
				new THREE.Vector4(200, 100, -250, 1),
				new THREE.Vector4(200, 200, 100, 1),
			],
		];
		const degree1 = 2;
		const degree2 = 3;
		const knots1 = [0, 0, 0, 1, 1, 1];
		const knots2 = [0, 0, 0, 0, 1, 1, 1, 1];
		this.nurbsSurface = new NURBSSurface(
			degree1,
			degree2,
			knots1,
			knots2,
			nsControlPoints as any
		);
	}
}
