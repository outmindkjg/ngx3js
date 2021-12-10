import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl2-multisampled-renderbuffers',
	templateUrl: './webgl2-multisampled-renderbuffers.component.html',
	styleUrls: ['./webgl2-multisampled-renderbuffers.component.scss'],
})
export class Webgl2MultisampledRenderbuffersComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 10; i++) {
			this.meshInfos.push({
				px: Math.random() * 600 - 300,
				py: Math.random() * 600 - 300,
				pz: Math.random() * 600 - 300,
				rx: Math.random() * 180,
				rz: Math.random() * 180,
				scale: Math.random() * 5 + 5,
			});
		}
	}

	meshInfos: {
		px: number;
		py: number;
		pz: number;
		rx: number;
		rz: number;
		scale: number;
	}[] = [];
}
