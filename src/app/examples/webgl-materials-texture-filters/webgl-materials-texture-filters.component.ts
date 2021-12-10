import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-texture-filters',
	templateUrl: './webgl-materials-texture-filters.component.html',
	styleUrls: ['./webgl-materials-texture-filters.component.scss'],
})
export class WebglMaterialsTextureFiltersComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
