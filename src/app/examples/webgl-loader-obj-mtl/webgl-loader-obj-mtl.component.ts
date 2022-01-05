import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-obj-mtl',
	templateUrl: './webgl-loader-obj-mtl.component.html',
	styleUrls: ['./webgl-loader-obj-mtl.component.scss'],
})
export class WebglLoaderObjMtlComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
