import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-modifier-edgesplit',
	templateUrl: './webgl-modifier-edgesplit.component.html',
	styleUrls: ['./webgl-modifier-edgesplit.component.scss'],
})
export class WebglModifierEdgesplitComponent extends NgxBaseComponent<{
	smoothShading: boolean;
	edgeSplit: boolean;
	cutOffAngle: number;
	showMap: boolean;
	tryKeepNormals: boolean;
}> {
	constructor() {
		super(
			{
				smoothShading: true,
				edgeSplit: true,
				cutOffAngle: 20,
				showMap: false,
				tryKeepNormals: true,
			},
			[
				{ name: 'showMap', type: 'checkbox' },
				{ name: 'smoothShading', type: 'checkbox' },
				{ name: 'edgeSplit', type: 'checkbox' },
				{ name: 'cutOffAngle', type: 'number', min: 0, max: 180 },
				{ name: 'tryKeepNormals', type: 'checkbox' },
			]
			,false , false);
	}
}
