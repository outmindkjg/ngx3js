import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent,
	NgxControlComponent, NgxMeshComponent, IRendererEvent, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-spline-editor',
	templateUrl: './webgl-geometry-spline-editor.component.html',
	styleUrls: ['./webgl-geometry-spline-editor.component.scss'],
})
export class WebglGeometrySplineEditorComponent extends NgxBaseComponent<{
	uniform: boolean;
	tension: number;
	centripetal: boolean;
	chordal: boolean;
	addPoint: () => void;
	removePoint: () => void;
	exportSpline: () => void;
}> {
	constructor() {
		super(
			{
				uniform: true,
				tension: 0.5,
				centripetal: true,
				chordal: true,
				addPoint: () => {
					this.addPoint();
				},
				removePoint: () => {
					this.removePoint();
				},
				exportSpline: () => {
					const strplace = [];
					for (let i = 0; i < this.splinePointsLength; i++) {
						const p = this.positions[i];
						strplace.push(`new THREE.Vector3(${p.x}, ${p.y}, ${p.z})`);
					}
					const code = '[' + strplace.join(',\n\t') + ']';
					prompt('copy and paste code', code);
				},
			},
			[
				{
					name: 'uniform',
					type: 'checkbox',
					change: () => {
						this.updateSplineOutline();
					},
				},
				{
					name: 'tension',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateSplineOutline();
					},
				},
				{
					name: 'centripetal',
					type: 'checkbox',
					change: () => {
						this.updateSplineOutline();
					},
				},
				{
					name: 'chordal',
					type: 'checkbox',
					change: () => {
						this.updateSplineOutline();
					},
				},
				{ name: 'addPoint', type: 'button' },
				{ name: 'removePoint', type: 'button' },
				{ name: 'exportSpline', type: 'button' },
			]
		, false, false);
	}

	ngOnInit() {
		this.load([
			{ x: 289.76843686945404, y: 452.51481137238443, z: 56.10018915737797 },
			{ x: -53.56300074753207, y: 171.49711742836848, z: -14.495472686253045 },
			{ x: -91.40118730204415, y: 176.4306956436485, z: -6.958271935582161 },
			{ x: -383.785318791128, y: 491.1365363371675, z: 47.869296953772746 },
		]);
		this.updateSplineOutline();
	}

	addSplineObject() {
		return {
			x: Math.random() * 1000 - 500,
			y: Math.random() * 600,
			z: Math.random() * 800 - 400,
			color: Math.random() * 0xffffff,
		};
	}

	transformControl: NgxControlComponent = null;
	setTransformControl(transformControl: NgxControlComponent) {
		this.transformControl = transformControl;
	}

	orbitControl: NgxControlComponent = null;
	setOrbitControl(orbitControl: NgxControlComponent) {
		this.orbitControl = orbitControl;
	}

	pointMesh: I3JS.Object3D[] = [];
	setPointMesh(mesh: NgxMeshComponent) {
		const object = mesh.getObject3d();
		if (this.pointMesh.indexOf(object) === -1) {
			this.pointMesh.push(object);
		}
		this.checkPointMesh();
	}

	unsetPointMesh(mesh: NgxMeshComponent) {
		const object = mesh.getObject3d();
		const idx = this.pointMesh.indexOf(object);
		if (idx > -1) {
			this.pointMesh.splice(idx, 1);
		}
		this.checkPointMesh();
	}

	checkPointMesh() {
		const pointMesh: I3JS.Object3D[] = [];
		this.pointMesh.forEach((mesh) => {
			if (mesh.parent !== null && mesh.parent !== undefined) {
				pointMesh.push(mesh);
			}
		});
		this.pointMesh = pointMesh;
	}

	onUpPosition = new THREE.Vector2();
	onDownPosition = new THREE.Vector2();

	setTransformEventListener(event: { type: string; event: any }) {
		if (this.orbitControl !== null) {
			switch (event.type) {
				case 'dragging-changed':
					const controls = this.orbitControl.getControl();
					controls.enabled = !event.event.value;
					break;
				case 'objectChange':
					const curvePath: { x: number; y: number; z: number }[] = [];
					this.pointMesh.forEach((mesh) => {
						const position = mesh.position;
						curvePath.push({
							x: position.x,
							y: position.y,
							z: position.z,
						});
					});
					this.updateSplineOutline(curvePath);
					break;
			}
		}
	}

	setEventListener(event: IRendererEvent) {
		switch (event.type) {
			case 'pointerdown':
				this.onDownPosition.x = event.offsetX;
				this.onDownPosition.y = event.offsetY;
				break;
			case 'pointerup':
				this.onUpPosition.x = event.offsetX;
				this.onUpPosition.y = event.offsetY;
				if (
					this.transformControl !== null &&
					this.onDownPosition.distanceTo(this.onUpPosition) === 0
				) {
					const transformControl = this.transformControl.getControl();
					transformControl.detach();
				}
				break;
			case 'pointermove':
				if (this.camera !== null && this.transformControl !== null) {
					const intersect = this.camera.getIntersection(
						event.mouse,
						this.pointMesh
					);
					if (intersect !== null) {
						const object = intersect.object;
						const transformControl = this.transformControl.getControl();
						if (object !== transformControl.object) {
							transformControl.attach(object);
						}
					}
				}
				break;
			default:
				break;
		}
	}

	addPoint() {
		this.checkPoint();
		this.splinePointsLength++;
		this.positions.push(this.addSplineObject());
		this.updateSplineOutline();
	}

	checkPoint() {
		if (this.pointMesh !== null && this.pointMesh.length > 0) {
			this.pointMesh.forEach((mesh, idx) => {
				const position = this.positions[idx];
				if (position !== null && position !== undefined) {
					const meshPosition = mesh.position;
					position.x = meshPosition.x;
					position.y = meshPosition.y;
					position.z = meshPosition.z;
				}
			});
		}
	}

	splinePointsLength: number = 0;
	removePoint() {
		if (this.splinePointsLength <= 4) {
			return;
		}
		this.checkPoint();
		this.splinePointsLength--;
		this.positions.pop();
		this.updateSplineOutline();
	}

	catmullRomCurves: {
		curvePath: { x: number; y: number; z: number }[];
		curveType: string;
		tension: number;
		color: number;
		visible: boolean;
	}[] = [];
	updateSplineOutline(curvePath: { x: number; y: number; z: number }[] = null) {
		this.catmullRomCurves = [];
		const curveTypes = [
			{
				curveType: 'catmullrom',
				color: 0xff0000,
				tension: this.controls.tension,
				visible: this.controls.uniform,
			},
			{
				curveType: 'centripetal',
				color: 0x00ff00,
				tension: null,
				visible: this.controls.centripetal,
			},
			{
				curveType: 'chordal',
				color: 0x0000ff,
				tension: null,
				visible: this.controls.chordal,
			},
		];
		if (curvePath === null) {
			curvePath = [];
			this.positions.forEach((p) => {
				curvePath.push({ x: p.x, y: p.y, z: p.z });
			});
		}
		curveTypes.forEach((curveInfo) => {
			this.catmullRomCurves.push({
				curvePath: curvePath,
				curveType: curveInfo.curveType,
				tension: curveInfo.tension,
				color: curveInfo.color,
				visible: curveInfo.visible,
			});
		});
	}

	positions: { x: number; y: number; z: number; color: number }[] = [];

	load(new_positions: { x: number; y: number; z: number }[]) {
		while (new_positions.length > this.positions.length) {
			this.addPoint();
		}
		while (new_positions.length < this.positions.length) {
			this.removePoint();
		}
		for (let i = 0; i < this.positions.length; i++) {
			this.positions[i].x = new_positions[i].x;
			this.positions[i].y = new_positions[i].y;
			this.positions[i].z = new_positions[i].z;
		}
	}
}
