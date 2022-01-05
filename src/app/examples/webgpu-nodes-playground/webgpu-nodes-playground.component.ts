import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgpu-nodes-playground',
	templateUrl: './webgpu-nodes-playground.component.html',
	styleUrls: ['./webgpu-nodes-playground.component.scss'],
})
export class WebgpuNodesPlaygroundComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
