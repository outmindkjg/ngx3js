import { Component } from '@angular/core';
import {
	IGuiControlParam, I3JS, NgxBaseComponent, NgxMaterialComponent,
	NgxMeshComponent, THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-nodes-playground',
	templateUrl: './webgl-materials-nodes-playground.component.html',
	styleUrls: ['./webgl-materials-nodes-playground.component.scss'],
})
export class WebglMaterialsNodesPlaygroundComponent extends NgxBaseComponent<{
	example: string;
	useMap: boolean;
	useEnvMap: boolean;
	useNormal: boolean;
	useNode: boolean;
	normalX: number;
	normalY: number;
	roughness: number;
	metalness: number;
	sataturation: number;
	side: string;
}> {
	constructor() {
		super(
			{
				example: 'mesh-standard',
				useMap: true,
				useEnvMap: true,
				useNormal: true,
				useNode: false,
				normalX: 0.5,
				normalY: 0.5,
				roughness: 0.5,
				metalness: 0.5,
				sataturation: 1,
				side: 'double',
			},
			[]
			,false , false);
	}

	ngOnInit() {
		this.changeExample();
	}

	changeExample() {
		const controlsParams: IGuiControlParam[] = [];
		controlsParams.push({
			name: 'example',
			type: 'select',
			select: {
				'basic / mesh-standard': 'mesh-standard',
				'basic / standard': 'standard',
				'basic / physical': 'physical',
				'basic / prem': 'prem',
				'basic / phong': 'phong',
				'basic / layers': 'layers',
				'basic / rim': 'rim',
				'basic / color-adjustment': 'color-adjustment',
				'basic / uv-transform': 'uv-transform',
				'basic / bump': 'bump',
				'basic / blur': 'blur',
				'basic / spherical-reflection': 'spherical-reflection',
				'adv / fresnel': 'fresnel',
				'adv / saturation': 'saturation',
				'adv / top-bottom': 'top-bottom',
				'adv / skin': 'skin',
				'adv / skin-phong': 'skin-phong',
				'adv / caustic': 'caustic',
				'adv / displace': 'displace',
				'adv / dissolve': 'dissolve',
				'adv / dissolve-fire': 'dissolve-fire',
				'adv / plush': 'plush',
				'adv / toon': 'toon',
				'adv / camera-depth': 'camera-depth',
				'adv / soft-body': 'soft-body',
				'adv / wave': 'wave',
				'adv / triangle-blur': 'triangle-blur',
				'adv / triplanar-mapping': 'triplanar-mapping',
				'adv / render-to-texture': 'rtt',
				'adv / temporal-blur': 'temporal-blur',
				'adv / conditional': 'conditional',
				'adv / expression': 'expression',
				'adv / sss': 'sss',
				'adv / translucent': 'translucent',
				'adv / bias': 'bias',
				'node / position': 'node-position',
				'node / normal': 'node-normal',
				'node / reflect': 'node-reflect',
				'misc / sub-slot': 'sub-slot',
				'misc / smoke': 'smoke',
				'misc / firefly': 'firefly',
				'misc / reserved-keywords': 'reserved-keywords',
				'misc / varying': 'varying',
				'misc / void-function': 'void-function',
				'misc / basic-material': 'basic-material',
				'misc / readonly': 'readonly',
				'misc / label': 'label',
				'misc / custom-attribute': 'custom-attribute',
			},
			change: () => {
				this.changeExample();
			},
		});
		switch (this.controls.example) {
			case 'mesh-standard':
				{
					this.materialInfo = {
						type: 'MeshStandardMaterial',
						map: { type: 'texture', value: 'textures/brick_diffuse.jpg' },
						envMap: {
							type: 'cubeTexture',
							value: 'textures/cube/Park2/',
							cubeImage: ['', 'jpg', 'pos', 'neg'],
						},
						normalMap: {
							type: 'texture',
							value: 'textures/decal/decal-normal.jpg',
						},
						normalScaleX: this.controls.normalX,
						normalScaleY: this.controls.normalY,
						roughness: this.controls.roughness,
						metalness: this.controls.metalness,
						side: this.controls.side,
					};
					controlsParams.push({
						name: 'useMap',
						title: 'map',
						type: 'checkbox',
						change: () => {
							this.changeMaterial('map');
						},
					});
					controlsParams.push({
						name: 'useNode',
						title: 'use Node',
						type: 'checkbox',
						change: () => {
							this.changeMaterial('map');
						},
					});
					controlsParams.push({
						name: 'useNormal',
						title: 'normal',
						type: 'checkbox',
						change: () => {
							this.changeMaterial('normalMap');
						},
					});
					controlsParams.push({
						name: 'useEnvMap',
						title: 'envMap',
						type: 'checkbox',
						change: () => {
							this.changeMaterial('envMap');
						},
					});
					controlsParams.push({
						name: 'roughness',
						title: 'roughness',
						type: 'number',
						min: 0,
						max: 1,
						finishChange: () => {
							this.changeMaterial('roughness');
						},
					});
					controlsParams.push({
						name: 'metalness',
						title: 'metalness',
						type: 'number',
						min: 0,
						max: 1,
						finishChange: () => {
							this.changeMaterial('metalness');
						},
					});
					controlsParams.push({
						name: 'normalX',
						title: 'normalX',
						type: 'number',
						min: -1,
						max: 1,
						finishChange: () => {
							this.changeMaterial('normalX');
						},
					});
					controlsParams.push({
						name: 'normalY',
						title: 'normalY',
						type: 'number',
						min: -1,
						max: 1,
						finishChange: () => {
							this.changeMaterial('normalY');
						},
					});
					controlsParams.push({
						name: 'sataturation',
						title: 'sataturation',
						type: 'number',
						min: 0,
						max: 2,
						finishChange: () => {
							this.changeMaterial('sataturation');
						},
					});
					controlsParams.push({
						name: 'side',
						title: 'side',
						type: 'select',
						select: ['double', 'front', 'back'],
						finishChange: () => {
							this.changeMaterial('side');
						},
					});
				}
				break;
			case 'standard':
				{
					this.materialInfo = {
						type: 'MeshStandardMaterial',
						map: {
							type: 'texture',
							value: 'textures/terrain/grasslight-big.jpg',
						},
						envMap: {
							type: 'cubeTexture',
							value: 'textures/cube/Park2/',
							cubeImage: ['', 'jpg', 'pos', 'neg'],
						},
						normalMap: {
							type: 'texture',
							value: 'textures/decal/decal-normal.jpg',
						},
						normalScaleX: this.controls.normalX,
						normalScaleY: this.controls.normalY,
						roughness: this.controls.roughness,
						metalness: this.controls.metalness,
						side: this.controls.side,
					};
					controlsParams.push({
						name: 'useMap',
						title: 'map',
						type: 'checkbox',
						change: () => {
							this.changeMaterial('map');
						},
					});
				}
				break;
		}
		super.setControlsParams(controlsParams);
	}

	meshObj: any = null;
	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.meshObj = mesh.getObject3d();
	}
	
	setMaterial(matrial: NgxMaterialComponent) {
		this.material = this.orgMaterial = matrial.getMaterial();
		this.map = this.orgMaterial.map;
		this.envMap = this.orgMaterial.envMap;
		this.normalMap = this.orgMaterial.normalMap;
		this.getTimeout(100).then(() => {
			this.changeMaterial('map');
			this.changeMaterial('envMap');
			this.changeMaterial('normalMap');
			this.changeMaterial('roughness');
			this.changeMaterial('metalness');
			this.changeMaterial('normalX');
			this.changeMaterial('normalY');
			this.changeMaterial('sataturation');
			this.changeMaterial('side');
		});
	}
	orgMaterial: any = null;
	material: any = null;
	map: I3JS.Texture = null;
	envMap: I3JS.Texture = null;
	normalMap: I3JS.Texture = null;
	sataturation: I3JS.FloatNode = null;
	changeMaterial(key: string) {
		if (this.material !== null) {
			switch (key) {
				case 'map':
					if (this.controls.useMap) {
						if (this.controls.useNode) {
							this.material = new THREE.MeshStandardNodeMaterial();
							this.sataturation = new THREE.FloatNode(1);
							this.material.map = new THREE.ColorAdjustmentNode(
								new THREE.TextureNode(this.map as any),
								this.sataturation,
								THREE.ColorAdjustmentNode.SATURATION
							);
						} else {
							this.material = new THREE.MeshStandardMaterial();
							this.sataturation = null;
							this.material.map = this.map;
						}
						this.meshObj.material = this.material;
					} else {
						this.material.map = null;
					}
					break;
				case 'normalMap':
					if (this.controls.useNormal) {
						this.material.normalMap = this.normalMap;
					} else {
						this.material.normalMap = null;
					}
					break;
				case 'envMap':
					if (this.controls.useEnvMap) {
						this.material.envMap = this.envMap;
					} else {
						this.material.envMap = null;
					}
					break;
				case 'roughness':
					this.material.roughness = this.controls.roughness;
					break;
				case 'metalness':
					this.material.metalness = this.controls.metalness;
					break;
				case 'side':
					switch (this.controls.side) {
						case 'double':
							this.material.side = THREE.DoubleSide;
							break;
						case 'back':
							this.material.side = THREE.BackSide;
							break;
						case 'front':
							this.material.side = THREE.FrontSide;
							break;
					}
					break;
				case 'normalX':
					this.material.normalScale.x = this.controls.normalX;
					break;
				case 'normalY':
					this.material.normalScale.y = this.controls.normalY;
					break;
				case 'sataturation':
					if (this.sataturation !== null) {
						this.sataturation.value = this.controls.sataturation;
					}
					break;
			}
			this.material.needsUpdate = true;
		}
	}

	materialInfo: {
		type: string;
		side?: string;
		color?: string;
		specular?: number;
		shininess?: number;
		environment?: number;
		environmentAlpha?: number;
		normal?: number;
		normalScaleX?: number;
		normalScaleY?: number;
		map?: { type: string; value: string; options?: any; cubeImage?: string[] };
		envMap?: {
			type: string;
			value: string;
			options?: any;
			cubeImage?: string[];
		};
		normalMap?: {
			type: string;
			value: string;
			options?: any;
			cubeImage?: string[];
		};
		roughness?: number;
		metalness?: number;
	};
}