import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-basis',
	templateUrl: './webgl-loader-texture-basis.component.html',
	styleUrls: ['./webgl-loader-texture-basis.component.scss'],
})
export class WebglLoaderTextureBasisComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
