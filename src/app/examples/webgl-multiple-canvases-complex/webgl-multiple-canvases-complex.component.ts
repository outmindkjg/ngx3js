import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-canvases-complex',
	templateUrl: './webgl-multiple-canvases-complex.component.html',
	styleUrls: ['./webgl-multiple-canvases-complex.component.scss'],
})
export class WebglMultipleCanvasesComplexComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
