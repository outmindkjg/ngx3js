import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-instancing',
	templateUrl: './webgl-buffergeometry-instancing.component.html',
	styleUrls: ['./webgl-buffergeometry-instancing.component.scss'],
})
export class WebglBuffergeometryInstancingComponent extends NgxBaseComponent<{
	instanceCount: number;
}> {
	constructor() {
		super({ instanceCount: 50000 }, [
			{
				name: 'instanceCount',
				type: 'number',
				min: 0,
				max: 50000,
				step: 1,
				change: () => {
					if (this.object3d !== null) {
						(this.object3d as any).geometry.instanceCount =
							this.controls.instanceCount;
					}
				},
			},
		]);
	}

	ngOnInit() {
		const vector = new THREE.Vector4();
		const instances = 50000;
		const positions = [];
		const offsets = [];
		const colors = [];
		const orientationsStart = [];
		const orientationsEnd = [];

		positions.push(0.025, -0.025, 0);
		positions.push(-0.025, 0.025, 0);
		positions.push(0, 0, 0.025);

		// instanced attributes

		for (let i = 0; i < instances; i++) {
			// offsets

			offsets.push(
				Math.random() - 0.5,
				Math.random() - 0.5,
				Math.random() - 0.5
			);

			// colors

			colors.push(Math.random(), Math.random(), Math.random(), Math.random());

			// orientation start

			vector.set(
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1
			);
			vector.normalize();

			orientationsStart.push(vector.x, vector.y, vector.z, vector.w);

			// orientation end

			vector.set(
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1
			);
			vector.normalize();
			orientationsEnd.push(vector.x, vector.y, vector.z, vector.w);
		}
		this.positions = positions;
		this.offsets = offsets;
		this.colors = colors;
		this.orientationsStart = orientationsStart;
		this.orientationsEnd = orientationsEnd;
	}

	positions = [];
	offsets = [];
	colors = [];
	orientationsStart = [];
	orientationsEnd = [];

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d();
		this.uniforms = (this.object3d as any).material.uniforms;
	}

	object3d: I3JS.Object3D = null;
	uniforms: { [uniform: string]: I3JS.IUniform } = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null && this.uniforms !== null) {
			const time = timer.elapsedTime * 1000;
			this.object3d.rotation.y = time * 0.0005;
			this.uniforms['time'].value = time * 0.005;
			this.uniforms['sineTime'].value = Math.sin(
				this.uniforms['time'].value * 0.05
			);
		}
	}
}
