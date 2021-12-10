import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-glitch',
	templateUrl: './webgl-postprocessing-glitch.component.html',
	styleUrls: ['./webgl-postprocessing-glitch.component.scss'],
})
export class WebglPostprocessingGlitchComponent extends BaseComponent<{
	wildGlitch: boolean;
}> {
	constructor() {
		super(
			{
				wildGlitch: false,
			},
			[{ name: 'wildGlitch', type: 'checkbox' }]
		);
	}

	ngOnInit() {
		this.sphereInfos = [];
		for (let i = 0; i < 100; i++) {
			this.sphereInfos.push({
				position: {
					x: Math.random() - 0.5,
					y: Math.random() - 0.5,
					z: Math.random() - 0.5,
					multiply: Math.random() * 400,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
				color: 0xffffff * Math.random(),
				scale: Math.random() * 50,
			});
		}
	}

	sphereInfos: {
		color: number;
		position: { x: number; y: number; z: number; multiply: number };
		rotation: { x: number; y: number; z: number };
		scale: number;
	}[] = [];
}
