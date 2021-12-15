import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gltf',
	templateUrl: './webgl-loader-gltf.component.html',
	styleUrls: ['./webgl-loader-gltf.component.scss'],
})
export class WebglLoaderGltfComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
