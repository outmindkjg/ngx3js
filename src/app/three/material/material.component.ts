import {
  Component,
  ContentChildren,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { InterfaceSvgGeometry, ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { PlaneComponent } from '../plane/plane.component';
import { ShaderComponent } from '../shader/shader.component';
import { TextureComponent } from '../texture/texture.component';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { NodeMaterialLoader } from 'three/examples/jsm/loaders/NodeMaterialLoader';
import { NodeFrame } from 'three/examples/jsm/nodes/core/NodeFrame';
import { NodeMaterial } from 'three/examples/jsm/nodes/materials/NodeMaterial';


@Component({
  selector: 'three-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss'],
})
export class MaterialComponent
  implements OnInit, OnChanges, InterfaceSvgGeometry {
  @Input() public type: string = 'lambert';
  @Input() public name: string = null;
  @Input() public nameList: string[] = null;
  @Input() public visible: boolean = true;
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
  @Input() private uniforms: {
    [uniform: string]:
      | { type: string; value: any; options?: any }
      | THREE.IUniform;
  } = null;
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
  @Input() private envMap: TextureComponent | THREE.Texture = null;
  @Input() private map: TextureComponent | THREE.Texture = null;
  @Input() private specularMap: TextureComponent | THREE.Texture = null;
  @Input() private alphaMap: TextureComponent | THREE.Texture = null;
  @Input() private bumpMap: TextureComponent | THREE.Texture = null;
  @Input() private normalMap: TextureComponent | THREE.Texture = null;
  @Input() private displacementMap: TextureComponent | THREE.Texture = null;
  @Input() private aoMap: TextureComponent | THREE.Texture = null;
  @Input() private dashed: boolean = null;
  @Input() private dashScale: number = null;
  @Input() private dashOffset: number = null;
  @Input() private resolutionX: number = null;
  @Input() private resolutionY: number = null;

  @Output()
  private onLoad: EventEmitter<MaterialComponent> = new EventEmitter<MaterialComponent>();

  meshPositions: THREE.Vector3[] = [];
  meshRotations: THREE.Euler[] = [];
  meshScales: THREE.Vector3[] = [];
  meshTranslations: THREE.BufferGeometry[] = [];
  meshMaterials: (THREE.Material | THREE.Material[])[] = [];

  @ContentChildren(TextureComponent)
  private textureList: QueryList<TextureComponent>;
  @ContentChildren(ShaderComponent)
  private shaderList: QueryList<ShaderComponent>;
  @ContentChildren(PlaneComponent)
  private clippingPlanesList: QueryList<PlaneComponent>;

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

  public isMaterialType(materialType?: string): boolean {
    if (materialType.toLowerCase() === this.materialType.toLowerCase()) {
      return true;
    } else {
      return false;
    }
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
    return ThreeUtil.getColorMultiplySafe(
      this.specular,
      def,
      this.specularMultiply
    );
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
    return ThreeUtil.getColorMultiplySafe(
      this.emissive,
      def,
      this.emissiveMultiply
    );
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
    return ThreeUtil.getVector2Safe(this.normalScaleX, this.normalScaleY, def);
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
    return ThreeUtil.getVector3Safe(
      this.referencePositionX,
      this.referencePositionY,
      this.referencePositionZ,
      def
    );
  }

  private getClearcoat(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearcoat, def);
  }

  private getClearcoatRoughness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearcoatRoughness, def);
  }

  private getClearcoatNormalScale(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(
      this.clearcoatNormalScaleX,
      this.clearcoatNormalScaleY,
      def
    );
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

  getTexture(type: string): THREE.Texture {
    switch (type.toLowerCase()) {
      case 'envmap':
        if (ThreeUtil.isNotNull(this.envMap)) {
          if (this.envMap instanceof TextureComponent) {
            return this.envMap.getTexture();
          } else {
            return this.envMap;
          }
        }
        break;
      case 'map':
        if (ThreeUtil.isNotNull(this.map)) {
          if (this.map instanceof TextureComponent) {
            return this.map.getTexture();
          } else {
            return this.map;
          }
        }
        break;
      case 'specularmap':
        if (ThreeUtil.isNotNull(this.specularMap)) {
          if (this.specularMap instanceof TextureComponent) {
            return this.specularMap.getTexture();
          } else {
            return this.specularMap;
          }
        }
        break;
      case 'alphamap':
        if (ThreeUtil.isNotNull(this.alphaMap)) {
          if (this.alphaMap instanceof TextureComponent) {
            return this.alphaMap.getTexture();
          } else {
            return this.alphaMap;
          }
        }
        break;
      case 'bumpmap':
        if (ThreeUtil.isNotNull(this.bumpMap)) {
          if (this.bumpMap instanceof TextureComponent) {
            return this.bumpMap.getTexture();
          } else {
            return this.bumpMap;
          }
        }
        break;
      case 'normalmap':
        if (ThreeUtil.isNotNull(this.normalMap)) {
          if (this.normalMap instanceof TextureComponent) {
            return this.normalMap.getTexture();
          } else {
            return this.normalMap;
          }
        }
        break;
      case 'aomap':
        if (ThreeUtil.isNotNull(this.aoMap)) {
          if (this.aoMap instanceof TextureComponent) {
            return this.aoMap.getTexture();
          } else {
            return this.aoMap;
          }
        }
        break;
      case 'displacementmap':
        if (ThreeUtil.isNotNull(this.displacementMap)) {
          if (this.displacementMap instanceof TextureComponent) {
            return this.displacementMap.getTexture();
          } else {
            return this.displacementMap;
          }
        }
        break;
    }
    if (ThreeUtil.isNotNull(this.textureList) && this.textureList.length > 0) {
      type = type.toLowerCase();
      const foundTexture = this.textureList.find((texture) => {
        return texture.textureType.toLowerCase() === type;
      });
      if (foundTexture !== null && foundTexture !== undefined) {
        return foundTexture.getTexture();
      }
    }
    return undefined;
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
    const blending = ThreeUtil.getTypeSafe(this.blending, def, '');
    switch (blending.toLowerCase()) {
      case 'noblending':
      case 'no':
        return THREE.NoBlending;
      case 'normalblending':
      case 'normal':
        return THREE.NormalBlending;
      case 'additiveblending':
      case 'additive':
        return THREE.AdditiveBlending;
      case 'subtractiveblending':
      case 'subtractive':
        return THREE.SubtractiveBlending;
      case 'multiplyblending':
      case 'multiply':
        return THREE.MultiplyBlending;
      case 'customblending':
      case 'custom':
        return THREE.CustomBlending;
    }
    return undefined;
  }

  private getBlendSrc(
    def?: string
  ): THREE.BlendingSrcFactor | THREE.BlendingDstFactor {
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
    } else if (
      this.clippingPlanesList !== null &&
      this.clippingPlanesList !== undefined
    ) {
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
      case 'back':
        return THREE.BackSide;
      case 'double':
        return THREE.DoubleSide;
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

  private getUniforms(def?: any): { [uniform: string]: THREE.IUniform } {
    const uniforms = ThreeUtil.getTypeSafe(this.uniforms, def);
    Object.entries(uniforms).forEach(([key, value]) => {
      if (
        ThreeUtil.isNotNull(value['type']) &&
        ThreeUtil.isNotNull(value['value'])
      ) {
        switch (value['type'].toLowerCase()) {
          case 'vector2':
          case 'v2':
            uniforms[key] = {
              value: ThreeUtil.getVector2Safe(
                value['value'][0],
                value['value'][1]
              ),
            };
            break;
          case 'vector3':
          case 'vector':
          case 'v3':
            uniforms[key] = {
              value: ThreeUtil.getVector3Safe(
                value['value'][0],
                value['value'][1],
                value['value'][2]
              ),
            };
            break;
          case 'color':
            uniforms[key] = {
              value: ThreeUtil.getColorSafe(value['value'], 0xffffff),
            };
            break;
          case 'video':
          case 'videotexture':
            const videoTexture = TextureComponent.getTextureImageOption(
              value['value'],
              value['options'],
              'video'
            );
            uniforms[key] = { value: videoTexture };
          case 'texture':
            const texture = TextureComponent.getTextureImageOption(value['value'], value['options']);
            uniforms[key] = { value: texture };
            break;
          case 'number':
            uniforms[key] = { value: parseFloat(value['value']) };
            break;
        }
      }
    });
    return uniforms;
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
      if (ThreeUtil.isNotNull(this.vertexShader)) {
        return this.vertexShader;
      }
    } else if (type === 'x-shader/x-fragment') {
      if (ThreeUtil.isNotNull(this.fragmentShader)) {
        return this.fragmentShader;
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

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  ngAfterContentInit(): void {
    this.textureList.changes.subscribe((e) => {
      this.textureList.forEach((texture) => {
        texture.textureSubscribe().subscribe(() => {
          this.setTexture(texture);
        });
      });
    });
    this.textureList.forEach((texture) => {
      texture.textureSubscribe().subscribe(() => {
        this.setTexture(texture);
      });
    });
  }

  private _needUpdate: boolean = true;
  private _textureSubscribe: Subscription[] = [];

  unSubscription(subscriptions: Subscription[]): Subscription[] {
    if (subscriptions !== null && subscriptions.length > 0) {
      subscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
    }
    return [];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && ThreeUtil.isNotNull(this.textureList)) {
      this._needUpdate = true;
      this.unSubscription(this._textureSubscribe);
      this.getMaterial();
      if (this.map !== null && this.map instanceof TextureComponent) {
        this._textureSubscribe.push(
          this.map.textureSubscribe().subscribe(() => {
            this.setTexture(this.map as TextureComponent, 'map');
          })
        );
      }
      if (this.envMap !== null && this.envMap instanceof TextureComponent) {
        this._textureSubscribe.push(
          this.envMap.textureSubscribe().subscribe(() => {
            this.setTexture(this.envMap as TextureComponent, 'envMap');
          })
        );
      }
      if (
        this.specularMap !== null &&
        this.specularMap instanceof TextureComponent
      ) {
        this._textureSubscribe.push(
          this.specularMap.textureSubscribe().subscribe(() => {
            this.setTexture(this.specularMap as TextureComponent);
          })
        );
      }
      if (this.alphaMap !== null && this.alphaMap instanceof TextureComponent) {
        this._textureSubscribe.push(
          this.alphaMap.textureSubscribe().subscribe(() => {
            this.setTexture(this.alphaMap as TextureComponent, 'alphaMap');
          })
        );
      }
      if (this.bumpMap !== null && this.bumpMap instanceof TextureComponent) {
        this._textureSubscribe.push(
          this.bumpMap.textureSubscribe().subscribe(() => {
            this.setTexture(this.bumpMap as TextureComponent, 'bumpMap');
          })
        );
      }
      if (
        this.normalMap !== null &&
        this.normalMap instanceof TextureComponent
      ) {
        this._textureSubscribe.push(
          this.normalMap.textureSubscribe().subscribe(() => {
            this.setTexture(this.normalMap as TextureComponent, 'normalMap');
          })
        );
      }
      if (this.aoMap !== null && this.aoMap instanceof TextureComponent) {
        this._textureSubscribe.push(
          this.aoMap.textureSubscribe().subscribe(() => {
            this.setTexture(this.aoMap as TextureComponent, 'aoMap');
          })
        );
      }
      if (
        this.displacementMap !== null &&
        this.displacementMap instanceof TextureComponent
      ) {
        this._textureSubscribe.push(
          this.displacementMap.textureSubscribe().subscribe(() => {
            this.setTexture(
              this.displacementMap as TextureComponent,
              'displacementMap'
            );
          })
        );
      }
    }
  }

  private _materialSubject: Subject<THREE.Material> = new Subject<THREE.Material>();

  materialSubscribe(): Observable<THREE.Material> {
    return this._materialSubject.asObservable();
  }

  setTexture(texture: TextureComponent, textureTypeHint: string = null) {
    if (this.material !== null) {
      const materialClone = texture.getTexture();
      const textureType = ThreeUtil.getTypeSafe(
        textureTypeHint,
        texture.textureType,
        'map'
      );
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
      this._materialSubject.next(this.material);
    }
  }

  public storageSource : any = null;

  getMaterial(): THREE.Material {
    if (this.material === null || this._needUpdate) {
      this._needUpdate = false;
      this.material = null;
      this.storageSource = null;
      if (ThreeUtil.isNotNull(this.storageName)) {
        this.material = new THREE.MeshLambertMaterial(
          this.getMaterialParameters({})
        );
        switch (this.type.toLowerCase()) {
          case 'nodematerial' :
          case 'node' :
            const modeMateriallibrary = {}
            if (ThreeUtil.isNotNull(this.storageOption)) {
              Object.entries(this.storageOption).forEach(([key, value]) => {
                if (
                  ThreeUtil.isNotNull(value['type']) &&
                  ThreeUtil.isNotNull(value['value'])
                ) {
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
            nodeMaterialLoader.load(this.localStorageService.getStoreUrl(this.storageName), (material: THREE.Material) => {
              this.material = material;
              this.storageSource = nodeMaterialLoader;
              if (this.getVisible(true)) {
                this._materialSubject.next(this.material);
              }
              this.onLoad.emit(this);
            });
            break;
          default :
            this.localStorageService.getMaterial(
              this.storageName,
              (material: THREE.Material, storageSource : any) => {
                this.material = material;
                if (this.getVisible(true)) {
                  this._materialSubject.next(this.material);
                }
                this.storageSource = storageSource;
                this.onLoad.emit(this);
              }
            , this.storageOption);
            break;
        }
      } else if (this.refer !== null) {
        if (this.refer.getMaterial) {
          this.material = this.refer.getMaterial();
        } else if (this.refer instanceof THREE.Material) {
          this.material = this.refer;
        }
        if (this.material !== null && this.referOverride) {
          this.material = this.material.clone();
          if (ThreeUtil.isNotNull(this.side)) {
            this.material.side = this.getSide();
          }
        }
      }
      if (this.material === null) {
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
            this.material = new THREE.LineBasicMaterial(
              this.getMaterialParameters(parametersLineBasicMaterial)
            );
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
            this.material = new THREE.LineDashedMaterial(
              this.getMaterialParameters(parametersLineDashedMaterial)
            );
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
            this.material = new THREE.MeshBasicMaterial(
              this.getMaterialParameters(parametersMeshBasicMaterial)
            );
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
            this.material = new THREE.MeshDepthMaterial(
              this.getMaterialParameters(parametersMeshDepthMaterial)
            );
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
            this.material = new THREE.MeshDistanceMaterial(
              this.getMaterialParameters(parametersMeshDistanceMaterial)
            );
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
            this.material = new THREE.MeshMatcapMaterial(
              this.getMaterialParameters(parametersMeshMatcapMaterial)
            );
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
            this.material = new THREE.MeshNormalMaterial(
              this.getMaterialParameters(parametersMeshNormalMaterial)
            );
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
            this.material = new THREE.MeshPhongMaterial(
              this.getMaterialParameters(parametersMeshPhongMaterial)
            );
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
            this.material = new THREE.MeshPhysicalMaterial(
              this.getMaterialParameters(parametersMeshPhysicalMaterial)
            );
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
            this.material = new THREE.MeshStandardMaterial(
              this.getMaterialParameters(parametersMeshStandardMaterial)
            );
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
            this.material = new THREE.MeshToonMaterial(
              this.getMaterialParameters(parametersMeshToonMaterial)
            );
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
            this.material = new THREE.PointsMaterial(
              this.getMaterialParameters(parametersPointsMaterial)
            );
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
            this.material = new THREE.RawShaderMaterial(
              this.getMaterialParameters(parametersRawShaderMaterial)
            );
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
            this.material = new THREE.ShaderMaterial(
              this.getMaterialParameters(parametersShaderMaterial)
            );
            break;
          case 'shadowmaterial':
          case 'shadow':
            this.material = new THREE.ShadowMaterial(
              this.getMaterialParameters({
                color: this.getColor(),
              })
            );
            break;
          case 'linematerial':
          case 'line':
            this.material = new LineMaterial(
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
            this.material = new THREE.SpriteMaterial(
              this.getMaterialParameters(parametersSpriteMaterial)
            );
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
            this.material = new THREE.MeshLambertMaterial(
              this.getMaterialParameters(parametersMeshLambertMaterial)
            );
            break;
        }
      }
      if (this.getVisible(true)) {
        this._materialSubject.next(this.material);
      }
      this.onLoad.emit(this);
    }
    return this.material;
  }

  private _nodeFrame : any = null;

  updateNode(delta) {
    if (this.material instanceof NodeMaterial) {
      if (this._nodeFrame == null) {
        this._nodeFrame = new NodeFrame(0);
      }
      this._nodeFrame.update( delta ).updateNode( this.material )
    }
  }
}
