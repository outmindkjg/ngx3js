import { AfterViewInit, Component, Injectable, Input, OnInit } from '@angular/core';
import Ammo from 'ammojs-typed';
import * as CHROMA from 'chroma-js';
import { Observable, Subscription } from 'rxjs';
import * as THREE from 'three';
import { GUI } from 'three/examples/jsm/libs/dat.gui.module';
import Stats from 'three/examples/jsm/libs/stats.module';
import { DDSLoader } from 'three/examples/jsm/loaders/DDSLoader';
import { CameraComponent } from './camera/camera.component';
import { MeshComponent } from './mesh/mesh.component';
import { RendererComponent } from './renderer/renderer.component';
import { SceneComponent } from './scene/scene.component';

export { THREE };

/**
 * Apply matrix4
 */
export interface ApplyMatrix4 {
	applyMatrix4(matrix: THREE.Matrix4): any;
}

/**
 * Texture option
 */
export interface TextureOption {
	type: string;
	value: string;
	options?: string;
	cubeImage?: string[];
}

/**
 * ThreeUniform
 */
export type ThreeUniform = { type: string; value: any; options?: any } | THREE.IUniform;

/**
 * ThreeUniforms
 */
export type ThreeUniforms = { [key: string]: ThreeUniform };

/**
 * ThreeTexture
 */
export type ThreeTexture = string | THREE.Texture | TextureOption | any;

/**
 * Three Color
 * string hexcode - #ffffff
 * string hsl(0,1,1)
 * string rgb(255,255,255)
 * string color name - red,blue...  'aliceblue': 0xF0F8FF, 'antiquewhite': 0xFAEBD7, 'aqua': 0x00FFFF ...
 * string random
 * number 0xffffff
 * THREE.Color
 */
export type ThreeColor = string | number | THREE.Color;

/**
 * Three Vector
 */
export interface ThreeVector {
	x: number;
	y: number;
	z?: number;
	w?: number;
}

/**
 * Three Face
 */
export interface ThreeFace {
	a: number;
	b: number;
	c: number;
}

/**
 * Loaded object
 */
export interface LoadedObject {
	object?: THREE.Object3D;
	material?: THREE.Material | any;
	geometry?: THREE.BufferGeometry;
	texture?: THREE.Texture;
	clips?: THREE.AnimationClip[] | any;
	morphTargets?: THREE.BufferAttribute[];
	source?: any;
}

/**
 * Gui base control
 */
export interface GuiBaseControl {
	meshShape?: {
		visible: boolean;
		helperVisible: boolean;
		wireframe: boolean;
	};
	meshRotateOrg?: {
		x: number;
		y: number;
		z: number;
	};
	meshRotate?: {
		x: number;
		y: number;
		z: number;
		autoRotate: boolean;
		speed: number;
		reset: () => void;
		applyAutoRotate: () => void;
		update: () => void;
	};
	meshPositionOrg?: {
		x: number;
		y: number;
		z: number;
	};
	meshPosition?: {
		x: number;
		y: number;
		z: number;
		reset: () => void;
		update: () => void;
	};
	meshScaleOrg?: {
		x: number;
		y: number;
		z: number;
	};
	meshScale?: {
		x: number;
		y: number;
		z: number;
		reset: () => void;
		update: () => void;
	};
}

/**
 * Tag attributes
 */
export interface TagAttributes {
	tag: string;
	attributes: { name: string; value: any }[];
	children?: { getTagAttribute: (options?: any) => TagAttributes }[];
	options?: any;
}

/**
 * Css style
 */
export interface CssStyle {
	src?: string;
	draggable?: boolean;
	innerHTML?: string;
	textContent?: string;
	content?: string;
	position?: string;
	pointerEvents?: string;
	overflow?: string;
	zIndex?: number;
	width?: number | string;
	height?: number | string;
	minWidth?: number | string;
	minHeight?: number | string;
	maxWidth?: number | string;
	maxHeight?: number | string;
	left?: number | string;
	right?: number | string;
	top?: number | string;
	bottom?: number | string;
	transition?: string | string[];
	background?: ThreeColor | THREE.Vector4;
	backgroundColor?: ThreeColor | THREE.Vector4;
	backgroundImage?: string;
	backgroundRepeat?: string;
	backgroundRepeatX?: string;
	backgroundRepeatY?: string;
	backgroundPosition?: string;
	backgroundPositionX?: number | string;
	backgroundPositionY?: number | string;
	backgroundSize?: number | string;
	backgroundSizeX?: number | string;
	backgroundSizeY?: number | string;
	backgroundClip?: string;
	padding?: number | string;
	paddingLeft?: number | string;
	paddingTop?: number | string;
	paddingRight?: number | string;
	paddingBottom?: number | string;
	margin?: number | string;
	marginLeft?: number | string;
	marginTop?: number | string;
	marginRight?: number | string;
	marginBottom?: number | string;
	border?: number | string;
	borderColor?: ThreeColor | THREE.Vector4;
	borderStyle?: string;
	borderWidth?: number | string;
	borderRadius?: number | string;
	borderLeft?: number | string;
	borderTop?: number | string;
	borderRight?: number | string;
	borderBottom?: number | string;
	borderImage?: string;
	borderImageSource?: string;
	borderImageSlice?: string | number;
	borderImageOutset?: string | number;
	borderImageRepeat?: string;
	borderImageWidth?: number | string;
	opacity?: number;
	color?: ThreeColor | THREE.Vector4;
	fontFamily?: string;
	fontSize?: number | string;
	fontStyle?: string;
	fontWeight?: number | string;
	textAlign?: string;
	textTransform?: string;
	textDecoration?: string;
	letterSpacing?: string;
	textIndent?: number | string;
	textJustify?: string;
	textSizeAdjust?: string;
	whiteSpace?: string;
	wordBreak?: string;
	wordSpacing?: string;
	change?: (e?: any) => void;
	click?: (e?: any) => void;
	dblclick?: (e?: any) => void;
	focus?: (e?: any) => void;
	keyup?: (e?: any) => void;
	keydown?: (e?: any) => void;
	load?: (e?: any) => void;
	select?: (e?: any) => void;
	mousedown?: (e?: any) => void;
	mouseout?: (e?: any) => void;
	mouseover?: (e?: any) => void;
	mousemove?: (e?: any) => void;
	mouseup?: (e?: any) => void;
	innerHtml?: string;
	innerText?: string;
	className?: string;
	transform?: string | string[];
	transformOrigin?: string;
}

/**
 * Injectable
 * @template T
 */
@Injectable()
export abstract class BaseComponent<T> implements OnInit, AfterViewInit {
	/**
	 * Controls  of base component
	 */
	public controls: T & GuiBaseControl;

	/**
	 * Controls params of base component
	 */
	public controlsParams: GuiControlParam[];

	/**
	 * Creates an instance of base component.
	 * @param controls
	 * @param [controlsParams]
	 */
	constructor(controls: T, controlsParams: GuiControlParam[] = []) {
		this.controls = ThreeUtil.getControls(controls, this);
		this.setControlsParams(controlsParams);
	}

	/**
	 * Sets controls params
	 * @param [controlsParams]
	 */
	public setControlsParams(controlsParams: GuiControlParam[] = []) {
		this.controlsParams = ThreeUtil.getControlsParams(controlsParams, this);
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of a component's view.
	 * It is invoked only once when the view is instantiated.
	 */
	ngAfterViewInit(): void {
		this.controls.meshRotate.applyAutoRotate();
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		if (this._subscribe !== null) {
			for (let key in this._subscribe) {
				this._subscribe[key].unsubscribe();
			}
			this._subscribe = {};
		}
	}

	/**
	 * Log time seqn of base component
	 */
	private _logTimeSeqn: number = 0;

	/**
	 * Consoles log time
	 * @param key
	 * @param object
	 * @param [repeat]
	 */
	protected consoleLogTime(key: string, object: any, repeat: number = 300): void {
		this._logTimeSeqn++;
		if (this._logTimeSeqn % repeat === 0) {
			this.consoleLog(key, object, 'info');
		}
	}

	/**
	 * Consoles log
	 * @param key
	 * @param object
	 * @param [level]
	 */
	protected consoleLog(key: string, object: any, level: string = 'log'): void {
		switch (level) {
			case 'error':
				console.error(key, object);
				break;
			case 'info':
				console.info(key, object);
				break;
			case 'trace':
				console.trace(key, object);
				break;
			case 'log':
			default:
				// console.log(key, object);
				break;
		}
	}

	/**
	 * Subscribe  of base component
	 */
	private _subscribe: { [key: string]: Subscription } = {};

	/**
	 * subscribe refer
	 * @param key
	 */
	protected unSubscribeRefer(key: string) {
		if (ThreeUtil.isNotNull(this._subscribe[key])) {
			this._subscribe[key].unsubscribe();
			delete this._subscribe[key];
		}
	}

	/**
	 * Subscribes refer
	 * @param key
	 * @param subscription
	 */
	protected subscribeRefer(key: string, subscription: Subscription) {
		if (ThreeUtil.isNotNull(this._subscribe[key])) {
			this.unSubscribeRefer(key);
		}
		if (ThreeUtil.isNotNull(subscription)) {
			this._subscribe[key] = subscription;
		}
	}

	/**
	 * Renderer  of base component
	 */
	public renderer: RendererComponent = null;

	/**
	 * Sets render
	 * @param renderer
	 */
	public setRender(renderer: RendererComponent) {
		this.renderer = renderer;
	}

	/**
	 * Scene  of base component
	 */
	public scene: SceneComponent = null;

	/**
	 * Sets scene
	 * @param scene
	 */
	public setScene(scene: SceneComponent) {
		this.scene = scene;
	}

	/**
	 * Camera  of base component
	 */
	public camera: CameraComponent = null;

	/**
	 * Sets camera
	 * @param camera
	 */
	public setCamera(camera: CameraComponent) {
		this.camera = camera;
	}

	/**
	 * Mesh  of base component
	 */
	public mesh: MeshComponent = null;

	/**
	 * Mesh object3d of base component
	 */
	public meshObject3d: THREE.Object3D = null;

	/**
	 * Mesh children of base component
	 */
	protected meshChildren: THREE.Object3D[] = null;

	/**
	 * Updates gui controller
	 */
	protected updateGuiController() {
		if (this.mesh !== null) {
			const position = this.mesh.getPosition();
			this.controls.meshPositionOrg = {
				x: position.x,
				y: position.y,
				z: position.z,
			};
			this.controls.meshPosition.x = this.controls.meshPositionOrg.x;
			this.controls.meshPosition.y = this.controls.meshPositionOrg.y;
			this.controls.meshPosition.z = this.controls.meshPositionOrg.z;
			const scale = this.mesh.getScale();
			this.controls.meshScaleOrg = {
				x: scale.x,
				y: scale.y,
				z: scale.z,
			};
			this.controls.meshScale.x = this.controls.meshScaleOrg.x;
			this.controls.meshScale.y = this.controls.meshScaleOrg.y;
			this.controls.meshScale.z = this.controls.meshScaleOrg.z;
			const rotation = this.mesh.getRotation();
			this.controls.meshRotateOrg = {
				x: (rotation.x / Math.PI) * 180,
				y: (rotation.y / Math.PI) * 180,
				z: (rotation.z / Math.PI) * 180,
			};
			this.controls.meshRotate.x = this.controls.meshRotateOrg.x;
			this.controls.meshRotate.y = this.controls.meshRotateOrg.y;
			this.controls.meshRotate.z = this.controls.meshRotateOrg.z;
			if (this.controls.meshScale.x !== 1) {
				const controlsParams = ThreeUtil.getGuiControlParam(this.controlsParams, 'Mesh Scale');
				const minScale = this.controls.meshScale.x * 0.01;
				const maxScale = this.controls.meshScale.x * 1.5;
				const stepScale = (maxScale - minScale) / 30;
				controlsParams.children.forEach((child) => {
					if (ThreeUtil.isNotNull(child.controller['min'])) {
						child.controller['min'](minScale);
					}
					if (ThreeUtil.isNotNull(child.controller['max'])) {
						child.controller['max'](maxScale);
					}
					if (ThreeUtil.isNotNull(child.controller['step'])) {
						child.controller['step'](stepScale);
					}
				});
			}
			const controlsParams = ThreeUtil.getGuiControlParam(this.controlsParams, 'Mesh Visible');
			if (ThreeUtil.isNotNull(controlsParams) && ThreeUtil.isNotNull(this.controls.meshShape)) {
				this.controls.meshShape.visible = this.mesh.getObject3d().visible;
				const helperParams = ThreeUtil.getGuiControlParam(controlsParams.children, 'helperVisible');
				const helper = this.mesh.helperComponent;
				if (helperParams && helperParams.controller) {
					if (ThreeUtil.isNotNull(helper)) {
						if (helper instanceof THREE.SkeletonHelper) {
							helperParams.controller.name('Skeleton');
						} else {
							helperParams.controller.name('Helper');
						}
						this.controls.meshShape.helperVisible = helper.visible;
						ThreeUtil.setGuiEnabled(helperParams.controller, true);
					} else {
						this.controls.meshShape.helperVisible = false;
						helperParams.controller.name('Not Supported');
						ThreeUtil.setGuiEnabled(helperParams.controller, false);
					}
				} else {
					console.log(helperParams);
				}
			}
		}
	}

	/**
	 * Sets mesh
	 * @param mesh
	 */
	public setMesh(mesh: MeshComponent) {
		this.mesh = mesh;
		if (this.mesh !== null) {
			this.meshObject3d = this.mesh.getObject3d();
			this.meshChildren = this.meshObject3d.children;
			window.setTimeout(() => {
				this.updateGuiController();
			}, 100);
		}
	}

	/**
	 * Determines whether render on
	 * @param timer
	 */
	public onRender(timer: RendererTimer) {
		ThreeUtil.getControlsOnRender(timer, this);
	}
}

/**
 * Three util
 */
export class ThreeUtil {
	/**
	 * Css inject
	 *
	 * @param cssContent
	 * @param [id]
	 * @param [indoc]
	 * @returns true if inject
	 */
	public static cssInject(cssContent: string, id?: string, indoc?: any): boolean {
		const doc: Document = indoc || document;
		let cssParent: HTMLElement = doc.getElementsByTagName('head')[0];
		if (cssParent === null || cssParent == undefined) {
			cssParent = doc.getElementsByTagName('body')[0];
		}
		if (cssParent !== null && cssParent !== undefined) {
			if (id !== null && id !== undefined) {
				const oldcss = doc.getElementById(id);
				if (oldcss !== null && oldcss !== undefined) {
					oldcss.parentElement.removeChild(oldcss);
				}
			} else {
			}
			try {
				const injected = document.createElement('style');
				injected.type = 'text/css';
				if (id !== null && id !== undefined) {
					injected.id = id;
				}
				injected.innerHTML = cssContent;
				cssParent.appendChild(injected);
				return true;
			} catch (e) {}
		}
		return false;
	}

	/**
	 * Css eject
	 *
	 * @param id
	 * @param [indoc]
	 * @returns true if eject
	 */
	public static cssEject(id: string, indoc?: any): boolean {
		const doc: Document = indoc || document;
		const oldcss = doc.getElementById(id);
		if (oldcss !== null && oldcss !== undefined) {
			oldcss.parentElement.removeChild(oldcss);
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Makes uuid
	 *
	 * @param len
	 * @param [pre]
	 * @returns
	 */
	public static makeUUID(len: number, pre?: string) {
		var result = '';
		var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
		var maxLen = characters.length;
		for (var i = 0; i < len; i++) {
			result += characters.charAt(Math.floor(Math.random() * maxLen));
		}
		return (pre ? pre : 'tmp') + '_' + result;
	}

	/**
	 * Camels case to dash
	 *
	 * @param myStr
	 * @returns
	 */
	public static camelCaseToDash(myStr) {
		return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
	}

	/**
	 * Removes css style
	 * @param ele
	 * @param [clazzName]
	 * @returns true if css style
	 */
	public static removeCssStyle(ele: HTMLElement, clazzName?: string): boolean {
		if (this.isNotNull(clazzName)) {
			this.cssEject(clazzName);
			if (ele.classList.contains(clazzName)) {
				ele.classList.remove(clazzName);
			}
			if (this.isNotNull(this._elementEvents[clazzName])) {
				const eleEvents = this._elementEvents[clazzName];
				Object.entries(eleEvents).forEach(([key, value]) => {
					ele.removeEventListener(key, value, false);
				});
				delete this._elementEvents[clazzName];
			}
		}
		return true;
	}

	/**
	 * Toggles css style
	 * @param ele
	 * @param [clazzName]
	 * @param [isActive]
	 * @returns true if css style
	 */
	public static toggleCssStyle(ele: HTMLElement, clazzName?: string, isActive?: boolean): boolean {
		if (this.isNotNull(clazzName)) {
			if (!isActive) {
				if (ele.classList.contains(clazzName)) {
					ele.classList.remove(clazzName);
				}
				if (this.isNotNull(this._elementEvents[clazzName])) {
					const eleEvents = this._elementEvents[clazzName];
					Object.entries(eleEvents).forEach(([key, value]) => {
						ele.removeEventListener(key, value, false);
					});
				}
			} else {
				if (!ele.classList.contains(clazzName)) {
					ele.classList.add(clazzName);
				}
				if (this.isNotNull(this._elementEvents[clazzName])) {
					const eleEvents = this._elementEvents[clazzName];
					Object.entries(eleEvents).forEach(([key, value]) => {
						ele.addEventListener(key, value, false);
					});
				}
			}
		}
		return true;
	}

	/**
	 * Gets child element save
	 * @param parentEle
	 * @returns child element save
	 */
	public static getChildElementSave(parentEle: HTMLElement): HTMLElement {
		const ele: Node = parentEle.cloneNode(true);
		const childNodes: Node[] = [];
		ele.childNodes.forEach((child) => {
			childNodes.push(child);
		});
		childNodes.forEach((child) => {
			switch (child.nodeType) {
				case Node.ELEMENT_NODE:
					const childEle: HTMLElement = child as HTMLElement;
					switch (childEle.tagName) {
						case 'P':
						case 'DIV':
						case 'FONT':
						case 'SPAN':
						case 'IMG':
						case 'I':
						case 'B':
						case 'STRONG':
						case 'IFRAME':
						case 'H1':
						case 'H2':
						case 'H3':
						case 'H4':
						case 'H5':
							break;
						default:
							ele.removeChild(childEle);
							break;
					}
					break;
				default:
					break;
			}
		});
		return ele as HTMLElement;
	}

	/**
	 * Adds css style
	 * @param ele
	 * @param styles
	 * @param [clazzName]
	 * @param [classPrefix]
	 * @param [vertualClass]
	 * @returns css style
	 */
	public static addCssStyle(ele: HTMLElement, styles: string | CssStyle, clazzName?: string, classPrefix?: string, vertualClass?: string): string {
		if (clazzName === null || clazzName === undefined) {
			clazzName = this.makeUUID(15, classPrefix);
		}
		if (typeof styles == 'string') {
			styles = {
				innerHtml: styles,
			};
		}
		if (styles === null || styles === undefined) {
			styles = {};
		}

		const eventList: { [key: string]: (e?: any) => void } = {};
		const styleList: { [key: string]: string } = {};

		Object.entries(styles).forEach(([key, value]) => {
			if (this.isNotNull(value)) {
				switch (key) {
					case 'change':
					case 'click':
					case 'dblclick':
					case 'focus':
					case 'keyup':
					case 'keydown':
					case 'load':
					case 'select':
					case 'mousedown':
					case 'mouseout':
					case 'mouseover':
					case 'mousemove':
					case 'mouseup':
						if (typeof value === 'function') {
							eventList[key] = value;
						} else {
							eventList[key] = null;
						}
						break;
					case 'src':
						if (ele instanceof HTMLImageElement || ele instanceof HTMLIFrameElement || ele instanceof HTMLVideoElement || ele instanceof HTMLAudioElement) {
							ele.src = ThreeUtil.getStoreUrl(value);
						}
						break;
					case 'draggable':
						ele.draggable = value;
						break;
					case 'innerHtml':
					case 'innerHTML':
						ele.innerHTML = value;
						break;
					case 'innerText':
						ele.innerText = value;
						break;
					case 'textContent':
						ele.textContent = value;
						break;
					case 'zIndex':
					case 'opacity':
					case 'borderImageSlice':
						if (typeof value == 'number') {
							styleList[key] = value.toString();
						} else if (typeof value == 'string') {
							styleList[key] = parseFloat(value).toString();
						}
						break;
					case 'transition':
						if (typeof value === 'string' && value != '') {
							styleList[key] = value;
						} else if (value instanceof Array && value.length > 0) {
							styleList[key] = value.join(', ');
						}
						break;
					case 'color':
					case 'background':
					case 'backgroundColor':
					case 'borderColor':
						if (typeof value == 'number' || typeof value == 'string') {
							if (typeof value == 'string' && (value.indexOf('rgba') > -1 || value.indexOf('rgb') > -1 || value.indexOf('#') > -1)) {
								styleList[key] = value;
							} else {
								styleList[key] = this.getColorSafe(value).getStyle();
							}
						} else if (value instanceof THREE.Color) {
							styleList[key] = value.getStyle();
						} else if (value instanceof THREE.Vector4) {
							styleList[key] = 'rgba(' + value.x * 255 + ',' + value.y * 255 + ',' + value.z * 255 + ',' + value.w + ')';
						}
						break;
					case 'transform':
						if (value instanceof Array) {
							if (value.length > 0) {
								styleList[key] = value.join(' ');
							}
						} else if (typeof value == 'string' && value !== '') {
							styleList[key] = value;
						}
						break;
					case 'backgroundImage':
					case 'borderImageSource':
						styleList[key] = 'url(' + value + ')';
						break;
					case 'content':
						if (typeof value == 'string' && value !== '') {
							styleList[key] = "'" + value + "'";
						}
						break;
					case 'position':
					case 'pointerEvents':
					case 'overflow':
					case 'width':
					case 'height':
					case 'minWidth':
					case 'minHeight':
					case 'maxWidth':
					case 'maxHeight':
					case 'left':
					case 'right':
					case 'top':
					case 'bottom':
					case 'borderWidth':
					case 'borderRadius':
					case 'backgroundRepeat':
					case 'backgroundRepeatX':
					case 'backgroundRepeatY':
					case 'backgroundPosition':
					case 'backgroundPositionX':
					case 'backgroundPositionY':
					case 'backgroundSize':
					case 'backgroundSizeX':
					case 'backgroundSizeY':
					case 'backgroundClip':
					case 'padding':
					case 'paddingLeft':
					case 'paddingTop':
					case 'paddingRight':
					case 'paddingBottom':
					case 'margin':
					case 'marginLeft':
					case 'marginTop':
					case 'marginRight':
					case 'marginBottom':
					case 'border':
					case 'borderStyle':
					case 'borderLeft':
					case 'borderTop':
					case 'borderRight':
					case 'borderBottom':
					case 'borderImage':
					case 'borderImageOutset':
					case 'borderImageRepeat':
					case 'borderImageWidth':
					case 'fontFamily':
					case 'fontSize':
					case 'fontStyle':
					case 'fontWeight':
					case 'textAlign':
					case 'textTransform':
					case 'textDecoration':
					case 'letterSpacing':
					case 'textIndent':
					case 'textJustify':
					case 'textSizeAdjust':
					case 'whiteSpace':
					case 'wordBreak':
					case 'wordSpacing':
					case 'transformOrigin':
						if (typeof value == 'number') {
							styleList[key] = value + 'px';
						} else if (typeof value == 'string') {
							styleList[key] = value;
						}
						break;
				}
			}
		});
		switch (vertualClass) {
			case 'inline':
				// ele.removeAttribute('style');
				Object.entries(styleList).forEach(([key, value]) => {
					ele.style[key] = value;
				});
				if (this.isNotNull(styles.className)) {
					ele.className = styles.className;
				}
				break;
			default:
				const cssStyleList: string[] = [];
				Object.entries(styleList).forEach(([key, value]) => {
					cssStyleList.push(this.camelCaseToDash(key) + ': ' + value);
				});
				this.cssInject('.' + clazzName + (vertualClass ? ':' + vertualClass : '') + '{' + cssStyleList.join(';') + '}', clazzName);
				if (!ele.classList.contains(clazzName)) {
					ele.classList.add(clazzName);
				}
				break;
		}
		if (eventList != {}) {
			let eleEvents: { [key: string]: any } = null;
			if (this.isNotNull(this._elementEvents[clazzName])) {
				eleEvents = this._elementEvents[clazzName];
			} else {
				eleEvents = this._elementEvents[clazzName] = {};
			}
			Object.entries(eventList).forEach(([key, value]) => {
				const oldEvent = eleEvents[key];
				if (this.isNotNull(value) && oldEvent !== value) {
					if (this.isNotNull(oldEvent)) {
						ele.removeEventListener(key, oldEvent, false);
					}
					ele.addEventListener(key, value, false);
					eleEvents[key] = value;
				} else if (this.isNull(value) && this.isNotNull(oldEvent)) {
					ele.removeEventListener(key, oldEvent, false);
					delete eleEvents[key];
				}
			});
			this._elementEvents[clazzName] = eleEvents;
		}
		return clazzName;
	}

	/**
	 * Element events of three util
	 */
	private static _elementEvents: { [key: string]: { [key: string]: any } } = {};

	/**
	 * Gets chroma scale
	 * @param scales
	 * @returns chroma scale
	 */
	public static getChromaScale(...scales): CHROMA.Scale {
		return CHROMA.scale(scales);
	}

	/**
	 * Last renderer of three util
	 */
	public static lastRenderer: any = null;

	/**
	 * Sets renderer
	 * @param lastRenderer
	 */
	public static setRenderer(lastRenderer: any) {
		this.lastRenderer = lastRenderer;
	}

	/**
	 * Gets renderer
	 * @returns renderer
	 */
	public static getRenderer(): THREE.Renderer {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.getRenderer();
		} else {
			return new THREE.WebGLRenderer();
		}
	}

	/**
	 * Gets renderer size
	 * @returns renderer size
	 */
	public static getRendererSize(): THREE.Vector2 {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.getSize();
		} else {
			return new THREE.Vector2(1024, 1024);
		}
	}

	/**
	 * Gets size subscribe
	 * @returns size subscribe
	 */
	public static getSizeSubscribe(): Observable<THREE.Vector2> {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.sizeSubscribe();
		} else {
			return undefined;
		}
	}

	/**
	 * Gets update subscribe
	 * @returns update subscribe
	 */
	public static getUpdateSubscribe(): Observable<RendererTimer> {
		if (this.lastRenderer !== null) {
			return this.lastRenderer.updateSubscribe();
		} else {
			return undefined;
		}
	}

	/**
	 * Render timer of three util
	 */
	private static renderTimer: RendererTimer;

	/**
	 * Renders three util
	 * @param renderTimer
	 */
	public static render(renderTimer: RendererTimer) {
		if (this.renderTimer !== renderTimer) {
			this.renderTimer = renderTimer;
			// GSAP.update(renderTimer.elapsedTime * 1000);
			// TWEEN.update();
		}
	}

	/**
	 * Determines whether null is
	 * @param value
	 * @returns true if null
	 */
	public static isNull(value: any): boolean {
		return value === null || value === undefined;
	}

	/**
	 * Determines whether not null is
	 * @param value
	 * @returns true if not null
	 */
	public static isNotNull(value: any): boolean {
		return !this.isNull(value);
	}

	/**
	 * Determines whether array is
	 * @param value
	 * @returns true if array
	 */
	public static isArray(value: any): boolean {
		return Array.isArray(value);
	}

	/**
	 * Gets first
	 * @template T
	 * @param value
	 * @returns first
	 */
	public static getFirst<T>(value: T | T[]): T {
		if (Array.isArray(value)) {
			return value[0] || null;
		} else {
			return value;
		}
	}

	/**
	 * Determines whether index of is
	 * @template T
	 * @param data
	 * @param findMe
	 * @returns true if index of
	 */
	public static isIndexOf<T>(data: T[], findMe: T[] | T): boolean {
		if (Array.isArray(findMe)) {
			let result: boolean = false;
			findMe.forEach((txt) => {
				if (data.indexOf(txt) > -1) {
					result = true;
				}
			});
			return result;
		} else {
			return data.indexOf(findMe) > -1;
		}
	}

	/**
	 * Determines whether only index of is
	 * @template T
	 * @param data
	 * @param findMe
	 * @param [addedFindMe]
	 * @returns true if only index of
	 */
	public static isOnlyIndexOf<T>(data: T[], findMe: T[], addedFindMe?: T[]): boolean {
		if (data.length === 0) {
			return true;
		} else {
			if (this.isNotNull(addedFindMe)) {
				findMe = this.pushUniq(findMe, addedFindMe);
			}
			let result: boolean = true;
			data.forEach((txt) => {
				if (findMe.indexOf(txt) === -1) {
					result = false;
				}
			});
			return result;
		}
	}

	/**
	 * Pushs uniq
	 * @template T
	 * @param data
	 * @param addMe
	 * @returns uniq
	 */
	public static pushUniq<T>(data: T[], addMe: T[] | T): T[] {
		if (Array.isArray(addMe)) {
			addMe.forEach((obj) => {
				if (data.indexOf(obj) === -1) {
					data.push(obj);
				}
			});
		} else if (ThreeUtil.isNotNull(addMe)) {
			if (data.indexOf(addMe) === -1) {
				data.push(addMe);
			}
		}
		return data;
	}

	/**
	 * Gets store url
	 * @param url
	 * @returns
	 */
	public static setAssetUrl(url: string) {
		this.assetUrl = url.endsWith('/') ? url : url + '/';
	}

	/**
	 * Asset url
	 */
	private static assetUrl: string = 'assets/examples/';

	/**
	 * Gets store url
	 * 
	 * @param url
	 * @returns store url
	 */
	public static getStoreUrl(url: string) {
		if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://') || url.startsWith(this.assetUrl)) {
			return url;
		} else {
			return this.assetUrl + url;
		}
	}

	/**
	 * Manager  of three util
	 */
	private static _manager: THREE.LoadingManager = null;

	/**
	 * Gets loading manager
	 * @returns loading manager
	 */
	public static getLoadingManager(): THREE.LoadingManager {
		if (this._manager === null) {
			this._manager = new THREE.LoadingManager(
				() => {
					console.log('loaded');
				},
				(url: string, loaded: number, total: number) => {
					console.log(url, loaded, total);
				},
				(url: string) => {
					console.error(url);
				}
			);
			this._manager.addHandler(/\.dds$/i, new DDSLoader());
		}
		return this._manager;
	}

	/**
	 * Gets html code
	 * @param info
	 * @param [preTab]
	 * @returns html code
	 */
	public static getHtmlCode(info: TagAttributes, preTab: string = ''): string {
		const tag = info.tag;
		const attributes = info.attributes;
		const tags: string[] = [];
		tags.push(preTab + '<' + tag);
		attributes.forEach((attr) => {
			const key = attr.name;
			const value = attr.value;
			if (this.isNotNull(value)) {
				if (value instanceof THREE.Color) {
					tags.push(preTab + '\t[' + key + ']="\'#' + value.getHexString() + '\'"');
				} else if (typeof value == 'number') {
					if (Math.round(value) !== value) {
						tags.push(preTab + '\t[' + key + ']="' + parseFloat(value.toFixed(4)) + '"');
					} else {
						tags.push(preTab + '\t[' + key + ']="' + value + '"');
					}
				} else if (typeof value == 'string') {
					tags.push(preTab + '\t[' + key + ']="\'' + value + '\'"');
				}
			}
		});
		tags.push(preTab + '>');
		if (info.children && info.children.length > 0) {
			info.children.forEach((child) => {
				tags.push(this.getHtmlCode(child.getTagAttribute(info.options), preTab + '\t'));
			});
		}
		tags.push(preTab + '</' + tag + '>');
		return tags.join('\n');
	}

	/**
	 * Gets color
	 * @param color
	 * @returns color
	 */
	public static getColor(color: ThreeColor | { r: number; g: number; b: number }): THREE.Color {
		if (this.isNotNull(color)) {
			if (color instanceof THREE.Color) {
				return color;
			} else if (typeof color === 'string') {
				return this.getColorSafe(color, null);
			} else if (typeof color === 'object') {
				if (this.isNotNull(color.r) && this.isNotNull(color.g) && this.isNotNull(color.b)) {
					return new THREE.Color(color.r, color.g, color.b);
				}
			} else {
				return new THREE.Color(color);
			}
		}
		return undefined;
	}

	/**
	 * Gets color rgb
	 * @param r
	 * @param g
	 * @param b
	 * @param [color]
	 * @returns color rgb
	 */
	public static getColorRGB(r: number, g: number, b: number, color?: ThreeColor): THREE.Color {
		const colorObj = this.isNotNull(color) ? this.getColor(color) : new THREE.Color(0x000000);
		if (this.isNotNull(colorObj)) {
			return colorObj.setRGB(this.isNotNull(r) ? r : colorObj.r, this.isNotNull(g) ? g : colorObj.g, this.isNotNull(b) ? b : colorObj.b);
		}
		return undefined;
	}

	/**
	 * Gets color hsl
	 * @param [h]
	 * @param [s]
	 * @param [l]
	 * @param [color]
	 * @returns color hsl
	 */
	public static getColorHSL(h?: number, s?: number, l?: number, color?: ThreeColor): THREE.Color {
		const colorObj = this.isNotNull(color) ? this.getColor(color) : new THREE.Color(0x000000);
		if (this.isNotNull(colorObj)) {
			const hsl = colorObj.getHSL({ h: 0, s: 0, l: 0 });
			return colorObj.setHSL(this.isNotNull(h) ? h : hsl.h, this.isNotNull(s) ? s : hsl.s, this.isNotNull(l) ? l : hsl.l);
		}
		return undefined;
	}

	/**
	 * Gets color hex
	 * @param [color]
	 * @returns color hex
	 */
	public static getColorHex(color?: ThreeColor): number {
		const colorObj = this.getColor(color);
		if (this.isNotNull(colorObj)) {
			return colorObj.getHex();
		}
		return undefined;
	}

	/**
	 * Gets color hex string
	 * @param [color]
	 * @returns color hex string
	 */
	public static getColorHexString(color?: ThreeColor): string {
		const colorObj = this.getColor(color);
		if (this.isNotNull(colorObj)) {
			return colorObj.getHexString();
		}
		return undefined;
	}

	/**
	 * Gets color style
	 * @param [color]
	 * @returns color style
	 */
	public static getColorStyle(color?: ThreeColor): string {
		const colorObj = this.getColor(color);
		if (this.isNotNull(colorObj)) {
			return colorObj.getStyle();
		}
		return undefined;
	}

	/**
	 * Gets color multiply safe
	 * @param color
	 * @param [altColor]
	 * @param [multiply]
	 * @returns color multiply safe
	 */
	public static getColorMultiplySafe(color: ThreeColor, altColor?: ThreeColor, multiply?: number): THREE.Color {
		const safeColor = this.getColorSafe(color, altColor);
		if (this.isNotNull(safeColor) && this.isNotNull(multiply)) {
			safeColor.multiplyScalar(multiply);
			if (safeColor.r < 0 || safeColor.r > 1) {
				safeColor.r = Math.min(1, Math.max(0, safeColor.r));
			}
			if (safeColor.g < 0 || safeColor.g > 1) {
				safeColor.g = Math.min(1, Math.max(0, safeColor.g));
			}
			if (safeColor.b < 0 || safeColor.b > 1) {
				safeColor.b = Math.min(1, Math.max(0, safeColor.b));
			}
		}
		return safeColor;
	}

	/**
	 * Gets parse float
	 * @param value
	 * @param [max]
	 * @returns parse float
	 */
	public static getParseFloat(value: string, max: number = 1): number {
		if (/^(\+|\-|)[0-9]+(\.|)[0-9]*$/.test(value)) {
			return parseFloat(value);
		} else {
			switch (value.toLowerCase()) {
				case 'random':
				default:
					return Math.random() * max;
			}
		}
	}

	/**
	 * Determines whether not null is color
	 * @param color
	 * @returns true if not null
	 */
	public static isColor(color: any): boolean {
		if (color instanceof THREE.Color || typeof color === 'number') {
			return true;
		} else if (
			typeof color === 'string' &&
			(color.startsWith('rgb(') || color.startsWith('RGB(') || color.startsWith('color(') || color.startsWith('COLOR(') || color.startsWith('0x') || color.startsWith('hsl(') || color.startsWith('HSL(') || color.startsWith('#') || /^[a-z]{3,10}$/.test(color) || color.indexOf('random') >= 0)
		) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Gets color safe
	 * @param color
	 * @param [altColor]
	 * @param [nullColor]
	 * @returns color safe
	 */
	public static getColorSafe(color: ThreeColor, altColor?: ThreeColor, nullColor?: ThreeColor): THREE.Color {
		const defColor = this.isNotNull(color) ? color : this.isNotNull(altColor) ? altColor : nullColor;
		if (this.isNotNull(defColor)) {
			if (defColor instanceof THREE.Color) {
				return defColor;
			} else if (typeof defColor === 'string') {
				const colorStr: string = defColor;
				if (colorStr.startsWith('#')) {
					return new THREE.Color(colorStr);
				} else if (colorStr === 'random') {
					return new THREE.Color(Math.random() * 0xffffff);
				} else if (colorStr.startsWith('0x')) {
					return new THREE.Color(parseInt(colorStr, 16));
				} else if (colorStr.indexOf(':') > 0 || colorStr.indexOf('(') > 0) {
					let [type, val1, val2, val3] = (colorStr + ',,,')
						.replace('(', ',')
						.replace(')', ',')
						.replace(':', ',')
						.replace(/[^A-Za-z\-0-9\.,]/g, '')
						.split(',');
					switch (type.toLowerCase()) {
						case 'hsl':
							const h = this.getParseFloat(val1, 1);
							const s = this.getParseFloat(val2, 1);
							const l = this.getParseFloat(val3, 1);
							const tmp = new THREE.Color().setHSL(h, s, l);
							return tmp;
						case 'rgb':
							const r = this.getParseFloat(val1, 255);
							const g = this.getParseFloat(val2, 255);
							const b = this.getParseFloat(val3, 255);
							return new THREE.Color(r / 255, g / 255, b / 255);
						case 'color':
						case 'rgbf':
							return new THREE.Color(this.getParseFloat(val1, 1), this.getParseFloat(val2, 1), this.getParseFloat(val3, 1));
					}
				}
			}
			return new THREE.Color(defColor);
		}
		return undefined;
	}

	/**
	 * Gets color alpha safe
	 * @param color
	 * @param alpha
	 * @param [altColor]
	 * @returns color alpha safe
	 */
	public static getColorAlphaSafe(color: ThreeColor, alpha: number, altColor?: ThreeColor): THREE.Color | THREE.Vector4 {
		const defColor = this.getColorSafe(color, altColor);
		if (this.isNotNull(defColor)) {
			if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
				return new THREE.Vector4(defColor.r, defColor.g, defColor.b, alpha);
			} else {
				return defColor;
			}
		} else if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
			return new THREE.Vector4(0, 0, 0, alpha);
		}
		return undefined;
	}

	/**
	 * Gets type safe
	 * @template T
	 * @param value
	 * @param [altValue]
	 * @param [nullValue]
	 * @returns type safe
	 */
	public static getTypeSafe<T>(value: T, altValue?: T, nullValue?: T): T {
		const defValue = this.isNotNull(value) ? value : altValue;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (this.isNotNull(nullValue)) {
			return nullValue;
		} else {
			return undefined;
		}
	}

	/**
	 * Gets number safe
	 * @param num
	 * @param [altnum]
	 * @returns number safe
	 */
	public static getNumberSafe(num: number | string, altnum?: number): number {
		const defValue = this.getTypeSafe(num, altnum);
		if (this.isNotNull(defValue)) {
			if (typeof defValue === 'string') {
				if (defValue.startsWith('0x')) {
					return parseInt(defValue, 16);
				}
				return Math.random();
			} else {
				return defValue;
			}
		}
		return undefined;
	}

	/**
	 * Gets angle safe
	 * @param angle
	 * @param [altangle]
	 * @returns angle safe
	 */
	public static getAngleSafe(angle: number | string, altangle?: number): number {
		const defValue = this.getTypeSafe(angle, altangle);
		if (this.isNotNull(defValue)) {
			if (typeof angle === 'string') {
				return Math.random() * 2 * Math.PI;
			} else {
				return ((defValue as number) / 180) * Math.PI;
			}
		}
		return undefined;
	}

	/**
	 * Gets boolean safe
	 * @param bl
	 * @param [altbl]
	 * @returns true if boolean safe
	 */
	public static getBooleanSafe(bl: string | number | boolean, altbl?: string | number | boolean): boolean {
		const defValue = this.getTypeSafe(bl, altbl);
		if (typeof defValue === 'boolean') {
			return defValue;
		} else if (typeof defValue === 'string') {
			switch (defValue.toLowerCase()) {
				case '1':
				case 'y':
				case 'yes':
				case 'true':
				case 't':
				case 'on':
					return true;
				case '':
				case '0':
				case 'n':
				case 'no':
				case 'false':
				case 'f':
				case 'off':
					return false;
			}
		} else if (typeof defValue === 'number') {
			if (defValue > 0) {
				return true;
			} else {
				return false;
			}
		}
		return undefined;
	}

	/**
	 * Gets angle2 radian safe
	 * @param angle
	 * @param [altangle]
	 * @returns angle2 radian safe
	 */
	public static getAngle2RadianSafe(angle: number, altangle?: number): number {
		const defValue = this.getTypeSafe(angle, altangle);
		if (this.isNotNull(defValue)) {
			return (defValue / 180) * Math.PI;
		}
		return undefined;
	}

	/**
	 * Gets radian2 angle safe
	 * @param angle
	 * @param [altangle]
	 * @returns radian2 angle safe
	 */
	public static getRadian2AngleSafe(angle: number, altangle?: number): number {
		const defValue = this.getTypeSafe(angle, altangle);
		if (this.isNotNull(defValue)) {
			return (defValue / Math.PI) * 180;
		}
		return undefined;
	}

	/**
	 * Gets vector2 vsafe
	 * @param v2
	 * @param [altValue]
	 * @returns vector2 vsafe
	 */
	public static getVector2VSafe(v2: number[] | THREE.Vector2, altValue?: THREE.Vector2): THREE.Vector2 {
		if (v2 instanceof THREE.Vector2) {
			return v2;
		} else if (this.isNotNull(v2) && v2.length >= 2) {
			return this.getVector2Safe(v2[0], v2[1], altValue);
		}
		return undefined;
	}

	/**
	 * Gets vector2 safe
	 * @param x
	 * @param y
	 * @param [altValue]
	 * @param [v2]
	 * @param [isRequired]
	 * @returns vector2 safe
	 */
	public static getVector2Safe(x: number, y: number, altValue?: THREE.Vector2, v2?: number[] | THREE.Vector2, isRequired?: boolean): THREE.Vector2 {
		const defValue = this.isNotNull(x) || this.isNotNull(y) ? new THREE.Vector2(this.getTypeSafe(x, y), this.getTypeSafe(y, x)) : null;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (this.isNotNull(v2)) {
			return this.getVector2VSafe(v2, altValue);
		}
		if (this.isNotNull(altValue)) {
			return altValue;
		}
		if (isRequired) {
			return new THREE.Vector2();
		}
		return undefined;
	}

	/**
	 * Gets vector3 vsafe
	 * @param v3
	 * @param [altValue]
	 * @returns vector3 vsafe
	 */
	public static getVector3VSafe(v3: number[] | THREE.Vector3, altValue?: THREE.Vector3): THREE.Vector3 {
		if (v3 instanceof THREE.Vector3) {
			return v3;
		} else if (this.isNotNull(v3) && v3.length >= 3) {
			return this.getVector3Safe(v3[0], v3[1], v3[2], altValue);
		}
		return undefined;
	}

	/**
	 * Gets vector3 safe
	 * @param x
	 * @param y
	 * @param z
	 * @param [altValue]
	 * @param [v3]
	 * @param [isRequired]
	 * @returns vector3 safe
	 */
	public static getVector3Safe(x: number, y: number, z: number, altValue?: THREE.Vector3, v3?: number[] | THREE.Vector3, isRequired?: boolean): THREE.Vector3 {
		const defValue = this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z) ? new THREE.Vector3(this.getTypeSafe(x, y, z), this.getTypeSafe(y, z, x), this.getTypeSafe(z, x, y)) : null;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (this.isNotNull(v3)) {
			return this.getVector3VSafe(v3, altValue);
		}
		if (this.isNotNull(altValue)) {
			return altValue;
		}
		if (isRequired) {
			return new THREE.Vector3();
		}
		return undefined;
	}

	/**
	 * Gets matrix4 safe
	 * @param obj
	 * @param [matrixType]
	 * @returns matrix4 safe
	 */
	public static getMatrix4Safe(obj: THREE.Object3D, matrixType: string = 'maxtix'): THREE.Matrix4 {
		if (this.isNotNull(obj)) {
			switch (matrixType.toLowerCase()) {
				case 'projectionmatrixinverse':
					if (this.isNotNull(obj['projectionMatrixInverse'])) {
						return new THREE.Matrix4().copy(obj['projectionMatrixInverse']);
					}
					break;
				case 'projectionmatrix':
					if (this.isNotNull(obj['projectionMatrix'])) {
						return obj['projectionMatrix'];
					}
					break;
				case 'matrixworldinverse':
					if (this.isNotNull(obj['matrixWorldInverse'])) {
						return obj['matrixWorldInverse'];
					}
					break;
				case 'matrixworld':
					return obj.matrixWorld;
				case 'matrix':
				default:
					return obj.matrix;
			}
		}
		return new THREE.Matrix4();
	}

	/**
	 * Gets euler safe
	 * 
	 * @param x
	 * @param y
	 * @param z
	 * @param [altValue]
	 * @param [isRequired]
	 * @returns euler safe
	 */
	public static getEulerSafe(x: number | string, y: number | string, z: number | string, altValue?: THREE.Euler, isRequired?: boolean): THREE.Euler {
		const defValue = this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z) ? new THREE.Euler(this.getAngleSafe(this.getTypeSafe(x, y, z), 0), this.getAngleSafe(this.getTypeSafe(y, x, z), 0), this.getAngleSafe(this.getTypeSafe(z, x, y), 0)) : altValue;
		if (this.isNotNull(defValue)) {
			return defValue;
		}
		if (isRequired) {
			return new THREE.Euler(0, 0, 0);
		}
		return undefined;
	}

	/**
	 * Gets wrapping safe
   *
   * Notice - case insensitive.
   * 
	 * @see THREE.Wrapping
	 * @see THREE.RepeatWrapping - RepeatWrapping, Repeat
	 * @see THREE.MirroredRepeatWrapping - MirroredRepeatWrapping, MirroredRepeat
	 * @see THREE.ClampToEdgeWrapping - ClampToEdgeWrapping, ClampToEdge
	 * 
	 * @param baseWrap
	 * @param [altWrap]
	 * @param [def]
	 * @returns wrapping safe
	 */
	public static getWrappingSafe(baseWrap: string, altWrap?: string, def?: string): THREE.Wrapping {
		const wrap = this.getTypeSafe(baseWrap, altWrap, def || '');
		switch (wrap.toLowerCase()) {
			case 'wraprepeat':
			case 'repeatwrapping':
			case 'repeat':
				return THREE.RepeatWrapping;
			case 'mirroredrepeatwrapping':
			case 'mirroredrepeat':
				return THREE.MirroredRepeatWrapping;
			case 'clamptoedgewrapping':
			case 'clamptoedge':
				return THREE.ClampToEdgeWrapping;
			default:
				return undefined;
		}
	}

	/**
	 * Gets texture filter safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.TextureFilter
	 * @see THREE.NearestFilter               - NearestFilter, Nearest
	 * @see THREE.NearestMipmapNearestFilter  - NearestMipmapNearestFilter, nearestmipmapnearest
	 * @see THREE.NearestMipmapLinearFilter   - NearestMipmapLinearFilter, nearestmipmaplinear
	 * @see THREE.LinearMipmapNearestFilter   - LinearMipmapNearestFilter, linearmipmapnearest
	 * @see THREE.LinearMipmapLinearFilter    - LinearMipmapLinearFilter, linearmipmaplinear
	 * @see THREE.LinearFilter                - Linearfilter, linear
	 *
	 * @param baseFilter
	 * @param [altFilter]
	 * @param [def]
	 * @returns texture filter safe
	 */
	public static getTextureFilterSafe(baseFilter: string, altFilter?: string, def?: string): THREE.TextureFilter {
		const filter = this.getTypeSafe(baseFilter, altFilter, def || '');
		switch (filter.toLowerCase()) {
			case 'nearestfilter':
			case 'nearest':
				return THREE.NearestFilter;
			case 'nearestmipmapnearestfilter':
			case 'nearestmipmapnearest':
				return THREE.NearestMipmapNearestFilter;
			case 'nearestmipmaplinearfilter':
			case 'nearestmipmaplinear':
				return THREE.NearestMipmapLinearFilter;
			case 'linearmipmapnearestfilter':
			case 'linearmipmapnearest':
				return THREE.LinearMipmapNearestFilter;
			case 'linearmipmaplinearfilter':
			case 'linearmipmaplinear':
				return THREE.LinearMipmapLinearFilter;
			case 'linearfilter':
			case 'linear':
				return THREE.LinearFilter;
			default:
				return undefined;
		}
	}

	/**
	 * Which blending to use when displaying objects with this material. Default is {@link NormalBlending}.
	 * @default THREE.NormalBlending
   *
   * Notice - case insensitive.
   * 
	 * @param baseBlending
	 * @param [altBlending]
	 * @param [def]
	 * @returns blending safe
	 *
	 * @see THREE.NoBlending - NoBlending, No
	 * @see THREE.NormalBlending - NormalBlending, Normal
	 * @see THREE.AdditiveBlending - AdditiveBlending, Additive
	 * @see THREE.SubtractiveBlending - SubtractiveBlending, Subtractive
	 * @see THREE.MultiplyBlending - MultiplyBlending, Multiply
	 * @see THREE.CustomBlending - CustomBlending, Custom
	 *
	 */
	public static getBlendingSafe(baseBlending: string, altBlending?: string, def?: string): THREE.Blending {
		const blending = this.getTypeSafe(baseBlending, altBlending, def || '');
		switch (blending.toLowerCase()) {
			case 'noblending':
			case 'no':
				return THREE.NoBlending;
			case 'normalblending':
			case 'normal':
				return THREE.NormalBlending;
			case 'additiveblending':
			case 'additive':
				return THREE.AdditiveBlending;
			case 'subtractiveblending':
			case 'subtractive':
				return THREE.SubtractiveBlending;
			case 'multiplyblending':
			case 'multiply':
				return THREE.MultiplyBlending;
			case 'customblending':
			case 'custom':
				return THREE.CustomBlending;
		}
		return undefined;
	}

	/**
	 * Gets pixel format safe
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.PixelFormat
	 * @see THREE.AlphaFormat - AlphaFormat, Alpha
	 * @see THREE.RedFormat - RedFormat, Red
	 * @see THREE.RedIntegerFormat - RedIntegerFormat, RedInteger
	 * @see THREE.RGFormat - RGFormat, RG
	 * @see THREE.RGIntegerFormat - RGIntegerFormat, RGInteger
	 * @see THREE.RGBFormat - RGBFormat, RGB
	 * @see THREE.RGBIntegerFormat - RGBIntegerFormat, RGBInteger
	 * @see THREE.RGBAIntegerFormat - RGBAIntegerFormat, RGBAInteger
	 * @see THREE.LuminanceFormat - LuminanceFormat, Luminance
	 * @see THREE.LuminanceAlphaFormat - LuminanceAlphaFormat, LuminanceAlpha
	 * @see THREE.RGBEFormat - RGBEFormat, RGBE
	 * @see THREE.DepthFormat - DepthFormat, Depth
	 * @see THREE.DepthStencilFormat - DepthStencilFormat, DepthStencil
	 * @see THREE.RGBAFormat - RGBAFormat, RGBA
	 *
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns pixel format safe
	 */
	public static getPixelFormatSafe(baseFormat: string, altFormat?: string, def?: string): THREE.PixelFormat {
		const format = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (format.toLowerCase()) {
			case 'alphaformat':
			case 'alpha':
				return THREE.AlphaFormat;
			case 'redformat':
			case 'red':
				return THREE.RedFormat;
			case 'redintegerformat':
			case 'redinteger':
				return THREE.RedIntegerFormat;
			case 'rgformat':
			case 'rg':
				return THREE.RGFormat;
			case 'rgintegerformat':
			case 'rginteger':
				return THREE.RGIntegerFormat;
			case 'rgbformat':
			case 'rgb':
				return THREE.RGBFormat;
			case 'rgbintegerformat':
			case 'rgbinteger':
				return THREE.RGBIntegerFormat;
			case 'rgbaintegerformat':
			case 'rgbainteger':
				return THREE.RGBAIntegerFormat;
			case 'luminanceformat':
			case 'luminance':
				return THREE.LuminanceFormat;
			case 'luminancealphaformat':
			case 'luminancealpha':
				return THREE.LuminanceAlphaFormat;
			case 'rgbeformat':
			case 'rgbe':
				return THREE.RGBEFormat;
			case 'depthformat':
			case 'depth':
				return THREE.DepthFormat;
			case 'depthstencilformat':
			case 'depthstencil':
				return THREE.DepthStencilFormat;
			case 'rgbaformat':
			case 'rgba':
				return THREE.RGBAFormat;
			default:
				break;
		}
		return undefined;
	}

	/**
	 * Gets texture data type safe
   *
   * Notice - case insensitive.
   * 
	 * @see THREE.TextureDataType
	 * @see THREE.ByteType - ByteType, Byte
	 * @see THREE.ShortType - ShortType, Short
	 * @see THREE.UnsignedShortType - UnsignedShortType, UnsignedShort
	 * @see THREE.IntType - IntType, Int
	 * @see THREE.UnsignedIntType - UnsignedIntType, UnsignedInt
	 * @see THREE.FloatType - FloatType, Float
	 * @see THREE.HalfFloatType - HalfFloatType, HalfFloat
	 * @see THREE.UnsignedShort4444Type - UnsignedShort4444Type, UnsignedShort4444
	 * @see THREE.UnsignedShort5551Type - UnsignedShort5551Type, UnsignedShort5551
	 * @see THREE.UnsignedShort565Type - UnsignedShort565Type, UnsignedShort565
	 * @see THREE.UnsignedInt248Type - UnsignedInt248Type, UnsignedInt248
	 * @see THREE.UnsignedByteType - UnsignedByteType, UnsignedByte
	 * 
	 * @param baseFormat
	 * @param [altFormat]
	 * @param [def]
	 * @returns texture data type safe
	 */
	public static getTextureDataTypeSafe(baseFormat: string, altFormat?: string, def?: string): THREE.TextureDataType {
		const type = this.getTypeSafe(baseFormat, altFormat, def || '');
		switch (type.toLowerCase()) {
			case 'bytetype':
			case 'byte':
				return THREE.ByteType;
			case 'shorttype':
			case 'short':
				return THREE.ShortType;
			case 'unsignedshorttype':
			case 'unsignedshort':
				return THREE.UnsignedShortType;
			case 'inttype':
			case 'int':
				return THREE.IntType;
			case 'unsignedinttype':
			case 'unsignedint':
				return THREE.UnsignedIntType;
			case 'floattype':
			case 'float':
				return THREE.FloatType;
			case 'halffloattype':
			case 'halffloat':
				return THREE.HalfFloatType;
			case 'unsignedshort4444type':
			case 'unsignedshort4444':
				return THREE.UnsignedShort4444Type;
			case 'unsignedshort5551type':
			case 'unsignedshort5551':
				return THREE.UnsignedShort5551Type;
			case 'unsignedshort565type':
			case 'unsignedshort565':
				return THREE.UnsignedShort565Type;
			case 'unsignedint248type':
			case 'unsignedint248':
				return THREE.UnsignedInt248Type;
			case 'unsignedbytetype':
			case 'unsignedbyte':
				return THREE.UnsignedByteType;
			default:
				return undefined;
		}
	}

	/**
	 * Gets object3d
	 * @template T
	 * @param object3d
	 * @param [isRequired]
	 * @returns object3d
	 */
	public static getObject3d<T extends THREE.Object3D>(object3d: any, isRequired: boolean = true): T {
		if (object3d instanceof THREE.Object3D) {
			return object3d as T;
		} else if (this.isNotNull(object3d.getMesh)) {
			const mesh: THREE.Object3D = object3d.getMesh();
			if (mesh !== null && this.isNotNull(mesh.userData.refTarget)) {
				return mesh.userData.refTarget as T;
			} else {
				return mesh as T;
			}
		} else if (this.isNotNull(object3d.getLight)) {
			return object3d.getLight() as T;
		} else if (this.isNotNull(object3d.getHelper)) {
			return object3d.getHelper() as T;
		} else if (this.isNotNull(object3d.getAudio)) {
			return object3d.getAudio() as T;
		} else if (this.isNotNull(object3d.getCamera)) {
			return object3d.getCamera() as T;
		} else if (this.isNotNull(object3d.getScene)) {
			return object3d.getScene() as T;
		} else if (this.isNotNull(object3d.getObject3d)) {
			return object3d.getObject3d() as T;
		}
		if (!isRequired) {
			return null;
		}
		return new THREE.Object3D() as T;
	}

	/**
	 * Gets mesh find
	 * @param mesh
	 * @returns mesh find
	 */
	public static getMeshFind(mesh: any): THREE.Mesh {
		if (mesh instanceof THREE.Mesh) {
			return mesh;
		} else if (this.isNotNull(mesh.getHelper)) {
			mesh = mesh.getHelper();
		} else if (this.isNotNull(mesh.getMesh)) {
			mesh = mesh.getObject3d();
		} else if (this.isNotNull(mesh)) {
			mesh = this.getObject3d(mesh);
		}
		if (mesh instanceof THREE.Mesh) {
			return mesh;
		} else if (mesh instanceof THREE.Group) {
			let childMesh: THREE.Mesh = null;
			mesh.children.forEach((child) => {
				if (childMesh === null && child instanceof THREE.Mesh) {
					childMesh = child;
				}
			});
			if (childMesh !== null) {
				return childMesh;
			}
		}
		return null;
	}

	/**
	 * Gets mesh
	 * @param mesh
	 * @returns mesh
	 */
	public static getMesh(mesh: any): THREE.Mesh {
		const findedMesh = this.getMeshFind(mesh);
		if (findedMesh !== null) {
			return findedMesh;
		}
		return new THREE.Mesh();
	}

	/**
	 * Gets light
	 * @param light
	 * @returns light
	 */
	public static getLight(light: any): THREE.Light {
		if (light instanceof THREE.Light) {
			return light;
		} else if (this.isNotNull(light)) {
			const mesh = this.getObject3d(light);
			if (mesh instanceof THREE.Light) {
				return mesh;
			}
		}
		return new THREE.Light();
	}

	/**
	 * Gets material by type
	 * @param material
	 * @param [materialType]
	 * @returns material by type
	 */
	public static getMaterialByType(material: any, materialType?: string): THREE.Material {
		let matchedMat: THREE.Material = null;
		if (this.isNotNull(materialType) && materialType != '') {
			const matList = this.getMaterial(material);
			if (Array.isArray(matList)) {
				matList.forEach((mat) => {
					if (this.isNull(mat.userData.materialType) || materialType.toLowerCase() === mat.userData.materialType) {
						matchedMat = mat;
					}
				});
			} else if (this.isNull(matList.userData.materialType) || materialType.toLowerCase() === matList.userData.materialType) {
				matchedMat = matList;
			}
		} else {
			const matList = this.getMaterial(material);
			if (Array.isArray(matList)) {
				if (matList.length > 0) {
					matchedMat = matList[0];
				}
			} else {
				matchedMat = matList;
			}
		}
		return matchedMat;
	}

	/**
	 * Gets material
	 * @param material
	 * @returns material
	 */
	public static getMaterial(material: any): THREE.Material | THREE.Material[] {
		if (material instanceof THREE.Material) {
			return material;
		} else if (Array.isArray(material)) {
			return material;
		} else if (this.isNotNull(material.getMaterial)) {
			return material.getMaterial() as THREE.Material;
		} else if (this.isNotNull(material)) {
			const mesh = this.getObject3d(material);
			if (mesh instanceof THREE.Mesh) {
				if (this.isNotNull(material.material)) {
					return material.material;
				}
			}
		}
		return new THREE.Material();
	}

	/**
	 * Gets material one
	 * @param material
	 * @returns material one
	 */
	public static getMaterialOne(material: any): THREE.Material {
		const materialList = this.getMaterial(material);
		if (Array.isArray(materialList)) {
			if (materialList.length > 0) {
				materialList[0];
			}
		} else {
			return materialList;
		}
		return new THREE.Material();
	}

	/**
	 * Gets geometry
	 *
	 * @param geometry
	 * @returns geometry
	 */
	public static getGeometry(geometry: any): THREE.BufferGeometry {
		if (this.isNotNull(geometry)) {
			if (geometry instanceof THREE.BufferGeometry) {
				return geometry;
			} else if (this.isNotNull(geometry.getGeometry)) {
				return geometry.getGeometry();
			} else {
				const mesh = this.getObject3d(geometry);
				if (mesh instanceof THREE.Mesh) {
					if (this.isNotNull(mesh.geometry)) {
						return mesh.geometry;
					}
				}
			}
		}
		return new THREE.BufferGeometry();
	}

	/**
	 * Loaded component of three util
	 */
	private static loadedComponent: { [key: string]: any } = {};

	/**
	 * Sets three component
	 * @param key
	 * @param [object]
	 */
	public static setThreeComponent(key: string, object?: any) {
		if (this.isNotNull(object)) {
			this.loadedComponent[key] = object;
		} else {
			delete this.loadedComponent[key];
		}
	}

	/**
	 * Determines whether three component is
	 * @param object
	 * @param [key]
	 * @returns true if three component
	 */
	public static isThreeComponent(object: any, key: string = 'component'): boolean {
		if (this.isNotNull(object.getObject3d)) {
			return true;
		} else if (this.isNotNull(object.userData) && this.isNotNull(object.userData[key])) {
			return true;
		} else {
			return false;
		}
	}

	/**
	 * Gets three component
	 * @param object
	 * @returns three component
	 */
	public static getThreeComponent(object: any): any {
		if (this.isNotNull(object.getObject3d)) {
			return object;
		}
		if (this.isThreeComponent(object, 'component')) {
			if (this.isNotNull(this.loadedComponent[object.userData.component])) {
				return this.loadedComponent[object.userData.component];
			} else {
				console.log(object.userData.component, this.loadedComponent);
			}
		}
		return null;
	}

	/**
	 * Gets rigidbody component
	 * @param object
	 * @returns rigidbody component
	 */
	public static getRigidbodyComponent(object: any): any {
		if (this.isNotNull(object.getRigidBody)) {
			return object;
		}
		if (this.isThreeComponent(object, 'rigidBody')) {
			if (this.isNotNull(object.getUserData)) {
				const userData = object.getUserData();
				if (this.isNotNull(userData.rigidBody)) {
					return this.loadedComponent[userData.rigidBody] || null;
				}
			} else {
				return this.loadedComponent[object.userData.rigidBody] || null;
			}
		}
		return null;
	}

	/**
	 * Gets rigidbody
	 * @param object
	 * @returns rigidbody
	 */
	public static getRigidbody(object: any): Ammo.btRigidBody {
		const rigidbodyComponent = this.getRigidbodyComponent(object);
		if (rigidbodyComponent !== null && this.isNotNull(rigidbodyComponent.getRigidBody)) {
			const rigidBody = rigidbodyComponent.getRigidBody();
			if (this.isNotNull(rigidBody) && this.isNotNull(rigidBody.rigidBodies) && rigidBody.rigidBodies.length > 0) {
				return rigidBody.rigidBodies[0];
			}
		}
		return null;
	}

	/**
	 * Sets subscribe next
	 * @param object
	 * @param key
	 */
	public static setSubscribeNext(object: any, key: string | string[]) {
		if (this.isNotNull(object.setSubscribeNext)) {
			object.setSubscribeNext(key);
		} else if (this.isThreeComponent(object)) {
			const threeComponent = this.getThreeComponent(object);
			if (threeComponent === null) {
				console.log(threeComponent, object);
			}
			if (this.isNotNull(threeComponent)) {
				this.setSubscribeNext(threeComponent, key);
			} else {
				console.error(object);
			}
		} else {
			// console.error(object);
		}
	}

	/**
	 * Gets subscribe
	 * @param object
	 * @param callBack
	 * @param nextKey
	 * @returns subscribe
	 */
	public static getSubscribe(object: any, callBack: (key?: string) => void, nextKey: string): Subscription {
		if (this.isThreeComponent(object)) {
			const threeComponent = this.getThreeComponent(object);
			if (this.isNotNull(threeComponent.getSubscribe)) {
				object = threeComponent;
			}
		}
		if (this.isNotNull(object.getSubscribe)) {
			return (object.getSubscribe() as Observable<string[]>).subscribe((keyList: string[]) => {
				if (this.isNull(nextKey)) {
					callBack('anyevent');
				} else {
					switch (nextKey.toLowerCase()) {
						case 'lookat':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'position', 'lookat'])) {
								callBack('lookat');
							}
							break;
						case 'position':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'position'])) {
								callBack('position');
							}
							break;
						case 'rotation':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'rotation'])) {
								callBack('rotation');
							}
							break;
						case 'scale':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'scale'])) {
								callBack('scale');
							}
							break;
						case 'geometry':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'geometry', 'loaded'])) {
								callBack('geometry');
							}
							break;
						case 'material':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'material', 'loaded'])) {
								callBack('material');
							}
							break;
						case 'texture':
							if (this.isIndexOf(keyList, ['object3d', 'mesh', 'material', 'texture', 'loaded'])) {
								callBack('texture');
							}
							break;
						default:
							if (keyList.indexOf(nextKey.toLowerCase()) > -1) {
								callBack(nextKey);
							}
							break;
					}
				}
			});
		}
		return null;
	}

	/**
	 * Gets texture
	 * @param texture
	 * @param [refType]
	 * @param [isRequired]
	 * @returns texture
	 */
	public static getTexture(texture: any, refType: string = 'map', isRequired: boolean = true): THREE.Texture {
		if (texture instanceof THREE.Texture) {
			return texture;
		} else if (texture instanceof THREE.Object3D || this.isNotNull(texture.getObject3d)) {
			const pmremGenerator = new THREE.PMREMGenerator( this.getRenderer() as THREE.WebGLRenderer );
			return pmremGenerator.fromScene( texture instanceof THREE.Object3D ? texture : texture.getObject3d() ).texture;
		} else if (this.isNotNull(texture.getTexture)) {
			const foundTexture = texture.getTexture();
			if (!(foundTexture instanceof THREE.VideoTexture) || foundTexture.image.readyState > 0) {
				return foundTexture;
			}
		} else if (this.isNotNull(texture)) {
			const material = this.getMaterial(texture);
			if (Array.isArray(material) && material.length > 0) {
				const firstMaterial = material[0];
				if (this.isNotNull(firstMaterial[refType]) && firstMaterial[refType] instanceof THREE.Texture) {
					return firstMaterial[refType];
				}
			} else {
				if (this.isNotNull(material[refType]) && material[refType] instanceof THREE.Texture) {
					return material[refType];
				}
			}
		}
		if (!isRequired) {
			return null;
		}
		return new THREE.Texture();
	}

	/**
	 * Gets position
	 * @param position
	 * @returns position
	 */
	public static getPosition(position: any): THREE.Vector3 {
		if (this.isNotNull(position)) {
			if (position instanceof THREE.Vector3) {
				return position;
			} else if (Array.isArray(position) && position.length >= 3) {
				return this.getVector3Safe(position[0], position[1], position[2], null, null, true);
			} else if (this.isNotNull(position.getPosition)) {
				return position.getPosition() as THREE.Vector3;
			} else if (this.isNotNull(position.getLookAt)) {
				return position.getLookAt() as THREE.Vector3;
			} else if (this.isNotNull(position.x) && this.isNotNull(position.y) && this.isNotNull(position.z)) {
				return this.getVector3Safe(position.x, position.y, position.z, null, null, true);
			} else {
				const object3d = this.getObject3d(position);
				return object3d.position;
			}
		}
		return new THREE.Vector3();
	}

	/**
	 * Gets rotation
	 * @param rotation
	 * @returns rotation
	 */
	public static getRotation(rotation: any): THREE.Euler {
		if (this.isNotNull(rotation)) {
			if (rotation instanceof THREE.Euler) {
				return rotation;
			} else if (Array.isArray(rotation) && rotation.length >= 3) {
				return this.getEulerSafe(rotation[0], rotation[1], rotation[2], null, true);
			} else if (this.isNotNull(rotation.getRotation)) {
				return rotation.getRotation();
			} else if (this.isNotNull(rotation.x) && this.isNotNull(rotation.y) && this.isNotNull(rotation.z)) {
				if (this.isNotNull(rotation.isEuler) && rotation.isEuler) {
					return new THREE.Euler(rotation.x, rotation.y, rotation.z);
				} else {
					return this.getEulerSafe(rotation.x, rotation.y, rotation.z, null, true);
				}
			} else {
				const object3d = this.getObject3d(rotation);
				return object3d.rotation;
			}
		}
		return new THREE.Euler();
	}

	/**
	 * Gets scale
	 * @param scale
	 * @returns scale
	 */
	public static getScale(scale: any): THREE.Vector3 {
		if (this.isNotNull(scale)) {
			if (scale instanceof THREE.Vector3) {
				return scale;
			} else if (Array.isArray(scale) && scale.length >= 3) {
				return this.getVector3Safe(scale[0], scale[1], scale[2], null, null, true);
			} else if (this.isNotNull(scale.getScale)) {
				return scale.getScale() as THREE.Vector3;
			} else if (this.isNotNull(scale.x) && this.isNotNull(scale.y) && this.isNotNull(scale.z)) {
				return this.getVector3Safe(scale.x, scale.y, scale.z, null, null, true);
			} else {
				const object3d = this.getObject3d(scale);
				return object3d.scale;
			}
		}
		return new THREE.Vector3();
	}

	/**
	 * Gets look at
	 * @param lookat
	 * @returns look at
	 */
	public static getLookAt(lookat: any): THREE.Vector3 {
		if (this.isNotNull(lookat)) {
			if (lookat instanceof THREE.Vector3) {
				return lookat;
			} else if (Array.isArray(lookat) && lookat.length >= 3) {
				return this.getVector3Safe(lookat[0], lookat[1], lookat[2], null, null, true);
			} else if (this.isNotNull(lookat.getLookAt)) {
				return lookat.getLookAt() as THREE.Vector3;
			} else if (this.isNotNull(lookat.getPosition)) {
				return lookat.getPosition() as THREE.Vector3;
			} else if (this.isNotNull(lookat.x) && this.isNotNull(lookat.y) && this.isNotNull(lookat.z)) {
				return this.getVector3Safe(lookat.x, lookat.y, lookat.z, null, null, true);
			} else {
				return this.getObject3d(lookat).position;
			}
		}
		return new THREE.Vector3();
	}

	/**
	 * Determines whether texture loaded is
	 * @param texture
	 * @returns true if texture loaded
	 */
	public static isTextureLoaded(texture: THREE.Texture): boolean {
		if (texture instanceof THREE.CubeTexture || texture['isCubeTexture']) {
			if (this.isNotNull(texture.image) && texture.image.length === 6) {
				return true;
			}
		}
		if (texture instanceof THREE.DataTexture || texture['isDataTexture']) {
			if (this.isNotNull(texture.image) && this.isNotNull(texture.image.data) && texture.image.data.length > 0) {
				return true;
			}
		} else if (texture instanceof THREE.VideoTexture || texture['isVideoTexture']) {
			if (this.isNotNull(texture.image) && texture.image instanceof HTMLVideoElement && texture.image.error === null) {
				return true;
			}
		} else if (texture instanceof THREE.Texture && this.isNotNull(texture.image)) {
			if (texture.image instanceof HTMLImageElement || texture.image instanceof HTMLCanvasElement || texture.image instanceof HTMLVideoElement) {
				return true;
			}
			if (Array.isArray(texture.image) && texture.image.length >= 6) {
				return true;
			}
			if (ThreeUtil.isNotNull(texture.image.data) && texture.image.data.length > 0) {
				return true;
			}
		}
		return false;
	}

	/**
	 * Gets texture encoding safe
   *
   * Notice - case insensitive.
   * 
	 * @see THREE.TextureEncoding
	 * @see THREE.sRGBEncoding - sRGBEncoding, sRGB
	 * @see THREE.GammaEncoding - GammaEncoding, Gamma
	 * @see THREE.RGBEEncoding - RGBEEncoding, RGBE
	 * @see THREE.LogLuvEncoding - LogLuvEncoding, LogLuv
	 * @see THREE.RGBM7Encoding - RGBM7Encoding, RGBM7
	 * @see THREE.RGBM16Encoding - RGBM16Encoding, RGBM16
	 * @see THREE.RGBDEncoding - RGBDEncoding, RGBD
	 * @see THREE.LinearEncoding - LinearEncoding, Linear
	 * 
	 * @param baseEncoding
	 * @param [altEncoding]
	 * @param [def]
	 * @returns texture encoding safe
	 */
	public static getTextureEncodingSafe(baseEncoding: string, altEncoding?: string, def?: string): THREE.TextureEncoding {
		const encoding = this.getTypeSafe(baseEncoding, altEncoding, def || '');
		switch (encoding.toLowerCase()) {
			case 'srgbencoding':
			case 'srgb':
				return THREE.sRGBEncoding;
			case 'gammaencoding':
			case 'gamma':
				return THREE.GammaEncoding;
			case 'rgbeencoding':
			case 'rgbe':
				return THREE.RGBEEncoding;
			case 'logluvencoding':
			case 'logluv':
				return THREE.LogLuvEncoding;
			case 'rgbm7encoding':
			case 'rgbm7':
				return THREE.RGBM7Encoding;
			case 'rgbm16encoding':
			case 'rgbm16':
				return THREE.RGBM16Encoding;
			case 'rgbdencoding':
			case 'rgbd':
				return THREE.RGBDEncoding;
			case 'linearencoding':
			case 'linear':
				return THREE.LinearEncoding;
			default:
				return undefined;
		}
	}

	/**
	 * Gets mapping safe
   *
   * Notice - case insensitive.
   * 
	 * @see THREE.Mapping
	 * @see THREE.UVMapping - UVMapping, UV
	 * @see THREE.CubeReflectionMapping - CubeReflectionMapping, CubeReflection
	 * @see THREE.CubeRefractionMapping - CubeRefractionMapping, CubeRefraction
	 * @see THREE.EquirectangularReflectionMapping - EquirectangularReflectionMapping, EquirectangularReflection
	 * @see THREE.EquirectangularRefractionMapping - EquirectangularRefractionMapping, EquirectangularRefraction
	 * @see THREE.CubeUVReflectionMapping - CubeUVReflectionMapping, CubeUVReflection
	 * @see THREE.CubeUVRefractionMapping - CubeUVRefractionMapping, CubeUVRefraction
	 * 
	 * @param baseMapping
	 * @param [altMapping]
	 * @param [def]
	 * @returns mapping safe
	 */
	public static getMappingSafe(baseMapping: string, altMapping?: string, def?: string): THREE.Mapping {
		const mapping = this.getTypeSafe(baseMapping, altMapping, def || '');
		switch (mapping.toLowerCase()) {
			case 'uvmapping':
			case 'uv':
				return THREE.UVMapping;
			case 'cubereflectionmapping':
			case 'cubereflection':
				return THREE.CubeReflectionMapping;
			case 'cuberefractionmapping':
			case 'cuberefraction':
				return THREE.CubeRefractionMapping;
			case 'equirectangularreflectionmapping':
			case 'equirectangularreflection':
				return THREE.EquirectangularReflectionMapping;
			case 'equirectangularrefractionmapping':
			case 'equirectangularrefraction':
				return THREE.EquirectangularRefractionMapping;
			case 'cubeuvreflectionmapping':
			case 'cubeuvreflection':
				return THREE.CubeUVReflectionMapping;
			case 'cubeuvrefractionmapping':
			case 'cubeuvrefraction':
				return THREE.CubeUVRefractionMapping;
			default:
				return THREE.Texture.DEFAULT_MAPPING;
		}
	}

	/**
	 * Gets cube image
	 * @param cubeImage
	 * @returns cube image
	 */
	public static getCubeImage(cubeImage: string[]): string[] {
		if (ThreeUtil.isNotNull(cubeImage) && cubeImage.length !== 6 && cubeImage.length >= 1) {
			const prefix = cubeImage[0];
			const postfix = cubeImage[1] || 'png';
			const prefix1 = cubeImage[2] || 'p';
			const prefix2 = cubeImage[3] || 'n';
			return [prefix + prefix1 + 'x.' + postfix, prefix + prefix2 + 'x.' + postfix, prefix + prefix1 + 'y.' + postfix, prefix + prefix2 + 'y.' + postfix, prefix + prefix1 + 'z.' + postfix, prefix + prefix2 + 'z.' + postfix];
		} else {
			return cubeImage;
		}
	}

	/**
	 * Gets clock
	 * @param [autoStart]
	 * @returns clock
	 */
	public static getClock(autoStart?: boolean): ThreeClock {
		return new ThreeClock(autoStart);
	}

	/**
	 * Stats  of three util
	 */
	public static stats: ThreeStats = null;

	/**
	 * Gets stats
	 * @param [style]
	 * @returns stats
	 */
	public static getStats(style?: object): ThreeStats {
		return new ThreeStats(style);
	}

	/**
	 * Gets controls
	 * @template T
	 * @param param
	 * @param component
	 * @returns controls
	 */
	public static getControls<T>(param: T, component: { mesh?: MeshComponent; controls?: any; controlsParams?: any }): T & GuiBaseControl {
		const baseControl: GuiBaseControl = {
			meshShape: {
				visible: true,
				helperVisible: false,
				wireframe: false,
			},
			meshRotate: {
				x: 0,
				y: 0,
				z: 0,
				autoRotate: false,
				speed: 10,
				reset: () => {
					if (this.isNotNull(component.controls) && this.isNotNull(component.controls.meshRotate) && this.isNotNull(component.controls.meshRotateOrg)) {
						component.controls.meshRotate.x = component.controls.meshRotateOrg.x;
						component.controls.meshRotate.y = component.controls.meshRotateOrg.y;
						component.controls.meshRotate.z = component.controls.meshRotateOrg.z;
						component.controls.meshRotate.autoRotate = true;
						component.controls.meshRotate.applyAutoRotate();
						component.controls.meshRotate.update();
					}
				},
				applyAutoRotate: () => {
					if (this.isNotNull(component.controlsParams)) {
						const controlsParams = this.getGuiControlParam(component.controlsParams, 'Mesh Rotation');
						if (this.isNotNull(controlsParams)) {
							if (component.controls.meshRotate.autoRotate) {
								this.setGuiEnabled(controlsParams.children[1].controller, false);
								this.setGuiEnabled(controlsParams.children[4].controller, true);
							} else {
								if (this.isNotNull(component.mesh)) {
									const meshRotate = component.mesh.getRotation();
									component.controls.meshRotate.x = ((meshRotate.x / Math.PI) * 180) % 360;
									component.controls.meshRotate.y = ((meshRotate.y / Math.PI) * 180) % 360;
									component.controls.meshRotate.z = ((meshRotate.z / Math.PI) * 180) % 360;
								}
								this.setGuiEnabled(controlsParams.children[1].controller, true);
								this.setGuiEnabled(controlsParams.children[4].controller, false);
							}
						}
					}
				},
				update: () => {
					if (this.isNotNull(component.mesh) && this.isNotNull(component.controls.meshRotate)) {
						component.mesh.setRotation(component.controls.meshRotate.x, component.controls.meshRotate.autoRotate ? null : component.controls.meshRotate.y, component.controls.meshRotate.z);
					}
				},
			},
			meshPosition: {
				x: 0,
				y: 0,
				z: 0,
				reset: () => {
					if (this.isNotNull(component.controls) && this.isNotNull(component.controls.meshPosition) && this.isNotNull(component.controls.meshPositionOrg)) {
						component.controls.meshPosition.x = component.controls.meshPositionOrg.x;
						component.controls.meshPosition.y = component.controls.meshPositionOrg.y;
						component.controls.meshPosition.z = component.controls.meshPositionOrg.z;
						component.controls.meshPosition.update();
					}
				},
				update: () => {
					if (this.isNotNull(component.mesh) && this.isNotNull(component.controls.meshPosition)) {
						component.mesh.setPosition(component.controls.meshPosition.x, component.controls.meshPosition.y, component.controls.meshPosition.z);
					}
				},
			},
			meshScale: {
				x: 1,
				y: 1,
				z: 1,
				reset: () => {
					if (this.isNotNull(component.controls) && this.isNotNull(component.controls.meshScale) && this.isNotNull(component.controls.meshScaleOrg)) {
						component.controls.meshScale.x = component.controls.meshScaleOrg.x;
						component.controls.meshScale.y = component.controls.meshScaleOrg.y;
						component.controls.meshScale.z = component.controls.meshScaleOrg.z;
						component.controls.meshScale.update();
					}
				},
				update: () => {
					if (this.isNotNull(component.mesh) && this.isNotNull(component.controls.meshScale)) {
						component.mesh.setScale(component.controls.meshScale.x, component.controls.meshScale.y, component.controls.meshScale.z);
					}
				},
			},
		};
		return Object.assign(param, baseControl);
	}

	/**
	 * Gets controls params
	 * @param params
	 * @param component
	 * @returns controls params
	 */
	public static getControlsParams(params: GuiControlParam[], component: { mesh?: MeshComponent; controls?: any; controlsParams?: any }): GuiControlParam[] {
		params.push({
			name: 'Mesh Visible',
			type: 'folder',
			control: 'meshShape',
			children: [
				{
					name: 'visible',
					type: 'checkbox',
					listen: true,
					change: () => {
						if (this.isNotNull(component.mesh)) {
							component.mesh.setVisible(component.controls.meshShape.visible, null);
						}
					},
				},
				{
					name: 'helperVisible',
					type: 'checkbox',
					listen: true,
					change: () => {
						if (this.isNotNull(component.mesh)) {
							component.mesh.setVisible(null, component.controls.meshShape.helperVisible);
						}
					},
				},
				{
					name: 'wireframe',
					type: 'checkbox',
					listen: true,
					change: () => {
						if (this.isNotNull(component.mesh)) {
							component.mesh.setWireFrame(component.controls.meshShape.wireframe);
						}
					},
				},
			],
			isOpen: false,
		});
		params.push({
			name: 'Mesh Rotation',
			type: 'folder',
			control: 'meshRotate',
			children: [
				{
					name: 'x',
					type: 'number',
					min: -360,
					max: 360,
					step: 5,
					listen: true,
					change: () => {
						component.controls.meshRotate.update();
					},
				},
				{
					name: 'y',
					type: 'number',
					min: -360,
					max: 360,
					step: 5,
					listen: true,
					change: () => {
						component.controls.meshRotate.update();
					},
				},
				{
					name: 'z',
					type: 'number',
					min: -360,
					max: 360,
					step: 5,
					listen: true,
					change: () => {
						component.controls.meshRotate.update();
					},
				},
				{
					name: 'autoRotate',
					type: 'checkbox',
					title: 'Auto Rotation',
					listen: true,
					change: () => {
						component.controls.meshRotate.applyAutoRotate();
					},
				},
				{
					name: 'speed',
					type: 'number',
					min: -90,
					max: 90,
					step: 1,
					listen: true,
					title: 'Auto DegPSec',
				},
				{ name: 'reset', type: 'button', title: 'Reset Rotation' },
			],
			isOpen: false,
		});
		params.push({
			name: 'Mesh Position',
			type: 'folder',
			control: 'meshPosition',
			children: [
				{
					name: 'x',
					type: 'number',
					min: -3,
					max: 3,
					step: 0.01,
					listen: true,
					change: () => {
						component.controls.meshPosition.update();
					},
				},
				{
					name: 'y',
					type: 'number',
					min: -3,
					max: 3,
					step: 0.01,
					listen: true,
					change: () => {
						component.controls.meshPosition.update();
					},
				},
				{
					name: 'z',
					type: 'number',
					min: -3,
					max: 3,
					step: 0.01,
					listen: true,
					change: () => {
						component.controls.meshPosition.update();
					},
				},
				{ name: 'reset', type: 'button', title: 'Reset Position' },
			],
			isOpen: false,
		});
		params.push({
			name: 'Mesh Scale',
			type: 'folder',
			control: 'meshScale',
			children: [
				{
					name: 'x',
					type: 'number',
					min: 0.001,
					max: 5,
					step: 0.001,
					listen: true,
					change: () => {
						component.controls.meshScale.update();
					},
				},
				{
					name: 'y',
					type: 'number',
					min: 0.001,
					max: 5,
					step: 0.001,
					listen: true,
					change: () => {
						component.controls.meshScale.update();
					},
				},
				{
					name: 'z',
					type: 'number',
					min: 0.001,
					max: 5,
					step: 0.001,
					listen: true,
					change: () => {
						component.controls.meshScale.update();
					},
				},
				{ name: 'reset', type: 'button', title: 'Reset Scale' },
			],
			isOpen: false,
		});
		return params;
	}

	/**
	 * Gets controls on render
	 * @param timer
	 * @param component
	 */
	public static getControlsOnRender(
		timer: RendererTimer,
		component: {
			mesh?: MeshComponent;
			controls?: GuiBaseControl;
			controlsParams?: any;
		}
	) {
		if (this.isNotNull(component.controls) && this.isNotNull(component.mesh)) {
			if (component.controls.meshRotate.autoRotate && component.controls.meshRotate.speed !== 0) {
				component.mesh.addRotation(0, component.controls.meshRotate.speed * timer.delta, 0);
			}
		}
	}

	/**
	 * Setups gui change
	 * @param control
	 * @param [onFinishChange]
	 * @param [onChange]
	 * @param [listen]
	 * @param [title]
	 * @returns gui change
	 */
	public static setupGuiChange(control: ThreeGuiController, onFinishChange?: (value?: any) => void, onChange?: (value?: any) => void, listen?: boolean, title?: string): ThreeGuiController {
		if (listen !== null && listen !== undefined && listen) {
			control.listen();
		}
		if (onFinishChange !== null && onFinishChange !== undefined) {
			control.onFinishChange(onFinishChange);
		}
		if (onChange !== null && onChange !== undefined) {
			control.onChange(onChange);
		}
		if (title !== null && title !== undefined) {
			control.name(title);
		}

		return control;
	}

	/**
	 * Sets gui enabled
	 * @param control
	 * @param [isEnable]
	 */
	public static setGuiEnabled(control: ThreeGuiController, isEnable: boolean = true) {
		if (control !== null && control !== undefined && control.domElement) {
			const parentElement = control.domElement.parentElement.parentElement;
			const previousElementSibling = control.domElement.previousElementSibling;
			if (isEnable) {
				if (parentElement) {
					parentElement.classList.remove('no-pointer-events');
				}
				if (previousElementSibling) {
					previousElementSibling.classList.remove('control-disabled');
				}
			} else {
				if (parentElement) {
					parentElement.classList.add('no-pointer-events');
				}
				if (previousElementSibling) {
					previousElementSibling.classList.add('control-disabled');
				}
			}
		} else {
			console.log('error', control);
		}
	}

	/**
	 * Gets gui control param
	 * @param children
	 * @param name
	 * @returns gui control param
	 */
	public static getGuiControlParam(children: GuiControlParam[], name: string): GuiControlParam {
		for (let i = 0; i < children.length; i++) {
			const child = children[i];
			if (child.name === name) {
				return child;
			}
			if (child.type === 'folder' && child.children && child.children.length > 0) {
				const foundChild = this.getGuiControlParam(child.children, name);
				if (foundChild !== null) {
					return foundChild;
				}
			}
		}
		return null;
	}

	/**
	 * Setups gui
	 * @param control
	 * @param gui
	 * @param params
	 * @returns gui
	 */
	public static setupGui(control, gui: ThreeGuiController, params: GuiControlParam[]): ThreeGuiController {
		params.forEach((param) => {
			const params = param.control ? control[param.control] : control;
			if (this.isNotNull(params)) {
				switch (param.type) {
					case 'color':
						param.controller = this.setupGuiChange(gui.addColor(params, param.name), param.finishChange, param.change, param.listen, param.title);
						break;
					case 'folder':
						const folder = gui.addFolder(param.name);
						param.controller = this.setupGui(params, folder, param.children);
						if (param.isOpen) {
							folder.open();
						}
						break;
					case 'number':
						param.controller = this.setupGuiChange(gui.add(params, param.name, param.min, param.max, param.step), param.finishChange, param.change, param.listen, param.title);
						break;
					case 'listen':
						param.controller = gui.add(params, param.name).listen();
						break;
					case 'select':
						param.controller = this.setupGuiChange(gui.add(params, param.name, param.select), param.finishChange, param.change, param.listen, param.title);
						break;
					case 'button':
					default:
						param.controller = this.setupGuiChange(gui.add(params, param.name), param.finishChange, param.change, param.listen, param.title);
						break;
				}
			}
		});
		return gui;
	}
}

/**
 * Renderer timer
 */
export interface RendererTimer {
	delta: number;
	elapsedTime: number;
	renderer?: THREE.Renderer;
	event?: RendererEvent;
}

/**
 * Renderer info
 */
export interface RendererInfo {
	timer: RendererTimer;
	innerWidth: number;
	innerHeight: number;
	renderer: THREE.Renderer;
	cssRenderer: any;
	cameras: THREE.Camera[];
	scenes: THREE.Scene[];
}

/**
 * Renderer event
 */
export interface RendererEvent {
	type: string;
	client?: THREE.Vector2;
	clientX?: number;
	clientY?: number;
	offset?: THREE.Vector2;
	offsetX?: number;
	offsetY?: number;
	rate?: THREE.Vector2;
	rateX?: number;
	rateY?: number;
	width?: number;
	height?: number;
	size?: THREE.Vector2;
	mouse?: THREE.Vector2;
	direction?: THREE.Vector2;
	keyInfo?: {
		code: string;
		ctrlKey: boolean;
		altKey: boolean;
		shiftKey: boolean;
		key: string;
		timeStamp: number;
		timeRepeat: number;
		xy: THREE.Vector2;
	};
	event: any;
}

/**
 * Three clock
 */
export class ThreeClock extends THREE.Clock {
	/**
	 * Gets timer
	 * @param renderer
	 * @param event
	 * @returns timer
	 */
	public getTimer(renderer: THREE.Renderer, event: RendererEvent): RendererTimer {
		const delta = this.getDelta();
		const elapsedTime = this.getElapsedTime();
		return {
			delta: delta,
			elapsedTime: elapsedTime,
			renderer: renderer,
			event: event,
		};
	}
}

/**
 * Three stats
 */
export class ThreeStats implements Stats {
	/**
	 * Revision  of three stats
	 */
	REVISION: number;

	/**
	 * Stats  of three stats
	 */
	stats: Stats = null;

	/**
	 * Dom  of three stats
	 */
	dom: HTMLDivElement;

	/**
	 * Dom element of three stats
	 */
	domElement: HTMLDivElement;

	/**
	 * Creates an instance of three stats.
	 * @param [style]
	 */
	constructor(style?: object) {
		this.stats = Stats();
		this.domElement = this.dom = this.stats.dom;
		this.REVISION = this.stats.REVISION;
		this.setStyle(style);
	}

	/**
	 * Sets style
	 * @param style
	 */
	public setStyle(style: object) {
		if (style !== null && style !== undefined) {
			Object.entries(style).forEach(([key, value]) => {
				this.stats.dom.style[key] = value;
			});
		}
	}

	/**
	 * Adds panel
	 * @param panel
	 * @returns panel
	 */
	public addPanel(panel: Stats.Panel): Stats.Panel {
		return this.stats.addPanel(panel);
	}

	/**
	 * Shows panel
	 * @param id
	 */
	showPanel(id: number): void {
		this.stats.showPanel(id);
	}

	/**
	 * Begins three stats
	 */
	begin(): void {
		this.stats.begin();
	}

	/**
	 * Ends three stats
	 */
	end(): void {
		this.stats.end();
	}

	/**
	 * Updates three stats
	 */
	update(): void {
		this.stats.update();
	}

	/**
	 * Sets mode
	 * @param id
	 */
	public setMode(id: number): void {
		this.stats.setMode(id);
	}
}

/**
 * Gui control param
 */
export interface GuiControlParam {
	/**
	 * The name of gui control 
	 */
	name: string;
	/**
	 * The type of gui control 
	 */
	type?: 'number' | 'folder' | 'select' | 'folder' | 'button' | 'color' | 'checkbox' | 'input' | 'listen' | 'auto';
	/**
	 * The min value of number type
	 */
	min?: number;
	/**
	 * The max value of number type
	 */
	max?: number;
	/**
	 * The step value of number type
	 */
	step?: number;
	/**
	 * The select value of select type
	 */
	select?: string[] | { [key: string]: any };
	control?: string;
	listen?: boolean;
	/**
	 * is opened in case folder
	 */
	isOpen?: boolean;
	/**
	 * The title of gui name
	 */
	title?: string;
	/**
	 * on change value trigger
	 */
	change?: (value?: any) => void;
	/**
	 * on change finish value trigger
	 */
	finishChange?: (value?: any) => void;
	/**
	 * The children of folder type
	 */
	children?: GuiControlParam[];
	/**
	 * The controller of gui
	 */
	controller?: ThreeGuiController;
}

/**
 * ThreeGeometryCustom
 */
@Component({
	template: '',
})
export abstract class ThreeGeometryCustom {
	/**
	 * Input  of three geometry custom
	 */
	@Input() scale: number = null;

	/**
	 * Geometry  of three geometry custom
	 */
	protected geometry: THREE.BufferGeometry = null;

	/**
	 * Inits geometry
	 * @returns geometry
	 */
	public initGeometry(): THREE.BufferGeometry {
		return new THREE.BufferGeometry();
	}

	/**
	 * Sets geometry
	 * @param geometry
	 */
	public setGeometry(geometry: THREE.BufferGeometry) {
		if (ThreeUtil.isNotNull(this.scale)) {
			const scale = ThreeUtil.getTypeSafe(this.scale, 1);
			geometry.scale(scale, scale, scale);
		}
		this.geometry = geometry;
	}

	/**
	 * Gets geometry
	 * @returns geometry
	 */
	public getGeometry(): THREE.BufferGeometry {
		if (this.geometry === null) {
			this.setGeometry(this.initGeometry());
		}
		return this.geometry;
	}
}

/**
 * Three gui
 */
export class ThreeGui implements ThreeGuiController {
	/**
	 * Gui  of three gui
	 */
	public gui: GUI = null;

	/**
	 * Dom element of three gui
	 */
	public domElement: HTMLElement;

	/**
	 * Custom css of three gui
	 */
	public static customCss: string = '.no-pointer-events {pointer-events: none;}.control-disabled {color: #888;text-decoration: line-through;}';

	/**
	 * Creates an instance of three gui.
	 * @param [style]
	 * @param [pars]
	 */
	constructor(
		style?: any,
		pars?: {
			closeOnTop?: boolean;
			autoPlace?: boolean;
			width?: number;
		}
	) {
		if (style instanceof GUI) {
			this.gui = style;
			this.domElement = this.gui.domElement;
		} else {
			this.gui = new GUI(pars);
			this.domElement = this.gui.domElement;
			this.setStyle(style);
		}
	}

	/**
	 * Sets style
	 * @param style
	 * @returns style
	 */
	public setStyle(style: object): this {
		if (style !== null && style !== undefined) {
			const domElement = this.domElement;
			Object.entries(style).forEach(([key, value]) => {
				domElement.style[key] = value;
			});
		}
		if (ThreeGui.customCss !== null) {
			ThreeUtil.cssInject(ThreeGui.customCss);
			ThreeGui.customCss = null;
		}
		return this;
	}

	/**
	 * Adds color
	 * @param object
	 * @param property
	 * @returns color
	 */
	public addColor(object: any, property: string): ThreeGuiController {
		return this.gui.addColor(object, property);
	}

	/**
	 * Adds folder
	 * @param name
	 * @returns folder
	 */
	public addFolder(name: string): ThreeGuiController {
		return this.gui.addFolder(name);
	}

	/**
	 * Adds three gui
	 * @param object
	 * @param property
	 * @param [option1]
	 * @param [options2]
	 * @param [options3]
	 * @returns add
	 */
	public add(object: any, property: string, option1?: any, options2?: any, options3?: any): ThreeGuiController {
		return this.gui.add(object, property, option1, options2, options3);
	}

	/**
	 * Destroys three gui
	 * @returns
	 */
	destroy() {
		this.gui.destroy();
		return this;
	}

	/**
	 * Removes folder
	 * @param folder
	 * @returns folder
	 */
	removeFolder(folder): this {
		this.gui.removeFolder(folder);
		return this;
	}

	/**
	 * Listens three gui
	 * @returns listen
	 */
	listen(): this {
		this.gui.listen();
		return this;
	}

	/**
	 * Names three gui
	 * @param name
	 * @returns name
	 */
	name(name: string): this {
		this.gui.name(name);
		return this;
	}

	/**
	 * Determines whether finish change on
	 * @param callBack
	 * @returns finish change
	 */
	onFinishChange(callBack: (e: any) => void): this {
		this.gui.onFinishChange(callBack);
		return this;
	}

	/**
	 * Determines whether change on
	 * @param callBack
	 * @returns change
	 */
	onChange(callBack: (e: any) => void): this {
		this.gui.onChange(callBack);
		return this;
	}

	/**
	 * Opens three gui
	 * @returns open
	 */
	open(): this {
		this.gui.open();
		return this;
	}

	/**
	 * Closes three gui
	 * @returns close
	 */
	close(): this {
		this.gui.close();
		return this;
	}

	/**
	 * Hides three gui
	 * @returns hide
	 */
	hide(): this {
		this.gui.hide();
		return this;
	}

	/**
	 * Shows three gui
	 * @returns show
	 */
	show(): this {
		this.gui.show();
		return this;
	}

	/**
	 * Removes three gui
	 * @param controller
	 * @returns remove
	 */
	remove(controller): this {
		this.gui.remove(controller);
		return this;
	}
}

/**
 * Three gui controller
 */
export interface ThreeGuiController {
	domElement?: HTMLElement;
	add(object, property: string, min?: any, max?, step?): ThreeGuiController;
	addColor(object, property: string): ThreeGuiController;
	remove(controller): this;
	destroy(): this;
	addFolder(name: string): ThreeGuiController;
	removeFolder(folder): this;
	listen(): this;
	onFinishChange(callBack: (e: any) => void): this;
	onChange(callBack: (e: any) => void): this;
	name(name: string): this;
	open(): this;
	close(): this;
	hide(): this;
	show(): this;
}
