import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

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
