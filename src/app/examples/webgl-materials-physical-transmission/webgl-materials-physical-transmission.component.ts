import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-physical-transmission',
	templateUrl: './webgl-materials-physical-transmission.component.html',
	styleUrls: ['./webgl-materials-physical-transmission.component.scss'],
})
export class WebglMaterialsPhysicalTransmissionComponent extends BaseComponent<{
	opacity: number;
	metalness: number;
	roughness: number;
	reflectivity: number;
	color: number;
	transmission: number;
	envMapIntensity: number;
	lightIntensity: number;
	exposure: number;
}> {
	constructor() {
		super(
			{
				opacity: 1,
				metalness: 0,
				roughness: 0,
				reflectivity: 0.5,
				color: 0xffffff,
				transmission: 0.9,
				envMapIntensity: 1,
				lightIntensity: 1,
				exposure: 1,
			},
			[
				{ name: 'color', type: 'color' },
				{ name: 'transmission', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'opacity', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'metalness', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'roughness', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'reflectivity', type: 'number', min: 0, max: 1, step: 0.01 },
				{
					name: 'envMapIntensity',
					title: 'envMap intensity',
					type: 'number',
					min: 0,
					max: 1,
				},
				{
					name: 'lightIntensity',
					title: 'light intensity',
					type: 'number',
					min: 0,
					max: 1,
				},
				{ name: 'exposure', type: 'number', min: 0, max: 1 },
			]
		);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshChildren !== null) {
			const t = timer.elapsedTime;
			this.meshChildren.forEach((child) => {
				child.rotation.x = t * 0.2;
				child.rotation.z = -t * 0.2;
			});
		}
	}
}
