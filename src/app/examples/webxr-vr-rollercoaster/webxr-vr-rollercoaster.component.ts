import { Component } from '@angular/core';
import {
	BaseComponent,
	CurveUtils, I3JS, MeshComponent, N3js, RendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webxr-vr-rollercoaster',
	templateUrl: './webxr-vr-rollercoaster.component.html',
	styleUrls: ['./webxr-vr-rollercoaster.component.scss'],
})
export class WebxrVrRollercoasterComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	curve: I3JS.ICurve<I3JS.IVector3> = null;
	ngOnInit() {
		this.curve = CurveUtils.getCurve('rollercoaster');
	}

	initGeometry(geometry: I3JS.IBufferGeometry) {
		geometry.rotateX(-Math.PI / 2);
		const positions = geometry.attributes.position.array;
		const vertex = N3js.getVector3();
		const scenePosition = N3js.getVector3();
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

	funfairs: I3JS.IObject3D[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.train = this.meshObject3d;
	}

	train: I3JS.IObject3D = null;
	velocity = 0;
	progress = 0;
	position = N3js.getVector3();
	tangent = N3js.getVector3();
	lookAt = N3js.getVector3();

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
