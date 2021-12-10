import { Component } from '@angular/core';
import {
	BaseComponent,
	PassComponent,
	RendererTimer,
	RenderPass,
	TAARenderPass, I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-taa',
	templateUrl: './webgl-postprocessing-taa.component.html',
	styleUrls: ['./webgl-postprocessing-taa.component.scss'],
})
export class WebglPostprocessingTaaComponent extends BaseComponent<{
	TAAEnabled: boolean;
	TAASampleLevel: string;
}> {
	constructor() {
		super(
			{
				TAAEnabled: true,
				TAASampleLevel: '0',
			},
			[
				{
					name: 'TAAEnabled',
					type: 'checkbox',
					change: () => {
						this.changePass();
					},
				},
				{
					name: 'TAASampleLevel',
					type: 'select',
					select: {
						'Level 0: 1 Sample': 0,
						'Level 1: 2 Samples': 1,
						'Level 2: 4 Samples': 2,
						'Level 3: 8 Samples': 3,
						'Level 4: 16 Samples': 4,
						'Level 5: 32 Samples': 5,
					},
					change: () => {
						this.changePass();
					},
				},
			]
		);
	}

	setTaaPass(pass: PassComponent) {
		this.pass = pass.getPass() as TAARenderPass;
	}

	setRenderPass(pass: PassComponent) {
		this.renderPass = pass.getPass() as RenderPass;
	}

	pass: TAARenderPass = null;
	renderPass: RenderPass = null;

	changePass() {
		if (this.pass !== null && this.renderPass !== null) {
			this.pass.enabled = this.controls.TAAEnabled;
			this.renderPass.enabled = !this.controls.TAAEnabled;
			this.pass.sampleLevel = parseInt(this.controls.TAASampleLevel);
		}
	}

	index: number = 0;
	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshChildren !== null && this.meshChildren.length > 0) {
			this.index++;
			if (Math.round(this.index / 200) % 2 === 0) {
				this.meshChildren.forEach((child) => {
					child.rotation.x += 0.005;
					child.rotation.y += 0.01;
				});
				if (this.pass) {
					this.pass.accumulate = false;
				}
			} else {
				if (this.pass) {
					this.pass.accumulate = true;
				}
			}
		}
	}
}
