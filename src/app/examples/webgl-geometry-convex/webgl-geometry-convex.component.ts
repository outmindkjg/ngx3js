import { Component } from '@angular/core';
import { BaseComponent, RendererTimer  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-geometry-convex',
	templateUrl: './webgl-geometry-convex.component.html',
	styleUrls: ['./webgl-geometry-convex.component.scss'],
})
export class WebglGeometryConvexComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			this.meshObject3d.rotation.y += 0.005 * 40 * timer.delta;
		}
	}
}
