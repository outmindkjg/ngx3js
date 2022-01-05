import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gcode',
	templateUrl: './webgl-loader-gcode.component.html',
	styleUrls: ['./webgl-loader-gcode.component.scss'],
})
export class WebglLoaderGcodeComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
