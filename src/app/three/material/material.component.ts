import { Component, ContentChildren, forwardRef, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { NodeMaterialLoader } from 'three/examples/jsm/loaders/NodeMaterialLoader';
import * as Nodes from 'three/examples/jsm/nodes/Nodes';
import { ThreeColor, ThreeUniforms, ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { AbstractMaterialComponent } from '../material.abstract';
import { ShaderComponent } from '../shader/shader.component';
import { ShaderType, ShaderUtils } from '../shader/shaders/shaderUtils';
import { AbstractTextureComponent } from '../texture.abstract';

@Component({
  selector: 'ngx3js-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
  providers: [{provide: AbstractMaterialComponent, useExisting: forwardRef(() => MaterialComponent) }]
})
export class MaterialComponent extends AbstractMaterialComponent implements OnInit, OnDestroy, OnChanges {

  /**
   * The matrial type. can be , 
   * lambert - 
   */
  @Input() public type: string = 'lambert';

  /**
   * The storage name to restore.
   */
  @Input() private storageName: string = null;

  /**
   * The storage options when restore to be used.
   */
  @Input() private storageOption: any = null;

  /**
   * The shader type
   */
  @Input() private shader: string | ShaderType = null;

  /**
   * An object of the form:
   * <code>
   * { "uniform1": { value: 1.0 }, "uniform2": { value: 2 } }
   * </code>
   * specifying the uniforms to be passed to the shader code; keys are uniform names, values are definitions of the form
   * <code>
   * { value: 1.0 }
   * </code>
   * where *value* is the value of the uniform. Names must match the name of the uniform,
   * as defined in the GLSL code. Note that uniforms are refreshed on every frame,
   * so updating the value of the uniform will immediately update the value available to the GLSL code.
   */
  @Input() private uniforms: ThreeUniforms = null;

  /**
   * Vertex shader GLSL code.  This is the actual code for the shader. In the example above,
   * the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed
   * as a string directly or loaded via AJAX instead.
   */
  @Input() private vertexShader: string = null;

  /**
   * Fragment shader GLSL code.  This is the actual code for the shader. In the example above,
   * the *vertexShader* and *fragmentShader* code is extracted from the DOM; it could be passed
   * as a string directly or loaded via AJAX instead.
   */
  @Input() private fragmentShader: string = null;

  /**
   * Defines whether this material uses lighting; true to pass uniform data related to lighting to this shader. Default is false.
   */
  @Input() private lights: boolean = null;

  /**
   * Defines whether this material supports clipping; true to let the renderer pass the clippingPlanes uniform. Default is false.
   */
  @Input() private clipping: boolean = null;

  /**
   * Render geometry as wireframe. Default is *false* (i.e. render as flat polygons).
   */
  @Input() private wireframe: boolean = null;

  /**
   * Specular color of the material. Default is a [page:Color] set to *0x111111* (very dark grey).
   * This defines how shiny the material is and the color of its shine.
   */
  @Input() private specular: ThreeColor = null;

  /**
   * 
   */
  @Input() private specularMultiply: number = null;

  /**
   * How shiny the [page:.specular] highlight is; a higher value gives a sharper highlight. Default is *30*.
   */
  @Input() private shininess: number = null;

  /**
   * Intensity of the baked light. Default is 1.
   */
  @Input() private lightMapIntensity: number = null;

  /**
   * Intensity of the ambient occlusion effect. Default is 1. Zero is no occlusion effect.
   */
  @Input() private aoMapIntensity: number = null;

  /**
   * Emissive (light) color of the material, essentially a solid color unaffected by other lighting.
   * Default is black.
   * 
   */
  @Input() private emissive: ThreeColor = null;

  /**
   * 
   */
  @Input() private emissiveMultiply: number = null;

  /**
   * Intensity of the emissive light. Modulates the emissive color. Default is 1.
   */
  @Input() private emissiveIntensity: number = null;

  /**
   * How much the bump map affects the material. Typical ranges are 0-1. Default is 1.
   */
  @Input() private bumpScale: number = null;

  /**
   * The type of normal map.<br /><br />
	 * Options are [page:constant THREE.TangentSpaceNormalMap] (default), and [page:constant THREE.ObjectSpaceNormalMap].
   */
  @Input() private normalMapType: string = null;

  /**
   * How much the normal map affects the material. Typical ranges are 0-1.
   * Default is a [page:Vector2] set to (1,1).
   */
  @Input() private normalScale: number = null;

  /**
   * 
   */
  @Input() private normalScaleX: number = null;

  /**
   * 
   */
  @Input() private normalScaleY: number = null;

  /**
   * How much the displacement map affects the mesh (where black is no displacement,
   * and white is maximum displacement). Without a displacement map set, this value is not applied.
   * Default is 1.
   */
  @Input() private displacementScale: number = null;

  /**
   * The offset of the displacement map's values on the mesh's vertices.
   * Without a displacement map set, this value is not applied. Default is 0.
   */
  @Input() private displacementBias: number = null;

  /**
   * How to combine the result of the surface's color with the environment map, if any.<br /><br />
   * Options are [page:Materials THREE.Multiply] (default), [page:Materials THREE.MixOperation],
   * [page:Materials THREE.AddOperation]. If mix is chosen, the [page:.reflectivity] is used to
   * blend between the two colors.
   */
  @Input() private combine: string = null;

  /**
   * How much the environment map affects the surface; also see [page:.combine].
   * The default value is 1 and the valid range is between 0 (no reflections) and 1 (full reflections).
   */
  @Input() private reflectivity: number = null;

  /**
   * The index of refraction (IOR) of air (approximately 1) divided by the index of refraction of the material.
   * It is used with environment mapping modes [page:Textures THREE.CubeRefractionMapping] and [page:Textures THREE.EquirectangularRefractionMapping].
   * The refraction ratio should not exceed 1. Default is *0.98*.
   */
  @Input() private refractionRatio: number = null;

  /**
   * Controls wireframe thickness. Default is 1.<br /><br />
   * Due to limitations of the [link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
   * with the [page:WebGLRenderer WebGL] renderer on most platforms linewidth will
   * always be 1 regardless of the set value.
   */
  @Input() private wireframeLinewidth: number = null;

  /**
   * Define appearance of line ends. Possible values are "butt", "round" and "square". Default is 'round'.<br /><br />
   * This corresponds to the [link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
   * property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
   */
  @Input() private wireframeLinecap: string = null;

  /**
   * Define appearance of line joints. Possible values are "round", "bevel" and "miter". Default is 'round'.<br /><br />
   * This corresponds to the [link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
   * property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
   */
  @Input() private wireframeLinejoin: string = null;

  /**
   * Define whether the material uses morphTargets. Default is false.
   */
  @Input() private morphTargets: boolean = null;

  /**
   * Defines whether the material uses morphNormals. Set as true to pass morphNormal
   * attributes from the geometry to the shader. Default is *false*.
   */
  @Input() private morphNormals: boolean = null;

  /**
   * Controls line thickness. Default is *1*.<br /><br />
   * Due to limitations of the [link:https://www.khronos.org/registry/OpenGL/specs/gl/glspec46.core.pdf OpenGL Core Profile]
   * with the [page:WebGLRenderer WebGL] renderer on most platforms linewidth will
   * always be 1 regardless of the set value.
   */
  @Input() private linewidth: number = null;

  /**
   * Define appearance of line ends. Possible values are 'butt', 'round' and 'square'.
   * Default is 'round'.<br /><br />
   * This corresponds to the [link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineCap 2D Canvas lineCap]
   * property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
   */
  @Input() private linecap: string = null;

  /**
   * Define appearance of line joints. Possible values are 'round', 'bevel' and 'miter'. Default is 'round'. <br /><br />
   * This corresponds to the [link:https://developer.mozilla.org/en/docs/Web/API/CanvasRenderingContext2D/lineJoin 2D Canvas lineJoin]
   * property and it is ignored by the [page:WebGLRenderer WebGL] renderer.
   */
  @Input() private linejoin: string = null;

  /**
   * The scale of the dashed part of a line. Default is *1*.
   */
  @Input() private scale: number = null;

  /**
   * The size of the dash. This is both the gap with the stroke. Default is *3*.
   */
  @Input() private dashSize: number = null;

  /**
   * The size of the gap. Default is *1*.
   */
  @Input() private gapSize: number = null;

  /**
   * Encoding for depth packing. Default is [page:Textures BasicDepthPacking].
   */
  @Input() private depthPacking: string = null;

  /**
   * Encoding for depth packing. Default is [page:Textures BasicDepthPacking].
   */
  @Input() private farDistance: number = null;

  /**
   * The near value of the point light's internal shadow camera.
   */
  @Input() private nearDistance: number = null;

  /**
   * The position of the point light in world space.
   */
  @Input() private referencePositionX: number = null;

  /**
   * The position of the point light in world space.
   */
  @Input() private referencePositionY: number = null;

  /**
   * The position of the point light in world space.
   */
  @Input() private referencePositionZ: number = null;

  /**
   * Represents the intensity of the clear coat layer, from *0.0* to *1.0*. Use clear coat related properties to enable multilayer
   * materials that have a thin translucent layer over the base layer. Default is *0.0*.
   */
  @Input() private clearcoat: number = null;

  /**
   * Roughness of the clear coat layer, from *0.0* to *1.0*. Default is *0.0*.
   */
  @Input() private clearcoatRoughness: number = null;

  /**
   * How much [page:.clearcoatNormalMap] affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
   */
  @Input() private clearcoatNormalScale: number = null;

  /**
   * How much [page:.clearcoatNormalMap] affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
   */
  @Input() private clearcoatNormalScaleX: number = null;

  /**
   * How much [page:.clearcoatNormalMap] affects the clear coat layer, from *(0,0)* to *(1,1)*. Default is *(1,1)*.
   */
  @Input() private clearcoatNormalScaleY: number = null;

  /**
   * If a color is assigned to this property, the material will use a special sheen BRDF intended for rendering cloth materials such as velvet.
   * The sheen color provides the ability to create two-tone specular materials. *null* by default.
   */
  @Input() private sheen: ThreeColor = null;

  /**
   * 
   */
  @Input() private sheenMultiply: number = null;

  /**
   * Degree of transmission (or optical transparency), from *0.0* to *1.0*. Default is *0.0*.<br />
   * Thin, transparent or semitransparent, plastic or glass materials remain largely reflective even if they are fully transmissive.
   * The transmission property can be used to model these materials.<br />
   * When transmission is non-zero, [page:Material.opacity opacity] should be set to *1*.
   */
  @Input() private transmission: number = null;

  /**
   * How rough the material appears. 0.0 means a smooth mirror reflection, 1.0 means fully diffuse. Default is 1.0.
   * If roughnessMap is also provided, both values are multiplied.
   */
  @Input() private roughness: number = null;

  /**
   * How much the material is like a metal. Non-metallic materials such as wood or stone use 0.0, metallic use 1.0, with nothing
   * (usually) in between. Default is 0.0. A value between 0.0 and 1.0 could be used for a rusty metal look. If metalnessMap is
   * also provided, both values are multiplied.
   */
  @Input() private metalness: number = null;

  /**
   * Scales the effect of the environment map by multiplying its color.
   */
  @Input() private envMapIntensity: number = null;

  /**
   * Defines whether precomputed vertex tangents, which must be provided in a vec4 "tangent" attribute,
   * are used. When disabled, tangents are derived automatically. Using precomputed tangents will give
   * more accurate normal map details in some cases, such as with mirrored UVs. Default is false.
   * 
   */
  @Input() private vertexTangents: boolean = null;

  /**
   * The rotation of the sprite in radians. Default is 0.
   */
  @Input() private rotation: number = null;

  /**
   * Sets the size of the points. Default is 1.0.<br/>
   * Will be capped if it exceeds the hardware dependent parameter [link:https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/getParameter gl.ALIASED_POINT_SIZE_RANGE].
   */
  @Input() private size: number = null;

  /**
   * Specify whether points' size is attenuated by the camera depth. (Perspective camera only.) Default is true.
   */
  @Input() private sizeAttenuation: boolean = null;

  /**
   * 
   */
  @Input() private dashed: boolean = null;

  /**
   * 
   */
  @Input() private dashScale: number = null;

  /**
   * 
   */
  @Input() private dashOffset: number = null;

  /**
   * 
   */
  @Input() private resolutionX: number = null;

  /**
   * 
   */
  @Input() private resolutionY: number = null;

  /**
   * Defines the GLSL version of custom shader code. Only relevant for WebGL 2 in order to define whether to specify
   * GLSL 3.0 or not. Valid values are *THREE.GLSL1* or *THREE.GLSL3*. Default is *null*.
   */
  @Input() private glslVersion: string = null;

  /**
   * 	An object with the following properties:
   * <code>
this.extensions = {
	derivatives: false, // set to use derivatives
	fragDepth: false, // set to use fragment depth values
	drawBuffers: false, // set to use draw buffers
	shaderTextureLOD: false // set to use shader texture LOD
};
   * </code>

   */
  @Input() private extensions: string = null;

  /**
   * 
   */
  meshPositions: THREE.Vector3[] = [];

  /**
   * 
   */
  meshRotations: THREE.Euler[] = [];

  /**
   * 
   */
  meshScales: THREE.Vector3[] = [];

  /**
   * 
   */
  meshTranslations: THREE.BufferGeometry[] = [];

  /**
   * 
   */
  meshMaterials: (THREE.Material | THREE.Material[])[] = [];

  /**
   * 
   */
  @ContentChildren(ShaderComponent) private shaderList: QueryList<ShaderComponent>;

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getEmissive(def?: ThreeColor): THREE.Color {
    return ThreeUtil.getColorMultiplySafe(this.emissive, def, this.emissiveMultiply);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getNormalMapType(def?: string): THREE.NormalMapTypes {
    const normalMapType = ThreeUtil.getTypeSafe(this.normalMapType, def, '');
    switch (normalMapType.toLowerCase()) {
      case 'tangentspace':
        return THREE.TangentSpaceNormalMap;
      case 'objectspace':
        return THREE.ObjectSpaceNormalMap;
    }
    return undefined;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getNormalScale(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.normalScaleX, this.normalScaleY, this.normalScale), ThreeUtil.getTypeSafe(this.normalScaleY, this.normalScaleX, this.normalScale), def);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getCombine(def?: string): THREE.Combine {
    const combine = ThreeUtil.getTypeSafe(this.combine, def, '');
    switch (combine.toLowerCase()) {
      case 'multiplyoperation':
      case 'multiply':
        return THREE.MultiplyOperation;
      case 'mixoperation':
      case 'mix':
        return THREE.MixOperation;
      case 'addoperation':
      case 'add':
        return THREE.AddOperation;
    }
    return undefined;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getDepthPacking(def?: string): THREE.DepthPackingStrategies {
    const depthPacking = ThreeUtil.getTypeSafe(this.depthPacking, def, '');
    switch (depthPacking.toLowerCase()) {
      case 'rgba':
      case 'rgbadepth':
        return THREE.RGBADepthPacking;
      case 'basic':
      case 'basicdepth':
      default:
        return THREE.BasicDepthPacking;
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getReferencePosition(def?: THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.referencePositionX, this.referencePositionY, this.referencePositionZ, def);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getClearcoatNormalScale(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.clearcoatNormalScaleX, this.clearcoatNormalScale), ThreeUtil.getTypeSafe(this.clearcoatNormalScaleY, this.clearcoatNormalScale), def);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getSheen(def?: ThreeColor): THREE.Color {
    return ThreeUtil.getColorMultiplySafe(this.sheen, def, this.sheenMultiply);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getSpecular(def?: ThreeColor): THREE.Color {
    return ThreeUtil.getColorMultiplySafe(this.specular, def, this.specularMultiply);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getGlslVersion(def?: string): THREE.GLSLVersion {
    const glslVersion = ThreeUtil.getTypeSafe(this.glslVersion, def, '');
    switch (glslVersion.toLowerCase()) {
      case '1':
      case 'gl1':
      case 'glsl1':
        return THREE.GLSL1;
      case '3':
      case 'gl3':
      case 'glsl3':
        return THREE.GLSL3;
    }
    return null;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getExtensions(extensions: { derivatives?: boolean; fragDepth?: boolean; drawBuffers?: boolean; shaderTextureLOD?: boolean }): any {
    const extensionsList = ThreeUtil.getTypeSafe(this.extensions, '').split(',');
    extensionsList.forEach((txt) => {
      switch (txt.toLowerCase()) {
        case 'derivatives':
          extensions.derivatives = true;
          break;
        case 'frag':
        case 'depth':
        case 'fragdepth':
          extensions.fragDepth = true;
          break;
        case 'buffer':
        case 'buffers':
        case 'drawbuffers':
          extensions.drawBuffers = true;
          break;
        case 'lod':
        case 'texture':
        case 'texturelod':
        case 'shadertexturelod':
          extensions.shaderTextureLOD = true;
          break;
      }
    });
    return extensions;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getUniforms(def?: { [uniform: string]: THREE.IUniform }): { [uniform: string]: THREE.IUniform } {
    const uniforms: {
      [key: string]: THREE.IUniform;
    } = ThreeUtil.getTypeSafe(this.uniforms, def);
    const resultUniforms = ShaderUtils.getUniforms(this.shader);
    Object.entries(uniforms).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value) && ThreeUtil.isNotNull(value['type']) && ThreeUtil.isNotNull(value['value'])) {
        const valueType: string = value['type'];
        const valueValue: any = value['value'];
        switch (valueType.toLowerCase()) {
          case 'projectionmatrixinverse':
          case 'projectionmatrix':
          case 'matrixworldinverse':
          case 'matrixworld':
          case 'matrix':
            if (ThreeUtil.isNotNull(valueValue.getObject3d)) {
              this.unSubscribeRefer('unforms_' + key);
              const object3d: THREE.Object3D = valueValue.getObject3d();
              resultUniforms[key] = {
                value: ThreeUtil.getMatrix4Safe(object3d, valueType),
              };
              if (ThreeUtil.isNotNull(valueValue.getSubscribe)) {
                this.subscribeRefer(
                  'unforms_' + key,
                  valueValue.getSubscribe().subscribe((e) => {
                    resultUniforms[key].value = ThreeUtil.getMatrix4Safe(e, valueType);
                  })
                );
              }
            } else {
              resultUniforms[key] = {
                value: new THREE.Matrix4(),
              };
            }
            break;
          case 'vector2':
          case 'v2':
            if (ThreeUtil.isNotNull(valueValue.getSize)) {
              this.unSubscribeRefer('unforms_' + key);
              resultUniforms[key] = {
                value: valueValue.getSize(),
              };
              if (ThreeUtil.isNotNull(valueValue.sizeSubscribe)) {
                this.subscribeRefer(
                  'unforms_' + key,
                  valueValue.sizeSubscribe().subscribe((e) => {
                    resultUniforms[key].value = e;
                  })
                );
              }
            } else {
              resultUniforms[key] = {
                value: ThreeUtil.getVector2Safe(valueValue[0], valueValue[1], new THREE.Vector2()),
              };
            }
            break;
          case 'vector3':
          case 'vector':
          case 'v3':
            resultUniforms[key] = {
              value: ThreeUtil.getVector3Safe(valueValue[0], valueValue[1], valueValue[2], new THREE.Vector3()),
            };
            break;
          case 'color':
            resultUniforms[key] = {
              value: ThreeUtil.getColorSafe(valueValue, 0xffffff),
            };
            break;
          case 'image':
          case 'texture2d':
          case 'texture3d':
          case 'texture':
          case 'datatexture2d':
          case 'datatexture3d':
          case 'datatexture':
          case 'video':
          case 'videotexture':
            resultUniforms[key] = {
              value: AbstractTextureComponent.getTextureImageOption(valueValue, value['options'], valueType.toLowerCase()),
            };
            break;
          case 'imagelist':
          case 'texturelist':
          case 'imagearray':
          case 'texturearray':
            const textureList: THREE.Texture[] = [];
            const texturePathList: string[] = [];
            const textureOption = value['options'];
            if (typeof valueValue === 'string') {
              valueValue.split(',').forEach((path) => {
                if (path !== '' && path.length > 3) {
                  texturePathList.push(path);
                }
              });
            } else if (ThreeUtil.isNotNull(valueValue.forEach)) {
              valueValue.forEach((path) => {
                if (path !== '' && path.length > 3) {
                  texturePathList.push(path);
                }
              });
            }
            texturePathList.forEach((texturePath) => {
              textureList.push(AbstractTextureComponent.getTextureImageOption(texturePath, textureOption, 'texture'));
            });
            resultUniforms[key] = {
              value: textureList,
            };
            break;
          case 'int':
          case 'integer':
            resultUniforms[key] = { value: parseInt(valueValue) };
            break;
          case 'str':
          case 'string':
            resultUniforms[key] = { value: valueValue.toString() };
            break;
          case 'double':
          case 'float':
          case 'number':
            resultUniforms[key] = { value: parseFloat(valueValue) };
            break;
          default:
            resultUniforms[key] = { value: valueValue };
            break;
        }
      } else if (ThreeUtil.isNotNull(value) && value['value'] !== undefined) {
        resultUniforms[key] = value;
      } else {
        resultUniforms[key] = { value: value };
      }
    });
    Object.entries(resultUniforms).forEach(([key, value]) => {
      uniforms[key] = value;
    });
    if (this.debug) {
      this.consoleLog('material-uniforms', resultUniforms);
    }
    return resultUniforms;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getResolution(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.resolutionX, this.resolutionY, def);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getShader(type: string) {
    if (type === 'x-shader/x-vertex') {
      if (ThreeUtil.isNotNull(this.vertexShader) || ThreeUtil.isNotNull(this.shader)) {
        return ShaderUtils.getVertexShader(ThreeUtil.getTypeSafe(this.vertexShader, this.shader));
      }
    } else if (type === 'x-shader/x-fragment') {
      if (ThreeUtil.isNotNull(this.fragmentShader) || ThreeUtil.isNotNull(this.shader)) {
        return ShaderUtils.getFragmentShader(ThreeUtil.getTypeSafe(this.fragmentShader, this.shader));
      }
    }
    if (this.shaderList != null && this.shaderList.length > 0) {
      const foundShader = this.shaderList.find((shader) => {
        return shader.type.toLowerCase() === type;
      });
      if (foundShader !== null && foundShader !== undefined) {
        return foundShader.getShader();
      }
    }
    return undefined;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  ngOnInit(): void {
    super.ngOnInit('material');
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.material) {
      this.addChanges(changes);
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.shaderList, 'shaderList', 'shader');
    super.ngAfterContentInit();
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  public getMaterial<T extends THREE.Material>(): T {
    if (this.material === null || this._needUpdate) {
      this.needUpdate = false;
      this.setUserData('storageSource', null);
      let material: THREE.Material = null;
      if (ThreeUtil.isNotNull(this.storageName)) {
        material = new THREE.MeshLambertMaterial(this.getMaterialParameters({}));
        switch (this.type.toLowerCase()) {
          case 'nodematerial':
          case 'node':
            const modeMateriallibrary = {};
            if (ThreeUtil.isNotNull(this.storageOption)) {
              Object.entries(this.storageOption).forEach(([key, value]) => {
                if (ThreeUtil.isNotNull(value['type']) && ThreeUtil.isNotNull(value['value'])) {
                  switch (value['type'].toLowerCase()) {
                    case 'texture':
                      const texture = AbstractTextureComponent.getTextureImageOption(value['value'], value['options']);
                      modeMateriallibrary[key] = texture;
                      break;
                  }
                }
              });
            }
            const nodeMaterialLoader = new NodeMaterialLoader(undefined, modeMateriallibrary);
            nodeMaterialLoader.load(ThreeUtil.getStoreUrl(this.storageName), (material: THREE.Material) => {
              this.setUserData('storageSource', nodeMaterialLoader);
              this.setMaterial(material);
            });
            break;
          default:
            this.localStorageService.getMaterial(
              this.storageName,
              (material: THREE.Material, storageSource: any) => {
                this.setUserData('storageSource', storageSource);
                this.setMaterial(material);
              },
              this.storageOption
            );
            break;
        }
      } else if (ThreeUtil.isNotNull(this.refer)) {
        this.unSubscribeRefer('refer');
        const refMaterial = ThreeUtil.getMaterialOne(this.refer);
        if (refMaterial !== null) {
          material = refMaterial.clone();
        }
        this.subscribeRefer(
          'refer',
          ThreeUtil.getSubscribe(
            this.refer,
            () => {
              this.needUpdate = true;
            },
            'material'
          )
        );
      }
      if (material === null) {
        switch (this.type.toLowerCase()) {
          case 'linebasicmaterial':
          case 'linebasic':
            const parametersLineBasicMaterial: THREE.LineBasicMaterialParameters = {
              color: this.getColor(),
              linewidth: ThreeUtil.getTypeSafe(this.linewidth),
              linecap: ThreeUtil.getTypeSafe(this.linecap),
              linejoin: ThreeUtil.getTypeSafe(this.linejoin),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
            };
            material = new THREE.LineBasicMaterial(this.getMaterialParameters(parametersLineBasicMaterial));
            break;
          case 'linedashedmaterial':
          case 'linedashed':
            const parametersLineDashedMaterial: THREE.LineDashedMaterialParameters = {
              color: this.getColor(),
              vertexColors: this.getVertexColors(),
              dashSize: ThreeUtil.getTypeSafe(this.dashSize),
              gapSize: ThreeUtil.getTypeSafe(this.gapSize),
              scale: ThreeUtil.getTypeSafe(this.scale),
            };
            material = new THREE.LineDashedMaterial(this.getMaterialParameters(parametersLineDashedMaterial));
            break;
          case 'meshbasicmaterial':
          case 'meshbasic':
            const parametersMeshBasicMaterial: THREE.MeshBasicMaterialParameters = {
              color: this.getColor(),
              aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
              refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
              combine: this.getCombine(),
              wireframeLinecap: ThreeUtil.getTypeSafe(this.wireframeLinecap),
              wireframeLinejoin: ThreeUtil.getTypeSafe(this.wireframeLinejoin),
              map: this.getTexture('map'),
              aoMap: this.getTexture('aoMap'),
              specularMap: this.getTexture('specularMap'),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
            };
            material = new THREE.MeshBasicMaterial(this.getMaterialParameters(parametersMeshBasicMaterial));
            break;
          case 'meshdepthmaterial':
          case 'meshdepth':
            const parametersMeshDepthMaterial: THREE.MeshDepthMaterialParameters = {
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              depthPacking: this.getDepthPacking(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
            };
            material = new THREE.MeshDepthMaterial(this.getMaterialParameters(parametersMeshDepthMaterial));
            break;
          case 'meshdistancematerial':
          case 'meshdistance':
            const parametersMeshDistanceMaterial: THREE.MeshDistanceMaterialParameters = {
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              farDistance: ThreeUtil.getTypeSafe(this.farDistance),
              nearDistance: ThreeUtil.getTypeSafe(this.nearDistance),
              referencePosition: this.getReferencePosition(),
            };
            material = new THREE.MeshDistanceMaterial(this.getMaterialParameters(parametersMeshDistanceMaterial));
            break;
          case 'meshmatcapmaterial':
          case 'meshmatcap':
            const parametersMeshMatcapMaterial: THREE.MeshMatcapMaterialParameters = {
              color: this.getColor(),
              matcap: this.getTexture('matcap'),
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType(),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
            };
            material = new THREE.MeshMatcapMaterial(this.getMaterialParameters(parametersMeshMatcapMaterial));
            break;
          case 'meshnormalmaterial':
          case 'meshnormal':
          case 'normalmaterial':
          case 'normal':
            const parametersMeshNormalMaterial: THREE.MeshNormalMaterialParameters = {
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType(),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
            };
            material = new THREE.MeshNormalMaterial(this.getMaterialParameters(parametersMeshNormalMaterial));
            break;
          case 'meshphongmaterial':
          case 'meshphong':
          case 'phongmaterial':
          case 'phong':
            const parametersMeshPhongMaterial: THREE.MeshPhongMaterialParameters = {
              color: this.getColor(),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: ThreeUtil.getTypeSafe(this.lightMapIntensity),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
              emissive: this.getEmissive(),
              emissiveIntensity: ThreeUtil.getTypeSafe(this.emissiveIntensity),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType(),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
              reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
              specular: this.getSpecular(),
              shininess: ThreeUtil.getTypeSafe(this.shininess),
              specularMap: this.getTexture('specularMap'),
              combine: this.getCombine(),
              wireframeLinecap: ThreeUtil.getTypeSafe(this.wireframeLinecap),
              wireframeLinejoin: ThreeUtil.getTypeSafe(this.wireframeLinejoin),
            };
            material = new THREE.MeshPhongMaterial(this.getMaterialParameters(parametersMeshPhongMaterial));
            break;
          case 'meshphysicalmaterial':
          case 'meshphysical':
          case 'physicalmaterial':
          case 'physical':
            const parametersMeshPhysicalMaterial: THREE.MeshPhysicalMaterialParameters = {
              color: this.getColor(),
              roughness: ThreeUtil.getTypeSafe(this.roughness),
              metalness: ThreeUtil.getTypeSafe(this.metalness),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: ThreeUtil.getTypeSafe(this.lightMapIntensity),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
              emissive: this.getEmissive(),
              emissiveIntensity: ThreeUtil.getTypeSafe(this.emissiveIntensity),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType('tangentspace'),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              roughnessMap: this.getTexture('roughnessMap'),
              metalnessMap: this.getTexture('metalnessMap'),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              envMapIntensity: ThreeUtil.getTypeSafe(this.envMapIntensity),
              refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              // skinning: this.getSkinning(),
              vertexTangents: ThreeUtil.getTypeSafe(this.vertexTangents),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
              clearcoat: ThreeUtil.getTypeSafe(this.clearcoat),
              // clearcoatMap: this.getTexture('clearcoatMap'),
              clearcoatRoughness: ThreeUtil.getTypeSafe(this.clearcoatRoughness),
              // clearcoatRoughnessMap: this.getTexture('clearcoatRoughnessMap'),
              clearcoatNormalScale: this.getClearcoatNormalScale(),
              clearcoatNormalMap: this.getTexture('clearcoatNormalMap'),
              reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
              // ior: this.getIor(),
              sheen: this.getSheen(),
              transmission: ThreeUtil.getTypeSafe(this.transmission),
              // transmissionMap: this.getTexture('transmissionMap')
            };
            material = new THREE.MeshPhysicalMaterial(this.getMaterialParameters(parametersMeshPhysicalMaterial));
            break;
          case 'meshstandardmaterial':
          case 'meshstandard':
          case 'standardmaterial':
          case 'standard':
            const parametersMeshStandardMaterial: THREE.MeshStandardMaterialParameters = {
              color: this.getColor(),
              roughness: ThreeUtil.getTypeSafe(this.roughness),
              metalness: ThreeUtil.getTypeSafe(this.metalness),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: ThreeUtil.getTypeSafe(this.lightMapIntensity),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
              emissive: this.getEmissive(),
              emissiveIntensity: ThreeUtil.getTypeSafe(this.emissiveIntensity),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType('tangentspace'),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              roughnessMap: this.getTexture('roughnessMap'),
              metalnessMap: this.getTexture('metalnessMap'),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              envMapIntensity: ThreeUtil.getTypeSafe(this.envMapIntensity),
              refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              // skinning: this.getSkinning(),
              vertexTangents: ThreeUtil.getTypeSafe(this.vertexTangents),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
            };
            material = new THREE.MeshStandardMaterial(this.getMaterialParameters(parametersMeshStandardMaterial));
            break;
          case 'meshtoonmaterial':
          case 'meshtoon':
          case 'toonmaterial':
          case 'toon':
            const parametersMeshToonMaterial: THREE.MeshToonMaterialParameters = {
              color: this.getColor(),
              gradientMap: this.getTexture('gradientMap'),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: ThreeUtil.getTypeSafe(this.lightMapIntensity),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
              emissive: this.getEmissive(),
              emissiveIntensity: ThreeUtil.getTypeSafe(this.emissiveIntensity),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: ThreeUtil.getTypeSafe(this.bumpScale),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType('tangentspace'),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: ThreeUtil.getTypeSafe(this.displacementScale),
              displacementBias: ThreeUtil.getTypeSafe(this.displacementBias),
              alphaMap: this.getTexture('alphaMap'),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              wireframeLinecap: ThreeUtil.getTypeSafe(this.wireframeLinecap, 'round'),
              wireframeLinejoin: ThreeUtil.getTypeSafe(this.wireframeLinejoin, 'round'),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
            };
            material = new THREE.MeshToonMaterial(this.getMaterialParameters(parametersMeshToonMaterial));
            break;
          case 'pointsmaterial':
          case 'points':
            const parametersPointsMaterial: THREE.PointsMaterialParameters = {
              color: this.getColor(),
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              size: ThreeUtil.getTypeSafe(this.size),
              sizeAttenuation: ThreeUtil.getTypeSafe(this.sizeAttenuation),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
            };
            material = new THREE.PointsMaterial(this.getMaterialParameters(parametersPointsMaterial));
            break;
          case 'rawshadermaterial':
          case 'rawshader':
            const parametersRawShaderMaterial: THREE.ShaderMaterialParameters = {
              uniforms: this.getUniforms({}),
              vertexShader: this.getShader('x-shader/x-vertex'),
              fragmentShader: this.getShader('x-shader/x-fragment'),
              linewidth: ThreeUtil.getTypeSafe(this.linewidth),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              lights: ThreeUtil.getTypeSafe(this.lights),
              clipping: ThreeUtil.getTypeSafe(this.clipping),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
            };
            const rawShaderMaterial = new THREE.RawShaderMaterial(this.getMaterialParameters(parametersRawShaderMaterial));
            if (ThreeUtil.isNotNull(this.glslVersion)) {
              rawShaderMaterial.glslVersion = this.getGlslVersion();
            }
            if (ThreeUtil.isNotNull(this.extensions)) {
              this.getExtensions(rawShaderMaterial.extensions);
            }
            material = rawShaderMaterial;
            break;
          case 'shadermaterial':
          case 'shader':
            const parametersShaderMaterial: THREE.ShaderMaterialParameters = {
              uniforms: this.getUniforms({}),
              vertexShader: this.getShader('x-shader/x-vertex'),
              fragmentShader: this.getShader('x-shader/x-fragment'),
              linewidth: ThreeUtil.getTypeSafe(this.linewidth),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              lights: ThreeUtil.getTypeSafe(this.lights),
              clipping: ThreeUtil.getTypeSafe(this.clipping),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
            };
            const shaderMaterial = new THREE.ShaderMaterial(this.getMaterialParameters(parametersShaderMaterial));
            if (ThreeUtil.isNotNull(this.glslVersion)) {
              shaderMaterial.glslVersion = this.getGlslVersion();
            }
            if (ThreeUtil.isNotNull(this.extensions)) {
              this.getExtensions(shaderMaterial.extensions);
            }
            material = shaderMaterial;
            break;
          case 'shadowmaterial':
          case 'shadow':
            material = new THREE.ShadowMaterial(
              this.getMaterialParameters({
                color: this.getColor(),
              })
            );
            break;
          case 'linematerial':
          case 'line':
            material = new LineMaterial(
              this.getMaterialParameters({
                color: this.getColor(),
                dashed: ThreeUtil.getTypeSafe(this.dashed),
                dashScale: ThreeUtil.getTypeSafe(this.dashScale),
                dashSize: ThreeUtil.getTypeSafe(this.dashSize),
                dashOffset: ThreeUtil.getTypeSafe(this.dashOffset),
                gapSize: ThreeUtil.getTypeSafe(this.gapSize),
                linewidth: ThreeUtil.getTypeSafe(this.linewidth),
                resolution: this.getResolution(),
              })
            );
            break;
          case 'spritematerial':
          case 'sprite':
            const parametersSpriteMaterial: THREE.SpriteMaterialParameters = {
              color: this.getColor(),
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              rotation: ThreeUtil.getAngleSafe(this.rotation),
              sizeAttenuation: ThreeUtil.getTypeSafe(this.sizeAttenuation),
            };
            material = new THREE.SpriteMaterial(this.getMaterialParameters(parametersSpriteMaterial));
            break;
          case 'standardnodematerial':
          case 'standardnode':
            const standardNodeMaterial = new Nodes.StandardNodeMaterial();
            if (ThreeUtil.isNotNull(this.side)) {
              standardNodeMaterial.side = this.getSide();
            }
            if (ThreeUtil.isNotNull(this.metalness)) {
              standardNodeMaterial.metalness = new Nodes.FloatNode(ThreeUtil.getTypeSafe(this.metalness));
            }
            if (ThreeUtil.isNotNull(this.reflectivity)) {
              standardNodeMaterial.reflectivity = new Nodes.FloatNode(ThreeUtil.getTypeSafe(this.reflectivity));
            }
            if (ThreeUtil.isNotNull(this.clearcoat)) {
              standardNodeMaterial.clearcoat = new Nodes.FloatNode(ThreeUtil.getTypeSafe(this.clearcoat));
            }
            if (ThreeUtil.isNotNull(this.clearcoatRoughness)) {
              standardNodeMaterial.clearcoatRoughness = new Nodes.FloatNode(ThreeUtil.getTypeSafe(this.clearcoatRoughness));
            }
            if (ThreeUtil.isNotNull(this.emissive)) {
              standardNodeMaterial.emissive = new Nodes.ColorNode(this.getEmissive());
            }
            if (ThreeUtil.isNotNull(this.sheen)) {
              standardNodeMaterial.sheen = new Nodes.ColorNode(this.getSheen());
            }
            if (ThreeUtil.isNotNull(this.roughness)) {
              standardNodeMaterial.roughness = new Nodes.FloatNode(ThreeUtil.getTypeSafe(this.roughness));
            }
            if (ThreeUtil.isNotNull(this.color)) {
              standardNodeMaterial.color = new Nodes.ColorNode(this.getColor());
            }

            material = standardNodeMaterial;
            break;
          case 'basicnodematerial':
          case 'basicnode':
            const basicNodeMaterial = new Nodes.BasicNodeMaterial();
            material = basicNodeMaterial;
            break;
          case 'meshstandardnodematerial':
          case 'meshstandardnode':
            const meshStandardNodeMaterial = new Nodes.MeshStandardNodeMaterial();
            material = meshStandardNodeMaterial;
            break;
          case 'phongnodematerial':
          case 'phongnode':
            const phongNodeMaterial = new Nodes.PhongNodeMaterial();
            material = phongNodeMaterial;
            break;
          case 'spritenodematerial':
          case 'spritenode':
            const spriteNodeMaterial = new Nodes.SpriteNodeMaterial();
            material = spriteNodeMaterial;
            break;
          case 'meshlambertmaterial':
          case 'meshlambert':
          case 'lambertmaterial':
          case 'lambert':
          default:
            const parametersMeshLambertMaterial: THREE.MeshLambertMaterialParameters = {
              color: this.getColor(),
              emissive: this.getEmissive(),
              emissiveIntensity: ThreeUtil.getTypeSafe(this.emissiveIntensity),
              emissiveMap: this.getTexture('emissiveMap'),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: ThreeUtil.getTypeSafe(this.lightMapIntensity),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: ThreeUtil.getTypeSafe(this.aoMapIntensity),
              specularMap: this.getTexture('specularMap'),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              combine: this.getCombine('multiply'),
              reflectivity: ThreeUtil.getTypeSafe(this.reflectivity),
              refractionRatio: ThreeUtil.getTypeSafe(this.refractionRatio),
              wireframe: ThreeUtil.getTypeSafe(this.wireframe),
              wireframeLinewidth: ThreeUtil.getTypeSafe(this.wireframeLinewidth),
              wireframeLinecap: ThreeUtil.getTypeSafe(this.wireframeLinecap, 'round'),
              wireframeLinejoin: ThreeUtil.getTypeSafe(this.wireframeLinejoin, 'round'),
              // skinning: this.getSkinning(),
              morphTargets: ThreeUtil.getTypeSafe(this.morphTargets),
              morphNormals: ThreeUtil.getTypeSafe(this.morphNormals),
            };
            const meshLambertMaterial = new THREE.MeshLambertMaterial(this.getMaterialParameters(parametersMeshLambertMaterial));
            material = meshLambertMaterial;
            break;
        }
      }
      this.setMaterial(material);
    }
    return this.material as T;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private _nodeFrame: any = null;

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  updateNode(delta) {
    if (this.material instanceof Nodes.NodeMaterial) {
      if (this._nodeFrame == null) {
        this._nodeFrame = new Nodes.NodeFrame(0);
      }
      this._nodeFrame.update(delta).updateNode(this.material);
    }
  }
}
