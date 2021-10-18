import { Component } from '@angular/core';
import { BaseComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-test-memory',
	templateUrl: './webgl-test-memory.component.html',
	styleUrls: ['./webgl-test-memory.component.scss'],
})
export class WebglTestMemoryComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	createImage() {
		const canvas = document.createElement('canvas');
		canvas.width = 256;
		canvas.height = 256;
		const context = canvas.getContext('2d');
		context.fillStyle =
			'rgb(' +
			Math.floor(Math.random() * 256) +
			',' +
			Math.floor(Math.random() * 256) +
			',' +
			Math.floor(Math.random() * 256) +
			')';
		context.fillRect(0, 0, 256, 256);
		return canvas;
	}
	lastMesh: THREE.Mesh = null;
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			if (this.lastMesh !== null) {
				this.lastMesh.parent.remove(this.lastMesh);
				this.lastMesh.geometry.dispose();
				(this.lastMesh.material as THREE.Material).dispose();
			}
			const geometry = new THREE.SphereGeometry(
				50,
				Math.random() * 64,
				Math.random() * 32
			);
			const texture = new THREE.CanvasTexture(this.createImage());
			const material = new THREE.MeshBasicMaterial({
				map: texture,
				wireframe: true,
			});
			const mesh = new THREE.Mesh(geometry, material);
			this.mesh.getObject3d().add(mesh);
			this.lastMesh = mesh;
		}
	}
}
