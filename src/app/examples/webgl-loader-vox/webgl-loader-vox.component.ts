import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-vox',
	templateUrl: './webgl-loader-vox.component.html',
	styleUrls: ['./webgl-loader-vox.component.scss'],
})
export class WebglLoaderVoxComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
