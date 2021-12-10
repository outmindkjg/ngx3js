import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-stl',
	templateUrl: './webgl-loader-stl.component.html',
	styleUrls: ['./webgl-loader-stl.component.scss'],
})
export class WebglLoaderStlComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
