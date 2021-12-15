import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-ballshooter',
	templateUrl: './webxr-vr-ballshooter.component.html',
	styleUrls: ['./webxr-vr-ballshooter.component.scss'],
})
export class WebxrVrBallshooterComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.icosahedronInfos = [];
		for (let i = 0; i < 200; i++) {
			this.icosahedronInfos.push({
				color: Math.random() * 0xffffff,
				x: Math.random() * 4 - 2,
				y: Math.random() * 4,
				z: Math.random() * 4 - 2,
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
		x: number;
		y: number;
		z: number;
		velocity: I3JS.Vector3;
	}[] = [];

	normal = new THREE.Vector3();
	relativeVelocity = new THREE.Vector3();

	onRender(timer: IRendererTimer) {
		if (this.meshChildren !== null && this.meshChildren.length > 0) {
			const delta = timer.delta * 0.8; // slow down simulation
			const radius = 0.08;
			const range = 3 - radius;
			let normal = this.normal;
			const relativeVelocity = this.relativeVelocity;
			this.meshChildren.forEach((object) => {
				object.position.x += object.userData.velocity.x * delta;
				object.position.y += object.userData.velocity.y * delta;
				object.position.z += object.userData.velocity.z * delta;
				// keep objects inside room

				if (object.position.x < -range || object.position.x > range) {
					object.position.x = THREE.MathUtils.clamp(
						object.position.x,
						-range,
						range
					);
					object.userData.velocity.x = -object.userData.velocity.x;
				}

				if (object.position.y < radius || object.position.y > 6) {
					object.position.y = Math.max(object.position.y, radius);

					object.userData.velocity.x *= 0.98;
					object.userData.velocity.y = -object.userData.velocity.y * 0.8;
					object.userData.velocity.z *= 0.98;
				}

				if (object.position.z < -range || object.position.z > range) {
					object.position.z = THREE.MathUtils.clamp(
						object.position.z,
						-range,
						range
					);
					object.userData.velocity.z = -object.userData.velocity.z;
				}
				this.meshChildren.forEach((object2) => {
					normal.copy(object.position).sub(object2.position);

					const distance = normal.length();

					if (distance < 2 * radius) {
						normal.multiplyScalar(0.5 * distance - radius);

						object.position.sub(normal);
						object2.position.add(normal);

						normal.normalize();

						relativeVelocity
							.copy(object.userData.velocity)
							.sub(object2.userData.velocity);

						normal = normal.multiplyScalar(relativeVelocity.dot(normal));

						object.userData.velocity.sub(normal);
						object2.userData.velocity.add(normal);
					}
				});

				object.userData.velocity.y -= 9.8 * delta;
			});
		}
	}
}
