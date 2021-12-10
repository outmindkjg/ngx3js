import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-water-flowmap',
	templateUrl: './webgl-water-flowmap.component.html',
	styleUrls: ['./webgl-water-flowmap.component.scss'],
})
export class WebglWaterFlowmapComponent extends BaseComponent<{
	visible: boolean;
}> {
	constructor() {
		super(
			{
				visible: false,
			},
			[{ name: 'visible', title: 'Show Flow Map', type: 'checkbox' }]
		);
	}
}
