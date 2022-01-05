import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-smaa',
	templateUrl: './webgl-postprocessing-smaa.component.html',
	styleUrls: ['./webgl-postprocessing-smaa.component.scss'],
})
export class WebglPostprocessingSmaaComponent extends NgxBaseComponent<{}> {
	constructor() {
		super({}, [], false, false);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshChildren.length > 0) {
			const delta = timer.delta * 50;
			this.meshChildren.forEach((child) => {
				child.rotation.x += 0.005 * delta;
				child.rotation.y += 0.01 * delta;
			});
		}
	}
}
