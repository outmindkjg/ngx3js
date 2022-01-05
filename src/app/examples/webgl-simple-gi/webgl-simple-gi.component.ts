import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-simple-gi',
	templateUrl: './webgl-simple-gi.component.html',
	styleUrls: ['./webgl-simple-gi.component.scss'],
})
export class WebglSimpleGiComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	ngOnInit() {
		this.boxColors = [];
		for (let i = 0; i < 8; i++) {
			this.boxColors.push(Math.random() * 0xffffff);
		}
	}
	boxColors: number[] = [];
}
