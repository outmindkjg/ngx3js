import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-shadowmap-viewer',
	templateUrl: './webgl-shadowmap-viewer.component.html',
	styleUrls: ['./webgl-shadowmap-viewer.component.scss'],
})
export class WebglShadowmapViewerComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshChildren !== null) {
			const delta = timer.delta;
			this.meshChildren.forEach((child) => {
				child.rotation.x += 0.25 * delta;
				child.rotation.y += 2 * delta;
				child.rotation.z += 1 * delta;
			});
		}
	}
}
