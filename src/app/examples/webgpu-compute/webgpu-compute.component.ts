import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgpu-compute',
	templateUrl: './webgpu-compute.component.html',
	styleUrls: ['./webgpu-compute.component.scss'],
})
export class WebgpuComputeComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
