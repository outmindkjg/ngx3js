import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-cube',
	templateUrl: './webgl-geometry-cube.component.html',
	styleUrls: ['./webgl-geometry-cube.component.scss'],
})
export class WebglGeometryCubeComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			this.meshObject3d.rotation.x += 0.005 * 40 * timer.delta;
			this.meshObject3d.rotation.y += 0.01 * 40 * timer.delta;
		}
	}
}
