import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-shading-physical',
	templateUrl: './webgl-shading-physical.component.html',
	styleUrls: ['./webgl-shading-physical.component.scss'],
})
export class WebglShadingPhysicalComponent extends BaseComponent<{
	shadowCameraVisible: boolean;
	shadowCameraNear: number;
	shadowCameraFar: number;
	shadowBias: number;
}> {
	constructor() {
		super(
			{
				shadowCameraVisible: false,
				shadowCameraNear: 750,
				shadowCameraFar: 4000,
				shadowBias: -0.0002,
			},
			[
				{ name: 'shadowCameraVisible', type: 'checkbox' },
				{ name: 'shadowCameraNear', type: 'number', min: 1, max: 1500 },
				{ name: 'shadowCameraFar', type: 'number', min: 1501, max: 5000 },
				{ name: 'shadowBias', type: 'number', min: -0.01, max: 0.01 },
			]
		);
	}
}
