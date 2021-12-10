import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-ngx-chart-line',
	templateUrl: './ngx-chart-line.component.html',
	styleUrls: ['./ngx-chart-line.component.scss'],
})
export class NgxChartLineComponent extends BaseComponent<{
	pointStyle: string;
}> {
	constructor() {
		super(
			{
				pointStyle: 'ring',
			},
			[
				{
					name: 'pointStyle',
					type: 'select',
					select: ['circle', 'sphere', 'plane', 'box', 'star', 'ring'],
				},
			]
		);
	}
}
