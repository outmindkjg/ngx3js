import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-video-panorama-equirectangular',
	templateUrl: './webgl-video-panorama-equirectangular.component.html',
	styleUrls: ['./webgl-video-panorama-equirectangular.component.scss'],
})
export class WebglVideoPanoramaEquirectangularComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
}
