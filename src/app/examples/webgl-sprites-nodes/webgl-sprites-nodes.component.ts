import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-sprites-nodes',
	templateUrl: './webgl-sprites-nodes.component.html',
	styleUrls: ['./webgl-sprites-nodes.component.scss'],
})
export class WebglSpritesNodesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
