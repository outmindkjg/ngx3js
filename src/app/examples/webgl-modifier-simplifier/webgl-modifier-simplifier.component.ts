import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-modifier-simplifier',
	templateUrl: './webgl-modifier-simplifier.component.html',
	styleUrls: ['./webgl-modifier-simplifier.component.scss'],
})
export class WebglModifierSimplifierComponent extends BaseComponent<{
	simplify: boolean;
	count: number;
}> {
	constructor() {
		super(
			{
				simplify: true,
				count: 0.875,
			},
			[
				{ name: 'simplify', type: 'checkbox' },
				{ name: 'count', type: 'number', min: 0, max: 1 },
			]
		);
	}
}
