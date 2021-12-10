import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, N3js, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-instancing-interleaved',
	templateUrl: './webgl-buffergeometry-instancing-interleaved.component.html',
	styleUrls: ['./webgl-buffergeometry-instancing-interleaved.component.scss'],
})
export class WebglBuffergeometryInstancingInterleavedComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	vertexBuffer: number[] = [
		// Front
		-1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, -1, -1, 1, 0, 0, 1, 0, 0,
		1, -1, 1, 0, 1, 1, 0, 0,
		// Back
		1, 1, -1, 0, 1, 0, 0, 0, -1, 1, -1, 0, 0, 0, 0, 0, 1, -1, -1, 0, 1, 1, 0, 0,
		-1, -1, -1, 0, 0, 1, 0, 0,
		// Left
		-1, 1, -1, 0, 1, 1, 0, 0, -1, 1, 1, 0, 1, 0, 0, 0, -1, -1, -1, 0, 0, 1, 0,
		0, -1, -1, 1, 0, 0, 0, 0, 0,
		// Right
		1, 1, 1, 0, 1, 0, 0, 0, 1, 1, -1, 0, 1, 1, 0, 0, 1, -1, 1, 0, 0, 0, 0, 0, 1,
		-1, -1, 0, 0, 1, 0, 0,
		// Top
		-1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, -1, 1, -1, 0, 0, 1, 0, 0,
		1, 1, -1, 0, 1, 1, 0, 0,
		// Bottom
		1, -1, 1, 0, 1, 0, 0, 0, -1, -1, 1, 0, 0, 0, 0, 0, 1, -1, -1, 0, 1, 1, 0, 0,
		-1, -1, -1, 0, 0, 1, 0, 0,
	];

	indices: number[] = [
		0, 2, 1, 2, 3, 1, 4, 6, 5, 6, 7, 5, 8, 10, 9, 10, 11, 9, 12, 14, 13, 14, 15,
		13, 16, 17, 18, 18, 17, 19, 20, 21, 22, 22, 21, 23,
	];

	makeMatrix(matrix: I3JS.IMatrix4) {
		const offset = N3js.getVector3();
		const orientation = N3js.getQuaternion();
		const scale = N3js.getVector3(1, 1, 1);
		let x, y, z, w;
		x = Math.random() * 100 - 50;
		y = Math.random() * 100 - 50;
		z = Math.random() * 100 - 50;

		offset.set(x, y, z).normalize();
		offset.multiplyScalar(5); // move out at least 5 units from center in current direction
		offset.set(x + offset.x, y + offset.y, z + offset.z);

		// orientations

		x = Math.random() * 2 - 1;
		y = Math.random() * 2 - 1;
		z = Math.random() * 2 - 1;
		w = Math.random() * 2 - 1;
		orientation.set(x, y, z, w).normalize();
		matrix.compose(offset, orientation, scale);
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.object3d = this.mesh.getObject3d() ;
	}

	object3d: I3JS.IInstancedMesh = null;
	lastTime: number = 0;
	moveQ = N3js.getQuaternion(0.5, 0.5, 0.5, 0.0).normalize();
	tmpQ = N3js.getQuaternion();
	tmpM = N3js.getMatrix4();
	currentM = N3js.getMatrix4();
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null) {
			const time = timer.elapsedTime * 1000;
			this.object3d.rotation.y = time * 0.00005;
			const delta = (time - this.lastTime) / 5000;
			this.tmpQ
				.set(
					this.moveQ.x * delta,
					this.moveQ.y * delta,
					this.moveQ.z * delta,
					1
				)
				.normalize();
			this.tmpM.makeRotationFromQuaternion(this.tmpQ);

			for (let i = 0, il = this.object3d.count; i < il; i++) {
				this.object3d.getMatrixAt(i, this.currentM);
				this.currentM.multiply(this.tmpM);
				this.object3d.setMatrixAt(i, this.currentM);
			}

			this.object3d.instanceMatrix.needsUpdate = true;
			this.lastTime = time;
		}
	}
}
