import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-obj',
	templateUrl: './webgl-loader-obj.component.html',
	styleUrls: ['./webgl-loader-obj.component.scss'],
})
export class WebglLoaderObjComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
