import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-lights-selective',
	templateUrl: './webgpu-lights-selective.component.html',
	styleUrls: ['./webgpu-lights-selective.component.scss'],
})
export class WebgpuLightsSelectiveComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
