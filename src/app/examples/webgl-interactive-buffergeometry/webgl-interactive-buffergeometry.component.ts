import { Component } from '@angular/core';
import {
	BaseComponent, I3JS, MeshComponent, N3js, RendererEvent,
	RendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-interactive-buffergeometry',
	templateUrl: './webgl-interactive-buffergeometry.component.html',
	styleUrls: ['./webgl-interactive-buffergeometry.component.scss'],
})
export class WebglInteractiveBuffergeometryComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const triangles = 5000;
		const positions = new Float32Array(triangles * 3 * 3);
		const normals = new Float32Array(triangles * 3 * 3);
		const colors = new Float32Array(triangles * 3 * 3);
		const color = N3js.getColor();
		const n = 800,
			n2 = n / 2; // triangles spread in the cube
		const d = 120,
			d2 = d / 2; // individual triangle size
		const pA = N3js.getVector3();
		const pB = N3js.getVector3();
		const pC = N3js.getVector3();

		const cb = N3js.getVector3();
		const ab = N3js.getVector3();

		for (let i = 0; i < positions.length; i += 9) {
			// positions

			const x = Math.random() * n - n2;
			const y = Math.random() * n - n2;
			const z = Math.random() * n - n2;

			const ax = x + Math.random() * d - d2;
			const ay = y + Math.random() * d - d2;
			const az = z + Math.random() * d - d2;

			const bx = x + Math.random() * d - d2;
			const by = y + Math.random() * d - d2;
			const bz = z + Math.random() * d - d2;

			const cx = x + Math.random() * d - d2;
			const cy = y + Math.random() * d - d2;
			const cz = z + Math.random() * d - d2;

			positions[i] = ax;
			positions[i + 1] = ay;
			positions[i + 2] = az;

			positions[i + 3] = bx;
			positions[i + 4] = by;
			positions[i + 5] = bz;

			positions[i + 6] = cx;
			positions[i + 7] = cy;
			positions[i + 8] = cz;

			// flat face normals

			pA.set(ax, ay, az);
			pB.set(bx, by, bz);
			pC.set(cx, cy, cz);

			cb.subVectors(pC, pB);
			ab.subVectors(pA, pB);
			cb.cross(ab);

			cb.normalize();

			const nx = cb.x;
			const ny = cb.y;
			const nz = cb.z;

			normals[i] = nx;
			normals[i + 1] = ny;
			normals[i + 2] = nz;

			normals[i + 3] = nx;
			normals[i + 4] = ny;
			normals[i + 5] = nz;

			normals[i + 6] = nx;
			normals[i + 7] = ny;
			normals[i + 8] = nz;

			// colors

			const vx = x / n + 0.5;
			const vy = y / n + 0.5;
			const vz = z / n + 0.5;

			color.setRGB(vx, vy, vz);

			colors[i] = color.r;
			colors[i + 1] = color.g;
			colors[i + 2] = color.b;

			colors[i + 3] = color.r;
			colors[i + 4] = color.g;
			colors[i + 5] = color.b;

			colors[i + 6] = color.r;
			colors[i + 7] = color.g;
			colors[i + 8] = color.b;
		}
		this.positions = positions;
		this.normals = normals;
		this.colors = colors;
	}

	linePosition: Float32Array = new Float32Array(4 * 3);
	positions: Float32Array;
	normals: Float32Array;
	colors: Float32Array;

	line: I3JS.ILine = null;

	realMesh: I3JS.IMesh = null;

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.realMesh = mesh.getRealMesh() as any;
	}

	setLine(line: MeshComponent) {
		this.line = line.getRealMesh() as any;
		this.line.visible = false;
	}

	onMouseMove(event: RendererEvent) {
		if (this.camera !== null && this.line !== null) {
			const intersect = this.camera.getIntersection(event.mouse, this.realMesh);
			if (intersect !== null) {
				const face = intersect.face;
				const linePosition = this.line.geometry.attributes.position as any;
				const meshPosition = this.realMesh.geometry.attributes.position;
				linePosition.copyAt(0, meshPosition, face.a);
				linePosition.copyAt(1, meshPosition, face.b);
				linePosition.copyAt(2, meshPosition, face.c);
				linePosition.copyAt(3, meshPosition, face.a);
				linePosition.needsUpdate = true;
				this.line.visible = true;
			} else {
				this.line.visible = false;
			}
		}
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
	}
}
