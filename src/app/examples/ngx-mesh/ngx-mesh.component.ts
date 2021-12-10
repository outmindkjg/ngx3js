import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, GeometryUtils, I3JS, N3js, RendererTimer } from 'ngx3js';

@Component({
	selector: 'app-ngx-mesh',
	templateUrl: './ngx-mesh.component.html',
	styleUrls: ['./ngx-mesh.component.scss'],
})
export class NgxMeshComponent extends BaseComponent<{
	type: string;
	background: {
		type: string;
		color: string;
		image: string;
		fog: {
			type: string;
			near: number;
			far: number;
			density: number;
		};
	};
	environment: {
		enabled: boolean;
		image: string;
		roughness: number;
		metalness: number;
	};
}> {
	constructor(private route: ActivatedRoute) {
		super(
			{
				type: 'InstancedFlow',
				background: {
					type: 'image',
					color: '0xffffff',
					image: 'SwedishRoyalCastle',
					fog: {
						type: 'fog',
						near: 0.1,
						far: 70,
						density: 0.04,
					},
				},
				environment: {
					enabled: true,
					image: 'SwedishRoyalCastle',
					roughness: 0.2,
					metalness: 1,
				},
			},
			[
				{
					name: 'type',
					type: 'select',
					select: [
						'Mesh',
						'Flow',
						// 'Group',
						'HTMLMesh',
						'InstancedFlow',
						'InstancedMesh',
						// 'InteractiveGroup',
						'Lensflare',
						// 'LightningStorm',
						'Line',
						'Line2',
						'LineLoop',
						'LineSegments',
						// 'MarchingCubes',
						'MeshText',
						'Points',
						'Reflector',
						// 'ReflectorForSSRMesh',
						'ReflectorRTT',
						'Refractor',
						'Sky',
						// 'SkyboxLensflare',
						'Sprite',
						'Water',
						'Water2',
						'Wireframe',
					],
					listen: true,
				},
				{
					name: 'background',
					type: 'folder',
					control: 'background',
					children: [
						{ name: 'type', type: 'select', select: ['color', 'image', 'fog'] },
						{ name: 'color', type: 'color' },
						{
							name: 'image',
							type: 'select',
							select: [
								'pisaHDR',
								'pisa',
								'Park3Med',
								'Bridge2',
								'SwedishRoyalCastle',
							],
							change: () => {
								this.chageBackground('background');
							},
						},
						{
							name: 'fog',
							type: 'folder',
							control: 'fog',
							children: [
								{ name: 'type', type: 'select', select: ['fog', 'FogExp2'] },
								{ name: 'near', type: 'number', min: 0, max: 10, step: 0.1 },
								{ name: 'far', type: 'number', min: 0, max: 100, step: 0.1 },
								{
									name: 'density',
									type: 'number',
									min: 0,
									max: 0.2,
									step: 0.0001,
								},
							],
						},
					],
				},
				{
					name: 'environment',
					type: 'folder',
					control: 'environment',
					children: [
						{ name: 'enabled', type: 'checkbox' },
						{
							name: 'image',
							type: 'select',
							select: [
								'pisaHDR',
								'pisa',
								'Park3Med',
								'Bridge2',
								'SwedishRoyalCastle',
							],
							change: () => {
								this.chageBackground('environment');
							},
						},
						{ name: 'roughness', type: 'number', min: 0, max: 1, step: 0.1 },
						{ name: 'metalness', type: 'number', min: 0, max: 1, step: 0.1 },
					],
				},
			],
			true,
			false
		);
	}

	loadLineGeometry(geometry: I3JS.IBufferGeometry) {
		const points = GeometryUtils.gosper(8);
		const positionAttribute = N3js.getFloat32BufferAttribute(points, 3);
		geometry.setAttribute('position', positionAttribute);
		geometry.center();
		const colorAttribute = N3js.getBufferAttribute(
			new Float32Array(positionAttribute.array.length),
			3
		);
		colorAttribute.setUsage(I3JS.DynamicDrawUsage);
		geometry.setAttribute('color', colorAttribute);
	}

	curvePath: { x: number; y: number; z: number }[] = [
		{ x: 4, y: 2, z: -4 },
		{ x: 4, y: -1, z: 4 },
		{ x: 0, y: -2, z: 0 },
		{ x: -4, y: 0, z: -4 },
	];
	rayParams = {};
	stormParams = {
		size: 1000,
		minHeight: 90,
		maxHeight: 200,
		maxSlope: 0.6,
		maxLightnings: 8,
		onLightningDown: (lightning) => {},
	};

	makeMatrix = (mat: I3JS.IMatrix4, index: number) => {
		const rate = index / 100;
		const x = Math.sin(rate * 50) * rate * 5;
		const y = 3 - rate * 3;
		const z = Math.cos(rate * 50) * rate * 5;
		const translation: I3JS.IVector3 = N3js.getVector3(x, y, z);
		const rotation: I3JS.IQuaternion = N3js.getQuaternion();
		rotation.setFromAxisAngle(N3js.getVector3(0, 1, 0), rate * 50);
		const scale: I3JS.IVector3 = N3js.getVector3(rate, rate, rate);
		mat.compose(translation, rotation, scale);
	};

	makeColor = (color: I3JS.IColor, index: number) => {
		const rate = index / 100;
		const x = Math.sin(rate * Math.PI * 2) / 2 + 0.5;
		const z = Math.cos(rate * Math.PI * 2) / 2 + 0.5;
		color.setRGB(x, z, rate);
	};

	ngOnInit() {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					switch (params['type']) {
						case 'Mesh':
						case 'Flow':
						// case 'Group':
						case 'HTMLMesh':
						case 'InstancedFlow':
						case 'InstancedMesh':
						// case 'InteractiveGroup':
						case 'Lensflare':
						// case 'LightningStorm':
						case 'Line':
						case 'Line2':
						case 'LineLoop':
						case 'LineSegments':
						// case 'MarchingCubes':
						case 'MeshText':
						case 'Points':
						case 'Reflector':
						// case 'ReflectorForSSRMesh':
						case 'ReflectorRTT':
						case 'Refractor':
						case 'Sky':
						// case 'SkyboxLensflare':
						case 'Sprite':
						case 'Water':
						case 'Water2':
						case 'Wireframe':
							this.controls.type = params['type'];
							break;
						default:
							break;
					}
				}
			})
		);
		this.chageBackground('background');
		this.chageBackground('environment');

		this.lineLoopPosition = [];
		this.lineColors = [];
		this.spriteInfos = [];
		const color = N3js.getColor();
		for (let i = 0; i < 200; i++) {
			const rate = 0.5 + ((i - 100) / 100) * 3;
			const x = Math.sin(i / 5) * rate;
			const z = Math.cos(i / 5) * rate;
			const y = 2.5 - (i / 200) * 5;
			this.lineLoopPosition.push(x, y, z);
			color.setRGB(
				Math.abs((x + rate) / 2 / rate),
				Math.abs((y + rate) / 2 / rate),
				Math.abs((z + rate) / 2 / rate)
			);
			this.lineColors.push(color.r, color.g, color.b);
			this.spriteInfos.push({
				color: color.getHex(),
				scale: 0.1 + Math.abs(y / 6.5),
				x: x,
				y: y,
				z: z,
			});
		}
		const theta = Math.PI * (0.499 - 0.5);
		const phi = 2 * Math.PI * (0.205 - 0.5);
		this.sunDirection = [
			Math.cos(phi),
			Math.sin(phi) * Math.sin(theta),
			Math.sin(phi) * Math.cos(theta),
		];
	}

	sunDirection: number[] = [];

	spriteInfos: {
		color: number;
		scale: number;
		x: number;
		y: number;
		z: number;
	}[] = [];

	lineLoopPosition: number[] = [];
	lineColors: number[] = [];

	chageBackground(type: string) {
		let backgroundTexture = null;
		switch (this.controls.background.image) {
			case 'pisaHDR':
				backgroundTexture = {
					image: 'textures/cube/pisaHDR/',
					cubeImage: ['', 'hdr'],
					loaderType: 'HDRCubeTexture',
					magFilter: 'LinearFilter',
					cubeType: 'cubemap',
				};
				break;
			case 'pisa':
				backgroundTexture = {
					image: 'textures/cube/pisa/',
					cubeImage: [
						'px.png',
						'nx.png',
						'py.png',
						'ny.png',
						'pz.png',
						'nz.png',
					],
				};
				break;
			case 'Park3Med':
				backgroundTexture = {
					image: 'textures/cube/Park3Med/',
					cubeImage: [
						'px.jpg',
						'nx.jpg',
						'py.jpg',
						'ny.jpg',
						'pz.jpg',
						'nz.jpg',
					],
					mapping: 'CubeRefraction',
				};
				break;
			case 'Bridge2':
				backgroundTexture = {
					image: 'textures/cube/Bridge2/',
					cubeImage: [
						'posx.jpg',
						'negx.jpg',
						'posy.jpg',
						'negy.jpg',
						'posz.jpg',
						'negz.jpg',
					],
				};
				break;
			case 'SwedishRoyalCastle':
				backgroundTexture = {
					image: 'textures/cube/SwedishRoyalCastle/',
					cubeImage: ['', 'jpg'],
				};
				break;
		}
		if (backgroundTexture !== null) {
			switch (type) {
				case 'background':
					this.backgroundTexture = backgroundTexture;
					break;
				case 'environment':
					this.environmentTexture = backgroundTexture;
					break;
			}
		}
	}

	backgroundTexture: {
		image: string;
		cubeImage: string[];
		loaderType?: string;
		magFilter?: string;
		cubeType?: string;
		mapping?: string;
	};

	environmentTexture: {
		image: string;
		cubeImage: string[];
		loaderType?: string;
		magFilter?: string;
		cubeType?: string;
		mapping?: string;
	};

	color: I3JS.IColor = N3js.getColor();
	offset = 0;
	updateLineColors(colorAttribute) {
		const l = colorAttribute.count;
		for (let i = 0; i < l; i++) {
			const h = ((this.offset + i) % l) / l;
			this.color.setHSL(h, 1, 0.5);
			colorAttribute.setX(i, this.color.r);
			colorAttribute.setY(i, this.color.g);
			colorAttribute.setZ(i, this.color.b);
		}
		colorAttribute.needsUpdate = true;
		this.offset -= 25;
	}

	onRender(timer: RendererTimer) {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			switch (this.controls.type) {
				case 'Water':
				case 'Water2':
				case 'Flow':
				case 'InstancedFlow':
				case 'Refrac1tor':
					break;
				case 'Line':
					if (this.meshObject3d.children.length > 0) {
						const mesh = this.meshObject3d.children[0] as I3JS.ILine;
						if (mesh.geometry) {
							const geometry = mesh.geometry;
							const colorAttribute = geometry.getAttribute('color');
							this.updateLineColors(colorAttribute);
						}
					}
					break;
				default:
					const elapsedTime = timer.elapsedTime;
					this.meshObject3d.rotation.y = elapsedTime / 10;
					break;
			}
		}
	}
}
