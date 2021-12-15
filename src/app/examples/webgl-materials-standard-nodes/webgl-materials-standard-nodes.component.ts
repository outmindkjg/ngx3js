import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-standard-nodes',
	templateUrl: './webgl-materials-standard-nodes.component.html',
	styleUrls: ['./webgl-materials-standard-nodes.component.scss'],
})
export class WebglMaterialsStandardNodesComponent extends NgxBaseComponent<{
	environment: string;
}> {
	constructor() {
		super(
			{
				environment: 'venice_sunset_1k.hdr',
			},
			[
				{
					name: 'environment',
					type: 'select',
					select: {
						'Venice Sunset': 'venice_sunset_1k.hdr',
						Overpass: 'pedestrian_overpass_1k.hdr',
					},
				},
			]
		);
	}
}
