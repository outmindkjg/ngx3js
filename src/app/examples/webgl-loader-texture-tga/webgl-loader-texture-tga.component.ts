import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-tga',
	templateUrl: './webgl-loader-texture-tga.component.html',
	styleUrls: ['./webgl-loader-texture-tga.component.scss'],
})
export class WebglLoaderTextureTgaComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
