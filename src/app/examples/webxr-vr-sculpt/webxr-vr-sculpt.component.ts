import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-sculpt',
	templateUrl: './webxr-vr-sculpt.component.html',
	styleUrls: ['./webxr-vr-sculpt.component.scss'],
})
export class WebxrVrSculptComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
