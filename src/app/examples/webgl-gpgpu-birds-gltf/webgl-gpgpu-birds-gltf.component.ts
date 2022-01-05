import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-gpgpu-birds-gltf',
	templateUrl: './webgl-gpgpu-birds-gltf.component.html',
	styleUrls: ['./webgl-gpgpu-birds-gltf.component.scss'],
})
export class WebglGpgpuBirdsGltfComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
