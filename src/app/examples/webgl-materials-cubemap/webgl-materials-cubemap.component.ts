import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-cubemap',
	templateUrl: './webgl-materials-cubemap.component.html',
	styleUrls: ['./webgl-materials-cubemap.component.scss'],
})
export class WebglMaterialsCubemapComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
