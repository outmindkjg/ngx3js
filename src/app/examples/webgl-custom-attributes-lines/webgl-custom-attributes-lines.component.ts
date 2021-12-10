import { Component } from '@angular/core';
import {
	BaseComponent,
	GeometryComponent, I3JS, MeshComponent, N3js, RendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-custom-attributes-lines',
	templateUrl: './webgl-custom-attributes-lines.component.html',
	styleUrls: ['./webgl-custom-attributes-lines.component.scss'],
})
export class WebglCustomAttributesLinesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	object3d: I3JS.IObject3D = null;
	geometry: I3JS.IBufferGeometry = null;
	uniforms: { [key: string]: any } = {
		amplitude: { type: 'number', value: 5.0 },
		opacity: { type: 'number', value: 0.3 },
		color: { type: 'color', value: '0xffffff' },
	};

	setGeometry(geo: GeometryComponent) {
		const geometry = geo.getGeometry();
		if (geometry !== null && geometry.getAttribute('position') !== undefined) {
			this.geometry = geometry;
			const customColor = this.geometry.attributes
				.customColor ;
			const color = N3js.getColor(0xffffff);
			for (let i = 0, l = customColor.count; i < l; i++) {
				color.setHSL(i / l, 0.5, 0.5);
				color.toArray(customColor.array, i * customColor.itemSize);
			}
		}
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d();
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null && this.geometry !== null) {
			const time = timer.elapsedTime;
			this.object3d.rotation.y = 0.25 * time;

			this.uniforms['amplitude'].value = Math.sin(0.5 * time);
			this.uniforms['color'].value.offsetHSL(0.0005, 0, 0);

			const attributes = this.geometry.attributes as any;
			const array = attributes.displacement.array;

			for (let i = 0, l = array.length; i < l; i += 3) {
				array[i] += 0.3 * (0.5 - Math.random());
				array[i + 1] += 0.3 * (0.5 - Math.random());
				array[i + 2] += 0.3 * (0.5 - Math.random());
			}
			attributes.displacement.needsUpdate = true;
		}
	}
}
