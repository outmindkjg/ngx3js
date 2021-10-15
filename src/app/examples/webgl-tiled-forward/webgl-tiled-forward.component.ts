import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-tiled-forward',
	templateUrl: './webgl-tiled-forward.component.html',
	styleUrls: ['./webgl-tiled-forward.component.scss'],
})
export class WebglTiledForwardComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.headInfos = [];
		const RADIUS = 75;
		for (let i = 0; i < 4; i++) {
			this.headInfos.push({
				x: Math.sin((i * Math.PI) / 2) * RADIUS,
				ry: 90 * i,
				z: Math.cos((i * Math.PI) / 2) * RADIUS,
			});
		}
	}

	headInfos: {
		x: number;
		ry: number;
		z: number;
	}[] = [];
}
