import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-backgrounds',
	templateUrl: './webgl-postprocessing-backgrounds.component.html',
	styleUrls: ['./webgl-postprocessing-backgrounds.component.scss'],
})
export class WebglPostprocessingBackgroundsComponent extends BaseComponent<{
	clearPass: boolean;
	clearColor: string;
	clearAlpha: number;
	texturePass: boolean;
	texturePassOpacity: number;
	cubeTexturePass: boolean;
	cubeTexturePassOpacity: number;
	renderPass: boolean;
}> {
	constructor() {
		super(
			{
				clearPass: true,
				clearColor: 'white',
				clearAlpha: 1.0,
				texturePass: true,
				texturePassOpacity: 1.0,
				cubeTexturePass: true,
				cubeTexturePassOpacity: 1.0,
				renderPass: true,
			},
			[
				{ name: 'clearPass', type: 'checkbox' },
				{
					name: 'clearColor',
					type: 'select',
					select: ['black', 'white', 'blue', 'green', 'red'],
				},
				{ name: 'clearAlpha', type: 'number', min: 0, max: 1 },
				{ name: 'texturePass', type: 'checkbox' },
				{ name: 'texturePassOpacity', type: 'number', min: 0, max: 1 },
				{ name: 'cubeTexturePass', type: 'checkbox' },
				{ name: 'cubeTexturePassOpacity', type: 'number', min: 0, max: 1 },
				{ name: 'renderPass', type: 'checkbox' },
			]
		);
	}
}
