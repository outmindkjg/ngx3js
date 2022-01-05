import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-custom-attributes-points2',
	templateUrl: './webgl-custom-attributes-points2.component.html',
	styleUrls: ['./webgl-custom-attributes-points2.component.scss'],
})
export class WebglCustomAttributesPoints2Component extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	object3d: I3JS.Object3D = null;
	geometry: I3JS.BufferGeometry = null;
	sphereGeometryLength: number = 68 * (38 - 1);
	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d();
		const geometry: I3JS.BufferGeometry = (this.object3d as any).geometry;
		if (geometry !== null && geometry.getAttribute('position') !== undefined) {
			this.geometry = geometry;
			const positionAttribute = geometry.getAttribute('position');
			const attributes = geometry.attributes;
			const colors = geometry.getAttribute('ca').array;
			const sizes = geometry.getAttribute('size').array as any;
			const color = new THREE.Color();
			const vertex = new THREE.Vector3();
			const radius = 100;
			const sphereGeometryLength = this.sphereGeometryLength; // sphereGeometry.getAttribute( 'position' ).count;
			for (let i = 0, l = positionAttribute.count; i < l; i++) {
				vertex.fromBufferAttribute(positionAttribute, i);
				if (i < sphereGeometryLength) {
					color.setHSL(
						0.01 + 0.1 * (i / sphereGeometryLength),
						0.99,
						(vertex.y + radius) / (4 * radius)
					);
				} else {
					color.setHSL(0.6, 0.75, 0.25 + vertex.y / (2 * radius));
				}
				color.toArray(colors, i * 3);
				sizes[i] = i < sphereGeometryLength ? 10 : 40;
			}
			attributes.size.needsUpdate = true;
			attributes.ca.needsUpdate = true;
			(this.object3d as any).material.needsUpdate = true;
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null && this.geometry !== null) {
			const time = timer.elapsedTime * 5;
			this.object3d.rotation.y = this.object3d.rotation.z = 0.02 * time;
			const geometry = this.geometry;
			const attributesSize = geometry.attributes.size as any;
			for (let i = 0; i < attributesSize.array.length; i++) {
				if (i < this.sphereGeometryLength) {
					attributesSize.array[i] = 16 + 12 * Math.sin(0.1 * i + time);
				}
			}
			attributesSize.needsUpdate = true;
		}
	}
}
