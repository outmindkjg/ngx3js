import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-amf',
	templateUrl: './webgl-loader-amf.component.html',
	styleUrls: ['./webgl-loader-amf.component.scss'],
})
export class WebglLoaderAmfComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
