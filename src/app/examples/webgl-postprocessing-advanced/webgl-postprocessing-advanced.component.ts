import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-advanced',
	templateUrl: './webgl-postprocessing-advanced.component.html',
	styleUrls: ['./webgl-postprocessing-advanced.component.scss'],
})
export class WebglPostprocessingAdvancedComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
