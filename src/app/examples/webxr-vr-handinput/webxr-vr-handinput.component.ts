import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-handinput',
	templateUrl: './webxr-vr-handinput.component.html',
	styleUrls: ['./webxr-vr-handinput.component.scss'],
})
export class WebxrVrHandinputComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
