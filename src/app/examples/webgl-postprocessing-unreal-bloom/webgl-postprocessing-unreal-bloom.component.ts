import { Component } from '@angular/core';
import { BaseComponent, PassComponent, THREE, UnrealBloomPass } from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-unreal-bloom',
	templateUrl: './webgl-postprocessing-unreal-bloom.component.html',
	styleUrls: ['./webgl-postprocessing-unreal-bloom.component.scss'],
})
export class WebglPostprocessingUnrealBloomComponent extends BaseComponent<{
	exposure: number;
	bloomStrength: number;
	bloomThreshold: number;
	bloomRadius: number;
}> {
	constructor() {
		super(
			{
				exposure: 1,
				bloomStrength: 1.5,
				bloomThreshold: 0,
				bloomRadius: 0,
			},
			[
				{
					name: 'exposure',
					type: 'number',
					min: 0.1,
					max: 2,
					change: () => {
						if (this.renderer !== null) {
							const renderer =
								this.renderer.getRenderer() as THREE.WebGLRenderer;
							renderer.toneMappingExposure = Math.pow(
								this.controls.exposure,
								4.0
							);
						}
					},
				},
				{
					name: 'bloomThreshold',
					type: 'number',
					min: 0.0,
					max: 1.0,
					change: () => {
						this.changeBloomPass();
					},
				},
				{
					name: 'bloomStrength',
					type: 'number',
					min: 0.0,
					max: 3.0,
					change: () => {
						this.changeBloomPass();
					},
				},
				{
					name: 'bloomRadius',
					type: 'number',
					min: 0.0,
					max: 1.0,
					step: 0.01,
					change: () => {
						this.changeBloomPass();
					},
				},
			]
		);
	}

	setBloomPass(pass: PassComponent) {
		this.bloomPass = pass.getPass() as UnrealBloomPass;
	}

	bloomPass: UnrealBloomPass = null;
	changeBloomPass() {
		if (this.bloomPass !== null) {
			this.bloomPass.threshold = this.controls.bloomThreshold;
			this.bloomPass.strength = this.controls.bloomStrength;
			this.bloomPass.radius = this.controls.bloomRadius;
		}
	}
}
