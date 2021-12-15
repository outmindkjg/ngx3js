import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent, NgxMeshComponent, NgxThreeUtil, IRendererEvent,
	IRendererTimer, THREE
} from 'ngx3js';


@Component({
	selector: 'app-webgl-lightningstrike',
	templateUrl: './webgl-lightningstrike.component.html',
	styleUrls: ['./webgl-lightningstrike.component.scss'],
})
export class WebglLightningstrikeComponent extends NgxBaseComponent<{
	scene: string;
	timeRate: number;
	outlineEnabled: boolean;
	lightningColor: number;
	outlineColor: number;
	straightness: number;
	roughness: number;
	radius0: number;
	radius1: number;
	radius0Factor: number;
	radius1Factor: number;
	timeScale: number;
	subrayPeriod: number;
	subrayDutyCycle: number;
}> {
	constructor() {
		super(
			{
				scene: 'storm',
				timeRate: 1,
				outlineEnabled: true,
				lightningColor: 0xb0ffff,
				outlineColor: 0x00ffff,
				straightness: 1,
				roughness: 1,
				radius0: 1,
				radius1: 1,
				radius0Factor: 1,
				radius1Factor: 1,
				timeScale: 1,
				subrayPeriod: 1,
				subrayDutyCycle: 1,
			},
			[
				{
					name: 'Scene',
					type: 'folder',
					isOpen: true,
					children: [
						{
							name: 'scene',
							type: 'select',
							select: {
								'Electric Cones': 'cones',
								'Plasma Ball': 'ball',
								Storm: 'storm',
							},
							change: () => {
								this.changeScene();
							},
						},
						{
							name: 'timeRate',
							type: 'number',
							min: -1,
							max: 1,
							step: 0.01,
							title: 'Time rate',
						},
					],
				},
				{
					name: 'Graphics',
					type: 'folder',
					isOpen: true,
					children: [
						{ name: 'outlineEnabled', type: 'checkbox', title: 'Glow enabled' },
						{
							name: 'lightningColor',
							type: 'color',
							title: 'Color',
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'outlineColor',
							type: 'color',
							title: 'Glow color',
							change: () => {
								this.updateRayParams();
							},
						},
					],
				},
				{
					name: 'Ray parameters',
					type: 'folder',
					isOpen: true,
					children: [
						{
							name: 'straightness',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Straightness',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'roughness',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Roughness',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'radius0',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Initial radius',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'radius1',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Final radius',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'radius0Factor',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Subray initial radius',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'radius1Factor',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Subray final radius',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'timeScale',
							type: 'number',
							min: 0,
							max: 5,
							title: 'Ray time scale',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'subrayPeriod',
							type: 'number',
							min: 0.1,
							max: 10,
							title: 'Subray period (s)',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
						{
							name: 'subrayDutyCycle',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Subray duty cycle',
							listen: true,
							change: () => {
								this.updateRayParams();
							},
						},
					],
				},
			]
		);
	}

	ngOnInit() {
		const starVertices = [];
		const prevPoint = new THREE.Vector3(0, 0, 1);
		const currPoint = new THREE.Vector3();
		for (let i = 1; i <= 16; i++) {
			currPoint.set(
				Math.sin((2 * Math.PI * i) / 16),
				0,
				Math.cos((2 * Math.PI * i) / 16)
			);
			if (i % 2 === 1) {
				currPoint.multiplyScalar(0.3);
			}
			starVertices.push(0, 0, 0);
			starVertices.push(prevPoint.x, prevPoint.y, prevPoint.z);
			starVertices.push(currPoint.x, currPoint.y, currPoint.z);
			prevPoint.copy(currPoint);
		}
		this.starVertices = starVertices;
		this.changeScene();
	}

	starVertices: any[] = [];
	starMesh: I3JS.Mesh = null;
	setStarMesh(mesh: NgxMeshComponent) {
		this.starMesh = mesh.getMesh() as any;
	}

	onMouseClick(e: IRendererEvent) {
		switch (this.controls.scene) {
			case 'ball':
				switch (e.type) {
					case 'click':
						if (this.camera !== null) {
							const raycaster = this.camera.getRaycaster(e.mouse);
							const result = raycaster.ray.intersectSphere(
								this.sphere,
								this.intersection
							);
							if (result !== null) {
								this.sourceOffset.copy(this.intersection);
							}
						}
						break;
					default:
						console.log(e.type);
						break;
				}
				break;
		}
	}

	private intersection = new THREE.Vector3();
	private sphere = new THREE.Sphere(new THREE.Vector3(0, 300), 200);

	changeScene() {
		const vec1 = new THREE.Vector3();
		const vec2 = new THREE.Vector3();
		const rayDirection = new THREE.Vector3();
		let rayLength = 0;
		switch (this.controls.scene) {
			case 'ball':
				this.sceneBackground = '0x454545';
				this.sceneCamera = { x: 1000, y: 600, z: 1200 };
				this.sceneCameraLookat = { x: 0, y: 300, z: 0 };
				this.sourceOffset.x = 0;
				this.sourceOffset.y = 300 + 200;
				this.sourceOffset.z = 0;
				this.destOffset.x = 0;
				this.destOffset.y = 300;
				this.destOffset.z = 0;
				this.rayParams = {
					sourceOffset: this.sourceOffset,
					destOffset: this.destOffset,
					radius0: 4,
					radius1: 4,
					radius0Factor: 0.82,
					minRadius: 2.5,
					maxIterations: 6,
					isEternal: true,
					timeScale: 0.6,
					propagationTimeFactor: 0.15,
					vanishingTimeFactor: 0.87,
					subrayPeriod: 0.8,
					ramification: 5,
					recursionProbability: 0.8,
					roughness: 0.85,
					straightness: 0.7,
					onSubrayCreation: (
						segment,
						parentSubray,
						childSubray,
						lightningStrike
					) => {
						lightningStrike.subrayConePosition(
							segment,
							parentSubray,
							childSubray,
							0.6,
							0.9,
							0.7
						);
						vec1.subVectors(
							childSubray.pos1,
							lightningStrike.rayParameters.sourceOffset
						);
						vec2.set(0, 0, 0);
						if (lightningStrike.randomGenerator.random() < 0.7) {
							vec2.copy(rayDirection).multiplyScalar(rayLength * 1.0865);
						}
						vec1.add(vec2).setLength(rayLength);
						childSubray.pos1.addVectors(
							vec1,
							lightningStrike.rayParameters.sourceOffset
						);
					},
				};
				break;
			case 'storm':
				this.sceneBackground = '0x050505';
				this.sceneCamera = { x: 0, y: 100, z: 800 };
				this.sceneCameraLookat = { x: 0, y: 50, z: 0 };
				this.rayParams = {
					radius0: 1,
					radius1: 0.5,
					minRadius: 0.3,
					maxIterations: 7,
					timeScale: 0.15,
					propagationTimeFactor: 0.2,
					vanishingTimeFactor: 0.9,
					radius0Factor: 0.82,
					subrayPeriod: 4,
					subrayDutyCycle: 0.6,
					maxSubrayRecursion: 3,
					ramification: 3,
					recursionProbability: 0.4,
					roughness: 0.85,
					straightness: 0.65,
					onSubrayCreation: (
						segment,
						parentSubray,
						childSubray,
						lightningStrike
					) => {
						lightningStrike.subrayConePosition(
							segment,
							parentSubray,
							childSubray,
							0.6,
							0.6,
							0.5
						);
						// Plane projection
						rayLength = lightningStrike.rayParameters.sourceOffset.y;
						vec1.subVectors(
							childSubray.pos1,
							lightningStrike.rayParameters.sourceOffset
						);
						const proj = rayDirection.dot(vec1);
						vec2.copy(rayDirection).multiplyScalar(proj);
						vec1.sub(vec2);
						const scale = proj / rayLength > 0.5 ? rayLength / proj : 1;
						vec2.multiplyScalar(scale);
						vec1.add(vec2);
						childSubray.pos1.addVectors(
							vec1,
							lightningStrike.rayParameters.sourceOffset
						);
					},
				};
				break;
			case 'cones':
			default:
				this.sceneBackground = '0x050505';
				this.sceneCamera = { x: 1000, y: 800, z: 3600 };
				this.sceneCameraLookat = { x: 0, y: 600, z: 0 };
				this.rayParams = {
					sourceOffset: this.sourceOffset,
					destOffset: this.destOffset,
					radius0: 4,
					radius1: 4,
					minRadius: 2.5,
					maxIterations: 7,
					isEternal: true,
					timeScale: 0.7,
					propagationTimeFactor: 0.05,
					vanishingTimeFactor: 0.95,
					subrayPeriod: 3.5,
					subrayDutyCycle: 0.6,
					maxSubrayRecursion: 3,
					ramification: 7,
					recursionProbability: 0.6,
					roughness: 0.85,
					straightness: 0.6,
				};
				break;
		}
	}

	rayParams: any = {};

	sceneBackground: string = '0x050505';
	sceneCamera: { x: number; y: number; z: number } = {
		x: 1000,
		y: 800,
		z: 3600,
	};
	sceneCameraLookat: { x: number; y: number; z: number } = {
		x: 0,
		y: 600,
		z: 0,
	};

	sourceOffset: I3JS.Vector3 = new THREE.Vector3();
	destOffset: I3JS.Vector3 = new THREE.Vector3();

	currentTime: number = 0;

	stormParams = {
		size: 1000,
		minHeight: 90,
		maxHeight: 200,
		maxSlope: 0.6,
		maxLightnings: 8,
		onLightningDown: (lightning) => {
			if (this.starMesh !== null && this.meshObject3d) {
				// Add black star mark at ray strike
				const star1 = this.starMesh.clone();
				star1.position.copy(lightning.rayParameters.destOffset);
				star1.position.y = 0.05;
				star1.rotation.y = 2 * Math.PI * Math.random();
			}
		},
	};

	getLightningStrike(): any {
		if (this.meshObject3d !== null) {
			return this.meshObject3d.getObjectByName('lightningStrike') || null;
		} else {
			return null;
		}
	}

	updateRayParams() {
		const lightningStrike = this.getLightningStrike();
		if (lightningStrike !== null) {
			const material = lightningStrike.material;
			material.color = new THREE.Color(this.controls.lightningColor);
		} else {
			const storm = (this.meshObject3d.getObjectByName('storm') || null) as any;
			if (NgxThreeUtil.isNotNull(storm)) {
				const material = storm.lightningMaterial;
				material.color = new THREE.Color(this.controls.lightningColor);
			}
		}
		this.rayParams.straightness = this.controls.straightness;
		this.rayParams.roughness = this.controls.roughness;
		this.rayParams.radius0 = this.controls.radius0;
		this.rayParams.radius1 = this.controls.radius1;
		this.rayParams.radius0Factor = this.controls.radius0Factor;
		this.rayParams.radius1Factor = this.controls.radius1Factor;
		this.rayParams.timeScale = this.controls.timeScale;
		this.rayParams.subrayPeriod = this.controls.subrayPeriod;
		this.rayParams.subrayDutyCycle = this.controls.subrayDutyCycle;
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.controls.straightness = this.rayParams.straightness;
		this.controls.roughness = this.rayParams.roughness;
		this.controls.radius0 = this.rayParams.radius0;
		this.controls.radius1 = this.rayParams.radius1;
		this.controls.radius0Factor = this.rayParams.radius0Factor;
		this.controls.radius1Factor = this.rayParams.radius1Factor;
		this.controls.timeScale = this.rayParams.timeScale;
		this.controls.subrayPeriod = this.rayParams.subrayPeriod;
		this.controls.subrayDutyCycle = this.rayParams.subrayDutyCycle;
		this.updateRayParams();
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			this.currentTime += this.controls.timeRate * timer.delta;
			const time = this.currentTime;
			switch (this.controls.scene) {
				case 'cones':
					{
						const coneMesh1 = this.meshObject3d.getObjectByName('coneMesh1');
						const coneMesh2 = this.meshObject3d.getObjectByName('coneMesh2');
						const conesDistance = 1000;
						const coneHeight = 200;
						const coneHeightHalf = coneHeight * 0.5;
						if (
							NgxThreeUtil.isNotNull(coneMesh1) &&
							NgxThreeUtil.isNotNull(coneMesh2)
						) {
							coneMesh1.position.set(
								Math.sin(0.5 * time) * conesDistance * 0.6,
								conesDistance + coneHeight,
								Math.cos(0.5 * time) * conesDistance * 0.6
							);
							coneMesh2.position.set(
								Math.sin(0.9 * time) * conesDistance,
								coneHeightHalf,
								0
							);
							const lightningStrike = this.getLightningStrike();
							if (NgxThreeUtil.isNotNull(lightningStrike)) {
								this.sourceOffset.copy(coneMesh1.position);
								this.sourceOffset.y -= coneHeightHalf;
								this.destOffset.copy(coneMesh2.position);
								this.destOffset.y += coneHeightHalf;
								const lightningStrikeGeometry = (lightningStrike as any)
									.geometry;
								lightningStrikeGeometry.update(time);
								const posLight = this.meshObject3d.getObjectByName('posLight');
								if (NgxThreeUtil.isNotNull(posLight)) {
									posLight.position.lerpVectors(
										this.sourceOffset,
										this.destOffset,
										0.5
									);
								}
							}
						}
					}
					break;
				case 'ball':
					const lightningStrike = this.getLightningStrike();
					if (NgxThreeUtil.isNotNull(lightningStrike)) {
						const lightningStrikeGeometry = (lightningStrike as any).geometry;
						lightningStrikeGeometry.update(time);
					}
					break;
				case 'storm':
					const storm = (this.meshObject3d.getObjectByName('storm') ||
						null) as any;
					if (NgxThreeUtil.isNotNull(storm)) {
						storm.update(time);
					}
					break;
			}
		}
	}
}
