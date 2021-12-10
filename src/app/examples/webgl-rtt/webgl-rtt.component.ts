import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-rtt',
	templateUrl: './webgl-rtt.component.html',
	styleUrls: ['./webgl-rtt.component.scss'],
})
export class WebglRttComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
