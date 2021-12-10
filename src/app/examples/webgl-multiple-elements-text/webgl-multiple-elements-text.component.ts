import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-elements-text',
	templateUrl: './webgl-multiple-elements-text.component.html',
	styleUrls: ['./webgl-multiple-elements-text.component.scss'],
})
export class WebglMultipleElementsTextComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
