import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererEvent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-hierarchy',
	templateUrl: './webgl-geometry-hierarchy.component.html',
	styleUrls: ['./webgl-geometry-hierarchy.component.scss'],
})
export class WebglGeometryHierarchyComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}
	meshInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
	}[] = [];
	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 1000; i++) {
			this.meshInfos.push({
				position: {
					x: Math.random() * 2000 - 1000,
					y: Math.random() * 2000 - 1000,
					z: Math.random() * 2000 - 1000,
				},
				rotation: {
					x: Math.random() * 2 * 180,
					y: Math.random() * 2 * 180,
					z: 0,
				},
			});
		}
	}

	mouse = { x: 0, y: 0 };
	setEventListener(event: IRendererEvent) {
		this.mouse = event.mouse.multiplyScalar(10);
	}

	elapsedTime: number = 0;
	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.camera !== null && this.mesh !== null) {
			const position = this.camera.getPosition();
			this.camera.addPosition(
				(this.mouse.x - position.x) * 0.05,
				(-this.mouse.y - position.y) * 0.05,
				0
			);
			this.camera.setLookat(0, 0, 0);
			this.elapsedTime += timer.delta;
			const time = this.elapsedTime;
			const rx = Math.sin(time * 0.7) * 30,
				ry = Math.sin(time * 0.3) * 30,
				rz = Math.sin(time * 0.2) * 30;
			this.mesh.setRotation(rx, ry, rz);
		}
	}
}
