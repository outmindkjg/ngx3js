import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gltf-variants',
	templateUrl: './webgl-loader-gltf-variants.component.html',
	styleUrls: ['./webgl-loader-gltf-variants.component.scss'],
})
export class WebglLoaderGltfVariantsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
