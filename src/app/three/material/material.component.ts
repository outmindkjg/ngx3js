import { Component, ContentChildren, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSM } from 'three/examples/jsm/csm/CSM';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { NodeMaterialLoader } from 'three/examples/jsm/loaders/NodeMaterialLoader';
import { NodeFrame } from 'three/examples/jsm/nodes/core/NodeFrame';
import { NodeMaterial } from 'three/examples/jsm/nodes/materials/NodeMaterial';
import { ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { PlaneComponent } from '../plane/plane.component';
import { ShaderComponent } from '../shader/shader.component';
import { ShaderType, ShaderUtils } from '../shader/shaderUtils';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { TextureComponent } from '../texture/texture.component';

export type TypeUniform = { type: string; value: any; options?: any } | THREE.IUniform;

export type TypeUniforms = { [uniform: string]: TypeUniform };

export type TextureValue = string | TextureComponent | THREE.Texture | TextureOption;

export interface TextureOption {
  type: string;
  value: string;
  options?: string;
  cubeImage?: string[];
}

@Component({
  selector: 'three-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent extends AbstractSubscribeComponent implements OnInit, OnDestroy, OnChanges {
  @Input() public type: string = 'lambert';
  @Input() public name: string = null;
  @Input() public visible: boolean = null;
  @Input() public nameList: string[] = null;
  @Input() public materialType: string = 'material';
  @Input() private refer: any = null;
  @Input() private referOverride: boolean = false;
  @Input() private storageName: string = null;
  @Input() private storageOption: any = null;
  @Input() private color: string | number | THREE.Color = null;
  @Input() private colorMultiply: number = null;
  @Input() private opacity: number = null;
  @Input() private alphaTest: number = null;
  @Input() private blendDst: string = null;
  @Input() private blendDstAlpha: number = null;
  @Input() private blendEquation: string = null;
  @Input() private blendEquationAlpha: number = null;
  @Input() private blending: string = null;
  @Input() private blendSrc: string = null;
  @Input() private blendSrcAlpha: number = null;
  @Input() private clipIntersection: boolean = null;
  @Input() private clippingPlanes: PlaneComponent[] | THREE.Plane[] = null;
  @Input() private clipShadows: boolean = null;
  @Input() private colorWrite: boolean = null;
  @Input() private defines: any = null;
  @Input() private depthFunc: string = null;
  @Input() private depthTest: boolean = null;
  @Input() private depthWrite: boolean = null;
  @Input() private fog: boolean = null;
  @Input() private polygonOffset: boolean = null;
  @Input() private polygonOffsetFactor: number = null;
  @Input() private polygonOffsetUnits: number = null;
  @Input() private precision: string = null;
  @Input() private premultipliedAlpha: boolean = null;
  @Input() private dithering: boolean = null;
  @Input() private flatShading: boolean = null;
  @Input() private side: string = null;
  @Input() private shadowSide: string = null;
  @Input() private toneMapped: boolean = null;
  @Input() private vertexColors: boolean = null;
  @Input() private stencilWrite: boolean = null;
  @Input() private stencilFunc: string = null;
  @Input() private stencilRef: number = null;
  @Input() private stencilWriteMask: number = null;
  @Input() private stencilFuncMask: number = null;
  @Input() private stencilFail: string = null;
  @Input() private stencilZFail: string = null;
  @Input() private stencilZPass: string = null;
  @Input() private userData: any = null;
  @Input() private shader: string | ShaderType = null;
  @Input() private uniforms: { [uniform: string]: TypeUniform } = null;
  @Input() private vertexShader: string = null;
  @Input() private fragmentShader: string = null;
  @Input() private lights: boolean = null;
  @Input() private clipping: boolean = null;
  @Input() private transparent: boolean = null;
  @Input() private wireframe: boolean = null;
  @Input() private shading: string = null;
  @Input() private specular: string | number | THREE.Color = null;
  @Input() private specularMultiply: number = null;
  @Input() private shininess: number = null;
  @Input() private lightMapIntensity: number = null;
  @Input() private aoMapIntensity: number = null;
  @Input() private emissive: string | number | THREE.Color = null;
  @Input() private emissiveMultiply: number = null;
  @Input() private emissiveIntensity: number = null;
  @Input() private bumpScale: number = null;
  @Input() private normalMapType: string = null;
  @Input() private normalScale: number = null;
  @Input() private normalScaleX: number = null;
  @Input() private normalScaleY: number = null;
  @Input() private displacementScale: number = null;
  @Input() private displacementBias: number = null;
  @Input() private combine: string = null;
  @Input() private reflectivity: number = null;
  @Input() private refractionRatio: number = null;
  @Input() private wireframeLinewidth: number = null;
  @Input() private wireframeLinecap: string = null;
  @Input() private wireframeLinejoin: string = null;
  @Input() private skinning: boolean = null;
  @Input() private morphTargets: boolean = null;
  @Input() private morphNormals: boolean = null;
  @Input() private linewidth: number = null;
  @Input() private linecap: string = null;
  @Input() private linejoin: string = null;
  @Input() private scale: number = null;
  @Input() private dashSize: number = null;
  @Input() private gapSize: number = null;
  @Input() private depthPacking: string = null;
  @Input() private farDistance: number = null;
  @Input() private nearDistance: number = null;
  @Input() private referencePositionX: number = null;
  @Input() private referencePositionY: number = null;
  @Input() private referencePositionZ: number = null;
  @Input() private clearcoat: number = null;
  @Input() private clearcoatRoughness: number = null;
  @Input() private clearcoatNormalScaleX: number = null;
  @Input() private clearcoatNormalScaleY: number = null;
  @Input() private ior: number = null;
  @Input() private sheen: string | number | THREE.Color = null;
  @Input() private sheenMultiply: number = null;
  @Input() private transmission: number = null;
  @Input() private roughness: number = null;
  @Input() private metalness: number = null;
  @Input() private envMapIntensity: number = null;
  @Input() private vertexTangents: boolean = null;
  @Input() private rotation: number = null;
  @Input() private size: number = null;
  @Input() private sizeAttenuation: boolean = null;
  @Input() private envMap: TextureValue = null;
  @Input() private map: TextureValue = null;
  @Input() private specularMap: TextureValue = null;
  @Input() private alphaMap: TextureValue = null;
  @Input() private bumpMap: TextureValue = null;
  @Input() private normalMap: TextureValue = null;
  @Input() private displacementMap: TextureValue = null;
  @Input() private aoMap: TextureValue = null;
  @Input() private dashed: boolean = null;
  @Input() private dashScale: number = null;
  @Input() private dashOffset: number = null;
  @Input() private resolutionX: number = null;
  @Input() private resolutionY: number = null;
  @Input() private control: any = null;
  @Input() private glslVersion: string = null;
  @Input() private debug: boolean = false;

  @Output() private onLoad: EventEmitter<MaterialComponent> = new EventEmitter<MaterialComponent>();

  meshPositions: THREE.Vector3[] = [];
  meshRotations: THREE.Euler[] = [];
  meshScales: THREE.Vector3[] = [];
  meshTranslations: THREE.BufferGeometry[] = [];
  meshMaterials: (THREE.Material | THREE.Material[])[] = [];

  @ContentChildren(TextureComponent) private textureList: QueryList<TextureComponent>;
  @ContentChildren(ShaderComponent) private shaderList: QueryList<ShaderComponent>;
  @ContentChildren(PlaneComponent) private clippingPlanesList: QueryList<PlaneComponent>;

  private getColor(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorMultiplySafe(this.color, def, this.colorMultiply);
  }

  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  private getTransparent(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.transparent, def);
  }

  private getWireframe(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.wireframe, def);
  }

  public isMaterialType(materialType: string): boolean {
    return this.materialType.toLowerCase() === materialType.toLowerCase() && (this.visible === null || this.visible);
  }

  private getShading(def?: string): THREE.Shading {
    const shading = ThreeUtil.getTypeSafe(this.shading, def, '');
    switch (shading.toLowerCase()) {
      case 'smooth':
        return THREE.SmoothShading;
      case 'flat':
        return THREE.FlatShading;
    }
    return undefined;
  }

  private getSpecular(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorMultiplySafe(this.specular, def, this.specularMultiply);
  }

  private getShininess(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shininess, def);
  }

  private getLightMapIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.lightMapIntensity, def);
  }

  private getAoMapIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.aoMapIntensity, def);
  }

  private getEmissive(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorMultiplySafe(this.emissive, def, this.emissiveMultiply);
  }

  private getEmissiveIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.emissiveIntensity, def);
  }

  private getBumpScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bumpScale, def);
  }

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

  private getNormalScale(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(ThreeUtil.getTypeSafe(this.normalScaleX, this.normalScaleY, this.normalScale), ThreeUtil.getTypeSafe(this.normalScaleY, this.normalScaleX, this.normalScale), def);
  }

  private getDisplacementScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.displacementScale, def);
  }

  private getDisplacementBias(def?: number): number {
    return ThreeUtil.getTypeSafe(this.displacementBias, def);
  }

  private getCombine(def?: string): THREE.Combine {
    const combine = ThreeUtil.getTypeSafe(this.combine, def, '');
    switch (combine.toLowerCase()) {
      case 'multiply':
        return THREE.MultiplyOperation;
      case 'mix':
        return THREE.MixOperation;
      case 'add':
        return THREE.AddOperation;
    }
    return undefined;
  }

  private getReflectivity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.reflectivity, def);
  }

  private getRefractionRatio(def?: number): number {
    return ThreeUtil.getTypeSafe(this.refractionRatio, def);
  }

  private getWireframeLinewidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.wireframeLinewidth, def);
  }

  private getWireframeLinecap(def?: string): string {
    return ThreeUtil.getTypeSafe(this.wireframeLinecap, def);
  }

  private getWireframeLinejoin(def?: string): string {
    return ThreeUtil.getTypeSafe(this.wireframeLinejoin, def);
  }

  private getSkinning(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.skinning, def);
  }

  private getMorphTargets(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.morphTargets, def);
  }

  private getMorphNormals(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.morphNormals, def);
  }

  private getLinewidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.linewidth, def);
  }

  private getLinecap(def?: string): string {
    return ThreeUtil.getTypeSafe(this.linecap, def);
  }

  private getLinejoin(def?: string): string {
    return ThreeUtil.getTypeSafe(this.linejoin, def);
  }

  private getScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scale, def);
  }

  private getDashSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.dashSize, def);
  }

  private getGapSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.gapSize, def);
  }

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

  private getFarDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.farDistance, def);
  }

  private getNearDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.nearDistance, def);
  }

  private getReferencePosition(def?: THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.referencePositionX, this.referencePositionY, this.referencePositionZ, def);
  }

  private getClearcoat(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearcoat, def);
  }

  private getClearcoatRoughness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearcoatRoughness, def);
  }

  private getClearcoatNormalScale(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.clearcoatNormalScaleX, this.clearcoatNormalScaleY, def);
  }

  private getIor(def?: number): number {
    return ThreeUtil.getTypeSafe(this.ior, def);
  }

  private getSheen(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorMultiplySafe(this.sheen, def, this.sheenMultiply);
  }

  private getTransmission(def?: number): number {
    return ThreeUtil.getTypeSafe(this.transmission, def);
  }

  private getRoughness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.roughness, def);
  }

  private getMetalness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.metalness, def);
  }

  private getEnvMapIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.envMapIntensity, def);
  }

  private getVertexTangents(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.vertexTangents, def);
  }

  private getRotation(def?: number): number {
    return ThreeUtil.getAngleSafe(this.rotation, def);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getSizeAttenuation(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.sizeAttenuation, def);
  }

  private getTextureOption(map: string | TextureComponent | THREE.Texture | TextureOption, name: string): THREE.Texture {
    if (ThreeUtil.isNotNull(map)) {
      if (typeof map == 'string') {
        return TextureComponent.getTextureImageOption(map, null, 'texture');
      } else if (ThreeUtil.isNotNull(map['value'])) {
        return TextureComponent.getTextureImageOption(map['value'], map['options'], map['type'] as string, map['cubeImage']);
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

  private getTexture(type: string): THREE.Texture {
    switch (type.toLowerCase()) {
      case 'envmap':
        if (ThreeUtil.isNotNull(this.envMap)) {
          return this.getTextureOption(this.envMap, 'envMap');
        }
        break;
      case 'map':
        if (ThreeUtil.isNotNull(this.map)) {
          return this.getTextureOption(this.map, 'map');
        }
        break;
      case 'specularmap':
        if (ThreeUtil.isNotNull(this.specularMap)) {
          return this.getTextureOption(this.specularMap, 'specularMap');
        }
        break;
      case 'alphamap':
        if (ThreeUtil.isNotNull(this.alphaMap)) {
          return this.getTextureOption(this.alphaMap, 'alphaMap');
        }
        break;
      case 'bumpmap':
        if (ThreeUtil.isNotNull(this.bumpMap)) {
          return this.getTextureOption(this.bumpMap, 'bumpMap');
        }
        break;
      case 'normalmap':
        if (ThreeUtil.isNotNull(this.normalMap)) {
          return this.getTextureOption(this.normalMap, 'normalMap');
        }
        break;
      case 'aomap':
        if (ThreeUtil.isNotNull(this.aoMap)) {
          return this.getTextureOption(this.aoMap, 'aoMap');
        }
        break;
      case 'displacementmap':
        if (ThreeUtil.isNotNull(this.displacementMap)) {
          return this.getTextureOption(this.displacementMap, 'displacementMap');
        }
        break;
    }
    if (ThreeUtil.isNotNull(this.textureList) && this.textureList.length > 0) {
      type = type.toLowerCase();
      const foundTexture = this.textureList.find((texture) => {
        return texture.textureType.toLowerCase() === type;
      });
      if (ThreeUtil.isNotNull(foundTexture)) {
        return foundTexture.getTexture();
      }
    }
    return undefined;
  }

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

  private getAlphaTest(def?: number): number {
    return ThreeUtil.getTypeSafe(this.alphaTest, def);
  }

  private getBlendDst(def?: string): THREE.BlendingDstFactor {
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

  private getBlendDstAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.blendDstAlpha, def);
  }

  private getBlendEquation(def?: string): THREE.BlendingEquation {
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

  private getBlendEquationAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.blendEquationAlpha, def);
  }

  private getBlending(def?: string): THREE.Blending {
    return ThreeUtil.getBlendingSafe(this.blending, def, '');
  }

  private getBlendSrc(def?: string): THREE.BlendingSrcFactor | THREE.BlendingDstFactor {
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

  private getBlendSrcAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.blendSrcAlpha, def);
  }

  private getClipIntersection(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clipIntersection, def);
  }

  private getClippingPlanes(def?: THREE.Plane[]): THREE.Plane[] {
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

  private getClipShadows(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clipShadows, def);
  }

  private getColorWrite(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.colorWrite, def);
  }

  private getDefines(def?: any): any {
    return ThreeUtil.getTypeSafe(this.defines, def);
  }

  private getDepthFunc(def?: string): THREE.DepthModes {
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

  private getDepthTest(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.depthTest, def);
  }

  private getDepthWrite(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.depthWrite, def);
  }

  private getFog(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.fog, def);
  }

  private getName(def?: string): string {
    return ThreeUtil.getTypeSafe(this.name, def);
  }

  private getPolygonOffset(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.polygonOffset, def);
  }

  private getPolygonOffsetFactor(def?: number): number {
    return ThreeUtil.getTypeSafe(this.polygonOffsetFactor, def);
  }

  private getPolygonOffsetUnits(def?: number): number {
    return ThreeUtil.getTypeSafe(this.polygonOffsetUnits, def);
  }

  private getPrecision(def?: string): 'highp' | 'mediump' | 'lowp' | null {
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

  private getPremultipliedAlpha(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.premultipliedAlpha, def);
  }

  private getDithering(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.dithering, def);
  }

  private getFlatShading(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.flatShading, def);
  }

  private getSide(def?: string): THREE.Side {
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

  private getShadowSide(def?: string): THREE.Side {
    const shadowSide = ThreeUtil.getTypeSafe(this.shadowSide, def, '');
    switch (shadowSide.toLowerCase()) {
      case 'back':
        return THREE.BackSide;
      case 'double':
        return THREE.DoubleSide;
      case 'front':
        return THREE.FrontSide;
    }
    return undefined;
  }

  private getToneMapped(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.toneMapped, def);
  }

  private getVertexColors(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.vertexColors, def);
  }

  private getVisible(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.visible, def);
  }

  private getStencilWrite(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.stencilWrite, def);
  }

  private getStencilFunc(def?: string): THREE.StencilFunc {
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

  private getStencilRef(def?: number): number {
    return ThreeUtil.getTypeSafe(this.stencilRef, def);
  }

  private getStencilWriteMask(def?: number): number {
    return ThreeUtil.getTypeSafe(this.stencilWriteMask, def);
  }

  private getStencilFuncMask(def?: number): number {
    return ThreeUtil.getTypeSafe(this.stencilFuncMask, def);
  }

  private getStencilFail(def?: string): THREE.StencilOp {
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

  private getStencilZFail(def?: string): THREE.StencilOp {
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

  private getStencilZPass(def?: string): THREE.StencilOp {
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

  private getUserData(def?: any): any {
    return ThreeUtil.getTypeSafe(this.userData, def);
  }

  private getUniforms(def?: { [uniform: string]: THREE.IUniform }): { [uniform: string]: THREE.IUniform } {
    const uniforms: {
      [key: string]: THREE.IUniform;
    } = ThreeUtil.getTypeSafe(this.uniforms, def);
    const resultUniforms = ShaderUtils.getUniforms(this.shader);
    Object.entries(uniforms).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value['type']) && ThreeUtil.isNotNull(value['value'])) {
        const valueType: string = value['type'];
        const valueValue: any = value['value'];
        switch (valueType.toLowerCase()) {
          case 'projectionmatrixinverse':
          case 'projectionmatrix':
          case 'matrixworldinverse':
          case 'matrixworld':
          case 'matrix':
            if (ThreeUtil.isNotNull(valueValue.getObject3D)) {
              this.unSubscribeRefer('unforms_' + key);
              const object3d: THREE.Object3D = valueValue.getObject3D();
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
              value: TextureComponent.getTextureImageOption(valueValue, value['options'], valueType.toLowerCase()),
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
              textureList.push(TextureComponent.getTextureImageOption(texturePath, textureOption, 'texture'));
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
      } else if (value['value'] !== undefined) {
        resultUniforms[key] = { value: value['value'] };
      } else {
        resultUniforms[key] = { value: value };
      }
    });
    if (this.debug) {
      this.consoleLog('material-uniforms', resultUniforms);
    }
    return resultUniforms;
  }

  private getLights(def?: any): any {
    return ThreeUtil.getTypeSafe(this.lights, def);
  }

  private getClipping(def?: any): any {
    return ThreeUtil.getTypeSafe(this.clipping, def);
  }

  private getDashed(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.dashed, def);
  }

  private getDashScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.dashScale, def);
  }

  private getDashOffset(def?: number): number {
    return ThreeUtil.getTypeSafe(this.dashOffset, def);
  }

  private getResolution(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.resolutionX, this.resolutionY, def);
  }

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

  private getMaterialParameters(extendObj: any): THREE.MaterialParameters {
    const materialParameters: THREE.MaterialParameters = Object.assign(
      {
        blending: this.getBlending(),
        blendDst: this.getBlendDst(),
        blendDstAlpha: this.getBlendDstAlpha(),
        blendEquation: this.getBlendEquation(),
        blendEquationAlpha: this.getBlendEquationAlpha(),
        blendSrc: this.getBlendSrc(),
        blendSrcAlpha: this.getBlendSrcAlpha(),
        clipIntersection: this.getClipIntersection(),
        clippingPlanes: this.getClippingPlanes(),
        clipShadows: this.getClipShadows(),
        colorWrite: this.getColorWrite(),
        defines: this.getDefines(),
        depthFunc: this.getDepthFunc(),
        depthTest: this.getDepthTest(),
        depthWrite: this.getDepthWrite(),
        fog: this.getFog(),
        opacity: this.getOpacity(),
        polygonOffset: this.getPolygonOffset(),
        polygonOffsetFactor: this.getPolygonOffsetFactor(),
        polygonOffsetUnits: this.getPolygonOffsetUnits(),
        precision: this.getPrecision(),
        premultipliedAlpha: this.getPremultipliedAlpha(),
        dithering: this.getDithering(),
        flatShading: this.getFlatShading(),
        shadowSide: this.getShadowSide(),
        toneMapped: this.getToneMapped(),
        transparent: this.getTransparent(),
        stencilWrite: this.getStencilWrite(),
        stencilFunc: this.getStencilFunc(),
        stencilRef: this.getStencilRef(),
        stencilWriteMask: this.getStencilWriteMask(),
        stencilFuncMask: this.getStencilFuncMask(),
        stencilFail: this.getStencilFail(),
        stencilZFail: this.getStencilZFail(),
        stencilZPass: this.getStencilZPass(),
        userData: this.getUserData(),
        alphaTest: this.getAlphaTest(),
        name: this.getName(),
        side: this.getSide(),
        vertexColors: this.getVertexColors(),
        visible: this.getVisible(),
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

  private material: THREE.Material = null;

  setMaterialParams(params: { [key: string]: any }) {
    Object.entries(params).forEach(([key, value]) => {
      if (this[key] !== undefined) {
        this[key] = value;
      }
    });
  }

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
    if (this.material !== null) {
      this.material.dispose();
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.textureList, 'textureList', 'texture');
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes.type || changes.storageName) {
      this.needUpdate = true;
    } else {
      this.addChanges(changes);
    }
  }

  applyChanges() {
    const changes = this.getChanges();
    if (changes.length > 0) {
      if (changes.indexOf('type') > -1) {
        this.needUpdate = true;
      } else {
        this.synkObject(changes);
      }
    }
  }

  private _needUpdate: boolean = true;

  set needUpdate(value: boolean) {
    if (value && this.material !== null) {
      this._needUpdate = true;
      this.getMaterial();
    }
  }
  private _meshMaterial: {
    geometry : THREE.BufferGeometry;
    material: THREE.Material | THREE.Material[];
    customDepthMaterial?: THREE.Material;
    customDistanceMaterial?: THREE.Material;
  } = null;

  setMesh(meshMaterial: { geometry : THREE.BufferGeometry; material: THREE.Material | THREE.Material[]; customDepthMaterial?: THREE.Material; customDistanceMaterial?: THREE.Material }) {
    if (this._meshMaterial !== meshMaterial && ThreeUtil.isNotNull(meshMaterial)) {
      this._meshMaterial = meshMaterial;
      this.getMaterial();
    }
  }

  setTexture(texture: TextureComponent, textureTypeHint: string = null) {
    if (this.material !== null) {
      const materialClone = texture.getTexture();
      const textureType = ThreeUtil.getTypeSafe(textureTypeHint, texture.textureType, 'map');
      switch (textureType.toLowerCase()) {
        case 'map':
          this.material['map'] = materialClone;
          break;
        case 'envmap':
          this.material['envMap'] = materialClone;
          break;
        case 'aomap':
          this.material['aoMap'] = materialClone;
          break;
        case 'specularmap':
          this.material['specularMap'] = materialClone;
          break;
        case 'alphamap':
          this.material['alphaMap'] = materialClone;
          break;
        case 'displacementmap':
          this.material['displacementMap'] = materialClone;
          break;
        case 'matcap':
          this.material['matcap'] = materialClone;
          break;
        case 'bumpmap':
          this.material['bumpMap'] = materialClone;
          break;
        case 'normalmap':
          this.material['normalMap'] = materialClone;
          break;
        case 'lightmap':
          this.material['lightMap'] = materialClone;
          break;
        case 'emissivemap':
          this.material['emissiveMap'] = materialClone;
          break;
      }
      // this.material.needsUpdate = true;
      this.setSubscribeNext('material');
    }
  }

  public storageSource: any = null;

  getMaterial(): THREE.Material {
    if (this.material === null || this._needUpdate) {
      this._needUpdate = false;
      this.storageSource = null;
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
                      const texture = TextureComponent.getTextureImageOption(value['value'], value['options']);
                      modeMateriallibrary[key] = texture;
                      break;
                  }
                }
              });
            }
            const nodeMaterialLoader = new NodeMaterialLoader(undefined, modeMateriallibrary);
            nodeMaterialLoader.load(ThreeUtil.getStoreUrl(this.storageName), (material: THREE.Material) => {
              this.storageSource = nodeMaterialLoader;
              this._setMaterial(material);
            });
            break;
          default:
            this.localStorageService.getMaterial(
              this.storageName,
              (material: THREE.Material, storageSource: any) => {
                this.storageSource = storageSource;
                this._setMaterial(material);
              },
              this.storageOption
            );
            break;
        }
      } else if (ThreeUtil.isNotNull(this.refer)) {
        material = ThreeUtil.getMaterialOne(this.refer);
        if (material !== null && this.referOverride) {
          material = material.clone();
          if (ThreeUtil.isNotNull(this.side)) {
            material.side = this.getSide();
          }
        }
      }
      if (material === null) {
        switch (this.type.toLowerCase()) {
          case 'linebasicmaterial':
          case 'linebasic':
            const parametersLineBasicMaterial: THREE.LineBasicMaterialParameters = {
              color: this.getColor(),
              linewidth: this.getLinewidth(),
              linecap: this.getLinecap(),
              linejoin: this.getLinejoin(),
              morphTargets: this.getMorphTargets(),
            };
            material = new THREE.LineBasicMaterial(this.getMaterialParameters(parametersLineBasicMaterial));
            break;
          case 'linedashedmaterial':
          case 'linedashed':
            const parametersLineDashedMaterial: THREE.LineDashedMaterialParameters = {
              color: this.getColor(),
              vertexColors: this.getVertexColors(),
              dashSize: this.getDashSize(),
              gapSize: this.getGapSize(),
              scale: this.getScale(),
            };
            material = new THREE.LineDashedMaterial(this.getMaterialParameters(parametersLineDashedMaterial));
            break;
          case 'meshbasicmaterial':
          case 'meshbasic':
            const parametersMeshBasicMaterial: THREE.MeshBasicMaterialParameters = {
              color: this.getColor(),
              opacity: this.getOpacity(),
              aoMapIntensity: this.getAoMapIntensity(),
              refractionRatio: this.getRefractionRatio(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              reflectivity: this.getReflectivity(),
              combine: this.getCombine(),
              wireframeLinecap: this.getWireframeLinecap(),
              wireframeLinejoin: this.getWireframeLinejoin(),
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
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
            };
            material = new THREE.MeshDepthMaterial(this.getMaterialParameters(parametersMeshDepthMaterial));
            break;
          case 'meshdistancematerial':
          case 'meshdistance':
            const parametersMeshDistanceMaterial: THREE.MeshDistanceMaterialParameters = {
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              farDistance: this.getFarDistance(),
              nearDistance: this.getNearDistance(),
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
              bumpScale: this.getBumpScale(),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType(),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
            };
            material = new THREE.MeshMatcapMaterial(this.getMaterialParameters(parametersMeshMatcapMaterial));
            break;
          case 'meshnormalmaterial':
          case 'meshnormal':
            const parametersMeshNormalMaterial: THREE.MeshNormalMaterialParameters = {
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: this.getBumpScale(),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType(),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
            };
            material = new THREE.MeshNormalMaterial(this.getMaterialParameters(parametersMeshNormalMaterial));
            break;
          case 'meshphongmaterial':
          case 'meshphong':
            const parametersMeshPhongMaterial: THREE.MeshPhongMaterialParameters = {
              color: this.getColor(),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: this.getLightMapIntensity(),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: this.getAoMapIntensity(),
              emissive: this.getEmissive(),
              emissiveIntensity: this.getEmissiveIntensity(),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: this.getBumpScale(),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType(),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              refractionRatio: this.getRefractionRatio(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
              reflectivity: this.getReflectivity(),
              specular: this.getSpecular(),
              shininess: this.getShininess(),
              opacity: this.getOpacity(),
              specularMap: this.getTexture('clearcoatNormalMap'),
              combine: this.getCombine(),
              wireframeLinecap: this.getWireframeLinecap(),
              wireframeLinejoin: this.getWireframeLinejoin(),
            };
            material = new THREE.MeshPhongMaterial(this.getMaterialParameters(parametersMeshPhongMaterial));
            break;
          case 'meshphysicalmaterial':
          case 'meshphysical':
            const parametersMeshPhysicalMaterial: THREE.MeshPhysicalMaterialParameters = {
              color: this.getColor(),
              roughness: this.getRoughness(),
              metalness: this.getMetalness(),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: this.getLightMapIntensity(),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: this.getAoMapIntensity(),
              emissive: this.getEmissive(),
              emissiveIntensity: this.getEmissiveIntensity(),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: this.getBumpScale(),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType('tangentspace'),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              roughnessMap: this.getTexture('roughnessMap'),
              metalnessMap: this.getTexture('metalnessMap'),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              envMapIntensity: this.getEnvMapIntensity(),
              refractionRatio: this.getRefractionRatio(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              skinning: this.getSkinning(),
              vertexTangents: this.getVertexTangents(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
              clearcoat: this.getClearcoat(),
              // clearcoatMap: this.getTexture('clearcoatMap'),
              clearcoatRoughness: this.getClearcoatRoughness(),
              // clearcoatRoughnessMap: this.getTexture('clearcoatRoughnessMap'),
              clearcoatNormalScale: this.getClearcoatNormalScale(),
              clearcoatNormalMap: this.getTexture('clearcoatNormalMap'),
              reflectivity: this.getReflectivity(),
              // ior: this.getIor(),
              sheen: this.getSheen(),
              // transmission: this.getTransmission(),
              // transmissionMap: this.getTexture('transmissionMap')
            };
            material = new THREE.MeshPhysicalMaterial(this.getMaterialParameters(parametersMeshPhysicalMaterial));
            break;
          case 'meshstandardmaterial':
          case 'meshstandard':
            const parametersMeshStandardMaterial: THREE.MeshStandardMaterialParameters = {
              color: this.getColor(),
              roughness: this.getRoughness(),
              metalness: this.getMetalness(),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: this.getLightMapIntensity(),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: this.getAoMapIntensity(),
              emissive: this.getEmissive(),
              emissiveIntensity: this.getEmissiveIntensity(),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: this.getBumpScale(),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType('tangentspace'),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              roughnessMap: this.getTexture('roughnessMap'),
              metalnessMap: this.getTexture('metalnessMap'),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              envMapIntensity: this.getEnvMapIntensity(),
              refractionRatio: this.getRefractionRatio(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              skinning: this.getSkinning(),
              vertexTangents: this.getVertexTangents(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
            };
            material = new THREE.MeshStandardMaterial(this.getMaterialParameters(parametersMeshStandardMaterial));
            break;
          case 'meshtoonmaterial':
          case 'meshtoon':
            const parametersMeshToonMaterial: THREE.MeshToonMaterialParameters = {
              color: this.getColor(),
              opacity: this.getOpacity(),
              gradientMap: this.getTexture('gradientMap'),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: this.getLightMapIntensity(),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: this.getAoMapIntensity(),
              emissive: this.getEmissive(),
              emissiveIntensity: this.getEmissiveIntensity(),
              emissiveMap: this.getTexture('emissiveMap'),
              bumpMap: this.getTexture('bumpMap'),
              bumpScale: this.getBumpScale(),
              normalMap: this.getTexture('normalMap'),
              normalMapType: this.getNormalMapType('tangentspace'),
              normalScale: this.getNormalScale(),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              alphaMap: this.getTexture('alphaMap'),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              wireframeLinecap: this.getWireframeLinecap('round'),
              wireframeLinejoin: this.getWireframeLinejoin('round'),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
            };
            material = new THREE.MeshToonMaterial(this.getMaterialParameters(parametersMeshToonMaterial));
            break;
          case 'pointsmaterial':
          case 'points':
            const parametersPointsMaterial: THREE.PointsMaterialParameters = {
              color: this.getColor(),
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              size: this.getSize(),
              sizeAttenuation: this.getSizeAttenuation(),
              morphTargets: this.getMorphTargets(),
            };
            material = new THREE.PointsMaterial(this.getMaterialParameters(parametersPointsMaterial));
            break;
          case 'rawshadermaterial':
          case 'rawshader':
            const parametersRawShaderMaterial: THREE.ShaderMaterialParameters = {
              uniforms: this.getUniforms({}),
              vertexShader: this.getShader('x-shader/x-vertex'),
              fragmentShader: this.getShader('x-shader/x-fragment'),
              linewidth: this.getLinewidth(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              lights: this.getLights(),
              clipping: this.getClipping(),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
            };
            const rawShaderMaterial = new THREE.RawShaderMaterial(this.getMaterialParameters(parametersRawShaderMaterial));
            if (ThreeUtil.isNotNull(this.glslVersion)) {
              rawShaderMaterial.glslVersion = this.getGlslVersion();
            }
            material = rawShaderMaterial;
            break;
          case 'shadermaterial':
          case 'shader':
            const parametersShaderMaterial: THREE.ShaderMaterialParameters = {
              uniforms: this.getUniforms({}),
              vertexShader: this.getShader('x-shader/x-vertex'),
              fragmentShader: this.getShader('x-shader/x-fragment'),
              linewidth: this.getLinewidth(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              lights: this.getLights(),
              clipping: this.getClipping(),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
            };
            const shaderMaterial = new THREE.ShaderMaterial(this.getMaterialParameters(parametersShaderMaterial));
            if (ThreeUtil.isNotNull(this.glslVersion)) {
              shaderMaterial.glslVersion = this.getGlslVersion();
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
                dashed: this.getDashed(),
                dashScale: this.getDashScale(),
                dashSize: this.getDashSize(),
                dashOffset: this.getDashOffset(),
                gapSize: this.getGapSize(),
                linewidth: this.getLinewidth(),
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
              rotation: this.getRotation(),
              sizeAttenuation: this.getSizeAttenuation(),
            };
            material = new THREE.SpriteMaterial(this.getMaterialParameters(parametersSpriteMaterial));
            break;
          case 'meshlambertmaterial':
          case 'meshlambert':
          default:
            const parametersMeshLambertMaterial: THREE.MeshLambertMaterialParameters = {
              color: this.getColor(),
              emissive: this.getEmissive(),
              emissiveIntensity: this.getEmissiveIntensity(),
              emissiveMap: this.getTexture('emissiveMap'),
              map: this.getTexture('map'),
              lightMap: this.getTexture('lightMap'),
              lightMapIntensity: this.getLightMapIntensity(),
              aoMap: this.getTexture('aoMap'),
              aoMapIntensity: this.getAoMapIntensity(),
              specularMap: this.getTexture('specularMap'),
              alphaMap: this.getTexture('alphaMap'),
              envMap: this.getTexture('envMap'),
              combine: this.getCombine('multiply'),
              reflectivity: this.getReflectivity(),
              refractionRatio: this.getRefractionRatio(),
              wireframe: this.getWireframe(),
              wireframeLinewidth: this.getWireframeLinewidth(),
              wireframeLinecap: this.getWireframeLinecap('round'),
              wireframeLinejoin: this.getWireframeLinejoin('round'),
              skinning: this.getSkinning(),
              morphTargets: this.getMorphTargets(),
              morphNormals: this.getMorphNormals(),
            };
            material = new THREE.MeshLambertMaterial(this.getMaterialParameters(parametersMeshLambertMaterial));
            break;
        }
      }
      this._setMaterial(material);
    } else {
      this._setMaterial(null);
    }
    return this.material;
  }

  protected synkTexture(texture: any, textureType: string) {
    if (ThreeUtil.isNotNull(texture) && this.material !== null && this.material[textureType] !== undefined) {
      this.material[textureType] = ThreeUtil.getTexture(texture);
    }
  }

  protected synkObject(synkTypes: string[]) {
    if (this.material !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType.toLowerCase()) {
          case 'texture':
            this.synkTexture(this.envMap, 'envMap');
            this.synkTexture(this.map, 'map');
            this.synkTexture(this.specularMap, 'specularMap');
            this.synkTexture(this.alphaMap, 'alphaMap');
            this.synkTexture(this.bumpMap, 'bumpMap');
            this.synkTexture(this.normalMap, 'normalMap');
            this.synkTexture(this.aoMap, 'aoMap');
            this.synkTexture(this.displacementMap, 'displacementMap');
            if (ThreeUtil.isNotNull(this.textureList)) {
              this.textureList.forEach((texture) => {
                texture.setMaterial(this.material);
              });
            }
            this.material.needsUpdate = true;
            break;
          default:
            break;
        }
      });
    }
    super.synkObject(synkTypes);
  }

  private _setMaterial(material: THREE.Material) {
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
      material.userData.materialType = this.materialType.toLowerCase();
      this.material = material;
      this.synkObject(['texture']);
      if (this.debug) {
        this.consoleLog('material', this.material);
      }
      this.setSubscribeNext('material');
    }
    if (this._meshMaterial !== null && (this.visible === null || this.visible)) {
      switch (this.materialType.toLowerCase()) {
        case 'customdepth':
          if (this._meshMaterial.customDepthMaterial !== this.material) {
            this._meshMaterial.customDepthMaterial = this.material;
          }
          break;
        case 'customdistance':
          if (this._meshMaterial.customDistanceMaterial !== this.material) {
            this._meshMaterial.customDistanceMaterial = this.material;
          }
          break;
        case 'material':
        default:
          if (Array.isArray(this._meshMaterial.material)) {
            if (this._meshMaterial.material.indexOf(this.material) === -1) {
              this._meshMaterial.material.push(this.material);
            }
          } else if (this._meshMaterial.material !== this.material) {
            this._meshMaterial.material = this.material;
          }
          break;
      }
    }
  }

  private _nodeFrame: any = null;

  updateNode(delta) {
    if (this.material instanceof NodeMaterial) {
      if (this._nodeFrame == null) {
        this._nodeFrame = new NodeFrame(0);
      }
      this._nodeFrame.update(delta).updateNode(this.material);
    }
  }
}
