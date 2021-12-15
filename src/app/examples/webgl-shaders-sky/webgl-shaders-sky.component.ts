import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-shaders-sky',
	templateUrl: './webgl-shaders-sky.component.html',
	styleUrls: ['./webgl-shaders-sky.component.scss'],
})
export class WebglShadersSkyComponent extends NgxBaseComponent<{
	turbidity: number;
	rayleigh: number;
	mieCoefficient: number;
	mieDirectionalG: number;
	inclination: number;
	azimuth: number;
	exposure: number;
}> {
	constructor() {
		super(
			{
				turbidity: 10,
				rayleigh: 3,
				mieCoefficient: 0.005,
				mieDirectionalG: 0.7,
				inclination: 0.49, // elevation / inclination
				azimuth: 0.25, // Facing front,
				exposure: 0.5,
			},
			[
				{ name: 'turbidity', type: 'number', min: 0.0, max: 20.0, step: 0.1 },
				{ name: 'rayleigh', type: 'number', min: 0.0, max: 4, step: 0.001 },
				{
					name: 'mieCoefficient',
					type: 'number',
					min: 0.0,
					max: 0.1,
					step: 0.001,
				},
				{
					name: 'mieDirectionalG',
					type: 'number',
					min: 0.0,
					max: 1,
					step: 0.001,
				},
				{
					name: 'inclination',
					type: 'number',
					min: 0.0,
					max: 1,
					step: 0.0001,
					finishChange: () => {
						this.updateSun();
					},
				},
				{
					name: 'azimuth',
					type: 'number',
					min: 0.0,
					max: 1,
					step: 0.0001,
					finishChange: () => {
						this.updateSun();
					},
				},
				{
					name: 'exposure',
					type: 'number',
					min: 0.0,
					max: 1,
					step: 0.0001,
					finishChange: () => {
						if (this.renderer !== null) {
							const renderer =
								this.renderer.getRenderer() as any ;
							renderer.toneMappingExposure = this.controls.exposure;
						}
					},
				},
			]
		);
	}

	ngOnInit() {
		this.updateSun();
	}

	updateSun() {
		const theta = Math.PI * (this.controls.inclination - 0.5);
		const phi = 2 * Math.PI * (this.controls.azimuth - 0.5);
		this.sunDirection = [
			Math.cos(phi),
			Math.sin(phi) * Math.sin(theta),
			Math.sin(phi) * Math.cos(theta),
		];
	}

	sunDirection: number[] = [];
}
