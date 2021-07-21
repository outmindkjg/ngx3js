import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import * as GSAP from 'gsap';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { SVGRenderer } from 'three/examples/jsm/renderers/SVGRenderer';
import { WEBGL } from 'three/examples/jsm/WebGL';
import { CanvasComponent } from '../canvas/canvas.component';
import { ComposerComponent } from '../composer/composer.component';
import { ControlComponent } from '../control/control.component';
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

@Component({
  selector: 'ngx3js-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent extends AbstractSubscribeComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges {

  /**
   * 
   */
  @Input() public type: string = 'webgl';

  /**
   * 
   */
  @Input() private cssType: string = 'none';

  /**
   * 
   */
  @Input() private controlType: string = 'none';

  /**
   * 
   */
  @Input() private controlOptions: any = null;

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
   * 
   */
  @Input() private quality: string = null;

  /**
   * 
   */
  @Input() public sizeType: string = 'auto';

  /**
   * 
   */
  @Input() private width: number | string = -1;

  /**
   * 
   */
  @Input() private height: number | string = -1;

  /**
   * 
   */
  @Input() private x: number | string = 0;

  /**
   * 
   */
  @Input() private y: number | string = 0;

  /**
   * 
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
   */
  @Input() private outputEncoding: string = null;

  /**
   * 
   */
  @Input() private guiControl: any = null;

  /**
   * 
   */
  @Input() private guiParams: GuiControlParam[] = [];

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
   * 
   */
  @Input() private useEvent: string = null;

  /**
   * 
   */
  @Input() private camera: CameraComponent = null;

  /**
   * 
   */
  @Input() private scene: SceneComponent = null;

  /**
   * 
   */
  @Input() private beforeRender: (info: RendererInfo) => boolean = null;

  /**
   * 
   */
  @Output() private eventListener: EventEmitter<RendererEvent> = new EventEmitter<RendererEvent>();

  /**
   * 
   */
  @Output() private onRender: EventEmitter<RendererTimer> = new EventEmitter<RendererTimer>();


  /**
   * 
   */
  @ContentChildren(SceneComponent, { descendants: false }) private sceneList: QueryList<SceneComponent>;

  /**
   * 
   */
  @ContentChildren(CameraComponent, { descendants: true }) private cameraList: QueryList<CameraComponent>;

  /**
   * 
   */
  @ContentChildren(ComposerComponent, { descendants: true }) private composerList: QueryList<ComposerComponent>;

  /**
   * 
   */
  @ContentChildren(ViewerComponent, { descendants: true }) private viewerList: QueryList<ViewerComponent>;

  /**
   * 
   */
  @ContentChildren(ListenerComponent, { descendants: true }) private listenerList: QueryList<ListenerComponent>;

  /**
   * 
   */
  @ContentChildren(AudioComponent, { descendants: true }) private audioList: QueryList<AudioComponent>;

  /**
   * 
   */
  @ContentChildren(ControllerComponent, { descendants: true }) private controllerList: QueryList<ControllerComponent>;

  /**
   * 
   */
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;

  /**
   * 
   */
  @ContentChildren(ControlComponent, { descendants: false }) private controlList: QueryList<ControlComponent>;

  /**
   * 
   */
  @ContentChildren(PlaneComponent) private clippingPlanesList: QueryList<PlaneComponent>;

  /**
   * 
   */
  @ContentChildren(CanvasComponent) private canvas2dList: QueryList<CanvasComponent>;

  /**
   * 
   */
  @ContentChildren(SharedComponent, { descendants: true }) private sharedList: QueryList<SharedComponent>;


  /**
   * 
   */
  @ViewChild('canvas') private canvasEle: ElementRef = null;

  /**
   * 
   */
  @ViewChild('debug') private debugEle: ElementRef = null;

  /**
   * 
   */
  @ViewChild('renderer') private rendererEle: ElementRef = null;

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

  dispose() {
    if (this.renderer !== null && this.renderer instanceof THREE.WebGLRenderer) {
      if (this.renderer.domElement && this.renderer.domElement.parentNode) {
        this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
      }
      this.renderer.dispose();
      this.renderer = null;
    }
    if (this.cssRenderer !== null) {
      if (this.cssRenderer.domElement && this.cssRenderer.domElement.parentNode) {
        this.cssRenderer.domElement.parentNode.removeChild(this.cssRenderer.domElement);
      }
      this.cssRenderer = null;
    }
  }

  removeEvent(type: string, listener: any) {
    if (ThreeUtil.isNotNull(listener)) {
      switch(type) {
        case 'keydown' :
        case 'keyup' :
        case 'keypress' :
          window.removeEventListener(type, listener);
          break;
        default :
          this.rendererEle.nativeElement.removeEventListener(type, listener);
          break;
      }
    }
    return null;
  }

  events: RendererEvent = {
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

  private offsetTop: number = 0;
  private offsetLeft: number = 0;
  private offsetRight: number = 0;
  private offsetBottom: number = 0;

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

  addEvent(type: string, listener: any) {
    if (ThreeUtil.isNull(listener)) {
      listener = (event: TouchInit | KeyboardEvent) => {
        this.setEvents(type, event);
      };
      switch(type) {
        case 'keydown' :
        case 'keyup' :
        case 'keypress' :
          window.addEventListener(type, listener);
          break;
        default :
          this.rendererEle.nativeElement.addEventListener(type, listener);
          break;
      }
    }
    return listener;
  }

  private _eventListener: {
    [key: string]: (event: any) => void;
  } = {};

  private getClearColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  private getClearAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

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

  private getRenderSize(size: number | string, renderSize: number, def?: number | string): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      if (typeof baseSize == 'string') {
        if (baseSize.indexOf('%') > 0) {
          const [percent, extra] = baseSize.split('%');
          const viewSize = Math.ceil(renderSize * parseFloat(percent) / 100);
          if (extra === '') {
            return viewSize;
          } else {
            return viewSize + parseInt(extra);
          }
        } else {
          return parseFloat(baseSize);
        }
      } else if (baseSize >= 0){
        return baseSize;
      }
    }
    return renderSize;
  }

  setSize(width: number, height: number) {
    const rendererWidth = this.getRenderSize(this.width , width);
    const rendererHeight = this.getRenderSize(this.height , height);
    const left = this.getRenderSize(this.x , width);
    const top = this.getRenderSize(this.y , height);
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
        this.cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
      }
      const rendererSize = this.getSize();
      this.canvas2dList.forEach((canvas2d) => {
        canvas2d.setSize(rendererSize);
      });
      this._sizeSubject.next(rendererSize);
    }
  }

  protected _sizeSubject: Subject<THREE.Vector2> = new Subject<THREE.Vector2>();

  sizeSubscribe(): Observable<THREE.Vector2> {
    return this._sizeSubject.asObservable();
  }

  protected _userGestureSubject: Subject<boolean> = new Subject<boolean>();

  userGestureSubscribe(ele?: HTMLElement): Observable<boolean> {
    const observable = this._userGestureSubject.asObservable();
    if (!this._userGestureShown) {
      this._userGestureShown = true;
      setTimeout(() => {
        this.drawGesture(ele);
      }, 100);
    }
    return observable;
  }

  _lastConfirmHtml: HTMLElement = null;
  _userGestureShown: boolean = false;
  drawGesture(ele?: HTMLElement) {
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

  getSize(): THREE.Vector2 {
    return new THREE.Vector2(this.rendererWidth, this.rendererHeight);
  }

  private renderlistener: THREE.AudioListener = null;

  applyChanges(changes: string[]) {
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
      if (ThreeUtil.isIndexOf(changes, ['width','height','x','y'])) {
        changes = ThreeUtil.pushUniq(changes, ['resize']);
      }
      this.consoleLog('render', changes, 'error');
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
            if (this.gui != null) {
              this.gui.domElement.parentNode.removeChild(this.gui.domElement);
              this.gui = null;
            }
            if (ThreeUtil.isNotNull(this.guiControl) && ThreeUtil.isNotNull(this.guiParams) && this.guiParams.length > 0) {
              ThreeUtil.setupGui(this.guiControl, this.getGui(), this.guiParams);
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
            if (useEvents.indexOf('pointerup') > -1 || useEvents.indexOf('mouseup') > -1 || useEvents.indexOf('up') > -1 || useEvents.indexOf('click') > -1) {
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
            if (useEvents.indexOf('keypress') > -1) {
              this._eventListener.keypress = this.addEvent('keypress', this._eventListener.keypress);
            } else {
              this._eventListener.keypress = this.removeEvent('keypress', this._eventListener.keypress);
            }
            if (useEvents.indexOf('click') > -1) {
              this._eventListener.click = this.addEvent('click', this._eventListener.click);
            } else {
              this._eventListener.click = this.removeEvent('click', this._eventListener.click);
            }
            if (useEvents.indexOf('mouseover') > -1) {
              this._eventListener.mouseover = this.addEvent('mouseover', this._eventListener.mouseover);
            } else {
              this._eventListener.mouseover = this.removeEvent('mouseover', this._eventListener.mouseover);
            }
            if (useEvents.indexOf('mouseout') > -1) {
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
              if (this.stats != null) {
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

  public renderer: THREE.Renderer = null;
  private cssRenderer: CSS3DRenderer | CSS2DRenderer = null;
  public rendererWidth: number = 1024;
  public rendererHeight: number = 768;

  private stats: ThreeStats = null;
  private gui: ThreeGui = null;
  private clock: ThreeClock = null;
  private controls: ControlComponent[] = null;
  private renderControl: ControlComponent = null;
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

  private getGui(): ThreeGui {
    if (this.gui == null) {
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

  ngAfterViewInit() {
    switch (this.type.toLowerCase()) {
      case 'gl2':
      case 'webgl2':
        if (WEBGL.isWebGL2Available() === false) {
          this.dispose();
          this.renderer = null;
          this.userGestureSubscribe(WEBGL.getWebGL2ErrorMessage()).subscribe(() => {
            this.ngAfterViewInit();
          });
          return;
        }
    }
    this.clock = ThreeUtil.getClock(true);
    this.renderer = this.getRenderer();
  }

  getObject(): THREE.Renderer {
    return this.getRenderer();
  }

  getRenderer(): THREE.Renderer {
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
        case '3d':
        case 'css3d':
          this.cssRenderer = new CSS3DRenderer();
          break;
        case '2d':
        case 'css2d':
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
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0px';
        this.cssRenderer.domElement.style.left = '0px';
        this.cssRenderer.domElement.style.pointerEvents = 'none';
        this.canvasEle.nativeElement.appendChild(this.cssRenderer.domElement);
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

  private _renderCaller: (...args: any[]) => void = null;

  private _cameras: THREE.Camera[] = null;
  private _scenes: THREE.Scene[] = null;

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

  private _isPaused: boolean = false;
  private _renderOnce() {
    if (this.renderer === null) {
      return;
    }
    if (this.stats != null) {
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
      if (this.composerList.length > 0 && this.renderer instanceof THREE.WebGLRenderer) {
        this.composerList.forEach((composer) => {
          composer.render(this.renderer as THREE.WebGLRenderer, renderTimer);
        });
      } else if (this.cameraList && this.cameraList.length > 0){
        this.cameraList.forEach((camera) => {
          camera.render(this.renderer, this.cssRenderer, this.scene || this.sceneList, renderTimer);
        });
      } else if (ThreeUtil.isNotNull(this.camera)) {
        this.camera.render(this.renderer, this.cssRenderer, this.scene || this.sceneList, renderTimer);
      }
      this.viewerList.forEach((viewer) => {
        viewer.render(this.renderer, this.scene || this.sceneList, this.camera || this.cameraList ,renderTimer);
      });
    }
    if (this.stats != null) {
      this.stats.end();
    }
  }

  render() {
    if (this.renderer === null) {
      return;
    }
    if (!this._isPaused) {
      this._renderOnce();
    }
    requestAnimationFrame(this._renderCaller);
  }

  @HostListener('window:resize')
  resizeRender() {
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

  getCanvasJson(callback: (json) => void, options?: { width?: number; height?: number; name?: string; type?: string }) {
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

  changeAutoSize() {}

  resizeCanvas(width: number, height: number) {
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
