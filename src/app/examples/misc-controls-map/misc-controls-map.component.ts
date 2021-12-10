import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-misc-controls-map',
	templateUrl: './misc-controls-map.component.html',
	styleUrls: ['./misc-controls-map.component.scss'],
})
export class MiscControlsMapComponent extends BaseComponent<{
	screenSpacePanning: boolean;
}> {
	constructor() {
		super(
			{
				screenSpacePanning: false,
			},
			[{ name: 'screenSpacePanning', type: 'checkbox' }]
		);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 500; i++) {
			this.meshInfos.push({
				position: {
					x: Math.random() * 1600 - 800,
					y: 0,
					z: Math.random() * 1600 - 800,
				},
				scale: {
					x: 20,
					y: Math.random() * 80 + 10,
					z: 20,
				},
			});
		}
	}

	meshInfos: {
		position: {
			x: number;
			y: number;
			z: number;
		};
		scale: {
			x: number;
			y: number;
			z: number;
		};
	}[] = [];
}
