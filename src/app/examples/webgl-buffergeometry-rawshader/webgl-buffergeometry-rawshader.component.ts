import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-buffergeometry-rawshader',
	templateUrl: './webgl-buffergeometry-rawshader.component.html',
	styleUrls: ['./webgl-buffergeometry-rawshader.component.scss'],
})
export class WebglBuffergeometryRawshaderComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const vertexCount = 200 * 3;
		const positions = [];
		const colors = [];

		for (let i = 0; i < vertexCount; i++) {
			// adding x,y,z
			positions.push(Math.random() - 0.5);
			positions.push(Math.random() - 0.5);
			positions.push(Math.random() - 0.5);

			// adding r,g,b,a
			colors.push(Math.random() * 255);
			colors.push(Math.random() * 255);
			colors.push(Math.random() * 255);
			colors.push(Math.random() * 255);
		}

		this.positions = positions;
		this.colors = colors;
	}

	positions: number[] = [];
	colors: number[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d() as THREE.Mesh;
		this.uniforms = (this.object3d as any).material.uniforms;
	}

	object3d: THREE.Mesh = null;
	uniforms: { [uniform: string]: THREE.IUniform } = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null && this.uniforms !== null) {
			const time = timer.elapsedTime;
			this.uniforms['time'].value = time * 5;
			this.object3d.rotation.x = time * 0.2;
			this.object3d.rotation.y = time * 0.4;
		}
	}
}
