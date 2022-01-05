import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-morphtargets-face',
	templateUrl: './webgl-morphtargets-face.component.html',
	styleUrls: ['./webgl-morphtargets-face.component.scss'],
})
export class WebglMorphtargetsFaceComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
