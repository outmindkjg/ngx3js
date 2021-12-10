import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-shadow-contact',
	templateUrl: './webgl-shadow-contact.component.html',
	styleUrls: ['./webgl-shadow-contact.component.scss'],
})
export class WebglShadowContactComponent extends BaseComponent<{
	shadow: {
		blur: number;
		darkness: number;
		opacity: number;
	};
	plane: {
		color: string;
		opacity: number;
	};
	showWireframe: boolean;
}> {
	constructor() {
		super(
			{
				shadow: {
					blur: 3.5,
					darkness: 1,
					opacity: 1,
				},
				plane: {
					color: '#ffffff',
					opacity: 1,
				},
				showWireframe: false,
			},
			[
				{
					name: 'shadow',
					type: 'folder',
					control: 'shadow',
					children: [
						{ name: 'blur', type: 'number', min: 0, max: 15, step: 0.1 },
						{ name: 'darkness', type: 'number', min: 1, max: 5, step: 0.1 },
						{ name: 'opacity', type: 'number', min: 0, max: 1, step: 0.01 },
					],
					isOpen: true,
				},

				{
					name: 'plane',
					type: 'folder',
					control: 'plane',
					children: [
						{ name: 'color', type: 'color' },
						{ name: 'opacity', type: 'number', min: 0, max: 1, step: 0.01 },
					],
					isOpen: true,
				},
				{ name: 'showWireframe', type: 'checkbox' },
			]
		);
	}
}
