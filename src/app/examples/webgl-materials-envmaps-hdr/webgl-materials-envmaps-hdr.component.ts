import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-envmaps-hdr',
	templateUrl: './webgl-materials-envmaps-hdr.component.html',
	styleUrls: ['./webgl-materials-envmaps-hdr.component.scss'],
})
export class WebglMaterialsEnvmapsHdrComponent extends BaseComponent<{
	envMap: string;
	roughness: number;
	metalness: number;
	exposure: number;
	debug: boolean;
}> {
	constructor() {
		super(
			{
				envMap: 'HDR',
				roughness: 0.0,
				metalness: 0.0,
				exposure: 1.0,
				debug: false,
			},
			[
				{
					name: 'envMap',
					type: 'select',
					select: ['Generated', 'LDR', 'HDR', 'RGBM16'],
				},
				{ name: 'roughness', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'metalness', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'exposure', type: 'number', min: 0, max: 2, step: 0.01 },
				{ name: 'debug', type: 'checkbox' },
			]
		);
	}
}
