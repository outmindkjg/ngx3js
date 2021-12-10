import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgpu-sandbox',
	templateUrl: './webgpu-sandbox.component.html',
	styleUrls: ['./webgpu-sandbox.component.scss'],
})
export class WebgpuSandboxComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
