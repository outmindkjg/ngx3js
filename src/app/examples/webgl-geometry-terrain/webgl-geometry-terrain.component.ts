import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-terrain',
	templateUrl: './webgl-geometry-terrain.component.html',
	styleUrls: ['./webgl-geometry-terrain.component.scss'],
})
export class WebglGeometryTerrainComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
