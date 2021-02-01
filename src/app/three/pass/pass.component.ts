import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import { BokehPass, BokehPassParamters } from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import { MaskPass } from 'three/examples/jsm/postprocessing/MaskPass';
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass';
import { Pass } from 'three/examples/jsm/postprocessing/Pass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';
import { SAOPass } from 'three/examples/jsm/postprocessing/SAOPass';
import { SavePass } from 'three/examples/jsm/postprocessing/SavePass';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass';
import { SSAARenderPass } from 'three/examples/jsm/postprocessing/SSAARenderPass';
import { SSAOPass } from 'three/examples/jsm/postprocessing/SSAOPass';
import { TAARenderPass } from 'three/examples/jsm/postprocessing/TAARenderPass';
import { TexturePass } from 'three/examples/jsm/postprocessing/TexturePass';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader';
import { BasicShader } from 'three/examples/jsm/shaders/BasicShader';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader';
import { BokehShader } from 'three/examples/jsm/shaders/BokehShader';
import { BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader';
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader';
import { ColorifyShader } from 'three/examples/jsm/shaders/ColorifyShader';
import { ConvolutionShader } from 'three/examples/jsm/shaders/ConvolutionShader';
import { CopyShader } from 'three/examples/jsm/shaders/CopyShader';
import { DepthLimitedBlurShader } from 'three/examples/jsm/shaders/DepthLimitedBlurShader';
import { DigitalGlitch } from 'three/examples/jsm/shaders/DigitalGlitch';
import { DOFMipMapShader } from 'three/examples/jsm/shaders/DOFMipMapShader';
import { DotScreenShader } from 'three/examples/jsm/shaders/DotScreenShader';
import { FilmShader } from 'three/examples/jsm/shaders/FilmShader';
import { FocusShader } from 'three/examples/jsm/shaders/FocusShader';
import { FreiChenShader } from 'three/examples/jsm/shaders/FreiChenShader';
import { FresnelShader } from 'three/examples/jsm/shaders/FresnelShader';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader';
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader';
import { GodRaysDepthMaskShader, GodRaysGenerateShader, GodRaysCombineShader, GodRaysFakeSunShader } from 'three/examples/jsm/shaders/GodRaysShader';
import { HalftoneShader } from 'three/examples/jsm/shaders/HalftoneShader';
import { HorizontalBlurShader } from 'three/examples/jsm/shaders/HorizontalBlurShader';
import { HorizontalTiltShiftShader } from 'three/examples/jsm/shaders/HorizontalTiltShiftShader';
import { HueSaturationShader } from 'three/examples/jsm/shaders/HueSaturationShader';
import { KaleidoShader } from 'three/examples/jsm/shaders/KaleidoShader';
import { LuminosityHighPassShader } from 'three/examples/jsm/shaders/LuminosityHighPassShader';
import { LuminosityShader } from 'three/examples/jsm/shaders/LuminosityShader';
import { MirrorShader } from 'three/examples/jsm/shaders/MirrorShader';
import { NormalMapShader } from 'three/examples/jsm/shaders/NormalMapShader';
import { OceanShaders } from 'three/examples/jsm/shaders/OceanShaders';
import { ParallaxShader } from 'three/examples/jsm/shaders/ParallaxShader';
import { PixelShader } from 'three/examples/jsm/shaders/PixelShader';
import { RGBShiftShader } from 'three/examples/jsm/shaders/RGBShiftShader';
import { SAOShader } from 'three/examples/jsm/shaders/SAOShader';
import { SepiaShader } from 'three/examples/jsm/shaders/SepiaShader';
import { SMAAEdgesShader, SMAAWeightsShader, SMAABlendShader } from 'three/examples/jsm/shaders/SMAAShader';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';
import { SSAOShader } from 'three/examples/jsm/shaders/SSAOShader';
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader';
import { TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader';
import { ToneMapShader } from 'three/examples/jsm/shaders/ToneMapShader';
import { ToonShader1, ToonShader2, ToonShaderDotted, ToonShaderHatching } from 'three/examples/jsm/shaders/ToonShader';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader';
import { UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { VolumeRenderShader1 } from 'three/examples/jsm/shaders/VolumeShader';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';

import { AbstractComposerComponent, AbstractEffectComposer, ThreeUtil } from '../interface';

@Component({
  selector: 'three-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
})
export class PassComponent implements OnInit {
  @Input() type: string = '';
  @Input() refer: PassComponent = null;
  @Input() enabled: boolean = null;
  @Input() needsSwap: boolean = null;
  @Input() clear: boolean = null;
  @Input() renderToScreen: boolean = null;
  @Input() adaptive: boolean = null;
  @Input() resolution: number = null;
  @Input() damp: number = null;
  @Input() strength: number = null;
  @Input() kernelSize: number = null;
  @Input() sigma: number = null;
  @Input() scene: any = null;
  @Input() camera: any = null;
  @Input() params: BokehPassParamters = null;
  @Input() clearColor: THREE.Color | string | number = null;
  @Input() clearAlpha: number = null;
  @Input() envMap: THREE.CubeTexture = null;
  @Input() opacity: number = null;
  @Input() centerX: number = null;
  @Input() centerY: number = null;
  @Input() angle: number = null;
  @Input() scale: number = null;
  @Input() noiseIntensity: number = null;
  @Input() scanlinesIntensity: number = null;
  @Input() scanlinesCount: number = null;
  @Input() grayscale: number = null;
  @Input() dtSize: number = null;
  @Input() width: number = null;
  @Input() height: number = null;
  @Input() selectedObjects: THREE.Object3D[] = null;
  @Input() overrideMaterial: THREE.Material = null;
  @Input() depthTexture: boolean = null;
  @Input() useNormals: boolean = null;
  @Input() renderTarget: THREE.WebGLRenderTarget = null;
  @Input() shader: string = null;
  @Input() textureID: string = null;
  @Input() map: THREE.Texture | AbstractComposerComponent = null;
  @Input() radius: number = null;
  @Input() threshold: number = null;
  @Input() goWild: boolean = null;
  @Input() uniforms : { [key : string] : any } = null;

  constructor() { }

  private getEnabled(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.enabled, def);
  }

  private getNeedsSwap(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.needsSwap, def);
  }

  private getClear(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.clear, def);
  }

  private getRenderToScreen(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.renderToScreen, def);
  }

  private getAdaptive(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.adaptive, def);
  }

  private getResolution(def?: number): number {
    return ThreeUtil.getTypeSafe(this.resolution, def);
  }

  private getDamp(def?: number): number {
    return ThreeUtil.getTypeSafe(this.damp, def);
  }

  private getStrength(def?: number): number {
    return ThreeUtil.getTypeSafe(this.strength, def);
  }

  private getKernelSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.kernelSize, def);
  }

  private getSigma(def?: number): number {
    return ThreeUtil.getTypeSafe(this.sigma, def);
  }

  private getScene(def?: any ): THREE.Scene {
    const scene = ThreeUtil.getTypeSafe(this.scene, def);
    if (ThreeUtil.isNotNull(scene)) {
      if (scene instanceof THREE.Scene) {
        return scene;
      } else {
        return scene.getScene();
      }
    } else {
      return new THREE.Scene();
    }
  }

  private getCamera(def?: any ): THREE.Camera {
    const camera = ThreeUtil.getTypeSafe(this.camera, def);
    if (ThreeUtil.isNotNull(camera)) {
      if (camera instanceof THREE.Camera) {
        return camera;
      } else {
        return camera.getScene();
      }
    } else {
      return new THREE.Camera();
    }

  }

  private getParams(def?: BokehPassParamters): BokehPassParamters {
    return ThreeUtil.getTypeSafe(this.params, def);
  }

  private getClearColor(def?: THREE.Color | string | number): THREE.Color | string | number {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  private getClearAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

  private getEnvMap(def?: THREE.CubeTexture): THREE.CubeTexture {
    return ThreeUtil.getTypeSafe(this.envMap, def);
  }

  private getOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.opacity, def);
  }

  private getCenter(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.centerX, this.centerY, def);
  }

  private getAngle(def?: number): number {
    return ThreeUtil.getAngleSafe(this.angle, def);
  }

  private getScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scale, def);
  }

  private getNoiseIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.noiseIntensity, def);
  }

  private getScanlinesIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scanlinesIntensity, def);
  }

  private getScanlinesCount(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scanlinesCount, def);
  }

  private getGrayscale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.grayscale, def);
  }

  private getDtSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.dtSize, def);
  }

  private getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width, def);
  }

  private getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height, def);
  }

  private getSelectedObjects(def?: THREE.Object3D[]): THREE.Object3D[] {
    return ThreeUtil.getTypeSafe(this.selectedObjects, def);
  }

  private getOverrideMaterial(def?: THREE.Material): THREE.Material {
    return ThreeUtil.getTypeSafe(this.overrideMaterial, def);
  }

  private getDepthTexture(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.depthTexture, def);
  }

  private getUseNormals(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.useNormals, def);
  }

  private getRenderTarget(def?: THREE.WebGLRenderTarget): THREE.WebGLRenderTarget {
    return ThreeUtil.getTypeSafe(this.renderTarget, def);
  }

  private getShader(def?: string): object {
    const shader = ThreeUtil.getTypeSafe(this.shader, def, '');
    let shaderUniforms = null;
    switch (shader.toLowerCase()) {
      case 'afterimage':
        shaderUniforms = AfterimageShader;
        break;
      case 'basic':
        shaderUniforms = BasicShader;
        break;
      case 'bleachbypass':
        shaderUniforms = BleachBypassShader;
        break;
      case 'blend':
        shaderUniforms = BlendShader;
        break;
      case 'bokeh':
        shaderUniforms = BokehShader;
        break;
      case 'bokeh':
        shaderUniforms = BokehShader;
        break;
      case 'brightnesscontrast':
        shaderUniforms = BrightnessContrastShader;
        break;
      case 'colorcorrection':
        shaderUniforms = ColorCorrectionShader;
        break;
      case 'colorify':
        shaderUniforms = ColorifyShader;
        break;
      case 'convolution':
        shaderUniforms = ConvolutionShader;
        break;
      case 'copy':
        shaderUniforms = CopyShader;
        break;
      case 'depthlimitedblur':
        shaderUniforms = DepthLimitedBlurShader;
        break;
      case 'digitalglitch':
        shaderUniforms = DigitalGlitch;
        break;
      case 'dofmipmap':
        shaderUniforms = DOFMipMapShader;
        break;
      case 'dotscreen':
        shaderUniforms = DotScreenShader;
        break;
      case 'film':
        shaderUniforms = FilmShader;
        break;
      case 'focus':
        shaderUniforms = FocusShader;
        break;
      case 'freichen':
        shaderUniforms = FreiChenShader;
        break;
      case 'fresnel':
        shaderUniforms = FresnelShader;
        break;
      case 'fxaa':
        shaderUniforms = FXAAShader;
        break;
      case 'gammacorrection':
        shaderUniforms = GammaCorrectionShader;
        break;
      case 'godraysdepthmask':
        shaderUniforms = GodRaysDepthMaskShader;
        break;
      case 'godraysgenerate':
        shaderUniforms = GodRaysGenerateShader;
        break;
      case 'godrayscombine':
        shaderUniforms = GodRaysCombineShader;
        break;
      case 'godraysfakesun':
        shaderUniforms = GodRaysFakeSunShader;
        break;
      case 'halftone':
        shaderUniforms = HalftoneShader;
        break;
      case 'horizontalblur':
        shaderUniforms = HorizontalBlurShader;
        break;
      case 'horizontaltiltshift':
        shaderUniforms = HorizontalTiltShiftShader;
        break;
      case 'huesaturation':
        shaderUniforms = HueSaturationShader;
        break;
      case 'kaleido':
        shaderUniforms = KaleidoShader;
        break;
      case 'luminosityhighpass':
        shaderUniforms = LuminosityHighPassShader;
        break;
      case 'luminosity':
        shaderUniforms = LuminosityShader;
        break;
      case 'mirror':
        shaderUniforms = MirrorShader;
        break;
      case 'normalmap':
        shaderUniforms = NormalMapShader;
        break;
      case 'ocean':
        shaderUniforms = OceanShaders;
        break;
      case 'parallax':
        shaderUniforms = ParallaxShader;
        break;
      case 'pixel':
        shaderUniforms = PixelShader;
        break;
      case 'rgbshift':
        shaderUniforms = RGBShiftShader;
        break;
      case 'sao':
        shaderUniforms = SAOShader;
        break;
      case 'sepia':
        shaderUniforms = SepiaShader;
        break;
      case 'smaaedges':
        shaderUniforms = SMAAEdgesShader;
        break;
      case 'smaaweights':
        shaderUniforms = SMAAWeightsShader;
        break;
      case 'smaablend':
        shaderUniforms = SMAABlendShader;
        break;
      case 'sobeloperator':
        shaderUniforms = SobelOperatorShader;
        break;
      case 'ssao':
        shaderUniforms = SSAOShader;
        break;
      case 'subsurfacescattering':
        shaderUniforms = SubsurfaceScatteringShader;
        break;
      case 'technicolor':
        shaderUniforms = TechnicolorShader;
        break;
      case 'tonemap':
        shaderUniforms = ToneMapShader;
        break;
      case 'toon2':
        shaderUniforms = ToonShader1;
        break;
      case 'toon1':
        shaderUniforms = ToonShader2;
        break;
      case 'toondotted':
        shaderUniforms = ToonShaderDotted;
        break;
      case 'toonhatching':
        shaderUniforms = ToonShaderHatching;
        break;
      case 'triangleblur':
        shaderUniforms = TriangleBlurShader;
        break;
      case 'unpackdepthrgba':
        shaderUniforms = UnpackDepthRGBAShader;
        break;
      case 'verticalblur':
        shaderUniforms = VerticalBlurShader;
        break;
      case 'verticaltiltshift':
        shaderUniforms = VerticalTiltShiftShader;
        break;
      case 'vignette':
        shaderUniforms = VignetteShader;
        break;
      case 'volume':
        shaderUniforms = VolumeRenderShader1;
        break;
      case 'waterrefraction':
        shaderUniforms = WaterRefractionShader;
        break;
    }
    if (shaderUniforms !== null) {
      if (shaderUniforms.uniforms !== null && shaderUniforms.uniforms !== undefined && this.uniforms !== null && this.uniforms !== undefined) {
        Object.entries(shaderUniforms.uniforms).forEach(([key, value]) => {
          if (value['value'] !== null && value['value'] !== undefined) {
            shaderUniforms.uniforms[key] = {
              value : ThreeUtil.getTypeSafe(this.uniforms[key],value['value'], null)
            }
          }
        })
      }
      return shaderUniforms;
    }
    return undefined;
  }

  private getTextureID(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textureID, def);
  }

  private getMap(def?: THREE.Texture | AbstractComposerComponent, camera?: any, mapType?: string): THREE.Texture {
    const map = ThreeUtil.getTypeSafe(this.map, def);
    if (map !== null) {
      if (map instanceof AbstractComposerComponent) {
        switch ((mapType || '').toLowerCase()) {
          case 'target1':
            return map.getRenderTarget1(camera).texture;
          case 'write':
            return map.getWriteBuffer(camera).texture;
          case 'read':
            return map.getReadBuffer(camera).texture;
          case 'target2':
          default:
            return map.getRenderTarget2(camera).texture;
        }
      } else {
        return map;
      }
    }
    return undefined;
  }

  private getRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radius, def);
  }

  private getThreshold(def?: number): number {
    return ThreeUtil.getTypeSafe(this.threshold, def);
  }

  private getGoWild(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.goWild, def);
  }


  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.pass = null;
      if (this.cameraComponent !== null) {
        this.cameraComponent.resetEffectComposer();
        console.log(this.pass);
      }
    }
  }

  private cameraComponent: AbstractEffectComposer = null;

  private pass: Pass = null;

  getPass(scene: THREE.Scene, camera: THREE.Camera, effectComposer: AbstractEffectComposer, cameraComponent? : any): Pass {
    if (this.refer !== null && this.refer !== undefined) {
      return this.refer.getPass(scene, camera, effectComposer, cameraComponent);
    } else if (this.pass === null) {
      this.cameraComponent = effectComposer;
      switch (this.type.toLowerCase()) {
        case 'adaptivetonemapping':
          this.pass = new AdaptiveToneMappingPass(
            this.getAdaptive(),
            this.getResolution()
          );
          break;
        case 'afterimage':
          this.pass = new AfterimagePass(this.getDamp());
          break;
        case 'bloom':
          this.pass = new BloomPass(
            this.getStrength(),
            this.getKernelSize(),
            this.getSigma(),
            this.getResolution()
          );
          break;
        case 'bokeh':
          this.pass = new BokehPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getParams()
          );
          break;
        case 'cubetexture':
          this.pass = new CubeTexturePass(
            this.getCamera(camera) as THREE.PerspectiveCamera,
            this.getEnvMap(),
            this.getOpacity()
          );
          break;
        case 'dotscreen':
          this.pass = new DotScreenPass(
            this.getCenter(),
            this.getAngle(),
            this.getScale()
          );
          break;
        case 'film':
          this.pass = new FilmPass(
            this.getNoiseIntensity(),
            this.getScanlinesIntensity(),
            this.getScanlinesCount(),
            this.getGrayscale()
          );
          break;
        case 'glitch':
          const pass = new GlitchPass(
            this.getDtSize()
          );
          pass.goWild = this.getGoWild(false);
          this.pass = pass;
          break;
        case 'halftone':
          this.pass = new HalftonePass(
            this.getWidth(),
            this.getHeight(),
            null // this.getParams(null)
          );
          break;
        case 'mask':
          this.pass = new MaskPass(
            this.getScene(scene),
            this.getCamera(camera)
          );
          break;
        case 'outline':
          this.pass = new OutlinePass(
            null, //this.getResolution(),
            this.getScene(scene),
            this.getCamera(camera),
            null // this.getSelectedObjects()
          );
          break;
        case 'render':
          this.pass = new RenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            //this.getOverrideMaterial(null),
            //new THREE.Color(this.getClearColor()),
            // this.getClearAlpha()
          );
          break;
        case 'sao':
          this.pass = new SAOPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getDepthTexture(),
            this.getUseNormals(),
            null // this.getResolution()
          );
          break;
        case 'save':
          this.pass = new SavePass(
            this.getRenderTarget()
          );
          break;
        case 'shader':
          this.pass = new ShaderPass(
            this.getShader(),
            this.getTextureID()
          );
          break;
        case 'smaa':
          this.pass = new SMAAPass(
            this.getWidth(),
            this.getHeight()
          );
          break;
        case 'ssaarender':
          this.pass = new SSAARenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getClearColor(),
            this.getClearAlpha()
          );
          break;
        case 'ssao':
          this.pass = new SSAOPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getWidth(),
            this.getHeight()
          );
          break;
        case 'taarender':
          this.pass = new TAARenderPass(
            this.getScene(scene),
            this.getCamera(camera),
            this.getClearColor(),
            this.getClearAlpha()
          );
          break;
        case 'texture':
          this.pass = new TexturePass(
            this.getMap(null,cameraComponent,),
            this.getOpacity()
          );
          break;
        case 'taarender':
          this.pass = new UnrealBloomPass(
            null, //this.getResolution(),
            this.getStrength(),
            this.getRadius(),
            this.getThreshold()
          );
          break;
        case 'clear':
        default:
          this.pass = new ClearPass(
            this.getClearColor(),
            this.getClearAlpha()
          );
          break;
      }
      if (ThreeUtil.isNotNull(this.enabled)) {
        this.pass.enabled = this.getEnabled(true);
      }
      if (ThreeUtil.isNotNull(this.needsSwap)) {
        this.pass.needsSwap = this.getNeedsSwap(true);
      }
      if (ThreeUtil.isNotNull(this.clear)) {
        this.pass.clear = this.getClear(false);
      }
      if (ThreeUtil.isNotNull(this.renderToScreen)) {
        this.pass.renderToScreen = this.getRenderToScreen(false);
      }
    }
    return this.pass;
  }
}
