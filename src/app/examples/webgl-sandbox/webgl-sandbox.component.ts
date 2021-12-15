import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-sandbox',
	templateUrl: './webgl-sandbox.component.html',
	styleUrls: ['./webgl-sandbox.component.scss'],
})
export class WebglSandboxComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
