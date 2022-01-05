import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-nodes-pass',
	templateUrl: './webgl-postprocessing-nodes-pass.component.html',
	styleUrls: ['./webgl-postprocessing-nodes-pass.component.scss'],
})
export class WebglPostprocessingNodesPassComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
