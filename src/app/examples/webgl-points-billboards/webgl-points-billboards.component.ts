import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMeshComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-points-billboards',
	templateUrl: './webgl-points-billboards.component.html',
	styleUrls: ['./webgl-points-billboards.component.scss'],
})
export class WebglPointsBillboardsComponent extends NgxBaseComponent<{
	sizeAttenuation: boolean;
}> {
	constructor() {
		super(
			{
				sizeAttenuation: true,
			},
			[{ name: 'sizeAttenuation', type: 'checkbox' }]
		);
	}

	ngOnInit() {
		this.vertices = [];
		for (let i = 0; i < 10000; i++) {
			const x = 2000 * Math.random() - 1000;
			const y = 2000 * Math.random() - 1000;
			const z = 2000 * Math.random() - 1000;
			this.vertices.push(x, y, z);
		}
	}
	vertices: number[] = [];

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		const tmpMesh = mesh.getObject3d() as any;
		this.material = tmpMesh.material ;
	}

	material: I3JS.PointsMaterial = null;

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.material !== null) {
			const time = timer.elapsedTime * 0.05;
			const h = ((360 * (1.0 + time)) % 360) / 360;
			this.material.color.setHSL(h, 0.5, 0.5);
		}
	}
}
