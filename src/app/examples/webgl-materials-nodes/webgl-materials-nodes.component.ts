import { Component, ElementRef, ViewChild } from '@angular/core';
import {
	IGuiControlParam,
	I3JS,
	NgxBaseComponent,
	NgxMaterialComponent,
	NgxMeshComponent,
	THREE,
	NgxThreeUtil,
	NgxRendererComponent,
	IRendererInfo,
} from 'ngx3js';

@Component({
	selector: 'app-webgl-materials-nodes',
	templateUrl: './webgl-materials-nodes.component.html',
	styleUrls: ['./webgl-materials-nodes.component.scss'],
})
export class WebglMaterialsNodesComponent extends NgxBaseComponent<{
	example: string;
}> {
	constructor() {
		super(
			{
				example: 'mesh-standard',
			},
			[
				{
					type: 'select',
					name: 'example',
					select: {
						'basic / blur': 'blur',
						'basic / bump': 'bump',
						'basic / color-adjustment': 'color-adjustment',
						'basic / layers': 'layers',
						'basic / mesh-standard': 'mesh-standard',
						'basic / phong': 'phong',
						'basic / physical': 'physical',
						'basic / prem': 'prem',
						'basic / rim': 'rim',
						'basic / spherical-reflection': 'spherical-reflection',
						'basic / standard': 'standard',
						'basic / uv-transform': 'uv-transform',

						'adv / bias': 'bias',
						'adv / camera-depth': 'camera-depth',
						'adv / caustic': 'caustic',
						'adv / conditional': 'conditional',
						'adv / displace': 'displace',
						'adv / dissolve': 'dissolve',
						'adv / dissolve-fire': 'dissolve-fire',
						'adv / expression': 'expression',
						'adv / fresnel': 'fresnel',
						'adv / plush': 'plush',
						'adv / render-to-texture': 'rtt',
						'adv / saturation': 'saturation',
						'adv / skin': 'skin',
						'adv / skin-phong': 'skin-phong',
						'adv / soft-body': 'soft-body',
						'adv / sss': 'sss',
						'adv / temporal-blur': 'temporal-blur',
						'adv / toon': 'toon',
						'adv / top-bottom': 'top-bottom',
						'adv / translucent': 'translucent',
						'adv / triangle-blur': 'triangle-blur',
						'adv / triplanar-mapping': 'triplanar-mapping',
						'adv / wave': 'wave',

						'node / normal': 'node-normal',
						'node / position': 'node-position',
						'node / reflect': 'node-reflect',

						'misc / basic-material': 'basic-material',
						'misc / custom-attribute': 'custom-attribute',
						'misc / firefly': 'firefly',
						'misc / label': 'label',
						'misc / readonly': 'readonly',
						'misc / reserved-keywords': 'reserved-keywords',
						'misc / smoke': 'smoke',
						'misc / sub-slot': 'sub-slot',
						'misc / varying': 'varying',
						'misc / void-function': 'void-function',
					},
					change: () => {
						this.updateMaterial();
					},
				},
				{ type: 'folder', name: 'property', children: [] },
			],
			false,
			false
		);
	}

	frame: I3JS.NodeFrame = null;
	beforeRender: (info: IRendererInfo) => boolean = null;

	ngOnInit() {
		this.beforeRender = (info: IRendererInfo) => {
			if (this.frame !== null && this.mesh !== null && this.frame !== null) {
				const delta = info.timer.delta;
				const mesh = this.mesh;
				if (this.move) {
					var time = Date.now() * 0.005;

					mesh.position.z = Math.cos(time) * 10;
					mesh.position.y = Math.sin(time) * 10;
				} else {
					this.mesh.position.z = mesh.position.y = 0;
				}
				const renderer: any = info.renderer;
				//mesh.rotation.z += .01;

				// update material animation and/or gpu calcs (pre-renderer)

				this.frame.setRenderer(renderer).update(delta);

				if (mesh.material instanceof THREE.NodeMaterial) {
					this.frame.updateNode(mesh.material);
				}
				const scene = info.scenes[0];
				const camera = info.cameras[0];

				// render to texture for sss/translucent material only

				if (this.rtTexture) {
					scene.overrideMaterial = this.rtMaterial;

					renderer.setRenderTarget(this.rtTexture);
					renderer.clear();
					renderer.render(this.scene, camera);

					scene.overrideMaterial = null;
				}

				renderer.setRenderTarget(null);
				renderer.render(scene, camera);
				return true;
			} else {
				return false;
			}
		};

		const cubeTextureLoader: I3JS.CubeTextureLoader = NgxThreeUtil.getLoader(
			'cubeTextureLoader',
			THREE.CubeTextureLoader
		);
		const path = 'textures/cube/Park2/';
		const format = '.jpg';
		const urls = [
			NgxThreeUtil.getStoreUrl(path + 'posx' + format),
			NgxThreeUtil.getStoreUrl(path + 'negx' + format),
			NgxThreeUtil.getStoreUrl(path + 'posy' + format),
			NgxThreeUtil.getStoreUrl(path + 'negy' + format),
			NgxThreeUtil.getStoreUrl(path + 'posz' + format),
			NgxThreeUtil.getStoreUrl(path + 'negz' + format),
		];

		this.cubemap = cubeTextureLoader.load(urls, (textureCube) => {
			this.updatePREM(textureCube);
		});
		this.library[this.cubemap.uuid] = this.cubemap;
	}

	premTexture: I3JS.Texture = null;
	pmremCube: I3JS.CubeTexture = null;
	teapot: I3JS.BufferGeometry = null;
	updatePREM(textureCube: I3JS.CubeTexture) {
		this.pmremCube = this.pmremCube || textureCube;
		const pmremCube = this.pmremCube;

		if (!pmremCube || !this.renderer) return;

		const minFilter = pmremCube.minFilter;
		const magFilter = pmremCube.magFilter;
		const generateMipmaps = pmremCube.generateMipmaps;

		const pmremGenerator = new THREE.PMREMGenerator(
			this.renderer.renderer as any
		);
		this.premTexture = pmremGenerator.fromCubemap(pmremCube).texture;
		pmremGenerator.dispose();

		pmremCube.minFilter = minFilter;
		pmremCube.magFilter = magFilter;
		pmremCube.generateMipmaps = generateMipmaps;
		pmremCube.needsUpdate = true;

		this.library[this.premTexture.uuid] = this.premTexture;
	}

	move: boolean = false;
	lightGroup: any = null;
	mesh: any = null;
	rtTexture: I3JS.WebGLRenderTarget = null;
	rtMaterial: any = null;
	library: { [key: string]: any } = {};

	protected clearGui() {
		super.clearGui('property');
		this.property = {};
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.subscribeRefer(
			'renderSize',
			this.renderer.sizeSubscribe().subscribe((size) => {
				if ( this.rtTexture ) this.rtTexture.setSize( size.x, size.y );
			})
		);
		this.getTimeout(500).then(() => {
			this.updateMaterial();
		});
	}
	serialized : boolean = false;
	clickSerialize() {
		if ( this.serialized ) this.reset();
		else this.serialize();

		this.serialized = ! this.serialized;
		return false;
	}

	@ViewChild('serialize') serializeBtn : ElementRef = null;


	reset() {
		this.updateMaterial();
		// gui
		const div = this.serializeBtn.nativeElement;
		div.textContent = 'Serialize and apply';
	}

	serialize() {
		const json = this.mesh.material.toJSON();

		// replace uuid to url (facilitates the load of textures using url otherside uuid) e.g:

		const cloud = this.getTexture( 'cloud' );

		// THREE.NodeMaterialLoaderUtils.replaceUUID( json, cloud, 'cloud' );

		this.library[ 'cloud' ] = cloud;

		// --

		const jsonStr = JSON.stringify( json );

		// console.log( jsonStr );

		var loader : any = new THREE.NodeMaterialLoader( null, this.library ),
			material = loader.parse( json );

		this.mesh.material.dispose();

		this.mesh.material = material;

		// gui

		const div = this.serializeBtn.nativeElement;
		div.textContent = 'Click to reset - JSON Generate: ' + ( jsonStr.length / 1024 ).toFixed( 3 ) + 'kB';
		/*
		if ( gui ) gui.destroy();

		gui = null;
		*/
	}

	protected addGui(
		name: string,
		value: any,
		callback?: (value: any) => void,
		isColor?: boolean,
		min?: number,
		max?: number
	): any {
		return super.addGui(name, value, callback, isColor, min, max, this.property, 'property');
	}

	property: any = {};

	textures: {
		[key: string]: { texture?: I3JS.Texture; url: string; encoding: any };
	} = {
		brick: { url: 'textures/brick_diffuse.jpg', encoding: THREE.sRGBEncoding },
		grass: {
			url: 'textures/terrain/grasslight-big.jpg',
			encoding: THREE.sRGBEncoding,
		},
		grassNormal: {
			url: 'textures/terrain/grasslight-big-nm.jpg',
			encoding: THREE.LinearEncoding,
		},
		decalDiffuse: {
			url: 'textures/decal/decal-diffuse.png',
			encoding: THREE.sRGBEncoding,
		},
		decalNormal: {
			url: 'textures/decal/decal-normal.jpg',
			encoding: THREE.LinearEncoding,
		},
		cloud: { url: 'textures/lava/cloud.png', encoding: THREE.sRGBEncoding },
		spherical: { url: 'textures/envmap.png', encoding: THREE.sRGBEncoding },
	};

	cubemap: I3JS.CubeTexture = null;
	getTexture(name) {
		let texture = this.textures[name].texture;
		if (!texture) {
			texture = this.textures[name].texture = new THREE.TextureLoader().load(
				NgxThreeUtil.getStoreUrl(this.textures[name].url)
			);
			texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
			texture.encoding = this.textures[name].encoding;
			this.library[texture.uuid] = texture;
		}

		return texture;
	}

	setLightGroup(mesh: NgxMeshComponent) {
		this.lightGroup = mesh.getObject3d();
	}

	updateMaterial() {
		if (this.lightGroup == null) {
			return;
		}
		this.move = false;
		this.lightGroup.visible = true;
		const mesh = this.mesh;
		if (mesh.material) mesh.material.dispose();
		if (this.rtTexture) {
			delete this.library[this.rtTexture.texture.uuid];

			this.rtTexture.dispose();
			this.rtTexture = null;
		}

		if (this.rtMaterial) {
			this.rtMaterial.dispose();
			this.rtMaterial = null;
		}

		let name = this.controls.example,
			defaultSide = THREE.DoubleSide,
			mtl;

		this.clearGui();

		switch (name) {
			case 'phong':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					//mtl.color = // albedo (vec3)
					//mtl.alpha = // opacity (float)
					//mtl.specular = // specular color (vec3)
					//mtl.shininess = // shininess (float)
					//mtl.normal = // normal (vec3)
					//mtl.emissive = // emissive color (vec3)
					//mtl.ambient = // ambient color (vec3)
					//mtl.shadow = // shadowmap (vec3)
					//mtl.light = // custom-light (vec3)
					//mtl.ao = // ambient occlusion (float)
					//mtl.light = // input/output light (vec3)
					//mtl.environment = // reflection/refraction (vec3)
					//mtl.environmentAlpha = // environment alpha (float)
					//mtl.position = // vertex local position (vec3)

					let mask = new THREE.SwitchNode(
						new THREE.TextureNode(this.getTexture('decalDiffuse')),
						'w'
					);

					mtl.color = new THREE.TextureNode(this.getTexture('grass'));
					mtl.specular = new THREE.FloatNode(0.5);
					mtl.shininess = new THREE.FloatNode(15);
					mtl.environment = new THREE.CubeTextureNode(this.cubemap);
					mtl.environmentAlpha = mask;
					mtl.normal = new THREE.NormalMapNode(
						new THREE.TextureNode(this.getTexture('grassNormal'))
					);
					mtl.normal.scale = new THREE.MathNode(mask, THREE.MathNode.INVERT);
				}
				break;

			case 'standard':
				{
					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					//mtl.color = // albedo (vec3)
					//mtl.alpha = // opacity (float)
					//mtl.roughness = // roughness (float)
					//mtl.metalness = // metalness (float)
					//mtl.normal = // normal (vec3)
					//mtl.emissive = // emissive color (vec3)
					//mtl.ambient = // ambient color (vec3)
					//mtl.shadow = // shadowmap (vec3)
					//mtl.light = // custom-light (vec3)
					//mtl.ao = // ambient occlusion (float)
					//mtl.environment = // reflection/refraction (vec3)
					//mtl.position = // vertex local position (vec3)

					let mask = new THREE.SwitchNode(
						new THREE.TextureNode(this.getTexture('decalDiffuse')),
						'w'
					);

					let normalScale = new THREE.FloatNode(0.3);

					let roughnessA = new THREE.FloatNode(0.5);
					let metalnessA = new THREE.FloatNode(0.5);

					let roughnessB = new THREE.FloatNode(0);
					let metalnessB = new THREE.FloatNode(1);

					let roughness = new THREE.MathNode(
						roughnessA,
						roughnessB,
						mask,
						THREE.MathNode.MIX
					);

					let metalness = new THREE.MathNode(
						metalnessA,
						metalnessB,
						mask,
						THREE.MathNode.MIX
					);

					let normalMask = new THREE.OperatorNode(
						new THREE.MathNode(mask, THREE.MathNode.INVERT),
						normalScale,
						THREE.OperatorNode.MUL
					);

					mtl.color = new THREE.ColorNode(0xeeeeee);
					mtl.roughness = roughness;
					mtl.metalness = metalness;
					mtl.environment = new THREE.CubeTextureNode(this.cubemap);
					mtl.normal = new THREE.NormalMapNode(
						new THREE.TextureNode(this.getTexture('grassNormal'))
					);
					mtl.normal.scale = normalMask;

					// GUI

					this.addGui(
						'color',
						mtl.color.value.getHex(),
						function (val) {
							mtl.color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'roughnessA',
						roughnessA.value,
						function (val) {
							roughnessA.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalnessA',
						metalnessA.value,
						function (val) {
							metalnessA.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'roughnessB',
						roughnessB.value,
						function (val) {
							roughnessB.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalnessB',
						metalnessB.value,
						function (val) {
							metalnessB.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'normalScale',
						normalScale.value,
						function (val) {
							normalScale.value = val;
						},
						false,
						0,
						1
					);
				}
				break;

			case 'prem':
				{
					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					//mtl.color = // albedo (vec3)
					//mtl.alpha = // opacity (float)
					//mtl.roughness = // roughness (float)
					//mtl.metalness = // metalness (float)
					//mtl.normal = // normal (vec3)
					//mtl.emissive = // emissive color (vec3)
					//mtl.ambient = // ambient color (vec3)
					//mtl.shadow = // shadowmap (vec3)
					//mtl.light = // custom-light (vec3)
					//mtl.ao = // ambient occlusion (float)
					//mtl.environment = // reflection/refraction (vec3)
					//mtl.position = // vertex local position (vec3)

					let mask = new THREE.SwitchNode(
						new THREE.TextureNode(this.getTexture('decalDiffuse')),
						'w'
					);

					let intensity = new THREE.FloatNode(1);

					let normalScale = new THREE.FloatNode(0.3);

					let roughnessA = new THREE.FloatNode(0.5);
					let metalnessA = new THREE.FloatNode(0.5);

					let roughnessB = new THREE.FloatNode(0);
					let metalnessB = new THREE.FloatNode(1);

					let roughness = new THREE.MathNode(
						roughnessA,
						roughnessB,
						mask,
						THREE.MathNode.MIX
					);

					let metalness = new THREE.MathNode(
						metalnessA,
						metalnessB,
						mask,
						THREE.MathNode.MIX
					);

					let normalMask = new THREE.OperatorNode(
						new THREE.MathNode(mask, THREE.MathNode.INVERT),
						normalScale,
						THREE.OperatorNode.MUL
					);

					mtl.color = new THREE.ColorNode(0xeeeeee);
					mtl.roughness = roughness;
					mtl.metalness = metalness;
					mtl.normal = new THREE.NormalMapNode(
						new THREE.TextureNode(this.getTexture('grassNormal'))
					);
					mtl.normal.scale = normalMask;

					let envNode = new THREE.TextureCubeNode(
						new THREE.TextureNode(this.premTexture)
					);
					mtl.environment = new THREE.OperatorNode(
						envNode,
						intensity,
						THREE.OperatorNode.MUL
					);

					// GUI

					this.addGui(
						'color',
						mtl.color.value.getHex(),
						function (val) {
							mtl.color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'intensity',
						intensity.value,
						function (val) {
							intensity.value = val;
						},
						false,
						0,
						2
					);

					this.addGui(
						'roughnessA',
						roughnessA.value,
						function (val) {
							roughnessA.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalnessA',
						metalnessA.value,
						function (val) {
							metalnessA.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'roughnessB',
						roughnessB.value,
						function (val) {
							roughnessB.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalnessB',
						metalnessB.value,
						function (val) {
							metalnessB.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'normalScale',
						normalScale.value,
						function (val) {
							normalScale.value = val;
						},
						false,
						0,
						1
					);
				}
				break;

			case 'sub-slot':
				{
					// disable dynamic light

					this.lightGroup.visible = false;

					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					// NODES

					let normalScale = new THREE.FloatNode(0.3);

					let radiance = new THREE.FloatNode(1);
					let irradiance = new THREE.FloatNode(1);

					let roughness = new THREE.FloatNode(0.5);
					let metalness = new THREE.FloatNode(0.5);

					mtl.color = new THREE.ColorNode(0xeeeeee);
					mtl.roughness = roughness;
					mtl.metalness = metalness;
					mtl.normal = new THREE.NormalMapNode(
						new THREE.TextureNode(this.getTexture('grassNormal'))
					);
					mtl.normal.scale = normalScale;

					let envNode = new THREE.TextureCubeNode(
						new THREE.TextureNode(this.premTexture)
					);

					let subSlotNode = new THREE.SubSlotNode();
					subSlotNode.slots['radiance'] = new THREE.OperatorNode(
						radiance,
						envNode,
						THREE.OperatorNode.MUL
					);
					subSlotNode.slots['irradiance'] = new THREE.OperatorNode(
						irradiance,
						envNode,
						THREE.OperatorNode.MUL
					);

					mtl.environment = subSlotNode;

					// GUI

					this.addGui(
						'radiance',
						radiance.value,
						function (val) {
							radiance.value = val;
						},
						false,
						0,
						2
					);

					this.addGui(
						'irradiance',
						irradiance.value,
						function (val) {
							irradiance.value = val;
						},
						false,
						0,
						2
					);

					this.addGui(
						'roughness',
						roughness.value,
						function (val) {
							roughness.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalness',
						metalness.value,
						function (val) {
							metalness.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'normalScale',
						normalScale.value,
						function (val) {
							normalScale.value = val;
						},
						false,
						0,
						1
					);
				}

				break;

			case 'mesh-standard':
				{
					// MATERIAL

					let sataturation = new THREE.FloatNode(1),
						useNodeMaterial = true,
						useMap = true,
						useNormals = true;

					const updateMaterial = () => {
						let oldMaterial = mtl;

						if (oldMaterial) oldMaterial.dispose();

						mtl = useNodeMaterial
							? new THREE.MeshStandardNodeMaterial()
							: new THREE.MeshStandardMaterial();

						// default syntax ( backward-compatible )

						mtl.map = useMap ? this.getTexture('brick') : undefined;

						mtl.normalMap = useNormals
							? this.getTexture('decalNormal')
							: undefined;
						mtl.normalScale = oldMaterial
							? oldMaterial.normalScale
							: new THREE.Vector2(0.5, 0.5);

						mtl.envMap = this.cubemap;

						mtl.roughness = oldMaterial ? oldMaterial.roughness : 0.5;
						mtl.metalness = oldMaterial ? oldMaterial.metalness : 0.5;

						// extended syntax ( only for NodeMaterial )

						if (useNodeMaterial && useMap) {
							mtl.map = new THREE.ColorAdjustmentNode(
								new THREE.TextureNode(mtl.map),
								sataturation,
								THREE.ColorAdjustmentNode.SATURATION
							);
						}

						// apply material

						mtl.side = defaultSide;
						mtl.needsUpdate = true;

						mesh.material = mtl;
					};

					updateMaterial();

					// GUI

					this.addGui('use node material', useNodeMaterial, function (val) {
						useNodeMaterial = val;

						updateMaterial();
					});

					this.addGui(
						'roughness',
						mtl.roughness,
						function (val) {
							mtl.roughness = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalness',
						mtl.roughness,
						function (val) {
							mtl.metalness = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'normalX',
						mtl.normalScale.x,
						function (val) {
							mtl.normalScale.x = val;
						},
						false,
						-1,
						1
					);

					this.addGui(
						'normalY',
						mtl.normalScale.y,
						function (val) {
							mtl.normalScale.y = val;
						},
						false,
						-1,
						1
					);

					this.addGui(
						'sat. (node)',
						sataturation.value,
						function (val) {
							sataturation.value = val;
						},
						false,
						0,
						2
					);

					this.addGui(
						'colors',
						useMap,
						function (val) {
							useMap = val;

							updateMaterial();
						},
						false
					);

					this.addGui(
						'normals',
						useNormals,
						function (val) {
							useNormals = val;

							updateMaterial();
						},
						false
					);

					this.addGui(
						'side',
						{
							DoubleSided: THREE.DoubleSide,
							FrontSided: THREE.FrontSide,
							BackSided: THREE.BackSide,
						},
						function (val) {
							defaultSide = Number(val);

							updateMaterial();
						}
					);
				}
				break;

			case 'physical':
				{
					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					//mtl.color = // albedo (vec3)
					//mtl.alpha = // opacity (float)
					//mtl.roughness = // roughness (float)
					//mtl.metalness = // metalness (float)
					//mtl.reflectivity = // reflectivity (float)
					//mtl.clearcoat = // clearcoat (float)
					//mtl.clearcoatRoughness = // clearcoatRoughness (float)
					//mtl.clearcoatNormal = // clearcoatNormal (vec3)
					//mtl.normal = // normal (vec3)
					//mtl.emissive = // emissive color (vec3)
					//mtl.ambient = // ambient color (vec3)
					//mtl.shadow = // shadowmap (vec3)
					//mtl.light = // custom-light (vec3)
					//mtl.ao = // ambient occlusion (float)
					//mtl.environment = // reflection/refraction (vec3)
					//mtl.position = // vertex local position (vec3)

					let mask = new THREE.SwitchNode(
						new THREE.TextureNode(this.getTexture('decalDiffuse')),
						'w'
					);

					let normalScale = new THREE.FloatNode(0.3);
					let clearcoatNormalScale = new THREE.FloatNode(0.1);

					let roughnessA = new THREE.FloatNode(0.5);
					let metalnessA = new THREE.FloatNode(0.5);

					let roughnessB = new THREE.FloatNode(0);
					let metalnessB = new THREE.FloatNode(1);

					let reflectivity = new THREE.FloatNode(0);
					let clearcoat = new THREE.FloatNode(1);
					let clearcoatRoughness = new THREE.FloatNode(1);

					let roughness = new THREE.MathNode(
						roughnessA,
						roughnessB,
						mask,
						THREE.MathNode.MIX
					);

					let metalness = new THREE.MathNode(
						metalnessA,
						metalnessB,
						mask,
						THREE.MathNode.MIX
					);

					let normalMask = new THREE.OperatorNode(
						new THREE.MathNode(mask, THREE.MathNode.INVERT),
						normalScale,
						THREE.OperatorNode.MUL
					);

					let clearcoatNormalMask = new THREE.OperatorNode(
						mask,
						clearcoatNormalScale,
						THREE.OperatorNode.MUL
					);

					mtl.color = new THREE.ColorNode(0xeeeeee);
					mtl.roughness = roughness;
					mtl.metalness = metalness;
					mtl.reflectivity = reflectivity;
					mtl.clearcoat = clearcoat;
					mtl.clearcoatRoughness = clearcoatRoughness;
					mtl.clearcoatNormal = new THREE.NormalMapNode(
						new THREE.TextureNode(this.getTexture('grassNormal'))
					);
					mtl.clearcoatNormal.scale = clearcoatNormalMask;
					mtl.environment = new THREE.CubeTextureNode(this.cubemap);
					mtl.normal = new THREE.NormalMapNode(
						new THREE.TextureNode(this.getTexture('grassNormal'))
					);
					mtl.normal.scale = normalMask;

					// GUI

					this.addGui(
						'color',
						mtl.color.value.getHex(),
						function (val) {
							mtl.color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'reflectivity',
						reflectivity.value,
						function (val) {
							reflectivity.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'clearcoat',
						clearcoat.value,
						function (val) {
							clearcoat.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'clearcoatRoughness',
						clearcoatRoughness.value,
						function (val) {
							clearcoatRoughness.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'clearcoatNormalScale',
						clearcoatNormalScale.value,
						function (val) {
							clearcoatNormalScale.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'roughnessA',
						roughnessA.value,
						function (val) {
							roughnessA.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalnessA',
						metalnessA.value,
						function (val) {
							metalnessA.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'roughnessB',
						roughnessB.value,
						function (val) {
							roughnessB.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'metalnessB',
						metalnessB.value,
						function (val) {
							metalnessB.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'normalScale',
						normalScale.value,
						function (val) {
							normalScale.value = val;
						},
						false,
						0,
						1
					);
				}
				break;

			case 'wave':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let time = new THREE.TimerNode();
					let speed = new THREE.FloatNode(5);
					let scale = new THREE.FloatNode(1);
					let worldScale = new THREE.FloatNode(0.4);
					let colorA = new THREE.ColorNode(0xffffff);
					let colorB = new THREE.ColorNode(0x0054df);

					// used for serialization only
					time.name = 'time';
					speed.name = 'speed';

					let timeScale = new THREE.OperatorNode(
						time,
						speed,
						THREE.OperatorNode.MUL
					);

					let worldScl = new THREE.OperatorNode(
						new THREE.PositionNode(),
						worldScale,
						THREE.OperatorNode.MUL
					);

					let posContinuous = new THREE.OperatorNode(
						worldScl,
						timeScale,
						THREE.OperatorNode.ADD
					);

					let wave: any = new THREE.MathNode(posContinuous, THREE.MathNode.SIN);
					wave = new THREE.SwitchNode(wave, 'x');

					let waveScale = new THREE.OperatorNode(
						wave,
						scale,
						THREE.OperatorNode.MUL
					);

					let displaceY = new THREE.JoinNode(
						new THREE.FloatNode(),
						waveScale,
						new THREE.FloatNode()
					);

					let displace = new THREE.OperatorNode(
						new THREE.NormalNode(),
						displaceY,
						THREE.OperatorNode.MUL
					);

					let blend = new THREE.OperatorNode(
						new THREE.PositionNode(),
						displaceY,
						THREE.OperatorNode.ADD
					);

					let color = new THREE.MathNode(
						colorB,
						colorA,
						wave,
						THREE.MathNode.MIX
					);

					mtl.color = color;
					mtl.position = blend;

					// GUI

					this.addGui(
						'speed',
						speed.value,
						function (val) {
							speed.value = val;
						},
						false,
						0,
						10
					);

					this.addGui(
						'scale',
						scale.value,
						function (val) {
							scale.value = val;
						},
						false,
						0,
						3
					);

					this.addGui(
						'worldScale',
						worldScale.value,
						function (val) {
							worldScale.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'colorA',
						colorA.value.getHex(),
						function (val) {
							colorA.value.setHex(val);
						},
						true
					);

					this.addGui(
						'colorB',
						colorB.value.getHex(),
						function (val) {
							colorB.value.setHex(val);
						},
						true
					);

					this.addGui('useNormals', false, function (val) {
						blend.b = val ? displace : displaceY;

						mtl.needsUpdate = true;
					});
				}
				break;

			case 'rim':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					defaultSide = THREE.FrontSide;

					let intensity = 1.3;
					let power = new THREE.FloatNode(3);
					let color = new THREE.ColorNode(0xffffff);

					let viewZ = new THREE.MathNode(
						new THREE.NormalNode(),
						new THREE.Vector3Node(0, 0, -intensity),
						THREE.MathNode.DOT
					);

					let rim = new THREE.OperatorNode(
						viewZ,
						new THREE.FloatNode(intensity),
						THREE.OperatorNode.ADD
					);

					let rimPower = new THREE.MathNode(rim, power, THREE.MathNode.POW);

					let rimColor = new THREE.OperatorNode(
						rimPower,
						color,
						THREE.OperatorNode.MUL
					);

					mtl.color = new THREE.ColorNode(0x111111);
					mtl.emissive = rimColor;

					// GUI

					this.addGui(
						'color',
						color.value.getHex(),
						function (val) {
							color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'intensity',
						intensity,
						function (val) {
							intensity = val;

							(viewZ.b as any).z = -intensity;
							rim.b.value = intensity;
						},
						false,
						0,
						3
					);

					this.addGui(
						'power',
						power.value,
						function (val) {
							power.value = val;
						},
						false,
						0,
						6
					);

					this.addGui('xray', false, function (val) {
						if (val) {
							mtl.emissive = color;
							mtl.alpha = rimPower;
							mtl.blending = THREE.AdditiveBlending;
							mtl.depthWrite = false;
						} else {
							mtl.emissive = rimColor;
							mtl.alpha = null;
							mtl.blending = THREE.NormalBlending;
							mtl.depthWrite = true;
						}

						mtl.needsUpdate = true;
					});
				}
				break;

			case 'color-adjustment':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let texture = new THREE.TextureNode(this.getTexture('brick'));

					let hue = new THREE.FloatNode();
					let sataturation = new THREE.FloatNode(1);
					let vibrance = new THREE.FloatNode();
					let brightness = new THREE.FloatNode(0);
					let contrast = new THREE.FloatNode(1);

					let hueNode = new THREE.ColorAdjustmentNode(
						texture,
						hue,
						THREE.ColorAdjustmentNode.HUE
					);
					let satNode = new THREE.ColorAdjustmentNode(
						hueNode,
						sataturation,
						THREE.ColorAdjustmentNode.SATURATION
					);
					let vibranceNode = new THREE.ColorAdjustmentNode(
						satNode,
						vibrance,
						THREE.ColorAdjustmentNode.VIBRANCE
					);
					let brightnessNode = new THREE.ColorAdjustmentNode(
						vibranceNode,
						brightness,
						THREE.ColorAdjustmentNode.BRIGHTNESS
					);
					let contrastNode = new THREE.ColorAdjustmentNode(
						brightnessNode,
						contrast,
						THREE.ColorAdjustmentNode.CONTRAST
					);

					mtl.color = contrastNode;

					// GUI

					this.addGui(
						'hue',
						hue.value,
						function (val) {
							hue.value = val;
						},
						false,
						0,
						Math.PI * 2
					);

					this.addGui(
						'saturation',
						sataturation.value,
						function (val) {
							sataturation.value = val;
						},
						false,
						0,
						2
					);

					this.addGui(
						'vibrance',
						vibrance.value,
						function (val) {
							vibrance.value = val;
						},
						false,
						-1,
						1
					);

					this.addGui(
						'brightness',
						brightness.value,
						function (val) {
							brightness.value = val;
						},
						false,
						0,
						0.5
					);

					this.addGui(
						'contrast',
						contrast.value,
						function (val) {
							contrast.value = val;
						},
						false,
						0,
						2
					);
				}
				break;

			case 'uv-transform':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let translate = new THREE.Vector2();
					let rotate = 0;
					let scale = new THREE.Vector2(1, 1);

					let texture = new THREE.TextureNode(this.getTexture('brick'));
					texture.uv = new THREE.UVTransformNode();
					//texture.uv.uv = new THREE.UVNode( 1 ); // uv2 for example

					mtl.color = texture;

					// GUI

					function updateUVTransform() {
						(texture.uv as any).setUvTransform(
							translate.x,
							translate.y,
							scale.x,
							scale.y,
							THREE.MathUtils.degToRad(rotate)
						);
					}

					this.addGui(
						'translateX',
						translate.x,
						function (val) {
							translate.x = val;

							updateUVTransform();
						},
						false,
						0,
						10
					);

					this.addGui(
						'translateY',
						translate.y,
						function (val) {
							translate.y = val;

							updateUVTransform();
						},
						false,
						0,
						10
					);

					this.addGui(
						'scaleX',
						scale.x,
						function (val) {
							scale.x = val;

							updateUVTransform();
						},
						false,
						0.1,
						5
					);

					this.addGui(
						'scaleY',
						scale.y,
						function (val) {
							scale.y = val;

							updateUVTransform();
						},
						false,
						0.1,
						5
					);

					this.addGui(
						'rotate',
						rotate,
						function (val) {
							rotate = val;

							updateUVTransform();
						},
						false,
						0,
						360
					);
				}
				break;

			case 'bump':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let diffuse = new THREE.TextureNode(this.getTexture('brick'));

					let bumpMap = new THREE.BumpMapNode(
						new THREE.TextureNode(this.getTexture('brick'))
					);
					bumpMap.scale = new THREE.FloatNode(0.5);

					mtl.color = diffuse;
					mtl.normal = bumpMap;

					// convert BumpMap to NormalMap
					//bumpMap.toNormalMap = true;
					//mtl.normal = new THREE.NormalMapNode( bumpMap );

					// GUI

					this.addGui(
						'scale',
						bumpMap.scale.value,
						function (val) {
							bumpMap.scale.value = val;
						},
						false,
						-2,
						2
					);

					this.addGui('color', true, function (val) {
						mtl.color = val ? diffuse : new THREE.ColorNode(0xeeeeee);

						mtl.needsUpdate = true;
					});
				}
				break;

			case 'blur':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let diffuse = new THREE.TextureNode(this.getTexture('brick'));

					let blur = new THREE.BlurNode(
						new THREE.TextureNode(this.getTexture('brick'))
					);

					mtl.color = blur;

					// GUI
					const radius: any = blur.radius;

					this.addGui(
						'radiusX',
						radius.x,
						function (val) {
							radius.x = val;
						},
						false,
						0,
						15
					);

					this.addGui(
						'radiusY',
						radius.y,
						function (val) {
							radius.y = val;
						},
						false,
						0,
						15
					);
				}
				break;

			case 'spherical-reflection':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					mtl.environment = new THREE.TextureNode(
						this.getTexture('spherical'),
						new THREE.ReflectNode(THREE.ReflectNode.SPHERE)
					);
				}
				break;

			case 'fresnel':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let reflectance = new THREE.FloatNode(1.3);
					let power = new THREE.FloatNode(1);
					let color = new THREE.CubeTextureNode(this.cubemap);

					let viewZ = new THREE.MathNode(
						new THREE.NormalNode(),
						new THREE.Vector3Node(0, 0, -1),
						THREE.MathNode.DOT
					);

					let theta = new THREE.OperatorNode(
						viewZ,
						new THREE.FloatNode(1),
						THREE.OperatorNode.ADD
					);

					let thetaPower = new THREE.MathNode(theta, power, THREE.MathNode.POW);

					let fresnel = new THREE.OperatorNode(
						reflectance,
						thetaPower,
						THREE.OperatorNode.MUL
					);

					mtl.color = new THREE.ColorNode(0x3399ff);
					mtl.environment = color;
					mtl.environmentAlpha = new THREE.MathNode(
						fresnel,
						THREE.MathNode.SATURATE
					);

					// GUI

					this.addGui(
						'reflectance',
						reflectance.value,
						function (val) {
							reflectance.value = val;
						},
						false,
						0,
						3
					);

					this.addGui(
						'power',
						power.value,
						function (val) {
							power.value = val;
						},
						false,
						0,
						5
					);
				}
				break;

			case 'layers':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let tex1 = new THREE.TextureNode(this.getTexture('grass'));
					let tex2 = new THREE.TextureNode(this.getTexture('brick'));

					let offset = new THREE.FloatNode(0);
					let scale = new THREE.FloatNode(1);
					let uv = new THREE.UVNode();

					let uvOffset = new THREE.OperatorNode(
						offset,
						uv,
						THREE.OperatorNode.ADD
					);

					let uvScale = new THREE.OperatorNode(
						uvOffset,
						scale,
						THREE.OperatorNode.MUL
					);

					let mask = new THREE.TextureNode(
						this.getTexture('decalDiffuse'),
						uvScale
					);
					let maskAlphaChannel = new THREE.SwitchNode(mask, 'w');

					let blend = new THREE.MathNode(
						tex1,
						tex2,
						maskAlphaChannel,
						THREE.MathNode.MIX
					);

					mtl.color = blend;

					// GUI

					this.addGui(
						'offset',
						offset.value,
						function (val) {
							offset.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'scale',
						scale.value,
						function (val) {
							scale.value = val;
						},
						false,
						0,
						10
					);
				}
				break;

			case 'saturation':
				{
					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					let tex = new THREE.TextureNode(this.getTexture('brick'));
					let sat = new THREE.FloatNode(0);

					let satrgb = new THREE.FunctionNode(
						[
							'vec3 satrgb( vec3 rgb, float adjustment ) {',
							// include luminance function from LuminanceNode
							'	vec3 intensity = vec3( luminance( rgb ) );',
							'	return mix( intensity, rgb, adjustment );',
							'}',
						].join('\n'),
						[THREE.LuminanceNode.Nodes.luminance]
					);

					let saturation = new THREE.FunctionCallNode(satrgb);
					saturation.inputs.rgb = tex;
					saturation.inputs.adjustment = sat;

					// or try

					//saturation.inputs[0] = tex;
					//saturation.inputs[1] = sat;

					mtl.color = saturation;

					// GUI

					this.addGui(
						'saturation',
						sat.value,
						function (val) {
							sat.value = val;
						},
						false,
						0,
						2
					);
				}
				break;

			case 'top-bottom':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let top = new THREE.TextureNode(this.getTexture('grass'));
					let bottom = new THREE.TextureNode(this.getTexture('brick'));

					let normal = new THREE.NormalNode(THREE.NormalNode.WORLD);
					let normalY = new THREE.SwitchNode(normal, 'y');

					let hard = new THREE.FloatNode(9);
					let offset = new THREE.FloatNode(-2.5);

					let hardClamp = new THREE.OperatorNode(
						normalY,
						hard,
						THREE.OperatorNode.MUL
					);

					let offsetClamp = new THREE.OperatorNode(
						hardClamp,
						offset,
						THREE.OperatorNode.ADD
					);

					let clamp0at1 = new THREE.MathNode(
						offsetClamp,
						THREE.MathNode.SATURATE
					);

					let blend = new THREE.MathNode(
						top,
						bottom,
						clamp0at1,
						THREE.MathNode.MIX
					);

					mtl.color = blend;

					// GUI

					this.addGui(
						'hard',
						hard.value,
						function (val) {
							hard.value = val;
						},
						false,
						0,
						20
					);

					this.addGui(
						'offset',
						offset.value,
						function (val) {
							offset.value = val;
						},
						false,
						-10,
						10
					);
				}
				break;

			case 'displace':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let time = new THREE.TimerNode();
					let scale = new THREE.FloatNode(2);
					let speed = new THREE.FloatNode(0.2);
					let colorA = new THREE.ColorNode(0xffffff);
					let colorB = new THREE.ColorNode(0x0054df);

					// used for serialization only
					time.name = 'time';
					speed.name = 'speed';

					let uv = new THREE.UVNode();

					let timeScl = new THREE.OperatorNode(
						time,
						speed,
						THREE.OperatorNode.MUL
					);

					let displaceOffset = new THREE.OperatorNode(
						timeScl,
						uv,
						THREE.OperatorNode.ADD
					);

					let tex = new THREE.TextureNode(
						this.getTexture('cloud'),
						displaceOffset
					);
					let texArea = new THREE.SwitchNode(tex, 'w');

					let displace = new THREE.OperatorNode(
						new THREE.NormalNode(),
						texArea,
						THREE.OperatorNode.MUL
					);

					let displaceScale = new THREE.OperatorNode(
						displace,
						scale,
						THREE.OperatorNode.MUL
					);

					let blend = new THREE.OperatorNode(
						new THREE.PositionNode(),
						displaceScale,
						THREE.OperatorNode.ADD
					);

					let color = new THREE.MathNode(
						colorB,
						colorA,
						texArea,
						THREE.MathNode.MIX
					);

					mtl.color = mtl.specular = new THREE.ColorNode(0);
					mtl.emissive = color;
					mtl.position = blend;

					// GUI

					this.addGui(
						'speed',
						speed.value,
						function (val) {
							speed.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'scale',
						scale.value,
						function (val) {
							scale.value = val;
						},
						false,
						0,
						10
					);

					this.addGui(
						'colorA',
						colorA.value.getHex(),
						function (val) {
							colorA.value.setHex(val);
						},
						true
					);

					this.addGui(
						'colorB',
						colorB.value.getHex(),
						function (val) {
							colorB.value.setHex(val);
						},
						true
					);
				}
				break;

			case 'dissolve':
				{
					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					let color = new THREE.ColorNode(0xeeeeee);
					let borderColor = new THREE.ColorNode(0x0054df);
					let threshold = new THREE.FloatNode(0.1);
					let borderSize = new THREE.FloatNode(0.2);

					let tex = new THREE.TextureNode(this.getTexture('cloud'));
					let texArea = new THREE.SwitchNode(tex, 'w');

					let thresholdBorder = new THREE.MathNode(
						new THREE.OperatorNode(
							threshold,
							borderSize,
							THREE.OperatorNode.ADD
						),
						threshold,
						texArea,
						THREE.MathNode.SMOOTHSTEP
					);

					let thresholdEmissive = new THREE.OperatorNode(
						borderColor,
						thresholdBorder,
						THREE.OperatorNode.MUL
					);

					// APPLY

					mtl.color = color;
					mtl.emissive = thresholdEmissive;
					mtl.mask = new THREE.CondNode(
						texArea, // a: value
						threshold, // b: value
						THREE.CondNode.GREATER // condition
					);

					// GUI

					this.addGui(
						'threshold',
						threshold.value,
						function (val) {
							threshold.value = val;
						},
						false,
						-0.3,
						1.3
					);

					this.addGui(
						'borderSize',
						borderSize.value,
						function (val) {
							borderSize.value = val;
						},
						false,
						0,
						0.5
					);

					this.addGui(
						'color',
						color.value.getHex(),
						function (val) {
							color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'borderColor',
						borderColor.value.getHex(),
						function (val) {
							borderColor.value.setHex(val);
						},
						true
					);
				}
				break;

			case 'dissolve-fire':
				{
					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					let color = new THREE.ColorNode(0xeeeeee);
					let fireStartColor = new THREE.ColorNode(0xf7ca78);
					let fireEndColor = new THREE.ColorNode(0xff0000);
					let burnedColor = new THREE.ColorNode(0x000000);
					let threshold = new THREE.FloatNode(0.1);
					let fireSize = new THREE.FloatNode(0.16);
					let burnedSize = new THREE.FloatNode(0.5);
					let timer = new THREE.TimerNode(0.8);

					let sinCycleInSecs = new THREE.OperatorNode(
						timer,
						new THREE.ConstNode(THREE.ConstNode.PI2),
						THREE.OperatorNode.MUL
					);

					let cycle: any = new THREE.MathNode(
						sinCycleInSecs,
						THREE.MathNode.SIN
					);

					// round sin to 0 at 1
					cycle = new THREE.OperatorNode(
						cycle,
						new THREE.FloatNode(1),
						THREE.OperatorNode.ADD
					);
					cycle = new THREE.OperatorNode(
						cycle,
						new THREE.FloatNode(2),
						THREE.OperatorNode.DIV
					);

					// offset to +.9
					cycle = new THREE.OperatorNode(
						cycle,
						new THREE.FloatNode(0.9),
						THREE.OperatorNode.ADD
					);

					let tex = new THREE.TextureNode(this.getTexture('cloud'));
					let texArea = new THREE.SwitchNode(tex, 'w');

					let thresholdBorder = new THREE.MathNode(
						new THREE.OperatorNode(threshold, fireSize, THREE.OperatorNode.ADD),
						threshold,
						texArea,
						THREE.MathNode.SMOOTHSTEP
					);

					let fireStartAnimatedColor = new THREE.ColorAdjustmentNode(
						fireStartColor,
						cycle,
						THREE.ColorAdjustmentNode.SATURATION
					);

					let fireEndAnimatedColor = new THREE.ColorAdjustmentNode(
						fireEndColor,
						cycle,
						THREE.ColorAdjustmentNode.SATURATION
					);

					let fireColor = new THREE.MathNode(
						fireEndAnimatedColor,
						fireStartAnimatedColor,
						thresholdBorder,
						THREE.MathNode.MIX
					);

					let thresholdBurnedBorder = new THREE.MathNode(
						new THREE.OperatorNode(
							threshold,
							burnedSize,
							THREE.OperatorNode.ADD
						),
						threshold,
						texArea,
						THREE.MathNode.SMOOTHSTEP
					);

					let fireEmissive = new THREE.OperatorNode(
						fireColor,
						thresholdBorder,
						THREE.OperatorNode.MUL
					);

					let burnedResultColor = new THREE.MathNode(
						color,
						burnedColor,
						thresholdBurnedBorder,
						THREE.MathNode.MIX
					);

					// APPLY

					mtl.color = burnedResultColor;
					mtl.emissive = fireEmissive;
					mtl.mask = new THREE.CondNode(
						texArea, // a: value
						threshold, // b: value
						THREE.CondNode.GREATER // condition
					);

					// GUI

					this.addGui(
						'threshold',
						threshold.value,
						function (val) {
							threshold.value = val;
						},
						false,
						-0.5,
						1.5
					);

					this.addGui(
						'fireSize',
						fireSize.value,
						function (val) {
							fireSize.value = val;
						},
						false,
						0,
						0.5
					);

					this.addGui(
						'burnedSize',
						burnedSize.value,
						function (val) {
							burnedSize.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'color',
						color.value.getHex(),
						function (val) {
							color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'fireStartColor',
						fireStartColor.value.getHex(),
						function (val) {
							fireStartColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'fireEndColor',
						fireEndColor.value.getHex(),
						function (val) {
							fireEndColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'burnedColor',
						burnedColor.value.getHex(),
						function (val) {
							burnedColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'timeScale',
						timer.scale,
						function (val) {
							timer.scale = val;
						},
						false,
						0,
						2
					);
				}
				break;

			case 'smoke':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					defaultSide = THREE.FrontSide;

					let time = new THREE.TimerNode();
					let uv = new THREE.UVNode();

					let timeSpeedA = new THREE.OperatorNode(
						time,
						new THREE.Vector2Node(0.3, 0.1),
						THREE.OperatorNode.MUL
					);

					let timeSpeedB = new THREE.OperatorNode(
						time,
						new THREE.Vector2Node(0.15, 0.4),
						THREE.OperatorNode.MUL
					);

					let uvOffsetA = new THREE.OperatorNode(
						timeSpeedA,
						uv,
						THREE.OperatorNode.ADD
					);

					let uvOffsetB = new THREE.OperatorNode(
						timeSpeedB,
						uv,
						THREE.OperatorNode.ADD
					);

					let cloudA = new THREE.TextureNode(
						this.getTexture('cloud'),
						uvOffsetA
					);
					let cloudB = new THREE.TextureNode(
						this.getTexture('cloud'),
						uvOffsetB
					);

					let clouds = new THREE.OperatorNode(
						cloudA,
						cloudB,
						THREE.OperatorNode.ADD
					);

					mtl.environment = new THREE.ColorNode(0xffffff);
					mtl.alpha = clouds;

					// GUI

					this.addGui(
						'color',
						mtl.environment.value.getHex(),
						function (val) {
							mtl.environment.value.setHex(val);
						},
						true
					);
				}
				break;

			case 'camera-depth':
				{
					// MATERIAL

					let colorA = new THREE.ColorNode(0xffffff);
					let colorB = new THREE.ColorNode(0x0054df);

					let depth = new THREE.CameraNode(THREE.CameraNode.DEPTH);
					depth.near.value = 1;
					depth.far.value = 200;

					let colors = new THREE.MathNode(
						colorB,
						colorA,
						depth,
						THREE.MathNode.MIX
					);

					mtl = new THREE.PhongNodeMaterial();
					mtl.color = colors;

					// GUI

					this.addGui(
						'near',
						depth.near.value,
						function (val) {
							depth.near.value = val;
						},
						false,
						1,
						1200
					);

					this.addGui(
						'far',
						depth.far.value,
						function (val) {
							depth.far.value = val;
						},
						false,
						1,
						1200
					);

					this.addGui(
						'nearColor',
						colorA.value.getHex(),
						function (val) {
							colorA.value.setHex(val);
						},
						true
					);

					this.addGui(
						'farColor',
						colorB.value.getHex(),
						function (val) {
							colorB.value.setHex(val);
						},
						true
					);
				}
				break;

			case 'caustic':
				{
					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					let hash2 = new THREE.FunctionNode(
						[
							'vec2 hash2(vec2 p) {',
							'	return fract(sin(vec2(dot(p, vec2(123.4, 748.6)), dot(p, vec2(547.3, 659.3))))*5232.85324);',
							'}',
						].join('\n')
					);

					// Based off of iq's described here: https://www.iquilezles.org/www/articles/voronoilines/voronoilines.htm
					let voronoi: any = new THREE.FunctionNode(
						[
							'float voronoi(vec2 p, in float time) {',
							'	vec2 n = floor(p);',
							'	vec2 f = fract(p);',
							'	float md = 5.0;',
							'	vec2 m = vec2(0.0);',
							'	for (int i = -1; i <= 1; i++) {',
							'		for (int j = -1; j <= 1; j++) {',
							'			vec2 g = vec2(i, j);',
							'			vec2 o = hash2(n + g);',
							'			o = 0.5 + 0.5 * sin(time + 5.038 * o);',
							'			vec2 r = g + o - f;',
							'			float d = dot(r, r);',
							'			if (d < md) {',
							'				md = d;',
							'				m = n+g+o;',
							'			}',
							'		}',
							'	}',
							'	return md;',
							'}',
						].join('\n'),
						[hash2]
					); // define hash2 as dependencies

					let voronoiLayers = new THREE.FunctionNode(
						[
							// based on https://www.shadertoy.com/view/4tXSDf
							'float voronoiLayers(vec2 p, in float time) {',
							'	float v = 0.0;',
							'	float a = 0.4;',
							'	for (int i = 0; i < 3; i++) {',
							'		v += voronoi(p, time) * a;',
							'		p *= 2.0;',
							'		a *= 0.5;',
							'	}',
							'	return v;',
							'}',
						].join('\n'),
						[voronoi]
					); // define voronoi as dependencies

					let time = new THREE.TimerNode();
					let timeScale = new THREE.FloatNode(2);

					// used for serialization only
					time.name = 'time';
					timeScale.name = 'speed';

					let alpha = new THREE.FloatNode(1);
					let scale = new THREE.FloatNode(0.1);
					let intensity = new THREE.FloatNode(1.5);

					let color = new THREE.ColorNode(0xffffff);
					let colorA = new THREE.ColorNode(0xffffff);
					let colorB = new THREE.ColorNode(0x0054df);

					let worldPos = new THREE.PositionNode(THREE.PositionNode.WORLD);
					let worldPosTop = new THREE.SwitchNode(worldPos, 'xz');

					let worldNormal = new THREE.NormalNode(THREE.NormalNode.WORLD);

					let mask: any = new THREE.SwitchNode(worldNormal, 'y');

					// clamp0at1
					mask = new THREE.MathNode(mask, THREE.MathNode.SATURATE);

					let timeOffset = new THREE.OperatorNode(
						time,
						timeScale,
						THREE.OperatorNode.MUL
					);

					let uvPos = new THREE.OperatorNode(
						worldPosTop,
						scale,
						THREE.OperatorNode.MUL
					);

					voronoi = new THREE.FunctionCallNode(voronoiLayers);
					voronoi.inputs.p = uvPos;
					voronoi.inputs.time = timeOffset;

					let maskCaustic = new THREE.OperatorNode(
						alpha,
						mask,
						THREE.OperatorNode.MUL
					);

					let voronoiIntensity = new THREE.OperatorNode(
						voronoi,
						intensity,
						THREE.OperatorNode.MUL
					);

					let voronoiColors = new THREE.MathNode(
						colorB,
						colorA,
						new THREE.MathNode(voronoiIntensity, THREE.MathNode.SATURATE), // mix needs clamp
						THREE.MathNode.MIX
					);

					let caustic = new THREE.MathNode(
						color,
						voronoiColors,
						maskCaustic,
						THREE.MathNode.MIX
					);

					let causticLights = new THREE.OperatorNode(
						voronoiIntensity,
						maskCaustic,
						THREE.OperatorNode.MUL
					);

					mtl.color = caustic;
					mtl.ambient = causticLights;

					// GUI

					this.addGui(
						'timeScale',
						timeScale.value,
						function (val) {
							timeScale.value = val;
						},
						false,
						0,
						5
					);

					this.addGui(
						'intensity',
						intensity.value,
						function (val) {
							intensity.value = val;
						},
						false,
						0,
						3
					);

					this.addGui(
						'scale',
						scale.value,
						function (val) {
							scale.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'alpha',
						alpha.value,
						function (val) {
							alpha.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'color',
						color.value.getHex(),
						function (val) {
							color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'colorA',
						colorA.value.getHex(),
						function (val) {
							colorA.value.setHex(val);
						},
						true
					);

					this.addGui(
						'colorB',
						colorB.value.getHex(),
						function (val) {
							colorB.value.setHex(val);
						},
						true
					);
				}

				break;

			case 'soft-body':
				{
					// MATERIAL

					this.move = true;

					mtl = new THREE.StandardNodeMaterial();

					let scale = new THREE.FloatNode(2);
					let colorA = new THREE.ColorNode(0xff6633);
					let colorB = new THREE.ColorNode(0x3366ff);

					let pos = new THREE.PositionNode();
					let posNorm = new THREE.MathNode(pos, THREE.MathNode.NORMALIZE);

					let mask = new THREE.SwitchNode(posNorm, 'y');

					let velocity = new THREE.VelocityNode(mesh, {
						type: 'elastic',
						spring: 0.95,
						damping: 0.95,
					});

					let velocityArea = new THREE.OperatorNode(
						mask,
						scale,
						THREE.OperatorNode.MUL
					);

					let softVelocity = new THREE.OperatorNode(
						velocity,
						velocityArea,
						THREE.OperatorNode.MUL
					);

					let softPosition = new THREE.OperatorNode(
						new THREE.PositionNode(),
						softVelocity,
						THREE.OperatorNode.ADD
					);

					let colors = new THREE.MathNode(
						colorB,
						colorA,
						mask,
						THREE.MathNode.MIX
					);

					mtl.color = colors;
					mtl.position = softPosition;

					// GUI

					this.addGui(
						'spring',
						velocity.params.spring,
						function (val) {
							velocity.params.spring = val;
						},
						false,
						0,
						0.95
					);

					this.addGui(
						'damping',
						velocity.params.damping,
						function (val) {
							velocity.params.damping = val;
						},
						false,
						0,
						0.95
					);

					this.addGui(
						'scale',
						scale.value,
						function (val) {
							scale.value = val;
						},
						false,
						0,
						3
					);

					this.addGui(
						'softBody',
						colorA.value.getHex(),
						function (val) {
							colorA.value.setHex(val);
						},
						true
					);

					this.addGui(
						'rigidBody',
						colorB.value.getHex(),
						function (val) {
							colorB.value.setHex(val);
						},
						true
					);
				}
				break;

			case 'plush':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let color = new THREE.ColorNode(0x8d8677);
					let mildness = new THREE.FloatNode(1.6);
					let fur = new THREE.FloatNode(0.5);

					let posDirection = new THREE.MathNode(
						new THREE.PositionNode(THREE.PositionNode.VIEW),
						THREE.MathNode.NORMALIZE
					);
					let norDirection = new THREE.MathNode(
						new THREE.NormalNode(),
						THREE.MathNode.NORMALIZE
					);

					let viewZ = new THREE.MathNode(
						posDirection,
						norDirection,
						THREE.MathNode.DOT
					);

					// without luma correction for now
					let mildnessColor = new THREE.OperatorNode(
						color,
						mildness,
						THREE.OperatorNode.MUL
					);

					let furScale = new THREE.OperatorNode(
						viewZ,
						fur,
						THREE.OperatorNode.MUL
					);

					mtl.color = color;
					mtl.normal = new THREE.NormalMapNode(
						new THREE.TextureNode(this.getTexture('grassNormal'))
					);
					mtl.normal.scale = furScale;
					mtl.environment = mildnessColor;
					mtl.environmentAlpha = new THREE.MathNode(
						viewZ,
						THREE.MathNode.INVERT
					);
					mtl.shininess = new THREE.FloatNode(0);

					// GUI

					this.addGui(
						'color',
						color.value.getHex(),
						function (val) {
							color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'mildness',
						mildness.value,
						function (val) {
							mildness.value = val;
						},
						false,
						1,
						2
					);

					this.addGui(
						'fur',
						fur.value,
						function (val) {
							fur.value = val;
						},
						false,
						0,
						2
					);
				}
				break;

			case 'skin':
			case 'skin-phong':
				{
					// MATERIAL

					mtl =
						name == 'skin'
							? new THREE.StandardNodeMaterial()
							: new THREE.PhongNodeMaterial();

					let skinColor = new THREE.ColorNode(0xffc495);
					let bloodColor = new THREE.ColorNode(0x6b0602);
					let wrapLight = new THREE.FloatNode(1.5);
					let wrapShadow = new THREE.FloatNode(0);

					let directLight = new THREE.LightNode();

					let lightLuminance = new THREE.LuminanceNode(directLight);

					let lightWrap = new THREE.MathNode(
						wrapShadow,
						wrapLight,
						lightLuminance,
						THREE.MathNode.SMOOTHSTEP
					);

					let lightTransition = new THREE.OperatorNode(
						lightWrap,
						new THREE.ConstNode(THREE.ConstNode.PI2),
						THREE.OperatorNode.MUL
					);

					let wrappedLight = new THREE.MathNode(
						lightTransition,
						THREE.MathNode.SIN
					);

					let wrappedLightColor = new THREE.OperatorNode(
						wrappedLight,
						bloodColor,
						THREE.OperatorNode.MUL
					);

					let bloodArea = new THREE.MathNode(
						wrappedLightColor,
						THREE.MathNode.SATURATE
					);

					let totalLight = new THREE.OperatorNode(
						directLight,
						bloodArea,
						THREE.OperatorNode.ADD
					);

					mtl.color = skinColor;
					mtl.light = totalLight;

					if (name == 'skin') {
						// StandardNodeMaterial

						mtl.metalness = new THREE.FloatNode(0);
						mtl.roughness = new THREE.FloatNode(1);
						mtl.reflectivity = new THREE.FloatNode(0);
						mtl.clearcoat = new THREE.FloatNode(0.2);
						mtl.clearcoatRoughness = new THREE.FloatNode(0.3);
						mtl.environment = new THREE.CubeTextureNode(this.cubemap);
					} else {
						// PhongNodeMaterial

						mtl.specular = new THREE.ColorNode(0x2f2e2d);
						mtl.shininess = new THREE.FloatNode(15);
					}

					// GUI

					this.addGui(
						'skinColor',
						skinColor.value.getHex(),
						function (val) {
							skinColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'bloodColor',
						bloodColor.value.getHex(),
						function (val) {
							bloodColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'wrapLight',
						wrapLight.value,
						function (val) {
							wrapLight.value = val;
						},
						false,
						0,
						3
					);

					this.addGui(
						'wrapShadow',
						wrapShadow.value,
						function (val) {
							wrapShadow.value = val;
						},
						false,
						-1,
						0
					);
				}
				break;

			case 'toon':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let count = new THREE.FloatNode(3.43);
					let sceneDirectLight = new THREE.LightNode();
					let color = new THREE.ColorNode(0xaabbff);

					let lineColor = new THREE.ColorNode(0xff0000);
					let lineSize = new THREE.FloatNode(0.23);
					let lineInner = new THREE.FloatNode(0);

					// CEL

					let lightLuminance = new THREE.LuminanceNode(sceneDirectLight);

					let preCelLight = new THREE.OperatorNode(
						lightLuminance,
						count,
						THREE.OperatorNode.MUL
					);

					let celLight = new THREE.MathNode(preCelLight, THREE.MathNode.CEIL);

					let posCelLight = new THREE.OperatorNode(
						celLight,
						count,
						THREE.OperatorNode.DIV
					);

					// LINE

					let posDirection = new THREE.MathNode(
						new THREE.PositionNode(THREE.PositionNode.VIEW),
						THREE.MathNode.NORMALIZE
					);
					let norDirection = new THREE.MathNode(
						new THREE.NormalNode(),
						THREE.MathNode.NORMALIZE
					);

					let viewZ = new THREE.MathNode(
						posDirection,
						norDirection,
						THREE.MathNode.DOT
					);

					let lineOutside = new THREE.MathNode(viewZ, THREE.MathNode.ABS);

					let line = new THREE.OperatorNode(
						lineOutside,
						new THREE.FloatNode(1),
						THREE.OperatorNode.DIV
					);

					let lineScaled = new THREE.MathNode(
						line,
						lineSize,
						lineInner,
						THREE.MathNode.SMOOTHSTEP
					);

					let innerContour = new THREE.MathNode(
						new THREE.MathNode(lineScaled, THREE.MathNode.SATURATE),
						THREE.MathNode.INVERT
					);

					// APPLY

					mtl.color = color;
					mtl.light = posCelLight;
					mtl.shininess = new THREE.FloatNode(0);

					mtl.environment = lineColor;
					mtl.environmentAlpha = innerContour;

					// GUI

					this.addGui(
						'color',
						color.value.getHex(),
						function (val) {
							color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'lineColor',
						lineColor.value.getHex(),
						function (val) {
							lineColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'count',
						count.value,
						function (val) {
							count.value = val;
						},
						false,
						1,
						8
					);

					this.addGui(
						'lineSize',
						lineSize.value,
						function (val) {
							lineSize.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'lineInner',
						lineInner.value,
						function (val) {
							lineInner.value = val;
						},
						false,
						0,
						1
					);

					this.addGui('ignoreIndirectLight', false, function (val) {
						mtl.ao = val ? new THREE.FloatNode() : undefined;

						mtl.dispose();
					});
				}

				break;

			case 'custom-attribute':
				{
					// GEOMETRY

					// add "position" buffer to "custom" attribute
					this.teapot.attributes['custom'] = this.teapot.attributes['position'];

					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					mtl.color = new THREE.AttributeNode('custom', 3);

					// or

					//mtl.color = new THREE.AttributeNode( "custom", "vec3" );
				}
				break;

			case 'expression':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let speed = new THREE.FloatNode(0.5);

					let myspeed = new THREE.ExpressionNode('speed * time', 'float');
					myspeed.keywords['speed'] = speed;

					mtl.color = new THREE.ExpressionNode(
						'myCustomUv + (sin(myspeed)*.5) + (position * .05)',
						'vec3'
					);
					mtl.color.keywords['myspeed'] = myspeed;

					mtl.position = new THREE.ExpressionNode(
						'mod(myspeed,1.0) < 0.5 ? position + (worldNormal*(1.0+sin(myspeed*1.0))*3.0) : position + sin( position.x * sin(myspeed*2.0))',
						'vec3'
					);
					mtl.position.keywords['myspeed'] = myspeed;

					// add global keyword ( variable or const )
					THREE.NodeLib.addKeyword('myCustomUv', function () {
						return new THREE.ReflectNode();
					});

					// GUI

					this.addGui(
						'speed',
						speed.value,
						function (val) {
							speed.value = val;
						},
						false,
						0,
						1
					);
				}

				break;

			case 'reserved-keywords':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let keywordsexample = new THREE.FunctionNode(
						[
							// use "uv" reserved keyword
							'vec4 keywordsexample( sampler2D tex ) {',
							'	return texture2D( tex, myUV ) + vec4( position * myAlpha, 0.0 );',
							'}',
						].join('\n')
					);

					// add local keyword ( const only )
					keywordsexample.keywords['myAlpha'] = new THREE.ConstNode(
						'float myAlpha .05'
					);

					// add global keyword ( const only )
					THREE.NodeLib.addKeyword('myUV', function () {
						return new THREE.UVNode();
					});

					// add global const or function
					//THREE.NodeLib.add( new THREE.ConstNode("float MY_CONST .05") )

					// reserved keywords

					// console.log( THREE.NodeLib.keywords );

					// keywords conflit? use this to disable:
					//blurtexture.useKeywords = false; // ( true is default )

					mtl.color = new THREE.FunctionCallNode(keywordsexample, [
						new THREE.TextureNode(this.getTexture('brick')),
					]);
				}
				break;

			case 'bias':
				{
					// MATERIAL

					let bias = new THREE.FloatNode(0.5);
					let maxMIPLevel = new THREE.MaxMIPLevelNode(
						new THREE.TextureNode(this.cubemap)
					);
					let mipsBias = new THREE.OperatorNode(
						bias,
						maxMIPLevel,
						THREE.OperatorNode.MUL
					);

					mtl = new THREE.PhongNodeMaterial();
					mtl.color.value.setHex(0xffffff);

					const biasMode = (val: string) => {
						switch (val) {
							case 'prem':
								{
									mtl.color = new THREE.TextureCubeNode(
										new THREE.TextureNode(this.premTexture),
										undefined,
										bias
									);
								}
								break;

							case 'lod':
								{
									let textureCubeFunction = new THREE.FunctionNode(
										'vec4 textureCubeLodEXT( samplerCube texture, vec3 uv, float bias );',
										undefined,
										{ shaderTextureLOD: true }
									);

									mtl.color = new THREE.FunctionCallNode(textureCubeFunction, [
										new THREE.CubeTextureNode(this.cubemap),
										new THREE.ReflectNode(),
										mipsBias,
									]);
								}
								break;

							case 'basic':
								{
									let textureCubeFunction = new THREE.FunctionNode(
										'vec4 textureCube( samplerCube texture, vec3 uv, float bias );'
									);

									mtl.color = new THREE.FunctionCallNode(textureCubeFunction, [
										new THREE.CubeTextureNode(this.cubemap),
										new THREE.ReflectNode(),
										mipsBias,
									]);
								}
								break;
						}

						mtl.needsUpdate = true;
					};

					biasMode('prem');

					// GUI

					this.addGui(
						'scope',
						{
							PREM: 'prem',
							LOD: 'lod',
							BASIC: 'basic',
						},
						biasMode
					);

					this.addGui(
						'bias',
						bias.value,
						function (val) {
							bias.value = val;
						},
						false,
						0,
						1
					);
				}
				break;

			case 'node-position':
				{
					// MATERIAL

					let node = new THREE.PositionNode();

					mtl = new THREE.PhongNodeMaterial();
					mtl.color = node;

					// GUI

					this.addGui(
						'scope',
						{
							local: THREE.PositionNode.LOCAL,
							world: THREE.PositionNode.WORLD,
							view: THREE.PositionNode.VIEW,
						},
						function (val) {
							node.scope = val;

							mtl.needsUpdate = true;
						}
					);
				}
				break;

			case 'node-normal':
				// MATERIAL

				let node = new THREE.NormalNode();

				mtl = new THREE.PhongNodeMaterial();
				mtl.color = node;

				// GUI

				this.addGui(
					'scope',
					{
						view: THREE.NormalNode.VIEW,
						local: THREE.NormalNode.LOCAL,
						world: THREE.NormalNode.WORLD,
					},
					function (val) {
						node.scope = val;

						mtl.needsUpdate = true;
					}
				);

				break;

			case 'node-reflect':
				{
					// MATERIAL

					let node = new THREE.ReflectNode();

					let nodeMaterial = new THREE.StandardNodeMaterial();
					nodeMaterial.environment = new THREE.CubeTextureNode(
						this.cubemap,
						node
					);
					nodeMaterial.roughness.value = 0.5;
					nodeMaterial.metalness.value = 1;

					let standardMaterial = new THREE.MeshStandardMaterial({
						color: nodeMaterial.color.value,
						side: defaultSide,
						envMap: this.cubemap,
						roughness: nodeMaterial.roughness.value,
						metalness: 1,
					});

					mtl = nodeMaterial;

					// GUI

					this.addGui('node', true, function (val) {
						mtl = val ? nodeMaterial : standardMaterial;
						mesh.material = mtl;
					});

					this.addGui(
						'roughness',
						nodeMaterial.roughness.value,
						function (val) {
							nodeMaterial.roughness.value = val;
							standardMaterial.roughness = val;
						},
						false,
						0,
						1
					);
				}
				break;

			case 'varying':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let varying = new THREE.VarNode('vec3');
					varying.value = new THREE.NormalNode(THREE.NormalNode.VIEW);

					// using BypassNode the NormalNode not apply the value in .position slot
					// but set the NormalNode value in VarNode
					// it can be useful to send values between vertex to fragment shader
					// without affect vertex shader
					mtl.position = new THREE.BypassNode(varying);
					mtl.color = varying;

					// you can also set a independent value in .position slot using BypassNode
					// such this expression using ExpressionNode
					mtl.position.value = new THREE.ExpressionNode(
						'position * ( .1 + abs( sin( time ) ) )',
						'vec3'
					);
				}
				break;

			case 'void-function':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let varying = new THREE.VarNode('vec3');

					// VERTEX

					let setMyVar = new THREE.FunctionNode(
						[
							'void setMyVar( vec3 pos ) {',
							// set "myVar" in vertex shader in this example,
							// can be used in fragment shader too or in rest of the current shader
							'	myVar = pos;',

							'}',
						].join('\n')
					);

					// add keyword
					setMyVar.keywords['myVar'] = varying;

					let position = new THREE.ExpressionNode(
						'setMyVar( position * .1 )',
						'vec3'
					);
					position.includes = [setMyVar];
					position.keywords['tex'] = new THREE.TextureNode(
						this.getTexture('brick')
					);

					// use BypassNode to "void" functions
					mtl.position = new THREE.BypassNode(position);

					// FRAGMENT

					let clipFromPos = new THREE.FunctionNode(
						[
							'void clipFromPos( vec3 pos ) {',

							'	if ( pos.y < .0 ) discard;',

							'}',
						].join('\n')
					);

					let clipFromPosCall = new THREE.FunctionCallNode(clipFromPos, {
						pos: varying,
					});

					mtl.color = new THREE.BypassNode(clipFromPosCall, varying);
				}
				break;

			case 'basic-material':
				{
					// MATERIAL

					mtl = new THREE.BasicNodeMaterial();

					let positionNode = new THREE.PositionNode();

					let a = new THREE.OperatorNode(
						new THREE.SwitchNode(positionNode, 'x'),
						new THREE.SwitchNode(positionNode, 'y'),
						THREE.OperatorNode.ADD
					);
					let b = new THREE.FloatNode(0);
					let ifNode = new THREE.FloatNode(1);
					let elseNode = new THREE.FloatNode(0);

					mtl.mask = new THREE.CondNode(
						a,
						b,
						THREE.CondNode.GREATER,
						ifNode,
						elseNode
					);

					let sin = new THREE.MathNode(
						new THREE.TimerNode(),
						THREE.MathNode.SIN
					);

					mtl.position = new THREE.OperatorNode(
						positionNode,
						sin,
						THREE.OperatorNode.ADD
					);

					mtl.color = new THREE.ColorNode('green');
				}
				break;

			case 'conditional':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let a = new THREE.FloatNode(0),
						b = new THREE.FloatNode(0),
						ifNode = new THREE.ColorNode(0x0000ff),
						elseNode = new THREE.ColorNode(0xff0000);

					let cond = new THREE.CondNode(
						a,
						b,
						THREE.CondNode.EQUAL,
						ifNode,
						elseNode
					);

					mtl.color = cond;

					// GUI

					this.addGui(
						'a',
						a.value,
						function (val) {
							a.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'b',
						b.value,
						function (val) {
							b.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'a condition b',
						{
							EQUAL: THREE.CondNode.EQUAL,
							NOT_EQUAL: THREE.CondNode.NOT_EQUAL,
							GREATER: THREE.CondNode.GREATER,
							GREATER_EQUAL: THREE.CondNode.GREATER_EQUAL,
							LESS: THREE.CondNode.LESS,
							LESS_EQUAL: THREE.CondNode.LESS_EQUAL,
						},
						function (val) {
							cond.op = val;

							mtl.needsUpdate = true;
						}
					);

					this.addGui(
						'if color',
						ifNode.value.getHex(),
						function (val) {
							ifNode.value.setHex(val);
						},
						true
					);

					this.addGui(
						'else color',
						elseNode.value.getHex(),
						function (val) {
							elseNode.value.setHex(val);
						},
						true
					);
				}
				break;

			case 'rtt':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let uvTransform = new THREE.UVTransformNode(),
						checker = new THREE.CheckerNode(uvTransform);

					uvTransform.setUvTransform(0, 0, 2, 2, 0);

					let rtt = new THREE.RTTNode(512, 512, checker),
						bumpMap = new THREE.BumpMapNode(rtt);

					bumpMap.scale.value = 0.1;

					mtl.color = checker;
					mtl.normal = bumpMap;

					// GUI

					this.addGui(
						'bump',
						bumpMap.scale.value,
						function (val) {
							bumpMap.scale.value = val;
						},
						false,
						-0.5,
						0.5
					);

					this.addGui(
						'scale',
						2,
						function (val) {
							uvTransform.setUvTransform(0, 0, val, val, 0);
						},
						false,
						0,
						8
					);

					this.addGui('ignoreColor', false, function (val) {
						mtl.color = val ? new THREE.ColorNode(0xffffff) : checker;

						mtl.needsUpdate = true;
					});
				}
				break;

			case 'temporal-blur':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let texture = new THREE.TextureNode(this.getTexture('brick'));

					let rttStore = new THREE.RTTNode(512, 512, texture);
					let blur = new THREE.BlurNode(rttStore);

					let timer = new THREE.TimerNode(0.01, THREE.TimerNode.LOCAL);

					let color = new THREE.MathNode(
						rttStore,
						blur,
						new THREE.FloatNode(0.6),
						THREE.MathNode.MIX
					);

					blur.horizontal = blur.vertical = timer;

					let rttSave = new THREE.RTTNode(512, 512, color);
					rttSave.saveTo = rttStore;

					mtl.color = rttSave;

					// GUI

					this.addGui('click to reset', false, function () {
						// render a single time

						rttStore.render = true;

						// reset time blur

						timer.value = 0;
					});
				}
				break;

			case 'readonly':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					// not use "uniform" input ( for optimization )
					// instead use explicit declaration, for example:
					// vec3( 1.0, 1.0, 1.0 ) instead "uniform vec3"
					// if readonly is true not allow change the value after build the shader material

					mtl.color = new THREE.ColorNode(0xffffff).setReadonly(true);
					mtl.specular = new THREE.FloatNode(0.5).setReadonly(true);
					mtl.shininess = new THREE.FloatNode(15).setReadonly(true);
				}
				break;

			case 'label':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					// label can be useful for finding the nodes as variables in debug level
					// but this always force the creation of a variable
					// same as the code can be writed in the same line (inline)
					// for optimization this is not recommended

					let colorInput = new THREE.ColorNode(0xffffff).setLabel('colorInput');
					let specularInput = new THREE.FloatNode(0.5).setLabel(
						'specularInput'
					);

					let colorMix = new THREE.OperatorNode(
						colorInput,
						new THREE.ColorNode(0x6495ed).setReadonly(true),
						THREE.OperatorNode.MUL
					).setLabel('colorMix');

					mtl.color = colorMix;
					mtl.specular = specularInput;

					// default: without use label
					// this is optimized writed the code in a single line (inline)
					// for the reason that this node is used only once in this shader program
					mtl.shininess = new THREE.OperatorNode(
						new THREE.FloatNode(10).setReadonly(true),
						new THREE.FloatNode(5).setReadonly(true),
						THREE.OperatorNode.ADD
					);

					mtl.build();

					// show names glsl fragment shader
					// open console e find using CTRL+F "colorMix" for example

					// console.log( mtl.fragmentShader );
				}
				break;

			case 'triangle-blur':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let delta: any = new THREE.Vector2Node(0.5, 0.25);
					let alpha = new THREE.FloatNode(1);

					let blurtexture = new THREE.FunctionNode(
						[
							// Reference: TriangleBlurShader.js
							'vec4 blurtexture(sampler2D map, vec2 uv, vec2 delta) {',
							'	vec4 color = vec4( 0.0 );',
							'	float total = 0.0;',
							// randomize the lookup values to hide the fixed number of samples
							'	float offset = rand( uv );',
							'	for ( float t = -BLUR_ITERATIONS; t <= BLUR_ITERATIONS; t ++ ) {',
							'		float percent = ( t + offset - 0.5 ) / BLUR_ITERATIONS;',
							'		float weight = 1.0 - abs( percent );',
							'		color += texture2D( map, uv + delta * percent ) * weight;',
							'		total += weight;',
							'	}',
							'	return color / total;',
							'}',
						].join('\n'),
						[new THREE.ConstNode('float BLUR_ITERATIONS 10.0')]
					);

					let blurredTexture = new THREE.FunctionCallNode(blurtexture, {
						map: new THREE.TextureNode(this.getTexture('brick')),
						delta: delta,
						uv: new THREE.UVNode(),
					});

					let color = new THREE.MathNode(
						new THREE.TextureNode(this.getTexture('brick')),
						blurredTexture,
						alpha,
						THREE.MathNode.MIX
					);

					mtl.color = color;

					// GUI

					this.addGui(
						'alpha',
						alpha.value,
						function (val) {
							alpha.value = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'deltaX',
						delta.x,
						function (val) {
							delta.x = val;
						},
						false,
						0,
						1
					);

					this.addGui(
						'deltaY',
						delta.x,
						function (val) {
							delta.y = val;
						},
						false,
						0,
						1
					);
				}
				break;

			case 'triplanar-mapping':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let scale = new THREE.FloatNode(0.02);

					let triplanarMapping = new THREE.FunctionNode(
						[
							// Reference: https://github.com/keijiro/StandardTriplanar
							'vec4 triplanar_mapping( sampler2D map, vec3 normal, vec3 position, float scale ) {',

							// Blending factor of triplanar mapping
							'	vec3 bf = normalize( abs( normal ) );',
							'	bf /= dot( bf, vec3( 1.0 ) );',

							// Triplanar mapping
							'	vec2 tx = position.yz * scale;',
							'	vec2 ty = position.zx * scale;',
							'	vec2 tz = position.xy * scale;',

							// Base color
							'	vec4 cx = texture2D(map, tx) * bf.x;',
							'	vec4 cy = texture2D(map, ty) * bf.y;',
							'	vec4 cz = texture2D(map, tz) * bf.z;',

							'	return cx + cy + cz;',

							'}',
						].join('\n')
					);

					let triplanarMappingTexture = new THREE.FunctionCallNode(
						triplanarMapping,
						{
							map: new THREE.TextureNode(this.getTexture('brick')),
							normal: new THREE.NormalNode(THREE.NormalNode.WORLD),
							position: new THREE.PositionNode(THREE.PositionNode.WORLD),
							scale: scale,
						}
					);

					mtl.color = triplanarMappingTexture;

					// GUI

					this.addGui(
						'scale',
						scale.value,
						function (val) {
							scale.value = val;
						},
						false,
						0.001,
						0.1
					);
				}
				break;

			case 'firefly':
				{
					// MATERIAL

					mtl = new THREE.PhongNodeMaterial();

					let time = new THREE.TimerNode();
					let speed = new THREE.FloatNode(0.5);

					let color = new THREE.ColorNode(0x98ff00);

					let timeSpeed = new THREE.OperatorNode(
						time,
						speed,
						THREE.OperatorNode.MUL
					);

					let sinCycleInSecs = new THREE.OperatorNode(
						timeSpeed,
						new THREE.ConstNode(THREE.ConstNode.PI2),
						THREE.OperatorNode.MUL
					);

					let cycle = new THREE.MathNode(sinCycleInSecs, THREE.MathNode.SIN);

					let cycleColor = new THREE.OperatorNode(
						cycle,
						color,
						THREE.OperatorNode.MUL
					);

					let cos = new THREE.MathNode(cycleColor, THREE.MathNode.SIN);

					mtl.color = new THREE.ColorNode(0);
					mtl.emissive = cos;

					// GUI

					this.addGui(
						'speed',
						speed.value,
						function (val) {
							speed.value = val;
						},
						false,
						0,
						3
					);
				}
				break;

			case 'sss':
			case 'translucent':
				{
					// DISTANCE FORMULA

					let modelPos = new THREE.Vector3Node();

					let viewPos = new THREE.PositionNode(THREE.PositionNode.VIEW);
					let cameraPosition = new THREE.CameraNode(THREE.CameraNode.POSITION);

					let cameraDistance = new THREE.MathNode(
						modelPos,
						cameraPosition,
						THREE.MathNode.DISTANCE
					);

					let viewPosZ = new THREE.SwitchNode(viewPos, 'z');

					let distance = new THREE.OperatorNode(
						cameraDistance,
						viewPosZ,
						THREE.OperatorNode.SUB
					);

					let distanceRadius = new THREE.OperatorNode(
						distance,
						new THREE.FloatNode(70),
						THREE.OperatorNode.ADD
					);

					let objectDepth = new THREE.MathNode(
						distanceRadius,
						new THREE.FloatNode(0),
						new THREE.FloatNode(50),
						THREE.MathNode.SMOOTHSTEP
					);

					// RTT ( get back distance )

					this.rtTexture = new THREE.WebGLRenderTarget(
						window.innerWidth,
						window.innerHeight
					);

					this.library[this.rtTexture.texture.uuid] = this.rtTexture.texture;

					let distanceMtl = new THREE.PhongNodeMaterial();
					distanceMtl.environment = objectDepth;
					distanceMtl.side = THREE.BackSide;

					this.rtMaterial = distanceMtl;

					// MATERIAL

					mtl = new THREE.StandardNodeMaterial();

					let backSideDepth = new THREE.TextureNode(
						this.rtTexture.texture,
						new THREE.ScreenUVNode()
					);

					let difference = new THREE.OperatorNode(
						objectDepth,
						backSideDepth,
						THREE.OperatorNode.SUB
					);

					let sss: any = new THREE.MathNode(
						new THREE.FloatNode(-0.1),
						new THREE.FloatNode(0.5),
						difference,
						THREE.MathNode.SMOOTHSTEP
					);

					let sssAlpha = new THREE.MathNode(sss, THREE.MathNode.SATURATE);

					let frontColor, backColor;

					if (name == 'sss') {
						let sssOut = new THREE.MathNode(
							objectDepth,
							sssAlpha,
							THREE.MathNode.MIN
						);

						frontColor = new THREE.ColorNode(0xd4cfbb);
						backColor = new THREE.ColorNode(0xd04327);

						let color = new THREE.MathNode(
							backColor,
							frontColor,
							sssOut,
							THREE.MathNode.MIX
						);

						let light = new THREE.OperatorNode(
							new THREE.LightNode(),
							color,
							THREE.OperatorNode.ADD
						);

						mtl.color = frontColor;
						mtl.roughness = new THREE.FloatNode(0.1);
						mtl.metalness = new THREE.FloatNode(0.5);

						mtl.light = light;
						mtl.environment = color;
					} else {
						frontColor = new THREE.ColorNode(0xd04327);
						backColor = new THREE.ColorNode(0x1a0e14);

						let color = new THREE.MathNode(
							frontColor,
							backColor,
							sssAlpha,
							THREE.MathNode.MIX
						);

						let light = new THREE.OperatorNode(
							new THREE.LightNode(),
							color,
							THREE.OperatorNode.ADD
						);

						mtl.color = new THREE.ColorNode(0xffffff);
						mtl.roughness = new THREE.FloatNode(0.1);
						mtl.metalness = new THREE.FloatNode(0.5);

						mtl.light = light;
						mtl.environment = color;
					}

					// GUI

					this.addGui(
						'frontColor',
						frontColor.value.getHex(),
						function (val) {
							frontColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'backColor',
						backColor.value.getHex(),
						function (val) {
							backColor.value.setHex(val);
						},
						true
					);

					this.addGui(
						'area',
						sss.b.value,
						function (val) {
							sss.b.value = val;
						},
						false,
						0,
						1
					);
				}
				break;
		}

		// set material

		mtl.side = defaultSide;

		mesh.material = mtl;
	}

	setMesh(mesh: NgxMeshComponent) {
		super.setMesh(mesh);
		this.mesh = mesh.getObject3d();
	}

	setMaterial(matrial: NgxMaterialComponent) {
		this.material = this.orgMaterial = matrial.getMaterial();
		this.map = this.orgMaterial.map;
		this.envMap = this.orgMaterial.envMap;
		this.normalMap = this.orgMaterial.normalMap;
	}
	orgMaterial: any = null;
	material: any = null;
	map: I3JS.Texture = null;
	envMap: I3JS.Texture = null;
	normalMap: I3JS.Texture = null;
	sataturation: I3JS.FloatNode = null;

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
