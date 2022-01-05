import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-elements-text',
	templateUrl: './webgl-multiple-elements-text.component.html',
	styleUrls: ['./webgl-multiple-elements-text.component.scss'],
})
export class WebglMultipleElementsTextComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
