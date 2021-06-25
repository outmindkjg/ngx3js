import * as THREE from 'three';
import { AfterimageShader } from 'three/examples/jsm/shaders/AfterimageShader';
import { BasicShader } from 'three/examples/jsm/shaders/BasicShader';
import { BleachBypassShader } from 'three/examples/jsm/shaders/BleachBypassShader';
import { BlendShader } from 'three/examples/jsm/shaders/BlendShader';
import { BokehShader } from 'three/examples/jsm/shaders/BokehShader';
import { BokehShader as BokehShader2 } from 'three/examples/jsm/shaders/BokehShader2';
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
import { GodRaysCombineShader, GodRaysDepthMaskShader, GodRaysFakeSunShader, GodRaysGenerateShader } from 'three/examples/jsm/shaders/GodRaysShader';
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
import { SMAABlendShader, SMAAEdgesShader, SMAAWeightsShader } from 'three/examples/jsm/shaders/SMAAShader';
import { SobelOperatorShader } from 'three/examples/jsm/shaders/SobelOperatorShader';
import { SSAOShader } from 'three/examples/jsm/shaders/SSAOShader';
import { SubsurfaceScatteringShader } from 'three/examples/jsm/shaders/SubsurfaceScatteringShader';
import { TechnicolorShader } from 'three/examples/jsm/shaders/TechnicolorShader';
import { ToneMapShader } from 'three/examples/jsm/shaders/ToneMapShader';
import { ToonShader1, ToonShader2 } from 'three/examples/jsm/shaders/ToonShader';
import { TriangleBlurShader } from 'three/examples/jsm/shaders/TriangleBlurShader';
import { UnpackDepthRGBAShader } from 'three/examples/jsm/shaders/UnpackDepthRGBAShader';
import { VerticalBlurShader } from 'three/examples/jsm/shaders/VerticalBlurShader';
import { VerticalTiltShiftShader } from 'three/examples/jsm/shaders/VerticalTiltShiftShader';
import { VignetteShader } from 'three/examples/jsm/shaders/VignetteShader';
import { VolumeRenderShader1 } from 'three/examples/jsm/shaders/VolumeShader';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';
import { ThreeUtil } from '../../interface';
import { AttributesParticles } from './shader.attributes_particles';
import { AudioVisualizer } from './shader.audio_visualizer';
import { CloudShader } from './shader.cloud';
import { ColorRandom } from './shader.color_random';
import { ColorScreen } from './shader.color_screen';
import { CustomAttributes } from './shader.custom_attributes';
import { CustomAttributesLines } from './shader.custom_attributes_lines';
import { CustomAttributesPoints } from './shader.custom_attributes_points';
import { ShaderDemo1 } from './shader.demo1';
import { ShaderDemo2 } from './shader.demo2';
import { ShaderDemo3 } from './shader.demo3';
import { ShaderDemo4 } from './shader.demo4';
import { BufferGeometryInstancing } from './shader.instancing';
import { ShaderLava } from './shader.lava';
import { LightsHemisphere } from './shader.lights_hemisphere';
import { ModifierTessellation } from './shader.modifier_tessellation';
import { PerlinShader } from './shader.perlin';
import { PointsWaves } from './shader.points_waves';
import { SelectiveDraw } from './shader.selective_draw';
import { VideoKinect } from './shader.video_kinect';
import { WireFrame } from './shader.wireframe';

export interface ShaderType {
  defines?: {
    [key: string]: any;
  };
  uniforms: {
    [key: string]: THREE.IUniform;
  };
  fragmentShader: string;
  vertexShader?: string;
}
export const ShaderAliasConf: {
  [key: string]: string;
} = {};
export const ShaderConf: {
  [key: string]: ShaderType | string;
} = {
  horizontalblurshader: HorizontalBlurShader,
  horizontalblur: 'horizontalblurshader',
  smaaedgesshader: SMAAEdgesShader,
  smaaedges: 'smaaedgesshader',
  smaaweightsshader: SMAAWeightsShader,
  smaaweights: 'smaaweightsshader',
  smaablendshader: SMAABlendShader,
  smaablend: 'smaablendshader',
  focusshader: FocusShader,
  focus: 'focusshader',
  verticalblurshader: VerticalBlurShader,
  verticalblur: 'verticalblurshader',
  godraysdepthmaskshader: GodRaysDepthMaskShader,
  godraysdepthmask: 'godraysdepthmaskshader',
  godraysgenerateshader: GodRaysGenerateShader,
  godraysgenerate: 'godraysgenerateshader',
  godrayscombineshader: GodRaysCombineShader,
  godrayscombine: 'godrayscombineshader',
  godraysfakesunshader: GodRaysFakeSunShader,
  godraysfakesun: 'godraysfakesunshader',
  fresnelshader: FresnelShader,
  fresnel: 'fresnelshader',
  depthlimitedblurshader: DepthLimitedBlurShader,
  depthlimitedblur: 'depthlimitedblurshader',
  convolutionshader: ConvolutionShader,
  convolution: 'convolutionshader',
  basicshader: BasicShader,
  basic: 'basicshader',
  sepiashader: SepiaShader,
  sepia: 'sepiashader',
  rgbshiftshader: RGBShiftShader,
  rgbshift: 'rgbshiftshader',
  mirrorshader: MirrorShader,
  mirror: 'mirrorshader',
  bleachbypassshader: BleachBypassShader,
  bleachbypass: 'bleachbypassshader',
  toonshader: ToonShader1,
  toon: 'toonshader',
  toon1shader: ToonShader1,
  toon1: 'toon1shader',
  toon2shader: ToonShader2,
  toon2: 'toon2shader',
  colorcorrectionshader: ColorCorrectionShader,
  colorcorrection: 'colorcorrectionshader',
  blendshader: BlendShader,
  blend: 'blendshader',
  oceansubtransformshader: OceanShaders.ocean_subtransform,
  oceansubtransform: 'oceansubtransformshader',
  oceaninitialspectrumshader: OceanShaders.ocean_initial_spectrum,
  oceaninitialspectrum: 'oceaninitialspectrumshader',
  oceanphaseshader: OceanShaders.ocean_phase,
  oceanphase: 'oceanphaseshader',
  oceanspectrumshader: OceanShaders.ocean_spectrum,
  oceanspectrum: 'oceanspectrumshader',
  oceannormalsshader: OceanShaders.ocean_normals,
  oceannormals: 'oceannormalsshader',
  oceanmainshader: OceanShaders.ocean_main,
  oceanmain: 'oceanmainshader',
  halftoneshader: HalftoneShader,
  halftone: 'halftoneshader',
  technicolorshader: TechnicolorShader,
  technicolor: 'technicolorshader',
  gammacorrectionshader: GammaCorrectionShader,
  gammacorrection: 'gammacorrectionshader',
  tonemapshader: ToneMapShader,
  tonemap: 'tonemapshader',
  dotscreenshader: DotScreenShader,
  dotscreen: 'dotscreenshader',
  unpackdepthrgbashader: UnpackDepthRGBAShader,
  unpackdepthrgba: 'unpackdepthrgbashader',
  subsurfacescatteringshader: SubsurfaceScatteringShader,
  subsurfacescattering: 'subsurfacescatteringshader',
  digitalglitchshader: DigitalGlitch,
  digitalglitch: 'digitalglitchshader',
  fxaashader: FXAAShader,
  fxaa: 'fxaashader',
  dofmipmapshader: DOFMipMapShader,
  dofmipmap: 'dofmipmapshader',
  freichenshader: FreiChenShader,
  freichen: 'freichenshader',
  brightnesscontrastshader: BrightnessContrastShader,
  brightnesscontrast: 'brightnesscontrastshader',
  pixelshader: PixelShader,
  pixel: 'pixelshader',
  copyshader: CopyShader,
  copy: 'copyshader',
  saoshader: SAOShader,
  sao: 'saoshader',
  horizontaltiltshiftshader: HorizontalTiltShiftShader,
  horizontaltiltshift: 'horizontaltiltshiftshader',
  parallaxshader: ParallaxShader,
  parallax: 'parallaxshader',
  luminosityshader: LuminosityShader,
  luminosity: 'luminosityshader',
  huesaturationshader: HueSaturationShader,
  huesaturation: 'huesaturationshader',
  luminosityhighpassshader: LuminosityHighPassShader,
  luminosityhighpass: 'luminosityhighpassshader',
  bokehshader: BokehShader,
  bokeh: 'bokehshader',
  filmshader: FilmShader,
  film: 'filmshader',
  volumerender1shader: VolumeRenderShader1,
  volumerender1: 'volumerender1shader',
  verticaltiltshiftshader: VerticalTiltShiftShader,
  verticaltiltshift: 'verticaltiltshiftshader',
  kaleidoshader: KaleidoShader,
  kaleido: 'kaleidoshader',
  colorifyshader: ColorifyShader,
  colorify: 'colorifyshader',
  ssaoshader: SSAOShader,
  ssao: 'ssaoshader',
  waterrefractionshader: WaterRefractionShader,
  waterrefraction: 'waterrefractionshader',
  bokeh2shader: BokehShader2,
  bokeh2: 'bokeh2shader',
  normalmapshader: NormalMapShader,
  normalmap: 'normalmapshader',
  afterimageshader: AfterimageShader,
  afterimage: 'afterimageshader',
  vignetteshader: VignetteShader,
  vignette: 'vignetteshader',
  triangleblurshader: TriangleBlurShader,
  triangleblur: 'triangleblurshader',
  sobeloperatorshader: SobelOperatorShader,
  sobeloperator: 'sobeloperatorshader',
  cloudshader: CloudShader,
  cloud: 'cloudshader',
  audiovisualizershader: AudioVisualizer,
  audiovisualizer: 'audiovisualizershader',
  wireframeshader: WireFrame,
  wireframe: 'wireframeshader',
  lightshemisphereshader: LightsHemisphere,
  lightshemisphere: 'lightshemisphereshader',
  attributesparticlesshader: AttributesParticles,
  attributesparticles: 'attributesparticlesshader',
  instancingshader: BufferGeometryInstancing,
  instancing: 'instancingshader',
  perlinshader: PerlinShader,
  perlin: 'perlinshader',
  pointswavesshader : PointsWaves,
  pointswaves : "pointswavesshader",
  modifiertessellationshader : ModifierTessellation,
  modifiertessellation : "modifiertessellationshader",
  selectivedrawshader : SelectiveDraw,
  selectivedraw : "selectivedrawshader",
  customattributesshader : CustomAttributes,
  customattributes : "customattributesshader",
  customattributeslinesshader : CustomAttributesLines,
  customattributeslines : "customattributeslinesshader",
  attributeslines : "customattributeslinesshader",
  customattributespointsshader : CustomAttributesPoints,
  customattributespoints : "customattributespointsshader",
  attributespoints : "customattributespointsshader",
  lavashader : ShaderLava,
  shaderlava : "lavashader",
  lava : "lavashader",
  videokinectshader : VideoKinect,
  videokinect : "videokinectshader",

  demo1shader : ShaderDemo1,
  shaderdemo1 : "demo1shader",
  demo1 : "demo1shader",

  demo2shader : ShaderDemo2,
  shaderdemo2 : "demo2shader",
  demo2 : "demo2shader",

  demo3shader : ShaderDemo3,
  shaderdemo3 : "demo3shader",
  demo3 : "demo3shader",

  demo4shader : ShaderDemo4,
  shaderdemo4 : "demo4shader",
  demo4 : "demo4shader",
  colorrandomshader : ColorRandom,
  colorrandom : "colorrandomshader",
  colorscreenshader : ColorScreen,
  colorscreen : "colorscreenshader"
};

export class ShaderUtils {
  static addShader(key: string, shader: ShaderType, alias?: string[]) {
    key = key.toLowerCase();
    if (ThreeUtil.isNotNull(alias)) {
      alias.forEach((aliasKey) => {
        if (aliasKey !== null && aliasKey.length > 3) {
          ShaderConf[aliasKey.toLowerCase()] = key;
        }
      });
    }
    ShaderConf[key] = shader;
  }

  static getShader(key: string | ShaderType): ShaderType {
    if (typeof key === 'string') {
      if (ThreeUtil.isNotNull(ShaderConf[key.toLowerCase()])) {
        const shader = ShaderConf[key.toLowerCase()];
        if (typeof shader === 'string') {
          return this.getShader(shader);
        } else {
          return shader;
        }
      } else {
        console.error('unknown shader :' + key);
        return {
          uniforms: {},
          fragmentShader: '',
        };
      }
    } else {
      return {
        defines: key.defines,
        uniforms: key.defines,
        vertexShader: key.vertexShader,
        fragmentShader: key.fragmentShader,
      };
    }
  }
  static getShaderClone(key: string): ShaderType {
    const shader = this.getShader(key);
    return {
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      uniforms: THREE.UniformsUtils.clone(shader.uniforms),
      defines: ThreeUtil.isNotNull(shader.defines) ? THREE.UniformsUtils.clone(shader.defines) : undefined,
    };
  }

  static getFragmentShader(key: string | ShaderType): string {
    if (typeof key === 'string' && !/^[a-zA-Z0-9]+$/.test(key)) {
      return key;
    } else {
      return this.getShader(key).fragmentShader;
    }
  }

  static getVertexShader(key: string | ShaderType): string {
    if (typeof key === 'string' && !/^[a-zA-Z0-9]+$/.test(key)) {
      return key;
    } else {
      return this.getShader(key).vertexShader;
    }
  }

  static getUniforms(key: string | ShaderType): { [key: string]: THREE.IUniform } {
    if (ThreeUtil.isNotNull(key)) {
      if (typeof key === 'string') {
        if (ThreeUtil.isNotNull(key) && key !== '') {
          return THREE.UniformsUtils.clone(this.getShader(key).uniforms);
        }
      } else if (ThreeUtil.isNotNull(key.uniforms)) {
        return THREE.UniformsUtils.clone(key.uniforms);
      }
    }
    return {};
  }

  static checkShader() {
    const shaderList: string[] = [];
    Object.entries(ShaderConf).forEach(([key, value]) => {
      shaderList.push(key.toLowerCase() + ' : ' + key);
    });
    console.log(shaderList.join(',\n'));
  }
}
