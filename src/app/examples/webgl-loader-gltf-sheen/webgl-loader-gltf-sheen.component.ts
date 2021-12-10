import { Component } from '@angular/core';
import { BaseComponent, MeshComponent  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gltf-sheen',
	templateUrl: './webgl-loader-gltf-sheen.component.html',
	styleUrls: ['./webgl-loader-gltf-sheen.component.scss'],
})
export class WebglLoaderGltfSheenComponent extends BaseComponent<{
	sheen: number;
}> {
	constructor() {
		super({ sheen: 1 }, [
			{
				name: 'sheen',
				type: 'number',
				min: 0,
				max: 1,
				finishChange: () => {
					if (this.material !== null) {
						this.material.sheen = this.controls.sheen;
					}
				},
			},
		]);
	}

	material: any;

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		const object = this.meshObject3d.getObjectByName(
			'SheenChair_fabric'
		) as any;
		if (object) {
			this.material = object.material;
		}
	}
}
