import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-misc-animation-groups',
	templateUrl: './misc-animation-groups.component.html',
	styleUrls: ['./misc-animation-groups.component.scss'],
})
export class MiscAnimationGroupsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 5; i++) {
			for (let j = 0; j < 5; j++) {
				this.boxInfos.push({
					x: 32 - 16 * i,
					y: 0,
					z: 32 - 16 * j,
				});
			}
		}
	}
	boxInfos: {
		x: number;
		y: number;
		z: number;
	}[] = [];
}
