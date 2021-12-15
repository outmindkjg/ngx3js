import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-x',
	templateUrl: './webgl-loader-x.component.html',
	styleUrls: ['./webgl-loader-x.component.scss'],
})
export class WebglLoaderXComponent extends NgxBaseComponent<{
	anime: string;
}> {
	constructor() {
		super(
			{
				anime: 'stand',
			},
			[
				{
					name: 'anime',
					type: 'select',
					select: {
						Stand: 'stand',
						Walk: 'wark',
						Attack: 'attack',
					},
				},
			]
		);
	}
}
