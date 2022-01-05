import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-cubemap-mipmaps',
	templateUrl: './webgl-materials-cubemap-mipmaps.component.html',
	styleUrls: ['./webgl-materials-cubemap-mipmaps.component.scss'],
})
export class WebglMaterialsCubemapMipmapsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
