import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMeshComponent, IRendererEvent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-instancing-raycast',
	templateUrl: './webgl-instancing-raycast.component.html',
	styleUrls: ['./webgl-instancing-raycast.component.scss'],
})
export class WebglInstancingRaycastComponent extends NgxBaseComponent<{
	amount: number;
	count: number;
}> {
	constructor() {
		super(
			{
				amount: 10,
				count: 1000,
			},
			[
				{
					name: 'count',
					type: 'number',
					min: 10,
					max: 1000,
					step: 1,
					change: () => {
						if (this.mesh !== null) {
							const mesh = this.mesh.getObject3d() as any ;
							mesh.count = this.controls.count;
						}
					},
				},
			]
		, false, false);
	}

	changedColor : number[] = [];

	onMouseMove(event: IRendererEvent) {
		if (this.camera !== null && this.mesh !== null) {
			const mesh = this.mesh.getObject3d() as any;
			const intersection = this.camera.getIntersection(event.mouse, mesh);
			if (intersection !== null) {
				const instanceId = intersection.instanceId;
				if (!this.changedColor.includes(instanceId)) {
					const color = new THREE.Color();
					mesh.setColorAt(instanceId, color.setHex(Math.random() * 0xffffff));
					mesh.instanceColor.needsUpdate = true;
					this.changedColor.push(instanceId);
				}
			}
		}
	}

	setMesh(meshcom: NgxMeshComponent) {
		super.setMesh(meshcom);
		const amount = this.controls.amount;
		let i = 0;
		const offset = (amount - 1) / 2;
		const matrix = new THREE.Matrix4();
		const mesh = meshcom.getRealMesh() as any ;
		const color = new THREE.Color();
		for (let x = 0; x < amount; x++) {
			for (let y = 0; y < amount; y++) {
				for (let z = 0; z < amount; z++) {
					matrix.setPosition(offset - x, offset - y, offset - z);
					mesh.setMatrixAt(i, matrix);
					mesh.setColorAt(i, color);
					i++;
				}
			}
		}
	}
}
