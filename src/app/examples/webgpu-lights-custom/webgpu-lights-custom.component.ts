import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-lights-custom',
	templateUrl: './webgpu-lights-custom.component.html',
	styleUrls: ['./webgpu-lights-custom.component.scss'],
})
export class WebgpuLightsCustomComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
