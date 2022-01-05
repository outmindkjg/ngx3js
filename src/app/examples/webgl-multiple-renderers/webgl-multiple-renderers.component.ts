import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-renderers',
	templateUrl: './webgl-multiple-renderers.component.html',
	styleUrls: ['./webgl-multiple-renderers.component.scss'],
})
export class WebglMultipleRenderersComponent extends NgxBaseComponent<{
	layout: string;
	rate: number;
	margin: number;
}> {
	constructor() {
		super(
			{
				layout: '1x2',
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
					name: 'margin',
					type: 'number',
					min: 0,
					max: 5,
					change: () => {
						this.changeLayout();
					},
				},
			]
			,false , false);
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

	setGeometry1(geometry: I3JS.IcosahedronBufferGeometry) {
		const count = geometry.attributes.position.count;
		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(new Float32Array(count * 3), 3)
		);
		const positions = geometry.attributes.position;
		const colors = geometry.attributes.color;
		const color = new THREE.Color();
		const radius = 200;
		for (let i = 0; i < count; i++) {
			color.setHSL((positions.getY(i) / radius + 1) / 2, 1.0, 0.5);
			colors.setXYZ(i, color.r, color.g, color.b);
		}
	}

	setGeometry2(geometry: I3JS.IcosahedronBufferGeometry) {
		const count = geometry.attributes.position.count;
		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(new Float32Array(count * 3), 3)
		);
		const positions = geometry.attributes.position;
		const colors = geometry.attributes.color;
		const color = new THREE.Color();
		const radius = 200;
		for (let i = 0; i < count; i++) {
			color.setHSL(0, (positions.getY(i) / radius + 1) / 2, 0.5);
			colors.setXYZ(i, color.r, color.g, color.b);
		}
	}

	setGeometry3(geometry: I3JS.IcosahedronBufferGeometry) {
		const count = geometry.attributes.position.count;
		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(new Float32Array(count * 3), 3)
		);
		const positions = geometry.attributes.position;
		const colors = geometry.attributes.color;
		const color = new THREE.Color();
		const radius = 200;
		for (let i = 0; i < count; i++) {
			color.setRGB(1, 0.8 - (positions.getY(i) / radius + 1) / 2, 0);
			colors.setXYZ(i, color.r, color.g, color.b);
		}
	}
}
