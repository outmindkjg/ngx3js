import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BaseComponent, RendererTimer, THREE, GeometryUtils } from 'ngx3js';

@Component({
	selector: 'app-ngx-mesh',
	templateUrl: './ngx-mesh.component.html',
	styleUrls: ['./ngx-mesh.component.scss'],
})
export class NgxMeshComponent extends BaseComponent<{
	type : string;
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
				type : 'Mesh',
				background: {
					type: 'image',
					color: '0xffffff',
					image: 'SwedishRoyalCastle',
					fog: {
						type: 'fog',
						near: 0.1,
						far: 70,
						density: 0.04,
					}
				},
				environment: {
					enabled: true,
					image: 'SwedishRoyalCastle',
					roughness: 0.2,
					metalness: 1,
				}
			},
			[
				{ name: 'type', type: 'select', select: [
					"Mesh",
					"Flow",
					"Group",
					"HTMLMesh",
					"InstancedFlow",
					"InstancedMesh",
					"InteractiveGroup",
					"Lensflare",
					"LightningStorm",
					"Line",
					"Line2",
					"LineLoop",
					"LineSegments",
					"MarchingCubes",
					"MeshText",
					"Points",
					"Reflector",
					"ReflectorForSSRMesh",
					"ReflectorRTT",
					"Refractor",
					"Sky",
					"SkyboxLensflare",
					"Sprite",
					"Water",
					"Water2",
					"Wireframe",					
				], listen : true },
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
				}
			],
			true,
			false
		);
	}

	loadLineGeometry(geometry: THREE.BufferGeometry) {
		const points = GeometryUtils.gosper(8);
		const positionAttribute = new THREE.Float32BufferAttribute(points, 3);
		geometry.setAttribute('position', positionAttribute);
		geometry.center();
		const colorAttribute = new THREE.BufferAttribute(
			new Float32Array(positionAttribute.array.length),
			3
		);
		colorAttribute.setUsage(THREE.DynamicDrawUsage);
		geometry.setAttribute('color', colorAttribute);
	}

	initialPoints: { x: number; y: number; z: number }[] = [
		{ x: 5, y: 0, z: -3 },
		{ x: 5, y: 0, z: 3 },
		{ x: -5, y: 0, z: 3 },
		{ x: -5, y: 0, z: -3 },
	];

	curvePath: { x: number; y: number; z: number }[] = this.initialPoints;
	rayParams = {}
	stormParams = {
		size: 1000,
		minHeight: 90,
		maxHeight: 200,
		maxSlope: 0.6,
		maxLightnings: 8,
		onLightningDown: (lightning) => {
		},
	};

	ngOnInit() {
		this.subscribeRefer(
			'router',
			this.route.params.subscribe((params) => {
				if (params['type']) {
					switch (params['type']) {
						case 'Mesh' : 
						case 'Flow' : 
						case 'Group' : 
						case 'HTMLMesh' : 
						case 'InstancedFlow' : 
						case 'InstancedMesh' : 
						case 'InteractiveGroup' : 
						case 'Lensflare' : 
						case 'LightningStorm' : 
						case 'Line' : 
						case 'Line2' : 
						case 'LineLoop' : 
						case 'LineSegments' : 
						case 'MarchingCubes' : 
						case 'MeshText' : 
						case 'Points' : 
						case 'Reflector' : 
						case 'ReflectorForSSRMesh' : 
						case 'ReflectorRTT' : 
						case 'Refractor' : 
						case 'Sky' : 
						case 'SkyboxLensflare' : 
						case 'Sprite' : 
						case 'Water' : 
						case 'Water2' : 
						case 'Wireframe' : 		
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
		const radius = 3;
		for (let i = 0; i < 100; i++) {
			const s = (i * Math.PI * 2) / 100;
			this.lineLoopPosition.push(radius * Math.sin(s), radius * Math.cos(s), 0);
		}
		const width = 3 * 0.5;
		const height = 3 * 0.5;
		const depth = 3 * 0.5;
		this.lineLoopPosition.push(
			-width,
			-height,
			-depth,
			-width,
			height,
			-depth,
			-width,
			height,
			-depth,
			width,
			height,
			-depth,
			width,
			height,
			-depth,
			width,
			-height,
			-depth,
			width,
			-height,
			-depth,
			-width,
			-height,
			-depth,
			-width,
			-height,
			depth,
			-width,
			height,
			depth,
			-width,
			height,
			depth,
			width,
			height,
			depth,
			width,
			height,
			depth,
			width,
			-height,
			depth,
			width,
			-height,
			depth,
			-width,
			-height,
			depth,
			-width,
			-height,
			-depth,
			-width,
			-height,
			depth,
			-width,
			height,
			-depth,
			-width,
			height,
			depth,
			width,
			height,
			-depth,
			width,
			height,
			depth,
			width,
			-height,
			-depth,
			width,
			-height,
			depth
		);
		const color = new THREE.Color();
		const n = 1000,
			n2 = n / 2; // particles spread in the cube
		this.lineColors = [];
		for (let i = 0; i < this.lineLoopPosition.length; i += 3) {
			// positions
			const x = Math.random() * n - n2;
			const y = Math.random() * n - n2;
			const z = Math.random() * n - n2;
			// colors

			const vx = x / n + 0.5;
			const vy = y / n + 0.5;
			const vz = z / n + 0.5;
			color.setRGB(vx, vy, vz);
			this.lineColors.push(color.r, color.g, color.b);
		}
	}

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

	color: THREE.Color = new THREE.Color();
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
			switch(this.controls.type) {
				case 'Mesh' :
					const elapsedTime = timer.elapsedTime;
					this.meshObject3d.rotation.y = elapsedTime / 5;
					this.meshChildren.forEach(child => {
						child.rotation.x = elapsedTime / 2;
						child.rotation.y = elapsedTime / 4;
					})
					break;
				case 'Line' :
					if (this.meshObject3d.children.length > 0) {
						const mesh = this.meshObject3d.children[0] as THREE.Line;
						if (mesh.geometry) {
							const geometry = mesh.geometry;
							const colorAttribute = geometry.getAttribute('color');
							this.updateLineColors(colorAttribute);
						}
					}
					break;
			}
		}
	}
}
