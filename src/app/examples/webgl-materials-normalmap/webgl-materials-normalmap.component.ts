import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-normalmap',
	templateUrl: './webgl-materials-normalmap.component.html',
	styleUrls: ['./webgl-materials-normalmap.component.scss'],
})
export class WebglMaterialsNormalmapComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
