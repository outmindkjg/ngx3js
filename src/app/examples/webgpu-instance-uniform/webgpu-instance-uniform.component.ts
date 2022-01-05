import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-instance-uniform',
	templateUrl: './webgpu-instance-uniform.component.html',
	styleUrls: ['./webgpu-instance-uniform.component.scss'],
})
export class WebgpuInstanceUniformComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
