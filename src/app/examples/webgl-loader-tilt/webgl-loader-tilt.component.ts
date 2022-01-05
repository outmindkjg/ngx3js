import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-tilt',
	templateUrl: './webgl-loader-tilt.component.html',
	styleUrls: ['./webgl-loader-tilt.component.scss'],
})
export class WebglLoaderTiltComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
