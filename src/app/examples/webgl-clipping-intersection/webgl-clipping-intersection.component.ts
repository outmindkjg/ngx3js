import { Component } from '@angular/core';
import {
	BaseComponent,
	MaterialComponent,
	PlaneComponent,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-clipping-intersection',
	templateUrl: './webgl-clipping-intersection.component.html',
	styleUrls: ['./webgl-clipping-intersection.component.scss'],
})
export class WebglClippingIntersectionComponent extends BaseComponent<{
	clipIntersection: boolean;
	planeConstant: number;
	showHelpers: boolean;
}> {
	constructor() {
		super(
			{
				clipIntersection: true,
				planeConstant: 0,
				showHelpers: false,
			},
			[
				{
					name: 'clipIntersection',
					type: 'checkbox',
					change: () => {
						if (this.mesh !== null) {
							this.changeClipIntersection(
								this.mesh.getObject3d() as THREE.Mesh
							);
						}
					},
				},
				{
					name: 'planeConstant',
					type: 'number',
					min: -1,
					max: 1,
					step: 0.01,
					finishChange: () => {
						if (this.localPlane.length > 0) {
							this.localPlane.forEach((plane) => {
								plane.setPlane(null, null, null, this.controls.planeConstant);
							});
						}
					},
				},
				{ name: 'showHelpers', type: 'checkbox', change: () => {} },
			]
		);
	}

	changeClipIntersection(mesh: THREE.Object3D) {
		if (
			mesh instanceof THREE.Mesh &&
			mesh.material &&
			mesh.material instanceof THREE.Material
		) {
			const material = mesh.material as THREE.Material;
			material.clipIntersection = this.controls.clipIntersection;
		}
		mesh.children.forEach((child) => {
			this.changeClipIntersection(child);
		});
	}

	sphereInfos: { color: number; radius: number }[] = [];
	clipPlanes = [
		{ x: 1, y: 0, z: 0, w: 0 },
		{ x: 0, y: -1, z: 0, w: 0 },
		{ x: 0, y: 0, z: -1, w: 0 },
	];
	ngOnInit() {
		this.sphereInfos = [];
		for (let i = 1; i <= 30; i += 2) {
			this.sphereInfos.push({
				color: new THREE.Color().setHSL(Math.random(), 0.5, 0.5).getHex(),
				radius: i / 30,
			});
		}
	}

	localPlane: PlaneComponent[] = [];
	setLocalPlane(localPlane: PlaneComponent) {
		if (this.localPlane.indexOf(localPlane) === -1) {
			this.localPlane.push(localPlane);
		}
	}

	localMaterial: MaterialComponent[] = [];
	setLocalMaterial(localMaterial: MaterialComponent) {
		if (this.localMaterial.indexOf(localMaterial) === -1) {
			this.localMaterial.push(localMaterial);
		}
	}
}
