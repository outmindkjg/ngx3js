import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-css3d-sandbox',
	templateUrl: './css3d-sandbox.component.html',
	styleUrls: ['./css3d-sandbox.component.scss'],
})
export class Css3dSandboxComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 10; i++) {
			this.boxInfos.push({
				cssStyle: {
					width: 100,
					height: 100,
					opacity: i < 5 ? 0.5 : 1,
					background: Math.random() * 0xffffff,
				},
				position: {
					x: Math.random() * 200 - 100,
					y: Math.random() * 200 - 100,
					z: Math.random() * 200 - 100,
				},
				rotation: {
					x: Math.random() * 180,
					y: Math.random() * 180,
					z: Math.random() * 180,
				},
				scale: { x: Math.random() + 0.5, y: Math.random() + 0.5, z: 1 },
			});
		}
	}
	boxInfos: {
		cssStyle: any;
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
	}[] = [];
}
