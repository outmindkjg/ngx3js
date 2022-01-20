import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
	I3JS,
	IRendererTimer,
	NgxBaseComponent,
	NgxLightComponent,
	NgxRendererComponent,
	THREE,
} from 'ngx3js';

@Component({
	selector: 'app-ngx-material-browser',
	templateUrl: './ngx-material-browser.component.html',
	styleUrls: ['./ngx-material-browser.component.scss'],
})
export class NgxMaterialBrowserComponent extends NgxBaseComponent<{
	ambientLight: number;
	fog: {
		enabled: boolean;
		color: number;
	};
	material: {
		transparent: boolean;
		opacity: number;
		depthTest: boolean;
		depthWrite: boolean;
		alphaTest: number;
		visible: boolean;
		side: string;
		type: string;
	};
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				ambientLight: 0x000000,
				fog: {
					enabled: false,
					color: 0x3f7b9d,
				},
				material: {
					transparent: false,
					opacity: 1,
					depthTest: true,
					depthWrite: true,
					alphaTest: 0,
					visible: true,
					side: 'front',
					type: 'MeshBasicMaterial',
				},
			},
			[
				{
					type: 'folder',
					name: 'Scene',
					children: [
						{ type: 'color', name: 'ambientLight', title: 'ambient light' },
						{
							type: 'folder',
							name: 'fog',
							control: 'fog',
							children: [
								{
									type: 'checkbox',
									name: 'enabled',
									change: () => {
										this.getTimeout(2000).then(() => {
											console.log(this.sceneObject3d);
										});
									},
								},
								{ type: 'color', name: 'color' },
							],
						},
					],
				},
				{
					type: 'folder',
					name: 'Material',
					control: 'material',
					children: [
						{ type: 'checkbox', name: 'transparent' },
						{ type: 'number', name: 'opacity', min: 0, max: 1, step: 0.01 },
						{ type: 'checkbox', name: 'depthTest' },
						{ type: 'checkbox', name: 'depthWrite' },
						{ type: 'number', name: 'alphaTest', min: 0, max: 1, step: 0.01 },
						{ type: 'checkbox', name: 'visible' },
						{
							type: 'select',
							name: 'side',
							select: ['FrontSide', 'BackSide', 'DoubleSide'],
						},
						{
							type: 'select',
							name: 'type',
							title: 'Material Type',
							select: [
								'MeshBasicMaterial',
								'MeshLambertMaterial',
								'MeshMatcapMaterial',
								'MeshPhongMaterial',
								'MeshToonMaterial',
								'MeshStandardMaterial',
								'MeshPhysicalMaterial',
								'MeshDepthMaterial',
								'MeshNormalMaterial',
								'LineBasicMaterial',
							],
							listen: true,
							change: () => {
								this.changeMaterial();
							},
						},
					],
				},
				{ type: 'folder', name: 'attribute', children: [] },
			],
			false,
			false
		);
	}

	ngOnInit(): void {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					this.controls.material.type = params['type'];
					this.changeMaterial();
				}
			})
		);
		this.changeMaterial();
	}

	setLight(light: NgxLightComponent, type: string) {
		switch (type) {
			case 'light1':
				this.light1 = light.getLight();
				break;
			case 'light2':
				this.light2 = light.getLight();
				break;
			case 'light3':
				this.light3 = light.getLight();
				break;
		}
	}

	light1: I3JS.Light = null;
	light2: I3JS.Light = null;
	light3: I3JS.Light = null;

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.changeMaterial();
	}

	private lastMaterial: string = null;
	private lastGuiMaterial: string = null;

	materialAttr: any = {
		type: 'MeshBasicMaterial',
	};

	envMaps: string[] = ['none', 'reflection', 'refraction'];
	diffuseMaps: string[] = ['none', 'brick-diffuse'];
	roughnessMaps: string[] = ['none', 'brick-roughness'];
	matcaps: string[] = ['none', 'porcelainWhite'];
	alphaMaps: string[] = ['none', 'fibers'];
	gradientMaps: string[] = ['none', 'threeTone', 'fiveTone'];

	private changeMaps(type: string) {
		let matValue: string = 'none';
		switch (type) {
			case 'envMap':
				matValue = this.materialAttr.envMap;
				break;
			case 'map':
			case 'diffuseMap':
				matValue = this.materialAttr.diffuseMap || this.materialAttr.map;
				break;
			case 'roughnessMap':
				matValue = this.materialAttr.roughnessMap;
				break;
			case 'matcap':
				matValue = this.materialAttr.matcap;
				break;
			case 'alphaMap':
				matValue = this.materialAttr.alphaMap;
				break;
			case 'gradientMap':
				matValue = this.materialAttr.gradientMap;
				break;
		}
		if (matValue === null || matValue === undefined || matValue === 'none') {
			this.materialMaps[type] = null;
			if (this.meshObject3d !== null && this.meshObject3d.material !== null) {
				const oldMaterial: any = this.meshObject3d.material;
				switch (type) {
					case 'map':
					case 'diffuseMap':
						oldMaterial.map = null;
						break;
					default:
						oldMaterial[type] = null;
						break;
				}
			}
		} else {
			let materialMap: {
				value: string;
				cubeImage?: string[];
				type?: string;
				options?: any;
			} = null;
			switch (matValue) {
				case 'reflection':
					materialMap = {
						value: 'textures/cube/SwedishRoyalCastle/',
						cubeImage: ['', 'jpg'],
						options: 'format=RGBFormat',
					};
					break;
				case 'refraction':
					materialMap = {
						value: 'textures/cube/SwedishRoyalCastle/',
						cubeImage: ['', 'jpg'],
						options: 'mapping=CubeRefractionMapping,format=RGBFormat',
					};
					break;
				case 'brick-diffuse':
					materialMap = {
						value: 'textures/brick_diffuse.jpg',
						options: 'wrapS=RepeatWrapping,wrapT=RepeatWrapping,repeat=9x1',
					};
					break;
				case 'brick-roughness':
					materialMap = {
						value: 'textures/brick_roughness.jpg',
						options: 'wrapS=RepeatWrapping,wrapT=RepeatWrapping,repeat=9x1',
					};
					break;
				case 'porcelainWhite':
					materialMap = {
						value: 'textures/matcaps/matcap-porcelain-white.jpg',
					};
					break;
				case 'fibers':
					materialMap = {
						value: 'textures/alphaMap.jpg',
						options: 'wrapS=RepeatWrapping,wrapT=RepeatWrapping,repeat=9x1',
					};
					break;
				case 'threeTone':
					materialMap = {
						value: 'textures/gradientMaps/threeTone.jpg',
						options: 'minFilter=NearestFilter,magFilter=NearestFilter',
					};
					break;
				case 'fiveTone':
					materialMap = {
						value: 'textures/gradientMaps/fiveTone.jpg',
						options: 'minFilter=NearestFilter,magFilter=NearestFilter',
					};
					break;
				default:
					materialMap = null;
					break;
			}
			this.materialMaps[type] = materialMap;
		}
	}

	materialMaps: any = {};

	private changeMaterial() {
		if (this.lastMaterial !== this.controls.material.type) {
			this.materialMaps = {};
			switch (this.controls.material.type) {
				case 'MeshBasicMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0x049ef4,
						wireframe: false,
						vertexColors: false,
						envMap: this.envMaps[0],
						map: this.diffuseMaps[0],
						alphaMap: this.alphaMaps[0],
						combine: 'MultiplyOperation',
						reflectivity: 1,
						refractionRatio: 0.98,
					};
					break;
				case 'MeshLambertMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0x049ef4,
						emissive: 0x000000,
						wireframe: false,
						vertexColors: false,
						fog: true,
						envMaps: this.envMaps[0],
						map: this.diffuseMaps[0],
						alphaMap: this.alphaMaps[0],
						combine: 'MultiplyOperation',
						reflectivity: 1,
						refractionRatio: 0.98,
					};
					break;
				case 'MeshMatcapMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0xffffff,
						flatShading: false,
						matcap: this.matcaps[1],
						alphaMap: this.alphaMaps[0],
					};
					break;
				case 'MeshPhongMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0x049ef4,
						emissive: 0x00000,
						specular: 0x111111,
						shininess: 30,
						flatShading: false,
						wireframe: false,
						vertexColors: false,
						fog: true,
						envMaps: this.envMaps[0],
						map: this.diffuseMaps[0],
						alphaMap: this.alphaMaps[0],
						combine: 'MultiplyOperation',
						reflectivity: 1,
						refractionRatio: 0.98,
					};
					break;
				case 'MeshToonMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0x049ef4,
						map: this.diffuseMaps[0],
						gradientMap: this.gradientMaps[1],
						alphaMap: this.alphaMaps[0],
					};
					break;
				case 'MeshStandardMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0x049ef4,
						emissive: 0x000000,
						roughness: 1,
						metalness: 0,
						flatShading: false,
						wireframe: false,
						vertexColors: false,
						fog: true,
						envMap: this.envMaps[0],
						map: this.diffuseMaps[0],
						roughnessMap: this.roughnessMaps[0],
						alphaMap: this.alphaMaps[0],
					};
					break;
				case 'MeshPhysicalMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0x049ef4,
						emissive: 0x000000,
						roughness: 1,
						metalness: 0,
						reflectivity: 0.5,
						clearcoat: 0,
						clearcoatRoughness: 0,
						flatShading: false,
						wireframe: false,
						vertexColors: false,
						fog: true,
						envMap: this.envMaps[0],
						map: this.diffuseMaps[0],
						roughnessMap: this.roughnessMaps[0],
						alphaMap: this.alphaMaps[0],
					};
					break;
				case 'MeshDepthMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						wireframe: false,
						alphaMap: this.alphaMaps[0],
					};
					break;
				case 'MeshNormalMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						flatShading: false,
						wireframe: false,
					};
					break;
				case 'LineBasicMaterial':
					this.materialAttr = {
						type: this.controls.material.type,
						color: 0x2194ce,
						linewidth: 1,
						linecap: 'round',
						linejoin: 'round',
						vertexColors: false,
						fog: true,
					};
					break;
			}
			this.lastMaterial = this.controls.material.type;
			this.changeMaps('envMap');
			this.changeMaps('diffuseMap');
			this.changeMaps('roughnessMap');
			this.changeMaps('matcap');
			this.changeMaps('alphaMap');
			this.changeMaps('gradientMap');
		}
		if (this.renderer !== null && this.lastGuiMaterial !== this.lastMaterial) {
			this.lastGuiMaterial = this.lastMaterial;
			super.clearGui('attribute');
			Object.entries(this.materialAttr).forEach(([key, value]) => {
				switch (key) {
					case 'emissive':
					case 'color':
					case 'specular':
						this.addGui(
							{
								name: key,
								type: 'color',
								value: value,
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'fog':
					case 'flatShading':
					case 'wireframe':
					case 'vertexColors':
						this.addGui(
							{
								name: key,
								type: 'checkbox',
								value: value,
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'linecap':
						this.addGui(
							{
								name: key,
								type: 'select',
								select: ['butt', 'round', 'square'],
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'linejoin':
						this.addGui(
							{
								name: key,
								type: 'select',
								select: ['round', 'bevel', 'miter'],
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'combine':
						this.addGui(
							{
								name: key,
								type: 'select',
								select: ['MultiplyOperation', 'MixOperation', 'AddOperation'],
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'shininess':
						this.addGui(
							{
								name: key,
								type: 'number',
								value: value,
								min: 0,
								max: 100,
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'reflectivity':
					case 'refractionRatio':
					case 'roughness':
					case 'metalness':
					case 'clearcoat':
					case 'clearcoatRoughness':
						this.addGui(
							{
								name: key,
								type : 'number',
								value: value,
								min: 0,
								max: 1,
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'linewidth':
						this.addGui(
							{
								name: key,
								type: 'number',
								value: value,
								min: 0,
								max: 10,
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
					case 'envMap':
					case 'map':
					case 'diffuseMap':
					case 'roughnessMap':
					case 'matcap':
					case 'alphaMap':
					case 'gradientMap':
						let mapOptions: string[] = [];
						switch (key) {
							case 'envMap':
								mapOptions = this.envMaps;
								break;
							case 'map':
							case 'diffuseMap':
								mapOptions = this.diffuseMaps;
								break;
							case 'roughnessMap':
								mapOptions = this.roughnessMaps;
								break;
							case 'matcap':
								mapOptions = this.matcaps;
								break;
							case 'alphaMap':
								mapOptions = this.alphaMaps;
								break;
							case 'gradientMap':
								mapOptions = this.gradientMaps;
								break;
						}
						this.addGui(
							{
								name: key,
								type: 'select',
								select: mapOptions,
								change: () => {
									this.changeMaps(key);
								},
								control: this.materialAttr,
							},
							'attribute'
						);
						break;
				}
			});
			this.getTimeout().then(() => {
				if (
					this.light1 !== null &&
					this.light2 !== null &&
					this.light3 !== null
				) {
					switch (this.lastGuiMaterial) {
						case 'MeshToonMaterial':
							this.light1.visible = false;
							this.light2.visible = true;
							this.light3.visible = false;
							break;
						case 'MeshMatcapMaterial' :
						case 'MeshPhysicalMaterial' :
						case 'MeshStandardMaterial' :
							this.light1.visible = false;
							this.light2.visible = false;
							this.light3.visible = false;
							break;
						default:
							this.light1.visible = true;
							this.light2.visible = true;
							this.light3.visible = true;
							break;
					}
				}
			});
		}
	}

	generateVertexColors = (geometry: I3JS.BufferGeometry) => {
		const positionAttribute = geometry.attributes.position;
		const colors = [];
		const color = new THREE.Color();
		for (let i = 0, il = positionAttribute.count; i < il; i++) {
			color.setHSL((i / il) * Math.random(), 0.5, 0.5);
			colors.push(color.r, color.g, color.b);
		}
		geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
	};

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			const time = timer.delta * 0.5;
			this.meshObject3d.rotation.x += time;
			this.meshObject3d.rotation.y += time;
		}
	}
}
