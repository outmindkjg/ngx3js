import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-rawshader',
	templateUrl: './webgl-buffergeometry-rawshader.component.html',
	styleUrls: ['./webgl-buffergeometry-rawshader.component.scss'],
})
export class WebglBuffergeometryRawshaderComponent extends NgxBaseComponent<{}> {
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

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d() ;
		this.uniforms = (this.object3d as any).material.uniforms;
	}

	object3d: I3JS.Mesh = null;
	uniforms: { [uniform: string]: I3JS.IUniform } = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null && this.uniforms !== null) {
			const time = timer.elapsedTime;
			this.uniforms['time'].value = time * 5;
			this.object3d.rotation.x = time * 0.2;
			this.object3d.rotation.y = time * 0.4;
		}
	}
}
