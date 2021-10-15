import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

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
