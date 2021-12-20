import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-logluv.component',
	templateUrl: './webgl-loader-texture-logluv.component.html',
	styleUrls: ['./webgl-loader-texture-logluv.component.scss'],
})
export class WebglLoaderTextureLogluvComponent extends NgxBaseComponent<{
	exposure : number
}> {
	constructor() {
		super({
			exposure : 2.0
		}, [
			{ name : 'exposure', type : 'number', min : 0, max : 4, step : 0.01}
		]);
	}
}
