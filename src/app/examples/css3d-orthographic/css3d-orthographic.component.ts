import { Component } from '@angular/core';
import { BaseComponent } from 'ngx3js';

@Component({
	selector: 'app-css3d-orthographic',
	templateUrl: './css3d-orthographic.component.html',
	styleUrls: ['./css3d-orthographic.component.scss'],
})
export class Css3dOrthographicComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.planeInfos = [];
		this.planeInfos.push({
			width: 100,
			height: 100,
			color: 'chocolate',
			px: -50,
			py: 0,
			pz: 0,
			rx: 0,
			ry: -90,
			rz: 0,
		});

		this.planeInfos.push({
			width: 100,
			height: 100,
			color: 'saddlebrown',
			px: 0,
			py: 0,
			pz: 50,
			rx: 0,
			ry: 0,
			rz: 0,
		});

		this.planeInfos.push({
			width: 100,
			height: 100,
			color: 'yellowgreen',
			px: 0,
			py: 50,
			pz: 0,
			rx: -90,
			ry: 0,
			rz: 0,
		});

		this.planeInfos.push({
			width: 300,
			height: 300,
			color: 'seagreen',
			px: 0,
			py: -50,
			pz: 0,
			rx: -90,
			ry: 0,
			rz: 0,
		});
	}
	planeInfos: {
		width: number;
		height: number;
		color: string;
		px: number;
		py: number;
		pz: number;
		rx: number;
		ry: number;
		rz: number;
	}[] = [];
}
