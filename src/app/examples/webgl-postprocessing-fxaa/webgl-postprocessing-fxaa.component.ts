import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-fxaa',
	templateUrl: './webgl-postprocessing-fxaa.component.html',
	styleUrls: ['./webgl-postprocessing-fxaa.component.scss'],
})
export class WebglPostprocessingFxaaComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 100; i++) {
			this.meshInfos.push({
				position: {
					x: Math.random() * 500 - 250,
					y: Math.random() * 500 - 250,
					z: Math.random() * 500 - 250,
				},
				rotation: {
					x: Math.random() * 180,
					y: Math.random() * 180,
					z: Math.random() * 180,
				},
				scale: Math.random() * 2 + 1,
			});
		}
	}
	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: number;
	}[] = [];
}
