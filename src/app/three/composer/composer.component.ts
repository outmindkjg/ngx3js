import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect';
import { PeppersGhostEffect } from 'three/examples/jsm/effects/PeppersGhostEffect';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';

import { RendererTimer, ThreeUtil } from '../interface';
import { PassComponent } from '../pass/pass.component';
import { AbstractTweenComponent } from '../tween.abstract';
import { CameraComponent } from '../camera/camera.component';
import { SceneComponent } from '../scene/scene.component';

@Component({
  selector: 'ngx3js-composer',
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
  @Input() private scissorTest: boolean = false;
  @Input() private scissorX: number | string = 0;
  @Input() private scissorY: number | string = 0;
  @Input() private scissorWidth: number | string = '100%';
  @Input() private scissorHeight: number | string = '100%';
  @Input() private reflectFromAbove: boolean = null;
  @Input() private cameraDistance: number = null;

	@Input() private charSet: string = null;
	@Input() private resolution: number = null;
	@Input() private scale: number = null;
	@Input() private color: boolean = null;
	@Input() private alpha: boolean = null;
	@Input() private block: boolean = null;
	@Input() private invert: boolean = null;

  @ContentChildren(PassComponent, { descendants: false }) private pass: QueryList<PassComponent>;

  @Input() private useRenderTarget: boolean = false;
  @Input() private renderTargetType: string = "WebGLRenderTarget";
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
      switch(this.renderTargetType.toLowerCase()) {
        case 'webglmultisamplerendertarget' :
        case 'webglmultisamplerender' :
        case 'webglmultisample' :
        case 'multisamplerendertarget' :
        case 'multisamplerender' :
        case 'multisample' :
          return new THREE.WebGLMultisampleRenderTarget( 
            this.getWidth() * renderer.getPixelRatio(), 
            this.getHeight() * renderer.getPixelRatio(), {
            wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
            wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
            magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
            minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter),
            format: ThreeUtil.getPixelFormatSafe(this.format),
            type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
            anisotropy: ThreeUtil.getTypeSafe(this.anisotropy),
            depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer),
            stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer),
            generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps),
            // depthTexture: ThreeUtil.getTypeSafe(this.depthTexture), // todo
            encoding: ThreeUtil.getTextureEncodingSafe(this.encoding),
          });
        case 'webglcuberendertarget' :
        case 'webglcuberender' :
        case 'webglcube' :
        case 'cuberendertarget' :
        case 'cuberender' :
        case 'cube' :
          return new THREE.WebGLCubeRenderTarget( this.getWidth() * renderer.getPixelRatio(), {
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
        default :
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

  private getScissorX(def?: number | string): number {
    return this.getViewPortSize(this.scissorX, this.composerWidth, def);
  }

  private getScissorY(def?: number | string): number {
    return this.getViewPortSize(this.scissorY, this.composerHeight, def);
  }

  private getScissorWidth(def?: number | string): number {
    return this.getViewPortSize(this.scissorWidth, this.composerWidth, def);
  }

  private getScissorHeight(def?: number | string): number {
    return this.getViewPortSize(this.scissorHeight, this.composerHeight, def);
  }

  private getViewPortSize(size: number | string, cameraSize: number, def?: number | string): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      if (typeof baseSize == 'string') {
        if (baseSize.indexOf('%') > 0) {
          const [percent, extra] = baseSize.split('%');
          const viewSize = Math.ceil(cameraSize * parseFloat(percent) / 100);
          if (extra === '') {
            return viewSize;
          } else {
            return viewSize + parseInt(extra);
          }
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
            case 'scissorx':
            case 'scissorX':
              return this.getScissorX(def);
            case 'scissory':
            case 'scissorY':
              return this.getScissorY(def);
            case 'scissorwidth':
            case 'scissorWidth':
              return this.getScissorWidth(def);
            case 'scissorheight':
            case 'scissorHeight':
              return this.getScissorHeight(def);
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
    if (this.effectComposer !== null && this.effectComposer instanceof AsciiEffect) {
      this.effectComposer.domElement.parentNode.removeChild(this.effectComposer.domElement);
    }
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

  private composerWidth: number = 0;
  private composerHeight: number = 0;

  setComposerSize(width: number, height: number) {
    this.composerWidth = width;
    this.composerHeight = height;
    if (this.effectComposer !== null && (this.effectComposer instanceof AsciiEffect || this.effectComposer instanceof PeppersGhostEffect)) {
      this.effectComposer.setSize(this.composerWidth, this.composerHeight);
    }
  }

  render(renderer: THREE.WebGLRenderer, renderTimer: RendererTimer) {
    if (this.effectComposer !== null) {
      if (this.viewport) {
        renderer.setViewport(this.getX(), this.getY(), this.getWidth(), this.getHeight());
      }
      if (this.scissorTest) {
        renderer.setScissorTest(true);
        renderer.setScissor(this.getScissorX(), this.getScissorY(), this.getScissorWidth(), this.getScissorHeight());
      }
      if (this.viewportAspect && ThreeUtil.isNotNull(this._composerCamera)) {
        if (this._composerCamera instanceof THREE.PerspectiveCamera) {
          this._composerCamera.aspect = this.getAspect();
          this._composerCamera.updateProjectionMatrix();
        }
      }
      if (this.clear) {
        renderer.autoClear = false;
        renderer.clear();
      }
      
      if (this.effectComposer instanceof EffectComposer) {
        this.effectComposer.render(renderTimer.delta);
      } else {
        this.effectComposer.render(this._composerScene, this._composerCamera);
      }
      if (this.scissorTest) {
        renderer.setScissorTest(false);
      }
    }
  }

  private effectComposer: EffectComposer | any = null;

  getWriteBuffer(): THREE.WebGLRenderTarget {
    return this.getComposer().writeBuffer;
  }

  getReadBuffer(): THREE.WebGLRenderTarget {
    return this.getComposer().readBuffer;
  }

  getRenderTarget1(): THREE.WebGLRenderTarget {
    return this.getComposer().renderTarget1;
  }

  getRenderTarget2(): THREE.WebGLRenderTarget {
    return this.getComposer().renderTarget2;
  }

  applyChanges(changes: string[]) {
    if (this.effectComposer !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getComposer();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init','pass', 'clear', 'viewportaspect','viewport', 'scissortest', 'x','y','width','height','scissorx','scissory','scissorwidth','scissorheight'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['pass']);
      }
      
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'pass':
            if (this.effectComposer instanceof EffectComposer) {
              const scene = this.getScene(this._composerScene);
              const camera = this.getCamera(this._composerCamera);
              this.pass.forEach((pass) => {
                pass.setEffectComposer(scene, camera, this.effectComposer);
              });
            }
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  private _composerRenderer: THREE.WebGLRenderer = null;
  private _composerCamera: THREE.Camera = null;
  private _composerScene: THREE.Scene = null;

  setRenderer(webGLRenderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene) {
    if (this._composerRenderer !== webGLRenderer || this._composerCamera !== camera || this._composerScene !== scene){
      this._composerRenderer = webGLRenderer;
      this._composerCamera = camera;
      this._composerScene = scene;
      if (this.effectComposer === null) {
        this.getComposer();
      } else {
        this.needUpdate = true;
      }
    }
  }

  getObject() : EffectComposer | any {
    return this.getComposer();
  }

  getComposer(): EffectComposer | any {
    if (this._composerRenderer !== null && this._composerCamera && this._composerScene && (this.effectComposer === null || this._needUpdate)) {
      this.needUpdate = false;
      if (this.effectComposer !== null && this.effectComposer instanceof AsciiEffect) {
        this.effectComposer.domElement.parentNode.removeChild(this.effectComposer.domElement);
      }
        switch (this.type.toLowerCase()) {
        case 'asciieffect' :
        case 'ascii' :
          const asciiEffect = new AsciiEffect( 
            this._composerRenderer, 
            ThreeUtil.getTypeSafe(this.charSet, ' .:-+*=%@#'), 
            { 
              resolution: ThreeUtil.getTypeSafe(this.resolution),
              scale: ThreeUtil.getTypeSafe(this.scale),
              color: ThreeUtil.getTypeSafe(this.color),
              alpha: ThreeUtil.getTypeSafe(this.alpha),
              block: ThreeUtil.getTypeSafe(this.block),
              invert: ThreeUtil.getTypeSafe(this.invert),
            } 
          );
          asciiEffect.domElement.style.position = 'absolute';
          asciiEffect.domElement.style.left = '0px';
          asciiEffect.domElement.style.top = '0px';
          asciiEffect.domElement.style.color = 'white';
          asciiEffect.domElement.style.backgroundColor = 'black';
          this._composerRenderer.domElement.parentNode.appendChild(asciiEffect.domElement);
          this.effectComposer = asciiEffect;
          asciiEffect.setSize(this.composerWidth, this.composerHeight);
          break;
        case 'peppersghosteffect':
        case 'peppersghost':
          const peppersGhostEffect = new PeppersGhostEffect(this._composerRenderer);
          peppersGhostEffect.cameraDistance = this.getCameraDistance(15);
          peppersGhostEffect.reflectFromAbove = this.getReflectFromAbove(false);
          this.effectComposer = peppersGhostEffect;
          break;
        case 'outlineeffect':
        case 'outline':
          const outlineEffect = new OutlineEffect(this._composerRenderer, {});
          this.effectComposer = outlineEffect;
          break;
        case 'parallaxbarriereffect':
        case 'parallaxbarrier':
          this.effectComposer = new ParallaxBarrierEffect(this._composerRenderer);
          break;
        default:
          const effectComposer = new EffectComposer(this._composerRenderer, this.getRenderTarget(this._composerRenderer));
          effectComposer.setPixelRatio(window.devicePixelRatio);
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
