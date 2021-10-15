import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-misc-controls-orbit',
	templateUrl: './misc-controls-orbit.component.html',
	styleUrls: ['./misc-controls-orbit.component.scss'],
})
export class MiscControlsOrbitComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 500; i++) {
			this.meshInfos.push({
				x: Math.random() * 1600 - 800,
				y: 0,
				z: Math.random() * 1600 - 800,
			});
		}
	}

	meshInfos: {
		x: number;
		y: number;
		z: number;
	}[] = [];
}
