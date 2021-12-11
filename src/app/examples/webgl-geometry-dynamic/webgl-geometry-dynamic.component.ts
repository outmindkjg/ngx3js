import { Component } from '@angular/core';
import { BaseComponent, THREE, MeshComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-dynamic',
	templateUrl: './webgl-geometry-dynamic.component.html',
	styleUrls: ['./webgl-geometry-dynamic.component.scss'],
})
export class WebglGeometryDynamicComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	worldWidth = 128;
	worldDepth = 128;
	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		const geometry = this.mesh.getGeometry();
		geometry.rotateX(Math.PI / 2);
		const position = geometry.attributes.position;
		position['usage'] = THREE.DynamicDrawUsage;
		for (let i = 0; i < position.count; i++) {
			const y = 35 * Math.sin(i / 2);
			position.setY(i, y);
		}
		position.needsUpdate = true;
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			const geometry = this.mesh.getGeometry();
			const time = timer.elapsedTime * 10;
			const position = geometry.attributes.position;
			for (let i = 0; i < position.count; i++) {
				const y = 35 * Math.sin(i / 5 + (time + i) / 7);
				position.setY(i, y);
			}
			position.needsUpdate = true;
		}
	}
}
