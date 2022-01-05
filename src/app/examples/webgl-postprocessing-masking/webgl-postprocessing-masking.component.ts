import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-masking',
	templateUrl: './webgl-postprocessing-masking.component.html',
	styleUrls: ['./webgl-postprocessing-masking.component.scss'],
})
export class WebglPostprocessingMaskingComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	box: I3JS.Object3D = null;
	setBox(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.box = mesh.getObject3d();
	}

	torus: I3JS.Object3D = null;
	setTorus(mesh: NgxMeshComponent) {
		this.torus = mesh.getObject3d();
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.box !== null && this.torus !== null) {
			const time = timer.elapsedTime + 6000;
			const box = this.box;
			const torus = this.torus;
			box.position.x = Math.cos(time / 1.5) * 2;
			box.position.y = Math.sin(time) * 2;
			box.rotation.x = time;
			box.rotation.y = time / 2;
			torus.position.x = Math.cos(time) * 2;
			torus.position.y = Math.sin(time / 1.5) * 2;
			torus.rotation.x = time;
			torus.rotation.y = time / 2;
		}
	}
}
