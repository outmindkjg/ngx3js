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
   * Input  of composer component
   */
  @Input() private width: number | string = '100%';

  /**
   * Input  of composer component
   */
  @Input() private height: number | string = '100%';

  /**
   * Input  of composer component
   */
  @Input() private scissorTest: boolean = false;

  /**
   * Input  of composer component
   */
  @Input() private scissorX: number | string = 0;

  /**
   * Input  of composer component
   */
  @Input() private scissorY: number | string = 0;

  /**
   * Input  of composer component
   */
  @Input() private scissorWidth: number | string = '100%';

  /**
   * Input  of composer component
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
   * Input  of composer component
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
  @ContentChildren(PassComponent, { descendants: false }) private pass: QueryList<PassComponent>;

  /**
   * Input  of composer component
   */
  @Input() private useRenderTarget: boolean = false;

  /**
   * Input  of composer component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private renderTargetType: string = 'WebGLRenderTarget';

  /**
   * This defines how the texture is wrapped horizontally and corresponds to *U* in UV mapping.<br />
   * The default is [page:Textures THREE.ClampToEdgeWrapping], where the edge is clamped to the outer edge texels.
   * The other two choices are [page:Textures THREE.RepeatWrapping] and [page:Textures THREE.MirroredRepeatWrapping].
   * See the [page:Textures texture constants] page for details.
   *
   * The Default Value of wrapS, wrapT.
   *
   * Notice - case insensitive.
   *
   * @see THREE.RepeatWrapping         - RepeatWrapping, wraprepeat, repeat
   * @see THREE.MirroredRepeatWrapping - MirroredRepeatWrapping, mirroredrepeat
   * @see THREE.ClampToEdgeWrapping    - ClampToEdgeWrapping, clamptoedge
   */
  @Input() private wrap: string = null;

  /**
   * This defines how the texture is wrapped horizontally and corresponds to *U* in UV mapping.<br />
   * The default is [page:Textures THREE.ClampToEdgeWrapping], where the edge is clamped to the outer edge texels.
   * The other two choices are [page:Textures THREE.RepeatWrapping] and [page:Textures THREE.MirroredRepeatWrapping].
   * See the [page:Textures texture constants] page for details.
   *
   * Notice - case insensitive.
   *
   * @see THREE.RepeatWrapping         - RepeatWrapping, wraprepeat, repeat
   * @see THREE.MirroredRepeatWrapping - MirroredRepeatWrapping, mirroredrepeat
   * @see THREE.ClampToEdgeWrapping    - ClampToEdgeWrapping, clamptoedge
   */
  @Input() private wrapS: string = null;

  /**
   * This defines how the texture is wrapped vertically and corresponds to *V* in UV mapping.<br />
   * The same choices are available as for [property:number wrapS].<br /><br />
   * NOTE: tiling of images in textures only functions if image dimensions are powers of two
   * (2, 4, 8, 16, 32, 64, 128, 256, 512, 1024, 2048, ...) in terms of pixels.
   * Individual dimensions need not be equal, but each must be a power of two.
   * This is a limitation of WebGL, not three.js.
   *
   * Notice - case insensitive.
   *
   * @see THREE.RepeatWrapping         - RepeatWrapping, wraprepeat, repeat
   * @see THREE.MirroredRepeatWrapping - MirroredRepeatWrapping, mirroredrepeat
   * @see THREE.ClampToEdgeWrapping    - ClampToEdgeWrapping, clamptoedge
   */
  @Input() private wrapT: string = null;

  /**
   * The Default Value of magFilter, minFilter
   *
   * Notice - case insensitive.
   *
   * @see THREE.TextureFilter
   * @see THREE.NearestFilter               - NearestFilter, Nearest
   * @see THREE.NearestMipmapNearestFilter  - NearestMipmapNearestFilter, nearestmipmapnearest
   * @see THREE.NearestMipmapLinearFilter   - NearestMipmapLinearFilter, nearestmipmaplinear
   * @see THREE.LinearMipmapNearestFilter   - LinearMipmapNearestFilter, linearmipmapnearest
   * @see THREE.LinearMipmapLinearFilter    - LinearMipmapLinearFilter, linearmipmaplinear
   * @see THREE.LinearFilter                - Linearfilter, linear
   */
  @Input() private filter: string = null;

  /**
   * How the texture is sampled when a texel covers more than one pixel. The default is
   * [page:Textures THREE.LinearFilter], which takes the four closest texels and bilinearly interpolates among them.
   * The other option is [page:Textures THREE.NearestFilter], which uses the value of the closest texel.<br />
   * See the [page:Textures texture constants] page for details.
   *
   * Notice - case insensitive.
   *
   * @see THREE.TextureFilter
   * @see THREE.NearestFilter               - NearestFilter, Nearest
   * @see THREE.NearestMipmapNearestFilter  - NearestMipmapNearestFilter, nearestmipmapnearest
   * @see THREE.NearestMipmapLinearFilter   - NearestMipmapLinearFilter, nearestmipmaplinear
   * @see THREE.LinearMipmapNearestFilter   - LinearMipmapNearestFilter, linearmipmapnearest
   * @see THREE.LinearMipmapLinearFilter    - LinearMipmapLinearFilter, linearmipmaplinear
   * @see THREE.LinearFilter                - Linearfilter, linear
   */
  @Input() private magFilter: string = null;

  /**
   * How the texture is sampled when a texel covers less than one pixel. The default is
   * [page:Textures THREE.LinearMipmapLinearFilter], which uses mipmapping and a trilinear filter. <br /><br />
   * See the [page:Textures texture constants] page for all possible choices.
   *
   * Notice - case insensitive.
   *
   * @see THREE.TextureFilter
   * @see THREE.NearestFilter               - NearestFilter, Nearest
   * @see THREE.NearestMipmapNearestFilter  - NearestMipmapNearestFilter, nearestmipmapnearest
   * @see THREE.NearestMipmapLinearFilter   - NearestMipmapLinearFilter, nearestmipmaplinear
   * @see THREE.LinearMipmapNearestFilter   - LinearMipmapNearestFilter, linearmipmapnearest
   * @see THREE.LinearMipmapLinearFilter    - LinearMipmapLinearFilter, linearmipmaplinear
   * @see THREE.LinearFilter                - Linearfilter, linear
   */
  @Input() private minFilter: string = null;

  /**
   * The default is [page:Textures THREE.RGBAFormat], although the [page:TextureLoader TextureLoader] will automatically
   * set this to [page:Textures THREE.RGBFormat] for JPG images. <br /><br />
   * See the [page:Textures texture constants] page for details of other formats.
   *
   * Notice - case insensitive.
   *
   * @see THREE.PixelFormat
   * @see THREE.AlphaFormat - AlphaFormat, Alpha
   * @see THREE.RedFormat - RedFormat, Red
   * @see THREE.RedIntegerFormat - RedIntegerFormat, RedInteger
   * @see THREE.RGFormat - RGFormat, RG
   * @see THREE.RGIntegerFormat - RGIntegerFormat, RGInteger
   * @see THREE.RGBFormat - RGBFormat, RGB
   * @see THREE.RGBIntegerFormat - RGBIntegerFormat, RGBInteger
   * @see THREE.RGBAIntegerFormat - RGBAIntegerFormat, RGBAInteger
   * @see THREE.LuminanceFormat - LuminanceFormat, Luminance
   * @see THREE.LuminanceAlphaFormat - LuminanceAlphaFormat, LuminanceAlpha
   * @see THREE.RGBEFormat - RGBEFormat, RGBE
   * @see THREE.DepthFormat - DepthFormat, Depth
   * @see THREE.DepthStencilFormat - DepthStencilFormat, DepthStencil
   * @see THREE.RGBAFormat - RGBAFormat, RGBA
   */
  @Input() private format: string = null;

  /**
   * This must correspond to the [page:Texture.format .format]. The default is [page:Textures THREE.UnsignedByteType],
   * which will be used for most texture formats.<br /><br />
   * See the [page:Textures texture constants] page for details of other formats.
   *
   * Notice - case insensitive.
   *
   * @see THREE.TextureDataType ,
   * @see THREE.UnsignedByteType - UnsignedByteType , UnsignedByte,
   * @see THREE.ByteType - ByteType , Byte
   * @see THREE.ShortType - ShortType , Short
   * @see THREE.UnsignedShortType - UnsignedShortType , UnsignedShort
   * @see THREE.IntType - IntType , Int
   * @see THREE.UnsignedIntType - UnsignedIntType , UnsignedInt
   * @see THREE.FloatType - FloatType , Float
   * @see THREE.HalfFloatType - HalfFloatType , HalfFloat
   * @see THREE.UnsignedShort4444Type - UnsignedShort4444Type , UnsignedShort4444
   * @see THREE.UnsignedShort5551Type - UnsignedShort5551Type , UnsignedShort5551
   * @see THREE.UnsignedShort565Type - UnsignedShort565Type , UnsignedShort565
   * @see THREE.UnsignedInt248Type - UnsignedInt248Type , UnsignedInt248
   */
  @Input() private dataType: string = null;

  /**
   * The number of samples taken along the axis through the pixel that has the highest density of texels.
   * By default, this value is 1. A higher value gives a less blurry result than a basic mipmap,
   * at the cost of more texture samples being used. Use [page:WebGLRenderer.getMaxAnisotropy renderer.getMaxAnisotropy]() to
   * find the maximum valid anisotropy value for the GPU; this value is usually a power of 2.
   */
  @Input() private anisotropy: number = null;

  /**
   * [page:Textures THREE.LinearEncoding] is the default.
   * See the [page:Textures texture constants] page for details of other formats.<br /><br />
   * Note that if this value is changed on a texture after the material has been used,
   * it is necessary to trigger a Material.needsUpdate for this value to be realized in the shader.
   *
   * Notice - case insensitive.
   *
   * @see THREE.TextureEncoding
   *
   * @see THREE.LinearEncoding - LinearEncoding ,
   * @see THREE.sRGBEncoding - sRGBEncoding ,
   * @see THREE.GammaEncoding - GammaEncoding ,
   * @see THREE.RGBEEncoding - RGBEEncoding ,
   * @see THREE.LogLuvEncoding - LogLuvEncoding ,
   * @see THREE.RGBM7Encoding - RGBM7Encoding ,
   * @see THREE.RGBM16Encoding - RGBM16Encoding ,
   * @see THREE.RGBDEncoding - RGBDEncoding ,
   */
  @Input() private encoding: string = null;

  /**
   * Input  of composer component
   */
  @Input() private depthBuffer: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private stencilBuffer: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private generateMipmaps: boolean = null;

  /**
   * Input  of composer component
   */
  @Input() private depthTexture: any = null;

  /**
   * Gets render target
   * @param renderer
   * @returns render target
   */
  private getRenderTarget(renderer: THREE.WebGLRenderer): THREE.WebGLRenderTarget {
    if (this.useRenderTarget) {
      switch (this.renderTargetType.toLowerCase()) {
        case 'webglmultisamplerendertarget':
        case 'webglmultisamplerender':
        case 'webglmultisample':
        case 'multisamplerendertarget':
        case 'multisamplerender':
        case 'multisample':
          return new THREE.WebGLMultisampleRenderTarget(this.getWidth() * renderer.getPixelRatio(), this.getHeight() * renderer.getPixelRatio(), {
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
        case 'webglcuberendertarget':
        case 'webglcuberender':
        case 'webglcube':
        case 'cuberendertarget':
        case 'cuberender':
        case 'cube':
          return new THREE.WebGLCubeRenderTarget(this.getWidth() * renderer.getPixelRatio(), {
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
        default:
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
    const x = this.getViewPortSize(this.x, this.composerWidth, def);
    if (x < 0) {
      return this.composerWidth - this.getWidth() + x;
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
    const y = this.getViewPortSize(this.y, this.composerHeight, def);
    if (y < 0) {
      return this.composerHeight - this.getHeight() + y;
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
    return this.getViewPortSize(this.width, this.composerWidth, def);
  }

  /**
   * Gets height
   * @param [def]
   * @returns height
   */
  private getHeight(def?: number | string): number {
    return this.getViewPortSize(this.height, this.composerHeight, def);
  }

  /**
   * Gets scissor x
   * @param [def]
   * @returns scissor x
   */
  private getScissorX(def?: number | string): number {
    return this.getViewPortSize(this.scissorX, this.composerWidth, def);
  }

  /**
   * Gets scissor y
   * @param [def]
   * @returns scissor y
   */
  private getScissorY(def?: number | string): number {
    return this.getViewPortSize(this.scissorY, this.composerHeight, def);
  }

  /**
   * Gets scissor width
   * @param [def]
   * @returns scissor width
   */
  private getScissorWidth(def?: number | string): number {
    return this.getViewPortSize(this.scissorWidth, this.composerWidth, def);
  }

  /**
   * Gets scissor height
   * @param [def]
   * @returns scissor height
   */
  private getScissorHeight(def?: number | string): number {
    return this.getViewPortSize(this.scissorHeight, this.composerHeight, def);
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
      return this.composerWidth > 0 && this.composerHeight > 0 ? this.composerWidth / this.composerHeight : 1;
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
    super.ngAfterContentInit();
  }

  /**
   * Composer width of composer component
   */
  private composerWidth: number = 0;

  /**
   * Composer height of composer component
   */
  private composerHeight: number = 0;

  /**
   * Sets composer size
   * @param width
   * @param height
   */
  public setComposerSize(width: number, height: number) {
    this.composerWidth = width;
    this.composerHeight = height;
    if (this.effectComposer !== null && (this.effectComposer instanceof AsciiEffect || this.effectComposer instanceof PeppersGhostEffect)) {
      this.effectComposer.setSize(this.composerWidth, this.composerHeight);
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
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init', 'pass', 'clear', 'viewportaspect', 'viewport', 'scissortest', 'x', 'y', 'width', 'height', 'scissorx', 'scissory', 'scissorwidth', 'scissorheight'], this.OBJECT_ATTR)) {
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
