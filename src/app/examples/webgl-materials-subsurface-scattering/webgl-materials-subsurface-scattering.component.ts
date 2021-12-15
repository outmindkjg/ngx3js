import { Component } from '@angular/core';
import { I3JS, NgxBaseComponent, NgxMaterialComponent, IRendererTimer } from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-subsurface-scattering',
	templateUrl: './webgl-materials-subsurface-scattering.component.html',
	styleUrls: ['./webgl-materials-subsurface-scattering.component.scss'],
})
export class WebglMaterialsSubsurfaceScatteringComponent extends NgxBaseComponent<{
	distortion: number;
	ambient: number;
	attenuation: number;
	power: number;
	scale: number;
}> {
	constructor() {
		super(
			{
				distortion: 0.1,
				ambient: 0.4,
				attenuation: 0.8,
				power: 2.0,
				scale: 16.0,
			},
			[
				{
					name: 'distortion',
					type: 'number',
					min: 0.01,
					max: 1,
					step: 0.01,
					change: () => {
						this.updateUniforms(
							'thicknessDistortion',
							this.controls.distortion
						);
					},
				},
				{
					name: 'ambient',
					type: 'number',
					min: 0.01,
					max: 5,
					step: 0.05,
					change: () => {
						this.updateUniforms('thicknessAmbient', this.controls.ambient);
					},
				},
				{
					name: 'attenuation',
					type: 'number',
					min: 0.01,
					max: 5,
					step: 0.05,
					change: () => {
						this.updateUniforms(
							'thicknessAttenuation',
							this.controls.attenuation
						);
					},
				},
				{
					name: 'power',
					type: 'number',
					min: 0.01,
					max: 16,
					step: 0.1,
					change: () => {
						this.updateUniforms('thicknessPower', this.controls.power);
					},
				},
				{
					name: 'scale',
					type: 'number',
					min: 0.01,
					max: 50,
					step: 0.1,
					change: () => {
						this.updateUniforms('thicknessScale', this.controls.scale);
					},
				},
			]
		);
	}

	setMatrial(matrial: NgxMaterialComponent) {
		this.matrial = matrial.getMaterial() ;
	}

	matrial: I3JS.ShaderMaterial = null;

	updateUniforms(key: string, value: number) {
		if (this.matrial !== null) {
			const uniforms = this.matrial.uniforms;
			if (uniforms[key] !== undefined) {
				uniforms[key].value = value;
			}
		}
	}

	onRender(timer: IRendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			this.meshObject3d.rotation.y = timer.elapsedTime / 5;
		}
	}
}
