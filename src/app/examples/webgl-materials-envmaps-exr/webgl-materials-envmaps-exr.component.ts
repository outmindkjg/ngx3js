import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-envmaps-exr',
	templateUrl: './webgl-materials-envmaps-exr.component.html',
	styleUrls: ['./webgl-materials-envmaps-exr.component.scss'],
})
export class WebglMaterialsEnvmapsExrComponent extends BaseComponent<{
	envMap: string;
	roughness: number;
	metalness: number;
	exposure: number;
	debug: boolean;
}> {
	constructor() {
		super(
			{
				envMap: 'EXR',
				roughness: 0.0,
				metalness: 0.0,
				exposure: 1.0,
				debug: false,
			},
			[
				{ name: 'envMap', type: 'select', select: ['EXR', 'PNG'] },
				{ name: 'roughness', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'metalness', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'exposure', type: 'number', min: 0, max: 2, step: 0.01 },
				{ name: 'debug', type: 'checkbox' },
			]
		);
	}
}
