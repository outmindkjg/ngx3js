import { Component } from '@angular/core';
import { BaseComponent  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-rgb-halftone',
	templateUrl: './webgl-postprocessing-rgb-halftone.component.html',
	styleUrls: ['./webgl-postprocessing-rgb-halftone.component.scss'],
})
export class WebglPostprocessingRgbHalftoneComponent extends BaseComponent<{
	shape: number;
	radius: number;
	rotateR: number;
	rotateB: number;
	rotateG: number;
	scatter: number;
	blending: number;
	blendingMode: number;
	greyscale: boolean;
	disable: boolean;
}> {
	constructor() {
		super(
			{
				shape: 1,
				radius: 4,
				rotateR: 15,
				rotateB: 15 * 2,
				rotateG: 15 * 3,
				scatter: 0,
				blending: 1,
				blendingMode: 1,
				greyscale: false,
				disable: false,
			},
			[
				{
					name: 'shape',
					type: 'select',
					select: { Dot: 1, Ellipse: 2, Line: 3, Square: 4 },
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'radius',
					type: 'number',
					min: 1,
					max: 25,
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'rotateR',
					type: 'number',
					min: 0,
					max: 90,
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'rotateG',
					type: 'number',
					min: 0,
					max: 90,
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'rotateB',
					type: 'number',
					min: 0,
					max: 90,
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'scatter',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'greyscale',
					type: 'checkbox',
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'blending',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'blendingMode',
					type: 'select',
					select: { Linear: 1, Multiply: 2, Add: 3, Lighter: 4, Darker: 5 },
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'disable',
					type: 'checkbox',
					change: () => {
						this.changePass();
					},
				},
			]
		);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 50; ++i) {
			this.boxInfos.push({
				position: {
					x: Math.random() * 16 - 8,
					y: Math.random() * 16 - 8,
					z: Math.random() * 16 - 8,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
			});
		}
	}
	boxInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
	}[] = [];

	uniforms: any = {};

	changePass() {
		if (this.uniforms !== null) {
			const uniforms = this.uniforms;
			uniforms['radius'].value = this.controls.radius;
			uniforms['rotateR'].value = this.controls.rotateR * (Math.PI / 180);
			uniforms['rotateG'].value = this.controls.rotateG * (Math.PI / 180);
			uniforms['rotateB'].value = this.controls.rotateB * (Math.PI / 180);
			uniforms['scatter'].value = this.controls.scatter;
			uniforms['shape'].value = this.controls.shape;
			uniforms['greyscale'].value = this.controls.greyscale;
			uniforms['blending'].value = this.controls.blending;
			uniforms['blendingMode'].value = this.controls.blendingMode;
			uniforms['disable'].value = this.controls.disable;
		}
	}
}
