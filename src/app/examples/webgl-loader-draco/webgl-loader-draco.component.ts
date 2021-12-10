import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-draco',
	templateUrl: './webgl-loader-draco.component.html',
	styleUrls: ['./webgl-loader-draco.component.scss'],
})
export class WebglLoaderDracoComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
