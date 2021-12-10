import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing',
	templateUrl: './webgl-postprocessing.component.html',
	styleUrls: ['./webgl-postprocessing.component.scss'],
})
export class WebglPostprocessingComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 100; i++) {
			this.meshInfos.push({
				position: {
					x: Math.random() - 0.5,
					y: Math.random() - 0.5,
					z: Math.random() - 0.5,
					multiply: Math.random() * 400,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
				scale: Math.random() * 50,
			});
		}
	}
	meshInfos: {
		position: { x: number; y: number; z: number; multiply: number };
		rotation: { x: number; y: number; z: number };
		scale: number;
	}[] = [];
}
