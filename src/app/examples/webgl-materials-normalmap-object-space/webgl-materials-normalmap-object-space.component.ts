import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-normalmap-object-space',
	templateUrl: './webgl-materials-normalmap-object-space.component.html',
	styleUrls: ['./webgl-materials-normalmap-object-space.component.scss'],
})
export class WebglMaterialsNormalmapObjectSpaceComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
