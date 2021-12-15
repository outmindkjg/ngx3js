import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxHelperComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-helpers',
	templateUrl: './webgl-helpers.component.html',
	styleUrls: ['./webgl-helpers.component.scss'],
})
export class WebglHelpersComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	selectStoreMesh(object: I3JS.Object3D): I3JS.Object3D {
		const mesh = object.children[0] as any;
		if (mesh.geometry) {
			mesh.geometry.computeTangents();
		}
		return mesh;
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
	}
}
