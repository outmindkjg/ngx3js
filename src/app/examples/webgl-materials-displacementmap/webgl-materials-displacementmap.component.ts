import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-displacementmap',
	templateUrl: './webgl-materials-displacementmap.component.html',
	styleUrls: ['./webgl-materials-displacementmap.component.scss'],
})
export class WebglMaterialsDisplacementmapComponent extends BaseComponent<{
	metalness: number;
	roughness: number;
	ambientIntensity: number;
	aoMapIntensity: number;
	envMapIntensity: number;
	displacementScale: number; // from original model
	normalScale: number;
}> {
	constructor() {
		super(
			{
				metalness: 1.0,
				roughness: 0.4,
				ambientIntensity: 0.2,
				aoMapIntensity: 1.0,
				envMapIntensity: 1.0,
				displacementScale: 2.436143, // from original model
				normalScale: 1.0,
			},
			[
				{ name: 'metalness', type: 'number', min: 0, max: 1 },
				{ name: 'roughness', type: 'number', min: 0, max: 1 },
				{ name: 'aoMapIntensity', type: 'number', min: 0, max: 1 },
				{ name: 'ambientIntensity', type: 'number', min: 0, max: 1 },
				{ name: 'envMapIntensity', type: 'number', min: 0, max: 3 },
				{ name: 'displacementScale', type: 'number', min: 0, max: 3.0 },
				{ name: 'normalScale', type: 'number', min: -1, max: 1 },
			]
		);
	}
}
