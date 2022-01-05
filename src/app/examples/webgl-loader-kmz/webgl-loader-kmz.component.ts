import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-kmz',
	templateUrl: './webgl-loader-kmz.component.html',
	styleUrls: ['./webgl-loader-kmz.component.scss'],
})
export class WebglLoaderKmzComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
