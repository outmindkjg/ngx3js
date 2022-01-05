import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-cubemap',
	templateUrl: './webgl-materials-cubemap.component.html',
	styleUrls: ['./webgl-materials-cubemap.component.scss'],
})
export class WebglMaterialsCubemapComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
