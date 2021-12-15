import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererEvent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-physics',
	templateUrl: './ngx-physics.component.html',
	styleUrls: ['./ngx-physics.component.scss'],
})
export class NgxPhysicsComponent extends NgxBaseComponent<{
	gravity: {
		x: number;
		y: number;
		z: number;
		reset: () => void;
	};
	shape: {
		count: number;
		minMass: number;
		maxMass: number;
		minSize: number;
		maxSize: number;
		softSphere: boolean;
		softBox: boolean;
		breakable: boolean;
		reset: () => void;
	};
}> {
	constructor() {
		super(
			{
				gravity: {
					x: 0,
					y: -6,
					z: 0,
					reset: () => {
						this.controls.gravity.x = 0;
						this.controls.gravity.y = -6;
						this.controls.gravity.z = 0;
					},
				},
				shape: {
					count: 10,
					minMass: 0,
					maxMass: 30,
					minSize: 4,
					maxSize: 10,
					breakable: true,
					softSphere: true,
					softBox: false,
					reset: () => {
						this.ballInfos = [];
						this.shapeInfos = [];
						this.addSoft();
						for (let i = 0; i < this.controls.shape.count; i++) {
							this.getTimeout(i * 500).then(() => {
								this.addShape();
							});
						}
					},
				},
			},
			[
				{
					name: 'gravity',
					type: 'folder',
					control: 'gravity',
					children: [
						{
							name: 'x',
							type: 'number',
							min: -10,
							max: 10,
							step: 0.1,
							listen: true,
						},
						{
							name: 'y',
							type: 'number',
							min: -10,
							max: 10,
							step: 0.1,
							listen: true,
						},
						{
							name: 'z',
							type: 'number',
							min: -10,
							max: 10,
							step: 0.1,
							listen: true,
						},
						{ name: 'reset', title: 'gravity reset', type: 'button' },
					],
				},
				{
					name: 'shape',
					type: 'folder',
					control: 'shape',
					children: [
						{
							name: 'count',
							title: 'count',
							type: 'number',
							min: 1,
							max: 50,
							step: 1,
						},
						{
							name: 'minMass',
							title: 'min Mass',
							type: 'number',
							min: 0,
							max: 20,
							step: 1,
						},
						{
							name: 'maxMass',
							title: 'max Mass',
							type: 'number',
							min: 0,
							max: 30,
							step: 1,
						},
						{
							name: 'minSize',
							title: 'min Size',
							type: 'number',
							min: 1,
							max: 5,
							step: 0.1,
						},
						{
							name: 'maxSize',
							title: 'max Size',
							type: 'number',
							min: 2,
							max: 10,
							step: 0.1,
						},
						{
							name: 'breakable',
							type: 'checkbox',
						},

						{ name: 'reset', title: 'shape reset', type: 'button' },
						{
							name: 'softSphere',
							type: 'checkbox',
							change: () => {
								this.addSoft();
							},
						},
						{
							name: 'softBox',
							type: 'checkbox',
							change: () => {
								this.addSoft();
							},
						},
					],
				},
			],
			true,
			false
		);
	}

	ngOnInit() {
		this.controls.shape.reset();
	}

	addShape() {
		const objectType = Math.ceil(Math.random() * 4);
		const objectSize =
			(this.controls.shape.maxSize - this.controls.shape.minSize) *
				Math.random() +
			this.controls.shape.minSize;
		const terrainWidth = 128;
		const terrainMaxHeight = 8;
		const terrainDepth = 128;
		const breakable = this.controls.shape.breakable;
		const margin = 0.05;
		const x = (Math.random() - 0.5) * terrainWidth * 0.6;
		const y = terrainMaxHeight + objectSize + 2;
		const z = (Math.random() - 0.5) * terrainDepth * 0.6;
		const color = Math.random() * 0xffffff;
		const mass =
			(this.controls.shape.maxMass - this.controls.shape.minMass) *
				Math.random() +
			this.controls.shape.minMass;
		switch (objectType) {
			case 1:
				{
					const radius = objectSize / 2;
					this.shapeInfos.push({
						x: x,
						y: y,
						z: z,
						type: 'SphereGeometry',
						radius: radius,
						widthSegments: 20,
						heightSegments: 20,
						color: color,
						mass: mass,
						breakable: breakable,
					});
				}
				break;
			case 2:
				{
					const sx = objectSize;
					const sy = objectSize;
					const sz = objectSize;
					this.shapeInfos.push({
						x: x,
						y: y,
						z: z,
						type: 'BoxGeometry',
						width: sx,
						height: sy,
						depth: sz,
						widthSegments: 1,
						heightSegments: 1,
						depthSegments: 1,
						color: color,
						mass: mass,
						breakable: breakable,
					});
				}
				break;
			case 3:
				{
					const radius = objectSize / 2;
					const height = objectSize;
					this.shapeInfos.push({
						x: x,
						y: y,
						z: z,
						type: 'CylinderGeometry',
						radiusTop: radius,
						radiusBottom: radius,
						height: height,
						radialSegments: 20,
						heightSegments: 1,
						color: color,
						mass: mass,
						breakable: breakable,
					});
				}
				break;
			default:
				{
					const radius = objectSize / 2;
					const height = objectSize;
					this.shapeInfos.push({
						x: x,
						y: y,
						z: z,
						type: 'ConeGeometry',
						radius: radius,
						height: height,
						radialSegments: 20,
						heightSegments: 2,
						color: color,
						mass: mass,
						breakable: breakable,
					});
				}
				break;
		}
	}

	shapeInfos: {
		x: number;
		y: number;
		z: number;
		type: string;
		radius?: number;
		width?: number;
		height?: number;
		depth?: number;
		radiusTop?: number;
		radiusBottom?: number;
		radialSegments?: number;
		widthSegments?: number;
		heightSegments?: number;
		depthSegments?: number;
		color: number;
		mass: number;
		breakable: boolean;
	}[] = [];

	ballInfos: {
		x: number;
		y: number;
		z: number;
		vx: number;
		vy: number;
		vz: number;
	}[] = [];

	addSoft() {
		this.softSphere = null;
		this.softBox = null;
		this.getTimeout(2000).then(() => {
			if (this.controls.shape.softSphere) {
				this.softSphere = {
					x: -5 + Math.random() * 10,
					y: 25 + Math.random() * 5,
					z: -5 + Math.random() * 10,
				};
			}
			if (this.controls.shape.softBox) {
				this.softBox = {
					x: -5 + Math.random() * 10,
					y: 15 + Math.random() * 5,
					z: -5 + Math.random() * 10,
				};
			}
		});
	}

	softSphere: {
		x: number;
		y: number;
		z: number;
	} = null;

	softBox: {
		x: number;
		y: number;
		z: number;
	} = null;

	onMouseClick(event: IRendererEvent) {
		switch (event.type) {
			case 'pointerdown':
				if (this.camera !== null) {
					const raycaster = this.camera.getRaycaster(event.mouse);
					if (this.ballInfos.length > 10) {
						this.ballInfos.shift();
					}
					this.ballInfos.push({
						x: raycaster.ray.direction.x + raycaster.ray.origin.x,
						y: raycaster.ray.direction.y + raycaster.ray.origin.y,
						z: raycaster.ray.direction.z + raycaster.ray.origin.z,
						vx: raycaster.ray.direction.x * 24,
						vy: raycaster.ray.direction.y * 24,
						vz: raycaster.ray.direction.z * 24,
					});
				}
				break;
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
	}
}
