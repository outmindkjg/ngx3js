import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gltf-variants',
	templateUrl: './webgl-loader-gltf-variants.component.html',
	styleUrls: ['./webgl-loader-gltf-variants.component.scss'],
})
export class WebglLoaderGltfVariantsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
