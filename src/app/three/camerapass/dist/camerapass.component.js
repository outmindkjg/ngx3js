"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CamerapassComponent = void 0;
var core_1 = require("@angular/core");
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
var CamerapassComponent = /** @class */ (function () {
    function CamerapassComponent() {
        this.type = '';
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
        this.center = null;
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
        this.cameraComponent = null;
        this.pass = null;
    }
    CamerapassComponent.prototype.getEnabled = function (def) {
        var enabled = this.enabled === null ? def : this.enabled;
        return enabled;
    };
    CamerapassComponent.prototype.getNeedsSwap = function (def) {
        var needsSwap = this.needsSwap === null ? def : this.needsSwap;
        return needsSwap;
    };
    CamerapassComponent.prototype.getClear = function (def) {
        var clear = this.clear === null ? def : this.clear;
        return clear;
    };
    CamerapassComponent.prototype.getRenderToScreen = function (def) {
        var renderToScreen = this.renderToScreen === null ? def : this.renderToScreen;
        return renderToScreen;
    };
    CamerapassComponent.prototype.getAdaptive = function (def) {
        var adaptive = this.adaptive === null ? def : this.adaptive;
        return adaptive;
    };
    CamerapassComponent.prototype.getResolution = function (def) {
        var resolution = this.resolution === null ? def : this.resolution;
        return resolution;
    };
    CamerapassComponent.prototype.getDamp = function (def) {
        var damp = this.damp === null ? def : this.damp;
        return damp;
    };
    CamerapassComponent.prototype.getStrength = function (def) {
        var strength = this.strength === null ? def : this.strength;
        return strength;
    };
    CamerapassComponent.prototype.getKernelSize = function (def) {
        var kernelSize = this.kernelSize === null ? def : this.kernelSize;
        return kernelSize;
    };
    CamerapassComponent.prototype.getSigma = function (def) {
        var sigma = this.sigma === null ? def : this.sigma;
        return sigma;
    };
    CamerapassComponent.prototype.getScene = function (def) {
        var scene = this.scene === null ? def : this.scene;
        return scene;
    };
    CamerapassComponent.prototype.getCamera = function (def) {
        var camera = this.camera === null ? def : this.camera;
        return camera;
    };
    CamerapassComponent.prototype.getParams = function (def) {
        var params = this.params === null ? def : this.params;
        return params;
    };
    CamerapassComponent.prototype.getClearColor = function (def) {
        var clearColor = this.clearColor === null ? def : this.clearColor;
        return clearColor;
    };
    CamerapassComponent.prototype.getClearAlpha = function (def) {
        var clearAlpha = this.clearAlpha === null ? def : this.clearAlpha;
        return clearAlpha;
    };
    CamerapassComponent.prototype.getEnvMap = function (def) {
        var envMap = this.envMap === null ? def : this.envMap;
        return envMap;
    };
    CamerapassComponent.prototype.getOpacity = function (def) {
        var opacity = this.opacity === null ? def : this.opacity;
        return opacity;
    };
    CamerapassComponent.prototype.getCenter = function (def) {
        var center = this.center === null ? def : this.center;
        return center;
    };
    CamerapassComponent.prototype.getAngle = function (def) {
        var angle = this.angle === null ? def : this.angle;
        return angle;
    };
    CamerapassComponent.prototype.getScale = function (def) {
        var scale = this.scale === null ? def : this.scale;
        return scale;
    };
    CamerapassComponent.prototype.getNoiseIntensity = function (def) {
        var noiseIntensity = this.noiseIntensity === null ? def : this.noiseIntensity;
        return noiseIntensity;
    };
    CamerapassComponent.prototype.getScanlinesIntensity = function (def) {
        var scanlinesIntensity = this.scanlinesIntensity === null ? def : this.scanlinesIntensity;
        return scanlinesIntensity;
    };
    CamerapassComponent.prototype.getScanlinesCount = function (def) {
        var scanlinesCount = this.scanlinesCount === null ? def : this.scanlinesCount;
        return scanlinesCount;
    };
    CamerapassComponent.prototype.getGrayscale = function (def) {
        var grayscale = this.grayscale === null ? def : this.grayscale;
        return grayscale;
    };
    CamerapassComponent.prototype.getDtSize = function (def) {
        var dtSize = this.dtSize === null ? def : this.dtSize;
        return dtSize;
    };
    CamerapassComponent.prototype.getWidth = function (def) {
        var width = this.width === null ? def : this.width;
        return width;
    };
    CamerapassComponent.prototype.getHeight = function (def) {
        var height = this.height === null ? def : this.height;
        return height;
    };
    CamerapassComponent.prototype.getSelectedObjects = function (def) {
        var selectedObjects = this.selectedObjects === null ? def : this.selectedObjects;
        return selectedObjects;
    };
    CamerapassComponent.prototype.getOverrideMaterial = function (def) {
        var overrideMaterial = this.overrideMaterial === null ? def : this.overrideMaterial;
        return overrideMaterial;
    };
    CamerapassComponent.prototype.getDepthTexture = function (def) {
        var depthTexture = this.depthTexture === null ? def : this.depthTexture;
        return depthTexture;
    };
    CamerapassComponent.prototype.getUseNormals = function (def) {
        var useNormals = this.useNormals === null ? def : this.useNormals;
        return useNormals;
    };
    CamerapassComponent.prototype.getRenderTarget = function (def) {
        var renderTarget = this.renderTarget === null ? def : this.renderTarget;
        return renderTarget;
    };
    CamerapassComponent.prototype.getShader = function (def) {
        var shader = this.shader === null ? def : this.shader;
        return shader;
    };
    CamerapassComponent.prototype.getTextureID = function (def) {
        var textureID = this.textureID === null ? def : this.textureID;
        return textureID;
    };
    CamerapassComponent.prototype.getMap = function (def) {
        var map = this.map === null ? def : this.map;
        return map;
    };
    CamerapassComponent.prototype.getRadius = function (def) {
        var radius = this.radius === null ? def : this.radius;
        return radius;
    };
    CamerapassComponent.prototype.getThreshold = function (def) {
        var threshold = this.threshold === null ? def : this.threshold;
        return threshold;
    };
    CamerapassComponent.prototype.ngOnInit = function () { };
    CamerapassComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.pass = null;
            if (this.cameraComponent !== null) {
                this.cameraComponent.resetEffectComposer();
            }
        }
    };
    CamerapassComponent.prototype.getPass = function (scene, camera, cameraComponent) {
        if (this.pass === null) {
            this.cameraComponent = cameraComponent;
            switch (this.type.toLowerCase()) {
                case 'adaptivetonemapping':
                    this.pass = new AdaptiveToneMappingPass_1.AdaptiveToneMappingPass(this.getAdaptive(true), this.getResolution(0));
                    break;
                case 'afterimage':
                    this.pass = new AfterimagePass_1.AfterimagePass(this.getDamp(0));
                    break;
                case 'bloom':
                    this.pass = new BloomPass_1.BloomPass(this.getStrength(0), this.getKernelSize(0), this.getSigma(0), this.getResolution(0));
                    break;
                case 'bokeh':
                    this.pass = new BokehPass_1.BokehPass(this.getScene(scene), this.getCamera(camera), this.getParams(null));
                    break;
                case 'cubetexture':
                    this.pass = new CubeTexturePass_1.CubeTexturePass(this.getCamera(camera), this.getEnvMap(null), this.getOpacity(0));
                    break;
                case 'dotscreen':
                    this.pass = new DotScreenPass_1.DotScreenPass(this.getCenter(null), this.getAngle(0), this.getScale(0));
                    break;
                case 'film':
                    this.pass = new FilmPass_1.FilmPass(this.getNoiseIntensity(0), this.getScanlinesIntensity(0), this.getScanlinesCount(0), this.getGrayscale(0));
                    break;
                case 'glitch':
                    this.pass = new GlitchPass_1.GlitchPass(this.getDtSize(0));
                    break;
                case 'halftone':
                    this.pass = new HalftonePass_1.HalftonePass(this.getWidth(0), this.getHeight(0), null // this.getParams(null)
                    );
                    break;
                case 'mask':
                    this.pass = new MaskPass_1.MaskPass(this.getScene(scene), this.getCamera(camera));
                    break;
                case 'outline':
                    this.pass = new OutlinePass_1.OutlinePass(null, //this.getResolution(0),
                    this.getScene(scene), this.getCamera(camera), null // this.getSelectedObjects(0)
                    );
                    break;
                case 'render':
                    this.pass = new RenderPass_1.RenderPass(this.getScene(scene), this.getCamera(camera));
                    break;
                case 'sao':
                    this.pass = new SAOPass_1.SAOPass(this.getScene(scene), this.getCamera(camera), this.getDepthTexture(null), this.getUseNormals(null), null // this.getResolution(0)
                    );
                    break;
                case 'save':
                    this.pass = new SavePass_1.SavePass(this.getRenderTarget(null));
                    break;
                case 'shader':
                    this.pass = new ShaderPass_1.ShaderPass(this.getShader(null), this.getTextureID('aaa'));
                    break;
                case 'smaa':
                    this.pass = new SMAAPass_1.SMAAPass(this.getWidth(0), this.getHeight(0));
                    break;
                case 'ssaarender':
                    this.pass = new SSAARenderPass_1.SSAARenderPass(this.getScene(scene), this.getCamera(camera), this.getClearColor(0x000000), this.getClearAlpha(0));
                    break;
                case 'ssao':
                    this.pass = new SSAOPass_1.SSAOPass(this.getScene(scene), this.getCamera(camera), this.getWidth(0), this.getHeight(0));
                    break;
                case 'taarender':
                    this.pass = new TAARenderPass_1.TAARenderPass(this.getScene(scene), this.getCamera(camera), this.getClearColor(0x000000), this.getClearAlpha(0));
                    break;
                case 'texture':
                    this.pass = new TexturePass_1.TexturePass(this.getMap(null), this.getOpacity(0));
                    break;
                case 'taarender':
                    this.pass = new UnrealBloomPass_1.UnrealBloomPass(null, //this.getResolution(0),
                    this.getStrength(0), this.getRadius(0), this.getThreshold(0));
                    break;
                case 'clear':
                default:
                    this.pass = new ClearPass_1.ClearPass(this.getClearColor(0), this.getClearAlpha(0));
                    break;
            }
            // this.pass.enabled = this.getEnabled(true);
            // this.pass.needsSwap = this.getNeedsSwap(false);
            // this.pass.clear = this.getClear(false);
            this.pass.renderToScreen = this.getRenderToScreen(true);
        }
        return this.pass;
    };
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "enabled");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "needsSwap");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "clear");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "renderToScreen");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "adaptive");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "resolution");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "damp");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "strength");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "kernelSize");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "sigma");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "scene");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "camera");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "params");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "clearColor");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "clearAlpha");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "envMap");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "opacity");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "center");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "angle");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "scale");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "noiseIntensity");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "scanlinesIntensity");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "scanlinesCount");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "grayscale");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "dtSize");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "selectedObjects");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "overrideMaterial");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "depthTexture");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "useNormals");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "renderTarget");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "shader");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "textureID");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "map");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "radius");
    __decorate([
        core_1.Input()
    ], CamerapassComponent.prototype, "threshold");
    CamerapassComponent = __decorate([
        core_1.Component({
            selector: 'three-camerapass',
            templateUrl: './camerapass.component.html',
            styleUrls: ['./camerapass.component.scss']
        })
    ], CamerapassComponent);
    return CamerapassComponent;
}());
exports.CamerapassComponent = CamerapassComponent;
