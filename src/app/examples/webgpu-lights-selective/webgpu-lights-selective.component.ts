import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgpu-lights-selective',
	templateUrl: './webgpu-lights-selective.component.html',
	styleUrls: ['./webgpu-lights-selective.component.scss'],
})
export class WebgpuLightsSelectiveComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
