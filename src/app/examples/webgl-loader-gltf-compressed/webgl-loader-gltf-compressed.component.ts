import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gltf-compressed',
	templateUrl: './webgl-loader-gltf-compressed.component.html',
	styleUrls: ['./webgl-loader-gltf-compressed.component.scss'],
})
export class WebglLoaderGltfCompressedComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
