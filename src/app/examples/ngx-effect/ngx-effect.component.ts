import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, PassComponent, RendererTimer, ThreeUtil  , I3JS, N3js } from 'ngx3js';

@Component({
	selector: 'app-ngx-effect',
	templateUrl: './ngx-effect.component.html',
	styleUrls: ['./ngx-effect.component.scss'],
})
export class NgxEffectComponent extends BaseComponent<{
	type: string;
	filmPass: {
		enabled: boolean;
		noiseIntensity: number;
		scanlinesIntensity: number;
		scanlinesCount: number;
		grayscale: boolean;
	};
	afterimagePass: {
		enabled: boolean;
		damp: number;
	};
	bloomPass: {
		enabled: boolean;
		strength: number;
	};
	glitchPass: {
		enabled: boolean;
		goWild: boolean;
	};
	bokehPass: {
		enabled: boolean;
		focus: number;
		aperture: number;
		aspect: number;
		maxblur: number;
	};
	halftonePass: {
		enabled: boolean;
		shape: number;
		radius: number;
		rotateR: number;
		rotateB: number;
		rotateG: number;
		scatter: number;
		blending: number;
		blendingMode: number;
		greyscale: boolean;
		disable: boolean;
	};
	dotScreen: {
		enabled: boolean;
		scale: number;
	};
	rgbShift: {
		enabled: boolean;
		amount: number;
		angle: number;
	};
	bleachBypass: {
		enabled: boolean;
		opacity: number;
	};
	sepia: {
		enabled: boolean;
		amount: number;
	};
	vignette: {
		enabled: boolean;
		offset: number;
		darkness: number;
	};
	gammaCorrection: {
		enabled: boolean;
	};
	pixel: {
		enabled: boolean;
		pixelSize: number;
		resolutionX: number;
		resolutionY: number;
	};
	luminosity: {
		enabled: boolean;
	};
	sobelOperator: {
		enabled: boolean;
		resolutionX: number;
		resolutionY: number;
	};
	shaderMaterial: {
		enabled: boolean;
	};
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				type: 'EffectComposer',
				filmPass: {
					enabled: false,
					noiseIntensity: 0.29,
					scanlinesIntensity: 1.025,
					scanlinesCount: 648,
					grayscale: false,
				},
				afterimagePass: {
					enabled: false,
					damp: 0.96,
				},
				bloomPass: {
					enabled: false,
					strength: 0.5,
				},
				bokehPass: {
					enabled: false,
					focus: 1500.0,
					aperture: 5,
					aspect: 0.29,
					maxblur: 0.31,
				},
				glitchPass: {
					enabled: false,
					goWild: false,
				},
				halftonePass: {
					enabled: false,
					shape: 1,
					radius: 4,
					rotateR: 15,
					rotateB: 15 * 2,
					rotateG: 15 * 3,
					scatter: 0,
					blending: 1,
					blendingMode: 1,
					greyscale: false,
					disable: false,
				},
				dotScreen: {
					enabled: true,
					scale: 2,
				},
				rgbShift: {
					enabled: false,
					amount: 0.0015,
					angle: 45,
				},
				bleachBypass: {
					enabled: false,
					opacity: 0.95,
				},
				sepia: {
					enabled: false,
					amount: 0.9,
				},
				vignette: {
					enabled: false,
					offset: 0.95,
					darkness: 1.6,
				},
				gammaCorrection: {
					enabled: false,
				},
				pixel: {
					enabled: false,
					pixelSize: 10,
					resolutionX: 1024,
					resolutionY: 1024,
				},
				luminosity: {
					enabled: false,
				},
				sobelOperator: {
					enabled: false,
					resolutionX: 1024,
					resolutionY: 1024,
				},
				shaderMaterial: {
					enabled: false,
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
					name: 'filmPass',
					type: 'folder',
					control: 'filmPass',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'noiseIntensity',
							type: 'number',
							min: 0,
							max: 3,
							step: 0.01,
							change: () => {
								this.changeFilm();
							},
						},
						{
							name: 'scanlinesIntensity',
							type: 'number',
							min: 0,
							max: 3,
							step: 0.01,
							change: () => {
								this.changeFilm();
							},
						},
						{
							name: 'scanlinesCount',
							type: 'number',
							min: 0,
							max: 2048,
							step: 1,
							change: () => {
								this.changeFilm();
							},
						},
						{
							name: 'grayscale',
							type: 'checkbox',
							change: () => {
								this.changeFilm();
							},
						},
					],
				},
				{
					name: 'afterimagePass',
					type: 'folder',
					control: 'afterimagePass',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'damp',
							type: 'number',
							min: 0,
							max: 0.99,
							step: 0.01,
							change: () => {
								this.changeAfterimage();
							},
						},
					],
				},
				{
					name: 'bloomPass',
					type: 'folder',
					control: 'bloomPass',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'strength',
							type: 'number',
							min: 0,
							max: 0.99,
							step: 0.01,
							change: () => {
								this.changeBloom();
							},
						},
					],
				},
				{
					name: 'dotScreen',
					type: 'folder',
					control: 'dotScreen',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'scale',
							type: 'number',
							min: 0,
							max: 10,
							step: 0.01,
							change: () => {
								this.changeDotScreen();
							},
						},
					],
				},

				{
					name: 'bokehPass',
					type: 'folder',
					control: 'bokehPass',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'focus',
							type: 'number',
							min: 10.0,
							max: 3000.0,
							step: 10,
							change: () => {
								this.changeBokeh();
							},
						},
						{
							name: 'aperture',
							type: 'number',
							min: 0,
							max: 100,
							step: 0.1,
							change: () => {
								this.changeBokeh();
							},
						},
						{
							name: 'aspect',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.changeBokeh();
							},
						},
						{
							name: 'maxblur',
							type: 'number',
							min: 0.0,
							max: 1,
							step: 0.001,
							change: () => {
								this.changeBokeh();
							},
						},
					],
				},
				{
					name: 'glitchPass',
					type: 'folder',
					control: 'glitchPass',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{ name: 'goWild', type: 'checkbox' },
					],
				},
				{
					name: 'halftonePass',
					type: 'folder',
					control: 'halftonePass',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'shape',
							type: 'select',
							select: { Dot: 1, Ellipse: 2, Line: 3, Square: 4 },
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'radius',
							type: 'number',
							min: 1,
							max: 25,
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'rotateR',
							type: 'number',
							min: 0,
							max: 90,
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'rotateG',
							type: 'number',
							min: 0,
							max: 90,
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'rotateB',
							type: 'number',
							min: 0,
							max: 90,
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'scatter',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'greyscale',
							type: 'checkbox',
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'blending',
							type: 'number',
							min: 0,
							max: 1,
							step: 0.01,
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'blendingMode',
							type: 'select',
							select: { Linear: 1, Multiply: 2, Add: 3, Lighter: 4, Darker: 5 },
							change: () => {
								this.changeHalftone();
							},
						},
						{
							name: 'disable',
							type: 'checkbox',
							change: () => {
								this.changeHalftone();
							},
						},
					],
				},
				{
					name: 'rgbShift',
					type: 'folder',
					control: 'rgbShift',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'amount',
							type: 'number',
							min: 0,
							max: 0.01,
							change: () => {
								this.changeRgbShift();
							},
						},
						{
							name: 'angle',
							type: 'number',
							min: 0,
							max: 360,
							change: () => {
								this.changeRgbShift();
							},
						},
					],
				},
				{
					name: 'bleachBypass',
					type: 'folder',
					control: 'bleachBypass',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'opacity',
							type: 'number',
							min: 0,
							max: 1,
							change: () => {
								this.changeBleachBypass();
							},
						},
					],
				},
				{
					name: 'sepia',
					type: 'folder',
					control: 'sepia',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'amount',
							type: 'number',
							min: 0,
							max: 1,
							change: () => {
								this.changeSepia();
							},
						},
					],
				},
				{
					name: 'vignette',
					type: 'folder',
					control: 'vignette',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'offset',
							type: 'number',
							min: 0,
							max: 1,
							change: () => {
								this.changeVignette();
							},
						},
						{
							name: 'darkness',
							type: 'number',
							min: 0,
							max: 3,
							change: () => {
								this.changeVignette();
							},
						},
					],
				},
				{
					name: 'gammaCorrection',
					type: 'folder',
					control: 'gammaCorrection',
					children: [{ name: 'enabled', type: 'checkbox', listen: true }],
				},
				{
					name: 'pixel',
					type: 'folder',
					control: 'pixel',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'pixelSize',
							type: 'number',
							min: 1,
							max: 20,
							change: () => {
								this.changePixel();
							},
						},
						{
							name: 'resolutionX',
							type: 'number',
							min: 100,
							max: 1024,
							change: () => {
								this.changePixel();
							},
						},
						{
							name: 'resolutionY',
							type: 'number',
							min: 100,
							max: 1024,
							change: () => {
								this.changePixel();
							},
						},
					],
				},
				{
					name: 'luminosity',
					type: 'folder',
					control: 'luminosity',
					children: [{ name: 'enabled', type: 'checkbox', listen: true }],
				},
				{
					name: 'sobelOperator',
					type: 'folder',
					control: 'sobelOperator',
					children: [
						{ name: 'enabled', type: 'checkbox', listen: true },
						{
							name: 'resolutionX',
							type: 'number',
							min: 100,
							max: 1024,
							change: () => {
								this.changeSobelOperator();
							},
						},
						{
							name: 'resolutionY',
							type: 'number',
							min: 100,
							max: 1024,
							change: () => {
								this.changeSobelOperator();
							},
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
					this.controls.dotScreen.enabled = false;
					const type = params['type'];
					switch (type) {
						case 'EffectComposer':
							this.controls.type = 'EffectComposer';
							this.controls.dotScreen.enabled = true;
							this.controls.filmPass.enabled = true;
							break;
						case 'AsciiEffect':
						case 'OutlineEffect':
						case 'ParallaxBarrierEffect':
						case 'PeppersGhostEffect':
							this.controls.type = type;
							break;
						default:
							this.controls.type = 'EffectComposer';
							switch (type) {
								case 'ClearMaskPass':
								case 'ClearPass':
								case 'CubeTexturePass':
								case 'MaskPass':
								case 'ReflectorForSSRPass':
								case 'RenderPass':
								case 'SavePass':
								case 'ShaderPass':
								case 'TexturePass':
									break;
								case 'AdaptiveToneMappingPass':
									break;
								case 'AfterimagePass':
									this.controls.afterimagePass.enabled = true;
									break;
								case 'BloomPass':
									this.controls.bloomPass.enabled = true;
									break;
								case 'BokehPass':
									this.controls.bokehPass.enabled = true;
									break;
								case 'DotScreenPass':
									this.controls.dotScreen.enabled = true;
									break;
								case 'FilmPass':
									this.controls.filmPass.enabled = true;
									break;
								case 'GlitchPass':
									this.controls.glitchPass.enabled = true;
									break;
								case 'HalftonePass':
									this.controls.halftonePass.enabled = true;
									break;
								case 'LUTPass':
									break;
								case 'OutlinePass':
									break;
								case 'SAOPass':
									break;
								case 'SMAAPass':
									break;
								case 'SSAARenderPass':
									break;
								case 'SSAOPass':
									break;
								case 'SSRPass':
									break;
								case 'SSRrPass':
									break;
								case 'TAARenderPass':
									break;
								case 'UnrealBloomPass':
									break;
							}
							break;
					}
				}
			})
		);
	}

	setShaderPass(pass: PassComponent, name: string) {
		const threePass: any = pass.getPass();
		switch (name) {
			case 'afterimage':
				this.afterimageUniforms = threePass.uniforms;
				this.changeAfterimage();
				break;
			case 'dotScreen':
				this.dotScreenUniforms = threePass.uniforms;
				this.changeDotScreen();
				break;
			case 'glitch':
				this.glitchUniforms = threePass.uniforms;
				this.changeGlitch();
				break;
			case 'bloom':
				this.bloomUniforms = threePass.materialCopy.uniforms;
				this.changeBloom();
				break;
			case 'bokeh':
				this.bokehUniforms = threePass.uniforms;
				this.changeBokeh();
				break;
			case 'film':
				this.filmUniforms = threePass.uniforms;
				this.changeFilm();
				break;
			case 'halftone':
				this.halftonePassUniforms = threePass.uniforms;
				this.changeHalftone();
				break;
			case 'rgbShift':
				this.rgbShiftUniforms = threePass.uniforms;
				this.changeRgbShift();
				break;
			case 'bleachBypass':
				this.bleachBypassUniforms = threePass.uniforms;
				this.changeBleachBypass();
				break;
			case 'sepia':
				this.sepiaUniforms = threePass.uniforms;
				this.changeSepia();
				break;
			case 'vignette':
				this.vignetteUniforms = threePass.uniforms;
				this.changeVignette();
				break;
			case 'gammaCorrection':
				this.gammaCorrectionUniforms = threePass.uniforms;
				this.changeGammaCorrection();
				break;
			case 'pixel':
				this.pixelUniforms = threePass.uniforms;
				this.changePixel();
				break;
			case 'luminosity':
				this.luminosityUniforms = threePass.uniforms;
				this.changeLuminosity();
				break;
			case 'sobelOperator':
				this.sobelOperatorUniforms = threePass.uniforms;
				this.changeSobelOperator();
				break;
			case 'shaderMaterial':
				break;
			default:
				console.error(name);
				break;
		}
	}

	bloomUniforms: any = {};

	changeBloom() {
		if (this.bloomUniforms !== null) {
			const uniforms = this.bloomUniforms;
			uniforms.opacity.value = this.controls.bloomPass.strength;
		}
	}

	dotScreenUniforms: any = {};

	changeDotScreen() {
		if (this.dotScreenUniforms !== null) {
			const uniforms = this.dotScreenUniforms;
			uniforms.scale.value = this.controls.dotScreen.scale;
		}
	}

	bokehUniforms: any = {};

	changeBokeh() {
		if (this.bokehUniforms !== null) {
			const uniforms = this.bokehUniforms;
			uniforms.aperture.value = this.controls.bokehPass.aperture * 0.00001;
			uniforms.aspect.value = this.controls.bokehPass.aspect;
			uniforms.focus.value = this.controls.bokehPass.focus;
			uniforms.maxblur.value = this.controls.bokehPass.maxblur;
		}
	}

	afterimageUniforms: any = {};

	changeAfterimage() {
		if (this.afterimageUniforms !== null) {
			const uniforms = this.afterimageUniforms;
			uniforms.damp.value = this.controls.afterimagePass.damp;
		}
	}

	glitchUniforms: any = {};

	changeGlitch() {}

	halftonePassUniforms: any = {};

	changeHalftone() {
		if (this.halftonePassUniforms !== null) {
			const uniforms = this.halftonePassUniforms;
			uniforms.radius.value = this.controls.halftonePass.radius;
			uniforms.rotateR.value =
				this.controls.halftonePass.rotateR * (Math.PI / 180);
			uniforms.rotateG.value =
				this.controls.halftonePass.rotateG * (Math.PI / 180);
			uniforms.rotateB.value =
				this.controls.halftonePass.rotateB * (Math.PI / 180);
			uniforms.scatter.value = this.controls.halftonePass.scatter;
			uniforms.shape.value = this.controls.halftonePass.shape;
			uniforms.greyscale.value = this.controls.halftonePass.greyscale;
			uniforms.blending.value = this.controls.halftonePass.blending;
			uniforms.blendingMode.value = this.controls.halftonePass.blendingMode;
			uniforms.disable.value = this.controls.halftonePass.disable;
		}
	}

	rgbShiftUniforms: any = {};

	changeRgbShift() {
		if (this.rgbShiftUniforms !== null) {
			const uniforms = this.rgbShiftUniforms;
			uniforms.amount.value = this.controls.rgbShift.amount;
			uniforms.angle.value = ThreeUtil.getAngleSafe(
				this.controls.rgbShift.angle
			);
		}
	}

	bleachBypassUniforms: any = {};

	changeBleachBypass() {
		if (this.bleachBypassUniforms !== null) {
			const uniforms = this.bleachBypassUniforms;
			uniforms.opacity.value = this.controls.bleachBypass.opacity;
		}
	}

	sepiaUniforms: any = {};

	changeSepia() {
		if (this.sepiaUniforms !== null) {
			const uniforms = this.sepiaUniforms;
			uniforms.amount.value = this.controls.sepia.amount;
		}
	}

	vignetteUniforms: any = {};

	changeVignette() {
		if (this.vignetteUniforms !== null) {
			const uniforms = this.vignetteUniforms;
			uniforms.offset.value = this.controls.vignette.offset;
			uniforms.darkness.value = this.controls.vignette.darkness;
		}
	}

	gammaCorrectionUniforms: any = {};

	changeGammaCorrection() {}

	pixelUniforms: any = {};

	changePixel() {
		if (this.pixelUniforms !== null) {
			const uniforms = this.pixelUniforms;
			uniforms.pixelSize.value = this.controls.pixel.pixelSize;
			uniforms.resolution.value = ThreeUtil.getVector2Safe(
				this.controls.pixel.resolutionX,
				this.controls.pixel.resolutionY
			);
		}
	}

	luminosityUniforms: any = {};

	changeLuminosity() {
		if (this.luminosityUniforms !== null) {
			const uniforms = this.luminosityUniforms;
			console.log('changeLuminosity', uniforms);
		}
	}

	sobelOperatorUniforms: any = {};

	changeSobelOperator() {
		if (this.sobelOperatorUniforms !== null) {
			const uniforms = this.sobelOperatorUniforms;
			uniforms.resolution.value = ThreeUtil.getVector2Safe(
				this.controls.sobelOperator.resolutionX,
				this.controls.sobelOperator.resolutionY
			);
		}
	}

	filmUniforms: any = {};

	changeFilm() {
		if (this.filmUniforms !== null) {
			const uniforms = this.filmUniforms;
			uniforms.nIntensity.value = this.controls.filmPass.noiseIntensity;
			uniforms.sIntensity.value = this.controls.filmPass.scanlinesIntensity;
			uniforms.sCount.value = this.controls.filmPass.scanlinesCount;
			uniforms.grayscale.value = this.controls.filmPass.grayscale ? 1 : 0;
		}
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.mesh !== null && this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.position.y =
				Math.abs(Math.sin(elapsedTime * 0.2)) * 150;
			this.meshObject3d.rotation.x = elapsedTime * 0.3;
			this.meshObject3d.rotation.z = elapsedTime * 0.2;
		}
	}
}
