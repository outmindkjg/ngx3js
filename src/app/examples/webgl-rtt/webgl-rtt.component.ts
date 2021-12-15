import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-rtt',
	templateUrl: './webgl-rtt.component.html',
	styleUrls: ['./webgl-rtt.component.scss'],
})
export class WebglRttComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
