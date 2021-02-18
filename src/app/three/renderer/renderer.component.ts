import { LookatComponent } from './../lookat/lookat.component';

import { AfterContentInit, AfterViewInit, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChild } from '@angular/core';
import * as GSAP from 'gsap';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { CSS2DRenderer } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { CanvasComponent } from '../canvas/canvas.component';
import { ControllerComponent } from '../controller/controller.component';
import { GuiControlParam, RendererTimer, ThreeClock, ThreeGui, ThreeStats, ThreeUtil } from '../interface';
import { PlaneComponent } from '../plane/plane.component';
import { AudioComponent } from './../audio/audio.component';
import { CameraComponent } from './../camera/camera.component';
import { ListenerComponent } from './../listener/listener.component';
import { SceneComponent } from './../scene/scene.component';
@Component({
  selector: 'three-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges {
  @Input() type: string = "webgl";
  @Input() css3dType: string = "none";
  @Input() controlType: string = "none";
  @Input() controlAutoRotate: boolean = false;
  @Input() shadowMapEnabled: boolean = true;
  @Input() clearColor: string | number = null;
  @Input() clearAlpha: number = null;
  @Input() localClippingEnabled: boolean = false;
  @Input() enablePan: boolean = true;
  @Input() enableDamping: boolean = false;

  @Input() antialias: boolean = false;
  @Input() sizeType: string = 'auto';
  @Input() width: number = -1;
  @Input() height: number = -1;
  @Input() statsMode: number = -1;
  @Input() guiControl: any = null;
  @Input() guiParams: GuiControlParam[] = [];
  @Output() onRender: EventEmitter<RendererTimer> = new EventEmitter<RendererTimer>();

  @ContentChildren(SceneComponent, { descendants: false }) scenes: QueryList<SceneComponent>;
  @ContentChildren(CameraComponent, { descendants: false }) cameras: QueryList<CameraComponent>;
  @ContentChildren(ListenerComponent, { descendants: true }) listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: true }) audio: QueryList<AudioComponent>;
  @ContentChildren(ControllerComponent, { descendants: true }) controller: QueryList<ControllerComponent>;
	@ContentChildren(LookatComponent, { descendants: false }) lookat: QueryList<LookatComponent>;

  @ContentChildren(PlaneComponent) clippingPlanes: QueryList<PlaneComponent>;
  @ContentChildren(CanvasComponent) canvas2d: QueryList<CanvasComponent>;

  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('debug') debug: ElementRef;
  @ViewChild('renderer') _renderer: ElementRef;

  private getClippingPlanes(def?: THREE.Plane[]): THREE.Plane[] {
    if (this.clippingPlanes !== null && this.clippingPlanes !== undefined) {
      const clippingPlanes: THREE.Plane[] = [];
      this.clippingPlanes.forEach(plane => {
        clippingPlanes.push(plane.getWorldPlane());
      });
      return clippingPlanes;
    } else {
      return def;
    }
  }

  constructor() {
  }

  ngOnInit(): void {
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type && this.renderer) {
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
    }
  }

  getClearColor(def: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  getClearAlpha(def: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

  setSize(width: number, height: number) {
    if (this.renderer !== null) {
      this.rendererWidth = width;
      this.rendererHeight = height;
      this.renderer.setSize(this.rendererWidth, this.rendererHeight);
      this.cameras.forEach(camera => {
        camera.setCameraSize(this.rendererWidth, this.rendererHeight);
      })
      if (this.cssRenderer !== null) {
        this.cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
      }
      const rendererSize = this.getSize();
      this.canvas2d.forEach(canvas2d => {
        canvas2d.setSize(rendererSize);
      })
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
      }, 100)
    }
    return observable;
  }

  _userGestureShown : boolean = false;
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
    })
    confirm.append(button);
    this.canvas.nativeElement.appendChild(confirm);

  }

  getSize(): THREE.Vector2 {
    return new THREE.Vector2(this.rendererWidth, this.rendererHeight);
  }

  ngAfterContentInit() {
    this.listner.changes.subscribe(() => {
      this.synkObject3D(['listner']);
    });
    this.audio.changes.subscribe(() => {
      this.synkObject3D(['audio']);
    });
    this.canvas2d.changes.subscribe(() => {
      this.synkObject3D(['canvas2d']);
    });
    this.controller.changes.subscribe(() => {
      this.synkObject3D(['controller']);
    });
  }

  private renderListner: THREE.AudioListener = null;

  synkObject3D(synkTypes: string[]) {
    if (this.renderer !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'listner':
            this.listner.forEach((listner) => {
              this.renderListner = listner.getListener();
            });
            break;
          case 'audio':
            this.audio.forEach((audio) => {
              audio.setListener(this.renderListner, this);
            });
            break;
          case 'canvas2d':
            this.canvas2d.forEach((canvas2d) => {
              canvas2d.setParentNode(this.canvas.nativeElement);
            });
            break;
          case 'controller':
            this.controller.forEach((controller) => {
              controller.setRenderer(this.renderer, this.scenes, this.cameras, this.canvas2d);
            });
            break;
          }
      });
    }
  }

  private renderer: THREE.Renderer = null;
  private cssRenderer: CSS3DRenderer | CSS2DRenderer = null;
  private rendererWidth: number = 100;
  private rendererHeight: number = 100;

  private stats: ThreeStats = null;
  private gui: ThreeGui = null;
  private clock: ThreeClock = null;
  private control: any = null;

  private getControls(cameras: QueryList<CameraComponent>, domElement: HTMLElement): any {
    let cameraComp: CameraComponent = null;
    let controlType: string = this.controlType.toLowerCase();
    let controlAutoRotate: boolean = this.controlAutoRotate;
    if (cameras !== null && cameras.length > 0) {
      cameraComp = cameras.find(camera => {
        if (camera.controlType.toLowerCase() !== 'none') {
          controlType = camera.controlType;
          if (camera.controlAutoRotate !== null && camera.controlAutoRotate !== undefined) {
            controlAutoRotate = camera.controlAutoRotate;
          }
          return true;
        } else if (controlType !== 'none') {
          return true;
        }
        return false;
      })
    }
    if (cameraComp !== null && cameraComp !== undefined) {
      const camera: THREE.Camera = cameraComp.getCamera();
      switch (controlType.toLowerCase()) {
        case "orbit":
          const controls = new OrbitControls(camera, domElement);
          controls.autoRotate = controlAutoRotate;
          controls.enableDamping = this.enableDamping;
          controls.enablePan = this.enablePan;
          return controls;
        case "fly":
          return new FlyControls(camera, domElement);
        case "firstperson":
          return new FirstPersonControls(camera, domElement);
        case "transform":
          return new TransformControls(camera, domElement);
        case "trackball":
          return new TrackballControls(camera, domElement);
      }
    }
    return null;
  }

  private getStats(): ThreeStats {
    if (this.stats === null) {
      this.stats = ThreeUtil.getStats({
        position: 'absolute',
        left: '0px',
        top: '0px'
      });
      this.debug.nativeElement.appendChild(this.stats.dom);
    }
    return this.stats;
  }

  private getGui(): ThreeGui {
    if (this.gui == null) {
      this.gui = new ThreeGui({
        position: 'absolute',
        marginRight : '0px',
        right: '0px',
        top: '0px'
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
    this.cameras.forEach(camera => {
      camera.setRenderer(this.renderer, this.cssRenderer, this.scenes);
      camera.setCameraSize(this.rendererWidth, this.rendererHeight);
    });
    this.control = this.getControls(this.cameras, this.canvas.nativeElement);
    if (this.control !== null) {
      this.lookat.forEach((lookat) => {
        lookat.setObject3D(this.control);
      });
    }
    this.resizeRender(null);
    // this.control = this.getControls(this.cameras, this.renderer);
  }

  getRenderer(): THREE.Renderer {
    if (this.renderer === null) {
      GSAP.gsap.ticker.fps(60);
      if (this._renderCaller !== null) {
        GSAP.gsap.ticker.remove(this._renderCaller);
      }
      this._renderCaller = () => {
        this.render();
      }
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
          this.renderer = new THREE.WebGLRenderer({ alpha: this.cssRenderer !== null ? true : false , antialias: this.antialias });
          break;
      }
      const [width, height] = (this.width > 0 && this.height > 0) ? [this.width, this.height] : [window.innerWidth, window.innerHeight];
      this.rendererWidth = width;
      this.rendererHeight = height;
      if (this.renderer instanceof THREE.WebGLRenderer) {
        this.renderer.setClearColor(this.getClearColor(0xEEEEEE));
        this.renderer.setClearAlpha(this.getClearAlpha(1));
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = this.shadowMapEnabled;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
        // this.renderer.outputEncoding = THREE.sRGBEncoding;
        this.renderer.localClippingEnabled = this.localClippingEnabled;
        this.renderer.clippingPlanes = this.getClippingPlanes([]);
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
      this.synkObject3D(['listner', 'audio','canvas2d','controller']);
      this.setSize(width, height);
      ThreeUtil.setRenderer(this.renderer);
      // GSAP.gsap.ticker.add(this._renderCaller);
      this._renderCaller();
    }
    return this.renderer;
  }

  private _renderCaller : (...args: any[]) => void = null;

  render() {
    if (this.renderer === null) {
      return;
    }
    if (this.stats != null) {
      this.stats.begin();
    }
    const renderTimer = this.clock.getTimer();
    this.onRender.emit(renderTimer);
    this.controller.forEach(controller => {
      controller.update(renderTimer);
    });
    this.scenes.forEach(scene => {
      scene.update(renderTimer);
    })
    ThreeUtil.render(renderTimer);
    if (this.control !== null) {
      if (this.control instanceof OrbitControls) {
        this.control.update();
      } else if (this.control instanceof FlyControls) {
        this.control.update(renderTimer.delta);
      } else if (this.control instanceof FirstPersonControls) {
        this.control.update(renderTimer.delta);
      } else if (this.control instanceof TrackballControls) {
        this.control.update();
      }
    }
    this.cameras.forEach(camera => {
      camera.render(this.renderer, this.cssRenderer ,this.scenes, renderTimer)
    });
    if (this.stats != null) {
      this.stats.end();
    }
    requestAnimationFrame(this._renderCaller);
  }

  @HostListener('window:resize')
  resizeRender(e: any) {
    if (this.width <= 0 || this.height <= 0) {
      if (this.sizeType === 'auto') {
        this.setSize(this._renderer.nativeElement.clientWidth, this._renderer.nativeElement.clientHeight);
      } else {
        this.setSize(window.innerWidth, window.innerHeight);
      }
    }
  }

  resizeCanvas() {
  }
}
