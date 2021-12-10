import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-texture-manualmipmap',
	templateUrl: './webgl-materials-texture-manualmipmap.component.html',
	styleUrls: ['./webgl-materials-texture-manualmipmap.component.scss'],
})
export class WebglMaterialsTextureManualmipmapComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
