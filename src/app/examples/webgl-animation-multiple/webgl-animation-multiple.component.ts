import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-animation-multiple',
	templateUrl: './webgl-animation-multiple.component.html',
	styleUrls: ['./webgl-animation-multiple.component.scss'],
})
export class WebglAnimationMultipleComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
