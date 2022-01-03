import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-animation-keyframes',
	templateUrl: './webgl-animation-keyframes.component.html',
	styleUrls: ['./webgl-animation-keyframes.component.scss'],
})
export class WebglAnimationKeyframesComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [],false, false);
	}
}
