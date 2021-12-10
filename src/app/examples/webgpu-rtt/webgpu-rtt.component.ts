import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgpu-rtt',
	templateUrl: './webgpu-rtt.component.html',
	styleUrls: ['./webgpu-rtt.component.scss'],
})
export class WebgpuRttComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
