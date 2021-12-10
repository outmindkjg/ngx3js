import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-shaders-vector',
	templateUrl: './webgl-shaders-vector.component.html',
	styleUrls: ['./webgl-shaders-vector.component.scss'],
})
export class WebglShadersVectorComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
