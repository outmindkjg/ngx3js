import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-composer',
	templateUrl: './ngx-composer.component.html',
	styleUrls: ['./ngx-composer.component.scss'],
})
export class NgxComposerComponent extends BaseComponent<{
	type: string;
	pass: string;
	filmPass : {
		noiseIntensity : number;
		scanlinesIntensity : number;
		scanlinesCount : number;
		grayscale : boolean;	
	},
	afterimagePass : {
		damp : number;
	}
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				type: 'AsciiEffect',
				pass: 'FilmPass',
				filmPass : {
					noiseIntensity : 0.29,
					scanlinesIntensity : 1.025,
					scanlinesCount : 648,
					grayscale : false	
				},
				afterimagePass : {
					damp : 0.96
				}
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
						'AdaptiveToneMappingPass',
						'AfterimagePass',
						'BloomPass',
						'BokehPass',
						'ClearMaskPass',
						'ClearPass',
						'CubeTexturePass',
						'DotScreenPass',
						'FilmPass',
						'GlitchPass',
						'HalftonePass',
						'LUTPass',
						'MaskPass',
						'OutlinePass',
						'ReflectorForSSRPass',
						'RenderPass',
						'SAOPass',
						'SMAAPass',
						'SSAARenderPass',
						'SSAOPass',
						'SSRPass',
						'SSRrPass',
						'SavePass',
						'ShaderPass',
						'TAARenderPass',
						'TexturePass',
						'UnrealBloomPass',
					],
					listen: true,
				},
				{ name : 'filmPass', type : 'folder', control : 'filmPass', children : [
					{ name : 'noiseIntensity', type : 'number', min : 0, max : 3, step : 0.01 },
					{ name : 'scanlinesIntensity', type : 'number', min : 0, max : 3, step : 0.01 },
					{ name : 'scanlinesCount', type : 'number', min : 0, max : 2048, step : 1 },
					{ name : 'grayscale', type : 'checkbox' },
				]},
				{ name : 'afterimagePass', type : 'folder', control : 'afterimagePass', children : [
					{ name : 'damp', type : 'number', min : 0, max : 0.99, step : 0.01 },
				]},
			]
		,true, false);
	}

	ngOnInit() {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					this.getTimeout().then(() => {
						switch (params['type']) {
							case 'EffectComposer':
							case 'AsciiEffect':
							case 'OutlineEffect':
							case 'ParallaxBarrierEffect':
							case 'PeppersGhostEffect':
								this.controls.type = params['type'];
								break;
							default:
								this.controls.pass = params['type'];
								this.controls.type = 'EffectComposer';
								break;
						}
					});
				}
			})
		);
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null) {
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
