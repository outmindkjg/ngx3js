import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-bumpmap',
	templateUrl: './webgl-materials-bumpmap.component.html',
	styleUrls: ['./webgl-materials-bumpmap.component.scss'],
})
export class WebglMaterialsBumpmapComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
