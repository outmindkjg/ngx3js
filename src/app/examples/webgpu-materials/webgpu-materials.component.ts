import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgpu-materials',
	templateUrl: './webgpu-materials.component.html',
	styleUrls: ['./webgpu-materials.component.scss'],
})
export class WebgpuMaterialsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
