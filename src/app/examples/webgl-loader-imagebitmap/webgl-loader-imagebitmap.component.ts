import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-imagebitmap',
	templateUrl: './webgl-loader-imagebitmap.component.html',
	styleUrls: ['./webgl-loader-imagebitmap.component.scss'],
})
export class WebglLoaderImagebitmapComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.cubeInfos = [];
		for (let i = 0; i < 6; i++) {
			this.cubeInfos.push({
				position: {
					x: Math.random() * 2 - 1,
					y: Math.random() * 2 - 1,
					z: Math.random() * 2 - 1,
				},
				rotation: {
					x: Math.random() * 2 * 180,
					y: Math.random() * 2 * 180,
					z: Math.random() * 2 * 180,
				},
				material: i >= 3 ? 'material2' : 'material1',
			});
		}
	}
	cubeInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		material: string;
	}[] = [];
}
