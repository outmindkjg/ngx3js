import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-obj-mtl',
	templateUrl: './webgl-loader-obj-mtl.component.html',
	styleUrls: ['./webgl-loader-obj-mtl.component.scss'],
})
export class WebglLoaderObjMtlComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
