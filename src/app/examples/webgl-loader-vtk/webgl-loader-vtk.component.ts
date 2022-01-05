import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-vtk',
	templateUrl: './webgl-loader-vtk.component.html',
	styleUrls: ['./webgl-loader-vtk.component.scss'],
})
export class WebglLoaderVtkComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
