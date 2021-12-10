import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-mdd',
	templateUrl: './webgl-loader-mdd.component.html',
	styleUrls: ['./webgl-loader-mdd.component.scss'],
})
export class WebglLoaderMddComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
