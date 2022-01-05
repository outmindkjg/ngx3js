import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-collada',
	templateUrl: './webgl-loader-collada.component.html',
	styleUrls: ['./webgl-loader-collada.component.scss'],
})
export class WebglLoaderColladaComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
