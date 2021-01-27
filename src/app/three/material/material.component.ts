import { Component, ContentChildren, Input, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Vector2 } from 'three';
import { AbstractSvgGeometry, ThreeUtil } from '../interface';
import { ShaderComponent } from '../shader/shader.component';
import { TextureComponent } from '../texture/texture.component';

@Component({
  selector: 'three-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit, OnChanges {

  @Input() type: string = "lambert";
  @Input() color: string | number = null;
  @Input() opacity: number = null;
  @Input() alphaTest: number = null;
  @Input() blendDst: string = null;
  @Input() blendDstAlpha: number = null;
  @Input() blendEquation: string = null;
  @Input() blendEquationAlpha: number = null;
  @Input() blending: string = null;
  @Input() blendSrc: string = null;
  @Input() blendSrcAlpha: number = null;
  @Input() clipIntersection: boolean = null;
  @Input() clippingPlanes: string[] = null;
  @Input() clipShadows: boolean = null;
  @Input() colorWrite: boolean = null;
  @Input() defines: any = null;
  @Input() depthFunc: string = null;
  @Input() depthTest: boolean = null;
  @Input() depthWrite: boolean = null;
  @Input() fog: boolean = null;
  @Input() name: string = null;
  @Input() polygonOffset: boolean = null;
  @Input() polygonOffsetFactor: number = null;
  @Input() polygonOffsetUnits: number = null;
  @Input() precision: string = null;
  @Input() premultipliedAlpha: boolean = null;
  @Input() dithering: boolean = null;
  @Input() flatShading: boolean = null;
  @Input() side: string = null;
  @Input() shadowSide: string = null;
  @Input() toneMapped: boolean = null;
  @Input() vertexColors: boolean = null;
  @Input() visible: boolean = null;
  @Input() stencilWrite: boolean = null;
  @Input() stencilFunc: string = null;
  @Input() stencilRef: number = null;
  @Input() stencilWriteMask: number = null;
  @Input() stencilFuncMask: number = null;
  @Input() stencilFail: string = null;
  @Input() stencilZFail: string = null;
  @Input() stencilZPass: string = null;
  @Input() userData: any = null;
  @Input() uniforms: { [uniform: string]: THREE.IUniform } = null;
  @Input() lights: boolean = null;
  @Input() clipping: boolean = null;
  @Input() transparent: boolean = false;
  @Input() wireframe: boolean = false;
  @Input() shading: string = null;
  @Input() specular: number | string = null;
  @Input() shininess: number = null;
  @Input() lightMapIntensity: number = null;
  @Input() aoMapIntensity: number = null;
  @Input() emissive: string | number = null;
  @Input() emissiveIntensity: number = null;
  @Input() bumpScale: number = null;
  @Input() normalMapType: string = null;
  @Input() normalScaleX: number = null;
  @Input() normalScaleY: number = null;
  @Input() displacementScale: number = null;
  @Input() displacementBias: number = null;
  @Input() combine: string = null;
  @Input() reflectivity: number = null;
  @Input() refractionRatio: number = null;
  @Input() wireframeLinewidth: number = null;
  @Input() wireframeLinecap: string = null;
  @Input() wireframeLinejoin: string = null;
  @Input() skinning: boolean = null;
  @Input() morphTargets: boolean = null;
  @Input() morphNormals: boolean = null;
  @Input() linewidth: number = null;
  @Input() linecap: string = null;
  @Input() linejoin: string = null;
  @Input() scale: number = null;
  @Input() dashSize: number = null;
  @Input() gapSize: number = null;
  @Input() depthPacking: string = null;
  @Input() farDistance: number = null;
  @Input() nearDistance: number = null;
  @Input() referencePositionX: number = null;
  @Input() referencePositionY: number = null;
  @Input() referencePositionZ: number = null;
  @Input() clearcoat: number = null;
  @Input() clearcoatRoughness: number = null;
  @Input() clearcoatNormalScaleX: number = null;
  @Input() clearcoatNormalScaleY: number = null;
  @Input() ior: number = null;
  @Input() sheen: string = null;
  @Input() transmission: number = null;
  @Input() roughness: number = null;
  @Input() metalness: number = null;
  @Input() envMapIntensity: number = null;
  @Input() vertexTangents: boolean = null;
  @Input() rotation: number = null;
  @Input() size: number = null;
  @Input() sizeAttenuation: boolean = null;

  @ContentChildren(TextureComponent) textures: QueryList<TextureComponent>;
  @ContentChildren(ShaderComponent) shaders: QueryList<ShaderComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (this.refObject3d !== null) {

      if (this.refObject3d instanceof THREE.Scene) {
        const material = this.getMaterial();
        if (material === this.refObject3d.overrideMaterial) {
          this.refObject3d.overrideMaterial = null;
        }
      }
    }
  }

  ngAfterContentInit(): void {
    this.textures.changes.subscribe((e) => {

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.material = null;
    }
    this.resetMaterial();
  }

  getColor(def?: string | number): string | number {
    return this.getConvColor(this.color, def);
  }

  private getConvColor(paramColor: string | number, def?: string | number): string | number {
    const color = paramColor === null ? def : paramColor;
    if (typeof (color) === 'string') {
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return color;
      }
    } else {
      return color;
    }
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

  getShading(def?: string): THREE.Shading {
    const shading = ThreeUtil.getTypeSafe(this.shading, def, '');
    switch (shading.toLowerCase()) {
      case 'smooth':
        return THREE.SmoothShading;
      case 'flat':
        return THREE.FlatShading;
    }
    return undefined;
  }

  private getSpecular(def?: number | string): number | string {
    return this.getConvColor(this.specular, def);
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

  private getEmissive(def?: string | number): string | number {
    return this.getConvColor(this.emissive, def);
  }

  private getEmissiveIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.emissiveIntensity, def);
  }

  private getBumpScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bumpScale, def);
  }

  private getNormalMapType(def?: string): THREE.NormalMapTypes {
    const normalMapType = ThreeUtil.getTypeSafe(this.normalMapType, def,'');
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

  private getDepthPacking(def?: string): string {
    return ThreeUtil.getTypeSafe(this.depthPacking, def);
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
    if (this.textures !== null && this.textures.length > 0) {
      type = type.toLowerCase();
      const foundTexture = this.textures.find((texture) => {
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

  private getClippingPlanes(def?: string[]): THREE.Plane[] {
    const clippingPlanes = ThreeUtil.getTypeSafe(this.clippingPlanes, def);
    return undefined; // todo
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
    const depthFunc =  ThreeUtil.getTypeSafe(this.depthFunc, def, '');
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
    const stencilFunc = ThreeUtil.getTypeSafe(this.stencilFunc, def,'');
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
    return ThreeUtil.getTypeSafe(this.uniforms, def);
  }

  private getLights(def?: any): any {
    return ThreeUtil.getTypeSafe(this.lights, def);
  }

  private getClipping(def?: any): any {
    return ThreeUtil.getTypeSafe(this.clipping, def);
  }

  private getShader(type: string) {
    if (this.shaders != null && this.shaders.length > 0) {
      const foundShader = this.shaders.find((shader) => {
        return shader.type.toLowerCase() === type;
      });
      if (foundShader !== null && foundShader !== undefined) {
        return foundShader.getShader();
      }
    }
    return undefined;
  }

  private getMaterialParameters(extendObj: any): THREE.MaterialParameters {
    const materialParameters : THREE.MaterialParameters = Object.assign({
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
    }, extendObj);
    const materialParametersSafe : THREE.MaterialParameters = {}
    Object.entries(materialParameters).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(value)) {
        materialParametersSafe[key] = value;
      }
    });
    return materialParametersSafe
  }

  private material: THREE.Material = null;
  private refObject3d: THREE.Object3D | AbstractSvgGeometry = null;
  private refSeqn: number = 0;

  setObject3D(refObject3d: THREE.Object3D | AbstractSvgGeometry, refSeqn: number = 0) {
    this.refSeqn = refSeqn;
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetMaterial();
    }
  }

  resetMaterial() {
    if (this.refObject3d !== null) {
      const material = this.getMaterial();
      if (this.refObject3d instanceof THREE.Scene) {
        this.refObject3d.overrideMaterial = material;
        this.refObject3d.overrideMaterial.needsUpdate = true;
      } else if (this.refObject3d instanceof THREE.Mesh) {
        if (this.refObject3d.material instanceof Array) {
          if (this.refObject3d.material.length > this.refSeqn) {
            this.refObject3d.material[this.refSeqn].copy(material)
            this.refObject3d.material[this.refSeqn].needsUpdate = true;
          }
        } else if (this.refObject3d.material != material) {
          this.refObject3d.material.copy(material);
          this.refObject3d.material.needsUpdate = true;
        }
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        if (this.refObject3d.meshMaterials.length > this.refSeqn) {
          const refMaterials = this.refObject3d.meshMaterials[this.refSeqn];
          if (refMaterials instanceof Array) {

          } else {
            refMaterials.copy(material)
            refMaterials.needsUpdate = true;
          }
        }
      }
    }
  }

  getMaterial(): THREE.Material {
    if (this.material === null) {
      switch (this.type.toLowerCase()) {
        case 'linebasic':
          const parametersLineBasicMaterial: THREE.LineBasicMaterialParameters = {
            opacity: this.getOpacity(),
            linewidth: this.getLinewidth(),
            vertexColors: this.getVertexColors()
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
            aoMapIntensity: this.getAoMapIntensity(),
            refractionRatio: this.getRefractionRatio(),
            wireframe: this.getWireframe(),
            wireframeLinewidth: this.getWireframeLinewidth(),
            skinning: this.getSkinning(),
            morphTargets: this.getMorphTargets(),
            reflectivity: this.getReflectivity(),
            opacity: this.getOpacity(),
            combine: this.getCombine(),
            wireframeLinecap: this.getWireframeLinecap(),
            wireframeLinejoin: this.getWireframeLinejoin(),
          }
          this.material = new THREE.MeshBasicMaterial(this.getMaterialParameters(parametersMeshBasicMaterial))
          break;
        case 'meshdepth':
          const parametersMeshDepthMaterial: THREE.MeshDepthMaterialParameters = {
            map: this.getTexture('map'),
            alphaMap: this.getTexture('alphaMap'),
            // depthPacking: getDepthPackingStrategies(), todo
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
            refractionRatio: this.getRefractionRatio(0.98),
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
    return this.material;
  }
}
