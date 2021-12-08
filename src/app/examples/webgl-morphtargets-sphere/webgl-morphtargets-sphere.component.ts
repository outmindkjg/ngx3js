import { Component } from '@angular/core';
import {
	BaseComponent,
	MeshComponent,
	RendererTimer,
	ThreeUtil,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webgl-morphtargets-sphere',
	templateUrl: './webgl-morphtargets-sphere.component.html',
	styleUrls: ['./webgl-morphtargets-sphere.component.scss'],
})
export class WebglMorphtargetsSphereComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.subscribeRefer(
			'loaded',
			ThreeUtil.getSubscribe(
				mesh,
				() => {
					this.realMesh = mesh.getRealMesh() as THREE.Mesh;
					this.synkMorphTarget();
				},
				'loaded'
			)
		);
	}

	private synkMorphTarget() {
		if (
			this.realMesh !== null &&
			this.points !== null &&
			ThreeUtil.isNotNull(this.realMesh.morphTargetDictionary)
		) {
			setTimeout(() => {
				this.points.geometry = this.realMesh.geometry;
				this.points.updateMorphTargets();
				this.points.morphTargetDictionary = this.realMesh.morphTargetDictionary;
				this.points.morphTargetInfluences = this.realMesh.morphTargetInfluences;
			}, 100);
		}
	}

	setPoints(mesh: MeshComponent) {
		this.points = mesh.getMesh() as THREE.Points;
		this.synkMorphTarget();
	}

	points: THREE.Points = null;

	realMesh: THREE.Mesh = null;
	sign: number = 1;
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (
			this.realMesh !== null &&
			ThreeUtil.isNotNull(this.realMesh.morphTargetInfluences)
		) {
			const delta = timer.delta;
			const step = delta * 0.5;
			this.realMesh.rotation.y += step;
			const morphTargetInfluences =
				this.realMesh.morphTargetInfluences[1] + step * this.sign;
			this.realMesh.morphTargetInfluences[1] = morphTargetInfluences;
			if (morphTargetInfluences <= 0 || morphTargetInfluences >= 1) {
				this.sign *= -1;
			}
		}
	}
}
