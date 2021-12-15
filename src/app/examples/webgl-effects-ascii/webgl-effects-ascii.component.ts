import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-effects-ascii',
	templateUrl: './webgl-effects-ascii.component.html',
	styleUrls: ['./webgl-effects-ascii.component.scss'],
})
export class WebglEffectsAsciiComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	onRender(timer: IRendererTimer) {
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
