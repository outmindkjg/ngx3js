import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-misc-boxselection',
	templateUrl: './misc-boxselection.component.html',
	styleUrls: ['./misc-boxselection.component.scss'],
})
export class MiscBoxselectionComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 200; i++) {
			this.boxInfos.push({
				position: {
					x: Math.random() * 1600 - 800,
					y: Math.random() * 900 - 450,
					z: Math.random() * 900 - 500,
				},
				rotation: {
					x: Math.random() * 2 * 180,
					y: Math.random() * 2 * 180,
					z: Math.random() * 2 * 180,
				},
				scale: {
					x: Math.random() * 2 + 1,
					y: Math.random() * 2 + 1,
					z: Math.random() * 2 + 1,
				},
				color: Math.random() * 0xffffff,
			});
		}
	}
	boxInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
		color: number;
	}[] = [];
}
