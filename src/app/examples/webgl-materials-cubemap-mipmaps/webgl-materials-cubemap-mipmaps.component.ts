import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-cubemap-mipmaps',
	templateUrl: './webgl-materials-cubemap-mipmaps.component.html',
	styleUrls: ['./webgl-materials-cubemap-mipmaps.component.scss'],
})
export class WebglMaterialsCubemapMipmapsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
