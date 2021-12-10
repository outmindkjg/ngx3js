import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-nodes-pass',
	templateUrl: './webgl-postprocessing-nodes-pass.component.html',
	styleUrls: ['./webgl-postprocessing-nodes-pass.component.scss'],
})
export class WebglPostprocessingNodesPassComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
