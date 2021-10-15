import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-lights-custom',
	templateUrl: './webgpu-lights-custom.component.html',
	styleUrls: ['./webgpu-lights-custom.component.scss'],
})
export class WebgpuLightsCustomComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
