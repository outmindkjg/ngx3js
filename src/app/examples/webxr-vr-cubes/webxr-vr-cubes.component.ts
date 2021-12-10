import { Component } from '@angular/core';
import { BaseComponent, I3JS, THREE, RendererTimer } from 'ngx3js';
@Component({
	selector: 'app-webxr-vr-cubes',
	templateUrl: './webxr-vr-cubes.component.html',
	styleUrls: ['./webxr-vr-cubes.component.scss'],
})
export class WebxrVrCubesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.icosahedronInfos = [];
		for (let i = 0; i < 200; i++) {
			this.icosahedronInfos.push({
				color: Math.random() * 0xffffff,
				position: {
					x: Math.random() * 4 - 2,
					y: Math.random() * 4,
					z: Math.random() * 4 - 2,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
				scale: {
					x: Math.random() + 0.5,
					y: Math.random() + 0.5,
					z: Math.random() + 0.5,
				},
				velocity: new THREE.Vector3(
					Math.random() * 0.01 - 0.005,
					Math.random() * 0.01 - 0.005,
					Math.random() * 0.01 - 0.005
				),
			});
		}
	}

	icosahedronInfos: {
		color: number;
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
		velocity: I3JS.IVector3;
	}[] = [];

	normal = new THREE.Vector3();
	relativeVelocity = new THREE.Vector3();

	onRender(timer: RendererTimer) {
		if (this.meshChildren !== null && this.meshChildren.length > 0) {
			const delta = timer.delta * 60; // slow down simulation
			this.meshChildren.forEach((cube) => {
				cube.userData.velocity.multiplyScalar(1 - 0.001 * delta);
				cube.position.add(cube.userData.velocity);

				if (cube.position.x < -3 || cube.position.x > 3) {
					cube.position.x = THREE.MathUtils.clamp(cube.position.x, -3, 3);
					cube.userData.velocity.x = -cube.userData.velocity.x;
				}

				if (cube.position.y < 0 || cube.position.y > 6) {
					cube.position.y = THREE.MathUtils.clamp(cube.position.y, 0, 6);
					cube.userData.velocity.y = -cube.userData.velocity.y;
				}

				if (cube.position.z < -3 || cube.position.z > 3) {
					cube.position.z = THREE.MathUtils.clamp(cube.position.z, -3, 3);
					cube.userData.velocity.z = -cube.userData.velocity.z;
				}

				cube.rotation.x += cube.userData.velocity.x * 2 * delta;
				cube.rotation.y += cube.userData.velocity.y * 2 * delta;
				cube.rotation.z += cube.userData.velocity.z * 2 * delta;
			});
		}
	}
}
