import { Component } from '@angular/core';
import { NgxBaseComponent, I3JS, NgxMeshComponent, THREE, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-math-orientation-transform',
	templateUrl: './webgl-math-orientation-transform.component.html',
	styleUrls: ['./webgl-math-orientation-transform.component.scss'],
})
export class WebglMathOrientationTransformComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setTarget(mesh: NgxMeshComponent) {
		this.target = mesh.getObject3d();
		this.generateTarget();
	}

	setCone(mesh: NgxMeshComponent) {
		this.corn = mesh.getObject3d();
		this.generateTarget();
	}

	target: I3JS.Object3D = null;
	corn: I3JS.Object3D = null;
	targetQuaternion: I3JS.Quaternion = new THREE.Quaternion();
	spherical: I3JS.Spherical = new THREE.Spherical();
	rotationMatrix: I3JS.Matrix4 = new THREE.Matrix4();

	generateTarget() {
		if (this.target !== null && this.corn !== null) {
			const spherical = this.spherical;
			spherical.theta = Math.random() * Math.PI * 2;
			spherical.phi = Math.acos(2 * Math.random() - 1);
			spherical.radius = 2;
			this.target.position.setFromSpherical(spherical);
			this.rotationMatrix.lookAt(
				this.target.position,
				this.corn.position,
				this.corn.up
			);
			this.targetQuaternion.setFromRotationMatrix(this.rotationMatrix);
			setTimeout(() => {
				this.generateTarget();
			}, 2000);
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.corn !== null && this.target !== null) {
			const targetMaterial = this.target['material'] ;
			if (!this.corn.quaternion.equals(this.targetQuaternion)) {
				const delta = timer.delta;
				const step = 2 * delta;
				this.corn.quaternion.rotateTowards(this.targetQuaternion, step);
				targetMaterial.color.setRGB(0, 1, 0);
			} else {
				targetMaterial.color.setRGB(1, 0, 0);
			}
		}
	}
}
