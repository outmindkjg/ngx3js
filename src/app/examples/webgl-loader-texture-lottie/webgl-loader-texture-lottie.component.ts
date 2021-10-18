import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-lottie',
	templateUrl: './webgl-loader-texture-lottie.component.html',
	styleUrls: ['./webgl-loader-texture-lottie.component.scss'],
})
export class WebglLoaderTextureLottieComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
