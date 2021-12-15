import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-materials',
	templateUrl: './webgpu-materials.component.html',
	styleUrls: ['./webgpu-materials.component.scss'],
})
export class WebgpuMaterialsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
