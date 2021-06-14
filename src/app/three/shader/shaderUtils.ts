import * as THREE from 'three';
import { AfterimageShader } from "three/examples/jsm/shaders/AfterimageShader";
import { BasicShader } from "three/examples/jsm/shaders/BasicShader";
import { BleachBypassShader } from "three/examples/jsm/shaders/BleachBypassShader";
import { BlendShader } from "three/examples/jsm/shaders/BlendShader";
import { BokehShader } from "three/examples/jsm/shaders/BokehShader";
import { BokehShader as BokehShader2 } from "three/examples/jsm/shaders/BokehShader2";
import { BrightnessContrastShader } from "three/examples/jsm/shaders/BrightnessContrastShader";
import { ColorCorrectionShader } from "three/examples/jsm/shaders/ColorCorrectionShader";
import { ColorifyShader } from "three/examples/jsm/shaders/ColorifyShader";
import { ConvolutionShader } from "three/examples/jsm/shaders/ConvolutionShader";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { DepthLimitedBlurShader } from "three/examples/jsm/shaders/DepthLimitedBlurShader";
import { DigitalGlitch } from "three/examples/jsm/shaders/DigitalGlitch";
import { DOFMipMapShader } from "three/examples/jsm/shaders/DOFMipMapShader";
import { DotScreenShader } from "three/examples/jsm/shaders/DotScreenShader";
import { FilmShader } from "three/examples/jsm/shaders/FilmShader";
import { FocusShader } from "three/examples/jsm/shaders/FocusShader";
import { FreiChenShader } from "three/examples/jsm/shaders/FreiChenShader";
import { FresnelShader } from "three/examples/jsm/shaders/FresnelShader";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader";
import { GammaCorrectionShader } from "three/examples/jsm/shaders/GammaCorrectionShader";
import { GodRaysCombineShader, GodRaysDepthMaskShader, GodRaysFakeSunShader, GodRaysGenerateShader } from "three/examples/jsm/shaders/GodRaysShader";
import { HalftoneShader } from "three/examples/jsm/shaders/HalftoneShader";
import { HorizontalBlurShader } from "three/examples/jsm/shaders/HorizontalBlurShader";
import { HorizontalTiltShiftShader } from "three/examples/jsm/shaders/HorizontalTiltShiftShader";
import { HueSaturationShader } from "three/examples/jsm/shaders/HueSaturationShader";
import { KaleidoShader } from "three/examples/jsm/shaders/KaleidoShader";
import { LuminosityHighPassShader } from "three/examples/jsm/shaders/LuminosityHighPassShader";
import { LuminosityShader } from "three/examples/jsm/shaders/LuminosityShader";
import { MirrorShader } from "three/examples/jsm/shaders/MirrorShader";
import { NormalMapShader } from "three/examples/jsm/shaders/NormalMapShader";
import { OceanShaders } from "three/examples/jsm/shaders/OceanShaders";
import { ParallaxShader } from "three/examples/jsm/shaders/ParallaxShader";
import { PixelShader } from "three/examples/jsm/shaders/PixelShader";
import { RGBShiftShader } from "three/examples/jsm/shaders/RGBShiftShader";
import { SAOShader } from "three/examples/jsm/shaders/SAOShader";
import { SepiaShader } from "three/examples/jsm/shaders/SepiaShader";
import { SMAABlendShader, SMAAEdgesShader, SMAAWeightsShader } from "three/examples/jsm/shaders/SMAAShader";
import { SobelOperatorShader } from "three/examples/jsm/shaders/SobelOperatorShader";
import { SSAOShader } from "three/examples/jsm/shaders/SSAOShader";
import { SubsurfaceScatteringShader } from "three/examples/jsm/shaders/SubsurfaceScatteringShader";
import { TechnicolorShader } from "three/examples/jsm/shaders/TechnicolorShader";
import { ToneMapShader } from "three/examples/jsm/shaders/ToneMapShader";
import { ToonShader1, ToonShader2 } from "three/examples/jsm/shaders/ToonShader";
import { TriangleBlurShader } from "three/examples/jsm/shaders/TriangleBlurShader";
import { UnpackDepthRGBAShader } from "three/examples/jsm/shaders/UnpackDepthRGBAShader";
import { VerticalBlurShader } from "three/examples/jsm/shaders/VerticalBlurShader";
import { VerticalTiltShiftShader } from "three/examples/jsm/shaders/VerticalTiltShiftShader";
import { VignetteShader } from "three/examples/jsm/shaders/VignetteShader";
import { VolumeRenderShader1 } from "three/examples/jsm/shaders/VolumeShader";
import { WaterRefractionShader } from "three/examples/jsm/shaders/WaterRefractionShader";
import { ThreeUtil } from "../interface";
import { AudioVisualizer } from './shader.audioVisualizer';
import { CloudShader } from './shader.cloud';
import { PerlinShader } from './shader.perlin';

export interface ShaderType {
  defines? : {
    [key : string] : any
  }
  uniforms: {
    [key:string]: THREE.IUniform;
  };
  fragmentShader: string;
  vertexShader?: string;
}

export const ShaderConf : {
  [key : string] : ShaderType
} = {
  horizontalblurshader : HorizontalBlurShader,
  smaaedgesshader : SMAAEdgesShader,
  smaaweightsshader : SMAAWeightsShader,
  smaablendshader : SMAABlendShader,
  focusshader : FocusShader,
  verticalblurshader : VerticalBlurShader,
  godraysdepthmaskshader : GodRaysDepthMaskShader,
  godraysgenerateshader : GodRaysGenerateShader,
  godrayscombineshader : GodRaysCombineShader,
  godraysfakesunshader : GodRaysFakeSunShader,
  fresnelshader : FresnelShader,
  depthlimitedblurshader : DepthLimitedBlurShader,
  convolutionshader : ConvolutionShader,
  basicshader : BasicShader,
  sepiashader : SepiaShader,
  rgbshiftshader : RGBShiftShader,
  mirrorshader : MirrorShader,
  bleachbypassshader : BleachBypassShader,
  toonshader : ToonShader1,
  toonshader1 : ToonShader1,
  toonshader2 : ToonShader2,
  colorcorrectionshader : ColorCorrectionShader,
  blendshader : BlendShader,
  oceansubtransform : OceanShaders.ocean_subtransform,
  oceaninitialspectrum : OceanShaders.ocean_initial_spectrum,
  oceanphase : OceanShaders.ocean_phase,
  oceanspectrum : OceanShaders.ocean_spectrum,
  oceannormals : OceanShaders.ocean_normals,
  oceanmain : OceanShaders.ocean_main,
  halftoneshader : HalftoneShader,
  technicolorshader : TechnicolorShader,
  gammacorrectionshader : GammaCorrectionShader,
  tonemapshader : ToneMapShader,
  dotscreenshader : DotScreenShader,
  unpackdepthrgbashader : UnpackDepthRGBAShader,
  subsurfacescatteringshader : SubsurfaceScatteringShader,
  digitalglitch : DigitalGlitch,
  fxaashader : FXAAShader,
  dofmipmapshader : DOFMipMapShader,
  freichenshader : FreiChenShader,
  brightnesscontrastshader : BrightnessContrastShader,
  pixelshader : PixelShader,
  copyshader : CopyShader,
  saoshader : SAOShader,
  horizontaltiltshiftshader : HorizontalTiltShiftShader,
  parallaxshader : ParallaxShader,
  luminosityshader : LuminosityShader,
  huesaturationshader : HueSaturationShader,
  luminosityhighpassshader : LuminosityHighPassShader,
  bokehshader : BokehShader,
  filmshader : FilmShader,
  volumeshader : VolumeRenderShader1,
  volumerendershader1 : VolumeRenderShader1,
  verticaltiltshiftshader : VerticalTiltShiftShader,
  kaleidoshader : KaleidoShader,
  colorifyshader : ColorifyShader,
  ssaoshader : SSAOShader,
  waterrefractionshader : WaterRefractionShader,
  bokehshader2 : BokehShader2,
  normalmapshader : NormalMapShader,
  afterimageshader : AfterimageShader,
  vignetteshader : VignetteShader,
  triangleblurshader : TriangleBlurShader,
  sobeloperatorshader : SobelOperatorShader,
  cloudshader : CloudShader,
  audiovisualizer : AudioVisualizer,
  perlinshader : PerlinShader
}

export  class ShaderUtils {
  static addShader(key : string , shader : ShaderType) {
    ShaderConf[key.toLowerCase()] = shader;   
  }

  static getShader(key : string | ShaderType) :ShaderType {
    if (typeof key === 'string') {
      if (ThreeUtil.isNotNull(ShaderConf[key.toLowerCase()])) {
        return ShaderConf[key.toLowerCase()];
      } else {
        console.error('unknown shader :' + key);
        return {
          uniforms : {},
          fragmentShader : '',
        }
      }
    } else {
      return {
        defines : key.defines,
        uniforms : key.defines,
        vertexShader : key.vertexShader,
        fragmentShader : key.fragmentShader
      }
    }
  }
  static getShaderClone(key : string) :ShaderType {
    const shader = this.getShader(key);
    return {
      vertexShader : shader.vertexShader,
      fragmentShader : shader.fragmentShader,
      uniforms : THREE.UniformsUtils.clone(shader.uniforms),
      defines : ThreeUtil.isNotNull(shader.defines) ? THREE.UniformsUtils.clone(shader.defines) : undefined
    }
  }

  static getFragmentShader(key : string | ShaderType) : string {
    if (typeof key === 'string' && !/^[a-zA-Z0-9]+$/.test(key)) {
      return key;
    } else {
      return this.getShader(key).fragmentShader;
    }
  }

  static getVertexShader(key : string | ShaderType) : string {
    if (typeof key === 'string' && !/^[a-zA-Z0-9]+$/.test(key)) {
      return key;
    } else {
      return this.getShader(key).vertexShader;
    }
  }

  static getUniforms(key : string | ShaderType) : { [key:string]: THREE.IUniform; } {
    if (ThreeUtil.isNotNull(key)) {
      if (typeof key === 'string') {
        if (ThreeUtil.isNotNull(key) && key !== '') {
          return THREE.UniformsUtils.clone(this.getShader(key).uniforms);
        }
      } else if (ThreeUtil.isNotNull(key.uniforms)) {
        return THREE.UniformsUtils.clone(key.uniforms);
      }
    }
    return {}
  }

  static checkShader() {
    const shaderList : string[] = [];
    Object.entries(ShaderConf).forEach(([key, value]) => {
      shaderList.push(key.toLowerCase() + ' : ' + key);
    })
    console.log(shaderList.join(',\n'));
  }

}