import { Component } from '@angular/core';
import {
	BaseComponent,
	CameraComponent,
	GeometryComponent,
	HelperComponent,
	MeshComponent,
	RendererTimer,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-geometry-extrude-splines',
	templateUrl: './webgl-geometry-extrude-splines.component.html',
	styleUrls: ['./webgl-geometry-extrude-splines.component.scss'],
})
export class WebglGeometryExtrudeSplinesComponent extends BaseComponent<{
	spline: string;
	scale: number;
	extrusionSegments: number;
	radiusSegments: number;
	closed: boolean;
	animationView: boolean;
	lookAhead: boolean;
	cameraHelper: boolean;
	cameraSpeed: number;
}> {
	constructor() {
		super(
			{
				spline: 'GrannyKnot',
				scale: 4,
				extrusionSegments: 100,
				radiusSegments: 3,
				closed: true,
				animationView: false,
				lookAhead: false,
				cameraHelper: false,
				cameraSpeed: 1000,
			},
			[
				{
					name: 'Geometry',
					type: 'folder',
					isOpen: true,
					children: [
						{
							name: 'spline',
							type: 'select',
							select: [
								'GrannyKnot',
								'HeartCurve',
								'VivianiCurve',
								'KnotCurve',
								'HelixCurve',
								'TrefoilKnot',
								'TorusKnot',
								'CinquefoilKnot',
								'TrefoilPolynomialKnot',
								'FigureEightPolynomialKnot',
								'DecoratedTorusKnot4a',
								'DecoratedTorusKnot4b',
								'DecoratedTorusKnot5a',
								'DecoratedTorusKnot5c',
								'PipeSpline',
								'SampleClosedSpline',
							],
							change: () => {
								this.setSpline(this.controls.spline);
							},
						},
						{ name: 'scale', type: 'number', min: 2, max: 10, step: 2 },
						{
							name: 'extrusionSegments',
							type: 'number',
							min: 50,
							max: 500,
							step: 50,
						},
						{
							name: 'radiusSegments',
							type: 'number',
							min: 2,
							max: 20,
							step: 1,
						},
						{ name: 'closed', type: 'checkbox' },
					],
				},
				{
					name: 'Camera',
					type: 'folder',
					isOpen: true,
					children: [
						{ name: 'animationView', type: 'checkbox' },
						{
							name: 'cameraSpeed',
							type: 'number',
							min: 50,
							max: 2500,
							step: 100,
						},
						{ name: 'lookAhead', type: 'checkbox' },
						{ name: 'cameraHelper', type: 'checkbox' },
					],
				},
			]
		);
	}

	pipeSpline = [
		{ x: 0, y: 10, z: -10 },
		{ x: 10, y: 0, z: -10 },
		{ x: 20, y: 0, z: 0 },
		{ x: 30, y: 0, z: 10 },
		{ x: 30, y: 0, z: 20 },
		{ x: 20, y: 0, z: 30 },
		{ x: 10, y: 0, z: 30 },
		{ x: 0, y: 0, z: 30 },
		{ x: -10, y: 10, z: 30 },
		{ x: -10, y: 20, z: 30 },
		{ x: 0, y: 30, z: 30 },
		{ x: 10, y: 30, z: 30 },
		{ x: 20, y: 30, z: 15 },
		{ x: 10, y: 30, z: 10 },
		{ x: 0, y: 30, z: 10 },
		{ x: -10, y: 20, z: 10 },
		{ x: -10, y: 10, z: 10 },
		{ x: 0, y: 0, z: 10 },
		{ x: 10, y: -10, z: 10 },
		{ x: 20, y: -15, z: 10 },
		{ x: 30, y: -15, z: 10 },
		{ x: 40, y: -15, z: 10 },
		{ x: 50, y: -15, z: 10 },
		{ x: 60, y: 0, z: 10 },
		{ x: 70, y: 0, z: 0 },
		{ x: 80, y: 0, z: 0 },
		{ x: 90, y: 0, z: 0 },
		{ x: 100, y: 0, z: 0 },
	];

	sampleClosedSpline = [
		{ x: 0, y: -40, z: -40 },
		{ x: 0, y: 40, z: -40 },
		{ x: 0, y: 140, z: -40 },
		{ x: 0, y: 40, z: 40 },
		{ x: 0, y: -40, z: 40 },
	];

	curvePath: { x: number; y: number; z: number }[] = [];

	spline: string = 'spline';
	scale: number = 0;
	setSpline(spline: string) {
		this.spline = spline;
		switch (spline) {
			case 'HeartCurve':
				this.scale = 3.5;
				break;
			case 'VivianiCurve':
				this.scale = 70;
				break;
			case 'TorusKnot':
				this.scale = 20;
				break;
			case 'CinquefoilKnot':
				this.scale = 20;
				break;
			case 'TrefoilPolynomialKnot':
				this.scale = 14;
				break;
			case 'PipeSpline':
				this.curvePath = this.pipeSpline;
				break;
			case 'SampleClosedSpline':
				this.curvePath = this.sampleClosedSpline;
				break;
		}
	}

	ngOnInit() {
		this.setSpline(this.controls.spline);
	}

	tubeGeometry: THREE.TubeGeometry;
	setTubeGeometry(tubeGeometry: GeometryComponent) {
		this.tubeGeometry = tubeGeometry.getGeometry() as THREE.TubeGeometry;
	}

	direction = new THREE.Vector3();
	binormal = new THREE.Vector3();
	normal = new THREE.Vector3();
	position = new THREE.Vector3();
	lookAt = new THREE.Vector3();

	cameraHelper: THREE.CameraHelper = null;
	splineCamera: THREE.Camera = null;
	cameraEye: THREE.Object3D = null;

	setCameraHelper(cameraHelper: HelperComponent) {
		this.cameraHelper = cameraHelper.getHelper() as THREE.CameraHelper;
	}

	setSplineCamera(splineCamera: CameraComponent) {
		this.splineCamera = splineCamera.getObject3d();
	}

	setCameraEye(cameraEye: MeshComponent) {
		this.cameraEye = cameraEye.getRealMesh();
	}

	elapsedTime: number = 0;
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (
			this.mesh !== null &&
			this.tubeGeometry !== null &&
			this.cameraHelper !== null &&
			this.splineCamera !== null &&
			this.cameraEye !== null
		) {
			const looptime = 20 * 1000;
			this.elapsedTime += timer.delta * this.controls.cameraSpeed;
			const time = this.elapsedTime;
			const t = (time % looptime) / looptime;

			this.tubeGeometry.parameters.path.getPointAt(t, this.position);
			this.position.multiplyScalar(this.controls.scale);
			const segments = this.tubeGeometry.tangents.length;
			const pickt = t * segments;
			const pick = Math.floor(pickt);
			const pickNext = (pick + 1) % segments;

			this.binormal.subVectors(
				this.tubeGeometry.binormals[pickNext],
				this.tubeGeometry.binormals[pick]
			);
			this.binormal
				.multiplyScalar(pickt - pick)
				.add(this.tubeGeometry.binormals[pick]);

			this.tubeGeometry.parameters.path.getTangentAt(t, this.direction);
			const offset = 15;

			this.normal.copy(this.binormal).cross(this.direction);

			// we move on a offset on its binormal

			this.position.add(this.normal.clone().multiplyScalar(offset));

			this.splineCamera.position.copy(this.position);
			this.cameraEye.position.copy(this.position);

			// using arclength for stablization in look ahead

			this.tubeGeometry.parameters.path.getPointAt(
				(t + 30 / this.tubeGeometry.parameters.path.getLength()) % 1,
				this.lookAt
			);
			this.lookAt.multiplyScalar(this.controls.scale);

			// camera orientation 2 - up orientation via normal

			if (!this.controls.lookAhead)
				this.lookAt.copy(this.position).add(this.direction);
			this.splineCamera.matrix.lookAt(
				this.splineCamera.position,
				this.lookAt,
				this.normal
			);
			this.splineCamera.quaternion.setFromRotationMatrix(
				this.splineCamera.matrix
			);

			this.cameraHelper.update();
		}
	}
}
