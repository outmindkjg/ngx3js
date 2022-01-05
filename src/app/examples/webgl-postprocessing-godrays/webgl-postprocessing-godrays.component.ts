import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-godrays',
	templateUrl: './webgl-postprocessing-godrays.component.html',
	styleUrls: ['./webgl-postprocessing-godrays.component.scss'],
})
export class WebglPostprocessingGodraysComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	setSphere(mesh: NgxMeshComponent) {
		this.sphere = mesh.getObject3d();
	}

	sphere: I3JS.Object3D = null;
	orbitRadius: number = 200;
	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.sphere !== null) {
			const time = timer.elapsedTime / 4;
			const sphereMesh = this.sphere;
			sphereMesh.position.x = this.orbitRadius * Math.cos(time);
			sphereMesh.position.z = this.orbitRadius * Math.sin(time) - 100;
		}
	}
}
