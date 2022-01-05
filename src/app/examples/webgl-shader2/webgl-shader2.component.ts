import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-shader2',
	templateUrl: './webgl-shader2.component.html',
	styleUrls: ['./webgl-shader2.component.scss'],
})
export class WebglShader2Component extends NgxBaseComponent<{ speed: number }> {
	constructor() {
		super(
			{
				speed: 1,
			},
			[{ name: 'speed', type: 'number', min: 0.1, max: 2, step: 0.2 }]
			,false , false);
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.children = mesh.getObject3d().children;
	}

	children: I3JS.Object3D[] = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.children !== null) {
			const delta = timer.delta;
			this.children.forEach((child, i) => {
				child.rotation.y += delta * 0.5 * (i % 2 ? 1 : -1);
				child.rotation.x += delta * 0.5 * (i % 2 ? -1 : 1);
			});
		}
	}
}
