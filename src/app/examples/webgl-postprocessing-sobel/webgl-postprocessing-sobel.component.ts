import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-sobel',
	templateUrl: './webgl-postprocessing-sobel.component.html',
	styleUrls: ['./webgl-postprocessing-sobel.component.scss'],
})
export class WebglPostprocessingSobelComponent extends BaseComponent<{
	enable: boolean;
}> {
	constructor() {
		super({ enable: true }, [{ name: 'enable', type: 'checkbox' }]);
	}
}
