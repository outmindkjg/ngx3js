import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webxr-ar-cones',
	templateUrl: './webxr-ar-cones.component.html',
	styleUrls: ['./webxr-ar-cones.component.scss'],
})
export class WebxrArConesComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
