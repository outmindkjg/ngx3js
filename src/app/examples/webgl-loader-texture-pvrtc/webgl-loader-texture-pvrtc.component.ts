import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-pvrtc',
	templateUrl: './webgl-loader-texture-pvrtc.component.html',
	styleUrls: ['./webgl-loader-texture-pvrtc.component.scss'],
})
export class WebglLoaderTexturePvrtcComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
