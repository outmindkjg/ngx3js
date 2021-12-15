import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-lightmap',
	templateUrl: './webgl-materials-lightmap.component.html',
	styleUrls: ['./webgl-materials-lightmap.component.scss'],
})
export class WebglMaterialsLightmapComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
