import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AsciiEffect } from 'three/examples/jsm/effects/AsciiEffect';
import { OutlineEffect } from 'three/examples/jsm/effects/OutlineEffect';
import { ParallaxBarrierEffect } from 'three/examples/jsm/effects/ParallaxBarrierEffect';
import { PeppersGhostEffect } from 'three/examples/jsm/effects/PeppersGhostEffect';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { CameraComponent } from '../camera/camera.component';
import { RendererTimer, ThreeUtil } from '../interface';
import { PassComponent } from '../pass/pass.component';
import { RenderTargetComponent } from '../render-target/render-target.component';
import { SceneComponent } from '../scene/scene.component';
import { AbstractTweenComponent } from '../tween.abstract';

/**
 * ComposerComponent
 * 
 */
@Component({
  selector: 'ngx3js-composer',
  templateUrl: './composer.component.html',
  styleUrls: ['./composer.component.scss'],
})
export class ComposerComponent extends AbstractTweenComponent implements OnInit {
  /**
   * Input  of composer component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private type: string = 'composer';

  /**
   * Input  of composer component
   */
  @Input() private scene: THREE.Scene | SceneComponent = null;

  /**
   * Input  of composer component
   */
  @Input() private camera: THREE.Camera | CameraComponent = null;

  /**
   * Input  of composer component
   */
  @Input() private clear: boolean = false;

  /**
   * Input  of composer component
   */
  @Input() private viewport: boolean = false;

  /**
   * Input  of composer component
   */
  @Input() private viewportAspect: boolean = false;

  /**
   * Input  of composer component
   */
  @Input() private renderToScreen: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private x: number | string = 0;

  /**
   * Input  of composer component
   */
  @Input() private y: number | string = 0;

  /**
   * The size of width 
   * - type number
   *  fixed size
   * - type string with include % 
   *  relative size from renderer size 
   *  for example 
   *    in case renderer = 1024 
   *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
   */
  @Input() private width: number | string = '100%';

  /**
   * The size of height 
   * - type number
   *  fixed size
   * - type string with include % 
   *  relative size from renderer size 
   *  for example 
   *    in case renderer = 1024 
   *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
   */
  @Input() private height: number | string = '100%';

  /**
   * Input  of composer component
   */
  @Input() private scissorTest: boolean = false;

  /**
   * The scissor position of left 
   * - type number
   *  fixed position
   * - type string with include % 
   *  relative position from renderer size 
   *  for example 
   *    in case renderer = 1024 
   *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
   */
  @Input() private scissorX: number | string = 0;

  /**
   * The scissor position of top 
   * - type number
   *  fixed position
   * - type string with include % 
   *  relative position from renderer size 
   *  for example 
   *    in case renderer = 1024 
   *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
   */
  @Input() private scissorY: number | string = 0;

  /**
   * The scissor of width 
   * - type number
   *  fixed size
   * - type string with include % 
   *  relative size from renderer size 
   *  for example 
   *    in case renderer = 1024 
   *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
   */
  @Input() private scissorWidth: number | string = '100%';

  /**
   * The scissor of height 
   * - type number
   *  fixed size
   * - type string with include % 
   *  relative size from renderer size 
   *  for example 
   *    in case renderer = 1024 
   *    '100%' = 1024, '50%' = 512, '50%-10' = 502, '50%+30' = 542
   */
  @Input() private scissorHeight: number | string = '100%';

  /**
   * Input  of composer component
   */
  @Input() private reflectFromAbove: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private cameraDistance: number = null;

  /**
   * AsciiEffect
   * 
   * @see AsciiEffect AsciiEffect
   */
  @Input() private charSet: string = null;

  /**
   * Input  of composer component
   */
  @Input() private resolution: number = null;

  /**
   * Input  of composer component
   */
  @Input() private scale: number = null;

  /**
   * Input  of composer component
   */
  @Input() private color: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private alpha: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private block: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private invert: boolean = null;

  /**
   * Content children of composer component
   */
  @ContentChildren(PassComponent, { descendants: false }) private passList: QueryList<PassComponent>;

  /**
   * Content children of composer component
   */
  @ContentChildren(RenderTargetComponent, { descendants: false }) private renderTargetList: QueryList<RenderTargetComponent>;

  /**
   * Gets render target
   * @param renderer
   * @returns render target
   */
  private getRenderTarget<T>(): T {
    if (ThreeUtil.isNotNull(this.renderTargetList) && this.renderTargetList.length > 0) {
      return this.renderTargetList.first.getRenderTarget();
    }
    return undefined;
  }

  /**
   * Gets reflect from above
   * @param [def]
   * @returns true if reflect from above
   */
  private getReflectFromAbove(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.reflectFromAbove, def);
  }

  /**
   * Gets camera distance
   * @param [def]
   * @returns camera distance
   */
  private getCameraDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.cameraDistance, def);
  }

  /**
   * Creates an instance of composer component.
   */
  constructor() {
    super();
  }

  /**
   * Gets scene
   * @param [def]
   * @returns scene
   */
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

  /**
   * Gets camera
   * @param [def]
   * @returns camera
   */
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

  /**
   * Gets x
   * @param [def]
   * @returns x
   */
  private getX(def?: number | string): number {
    const x = this.getViewPortSize(this.x, this.rendererWidth, def);
    if (x < 0) {
      return this.rendererWidth - this.getWidth() + x;
    } else {
      return x;
    }
  }

  /**
   * Gets y
   * @param [def]
   * @returns y
   */
  private getY(def?: number | string): number {
    const y = this.getViewPortSize(this.y, this.rendererHeight, def);
    if (y < 0) {
      return this.rendererHeight - this.getHeight() + y;
    } else {
      return y;
    }
  }

  /**
   * Gets width
   * @param [def]
   * @returns width
   */
  private getWidth(def?: number | string): number {
    return this.getViewPortSize(this.width, this.rendererWidth, def);
  }

  /**
   * Gets height
   * @param [def]
   * @returns height
   */
  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.rendererHeight, def);
  }

  /**
   * Gets scissor x
   * @param [def]
   * @returns scissor x
   */
  private getScissorX(def?: number | string): number {
    return this.getViewPortSize(this.scissorX, this.rendererWidth, def);
  }

  /**
   * Gets scissor y
   * @param [def]
   * @returns scissor y
   */
  private getScissorY(def?: number | string): number {
    return this.getViewPortSize(this.scissorY, this.rendererHeight, def);
  }

  /**
   * Gets scissor width
   * @param [def]
   * @returns scissor width
   */
  private getScissorWidth(def?: number | string): number {
    return this.getViewPortSize(this.scissorWidth, this.rendererWidth, def);
  }

  /**
   * Gets scissor height
   * @param [def]
   * @returns scissor height
   */
  private getScissorHeight(def?: number | string): number {
    return this.getViewPortSize(this.scissorHeight, this.rendererHeight, def);
  }

  /**
   * Gets view port size
   * @param size
   * @param cameraSize
   * @param [def]
   * @returns view port size
   */
  private getViewPortSize(size: number | string, cameraSize: number, def?: number | string): number {
    const baseSize = ThreeUtil.getTypeSafe(size, def);
    if (ThreeUtil.isNotNull(baseSize)) {
      if (typeof baseSize == 'string') {
        if (baseSize.indexOf('%') > 0) {
          const [percent, extra] = baseSize.split('%');
          const viewSize = Math.ceil((cameraSize * parseFloat(percent)) / 100);
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

  /**
   * Gets aspect
   * @returns aspect
   */
  private getAspect(): number {
    if (this.viewport) {
      const cWidth = this.getWidth();
      const cHeight = this.getHeight();
      return cWidth / cHeight;
    } else {
      return this.rendererWidth > 0 && this.rendererHeight > 0 ? this.rendererWidth / this.rendererHeight : 1;
    }
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('composer');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.effectComposer !== null && this.effectComposer instanceof AsciiEffect) {
      this.effectComposer.domElement.parentNode.removeChild(this.effectComposer.domElement);
    }
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
    if (changes && this.effectComposer) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
		this.subscribeListQueryChange(this.passList, 'passList', 'pass');
		this.subscribeListQueryChange(this.renderTargetList, 'renderTargetList', 'rendertarget');
    super.ngAfterContentInit();
  }

  /**
   * Composer width of composer component
   */
  private rendererWidth: number = 1024;

  /**
   * Composer height of composer component
   */
  private rendererHeight: number = 1024;

	/**
	 * pixelRatio of camera component
	 */
	private pixelRatio: number = 1;

  /**
   * Sets composer size
   * @param width
   * @param height
   */
  public setRendererSize(width: number, height: number, pixelRatio : number ) {
    this.rendererWidth = width;
    this.rendererHeight = height;
    this.pixelRatio = pixelRatio;
    if (this.effectComposer !== null) {
      if (this.effectComposer instanceof AsciiEffect || this.effectComposer instanceof PeppersGhostEffect) {
        this.effectComposer.setSize(this.rendererWidth, this.rendererHeight);
      } else if (this.effectComposer instanceof EffectComposer) {
        this.effectComposer.setSize(this.rendererWidth, this.rendererHeight);
        this.effectComposer.setPixelRatio(this.pixelRatio);
      }
    }
  }

  /**
   * Renders composer component
   * @param renderer
   * @param renderTimer
   */
  public render(renderer: THREE.WebGLRenderer, renderTimer: RendererTimer) {
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

  /**
   * Effect composer of composer component
   */
  private effectComposer: EffectComposer | any = null;

  /**
   * Gets write buffer
   * @returns write buffer
   */
  public getWriteBuffer(): THREE.WebGLRenderTarget {
    return this.getComposer().writeBuffer;
  }

  /**
   * Gets read buffer
   * @returns read buffer
   */
  public getReadBuffer(): THREE.WebGLRenderTarget {
    return this.getComposer().readBuffer;
  }

  /**
   * Gets render target1
   * @returns render target1
   */
  public getRenderTarget1(): THREE.WebGLRenderTarget {
    return this.getComposer().renderTarget1;
  }

  /**
   * Gets render target2
   * @returns render target2
   */
  public getRenderTarget2(): THREE.WebGLRenderTarget {
    return this.getComposer().renderTarget2;
  }

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  public applyChanges(changes: string[]) {
    if (this.effectComposer !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getComposer();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['pass', 'rendertarget', 'clear', 'viewportaspect', 'viewport', 'scissortest', 'x', 'y', 'width', 'height', 'scissorx', 'scissory', 'scissorwidth', 'scissorheight'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['pass', 'rendertarget']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'pass':
            if (this.effectComposer instanceof EffectComposer) {
              const scene = this.getScene(this._composerScene);
              const camera = this.getCamera(this._composerCamera);
              this.passList.forEach((pass) => {
                pass.setEffectComposer(scene, camera, this.effectComposer, this._composerRenderer);
              });
            }
            break;
          case 'rendertarget' :
            if (ThreeUtil.isNotNull(this.renderTargetList)) {
              this.renderTargetList.forEach(renderTarget => {
                renderTarget.setMaterial(this, 'effectcomposer');
              });
            }
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  /**
   * Composer renderer of composer component
   */
  private _composerRenderer: THREE.WebGLRenderer = null;

  /**
   * Composer camera of composer component
   */
  private _composerCamera: THREE.Camera = null;

  /**
   * Composer scene of composer component
   */
  private _composerScene: THREE.Scene = null;

  /**
   * Sets renderer
   * @param webGLRenderer
   * @param camera
   * @param scene
   */
  public setRenderer(webGLRenderer: THREE.WebGLRenderer, camera: THREE.Camera, scene: THREE.Scene) {
    if (this._composerRenderer !== webGLRenderer || this._composerCamera !== camera || this._composerScene !== scene) {
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

  /**
   * Gets object
   * @returns object
   */
  public getObject<T>(): T {
    return this.getComposer() as T;
  }

  /**
   * Gets composer
   * @returns composer
   */
  public getComposer(): EffectComposer | any {
    if (this._composerRenderer !== null && this._composerCamera && this._composerScene && (this.effectComposer === null || this._needUpdate)) {
      this.needUpdate = false;
      if (this.effectComposer !== null && this.effectComposer instanceof AsciiEffect) {
        this.effectComposer.domElement.parentNode.removeChild(this.effectComposer.domElement);
      }
      switch (this.type.toLowerCase()) {
        case 'asciieffect':
        case 'ascii':
          const asciiEffect = new AsciiEffect(this._composerRenderer, ThreeUtil.getTypeSafe(this.charSet, ' .:-+*=%@#'), {
            resolution: ThreeUtil.getTypeSafe(this.resolution),
            scale: ThreeUtil.getTypeSafe(this.scale),
            color: ThreeUtil.getTypeSafe(this.color),
            alpha: ThreeUtil.getTypeSafe(this.alpha),
            block: ThreeUtil.getTypeSafe(this.block),
            invert: ThreeUtil.getTypeSafe(this.invert),
          });
          asciiEffect.domElement.style.position = 'absolute';
          asciiEffect.domElement.style.left = '0px';
          asciiEffect.domElement.style.top = '0px';
          asciiEffect.domElement.style.color = 'white';
          asciiEffect.domElement.style.backgroundColor = 'black';
          this._composerRenderer.domElement.parentNode.appendChild(asciiEffect.domElement);
          this.effectComposer = asciiEffect;
          asciiEffect.setSize(this.rendererWidth, this.rendererHeight);
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
          const effectComposer = new EffectComposer(this._composerRenderer, this.getRenderTarget());
          effectComposer.setPixelRatio(this.pixelRatio);
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
