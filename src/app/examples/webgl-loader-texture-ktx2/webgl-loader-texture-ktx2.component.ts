import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-ktx2',
	templateUrl: './webgl-loader-texture-ktx2.component.html',
	styleUrls: ['./webgl-loader-texture-ktx2.component.scss'],
})
export class WebglLoaderTextureKtx2Component extends BaseComponent<{
	exposure: number;
}> {
	constructor() {
		super(
			{
				exposure: 2.0,
			},
			[{ name: 'exposure', type: 'number', min: 0, max: 4, step: 0.01 }]
		);
	}
}
