import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-skinning-points',
	templateUrl: './webgpu-skinning-points.component.html',
	styleUrls: ['./webgpu-skinning-points.component.scss'],
})
export class WebgpuSkinningPointsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
