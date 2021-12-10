import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-assimp',
	templateUrl: './webgl-loader-assimp.component.html',
	styleUrls: ['./webgl-loader-assimp.component.scss'],
})
export class WebglLoaderAssimpComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
