import { Component } from '@angular/core';
import { BaseComponent, RendererTimer, THREE, ThreeUtil } from 'ngx3js';

@Component({
	selector: 'app-webgl-lightningstrike',
	templateUrl: './webgl-lightningstrike.component.html',
	styleUrls: ['./webgl-lightningstrike.component.scss'],
})
export class WebglLightningstrikeComponent extends BaseComponent<{
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
				scene: 'ball',
				timeRate: 1,
				outlineEnabled: true,
				lightningColor: 0xffffff,
				outlineColor: 0xffffff,
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
							change : () => {
								this.changeScene();
							}
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
						{ name: 'lightningColor', type: 'color', title: 'Color' },
						{ name: 'outlineColor', type: 'color', title: 'Glow color' },
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
						},
						{
							name: 'roughness',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Roughness',
						},
						{
							name: 'radius0',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Initial radius',
						},
						{
							name: 'radius1',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Final radius',
						},
						{
							name: 'radius0Factor',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Subray initial radius',
						},
						{
							name: 'radius1Factor',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Subray final radius',
						},
						{
							name: 'timeScale',
							type: 'number',
							min: 0,
							max: 5,
							title: 'Ray time scale',
						},
						{
							name: 'subrayPeriod',
							type: 'number',
							min: 0.1,
							max: 10,
							title: 'Subray period (s)',
						},
						{
							name: 'subrayDutyCycle',
							type: 'number',
							min: 0,
							max: 1,
							title: 'Subray duty cycle',
						},
					],
				},
			]
		);
	}

	ngOnInit() {
		this.changeScene();
	}

	changeScene() {
		switch (this.controls.scene) {
			case 'ball':
				this.sceneBackground = '0x454545';
				this.sceneCamera = { x: 1000, y: 600, z: 1200 };
				this.sceneCameraLookat = { x: 0, y: 300, z: 0 };
				this.sourceOffset.x = 0;
				this.sourceOffset.y = 300;
				this.sourceOffset.z = 0;
				this.destOffset.x = 0;
				this.destOffset.y = 300 + 200;
				this.destOffset.z = 0;
				const vec1 = new THREE.Vector3();
				const vec2 = new THREE.Vector3();
				const rayDirection = new THREE.Vector3();
				let rayLength = 0;
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
					onSubrayCreation : ( segment, parentSubray, childSubray, lightningStrike ) => {
						lightningStrike.subrayConePosition( segment, parentSubray, childSubray, 0.6, 0.9, 0.7 );
						// THREE.Sphere projection
						vec1.subVectors( childSubray.pos1, lightningStrike.rayParameters.sourceOffset );
						vec2.set( 0, 0, 0 );
						if ( lightningStrike.randomGenerator.random() < 0.7 ) {
							vec2.copy( rayDirection ).multiplyScalar( rayLength * 1.0865 );
						}
						vec1.add( vec2 ).setLength( rayLength );
						childSubray.pos1.addVectors( vec1, lightningStrike.rayParameters.sourceOffset );
					}
				}
				break;
			case 'storm':
				this.sceneBackground = '0x454545';
				this.sceneCamera = { x: 1000, y: 800, z: 3600 };
				this.sceneCameraLookat = { x: 0, y: 600, z: 0 };
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
					straightness: 0.6
				}
				break;
		}
	}

	rayParams : any = {}

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

	sourceOffset: THREE.Vector3 = new THREE.Vector3();
	destOffset: THREE.Vector3 = new THREE.Vector3();

	currentTime: number = 0;
	onRender(timer: RendererTimer) {
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
							ThreeUtil.isNotNull(coneMesh1) &&
							ThreeUtil.isNotNull(coneMesh2)
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
							const lightningStrike =
								this.meshObject3d.getObjectByName('lightningStrike');
							if (ThreeUtil.isNotNull(lightningStrike)) {
								this.sourceOffset.copy(coneMesh1.position);
								this.sourceOffset.y -= coneHeightHalf;
								this.destOffset.copy(coneMesh2.position);
								this.destOffset.y += coneHeightHalf;
								const lightningStrikeGeometry = (lightningStrike as any)
									.geometry;
								lightningStrikeGeometry.update(time);
								const posLight = this.meshObject3d.getObjectByName('posLight');
								if (ThreeUtil.isNotNull(posLight)) {
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
				case 'ball' :
					const lightningStrike =
					this.meshObject3d.getObjectByName('lightningStrike');
					if (ThreeUtil.isNotNull(lightningStrike)) {
						const lightningStrikeGeometry = (lightningStrike as any)
							.geometry;
						lightningStrikeGeometry.update(time);
					}
					break;
			}
		}
	}
}
