import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-multiple-views',
	templateUrl: './webgl-multiple-views.component.html',
	styleUrls: ['./webgl-multiple-views.component.scss'],
})
export class WebglMultipleViewsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	canvasOptions = {
		type: 'multiview',
		views: [
			{
				left: 0,
				top: 0,
				width: 0.5,
				height: 1.0,
				background: 'color(0.5, 0.5, 0.7 )',
				eye: [0, 300, 1800],
				up: [0, 1, 0],
				fov: 30,
			},
			{
				left: 0.5,
				top: 0,
				width: 0.5,
				height: 0.5,
				background: 'Color( 0.7, 0.5, 0.5 )',
				eye: [0, 1800, 0],
				up: [0, 0, 1],
				fov: 45,
			},
			{
				left: 0.5,
				top: 0.5,
				width: 0.5,
				height: 0.5,
				background: 'Color( 0.5, 0.7, 0.7 )',
				eye: [1400, 800, 1400],
				up: [0, 1, 0],
				fov: 60,
			},
		],
	};
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
