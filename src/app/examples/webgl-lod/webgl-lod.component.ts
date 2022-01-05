import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-lod',
	templateUrl: './webgl-lod.component.html',
	styleUrls: ['./webgl-lod.component.scss'],
})
export class WebglLodComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.lodInfos = [];
		for (let j = 0; j < 500; j++) {
			this.lodInfos.push({
				x: 9000 * (0.5 - Math.random()),
				y: 4500 * (0.5 - Math.random()),
				z: 9000 * (0.5 - Math.random()),
			});
		}
	}

	lodInfos: {
		x: number;
		y: number;
		z: number;
	}[] = [];
}
