import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-skinning',
	templateUrl: './webgpu-skinning.component.html',
	styleUrls: ['./webgpu-skinning.component.scss'],
})
export class WebgpuSkinningComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
