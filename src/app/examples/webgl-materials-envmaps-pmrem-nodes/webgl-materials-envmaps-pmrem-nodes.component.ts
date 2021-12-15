import { Component } from '@angular/core';
import { NgxBaseComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-envmaps-pmrem-nodes',
	templateUrl: './webgl-materials-envmaps-pmrem-nodes.component.html',
	styleUrls: ['./webgl-materials-envmaps-pmrem-nodes.component.scss'],
})
export class WebglMaterialsEnvmapsPmremNodesComponent extends NgxBaseComponent<{
	roughness: number;
	metalness: number;
	exposure: number;
	intensity: number;
	animate: boolean;
	debug: boolean;
}> {
	constructor() {
		super(
			{
				roughness: 0.0,
				metalness: 0.0,
				exposure: 1.0,
				intensity: 1.0,
				animate: true,
				debug: false,
			},
			[
				{ name: 'roughness', type: 'number', min: 0, max: 1, step: 0.01 },
				{ name: 'metalness', type: 'number', min: 0, max: 1, step: 0.01 },
				{
					name: 'exposure',
					type: 'number',
					min: 0,
					max: 2,
					step: 0.01,
					finishChange: () => {
						if (this.renderer !== null) {
							const renderer =
								this.renderer.getRenderer() as any;
							renderer.toneMappingExposure = this.controls.exposure;
						}
					},
				},
				{ name: 'intensity', type: 'number', min: 0, max: 2, step: 0.01 },
				{ name: 'animate', type: 'checkbox' },
				{ name: 'debug', type: 'checkbox' },
			]
		);
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null && this.controls.animate) {
			const mesh = this.mesh.getObject3d();
			mesh.rotation.y += 0.1 * timer.delta;
		}
	}
}
