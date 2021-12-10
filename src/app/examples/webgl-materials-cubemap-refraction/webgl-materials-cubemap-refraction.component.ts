import { Component } from '@angular/core';
import { BaseComponent, LightComponent, RendererTimer  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-cubemap-refraction',
	templateUrl: './webgl-materials-cubemap-refraction.component.html',
	styleUrls: ['./webgl-materials-cubemap-refraction.component.scss'],
})
export class WebglMaterialsCubemapRefractionComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	pointLight: any = null;
	setLight(mesh: LightComponent) {
		this.pointLight = mesh.getObject3d();
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.pointLight !== null) {
			const time = timer.elapsedTime * -0.2;
			this.pointLight.position.x = 1500 * Math.cos(time);
			this.pointLight.position.z = 1500 * Math.sin(time);
		}
	}
}
