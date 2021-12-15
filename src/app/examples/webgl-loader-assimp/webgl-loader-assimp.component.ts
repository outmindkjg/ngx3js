import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-assimp',
	templateUrl: './webgl-loader-assimp.component.html',
	styleUrls: ['./webgl-loader-assimp.component.scss'],
})
export class WebglLoaderAssimpComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
