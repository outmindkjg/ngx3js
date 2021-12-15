import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-custom-attributes-points',
	templateUrl: './webgl-custom-attributes-points.component.html',
	styleUrls: ['./webgl-custom-attributes-points.component.scss'],
})
export class WebglCustomAttributesPointsComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const amount = 100000;
		const radius = 200;
		const positions = new Float32Array(amount * 3);
		const colors = new Float32Array(amount * 3);
		const sizes = new Float32Array(amount);
		const vertex = new THREE.Vector3();
		const color = new THREE.Color(0xffffff);
		for (let i = 0; i < amount; i++) {
			vertex.x = (Math.random() * 2 - 1) * radius;
			vertex.y = (Math.random() * 2 - 1) * radius;
			vertex.z = (Math.random() * 2 - 1) * radius;
			vertex.toArray(positions, i * 3);
			if (vertex.x < 0) {
				color.setHSL(0.5 + 0.1 * (i / amount), 0.7, 0.5);
			} else {
				color.setHSL(0.0 + 0.1 * (i / amount), 0.9, 0.5);
			}
			color.toArray(colors, i * 3);
			sizes[i] = 10;
		}
		this.positions = positions;
		this.colors = colors;
		this.sizes = sizes;
	}

	positions: Float32Array = null;
	colors: Float32Array = null;
	sizes: Float32Array = null;

	object3d: I3JS.Object3D = null;
	geometry: I3JS.BufferGeometry = null;
	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d();
		const geometry: I3JS.BufferGeometry = (this.object3d as any).geometry;
		if (geometry !== null && geometry.getAttribute('position') !== undefined) {
			this.geometry = geometry;
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null && this.geometry !== null) {
			const time = timer.elapsedTime * 5;
			this.object3d.rotation.z = 0.01 * time;
			const geometry = this.geometry;
			const attributesSize = geometry.attributes.size as any;
			for (let i = 0; i < attributesSize.array.length; i++) {
				attributesSize.array[i] = 14 + 13 * Math.sin(0.1 * i + time);
			}
			attributesSize.needsUpdate = true;
		}
	}
}
