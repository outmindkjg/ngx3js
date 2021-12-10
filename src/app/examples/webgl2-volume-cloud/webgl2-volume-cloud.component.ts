import { Component } from '@angular/core';
import { BaseComponent, I3JS, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl2-volume-cloud',
	templateUrl: './webgl2-volume-cloud.component.html',
	styleUrls: ['./webgl2-volume-cloud.component.scss'],
})
export class Webgl2VolumeCloudComponent extends BaseComponent<{
	threshold: number;
	opacity: number;
	range: number;
	steps: number;
}> {
	constructor() {
		super(
			{
				threshold: 0.25,
				opacity: 0.25,
				range: 0.1,
				steps: 100,
			},
			[
				{
					name: 'threshold',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'opacity',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'range',
					type: 'number',
					min: 0,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms();
					},
				},
				{
					name: 'steps',
					type: 'number',
					min: 0,
					max: 200,
					step: 1,
					change: () => {
						this.updateUniforms();
					},
				},
			]
		);
	}

	updateUniforms() {
		const uniforms = this.getUniforms();
		if (uniforms !== null) {
			uniforms.threshold.value = this.controls.threshold;
			uniforms.opacity.value = this.controls.opacity;
			uniforms.range.value = this.controls.range;
			uniforms.steps.value = this.controls.steps;
		}
	}

	getUniforms(): { [uniform: string]: I3JS.IUniform } {
		if (this.meshObject3d !== null) {
			const rawShaderMaterial = (this.meshObject3d as any).material ;
			return rawShaderMaterial.uniforms || null;
		}
		return null;
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.camera !== null && this.meshObject3d !== null) {
			this.meshObject3d.rotation.y = timer.elapsedTime / 7.5;
			const uniforms = this.getUniforms();
			if (uniforms !== null) {
				uniforms.cameraPos.value.copy(
					(this.camera.getCamera() ).position
				);
				uniforms.frame.value++;
			}
		}
	}
}
