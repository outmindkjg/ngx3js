import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl2-multiple-rendertargets',
	templateUrl: './webgl2-multiple-rendertargets.component.html',
	styleUrls: ['./webgl2-multiple-rendertargets.component.scss'],
})
export class Webgl2MultipleRendertargetsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
