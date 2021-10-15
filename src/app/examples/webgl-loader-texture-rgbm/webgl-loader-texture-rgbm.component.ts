import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-rgbm',
	templateUrl: './webgl-loader-texture-rgbm.component.html',
	styleUrls: ['./webgl-loader-texture-rgbm.component.scss'],
})
export class WebglLoaderTextureRgbmComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
