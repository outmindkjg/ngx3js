import { AfterContentInit, AfterViewInit, Component, ContentChild, ElementRef, EventEmitter, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import * as THREE from 'three';
import * as Stats from 'stats-js';
import * as dat from 'dat.gui';

import { CameraComponent } from './../camera/camera.component';
import { SceneComponent } from './../scene/scene.component';

export interface GuiControlParam {
  name: string;
  type?: string;
  min?: number;
  max?: number;
  step?: number;
  change?: (value?: any) => void;
  finishChange? : (value?: any) => void;
  children?: GuiControlParam[];
}

@Component({
  selector: 'three-renderer',
  templateUrl: './renderer.component.html',
  styleUrls: ['./renderer.component.scss']
})
export class RendererComponent implements OnInit, AfterContentInit, AfterViewInit, OnChanges {

  @ContentChild(SceneComponent) scene: SceneComponent;
  @ContentChild(CameraComponent) camera: CameraComponent;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('debug') debug: ElementRef;
  @Input() width: number = -1;
  @Input() height: number = -1;
  @Input() statsMode: number = -1;
  @Input() guiControl: any = null;
  @Input() guiParams: GuiControlParam[] = [];
  @Output() onRender:EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.width || changes.height) {
      if (this.width > 0 && this.height > 0) {
        this.setSize(this.width, this.height);
      } else {
        this.setSize(window.innerWidth, window.innerHeight);
      }
    }
    if (this.renderer !== null) {
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
          this.setupGui(this.guiControl, this.getGui(), this.guiParams);
        }
      }
    }
  }

  setSize(width: number, height: number) {
    if (this.renderer !== null) {
      this.cameraAspect = width / height;
      this.renderer.setSize(width, height);
      if (this.camera != null && this.camera != undefined) {
        this.getCamera();
      }
    }
  }

  ngAfterContentInit() {
    console.log(this.scene);
  }

  private renderer: THREE.Renderer = null;
  private cameraAspect: number = 1;
  private stats: Stats = null;
  private gui: dat.GUI = null;
  private clock : THREE.Clock = null;

  private getStats(): Stats {
    if (this.stats === null) {
      this.stats = new Stats();
      this.stats.dom.style.position = 'absolute';
      this.stats.dom.style.left = '10px';
      this.stats.dom.style.top = '25px';
      this.debug.nativeElement.appendChild(this.stats.dom);
    }
    return this.stats;
  }

  private getGui(): dat.GUI {
    if (this.gui == null) {
      this.gui = new dat.GUI();
      this.gui.domElement.style.position = 'absolute';
      this.gui.domElement.style.right = '0px';
      this.gui.domElement.style.top = '0px';
      this.debug.nativeElement.appendChild(this.gui.domElement);
    }
    return this.gui;
  }

  private setupGuiChange(control : dat.GUIController, onFinishChange? : (value?: any) => void, onChange? : (value?: any) => void) {
    if (onFinishChange != null) {
      control.onFinishChange(onFinishChange);
    }
    if (onChange != null) {
      control.onChange(onChange);
    }
  }

  private setupGui(control, gui: dat.GUI, params: GuiControlParam[]) {
    params.forEach(param => {
      switch (param.type) {
        case 'color':
          this.setupGuiChange(
            gui.addColor(control, param.name),
            param.finishChange, 
            param.change
          );
          break;
        case 'folder':
          const folder = gui.addFolder(param.name);
          this.setupGui(control, folder, param.children);
          break;
        case 'number':
          this.setupGuiChange(
            gui.add(control, param.name, param.min, param.max, param.step),
            param.finishChange, 
            param.change
          );
          break;
        default:
          this.setupGuiChange(
            gui.add(control, param.name), 
            param.finishChange, 
            param.change
          );
          break;
        
      }
    });
  }

  ngAfterViewInit() {
    if (this.guiControl != null) {
      this.setupGui(this.guiControl, this.getGui(), this.guiParams);
    }
    this.clock = new THREE.Clock();

    if (this.statsMode >= 0) {
      if (this.stats === null) {
        this.getStats();
      }
      this.stats.showPanel(this.statsMode);
    } else {
      this.stats = null;
    }
    this.renderer = new THREE.WebGLRenderer();
    const [width, height] = (this.width > 0 && this.height > 0) ? [this.width, this.height] : [window.innerWidth, window.innerHeight];
    this.cameraAspect = width / height;
    this.renderer.setSize(width, height);
    if (this.renderer instanceof THREE.WebGLRenderer) {
      this.renderer.setClearColor(new THREE.Color(0xEEEEEE));
      this.renderer.shadowMap.enabled = true;
    }
    this.canvas.nativeElement.appendChild(this.renderer.domElement);
    this.render();
  }

  getScene(): THREE.Scene {
    return this.scene.getScene();
  }

  getCamera(): THREE.Camera {
    return this.camera.getCamera(this.cameraAspect);
  }
  render() {
    if (this.stats != null) {
      this.stats.begin();
    }
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    
    this.onRender.emit({
      delta : delta,
      elapsedTime : elapsedTime
    });
    if (this.scene !== null && this.camera !== null) {
      this.renderer.render(
        this.getScene(),
        this.getCamera()
      );
    }
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
