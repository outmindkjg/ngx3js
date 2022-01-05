import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent, NgxPhysicsComponent, NgxRigidbodyComponent,
	NgxThreeUtil, IRendererTimer, THREE
} from 'ngx3js';


@Component({
	selector: 'app-physics-ammo-instancing',
	templateUrl: './physics-ammo-instancing.component.html',
	styleUrls: ['./physics-ammo-instancing.component.scss'],
})
export class PhysicsAmmoInstancingComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	makeMatrix(mat: I3JS.Matrix4) {
		mat.setPosition(
			Math.random() - 0.5,
			Math.random() * 2,
			Math.random() - 0.5
		);
	}

	makeColor(color: I3JS.Color) {
		color.setHex(0xffffff * Math.random());
	}

	setPhysics(physics: NgxPhysicsComponent) {
		this.physics = physics.getPhysics();
	}

	physics: any = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (
			this.physics !== null &&
			this.meshChildren !== null &&
			this.meshChildren.length > 0
		) {
			const position = new THREE.Vector3();
			this.meshChildren.forEach((child: any) => {
				const rigidbodyComponent: NgxRigidbodyComponent =
					NgxThreeUtil.getRigidbodyComponent(child);
				if (rigidbodyComponent !== null) {
					for (let i = 0; i < 5; i++) {
						let index = Math.min(
							child.count - 1,
							Math.floor(Math.random() * child.count)
						);
						position.set(
							Math.random() * 0.2,
							Math.random() + 1,
							Math.random() * 0.2
						);
						try {
							rigidbodyComponent.setPosition(
								position.x,
								position.y,
								position.z,
								index
							);
						} catch (ex) {}
					}
				}
			});
		}
	}
}
