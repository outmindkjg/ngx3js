import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-video-panorama-equirectangular',
	templateUrl: './webgl-video-panorama-equirectangular.component.html',
	styleUrls: ['./webgl-video-panorama-equirectangular.component.scss'],
})
export class WebglVideoPanoramaEquirectangularComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
