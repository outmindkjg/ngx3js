import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-terrain-fog',
	templateUrl: './webgl-geometry-terrain-fog.component.html',
	styleUrls: ['./webgl-geometry-terrain-fog.component.scss'],
})
export class WebglGeometryTerrainFogComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
