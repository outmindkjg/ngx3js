import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { CameraComponent } from '../camera/camera.component';
import { AbstractComposerComponent, AbstractEffectComposer, RendererTimer, ThreeUtil } from '../interface';
import { PassComponent } from '../pass/pass.component';

@Component({
  selector: 'three-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss']
})
export class ComposerComponent extends AbstractComposerComponent implements OnInit, AbstractEffectComposer {

  @Input() scene: THREE.Scene = null;
  @Input() camera: THREE.Camera = null;
  @Input() clear: boolean = false;
  @Input() viewport: boolean = false;
  @Input() x: number | string = 0;
  @Input() y: number | string = 0;
  @Input() width: number | string = '100%';
  @Input() height: number | string = '100%';

  @ContentChildren(PassComponent, { descendants: false }) pass: QueryList<PassComponent>;

  constructor() { 
    super();
  }

  private getScene(def?: THREE.Scene): THREE.Scene {
    const scene = ThreeUtil.getTypeSafe(this.scene, def);
    return ThreeUtil.isNotNull(scene) ? scene : new THREE.Scene();
  }

  private getCamera(def?: THREE.Camera): THREE.Camera {
    const camera = ThreeUtil.getTypeSafe(this.camera, def);
    return ThreeUtil.isNotNull(camera) ? camera : new THREE.Camera();
  }

  private getX(def?: number | string): number {
    const x = ThreeUtil.getTypeSafe(this.x, def);
    if (ThreeUtil.isNotNull(x)) {
      if (typeof (x) == 'string') {
        if (x.endsWith('%')) {
          return this.cameraWidth * parseFloat(x.slice(0, -1)) / 100
        } else {
          return parseFloat(x)
        }
      } else {
        return x;
      }
    }
    return 0;
  }

  private getY(def?: number | string): number {
    const y = ThreeUtil.getTypeSafe(this.y, def);
    if (ThreeUtil.isNotNull(y)) {
      if (typeof (y) == 'string') {
        if (y.endsWith('%')) {
          return this.cameraHeight * parseFloat(y.slice(0, -1)) / 100
        } else {
          return parseFloat(y);
        }
      } else {
        return y;
      }
    }
    return 0;
  }

  private getWidth(def?: number | string): number {
    const width = ThreeUtil.getTypeSafe(this.width, def);
    if (ThreeUtil.isNotNull(width)) {
      if (typeof (width) == 'string') {
        if (width.endsWith('%')) {
          return this.cameraWidth * parseFloat(width.slice(0, -1)) / 100
        } else {
          return parseFloat(width)
        }
      } else {
        return width;
      }
    }
    return 0;
  }

  private getHeight(def?: number | string): number {
    const height = ThreeUtil.getTypeSafe(this.height, def);
    if (ThreeUtil.isNotNull(height)) {
      if (typeof (height) == 'string') {
        if (height.endsWith('%')) {
          return this.cameraHeight * parseFloat(height.slice(0, -1)) / 100
        } else {
          return parseFloat(height)
        }
      } else {
        return height;
      }
    }
    return 0;
  }

  setCamera(cameraComponent: CameraComponent) {
    if (this.cameraComponent !== cameraComponent) {
      this.cameraComponent = cameraComponent;
      this.resetEffectComposer();
    }
  }

  ngOnInit(): void {
  }

  resetEffectComposer() {
    this.effectComposer = null;
    if (this.cameraComponent !== null) {
      this.effectComposer = this.getEffectComposer(
        this.cameraComponent
      );
    }
  }

  private cameraWidth: number = 0;
  private cameraHeight: number = 0;

  setCameraSize(width: number, height: number) {
    this.cameraWidth = width;
    this.cameraHeight = height;
  }

  render(webGLRenderer: THREE.WebGLRenderer, renderTimer: RendererTimer) {
    if (this.effectComposer !== null) {
      if (this.clear) {
        webGLRenderer.autoClear = false;
        webGLRenderer.clear();
      }
      if (this.viewport) {
        webGLRenderer.setViewport(
          this.getX(),
          this.getY(),
          this.getWidth(),
          this.getHeight()
        );
      }
      this.effectComposer.render(renderTimer.delta);
    }
  }

  private cameraComponent: CameraComponent = null;
  private effectComposer: EffectComposer = null;

  getWriteBuffer(cameraComponent: CameraComponent): THREE.WebGLRenderTarget {
    return this.getEffectComposer(cameraComponent).writeBuffer;  
  }

  getReadBuffer(cameraComponent: CameraComponent): THREE.WebGLRenderTarget {
    return this.getEffectComposer(cameraComponent).readBuffer;  
  }

  getRenderTarget1(cameraComponent: CameraComponent): THREE.WebGLRenderTarget {
    return this.getEffectComposer(cameraComponent).renderTarget1;  
  }
 
  getRenderTarget2(cameraComponent: CameraComponent): THREE.WebGLRenderTarget {
    return this.getEffectComposer(cameraComponent).renderTarget2;  
  }

  getEffectComposer(cameraComponent: CameraComponent): EffectComposer {
    if (this.effectComposer === null) {
      this.cameraComponent = cameraComponent;
      const scene = this.cameraComponent.getScene();
      const camera = this.cameraComponent.getCamera();
      const webGLRenderer = this.cameraComponent.getRenderer() as THREE.WebGLRenderer;
      this.effectComposer = new EffectComposer(webGLRenderer);
      this.pass.forEach(item => {
        const pass = item.getPass(this.getScene(scene), this.getCamera(camera), this, this.cameraComponent);
        if (pass !== null) {
          this.effectComposer.addPass(pass);
        }
      })
    }
    return this.effectComposer;
  }
}
