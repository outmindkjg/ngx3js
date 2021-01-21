import { Component, ContentChildren, Input, OnChanges, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
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

  ngAfterContentInit(): void {
    this.textures.changes.subscribe((e) => {

    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.material = null;
    }
    if (this.refMaterial != null) {
      this.refMaterial.copy(this.getMaterial());
    }
  }

  getColor(def: string | number): string | number {
    return this.getConvColor(this.color, def);
  }

  private getConvColor(paramColor: string | number, def: string | number): string | number {
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

  private getOpacity(def: number): number {
    return this.opacity === null ? def : this.opacity;
  }

  private getTransparent(def: boolean): boolean {
    return this.transparent === null ? def : this.transparent;
  }

  private getWireframe(def: boolean): boolean {
    return this.wireframe === null ? def : this.wireframe;
  }

  getShading(def: string): THREE.Shading {
    const shading = (this.shading === null) ? def : this.shading;
    switch (shading.toLowerCase()) {
      case 'smooth':
        return THREE.SmoothShading;
      case 'flat':
      default:
        return THREE.FlatShading;
    }
  }

  private getSpecular(def: number | string): number | string {
    return this.getConvColor(this.specular, def);
  }

  private getShininess(def: number): number {
    return this.shininess === null ? def : this.shininess;
  }

  private getLightMapIntensity(def: number): number {
    return this.lightMapIntensity === null ? def : this.lightMapIntensity;
  }

  private getAoMapIntensity(def: number): number {
    return this.aoMapIntensity === null ? def : this.aoMapIntensity;
  }

  private getEmissive(def: string | number): string | number {
    return this.getConvColor(this.emissive, def);
  }

  private getEmissiveIntensity(def: number): number {
    return this.emissiveIntensity === null ? def : this.emissiveIntensity;
  }

  private getBumpScale(def: number): number {
    return this.bumpScale === null ? def : this.bumpScale;
  }

  private getNormalMapType(def: string): THREE.NormalMapTypes {
    const normalMapType = this.normalMapType === null ? def : this.normalMapType;
    switch (normalMapType.toLowerCase()) {
      case 'tangentspace':
        return THREE.TangentSpaceNormalMap;
      case 'objectspace':
        return THREE.ObjectSpaceNormalMap;
    }
    return null;
  }

  private getNormalScale(defX: number, defY: number): THREE.Vector2 {
    const x = this.normalScaleX === null ? defX : this.normalScaleX;
    const y = this.normalScaleY === null ? defY : this.normalScaleY;
    return new THREE.Vector2(x, y);
  }

  private getDisplacementScale(def: number): number {
    return this.displacementScale === null ? def : this.displacementScale;
  }

  private getDisplacementBias(def: number): number {
    return this.displacementBias === null ? def : this.displacementBias;
  }

  private getCombine(def: string): THREE.Combine {
    const combine = this.combine === null ? def : this.combine;
    switch (combine.toLowerCase()) {
      case 'multiply':
        return THREE.MultiplyOperation;
      case 'mix':
        return THREE.MixOperation;
      case 'add':
        return THREE.AddOperation;
    }
    return null;
  }

  private getReflectivity(def: number): number {
    return this.reflectivity === null ? def : this.reflectivity;
  }

  private getRefractionRatio(def: number): number {
    return this.refractionRatio === null ? def : this.refractionRatio;
  }

  private getWireframeLinewidth(def: number): number {
    return this.wireframeLinewidth === null ? def : this.wireframeLinewidth;
  }

  private getWireframeLinecap(def: string): string {
    return this.wireframeLinecap === null ? def : this.wireframeLinecap;
  }

  private getWireframeLinejoin(def: string): string {
    return this.wireframeLinejoin === null ? def : this.wireframeLinejoin;
  }

  private getSkinning(def: boolean): boolean {
    return this.skinning === null ? def : this.skinning;
  }

  private getMorphTargets(def: boolean): boolean {
    return this.morphTargets === null ? def : this.morphTargets;
  }

  private getMorphNormals(def: boolean): boolean {
    return this.morphNormals === null ? def : this.morphNormals;
  }

  private getLinewidth(def: number): number {
    return this.linewidth === null ? def : this.linewidth;
  }

  private getLinecap(def: string): string {
    const linecap = this.linecap === null ? def : this.linecap;
    return linecap;
  }

  private getLinejoin(def: string): string {
    const linejoin = this.linejoin === null ? def : this.linejoin;
    return linejoin;
  }

  private getScale(def: number): number {
    return this.scale === null ? def : this.scale;
  }

  private getDashSize(def: number): number {
    return this.dashSize === null ? def : this.dashSize;
  }

  private getGapSize(def: number): number {
    return this.gapSize === null ? def : this.gapSize;
  }

  private getDepthPacking(def: string): string {
    return this.depthPacking === null ? def : this.depthPacking;
  }

  private getFarDistance(def: number): number {
    return this.farDistance === null ? def : this.farDistance;
  }

  private getNearDistance(def: number): number {
    return this.nearDistance === null ? def : this.nearDistance;
  }

  private getReferencePosition(def: number): number {
    const referencePositionX = this.referencePositionX === null ? def : this.referencePositionX;
    return referencePositionX;
  }

  private getClearcoat(def: number): number {
    return this.clearcoat === null ? def : this.clearcoat;
  }

  private getClearcoatRoughness(def: number): number {
    return this.clearcoatRoughness === null ? def : this.clearcoatRoughness;
  }

  private getClearcoatNormalScale(defX: number, defY: number): THREE.Vector2 {
    const x = this.clearcoatNormalScaleX === null ? defX : this.clearcoatNormalScaleX;
    const y = this.clearcoatNormalScaleY === null ? defY : this.clearcoatNormalScaleY;
    return new THREE.Vector2(x, y);
  }

  private getIor(def: number): number {
    return this.ior === null ? def : this.ior;
  }

  private getSheen(def: string): THREE.Color {
    const sheen = this.sheen === null ? def : this.sheen;
    if (sheen !== null) {
      return new THREE.Color(this.getConvColor(this.sheen, def));
    }
    return null;
  }

  private getTransmission(def: number): number {
    return this.transmission === null ? def : this.transmission;
  }

  private getRoughness(def: number): number {
    return this.roughness === null ? def : this.roughness;
  }

  private getMetalness(def: number): number {
    return this.metalness === null ? def : this.metalness;
  }

  private getEnvMapIntensity(def: number): number {
    return this.envMapIntensity === null ? def : this.envMapIntensity;
  }

  private getVertexTangents(def: boolean): boolean {
    return this.vertexTangents === null ? def : this.vertexTangents;
  }

  private getRotation(def: number): number {
    return this.rotation === null ? def : this.rotation;
  }

  private getSize(def: number): number {
    return this.size === null ? def : this.size;
  }

  private getSizeAttenuation(def: boolean): boolean {
    return this.sizeAttenuation === null ? def : this.sizeAttenuation;
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
    return null;
  }


  private getAlphaTest(def: number): number {
    const alphaTest = this.alphaTest === null ? def : this.alphaTest;
    return alphaTest;
  }

  private getBlendDst(def: string): THREE.BlendingDstFactor {
    const blendDst = this.blendDst === null ? def : this.blendDst;
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
    return null;
  }

  private getBlendDstAlpha(def: number): number {
    return this.blendDstAlpha === null ? def : this.blendDstAlpha;
  }

  private getBlendEquation(def: string): THREE.BlendingEquation {
    const blendEquation = this.blendEquation === null ? def : this.blendEquation;
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
    return null;
  }

  private getBlendEquationAlpha(def: number): number {
    const blendEquationAlpha = this.blendEquationAlpha === null ? def : this.blendEquationAlpha;
    return blendEquationAlpha;
  }

  private getBlending(def: string): THREE.Blending {
    const blending = this.blending === null ? def : this.blending;
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
    return null;
  }

  private getBlendSrc(def: string): THREE.BlendingSrcFactor | THREE.BlendingDstFactor {
    const blendSrc = this.blendSrc === null ? def : this.blendSrc;
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

  private getBlendSrcAlpha(def: number): number {
    const blendSrcAlpha = this.blendSrcAlpha === null ? def : this.blendSrcAlpha;
    return blendSrcAlpha;
  }

  private getClipIntersection(def: boolean): boolean {
    const clipIntersection = this.clipIntersection === null ? def : this.clipIntersection;
    return clipIntersection;
  }

  private getClippingPlanes(def: string[]): THREE.Plane[] {
    const clippingPlanes = this.clippingPlanes === null ? def : this.clippingPlanes;
    return []; // todo
  }

  private getClipShadows(def: boolean): boolean {
    const clipShadows = this.clipShadows === null ? def : this.clipShadows;
    return clipShadows;
  }

  private getColorWrite(def: boolean): boolean {
    const colorWrite = this.colorWrite === null ? def : this.colorWrite;
    return colorWrite;
  }

  private getDefines(def: any): any {
    const defines = this.defines === null ? def : this.defines;
    return defines;
  }

  private getDepthFunc(def: string): THREE.DepthModes {
    const depthFunc = this.depthFunc === null ? def : this.depthFunc;
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
    return null;
  }

  private getDepthTest(def: boolean): boolean {
    const depthTest = this.depthTest === null ? def : this.depthTest;
    return depthTest;
  }

  private getDepthWrite(def: boolean): boolean {
    const depthWrite = this.depthWrite === null ? def : this.depthWrite;
    return depthWrite;
  }

  private getFog(def: boolean): boolean {
    const fog = this.fog === null ? def : this.fog;
    return fog;
  }

  private getName(def: string): string {
    const name = this.name === null ? def : this.name;
    return name;
  }

  private getPolygonOffset(def: boolean): boolean {
    const polygonOffset = this.polygonOffset === null ? def : this.polygonOffset;
    return polygonOffset;
  }

  private getPolygonOffsetFactor(def: number): number {
    const polygonOffsetFactor = this.polygonOffsetFactor === null ? def : this.polygonOffsetFactor;
    return polygonOffsetFactor;
  }

  private getPolygonOffsetUnits(def: number): number {
    const polygonOffsetUnits = this.polygonOffsetUnits === null ? def : this.polygonOffsetUnits;
    return polygonOffsetUnits;
  }

  private getPrecision(def: string): 'highp' | 'mediump' | 'lowp' | null {
    const precision = this.precision === null ? def : this.precision;
    switch (precision.toLowerCase()) {
      case 'highp':
        return 'highp';
      case 'mediump':
        return 'mediump';
      case 'lowp':
        return 'lowp';
      default:
        return null;
    }
  }

  private getPremultipliedAlpha(def: boolean): boolean {
    const premultipliedAlpha = this.premultipliedAlpha === null ? def : this.premultipliedAlpha;
    return premultipliedAlpha;
  }

  private getDithering(def: boolean): boolean {
    const dithering = this.dithering === null ? def : this.dithering;
    return dithering;
  }

  private getFlatShading(def: boolean): boolean {
    const flatShading = this.flatShading === null ? def : this.flatShading;
    return flatShading;
  }

  private getSide(def: string): THREE.Side {
    const side = this.side === null ? def : this.side;
    switch (side.toLowerCase()) {
      case 'back':
        return THREE.BackSide;
      case 'double':
        return THREE.DoubleSide;
      case 'front':
      default:
        return THREE.FrontSide;
    }
  }

  private getShadowSide(def: string): THREE.Side {
    const shadowSide = this.shadowSide === null ? def : this.shadowSide;
    switch (shadowSide.toLowerCase()) {
      case 'back':
        return THREE.BackSide;
      case 'double':
        return THREE.DoubleSide;
      case 'front':
        return THREE.FrontSide;
      default:
        return null;
    }
  }

  private getToneMapped(def: boolean): boolean {
    const toneMapped = this.toneMapped === null ? def : this.toneMapped;
    return toneMapped;
  }

  private getVertexColors(def: boolean): boolean {
    const vertexColors = this.vertexColors === null ? def : this.vertexColors;
    return vertexColors;
  }

  private getVisible(def: boolean): boolean {
    const visible = this.visible === null ? def : this.visible;
    return visible;
  }

  private getStencilWrite(def: boolean): boolean {
    const stencilWrite = this.stencilWrite === null ? def : this.stencilWrite;
    return stencilWrite;
  }

  private getStencilFunc(def: string): THREE.StencilFunc {
    const stencilFunc = this.stencilFunc === null ? def : this.stencilFunc;
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
    return null;
  }

  private getStencilRef(def: number): number {
    const stencilRef = this.stencilRef === null ? def : this.stencilRef;
    return stencilRef;
  }

  private getStencilWriteMask(def: number): number {
    const stencilWriteMask = this.stencilWriteMask === null ? def : this.stencilWriteMask;
    return stencilWriteMask;
  }

  private getStencilFuncMask(def: number): number {
    const stencilFuncMask = this.stencilFuncMask === null ? def : this.stencilFuncMask;
    return stencilFuncMask;
  }

  private getStencilFail(def: string): THREE.StencilOp {
    const stencilFail = this.stencilFail === null ? def : this.stencilFail;
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
    return null;
  }

  private getStencilZFail(def: string): THREE.StencilOp {
    const stencilZFail = this.stencilZFail === null ? def : this.stencilZFail;
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
    return null;
  }

  private getStencilZPass(def: string): THREE.StencilOp {
    const stencilZPass = this.stencilZPass === null ? def : this.stencilZPass;
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
    return null;
  }

  private getUserData(def: any): any {
    const userData = this.userData === null ? def : this.userData;
    return userData;
  }

  private getUniforms(def : any) : { [uniform: string]: THREE.IUniform } {
    return this.uniforms === null ? def : this.uniforms;
  }

  private getLights(def: any): any {
    return this.lights === null ? def : this.lights;
  }

  private getClipping(def: any): any {
    return this.clipping === null ? def : this.clipping;
  }

  private getShader(type : string) {
    if (this.shaders != null && this.shaders.length > 0) {
      const foundShader = this.shaders.find((shader) => {
        return shader.type.toLowerCase() === type;
      });
      if (foundShader !== null && foundShader !== undefined) {
        return foundShader.getShader();
      }
    }
    return null;
  }

  private getMaterialParameters(extendObj: any): THREE.MaterialParameters {
    return Object.assign({
      name: this.getName(''),
      opacity: this.getOpacity(1),
      transparent: this.getTransparent(false),
      side: this.getSide('front'),
      blending: this.getBlending('normal'),
      vertexColors: this.getVertexColors(false),
      // alphaTest: this.getAlphaTest(1),
      depthTest: this.getDepthTest(true),
      depthWrite: this.getDepthWrite(false),
      visible: this.getVisible(true)
    },extendObj);
    return Object.assign({
      blendDst: this.getBlendDst('oneminussrcalpha'),
      blendDstAlpha: this.getBlendDstAlpha(null),
      blendEquation: this.getBlendEquation('add'),
      blendEquationAlpha: this.getBlendEquationAlpha(null),
      blendSrc: this.getBlendSrc('srcalpha'),
      blendSrcAlpha: this.getBlendSrcAlpha(null),
      clipIntersection: this.getClipIntersection(false),
      clippingPlanes: this.getClippingPlanes([]),
      clipShadows: this.getClipShadows(false),
      colorWrite: this.getColorWrite(true),
      // defines: this.getDefines(null),
      depthFunc: this.getDepthFunc('lessequal'),
      depthTest: this.getDepthTest(true),
      depthWrite: this.getDepthWrite(true),
      fog: this.getFog(true),
      opacity: this.getOpacity(1),
      polygonOffset: this.getPolygonOffset(false),
      polygonOffsetFactor: this.getPolygonOffsetFactor(0),
      polygonOffsetUnits: this.getPolygonOffsetUnits(0),
      precision: this.getPrecision('none'),
      premultipliedAlpha: this.getPremultipliedAlpha(false),
      dithering: this.getDithering(false),
      flatShading: this.getFlatShading(false),
      shadowSide: this.getShadowSide('none'),
      toneMapped: this.getToneMapped(true),
      transparent: this.getTransparent(false),
      stencilWrite: this.getStencilWrite(false),
      stencilFunc: this.getStencilFunc('always'),
      stencilRef: this.getStencilRef(0),
      stencilWriteMask: this.getStencilWriteMask(0xff),
      stencilFuncMask: this.getStencilFuncMask(0xff),
      stencilFail: this.getStencilFail('keep'),
      stencilZFail: this.getStencilZFail('keep'),
      stencilZPass: this.getStencilZPass('keep'),
      userData: this.getUserData(1),
    }, extendObj);
  }

  private material: THREE.Material = null;
  private refMaterial: THREE.Material = null;
  setMaterial(refMaterial: THREE.Material) {
    this.refMaterial = refMaterial;
  }

  getMaterial(): THREE.Material {
    if (this.material === null) {
      switch (this.type.toLowerCase()) {
        case 'linebasic':
          this.material = new THREE.LineBasicMaterial({
            opacity: 1.0,
            linewidth: 1,
            vertexColors : true
          })
          break;
        case 'linedashed':
          this.material = new THREE.LineDashedMaterial({
            color: this.getColor(0xffffff),
            vertexColors: true,
            dashSize: 2,
            gapSize: 2,
            scale: 0.1
          })
          break;
        case 'meshbasic':
          const parametersMeshBasicMaterial: THREE.MeshBasicMaterialParameters = {
            color: this.getColor(0xffffff),
            aoMapIntensity: this.getAoMapIntensity(1),
            refractionRatio: this.getRefractionRatio(1),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            skinning: this.getSkinning(false),
            morphTargets: this.getMorphTargets(false),
            reflectivity: this.getReflectivity(0.5),
            opacity: this.getOpacity(1),
            combine: this.getCombine('multiply'),
            wireframeLinecap: this.getWireframeLinecap('round'),
            wireframeLinejoin: this.getWireframeLinejoin('round'),
          }
          this.material = new THREE.MeshBasicMaterial(this.getMaterialParameters(parametersMeshBasicMaterial))
          break;
        case 'meshdepth':
          const parametersMeshDepthMaterial: THREE.MeshDepthMaterialParameters = {
            map: this.getTexture('map'),
            alphaMap: this.getTexture('alphaMap'),
            // depthPacking: getDepthPackingStrategies(), todo
            displacementMap: this.getTexture('displacementMap'),
            displacementScale : this.getDisplacementScale(1),
            displacementBias : this.getDisplacementBias(0),
            wireframe : this.getWireframe(false),
            wireframeLinewidth : this.getWireframeLinewidth(1),
          }
          this.material = new THREE.MeshDepthMaterial(this.getMaterialParameters(parametersMeshDepthMaterial));
          break;
        case 'meshdistance':
          this.material = new THREE.MeshDistanceMaterial({

          });
          break;
        case 'meshmatcap':
          this.material = new THREE.MeshMatcapMaterial({

          });
          break;
        case 'meshnormal':
          const parametersMeshNormalMaterial: THREE.MeshNormalMaterialParameters = {
            bumpMap: this.getTexture('bumpMap'),
            // bumpScale: this.getBumpScale(1);
            normalMap: this.getTexture('normalMap'),
            normalMapType: this.getNormalMapType(''),
            normalScale: this.getNormalScale(1,1),
            displacementMap: this.getTexture('displacementMap'),
            displacementScale: this.getDisplacementScale(1),
            displacementBias: this.getDisplacementBias(0),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            skinning: this.getSkinning(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false)
          }
          this.material = new THREE.MeshNormalMaterial(this.getMaterialParameters(parametersMeshNormalMaterial));
          break;
        case 'meshphong':
          const parametersMeshPhongMaterial: THREE.MeshPhongMaterialParameters = {
            color: this.getColor(0xffffff),
            map: this.getTexture('map'),
            lightMap: this.getTexture('lightMap'),
            lightMapIntensity: this.getLightMapIntensity(1),
            aoMap: this.getTexture('aoMap'),
            aoMapIntensity: this.getAoMapIntensity(1),
            emissive: this.getEmissive(0x000000),
            emissiveIntensity: this.getEmissiveIntensity(1),
            emissiveMap: this.getTexture('emissiveMap'),
            bumpMap: this.getTexture('bumpMap'),
            bumpScale: this.getBumpScale(1),
            normalMap: this.getTexture('normalMap'),
            normalMapType: this.getNormalMapType('tangentspace'),
            normalScale: this.getNormalScale(1, 1),
            displacementMap: this.getTexture('displacementMap'),
            displacementScale: this.getDisplacementScale(1),
            displacementBias: this.getDisplacementBias(1),
            alphaMap: this.getTexture('alphaMap'),
            envMap: this.getTexture('envMap'),
            refractionRatio: this.getRefractionRatio(1),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            skinning: this.getSkinning(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false),
            reflectivity: this.getReflectivity(0.5),
            specular: this.getSpecular(0x111111),
            shininess: this.getShininess(30),
            opacity: this.getOpacity(1),
            specularMap: this.getTexture('clearcoatNormalMap'),
            combine: this.getCombine('multiply'),
            wireframeLinecap: this.getWireframeLinecap('round'),
            wireframeLinejoin: this.getWireframeLinejoin('round')
          }
          this.material = new THREE.MeshPhongMaterial(this.getMaterialParameters(parametersMeshPhongMaterial));
          break;
        case 'meshphysical':
          const parametersMeshPhysicalMaterial: THREE.MeshPhysicalMaterialParameters = {
            color: this.getColor(0xffffff),
            roughness: this.getRoughness(1),
            metalness: this.getMetalness(0),
            map: this.getTexture('map'),
            lightMap: this.getTexture('lightMap'),
            lightMapIntensity: this.getLightMapIntensity(1),
            aoMap: this.getTexture('aoMap'),
            aoMapIntensity: this.getAoMapIntensity(1),
            emissive: this.getEmissive(0x000000),
            emissiveIntensity: this.getEmissiveIntensity(1),
            emissiveMap: this.getTexture('emissiveMap'),
            bumpMap: this.getTexture('bumpMap'),
            bumpScale: this.getBumpScale(1),
            normalMap: this.getTexture('normalMap'),
            normalMapType: this.getNormalMapType('tangentspace'),
            normalScale: this.getNormalScale(1, 1),
            displacementMap: this.getTexture('displacementMap'),
            displacementScale: this.getDisplacementScale(1),
            displacementBias: this.getDisplacementBias(1),
            roughnessMap: this.getTexture('roughnessMap'),
            metalnessMap: this.getTexture('metalnessMap'),
            alphaMap: this.getTexture('alphaMap'),
            envMap: this.getTexture('envMap'),
            envMapIntensity: this.getEnvMapIntensity(1),
            refractionRatio: this.getRefractionRatio(1),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            skinning: this.getSkinning(false),
            vertexTangents: this.getVertexTangents(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false),
            clearcoat: this.getClearcoat(0),
            clearcoatMap: this.getTexture('clearcoatMap'),
            clearcoatRoughness: this.getClearcoatRoughness(0),
            clearcoatRoughnessMap: this.getTexture('clearcoatRoughnessMap'),
            clearcoatNormalScale: this.getClearcoatNormalScale(1, 1),
            clearcoatNormalMap: this.getTexture('clearcoatNormalMap'),
            reflectivity: this.getReflectivity(0.5),
            ior: this.getIor(1.5),
            sheen: this.getSheen(null),
            transmission: this.getTransmission(0),
            transmissionMap: this.getTexture('transmissionMap')
          }
          this.material = new THREE.MeshPhysicalMaterial(this.getMaterialParameters(parametersMeshPhysicalMaterial));
          break;
        case 'meshstandard':
          const parametersMeshStandardMaterial: THREE.MeshStandardMaterialParameters = {
            color: this.getColor(0xffffff),
            roughness: this.getRoughness(1),
            metalness: this.getMetalness(0),
            map: this.getTexture('map'),
            lightMap: this.getTexture('lightMap'),
            lightMapIntensity: this.getLightMapIntensity(1),
            aoMap: this.getTexture('aoMap'),
            aoMapIntensity: this.getAoMapIntensity(1),
            emissive: this.getEmissive(0x000000),
            emissiveIntensity: this.getEmissiveIntensity(1),
            emissiveMap: this.getTexture('emissiveMap'),
            bumpMap: this.getTexture('bumpMap'),
            bumpScale: this.getBumpScale(1),
            normalMap: this.getTexture('normalMap'),
            normalMapType: this.getNormalMapType('tangentspace'),
            normalScale: this.getNormalScale(1, 1),
            displacementMap: this.getTexture('displacementMap'),
            displacementScale: this.getDisplacementScale(1),
            displacementBias: this.getDisplacementBias(0),
            roughnessMap: this.getTexture('roughnessMap'),
            metalnessMap: this.getTexture('metalnessMap'),
            alphaMap: this.getTexture('alphaMap'),
            envMap: this.getTexture('envMap'),
            envMapIntensity: this.getEnvMapIntensity(1),
            refractionRatio: this.getRefractionRatio(0.98),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            skinning: this.getSkinning(false),
            vertexTangents: this.getVertexTangents(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false)
          }
          this.material = new THREE.MeshStandardMaterial(this.getMaterialParameters(parametersMeshStandardMaterial));
          break;
        case 'meshtoon':
          const parametersMeshToonMaterial: THREE.MeshToonMaterialParameters = {
            color: this.getColor(0xffffff),
            opacity: this.getOpacity(1),
            gradientMap: this.getTexture('gradientMap'),
            map: this.getTexture('map'),
            lightMap: this.getTexture('lightMap'),
            lightMapIntensity: this.getLightMapIntensity(1),
            aoMap: this.getTexture('aoMap'),
            aoMapIntensity: this.getAoMapIntensity(1),
            emissive: this.getEmissive(0x000000),
            emissiveIntensity: this.getEmissiveIntensity(1),
            emissiveMap: this.getTexture('emissiveMap'),
            bumpMap: this.getTexture('bumpMap'),
            bumpScale: this.getBumpScale(1),
            normalMap: this.getTexture('normalMap'),
            normalMapType: this.getNormalMapType('tangentspace'),
            normalScale: this.getNormalScale(1, 1),
            displacementMap: this.getTexture('displacementMap'),
            displacementScale: this.getDisplacementScale(1),
            displacementBias: this.getDisplacementBias(0),
            alphaMap: this.getTexture('alphaMap'),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            wireframeLinecap: this.getWireframeLinecap('round'),
            wireframeLinejoin: this.getWireframeLinejoin('round'),
            skinning: this.getSkinning(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false)
          }
          this.material = new THREE.MeshToonMaterial(this.getMaterialParameters(parametersMeshToonMaterial));
          break;
        case 'points':
          const parametersPointsMaterial: THREE.PointsMaterialParameters = {
            color: this.getColor(0xffffff),
            map: this.getTexture('map'),
            alphaMap: this.getTexture('alphaMap'),
            size: this.getSize(5),
            sizeAttenuation: this.getSizeAttenuation(true),
            // morphTargets: this.getMorphTargets(false),
          }
          this.material = new THREE.PointsMaterial(this.getMaterialParameters(parametersPointsMaterial));
          break;
        case 'rawshader':
          const parametersRawShaderMaterial: THREE.ShaderMaterialParameters = {
            uniforms: this.getUniforms({}),
            vertexShader: this.getShader('x-shader/x-vertex'), 
            fragmentShader: this.getShader('x-shader/x-fragment'),
            linewidth: this.getLinewidth(1),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            lights: this.getLights(false),
            clipping: this.getClipping(false),
            skinning: this.getSkinning(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false)
          }
          this.material = new THREE.RawShaderMaterial(this.getMaterialParameters(parametersRawShaderMaterial));
          break;
        case 'shader':
          const parametersShaderMaterial: THREE.ShaderMaterialParameters = {
            uniforms: this.getUniforms({}),
            vertexShader: this.getShader('x-shader/x-vertex'), 
            fragmentShader: this.getShader('x-shader/x-fragment'),
            linewidth: this.getLinewidth(1),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            lights: this.getLights(false),
            clipping: this.getClipping(false),
            skinning: this.getSkinning(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false)
          }
          this.material = new THREE.ShaderMaterial(this.getMaterialParameters(parametersShaderMaterial));
          break;
        case 'shadow':
          this.material = new THREE.ShadowMaterial(this.getMaterialParameters({
            color: this.getColor(0xffffff)
          }));
          break;
        case 'sprite':
          const parametersSpriteMaterial: THREE.SpriteMaterialParameters = {
            color: this.getColor(0xffffff),
            map: this.getTexture('map'),
            alphaMap: this.getTexture('alphaMap'),
            rotation: this.getRotation(1),
            sizeAttenuation: this.getSizeAttenuation(true)
          }
          this.material = new THREE.SpriteMaterial(this.getMaterialParameters(parametersSpriteMaterial));
          console.log(this.material);
          break;
        case 'meshlambert':
        default:
          const parametersMeshLambertMaterial: THREE.MeshLambertMaterialParameters = {
            color: this.getColor(0xffffff),
            emissive: this.getEmissive(0x000000),
            emissiveIntensity: this.getEmissiveIntensity(1),
            emissiveMap: this.getTexture('emissiveMap'),
            map: this.getTexture('map'),
            lightMap: this.getTexture('lightMap'),
            lightMapIntensity: this.getLightMapIntensity(1),
            aoMap: this.getTexture('aoMap'),
            aoMapIntensity: this.getAoMapIntensity(1),
            specularMap: this.getTexture('specularMap'),
            alphaMap: this.getTexture('alphaMap'),
            envMap: this.getTexture('envMap'),
            combine: this.getCombine('multiply'),
            reflectivity: this.getReflectivity(1),
            refractionRatio: this.getRefractionRatio(1),
            wireframe: this.getWireframe(false),
            wireframeLinewidth: this.getWireframeLinewidth(1),
            wireframeLinecap: this.getWireframeLinecap('round'),
            wireframeLinejoin: this.getWireframeLinejoin('round'),
            skinning: this.getSkinning(false),
            morphTargets: this.getMorphTargets(false),
            morphNormals: this.getMorphNormals(false)
          }
          this.material = new THREE.MeshLambertMaterial(this.getMaterialParameters(parametersMeshLambertMaterial));
          break;
      }
    }
    return this.material;
  }
}
