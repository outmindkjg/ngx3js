import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-colors',
	templateUrl: './webgl-geometry-colors.component.html',
	styleUrls: ['./webgl-geometry-colors.component.scss'],
})
export class WebglGeometryColorsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	radius = 200;

	setGeometry1(geometry: I3JS.BufferGeometry) {
		const count = geometry.attributes.position.count;
		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(new Float32Array(count * 3), 3)
		);
		const color = new THREE.Color();
		const positions = geometry.attributes.position;
		const colors = geometry.attributes.color;
		for (let i = 0; i < count; i++) {
			color.setHSL((positions.getY(i) / this.radius + 1) / 2, 1.0, 0.5);
			colors.setXYZ(i, color.r, color.g, color.b);
		}
	}

	setGeometry2(geometry: I3JS.BufferGeometry) {
		const count = geometry.attributes.position.count;
		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(new Float32Array(count * 3), 3)
		);
		const color = new THREE.Color();
		const positions = geometry.attributes.position;
		const colors = geometry.attributes.color;
		for (let i = 0; i < count; i++) {
			color.setHSL(0, (positions.getY(i) / this.radius + 1) / 2, 0.5);
			colors.setXYZ(i, color.r, color.g, color.b);
		}
	}

	setGeometry3(geometry: I3JS.BufferGeometry) {
		const count = geometry.attributes.position.count;
		geometry.setAttribute(
			'color',
			new THREE.BufferAttribute(new Float32Array(count * 3), 3)
		);
		const color = new THREE.Color();
		const positions = geometry.attributes.position;
		const colors = geometry.attributes.color;
		for (let i = 0; i < count; i++) {
			color.setRGB(1, 0.8 - (positions.getY(i) / this.radius + 1) / 2, 0);
			colors.setXYZ(i, color.r, color.g, color.b);
		}
	}
}
