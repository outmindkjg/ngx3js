import { Component } from '@angular/core';
import {
	NgxAbstractMaterialComponent,
	NgxBaseComponent, NgxSharedComponent, IRendererTimer
} from 'ngx3js';

@Component({
	selector: 'app-webgl-worker-offscreencanvas',
	templateUrl: './webgl-worker-offscreencanvas.component.html',
	styleUrls: ['./webgl-worker-offscreencanvas.component.scss'],
})
export class WebglWorkerOffscreencanvasComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	setShared(shared: NgxSharedComponent) {
		const materialList = shared.getMaterialComponents();
		const meshInfos = [];
		for (let i = 0; i < 100; i++) {
			const material = materialList[i % materialList.length];
			meshInfos.push({
				x: Math.random() * 200 - 100,
				y: Math.random() * 200 - 100,
				z: Math.random() * 200 - 100,
				scale: Math.random() + 1,
				material: material,
			});
		}
		this.getTimeout(100).then(() => {
			this.meshInfos = meshInfos;
		});
	}

	meshInfos: {
		x: number;
		y: number;
		z: number;
		scale: number;
		material: NgxAbstractMaterialComponent;
	}[] = [];

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			this.meshObject3d.rotation.y -= timer.delta / 4;
		}
	}
}
