import { Component } from '@angular/core';
import { BaseComponent, MeshComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-nrrd',
	templateUrl: './webgl-loader-nrrd.component.html',
	styleUrls: ['./webgl-loader-nrrd.component.scss'],
})
export class WebglLoaderNrrdComponent extends BaseComponent<{
	modelVisible: boolean;
	xVisible: boolean;
	indexX: number;
	yVisible: boolean;
	indexY: number;
	zVisible: boolean;
	indexZ: number;
	helperVisible: boolean;
	helperColor: number;
	boxVisible: boolean;
	lowerThreshold: number;
	upperThreshold: number;
	windowLow: number;
	windowHigh: number;
}> {
	constructor() {
		super(
			{
				modelVisible: true,
				xVisible: true,
				yVisible: true,
				zVisible: true,
				helperVisible: true,
				helperColor: 0xffff00,
				boxVisible: true,
				indexX: 0.5,
				indexY: 0.5,
				indexZ: 0.25,
				lowerThreshold: 0,
				upperThreshold: 1,
				windowLow: 0,
				windowHigh: 1,
			},
			[
				{ name: 'modelVisible', title: 'Model Visible', type: 'checkbox' },
				{ name: 'xVisible', title: 'X Visible', type: 'checkbox' },
				{
					name: 'indexX',
					title: 'Index X',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
				{ name: 'yVisible', title: 'Y Visible', type: 'checkbox' },
				{
					name: 'indexY',
					title: 'Index Y',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
				{ name: 'zVisible', title: 'Z Visible', type: 'checkbox' },
				{
					name: 'indexZ',
					title: 'Index Z',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
				{ name: 'helperVisible', title: 'Helper Visible', type: 'checkbox' },
				{ name: 'helperColor', title: 'Helper Line Color', type: 'color' },
				{ name: 'boxVisible', title: 'Box Visible', type: 'checkbox' },
				{
					name: 'lowerThreshold',
					title: 'Lower Threshold',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
				{
					name: 'upperThreshold',
					title: 'High Threshold',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
				{
					name: 'windowLow',
					title: 'Window Low',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
				{
					name: 'windowHigh',
					title: 'Window High',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
				},
			]
		);
	}
}
