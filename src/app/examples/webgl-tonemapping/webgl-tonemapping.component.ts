import { Component } from '@angular/core';
import { BaseComponent, I3JS } from 'ngx3js';

@Component({
	selector: 'app-webgl-tonemapping',
	templateUrl: './webgl-tonemapping.component.html',
	styleUrls: ['./webgl-tonemapping.component.scss'],
})
export class WebglTonemappingComponent extends BaseComponent<{
	toneMapping: string;
	exposure: number;
}> {
	constructor() {
		super(
			{
				toneMapping: 'ACESFilmic',
				exposure: 1.0,
			},
			[
				{
					name: 'toneMapping',
					type: 'select',
					select: [
						'None',
						'Linear',
						'Reinhard',
						'Cineon',
						'ACESFilmic',
						'Custom',
					],
					change: () => {
						this.changeRenderer();
					},
				},
				{
					name: 'exposure',
					type: 'number',
					min: 0,
					max: 2,
					step: 0.01,
					change: () => {
						this.changeRenderer();
					},
				},
			]
		);
	}

	changeRenderer() {
		if (this.renderer !== null) {
			const renderer = this.renderer.getRenderer() as any;
			switch (this.controls.toneMapping) {
				case 'None':
					renderer.toneMapping = I3JS.NoToneMapping;
					break;
				case 'Linear':
					renderer.toneMapping = I3JS.LinearToneMapping;
					break;
				case 'Reinhard':
					renderer.toneMapping = I3JS.ReinhardToneMapping;
					break;
				case 'Cineon':
					renderer.toneMapping = I3JS.CineonToneMapping;
					break;
				case 'ACESFilmic':
					renderer.toneMapping = I3JS.ACESFilmicToneMapping;
					break;
				case 'Custom':
					// renderer.toneMapping = CustomToneMapping;
					break;
			}
			renderer.toneMappingExposure = this.controls.exposure;
		}
	}
}
