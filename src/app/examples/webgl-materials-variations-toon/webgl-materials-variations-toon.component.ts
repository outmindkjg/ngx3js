import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-variations-toon',
	templateUrl: './webgl-materials-variations-toon.component.html',
	styleUrls: ['./webgl-materials-variations-toon.component.scss'],
})
export class WebglMaterialsVariationsToonComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const numberOfSphersPerSide = 5;
		const stepSize = 1.0 / numberOfSphersPerSide;
		this.sphereInfos = [];
		let index = 0;
		for (
			let alpha = 0, alphaIndex = 0;
			alpha <= 1.0;
			alpha += stepSize, alphaIndex++
		) {
			const colors = new Uint8Array(alphaIndex + 2);
			for (let c = 0; c <= colors.length; c++) {
				colors[c] = (c / colors.length) * 256;
			}
			for (let beta = 0; beta <= 1.0; beta += stepSize) {
				for (let gamma = 0; gamma <= 1.0; gamma += stepSize) {
					const diffuseColor = new THREE.Color()
						.setHSL(alpha, 0.5, gamma * 0.5 + 0.1)
						.multiplyScalar(1 - beta * 0.2);
					this.sphereInfos.push({
						color: diffuseColor.getHex(),
						dataColors: colors,
						x: alpha * 400 - 200,
						y: beta * 400 - 200,
						z: gamma * 400 - 200,
					});
					index++;
				}
			}
		}
		this.labelInfos = [];
		this.labelInfos.push({
			text: '+gradientMap',
			x: -350,
			y: 0,
			z: 0,
		});
		this.labelInfos.push({
			text: '-gradientMap',
			x: 350,
			y: 0,
			z: 0,
		});
		this.labelInfos.push({
			text: '+diffuse',
			x: 0,
			y: 0,
			z: -300,
		});
		this.labelInfos.push({
			text: '-diffuse',
			x: 0,
			y: 0,
			z: 300,
		});
	}

	sphereInfos: {
		color: number;
		dataColors: Uint8Array;
		x: number;
		y: number;
		z: number;
	}[] = [];

	labelInfos: {
		text: string;
		x: number;
		y: number;
		z: number;
	}[] = [];

	setPointLight(mesh: MeshComponent) {
		this.pointLight = mesh.getObject3d();
	}

	pointLight: THREE.Object3D = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.pointLight !== null) {
			const time = timer.elapsedTime * 0.25;
			const particleLight = this.pointLight;
			particleLight.position.x = Math.sin(time * 7) * 300;
			particleLight.position.y = Math.cos(time * 5) * 400;
			particleLight.position.z = Math.cos(time * 3) * 300;
		}
	}
}
