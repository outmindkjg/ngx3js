import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-tga',
	templateUrl: './webgl-loader-texture-tga.component.html',
	styleUrls: ['./webgl-loader-texture-tga.component.scss'],
})
export class WebglLoaderTextureTgaComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
