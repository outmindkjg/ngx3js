import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-shader',
	templateUrl: './webgl-shader.component.html',
	styleUrls: ['./webgl-shader.component.scss'],
})
export class WebglShaderComponent extends NgxBaseComponent<{
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
