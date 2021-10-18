import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-nodes',
	templateUrl: './webgl-postprocessing-nodes.component.html',
	styleUrls: ['./webgl-postprocessing-nodes.component.scss'],
})
export class WebglPostprocessingNodesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
