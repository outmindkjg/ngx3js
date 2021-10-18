import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-skinning',
	templateUrl: './webgpu-skinning.component.html',
	styleUrls: ['./webgpu-skinning.component.scss'],
})
export class WebgpuSkinningComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
