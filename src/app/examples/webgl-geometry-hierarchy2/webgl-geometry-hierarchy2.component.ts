import { Component } from '@angular/core';
import {
	NgxBaseComponent,
	NgxMeshComponent, IRendererEvent,
	IRendererTimer, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-hierarchy2',
	templateUrl: './webgl-geometry-hierarchy2.component.html',
	styleUrls: ['./webgl-geometry-hierarchy2.component.scss'],
})
export class WebglGeometryHierarchy2Component extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}
	meshInfos: { x: number; y: number; z: number }[] = [
		{ x: 100, y: 0, z: 0 },
		{ x: -100, y: 0, z: 0 },
		{ x: 0, y: -100, z: 0 },
		{ x: 0, y: 100, z: 0 },
		{ x: 0, y: 0, z: -100 },
		{ x: 0, y: 0, z: 100 },
	];

	mouse = { x: 0, y: 0 };
	setEventListener(event: IRendererEvent) {
		this.mouse = event.mouse.multiplyScalar(10);
	}

	childMeshes: NgxMeshComponent[] = [];
	addChildMesh(
		mesh: NgxMeshComponent,
		position: { x: number; y: number; z: number }
	) {
		if (this.childMeshes.indexOf(mesh) === -1) {
			this.childMeshes.push(mesh);
			const geometry = mesh.getGeometry();
			const material = mesh.getMaterial();
			const amount = 200;
			let parent = mesh.getRealMesh() as any;
			for (let i = 0; i < amount; i++) {
				const object = new THREE.Mesh(geometry, material);
				object.position.set(position.x, position.y, position.z);
				parent.add(object);
				parent = object;
			}
		}
	}

	elapsedTime: number = 0;
	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.camera !== null && this.mesh !== null) {
			const position = this.camera.getPosition();
			this.camera.addPosition(
				(this.mouse.x - position.x) * 0.05,
				(-this.mouse.y - position.y) * 0.05,
				0
			);
			this.camera.setLookat(0, 0, 0);
			if (!this.controls.meshRotate.autoRotate) {
				this.elapsedTime += timer.delta;
				const time = this.elapsedTime;
				const rx = Math.sin(time * 0.7) * 0.2,
					ry = Math.sin(time * 0.3) * 0.1,
					rz = Math.sin(time * 0.2) * 0.1;
				const mesh = this.mesh.getObject3d();
				mesh.traverse((object) => {
					object.rotation.x = rx;
					object.rotation.y = ry;
					object.rotation.z = rz;
				});
			}
		}
	}
}
