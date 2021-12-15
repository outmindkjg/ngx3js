import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-compute',
	templateUrl: './webgpu-compute.component.html',
	styleUrls: ['./webgpu-compute.component.scss'],
})
export class WebgpuComputeComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
