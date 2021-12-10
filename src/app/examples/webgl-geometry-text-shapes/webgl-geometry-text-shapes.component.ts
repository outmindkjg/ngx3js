import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-text-shapes',
	templateUrl: './webgl-geometry-text-shapes.component.html',
	styleUrls: ['./webgl-geometry-text-shapes.component.scss'],
})
export class WebglGeometryTextShapesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
