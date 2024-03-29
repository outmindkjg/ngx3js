import { Component } from '@angular/core';
import { NgxBaseComponent, NgxMaterialComponent, NgxPlaneComponent, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-clipping-intersection',
	templateUrl: './webgl-clipping-intersection.component.html',
	styleUrls: ['./webgl-clipping-intersection.component.scss'],
})
export class WebglClippingIntersectionComponent extends NgxBaseComponent<{
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
								this.mesh.getObject3d() 
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
				},
				{ name: 'showHelpers', type: 'checkbox', change: () => {} },
			]
		, false, false);
	}

	changeClipIntersection(mesh: any) {
		if (
			mesh instanceof THREE.Mesh &&
			mesh.material &&
			mesh.material instanceof THREE.Material
		) {
			const material = mesh.material ;
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

	localMaterial: NgxMaterialComponent[] = [];
	setLocalMaterial(localMaterial: NgxMaterialComponent) {
		if (this.localMaterial.indexOf(localMaterial) === -1) {
			this.localMaterial.push(localMaterial);
		}
	}
}
