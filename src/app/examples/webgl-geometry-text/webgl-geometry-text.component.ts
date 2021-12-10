import { Component } from '@angular/core';
import { BaseComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-text',
	templateUrl: './webgl-geometry-text.component.html',
	styleUrls: ['./webgl-geometry-text.component.scss'],
})
export class WebglGeometryTextComponent extends BaseComponent<{
	color: number;
	height: number;
	size: number;
	hover: number;
	curveSegments: number;
	bevelThickness: number;
	bevelSize: number;
	text: string;
	bevelEnabled: boolean;
	fontName: string;
	fontWeight: string;
}> {
	constructor() {
		super(
			{
				color: 0xc56b1a,
				height: 20,
				size: 70,
				hover: 30,
				curveSegments: 4,
				bevelThickness: 2,
				bevelSize: 1.5,
				text: 'three.js',
				bevelEnabled: true,
				fontName: 'optimer',
				fontWeight: 'bold',
			},
			[
				{ name: 'color', type: 'color', title: 'Light Color' },
				{
					name: 'fontName',
					type: 'select',
					title: 'Font Name',
					select: [
						'helvetiker',
						'optimer',
						'gentilis',
						'droid_sans',
						'droid_serif',
					],
				},
				{
					name: 'fontWeight',
					type: 'select',
					title: 'Font Weight',
					select: ['regular', 'bold'],
				},
				{ name: 'bevelEnabled', type: 'checkbox', title: 'Bevel Enabled' },
			]
		);
	}
}
