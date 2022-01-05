import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-panorama-equirectangular',
	templateUrl: './webgl-panorama-equirectangular.component.html',
	styleUrls: ['./webgl-panorama-equirectangular.component.scss'],
})
export class WebglPanoramaEquirectangularComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
