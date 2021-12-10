import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-panorama-equirectangular',
	templateUrl: './webgl-panorama-equirectangular.component.html',
	styleUrls: ['./webgl-panorama-equirectangular.component.scss'],
})
export class WebglPanoramaEquirectangularComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
