import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-physical-clearcoat',
	templateUrl: './webgl-materials-physical-clearcoat.component.html',
	styleUrls: ['./webgl-materials-physical-clearcoat.component.scss'],
})
export class WebglMaterialsPhysicalClearcoatComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setParticleLight(mesh: NgxMeshComponent) {
		this.particleLight = mesh.getMesh();
	}

	particleLight: I3JS.Object3D = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.particleLight !== null) {
			const time = timer.elapsedTime * 0.25;
			this.particleLight.position.x = Math.sin(time * 7) * 300;
			this.particleLight.position.y = Math.cos(time * 5) * 400;
			this.particleLight.position.z = Math.cos(time * 3) * 300;
		}
		if (this.meshChildren) {
			this.meshChildren.forEach((child) => {
				child.rotation.y += 0.005 * timer.delta * 30;
			});
		}
	}
}
