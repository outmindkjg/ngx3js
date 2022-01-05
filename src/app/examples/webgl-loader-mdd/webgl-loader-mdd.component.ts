import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-mdd',
	templateUrl: './webgl-loader-mdd.component.html',
	styleUrls: ['./webgl-loader-mdd.component.scss'],
})
export class WebglLoaderMddComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
