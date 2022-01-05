import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-sandbox',
	templateUrl: './webgpu-sandbox.component.html',
	styleUrls: ['./webgpu-sandbox.component.scss'],
})
export class WebgpuSandboxComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
