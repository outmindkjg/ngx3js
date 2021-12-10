import { Component } from '@angular/core';
import { BaseComponent, RendererTimer  , I3JS, THREE } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-afterimage',
	templateUrl: './webgl-postprocessing-afterimage.component.html',
	styleUrls: ['./webgl-postprocessing-afterimage.component.scss'],
})
export class WebglPostprocessingAfterimageComponent extends BaseComponent<{
	value: number;
	enable: boolean;
}> {
	constructor() {
		super(
			{
				value: 0.96,
				enable: true,
			},
			[
				{ name: 'value', type: 'number', min: 0, max: 1, step: 0.001 },
				{ name: 'enable', type: 'checkbox' },
			]
		);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
			const mesh = this.mesh.getObject3d();
			mesh.rotation.x += 0.005 * timer.delta * 30;
			mesh.rotation.y += 0.01 * timer.delta * 30;
		}
	}
}
