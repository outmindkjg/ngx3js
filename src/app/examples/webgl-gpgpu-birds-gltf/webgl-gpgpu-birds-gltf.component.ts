import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-gpgpu-birds-gltf',
	templateUrl: './webgl-gpgpu-birds-gltf.component.html',
	styleUrls: ['./webgl-gpgpu-birds-gltf.component.scss'],
})
export class WebglGpgpuBirdsGltfComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
