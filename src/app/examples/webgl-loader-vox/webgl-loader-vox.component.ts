import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-vox',
	templateUrl: './webgl-loader-vox.component.html',
	styleUrls: ['./webgl-loader-vox.component.scss'],
})
export class WebglLoaderVoxComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
