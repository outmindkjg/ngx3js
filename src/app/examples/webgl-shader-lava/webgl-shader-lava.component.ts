import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-shader-lava',
	templateUrl: './webgl-shader-lava.component.html',
	styleUrls: ['./webgl-shader-lava.component.scss'],
})
export class WebglShaderLavaComponent extends BaseComponent<{
	speed: number;
}> {
	constructor() {
		super(
			{
				speed: 1,
			},
			[{ name: 'speed', type: 'number', min: 0.1, max: 2, step: 0.2 }]
		);
	}
}
