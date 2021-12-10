import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-texture-dds',
	templateUrl: './webgl-loader-texture-dds.component.html',
	styleUrls: ['./webgl-loader-texture-dds.component.scss'],
})
export class WebglLoaderTextureDdsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
