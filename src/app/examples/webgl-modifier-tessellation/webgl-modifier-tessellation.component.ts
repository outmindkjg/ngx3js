import { Component } from '@angular/core';
import { BaseComponent, GeometryComponent, THREE, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-modifier-tessellation',
	templateUrl: './webgl-modifier-tessellation.component.html',
	styleUrls: ['./webgl-modifier-tessellation.component.scss'],
})
export class WebglModifierTessellationComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	uniforms = { amplitude: { value: 1.0 } };

	setGeometry(geometryCom: GeometryComponent) {
		const geometry = geometryCom.getGeometry();
		if (geometry.attributes.position !== undefined) {
			const numFaces = geometry.attributes.position.count / 3;
			const colors = new Float32Array(numFaces * 3 * 3);
			const displacement = new Float32Array(numFaces * 3 * 3);
			const color = new THREE.Color();
			for (let f = 0; f < numFaces; f++) {
				const index = 9 * f;
				const h = 0.2 * Math.random();
				const s = 0.5 + 0.5 * Math.random();
				const l = 0.5 + 0.5 * Math.random();
				color.setHSL(h, s, l);
				const d = 10 * (0.5 - Math.random());
				for (let i = 0; i < 3; i++) {
					colors[index + 3 * i] = color.r;
					colors[index + 3 * i + 1] = color.g;
					colors[index + 3 * i + 2] = color.b;
					displacement[index + 3 * i] = d;
					displacement[index + 3 * i + 1] = d;
					displacement[index + 3 * i + 2] = d;
				}
			}
			geometry.setAttribute(
				'customColor',
				new THREE.BufferAttribute(colors, 3)
			);
			geometry.setAttribute(
				'displacement',
				new THREE.BufferAttribute(displacement, 3)
			);
		}
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		const time = timer.elapsedTime;
		this.uniforms.amplitude.value = 1.0 + Math.sin(time * 0.5);
	}
}
