import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-ply',
	templateUrl: './webgl-loader-ply.component.html',
	styleUrls: ['./webgl-loader-ply.component.scss'],
})
export class WebglLoaderPlyComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
