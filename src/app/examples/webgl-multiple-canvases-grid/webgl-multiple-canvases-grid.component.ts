import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-canvases-grid',
	templateUrl: './webgl-multiple-canvases-grid.component.html',
	styleUrls: ['./webgl-multiple-canvases-grid.component.scss'],
})
export class WebglMultipleCanvasesGridComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
