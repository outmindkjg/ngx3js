import { Component } from '@angular/core';
import { BaseComponent, HelperComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-helpers',
	templateUrl: './webgl-helpers.component.html',
	styleUrls: ['./webgl-helpers.component.scss'],
})
export class WebglHelpersComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	selectStoreMesh(object: THREE.Object3D): THREE.Object3D {
		const mesh = object.children[0] as THREE.Mesh;
		if (mesh.geometry) {
			mesh.geometry.computeTangents();
		}
		return mesh;
	}

	setHelper(helper: HelperComponent, type: string) {
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

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.vertexNormals !== null && this.vertexNormals.update) {
			this.vertexNormals.update();
		}
		if (this.vertexTangents !== null && this.vertexTangents.update) {
			this.vertexTangents.update();
		}
	}
}
