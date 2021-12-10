import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-amf',
	templateUrl: './webgl-loader-amf.component.html',
	styleUrls: ['./webgl-loader-amf.component.scss'],
})
export class WebglLoaderAmfComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
