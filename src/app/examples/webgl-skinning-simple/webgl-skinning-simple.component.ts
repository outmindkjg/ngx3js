import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-skinning-simple',
	templateUrl: './webgl-skinning-simple.component.html',
	styleUrls: ['./webgl-skinning-simple.component.scss'],
})
export class WebglSkinningSimpleComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
