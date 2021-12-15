import { Component } from '@angular/core';
import { NgxBaseComponent, I3JS, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-mirror',
	templateUrl: './webgl-mirror.component.html',
	styleUrls: ['./webgl-mirror.component.scss'],
})
export class WebglMirrorComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setSphereGroup(mesh: NgxMeshComponent) {
		this.sphereGroup = mesh.getObject3d();
	}
	sphereGroup: I3JS.Object3D = null;

	setSmallSphere(mesh: NgxMeshComponent) {
		this.smallSphere = mesh.getObject3d();
	}
	smallSphere: I3JS.Object3D = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.sphereGroup !== null && this.smallSphere !== null) {
			const elapsedTime = timer.elapsedTime * 10;
			this.sphereGroup.rotation.y -= 0.02;
			this.smallSphere.position.set(
				Math.cos(elapsedTime * 0.1) * 30,
				Math.abs(Math.cos(elapsedTime * 0.2)) * 20 + 5,
				Math.sin(elapsedTime * 0.1) * 30
			);
			this.smallSphere.rotation.y = Math.PI / 2 - elapsedTime * 0.1;
			this.smallSphere.rotation.z = elapsedTime * 0.8;
		}
	}
}
