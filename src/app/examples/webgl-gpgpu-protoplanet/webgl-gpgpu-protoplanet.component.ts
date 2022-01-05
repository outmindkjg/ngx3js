import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-gpgpu-protoplanet',
	templateUrl: './webgl-gpgpu-protoplanet.component.html',
	styleUrls: ['./webgl-gpgpu-protoplanet.component.scss'],
})
export class WebglGpgpuProtoplanetComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
