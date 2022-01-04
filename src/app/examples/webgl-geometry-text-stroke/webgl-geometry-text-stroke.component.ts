import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-text-stroke',
	templateUrl: './webgl-geometry-text-stroke.component.html',
	styleUrls: ['./webgl-geometry-text-stroke.component.scss'],
})
export class WebglGeometryTextStrokeComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
