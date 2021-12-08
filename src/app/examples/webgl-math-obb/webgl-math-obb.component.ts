import { Component } from '@angular/core';
import {
	BaseComponent,
	MeshComponent,
	RendererEvent,
	RendererTimer,
	OBB,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-math-obb',
	templateUrl: './webgl-math-obb.component.html',
	styleUrls: ['./webgl-math-obb.component.scss'],
})
export class WebglMathObbComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.boxInfos = [];
		for (let i = 0; i < 100; i++) {
			this.boxInfos.push({
				position: {
					x: Math.random() * 80 - 40,
					y: Math.random() * 80 - 40,
					z: Math.random() * 80 - 40,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
				scale: {
					x: Math.random() + 0.5,
					y: Math.random() + 0.5,
					z: Math.random() + 0.5,
				},
			});
		}
	}
	boxInfos: {
		position: { x: number; y: number; z: number };
		rotation: { x: number; y: number; z: number };
		scale: { x: number; y: number; z: number };
	}[] = [];

	setHitBox(mesh: MeshComponent) {
		this.hitBox = mesh.getObject3d();
	}

	hitBox: THREE.Object3D;

	eventListener(event: RendererEvent) {
		if (this.camera !== null && this.hitBox !== null) {
			const intersect = this.camera.getIntersection(
				event.mouse,
				this.meshChildren
			);
			if (intersect !== null && intersect.object !== null) {
				this.hitBox.visible = true;
				intersect.object.add(this.hitBox);
			} else {
				this.hitBox.visible = false;
				if (this.hitBox.parent !== null) {
					this.hitBox.parent.remove(this.hitBox);
				}
			}
		}
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.meshChildren = mesh.getObject3d().children;
		this.meshChildren.forEach((child) => {
			child.userData.obb = new OBB();
		});
		this.geometryObb = new OBB();
		this.geometryObb.halfSize.set(10, 5, 6).multiplyScalar(0.5);
	}

	geometryObb: OBB = null;
	
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshChildren !== null) {
			const delta = timer.delta;
			this.meshChildren.forEach((child) => {
				child.rotation.x += delta * Math.PI * 0.2;
				child.rotation.y += delta * Math.PI * 0.1;
				child.updateMatrix();
				child.updateMatrixWorld();
				const obb = child.userData.obb as OBB;
				obb.copy(this.geometryObb);
				obb.applyMatrix4(child.matrixWorld);
				const material = child['material'] as THREE.MeshLambertMaterial;
				material.color.setHex(0x00ff00);
			});
			for (let i = 0, il = this.meshChildren.length; i < il; i++) {
				const object = this.meshChildren[i];
				const obb = object.userData.obb as any;
				const objectMaterial = object['material'] as THREE.MeshLambertMaterial;
				for (let j = i + 1, jl = this.meshChildren.length; j < jl; j++) {
					const objectToTest = this.meshChildren[j];
					const obbToTest = objectToTest.userData.obb;
					if (obb.intersectsOBB(obbToTest) === true) {
						objectMaterial.color.setHex(0xff0000);
						const objectTestMaterial = objectToTest[
							'material'
						] as THREE.MeshLambertMaterial;
						objectTestMaterial.color.setHex(0xff0000);
					}
				}
			}
		}
	}
}
