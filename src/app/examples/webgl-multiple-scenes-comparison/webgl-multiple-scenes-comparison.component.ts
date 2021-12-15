import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-scenes-comparison',
	templateUrl: './webgl-multiple-scenes-comparison.component.html',
	styleUrls: ['./webgl-multiple-scenes-comparison.component.scss'],
})
export class WebglMultipleScenesComparisonComponent extends NgxBaseComponent<{
	layout: string;
	rate: number;
	margin: number;
}> {
	constructor() {
		super(
			{
				layout: '2x1',
				rate: 50,
				margin: 0,
			},
			[
				{
					name: 'layout',
					type: 'select',
					select: ['1x2', '2x1'],
					change: () => {
						this.changeLayout();
					},
				},
				{
					name: 'rate',
					type: 'number',
					min: 10,
					max: 90,
					change: () => {
						this.changeLayout();
					},
				},
				{
					name: 'margin',
					type: 'number',
					min: 0,
					max: 5,
					change: () => {
						this.changeLayout();
					},
				},
			]
		);
	}

	ngOnInit() {
		this.changeLayout();
	}

	changeLayout() {
		const firstRate = this.controls.rate;
		const secondRate = 100 - this.controls.rate;
		switch (this.controls.layout) {
			case '2x1':
				this.layoutFirst = {
					x: 0,
					y: 0,
					width: '' + firstRate + '%-' + this.controls.margin,
					height: '100%',
				};
				this.layoutSecond = {
					x: '' + firstRate + '%+' + this.controls.margin * 2,
					y: 0,
					width: '' + secondRate + '%-' + this.controls.margin,
					height: '100%',
				};
				break;
			case '1x2':
			default:
				this.layoutFirst = {
					x: 0,
					y: 0,
					width: '100%',
					height: '' + firstRate + '%-' + this.controls.margin,
				};
				this.layoutSecond = {
					x: 0,
					y: '' + firstRate + '%+' + this.controls.margin * 2,
					width: '100%',
					height: '' + secondRate + '%-' + this.controls.margin,
				};
				break;
		}
	}

	layoutFirst: {
		x: string | number;
		y: string | number;
		width: string | number;
		height: string | number;
	} = null;
	layoutSecond: {
		x: string | number;
		y: string | number;
		width: string | number;
		height: string | number;
	} = null;
}
