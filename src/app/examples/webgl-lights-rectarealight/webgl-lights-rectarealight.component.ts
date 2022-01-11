import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-lights-rectarealight',
	templateUrl: './webgl-lights-rectarealight.component.html',
	styleUrls: ['./webgl-lights-rectarealight.component.scss'],
})
export class WebglLightsRectarealightComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			this.mesh.setRotation(null, timer.elapsedTime * 60, null);
		}
	}
}
