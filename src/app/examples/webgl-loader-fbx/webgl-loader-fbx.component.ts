import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-fbx',
	templateUrl: './webgl-loader-fbx.component.html',
	styleUrls: ['./webgl-loader-fbx.component.scss'],
})
export class WebglLoaderFbxComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
