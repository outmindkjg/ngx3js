import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-cubemap-balls-reflection',
	templateUrl: './webgl-materials-cubemap-balls-reflection.component.html',
	styleUrls: ['./webgl-materials-cubemap-balls-reflection.component.scss'],
})
export class WebglMaterialsCubemapBallsReflectionComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	ngOnInit() {
		this.sphereInfos = [];
		for (let i = 0; i < 500; i++) {
			this.sphereInfos.push({
				x: Math.random() * 10000 - 5000,
				y: Math.random() * 10000 - 5000,
				z: Math.random() * 10000 - 5000,
				scale: Math.random() * 3 + 1,
			});
		}
	}

	sphereInfos: { x: number; y: number; z: number; scale: number }[] = [];

	setMesh(mesh: MeshComponent) {
		super.setMesh(mesh);
		this.sphereChildren = mesh.getObject3d().children;
	}
	sphereChildren: any[] = [];

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.sphereChildren && this.sphereChildren.length > 0) {
			const elapsedTime = timer.elapsedTime * 0.1;
			this.sphereChildren.forEach((sphere, i) => {
				sphere.position.x = 5000 * Math.cos(elapsedTime + i);
				sphere.position.y = 5000 * Math.sin(elapsedTime + i * 1.1);
			});
		}
	}
}
