import { Component } from '@angular/core';
import { NgxBaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-lensflares',
	templateUrl: './webgl-lensflares.component.html',
	styleUrls: ['./webgl-lensflares.component.scss'],
})
export class WebglLensflaresComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.lightInfo.push(this.addLight(0.55, 0.9, 0.5, 5000, 0, -1000));
		this.lightInfo.push(this.addLight(0.08, 0.8, 0.5, 0, 0, -1000));
		this.lightInfo.push(this.addLight(0.995, 0.5, 0.9, 5000, 5000, -1000));
		this.boxInfo = [];

		for (let i = 0; i < 3000; i++) {
			this.boxInfo.push({
				position: {
					x: 8000 * (2.0 * Math.random() - 1.0),
					y: 8000 * (2.0 * Math.random() - 1.0),
					z: 8000 * (2.0 * Math.random() - 1.0),
				},
				rotation: {
					x: Math.random() * 180,
					y: Math.random() * 180,
					z: Math.random() * 180,
				},
			});
		}
	}
	boxInfo: {
		position: {
			x: number;
			y: number;
			z: number;
		};
		rotation: {
			x: number;
			y: number;
			z: number;
		};
	}[] = [];

	lightInfo: {
		color: number;
		x: number;
		y: number;
		z: number;
	}[] = [];

	addLight(h, s, l, x, y, z) {
		const color = new THREE.Color().setHSL(h, s, l);
		return {
			color: color.getHex(),
			x: x,
			y: y,
			z: z,
		};
	}
}
