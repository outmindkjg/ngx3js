import { Component } from '@angular/core';
import { BaseComponent, I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-shapes',
	templateUrl: './webgl-geometry-shapes.component.html',
	styleUrls: ['./webgl-geometry-shapes.component.scss'],
})
export class WebglGeometryShapesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	shapesInfos: {
		shape: I3JS.IShape;
		extrudeSettings: {
			depth: number;
			bevelEnabled: boolean;
			bevelSegments: number;
			steps: number;
			bevelSize: number;
			bevelThickness: number;
		};
		color: number;
		x: number;
		y: number;
		z: number;
		rx: number;
		ry: number;
		rz: number;
		s: number;
	}[] = [];

	lineShapesInfos: {
		shape: I3JS.IShape;
		points: I3JS.IVector2[];
		spacedPoints: I3JS.IVector2[];
		color: number;
		x: number;
		y: number;
		z: number;
		rx: number;
		ry: number;
		rz: number;
		s: number;
	}[] = [];

	addShape(shape: I3JS.IShape, extrudeSettings, color, x, y, z, rx, ry, rz, s) {
		this.shapesInfos.push({
			shape: shape.clone() ,
			extrudeSettings: extrudeSettings,
			color: color,
			x: x,
			y: y,
			z: z,
			rx: (rx / Math.PI) * 180,
			ry: (ry / Math.PI) * 180,
			rz: (rz / Math.PI) * 180,
			s: s,
		});
		this.addLineShape(shape, color, x, y, z, rx, ry, rz, s);
	}

	addLineShape(shape: I3JS.IShape | I3JS.IPath, color, x, y, z, rx, ry, rz, s) {
		const lineShape = shape.clone() ;
		lineShape.autoClose = true;
		const points = lineShape.getPoints();
		const spacedPoints = lineShape.getSpacedPoints(50);
		this.lineShapesInfos.push({
			shape: lineShape as any,
			points: points,
			spacedPoints: spacedPoints,
			color: color,
			x: x,
			y: y,
			z: z,
			rx: (rx / Math.PI) * 180,
			ry: (ry / Math.PI) * 180,
			rz: (rz / Math.PI) * 180,
			s: s,
		});
	}

	ngOnInit() {
		this.shapesInfos = [];
		this.lineShapesInfos = [];
		const californiaPts = [];
		californiaPts.push(N3js.getVector2(610, 320));
		californiaPts.push(N3js.getVector2(450, 300));
		californiaPts.push(N3js.getVector2(392, 392));
		californiaPts.push(N3js.getVector2(266, 438));
		californiaPts.push(N3js.getVector2(190, 570));
		californiaPts.push(N3js.getVector2(190, 600));
		californiaPts.push(N3js.getVector2(160, 620));
		californiaPts.push(N3js.getVector2(160, 650));
		californiaPts.push(N3js.getVector2(180, 640));
		californiaPts.push(N3js.getVector2(165, 680));
		californiaPts.push(N3js.getVector2(150, 670));
		californiaPts.push(N3js.getVector2(90, 737));
		californiaPts.push(N3js.getVector2(80, 795));
		californiaPts.push(N3js.getVector2(50, 835));
		californiaPts.push(N3js.getVector2(64, 870));
		californiaPts.push(N3js.getVector2(60, 945));
		californiaPts.push(N3js.getVector2(300, 945));
		californiaPts.push(N3js.getVector2(300, 743));
		californiaPts.push(N3js.getVector2(600, 473));
		californiaPts.push(N3js.getVector2(626, 425));
		californiaPts.push(N3js.getVector2(600, 370));
		californiaPts.push(N3js.getVector2(610, 320));

		for (let i = 0; i < californiaPts.length; i++)
			californiaPts[i].multiplyScalar(0.25);

		const californiaShape = N3js.getShape(californiaPts);

		// Triangle

		const triangleShape = N3js.getShape()
			.moveTo(80, 20)
			.lineTo(40, 80)
			.lineTo(120, 80)
			.lineTo(80, 20); // close path

		// Heart

		const x = 0,
			y = 0;

		const heartShape = N3js.getShape() // From http://blog.burlock.org/html5/130-paths
			.moveTo(x + 25, y + 25)
			.bezierCurveTo(x + 25, y + 25, x + 20, y, x, y)
			.bezierCurveTo(x - 30, y, x - 30, y + 35, x - 30, y + 35)
			.bezierCurveTo(x - 30, y + 55, x - 10, y + 77, x + 25, y + 95)
			.bezierCurveTo(x + 60, y + 77, x + 80, y + 55, x + 80, y + 35)
			.bezierCurveTo(x + 80, y + 35, x + 80, y, x + 50, y)
			.bezierCurveTo(x + 35, y, x + 25, y + 25, x + 25, y + 25);

		// Square

		const sqLength = 80;

		const squareShape = N3js.getShape()
			.moveTo(0, 0)
			.lineTo(0, sqLength)
			.lineTo(sqLength, sqLength)
			.lineTo(sqLength, 0)
			.lineTo(0, 0);

		// Rounded rectangle

		const roundedRectShape = N3js.getShape();

		(function roundedRect(ctx, x, y, width, height, radius) {
			ctx.moveTo(x, y + radius);
			ctx.lineTo(x, y + height - radius);
			ctx.quadraticCurveTo(x, y + height, x + radius, y + height);
			ctx.lineTo(x + width - radius, y + height);
			ctx.quadraticCurveTo(
				x + width,
				y + height,
				x + width,
				y + height - radius
			);
			ctx.lineTo(x + width, y + radius);
			ctx.quadraticCurveTo(x + width, y, x + width - radius, y);
			ctx.lineTo(x + radius, y);
			ctx.quadraticCurveTo(x, y, x, y + radius);
		})(roundedRectShape, 0, 0, 50, 50, 20);

		// Track

		const trackShape = N3js.getShape()
			.moveTo(40, 40)
			.lineTo(40, 160)
			.absarc(60, 160, 20, Math.PI, 0, true)
			.lineTo(80, 40)
			.absarc(60, 40, 20, 2 * Math.PI, Math.PI, true);

		// Circle

		const circleRadius = 40;
		const circleShape = N3js.getShape()
			.moveTo(0, circleRadius)
			.quadraticCurveTo(circleRadius, circleRadius, circleRadius, 0)
			.quadraticCurveTo(circleRadius, -circleRadius, 0, -circleRadius)
			.quadraticCurveTo(-circleRadius, -circleRadius, -circleRadius, 0)
			.quadraticCurveTo(-circleRadius, circleRadius, 0, circleRadius);

		// Fish

		const fishShape = N3js.getShape()
			.moveTo(x, y)
			.quadraticCurveTo(x + 50, y - 80, x + 90, y - 10)
			.quadraticCurveTo(x + 100, y - 10, x + 115, y - 40)
			.quadraticCurveTo(x + 115, y, x + 115, y + 40)
			.quadraticCurveTo(x + 100, y + 10, x + 90, y + 10)
			.quadraticCurveTo(x + 50, y + 80, x, y);

		// Arc circle

		const arcShape = N3js.getShape()
			.moveTo(50, 10)
			.absarc(10, 10, 40, 0, Math.PI * 2, false);

		const holePath = N3js.getPath()
			.moveTo(20, 10)
			.absarc(10, 10, 10, 0, Math.PI * 2, true);

		arcShape.holes.push(holePath);

		// Smiley

		const smileyShape = N3js.getShape()
			.moveTo(80, 40)
			.absarc(40, 40, 40, 0, Math.PI * 2, false);

		const smileyEye1Path = N3js.getPath()
			.moveTo(35, 20)
			.absellipse(25, 20, 10, 10, 0, Math.PI * 2, true, 0);

		const smileyEye2Path = N3js.getPath()
			.moveTo(65, 20)
			.absarc(55, 20, 10, 0, Math.PI * 2, true);

		const smileyMouthPath = N3js.getPath()
			.moveTo(20, 40)
			.quadraticCurveTo(40, 60, 60, 40)
			.bezierCurveTo(70, 45, 70, 50, 60, 60)
			.quadraticCurveTo(40, 80, 20, 60)
			.quadraticCurveTo(5, 50, 20, 40);

		smileyShape.holes.push(smileyEye1Path);
		smileyShape.holes.push(smileyEye2Path);
		smileyShape.holes.push(smileyMouthPath);

		// Spline shape

		const splinepts = [];
		splinepts.push(N3js.getVector2(70, 20));
		splinepts.push(N3js.getVector2(80, 90));
		splinepts.push(N3js.getVector2(-30, 70));
		splinepts.push(N3js.getVector2(0, 0));

		const splineShape = N3js.getShape().moveTo(0, 0).splineThru(splinepts);

		const extrudeSettings = {
			depth: 8,
			bevelEnabled: true,
			bevelSegments: 2,
			steps: 2,
			bevelSize: 1,
			bevelThickness: 1,
		};

		this.addShape(
			californiaShape,
			extrudeSettings,
			0xf08000,
			-300,
			-100,
			0,
			0,
			0,
			0,
			1
		);
		this.addShape(
			triangleShape,
			extrudeSettings,
			0x8080f0,
			-180,
			0,
			0,
			0,
			0,
			0,
			1
		);
		this.addShape(
			roundedRectShape,
			extrudeSettings,
			0x008000,
			-150,
			150,
			0,
			0,
			0,
			0,
			1
		);
		this.addShape(
			trackShape,
			extrudeSettings,
			0x008080,
			200,
			-100,
			0,
			0,
			0,
			0,
			1
		);
		this.addShape(
			squareShape,
			extrudeSettings,
			0x0040f0,
			150,
			100,
			0,
			0,
			0,
			0,
			1
		);
		this.addShape(
			heartShape,
			extrudeSettings,
			0xf00000,
			60,
			100,
			0,
			0,
			0,
			Math.PI,
			1
		);
		this.addShape(
			circleShape,
			extrudeSettings,
			0x00f000,
			120,
			250,
			0,
			0,
			0,
			0,
			1
		);
		this.addShape(
			fishShape,
			extrudeSettings,
			0x404040,
			-60,
			200,
			0,
			0,
			0,
			0,
			1
		);
		this.addShape(
			smileyShape,
			extrudeSettings,
			0xf000f0,
			-200,
			250,
			0,
			0,
			0,
			Math.PI,
			1
		);
		this.addShape(arcShape, extrudeSettings, 0x804000, 150, 0, 0, 0, 0, 0, 1);
		this.addShape(
			splineShape,
			extrudeSettings,
			0x808080,
			-50,
			-100,
			0,
			0,
			0,
			0,
			1
		);
		this.addLineShape(arcShape.holes[0], 0x804000, 150, 0, 0, 0, 0, 0, 1);
		for (let i = 0; i < smileyShape.holes.length; i += 1) {
			this.addLineShape(
				smileyShape.holes[i],
				0xf000f0,
				-200,
				250,
				0,
				0,
				0,
				Math.PI,
				1
			);
		}
	}
}
