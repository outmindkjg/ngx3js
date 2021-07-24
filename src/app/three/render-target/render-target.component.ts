import { Component, Input, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * RenderTargetComponent
 */
@Component({
  selector: 'ngx3js-render-target',
  templateUrl: './render-target.component.html',
  styleUrls: ['./render-target.component.scss'],
})
export class RenderTargetComponent extends AbstractSubscribeComponent implements OnInit, OnDestroy {
  /**
   * Input  of render target component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private type: string = 'RenderTarget';

  /**
   * Input  of render target component
   */
  @Input() private size: number = 1024;

  /**
   * Input  of render target component
   */
  @Input() private width: number = 1024;

  /**
   * Input  of render target component
   */
  @Input() private height: number = 1024;

  /**
   * Input  of render target component
   */
  @Input() private count: number = 1;

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
   * Input  of render target component
   */
  @Input() private depthBuffer: boolean = null;

  /**
   * Input  of render target component
   */
  @Input() private stencilBuffer: boolean = null;

  /**
   * Input  of render target component
   */
  @Input() private generateMipmaps: boolean = null;

  /**
   * Input  of render target component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private depthTexture: string = null;

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
   * Gets depth texture
   * @returns depth texture
   */
  private getDepthTexture(): THREE.DepthTexture {
    return new THREE.DepthTexture(ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024));
  }

  /**
   * Creates an instance of render target component.
   */
  constructor() {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('render-target');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.renderTarget !== null) {
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
    if (changes) {
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
   * Applys changes
   * @param changes
   * @returns
   */
  protected applyChanges(changes: string[]) {
    if (this.renderTarget !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getRenderTarget();
        return;
      }
      if (ThreeUtil.isIndexOf(changes, [])) {
        this.needUpdate = true;
        return;
      }
      super.applyChanges(changes);
    }
  }

  /**
   * Gets texture
   * @returns texture
   */
  public getTexture(): THREE.Texture {
    if (this.renderTarget === null) {
      this.getRenderTarget();
    }
    if (Array.isArray(this.renderTarget.texture)) {
      return this.renderTarget.texture[0];
    } else {
      return this.renderTarget.texture;
    }
  }

  /**
   * Render target of render target component
   */
  private renderTarget: THREE.WebGLRenderTarget | THREE.WebGLMultipleRenderTargets = null;

  /**
   * Gets render target
   * @returns render target
   */
  public getRenderTarget(): THREE.WebGLRenderTarget | THREE.WebGLMultipleRenderTargets {
    if (this.renderTarget === null || this._needUpdate) {
      this.needUpdate = false;
      switch (this.type.toLowerCase()) {
        case 'cube':
        case 'cuberender':
        case 'cuberendertarget':
        case 'webglcuberendertarget':
          this.renderTarget = new THREE.WebGLCubeRenderTarget(ThreeUtil.getTypeSafe(this.size, 1024), {
            wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
            wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
            magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
            minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter),
            format: ThreeUtil.getPixelFormatSafe(this.format),
            type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
            anisotropy: ThreeUtil.getTypeSafe(this.anisotropy, 1),
            depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer, true),
            stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer, false),
            generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps, true),
            depthTexture: this.getDepthTexture(),
            encoding: ThreeUtil.getTextureEncodingSafe(this.encoding, null),
          });
          break;
        case 'multiple':
        case 'multiplerender':
        case 'webglmultiplerender':
        case 'webglmultiplerendertargets':
          this.renderTarget = new THREE.WebGLMultipleRenderTargets(ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024), ThreeUtil.getTypeSafe(this.count, 1));
          break;
        case 'sample':
        case 'multisample':
        case 'multisamplerender':
        case 'multisamplerendertarget':
        case 'webglmultisamplerendertarget':
          this.renderTarget = new THREE.WebGLMultisampleRenderTarget(ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024), {
            wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
            wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
            magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
            minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter),
            format: ThreeUtil.getPixelFormatSafe(this.format),
            type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
            anisotropy: ThreeUtil.getTypeSafe(this.anisotropy, 1),
            depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer, true),
            stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer, false),
            generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps, true),
            depthTexture: this.getDepthTexture(),
            encoding: ThreeUtil.getTextureEncodingSafe(this.encoding, null),
          });
          break;
        case 'render':
        case 'rendertarget':
        case 'webglrendertarget':
        default:
          this.renderTarget = new THREE.WebGLRenderTarget(ThreeUtil.getTypeSafe(this.width, 1024), ThreeUtil.getTypeSafe(this.height, 1024), {
            wrapS: ThreeUtil.getWrappingSafe(this.wrapS, this.wrap),
            wrapT: ThreeUtil.getWrappingSafe(this.wrapT, this.wrap),
            magFilter: ThreeUtil.getTextureFilterSafe(this.magFilter, this.filter),
            minFilter: ThreeUtil.getTextureFilterSafe(this.minFilter, this.filter),
            format: ThreeUtil.getPixelFormatSafe(this.format),
            type: ThreeUtil.getTextureDataTypeSafe(this.dataType),
            anisotropy: ThreeUtil.getTypeSafe(this.anisotropy, 1),
            depthBuffer: ThreeUtil.getTypeSafe(this.depthBuffer, true),
            stencilBuffer: ThreeUtil.getTypeSafe(this.stencilBuffer, false),
            generateMipmaps: ThreeUtil.getTypeSafe(this.generateMipmaps, true),
            depthTexture: this.getDepthTexture(),
            encoding: ThreeUtil.getTextureEncodingSafe(this.encoding, null),
          });
          break;
      }
      super.setObject(this.renderTarget);
    }
    return this.renderTarget;
  }
}
