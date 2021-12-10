import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-text-stroke',
	templateUrl: './webgl-geometry-text-stroke.component.html',
	styleUrls: ['./webgl-geometry-text-stroke.component.scss'],
})
export class WebglGeometryTextStrokeComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
