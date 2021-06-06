import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect';
import { PeppersGhostEffect } from 'three/examples/jsm/effects/PeppersGhostEffect';
import { RendererTimer, ThreeUtil } from '../interface';
import { PassComponent } from '../pass/pass.component';
import { AbstractTweenComponent } from '../tween.abstract';
import { CameraComponent } from '../camera/camera.component';
import { SceneComponent } from '../scene/scene.component';

@Component({
  selector: 'three-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss'],
})
export class ComposerComponent extends AbstractTweenComponent implements OnInit {
  @Input() private type: string = 'composer';
  @Input() private scene: THREE.Scene | SceneComponent = null;
  @Input() private camera: THREE.Camera | CameraComponent = null;
  @Input() private clear: boolean = false;
  @Input() private viewport: boolean = false;
  @Input() private viewportAspect: boolean = false;
  @Input() private renderToScreen: boolean = null;
  @Input() private x: number | string = 0;
  @Input() private y: number | string = 0;
  @Input() private width: number | string = '100%';
  @Input() private height: number | string = '100%';
  @Input() private reflectFromAbove: boolean = null;
  @Input() private cameraDistance: number = null;

  @ContentChildren(PassComponent, { descendants: false }) private pass: QueryList<PassComponent>;

  @Input() private useRenderTarget: boolean = false;
  @Input() private wrap: string = null;
  @Input() private wrapS: string = null;
  @Input() private wrapT: string = null;
  @Input() private filter: string = null;
  @Input() private magFilter: string = null;
  @Input() private minFilter: string = null;
  @Input() private format: string = null;
  @Input() private dataType: string = null;
  @Input() private anisotropy: number = null;
  @Input() private encoding: string = null;
  @Input() private depthBuffer: boolean = null;
  @Input() private stencilBuffer: boolean = null;
  @Input() private generateMipmaps: boolean = null;
  @Input() private depthTexture: any = null;

  private getRenderTarget(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
    if (this.useRenderTarget) {
      return new THREE.WebGLRenderTarget(this.getWidth() * renderer.getPixelRatio(), this.getHeight() * renderer.getPixelRatio(), {
        wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
        wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
        magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
        minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter, 'LinearMipmapLinear'),
        format: ThreeUtil.getPixelFormatSafe(this.format),
        type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
        anisotropy: ThreeUtil.getTypeSafe(this.anisotropy),
        depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer),
        stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer),
        generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps),
        depthTexture: ThreeUtil.getTypeSafe(this.depthTexture), // todo
        encoding: ThreeUtil.getTextureEncodingSafe(this.encoding),
      });
    }
    return undefined;
  }

  private getReflectFromAbove(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.reflectFromAbove, def);
  }

  private getCameraDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.cameraDistance, def);
  }

  constructor() {
    super();
  }

  private getScene(def?: THREE.Scene): THREE.Scene {
    if (ThreeUtil.isNotNull(this.scene)) {
      if (this.scene instanceof SceneComponent) {
        return this.scene.getScene();
      } else {
        return this.scene;
      }
    }
    return def;
  }

  private getCamera(def?: THREE.Camera): THREE.Camera {
    if (ThreeUtil.isNotNull(this.camera)) {
      if (this.camera instanceof CameraComponent) {
        return this.camera.getObject3d();
      } else {
        return this.camera;
      }
    }
    return def;
  }

  private getX(def?: number | string): number {
    const x = this.getViewPortSize(this.x, this.composerWidth, def);
    if (x < 0) {
      return this.composerWidth - this.getWidth() + x;
    } else {
      return x;
    }
  }

  private getY(def?: number | string): number {
    const y = this.getViewPortSize(this.y, this.composerHeight, def);
    if (y < 0) {
      return this.composerHeight - this.getHeight() + y;
    } else {
      return y;
    }
  }

  private getWidth(def?: number | string): number {
    return this.getViewPortSize(this.width, this.composerWidth, def);
  }

  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.composerHeight, def);
  }

  private getViewPortSize(size: number | string, cameraSize: number, def?: number | string): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      if (typeof baseSize == 'string') {
        if (baseSize.endsWith('%')) {
          return Math.ceil((cameraSize * parseFloat(baseSize.slice(0, -1))) / 100);
        } else {
          switch (baseSize) {
            case 'x':
              return this.getX(def);
            case 'y':
              return this.getY(def);
            case 'width':
              return this.getWidth(def);
            case 'height':
              return this.getHeight(def);
            default:
              return parseFloat(baseSize);
          }
        }
      } else {
        return baseSize;
      }
    }
    return 0;
  }

  private getAspect(): number {
    if (this.viewport) {
      const cWidth = this.getWidth();
      const cHeight = this.getHeight();
      return cWidth / cHeight;
    } else {
      return this.composerWidth > 0 && this.composerHeight > 0 ? this.composerWidth / this.composerHeight : 1;
    }
  }

  ngOnInit(): void {
    super.ngOnInit('composer');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.effectComposer) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  resetEffectComposer() {
    this.effectComposer = null;
    if (this.effectCamera !== null && this.webGLRenderer) {
      this.effectComposer = this.getEffectComposer(this.webGLRenderer, this.effectCamera, this.effectScene);
    }
  }

  private composerWidth: number = 0;
  private composerHeight: number = 0;

  setComposerSize(width: number, height: number) {
    this.composerWidth = width;
    this.composerHeight = height;
  }

  render(webGLRenderer: THREE.WebGLRenderer, renderTimer: RendererTimer) {
    if (this.effectComposer !== null) {
      if (this.viewport) {
        webGLRenderer.setViewport(this.getX(), this.getY(), this.getWidth(), this.getHeight());
      }
      if (this.viewportAspect && ThreeUtil.isNotNull(this._composerCamera)) {
        if (this._composerCamera instanceof THREE.PerspectiveCamera) {
          this._composerCamera.aspect = this.getAspect();
          this._composerCamera.updateProjectionMatrix();
        }
      }
      if (this.clear) {
        webGLRenderer.autoClear = false;
        webGLRenderer.clear();
      }
      this.effectComposer.render(renderTimer.delta);
    }
  }

  private webGLRenderer: THREE.WebGLRenderer = null;
  private effectCamera: THREE.Camera = null;
  private effectScene: THREE.Scene = null;
  private effectComposer: EffectComposer | any = null;

  getWriteBuffer(webGLRenderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).writeBuffer;
  }

  getReadBuffer(webGLRenderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).readBuffer;
  }

  getRenderTarget1(webGLRenderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).renderTarget1;
  }

  getRenderTarget2(webGLRenderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): THREE.WebGLRenderTarget {
    return this.getEffectComposer(webGLRenderer, camera, scene).renderTarget2;
  }

  applyChanges(changes: string[]) {
    if (this.effectComposer !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['shared', 'resize', 'scene', 'camera', 'control', 'composer', 'viewer', 'listner', 'audio', 'controller', 'lookat', 'control', 'clippingPlanes', 'canvas2d']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'pass':
            if (this.effectComposer instanceof EffectComposer) {
              this.pass.forEach((item) => {
                item.getPass(this._composerScene, this._composerCamera, this.effectComposer);
              });
            }
            break;
        }
      });
    }
  }

  private _composerCamera: THREE.Camera = null;
  private _composerScene: THREE.Scene = null;

  getEffectComposer(webGLRenderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene): EffectComposer | any {
    if (this.effectComposer === null || this._needUpdate) {
      this.needUpdate = false;
      switch (this.type.toLowerCase()) {
        case 'peppersghost':
          const peppersGhostEffect = new PeppersGhostEffect(webGLRenderer);
          peppersGhostEffect.cameraDistance = this.getCameraDistance(15);
          peppersGhostEffect.reflectFromAbove = this.getReflectFromAbove(false);
          this.effectComposer = peppersGhostEffect;
          break;
        case 'outline':
          const outlineEffect = new OutlineEffect(webGLRenderer, {});
          this.effectComposer = outlineEffect;
          break;
        case 'parallaxbarrier':
          this.effectComposer = new ParallaxBarrierEffect(webGLRenderer);
          break;
        default:
          const effectComposer = new EffectComposer(webGLRenderer, this.getRenderTarget(webGLRenderer));
          effectComposer.setPixelRatio(window.devicePixelRatio);
          const composerCamera = this.getCamera(camera);
          this._composerCamera = composerCamera;
          this._composerScene = this.getScene(scene);

          this.effectComposer = effectComposer;
          if (ThreeUtil.isNotNull(this.renderToScreen)) {
            this.effectComposer.renderToScreen = this.renderToScreen;
          }
          break;
      }
      this.setObject(this.effectComposer);
    }
    return this.effectComposer;
  }
}
