import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, NgxThreeUtil, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-morphtargets-sphere',
	templateUrl: './webgl-morphtargets-sphere.component.html',
	styleUrls: ['./webgl-morphtargets-sphere.component.scss'],
})
export class WebglMorphtargetsSphereComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.subscribeRefer(
			'loaded',
			NgxThreeUtil.getSubscribe(
				mesh,
				() => {
					this.realMesh = mesh.getRealMesh() as any;
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
			NgxThreeUtil.isNotNull(this.realMesh.morphTargetDictionary)
		) {
			setTimeout(() => {
				this.points.geometry = this.realMesh.geometry;
				this.points.updateMorphTargets();
				this.points.morphTargetDictionary = this.realMesh.morphTargetDictionary;
				this.points.morphTargetInfluences = this.realMesh.morphTargetInfluences;
			}, 100);
		}
	}

	setPoints(mesh: NgxMeshComponent) {
		this.points = mesh.getMesh() ;
		this.synkMorphTarget();
	}

	points: I3JS.Points = null;

	realMesh: I3JS.Mesh = null;
	sign: number = 1;
	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (
			this.realMesh !== null &&
			NgxThreeUtil.isNotNull(this.realMesh.morphTargetInfluences)
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
