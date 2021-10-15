import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-buffergeometry-instancing-billboards',
	templateUrl: './webgl-buffergeometry-instancing-billboards.component.html',
	styleUrls: ['./webgl-buffergeometry-instancing-billboards.component.scss'],
})
export class WebglBuffergeometryInstancingBillboardsComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		const circleGeometry = new THREE.CircleGeometry(1, 6);
		const particleCount = 75000;
		const translateArray: number[] = [];
		for (let i = 0, i3 = 0, l = particleCount; i < l; i++, i3 += 3) {
			translateArray.push(
				Math.random() * 2 - 1,
				Math.random() * 2 - 1,
				Math.random() * 2 - 1
			);
		}
		this.index = circleGeometry.index;
		this.attributes = circleGeometry.attributes;
		this.translateArray = translateArray;
	}
	index: any = null;
	attributes: any = null;
	translateArray: number[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.object3d = mesh.getObject3d();
		this.uniforms = (this.object3d as any).material.uniforms;
	}

	object3d: THREE.Object3D = null;
	uniforms: { [uniform: string]: THREE.IUniform } = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.object3d !== null && this.uniforms !== null) {
			const time = timer.elapsedTime * 0.5;
			this.uniforms['time'].value = time;
			this.object3d.rotation.x = time * 0.2;
			this.object3d.rotation.y = time * 0.4;
		}
	}
}
