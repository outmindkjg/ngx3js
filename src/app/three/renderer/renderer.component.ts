import { AfterContentInit, AfterViewInit, Component, QueryList, ContentChildren, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { FlyControls } from 'three/examples/jsm/controls/FlyControls';
import { FirstPersonControls } from 'three/examples/jsm/controls/FirstPersonControls';
import { TrackballControls } from 'three/examples/jsm/controls/TrackballControls';
import { TransformControls } from 'three/examples/jsm/controls/TransformControls';
import { CameraComponent } from './../camera/camera.component';
import { SceneComponent } from './../scene/scene.component';
import { ThreeClock, ThreeStats, ThreeUtil, ThreeGui, GuiControlParam, RendererTimer } from '../interface';

@Component({
  selector: 'three-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges {

  @ContentChildren(SceneComponent, { descendants: false }) scenes: QueryList<SceneComponent>;
  @ContentChildren(CameraComponent, { descendants: false }) cameras: QueryList<CameraComponent>;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('debug') debug: ElementRef;

  @Input() type: string = "webgl";
  @Input() controlType: string = "none";
  @Input() controlAutoRotate: boolean = false;
  @Input() shadowMapEnabled: boolean = true;
  @Input() clearColor: string | number = null;

  @Input() antialias: boolean = false;
  @Input() width: number = -1;
  @Input() height: number = -1;
  @Input() statsMode: number = -1;
  @Input() guiControl: any = null;
  @Input() guiParams: GuiControlParam[] = [];
  @Output() onRender: EventEmitter<RendererTimer> = new EventEmitter<RendererTimer>();

  constructor() { }

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
    }
  }

  getClearColor(def: string | number): string | number {
    if (this.clearColor === null) {
      return def;
    } else {
      const clearColor = this.clearColor.toString();
      if (clearColor.startsWith('0x')) {
        return parseInt(clearColor, 16);
      } else {
        return this.clearColor;
      }
    }
  }

  setSize(width: number, height: number) {
    if (this.renderer !== null) {
      this.rendererWidth = width;
      this.rendererHeight = height;
      this.renderer.setSize(width, height);
    }
  }

  ngAfterContentInit() {
  }

  private renderer: THREE.Renderer = null;
  private rendererWidth: number = 100;
  private rendererHeight: number = 100;

  private stats: ThreeStats = null;
  private gui: ThreeGui = null;
  private clock: ThreeClock = null;
  private control: any = null;

  private getControls(cameras: QueryList<CameraComponent>, renderer: THREE.Renderer): any {
    let cameraComp: CameraComponent = null;
    let controlType: string = this.controlType.toLowerCase();
    let controlAutoRotate : boolean = this.controlAutoRotate;
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
          const controls = new OrbitControls(camera, renderer.domElement);
          controls.autoRotate = controlAutoRotate;
          return controls;
        case "fly":
          return new FlyControls(camera, renderer.domElement);
        case "firstperson":
          return new FirstPersonControls(camera, renderer.domElement);
        case "transform":
          return new TransformControls(camera, renderer.domElement);
        case "trackball":
          return new TrackballControls(camera, renderer.domElement);
      }
    }
    return null;
  }

  private getStats(): ThreeStats {
    if (this.stats === null) {
      this.stats = ThreeUtil.getStats({ 
        position : 'absolute',
        left : '10px',
        top : '25px'
      });
      this.debug.nativeElement.appendChild(this.stats.dom);
    }
    return this.stats;
  }

  private getGui(): ThreeGui {
    if (this.gui == null) {
      this.gui = new ThreeGui({
        position : 'absolute',
        right : '0px',
        top : '0px'
      });
      this.debug.nativeElement.appendChild(this.gui.domElement);
    }
    return this.gui;
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
      camera.setRenderer(this.renderer, this.scenes);
      camera.setCameraSize(this.rendererWidth, this.rendererHeight);
    });
    this.control = this.getControls(this.cameras, this.renderer);
    this.render();
  }

  getRenderer(): THREE.Renderer {
    if (this.renderer === null) {
      switch (this.type.toLowerCase()) {
        case 'webgl':
        default:
          this.renderer = new THREE.WebGLRenderer({ antialias: this.antialias });
          break;
      }
      const [width, height] = (this.width > 0 && this.height > 0) ? [this.width, this.height] : [window.innerWidth, window.innerHeight];
      this.rendererWidth = width;
      this.rendererHeight = height;
      this.renderer.setSize(width, height);
      if (this.renderer instanceof THREE.WebGLRenderer) {
        this.renderer.setClearColor(new THREE.Color(this.getClearColor(0xEEEEEE)));
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = this.shadowMapEnabled;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.outputEncoding = THREE.sRGBEncoding;
      }
      this.canvas.nativeElement.appendChild(this.renderer.domElement);
    }
    return this.renderer;
  }

  render() {
    if (this.stats != null) {
      this.stats.begin();
    }
    const renderTimer = this.clock.getTimer();
    this.onRender.emit(renderTimer);
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
      camera.render(this.renderer, this.scenes, renderTimer)
    });
    if (this.stats != null) {
      this.stats.end();
    }
    requestAnimationFrame(() => { this.render(); });
  }

  @HostListener('window:resize')
  resizeRender(e: any) {
    if (this.width <= 0 && this.height <= 0) {
      this.setSize(window.innerWidth, window.innerHeight);
    }
  }
}
