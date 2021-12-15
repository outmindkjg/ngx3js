import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-terrain',
	templateUrl: './webgl-geometry-terrain.component.html',
	styleUrls: ['./webgl-geometry-terrain.component.scss'],
})
export class WebglGeometryTerrainComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
