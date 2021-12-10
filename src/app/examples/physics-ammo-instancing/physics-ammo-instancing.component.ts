import { Component } from '@angular/core';
import {
	BaseComponent, I3JS, N3js, PhysicsComponent,
	RendererTimer,
	RigidbodyComponent,
	ThreeUtil
} from 'ngx3js';


@Component({
	selector: 'app-physics-ammo-instancing',
	templateUrl: './physics-ammo-instancing.component.html',
	styleUrls: ['./physics-ammo-instancing.component.scss'],
})
export class PhysicsAmmoInstancingComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	makeMatrix(mat: I3JS.IMatrix4) {
		mat.setPosition(
			Math.random() - 0.5,
			Math.random() * 2,
			Math.random() - 0.5
		);
	}

	makeColor(color: I3JS.IColor) {
		color.setHex(0xffffff * Math.random());
	}

	setPhysics(physics: PhysicsComponent) {
		this.physics = physics.getPhysics();
	}

	physics: any = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (
			this.physics !== null &&
			this.meshChildren !== null &&
			this.meshChildren.length > 0
		) {
			const position = N3js.getVector3();
			this.meshChildren.forEach((child: any) => {
				const rigidbodyComponent: RigidbodyComponent =
					ThreeUtil.getRigidbodyComponent(child);
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
