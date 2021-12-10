import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-layers',
	templateUrl: './webxr-vr-layers.component.html',
	styleUrls: ['./webxr-vr-layers.component.scss'],
})
export class WebxrVrLayersComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
