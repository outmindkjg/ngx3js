import { Component } from '@angular/core';
import {
	BaseComponent,
	CurveUtils,
	MeshComponent,
	RendererTimer,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-webxr-vr-rollercoaster',
	templateUrl: './webxr-vr-rollercoaster.component.html',
	styleUrls: ['./webxr-vr-rollercoaster.component.scss'],
})
export class WebxrVrRollercoasterComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	curve: THREE.Curve<THREE.Vector3> = null;
	ngOnInit() {
		this.curve = CurveUtils.getCurve('rollercoaster');
	}

	initGeometry(geometry: THREE.BufferGeometry) {
		geometry.rotateX(-Math.PI / 2);
		const positions = geometry.attributes.position.array;
		const vertex = new THREE.Vector3();
		const scenePosition = new THREE.Vector3();
		for (let i = 0; i < positions.length; i += 3) {
			vertex.fromArray(positions, i);
			vertex.x += Math.random() * 10 - 5;
			vertex.z += Math.random() * 10 - 5;
			const distance = vertex.distanceTo(scenePosition) / 5 - 25;
			vertex.y = Math.random() * Math.max(0, distance);
			vertex.toArray(positions, i);
		}
		geometry.computeVertexNormals();
	}

	setFunfairs(mesh: MeshComponent) {
		this.funfairs = mesh.getMesh().children;
	}

	funfairs: THREE.Object3D[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.train = this.meshObject3d;
	}

	train: THREE.Object3D = null;
	velocity = 0;
	progress = 0;
	position = new THREE.Vector3();
	tangent = new THREE.Vector3();
	lookAt = new THREE.Vector3();

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		const time = timer.elapsedTime * 1000;
		this.funfairs.forEach((funfair) => {
			funfair.rotation.y = time * 0.0004;
		});
		if (this.train !== null) {
			this.progress += this.velocity;
			this.progress = this.progress % 1;
			const position = this.position;
			position.copy(this.curve.getPointAt(this.progress));
			position.y += 0.3;

			this.train.position.copy(position);
			const tangent = this.tangent;
			tangent.copy(this.curve.getTangentAt(this.progress));
			this.velocity -= tangent.y * 0.0000001 * timer.delta;
			this.velocity = Math.max(0.00004, Math.min(0.0002, this.velocity));

			this.train.lookAt(this.lookAt.copy(position).sub(tangent));
		}
	}
}
