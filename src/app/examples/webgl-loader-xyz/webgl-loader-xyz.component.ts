import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-xyz',
	templateUrl: './webgl-loader-xyz.component.html',
	styleUrls: ['./webgl-loader-xyz.component.scss'],
})
export class WebglLoaderXyzComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
