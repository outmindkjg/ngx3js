import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-obj',
	templateUrl: './webgl-loader-obj.component.html',
	styleUrls: ['./webgl-loader-obj.component.scss'],
})
export class WebglLoaderObjComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
