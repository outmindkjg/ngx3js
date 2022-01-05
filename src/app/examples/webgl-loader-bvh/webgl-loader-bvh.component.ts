import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-bvh',
	templateUrl: './webgl-loader-bvh.component.html',
	styleUrls: ['./webgl-loader-bvh.component.scss'],
})
export class WebglLoaderBvhComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
