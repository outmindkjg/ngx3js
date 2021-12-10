import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webxr-ar-lighting',
	templateUrl: './webxr-ar-lighting.component.html',
	styleUrls: ['./webxr-ar-lighting.component.scss'],
})
export class WebxrArLightingComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const rows = 3;
		const cols = 3;
		this.ballMeshInfos = [];
		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < cols; j++) {
				this.ballMeshInfos.push({
					color: 0xdddddd,
					roughness: i / rows,
					metalness: j / cols,
					x: (i + 0.5 - rows * 0.5) * 0.4,
					y: (j + 0.5 - cols * 0.5) * 0.4,
					z: 0,
				});
			}
		}
	}

	ballMeshInfos: {
		color: number;
		roughness: number;
		metalness: number;
		x: number;
		y: number;
		z: number;
	}[] = [];
}
