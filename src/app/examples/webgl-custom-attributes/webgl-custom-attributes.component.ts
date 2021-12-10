import { Component } from '@angular/core';
import { BaseComponent, I3JS, MeshComponent, N3js, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-custom-attributes',
	templateUrl: './webgl-custom-attributes.component.html',
	styleUrls: ['./webgl-custom-attributes.component.scss'],
})
export class WebglCustomAttributesComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	noise: Float32Array = null;
	displacement: Float32Array = null;
	object3d: I3JS.IObject3D = null;
	geometry: I3JS.IBufferGeometry = null;
	uniforms: { [uniform: string]: I3JS.IUniform } = null;
	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d();
		this.geometry = (this.object3d as any).geometry;
		this.uniforms = (this.object3d as any).material.uniforms;
		this.displacement = this.geometry.attributes.displacement
			.array as Float32Array;
		this.noise = new Float32Array(this.geometry.attributes.position.count);
		for (let i = 0; i < this.geometry.attributes.position.count; i++) {
			this.noise[i] = Math.random() * 5;
		}
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (
			this.object3d !== null &&
			this.displacement !== null &&
			this.noise !== null &&
			this.geometry !== null
		) {
			const time = timer.elapsedTime * 10;
			this.object3d.rotation.y = this.object3d.rotation.z = 0.01 * time;

			this.uniforms['amplitude'].value =
				2.5 * Math.sin(this.object3d.rotation.y * 0.125);
			this.uniforms['color'].value.offsetHSL(0.0005, 0, 0);

			for (let i = 0; i < this.displacement.length; i++) {
				this.displacement[i] = Math.sin(0.1 * i + time);
				this.noise[i] += 0.5 * (0.5 - Math.random());
				this.noise[i] = N3js.MathUtils.clamp(this.noise[i], -5, 5);
				this.displacement[i] += this.noise[i];
			}
			this.geometry.attributes.displacement.needsUpdate = true;
		}
	}
}
