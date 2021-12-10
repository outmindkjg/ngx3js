import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-ngx-scale',
	templateUrl: './ngx-scale.component.html',
	styleUrls: ['./ngx-scale.component.scss'],
})
export class NgxScaleComponent extends BaseComponent<{
	scale: {
		x: number;
		y: number;
		z: number;
	};
}> {
	constructor() {
		super(
			{
				scale: {
					x: 1,
					y: 1,
					z: 1,
				},
			},
			[
				{
					name: 'scale',
					type: 'folder',
					control: 'scale',
					children: [
						{ name: 'x', type: 'number', min: 0.05, max: 2, step: 0.01 },
						{ name: 'y', type: 'number', min: 0.05, max: 2, step: 0.01 },
						{ name: 'z', type: 'number', min: 0.05, max: 2, step: 0.01 },
					],
				},
			],
			true,
			false
		);
	}
}
