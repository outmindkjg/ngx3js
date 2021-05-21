import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';

import { AdaptiveToneMappingPass } from 'three/examples/jsm/postprocessing/AdaptiveToneMappingPass';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass';
import {
  BokehPass,
  BokehPassParamters,
} from 'three/examples/jsm/postprocessing/BokehPass';
import { ClearPass } from 'three/examples/jsm/postprocessing/ClearPass';
import { CubeTexturePass } from 'three/examples/jsm/postprocessing/CubeTexturePass';
import { DotScreenPass } from 'three/examples/jsm/postprocessing/DotScreenPass';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass';
import { HalftonePass } from 'three/examples/jsm/postprocessing/HalftonePass';
import {
  ClearMaskPass,
  MaskPass,
} from 'three/examples/jsm/postprocessing/MaskPass';

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
import { LUTPass } from 'three/examples/jsm/postprocessing/LUTPass';
import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader';
import { BasicShader } from 'three/examples/jsm/shaders/BasicShader';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader';
import { BokehShader } from 'three/examples/jsm/shaders/BokehShader';
import {
  BokehShader as BokehShader2,
  BokehDepthShader,
} from 'three/examples/jsm/shaders/BokehShader2';
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
import {
  LUTCubeLoader,
  LUTCubeResult,
} from 'three/examples/jsm/loaders/LUTCubeLoader';

import {
  GodRaysDepthMaskShader,
  GodRaysGenerateShader,
  GodRaysCombineShader,
  GodRaysFakeSunShader,
} from 'three/examples/jsm/shaders/GodRaysShader';
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
import {
  SMAAEdgesShader,
  SMAAWeightsShader,
  SMAABlendShader,
} from 'three/examples/jsm/shaders/SMAAShader';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';
import { SSAOShader } from 'three/examples/jsm/shaders/SSAOShader';
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader';
import { TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader';
import { ToneMapShader } from 'three/examples/jsm/shaders/ToneMapShader';
import {
  ToonShader1,
  ToonShader2,
  ToonShaderDotted,
  ToonShaderHatching,
} from 'three/examples/jsm/shaders/ToonShader';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader';
import { UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { VolumeRenderShader1 } from 'three/examples/jsm/shaders/VolumeShader';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';

import { ThreeUtil } from '../interface';
import { TextureComponent } from '../texture/texture.component';

@Component({
  selector: 'three-pass',
  templateUrl: './pass.component.html',
  styleUrls: ['./pass.component.scss'],
})
export class PassComponent implements OnInit {
  @Input() public type: string = '';
  @Input() private refer: PassComponent = null;
  @Input() private enabled: boolean = true;
  @Input() private needsSwap: boolean = null;
  @Input() private clear: boolean = null;
  @Input() private renderToScreen: boolean = null;
  @Input() private adaptive: boolean = null;
  @Input() private resolution: number = null;
  @Input() private damp: number = null;
  @Input() private strength: number = null;
  @Input() private kernelSize: number = null;
  @Input() private sigma: number = null;
  @Input() private scene: any = null;
  @Input() private camera: any = null;
  @Input() private params: BokehPassParamters = null;
  @Input() private intensity: number = null;
  @Input() private clearColor: THREE.Color | string | number = null;
  @Input() private clearAlpha: number = null;
  @Input() private envMap: THREE.CubeTexture | TextureComponent = null;
  @Input() private opacity: number = null;
  @Input() private centerX: number = null;
  @Input() private centerY: number = null;
  @Input() private angle: number = null;
  @Input() private scale: number = null;
  @Input() private noiseIntensity: number = null;
  @Input() private scanlinesIntensity: number = null;
  @Input() private scanlinesCount: number = null;
  @Input() private grayscale: boolean = null;
  @Input() private dtSize: number = null;
  @Input() private width: number = null;
  @Input() private height: number = null;
  @Input() private selectedObjects: (THREE.Object3D | any)[] = null;
  @Input() private overrideMaterial: THREE.Material = null;
  @Input() private depthTexture: boolean = null;
  @Input() private useNormals: boolean = null;
  @Input() private renderTarget: THREE.WebGLRenderTarget = null;
  @Input() private shader: string = null;
  @Input() private textureId: string = null;
  @Input() private map: THREE.Texture | TextureComponent | any = null;
  @Input() private texture: THREE.Texture | TextureComponent = null;
  @Input() private patternTexture: THREE.Texture | TextureComponent = null;
  @Input() private radius: number = null;
  @Input() private threshold: number = null;
  @Input() private goWild: boolean = null;
  @Input() private uniforms: { [key: string]: any } = null;
  @Input() private lut: string = null;
  @Input() private use2DLut: boolean = null;
  @Input() private inverse: boolean = null;
  @Input() private focus: number = null;
  @Input() private aspect: number = null;
  @Input() private aperture: number = null;
  @Input() private maxblur: number = null;
  @Input() private sampleLevel: number = null;
  @Input() private unbiased: boolean = null;
  @Input() private visibleEdgeColor: string | number | THREE.Color = null;
  @Input() private hiddenEdgeColor: string | number | THREE.Color = null;
  @Input() private edgeGlow: number = null;
  @Input() private usePatternTexture: boolean = null;
  @Input() private edgeThickness: number = null;
  @Input() private edgeStrength: number = null;
  @Input() private downSampleRatio: number = null;
  @Input() private pulsePeriod: number = null;

  @Output()
  private onLoad: EventEmitter<PassComponent> = new EventEmitter<PassComponent>();

  constructor() {}

  private lutCubeLoader: LUTCubeLoader = null;

  private getLut(
    callBack: (result: LUTCubeResult) => void,
    def?: string
  ): void {
    const lut = ThreeUtil.getTypeSafe(this.lut, def, 'remy24');
    let lutPath = '';
    switch (lut.toLowerCase()) {
      case 'bourbon 64.cube':
      case 'bourbon64':
        lutPath = 'luts/Bourbon 64.CUBE';
        break;
      case 'chemical 168.cube':
      case 'chemical168':
        lutPath = 'luts/Chemical 168.CUBE';
        break;
      case 'clayton 33.cube':
      case 'clayton33':
        lutPath = 'luts/Clayton 33.CUBE';
        break;
      case 'cubicle 99.cube':
      case 'cubicle99':
        lutPath = 'luts/Cubicle 99.CUBE';
        break;
      case 'remy 24.cube':
      case 'remy24':
        lutPath = 'luts/Remy 24.CUBE';
        break;
      default:
        lutPath = lut;
        break;
    }
    if (this.lutCubeLoader == null) {
      this.lutCubeLoader = new LUTCubeLoader(ThreeUtil.getLoadingManager());
    }
    this.lutCubeLoader.load(
      ThreeUtil.getStoreUrl(lutPath),
      (result: LUTCubeResult) => {
        callBack(result);
      }
    );
  }

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

  private getScene(def?: any): THREE.Scene {
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

  private getCamera(def?: any): THREE.Camera {
    const camera = ThreeUtil.getTypeSafe(this.camera, def);
    if (ThreeUtil.isNotNull(camera)) {
      if (camera instanceof THREE.Camera) {
        return camera;
      } else {
        return camera.getCamera();
      }
    } else {
      return new THREE.Camera();
    }
  }

  private getParams(def?: BokehPassParamters): BokehPassParamters {
    return ThreeUtil.getTypeSafe(this.params, def);
  }

  private getIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.intensity, def);
  }

  private getClearColor(def?: THREE.Color | string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.clearColor, def);
  }

  private getClearAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clearAlpha, def);
  }

  private getEnvMap(def?: THREE.CubeTexture): THREE.CubeTexture {
    const cubeTexture = this.getTexture(this.envMap, def);
    if (cubeTexture instanceof THREE.CubeTexture) {
      return cubeTexture;
    }
    return undefined;
  }

  private getPatternTexture(def?: THREE.Texture): THREE.Texture {
    return this.getTexture(this.patternTexture, def);
  }

  private getTexture(
    baseTexture: THREE.Texture | TextureComponent | any,
    def?: THREE.Texture | TextureComponent | any
  ): THREE.Texture {
    const texture = ThreeUtil.getTypeSafe(
      baseTexture,
      ThreeUtil.getTypeSafe(this.texture, this.map, def),
      def
    );
    if (texture instanceof THREE.Texture) {
      return texture;
    } else if (texture instanceof TextureComponent) {
      return texture.getTexture();
    }
    return undefined;
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

  private getGrayscale(def?: boolean): number {
    if (ThreeUtil.getTypeSafe(this.grayscale, def)) {
      return 1;
    } else {
      return 0;
    }
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
    const selectedObjects = ThreeUtil.getTypeSafe(this.selectedObjects, def);
    const safeObject3d : THREE.Object3D[] = [];
    selectedObjects.forEach(child => {
      if (child instanceof THREE.Object3D) {
        safeObject3d.push(child);
      } else if (child.getMesh) {
        safeObject3d.push(child.getMesh());
      } else if (child.getHelper) {
        safeObject3d.push(child.getHelper());
      } else if (child.getObject3D) {
        safeObject3d.push(child.getObject3D());
      }
    });
    return safeObject3d;
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

  private getRenderTarget(
    def?: THREE.WebGLRenderTarget
  ): THREE.WebGLRenderTarget {
    return ThreeUtil.getTypeSafe(this.renderTarget, def);
  }

  private getShader(def?: string): object {
    const shader = ThreeUtil.getTypeSafe(this.shader, def, '');
    let shaderUniforms = null;
    switch (shader.toLowerCase()) {
      case 'afterimageshader':
      case 'afterimage':
        shaderUniforms = AfterimageShader;
        break;
      case 'basicshader':
      case 'basic':
        shaderUniforms = BasicShader;
        break;
      case 'bleachbypassshader':
      case 'bleachbypass':
        shaderUniforms = BleachBypassShader;
        break;
      case 'blendshader':
      case 'blend':
        shaderUniforms = BlendShader;
        break;
      case 'bokehshader':
      case 'bokeh':
        shaderUniforms = BokehShader;
        break;
      case 'bokehshader2':
      case 'bokeh2shader':
      case 'bokeh2':
        shaderUniforms = BokehShader2;
        break;
      case 'bokehdepthshader':
      case 'bokehdepth':
        shaderUniforms = BokehDepthShader;
        break;
      case 'brightnesscontrastshader':
      case 'brightnesscontrast':
        shaderUniforms = BrightnessContrastShader;
        break;
      case 'colorcorrectionshader':
      case 'colorcorrection':
        shaderUniforms = ColorCorrectionShader;
        break;
      case 'colorifyshader':
      case 'colorify':
        shaderUniforms = ColorifyShader;
        break;
      case 'convolutionshader':
      case 'convolution':
        shaderUniforms = ConvolutionShader;
        break;
      case 'copyshader':
      case 'copy':
        shaderUniforms = CopyShader;
        break;
      case 'depthlimitedblurshader':
      case 'depthlimitedblur':
        shaderUniforms = DepthLimitedBlurShader;
        break;
      case 'digitalglitchshader':
      case 'digitalglitch':
        shaderUniforms = DigitalGlitch;
        break;
      case 'dofmipmapshader':
      case 'dofmipmap':
        shaderUniforms = DOFMipMapShader;
        break;
      case 'dotscreenshader':
      case 'dotscreen':
        shaderUniforms = DotScreenShader;
        break;
      case 'filmshader':
      case 'film':
        shaderUniforms = FilmShader;
        break;
      case 'focusshader':
      case 'focus':
        shaderUniforms = FocusShader;
        break;
      case 'freichenshader':
      case 'freichen':
        shaderUniforms = FreiChenShader;
        break;
      case 'fresnelshader':
      case 'fresnel':
        shaderUniforms = FresnelShader;
        break;
      case 'fxaashader':
      case 'fxaa':
        shaderUniforms = FXAAShader;
        break;
      case 'gammacorrectionshader':
      case 'gammacorrection':
        shaderUniforms = GammaCorrectionShader;
        break;
      case 'godraysdepthmaskshader':
      case 'godraysdepthmask':
        shaderUniforms = GodRaysDepthMaskShader;
        break;
      case 'godraysgenerateshader':
      case 'godraysgenerate':
        shaderUniforms = GodRaysGenerateShader;
        break;
      case 'godrayscombineshader':
      case 'godrayscombine':
        shaderUniforms = GodRaysCombineShader;
        break;
      case 'godraysfakesunshader':
      case 'godraysfakesun':
        shaderUniforms = GodRaysFakeSunShader;
        break;
      case 'halftoneshader':
      case 'halftone':
        shaderUniforms = HalftoneShader;
        break;
      case 'horizontalblurshader':
      case 'horizontalblur':
        shaderUniforms = HorizontalBlurShader;
        break;
      case 'horizontaltiltshiftshader':
      case 'horizontaltiltshift':
        shaderUniforms = HorizontalTiltShiftShader;
        break;
      case 'huesaturationshader':
      case 'huesaturation':
        shaderUniforms = HueSaturationShader;
        break;
      case 'kaleidoshader':
      case 'kaleido':
        shaderUniforms = KaleidoShader;
        break;
      case 'luminosityhighpassshader':
      case 'luminosityhighpass':
        shaderUniforms = LuminosityHighPassShader;
        break;
      case 'luminosityshader':
      case 'luminosity':
        shaderUniforms = LuminosityShader;
        break;
      case 'mirrorshader':
      case 'mirror':
        shaderUniforms = MirrorShader;
        break;
      case 'normalmapshader':
      case 'normalmap':
        shaderUniforms = NormalMapShader;
        break;
      case 'oceanshader':
      case 'ocean':
        shaderUniforms = OceanShaders;
        break;
      case 'parallaxshader':
      case 'parallax':
        shaderUniforms = ParallaxShader;
        break;
      case 'pixelshader':
      case 'pixel':
        shaderUniforms = PixelShader;
        break;
      case 'rgbshiftshader':
      case 'rgbshift':
        shaderUniforms = RGBShiftShader;
        break;
      case 'saoshader':
      case 'sao':
        shaderUniforms = SAOShader;
        break;
      case 'sepiashader':
      case 'sepia':
        shaderUniforms = SepiaShader;
        break;
      case 'smaaedgesshader':
      case 'smaaedges':
        shaderUniforms = SMAAEdgesShader;
        break;
      case 'smaaweightsshader':
      case 'smaaweights':
        shaderUniforms = SMAAWeightsShader;
        break;
      case 'smaablendshader':
      case 'smaablend':
        shaderUniforms = SMAABlendShader;
        break;
      case 'sobeloperatorshader':
      case 'sobeloperator':
        shaderUniforms = SobelOperatorShader;
        break;
      case 'ssaoshader':
      case 'ssao':
        shaderUniforms = SSAOShader;
        break;
      case 'subsurfacescatteringshader':
      case 'subsurfacescattering':
        shaderUniforms = SubsurfaceScatteringShader;
        break;
      case 'technicolorshader':
      case 'technicolor':
        shaderUniforms = TechnicolorShader;
        break;
      case 'tonemapshader':
      case 'tonemap':
        shaderUniforms = ToneMapShader;
        break;
      case 'toon2shader':
      case 'toon2':
        shaderUniforms = ToonShader1;
        break;
      case 'toon1shader':
      case 'toon1':
        shaderUniforms = ToonShader2;
        break;
      case 'toondottedshader':
      case 'toondotted':
        shaderUniforms = ToonShaderDotted;
        break;
      case 'toonhatchingshader':
      case 'toonhatching':
        shaderUniforms = ToonShaderHatching;
        break;
      case 'triangleblurshader':
      case 'triangleblur':
        shaderUniforms = TriangleBlurShader;
        break;
      case 'unpackdepthrgbashader':
      case 'unpackdepthrgba':
        shaderUniforms = UnpackDepthRGBAShader;
        break;
      case 'verticalblurshader':
      case 'verticalblur':
        shaderUniforms = VerticalBlurShader;
        break;
      case 'verticaltiltshiftshader':
      case 'verticaltiltshift':
        shaderUniforms = VerticalTiltShiftShader;
        break;
      case 'vignetteshader':
      case 'vignette':
        shaderUniforms = VignetteShader;
        break;
      case 'volumeshader':
      case 'volume':
        shaderUniforms = VolumeRenderShader1;
        break;
      case 'waterrefractionshader':
      case 'waterrefraction':
        shaderUniforms = WaterRefractionShader;
        break;
    }
    if (shaderUniforms !== null) {
      return shaderUniforms;
    }
    return undefined;
  }

  private getTextureId(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textureId, def);
  }

  private getMap(
    effectComposer?: EffectComposer,
    camera?: THREE.Camera,
    scene?: THREE.Scene,
    mapType?: string
  ): THREE.Texture {
    const map = this.getTexture(this.map, this.texture);
    if (ThreeUtil.isNotNull(map)) {
      return map;
    }
    if (ThreeUtil.isNotNull(effectComposer)) {
      switch ((mapType || '').toLowerCase()) {
        case 'target1':
          return effectComposer.renderTarget1.texture;
        case 'write':
          return effectComposer.writeBuffer.texture;
        case 'read':
          return effectComposer.readBuffer.texture;
        case 'target2':
        default:
          return effectComposer.renderTarget2.texture;
      }
    }
    const refMap = this.map;
    if (
      ThreeUtil.isNotNull(refMap) &&
      refMap.getRenderTarget2 &&
      refMap.getRenderTarget1 &&
      refMap.getWriteBuffer &&
      refMap.getReadBuffer
    ) {
      switch ((mapType || '').toLowerCase()) {
        case 'target1':
          return refMap.getRenderTarget1(effectComposer.renderer, camera, scene)
            .texture;
        case 'write':
          return refMap.getWriteBuffer(effectComposer.renderer, camera, scene)
            .texture;
        case 'read':
          return refMap.getReadBuffer(effectComposer.renderer, camera, scene)
            .texture;
        case 'target2':
        default:
          return refMap.getRenderTarget2(effectComposer.renderer, camera, scene)
            .texture;
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

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.pass !== null && this.effectComposer !== null) {
        this.needUpdate = true;
      }
      if (
        this.effectScene !== null &&
        this.effectCamera !== null &&
        this.effectComposer !== null &&
        (this.pass === null || this.needUpdate)
      ) {
        this.getPass(this.effectScene, this.effectCamera, this.effectComposer);
      }
    }
  }

  private effectComposer: EffectComposer = null;
  private effectScene: THREE.Scene = null;
  private effectCamera: THREE.Camera = null;
  private pass: Pass = null;
  private needUpdate: boolean = false;

  getPass(
    scene?: THREE.Scene,
    camera?: THREE.Camera,
    effectComposer?: EffectComposer
  ): Pass {
    if (ThreeUtil.isNull(scene) || ThreeUtil.isNull(camera)) {
      return this.pass;
    }
    if (this.pass === null || this.needUpdate) {
      this.needUpdate = false;
      this.effectComposer = effectComposer;
      this.effectScene = scene;
      this.effectCamera = camera;
      let pass: Pass = null;
      if (this.refer !== null && this.refer !== undefined) {
        pass = this.refer.getPass(scene, camera, null);
      }
      if (pass === null) {
        switch (this.type.toLowerCase()) {
          case 'adaptivetonemappingpass':
          case 'adaptivetonemapping':
            pass = new AdaptiveToneMappingPass(
              this.getAdaptive(),
              this.getResolution()
            );
            break;
          case 'afterimagepass':
          case 'afterimage':
            pass = new AfterimagePass(this.getDamp());
            break;
          case 'bloompass':
          case 'bloom':
            pass = new BloomPass(
              this.getStrength(),
              this.getKernelSize(),
              this.getSigma(),
              this.getResolution()
            );
            break;
          case 'bokehpass':
          case 'bokeh':
            pass = new BokehPass(this.getScene(scene), this.getCamera(camera), {
              focus: ThreeUtil.getTypeSafe(this.focus, 1.0),
              aspect: ThreeUtil.getTypeSafe(this.aspect, null),
              aperture: ThreeUtil.getTypeSafe(this.aperture, null),
              maxblur: ThreeUtil.getTypeSafe(this.maxblur, null),
              width: ThreeUtil.getTypeSafe(this.width, null),
              height: ThreeUtil.getTypeSafe(this.height, null),
            });
            break;
          case 'cubetexturepass':
          case 'cubetexture':
            pass = new CubeTexturePass(
              this.getCamera(camera) as THREE.PerspectiveCamera,
              this.getEnvMap(),
              this.getOpacity()
            );
            break;
          case 'dotscreenpass':
          case 'dotscreen':
            pass = new DotScreenPass(
              this.getCenter(),
              this.getAngle(),
              this.getScale()
            );
            break;
          case 'filmpass':
          case 'film':
            pass = new FilmPass(
              this.getNoiseIntensity(),
              this.getScanlinesIntensity(),
              this.getScanlinesCount(),
              this.getGrayscale()
            );
            break;
          case 'glitchpass':
          case 'glitch':
            const glitchpass = new GlitchPass(this.getDtSize());
            glitchpass.goWild = this.getGoWild(false);
            pass = glitchpass;
            break;
          case 'halftonepass':
          case 'halftone':
            pass = new HalftonePass(
              this.getWidth(),
              this.getHeight(),
              null // this.getParams(null)
            );
            break;
          case 'clearmaskpass':
          case 'clearmask':
            pass = new ClearMaskPass();
            break;
          case 'maskpass':
          case 'mask':
            const maskpass = new MaskPass(
              this.getScene(scene),
              this.getCamera(camera)
            );
            if (ThreeUtil.isNotNull(this.inverse)) {
              maskpass.inverse = ThreeUtil.getTypeSafe(this.inverse, false);
            }
            pass = maskpass;
            break;
          case 'outlinepass':
          case 'outline':
            const outlinePass = new OutlinePass(
              ThreeUtil.getVector2Safe(
                this.getWidth(1024),
                this.getHeight(1024)
              ),
              this.getScene(scene),
              this.getCamera(camera)
            );
            if (ThreeUtil.isNotNull(this.patternTexture)) {
              outlinePass.patternTexture = this.getPatternTexture();
            }
            if (ThreeUtil.isNotNull(this.selectedObjects)) {
              outlinePass.selectedObjects = this.getSelectedObjects();
            }
            if (ThreeUtil.isNotNull(this.visibleEdgeColor)) {
              outlinePass.visibleEdgeColor = ThreeUtil.getColorSafe(this.visibleEdgeColor, 0xffffff);
            }
            if (ThreeUtil.isNotNull(this.hiddenEdgeColor)) {
              outlinePass.hiddenEdgeColor = ThreeUtil.getColorSafe(this.hiddenEdgeColor, 0xffffff);
            }
            if (ThreeUtil.isNotNull(this.edgeGlow)) {
              outlinePass.edgeGlow = ThreeUtil.getTypeSafe(this.edgeGlow, 0);
            }
            if (ThreeUtil.isNotNull(this.usePatternTexture)) {
              outlinePass.usePatternTexture = ThreeUtil.getTypeSafe(this.usePatternTexture, false);
            }
            if (ThreeUtil.isNotNull(this.edgeThickness)) {
              outlinePass.edgeThickness = ThreeUtil.getTypeSafe(this.edgeThickness, 1.0);
            }
            if (ThreeUtil.isNotNull(this.edgeStrength)) {
              outlinePass.edgeStrength = ThreeUtil.getTypeSafe(this.edgeStrength, 3.0);
            }
            if (ThreeUtil.isNotNull(this.downSampleRatio)) {
              outlinePass.downSampleRatio = ThreeUtil.getTypeSafe(this.downSampleRatio, 2.0);
            }
            if (ThreeUtil.isNotNull(this.pulsePeriod)) {
              outlinePass.pulsePeriod = ThreeUtil.getTypeSafe(this.pulsePeriod, 0.0);
            }
            pass = outlinePass;
            break;
          case 'renderpass':
          case 'render':
            pass = new RenderPass(
              this.getScene(scene),
              this.getCamera(camera)
              //this.getOverrideMaterial(null),
              //new THREE.Color(this.getClearColor()),
              // this.getClearAlpha()
            );
            break;
          case 'saopass':
          case 'sao':
            pass = new SAOPass(
              this.getScene(scene),
              this.getCamera(camera),
              this.getDepthTexture(),
              this.getUseNormals(),
              null // this.getResolution()
            );
            break;
          case 'savepass':
          case 'save':
            pass = new SavePass(this.getRenderTarget());
            break;
          case 'shaderpass':
          case 'shader':
            const shaderPass = new ShaderPass(
              this.getShader(),
              this.getTextureId()
            );
            if (
              ThreeUtil.isNotNull(shaderPass.uniforms) &&
              ThreeUtil.isNotNull(this.uniforms)
            ) {
              Object.entries(shaderPass.uniforms).forEach(([key, value]) => {
                switch (key) {
                  case 'color':
                    if (this.uniforms['color'] !== null) {
                      shaderPass.uniforms[key].value = ThreeUtil.getColorSafe(
                        this.uniforms['color'],
                        shaderPass.uniforms[key].value
                      );
                    }
                    break;
                  case 'delta':
                    if (
                      this.uniforms['deltaX'] !== null ||
                      this.uniforms['deltaY'] !== null
                    ) {
                      shaderPass.uniforms[key].value = ThreeUtil.getVector2Safe(
                        this.uniforms['deltaX'],
                        this.uniforms['deltaY'],
                        shaderPass.uniforms[key].value
                      );
                    }
                    break;
                  case 'powRGB':
                    if (
                      this.uniforms['powRGBx'] !== null ||
                      this.uniforms['powRGBy'] !== null ||
                      this.uniforms['powRGBz'] !== null
                    ) {
                      shaderPass.uniforms[key].value = ThreeUtil.getVector3Safe(
                        this.uniforms['powRGBx'],
                        this.uniforms['powRGBy'],
                        this.uniforms['powRGBz'],
                        shaderPass.uniforms[key].value
                      );
                    }
                    break;
                  case 'mulRGB':
                    if (
                      this.uniforms['mulRGBx'] !== null ||
                      this.uniforms['mulRGBy'] !== null ||
                      this.uniforms['mulRGBz'] !== null
                    ) {
                      shaderPass.uniforms[key].value = ThreeUtil.getVector3Safe(
                        this.uniforms['mulRGBx'],
                        this.uniforms['mulRGBy'],
                        this.uniforms['mulRGBz'],
                        shaderPass.uniforms[key].value
                      );
                    }
                    break;
                  case 'resolution' :
                    shaderPass.uniforms[key].value = ThreeUtil.getVector2Safe(
                      this.uniforms['resolutionX'] || this.width | 1024,
                      this.uniforms['resolutionY'] || this.height | 1024,
                      shaderPass.uniforms[key].value
                    );
                    break;
                  case 'addRGB':
                    if (
                      this.uniforms['addRGBx'] !== null ||
                      this.uniforms['addRGBy'] !== null ||
                      this.uniforms['addRGBz'] !== null
                    ) {
                      shaderPass.uniforms[key].value = ThreeUtil.getVector3Safe(
                        this.uniforms['addRGBx'],
                        this.uniforms['addRGBy'],
                        this.uniforms['addRGBz'],
                        shaderPass.uniforms[key].value
                      );
                    }
                    break;

                  default:
                    if (
                      this.uniforms[key] !== null &&
                      this.uniforms[key] !== undefined
                    ) {
                      shaderPass.uniforms[key].value = ThreeUtil.getTypeSafe(
                        this.uniforms[key],
                        value['value'],
                        null
                      );
                    }
                    break;
                }
              });
            }
            pass = shaderPass;
            break;
          case 'smaapass':
          case 'smaa':
            pass = new SMAAPass(this.getWidth(), this.getHeight());
            break;
          case 'ssaarenderpass':
          case 'ssaarender':
            const ssaaRenderPass = new SSAARenderPass(
              this.getScene(scene),
              this.getCamera(camera),
              this.getClearColor(),
              this.getClearAlpha()
            );
            if (ThreeUtil.isNotNull(this.sampleLevel)) {
              ssaaRenderPass.sampleLevel = ThreeUtil.getTypeSafe(
                this.sampleLevel,
                4
              );
            }
            if (ThreeUtil.isNotNull(this.unbiased)) {
              ssaaRenderPass.unbiased = ThreeUtil.getTypeSafe(
                this.unbiased,
                true
              );
            }
            pass = ssaaRenderPass;
            break;
          case 'ssaopass':
          case 'ssao':
            pass = new SSAOPass(
              this.getScene(scene),
              this.getCamera(camera),
              this.getWidth(),
              this.getHeight()
            );
            break;
          case 'taarenderpass':
          case 'taarender':
            pass = new TAARenderPass(
              this.getScene(scene),
              this.getCamera(camera),
              this.getClearColor(),
              this.getClearAlpha()
            );
            break;
          case 'texturepass':
          case 'texture':
            pass = new TexturePass(
              this.getMap(effectComposer, camera, scene),
              this.getOpacity()
            );
            break;
          case 'taarenderpass':
          case 'taarender':
            pass = new UnrealBloomPass(
              null, //this.getResolution(),
              this.getStrength(),
              this.getRadius(),
              this.getThreshold()
            );
            break;
          case 'lutpass':
          case 'lut':
            const lutPass = new LUTPass({
              lut: null,
              intensity: this.getIntensity(),
            });
            lutPass.enabled = false;
            this.getLut((result) => {
              this.pass['lut'] = this.use2DLut
                ? result.texture
                : result.texture3D;
              this.pass.enabled = this.enabled;
            });
            pass = lutPass;
            break;
          case 'clearpass':
          case 'clear':
            pass = new ClearPass(this.getClearColor(), this.getClearAlpha());
            break;
          default:
            pass = null;
            break;
        }
        if (ThreeUtil.isNotNull(this.enabled)) {
          pass.enabled = this.getEnabled(true);
        }
        if (ThreeUtil.isNotNull(this.needsSwap)) {
          pass.needsSwap = this.getNeedsSwap(true);
        }
        if (ThreeUtil.isNotNull(this.clear)) {
          pass.clear = this.getClear(false);
        }
        if (ThreeUtil.isNotNull(this.renderToScreen)) {
          pass.renderToScreen = this.getRenderToScreen(false);
        }
      }
      if (ThreeUtil.isNotNull(this.pass)) {
        Object.assign(this.pass, pass);
      } else {
        this.pass = pass;
      }
      this.onLoad.emit(this);
    }
    if (this.pass !== null && effectComposer !== null) {
      if (effectComposer.passes.indexOf(this.pass) === -1) {
        this.effectComposer.addPass(this.pass);
      }
    }
    return this.pass;
  }
}
