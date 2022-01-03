import { Component } from '@angular/core';
import {
	I3JS, NgxBaseComponent,
	NgxHelperComponent, NgxPlaneComponent,
	IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-clipping-stencil',
	templateUrl: './webgl-clipping-stencil.component.html',
	styleUrls: ['./webgl-clipping-stencil.component.scss'],
})
export class WebglClippingStencilComponent extends NgxBaseComponent<{
	animate: boolean;
	planeX: {
		constant: number;
		negated: boolean;
		displayHelper: boolean;
	};
	planeY: {
		constant: number;
		negated: boolean;
		displayHelper: boolean;
	};
	planeZ: {
		constant: number;
		negated: false;
		displayHelper: false;
	};
}> {
	constructor() {
		super(
			{
				animate: true,
				planeX: {
					constant: 0,
					negated: false,
					displayHelper: false,
				},
				planeY: {
					constant: 0,
					negated: false,
					displayHelper: false,
				},
				planeZ: {
					constant: 0,
					negated: false,
					displayHelper: false,
				},
			},
			[
				{ name: 'animate', title: 'Animate', type: 'checkbox' },
				{
					name: 'Plane X',
					control: 'planeX',
					type: 'folder',
					children: [
						{
							name: 'displayHelper',
							title: 'DisplayHelper',
							type: 'checkbox',
						},
						{
							name: 'constant',
							title: 'Constant',
							type: 'number',
							listen: true,
							min: -1,
							max: 1,
							step: 0.01,
						},
						{
							name: 'negated',
							title: 'Negated',
							type: 'checkbox',
						},
					],
					isOpen: true,
				},
				{
					name: 'Plane Y',
					control: 'planeY',
					type: 'folder',
					children: [
						{
							name: 'displayHelper',
							title: 'DisplayHelper',
							type: 'checkbox',
						},
						{
							name: 'constant',
							title: 'Constant',
							type: 'number',
							listen: true,
							min: -1,
							max: 1,
							step: 0.01,
						},
						{
							name: 'negated',
							title: 'Negated',
							type: 'checkbox',
						},
					],
					isOpen: true,
				},
				{
					name: 'Plane Z',
					control: 'planeZ',
					type: 'folder',
					children: [
						{
							name: 'displayHelper',
							title: 'DisplayHelper',
							type: 'checkbox',
						},
						{
							name: 'constant',
							title: 'Constant',
							type: 'number',
							listen: true,
							min: -1,
							max: 1,
							step: 0.01,
						},
						{
							name: 'negated',
							title: 'Negated',
							type: 'checkbox',
						},
					],
					isOpen: true,
				},
			]
		, false, false);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (
			this.mesh !== null &&
			this.controls.animate
		) {
			this.mesh.addRotation(timer.delta * 9, timer.delta * 4, 0);
		}
	}
}
