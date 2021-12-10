import { Component } from '@angular/core';
import { BaseComponent, CSS3DSprite, N3js, RendererTimer } from 'ngx3js';
@Component({
	selector: 'app-css3d-sprites',
	templateUrl: './css3d-sprites.component.html',
	styleUrls: ['./css3d-sprites.component.scss'],
})
export class Css3dSpritesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	particlesTotal: number = 512;
	ngOnInit() {
		this.particlesInfos = [];
		const particlesTotal = this.particlesTotal;
		for (let i = 0; i < particlesTotal; i++) {
			this.particlesInfos.push({
				x: Math.random() * 4000 - 2000,
				y: Math.random() * 4000 - 2000,
				z: Math.random() * 4000 - 2000,
				duration: 2 + Math.random() * 2,
			});
		}
		const amountX = 16;
		const amountZ = 32;
		const separationPlane = 150;
		const offsetX = ((amountX - 1) * separationPlane) / 2;
		const offsetZ = ((amountZ - 1) * separationPlane) / 2;
		const positions = [];
		for (let i = 0; i < particlesTotal; i++) {
			const x = (i % amountX) * separationPlane;
			const z = Math.floor(i / amountX) * separationPlane;
			const y = (Math.sin(x * 0.5) + Math.sin(z * 0.5)) * 200;
			positions.push(x - offsetX, y, z - offsetZ);
		}

		const amount = 8;
		const separationCube = 150;
		const offset = ((amount - 1) * separationCube) / 2;
		for (let i = 0; i < particlesTotal; i++) {
			const x = (i % amount) * separationCube;
			const y = Math.floor((i / amount) % amount) * separationCube;
			const z = Math.floor(i / (amount * amount)) * separationCube;
			positions.push(x - offset, y - offset, z - offset);
		}
		for (let i = 0; i < particlesTotal; i++) {
			positions.push(
				Math.random() * 4000 - 2000,
				Math.random() * 4000 - 2000,
				Math.random() * 4000 - 2000
			);
		}

		const radius = 750;
		for (let i = 0; i < particlesTotal; i++) {
			const phi = Math.acos(-1 + (2 * i) / particlesTotal);
			const theta = Math.sqrt(particlesTotal * Math.PI) * phi;
			positions.push(
				radius * Math.cos(theta) * Math.sin(phi),
				radius * Math.sin(theta) * Math.sin(phi),
				radius * Math.cos(phi)
			);
		}
		this.positions = positions;
		setTimeout(() => {
			this.transition();
		}, 1000);
	}

	positions: number[] = [];

	particlesInfos: {
		x: number;
		y: number;
		z: number;
		duration: number;
	}[] = [];

	current = 0;

	transition() {
		const particlesTotal = this.particlesTotal;
		if (this.meshChildren && this.meshChildren.length >= particlesTotal) {
			const offset = this.current * particlesTotal * 3;
			const positions = this.positions;
			const particlesObject = [];
			this.meshChildren.forEach((child) => {
				if (child instanceof CSS3DSprite) {
					particlesObject.push(child);
				}
			});
			if (particlesObject.length >= particlesTotal) {
				for (let i = 0, j = offset; i < particlesTotal; i++, j += 3) {
					const object = particlesObject[i];
					object.userData.tween = {
						elapsedTime: 0,
						elapsedAlpha: 0,
						position: N3js.getVector3(
							positions[j],
							positions[j + 1],
							positions[j + 2]
						),
					};
				}
				this.current = (this.current + 1) % 4;
			}
		}

		setTimeout(() => {
			this.transition();
		}, 6000);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshChildren && this.meshChildren.length > 0) {
			const time = timer.elapsedTime;
			this.meshChildren.forEach((object) => {
				const scale =
					Math.sin((Math.floor(object.position.x) + time) * 0.002) * 0.3 + 1;
				object.scale.set(scale, scale, scale);
			});
		}
	}
}
