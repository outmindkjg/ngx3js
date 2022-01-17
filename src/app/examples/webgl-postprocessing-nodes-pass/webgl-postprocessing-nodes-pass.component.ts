import { Component } from '@angular/core';
import {
	I3JS,
	IRendererInfo,
	IRendererTimer,
	NgxBaseComponent,
	NgxRendererComponent,
	NgxThreeUtil,
	THREE
} from 'ngx3js';

@Component({
	selector: 'app-webgl-postprocessing-nodes-pass',
	templateUrl: './webgl-postprocessing-nodes-pass.component.html',
	styleUrls: ['./webgl-postprocessing-nodes-pass.component.scss'],
})
export class WebglPostprocessingNodesPassComponent extends NgxBaseComponent<{
	example: string;
}> {
	constructor() {
		super(
			{
				example: 'color-adjustment',
			},
			[
				{
					type: 'select',
					name: 'example',
					select: {
						'basic / color-adjustment': 'color-adjustment',
						'basic / blends': 'blends',
						'basic / fade': 'fade',
						'basic / invert': 'invert',
						'basic / blur': 'blur',
						'adv / saturation': 'saturation',
						'adv / refraction': 'refraction',
						'adv / mosaic': 'mosaic',
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

	private lensflare2: I3JS.Texture = null;
	private decalNormal: I3JS.Texture = null;

	ngOnInit(): void {
		const textureLoader: I3JS.TextureLoader = NgxThreeUtil.getLoader(
			'textureLoader',
			THREE.TextureLoader
		);
		const lensflare2 = (this.lensflare2 = textureLoader.load(
			NgxThreeUtil.getStoreUrl('textures/lensflare/lensflare0.png')
		));
		lensflare2.wrapS = lensflare2.wrapT = THREE.RepeatWrapping;

		const decalNormal = (this.decalNormal = textureLoader.load(
			NgxThreeUtil.getStoreUrl('textures/decal/decal-normal.jpg')
		));
		decalNormal.wrapS = decalNormal.wrapT = THREE.RepeatWrapping;

		this.frame = new THREE.NodeFrame();
		this.sphereInfos = [];
		for (let i = 0; i < 100; i++) {
			this.sphereInfos.push({
				color: 0x888888 + Math.random() * 0x888888,
				position: {
					x: Math.random() - 0.5,
					y: Math.random() - 0.5,
					z: Math.random() - 0.5,
					multiply: Math.random() * 400,
				},
				rotation: {
					x: Math.random() * 360,
					y: Math.random() * 360,
					z: Math.random() * 360,
				},
				scale: 10 + Math.random() * 40,
			});
		}
		this.beforeRender = (info: IRendererInfo) => {
			if (this.frame !== null && this.nodepass !== null && this.composer !== null) {
				this.frame.update(info.timer.delta);
				this.frame.updateNode(this.nodepass.material as any);
				this.composer.render();
				return true;
			} else {
				return false;
			}
		};
	}

	frame: I3JS.NodeFrame = null;
	nodepass: I3JS.NodePass = null;

	beforeRender: (info: IRendererInfo) => boolean = null;

	sphereInfos: {
		color: number;
		position: {
			x: number;
			y: number;
			z: number;
			multiply: number;
		};
		rotation: {
			x: number;
			y: number;
			z: number;
		};
		scale: number;
	}[] = [];

	clearGui() {
		const gui = this.renderer.gui.folders[0];
		const domElement = gui.domElement;
		gui.children.forEach((child) => {
			child.domElement.parentNode.removeChild(child.domElement);
		});
		gui.children = [];
		this.property = {};
	}

	property: any = {};
	addGui(
		name: string,
		value: any,
		callback?: (value: any) => void,
		isColor?: boolean,
		min?: number,
		max?: number
	): any {
		let node;
		const gui = this.renderer.gui.folders[0];
		const param = this.property;
		param[name] = value;

		if (isColor) {
			node = gui.addColor(param, name).onChange(() => {
				callback(param[name]);
			});
		} else if (typeof value == 'object') {
			param[name] = value[Object.keys(value)[0]];

			node = gui.add(param, name, value).onChange(() => {
				callback(param[name]);
			});
		} else {
			node = gui.add(param, name, min, max).onChange(() => {
				callback(param[name]);
			});
		}

		return node;
	}

	updateMaterial() {
		if (this.nodepass !== null) {
			const name = this.controls.example;

			let screen, fade, scale, size;

			this.clearGui();

			switch (name) {
				case 'color-adjustment':
					// POST

					screen = new THREE.ScreenNode();

					const hue = new THREE.FloatNode();
					const sataturation = new THREE.FloatNode(1);
					const vibrance = new THREE.FloatNode();
					const brightness = new THREE.FloatNode(0);
					const contrast = new THREE.FloatNode(1);

					const hueNode = new THREE.ColorAdjustmentNode(
						screen,
						hue,
						THREE.ColorAdjustmentNode.HUE
					);
					const satNode = new THREE.ColorAdjustmentNode(
						hueNode,
						sataturation,
						THREE.ColorAdjustmentNode.SATURATION
					);
					const vibranceNode = new THREE.ColorAdjustmentNode(
						satNode,
						vibrance,
						THREE.ColorAdjustmentNode.VIBRANCE
					);
					const brightnessNode = new THREE.ColorAdjustmentNode(
						vibranceNode,
						brightness,
						THREE.ColorAdjustmentNode.BRIGHTNESS
					);
					const contrastNode = new THREE.ColorAdjustmentNode(
						brightnessNode,
						contrast,
						THREE.ColorAdjustmentNode.CONTRAST
					);

					this.nodepass.input = contrastNode;

					// GUI

					this.addGui(
						'hue',
						hue.value,
						(val) => {
							hue.value = val;
						},
						false,
						0,
						Math.PI * 2
					);

					this.addGui(
						'saturation',
						sataturation.value,
						(val) => {
							sataturation.value = val;
						},
						false,
						0,
						2
					);

					this.addGui(
						'vibrance',
						vibrance.value,
						(val) => {
							vibrance.value = val;
						},
						false,
						-1,
						1
					);

					this.addGui(
						'brightness',
						brightness.value,
						(val) => {
							brightness.value = val;
						},
						false,
						0,
						0.5
					);

					this.addGui(
						'contrast',
						contrast.value,
						(val) => {
							contrast.value = val;
						},
						false,
						0,
						2
					);

					break;

				case 'fade':
					// POST

					const color = new THREE.ColorNode(0xffffff);
					const percent = new THREE.FloatNode(0.5);

					fade = new THREE.MathNode(
						new THREE.ScreenNode(),
						color,
						percent,
						THREE.MathNode.MIX
					);

					this.nodepass.input = fade;

					// GUI

					this.addGui(
						'color',
						color.value.getHex(),
						(val) => {
							color.value.setHex(val);
						},
						true
					);

					this.addGui(
						'fade',
						percent.value,
						(val) => {
							percent.value = val;
						},
						false,
						0,
						1
					);

					break;

				case 'invert':
					// POST

					const alpha = new THREE.FloatNode(1);

					screen = new THREE.ScreenNode();
					const inverted = new THREE.MathNode(screen, THREE.MathNode.INVERT);

					fade = new THREE.MathNode(
						screen,
						inverted,
						alpha,
						THREE.MathNode.MIX
					);

					this.nodepass.input = fade;

					// GUI

					this.addGui(
						'alpha',
						alpha.value,
						(val) => {
							alpha.value = val;
						},
						false,
						0,
						1
					);

					break;

				case 'blends':
					// POST

					const multiply = new THREE.OperatorNode(
						new THREE.ScreenNode(),
						new THREE.TextureNode(this.lensflare2),
						THREE.OperatorNode.ADD
					);

					this.nodepass.input = multiply;

					// GUI

					this.addGui(
						'blend',
						{
							addition: THREE.OperatorNode.ADD,
							subtract: THREE.OperatorNode.SUB,
							multiply: THREE.OperatorNode.MUL,
							division: THREE.OperatorNode.DIV,
						},
						(val) => {
							multiply.op = val;

							this.nodepass.needsUpdate = true;
						}
					);

					break;

				case 'saturation':
					// PASS

					screen = new THREE.ScreenNode();
					const sat = new THREE.FloatNode(0);

					const satrgb = new THREE.FunctionNode(
						[
							'vec3 satrgb( vec3 rgb, float adjustment ) {',
							// include luminance function from LuminanceNode
							'	vec3 intensity = vec3( luminance( rgb ) );',
							'	return mix( intensity, rgb, adjustment );',
							'}',
						].join('\n'),
						[THREE.LuminanceNode.Nodes.luminance]
					);

					const saturation = new THREE.FunctionCallNode(satrgb);
					const inputs: any = saturation.inputs;
					inputs.rgb = screen;
					inputs.adjustment = sat;

					this.nodepass.input = saturation;

					// GUI

					this.addGui(
						'saturation',
						sat.value,
						(val) => {
							sat.value = val;
						},
						false,
						0,
						2
					);

					break;

				case 'refraction':
					// POST

					const normal = new THREE.TextureNode(this.decalNormal);
					const normalXY = new THREE.SwitchNode(normal, 'xy');
					scale = new THREE.FloatNode(0.5);

					const normalXYFlip = new THREE.MathNode(
						normalXY,
						THREE.MathNode.INVERT
					);

					const offsetNormal = new THREE.OperatorNode(
						normalXYFlip,
						new THREE.FloatNode(0.5),
						THREE.OperatorNode.ADD
					);

					const scaleTexture = new THREE.OperatorNode(
						new THREE.SwitchNode(normal, 'z'),
						offsetNormal,
						THREE.OperatorNode.MUL
					);

					const scaleNormal = new THREE.MathNode(
						new THREE.FloatNode(1),
						scaleTexture,
						scale,
						THREE.MathNode.MIX
					);

					const offsetCoord = new THREE.OperatorNode(
						new THREE.UVNode(),
						scaleNormal,
						THREE.OperatorNode.MUL
					);

					screen = new THREE.ScreenNode(offsetCoord);

					this.nodepass.input = screen;

					// GUI

					this.addGui(
						'scale',
						scale.value,
						(val) => {
							scale.value = val;
						},
						false,
						0,
						1
					);

					this.addGui('invert', false, (val) => {
						offsetNormal.a = val ? normalXYFlip : normalXY;

						this.nodepass.needsUpdate = true;
					});

					break;

				case 'mosaic':
					// POST

					scale = new THREE.FloatNode(128);
					fade = new THREE.FloatNode(1);
					const uv = new THREE.UVNode();

					const blocks = new THREE.OperatorNode(
						uv,
						scale,
						THREE.OperatorNode.MUL
					);

					const blocksSize = new THREE.MathNode(blocks, THREE.MathNode.FLOOR);

					const mosaicUV = new THREE.OperatorNode(
						blocksSize,
						scale,
						THREE.OperatorNode.DIV
					);

					const fadeScreen = new THREE.MathNode(
						uv,
						mosaicUV,
						fade,
						THREE.MathNode.MIX
					);

					this.nodepass.input = new THREE.ScreenNode(fadeScreen);

					// GUI

					this.addGui(
						'scale',
						scale.value,
						(val) => {
							scale.value = val;
						},
						false,
						16,
						1024
					);

					this.addGui(
						'fade',
						fade.value,
						(val) => {
							fade.value = val;
						},
						false,
						0,
						1
					);

					this.addGui('mask', false, (val) => {
						fadeScreen.c = val ? new THREE.TextureNode(this.lensflare2) : fade;

						this.nodepass.needsUpdate = true;
					});

					break;

				case 'blur':
					// POST

					size = (this.renderer.renderer as any).getDrawingBufferSize(
						new THREE.Vector2()
					);

					const blurScreen: any = new THREE.BlurNode(new THREE.ScreenNode());
					blurScreen.size = new THREE.Vector2(size.width, size.height);

					this.nodepass.input = blurScreen;

					// GUI

					this.addGui(
						'blurX',
						blurScreen.radius.x,
						(val) => {
							blurScreen.radius.x = val;
						},
						false,
						0,
						15
					);

					this.addGui(
						'blurY',
						blurScreen.radius.y,
						(val) => {
							blurScreen.radius.y = val;
						},
						false,
						0,
						15
					);

					break;
			}
			this.nodepass.needsUpdate = true;
		}
	}

	setRender(renderer: NgxRendererComponent): void {
		super.setRender(renderer);
		this.subscribeRefer(
			'renderSize',
			this.renderer.sizeSubscribe().subscribe((size) => {
				if (this.nodepass !== null) {
					this.nodepass.setSize(size.x, size.y);
					this.composer.setSize( size.x, size.y);
				}
			})
		);
		const renderInfo = renderer.getRenderInfo();
		const composer = this.composer = new THREE.EffectComposer( this.renderer.renderer as any );
		composer.addPass( new THREE.RenderPass( renderInfo.scenes[0], renderInfo.cameras[0] ) );
		const nodepass = this.nodepass = new THREE.NodePass();
		composer.addPass( nodepass );
		this.updateMaterial();
	}

	composer : I3JS.EffectComposer = null;

	onRender(timer: IRendererTimer): void {
		super.onRender(timer);
		if (this.meshObject3d !== null) {
			this.meshObject3d.rotation.x += 0.005;
			this.meshObject3d.rotation.y += 0.01;
		}
	}
}
