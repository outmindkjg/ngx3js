import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import * as GSAP from 'gsap';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';

import { CanvasComponent } from '../canvas/canvas.component';
import { ComposerComponent } from '../composer/composer.component';
import { ControlComponent, ControlOptions } from '../control/control.component';
import { ControllerComponent } from '../controller/controller.component';
import { GuiControlParam, RendererEvent, RendererInfo, RendererTimer, ThreeClock, ThreeGui, ThreeStats, ThreeUtil } from '../interface';
import { PlaneComponent } from '../plane/plane.component';
import { SharedComponent } from '../shared/shared.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ViewerComponent } from '../viewer/viewer.component';
import { AudioComponent } from './../audio/audio.component';
import { CameraComponent } from './../camera/camera.component';
import { ListenerComponent } from './../listener/listener.component';
import { LookatComponent } from './../lookat/lookat.component';
import { SceneComponent } from './../scene/scene.component';

/**
 * RendererComponent
 *
 * @see THREE.WebGLRenderer
 * @see SVGRenderer
 */
@Component({
	selector: 'ngx3js-renderer',
	templateUrl: './renderer.component.html',
	styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent extends AbstractSubscribeComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges {
	/**
	 * The type of renderer
	 *
	 * Notice - case insensitive.
	 *
	 * @see SVGRenderer - SVGRenderer, SVG
	 * @see THREE.WebGLRenderer - WebGLRenderer, WebGL, GL, WebGL2
	 */
	@Input() public type: string = 'webgl';

	/**
	 * The type of css renderer
	 *
	 * Notice - case insensitive.
	 *
	 * @see CSS2DRenderer - CSS2DRenderer, CSS2D, 2D
	 * @see CSS3DRenderer - CSS3DRenderer, CSS3D, 3D
	 *
	 * mixed - "css3d,css2d", "css2d,css3d"
	 */
	@Input() private cssType: string = 'none';

	/**
	 * The type of control
	 *
	 * Notice - case insensitive.
	 *
	 * @see ControlComponent
	 */
	@Input() private controlType: string = 'none';

	/**
	 * The options of control
	 */
	@Input() private controlOptions: ControlOptions = null;

	/**
	 * If set, use shadow maps in the scene. Default is *true*.
	 */
	@Input() private shadowMapEnabled: boolean = true;

	/**
	 * Whether to use physically correct lighting mode. Default is *false*.
	 * See the [example:webgl_lights_physical lights / physical] example.
	 */
	@Input() private physicallyCorrectLights: boolean = false;

	/**
	 * Defines shadow map type (unfiltered, percentage close filtering, percentage close filtering with bilinear filtering in shader)
	 * Options are THREE.BasicShadowMap, THREE.PCFShadowMap (default), THREE.PCFSoftShadowMap and THREE.VSMShadowMap. See [page:Renderer Renderer constants] for details.
	 *
	 * Notice - case insensitive.
	 *
	 */
	@Input() private shadowMapType: string = null;

	/**
	 * Sets the clear color
	 */
	@Input() private clearColor: string | number = null;

	/**
	 * Sets the alpha of the clear color
	 */
	@Input() private clearAlpha: number = null;

	/**
	 * Default is [page:Renderer NoToneMapping]. See the [page:Renderer Renderer constants] for other choices.
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.ToneMapping
	 * @see THREE.LinearToneMapping - LinearToneMapping, Linear
	 * @see THREE.ReinhardToneMapping - ReinhardToneMapping, Reinhard
	 * @see THREE.CineonToneMapping - CineonToneMapping, CineonTone
	 * @see THREE.ACESFilmicToneMapping - ACESFilmicToneMapping, ACESFilmic
	 * @see THREE.NoToneMapping - NoToneMapping, No
	 */
	@Input() private toneMapping: string = null;

	/**
	 * Exposure level of tone mapping. Default is *1*.
	 */
	@Input() private toneMappingExposure: number = null;

	/**
	 * Defines whether the renderer respects object-level clipping planes. Default is *false*.
	 */
	@Input() private localClippingEnabled: boolean = false;

	/**
	 * User-defined clipping planes specified as THREE.Plane objects in world space.
	 */
	@Input() private globalClippingEnabled: boolean = true;

	/**
	 * whether to perform antialiasing. Default is *false*.
	 */
	@Input() private antialias: boolean = false;

	/**
	 * The quality of SVGRenderer
	 *
	 * Notice - case insensitive.
	 *
	 * high - quality
	 * low -
	 */
	@Input() private quality: string = null;

	/**
	 * Input  of renderer component
	 *
	 * Notice - case insensitive.
	 *
	 * auto - auto fix the size of renderer
	 * fixed - use fixed size of renderer
	 */
	@Input() public sizeType: string = 'auto';

	/**
	 * The width of renderer
	 */
	@Input() private width: number | string = -1;

	/**
	 * The height of renderer
	 */
	@Input() private height: number | string = -1;

	/**
	 * The x position of renderer
	 *
	 * number : fixed position
	 * string : % - the percent of renderer
	 * string : % -/+ number - the percent of renderer and add some value
	 */
	@Input() private x: number | string = 0;

	/**
	 * The y position of renderer
	 *
	 * number : fixed position
	 * string : % - the percent of renderer
	 * string : % -/+ number - the percent of renderer and add some value
	 */
	@Input() private y: number | string = 0;

	/**
	 * the stats mode  of stats module
	 */
	@Input() private statsMode: number = -1;

	/**
	 * Defines whether the renderer should automatically clear its output before rendering a frame.
	 */
	@Input() private autoClear: boolean = true;

	/**
	 * If [page:.autoClear autoClear] is true, defines whether the renderer should clear the color buffer.
	 * 	Default is *true*.
	 */
	@Input() private autoClearColor: boolean = true;

	/**
	 * Defines the output encoding of the renderer. Default is [page:Textures THREE.LinearEncoding].
	 * If a render target has been set using [page:WebGLRenderer.setRenderTarget .setRenderTarget] then renderTarget.texture.encoding will be used instead.
	 * See the [page:Textures texture constants] page for details of other formats.
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
	 */
	@Input() private outputEncoding: string = null;

	/**
	 * The guiControl of GUI
	 */
	@Input() private guiControl: any = null;

	/**
	 * The guiParams of GUI
	 */
	@Input() private guiParams: GuiControlParam[] = [];

	/**
	 * The guiOpen of GUI
	 */
	@Input() private guiOpen: boolean = false;

	/**
	 * whether to use a logarithmic depth buffer. It may
	 * be neccesary to use this if dealing with huge differences in scale in a single scene. Note that this setting
	 * uses gl_FragDepth if available which disables the [link:https://www.khronos.org/opengl/wiki/Early_Fragment_Test Early Fragment Test]
	 * optimization and can cause a decrease in performance.
	 * Default is *false*. See the [example:webgl_camera_logarithmicdepthbuffer camera / logarithmicdepthbuffer] example.
	 */
	@Input() private logarithmicDepthBuffer: boolean = false;

	/**
	 * whether to preserve the buffers until manually cleared
	 * or overwritten. Default is *false*.
	 */
	@Input() private preserveDrawingBuffer: boolean = false;

	/**
	 * Input  of renderer component
	 *
	 * Notice - case insensitive.
	 *
	 * string join by ,
	 *
	 * change - change
	 * pointerdown, mousedown, down - pointerdown
	 * pointerup, mouseup, up - pointerup
	 * pointermove, mousemove, move - pointermove
	 * keydown - keydown
	 * keyup - keyup,
	 * keypress - keypress
	 * click - click
	 * mouseover - mouseover, over
	 * mouseout - mouseout, out
	 *
	 * @see HTMLElement.addEventListener
	 */
	@Input() private useEvent: string = null;

	/**
	 * Input  of renderer component
	 */
	@Input() private camera: CameraComponent = null;

	/**
	 * Input  of renderer component
	 */
	@Input() private scene: SceneComponent = null;

	/**
	 * Input  of renderer component
	 */
	@Input() private requiredExtensions: string[] = null;

	/**
	 * Input  of renderer component
	 */
	@Input() private beforeRender: (info: RendererInfo) => boolean = null;

	/**
	 * Output  of renderer component
	 */
	@Output() private eventListener: EventEmitter<RendererEvent> = new EventEmitter<RendererEvent>();

	/**
	 * Output  of renderer component
	 */
	@Output() private onRender: EventEmitter<RendererTimer> = new EventEmitter<RendererTimer>();

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(SceneComponent, { descendants: false }) private sceneList: QueryList<SceneComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(CameraComponent, { descendants: true }) private cameraList: QueryList<CameraComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(ComposerComponent, { descendants: true }) private composerList: QueryList<ComposerComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(ViewerComponent, { descendants: true }) private viewerList: QueryList<ViewerComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(ListenerComponent, { descendants: true }) private listenerList: QueryList<ListenerComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(AudioComponent, { descendants: true }) private audioList: QueryList<AudioComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(ControllerComponent, { descendants: true }) private controllerList: QueryList<ControllerComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(ControlComponent, { descendants: false }) private controlList: QueryList<ControlComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(PlaneComponent) private clippingPlanesList: QueryList<PlaneComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(CanvasComponent) private canvas2dList: QueryList<CanvasComponent>;

	/**
	 * Content children of renderer component
	 */
	@ContentChildren(SharedComponent, { descendants: true }) private sharedList: QueryList<SharedComponent>;

	/**
	 * View child of renderer component
	 */
	@ViewChild('canvas') private canvasEle: ElementRef = null;

	/**
	 * View child of renderer component
	 */
	@ViewChild('debug') private debugEle: ElementRef = null;

	/**
	 * View child of renderer component
	 */
	@ViewChild('renderer') private rendererEle: ElementRef = null;

	/**
	 * Gets shadow map type
	 * @param [def]
	 * @returns shadow map type
	 */
	private getShadowMapType(def?: string): THREE.ShadowMapType {
		const shadowMapType = ThreeUtil.getTypeSafe(this.shadowMapType, def, '');
		switch (shadowMapType.toLowerCase()) {
			case 'basicshadowmap':
			case 'basic':
				return THREE.BasicShadowMap;
			case 'pcfshadowmap':
			case 'pcf':
				return THREE.PCFShadowMap;
			case 'vsmshadowmap':
			case 'vsm':
				return THREE.VSMShadowMap;
			case 'pcfsoftshadowmap':
			case 'pcfsoft':
			default:
				return THREE.PCFSoftShadowMap;
		}
	}

	/**
	 * Gets clipping planes
	 * @param [def]
	 * @returns clipping planes
	 */
	private getClippingPlanes(def?: THREE.Plane[]): THREE.Plane[] {
		if (this.clippingPlanesList !== null && this.clippingPlanesList !== undefined) {
			const clippingPlanes: THREE.Plane[] = [];
			this.clippingPlanesList.forEach((plane) => {
				clippingPlanes.push(plane.getWorldPlane());
			});
			return clippingPlanes;
		} else {
			return def;
		}
	}

	/**
	 * Creates an instance of renderer component.
	 */
	constructor() {
		super();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked the directive's
	 * data-bound properties for the first time,
	 * and before any of the view or content children have been checked.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngOnInit(): void {
		super.ngOnInit('renderer');
	}

	/**
	 * A callback method that performs custom clean-up, invoked immediately
	 * before a directive, pipe, or service instance is destroyed.
	 */
	ngOnDestroy(): void {
		this.dispose();
		if (this.stats !== null) {
			this.stats.dom.parentNode.removeChild(this.stats.dom);
		}
		if (this.renderControl !== null) {
			this.renderControl.ngOnDestroy();
		}
		Object.entries(this._eventListener).forEach(([key, value]) => {
			this.removeEvent(key, value);
			delete this._eventListener[key];
		});
		super.ngOnDestroy();
	}

	/**
	 * A callback method that is invoked immediately after the
	 * default change detector has checked data-bound properties
	 * if at least one has changed, and before the view and content
	 * children are checked.
	 *
	 * @param changes The changed properties.
	 */
	ngOnChanges(changes: SimpleChanges): void {
		super.ngOnChanges(changes);
		if (changes && this.renderer) {
			this.addChanges(changes);
		}
	}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of all of the directive's
	 * content.
	 * It is invoked only once when the directive is instantiated.
	 */
	ngAfterContentInit() {
		this.subscribeListQueryChange(this.sceneList, 'sceneList', 'scene');
		this.subscribeListQueryChange(this.cameraList, 'cameraList', 'camera');
		this.subscribeListQueryChange(this.composerList, 'composerList', 'composer');
		this.subscribeListQueryChange(this.viewerList, 'viewerList', 'viewer');
		this.subscribeListQueryChange(this.listenerList, 'listenerList', 'listener');
		this.subscribeListQueryChange(this.audioList, 'audioList', 'audio');
		this.subscribeListQueryChange(this.controllerList, 'controllerList', 'controller');
		this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
		this.subscribeListQueryChange(this.controlList, 'controlList', 'control');
		this.subscribeListQueryChange(this.clippingPlanesList, 'clippingPlanesList', 'clippingPlanes');
		this.subscribeListQueryChange(this.canvas2dList, 'canvas2dList', 'canvas2d');
		this.subscribeListQueryChange(this.sharedList, 'sharedList', 'shared');
		super.ngAfterContentInit();
	}

	/**
	 * A callback method that is invoked immediately after
	 * Angular has completed initialization of a component's view.
	 * It is invoked only once when the view is instantiated.
	 */
	ngAfterViewInit() {
		let errorCode : string = null;
		switch (this.type.toLowerCase()) {
			case 'gl2':
			case 'webgl2':
				if (!this.isAvailable('gl2')) {
					errorCode = 'gl2';
				}
		}
		if (ThreeUtil.isNotNull(this.requiredExtensions)) {
			this.requiredExtensions.forEach(extension => {
				if (!this.isAvailable(extension)) {
					switch(extension) {
						case 'compressed' :
							errorCode = 'WEBGL_compressed_texture_pvrtc';			
							break;
						default :
							errorCode = extension;			
							break;
					}
				}
			});
		}
		if (errorCode !== null) {
			const errorEle = document.createElement('DIV');
			switch(errorCode) {
				case 'gl2' :
					errorEle.innerHTML = 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" target="_blank">WebGL 2</a>';
					break;
				default :
					errorEle.innerHTML = 'Your graphics card does not seem to support <a href="http://khronos.org/webgl/wiki/Getting_a_WebGL_Implementation" target="_blank">'+errorCode+'</a>';
					break;
			}
			this.dispose();
			this.renderer = null;
			this.userGestureSubscribe(errorEle).subscribe(() => {
				this.ngAfterViewInit();
			});
			return;
		}
		this.clock = ThreeUtil.getClock(true);
		this.renderer = this.getRenderer();
	}

	/**
	 * Determines whether available is
	 * 
	 * @param type 
	 * @returns true if available 
	 */
	private isAvailable(type: string): boolean {
		switch (type.toLowerCase()) {
			case 'gpu':
				return navigator['gpu'] !== undefined;
			case 'gl': {
				try {
					const canvas = document.createElement('canvas');
					return !!(window.WebGLRenderingContext && (canvas.getContext('webgl') || canvas.getContext('experimental-webgl')));
				} catch (e) {
					return false;
				}
			}
			case 'gl2': {
				try {
					const canvas = document.createElement('canvas');
					return !!(window.WebGL2RenderingContext && canvas.getContext('webgl2'));
				} catch (e) {
					return false;
				}
			}
			case 'compressed' : 
				return this.isHasExtension('WEBGL_compressed_texture_pvrtc');
		}
		return true;
	}

	/**
	 * Check gl of renderer component
	 */
	private _checkGl : any = null;

	/**
	 * Determines whether has extension is
	 * 
	 * @param name 
	 * @returns true if has extension 
	 */
	private isHasExtension(name: string): boolean {
		if (this._checkGl === null) {
			let domElement = document.createElement( 'canvas' );
			this._checkGl = domElement.getContext('webgl') || domElement.getContext('experimental-webgl');
		}
		if (ThreeUtil.isNotNull(this._checkGl.getExtension)) {
			// console.log(this._checkGl.getSupportedExtensions());
			return this._checkGl.getExtension(name) !== null;
		} else {
			return false;
		}
	}

	/**
	 * Disposes renderer component
	 */
	dispose() {
		if (this.renderer !== null && this.renderer instanceof THREE.WebGLRenderer) {
			if (this.renderer.domElement && this.renderer.domElement.parentNode) {
				this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
			}
			this.renderer.forceContextLoss();
			this.renderer.dispose();
			this.renderer = null;
		}
		if (this.cssRenderer !== null) {
			if (Array.isArray(this.cssRenderer)) {
				this.cssRenderer.forEach((cssRenderer) => {
					if (cssRenderer.domElement && cssRenderer.domElement.parentNode) {
						cssRenderer.domElement.parentNode.removeChild(cssRenderer.domElement);
					}
				});
			} else {
				if (this.cssRenderer.domElement && this.cssRenderer.domElement.parentNode) {
					this.cssRenderer.domElement.parentNode.removeChild(this.cssRenderer.domElement);
				}
			}
			this.cssRenderer = null;
		}
	}

	/**
	 * Removes event
	 * @param type
	 * @param listener
	 * @returns
	 */
	removeEvent(type: string, listener: any) {
		if (ThreeUtil.isNotNull(listener)) {
			switch (type) {
				case 'keydown':
				case 'keyup':
				case 'keypress':
					window.removeEventListener(type, listener);
					break;
				default:
					this.rendererEle.nativeElement.removeEventListener(type, listener);
					break;
			}
		}
		return null;
	}

	/**
	 * Events  of renderer component
	 */
	private events: RendererEvent = {
		type: 'none',
		client: new THREE.Vector2(),
		clientX: 0,
		clientY: 0,
		offset: new THREE.Vector2(),
		offsetX: 0,
		offsetY: 0,
		rate: new THREE.Vector2(),
		rateX: 0,
		rateY: 0,
		size: new THREE.Vector2(),
		width: 0,
		height: 0,
		mouse: new THREE.Vector2(),
		direction: new THREE.Vector2(),
		keyInfo: {
			code: null,
			ctrlKey: false,
			altKey: false,
			shiftKey: false,
			key: '',
			timeStamp: 0,
			timeRepeat: 0,
			xy: new THREE.Vector2(),
		},
		event: {},
	};

	/**
	 * Offset top of renderer component
	 */
	private offsetTop: number = 0;

	/**
	 * Offset left of renderer component
	 */
	private offsetLeft: number = 0;

	/**
	 * Offset right of renderer component
	 */
	private offsetRight: number = 0;

	/**
	 * Offset bottom of renderer component
	 */
	private offsetBottom: number = 0;

	/**
	 * Sets events
	 * @param type
	 * @param event
	 */
	private setEvents(type: string, event: TouchInit | KeyboardEvent) {
		let clientX = 0;
		let clientY = 0;
		if (event instanceof KeyboardEvent) {
			clientX = this.offsetLeft;
			clientY = this.offsetTop;
			const keyInfo = this.events.keyInfo;
			if (event.type == 'keyup') {
				keyInfo.code = null;
				keyInfo.ctrlKey = false;
				keyInfo.altKey = false;
				keyInfo.shiftKey = false;
				keyInfo.key = '';
				keyInfo.timeStamp = 0;
				keyInfo.timeRepeat = 0;
				keyInfo.xy.set(0, 0);
			} else if (this.events.keyInfo.code === event.code) {
				keyInfo.timeRepeat = event.timeStamp - keyInfo.timeStamp;
				switch (event.code) {
					case 'ArrowRight':
						keyInfo.xy.x += keyInfo.timeRepeat;
						break;
					case 'ArrowLeft':
						keyInfo.xy.x -= keyInfo.timeRepeat;
						break;
					case 'ArrowUp':
						keyInfo.xy.y += keyInfo.timeRepeat;
						break;
					case 'ArrowDown':
						keyInfo.xy.y -= keyInfo.timeRepeat;
						break;
				}
			} else {
				keyInfo.code = event.code;
				keyInfo.ctrlKey = event.ctrlKey;
				keyInfo.altKey = event.altKey;
				keyInfo.shiftKey = event.shiftKey;
				keyInfo.key = event.key;
				keyInfo.timeStamp = event.timeStamp;
				keyInfo.timeRepeat = 0;
				keyInfo.xy.set(0, 0);
			}
		} else {
			clientX = event.clientX;
			clientY = event.clientY;
		}
		const offsetX = clientX - this.offsetLeft;
		const offsetY = clientY - this.offsetTop;
		this.events.type = type;
		this.events.clientX = clientX;
		this.events.clientY = clientY;
		this.events.client.set(clientX, clientY);
		this.events.offsetX = offsetX;
		this.events.offsetY = offsetY;
		this.events.offset.set(offsetX, offsetY);
		this.events.rateX = offsetX / this.rendererWidth;
		this.events.rateY = offsetY / this.rendererHeight;
		this.events.rate.set(this.events.rateX, this.events.rateY);
		this.events.mouse.set((offsetX / this.rendererWidth) * 2 - 1, -(offsetY / this.rendererHeight) * 2 + 1);
		this.events.event = event;
		this.eventListener.emit(this.events);
	}

	/**
	 * Adds event
	 * @param type
	 * @param listener
	 * @returns
	 */
	public addEvent(type: string, listener: any) {
		if (ThreeUtil.isNull(listener)) {
			listener = (event: TouchInit | KeyboardEvent) => {
				this.setEvents(type, event);
			};
			switch (type) {
				case 'keydown':
				case 'keyup':
				case 'keypress':
					window.addEventListener(type, listener);
					break;
				default:
					this.rendererEle.nativeElement.addEventListener(type, listener);
					break;
			}
		}
		return listener;
	}

	/**
	 * Event listener of renderer component
	 */
	private _eventListener: {
		[key: string]: (event: any) => void;
	} = {};

	/**
	 * Gets clear color
	 * @param [def]
	 * @returns clear color
	 */
	private getClearColor(def?: string | number): THREE.Color {
		return ThreeUtil.getColorSafe(this.clearColor, def);
	}

	/**
	 * Gets clear alpha
	 * @param [def]
	 * @returns clear alpha
	 */
	private getClearAlpha(def?: number): number {
		return ThreeUtil.getTypeSafe(this.clearAlpha, def);
	}

	/**
	 * Gets tone mapping
	 *
	 * Notice - case insensitive.
	 *
	 * @see THREE.ToneMapping
	 * @see THREE.LinearToneMapping - LinearToneMapping, Linear
	 * @see THREE.ReinhardToneMapping - ReinhardToneMapping, Reinhard
	 * @see THREE.CineonToneMapping - CineonToneMapping, CineonTone
	 * @see THREE.ACESFilmicToneMapping - ACESFilmicToneMapping, ACESFilmic
	 * @see THREE.NoToneMapping - NoToneMapping, No
	 *
	 * @param [def]
	 * @returns tone mapping
	 */
	private getToneMapping(def?: string): THREE.ToneMapping {
		const toneMapping = ThreeUtil.getTypeSafe(this.toneMapping, def, '');
		switch (toneMapping.toLowerCase()) {
			case 'lineartonemapping':
			case 'linear':
				return THREE.LinearToneMapping;
			case 'reinhardtonemapping':
			case 'reinhard':
				return THREE.ReinhardToneMapping;
			case 'cineontonemapping':
			case 'cineon':
				return THREE.CineonToneMapping;
			case 'acesfilmictonemapping':
			case 'acesfilmic':
				return THREE.ACESFilmicToneMapping;
			case 'notonemapping':
			case 'no':
			default:
				return THREE.NoToneMapping;
		}
	}

	/**
	 * Gets render size
	 * @param size
	 * @param renderSize
	 * @param [def]
	 * @returns render size
	 */
	private getRenderSize(size: number | string, renderSize: number, def?: number | string): number {
		const baseSize = ThreeUtil.getTypeSafe(size, def);
		if (ThreeUtil.isNotNull(baseSize)) {
			if (typeof baseSize == 'string') {
				if (baseSize.indexOf('%') > 0) {
					const [percent, extra] = baseSize.split('%');
					const viewSize = Math.ceil((renderSize * parseFloat(percent)) / 100);
					if (extra === '') {
						return viewSize;
					} else {
						return viewSize + parseInt(extra);
					}
				} else {
					return parseFloat(baseSize);
				}
			} else if (baseSize >= 0) {
				return baseSize;
			}
		}
		return renderSize;
	}

	/**
	 * Sets size
	 * @param width
	 * @param height
	 */
	public setSize(width: number, height: number) {
		const rendererWidth = this.getRenderSize(this.width, width);
		const rendererHeight = this.getRenderSize(this.height, height);
		const left = this.getRenderSize(this.x, width);
		const top = this.getRenderSize(this.y, height);
		if (this._lastConfirmHtml !== null) {
			this._lastConfirmHtml.style.width = rendererWidth + 'px';
			this._lastConfirmHtml.style.height = rendererHeight + 'px';
			this._lastConfirmHtml.style.left = left + 'px';
			this._lastConfirmHtml.style.top = top + 'px';
		}
		if (this.canvasEle !== null) {
			this.canvasEle.nativeElement.style.width = rendererWidth + 'px';
			this.canvasEle.nativeElement.style.height = rendererHeight + 'px';
			this.canvasEle.nativeElement.style.left = left + 'px';
			this.canvasEle.nativeElement.style.top = top + 'px';
		}
		this.rendererWidth = rendererWidth;
		this.rendererHeight = rendererHeight;
		if (this.renderer !== null) {
			this.events.width = this.rendererWidth;
			this.events.height = this.rendererHeight;
			this.offsetTop = 0;
			this.offsetLeft = 0;
			let offsetParent = this.rendererEle.nativeElement;
			while (offsetParent) {
				this.offsetLeft += offsetParent.offsetLeft;
				this.offsetTop += offsetParent.offsetTop;
				offsetParent = offsetParent.offsetParent;
			}
			this.offsetRight = this.offsetLeft + this.rendererWidth;
			this.offsetBottom = this.offsetTop + this.rendererHeight;
			this.events.size.set(this.rendererWidth, this.rendererHeight);
			this.renderer.setSize(this.rendererWidth, this.rendererHeight);
			this.composerList.forEach((composer) => {
				composer.setComposerSize(this.rendererWidth, this.rendererHeight);
			});
			this.cameraList.forEach((camera) => {
				camera.setCameraSize(this.rendererWidth, this.rendererHeight);
			});
			this.viewerList.forEach((viewer) => {
				viewer.setViewerSize(this.rendererWidth, this.rendererHeight);
			});
			if (this.cssRenderer !== null) {
				if (Array.isArray(this.cssRenderer)) {
					this.cssRenderer.forEach((cssRenderer) => {
						cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
					});
				} else {
					this.cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
				}
			}
			const rendererSize = this.getSize();
			this.canvas2dList.forEach((canvas2d) => {
				canvas2d.setSize(rendererSize);
			});
			this._sizeSubject.next(rendererSize);
		}
	}

	/**
	 * Size subject of renderer component
	 */
	protected _sizeSubject: Subject<THREE.Vector2> = new Subject<THREE.Vector2>();

	/**
	 * Update subject of renderer component
	 */
	protected _updateSubject: Subject<RendererTimer> = new Subject<RendererTimer>();

	/**
	 * Sizes subscribe
	 * @returns subscribe
	 */
	public sizeSubscribe(): Observable<THREE.Vector2> {
		return this._sizeSubject.asObservable();
	}

	/**
	 * Updates subscribe
	 * @returns subscribe
	 */
	public updateSubscribe(): Observable<RendererTimer> {
		return this._updateSubject.asObservable();
	}

	/**
	 * User gesture subject of renderer component
	 */
	protected _userGestureSubject: Subject<boolean> = new Subject<boolean>();

	/**
	 * Users gesture subscribe
	 * @param [ele]
	 * @returns gesture subscribe
	 */
	public userGestureSubscribe(ele?: HTMLElement): Observable<boolean> {
		const observable = this._userGestureSubject.asObservable();
		if (!this._userGestureShown) {
			this._userGestureShown = true;
			window.setTimeout(() => {
				this.drawGesture(ele);
			}, 100);
		}
		return observable;
	}

	/**
	 * Last confirm html of renderer component
	 */
	private _lastConfirmHtml: HTMLElement = null;

	/**
	 * User gesture shown of renderer component
	 */
	private _userGestureShown: boolean = false;

	/**
	 * Draws gesture
	 * @param [ele]
	 */
	private drawGesture(ele?: HTMLElement) {
		if (this._lastConfirmHtml !== null) {
			this._lastConfirmHtml.parentNode.removeChild(this._lastConfirmHtml);
			this._lastConfirmHtml = null;
		}
		this._userGestureShown = true;
		const confirm = document.createElement('div');
		confirm.className = 'message-info';
		const button = document.createElement('button');
		button.className = 'message-button';
		button.innerHTML = '<b>Re</b>try';
		button.addEventListener('click', () => {
			confirm.parentNode.removeChild(confirm);
			this._lastConfirmHtml = null;
			this._userGestureShown = false;
			this._userGestureSubject.next(true);
		});
		if (ThreeUtil.isNotNull(ele)) {
			const message = document.createElement('div');
			message.className = 'message';
			message.append(ele);
			confirm.append(message);
		}
		confirm.append(button);
		this.canvasEle.nativeElement.appendChild(confirm);
		this._lastConfirmHtml = confirm;
		this.resizeRender();
	}

	/**
	 * Gets size
	 * @returns size
	 */
	public getSize(): THREE.Vector2 {
		return new THREE.Vector2(this.rendererWidth, this.rendererHeight);
	}

	/**
	 * Renderlistener  of renderer component
	 */
	private renderlistener: THREE.AudioListener = null;

	/**
	 * Applys changes
	 * @param changes
	 * @returns
	 */
	public applyChanges(changes: string[]) {
		if (this.renderer !== null) {
			if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
				this.getRenderer();
				return;
			}
			if (
				!ThreeUtil.isOnlyIndexOf(
					changes,
					[
						'useevent',
						'shared',
						'width',
						'height',
						'x',
						'y',
						'resize',
						'scene',
						'camera',
						'control',
						'composer',
						'viewer',
						'listener',
						'audio',
						'controller',
						'lookat',
						'control',
						'localclippingenabled',
						'globalclippingenabled',
						'clearcolor',
						'clearalpha',
						'tonemapping',
						'tonemappingexposure',
						'shadowmapenabled',
						'physicallycorrectlights',
						'shadowmaptype',
						'autoclear',
						'autoclearcolor',
						'outputencoding',
						'clippingplanes',
						'canvas2d',
						'controltype',
						'controloptions',
						'guiparams',
						'guicontrol',
					],
					this.OBJECT_ATTR
				)
			) {
				this.needUpdate = true;
				return;
			}
			if (ThreeUtil.isIndexOf(changes, 'init')) {
				changes = ThreeUtil.pushUniq(changes, ['useevent', 'shared', 'resize', 'scene', 'camera', 'control', 'composer', 'viewer', 'listener', 'audio', 'controller', 'lookat', 'control', 'clippingPlanes', 'canvas2d', 'statsmode', 'guicontrol', 'webglrenderer']);
			}
			if (ThreeUtil.isIndexOf(changes, ['width', 'height', 'x', 'y'])) {
				changes = ThreeUtil.pushUniq(changes, ['resize']);
			}
			if (ThreeUtil.isIndexOf(changes, 'guiparams')) {
				changes = ThreeUtil.pushUniq(changes, ['guicontrol']);
			}
			if (ThreeUtil.isIndexOf(changes, ['localclippingenabled', 'globalclippingenabled', 'clearcolor', 'clearalpha', 'tonemapping', 'tonemappingexposure', 'shadowmapenabled', 'physicallycorrectlights', 'shadowmaptype', 'autoclear', 'autoclearcolor', 'outputencoding', 'clippingplanes'])) {
				changes = ThreeUtil.pushUniq(changes, ['webglrenderer']);
			}
			if (ThreeUtil.isIndexOf(changes, ['camera', 'controltype', 'controloptions'])) {
				changes = ThreeUtil.pushUniq(changes, ['control']);
			}
			changes.forEach((change) => {
				switch (change.toLowerCase()) {
					case 'guicontrol':
						if (this.gui !== null) {
							this.gui.domElement.parentNode.removeChild(this.gui.domElement);
							this.gui = null;
						}
						if (ThreeUtil.isNotNull(this.guiControl) && ThreeUtil.isNotNull(this.guiParams) && this.guiParams.length > 0) {
							const gui = ThreeUtil.setupGui(this.guiControl, this.getGui(), this.guiParams);
							if (this.guiOpen) {
								gui.open();
							} else {
								gui.close();
							}
						}
						break;
					case 'useevent':
						const useEvents = ThreeUtil.isNotNull(this.useEvent) ? this.useEvent.toLowerCase().split(',') : [];
						if (useEvents.indexOf('change') > -1) {
							this._eventListener.change = this.addEvent('change', this._eventListener.change);
						} else {
							this._eventListener.change = this.removeEvent('change', this._eventListener.change);
						}
						if (useEvents.indexOf('pointerdown') > -1 || useEvents.indexOf('mousedown') > -1 || useEvents.indexOf('down') > -1) {
							this._eventListener.pointerdown = this.addEvent('pointerdown', this._eventListener.pointerdown);
						} else {
							this._eventListener.pointerdown = this.removeEvent('pointerdown', this._eventListener.pointerdown);
						}
						if (useEvents.indexOf('pointerup') > -1 || useEvents.indexOf('mouseup') > -1 || useEvents.indexOf('up') > -1) {
							this._eventListener.pointerup = this.addEvent('pointerup', this._eventListener.pointerup);
						} else {
							this._eventListener.pointerup = this.removeEvent('pointerup', this._eventListener.pointerup);
						}
						if (useEvents.indexOf('pointermove') > -1 || useEvents.indexOf('mousemove') > -1 || useEvents.indexOf('move') > -1) {
							this._eventListener.pointermove = this.addEvent('pointermove', this._eventListener.pointermove);
						} else {
							this._eventListener.pointermove = this.removeEvent('pointermove', this._eventListener.pointermove);
						}
						if (useEvents.indexOf('keydown') > -1) {
							this._eventListener.keydown = this.addEvent('keydown', this._eventListener.keydown);
						} else {
							this._eventListener.keydown = this.removeEvent('keydown', this._eventListener.keydown);
						}
						if (useEvents.indexOf('keyup') > -1) {
							this._eventListener.keyup = this.addEvent('keyup', this._eventListener.keyup);
						} else {
							this._eventListener.keyup = this.removeEvent('keyup', this._eventListener.keyup);
						}
						if (useEvents.indexOf('keypress') > -1 || useEvents.indexOf('press') > -1) {
							this._eventListener.keypress = this.addEvent('keypress', this._eventListener.keypress);
						} else {
							this._eventListener.keypress = this.removeEvent('keypress', this._eventListener.keypress);
						}
						if (useEvents.indexOf('click') > -1) {
							this._eventListener.click = this.addEvent('click', this._eventListener.click);
						} else {
							this._eventListener.click = this.removeEvent('click', this._eventListener.click);
						}
						if (useEvents.indexOf('mouseover') > -1 || useEvents.indexOf('over') > -1) {
							this._eventListener.mouseover = this.addEvent('mouseover', this._eventListener.mouseover);
						} else {
							this._eventListener.mouseover = this.removeEvent('mouseover', this._eventListener.mouseover);
						}
						if (useEvents.indexOf('mouseout') > -1 || useEvents.indexOf('out') > -1) {
							this._eventListener.mouseout = this.addEvent('mouseout', this._eventListener.mouseout);
						} else {
							this._eventListener.mouseout = this.removeEvent('mouseout', this._eventListener.mouseout);
						}
						break;
					case 'resize':
						this.resizeRender();
						break;
					case 'webglrenderer':
						if (this.renderer instanceof THREE.WebGLRenderer) {
							if (ThreeUtil.isNotNull(this.clearColor)) {
								this.renderer.setClearColor(this.getClearColor());
							}
							if (ThreeUtil.isNotNull(this.clearAlpha)) {
								this.renderer.setClearAlpha(this.getClearAlpha());
							}
							if (ThreeUtil.isNotNull(this.toneMapping)) {
								this.renderer.toneMapping = this.getToneMapping();
							}
							if (ThreeUtil.isNotNull(this.toneMappingExposure)) {
								this.renderer.toneMappingExposure = this.toneMappingExposure;
							}
							this.renderer.setPixelRatio(window.devicePixelRatio);
							if (ThreeUtil.isNotNull(this.shadowMapEnabled)) {
								this.renderer.shadowMap.enabled = this.shadowMapEnabled;
							}
							if (ThreeUtil.isNotNull(this.physicallyCorrectLights)) {
								this.renderer.physicallyCorrectLights = this.physicallyCorrectLights;
							}
							if (this.renderer.shadowMap.enabled && ThreeUtil.isNotNull(this.shadowMapType)) {
								this.renderer.shadowMap.type = this.getShadowMapType('pcfsoft');
							}
							if (ThreeUtil.isNotNull(this.autoClear)) {
								this.renderer.autoClear = this.autoClear;
							}
							if (ThreeUtil.isNotNull(this.autoClearColor)) {
								this.renderer.autoClearColor = this.autoClearColor;
							}
							if (ThreeUtil.isNotNull(this.outputEncoding)) {
								this.renderer.outputEncoding = ThreeUtil.getTextureEncodingSafe(this.outputEncoding, 'linear');
							}
							if (ThreeUtil.isNotNull(this.localClippingEnabled)) {
								this.renderer.localClippingEnabled = this.localClippingEnabled;
							}
							if (ThreeUtil.isNotNull(this.globalClippingEnabled)) {
								this.renderer.clippingPlanes = !this.globalClippingEnabled ? [] : this.getClippingPlanes();
							}
						}
						break;
					case 'statsmode':
						if (this.statsMode >= 0) {
							if (this.stats === null) {
								this.getStats();
							}
							this.stats.showPanel(this.statsMode);
						} else {
							if (this.stats !== null) {
								this.debugEle.nativeElement.removeChild(this.stats.dom);
							}
							this.stats = null;
						}
						break;
					case 'control':
						this.controls = this.getControls(this.cameraList, this.sceneList, this.canvasEle.nativeElement);
						break;
					case 'scene':
						this.unSubscribeReferList('sceneList');
						if (ThreeUtil.isNotNull(this.sceneList)) {
							this.sceneList.forEach((scene) => {
								scene.setRenderer(this);
							});
							this.subscribeListQuery(this.sceneList, 'sceneList', 'scene');
						}
						break;
					case 'camera':
						this.unSubscribeReferList('cameraList');
						if (ThreeUtil.isNotNull(this.cameraList)) {
							this.cameraList.forEach((camera) => {
								camera.setRenderer(this.renderer, this.cssRenderer, this.sceneList);
							});
							this.subscribeListQuery(this.cameraList, 'cameraList', 'camera');
						}
						break;
					case 'composer':
						this.unSubscribeReferList('composerList');
						if (ThreeUtil.isNotNull(this.composerList)) {
							if (this.composerList.length > 0 && this.cameraList.length > 0 && this.sceneList.length > 0 && this.renderer instanceof THREE.WebGLRenderer) {
								const camera = this.cameraList.first.getCamera();
								const scene = this.sceneList.first.getScene();
								this.composerList.forEach((composer) => {
									composer.setRenderer(this.renderer as THREE.WebGLRenderer, camera, scene);
								});
							}
							this.subscribeListQuery(this.composerList, 'composerList', 'composer');
						}
						break;
					case 'viewer':
						this.unSubscribeReferList('viewerList');
						if (ThreeUtil.isNotNull(this.viewerList)) {
							this.viewerList.forEach((viewer) => {
								viewer.setRenderer(this.renderer);
							});
							this.subscribeListQuery(this.viewerList, 'viewerList', 'viewer');
						}
						break;
					case 'listener':
						this.unSubscribeReferList('listenerList');
						if (ThreeUtil.isNotNull(this.listenerList)) {
							this.listenerList.forEach((listener) => {
								this.renderlistener = listener.getListener();
							});
							this.subscribeListQuery(this.listenerList, 'listenerList', 'listener');
						}
						break;
					case 'audio':
						this.unSubscribeReferList('audioList');
						if (ThreeUtil.isNotNull(this.audioList)) {
							this.audioList.forEach((audio) => {
								audio.setListener(this.renderlistener, this);
							});
							this.subscribeListQuery(this.audioList, 'audioList', 'audio');
						}
						break;
					case 'controller':
						this.unSubscribeReferList('controllerList');
						if (ThreeUtil.isNotNull(this.controllerList)) {
							this.controllerList.forEach((controller) => {
								controller.setRenderer(this.renderer, this.sceneList, this.cameraList, this.canvas2dList);
							});
							this.subscribeListQuery(this.controllerList, 'controllerList', 'controller');
						}
						break;
					case 'canvas2d':
						this.unSubscribeReferList('canvas2dList');
						if (ThreeUtil.isNotNull(this.canvas2dList)) {
							this.canvas2dList.forEach((canvas2d) => {
								canvas2d.setParentNode(this.canvasEle.nativeElement);
							});
							this.subscribeListQuery(this.canvas2dList, 'canvas2dList', 'canvas2d');
						}
					case 'shared':
						this.unSubscribeReferList('sharedList');
						if (ThreeUtil.isNotNull(this.sharedList)) {
							this.sharedList.forEach((shared) => {
								shared.getShared();
							});
							this.subscribeListQuery(this.sharedList, 'sharedList', 'shared');
						}
						break;
				}
			});
			super.applyChanges(changes);
		}
	}

	/**
	 * Renderer  of renderer component
	 */
	public renderer: THREE.Renderer = null;

	/**
	 * Css renderer of renderer component
	 */
	private cssRenderer: CSS3DRenderer | CSS2DRenderer | (CSS3DRenderer | CSS2DRenderer)[] = null;

	/**
	 * Renderer width of renderer component
	 */
	public rendererWidth: number = 1024;

	/**
	 * Renderer height of renderer component
	 */
	public rendererHeight: number = 768;

	/**
	 * Stats  of renderer component
	 */
	private stats: ThreeStats = null;

	/**
	 * Gui  of renderer component
	 */
	private gui: ThreeGui = null;

	/**
	 * Clock  of renderer component
	 */
	private clock: ThreeClock = null;

	/**
	 * Controls  of renderer component
	 */
	private controls: ControlComponent[] = null;

	/**
	 * Render control of renderer component
	 */
	private renderControl: ControlComponent = null;

	/**
	 * Gets controls
	 * @param cameras
	 * @param scenes
	 * @param domElement
	 * @returns controls
	 */
	private getControls(cameras: QueryList<CameraComponent>, scenes: QueryList<SceneComponent>, domElement: HTMLElement): ControlComponent[] {
		let cameraComp: CameraComponent = null;
		let controlType: string = this.controlType.toLowerCase();
		if (this.renderControl !== null) {
			this.renderControl.ngOnDestroy();
			this.renderControl = null;
		}
		if (cameras !== null && cameras.length > 0) {
			let cameraCompFounded: boolean = false;
			cameraComp = cameras.find((camera) => {
				if (camera.controlType.toLowerCase() !== 'none') {
					controlType = camera.controlType;
					cameraCompFounded = true;
					return true;
				} else if (!cameraCompFounded) {
					cameraCompFounded = true;
					return true;
				}
				return false;
			});
		}
		let controls: ControlComponent[] = [];
		if (cameraComp !== null && cameraComp !== undefined) {
			const camera: THREE.Camera = cameraComp.getCamera();
			switch (controlType.toLowerCase()) {
				case 'orbit':
				case 'fly':
				case 'firstperson':
				case 'transform':
				case 'trackball':
				case 'plane':
				case 'orbitcontrols':
				case 'flycontrols':
				case 'firstpersoncontrols':
				case 'transformcontrols':
				case 'trackballcontrols':
				case 'planecontrols':
					const control = this.initLocalComponent('control', new ControlComponent());
					const controlOptions = this.controlOptions || {};
					controlOptions.lookatList = this.lookatList;
					control.updateInputParams(controlOptions, true, {}, controlType);
					control.setCameraDomElement(camera, domElement, scenes);
					controls.push(control);
					this.renderControl = control;
			}
			if (this.controlList !== null && this.controlList !== undefined) {
				this.controlList.forEach((control) => {
					control.setCameraDomElement(camera, domElement, scenes);
					controls.push(control);
				});
			}
		}
		return controls;
	}

	/**
	 * Gets stats
	 * @returns stats
	 */
	private getStats(): ThreeStats {
		if (this.stats === null) {
			this.stats = ThreeUtil.getStats({
				position: 'absolute',
				left: '0px',
				top: '0px',
			});
			this.debugEle.nativeElement.appendChild(this.stats.dom);
		}
		return this.stats;
	}

	/**
	 * Gets gui
	 * @returns gui
	 */
	private getGui(): ThreeGui {
		if (this.gui === null) {
			this.gui = new ThreeGui({
				position: 'absolute',
				marginRight: '0px',
				right: '0px',
				top: '0px',
			});
			this.debugEle.nativeElement.appendChild(this.gui.domElement);
		}
		return this.gui;
	}

	/**
	 * Gets Object
	 * @returns Object
	 */
	public getObject<T>(): T {
		return this.getRenderer() as any;
	}

	/**
	 * Gets Renderer
	 * @returns Renderer
	 */
	public getRenderer(): THREE.Renderer {
		if (this.renderer === null || this._needUpdate) {
			console.clear();
			this.needUpdate = false;
			this.dispose();
			if (this.renderer !== null) {
				this.renderer = null;
			}
			if (this.cssRenderer !== null) {
				this.cssRenderer = null;
			}
			GSAP.gsap.ticker.fps(60);
			if (this._renderCaller !== null) {
				GSAP.gsap.ticker.remove(this._renderCaller);
			}
			this._renderCaller = () => {
				this.render();
			};
			switch (this.cssType.toLowerCase()) {
				case '3d,2d':
				case '2d,3d':
				case 'css3d,css2d':
				case 'css2d,css3d':
				case 'css3drenderer,css2drenderer':
				case 'css2drenderer,css3drenderer':
					this.cssRenderer = [];
					this.cssRenderer.push(new CSS2DRenderer());
					this.cssRenderer.push(new CSS3DRenderer());
					break;
				case '3d':
				case 'css3d':
				case 'css3drenderer':
					this.cssRenderer = new CSS3DRenderer();
					break;
				case '2d':
				case 'css2d':
				case 'css2drenderer':
					this.cssRenderer = new CSS2DRenderer();
					break;
				default:
					this.cssRenderer = null;
					break;
			}
			switch (this.type.toLowerCase()) {
				case 'svg':
				case 'svgrenderer':
					const svgRenderer = new SVGRenderer();
					if (ThreeUtil.isNotNull(this.quality)) {
						svgRenderer.setQuality(ThreeUtil.getTypeSafe(this.quality, 'high').toLowerCase());
					}
					this.renderer = svgRenderer as any;
					break;
				case 'gl2':
				case 'webgl2':
				case 'webgl2renderer':
				case 'gl':
				case 'webgl':
				case 'webglrenderer':
				default:
					const webGLRenderer = new THREE.WebGLRenderer({
						alpha: false,
						antialias: this.antialias,
						logarithmicDepthBuffer: this.logarithmicDepthBuffer,
						preserveDrawingBuffer: this.preserveDrawingBuffer,
					});
					// webGLRenderer.xr.enabled = true;
					this.renderer = webGLRenderer;
					break;
			}
			if (this.cssRenderer !== null) {
				if (Array.isArray(this.cssRenderer)) {
					this.cssRenderer.forEach((cssRenderer) => {
						cssRenderer.domElement.style.position = 'absolute';
						cssRenderer.domElement.style.top = '0px';
						cssRenderer.domElement.style.left = '0px';
						cssRenderer.domElement.style.pointerEvents = 'none';
						this.canvasEle.nativeElement.appendChild(cssRenderer.domElement);
					});
				} else {
					this.cssRenderer.domElement.style.position = 'absolute';
					this.cssRenderer.domElement.style.top = '0px';
					this.cssRenderer.domElement.style.left = '0px';
					this.cssRenderer.domElement.style.pointerEvents = 'none';
					this.canvasEle.nativeElement.appendChild(this.cssRenderer.domElement);
				}
			}
			this.renderer.domElement.style.position = 'relative';
			this.canvasEle.nativeElement.appendChild(this.renderer.domElement);
			ThreeUtil.setRenderer(this);
			this.renderer['userData'] = {};
			super.setObject(this.renderer);
			this.resizeRender();
			this._renderCaller();
			// GSAP.gsap.ticker.add(this._renderCaller);
		}
		return this.renderer;
	}

	/**
	 * Render caller of renderer component
	 */
	private _renderCaller: (...args: any[]) => void = null;

	/**
	 * Cameras  of renderer component
	 */
	private _cameras: THREE.Camera[] = null;

	/**
	 * Scenes  of renderer component
	 */
	private _scenes: THREE.Scene[] = null;

	/**
	 * Gets render info
	 * @param timer
	 * @returns render info
	 */
	private getRenderInfo(timer: RendererTimer): RendererInfo {
		if (this._cameras === null) {
			this._cameras = [];
			this.cameraList.forEach((camera) => {
				this._cameras.push(camera.getObject3d());
			});
		}
		if (this._scenes === null) {
			this._scenes = [];
			this.sceneList.forEach((scene) => {
				this._scenes.push(scene.getScene());
			});
		}
		return {
			timer: timer,
			innerWidth: this.rendererWidth,
			innerHeight: this.rendererHeight,
			renderer: this.renderer,
			cssRenderer: this.cssRenderer,
			cameras: this._cameras,
			scenes: this._scenes,
		};
	}

	/**
	 * Determines whether paused is
	 */
	private _isPaused: boolean = false;

	/**
	 * Renders once
	 * @returns
	 */
	private _renderOnce() {
		if (this.renderer === null) {
			return;
		}
		if (this.stats !== null) {
			this.stats.begin();
		}
		const renderTimer = this.clock.getTimer(this.renderer, this.events);
		this.events.direction.lerp(this.events.keyInfo.xy, renderTimer.delta / 3);
		this.onRender.emit(renderTimer);
		this.controllerList.forEach((controller) => {
			controller.update(renderTimer);
		});
		this.sceneList.forEach((scene) => {
			scene.update(renderTimer);
		});
		ThreeUtil.render(renderTimer);
		if (this.controls !== null) {
			this.controls.forEach((control) => {
				control.render(renderTimer);
			});
		}
		if (ThreeUtil.isNull(this.beforeRender) || !this.beforeRender(this.getRenderInfo(renderTimer))) {
			// if (this.composerList.length > 0 && this.renderer instanceof THREE.WebGLRenderer && this.panSpeed ) {
			this._updateSubject.next(renderTimer);
			if (this.composerList.length > 0 && this.renderer instanceof THREE.WebGLRenderer) {
				this.composerList.forEach((composer) => {
					composer.render(this.renderer as THREE.WebGLRenderer, renderTimer);
				});
			} else if (this.cameraList && this.cameraList.length > 0) {
				this.cameraList.forEach((camera) => {
					camera.render(this.renderer, this.cssRenderer, this.scene || this.sceneList, renderTimer);
				});
			} else if (ThreeUtil.isNotNull(this.camera)) {
				this.camera.render(this.renderer, this.cssRenderer, this.scene || this.sceneList, renderTimer);
			}
			this.viewerList.forEach((viewer) => {
				viewer.render(this.renderer, this.scene || this.sceneList, this.camera || this.cameraList, renderTimer);
			});
		}
		if (this.stats !== null) {
			this.stats.end();
		}
	}

	/**
	 * Renders renderer component
	 * @returns
	 */
	public render() {
		if (this.renderer === null) {
			return;
		}
		if (!this._isPaused) {
			this._renderOnce();
		}
		requestAnimationFrame(this._renderCaller);
	}

	/**
	 * Hosts listener
	 */
	@HostListener('window:resize')
	public resizeRender() {
		if (typeof this.width === 'string' || typeof this.height === 'string' || this.width <= 0 || this.height <= 0) {
			if (this.sizeType === 'auto') {
				this.setSize(this.rendererEle.nativeElement.clientWidth, this.rendererEle.nativeElement.clientHeight);
			} else {
				this.setSize(window.innerWidth, window.innerHeight);
			}
		} else {
			this.setSize(this.width, this.height);
		}
	}

	/**
	 * Gets canvas json
	 * @param callback
	 * @param [options]
	 */
	public getCanvasJson(callback: (json) => void, options?: { width?: number; height?: number; name?: string; type?: string }) {
		if (this.renderer !== null && this.renderer.domElement !== null && ThreeUtil.isNotNull(this.renderer.domElement.toDataURL)) {
			this._isPaused = true;
			this._renderOnce();
			options = options || {};
			let imageType = ThreeUtil.getTypeSafe(options.type, 'png');
			let contentType = 'image/png';
			switch (imageType.toLowerCase()) {
				case 'jpg':
				case 'jpeg':
					contentType = 'image/jpeg';
					break;
				case 'png':
				default:
					imageType = 'png';
					contentType = 'image/png';
					break;
			}
			let imageName = ThreeUtil.getTypeSafe(options.name, 'auto');
			if (imageName == '' || imageName == 'auto') {
				imageName = window.location.hash.substr(window.location.hash.lastIndexOf('/') + 1);
			}
			const resultJson = {
				content: null,
				contentType: contentType,
				size: 0,
				name: imageName + '.' + imageType,
			};
			if (ThreeUtil.isNotNull(options.width) && ThreeUtil.isNotNull(options.height) && options.width > 0 && options.height > 0) {
				const canvas: HTMLCanvasElement = document.createElement('canvas');
				canvas.width = options.width;
				canvas.height = options.height;
				const context = canvas.getContext('2d', {
					alpha: true,
				});
				const canvasImage: HTMLImageElement = document.createElement('img');
				canvasImage.src = this.renderer.domElement.toDataURL('png');
				canvasImage.addEventListener('load', () => {
					let sx: number = 0;
					let sy: number = 0;
					let sw: number = 0;
					let sh: number = 0;
					const canvasImageRate = canvasImage.naturalWidth / canvasImage.naturalHeight;
					const thumbRate = options.width / options.height;
					if (canvasImageRate > thumbRate) {
						sw = canvasImage.naturalHeight * thumbRate;
						sh = canvasImage.naturalHeight;
						sx = (canvasImage.naturalWidth - sw) / 2;
					} else {
						sh = canvasImage.naturalWidth / thumbRate;
						sw = canvasImage.naturalWidth;
						sy = (canvasImage.naturalHeight - sh) / 2;
					}
					let dx: number = 0;
					let dy: number = 0;
					let dw: number = options.width;
					let dh: number = options.height;
					context.drawImage(canvasImage, sx, sy, sw, sh, dx, dy, dw, dh);
					resultJson.content = canvas.toDataURL(imageType);
					if (ThreeUtil.isNotNull(options.name)) {
						this.getDownloadFile(resultJson);
					} else {
						const blob = this.dataURLtoBlob(resultJson.content);
						resultJson.size = blob.size;
					}
					this._isPaused = false;
					callback(resultJson);
				});
				canvasImage.addEventListener('error', () => {
					this._isPaused = false;
				});
			} else {
				resultJson.content = this.renderer.domElement.toDataURL(imageType);
				if (ThreeUtil.isNotNull(options.name)) {
					this.getDownloadFile(resultJson);
				} else {
					const blob = this.dataURLtoBlob(resultJson.content);
					resultJson.size = blob.size;
				}
				this._isPaused = false;
				callback(resultJson);
			}
		}
	}

	/**
	 * Gets download file
	 * @param result
	 */
	private getDownloadFile(result) {
		if (result && result.content !== null && result.content !== '') {
			const blob = this.dataURLtoBlob(result.content);
			result.size = blob.size;
			var tempUrl = window.URL.createObjectURL(blob);
			let link = document.createElement('a');
			link.setAttribute('download', result.name);
			link.setAttribute('href', tempUrl);
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	}

	/**
	 * 서버로 부터 파일 다운 받기 - Blob
	 *
	 * @param dataUrl {{ string }}
	 *
	 * @returns {{Blob}}
	 */
	private dataURLtoBlob(dataUrl: string): Blob {
		let arr = dataUrl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while (n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], { type: mime });
	}

	/**
	 * Changes auto size
	 */
	public changeAutoSize() {}

	/**
	 * Resizes canvas
	 * @param width
	 * @param height
	 */
	public resizeCanvas(width: number, height: number) {
		if (width <= 0 || height <= 0) {
			this.width = 0;
			this.height = 0;
			this.sizeType = 'auto';
			this.resizeRender();
		} else {
			this.width = width;
			this.height = height;
			this.setSize(this.width, this.height);
		}
	}
}
