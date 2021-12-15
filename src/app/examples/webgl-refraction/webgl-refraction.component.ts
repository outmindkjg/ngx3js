import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-refraction',
	templateUrl: './webgl-refraction.component.html',
	styleUrls: ['./webgl-refraction.component.scss'],
})
export class WebglRefractionComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setSmallSphere(smallSphere: NgxMeshComponent) {
		this.smallSphere = smallSphere.getObject3d();
	}

	smallSphere: I3JS.Object3D = null;

	setRefractor(refractor: NgxMeshComponent) {
		this.refractorMaterial = (refractor.getObject3d() as any).material ;
		// this.refractorMaterial.side = DoubleSide;
	}

	refractorMaterial: I3JS.ShaderMaterial = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.refractorMaterial !== null) {
			this.refractorMaterial.uniforms['time'].value += timer.delta;
		}
		if (this.smallSphere !== null) {
			const time = timer.elapsedTime;
			this.smallSphere.position.set(
				Math.cos(time) * 30,
				Math.abs(Math.cos(time * 2)) * 20 + 5,
				Math.sin(time) * 30
			);
			this.smallSphere.rotation.y = Math.PI / 2 - time;
			this.smallSphere.rotation.z = time * 8;
		}
	}
}
