import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent } from 'ngx3js';

@Component({
	selector: 'app-webgl-loader-gltf-sheen',
	templateUrl: './webgl-loader-gltf-sheen.component.html',
	styleUrls: ['./webgl-loader-gltf-sheen.component.scss'],
})
export class WebglLoaderGltfSheenComponent extends NgxBaseComponent<{
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

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		const object = this.meshObject3d.getObjectByName(
			'SheenChair_fabric'
		) as any;
		if (object) {
			this.material = object.material;
		}
	}
}
