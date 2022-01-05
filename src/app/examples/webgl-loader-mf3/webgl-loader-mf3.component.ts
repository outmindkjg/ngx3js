import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-mf3',
	templateUrl: './webgl-loader-mf3.component.html',
	styleUrls: ['./webgl-loader-mf3.component.scss'],
})
export class WebglLoaderMf3Component extends NgxBaseComponent<{
	assets: string;
}> {
	constructor() {
		super(
			{
				assets: 'cube_gears',
			},
			[
				{
					name: 'assets',
					type: 'select',
					select: [
						'cube_gears',
						'facecolors',
						'multipletextures',
						'vertexcolors',
					],
				},
			]
			,false , false);
	}
}
