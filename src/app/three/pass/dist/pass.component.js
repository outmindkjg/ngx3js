"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PassComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var AdaptiveToneMappingPass_1 = require("three/examples/jsm/postprocessing/AdaptiveToneMappingPass");
var AfterimagePass_1 = require("three/examples/jsm/postprocessing/AfterimagePass");
var BloomPass_1 = require("three/examples/jsm/postprocessing/BloomPass");
var BokehPass_1 = require("three/examples/jsm/postprocessing/BokehPass");
var ClearPass_1 = require("three/examples/jsm/postprocessing/ClearPass");
var CubeTexturePass_1 = require("three/examples/jsm/postprocessing/CubeTexturePass");
var DotScreenPass_1 = require("three/examples/jsm/postprocessing/DotScreenPass");
var FilmPass_1 = require("three/examples/jsm/postprocessing/FilmPass");
var GlitchPass_1 = require("three/examples/jsm/postprocessing/GlitchPass");
var HalftonePass_1 = require("three/examples/jsm/postprocessing/HalftonePass");
var MaskPass_1 = require("three/examples/jsm/postprocessing/MaskPass");
var OutlinePass_1 = require("three/examples/jsm/postprocessing/OutlinePass");
var RenderPass_1 = require("three/examples/jsm/postprocessing/RenderPass");
var SAOPass_1 = require("three/examples/jsm/postprocessing/SAOPass");
var SavePass_1 = require("three/examples/jsm/postprocessing/SavePass");
var ShaderPass_1 = require("three/examples/jsm/postprocessing/ShaderPass");
var SMAAPass_1 = require("three/examples/jsm/postprocessing/SMAAPass");
var SSAARenderPass_1 = require("three/examples/jsm/postprocessing/SSAARenderPass");
var SSAOPass_1 = require("three/examples/jsm/postprocessing/SSAOPass");
var TAARenderPass_1 = require("three/examples/jsm/postprocessing/TAARenderPass");
var TexturePass_1 = require("three/examples/jsm/postprocessing/TexturePass");
var UnrealBloomPass_1 = require("three/examples/jsm/postprocessing/UnrealBloomPass");
var AfterimageShader_1 = require("three/examples/jsm/shaders/AfterimageShader");
var BasicShader_1 = require("three/examples/jsm/shaders/BasicShader");
var BleachBypassShader_1 = require("three/examples/jsm/shaders/BleachBypassShader");
var BlendShader_1 = require("three/examples/jsm/shaders/BlendShader");
var BokehShader_1 = require("three/examples/jsm/shaders/BokehShader");
var BrightnessContrastShader_1 = require("three/examples/jsm/shaders/BrightnessContrastShader");
var ColorCorrectionShader_1 = require("three/examples/jsm/shaders/ColorCorrectionShader");
var ColorifyShader_1 = require("three/examples/jsm/shaders/ColorifyShader");
var ConvolutionShader_1 = require("three/examples/jsm/shaders/ConvolutionShader");
var CopyShader_1 = require("three/examples/jsm/shaders/CopyShader");
var DepthLimitedBlurShader_1 = require("three/examples/jsm/shaders/DepthLimitedBlurShader");
var DigitalGlitch_1 = require("three/examples/jsm/shaders/DigitalGlitch");
var DOFMipMapShader_1 = require("three/examples/jsm/shaders/DOFMipMapShader");
var DotScreenShader_1 = require("three/examples/jsm/shaders/DotScreenShader");
var FilmShader_1 = require("three/examples/jsm/shaders/FilmShader");
var FocusShader_1 = require("three/examples/jsm/shaders/FocusShader");
var FreiChenShader_1 = require("three/examples/jsm/shaders/FreiChenShader");
var FresnelShader_1 = require("three/examples/jsm/shaders/FresnelShader");
var FXAAShader_1 = require("three/examples/jsm/shaders/FXAAShader");
var GammaCorrectionShader_1 = require("three/examples/jsm/shaders/GammaCorrectionShader");
var GodRaysShader_1 = require("three/examples/jsm/shaders/GodRaysShader");
var HalftoneShader_1 = require("three/examples/jsm/shaders/HalftoneShader");
var HorizontalBlurShader_1 = require("three/examples/jsm/shaders/HorizontalBlurShader");
var HorizontalTiltShiftShader_1 = require("three/examples/jsm/shaders/HorizontalTiltShiftShader");
var HueSaturationShader_1 = require("three/examples/jsm/shaders/HueSaturationShader");
var KaleidoShader_1 = require("three/examples/jsm/shaders/KaleidoShader");
var LuminosityHighPassShader_1 = require("three/examples/jsm/shaders/LuminosityHighPassShader");
var LuminosityShader_1 = require("three/examples/jsm/shaders/LuminosityShader");
var MirrorShader_1 = require("three/examples/jsm/shaders/MirrorShader");
var NormalMapShader_1 = require("three/examples/jsm/shaders/NormalMapShader");
var OceanShaders_1 = require("three/examples/jsm/shaders/OceanShaders");
var ParallaxShader_1 = require("three/examples/jsm/shaders/ParallaxShader");
var PixelShader_1 = require("three/examples/jsm/shaders/PixelShader");
var RGBShiftShader_1 = require("three/examples/jsm/shaders/RGBShiftShader");
var SAOShader_1 = require("three/examples/jsm/shaders/SAOShader");
var SepiaShader_1 = require("three/examples/jsm/shaders/SepiaShader");
var SMAAShader_1 = require("three/examples/jsm/shaders/SMAAShader");
var SobelOperatorShader_1 = require("three/examples/jsm/shaders/SobelOperatorShader");
var SSAOShader_1 = require("three/examples/jsm/shaders/SSAOShader");
var SubsurfaceScatteringShader_1 = require("three/examples/jsm/shaders/SubsurfaceScatteringShader");
var TechnicolorShader_1 = require("three/examples/jsm/shaders/TechnicolorShader");
var ToneMapShader_1 = require("three/examples/jsm/shaders/ToneMapShader");
var ToonShader_1 = require("three/examples/jsm/shaders/ToonShader");
var TriangleBlurShader_1 = require("three/examples/jsm/shaders/TriangleBlurShader");
var UnpackDepthRGBAShader_1 = require("three/examples/jsm/shaders/UnpackDepthRGBAShader");
var VerticalBlurShader_1 = require("three/examples/jsm/shaders/VerticalBlurShader");
var VerticalTiltShiftShader_1 = require("three/examples/jsm/shaders/VerticalTiltShiftShader");
var VignetteShader_1 = require("three/examples/jsm/shaders/VignetteShader");
var VolumeShader_1 = require("three/examples/jsm/shaders/VolumeShader");
var WaterRefractionShader_1 = require("three/examples/jsm/shaders/WaterRefractionShader");
var interface_1 = require("../interface");
var PassComponent = /** @class */ (function () {
    function PassComponent() {
        this.type = '';
        this.refer = null;
        this.enabled = null;
        this.needsSwap = null;
        this.clear = null;
        this.renderToScreen = null;
        this.adaptive = null;
        this.resolution = null;
        this.damp = null;
        this.strength = null;
        this.kernelSize = null;
        this.sigma = null;
        this.scene = null;
        this.camera = null;
        this.params = null;
        this.clearColor = null;
        this.clearAlpha = null;
        this.envMap = null;
        this.opacity = null;
        this.centerX = null;
        this.centerY = null;
        this.angle = null;
        this.scale = null;
        this.noiseIntensity = null;
        this.scanlinesIntensity = null;
        this.scanlinesCount = null;
        this.grayscale = null;
        this.dtSize = null;
        this.width = null;
        this.height = null;
        this.selectedObjects = null;
        this.overrideMaterial = null;
        this.depthTexture = null;
        this.useNormals = null;
        this.renderTarget = null;
        this.shader = null;
        this.textureID = null;
        this.map = null;
        this.radius = null;
        this.threshold = null;
        this.goWild = null;
        this.uniforms = null;
        this.cameraComponent = null;
        this.pass = null;
    }
    PassComponent.prototype.getEnabled = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.enabled, def);
    };
    PassComponent.prototype.getNeedsSwap = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.needsSwap, def);
    };
    PassComponent.prototype.getClear = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clear, def);
    };
    PassComponent.prototype.getRenderToScreen = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.renderToScreen, def);
    };
    PassComponent.prototype.getAdaptive = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.adaptive, def);
    };
    PassComponent.prototype.getResolution = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.resolution, def);
    };
    PassComponent.prototype.getDamp = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.damp, def);
    };
    PassComponent.prototype.getStrength = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.strength, def);
    };
    PassComponent.prototype.getKernelSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.kernelSize, def);
    };
    PassComponent.prototype.getSigma = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.sigma, def);
    };
    PassComponent.prototype.getScene = function (def) {
        var scene = interface_1.ThreeUtil.getTypeSafe(this.scene, def);
        if (interface_1.ThreeUtil.isNotNull(scene)) {
            if (scene instanceof THREE.Scene) {
                return scene;
            }
            else {
                return scene.getScene();
            }
        }
        else {
            return new THREE.Scene();
        }
    };
    PassComponent.prototype.getCamera = function (def) {
        var camera = interface_1.ThreeUtil.getTypeSafe(this.camera, def);
        if (interface_1.ThreeUtil.isNotNull(camera)) {
            if (camera instanceof THREE.Camera) {
                return camera;
            }
            else {
                return camera.getScene();
            }
        }
        else {
            return new THREE.Camera();
        }
    };
    PassComponent.prototype.getParams = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.params, def);
    };
    PassComponent.prototype.getClearColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.clearColor, def);
    };
    PassComponent.prototype.getClearAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clearAlpha, def);
    };
    PassComponent.prototype.getEnvMap = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.envMap, def);
    };
    PassComponent.prototype.getOpacity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.opacity, def);
    };
    PassComponent.prototype.getCenter = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.centerX, this.centerY, def);
    };
    PassComponent.prototype.getAngle = function (def) {
        return interface_1.ThreeUtil.getAngleSafe(this.angle, def);
    };
    PassComponent.prototype.getScale = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.scale, def);
    };
    PassComponent.prototype.getNoiseIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.noiseIntensity, def);
    };
    PassComponent.prototype.getScanlinesIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.scanlinesIntensity, def);
    };
    PassComponent.prototype.getScanlinesCount = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.scanlinesCount, def);
    };
    PassComponent.prototype.getGrayscale = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.grayscale, def);
    };
    PassComponent.prototype.getDtSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.dtSize, def);
    };
    PassComponent.prototype.getWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.width, def);
    };
    PassComponent.prototype.getHeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.height, def);
    };
    PassComponent.prototype.getSelectedObjects = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.selectedObjects, def);
    };
    PassComponent.prototype.getOverrideMaterial = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.overrideMaterial, def);
    };
    PassComponent.prototype.getDepthTexture = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.depthTexture, def);
    };
    PassComponent.prototype.getUseNormals = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.useNormals, def);
    };
    PassComponent.prototype.getRenderTarget = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.renderTarget, def);
    };
    PassComponent.prototype.getShader = function (def) {
        var _this = this;
        var shader = interface_1.ThreeUtil.getTypeSafe(this.shader, def, '');
        var shaderUniforms = null;
        switch (shader.toLowerCase()) {
            case 'afterimage':
                shaderUniforms = AfterimageShader_1.AfterimageShader;
                break;
            case 'basic':
                shaderUniforms = BasicShader_1.BasicShader;
                break;
            case 'bleachbypass':
                shaderUniforms = BleachBypassShader_1.BleachBypassShader;
                break;
            case 'blend':
                shaderUniforms = BlendShader_1.BlendShader;
                break;
            case 'bokeh':
                shaderUniforms = BokehShader_1.BokehShader;
                break;
            case 'bokeh':
                shaderUniforms = BokehShader_1.BokehShader;
                break;
            case 'brightnesscontrast':
                shaderUniforms = BrightnessContrastShader_1.BrightnessContrastShader;
                break;
            case 'colorcorrection':
                shaderUniforms = ColorCorrectionShader_1.ColorCorrectionShader;
                break;
            case 'colorify':
                shaderUniforms = ColorifyShader_1.ColorifyShader;
                break;
            case 'convolution':
                shaderUniforms = ConvolutionShader_1.ConvolutionShader;
                break;
            case 'copy':
                shaderUniforms = CopyShader_1.CopyShader;
                break;
            case 'depthlimitedblur':
                shaderUniforms = DepthLimitedBlurShader_1.DepthLimitedBlurShader;
                break;
            case 'digitalglitch':
                shaderUniforms = DigitalGlitch_1.DigitalGlitch;
                break;
            case 'dofmipmap':
                shaderUniforms = DOFMipMapShader_1.DOFMipMapShader;
                break;
            case 'dotscreen':
                shaderUniforms = DotScreenShader_1.DotScreenShader;
                break;
            case 'film':
                shaderUniforms = FilmShader_1.FilmShader;
                break;
            case 'focus':
                shaderUniforms = FocusShader_1.FocusShader;
                break;
            case 'freichen':
                shaderUniforms = FreiChenShader_1.FreiChenShader;
                break;
            case 'fresnel':
                shaderUniforms = FresnelShader_1.FresnelShader;
                break;
            case 'fxaa':
                shaderUniforms = FXAAShader_1.FXAAShader;
                break;
            case 'gammacorrection':
                shaderUniforms = GammaCorrectionShader_1.GammaCorrectionShader;
                break;
            case 'godraysdepthmask':
                shaderUniforms = GodRaysShader_1.GodRaysDepthMaskShader;
                break;
            case 'godraysgenerate':
                shaderUniforms = GodRaysShader_1.GodRaysGenerateShader;
                break;
            case 'godrayscombine':
                shaderUniforms = GodRaysShader_1.GodRaysCombineShader;
                break;
            case 'godraysfakesun':
                shaderUniforms = GodRaysShader_1.GodRaysFakeSunShader;
                break;
            case 'halftone':
                shaderUniforms = HalftoneShader_1.HalftoneShader;
                break;
            case 'horizontalblur':
                shaderUniforms = HorizontalBlurShader_1.HorizontalBlurShader;
                break;
            case 'horizontaltiltshift':
                shaderUniforms = HorizontalTiltShiftShader_1.HorizontalTiltShiftShader;
                break;
            case 'huesaturation':
                shaderUniforms = HueSaturationShader_1.HueSaturationShader;
                break;
            case 'kaleido':
                shaderUniforms = KaleidoShader_1.KaleidoShader;
                break;
            case 'luminosityhighpass':
                shaderUniforms = LuminosityHighPassShader_1.LuminosityHighPassShader;
                break;
            case 'luminosity':
                shaderUniforms = LuminosityShader_1.LuminosityShader;
                break;
            case 'mirror':
                shaderUniforms = MirrorShader_1.MirrorShader;
                break;
            case 'normalmap':
                shaderUniforms = NormalMapShader_1.NormalMapShader;
                break;
            case 'ocean':
                shaderUniforms = OceanShaders_1.OceanShaders;
                break;
            case 'parallax':
                shaderUniforms = ParallaxShader_1.ParallaxShader;
                break;
            case 'pixel':
                shaderUniforms = PixelShader_1.PixelShader;
                break;
            case 'rgbshift':
                shaderUniforms = RGBShiftShader_1.RGBShiftShader;
                break;
            case 'sao':
                shaderUniforms = SAOShader_1.SAOShader;
                break;
            case 'sepia':
                shaderUniforms = SepiaShader_1.SepiaShader;
                break;
            case 'smaaedges':
                shaderUniforms = SMAAShader_1.SMAAEdgesShader;
                break;
            case 'smaaweights':
                shaderUniforms = SMAAShader_1.SMAAWeightsShader;
                break;
            case 'smaablend':
                shaderUniforms = SMAAShader_1.SMAABlendShader;
                break;
            case 'sobeloperator':
                shaderUniforms = SobelOperatorShader_1.SobelOperatorShader;
                break;
            case 'ssao':
                shaderUniforms = SSAOShader_1.SSAOShader;
                break;
            case 'subsurfacescattering':
                shaderUniforms = SubsurfaceScatteringShader_1.SubsurfaceScatteringShader;
                break;
            case 'technicolor':
                shaderUniforms = TechnicolorShader_1.TechnicolorShader;
                break;
            case 'tonemap':
                shaderUniforms = ToneMapShader_1.ToneMapShader;
                break;
            case 'toon2':
                shaderUniforms = ToonShader_1.ToonShader1;
                break;
            case 'toon1':
                shaderUniforms = ToonShader_1.ToonShader2;
                break;
            case 'toondotted':
                shaderUniforms = ToonShader_1.ToonShaderDotted;
                break;
            case 'toonhatching':
                shaderUniforms = ToonShader_1.ToonShaderHatching;
                break;
            case 'triangleblur':
                shaderUniforms = TriangleBlurShader_1.TriangleBlurShader;
                break;
            case 'unpackdepthrgba':
                shaderUniforms = UnpackDepthRGBAShader_1.UnpackDepthRGBAShader;
                break;
            case 'verticalblur':
                shaderUniforms = VerticalBlurShader_1.VerticalBlurShader;
                break;
            case 'verticaltiltshift':
                shaderUniforms = VerticalTiltShiftShader_1.VerticalTiltShiftShader;
                break;
            case 'vignette':
                shaderUniforms = VignetteShader_1.VignetteShader;
                break;
            case 'volume':
                shaderUniforms = VolumeShader_1.VolumeRenderShader1;
                break;
            case 'waterrefraction':
                shaderUniforms = WaterRefractionShader_1.WaterRefractionShader;
                break;
        }
        if (shaderUniforms !== null) {
            if (shaderUniforms.uniforms !== null && shaderUniforms.uniforms !== undefined && this.uniforms !== null && this.uniforms !== undefined) {
                Object.entries(shaderUniforms.uniforms).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    if (value['value'] !== null && value['value'] !== undefined) {
                        shaderUniforms.uniforms[key] = {
                            value: interface_1.ThreeUtil.getTypeSafe(_this.uniforms[key], value['value'], null)
                        };
                    }
                });
            }
            return shaderUniforms;
        }
        return undefined;
    };
    PassComponent.prototype.getTextureID = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textureID, def);
    };
    PassComponent.prototype.getMap = function (def, camera, mapType) {
        var map = interface_1.ThreeUtil.getTypeSafe(this.map, def);
        if (map !== null) {
            if (map instanceof interface_1.AbstractComposerComponent) {
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
            }
            else {
                return map;
            }
        }
        return undefined;
    };
    PassComponent.prototype.getRadius = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.radius, def);
    };
    PassComponent.prototype.getThreshold = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.threshold, def);
    };
    PassComponent.prototype.getGoWild = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.goWild, def);
    };
    PassComponent.prototype.ngOnInit = function () { };
    PassComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.pass = null;
            if (this.cameraComponent !== null) {
                this.cameraComponent.resetEffectComposer();
                console.log(this.pass);
            }
        }
    };
    PassComponent.prototype.getPass = function (scene, camera, effectComposer, cameraComponent) {
        if (this.refer !== null && this.refer !== undefined) {
            return this.refer.getPass(scene, camera, effectComposer, cameraComponent);
        }
        else if (this.pass === null) {
            this.cameraComponent = effectComposer;
            switch (this.type.toLowerCase()) {
                case 'adaptivetonemapping':
                    this.pass = new AdaptiveToneMappingPass_1.AdaptiveToneMappingPass(this.getAdaptive(), this.getResolution());
                    break;
                case 'afterimage':
                    this.pass = new AfterimagePass_1.AfterimagePass(this.getDamp());
                    break;
                case 'bloom':
                    this.pass = new BloomPass_1.BloomPass(this.getStrength(), this.getKernelSize(), this.getSigma(), this.getResolution());
                    break;
                case 'bokeh':
                    this.pass = new BokehPass_1.BokehPass(this.getScene(scene), this.getCamera(camera), this.getParams());
                    break;
                case 'cubetexture':
                    this.pass = new CubeTexturePass_1.CubeTexturePass(this.getCamera(camera), this.getEnvMap(), this.getOpacity());
                    break;
                case 'dotscreen':
                    this.pass = new DotScreenPass_1.DotScreenPass(this.getCenter(), this.getAngle(), this.getScale());
                    break;
                case 'film':
                    this.pass = new FilmPass_1.FilmPass(this.getNoiseIntensity(), this.getScanlinesIntensity(), this.getScanlinesCount(), this.getGrayscale());
                    break;
                case 'glitch':
                    var pass = new GlitchPass_1.GlitchPass(this.getDtSize());
                    pass.goWild = this.getGoWild(false);
                    this.pass = pass;
                    break;
                case 'halftone':
                    this.pass = new HalftonePass_1.HalftonePass(this.getWidth(), this.getHeight(), null // this.getParams(null)
                    );
                    break;
                case 'mask':
                    this.pass = new MaskPass_1.MaskPass(this.getScene(scene), this.getCamera(camera));
                    break;
                case 'outline':
                    this.pass = new OutlinePass_1.OutlinePass(null, //this.getResolution(),
                    this.getScene(scene), this.getCamera(camera), null // this.getSelectedObjects()
                    );
                    break;
                case 'render':
                    this.pass = new RenderPass_1.RenderPass(this.getScene(scene), this.getCamera(camera));
                    break;
                case 'sao':
                    this.pass = new SAOPass_1.SAOPass(this.getScene(scene), this.getCamera(camera), this.getDepthTexture(), this.getUseNormals(), null // this.getResolution()
                    );
                    break;
                case 'save':
                    this.pass = new SavePass_1.SavePass(this.getRenderTarget());
                    break;
                case 'shader':
                    this.pass = new ShaderPass_1.ShaderPass(this.getShader(), this.getTextureID());
                    break;
                case 'smaa':
                    this.pass = new SMAAPass_1.SMAAPass(this.getWidth(), this.getHeight());
                    break;
                case 'ssaarender':
                    this.pass = new SSAARenderPass_1.SSAARenderPass(this.getScene(scene), this.getCamera(camera), this.getClearColor(), this.getClearAlpha());
                    break;
                case 'ssao':
                    this.pass = new SSAOPass_1.SSAOPass(this.getScene(scene), this.getCamera(camera), this.getWidth(), this.getHeight());
                    break;
                case 'taarender':
                    this.pass = new TAARenderPass_1.TAARenderPass(this.getScene(scene), this.getCamera(camera), this.getClearColor(), this.getClearAlpha());
                    break;
                case 'texture':
                    this.pass = new TexturePass_1.TexturePass(this.getMap(null, cameraComponent), this.getOpacity());
                    break;
                case 'taarender':
                    this.pass = new UnrealBloomPass_1.UnrealBloomPass(null, //this.getResolution(),
                    this.getStrength(), this.getRadius(), this.getThreshold());
                    break;
                case 'clear':
                default:
                    this.pass = new ClearPass_1.ClearPass(this.getClearColor(), this.getClearAlpha());
                    break;
            }
            if (interface_1.ThreeUtil.isNotNull(this.enabled)) {
                this.pass.enabled = this.getEnabled(true);
            }
            if (interface_1.ThreeUtil.isNotNull(this.needsSwap)) {
                this.pass.needsSwap = this.getNeedsSwap(true);
            }
            if (interface_1.ThreeUtil.isNotNull(this.clear)) {
                this.pass.clear = this.getClear(false);
            }
            if (interface_1.ThreeUtil.isNotNull(this.renderToScreen)) {
                this.pass.renderToScreen = this.getRenderToScreen(false);
            }
        }
        return this.pass;
    };
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "refer");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "enabled");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "needsSwap");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "clear");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "renderToScreen");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "adaptive");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "resolution");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "damp");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "strength");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "kernelSize");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "sigma");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "scene");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "camera");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "params");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "clearColor");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "clearAlpha");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "envMap");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "opacity");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "centerX");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "centerY");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "angle");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "scale");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "noiseIntensity");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "scanlinesIntensity");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "scanlinesCount");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "grayscale");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "dtSize");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "selectedObjects");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "overrideMaterial");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "depthTexture");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "useNormals");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "renderTarget");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "shader");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "textureID");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "map");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "radius");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "threshold");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "goWild");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "uniforms");
    PassComponent = __decorate([
        core_1.Component({
            selector: 'three-pass',
            templateUrl: './pass.component.html',
            styleUrls: ['./pass.component.scss']
        })
    ], PassComponent);
    return PassComponent;
}());
exports.PassComponent = PassComponent;
