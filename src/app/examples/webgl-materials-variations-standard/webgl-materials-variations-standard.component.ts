import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-variations-standard',
	templateUrl: './webgl-materials-variations-standard.component.html',
	styleUrls: ['./webgl-materials-variations-standard.component.scss'],
})
export class WebglMaterialsVariationsStandardComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const numberOfSphersPerSide = 5;
		const stepSize = 1.0 / numberOfSphersPerSide;
		this.sphereInfos = [];
		let index = 0;
		for (let alpha = 0; alpha <= 1.0; alpha += stepSize) {
			for (let beta = 0; beta <= 1.0; beta += stepSize) {
				for (let gamma = 0; gamma <= 1.0; gamma += stepSize) {
					this.sphereInfos.push({
						color: 'hsl(' + alpha + ',0.5,0.25)',
						metalness: beta,
						roughness: 1.0 - alpha,
						envMap: index % 2 == 1 ? true : false,
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
			text: '+roughness',
			x: -350,
			y: 0,
			z: 0,
		});
		this.labelInfos.push({
			text: '-roughness',
			x: 350,
			y: 0,
			z: 0,
		});
		this.labelInfos.push({
			text: '+metalness',
			x: 0,
			y: 300,
			z: 0,
		});
		this.labelInfos.push({
			text: '-metalness',
			x: 0,
			y: -300,
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
		color: string;
		metalness: number;
		roughness: number;
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

	setPointLight(mesh: MeshComponent) {
		this.pointLight = mesh.getObject3d();
	}

	pointLight: I3JS.IObject3D = null;

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
