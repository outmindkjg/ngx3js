import { Component } from '@angular/core';
import { BaseComponent, I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-canvases-circle',
	templateUrl: './webgl-multiple-canvases-circle.component.html',
	styleUrls: ['./webgl-multiple-canvases-circle.component.scss'],
})
export class WebglMultipleCanvasesCircleComponent extends BaseComponent<{
	screenCnt: number;
	screenWidth: number;
	screenHeight: number;
	useClear: boolean;
	clearColor: number;
	x: number;
	y: number;
	width: number;
	height: number;
}> {
	constructor() {
		super(
			{
				screenCnt: 5,
				screenWidth: 175,
				screenHeight: 297,
				useClear: true,
				clearColor: 0x555555,
				x: 0,
				y: 0,
				width: 100,
				height: 100,
			},
			[
				{
					name: 'screenCnt',
					type: 'number',
					min: 1,
					max: 5,
					step: 1,
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'screenWidth',
					type: 'number',
					min: 100,
					max: 200,
					step: 1,
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'screenHeight',
					type: 'number',
					min: 100,
					max: 300,
					step: 1,
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'useClear',
					type: 'checkbox',
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'clearColor',
					type: 'color',
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'x',
					type: 'number',
					min: 0,
					max: 30,
					step: 1,
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'y',
					type: 'number',
					min: 0,
					max: 30,
					step: 1,
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'width',
					type: 'number',
					min: 70,
					max: 100,
					step: 1,
					change: () => {
						this.updateScreen();
					},
				},
				{
					name: 'height',
					type: 'number',
					min: 70,
					max: 100,
					step: 1,
					change: () => {
						this.updateScreen();
					},
				},
			]
		);
	}

	updateScreen() {
		this.canvasOptions = {
			type: 'circlescreen',
			cnt: this.controls.screenCnt,
			width: this.controls.screenWidth,
			height: this.controls.screenHeight,
			useClear: this.controls.useClear,
			clearColor: this.controls.clearColor,
		};

		this.viewPort = {
			x: this.controls.x + '%',
			y: this.controls.y + '%',
			width: this.controls.width - this.controls.x * 2 + '%',
			height: this.controls.height - this.controls.y * 2 + '%',
		};
	}
	viewPort: {
		x: number | string;
		y: number | string;
		width: number | string;
		height: number | string;
	} = null;

	canvasOptions: any = null;

	ngOnInit() {
		this.updateScreen();
		this.ballInfos = [];
		const noof_balls = 51;
		for (let i = 0; i < noof_balls; i++) {
			this.ballInfos.push({
				x: (-(noof_balls - 1) / 2) * 400 + i * 400,
				rx: i * 0.5,
			});
		}
	}

	setIcosahedronGeometry(geometry1: I3JS.IBufferGeometry) {
		const count = geometry1.attributes.position.count;
		geometry1.setAttribute(
			'color',
			new THREE.BufferAttribute(new Float32Array(count * 3), 3)
		);
		const color = new THREE.Color();
		const positions = geometry1.attributes.position;
		const colors = geometry1.attributes.color;
		for (let i = 0; i < count; i++) {
			color.setHSL((positions.getY(i) / 200 + 1) / 2, 1.0, 0.5);
			colors.setXYZ(i, color.r, color.g, color.b);
		}
	}

	ballInfos: {
		x: number;
		rx: number;
	}[] = [];
}
