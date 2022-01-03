import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-convex',
	templateUrl: './webgl-geometry-convex.component.html',
	styleUrls: ['./webgl-geometry-convex.component.scss'],
})
export class WebglGeometryConvexComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			this.meshObject3d.rotation.y += 0.005 * 40 * timer.delta;
		}
	}
}
