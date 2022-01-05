import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-variations-basic',
	templateUrl: './webgl-materials-variations-basic.component.html',
	styleUrls: ['./webgl-materials-variations-basic.component.scss'],
})
export class WebglMaterialsVariationsBasicComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		const numberOfSphersPerSide = 5;
		const stepSize = 1.0 / numberOfSphersPerSide;
		this.sphereInfos = [];
		for (let alpha = 0; alpha <= 1.0; alpha += stepSize) {
			for (let beta = 0; beta <= 1.0; beta += stepSize) {
				for (let gamma = 0; gamma <= 1.0; gamma += stepSize) {
					// basic monochromatic energy preservation
					const diffuseColor = new THREE.Color().setHSL(
						alpha,
						0.5,
						gamma * 0.5 + 0.1
					);
					this.sphereInfos.push({
						color: diffuseColor.getHex(),
						reflectivity: beta,
						envMap: alpha < 0.5 ? true : false,
						x: alpha * 400 - 200,
						y: beta * 400 - 200,
						z: gamma * 400 - 200,
					});
				}
			}
		}
		this.labelInfos = [];
		this.labelInfos.push({
			text: '+hue',
			x: -350,
			y: 0,
			z: 0,
		});
		this.labelInfos.push({
			text: '-hue',
			x: 350,
			y: 0,
			z: 0,
		});
		this.labelInfos.push({
			text: '-reflectivity',
			x: 0,
			y: -300,
			z: 0,
		});
		this.labelInfos.push({
			text: '+reflectivity',
			x: 0,
			y: 300,
			z: 0,
		});
		this.labelInfos.push({
			text: '-diffuse',
			x: 0,
			y: 0,
			z: -300,
		});
		this.labelInfos.push({
			text: '+diffuse',
			x: 0,
			y: 0,
			z: 300,
		});
		this.labelInfos.push({
			text: 'envMap',
			x: -350,
			y: 300,
			z: 0,
		});
		this.labelInfos.push({
			text: 'no envMap',
			x: 350,
			y: 300,
			z: 0,
		});
	}

	sphereInfos: {
		color: number;
		reflectivity: number;
		envMap: boolean;
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

	setPointLight(mesh: NgxMeshComponent) {
		this.pointLight = mesh.getObject3d();
	}

	pointLight: I3JS.Object3D = null;

	onRender(timer: IRendererTimer) {
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
