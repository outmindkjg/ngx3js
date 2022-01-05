import { Component } from '@angular/core';
import { NgxBaseComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-physical-reflectivity',
	templateUrl: './webgl-materials-physical-reflectivity.component.html',
	styleUrls: ['./webgl-materials-physical-reflectivity.component.scss'],
})
export class WebglMaterialsPhysicalReflectivityComponent extends NgxBaseComponent<{
	projection: string;
	autoRotate: boolean;
	reflectivity: number;
	background: boolean;
	exposure: number;
	gemColor: string;
}> {
	constructor() {
		super(
			{
				projection: 'normal',
				autoRotate: true,
				reflectivity: 1.0,
				background: false,
				exposure: 1.0,
				gemColor: 'Green',
			},
			[
				{ name: 'reflectivity', type: 'number', min: 0, max: 1 },
				{ name: 'exposure', type: 'number', min: 0, max: 1 },
				{ name: 'autoRotate', type: 'checkbox' },
				{
					name: 'gemColor',
					type: 'select',
					select: ['Blue', 'Green', 'Red', 'White', 'Black'],
					change: () => {
						this.changeGemColor();
					},
				},
			]
			,false , false);
	}

	ngOnInit() {
		this.changeGemColor();
	}

	changeGemColor() {
		switch (this.controls.gemColor) {
			case 'Blue':
				this.gemBackMaterialColor = 0x000088;
				break;
			case 'Green':
				this.gemBackMaterialColor = 0x008800;
				break;
			case 'Red':
				this.gemBackMaterialColor = 0x880000;
				break;
			case 'White':
				this.gemBackMaterialColor = 0x888888;
				break;
			case 'Black':
				this.gemBackMaterialColor = 0x0f0f0f;
				break;
		}
	}
	gemBackMaterialColor: number = null;
}
