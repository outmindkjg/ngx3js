import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-xyz',
	templateUrl: './webgl-loader-xyz.component.html',
	styleUrls: ['./webgl-loader-xyz.component.scss'],
})
export class WebglLoaderXyzComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
