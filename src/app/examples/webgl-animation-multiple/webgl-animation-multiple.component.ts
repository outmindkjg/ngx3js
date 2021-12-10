import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-animation-multiple',
	templateUrl: './webgl-animation-multiple.component.html',
	styleUrls: ['./webgl-animation-multiple.component.scss'],
})
export class WebglAnimationMultipleComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
