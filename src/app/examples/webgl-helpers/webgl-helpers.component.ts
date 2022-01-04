import { Component } from '@angular/core';
import { IRendererTimer, NgxBaseComponent, NgxHelperComponent, NgxLightComponent, Object3D } from 'ngx3js';

@Component({
	selector: 'app-webgl-helpers',
	templateUrl: './webgl-helpers.component.html',
	styleUrls: ['./webgl-helpers.component.scss'],
})
export class WebglHelpersComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	setHelper(helper: NgxHelperComponent, type: string) {
		switch (type.toLowerCase()) {
			case 'normals':
				this.vertexNormals = helper.getHelper();
				break;
			case 'tangents':
				this.vertexTangents = helper.getHelper();
				break;
		}
	}

	setLight(light : NgxLightComponent) {
		this.light = light.getLight();
	}
	light : Object3D = null;
	vertexNormals: any = null;
	vertexTangents: any = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.vertexNormals !== null && this.vertexNormals.update) {
			this.vertexNormals.update();
		}
		if (this.vertexTangents !== null && this.vertexTangents.update) {
			this.vertexTangents.update();
		}
		if (this.light !== null) {
			const light = this.light;
			const time = timer.elapsedTime / 3;
			light.position.x = Math.sin( time * 1.7 ) * 300;
			light.position.y = Math.cos( time * 1.5 ) * 400;
			light.position.z = Math.cos( time * 1.3 ) * 300;
		}
	}
}
