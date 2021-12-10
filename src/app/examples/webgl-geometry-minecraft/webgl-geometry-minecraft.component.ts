import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-minecraft',
	templateUrl: './webgl-geometry-minecraft.component.html',
	styleUrls: ['./webgl-geometry-minecraft.component.scss'],
})
export class WebglGeometryMinecraftComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}
}
