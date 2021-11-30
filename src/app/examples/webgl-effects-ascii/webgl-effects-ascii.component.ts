import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-Effects-ascii',
	templateUrl: './webgl-Effects-ascii.component.html',
	styleUrls: ['./webgl-Effects-ascii.component.scss'],
})
export class WebglEffectsAsciiComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			const elapsedTime = timer.elapsedTime;
			this.mesh.setPosition(
				null,
				Math.abs(Math.sin(elapsedTime * 2)) * 150,
				null
			);
			this.mesh.setRotation(
				elapsedTime * 0.3 * 180,
				null,
				elapsedTime * 0.2 * 180
			);
		}
	}
}
