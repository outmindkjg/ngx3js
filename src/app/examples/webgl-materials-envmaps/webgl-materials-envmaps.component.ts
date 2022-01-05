import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-envmaps',
	templateUrl: './webgl-materials-envmaps.component.html',
	styleUrls: ['./webgl-materials-envmaps.component.scss'],
})
export class WebglMaterialsEnvmapsComponent extends NgxBaseComponent<{
	background: string;
	refraction: boolean;
}> {
	constructor() {
		super(
			{
				background: 'Cube',
				refraction: false,
			},
			[
				{
					name: 'background',
					type: 'select',
					select: ['Cube', 'Equirectangular'],
				},
				{ name: 'refraction', type: 'checkbox' },
			]
			,false , false);
	}
}
