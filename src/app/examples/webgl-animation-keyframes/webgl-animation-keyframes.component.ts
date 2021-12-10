import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-animation-keyframes',
	templateUrl: './webgl-animation-keyframes.component.html',
	styleUrls: ['./webgl-animation-keyframes.component.scss'],
})
export class WebglAnimationKeyframesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
