import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-handinput-pointerdrag',
	templateUrl: './webxr-vr-handinput-pointerdrag.component.html',
	styleUrls: ['./webxr-vr-handinput-pointerdrag.component.scss'],
})
export class WebxrVrHandinputPointerdragComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 20; i++) {
			this.boxInfos.push({
				position: {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
					z: Math.random() * 2 - 1,
				},
				color: Math.random() * 0xffffff,
			});
		}
	}
	boxInfos: {
		position: { x: number; y: number; z: number };
		color: number;
	}[] = [];
}
