import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-draco',
	templateUrl: './webgl-loader-draco.component.html',
	styleUrls: ['./webgl-loader-draco.component.scss'],
})
export class WebglLoaderDracoComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
