import { Component } from '@angular/core';
import { BaseComponent, RendererTimer  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-lights-rectarealight',
	templateUrl: './webgl-lights-rectarealight.component.html',
	styleUrls: ['./webgl-lights-rectarealight.component.scss'],
})
export class WebglLightsRectarealightComponent extends BaseComponent<{}> {
	constructor() {
		super({}, []);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null && !this.controls.meshRotate.autoRotate) {
			this.mesh.setRotation(null, timer.elapsedTime * 60, null);
		}
	}
}
