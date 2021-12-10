import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webxr-ar-paint',
	templateUrl: './webxr-ar-paint.component.html',
	styleUrls: ['./webxr-ar-paint.component.scss'],
})
export class WebxrArPaintComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
