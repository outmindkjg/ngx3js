import { Component, ContentChildren, Input, Output, EventEmitter ,OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';
import { Object3D } from 'three';
import { InterfaceSvgGeometry, ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { PlaneComponent } from '../plane/plane.component';
import { ShaderComponent } from '../shader/shader.component';
import { TextureComponent } from '../texture/texture.component';

@Component({
  selector: 'three-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit, OnChanges, InterfaceSvgGeometry {

  @Input() public type:string = "lambert";
  @Input() public name:string = null;
  @Input() public visible:boolean = true;
  @Input() public materialType:string = "material";
  @Input() private refer:any = null;
  @Input() private referOverride:boolean = false;
  @Input() private storageName:string = null;
  @Input() private color:string | number = null;
  @Input() private opacity:number = null;
  @Input() private alphaTest:number = null;
  @Input() private blendDst:string = null;
  @Input() private blendDstAlpha:number = null;
  @Input() private blendEquation:string = null;
  @Input() private blendEquationAlpha:number = null;
  @Input() private blending:string = null;
  @Input() private blendSrc:string = null;
  @Input() private blendSrcAlpha:number = null;
  @Input() private clipIntersection:boolean = null;
  @Input() private clippingPlanes : PlaneComponent[] | THREE.Plane[] = null;
  @Input() private clipShadows:boolean = null;
  @Input() private colorWrite:boolean = null;
  @Input() private defines:any = null;
  @Input() private depthFunc:string = null;
  @Input() private depthTest:boolean = null;
  @Input() private depthWrite:boolean = null;
  @Input() private fog:boolean = null;
  @Input() private polygonOffset:boolean = null;
  @Input() private polygonOffsetFactor:number = null;
  @Input() private polygonOffsetUnits:number = null;
  @Input() private precision:string = null;
  @Input() private premultipliedAlpha:boolean = null;
  @Input() private dithering:boolean = null;
  @Input() private flatShading:boolean = null;
  @Input() private side:string = null;
  @Input() private shadowSide:string = null;
  @Input() private toneMapped:boolean = null;
  @Input() private vertexColors:boolean = null;
  @Input() private stencilWrite:boolean = null;
  @Input() private stencilFunc:string = null;
  @Input() private stencilRef:number = null;
  @Input() private stencilWriteMask:number = null;
  @Input() private stencilFuncMask:number = null;
  @Input() private stencilFail:string = null;
  @Input() private stencilZFail:string = null;
  @Input() private stencilZPass:string = null;
  @Input() private userData:any = null;
  @Input() private uniforms:{ [uniform: string]: ({ type : string, value : any } | THREE.IUniform) } = null;
  @Input() private vertexShader:string = null;
  @Input() private fragmentShader:string = null;
  @Input() private lights:boolean = null;
  @Input() private clipping:boolean = null;
  @Input() private transparent:boolean = null;
  @Input() private wireframe:boolean = null;
  @Input() private shading:string = null;
  @Input() private specular:number | string = null;
  @Input() private shininess:number = null;
  @Input() private lightMapIntensity:number = null;
  @Input() private aoMapIntensity:number = null;
  @Input() private emissive:string | number = null;
  @Input() private emissiveIntensity:number = null;
  @Input() private bumpScale:number = null;
  @Input() private normalMapType:string = null;
  @Input() private normalScaleX:number = null;
  @Input() private normalScaleY:number = null;
  @Input() private displacementScale:number = null;
  @Input() private displacementBias:number = null;
  @Input() private combine:string = null;
  @Input() private reflectivity:number = null;
  @Input() private refractionRatio:number = null;
  @Input() private wireframeLinewidth:number = null;
  @Input() private wireframeLinecap:string = null;
  @Input() private wireframeLinejoin:string = null;
  @Input() private skinning:boolean = null;
  @Input() private morphTargets:boolean = null;
  @Input() private morphNormals:boolean = null;
  @Input() private linewidth:number = null;
  @Input() private linecap:string = null;
  @Input() private linejoin:string = null;
  @Input() private scale:number = null;
  @Input() private dashSize:number = null;
  @Input() private gapSize:number = null;
  @Input() private depthPacking:string = null;
  @Input() private farDistance:number = null;
  @Input() private nearDistance:number = null;
  @Input() private referencePositionX:number = null;
  @Input() private referencePositionY:number = null;
  @Input() private referencePositionZ:number = null;
  @Input() private clearcoat:number = null;
  @Input() private clearcoatRoughness:number = null;
  @Input() private clearcoatNormalScaleX:number = null;
  @Input() private clearcoatNormalScaleY:number = null;
  @Input() private ior:number = null;
  @Input() private sheen:string = null;
  @Input() private transmission:number = null;
  @Input() private roughness:number = null;
  @Input() private metalness:number = null;
  @Input() private envMapIntensity:number = null;
  @Input() private vertexTangents:boolean = null;
  @Input() private rotation:number = null;
  @Input() private size:number = null;
  @Input() private sizeAttenuation:boolean = null;
  @Input() private envMap:TextureComponent = null;
  @Input() private map:TextureComponent = null;
  @Input() private specularMap:TextureComponent = null;
  @Input() private alphaMap:TextureComponent = null;
  @Input() private bumpMap:TextureComponent = null;
  @Input() private normalMap:TextureComponent = null;

  @Output() private onLoad:EventEmitter<MaterialComponent> = new EventEmitter<MaterialComponent>();

  meshPositions: THREE.Vector3[] = [];
  meshRotations: THREE.Euler[] = [];
  meshScales: THREE.Vector3[] = [];
  meshTranslations: THREE.BufferGeometry[] = [];
  meshMaterials: (THREE.Material | THREE.Material[])[] = [];

  @ContentChildren(TextureComponent) private textureList: QueryList<TextureComponent>;
  @ContentChildren(ShaderComponent) private shaderList: QueryList<ShaderComponent>;
  @ContentChildren(PlaneComponent) private clippingPlanesList: QueryList<PlaneComponent>;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterContentInit(): void {
    this.textureList.changes.subscribe((e) => {

    });
  }

  private _needUpdate : boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.material !== null) {
      this._needUpdate = true;
      this.getMaterial();
    }
  }

  private getColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
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

  private getSpecular(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.specular, def);
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

  private getEmissive(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.emissive, def);
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
    switch(depthPacking.toLowerCase()) {
      case 'rgba' :
          return THREE.RGBADepthPacking;
      case 'basic' :
      default :
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

  private getSheen(def?: THREE.Color): THREE.Color {
    return ThreeUtil.getColorSafe(this.sheen, def);
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
    return ThreeUtil.getTypeSafe(this.rotation, def);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getSizeAttenuation(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.sizeAttenuation, def);
  }

  getTexture(type: string): THREE.Texture {
    switch(type.toLowerCase()) {
      case 'envmap' :
        if (ThreeUtil.isNotNull(this.envMap)) {
          return this.envMap.getTexture();
        }
        break;
      case 'map' :
        if (ThreeUtil.isNotNull(this.map)) {
          return this.map.getTexture();
        }
        break;
      case 'specularmap' :
        if (ThreeUtil.isNotNull(this.specularMap)) {
          return this.specularMap.getTexture();
        }
        break;
      case 'alphamap' :
        if (ThreeUtil.isNotNull(this.alphaMap)) {
          return this.alphaMap.getTexture();
        }
        break;
      case 'bumpmap' :
        if (ThreeUtil.isNotNull(this.bumpMap)) {
          return this.bumpMap.getTexture();
        }
        break;
      case 'normalmap' :
        if (ThreeUtil.isNotNull(this.normalMap)) {
          return this.normalMap.getTexture();
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
      case 'adde':
        return THREE.AddEquation;
      case 'subtracte':
        return THREE.SubtractEquation;
      case 'reversesubtracte':
        return THREE.ReverseSubtractEquation;
      case 'mine':
        return THREE.MinEquation;
      case 'maxe':
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
      case 'no':
        return THREE.NoBlending;
      case 'normal':
        return THREE.NormalBlending;
      case 'additive':
        return THREE.AdditiveBlending;
      case 'subtractive':
        return THREE.SubtractiveBlending;
      case 'multiply':
        return THREE.MultiplyBlending;
      case 'custom':
        return THREE.CustomBlending;
    }
    return undefined;
  }

  private getBlendSrc(def?: string): THREE.BlendingSrcFactor | THREE.BlendingDstFactor {
    const blendSrc = ThreeUtil.getTypeSafe(this.blendSrc, def, '');
    switch (blendSrc.toLowerCase()) {
      case 'srcalphasaturate':
        return THREE.SrcAlphaSaturateFactor;
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
    return null;
  }

  private getBlendSrcAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.blendSrcAlpha, def);
  }

  private getClipIntersection(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clipIntersection, def);
  }

  private getClippingPlanes(def?: THREE.Plane[]): THREE.Plane[] {
    if (this.clippingPlanes !== null && this.clippingPlanes !== undefined) {
      const clippingPlanes : THREE.Plane[] = [];
      this.clippingPlanes.forEach(plane => {
        if (plane instanceof PlaneComponent) {
          clippingPlanes.push(plane.getWorldPlane());
        } else {
          clippingPlanes.push(plane);
        }
      });
      return clippingPlanes;
    } else if (this.clippingPlanesList !== null && this.clippingPlanesList !== undefined) {
      const clippingPlanes : THREE.Plane[] = [];
      this.clippingPlanesList.forEach(plane => {
        clippingPlanes.push(plane.getWorldPlane());
      });
      return clippingPlanes;
    } else {
      return def;
    }
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
      if (ThreeUtil.isNotNull(value['type']) && ThreeUtil.isNotNull(value['value'])) {
        switch(value['type'].toLowerCase()) {
          case 'color' :
            uniforms[key] = { value: new THREE.Color( value['value'] ) }
            break;
          case 'texture' :
            uniforms[key] = { value: TextureComponent.getTextureImage( value['value'] ) }
            break;
        }
      }
    })
    return uniforms;
  }

  private getLights(def?: any): any {
    return ThreeUtil.getTypeSafe(this.lights, def);
  }

  private getClipping(def?: any): any {
    return ThreeUtil.getTypeSafe(this.clipping, def);
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
    const materialParameters: THREE.MaterialParameters = Object.assign({
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
    }, extendObj);
    const materialParametersSafe: THREE.MaterialParameters = {}
    Object.entries(materialParameters).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value)) {
        materialParametersSafe[key] = value;
      }
    });
    return materialParametersSafe;
  }

  private material: THREE.Material = null;

  setMaterialParams(params : { [key : string] : any } ) {
    Object.entries(params).forEach(([key, value]) => {
      if (this[key] !== undefined) {
        this[key] = value;
      }
    });
  }

  private _materialSubject:Subject<THREE.Material> = new Subject<THREE.Material>();

  materialSubscribe() : Observable<THREE.Material>{
    return this._materialSubject.asObservable();
  }

  setTexture(texture : TextureComponent) {
    if (this.material !== null) {
      const materialClone = texture.getTexture();
      switch(texture.textureType.toLowerCase()) {
        case 'map' :
          this.material['map'] = materialClone;
          break;
        case 'envmap' :
          this.material['envMap'] = materialClone;
          break;  
      }
    }
  }

  getMaterial(): THREE.Material {
    if (this.material === null || this._needUpdate) {
      this._needUpdate = false;
      this.material = null;
      if (ThreeUtil.isNotNull(this.storageName)) {
        this.material = new THREE.MeshLambertMaterial(this.getMaterialParameters({}));
        this.localStorageService.getMaterial(this.storageName, (material : THREE.Material) => {
          this.material = material;
          if (this.getVisible(true)) {
            this._materialSubject.next(this.material);
          }
          this.onLoad.emit(this);
        })
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
          case 'linebasic':
            const parametersLineBasicMaterial: THREE.LineBasicMaterialParameters = {
              color: this.getColor(),
              linewidth: this.getLinewidth(),
              linecap: this.getLinecap(),
              linejoin: this.getLinejoin(),
              morphTargets: this.getMorphTargets()
            }
            this.material = new THREE.LineBasicMaterial(this.getMaterialParameters(parametersLineBasicMaterial));
            break;
          case 'linedashed':
            const parametersLineDashedMaterial: THREE.LineDashedMaterialParameters = {
              color: this.getColor(),
              vertexColors: this.getVertexColors(),
              dashSize: this.getDashSize(),
              gapSize: this.getGapSize(),
              scale: this.getScale()
            }
            this.material = new THREE.LineDashedMaterial(this.getMaterialParameters(parametersLineDashedMaterial));
            break;
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
            }
            this.material = new THREE.MeshBasicMaterial(this.getMaterialParameters(parametersMeshBasicMaterial))
            break;
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
            }
            this.material = new THREE.MeshDepthMaterial(this.getMaterialParameters(parametersMeshDepthMaterial));
            break;
          case 'meshdistance':
            const parametersMeshDistanceMaterial: THREE.MeshDistanceMaterialParameters = {
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              displacementMap: this.getTexture('displacementMap'),
              displacementScale: this.getDisplacementScale(),
              displacementBias: this.getDisplacementBias(),
              farDistance: this.getFarDistance(),
              nearDistance: this.getNearDistance(),
              referencePosition: this.getReferencePosition()
            }
            this.material = new THREE.MeshDistanceMaterial(this.getMaterialParameters(parametersMeshDistanceMaterial));
            break;
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
              morphNormals: this.getMorphNormals()
            }
            this.material = new THREE.MeshMatcapMaterial(this.getMaterialParameters(parametersMeshMatcapMaterial));
            break;
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
              morphNormals: this.getMorphNormals()
            }
            this.material = new THREE.MeshNormalMaterial(this.getMaterialParameters(parametersMeshNormalMaterial));
            break;
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
              normalMapType: this.getNormalMapType('tangentspace'),
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
              wireframeLinejoin: this.getWireframeLinejoin()
            }
            this.material = new THREE.MeshPhongMaterial(this.getMaterialParameters(parametersMeshPhongMaterial));
            break;
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
            }
            this.material = new THREE.MeshPhysicalMaterial(this.getMaterialParameters(parametersMeshPhysicalMaterial));
            break;
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
              morphNormals: this.getMorphNormals()
            }
            this.material = new THREE.MeshStandardMaterial(this.getMaterialParameters(parametersMeshStandardMaterial));
            break;
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
              morphNormals: this.getMorphNormals()
            }
            this.material = new THREE.MeshToonMaterial(this.getMaterialParameters(parametersMeshToonMaterial));
            break;
          case 'points':
            const parametersPointsMaterial: THREE.PointsMaterialParameters = {
              color: this.getColor(),
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              size: this.getSize(),
              sizeAttenuation: this.getSizeAttenuation(),
              morphTargets: this.getMorphTargets(),
            }
            this.material = new THREE.PointsMaterial(this.getMaterialParameters(parametersPointsMaterial));
            break;
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
              morphNormals: this.getMorphNormals()
            }
            this.material = new THREE.RawShaderMaterial(this.getMaterialParameters(parametersRawShaderMaterial));
            break;
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
              morphNormals: this.getMorphNormals()
            }
            this.material = new THREE.ShaderMaterial(this.getMaterialParameters(parametersShaderMaterial));
            break;
          case 'shadow':
            this.material = new THREE.ShadowMaterial(this.getMaterialParameters({
              color: this.getColor()
            }));
            break;
          case 'sprite':
            const parametersSpriteMaterial: THREE.SpriteMaterialParameters = {
              color: this.getColor(),
              map: this.getTexture('map'),
              alphaMap: this.getTexture('alphaMap'),
              rotation: this.getRotation(),
              sizeAttenuation: this.getSizeAttenuation()
            }
            this.material = new THREE.SpriteMaterial(this.getMaterialParameters(parametersSpriteMaterial));
            break;
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
              morphNormals: this.getMorphNormals()
            }
            this.material = new THREE.MeshLambertMaterial(this.getMaterialParameters(parametersMeshLambertMaterial));
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
}
