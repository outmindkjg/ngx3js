import { Component } from '@angular/core';
import { IRendererEvent, NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-text',
	templateUrl: './webgl-geometry-text.component.html',
	styleUrls: ['./webgl-geometry-text.component.scss'],
})
export class WebglGeometryTextComponent extends NgxBaseComponent<{
	color: number;
	height: number;
	size: number;
	hover: number;
	curveSegments: number;
	bevelThickness: number;
	bevelSize: number;
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
				hover: 55,
				curveSegments: 4,
				bevelThickness: 2,
				bevelSize: 1.5,
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
		, false, false);
	}

	text: string = 'three.js';
	firstLetter : boolean = true;
	onDocumentKeyPress(event : IRendererEvent) {
		switch(event.type) {
			case 'keydown' :
				if ( this.firstLetter ) {
					this.firstLetter = false;
					this.text = '';
				}
				switch(event.keyInfo.code) {
					case 'Backspace' :
						this.text = this.text.substring( 0, this.text.length - 1 );
						break;
				}
				break;
			case 'keypress' :
				switch(event.keyInfo.code) {
					case 'Enter' :
					case 'Backspace' :
						break;
					default :
						this.text += event.keyInfo.key;
						break;
				}
				break;
			default :
				break;
		}
	}
}
