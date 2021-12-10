import { Component } from '@angular/core';
import { BaseComponent, I3JS, N3js, RendererTimer } from 'ngx3js';

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
	lastMesh: I3JS.IMesh = null;
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			if (this.lastMesh !== null) {
				this.lastMesh.parent.remove(this.lastMesh);
				this.lastMesh.geometry.dispose();
				(this.lastMesh.material as any).dispose();
			}
			const geometry = N3js.getSphereGeometry(
				50,
				Math.random() * 64,
				Math.random() * 32
			);
			const texture = N3js.getCanvasTexture(this.createImage());
			const material = N3js.getMeshBasicMaterial({
				map: texture,
				wireframe: true,
			});
			const mesh = N3js.getMesh(geometry, material);
			this.mesh.getObject3d().add(mesh as any);
			this.lastMesh = mesh;
		}
	}
}
