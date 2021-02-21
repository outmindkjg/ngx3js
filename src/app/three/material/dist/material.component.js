"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MaterialComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var interface_1 = require("../interface");
var plane_component_1 = require("../plane/plane.component");
var shader_component_1 = require("../shader/shader.component");
var texture_component_1 = require("../texture/texture.component");
var MaterialComponent = /** @class */ (function () {
    function MaterialComponent(localStorageService) {
        this.localStorageService = localStorageService;
        this.type = "lambert";
        this.name = null;
        this.visible = null;
        this.materialType = "material";
        this.refer = null;
        this.storageName = null;
        this.color = null;
        this.opacity = null;
        this.alphaTest = null;
        this.blendDst = null;
        this.blendDstAlpha = null;
        this.blendEquation = null;
        this.blendEquationAlpha = null;
        this.blending = null;
        this.blendSrc = null;
        this.blendSrcAlpha = null;
        this.clipIntersection = null;
        this.clipShadows = null;
        this.colorWrite = null;
        this.defines = null;
        this.depthFunc = null;
        this.depthTest = null;
        this.depthWrite = null;
        this.fog = null;
        this.polygonOffset = null;
        this.polygonOffsetFactor = null;
        this.polygonOffsetUnits = null;
        this.precision = null;
        this.premultipliedAlpha = null;
        this.dithering = null;
        this.flatShading = null;
        this.side = null;
        this.shadowSide = null;
        this.toneMapped = null;
        this.vertexColors = null;
        this.stencilWrite = null;
        this.stencilFunc = null;
        this.stencilRef = null;
        this.stencilWriteMask = null;
        this.stencilFuncMask = null;
        this.stencilFail = null;
        this.stencilZFail = null;
        this.stencilZPass = null;
        this.userData = null;
        this.uniforms = null;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.lights = null;
        this.clipping = null;
        this.transparent = false;
        this.wireframe = false;
        this.shading = null;
        this.specular = null;
        this.shininess = null;
        this.lightMapIntensity = null;
        this.aoMapIntensity = null;
        this.emissive = null;
        this.emissiveIntensity = null;
        this.bumpScale = null;
        this.normalMapType = null;
        this.normalScaleX = null;
        this.normalScaleY = null;
        this.displacementScale = null;
        this.displacementBias = null;
        this.combine = null;
        this.reflectivity = null;
        this.refractionRatio = null;
        this.wireframeLinewidth = null;
        this.wireframeLinecap = null;
        this.wireframeLinejoin = null;
        this.skinning = null;
        this.morphTargets = null;
        this.morphNormals = null;
        this.linewidth = null;
        this.linecap = null;
        this.linejoin = null;
        this.scale = null;
        this.dashSize = null;
        this.gapSize = null;
        this.depthPacking = null;
        this.farDistance = null;
        this.nearDistance = null;
        this.referencePositionX = null;
        this.referencePositionY = null;
        this.referencePositionZ = null;
        this.clearcoat = null;
        this.clearcoatRoughness = null;
        this.clearcoatNormalScaleX = null;
        this.clearcoatNormalScaleY = null;
        this.ior = null;
        this.sheen = null;
        this.transmission = null;
        this.roughness = null;
        this.metalness = null;
        this.envMapIntensity = null;
        this.vertexTangents = null;
        this.rotation = null;
        this.size = null;
        this.sizeAttenuation = null;
        this.meshPositions = [];
        this.meshRotations = [];
        this.meshScales = [];
        this.meshTranslations = [];
        this.meshMaterials = [];
        this.material = null;
        this.parent = null;
        this.refSeqn = 0;
        this.backgroundangularTryOutCnt = 0;
    }
    MaterialComponent.prototype.ngOnInit = function () {
    };
    MaterialComponent.prototype.ngOnDestroy = function () {
        if (this.parent !== null) {
            if (this.parent instanceof THREE.Scene) {
                var material = this.getMaterial();
                if (material === this.parent.overrideMaterial) {
                    this.parent.overrideMaterial = null;
                }
            }
        }
    };
    MaterialComponent.prototype.ngAfterContentInit = function () {
        this.textures.changes.subscribe(function (e) {
        });
    };
    MaterialComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.material = null;
        }
        this.resetMaterial();
    };
    MaterialComponent.prototype.getColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color, def);
    };
    MaterialComponent.prototype.getOpacity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.opacity, def);
    };
    MaterialComponent.prototype.getTransparent = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.transparent, def);
    };
    MaterialComponent.prototype.getWireframe = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.wireframe, def);
    };
    MaterialComponent.prototype.getShading = function (def) {
        var shading = interface_1.ThreeUtil.getTypeSafe(this.shading, def, '');
        switch (shading.toLowerCase()) {
            case 'smooth':
                return THREE.SmoothShading;
            case 'flat':
                return THREE.FlatShading;
        }
        return undefined;
    };
    MaterialComponent.prototype.getSpecular = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.specular, def);
    };
    MaterialComponent.prototype.getShininess = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shininess, def);
    };
    MaterialComponent.prototype.getLightMapIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.lightMapIntensity, def);
    };
    MaterialComponent.prototype.getAoMapIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.aoMapIntensity, def);
    };
    MaterialComponent.prototype.getEmissive = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.emissive, def);
    };
    MaterialComponent.prototype.getEmissiveIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.emissiveIntensity, def);
    };
    MaterialComponent.prototype.getBumpScale = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.bumpScale, def);
    };
    MaterialComponent.prototype.getNormalMapType = function (def) {
        var normalMapType = interface_1.ThreeUtil.getTypeSafe(this.normalMapType, def, '');
        switch (normalMapType.toLowerCase()) {
            case 'tangentspace':
                return THREE.TangentSpaceNormalMap;
            case 'objectspace':
                return THREE.ObjectSpaceNormalMap;
        }
        return undefined;
    };
    MaterialComponent.prototype.getNormalScale = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.normalScaleX, this.normalScaleY, def);
    };
    MaterialComponent.prototype.getDisplacementScale = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.displacementScale, def);
    };
    MaterialComponent.prototype.getDisplacementBias = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.displacementBias, def);
    };
    MaterialComponent.prototype.getCombine = function (def) {
        var combine = interface_1.ThreeUtil.getTypeSafe(this.combine, def, '');
        switch (combine.toLowerCase()) {
            case 'multiply':
                return THREE.MultiplyOperation;
            case 'mix':
                return THREE.MixOperation;
            case 'add':
                return THREE.AddOperation;
        }
        return undefined;
    };
    MaterialComponent.prototype.getReflectivity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.reflectivity, def);
    };
    MaterialComponent.prototype.getRefractionRatio = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.refractionRatio, def);
    };
    MaterialComponent.prototype.getWireframeLinewidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.wireframeLinewidth, def);
    };
    MaterialComponent.prototype.getWireframeLinecap = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.wireframeLinecap, def);
    };
    MaterialComponent.prototype.getWireframeLinejoin = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.wireframeLinejoin, def);
    };
    MaterialComponent.prototype.getSkinning = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.skinning, def);
    };
    MaterialComponent.prototype.getMorphTargets = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.morphTargets, def);
    };
    MaterialComponent.prototype.getMorphNormals = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.morphNormals, def);
    };
    MaterialComponent.prototype.getLinewidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.linewidth, def);
    };
    MaterialComponent.prototype.getLinecap = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.linecap, def);
    };
    MaterialComponent.prototype.getLinejoin = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.linejoin, def);
    };
    MaterialComponent.prototype.getScale = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.scale, def);
    };
    MaterialComponent.prototype.getDashSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.dashSize, def);
    };
    MaterialComponent.prototype.getGapSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.gapSize, def);
    };
    MaterialComponent.prototype.getDepthPacking = function (def) {
        var depthPacking = interface_1.ThreeUtil.getTypeSafe(this.depthPacking, def, '');
        switch (depthPacking.toLowerCase()) {
            case 'rgba':
                return THREE.RGBADepthPacking;
            case 'basic':
            default:
                return THREE.BasicDepthPacking;
        }
    };
    MaterialComponent.prototype.getFarDistance = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.farDistance, def);
    };
    MaterialComponent.prototype.getNearDistance = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.nearDistance, def);
    };
    MaterialComponent.prototype.getReferencePosition = function (def) {
        return interface_1.ThreeUtil.getVector3Safe(this.referencePositionX, this.referencePositionY, this.referencePositionZ, def);
    };
    MaterialComponent.prototype.getClearcoat = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clearcoat, def);
    };
    MaterialComponent.prototype.getClearcoatRoughness = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clearcoatRoughness, def);
    };
    MaterialComponent.prototype.getClearcoatNormalScale = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.clearcoatNormalScaleX, this.clearcoatNormalScaleY, def);
    };
    MaterialComponent.prototype.getIor = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.ior, def);
    };
    MaterialComponent.prototype.getSheen = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.sheen, def);
    };
    MaterialComponent.prototype.getTransmission = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.transmission, def);
    };
    MaterialComponent.prototype.getRoughness = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.roughness, def);
    };
    MaterialComponent.prototype.getMetalness = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.metalness, def);
    };
    MaterialComponent.prototype.getEnvMapIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.envMapIntensity, def);
    };
    MaterialComponent.prototype.getVertexTangents = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.vertexTangents, def);
    };
    MaterialComponent.prototype.getRotation = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.rotation, def);
    };
    MaterialComponent.prototype.getSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.size, def);
    };
    MaterialComponent.prototype.getSizeAttenuation = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.sizeAttenuation, def);
    };
    MaterialComponent.prototype.getTexture = function (type) {
        if (this.textures !== null && this.textures.length > 0) {
            type = type.toLowerCase();
            var foundTexture = this.textures.find(function (texture) {
                return texture.textureType.toLowerCase() === type;
            });
            if (foundTexture !== null && foundTexture !== undefined) {
                return foundTexture.getTexture();
            }
        }
        return undefined;
    };
    MaterialComponent.prototype.getAlphaTest = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.alphaTest, def);
    };
    MaterialComponent.prototype.getBlendDst = function (def) {
        var blendDst = interface_1.ThreeUtil.getTypeSafe(this.blendDst, def, '');
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
    };
    MaterialComponent.prototype.getBlendDstAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.blendDstAlpha, def);
    };
    MaterialComponent.prototype.getBlendEquation = function (def) {
        var blendEquation = interface_1.ThreeUtil.getTypeSafe(this.blendEquation, def, '');
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
    };
    MaterialComponent.prototype.getBlendEquationAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.blendEquationAlpha, def);
    };
    MaterialComponent.prototype.getBlending = function (def) {
        var blending = interface_1.ThreeUtil.getTypeSafe(this.blending, def, '');
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
    };
    MaterialComponent.prototype.getBlendSrc = function (def) {
        var blendSrc = interface_1.ThreeUtil.getTypeSafe(this.blendSrc, def, '');
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
    };
    MaterialComponent.prototype.getBlendSrcAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.blendSrcAlpha, def);
    };
    MaterialComponent.prototype.getClipIntersection = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clipIntersection, def);
    };
    MaterialComponent.prototype.getClippingPlanes = function (def) {
        if (this.clippingPlanes !== null && this.clippingPlanes !== undefined) {
            var clippingPlanes_1 = [];
            this.clippingPlanes.forEach(function (plane) {
                clippingPlanes_1.push(plane.getWorldPlane());
            });
            return clippingPlanes_1;
        }
        else {
            return def;
        }
    };
    MaterialComponent.prototype.getClipShadows = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clipShadows, def);
    };
    MaterialComponent.prototype.getColorWrite = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.colorWrite, def);
    };
    MaterialComponent.prototype.getDefines = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.defines, def);
    };
    MaterialComponent.prototype.getDepthFunc = function (def) {
        var depthFunc = interface_1.ThreeUtil.getTypeSafe(this.depthFunc, def, '');
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
    };
    MaterialComponent.prototype.getDepthTest = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.depthTest, def);
    };
    MaterialComponent.prototype.getDepthWrite = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.depthWrite, def);
    };
    MaterialComponent.prototype.getFog = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.fog, def);
    };
    MaterialComponent.prototype.getName = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.name, def);
    };
    MaterialComponent.prototype.getPolygonOffset = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.polygonOffset, def);
    };
    MaterialComponent.prototype.getPolygonOffsetFactor = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.polygonOffsetFactor, def);
    };
    MaterialComponent.prototype.getPolygonOffsetUnits = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.polygonOffsetUnits, def);
    };
    MaterialComponent.prototype.getPrecision = function (def) {
        var precision = interface_1.ThreeUtil.getTypeSafe(this.precision, def, '');
        switch (precision.toLowerCase()) {
            case 'highp':
                return 'highp';
            case 'mediump':
                return 'mediump';
            case 'lowp':
                return 'lowp';
        }
        return undefined;
    };
    MaterialComponent.prototype.getPremultipliedAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.premultipliedAlpha, def);
    };
    MaterialComponent.prototype.getDithering = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.dithering, def);
    };
    MaterialComponent.prototype.getFlatShading = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.flatShading, def);
    };
    MaterialComponent.prototype.getSide = function (def) {
        var side = interface_1.ThreeUtil.getTypeSafe(this.side, def, '');
        switch (side.toLowerCase()) {
            case 'back':
                return THREE.BackSide;
            case 'double':
                return THREE.DoubleSide;
            case 'front':
                return THREE.FrontSide;
        }
        return undefined;
    };
    MaterialComponent.prototype.getShadowSide = function (def) {
        var shadowSide = interface_1.ThreeUtil.getTypeSafe(this.shadowSide, def, '');
        switch (shadowSide.toLowerCase()) {
            case 'back':
                return THREE.BackSide;
            case 'double':
                return THREE.DoubleSide;
            case 'front':
                return THREE.FrontSide;
        }
        return undefined;
    };
    MaterialComponent.prototype.getToneMapped = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.toneMapped, def);
    };
    MaterialComponent.prototype.getVertexColors = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.vertexColors, def);
    };
    MaterialComponent.prototype.getVisible = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.visible, def);
    };
    MaterialComponent.prototype.getStencilWrite = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.stencilWrite, def);
    };
    MaterialComponent.prototype.getStencilFunc = function (def) {
        var stencilFunc = interface_1.ThreeUtil.getTypeSafe(this.stencilFunc, def, '');
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
    };
    MaterialComponent.prototype.getStencilRef = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.stencilRef, def);
    };
    MaterialComponent.prototype.getStencilWriteMask = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.stencilWriteMask, def);
    };
    MaterialComponent.prototype.getStencilFuncMask = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.stencilFuncMask, def);
    };
    MaterialComponent.prototype.getStencilFail = function (def) {
        var stencilFail = interface_1.ThreeUtil.getTypeSafe(this.stencilFail, def, '');
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
    };
    MaterialComponent.prototype.getStencilZFail = function (def) {
        var stencilZFail = interface_1.ThreeUtil.getTypeSafe(this.stencilZFail, def, '');
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
    };
    MaterialComponent.prototype.getStencilZPass = function (def) {
        var stencilZPass = interface_1.ThreeUtil.getTypeSafe(this.stencilZPass, def, '');
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
    };
    MaterialComponent.prototype.getUserData = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.userData, def);
    };
    MaterialComponent.prototype.getUniforms = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.uniforms, def);
    };
    MaterialComponent.prototype.getLights = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.lights, def);
    };
    MaterialComponent.prototype.getClipping = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clipping, def);
    };
    MaterialComponent.prototype.getShader = function (type) {
        if (type === 'x-shader/x-vertex') {
            if (interface_1.ThreeUtil.isNotNull(this.vertexShader)) {
                return this.vertexShader;
            }
        }
        else if (type === 'x-shader/x-fragment') {
            if (interface_1.ThreeUtil.isNotNull(this.fragmentShader)) {
                return this.fragmentShader;
            }
        }
        if (this.shaders != null && this.shaders.length > 0) {
            var foundShader = this.shaders.find(function (shader) {
                return shader.type.toLowerCase() === type;
            });
            if (foundShader !== null && foundShader !== undefined) {
                return foundShader.getShader();
            }
        }
        return undefined;
    };
    MaterialComponent.prototype.getMaterialParameters = function (extendObj) {
        var materialParameters = Object.assign({
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
            visible: this.getVisible()
        }, extendObj);
        var materialParametersSafe = {};
        Object.entries(materialParameters).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (interface_1.ThreeUtil.isNotNull(value)) {
                materialParametersSafe[key] = value;
            }
        });
        return materialParametersSafe;
    };
    MaterialComponent.prototype.setParent = function (parent, refSeqn) {
        if (refSeqn === void 0) { refSeqn = 0; }
        this.refSeqn = refSeqn;
        if (this.parent !== parent) {
            this.parent = parent;
            this.resetMaterial();
        }
    };
    MaterialComponent.prototype.resetMaterial = function () {
        var _this = this;
        if (this.parent !== null && this.getVisible(true)) {
            if (this.parent instanceof THREE.Object3D) {
                if (this.clippingPlanes !== null && this.clippingPlanes !== undefined && this.clippingPlanes.length > 0) {
                    var matrixWorld_1 = this.parent.matrixWorld;
                    this.parent.onBeforeRender = function () {
                        _this.clippingPlanes.forEach(function (plane) {
                            plane.getWorldPlane(matrixWorld_1);
                        });
                    };
                }
            }
            var material = this.getMaterial();
            if (this.parent instanceof THREE.Scene) {
                var map = (material['map'] && material['map'] instanceof THREE.Texture) ? material['map'] : null;
                var color = (material['color'] && material['color'] instanceof THREE.Color) ? material['color'] : null;
                switch (this.materialType.toLowerCase()) {
                    case 'environment':
                        if (map !== null) {
                            this.parent.environment = map;
                        }
                        else {
                            this.parent.environment = null;
                        }
                        break;
                    case 'background':
                        if (map !== null) {
                            this.parent.background = map;
                        }
                        else if (color !== null) {
                            this.parent.background = color;
                        }
                        else {
                            this.parent.background = null;
                        }
                        break;
                    case 'background-angular':
                    case 'backgroundangular':
                        if (map !== null) {
                            if (map.image !== null && map.image !== undefined) {
                                this.backgroundangularTryOutCnt = 0;
                                var rt = new THREE.WebGLCubeRenderTarget(map.image.height);
                                rt.fromEquirectangularTexture(interface_1.ThreeUtil.getRenderer(), map);
                                this.parent['background'] = rt;
                            }
                            else {
                                if (this.backgroundangularTryOutCnt < 10) {
                                    setTimeout(function () {
                                        _this.backgroundangularTryOutCnt++;
                                        _this.resetMaterial();
                                    }, 200);
                                }
                            }
                        }
                        else if (color !== null) {
                            this.parent.background = color;
                        }
                        else {
                            this.parent.background = null;
                        }
                        break;
                    case 'material':
                    case 'overrideMaterial':
                        this.parent.overrideMaterial = material;
                        this.parent.overrideMaterial.needsUpdate = true;
                        break;
                }
            }
            else if (this.parent instanceof THREE.Mesh) {
                switch (this.materialType.toLowerCase()) {
                    case 'customdepth':
                        this.parent.customDepthMaterial = material;
                        break;
                    default:
                        if (this.parent.material instanceof Array) {
                            if (this.parent.material.length > this.refSeqn) {
                                this.parent.material[this.refSeqn].copy(material);
                                this.parent.material[this.refSeqn].needsUpdate = true;
                            }
                        }
                        else if (this.parent.material != material) {
                            this.parent.material.copy(material);
                            this.parent.material.needsUpdate = true;
                        }
                        break;
                }
            }
            else if (this.parent.meshMaterials) {
                if (this.parent.meshMaterials.length > this.refSeqn) {
                    var refMaterials = this.parent.meshMaterials[this.refSeqn];
                    if (refMaterials instanceof Array) {
                    }
                    else {
                        refMaterials.copy(material);
                        refMaterials.needsUpdate = true;
                    }
                }
            }
        }
    };
    MaterialComponent.prototype.getMaterial = function () {
        var _this = this;
        if (this.material === null) {
            if (interface_1.ThreeUtil.isNotNull(this.storageName)) {
                this.material = new THREE.MeshLambertMaterial(this.getMaterialParameters({}));
                this.localStorageService.getMaterial(this.storageName, function (material) {
                    _this.material.copy(material);
                    _this.resetMaterial();
                });
            }
            else if (this.refer !== null) {
                if (this.refer.getMaterial) {
                    this.material = this.refer.getMaterial();
                }
                else if (this.refer instanceof THREE.Material) {
                    this.material = this.refer;
                }
            }
            if (this.material === null) {
                switch (this.type.toLowerCase()) {
                    case 'linebasic':
                        var parametersLineBasicMaterial = {
                            opacity: this.getOpacity(),
                            linewidth: this.getLinewidth(),
                            vertexColors: this.getVertexColors()
                        };
                        this.material = new THREE.LineBasicMaterial(this.getMaterialParameters(parametersLineBasicMaterial));
                        break;
                    case 'linedashed':
                        var parametersLineDashedMaterial = {
                            color: this.getColor(),
                            vertexColors: this.getVertexColors(),
                            dashSize: this.getDashSize(),
                            gapSize: this.getGapSize(),
                            scale: this.getScale()
                        };
                        this.material = new THREE.LineDashedMaterial(this.getMaterialParameters(parametersLineDashedMaterial));
                        break;
                    case 'meshbasic':
                        var parametersMeshBasicMaterial = {
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
                            envMap: this.getTexture('envMap')
                        };
                        this.material = new THREE.MeshBasicMaterial(this.getMaterialParameters(parametersMeshBasicMaterial));
                        break;
                    case 'meshdepth':
                        var parametersMeshDepthMaterial = {
                            map: this.getTexture('map'),
                            alphaMap: this.getTexture('alphaMap'),
                            depthPacking: this.getDepthPacking(),
                            displacementMap: this.getTexture('displacementMap'),
                            displacementScale: this.getDisplacementScale(),
                            displacementBias: this.getDisplacementBias(),
                            wireframe: this.getWireframe(),
                            wireframeLinewidth: this.getWireframeLinewidth()
                        };
                        this.material = new THREE.MeshDepthMaterial(this.getMaterialParameters(parametersMeshDepthMaterial));
                        break;
                    case 'meshdistance':
                        var parametersMeshDistanceMaterial = {
                            map: this.getTexture('map'),
                            alphaMap: this.getTexture('alphaMap'),
                            displacementMap: this.getTexture('displacementMap'),
                            displacementScale: this.getDisplacementScale(),
                            displacementBias: this.getDisplacementBias(),
                            farDistance: this.getFarDistance(),
                            nearDistance: this.getNearDistance(),
                            referencePosition: this.getReferencePosition()
                        };
                        this.material = new THREE.MeshDistanceMaterial(this.getMaterialParameters(parametersMeshDistanceMaterial));
                        break;
                    case 'meshmatcap':
                        var parametersMeshMatcapMaterial = {
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
                        };
                        this.material = new THREE.MeshMatcapMaterial(this.getMaterialParameters(parametersMeshMatcapMaterial));
                        break;
                    case 'meshnormal':
                        var parametersMeshNormalMaterial = {
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
                        };
                        this.material = new THREE.MeshNormalMaterial(this.getMaterialParameters(parametersMeshNormalMaterial));
                        break;
                    case 'meshphong':
                        var parametersMeshPhongMaterial = {
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
                        };
                        this.material = new THREE.MeshPhongMaterial(this.getMaterialParameters(parametersMeshPhongMaterial));
                        break;
                    case 'meshphysical':
                        var parametersMeshPhysicalMaterial = {
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
                            sheen: this.getSheen()
                        };
                        this.material = new THREE.MeshPhysicalMaterial(this.getMaterialParameters(parametersMeshPhysicalMaterial));
                        break;
                    case 'meshstandard':
                        var parametersMeshStandardMaterial = {
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
                        };
                        this.material = new THREE.MeshStandardMaterial(this.getMaterialParameters(parametersMeshStandardMaterial));
                        break;
                    case 'meshtoon':
                        var parametersMeshToonMaterial = {
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
                        };
                        this.material = new THREE.MeshToonMaterial(this.getMaterialParameters(parametersMeshToonMaterial));
                        break;
                    case 'points':
                        var parametersPointsMaterial = {
                            color: this.getColor(),
                            map: this.getTexture('map'),
                            alphaMap: this.getTexture('alphaMap'),
                            size: this.getSize(),
                            sizeAttenuation: this.getSizeAttenuation(),
                            morphTargets: this.getMorphTargets()
                        };
                        this.material = new THREE.PointsMaterial(this.getMaterialParameters(parametersPointsMaterial));
                        break;
                    case 'rawshader':
                        var parametersRawShaderMaterial = {
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
                        };
                        this.material = new THREE.RawShaderMaterial(this.getMaterialParameters(parametersRawShaderMaterial));
                        break;
                    case 'shader':
                        var parametersShaderMaterial = {
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
                        };
                        this.material = new THREE.ShaderMaterial(this.getMaterialParameters(parametersShaderMaterial));
                        break;
                    case 'shadow':
                        this.material = new THREE.ShadowMaterial(this.getMaterialParameters({
                            color: this.getColor()
                        }));
                        break;
                    case 'sprite':
                        var parametersSpriteMaterial = {
                            color: this.getColor(),
                            map: this.getTexture('map'),
                            alphaMap: this.getTexture('alphaMap'),
                            rotation: this.getRotation(),
                            sizeAttenuation: this.getSizeAttenuation()
                        };
                        this.material = new THREE.SpriteMaterial(this.getMaterialParameters(parametersSpriteMaterial));
                        break;
                    case 'meshlambert':
                    default:
                        var parametersMeshLambertMaterial = {
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
                        };
                        this.material = new THREE.MeshLambertMaterial(this.getMaterialParameters(parametersMeshLambertMaterial));
                        break;
                }
            }
            if (interface_1.ThreeUtil.isNull(this.material.userData.component)) {
                this.material.userData.component = this;
            }
        }
        return this.material;
    };
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "materialType");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "refer");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "storageName");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "opacity");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "alphaTest");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "blendDst");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "blendDstAlpha");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "blendEquation");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "blendEquationAlpha");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "blending");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "blendSrc");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "blendSrcAlpha");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "clipIntersection");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "clipShadows");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "colorWrite");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "defines");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "depthFunc");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "depthTest");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "depthWrite");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "fog");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "polygonOffset");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "polygonOffsetFactor");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "polygonOffsetUnits");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "precision");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "premultipliedAlpha");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "dithering");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "flatShading");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "side");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "shadowSide");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "toneMapped");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "vertexColors");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilWrite");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilFunc");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilRef");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilWriteMask");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilFuncMask");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilFail");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilZFail");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "stencilZPass");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "userData");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "uniforms");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "vertexShader");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "fragmentShader");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "lights");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "clipping");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "transparent");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "wireframe");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "shading");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "specular");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "shininess");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "lightMapIntensity");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "aoMapIntensity");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "emissive");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "emissiveIntensity");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "bumpScale");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "normalMapType");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "normalScaleX");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "normalScaleY");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "displacementScale");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "displacementBias");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "combine");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "reflectivity");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "refractionRatio");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "wireframeLinewidth");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "wireframeLinecap");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "wireframeLinejoin");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "skinning");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "morphTargets");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "morphNormals");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "linewidth");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "linecap");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "linejoin");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "scale");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "dashSize");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "gapSize");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "depthPacking");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "farDistance");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "nearDistance");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "referencePositionX");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "referencePositionY");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "referencePositionZ");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "clearcoat");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "clearcoatRoughness");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "clearcoatNormalScaleX");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "clearcoatNormalScaleY");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "ior");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "sheen");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "transmission");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "roughness");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "metalness");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "envMapIntensity");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "vertexTangents");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "rotation");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "size");
    __decorate([
        core_1.Input()
    ], MaterialComponent.prototype, "sizeAttenuation");
    __decorate([
        core_1.ContentChildren(texture_component_1.TextureComponent)
    ], MaterialComponent.prototype, "textures");
    __decorate([
        core_1.ContentChildren(shader_component_1.ShaderComponent)
    ], MaterialComponent.prototype, "shaders");
    __decorate([
        core_1.ContentChildren(plane_component_1.PlaneComponent)
    ], MaterialComponent.prototype, "clippingPlanes");
    MaterialComponent = __decorate([
        core_1.Component({
            selector: 'three-material',
            templateUrl: './material.component.html',
            styleUrls: ['./material.component.scss']
        })
    ], MaterialComponent);
    return MaterialComponent;
}());
exports.MaterialComponent = MaterialComponent;
