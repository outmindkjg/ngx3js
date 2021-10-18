import { Component } from '@angular/core';
import {
	BaseComponent,
	MaterialComponent,
	MeshComponent,
	RendererTimer,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-points-sprites',
	templateUrl: './webgl-points-sprites.component.html',
	styleUrls: ['./webgl-points-sprites.component.scss'],
})
export class WebglPointsSpritesComponent extends BaseComponent<{
	texture: boolean;
}> {
	constructor() {
		super(
			{
				texture: true,
			},
			[
				{
					name: 'texture',
					type: 'checkbox',
					change: () => {
						this.materials.forEach((mat) => {
							mat.map = this.controls.texture ? mat.userData.map : null;
							mat.needsUpdate = true;
						});
					},
				},
			]
		);
	}

	ngOnInit() {
		this.vertices = [];
		for (let i = 0; i < 10000; i++) {
			this.vertices.push(
				Math.random() * 2000 - 1000,
				Math.random() * 2000 - 1000,
				Math.random() * 2000 - 1000
			);
		}
	}
	vertices: number[] = [];

	setMaterial(material: MaterialComponent) {
		const mat = material.getMaterial() as THREE.PointsMaterial;
		if (this.materials.indexOf(mat) < 0) {
			mat.userData.map = mat.map;
			mat.userData.hslColor = mat.color.getHSL({ h: 0, s: 0, l: 0 });
			this.materials.push(mat);
		}
	}

	materials: THREE.PointsMaterial[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.children = mesh.getObject3d().children;
	}

	children: THREE.Object3D[] = [];
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		const time = timer.elapsedTime * 0.05;

		if (this.children !== null) {
			this.children.forEach((child, i) => {
				child.rotation.y = time * (i < 4 ? i + 1 : -(i + 1));
			});
		}
		if (this.materials !== null) {
			this.materials.forEach((mat) => {
				const color = mat.userData.hslColor;
				const h = ((360 * (color.h + time)) % 360) / 360;
				mat.color.setHSL(h, color.s, color.l);
			});
		}
	}
}
