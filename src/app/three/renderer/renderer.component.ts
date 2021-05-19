import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import * as GSAP from 'gsap';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CanvasComponent } from '../canvas/canvas.component';
import { ComposerComponent } from '../composer/composer.component';
import { ControlComponent } from '../control/control.component';
import { ControllerComponent } from '../controller/controller.component';
import {
  GuiControlParam,
  RendererEvent,
  RendererInfo,
  RendererTimer,
  ThreeClock,
  ThreeGui,
  ThreeStats,
  ThreeUtil,
} from '../interface';
import { PlaneComponent } from '../plane/plane.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { AudioComponent } from './../audio/audio.component';
import { CameraComponent } from './../camera/camera.component';
import { ListenerComponent } from './../listener/listener.component';
import { LookatComponent } from './../lookat/lookat.component';
import { SceneComponent } from './../scene/scene.component';

@Component({
  selector: 'three-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss'],
})
export class RendererComponent
  implements OnInit, AfterContentInit, AfterViewInit, OnChanges
{
  @Input() public type: string = 'webgl';
  @Input() private css3dType: string = 'none';
  @Input() private controlType: string = 'none';
  @Input() private autoRotate: boolean = false;
  @Input() private shadowMapEnabled: boolean = true;
  @Input() private physicallyCorrectLights: boolean = false;
  @Input() private shadowMapType: string = null;
  @Input() private screenSpacePanning: boolean = null;
  @Input() private minDistance: number = null;
  @Input() private maxDistance: number = null;
  @Input() private xDistance: number = null;
  @Input() private yDistance: number = null;
  @Input() private minZoom: number = null;
  @Input() private maxZoom: number = null;
  @Input() private rotateSpeed: number = null;
  @Input() private staticMoving: boolean = null;
  @Input() private zoomSpeed: number = null;
  @Input() private panSpeed: number = null;
  @Input() private maxPolarAngle: number = null;
  @Input() private clearColor: string | number = null;
  @Input() private toneMapping: string = null;
  @Input() private toneMappingExposure: number = null;
  @Input() private clearAlpha: number = null;
  @Input() private localClippingEnabled: boolean = false;
  @Input() private globalClippingEnabled: boolean = true;
  @Input() private enablePan: boolean = true;
  @Input() private enableKeys: boolean = true;
  @Input() private enableDamping: boolean = false;
  @Input() private movementSpeed: number = null;
  @Input() private rollSpeed: number = null;
  @Input() private dragToLook: boolean = null;
  @Input() private autoForward: boolean = null;
  @Input() private lookSpeed: number = null;
  @Input() private lookVertical: boolean = null;
  @Input() private activeLook: boolean = null;
  @Input() private heightSpeed: boolean = null;
  @Input() private heightCoef: number = null;
  @Input() private heightMin: number = null;
  @Input() private heightMax: number = null;
  @Input() private constrainVertical: boolean = null;
  @Input() private verticalMin: number = null;
  @Input() private verticalMax: number = null;
  @Input() private mouseDragOn: boolean = null;

  @Input() private antialias: boolean = false;
  @Input() public sizeType: string = 'auto';
  @Input() private width: number = -1;
  @Input() private height: number = -1;
  @Input() private statsMode: number = -1;
  @Input() private autoClear: boolean = true;
  @Input() private autoClearColor: boolean = true;
  @Input() private outputEncoding: string = null;
  @Input() private guiControl: any = null;
  @Input() private logarithmicDepthBuffer: boolean = false;
  @Input() private preserveDrawingBuffer: boolean = false;
  @Input() private guiParams: GuiControlParam[] = [];
  @Input() private useEvent: string[] = null;
  @Input() private beforeRender: (info: RendererInfo) => boolean = null;
  @Output() private eventListener: EventEmitter<RendererEvent> =
    new EventEmitter<RendererEvent>();
  @Output() private onRender: EventEmitter<RendererTimer> =
    new EventEmitter<RendererTimer>();
  @Output() private onLoad: EventEmitter<RendererComponent> =
    new EventEmitter<RendererComponent>();

  @ContentChildren(SceneComponent, { descendants: false })
  private sceneList: QueryList<SceneComponent>;
  @ContentChildren(CameraComponent, { descendants: true })
  private cameraList: QueryList<CameraComponent>;
  @ContentChildren(ComposerComponent, { descendants: true })
  private composerList: QueryList<ComposerComponent>;
  @ContentChildren(ViewerComponent, { descendants: true })
  private viewerList: QueryList<ViewerComponent>;
  @ContentChildren(ListenerComponent, { descendants: true })
  private listnerList: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: true })
  private audioList: QueryList<AudioComponent>;
  @ContentChildren(ControllerComponent, { descendants: true })
  private controllerList: QueryList<ControllerComponent>;
  @ContentChildren(LookatComponent, { descendants: false })
  private lookatList: QueryList<LookatComponent>;
  @ContentChildren(ControlComponent, { descendants: false })
  private controlList: QueryList<ControlComponent>;

  @ContentChildren(PlaneComponent)
  private clippingPlanes: QueryList<PlaneComponent>;
  @ContentChildren(CanvasComponent)
  private canvas2d: QueryList<CanvasComponent>;

  @ViewChild('canvas') private canvas: ElementRef;
  @ViewChild('debug') private debug: ElementRef;
  @ViewChild('renderer') private _renderer: ElementRef;

  private getEncoding(def?: string): THREE.TextureEncoding {
    const encoding = ThreeUtil.getTypeSafe(this.outputEncoding, def, '');
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
      default:
        return THREE.LinearEncoding;
    }
  }

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
    if (this.clippingPlanes !== null && this.clippingPlanes !== undefined) {
      const clippingPlanes: THREE.Plane[] = [];
      this.clippingPlanes.forEach((plane) => {
        clippingPlanes.push(plane.getWorldPlane());
      });
      return clippingPlanes;
    } else {
      return def;
    }
  }

  constructor() {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if ((changes.type || changes.logarithmicDepthBuffer) && this.renderer) {
      this.canvas.nativeElement.removeChild(this.renderer.domElement);
      this.renderer = null;
      this.renderer = this.getRenderer();
    }
    if (this.renderer !== null) {
      if (changes.width || changes.height) {
        if (this.width > 0 && this.height > 0) {
          this.setSize(this.width, this.height);
        } else {
          this.setSize(window.innerWidth, window.innerHeight);
        }
      }
      if (changes.statsMode) {
        if (this.statsMode >= 0) {
          if (this.stats === null) {
            this.getStats();
          }
          this.stats.showPanel(this.statsMode);
        } else {
          if (this.stats != null) {
            this.debug.nativeElement.removeChild(this.stats.dom);
          }
          this.stats = null;
        }
      }
      if (changes.guiControl || changes.guiParams) {
        if (this.gui != null) {
          this.debug.nativeElement.removeChild(this.gui.domElement);
          this.gui = null;
        }
        if (this.guiControl != null) {
          ThreeUtil.setupGui(this.guiControl, this.getGui(), this.guiParams);
        }
      }
      if (changes.localClippingEnabled) {
        if (this.renderer instanceof THREE.WebGLRenderer) {
          this.renderer.localClippingEnabled = this.localClippingEnabled;
        }
      }
      if (changes.globalClippingEnabled) {
        if (this.renderer instanceof THREE.WebGLRenderer) {
          this.renderer.clippingPlanes = !this.globalClippingEnabled
            ? []
            : this.getClippingPlanes();
        }
      }
    }
    if (changes.useEvent) {
      const useEvent = ThreeUtil.isNotNull(this.useEvent) ? this.useEvent : [];
      if (useEvent.indexOf('change') > -1) {
        this.eventChange = this.addWindowEvent('change', this.eventChange);
      } else {
        this.eventChange = this.removeWindowEvent('change', this.eventChange);
      }
      if (
        useEvent.indexOf('pointerdown') > -1 ||
        useEvent.indexOf('mousedown') > -1 ||
        useEvent.indexOf('down') > -1
      ) {
        this.eventPointerDown = this.addWindowEvent(
          'pointerdown',
          this.eventPointerDown
        );
      } else {
        this.eventPointerDown = this.removeWindowEvent(
          'pointerdown',
          this.eventPointerDown
        );
      }
      if (
        useEvent.indexOf('pointerup') > -1 ||
        useEvent.indexOf('mouseup') > -1 ||
        useEvent.indexOf('up') > -1 ||
        useEvent.indexOf('click') > -1
      ) {
        this.eventPointerUp = this.addWindowEvent(
          'pointerup',
          this.eventPointerUp
        );
      } else {
        this.eventPointerUp = this.removeWindowEvent(
          'pointerup',
          this.eventPointerUp
        );
      }
      if (
        useEvent.indexOf('pointermove') > -1 ||
        useEvent.indexOf('mousemove') > -1 ||
        useEvent.indexOf('move') > -1
      ) {
        this.eventPointerMove = this.addWindowEvent(
          'pointermove',
          this.eventPointerMove
        );
      } else {
        this.eventPointerMove = this.removeWindowEvent(
          'pointermove',
          this.eventPointerMove
        );
      }
      if (useEvent.indexOf('keydown') > -1) {
        this.eventKeyDown = this.addWindowEvent('keydown', this.eventKeyDown);
      } else {
        this.eventKeyDown = this.removeWindowEvent(
          'keydown',
          this.eventKeyDown
        );
      }
      if (useEvent.indexOf('keyup') > -1) {
        this.eventKeyUp = this.addWindowEvent('keyup', this.eventKeyUp);
      } else {
        this.eventKeyUp = this.removeWindowEvent('keyup', this.eventKeyUp);
      }
      if (useEvent.indexOf('keypress') > -1) {
        this.eventKeyPress = this.addWindowEvent(
          'keypress',
          this.eventKeyPress
        );
      } else {
        this.eventKeyPress = this.removeWindowEvent(
          'keypress',
          this.eventKeyPress
        );
      }
      if (useEvent.indexOf('click') > -1) {
        this.eventClick = this.addWindowEvent('click', this.eventClick);
      } else {
        this.eventClick = this.removeWindowEvent('click', this.eventClick);
      }
    }
  }

  removeWindowEvent(type: string, listener: any) {
    if (listener !== null) {
      window.removeEventListener(type, listener);
    }
    return null;
  }

  addWindowEvent(type: string, listener: any) {
    if (listener === null) {
      listener = (event) => {
        if (
          ThreeUtil.isNotNull(this._renderer) &&
          ThreeUtil.isNotNull(this.renderer)
        ) {
          const offsetTop = this._renderer.nativeElement.offsetTop;
          const offsetLeft = this._renderer.nativeElement.offsetLeft;
          const offsetRight = offsetLeft + this.rendererWidth;
          const offsetBottom = offsetTop + this.rendererHeight;
          switch (type) {
            case 'keydown':
            case 'keyup':
            case 'keypress':
              event.clientX = offsetLeft;
              event.clientY = offsetTop;
              break;
          }
          if (
            event.clientX >= offsetLeft &&
            event.clientX <= offsetRight &&
            event.clientY >= offsetTop &&
            event.clientY <= offsetBottom
          ) {
            const offsetX = event.clientX - offsetLeft;
            const offsetY = event.clientY - offsetTop;
            this.eventListener.emit({
              type: type,
              clientX: event.clientX,
              clientY: event.clientY,
              offsetX: offsetX,
              offsetY: offsetY,
              rateX: offsetX / this.rendererWidth,
              rateY: offsetY / this.rendererHeight,
              width: this.rendererWidth,
              height: this.rendererHeight,
              mouse: new THREE.Vector2(
                (offsetX / this.rendererWidth) * 2 - 1,
                -(offsetY / this.rendererHeight) * 2 + 1
              ),
              event: event,
            });
          }
        }
      };
      window.addEventListener(type, listener);
    }
    return listener;
  }

  private eventChange: (event: any) => void = null;
  private eventPointerDown: (event: any) => void = null;
  private eventPointerUp: (event: any) => void = null;
  private eventPointerMove: (event: any) => void = null;
  private eventKeyDown: (event: any) => void = null;
  private eventKeyUp: (event: any) => void = null;
  private eventKeyPress: (event: any) => void = null;
  private eventClick: (event: any) => void = null;

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

  setSize(width: number, height: number) {
    if (this.renderer !== null) {
      this.rendererWidth = width;
      this.rendererHeight = height;
      this.renderer.setSize(this.rendererWidth, this.rendererHeight);
      this.cameraList.forEach((camera) => {
        camera.setCameraSize(this.rendererWidth, this.rendererHeight);
      });
      this.composerList.forEach((composer) => {
        composer.setComposerSize(this.rendererWidth, this.rendererHeight);
      });
      this.viewerList.forEach((viewer) => {
        viewer.setViewerSize(this.rendererWidth, this.rendererHeight);
      });
      if (this.cssRenderer !== null) {
        this.cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
      }
      const rendererSize = this.getSize();
      this.canvas2d.forEach((canvas2d) => {
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

  userGestureSubscribe(): Observable<boolean> {
    const observable = this._userGestureSubject.asObservable();
    if (!this._userGestureShown) {
      this._userGestureShown = true;
      setTimeout(() => {
        this.drawGesture();
      }, 100);
    }
    return observable;
  }

  _userGestureShown: boolean = false;
  drawGesture() {
    this._userGestureShown = true;
    const confirm = document.createElement('div');
    confirm.style.position = 'absolute';
    confirm.style.left = '0px';
    confirm.style.top = '0px';
    confirm.style.right = '0px';
    confirm.style.bottom = '0px';
    confirm.style.zIndex = '1000';
    confirm.style.backgroundColor = 'rgba(0,0,0,0.7)';
    const button = document.createElement('button');
    button.style.position = 'absolute';
    button.style.left = '50%';
    button.style.top = '50%';
    button.style.right = 'auto';
    button.style.bottom = 'auto';
    button.style.backgroundColor = 'black';
    button.style.color = 'white';
    button.innerHTML = '<b>P</b>lay';
    button.addEventListener('click', () => {
      this._userGestureSubject.next(true);
      confirm.parentNode.removeChild(confirm);
      this._userGestureShown = false;
    });
    confirm.append(button);
    this.canvas.nativeElement.appendChild(confirm);
  }

  getSize(): THREE.Vector2 {
    return new THREE.Vector2(this.rendererWidth, this.rendererHeight);
  }

  ngAfterContentInit() {
    this.listnerList.changes.subscribe(() => {
      this.synkObject3D(['listner']);
    });
    this.audioList.changes.subscribe(() => {
      this.synkObject3D(['audio']);
    });
    this.canvas2d.changes.subscribe(() => {
      this.synkObject3D(['canvas2d']);
    });
    this.controllerList.changes.subscribe(() => {
      this.synkObject3D(['controller']);
    });
  }

  private renderListner: THREE.AudioListener = null;

  synkObject3D(synkTypes: string[]) {
    if (this.renderer !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'listner':
            this.listnerList.forEach((listner) => {
              this.renderListner = listner.getListener();
            });
            break;
          case 'audio':
            this.audioList.forEach((audio) => {
              audio.setListener(this.renderListner, this);
            });
            break;
          case 'canvas2d':
            this.canvas2d.forEach((canvas2d) => {
              canvas2d.setParentNode(this.canvas.nativeElement);
            });
            break;
          case 'controller':
            this.controllerList.forEach((controller) => {
              controller.setRenderer(
                this.renderer,
                this.sceneList,
                this.cameraList,
                this.canvas2d
              );
            });
            break;
          case 'viewer':
            this.viewerList.forEach((viewer) => {
              viewer.getViewer();
            });
            break;
          case 'composer':
            if (this.renderer instanceof THREE.WebGLRenderer) {
              const camera = this.cameraList.first.getCamera();
              const scene = this.sceneList.first.getScene();
              this.composerList.forEach((composer) => {
                composer.getEffectComposer(this.renderer as THREE.WebGLRenderer , camera, scene);
              });
            }
            break;
          }
      });
    }
  }

  private renderer: THREE.Renderer = null;
  private cssRenderer: CSS3DRenderer | CSS2DRenderer = null;
  public rendererWidth: number = null;
  public rendererHeight: number = null;

  private stats: ThreeStats = null;
  private gui: ThreeGui = null;
  private clock: ThreeClock = null;
  private controls: ControlComponent[] = null;

  private getControls(
    cameras: QueryList<CameraComponent>,
    scenes: QueryList<SceneComponent>,
    domElement: HTMLElement
  ): ControlComponent[] {
    let cameraComp: CameraComponent = null;
    let controlType: string = this.controlType.toLowerCase();
    let autoRotate: boolean = this.autoRotate;
    if (cameras !== null && cameras.length > 0) {
      let cameraCompFounded: boolean = false;
      cameraComp = cameras.find((camera) => {
        if (camera.controlType.toLowerCase() !== 'none') {
          controlType = camera.controlType;
          cameraCompFounded = true;
          if (camera.autoRotate !== null && camera.autoRotate !== undefined) {
            autoRotate = camera.autoRotate;
          }
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
      const scene: THREE.Scene = scenes.first.getScene();
      switch (controlType.toLowerCase()) {
        case 'orbit':
        case 'fly':
        case 'firstperson':
        case 'transform':
        case 'trackball':
        case 'plain':
          const control = new ControlComponent();
          control.setControlParams({
            type: controlType,
            autoRotate: autoRotate,
            screenSpacePanning: this.screenSpacePanning,
            minDistance: this.minDistance,
            maxDistance: this.maxDistance,
            xDistance: this.xDistance,
            yDistance: this.yDistance,
            minZoom: this.minZoom,
            maxZoom: this.maxZoom,
            rotateSpeed: this.rotateSpeed,
            staticMoving: this.staticMoving,
            zoomSpeed: this.zoomSpeed,
            panSpeed: this.panSpeed,
            maxPolarAngle: this.maxPolarAngle,
            enablePan: this.enablePan,
            enableKeys: this.enableKeys,
            enableDamping: this.enableDamping,
            movementSpeed: this.movementSpeed,
            rollSpeed: this.rollSpeed,
            dragToLook: this.dragToLook,
            autoForward: this.autoForward,
            lookSpeed: this.lookSpeed,
            lookVertical: this.lookVertical,
            activeLook: this.activeLook,
            heightSpeed: this.heightSpeed,
            heightCoef: this.heightCoef,
            heightMin: this.heightMin,
            heightMax: this.heightMax,
            constrainVertical: this.constrainVertical,
            verticalMin: this.verticalMin,
            verticalMax: this.verticalMax,
            mouseDragOn: this.mouseDragOn,
            lookatList: this.lookatList,
          });
          control.setCameraDomElement(camera, domElement, scene);
          controls.push(control);
      }
      if (this.controlList !== null && this.controlList !== undefined) {
        this.controlList.forEach((control) => {
          control.setCameraDomElement(camera, domElement, scene);
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
      this.debug.nativeElement.appendChild(this.stats.dom);
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
      this.debug.nativeElement.appendChild(this.gui.domElement);
    }
    return this.gui;
  }

  ngOnDestroy(): void {
    this.renderer = null;
  }

  ngAfterViewInit() {
    if (this.guiControl != null) {
      ThreeUtil.setupGui(this.guiControl, this.getGui(), this.guiParams);
    }
    this.clock = ThreeUtil.getClock(true);
    if (this.statsMode >= 0) {
      if (this.stats === null) {
        this.getStats();
      }
      this.stats.showPanel(this.statsMode);
    } else {
      this.stats = null;
    }
    this.renderer = this.getRenderer();
    this.cameraList.forEach((camera) => {
      camera.setRenderer(this.renderer, this.cssRenderer, this.sceneList);
    });
    this.setSize(this.rendererWidth, this.rendererHeight);
    this.synkObject3D(['listner', 'audio', 'canvas2d', 'controller', 'viewer', 'composer']);
    this.controls = this.getControls(
      this.cameraList,
      this.sceneList,
      this.canvas.nativeElement
    );
    this.resizeRender(null);
    this._renderCaller();
  }

  getRenderer(): THREE.Renderer {
    if (this.renderer === null) {
      GSAP.gsap.ticker.fps(60);
      if (this._renderCaller !== null) {
        GSAP.gsap.ticker.remove(this._renderCaller);
      }
      this._renderCaller = () => {
        this.render();
      };
      switch (this.css3dType.toLowerCase()) {
        case 'css3d':
          this.cssRenderer = new CSS3DRenderer();
          break;
        case 'css2d':
          this.cssRenderer = new CSS2DRenderer();
          break;
        default:
          this.cssRenderer = null;
          break;
      }
      switch (this.type.toLowerCase()) {
        default:
          this.renderer = new THREE.WebGLRenderer({
            alpha: this.cssRenderer !== null ? true : false,
            antialias: this.antialias,
            logarithmicDepthBuffer: this.logarithmicDepthBuffer,
            preserveDrawingBuffer: this.preserveDrawingBuffer,
          });
          break;
      }
      if (this.rendererWidth === null || this.rendererHeight === null) {
        const [width, height] =
          this.width > 0 && this.height > 0
            ? [this.width, this.height]
            : [window.innerWidth, window.innerHeight];
        this.rendererWidth = width;
        this.rendererHeight = height;
      }
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
        this.renderer.shadowMap.enabled = this.shadowMapEnabled;
        this.renderer.physicallyCorrectLights = this.physicallyCorrectLights;
        if (this.renderer.shadowMap.enabled) {
          this.renderer.shadowMap.type = this.getShadowMapType('pcfsoft');
        }
        this.renderer.autoClear = this.autoClear;
        this.renderer.autoClearColor = this.autoClearColor;
        if (this.outputEncoding !== null) {
          this.renderer.outputEncoding = this.getEncoding('linear');
        }
        this.renderer.localClippingEnabled = this.localClippingEnabled;
        this.renderer.clippingPlanes = !this.globalClippingEnabled
          ? []
          : this.getClippingPlanes();
      }
      if (this.cssRenderer !== null) {
        this.cssRenderer.domElement.style.position = 'absolute';
        this.cssRenderer.domElement.style.top = '0px';
        this.cssRenderer.domElement.style.left = '0px';
        this.cssRenderer.domElement.style.pointerEvents = 'none';
        this.canvas.nativeElement.appendChild(this.cssRenderer.domElement);
      }
      this.renderer.domElement.style.position = 'relative';
      this.canvas.nativeElement.appendChild(this.renderer.domElement);
      ThreeUtil.setRenderer(this.renderer);
      // GSAP.gsap.ticker.add(this._renderCaller);
      this.onLoad.emit(this);
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
        this._cameras.push(camera.getCamera());
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

  render() {
    if (this.renderer === null) {
      return;
    }
    if (this.stats != null) {
      this.stats.begin();
    }
    const renderTimer = this.clock.getTimer();
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
    if (
      ThreeUtil.isNull(this.beforeRender) ||
      !this.beforeRender(this.getRenderInfo(renderTimer))
    ) {
      if (this.composerList.length > 0 && this.renderer instanceof THREE.WebGLRenderer) {
        const renderer = this.renderer;
        this.composerList.forEach(composer => {
          composer.render(renderer, renderTimer);
        });
      } else {
        this.cameraList.forEach((camera) => {
          camera.render(
            this.renderer,
            this.cssRenderer,
            this.sceneList,
            renderTimer
          );
        });
      }
      this.viewerList.forEach((viewer) => {
        viewer.render(this.renderer, renderTimer);
      });

    }
    if (this.stats != null) {
      this.stats.end();
    }
    requestAnimationFrame(this._renderCaller);
  }

  @HostListener('window:resize')
  resizeRender(e: any) {
    if (this.width <= 0 || this.height <= 0) {
      if (this.sizeType === 'auto') {
        this.setSize(
          this._renderer.nativeElement.clientWidth,
          this._renderer.nativeElement.clientHeight
        );
      } else {
        this.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }

  resizeCanvas() {}
}
