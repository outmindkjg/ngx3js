import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-texture-filters',
	templateUrl: './webgl-materials-texture-filters.component.html',
	styleUrls: ['./webgl-materials-texture-filters.component.scss'],
})
export class WebglMaterialsTextureFiltersComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
