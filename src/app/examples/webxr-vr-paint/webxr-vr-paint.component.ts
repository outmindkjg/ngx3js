import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

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
