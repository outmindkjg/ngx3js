import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-vtk',
	templateUrl: './webgl-loader-vtk.component.html',
	styleUrls: ['./webgl-loader-vtk.component.scss'],
})
export class WebglLoaderVtkComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
