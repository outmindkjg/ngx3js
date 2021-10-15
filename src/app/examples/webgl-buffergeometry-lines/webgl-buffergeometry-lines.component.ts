import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-lines',
	templateUrl: './webgl-buffergeometry-lines.component.html',
	styleUrls: ['./webgl-buffergeometry-lines.component.scss'],
})
export class WebglBuffergeometryLinesComponent extends BaseComponent<{
	morphTargets: boolean;
}> {
	constructor() {
		super(
			{
				morphTargets: false,
			},
			[{ name: 'morphTargets', type: 'checkbox' }]
		);
	}

	ngOnInit() {
		const segments = 10000;
		const r = 800;
		let t = 0;
		const positions = [];
		const colors = [];

		for (let i = 0; i < segments; i++) {
			const x = Math.random() * r - r / 2;
			const y = Math.random() * r - r / 2;
			const z = Math.random() * r - r / 2;

			// positions

			positions.push(x, y, z);

			// colors

			colors.push(x / r + 0.5);
			colors.push(y / r + 0.5);
			colors.push(z / r + 0.5);
		}
		this.positions = positions;
		this.colors = colors;

		const data = [];
		for (let i = 0; i < segments; i++) {
			const x = Math.random() * r - r / 2;
			const y = Math.random() * r - r / 2;
			const z = Math.random() * r - r / 2;
			data.push(x, y, z);
		}
		this.morphAttributes = {
			position: [data],
		};
	}

	positions: number[] = [];
	colors: number[] = [];
	morphAttributes: {
		position: number[][];
	} = null;

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d() as THREE.Line;
	}

	object3d: THREE.Line = null;
	t: number = 0;
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null) {
			const delta = timer.delta;
			const time = timer.elapsedTime;
			this.object3d.rotation.x = time * 0.25;
			this.object3d.rotation.y = time * 0.5;
			if (this.controls.morphTargets) {
				this.t += delta * 0.5;
				this.object3d.morphTargetInfluences[0] = Math.abs(Math.sin(this.t));
			}
		}
	}
}
