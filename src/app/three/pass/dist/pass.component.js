"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var LUTCubeLoader_1 = require("three/examples/jsm/loaders/LUTCubeLoader");
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
var LUTPass_1 = require("three/examples/jsm/postprocessing/LUTPass");
var MaskPass_1 = require("three/examples/jsm/postprocessing/MaskPass");
var OutlinePass_1 = require("three/examples/jsm/postprocessing/OutlinePass");
var RenderPass_1 = require("three/examples/jsm/postprocessing/RenderPass");
var SAOPass_1 = require("three/examples/jsm/postprocessing/SAOPass");
var SavePass_1 = require("three/examples/jsm/postprocessing/SavePass");
var ShaderPass_1 = require("three/examples/jsm/postprocessing/ShaderPass");
var SMAAPass_1 = require("three/examples/jsm/postprocessing/SMAAPass");
var SSAARenderPass_1 = require("three/examples/jsm/postprocessing/SSAARenderPass");
var SSAOPass_1 = require("three/examples/jsm/postprocessing/SSAOPass");
var SSRPass_1 = require("three/examples/jsm/postprocessing/SSRPass");
var SSRrPass_1 = require("three/examples/jsm/postprocessing/SSRrPass");
var TAARenderPass_1 = require("three/examples/jsm/postprocessing/TAARenderPass");
var TexturePass_1 = require("three/examples/jsm/postprocessing/TexturePass");
var UnrealBloomPass_1 = require("three/examples/jsm/postprocessing/UnrealBloomPass");
var interface_1 = require("../interface");
var shader_component_1 = require("../shader/shader.component");
var shaderUtils_1 = require("../shader/shaders/shaderUtils");
var subscribe_abstract_1 = require("../subscribe.abstract");
var texture_component_1 = require("../texture/texture.component");
/**
 * PassComponent
 */
var PassComponent = /** @class */ (function (_super) {
    __extends(PassComponent, _super);
    /**
     * Creates an instance of pass component.
     */
    function PassComponent() {
        var _this = _super.call(this) || this;
        /**
         * Input  of pass component
         */
        _this.type = '';
        /**
         * Input  of pass component
         */
        _this.refer = null;
        /**
         * Input  of pass component
         */
        _this.needsSwap = null;
        /**
         * Input  of pass component
         */
        _this.clear = null;
        /**
         * Input  of pass component
         */
        _this.renderToScreen = null;
        /**
         * Input  of pass component
         */
        _this.adaptive = null;
        /**
         * Input  of pass component
         */
        _this.resolution = null;
        /**
         * Input  of pass component
         */
        _this.damp = null;
        /**
         * Input  of pass component
         */
        _this.strength = null;
        /**
         * Input  of pass component
         */
        _this.kernelSize = null;
        /**
         * Input  of pass component
         */
        _this.sigma = null;
        /**
         * Input  of pass component
         */
        _this.scene = null;
        /**
         * Input  of pass component
         */
        _this.camera = null;
        /**
         * Input  of pass component
         */
        _this.params = null;
        /**
         * Input  of pass component
         */
        _this.intensity = null;
        /**
         * Input  of pass component
         */
        _this.clearColor = null;
        /**
         * Input  of pass component
         */
        _this.clearAlpha = null;
        /**
         * Input  of pass component
         */
        _this.envMap = null;
        /**
         * Input  of pass component
         */
        _this.opacity = null;
        /**
         * Input  of pass component
         */
        _this.centerX = null;
        /**
         * Input  of pass component
         */
        _this.centerY = null;
        /**
         * Input  of pass component
         */
        _this.angle = null;
        /**
         * Input  of pass component
         */
        _this.scale = null;
        /**
         * Input  of pass component
         */
        _this.noiseIntensity = null;
        /**
         * Input  of pass component
         */
        _this.scanlinesIntensity = null;
        /**
         * Input  of pass component
         */
        _this.scanlinesCount = null;
        /**
         * Input  of pass component
         */
        _this.grayscale = null;
        /**
         * Input  of pass component
         */
        _this.dtSize = null;
        /**
         * Input  of pass component
         */
        _this.width = null;
        /**
         * Input  of pass component
         */
        _this.height = null;
        /**
         * Input  of pass component
         */
        _this.selectedObjects = null;
        /**
         * Input  of pass component
         */
        _this.overrideMaterial = null;
        /**
         * Input  of pass component
         */
        _this.depthTexture = null;
        /**
         * Input  of pass component
         */
        _this.useNormals = null;
        /**
         * Input  of pass component
         */
        _this.renderTarget = null;
        /**
         * Input  of pass component
         *
         * Notice - case insensitive.
         *
         */
        _this.shader = null;
        /**
         * Input  of pass component
         *
         * Notice - case insensitive.
         *
         */
        _this.materialShader = null;
        /**
         * Input  of pass component
         */
        _this.textureId = null;
        /**
         * Input  of pass component
         */
        _this.map = null;
        /**
         * Input  of pass component
         */
        _this.texture = null;
        /**
         * Input  of pass component
         */
        _this.patternTexture = null;
        /**
         * Input  of pass component
         */
        _this.radius = null;
        /**
         * Input  of pass component
         */
        _this.threshold = null;
        /**
         * Input  of pass component
         */
        _this.goWild = null;
        /**
         * Input  of pass component
         */
        _this.uniforms = null;
        /**
         * Input  of pass component
         *
         * Notice - case insensitive.
         *
         */
        _this.lut = null;
        /**
         * Input  of pass component
         */
        _this.use2DLut = null;
        /**
         * Input  of pass component
         */
        _this.inverse = null;
        /**
         * Input  of pass component
         */
        _this.focus = null;
        /**
         * Input  of pass component
         */
        _this.aspect = null;
        /**
         * Input  of pass component
         */
        _this.aperture = null;
        /**
         * Input  of pass component
         */
        _this.maxblur = null;
        /**
         * Input  of pass component
         */
        _this.sampleLevel = null;
        /**
         * Input  of pass component
         */
        _this.unbiased = null;
        /**
         * Input  of pass component
         */
        _this.accumulate = null;
        /**
         * Input  of pass component
         */
        _this.visibleEdgeColor = null;
        /**
         * Input  of pass component
         */
        _this.hiddenEdgeColor = null;
        /**
         * Input  of pass component
         */
        _this.edgeGlow = null;
        /**
         * Input  of pass component
         */
        _this.usePatternTexture = null;
        /**
         * Input  of pass component
         */
        _this.edgeThickness = null;
        /**
         * Input  of pass component
         */
        _this.edgeStrength = null;
        /**
         * Input  of pass component
         */
        _this.downSampleRatio = null;
        /**
         * Input  of pass component
         */
        _this.pulsePeriod = null;
        /**
         * Input  of pass component
         *
         * Notice - case insensitive.
         *
         */
        _this.output = null;
        /**
         * Input  of pass component
         */
        _this.kernelRadius = null;
        /**
         * Input  of pass component
         */
        _this.minDistance = null;
        /**
         * Input  of pass component
         */
        _this.maxDistance = null;
        /**
         * Input  of pass component
         */
        _this.saoBias = null;
        /**
         * Input  of pass component
         */
        _this.saoIntensity = null;
        /**
         * Input  of pass component
         */
        _this.saoScale = null;
        /**
         * Input  of pass component
         */
        _this.saoKernelRadius = null;
        /**
         * Input  of pass component
         */
        _this.saoMinResolution = null;
        /**
         * Input  of pass component
         */
        _this.saoBlur = null;
        /**
         * Input  of pass component
         */
        _this.saoBlurRadius = null;
        /**
         * Input  of pass component
         */
        _this.saoBlurStdDev = null;
        /**
         * Input  of pass component
         */
        _this.saoBlurDepthCutoff = null;
        /**
         * Input  of pass component
         */
        _this.vertexShader = null;
        /**
         * Input  of pass component
         */
        _this.fragmentShader = null;
        /**
         * Input  of pass component
         */
        _this.bloomTexture = null;
        /**
         * Lut cube loader of pass component
         */
        _this.lutCubeLoader = null;
        /**
         * Effect composer of pass component
         */
        _this.effectComposer = null;
        /**
         * Effect scene of pass component
         */
        _this.effectScene = null;
        /**
         * Effect camera of pass component
         */
        _this.effectCamera = null;
        /**
         * Pass  of pass component
         */
        _this.pass = null;
        return _this;
    }
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    PassComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this, 'pass');
    };
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * before a directive, pipe, or service instance is destroyed.
     */
    PassComponent.prototype.ngOnDestroy = function () {
        if (this.pass !== null) {
            this.pass.enabled = false;
            if (this.effectComposer !== null) {
                this.effectComposer.removePass(this.pass);
            }
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked data-bound properties
     * if at least one has changed, and before the view and content
     * children are checked.
     *
     * @param changes The changed properties.
     */
    PassComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes && this.pass) {
            this.addChanges(changes);
        }
    };
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of all of the directive's
     * content.
     * It is invoked only once when the directive is instantiated.
     */
    PassComponent.prototype.ngAfterContentInit = function () {
        _super.prototype.ngAfterContentInit.call(this);
    };
    /**
     * Gets lut
     * @param callBack
     * @param [def]
     */
    PassComponent.prototype.getLut = function (callBack, def) {
        var lut = interface_1.ThreeUtil.getTypeSafe(this.lut, def, 'remy24');
        var lutPath = '';
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
        if (this.lutCubeLoader === null) {
            this.lutCubeLoader = new LUTCubeLoader_1.LUTCubeLoader(interface_1.ThreeUtil.getLoadingManager());
        }
        this.lutCubeLoader.load(interface_1.ThreeUtil.getStoreUrl(lutPath), function (result) {
            callBack(result);
        });
    };
    /**
     * Gets enabled
     * @param [def]
     * @returns true if enabled
     */
    PassComponent.prototype.getEnabled = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.enabled, def);
    };
    /**
     * Gets needs swap
     * @param [def]
     * @returns true if needs swap
     */
    PassComponent.prototype.getNeedsSwap = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.needsSwap, def);
    };
    /**
     * Gets clear
     * @param [def]
     * @returns true if clear
     */
    PassComponent.prototype.getClear = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clear, def);
    };
    /**
     * Gets render to screen
     * @param [def]
     * @returns true if render to screen
     */
    PassComponent.prototype.getRenderToScreen = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.renderToScreen, def);
    };
    /**
     * Gets adaptive
     * @param [def]
     * @returns true if adaptive
     */
    PassComponent.prototype.getAdaptive = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.adaptive, def);
    };
    /**
     * Gets resolution
     * @param [def]
     * @returns resolution
     */
    PassComponent.prototype.getResolution = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.resolution, def);
    };
    /**
     * Gets damp
     * @param [def]
     * @returns damp
     */
    PassComponent.prototype.getDamp = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.damp, def);
    };
    /**
     * Gets strength
     * @param [def]
     * @returns strength
     */
    PassComponent.prototype.getStrength = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.strength, def);
    };
    /**
     * Gets kernel size
     * @param [def]
     * @returns kernel size
     */
    PassComponent.prototype.getKernelSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.kernelSize, def);
    };
    /**
     * Gets sigma
     * @param [def]
     * @returns sigma
     */
    PassComponent.prototype.getSigma = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.sigma, def);
    };
    /**
     * Gets scene
     * @param [def]
     * @returns scene
     */
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
    /**
     * Gets camera
     * @param [def]
     * @returns camera
     */
    PassComponent.prototype.getCamera = function (def) {
        var camera = interface_1.ThreeUtil.getTypeSafe(this.camera, def);
        if (interface_1.ThreeUtil.isNotNull(camera)) {
            if (camera instanceof THREE.Camera) {
                return camera;
            }
            else {
                return camera.getObject3d();
            }
        }
        else {
            return new THREE.Camera();
        }
    };
    /**
     * Gets params
     * @param [def]
     * @returns params
     */
    PassComponent.prototype.getParams = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.params, def);
    };
    /**
     * Gets intensity
     * @param [def]
     * @returns intensity
     */
    PassComponent.prototype.getIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.intensity, def);
    };
    /**
     * Gets clear color
     * @param [def]
     * @returns clear color
     */
    PassComponent.prototype.getClearColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.clearColor, def);
    };
    /**
     * Gets clear alpha
     * @param [def]
     * @returns clear alpha
     */
    PassComponent.prototype.getClearAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clearAlpha, def);
    };
    /**
     * Gets env map
     * @param [def]
     * @returns env map
     */
    PassComponent.prototype.getEnvMap = function (def) {
        var cubeTexture = this.getTexture(this.envMap, def);
        if (cubeTexture instanceof THREE.CubeTexture) {
            return cubeTexture;
        }
        return undefined;
    };
    /**
     * Gets pattern texture
     * @param [def]
     * @returns pattern texture
     */
    PassComponent.prototype.getPatternTexture = function (def) {
        return this.getTexture(this.patternTexture, def);
    };
    /**
     * Gets texture
     * @param baseTexture
     * @param [def]
     * @returns texture
     */
    PassComponent.prototype.getTexture = function (baseTexture, def) {
        var texture = interface_1.ThreeUtil.getTypeSafe(baseTexture, interface_1.ThreeUtil.getTypeSafe(this.texture, this.map, def), def);
        if (texture instanceof THREE.Texture) {
            return texture;
        }
        else if (texture instanceof texture_component_1.TextureComponent) {
            return texture.getTexture();
        }
        return undefined;
    };
    /**
     * Gets opacity
     * @param [def]
     * @returns opacity
     */
    PassComponent.prototype.getOpacity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.opacity, def);
    };
    /**
     * Gets center
     * @param [def]
     * @returns center
     */
    PassComponent.prototype.getCenter = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.centerX, this.centerY, def);
    };
    /**
     * Gets angle
     * @param [def]
     * @returns angle
     */
    PassComponent.prototype.getAngle = function (def) {
        return interface_1.ThreeUtil.getAngleSafe(this.angle, def);
    };
    /**
     * Gets scale
     * @param [def]
     * @returns scale
     */
    PassComponent.prototype.getScale = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.scale, def);
    };
    /**
     * Gets noise intensity
     * @param [def]
     * @returns noise intensity
     */
    PassComponent.prototype.getNoiseIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.noiseIntensity, def);
    };
    /**
     * Gets scanlines intensity
     * @param [def]
     * @returns scanlines intensity
     */
    PassComponent.prototype.getScanlinesIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.scanlinesIntensity, def);
    };
    /**
     * Gets scanlines count
     * @param [def]
     * @returns scanlines count
     */
    PassComponent.prototype.getScanlinesCount = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.scanlinesCount, def);
    };
    /**
     * Gets grayscale
     * @param [def]
     * @returns grayscale
     */
    PassComponent.prototype.getGrayscale = function (def) {
        if (interface_1.ThreeUtil.getTypeSafe(this.grayscale, def)) {
            return 1;
        }
        else {
            return 0;
        }
    };
    /**
     * Gets dt size
     * @param [def]
     * @returns dt size
     */
    PassComponent.prototype.getDtSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.dtSize, def);
    };
    /**
     * Gets width
     * @param [def]
     * @returns width
     */
    PassComponent.prototype.getWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.width, def);
    };
    /**
     * Gets height
     * @param [def]
     * @returns height
     */
    PassComponent.prototype.getHeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.height, def);
    };
    /**
     * Gets selected objects
     * @param [def]
     * @returns selected objects
     */
    PassComponent.prototype.getSelectedObjects = function (def) {
        var selectedObjects = interface_1.ThreeUtil.getTypeSafe(this.selectedObjects, def);
        var safeObject3d = [];
        selectedObjects.forEach(function (child) {
            if (child instanceof THREE.Object3D) {
                safeObject3d.push(child);
            }
            else if (child.getMesh) {
                safeObject3d.push(child.getObject3d());
            }
            else if (child.getHelper) {
                safeObject3d.push(child.getHelper());
            }
            else if (child.getObject3d) {
                safeObject3d.push(child.getObject3d());
            }
        });
        return safeObject3d;
    };
    /**
     * Gets override material
     * @param [def]
     * @returns override material
     */
    PassComponent.prototype.getOverrideMaterial = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.overrideMaterial, def);
    };
    /**
     * Gets depth texture
     * @param [def]
     * @returns true if depth texture
     */
    PassComponent.prototype.getDepthTexture = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.depthTexture, def);
    };
    /**
     * Gets use normals
     * @param [def]
     * @returns true if use normals
     */
    PassComponent.prototype.getUseNormals = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.useNormals, def);
    };
    /**
     * Gets sao output
     * @param [def]
     * @returns sao output
     */
    PassComponent.prototype.getSaoOutput = function (def) {
        var output = interface_1.ThreeUtil.getTypeSafe(this.output, def, '');
        switch (output.toLowerCase()) {
            case 'beauty':
                return 1;
            case 'sao':
                return 2;
            case 'depth':
                return 3;
            case 'normal':
                return 4;
            case 'default':
            default:
                return 0;
        }
    };
    /**
     * Gets ssao output
     * @param [def]
     * @returns ssao output
     */
    PassComponent.prototype.getSsaoOutput = function (def) {
        var output = interface_1.ThreeUtil.getTypeSafe(this.output, def, '');
        switch (output.toLowerCase()) {
            case 'ssao':
                return 1;
            case 'blur':
                return 1;
            case 'beauty':
                return 3;
            case 'depth':
                return 4;
            case 'normal':
                return 5;
            case 'default':
            default:
                return 0;
        }
    };
    /**
     * Gets render target
     * @param [def]
     * @returns render target
     */
    PassComponent.prototype.getRenderTarget = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.renderTarget, def);
    };
    /**
     * Gets shader
     * @param [def]
     * @returns shader
     */
    PassComponent.prototype.getShader = function (def) {
        var shader = interface_1.ThreeUtil.getTypeSafe(this.shader, def, '');
        var shaderUniforms = null;
        switch (shader.toLowerCase()) {
            case 'shadermaterial':
            case 'material':
                var shaderMaterialParameters = {
                    vertexShader: this.getMaterialShader('x-shader/x-vertex'),
                    fragmentShader: this.getMaterialShader('x-shader/x-fragment'),
                    uniforms: this.getUniforms(shaderUtils_1.ShaderUtils.getUniforms(this.materialShader))
                };
                shaderUniforms = new THREE.ShaderMaterial(shaderMaterialParameters);
                break;
            default:
                shaderUniforms = shaderUtils_1.ShaderUtils.getShaderClone(shader);
                if (interface_1.ThreeUtil.isNotNull(shaderUniforms.uniforms)) {
                    this.getUniforms(shaderUniforms.uniforms);
                }
                break;
        }
        if (shaderUniforms !== null) {
            return shaderUniforms;
        }
        return undefined;
    };
    /**
     * Gets uniforms
     * @param resultUniforms
     * @returns uniforms
     */
    PassComponent.prototype.getUniforms = function (resultUniforms) {
        var _this = this;
        var uniforms = interface_1.ThreeUtil.getTypeSafe(this.uniforms, {});
        Object.entries(uniforms).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (interface_1.ThreeUtil.isNotNull(value) && interface_1.ThreeUtil.isNotNull(value['type']) && interface_1.ThreeUtil.isNotNull(value['value'])) {
                var valueType_1 = value['type'];
                var valueValue = value['value'];
                switch (valueType_1.toLowerCase()) {
                    case 'projectionmatrixinverse':
                    case 'projectionmatrix':
                    case 'matrixworldinverse':
                    case 'matrixworld':
                    case 'matrix':
                        if (interface_1.ThreeUtil.isNotNull(valueValue.getObject3d)) {
                            _this.unSubscribeRefer('unforms_' + key);
                            var object3d = valueValue.getObject3d();
                            resultUniforms[key] = {
                                value: interface_1.ThreeUtil.getMatrix4Safe(object3d, valueType_1)
                            };
                            if (interface_1.ThreeUtil.isNotNull(valueValue.getSubscribe)) {
                                _this.subscribeRefer('unforms_' + key, valueValue.getSubscribe().subscribe(function (e) {
                                    resultUniforms[key].value = interface_1.ThreeUtil.getMatrix4Safe(e, valueType_1);
                                }));
                            }
                        }
                        else {
                            resultUniforms[key] = {
                                value: new THREE.Matrix4()
                            };
                        }
                        break;
                    case 'vector2':
                    case 'v2':
                        if (interface_1.ThreeUtil.isNotNull(valueValue.getSize)) {
                            _this.unSubscribeRefer('unforms_' + key);
                            resultUniforms[key] = {
                                value: valueValue.getSize()
                            };
                            if (interface_1.ThreeUtil.isNotNull(valueValue.sizeSubscribe)) {
                                _this.subscribeRefer('unforms_' + key, valueValue.sizeSubscribe().subscribe(function (e) {
                                    resultUniforms[key].value = e;
                                }));
                            }
                        }
                        else {
                            resultUniforms[key] = {
                                value: interface_1.ThreeUtil.getVector2Safe(valueValue[0], valueValue[1], new THREE.Vector2())
                            };
                        }
                        break;
                    case 'vector3':
                    case 'vector':
                    case 'v3':
                        resultUniforms[key] = {
                            value: interface_1.ThreeUtil.getVector3Safe(valueValue[0], valueValue[1], valueValue[2], new THREE.Vector3())
                        };
                        break;
                    case 'color':
                        resultUniforms[key] = {
                            value: interface_1.ThreeUtil.getColorSafe(valueValue, 0xffffff)
                        };
                        break;
                    case 'image':
                    case 'texture2d':
                    case 'texture3d':
                    case 'texture':
                    case 'datatexture2d':
                    case 'datatexture3d':
                    case 'datatexture':
                    case 'video':
                    case 'videotexture':
                        resultUniforms[key] = {
                            value: texture_component_1.TextureComponent.getTextureImageOption(valueValue, value['options'], valueType_1.toLowerCase())
                        };
                        break;
                    case 'imagelist':
                    case 'texturelist':
                    case 'imagearray':
                    case 'texturearray':
                        var textureList_1 = [];
                        var texturePathList_1 = [];
                        var textureOption_1 = value['options'];
                        if (typeof valueValue === 'string') {
                            valueValue.split(',').forEach(function (path) {
                                if (path !== '' && path.length > 3) {
                                    texturePathList_1.push(path);
                                }
                            });
                        }
                        else if (interface_1.ThreeUtil.isNotNull(valueValue.forEach)) {
                            valueValue.forEach(function (path) {
                                if (path !== '' && path.length > 3) {
                                    texturePathList_1.push(path);
                                }
                            });
                        }
                        texturePathList_1.forEach(function (texturePath) {
                            textureList_1.push(texture_component_1.TextureComponent.getTextureImageOption(texturePath, textureOption_1, 'texture'));
                        });
                        resultUniforms[key] = {
                            value: textureList_1
                        };
                        break;
                    case 'int':
                    case 'integer':
                        resultUniforms[key] = { value: parseInt(valueValue) };
                        break;
                    case 'str':
                    case 'string':
                        resultUniforms[key] = { value: valueValue.toString() };
                        break;
                    case 'double':
                    case 'float':
                    case 'number':
                        resultUniforms[key] = { value: parseFloat(valueValue) };
                        break;
                    default:
                        resultUniforms[key] = { value: valueValue };
                        break;
                }
            }
            else if (interface_1.ThreeUtil.isNotNull(value) && value['value'] !== undefined) {
                resultUniforms[key] = value;
            }
            else {
                switch (key) {
                    case 'color':
                        resultUniforms.color.value = interface_1.ThreeUtil.getColorSafe(value, resultUniforms.color.value);
                        break;
                    case 'deltaX':
                        resultUniforms.delta.value = interface_1.ThreeUtil.getVector2Safe(uniforms.deltaX, uniforms.deltaY, resultUniforms.delta.value);
                        break;
                    case 'powRGBx':
                        resultUniforms.powRGB.value = interface_1.ThreeUtil.getVector3Safe(uniforms.powRGBx, uniforms.powRGBy, uniforms.powRGBz, resultUniforms.powRGB.value);
                        break;
                    case 'mulRGBx':
                        resultUniforms.mulRGB.value = interface_1.ThreeUtil.getVector3Safe(uniforms.mulRGBx, uniforms.mulRGBy, uniforms.mulRGBz, resultUniforms.mulRGB.value);
                        break;
                    case 'addRGBx':
                        resultUniforms.addRGB.value = interface_1.ThreeUtil.getVector3Safe(uniforms.addRGBx, uniforms.addRGBy, uniforms.addRGBz, resultUniforms.addRGB.value);
                        break;
                    default:
                        resultUniforms[key] = { value: value };
                        break;
                }
            }
        });
        Object.entries(resultUniforms).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            switch (key) {
                case 'resolution':
                    resultUniforms.resolution.value = interface_1.ThreeUtil.getVector2Safe(uniforms.resolutionX || _this.width || 1024, uniforms.resolutionY || _this.height || 1024, value.value);
                    break;
                case 'bloomTexture':
                    if (interface_1.ThreeUtil.isNotNull(_this.bloomTexture) && interface_1.ThreeUtil.isNotNull(_this.bloomTexture.getRenderTarget2)) {
                        resultUniforms.bloomTexture.value = _this.bloomTexture.getRenderTarget2().texture;
                    }
                    break;
            }
        });
        if (this.debug) {
            this.consoleLog('pass-uniforms', resultUniforms);
        }
        return resultUniforms;
    };
    /**
     * Sets assign uniforms
     * @param resultUniforms
     */
    PassComponent.prototype.setAssignUniforms = function (resultUniforms) {
        var _this = this;
        if (interface_1.ThreeUtil.isNotNull(this.uniforms)) {
            Object.entries(resultUniforms).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                _this.uniforms[key] = value;
            });
        }
    };
    /**
     * Gets material shader
     * @param type
     * @returns
     */
    PassComponent.prototype.getMaterialShader = function (type) {
        if (type === 'x-shader/x-vertex') {
            if (interface_1.ThreeUtil.isNotNull(this.vertexShader) || interface_1.ThreeUtil.isNotNull(this.materialShader)) {
                return shaderUtils_1.ShaderUtils.getVertexShader(interface_1.ThreeUtil.getTypeSafe(this.vertexShader, this.materialShader));
            }
        }
        else if (type === 'x-shader/x-fragment') {
            if (interface_1.ThreeUtil.isNotNull(this.fragmentShader) || interface_1.ThreeUtil.isNotNull(this.materialShader)) {
                return shaderUtils_1.ShaderUtils.getFragmentShader(interface_1.ThreeUtil.getTypeSafe(this.fragmentShader, this.materialShader));
            }
        }
        if (this.shaderList !== null && this.shaderList.length > 0) {
            var foundShader = this.shaderList.find(function (shader) {
                return shader.type.toLowerCase() === type;
            });
            if (foundShader !== null && foundShader !== undefined) {
                return foundShader.getShader();
            }
        }
        return undefined;
    };
    /**
     * Gets texture id
     * @param [def]
     * @returns texture id
     */
    PassComponent.prototype.getTextureId = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textureId, def);
    };
    /**
     * Gets map
     * @param [effectComposer]
     * @param [camera]
     * @param [scene]
     * @param [mapType]
     * @returns map
     */
    PassComponent.prototype.getMap = function (effectComposer, camera, scene, mapType) {
        var map = this.getTexture(this.map, this.texture);
        if (interface_1.ThreeUtil.isNotNull(map)) {
            return map;
        }
        if (interface_1.ThreeUtil.isNotNull(effectComposer)) {
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
        var refMap = this.map;
        if (interface_1.ThreeUtil.isNotNull(refMap) && refMap.getRenderTarget2 && refMap.getRenderTarget1 && refMap.getWriteBuffer && refMap.getReadBuffer) {
            switch ((mapType || '').toLowerCase()) {
                case 'target1':
                    return refMap.getRenderTarget1(effectComposer.renderer, camera, scene).texture;
                case 'write':
                    return refMap.getWriteBuffer(effectComposer.renderer, camera, scene).texture;
                case 'read':
                    return refMap.getReadBuffer(effectComposer.renderer, camera, scene).texture;
                case 'target2':
                default:
                    return refMap.getRenderTarget2(effectComposer.renderer, camera, scene).texture;
            }
        }
        return undefined;
    };
    /**
     * Gets radius
     * @param [def]
     * @returns radius
     */
    PassComponent.prototype.getRadius = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.radius, def);
    };
    /**
     * Gets threshold
     * @param [def]
     * @returns threshold
     */
    PassComponent.prototype.getThreshold = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.threshold, def);
    };
    /**
     * Gets go wild
     * @param [def]
     * @returns true if go wild
     */
    PassComponent.prototype.getGoWild = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.goWild, def);
    };
    /**
     * Sets scene
     * @param [scene]
     */
    PassComponent.prototype.setScene = function (scene) {
        if (this.effectScene !== scene) {
            this.effectScene = scene;
            if (this.pass !== null && this.pass['scene'] !== undefined) {
                this.pass['scene'] = this.getScene(this.effectScene);
            }
        }
    };
    /**
     * Sets effect composer
     * @param [scene]
     * @param [camera]
     * @param [effectComposer]
     */
    PassComponent.prototype.setEffectComposer = function (scene, camera, effectComposer) {
        if (this.effectComposer !== effectComposer || scene !== this.effectScene || camera !== this.effectCamera) {
            this.effectComposer = effectComposer;
            this.effectScene = scene;
            this.effectCamera = camera;
            if (this.pass === null) {
                this.getPass();
            }
            else {
                this.needUpdate = true;
            }
        }
    };
    /**
     * Gets object
     * @returns object
     */
    PassComponent.prototype.getObject = function () {
        return this.getPass();
    };
    /**
     * Applys changes
     * @param changes
     * @returns
     */
    PassComponent.prototype.applyChanges = function (changes) {
        var _this = this;
        if (this.pass !== null) {
            if (interface_1.ThreeUtil.isIndexOf(changes, 'clearinit')) {
                this.getPass();
                return;
            }
            if (!interface_1.ThreeUtil.isOnlyIndexOf(changes, ['init', 'enabled', 'needsswap', 'clear', 'rendertoscreen'], this.OBJECT_ATTR)) {
                this.needUpdate = true;
                return;
            }
            if (interface_1.ThreeUtil.isIndexOf(changes, 'init')) {
                changes = interface_1.ThreeUtil.pushUniq(changes, ['enabled', 'needsswap', 'clear', 'rendertoscreen']);
            }
            changes.forEach(function (change) {
                switch (change.toLowerCase()) {
                    case 'enabled':
                        if (interface_1.ThreeUtil.isNotNull(_this.enabled)) {
                            _this.pass.enabled = _this.getEnabled(true);
                        }
                        break;
                    case 'needsswap':
                        if (interface_1.ThreeUtil.isNotNull(_this.needsSwap)) {
                            _this.pass.needsSwap = _this.getNeedsSwap(true);
                        }
                        break;
                    case 'clear':
                        if (interface_1.ThreeUtil.isNotNull(_this.clear)) {
                            _this.pass.clear = _this.getClear(false);
                        }
                        break;
                    case 'rendertoscreen':
                        if (interface_1.ThreeUtil.isNotNull(_this.renderToScreen)) {
                            _this.pass.renderToScreen = _this.getRenderToScreen(false);
                        }
                        break;
                }
            });
            _super.prototype.applyChanges.call(this, changes);
        }
    };
    /**
     * Gets pass
     * @returns pass
     */
    PassComponent.prototype.getPass = function () {
        var _this = this;
        if (this.pass === null || this._needUpdate) {
            this.needUpdate = false;
            var pass = null;
            if (interface_1.ThreeUtil.isNotNull(this.refer)) {
                this.unSubscribeRefer('referPass');
                if (interface_1.ThreeUtil.isNotNull(this.refer.getPass)) {
                    pass = this.refer.getPass();
                }
                this.subscribeRefer('referPass', interface_1.ThreeUtil.getSubscribe(this.refer, function () {
                    _this.needUpdate = true;
                }, 'pass'));
            }
            if (pass === null) {
                switch (this.type.toLowerCase()) {
                    case 'adaptivetonemappingpass':
                    case 'adaptivetonemapping':
                        pass = new AdaptiveToneMappingPass_1.AdaptiveToneMappingPass(this.getAdaptive(), this.getResolution());
                        break;
                    case 'afterimagepass':
                    case 'afterimage':
                        pass = new AfterimagePass_1.AfterimagePass(this.getDamp());
                        break;
                    case 'bloompass':
                    case 'bloom':
                        pass = new BloomPass_1.BloomPass(this.getStrength(), this.getKernelSize(), this.getSigma(), this.getResolution());
                        break;
                    case 'bokehpass':
                    case 'bokeh':
                        pass = new BokehPass_1.BokehPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), {
                            focus: interface_1.ThreeUtil.getTypeSafe(this.focus, 1.0),
                            aspect: interface_1.ThreeUtil.getTypeSafe(this.aspect, null),
                            aperture: interface_1.ThreeUtil.getTypeSafe(this.aperture, null),
                            maxblur: interface_1.ThreeUtil.getTypeSafe(this.maxblur, null),
                            width: interface_1.ThreeUtil.getTypeSafe(this.width, null),
                            height: interface_1.ThreeUtil.getTypeSafe(this.height, null)
                        });
                        break;
                    case 'cubetexturepass':
                    case 'cubetexture':
                        pass = new CubeTexturePass_1.CubeTexturePass(this.getCamera(this.effectCamera), this.getEnvMap(), this.getOpacity());
                        break;
                    case 'dotscreenpass':
                    case 'dotscreen':
                        pass = new DotScreenPass_1.DotScreenPass(this.getCenter(), this.getAngle(), this.getScale());
                        break;
                    case 'filmpass':
                    case 'film':
                        pass = new FilmPass_1.FilmPass(this.getNoiseIntensity(), this.getScanlinesIntensity(), this.getScanlinesCount(), this.getGrayscale());
                        break;
                    case 'glitchpass':
                    case 'glitch':
                        var glitchpass = new GlitchPass_1.GlitchPass(this.getDtSize());
                        glitchpass.goWild = this.getGoWild(false);
                        pass = glitchpass;
                        break;
                    case 'halftonepass':
                    case 'halftone':
                        var halftonePass = new HalftonePass_1.HalftonePass(this.getWidth(), this.getHeight(), null // this.getParams(null)
                        );
                        pass = halftonePass;
                        break;
                    case 'clearmaskpass':
                    case 'clearmask':
                        pass = new MaskPass_1.ClearMaskPass();
                        break;
                    case 'maskpass':
                    case 'mask':
                        var maskpass = new MaskPass_1.MaskPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera));
                        if (interface_1.ThreeUtil.isNotNull(this.inverse)) {
                            maskpass.inverse = interface_1.ThreeUtil.getTypeSafe(this.inverse, false);
                        }
                        pass = maskpass;
                        break;
                    case 'outlinepass':
                    case 'outline':
                        var outlinePass = new OutlinePass_1.OutlinePass(interface_1.ThreeUtil.getVector2Safe(this.getWidth(1024), this.getHeight(1024)), this.getScene(this.effectScene), this.getCamera(this.effectCamera));
                        if (interface_1.ThreeUtil.isNotNull(this.patternTexture)) {
                            outlinePass.patternTexture = this.getPatternTexture();
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.selectedObjects)) {
                            outlinePass.selectedObjects = this.getSelectedObjects();
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.visibleEdgeColor)) {
                            outlinePass.visibleEdgeColor = interface_1.ThreeUtil.getColorSafe(this.visibleEdgeColor, 0xffffff);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.hiddenEdgeColor)) {
                            outlinePass.hiddenEdgeColor = interface_1.ThreeUtil.getColorSafe(this.hiddenEdgeColor, 0xffffff);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.edgeGlow)) {
                            outlinePass.edgeGlow = interface_1.ThreeUtil.getTypeSafe(this.edgeGlow, 0);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.usePatternTexture)) {
                            outlinePass.usePatternTexture = interface_1.ThreeUtil.getTypeSafe(this.usePatternTexture, false);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.edgeThickness)) {
                            outlinePass.edgeThickness = interface_1.ThreeUtil.getTypeSafe(this.edgeThickness, 1.0);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.edgeStrength)) {
                            outlinePass.edgeStrength = interface_1.ThreeUtil.getTypeSafe(this.edgeStrength, 3.0);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.downSampleRatio)) {
                            outlinePass.downSampleRatio = interface_1.ThreeUtil.getTypeSafe(this.downSampleRatio, 2.0);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.pulsePeriod)) {
                            outlinePass.pulsePeriod = interface_1.ThreeUtil.getTypeSafe(this.pulsePeriod, 0.0);
                        }
                        pass = outlinePass;
                        break;
                    case 'renderpass':
                    case 'render':
                        pass = new RenderPass_1.RenderPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera)
                        //this.getOverrideMaterial(null),
                        //new THREE.Color(this.getClearColor()),
                        // this.getClearAlpha()
                        );
                        break;
                    case 'saopass':
                    case 'sao':
                        var saoPass = new SAOPass_1.SAOPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getDepthTexture(), this.getUseNormals(), interface_1.ThreeUtil.getVector2Safe(this.width, this.height));
                        saoPass.params = {
                            output: this.getSaoOutput('Default'),
                            saoBias: interface_1.ThreeUtil.getTypeSafe(this.saoBias, 0.5),
                            saoIntensity: interface_1.ThreeUtil.getTypeSafe(this.saoIntensity, 0.18),
                            saoScale: interface_1.ThreeUtil.getTypeSafe(this.saoScale, 1),
                            saoKernelRadius: interface_1.ThreeUtil.getTypeSafe(this.saoKernelRadius, this.kernelRadius, 100),
                            saoMinResolution: interface_1.ThreeUtil.getTypeSafe(this.saoMinResolution, 0),
                            saoBlur: interface_1.ThreeUtil.getTypeSafe(this.saoBlur, true),
                            saoBlurRadius: interface_1.ThreeUtil.getTypeSafe(this.saoBlurRadius, 8),
                            saoBlurStdDev: interface_1.ThreeUtil.getTypeSafe(this.saoBlurStdDev, 4),
                            saoBlurDepthCutoff: interface_1.ThreeUtil.getTypeSafe(this.saoBlurDepthCutoff, 0.01)
                        };
                        pass = saoPass;
                        break;
                    case 'savepass':
                    case 'save':
                        pass = new SavePass_1.SavePass(this.getRenderTarget());
                        break;
                    case 'shaderpass':
                    case 'shader':
                        var shaderPass = new ShaderPass_1.ShaderPass(this.getShader(), this.getTextureId());
                        pass = shaderPass;
                        break;
                    case 'smaapass':
                    case 'smaa':
                        pass = new SMAAPass_1.SMAAPass(this.getWidth(1024), this.getHeight(1024));
                        break;
                    case 'ssaarenderpass':
                    case 'ssaarender':
                        var ssaaRenderPass = new SSAARenderPass_1.SSAARenderPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getClearColor(), this.getClearAlpha());
                        if (interface_1.ThreeUtil.isNotNull(this.sampleLevel)) {
                            ssaaRenderPass.sampleLevel = interface_1.ThreeUtil.getTypeSafe(this.sampleLevel, 4);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.unbiased)) {
                            ssaaRenderPass.unbiased = interface_1.ThreeUtil.getTypeSafe(this.unbiased, true);
                        }
                        pass = ssaaRenderPass;
                        break;
                    case 'ssaopass':
                    case 'ssao':
                        var ssaoPass = new SSAOPass_1.SSAOPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getWidth(), this.getHeight());
                        ssaoPass.output = this.getSsaoOutput('Default');
                        ssaoPass.kernelRadius = interface_1.ThreeUtil.getTypeSafe(this.kernelRadius, this.saoKernelRadius, 8);
                        ssaoPass.minDistance = interface_1.ThreeUtil.getTypeSafe(this.minDistance, 0.005);
                        ssaoPass.maxDistance = interface_1.ThreeUtil.getTypeSafe(this.maxDistance, 0.1);
                        pass = ssaoPass;
                        break;
                    case 'taarenderpass':
                    case 'taarender':
                        var taaRenderPass = new TAARenderPass_1.TAARenderPass(this.getScene(this.effectScene), this.getCamera(this.effectCamera), this.getClearColor(), this.getClearAlpha());
                        if (interface_1.ThreeUtil.isNotNull(this.sampleLevel)) {
                            taaRenderPass.sampleLevel = interface_1.ThreeUtil.getTypeSafe(this.sampleLevel, 4);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.unbiased)) {
                            taaRenderPass.unbiased = interface_1.ThreeUtil.getTypeSafe(this.unbiased, true);
                        }
                        if (interface_1.ThreeUtil.isNotNull(this.accumulate)) {
                            taaRenderPass.accumulate = interface_1.ThreeUtil.getTypeSafe(this.accumulate, false);
                        }
                        pass = taaRenderPass;
                        break;
                    case 'texturepass':
                    case 'texture':
                        pass = new TexturePass_1.TexturePass(this.getMap(this.effectComposer, this.effectCamera, this.effectScene), this.getOpacity());
                        break;
                    case 'unrealbloompass':
                    case 'unrealbloom':
                        pass = new UnrealBloomPass_1.UnrealBloomPass(interface_1.ThreeUtil.getVector2Safe(this.width | 512, this.height | 512, new THREE.Vector2(512, 512)), this.getStrength(1.5), this.getRadius(0.4), this.getThreshold(0.85));
                        break;
                    case 'ssrpass':
                    case 'ssr': // todo
                        pass = new SSRPass_1.SSRPass({
                            renderer: null,
                            scene: null,
                            camera: null,
                            width: null,
                            height: null,
                            selects: null,
                            encoding: null,
                            isPerspectiveCamera: null,
                            isBouncing: null,
                            morphTargets: null,
                            groundReflector: null
                        });
                        break;
                    case 'ssrrpass':
                    case 'ssrr': // todo
                        pass = new SSRrPass_1.SSRrPass({
                            renderer: null,
                            scene: null,
                            camera: null,
                            width: null,
                            height: null,
                            selects: null,
                            encoding: null,
                            morphTargets: null
                        });
                        break;
                    case 'lutpass':
                    case 'lut':
                        var lutPass = new LUTPass_1.LUTPass({
                            lut: null,
                            intensity: this.getIntensity()
                        });
                        lutPass.enabled = false;
                        this.getLut(function (result) {
                            _this.pass['lut'] = _this.use2DLut ? result.texture : result.texture3D;
                            _this.pass.enabled = _this.enabled;
                        });
                        pass = lutPass;
                        break;
                    case 'clearpass':
                    case 'clear':
                        pass = new ClearPass_1.ClearPass(this.getClearColor(), this.getClearAlpha());
                        break;
                    default:
                        pass = null;
                        break;
                }
            }
            if (this.effectComposer !== null && pass !== null) {
                var passIndex = -1;
                if (this.pass !== null) {
                    passIndex = this.effectComposer.passes.indexOf(this.pass);
                }
                if (passIndex === -1) {
                    this.effectComposer.addPass(pass);
                }
                else {
                    this.effectComposer.removePass(this.pass);
                    this.effectComposer.insertPass(pass, passIndex);
                }
            }
            if (interface_1.ThreeUtil.isNotNull(pass['uniforms']) && interface_1.ThreeUtil.isNotNull(this.uniforms)) {
                this.setAssignUniforms(pass['uniforms']);
            }
            this.pass = pass;
            this.setObject(this.pass);
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
    ], PassComponent.prototype, "intensity");
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
    ], PassComponent.prototype, "materialShader");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "textureId");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "map");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "texture");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "patternTexture");
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
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "lut");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "use2DLut");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "inverse");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "focus");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "aspect");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "aperture");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "maxblur");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "sampleLevel");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "unbiased");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "accumulate");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "visibleEdgeColor");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "hiddenEdgeColor");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "edgeGlow");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "usePatternTexture");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "edgeThickness");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "edgeStrength");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "downSampleRatio");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "pulsePeriod");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "output");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "kernelRadius");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "minDistance");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "maxDistance");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoBias");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoIntensity");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoScale");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoKernelRadius");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoMinResolution");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoBlur");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoBlurRadius");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoBlurStdDev");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "saoBlurDepthCutoff");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "vertexShader");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "fragmentShader");
    __decorate([
        core_1.Input()
    ], PassComponent.prototype, "bloomTexture");
    __decorate([
        core_1.ContentChildren(shader_component_1.ShaderComponent)
    ], PassComponent.prototype, "shaderList");
    PassComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-pass',
            templateUrl: './pass.component.html',
            styleUrls: ['./pass.component.scss']
        })
    ], PassComponent);
    return PassComponent;
}(subscribe_abstract_1.AbstractSubscribeComponent));
exports.PassComponent = PassComponent;
