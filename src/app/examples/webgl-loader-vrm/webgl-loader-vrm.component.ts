import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-vrm',
	templateUrl: './webgl-loader-vrm.component.html',
	styleUrls: ['./webgl-loader-vrm.component.scss'],
})
export class WebglLoaderVrmComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
