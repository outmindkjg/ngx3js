import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-elements',
	templateUrl: './webgl-multiple-elements.component.html',
	styleUrls: ['./webgl-multiple-elements.component.scss'],
})
export class WebglMultipleElementsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
