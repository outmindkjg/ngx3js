import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-gpgpu-water',
	templateUrl: './webgl-gpgpu-water.component.html',
	styleUrls: ['./webgl-gpgpu-water.component.scss'],
})
export class WebglGpgpuWaterComponent extends NgxBaseComponent<{
	mouseSize: number;
	viscosity: number;
	spheresEnabled: boolean;
	smoothWater: () => void;
}> {
	constructor() {
		super(
			{
				mouseSize: 20.0,
				viscosity: 0.98,
				spheresEnabled: true,
				smoothWater: () => {},
			},
			[
				{ name: 'mouseSize', type: 'number', min: 1.0, max: 100.0, step: 1.0 },
				{
					name: 'viscosity',
					type: 'number',
					min: 0.9,
					max: 0.99999,
					step: 0.001,
				},
				{ name: 'spheresEnabled', type: 'checkbox' },
				{ name: 'smoothWater', type: 'button' },
			]
			,false , false);
	}
}
