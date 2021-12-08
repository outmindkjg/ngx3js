import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	BaseComponent,
	GeometryComponent,
	MaterialComponent,
	RendererTimer,
} from 'ngx3js';
import * as THREE from 'three';

@Component({
	selector: 'app-ngx-material',
	templateUrl: './ngx-material.component.html',
	styleUrls: ['./ngx-material.component.scss'],
})
export class NgxMaterialComponent extends BaseComponent<{
	material: {
		type: string;
		color: number;
		metalness: number;
		roughness: number;
		wireframe: boolean;
		transparent: boolean;
		opacity: number;
		flatShading: boolean;
		depthTest: boolean;
		depthWrite: boolean;
		side: string;
	};
	texture: {
		envMap: boolean;
		map: boolean;
	};
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				material: {
					type: 'MeshPhysicalMaterial',
					color: 0xffffff,
					metalness: 0.9,
					roughness: 0.1,
					wireframe: false,
					transparent: false,
					opacity: 0.7,
					flatShading: false,
					depthTest: true,
					depthWrite: true,
					side: 'front',
				},
				texture: {
					envMap: true,
					map: true,
				},
			},
			[
				{
					name: 'material',
					type: 'folder',
					control: 'material',
					children: [
						{
							name: 'type',
							type: 'select',
							select: [
								// 'BasicNodeMaterial',
								'LineBasicMaterial',
								'LineDashedMaterial',
								// 'LineMaterial',
								'MeshBasicMaterial',
								'MeshDepthMaterial',
								'MeshDistanceMaterial',
								'MeshLambertMaterial',
								'MeshMatcapMaterial',
								'MeshNormalMaterial',
								'MeshPhongMaterial',
								'MeshPhysicalMaterial',
								'MeshStandardMaterial',
								'MeshStandardNodeMaterial',
								'MeshToonMaterial',
								//	'PhongNodeMaterial',
								'PointsMaterial',
								//	'RawShaderMaterial',
								//	'ShaderAttributeSizeColor1Material',
								//	'ShaderAttributeSizeColorMaterial',
								//	'ShaderAttributesParticlesMaterial',
								//	'ShaderAudioVisualizerMaterial',
								//	'ShaderCloudMaterial',
								'ShaderColorRainbowMaterial',
								'ShaderCustomAttributesLinesMaterial',
								// 'ShaderCustomAttributesMaterial',
								// 'ShaderCustomAttributesPointsMaterial',
								// 'ShaderFresnelMaterial',
								'ShaderInstancingMaterial',
								// 'ShaderMaterial',
								'ShaderNoiseRandom1DMaterial',
								'ShaderNoiseRandom2DMaterial',
								'ShaderNoiseRandom3DMaterial',
								// 'ShaderParallaxMaterial',
								// 'ShaderPerlinMaterial',
								// 'ShaderRaymarchingReflectMaterial',
								// 'ShaderScaleColorMaterial',
								// 'ShaderSelectiveDrawMaterial',
								'ShaderSkyDomeMaterial',
								'ShaderSinColorMaterial',
								// 'ShaderSubsurfaceScatteringMaterial',
								// 'ShaderVideoKinectMaterial',
								// 'ShaderVolumeRenderShader1Material',
								// 'ShaderWireframeMaterial',
								// 'ShadowMaterial',
								'SpriteMaterial',
								// 'SpriteNodeMaterial',
								// 'StandardNodeMaterial',
							],
							listen: true,
							change: () => {
								this.changeMaterial();
							},
						},
						{ name: 'color', type: 'color' },
						{
							name: 'side',
							type: 'select',
							select: ['front', 'back', 'double'],
						},
						{ name: 'metalness', type: 'number', min: 0, max: 1, step: 0.01 },
						{ name: 'roughness', type: 'number', min: 0, max: 1, step: 0.01 },
						{ name: 'wireframe', type: 'checkbox' },
						{ name: 'transparent', type: 'checkbox' },
						{ name: 'opacity', type: 'number', min: 0, max: 1, step: 0.01 },
						{ name: 'flatShading', type: 'checkbox' },
						{ name: 'depthTest', type: 'checkbox' },
						{ name: 'depthWrite', type: 'checkbox' },
					],
				},
				{
					name: 'texture',
					type: 'folder',
					control: 'texture',
					children: [
						{ name: 'map', type: 'checkbox' },
						{ name: 'envMap', type: 'checkbox' },
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
					switch (params['type']) {
						case 'LineBasicMaterial':
						case 'LineDashedMaterial':
						case 'MeshBasicMaterial':
						case 'MeshDepthMaterial':
						case 'MeshDistanceMaterial':
						case 'MeshLambertMaterial':
						case 'MeshMatcapMaterial':
						case 'MeshNormalMaterial':
						case 'MeshPhongMaterial':
						case 'MeshPhysicalMaterial':
						case 'MeshStandardMaterial':
						case 'MeshStandardNodeMaterial':
						case 'MeshToonMaterial':
						case 'PointsMaterial':
						case 'ShaderColorRainbowMaterial':
						case 'ShaderCustomAttributesLinesMaterial':
						case 'ShaderInstancingMaterial':
						case 'ShaderNoiseRandom1DMaterial':
						case 'ShaderNoiseRandom2DMaterial':
						case 'ShaderNoiseRandom3DMaterial':
						case 'ShaderSkyDomeMaterial':
						case 'ShaderSinColorMaterial':
						case 'SpriteMaterial':
							this.controls.material.type = params['type'];
							this.changeMaterial();
							break;
						case 'BasicNodeMaterial':
						case 'ShaderCustomAttributesMaterial':
						case 'ShaderCustomAttributesPointsMaterial':
						case 'ShaderFresnelMaterial':
						case 'ShaderMaterial':
						case 'ShaderParallaxMaterial':
						case 'ShaderPerlinMaterial':
						case 'ShaderRaymarchingReflectMaterial':
						case 'ShaderScaleColorMaterial':
						case 'ShaderSelectiveDrawMaterial':
						case 'ShaderSubsurfaceScatteringMaterial':
						case 'ShaderVideoKinectMaterial':
						case 'ShaderVolumeRenderShader1Material':
						case 'ShaderWireframeMaterial':
						case 'ShadowMaterial':
						case 'SpriteNodeMaterial':
						case 'StandardNodeMaterial':
						case 'LineMaterial':
						case 'PhongNodeMaterial':
						case 'RawShaderMaterial':
						case 'ShaderAttributeSizeColor1Material':
						case 'ShaderAttributeSizeColorMaterial':
						case 'ShaderAttributesParticlesMaterial':
						case 'ShaderAudioVisualizerMaterial':
						case 'ShaderCloudMaterial':
						default:
							break;
					}
				}
			})
		);
		this.changeMaterial();
	}

	uniforms: any = null;
	meshType: string = 'mesh';
	changeMaterial() {
		this.meshType = 'mesh';
		this.uniforms = null;
		this.loadedUniforms = null;
		this.loadedGeometry = [];
		switch (this.controls.material.type) {
			case 'LineMaterial':
				this.meshType = 'Line2';
				break;
			case 'LineBasicMaterial':
			case 'LineDashedMaterial':
			case 'LineMaterial':
				this.meshType = 'LineSegments';
				break;
			case 'PointsMaterial':
				this.meshType = 'Points';
				break;
			case 'ShaderCloudMaterial':
				this.uniforms = {
					map: {
						type: 'DataTexture3D',
						value: 'DataTexture3D',
						options:
							'RedFormat,LinearFilter,unpackAlignment=1,size=128x128x128',
					},
				};
				break;
			case 'ShaderAttributesParticlesMaterial':
				this.meshType = 'Points';
				this.uniforms = {
					pointTexture: {
						value: 'textures/sprites/spark1.png',
						type: 'texture',
					},
				};
				break;
			case 'ShaderCustomAttributesLinesMaterial':
				this.uniforms = {
					amplitude: { type: 'number', value: 5.0 },
					opacity: { type: 'number', value: 0.3 },
					color: { type: 'color', value: '0xffffff' },
				};
				break;
			case 'SpriteMaterial':
				this.meshType = 'Sprite';
				break;
		}
	}

	loadedGeometry: any[] = [];

	setGeometry(geo: GeometryComponent) {
		switch (this.controls.material.type) {
			case 'ShaderCustomAttributesLinesMaterial':
				const geometry = geo.getGeometry();
				if (
					geometry !== null &&
					geometry.getAttribute('position') !== undefined
				) {
					const itemCount = geometry.attributes.position.count;
					geometry.setAttribute(
						'customColor',
						new THREE.Float32BufferAttribute(itemCount * 3, 3)
					);
					geometry.setAttribute(
						'displacement',
						new THREE.Float32BufferAttribute(itemCount * 3, 3)
					);
					const customColor = geometry.attributes
						.customColor as THREE.Float32BufferAttribute;
					const color = new THREE.Color(0xffffff);
					for (let i = 0, l = customColor.count; i < l; i++) {
						color.setHSL(i / l, 0.5, 0.5);
						color.toArray(customColor.array, i * customColor.itemSize);
					}
					this.loadedGeometry.push(geometry);
				}
				break;
		}
	}

	setMaterial(mat: MaterialComponent) {
		const material: any = mat.getMaterial();
		if (material.uniforms) {
			this.loadedUniforms = material.uniforms;
		}
	}

	loadedUniforms: any = null;

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const elapsedTime = timer.elapsedTime;
			this.meshObject3d.rotation.y = elapsedTime / 5;
			switch (this.controls.material.type) {
				case 'ShaderCustomAttributesLinesMaterial':
					if (this.loadedUniforms !== null && this.loadedGeometry.length > 0) {
						this.loadedUniforms['amplitude'].value = Math.sin(
							0.5 * elapsedTime
						);
						this.loadedUniforms['color'].value.offsetHSL(0.0005, 0, 0);
						this.loadedGeometry.forEach((geometry) => {
							const attributes = geometry.attributes as any;
							const array = attributes.displacement.array;
							for (let i = 0, l = array.length; i < l; i += 3) {
								array[i] += 0.1 * (0.5 - Math.random());
								array[i + 1] += 0.1 * (0.5 - Math.random());
								array[i + 2] += 0.1 * (0.5 - Math.random());
							}
							attributes.displacement.needsUpdate = true;
						});
					}
					break;
			}
		}
	}
}
