import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-mirror-nodes',
	templateUrl: './webgl-mirror-nodes.component.html',
	styleUrls: ['./webgl-mirror-nodes.component.scss'],
})
export class WebglMirrorNodesComponent extends NgxBaseComponent<{ blur: number }> {
	constructor() {
		super(
			{
				blur: 0,
			},
			[{ name: 'blur', type: 'number', min: 0, max: 25 }]
			,false , false);
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
