import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-normalmap',
	templateUrl: './webgl-materials-normalmap.component.html',
	styleUrls: ['./webgl-materials-normalmap.component.scss'],
})
export class WebglMaterialsNormalmapComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
