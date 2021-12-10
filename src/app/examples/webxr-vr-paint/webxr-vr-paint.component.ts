import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-paint',
	templateUrl: './webxr-vr-paint.component.html',
	styleUrls: ['./webxr-vr-paint.component.scss'],
})
export class WebxrVrPaintComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
