import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-collada-skinning',
	templateUrl: './webgl-loader-collada-skinning.component.html',
	styleUrls: ['./webgl-loader-collada-skinning.component.scss'],
})
export class WebglLoaderColladaSkinningComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
