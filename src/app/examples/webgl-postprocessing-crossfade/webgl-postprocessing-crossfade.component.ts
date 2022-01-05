import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-crossfade',
	templateUrl: './webgl-postprocessing-crossfade.component.html',
	styleUrls: ['./webgl-postprocessing-crossfade.component.scss'],
})
export class WebglPostprocessingCrossfadeComponent extends NgxBaseComponent<{
	useTexture: boolean;
	transition: number;
	transitionSpeed: number;
	texture: number;
	loopTexture: boolean;
	animateTransition: boolean;
	textureThreshold: number;
}> {
	constructor() {
		super(
			{
				useTexture: true,
				transition: 0.5,
				transitionSpeed: 2.0,
				texture: 5,
				loopTexture: true,
				animateTransition: true,
				textureThreshold: 0.3,
			},
			[
				{ name: 'useTexture', type: 'checkbox' },
				{ name: 'loopTexture', type: 'checkbox' },
				{
					name: 'texture',
					type: 'select',
					select: {
						Perlin: 0,
						Squares: 1,
						Cells: 2,
						Distort: 3,
						Gradient: 4,
						Radial: 5,
					},
				},
				{
					name: 'textureThreshold',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
				{ name: 'animateTransition', type: 'checkbox' },
				{ name: 'transition', type: 'number', min: 0, max: 1, step: 0.01 },
				{
					name: 'transitionSpeed',
					type: 'number',
					min: 0.5,
					max: 5,
					step: 0.01,
				},
			]
			,false , false);
	}
}
