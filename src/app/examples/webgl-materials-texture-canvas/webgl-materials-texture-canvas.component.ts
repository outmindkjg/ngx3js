import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-texture-canvas',
	templateUrl: './webgl-materials-texture-canvas.component.html',
	styleUrls: ['./webgl-materials-texture-canvas.component.scss'],
})
export class WebglMaterialsTextureCanvasComponent extends NgxBaseComponent<{
	backgroundColor: number;
	lineColor: number;
}> {
	constructor() {
		super(
			{
				backgroundColor: 0xffffff,
				lineColor: 0x000000,
			},
			[
				{ name: 'backgroundColor', type: 'color' },
				{ name: 'lineColor', type: 'color' },
			]
			,false , false);
	}
}
