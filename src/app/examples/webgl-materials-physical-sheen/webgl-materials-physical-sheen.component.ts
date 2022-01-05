import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-physical-sheen',
	templateUrl: './webgl-materials-physical-sheen.component.html',
	styleUrls: ['./webgl-materials-physical-sheen.component.scss'],
})
export class WebglMaterialsPhysicalSheenComponent extends NgxBaseComponent<{
	nodeMaterial: true;
	color: number;
	sheenBRDF: true;
	sheen: number; // corresponds to .04 reflectance
	roughness: 0.9;
	exposure: 2;
}> {
	constructor() {
		super(
			{
				nodeMaterial: true,
				color: 0xff007f,
				sheenBRDF: true,
				sheen: 0x0a0a0a,
				roughness: 0.9,
				exposure: 2,
			},
			[
				{ name: 'nodeMaterial', type: 'checkbox' },
				{ name: 'color', type: 'color' },
				{ name: 'sheenBRDF', type: 'checkbox' },
				{ name: 'sheen', type: 'color' },
				{ name: 'roughness', type: 'number', min: 0, max: 1 },
				{ name: 'exposure', type: 'number', min: 0, max: 3 },
			]
			,false , false);
	}
}
