import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
	selector: 'app-misc-lookat',
	templateUrl: './misc-lookat.component.html',
	styleUrls: ['./misc-lookat.component.scss'],
})
export class MiscLookatComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.meshInfos = [];
		for (let i = 0; i < 300; i++) {
			this.meshInfos.push({
				x: Math.random() * 2000 - 1000,
				y: Math.random() * 2000 - 1000,
				z: Math.random() * 2000 - 1000,
				scale: Math.random() * 4 + 2,
			});
		}
	}

	meshInfos: {
		x: number;
		y: number;
		z: number;
		scale: number;
	}[] = [];

	setSphere(mesh: MeshComponent) {
		this.sphere = mesh.getObject3d();
	}

	sphere: THREE.Object3D = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.sphere !== null) {
			const time = timer.elapsedTime * 0.5;
			this.sphere.position.x = Math.sin(time * 0.7) * 2000;
			this.sphere.position.y = Math.cos(time * 0.5) * 2000;
			this.sphere.position.z = Math.cos(time * 0.3) * 2000;
			this.meshChildren.forEach((child) => {
				child.lookAt(this.sphere.position);
			});
		}
	}
}
