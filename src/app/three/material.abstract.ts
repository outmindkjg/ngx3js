import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { ThreeTexture, ThreeUtil } from './interface';
import { PlaneComponent } from './plane/plane.component';
import { AbstractSubscribeComponent } from './subscribe.abstract';
import { AbstractTextureComponent } from './texture.abstract';

/**
 * Mesh material raw
 */
export interface MeshMaterialRaw {
  geometry?: THREE.BufferGeometry;
  userData?: any;
  material: THREE.Material | THREE.Material[];
  customDepthMaterial?: THREE.Material;
  customDistanceMaterial?: THREE.Material;
}

/**
 * Mesh Material
 */
export type MeshMaterial = MeshMaterialRaw | THREE.Scene;

/**
 * AbstractMaterialComponent
 */
@Component({
  template: '',
})
export abstract class AbstractMaterialComponent extends AbstractSubscribeComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  /**
   * The name of the object (doesn't need to be unique). Default is an empty string.
   */
  @Input() public name: string = null;

  /**
   * Defines whether this material is visible. Default is *true*.
   */
  @Input() public visible: boolean = null;

  /**
   * The name of the object to apply loaded mesh when restore from assets.
   */
  @Input() public nameList: string[] = null;

  /**
   * The Material type. can be material, background etc.
   */
  @Input() public materialType: string = 'material';

  /**
   * The refer Material. When this value is not null will override the material with clone.
   */
  @Input() protected refer: any = null;

  /**
   * Float in the range of *0.0* - *1.0* indicating how transparent the material is.
   * A value of *0.0* indicates fully transparent, *1.0* is fully opaque.<br />
   * If the material's [page:Boolean transparent] property is not set to *true*, the material will remain
   * fully opaque and this value will only affect its color. <br />
   * Default is *1.0*.
   */
  @Input() protected opacity: number = null;

  /**
   * Enables alpha to coverage. Can only be used with MSAA-enabled contexts (meaning when the renderer was created with *antialias* parameter set to *true*). Default is *false*.
   */
  @Input() protected alphaToCoverage: number = null;

  /**
   * Sets the alpha value to be used when running an alpha test.
   * The material will not be renderered if the opacity is lower than this value.
   * Default is *0*.
   */
  @Input() protected alphaTest: number = null;

  /**
   * Which blending to use when displaying objects with this material. <br />
   * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].<br />
   * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.BlendingDstFactor
   * @see THREE.ZeroFactor - ZeroFactor , Zero
   * @see THREE.OneFactor - OneFactor , One
   * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
   * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
   * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
   * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
   * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
   * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
   * @see THREE.DstColorFactor - DstColorFactor , DstColor
   * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
   */
  @Input() protected blendDst: string = null;

  /**
   * The transparency of the [page:.blendDst]. Uses [page:.blendDst] value if null. Default is *null*.
   */
  @Input() protected blendDstAlpha: number = null;

  /**
   * Blending equation to use when applying blending. Default is [page:CustomBlendingEquation AddEquation].
   * See the blending equation [page:CustomBlendingEquation constants] for all possible values.<br />
   * The material's [page:Constant blending] must be set to [page:Materials CustomBlending] for this to have any effect.
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.BlendingEquation
   * @see THREE.AddEquation - AddEquation , Add
   * @see THREE.SubtractEquation - SubtractEquation , Subtract
   * @see THREE.ReverseSubtractEquation - ReverseSubtractEquation , ReverseSubtract
   * @see THREE.MinEquation - MinEquation , Min
   * @see THREE.MaxEquation - MaxEquation , Max
   * 
   */
  @Input() protected blendEquation: string = null;

  /**
   * The transparency of the [page:.blendEquation]. Uses [page:.blendEquation] value if null. Default is *null*.
   */
  @Input() protected blendEquationAlpha: number = null;

  /**
   * Which blending to use when displaying objects with this material. <br />
   * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].<br />
   * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
   * 
   * Notice - case insensitive.
   * 
   */
  @Input() protected blending: string = null;

  /**
   * Blending source. Default is [page:CustomBlendingEquation SrcAlphaFactor].
   * See the source factors [page:CustomBlendingEquation constants] for all possible values.<br />
   * The material's [page:Constant blending] must be set to [page:Materials CustomBlending] for this to have any effect.
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.Blending
   * @see THREE.NoBlending - NoBlending , No
   * @see THREE.NormalBlending - NormalBlending , Normal
   * @see THREE.AdditiveBlending - AdditiveBlending , Additive
   * @see THREE.SubtractiveBlending - SubtractiveBlending , Subtractive
   * @see THREE.MultiplyBlending - MultiplyBlending , Multiply
   * @see THREE.CustomBlending - CustomBlending , Custom
   */
  @Input() protected blendSrc: string = null;

  /**
   * The transparency of the [page:.blendSrc]. Uses [page:.blendSrc] value if null. Default is *null*.
   */
  @Input() protected blendSrcAlpha: number = null;

  /**
   * Changes the behavior of clipping planes so that only their intersection is clipped, rather than their union.
   * Default is *false*.
   */
  @Input() protected clipIntersection: boolean = null;

  /**
   * User-defined clipping planes specified as THREE.Plane objects in world space.
   * These planes apply to the objects this material is attached to.
   * Points in space whose signed distance to the plane is negative are clipped (not rendered).
   * This requires [page:WebGLRenderer.localClippingEnabled] to be *true*.
   * See the [example:webgl_clipping_intersection WebGL / clipping /intersection] example.
   * Default is *null*.
   */
  @Input() protected clippingPlanes: PlaneComponent[] | THREE.Plane[] = null;

  /**
   * Defines whether to clip shadows according to the clipping planes specified on this material. Default is *false*.
   */
  @Input() protected clipShadows: boolean = null;

  /**
   * Whether to render the material's color.
   * This can be used in conjunction with a mesh's [page:Integer renderOrder] property to create invisible objects that occlude other objects. Default is *true*.
   */
  @Input() protected colorWrite: boolean = null;

  /**
   * Custom defines to be injected into the shader. These are passed in form of an object literal, with key/value pairs. { MY_CUSTOM_DEFINE: '' , PI2: Math.PI * 2 }. The pairs are defined in both vertex and fragment shaders.  Default is *undefined*.
   */
  @Input() protected defines: any = null;

  /**
   * Which depth function to use. Default is [page:Materials LessEqualDepth]. See the depth mode [page:Materials constants] for all possible values.
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.DepthModes
   * @see THREE.NeverDepth - NeverDepth , Never
   * @see THREE.AlwaysDepth - AlwaysDepth , Always
   * @see THREE.LessDepth - LessDepth , Less
   * @see THREE.LessEqualDepth - LessEqualDepth , LessEqual
   * @see THREE.EqualDepth - EqualDepth , Equal
   * @see THREE.GreaterEqualDepth - GreaterEqualDepth , GreaterEqual
   * @see THREE.GreaterDepth - GreaterDepth , Greater
   * @see THREE.NotEqualDepth - NotEqualDepth , NotEqual
   * 
   */
  @Input() protected depthFunc: string = null;

  /**
   * Whether to have depth test enabled when rendering this material. Default is *true*.
   */
  @Input() protected depthTest: boolean = null;

  /**
   * Whether rendering this material has any effect on the depth buffer. Default is *true*.<br /><br />
   * When drawing 2D overlays it can be useful to disable the depth writing in order to layer several things together without creating z-index artifacts.
   */
  @Input() protected depthWrite: boolean = null;

  /**
   * Whether the material is affected by fog. Default is *true*.
   */
  @Input() protected fog: boolean = null;

  /**
   * Whether to use polygon offset. Default is *false*. This corresponds to the *GL_POLYGON_OFFSET_FILL* WebGL feature.
   */
  @Input() protected polygonOffset: boolean = null;

  /**
   * Sets the polygon offset factor. Default is *0*.
   */
  @Input() protected polygonOffsetFactor: number = null;

  /**
   * Sets the polygon offset units. Default is *0*.
   */
  @Input() protected polygonOffsetUnits: number = null;

  /**
   * Override the renderer's default precision for this material. Can be "*highp*", "*mediump*" or "*lowp*".
   * Default is *null*.
   * 
   * Notice - case insensitive.
   * 
   */
  @Input() protected precision: string = null;

  /**
   * Whether to premultiply the alpha (transparency) value.
   * See [Example:webgl_materials_physical_transmission WebGL / Materials / Physical / Transmission] for an example of the difference.
   * Default is *false*.
   * 
   * highp
   * mediump
   * lowp
   */
  @Input() protected premultipliedAlpha: boolean = null;

  /**
   * Whether to apply dithering to the color to remove the appearance of banding.
   * Default is *false*.
   */
  @Input() protected dithering: boolean = null;

  /**
   * Define whether the material is rendered with flat shading. Default is false.
   */
  @Input() protected flatShading: boolean = null;

  /**
   * Defines which side of faces will be rendered - front, back or both.
   * Default is [page:Materials THREE.FrontSide].
   * Other options are [page:Materials THREE.BackSide] and [page:Materials THREE.DoubleSide].
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.Side
   * @see THREE.FrontSide - FrontSide , Front
   * @see THREE.BackSide - BackSide , Back
   * @see THREE.DoubleSide - DoubleSide , Double
   */
  @Input() protected side: string = null;

  /**
   * Defines which side of faces cast shadows.
   * When set, can be [page:Materials THREE.FrontSide], [page:Materials THREE.BackSide], or [page:Materials THREE.DoubleSide]. Default is *null*. <br />
   * If *null*, the side casting shadows is determined as follows: <br />
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.Side
   * @see THREE.FrontSide - FrontSide , Front
   * @see THREE.BackSide - BackSide , Back
   * @see THREE.DoubleSide - DoubleSide , Double
   */
  @Input() protected shadowSide: string = null;

  /**
   * Defines whether this material is tone mapped according to the renderer's [page:WebGLRenderer.toneMapping toneMapping] setting. Default is *true*.
   */
  @Input() protected toneMapped: boolean = null;

  /**
   * Defines whether vertex coloring is used. Default is *false*.
   */
  @Input() protected vertexColors: boolean = null;

  /**
   * Whether stencil operations are performed against the stencil buffer. In order to perform writes or comparisons against the stencil buffer this value must be *true*. Default is *false*.
   */
  @Input() protected stencilWrite: boolean = null;

  /**
   * The stencil comparison function to use. Default is [page:Materials AlwaysStencilFunc]. See stencil function [page:Materials constants] for all possible values.
   * 
   * Notice - case insensitive.
   * 
   */
  @Input() protected stencilFunc: string = null;

  /**
   * The value to use when performing stencil comparisons or stencil operations. Default is *0*.
   * 
   * @see THREE.StencilFunc
   * @see THREE.NeverStencilFunc - NeverStencilFunc , NeverStencil
   * @see THREE.LessStencilFunc - LessStencilFunc , LessStencil
   * @see THREE.EqualStencilFunc - EqualStencilFunc , EqualStencil
   * @see THREE.LessEqualStencilFunc - LessEqualStencilFunc , LessEqualStencil
   * @see THREE.GreaterStencilFunc - GreaterStencilFunc , GreaterStencil
   * @see THREE.NotEqualStencilFunc - NotEqualStencilFunc , NotEqualStencil
   * @see THREE.GreaterEqualStencilFunc - GreaterEqualStencilFunc , GreaterEqualStencil
   * @see THREE.AlwaysStencilFunc - AlwaysStencilFunc , AlwaysStencil
  */
  @Input() protected stencilRef: number = null;

  /**
   * The bit mask to use when writing to the stencil buffer. Default is *0xFF*.
   */
  @Input() protected stencilWriteMask: number = null;

  /**
   * The bit mask to use when comparing against the stencil buffer. Default is *0xFF*.
   */
  @Input() protected stencilFuncMask: number = null;

  /**
   * Which stencil operation to perform when the comparison function returns false. Default is [page:Materials KeepStencilOp]. See the stencil operations [page:Materials constants] for all possible values.
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.StencilOp
   * @see THREE.ZeroStencilOp - ZeroStencilOp , ZeroStencil
   * @see THREE.KeepStencilOp - KeepStencilOp , KeepStencil
   * @see THREE.ReplaceStencilOp - ReplaceStencilOp , ReplaceStencil
   * @see THREE.IncrementStencilOp - IncrementStencilOp , IncrementStencil
   * @see THREE.DecrementStencilOp - DecrementStencilOp , DecrementStencil
   * @see THREE.IncrementWrapStencilOp - IncrementWrapStencilOp , IncrementWrapStencil
   * @see THREE.DecrementWrapStencilOp - DecrementWrapStencilOp , DecrementWrapStencil
   * @see THREE.InvertStencilOp - InvertStencilOp , InvertStencil
   */
  @Input() protected stencilFail: string = null;

  /**
   * Which stencil operation to perform when the comparison function returns true but the depth test fails. Default is [page:Materials KeepStencilOp]. See the stencil operations [page:Materials constants] for all possible values.
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.StencilOp
   * @see THREE.ZeroStencilOp - ZeroStencilOp , ZeroStencil
   * @see THREE.KeepStencilOp - KeepStencilOp , KeepStencil
   * @see THREE.ReplaceStencilOp - ReplaceStencilOp , ReplaceStencil
   * @see THREE.IncrementStencilOp - IncrementStencilOp , IncrementStencil
   * @see THREE.DecrementStencilOp - DecrementStencilOp , DecrementStencil
   * @see THREE.IncrementWrapStencilOp - IncrementWrapStencilOp , IncrementWrapStencil
   * @see THREE.DecrementWrapStencilOp - DecrementWrapStencilOp , DecrementWrapStencil
   * @see THREE.InvertStencilOp - InvertStencilOp , InvertStencil
   */
  @Input() protected stencilZFail: string = null;

  /**
   * Which stencil operation to perform when the comparison function returns true and the depth test passes. Default is [page:Materials KeepStencilOp]. See the stencil operations [page:Materials constants] for all possible values.
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.StencilOp
   * @see THREE.ZeroStencilOp - ZeroStencilOp , ZeroStencil
   * @see THREE.KeepStencilOp - KeepStencilOp , KeepStencil
   * @see THREE.ReplaceStencilOp - ReplaceStencilOp , ReplaceStencil
   * @see THREE.IncrementStencilOp - IncrementStencilOp , IncrementStencil
   * @see THREE.DecrementStencilOp - DecrementStencilOp , DecrementStencil
   * @see THREE.IncrementWrapStencilOp - IncrementWrapStencilOp , IncrementWrapStencil
   * @see THREE.DecrementWrapStencilOp - DecrementWrapStencilOp , DecrementWrapStencil
   * @see THREE.InvertStencilOp - InvertStencilOp , InvertStencil
   */
  @Input() protected stencilZPass: string = null;

  /**
   * Defines whether this material is transparent. This has an effect on rendering
   * as transparent objects need special treatment and are rendered after
   * non-transparent objects. <br />
   * When set to true, the extent to which the material is transparent is
   * controlled by setting its [page:Float opacity] property. <br />
   * Default is *false*.
   */
  @Input() protected transparent: boolean = null;

  /**
   * Input  of abstract material component
   */
  @Input() protected control: any = null;

  /**
   * An callback that is executed immediately before the shader program is compiled.
   * This function is called with the shader source code as a parameter. Useful for the modification of built-in materials.
   */
  @Input() protected onBeforeCompile: (shader: THREE.Shader, renderer?: THREE.WebGLRenderer) => void = null;

  /**
   * Content children of abstract material component
   */
  @ContentChildren(PlaneComponent) protected clippingPlanesList: QueryList<PlaneComponent>;

  /**
   * Determines whether material type is
   * @param materialType
   * @returns true if material type
   */
  public isMaterialType(materialType: string): boolean {
    return this.materialType.toLowerCase() === materialType.toLowerCase() && (this.visible === null || this.visible);
  }

  /**
   * Which blending to use when displaying objects with this material. <br />
   * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].<br />
   * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.BlendingDstFactor
   * @see THREE.ZeroFactor - ZeroFactor , Zero
   * @see THREE.OneFactor - OneFactor , One
   * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
   * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
   * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
   * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
   * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
   * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
   * @see THREE.DstColorFactor - DstColorFactor , DstColor
   * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
   * 
   * @param [def]
   * @returns blend dst
   */
  protected getBlendDst(def?: string): THREE.BlendingDstFactor {
    const blendDst = ThreeUtil.getTypeSafe(this.blendDst, def, '');
    switch (blendDst.toLowerCase()) {
      case 'zero':
        return THREE.ZeroFactor;
      case 'one':
        return THREE.OneFactor;
      case 'srccolor':
        return THREE.SrcColorFactor;
      case 'oneminussrccolor':
        return THREE.OneMinusSrcColorFactor;
      case 'srcalpha':
        return THREE.SrcAlphaFactor;
      case 'oneminussrcalpha':
        return THREE.OneMinusSrcAlphaFactor;
      case 'dstalpha':
        return THREE.DstAlphaFactor;
      case 'oneminusdstalpha':
        return THREE.OneMinusDstAlphaFactor;
      case 'dstcolor':
        return THREE.DstColorFactor;
      case 'oneminusdstcolor':
        return THREE.OneMinusDstColorFactor;
    }
    return undefined;
  }

  /**
   * Gets blend equation
   * @param [def]
   * @returns blend equation
   */
  protected getBlendEquation(def?: string): THREE.BlendingEquation {
    const blendEquation = ThreeUtil.getTypeSafe(this.blendEquation, def, '');
    switch (blendEquation.toLowerCase()) {
      case 'add':
        return THREE.AddEquation;
      case 'subtract':
        return THREE.SubtractEquation;
      case 'reversesubtract':
        return THREE.ReverseSubtractEquation;
      case 'min':
        return THREE.MinEquation;
      case 'max':
        return THREE.MaxEquation;
    }
    return undefined;
  }

  /**
   * Which blending to use when displaying objects with this material. <br />
   * This must be set to [page:Materials CustomBlending] to use custom [page:Constant blendSrc], [page:Constant blendDst] or [page:Constant blendEquation].<br />
   * See the blending mode [page:Materials constants] for all possible values. Default is [page:Materials NormalBlending].
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.BlendingDstFactor
   * @see THREE.ZeroFactor - ZeroFactor , Zero
   * @see THREE.OneFactor - OneFactor , One
   * @see THREE.SrcColorFactor - SrcColorFactor , SrcColor
   * @see THREE.OneMinusSrcColorFactor - OneMinusSrcColorFactor , OneMinusSrcColor
   * @see THREE.SrcAlphaFactor - SrcAlphaFactor , SrcAlpha
   * @see THREE.OneMinusSrcAlphaFactor - OneMinusSrcAlphaFactor , OneMinusSrcAlpha
   * @see THREE.DstAlphaFactor - DstAlphaFactor , DstAlpha
   * @see THREE.OneMinusDstAlphaFactor - OneMinusDstAlphaFactor , OneMinusDstAlpha
   * @see THREE.DstColorFactor - DstColorFactor , DstColor
   * @see THREE.OneMinusDstColorFactor - OneMinusDstColorFactor , OneMinusDstColor
   * 
   * @param [def]
   * @returns blend src
   */
  protected getBlendSrc(def?: string): THREE.BlendingSrcFactor | THREE.BlendingDstFactor {
    const blendSrc = ThreeUtil.getTypeSafe(this.blendSrc, def, '');
    switch (blendSrc.toLowerCase()) {
      case 'srcalphasaturatefactor':
      case 'srcalphasaturate':
        return THREE.SrcAlphaSaturateFactor;
      case 'zerofactor':
      case 'zero':
        return THREE.ZeroFactor;
      case 'onefactor':
      case 'one':
        return THREE.OneFactor;
      case 'srccolorfactor':
      case 'srccolor':
        return THREE.SrcColorFactor;
      case 'oneminussrccolorfactor':
      case 'oneminussrccolor':
        return THREE.OneMinusSrcColorFactor;
      case 'srcalphafactor':
      case 'srcalpha':
        return THREE.SrcAlphaFactor;
      case 'oneminussrcalphafactor':
      case 'oneminussrcalpha':
        return THREE.OneMinusSrcAlphaFactor;
      case 'dstalphafactor':
      case 'dstalpha':
        return THREE.DstAlphaFactor;
      case 'oneminusdstalphafactor':
      case 'oneminusdstalpha':
        return THREE.OneMinusDstAlphaFactor;
      case 'dstcolorfactor':
      case 'dstcolor':
        return THREE.DstColorFactor;
      case 'oneminusdstcolorfactor':
      case 'oneminusdstcolor':
        return THREE.OneMinusDstColorFactor;
    }
    return undefined;
  }

  /**
   * Gets depth func
   * @param [def]
   * @returns depth func
   */
  protected getDepthFunc(def?: string): THREE.DepthModes {
    const depthFunc = ThreeUtil.getTypeSafe(this.depthFunc, def, '');
    switch (depthFunc.toLowerCase()) {
      case 'never':
        return THREE.NeverDepth;
      case 'always':
        return THREE.AlwaysDepth;
      case 'less':
        return THREE.LessDepth;
      case 'lessequal':
        return THREE.LessEqualDepth;
      case 'equal':
        return THREE.EqualDepth;
      case 'greaterequal':
        return THREE.GreaterEqualDepth;
      case 'greater':
        return THREE.GreaterDepth;
      case 'notequal':
        return THREE.NotEqualDepth;
    }
    return undefined;
  }

  /**
   * Gets precision
   * @param [def]
   * @returns precision
   */
  protected getPrecision(def?: string): 'highp' | 'mediump' | 'lowp' | null {
    const precision = ThreeUtil.getTypeSafe(this.precision, def, '');
    switch (precision.toLowerCase()) {
      case 'highp':
        return 'highp';
      case 'mediump':
        return 'mediump';
      case 'lowp':
        return 'lowp';
    }
    return undefined;
  }

  /**
   * Gets side
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.Side
   * @see THREE.FrontSide - FrontSide , Front
   * @see THREE.BackSide - BackSide , Back
   * @see THREE.DoubleSide - DoubleSide , Double
   * 
   * @param [def]
   * @returns side
   */
  protected getSide(def?: string): THREE.Side {
    const side = ThreeUtil.getTypeSafe(this.side, def, '');
    switch (side.toLowerCase()) {
      case 'backside':
      case 'back':
        return THREE.BackSide;
      case 'doubleside':
      case 'double':
        return THREE.DoubleSide;
      case 'frontside':
      case 'front':
        return THREE.FrontSide;
    }
    return undefined;
  }

  /**
   * Gets shadow side
   * 
   * Notice - case insensitive.
   * 
   * @see THREE.Side
   * @see THREE.FrontSide - FrontSide , Front
   * @see THREE.BackSide - BackSide , Back
   * @see THREE.DoubleSide - DoubleSide , Double
   * 
   * @param [def]
   * @returns shadow side
   */
  protected getShadowSide(def?: string): THREE.Side {
    const shadowSide = ThreeUtil.getTypeSafe(this.shadowSide, def, '');
    switch (shadowSide.toLowerCase()) {
      case 'backside':
      case 'back':
        return THREE.BackSide;
      case 'doubleside':
      case 'double':
        return THREE.DoubleSide;
      case 'frontside':
      case 'front':
        return THREE.FrontSide;
    }
    return undefined;
  }

  /**
   * Gets vertex colors
   * @param [def]
   * @returns true if vertex colors
   */
  protected getVertexColors(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.vertexColors, def);
  }

  /**
   * Gets stencil func
   * @param [def]
   * @returns stencil func
   */
  protected getStencilFunc(def?: string): THREE.StencilFunc {
    const stencilFunc = ThreeUtil.getTypeSafe(this.stencilFunc, def, '');
    switch (stencilFunc.toLowerCase()) {
      case 'never':
        return THREE.NeverStencilFunc;
      case 'less':
        return THREE.LessStencilFunc;
      case 'equal':
        return THREE.EqualStencilFunc;
      case 'lessequal':
        return THREE.LessEqualStencilFunc;
      case 'greater':
        return THREE.GreaterStencilFunc;
      case 'notequal':
        return THREE.NotEqualStencilFunc;
      case 'greaterequal':
        return THREE.GreaterEqualStencilFunc;
      case 'always':
        return THREE.AlwaysStencilFunc;
    }
    return undefined;
  }

  /**
   * Gets stencil fail
   * @param [def]
   * @returns stencil fail
   */
  protected getStencilFail(def?: string): THREE.StencilOp {
    const stencilFail = ThreeUtil.getTypeSafe(this.stencilFail, def, '');
    switch (stencilFail.toLowerCase()) {
      case 'zero':
        return THREE.ZeroStencilOp;
      case 'keep':
        return THREE.KeepStencilOp;
      case 'replace':
        return THREE.ReplaceStencilOp;
      case 'increment':
        return THREE.IncrementStencilOp;
      case 'decrement':
        return THREE.DecrementStencilOp;
      case 'incrementwrap':
        return THREE.IncrementWrapStencilOp;
      case 'decrementwrap':
        return THREE.DecrementWrapStencilOp;
      case 'invert':
        return THREE.InvertStencilOp;
    }
    return undefined;
  }

  /**
   * Gets stencil zfail
   * @param [def]
   * @returns stencil zfail
   */
  protected getStencilZFail(def?: string): THREE.StencilOp {
    const stencilZFail = ThreeUtil.getTypeSafe(this.stencilZFail, def, '');
    switch (stencilZFail.toLowerCase()) {
      case 'zero':
        return THREE.ZeroStencilOp;
      case 'keep':
        return THREE.KeepStencilOp;
      case 'replace':
        return THREE.ReplaceStencilOp;
      case 'increment':
        return THREE.IncrementStencilOp;
      case 'decrement':
        return THREE.DecrementStencilOp;
      case 'incrementwrap':
        return THREE.IncrementWrapStencilOp;
      case 'decrementwrap':
        return THREE.DecrementWrapStencilOp;
      case 'invert':
        return THREE.InvertStencilOp;
    }
    return undefined;
  }

  /**
   * Gets stencil zpass
   * @param [def]
   * @returns stencil zpass
   */
  protected getStencilZPass(def?: string): THREE.StencilOp {
    const stencilZPass = ThreeUtil.getTypeSafe(this.stencilZPass, def, '');
    switch (stencilZPass.toLowerCase()) {
      case 'zero':
        return THREE.ZeroStencilOp;
      case 'keep':
        return THREE.KeepStencilOp;
      case 'replace':
        return THREE.ReplaceStencilOp;
      case 'increment':
        return THREE.IncrementStencilOp;
      case 'decrement':
        return THREE.DecrementStencilOp;
      case 'incrementwrap':
        return THREE.IncrementWrapStencilOp;
      case 'decrementwrap':
        return THREE.DecrementWrapStencilOp;
      case 'invert':
        return THREE.InvertStencilOp;
    }
    return undefined;
  }

  /**
   * Gets clipping planes
   * @param [def]
   * @returns clipping planes
   */
  protected getClippingPlanes(def?: THREE.Plane[]): THREE.Plane[] {
    if (this.clippingPlanes !== null && this.clippingPlanes !== undefined) {
      const clippingPlanes: THREE.Plane[] = [];
      this.clippingPlanes.forEach((plane) => {
        if (plane instanceof PlaneComponent) {
          clippingPlanes.push(plane.getWorldPlane());
        } else {
          clippingPlanes.push(plane);
        }
      });
      if (clippingPlanes.length > 0) {
        return clippingPlanes;
      }
    } else if (this.clippingPlanesList !== null && this.clippingPlanesList !== undefined) {
      const clippingPlanes: THREE.Plane[] = [];
      this.clippingPlanesList.forEach((plane) => {
        clippingPlanes.push(plane.getWorldPlane());
      });
      if (clippingPlanes.length > 0) {
        return clippingPlanes;
      }
    }
    return undefined;
  }

  /**
   * Gets texture option
   * @param map
   * @param name
   * @returns texture option
   */
  protected getTextureOption(map: ThreeTexture, name: string): THREE.Texture {
    if (ThreeUtil.isNotNull(map)) {
      if (typeof map === 'string') {
        const texture = AbstractTextureComponent.getTextureImageOption(map, null, 'texture', null, () => {
          this.addChanges('texture');
        });
        return texture;
      } else if (ThreeUtil.isNotNull(map['value'])) {
        const texture = AbstractTextureComponent.getTextureImageOption(map['value'], map['options'], map['type'] as string, map['cubeImage'], () => {
          this.addChanges('texture');
        });
        return texture;
      } else {
        this.unSubscribeRefer(name);
        const texture = ThreeUtil.getTexture(map, name);
        this.subscribeRefer(
          name,
          ThreeUtil.getSubscribe(
            map,
            (event) => {
              this.addChanges(event);
            },
            'texture'
          )
        );
        return texture;
      }
    }
    return undefined;
  }

  /**
   * The base attribute can be fine without re-make Material
   */
  protected MATERIAL_ATTR: string[] = [
    'blending',
    'blenddst',
    'blenddstalpha',
    'blendequation',
    'blendequationalpha',
    'blendsrc',
    'blendsrcalpha',
    'clipintersection',
    'clippingplanes',
    'clipshadows',
    'colorwrite',
    'defines',
    'depthfunc',
    'depthtest',
    'depthwrite',
    'fog',
    'opacity',
    'polygonoffset',
    'polygonoffsetfactor',
    'polygonoffsetunits',
    'precision',
    'premultipliedalpha',
    'dithering',
    'flatshading',
    'shadowside',
    'tonemapped',
    'transparent',
    'stencilwrite',
    'stencilfunc',
    'stencilref',
    'stencilwritemask',
    'stencilfuncmask',
    'stencilfail',
    'stencilzfail',
    'stencilzpass',
    'userdata',
    'alphatest',
    'name',
    'side',
    'vertexcolors',
    'visible',
    'texture',
    'color',
    'colormultiply',
  ];

  /**
   * Creates an instance of abstract material component.
   */
  constructor() {
    super();
    this.MATERIAL_ATTR.push(...this.OBJECT_ATTR);
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   *
   * @param subscribeType
   */
  ngOnInit(subscribeType?: string): void {
    super.ngOnInit(subscribeType || 'material');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.material !== null) {
      this.material.dispose();
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
    if (changes && this.material !== null) {
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
   * Mesh material of abstract material component
   */
  private _meshMaterial: MeshMaterial = null;

  /**
   * Sets mesh
   * @param meshMaterial
   */
  public setMesh(meshMaterial: MeshMaterial) {
    if (this.material === null) {
      this.getMaterial();
    }
    if (ThreeUtil.isNotNull(meshMaterial)) {
      this._meshMaterial = meshMaterial;
      this.synkMesh(this.material);
    }
  }

  /**
   * Synks mesh
   * @param [material]
   */
  protected synkMesh(material: THREE.Material = null) {
    if (ThreeUtil.isNotNull(material) && this.enabled) {
      if (ThreeUtil.isNotNull(this._meshMaterial)) {
        switch (this.materialType.toLowerCase()) {
          case 'customdepthmaterial':
          case 'customdepth':
            if (this._meshMaterial instanceof THREE.Object3D) {
              if (this.isIdEuals(this._meshMaterial.userData.customDepthMaterial)) {
                this._meshMaterial.userData.customDepthMaterial = this.id;
                this._meshMaterial.customDepthMaterial = this.material;
                ThreeUtil.setSubscribeNext(this._meshMaterial, this.subscribeType);
              }
            }
            break;
          case 'customdistancematerial':
          case 'customdistance':
            if (this._meshMaterial instanceof THREE.Object3D) {
              if (this.isIdEuals(this._meshMaterial.userData.customDistanceMaterial)) {
                this._meshMaterial.userData.customDistanceMaterial = this.id;
                this._meshMaterial.customDistanceMaterial = this.material;
                ThreeUtil.setSubscribeNext(this._meshMaterial, this.subscribeType);
              }
            }
            break;
          case 'material':
          default:
            if (this._meshMaterial instanceof THREE.Scene) {
              switch (this.materialType.toLowerCase()) {
                case 'background':
                  if (this.isIdEuals(this._meshMaterial.userData.background)) {
                    this._meshMaterial.userData.background = this.id;
                    const backgroundTexture: THREE.Texture = this.material['map'];
                    if (ThreeUtil.isNotNull(backgroundTexture)) {
                      this._meshMaterial.background = backgroundTexture;
                    }
                    const backgroundEnvMap: THREE.Texture = this.material['envMap'];
                    if (ThreeUtil.isNotNull(backgroundEnvMap)) {
                      this._meshMaterial.environment = backgroundEnvMap;
                    }
                  }
                  break;
                case 'environment':
                  if (this.isIdEuals(this._meshMaterial.userData.environment)) {
                    this._meshMaterial.userData.environment = this.id;
                    const environmentMap: THREE.Texture = this.material['map'];
                    if (ThreeUtil.isNotNull(environmentMap) && this._meshMaterial.background !== environmentMap) {
                      this._meshMaterial.environment = environmentMap;
                    } else {
                      const backgroundEnvMap: THREE.Texture = this.material['envMap'];
                      if (ThreeUtil.isNotNull(backgroundEnvMap) && this._meshMaterial.environment !== backgroundEnvMap) {
                        this._meshMaterial.environment = backgroundEnvMap;
                      }
                    }
                  }
                  break;
                case 'background-angular':
                case 'backgroundangular':
                case 'environment-angular':
                case 'environmentangular':
                case 'background-environment-angular':
                case 'environment-background-angular':
                case 'backgroundenvironmentangular':
                case 'environmentbackgroundangular':
                  if (this.isIdEuals(this._meshMaterial.userData.angular)) {
                    if (this._meshMaterial.userData.angular !== this.id) {
                      this._meshMaterial.userData.angular = this.id;
                      ThreeUtil.setSubscribeNext(this._meshMaterial, 'material');
                    }
                  }
                  break;
                case 'overridematerial':
                default:
                  if (this.isIdEuals(this._meshMaterial.userData.angular)) {
                    this._meshMaterial.userData.overrideMaterial = this.id;
                    if (this._meshMaterial.overrideMaterial !== this.material) {
                      this._meshMaterial.overrideMaterial = this.material;
                    }
                  }
                  break;
              }
            } else {
              if (Array.isArray(this._meshMaterial.material)) {
                let oldMatrial: THREE.Material = null;
                this._meshMaterial.material.forEach((mat) => {
                  if (mat.userData.id === this.id) {
                    oldMatrial = mat;
                  }
                });
                if (oldMatrial !== null) {
                  const idx = this._meshMaterial.material.indexOf(oldMatrial);
                  if (idx > -1) {
                    this._meshMaterial.material.splice(idx, 1);
                  }
                }
                if (this._meshMaterial.material.indexOf(this.material) === -1) {
                  this._meshMaterial.material.push(this.material);
                  ThreeUtil.setSubscribeNext(this._meshMaterial, this.subscribeType);
                }
              } else if (this._meshMaterial.material !== this.material) {
                if (this.isIdEuals(this._meshMaterial.userData.material)) {
                  this._meshMaterial.userData.material = this.id;
                  this._meshMaterial.material = this.material;
                  ThreeUtil.setSubscribeNext(this._meshMaterial, this.subscribeType);
                }
              }
            }
            break;
        }
      } else if (this.material !== material && material !== null) {
        this.material = material;
      }
    }
  }

  /**
   * Determines whether mesh material is
   * @param mesh
   * @returns true if mesh material
   */
  public static isMeshMaterial(mesh: any): boolean {
    if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Points || mesh instanceof THREE.Line || mesh instanceof THREE.Sprite || mesh instanceof THREE.Scene) {
      return true;
    } else {
      return false;
    }
  }

  /**
   * Gets mesh material
   * @param mesh
   * @returns mesh material
   */
  public static getMeshMaterial(mesh: any): MeshMaterial {
    if (this.isMeshMaterial(mesh)) {
      return mesh;
    }
    const object3d = ThreeUtil.getObject3d(mesh, false) as any;
    if (object3d !== null) {
      if (this.isMeshMaterial(object3d)) {
        return object3d;
      }
      if (object3d instanceof THREE.Group) {
        let childMesh: MeshMaterial = null;
        mesh.children.forEach((child) => {
          if (childMesh === null && this.isMeshMaterial(child)) {
            childMesh = child;
          }
        });
        if (childMesh !== null) {
          return childMesh;
        }
      }
    }
    return null;
  }

  /**
   * Gets material parameters
   * @param extendObj
   * @returns material parameters
   */
  protected getMaterialParameters(extendObj: any): THREE.MaterialParameters {
    const materialParameters: THREE.MaterialParameters = Object.assign(
      {
        alphaToCoverage: ThreeUtil.getTypeSafe(this.alphaToCoverage),
        blending: ThreeUtil.getBlendingSafe(this.blending),
        blendDst: this.getBlendDst(),
        blendDstAlpha: ThreeUtil.getTypeSafe(this.blendDstAlpha),
        blendEquation: this.getBlendEquation(),
        blendEquationAlpha: ThreeUtil.getTypeSafe(this.blendEquationAlpha),
        blendSrc: this.getBlendSrc(),
        blendSrcAlpha: ThreeUtil.getTypeSafe(this.blendSrcAlpha),
        clipIntersection: ThreeUtil.getTypeSafe(this.clipIntersection),
        clippingPlanes: this.getClippingPlanes(),
        clipShadows: ThreeUtil.getTypeSafe(this.clipShadows),
        colorWrite: ThreeUtil.getTypeSafe(this.colorWrite),
        defines: ThreeUtil.getTypeSafe(this.defines),
        depthFunc: this.getDepthFunc(),
        depthTest: ThreeUtil.getTypeSafe(this.depthTest),
        depthWrite: ThreeUtil.getTypeSafe(this.depthWrite),
        fog: ThreeUtil.getTypeSafe(this.fog),
        opacity: ThreeUtil.getTypeSafe(this.opacity),
        polygonOffset: ThreeUtil.getTypeSafe(this.polygonOffset),
        polygonOffsetFactor: ThreeUtil.getTypeSafe(this.polygonOffsetFactor),
        polygonOffsetUnits: ThreeUtil.getTypeSafe(this.polygonOffsetUnits),
        precision: this.getPrecision(),
        premultipliedAlpha: ThreeUtil.getTypeSafe(this.premultipliedAlpha),
        dithering: ThreeUtil.getTypeSafe(this.dithering),
        flatShading: ThreeUtil.getTypeSafe(this.flatShading),
        shadowSide: this.getShadowSide(),
        toneMapped: ThreeUtil.getTypeSafe(this.toneMapped),
        transparent: ThreeUtil.getTypeSafe(this.transparent),
        stencilWrite: ThreeUtil.getTypeSafe(this.stencilWrite),
        stencilFunc: this.getStencilFunc(),
        stencilRef: ThreeUtil.getTypeSafe(this.stencilRef),
        stencilWriteMask: ThreeUtil.getTypeSafe(this.stencilWriteMask),
        stencilFuncMask: ThreeUtil.getTypeSafe(this.stencilFuncMask),
        stencilFail: this.getStencilFail(),
        stencilZFail: this.getStencilZFail(),
        stencilZPass: this.getStencilZPass(),
        userData: {},
        alphaTest: ThreeUtil.getTypeSafe(this.alphaTest),
        name: ThreeUtil.getTypeSafe(this.name),
        side: this.getSide(),
        vertexColors: this.getVertexColors(),
        visible: ThreeUtil.getTypeSafe(this.visible),
      },
      extendObj
    );
    const materialParametersSafe: THREE.MaterialParameters = {};
    Object.entries(materialParameters).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value)) {
        materialParametersSafe[key] = value;
      }
    });
    return materialParametersSafe;
  }

  /**
   * Material  of abstract material component
   */
  protected material: THREE.Material = null;

  /**
   * Gets material
   * @template T 
   * @returns material 
   */
  public getMaterial<T extends THREE.Material>(): T {
    return this.material as T;
  }

  /**
   * Sets material
   * @param material
   */
  protected setMaterial(material: THREE.Material) {
    if (this.material !== material && ThreeUtil.isNotNull(material)) {
      if (this.material !== null) {
        this.material.dispose();
      }
      if (ThreeUtil.isNotNull(this.control)) {
        let control = this.control;
        if (ThreeUtil.isNotNull(control.getControl)) {
          control = control.getControl();
        }
        if (control instanceof CSM) {
          control.setupMaterial(material);
        }
      }
      material.userData.id = this.id;
      material.userData.materialType = this.materialType.toLowerCase();
      if (ThreeUtil.isNotNull(this.onBeforeCompile)) {
        material.onBeforeCompile = this.onBeforeCompile;
      }
      this.material = material;
      this.synkMesh(this.material);
      super.setObject(this.material);
      this.setSubscribeNext('material');
    }
  }

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  protected applyChanges(changes: string[]) {
    if (this.material !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        return;
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'blending':
            if (ThreeUtil.isNotNull(this.blending)) {
              this.material.blending = ThreeUtil.getBlendingSafe(this.blending);
            }
            break;
          case 'blenddst':
            if (ThreeUtil.isNotNull(this.blendDst)) {
              this.material.blendDst = this.getBlendDst();
            }
            break;
          case 'blenddstalpha':
            if (ThreeUtil.isNotNull(this.blendDstAlpha)) {
              this.material.blendDstAlpha = ThreeUtil.getTypeSafe(this.blendDstAlpha);
            }
            break;
          case 'blendequation':
            if (ThreeUtil.isNotNull(this.blendEquation)) {
              this.material.blendEquation = this.getBlendEquation();
            }
            break;
          case 'blendequationalpha':
            if (ThreeUtil.isNotNull(this.blendEquationAlpha)) {
              this.material.blendEquationAlpha = ThreeUtil.getTypeSafe(this.blendEquationAlpha);
            }
            break;
          case 'blendsrc':
            if (ThreeUtil.isNotNull(this.blendSrc)) {
              this.material.blendSrc = this.getBlendSrc();
            }
            break;
          case 'blendsrcalpha':
            if (ThreeUtil.isNotNull(this.blendSrcAlpha)) {
              this.material.blendSrcAlpha = ThreeUtil.getTypeSafe(this.blendSrcAlpha);
            }
            break;
          case 'clipintersection':
            if (ThreeUtil.isNotNull(this.clipIntersection)) {
              this.material.clipIntersection = ThreeUtil.getTypeSafe(this.clipIntersection);
            }
            break;
          case 'clippingplanes':
            this.unSubscribeReferList('clippingPlanesList');
            this.material.clippingPlanes = this.getClippingPlanes();
            if (ThreeUtil.isNotNull(this.clippingPlanesList)) {
              this.subscribeListQuery(this.clippingPlanesList, 'clippingPlanesList', 'clippingPlanes');
            }
            break;
          case 'clipshadows':
            if (ThreeUtil.isNotNull(this.clipShadows)) {
              this.material.clipShadows = ThreeUtil.getTypeSafe(this.clipShadows);
            }
            break;
          case 'colorwrite':
            if (ThreeUtil.isNotNull(this.colorWrite)) {
              this.material.colorWrite = ThreeUtil.getTypeSafe(this.colorWrite);
            }
            break;
          case 'defines':
            if (ThreeUtil.isNotNull(this.defines)) {
              this.material.defines = ThreeUtil.getTypeSafe(this.defines);
            }
            break;
          case 'depthfunc':
            if (ThreeUtil.isNotNull(this.depthFunc)) {
              this.material.depthFunc = this.getDepthFunc();
            }
            break;
          case 'depthtest':
            if (ThreeUtil.isNotNull(this.depthTest)) {
              this.material.depthTest = ThreeUtil.getTypeSafe(this.depthTest);
            }
            break;
          case 'depthwrite':
            if (ThreeUtil.isNotNull(this.depthWrite)) {
              this.material.depthWrite = ThreeUtil.getTypeSafe(this.depthWrite);
            }
            break;
          case 'fog':
            if (ThreeUtil.isNotNull(this.fog)) {
              this.material.fog = ThreeUtil.getTypeSafe(this.fog);
            }
            break;
          case 'opacity':
            if (ThreeUtil.isNotNull(this.opacity)) {
              this.material.opacity = ThreeUtil.getTypeSafe(this.opacity);
            }
            break;
          case 'polygonoffset':
            if (ThreeUtil.isNotNull(this.polygonOffset)) {
              this.material.polygonOffset = ThreeUtil.getTypeSafe(this.polygonOffset);
            }
            break;
          case 'polygonoffsetfactor':
            if (ThreeUtil.isNotNull(this.polygonOffsetFactor)) {
              this.material.polygonOffsetFactor = ThreeUtil.getTypeSafe(this.polygonOffsetFactor);
            }
            break;
          case 'polygonoffsetunits':
            if (ThreeUtil.isNotNull(this.polygonOffsetUnits)) {
              this.material.polygonOffsetUnits = ThreeUtil.getTypeSafe(this.polygonOffsetUnits);
            }
            break;
          case 'precision':
            if (ThreeUtil.isNotNull(this.precision)) {
              this.material.precision = this.getPrecision();
            }
            break;
          case 'premultipliedalpha':
            if (ThreeUtil.isNotNull(this.premultipliedAlpha)) {
              this.material.premultipliedAlpha = ThreeUtil.getTypeSafe(this.premultipliedAlpha);
            }
            break;
          case 'dithering':
            if (ThreeUtil.isNotNull(this.dithering)) {
              this.material.dithering = ThreeUtil.getTypeSafe(this.dithering);
            }
            break;
          case 'flatshading':
            if (ThreeUtil.isNotNull(this.flatShading)) {
              //  this.material.flatShading = ThreeUtil.getTypeSafe(this.flatShading);
            }
            break;
          case 'shadowside':
            if (ThreeUtil.isNotNull(this.shadowSide)) {
              this.material.shadowSide = this.getShadowSide();
            }
            break;
          case 'tonemapped':
            if (ThreeUtil.isNotNull(this.toneMapped)) {
              this.material.toneMapped = ThreeUtil.getTypeSafe(this.toneMapped);
            }
            break;
          case 'transparent':
            if (ThreeUtil.isNotNull(this.transparent)) {
              this.material.transparent = ThreeUtil.getTypeSafe(this.transparent);
            }
            break;
          case 'stencilwrite':
            if (ThreeUtil.isNotNull(this.stencilWrite)) {
              this.material.stencilWrite = ThreeUtil.getTypeSafe(this.stencilWrite);
            }
            break;
          case 'stencilfunc':
            if (ThreeUtil.isNotNull(this.stencilFunc)) {
              this.material.stencilFunc = this.getStencilFunc();
            }
            break;
          case 'stencilref':
            if (ThreeUtil.isNotNull(this.stencilRef)) {
              this.material.stencilRef = ThreeUtil.getTypeSafe(this.stencilRef);
            }
            break;
          case 'stencilwritemask':
            if (ThreeUtil.isNotNull(this.stencilWriteMask)) {
              this.material.stencilWriteMask = ThreeUtil.getTypeSafe(this.stencilWriteMask);
            }
            break;
          case 'stencilfuncmask':
            if (ThreeUtil.isNotNull(this.stencilFuncMask)) {
              this.material.stencilFuncMask = ThreeUtil.getTypeSafe(this.stencilFuncMask);
            }
            break;
          case 'stencilfail':
            if (ThreeUtil.isNotNull(this.stencilFail)) {
              this.material.stencilFail = this.getStencilFail();
            }
            break;
          case 'stencilzfail':
            if (ThreeUtil.isNotNull(this.stencilZFail)) {
              this.material.stencilZFail = this.getStencilZFail();
            }
            break;
          case 'stencilzpass':
            if (ThreeUtil.isNotNull(this.stencilZPass)) {
              this.material.stencilZPass = this.getStencilZPass();
            }
            break;
          case 'alphatest':
            if (ThreeUtil.isNotNull(this.alphaTest)) {
              this.material.alphaTest = ThreeUtil.getTypeSafe(this.alphaTest);
            }
            break;
          case 'name':
            if (ThreeUtil.isNotNull(this.name)) {
              this.material.name = ThreeUtil.getTypeSafe(this.name);
            }
            break;
          case 'side':
            if (ThreeUtil.isNotNull(this.side)) {
              this.material.side = this.getSide();
            }
            break;
          case 'vertexcolors':
            if (ThreeUtil.isNotNull(this.vertexColors)) {
              this.material.vertexColors = this.getVertexColors();
            }
            break;
          case 'visible':
            if (ThreeUtil.isNotNull(this.visible)) {
              this.material.visible = ThreeUtil.getTypeSafe(this.visible);
            }
            break;
          default:
            break;
        }
      });
      this.material.needsUpdate = true;
    }
    super.applyChanges(changes);
  }
}
