import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-tilt',
	templateUrl: './webgl-loader-tilt.component.html',
	styleUrls: ['./webgl-loader-tilt.component.scss'],
})
export class WebglLoaderTiltComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
