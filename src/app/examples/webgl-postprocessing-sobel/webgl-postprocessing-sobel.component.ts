import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-sobel',
	templateUrl: './webgl-postprocessing-sobel.component.html',
	styleUrls: ['./webgl-postprocessing-sobel.component.scss'],
})
export class WebglPostprocessingSobelComponent extends NgxBaseComponent<{
	enable: boolean;
}> {
	constructor() {
		super({ enable: true }, [{ name: 'enable', type: 'checkbox' }]);
	}
}
