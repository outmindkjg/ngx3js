import { Component, ContentChildren, Input, OnInit, QueryList } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';


import { InterfaceComposerComponent, InterfaceEffectComposer, RendererTimer, ThreeUtil } from '../interface';
import { PassComponent } from '../pass/pass.component';
import { AbstractTweenComponent } from '../tween.abstract';

@Component({
  selector: 'three-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss']
})
export class ComposerComponent extends AbstractTweenComponent implements OnInit, InterfaceEffectComposer, InterfaceComposerComponent {

  @Input() private type:string = 'composer';
  @Input() private scene:THREE.Scene = null;
  @Input() private camera:THREE.Camera = null;
  @Input() private clear:boolean = false;
  @Input() private viewport:boolean = false;
  @Input() private x:number | string = 0;
  @Input() private y:number | string = 0;
  @Input() private width:number | string = '100%';
  @Input() private height:number | string = '100%';

  @ContentChildren(PassComponent, { descendants: false }) private pass: QueryList<PassComponent>;

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

  setCamera(cameraComponent: any) {
    if (cameraComponent.getCamera) {
      this.effectCamera = cameraComponent.getCamera();
      this.effectScene = cameraComponent.getScene();
      this.webGLRenderer = cameraComponent.getRenderer();
      this.resetEffectComposer();
    }
  }

  ngOnInit(): void {
  }

  resetEffectComposer() {
    this.effectComposer = null;
    if (this.effectCamera !== null && this.webGLRenderer) {
      this.effectComposer = this.getEffectComposer(
        this.webGLRenderer, this.effectCamera, this.effectScene
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

  private webGLRenderer: THREE.WebGLRenderer = null;
  private effectCamera: THREE.Camera = null;
  private effectScene: THREE.Scene = null;
  private effectComposer: EffectComposer = null;

  getWriteBuffer(webGLRenderer: THREE.WebGLRenderer, camera : THREE.Camera, scene : THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).writeBuffer;
  }

  getReadBuffer(webGLRenderer: THREE.WebGLRenderer, camera : THREE.Camera, scene : THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).readBuffer;
  }

  getRenderTarget1(webGLRenderer: THREE.WebGLRenderer, camera : THREE.Camera, scene : THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).renderTarget1;
  }

  getRenderTarget2(webGLRenderer: THREE.WebGLRenderer, camera : THREE.Camera, scene : THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).renderTarget2;
  }

  getEffectComposer(webGLRenderer: THREE.WebGLRenderer, camera : THREE.Camera, scene : THREE.Scene): EffectComposer {
    if (this.effectComposer === null) {
      switch(this.type.toLowerCase()) {
        default :
          this.effectComposer = new EffectComposer(webGLRenderer);
          this.pass.forEach(item => {
            item.getPass(this.getScene(scene), this.getCamera(camera), this.effectComposer);
          })
          break;
      }
    }
    return this.effectComposer;
  }
}
