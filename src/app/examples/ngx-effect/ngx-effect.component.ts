import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-effect',
	templateUrl: './ngx-effect.component.html',
	styleUrls: ['./ngx-effect.component.scss'],
})
export class NgxEffectComponent extends BaseComponent<{
	type: string;
	pass: string;
	filmPass: {
		noiseIntensity: number;
		scanlinesIntensity: number;
		scanlinesCount: number;
		grayscale: boolean;
	};
	afterimagePass: {
		damp: number;
	};
	bloomPass: {
		strength: number;
	};
	bokehPass: {
		focus: number;
		aperture: number;
		maxblur: number;
	};
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				type: 'EffectComposer',
				pass: 'BokehPass',
				filmPass: {
					noiseIntensity: 0.29,
					scanlinesIntensity: 1.025,
					scanlinesCount: 648,
					grayscale: false,
				},
				afterimagePass: {
					damp: 0.96,
				},
				bloomPass: {
					strength: 0.5,
				},
				bokehPass: {
					focus: 1500.0,
					aperture: 5,
					maxblur: 0.31,
				},
			},
			[
				{
					name: 'type',
					type: 'select',
					select: [
						'EffectComposer',
						'AsciiEffect',
						'OutlineEffect',
						'ParallaxBarrierEffect',
						'PeppersGhostEffect',
					],
					listen: true,
				},
				{
					name: 'pass',
					type: 'select',
					select: [
					//	 'AdaptiveToneMappingPass',
						'AfterimagePass',
						'BloomPass',
						'BokehPass',
					//	'ClearMaskPass',
					//	'ClearPass',
					//	'CubeTexturePass',
						'DotScreenPass',
						'FilmPass',
						'GlitchPass',
						'HalftonePass',
						'LUTPass',
					//	'MaskPass',
						'OutlinePass',
					//	'ReflectorForSSRPass',
					//	'RenderPass',
						'SAOPass',
						'SMAAPass',
						'SSAARenderPass',
						'SSAOPass',
						'SSRPass',
						'SSRrPass',
					//	'SavePass',
					//	'ShaderPass',
						'TAARenderPass',
					//	'TexturePass',
						'UnrealBloomPass',
					],
					listen: true,
				},
				{
					name: 'filmPass',
					type: 'folder',
					control: 'filmPass',
					children: [
						{
							name: 'noiseIntensity',
							type: 'number',
							min: 0,
							max: 3,
							step: 0.01,
						},
						{
							name: 'scanlinesIntensity',
							type: 'number',
							min: 0,
							max: 3,
							step: 0.01,
						},
						{
							name: 'scanlinesCount',
							type: 'number',
							min: 0,
							max: 2048,
							step: 1,
						},
						{ name: 'grayscale', type: 'checkbox' },
					],
				},
				{
					name: 'afterimagePass',
					type: 'folder',
					control: 'afterimagePass',
					children: [
						{ name: 'damp', type: 'number', min: 0, max: 0.99, step: 0.01 },
					],
				},
				{
					name: 'bloomPass',
					type: 'folder',
					control: 'bloomPass',
					children: [
						{ name: 'strength', type: 'number', min: 0, max: 0.99, step: 0.01 },
					],
				},
				{
					name: 'bokehPass',
					type: 'folder',
					control: 'bokehPass',
					children: [
						{ name: 'focus', type: 'number', min: 10.0, max: 3000.0, step: 10 },
						{ name: 'aperture', type: 'number', min: 0, max: 20, step: 0.1 },
						{
							name: 'maxblur',
							type: 'number',
							min: 0.0,
							max: 1,
							step: 0.001,
						},
					],
				},
			],
			true,
			false
		);
	}

	ngOnInit() {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					this.getTimeout().then(() => {
						switch (params['type']) {
							case 'EffectEffect':
							case 'AsciiEffect':
							case 'OutlineEffect':
							case 'ParallaxBarrierEffect':
							case 'PeppersGhostEffect':
								this.controls.type = params['type'];
								break;
							default:
								this.controls.pass = params['type'];
								this.controls.type = 'EffectEffect';
								break;
						}
					});
				}
			})
		);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null && false) {
			const elapsedTime = timer.elapsedTime;
			this.mesh.setPosition(
				null,
				Math.abs(Math.sin(elapsedTime * 2)) * 150,
				null
			);
			this.mesh.setRotation(
				elapsedTime * 0.3 * 180,
				null,
				elapsedTime * 0.2 * 180
			);
		}
	}
}
