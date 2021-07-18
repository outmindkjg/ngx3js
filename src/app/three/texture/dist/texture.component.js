"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TextureComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var interface_1 = require("../interface");
var TextureComponent = /** @class */ (function () {
    function TextureComponent() {
        this.refer = null;
        this.textureType = 'map';
        this.image = null;
        this.cubeImage = null;
        this.program = null;
        this.mapping = null;
        this.wrapS = null;
        this.wrapT = null;
        this.magFilter = null;
        this.minFilter = null;
        this.format = null;
        this.type = null;
        this.anisotropy = null;
        this.encoding = null;
        this.repeatX = null;
        this.repeatY = null;
        this.offsetX = null;
        this.offsetY = null;
        this.textureWidth = null;
        this.textureHeight = null;
        this.refTexture = null;
        this.texture = null;
        this._textureSubscribe = null;
    }
    TextureComponent_1 = TextureComponent;
    TextureComponent.prototype.ngOnInit = function () {
    };
    TextureComponent.prototype.ngOnDestroy = function () {
        if (this.texture != null) {
            this.texture.dispose();
        }
        if (this.refTexture != null) {
            this.refTexture.dispose();
        }
    };
    TextureComponent.prototype.ngOnChanges = function (changes) {
        this.getTexture(changes);
        if (this.refTexture != null) {
            this.refTexture.copy(this.texture);
        }
    };
    TextureComponent.prototype.getImage = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.image, def);
    };
    TextureComponent.prototype.getCubeImage = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.cubeImage, def);
    };
    TextureComponent.prototype.getProgram = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.program, def);
    };
    TextureComponent.prototype.getMapping = function (def) {
        var mapping = interface_1.ThreeUtil.getTypeSafe(this.mapping, def, '');
        switch (mapping.toLowerCase()) {
            case 'uv':
                return THREE.UVMapping;
            case 'cubereflection':
                return THREE.CubeReflectionMapping;
            case 'cuberefraction':
                return THREE.CubeRefractionMapping;
            case 'equirectangularreflection':
                return THREE.EquirectangularReflectionMapping;
            case 'equirectangularrefraction':
                return THREE.EquirectangularRefractionMapping;
            case 'cubeuvreflection':
                return THREE.CubeUVReflectionMapping;
            case 'cubeuvrefraction':
                return THREE.CubeUVRefractionMapping;
            default:
                return THREE.Texture.DEFAULT_MAPPING;
        }
    };
    TextureComponent.prototype.getWrapS = function (def) {
        var wrapS = interface_1.ThreeUtil.getTypeSafe(this.wrapS, def, '');
        switch (wrapS.toLowerCase()) {
            case 'repeat':
                return THREE.RepeatWrapping;
            case 'mirroredrepeat':
                return THREE.MirroredRepeatWrapping;
            case 'clamptoedge':
            default:
                return THREE.ClampToEdgeWrapping;
        }
    };
    TextureComponent.prototype.getWrapT = function (def) {
        var wrapT = interface_1.ThreeUtil.getTypeSafe(this.wrapT, def, '');
        switch (wrapT.toLowerCase()) {
            case 'repeat':
                return THREE.RepeatWrapping;
            case 'mirroredrepeat':
                return THREE.MirroredRepeatWrapping;
            case 'clamptoedge':
            default:
                return THREE.ClampToEdgeWrapping;
        }
    };
    TextureComponent.prototype.getMagFilter = function (def) {
        var magFilter = interface_1.ThreeUtil.getTypeSafe(this.magFilter, def, '');
        switch (magFilter.toLowerCase()) {
            case 'nearest':
                return THREE.NearestFilter;
            case 'nearestmipmapnearest':
                return THREE.NearestMipmapNearestFilter;
            case 'nearestmipmaplinear':
                return THREE.NearestMipmapLinearFilter;
            case 'linearmipmapnearest':
                return THREE.LinearMipmapNearestFilter;
            case 'linearmipmaplinear':
                return THREE.LinearMipmapLinearFilter;
            case 'linear':
            default:
                return THREE.LinearFilter;
        }
    };
    TextureComponent.prototype.getMinFilter = function (def) {
        var minFilter = interface_1.ThreeUtil.getTypeSafe(this.minFilter, def, '');
        switch (minFilter.toLowerCase()) {
            case 'nearest':
                return THREE.NearestFilter;
            case 'nearestmipmapnearest':
                return THREE.NearestMipmapNearestFilter;
            case 'nearestmipmaplinear':
                return THREE.NearestMipmapLinearFilter;
            case 'linearmipmapnearest':
                return THREE.LinearMipmapNearestFilter;
            case 'linear':
                return THREE.LinearFilter;
            case 'linearmipmaplinear':
            default:
                return THREE.LinearMipmapLinearFilter;
        }
    };
    TextureComponent.prototype.getFormat = function (def) {
        var format = interface_1.ThreeUtil.getTypeSafe(this.format, def, '');
        switch (format.toLowerCase()) {
            case 'alpha':
                return THREE.AlphaFormat;
            case 'red':
                return THREE.RedFormat;
            case 'redinteger':
                return THREE.RedIntegerFormat;
            case 'rg':
                return THREE.RGFormat;
            case 'rginteger':
                return THREE.RGIntegerFormat;
            case 'rgb':
                return THREE.RGBFormat;
            case 'rgbinteger':
                return THREE.RGBIntegerFormat;
            case 'rgbainteger':
                return THREE.RGBAIntegerFormat;
            case 'luminance':
                return THREE.LuminanceFormat;
            case 'luminancealpha':
                return THREE.LuminanceAlphaFormat;
            case 'rgbe':
                return THREE.RGBEFormat;
            case 'depth':
                return THREE.DepthFormat;
            case 'depthstencil':
                return THREE.DepthStencilFormat;
            case 'rgba':
            default:
                return THREE.RGBAFormat;
        }
    };
    TextureComponent.prototype.getType = function (def) {
        var type = interface_1.ThreeUtil.getTypeSafe(this.type, def, '');
        switch (type.toLowerCase()) {
            case 'byte':
                return THREE.ByteType;
            case 'short':
                return THREE.ShortType;
            case 'unsignedshort':
                return THREE.UnsignedShortType;
            case 'int':
                return THREE.IntType;
            case 'unsignedint':
                return THREE.UnsignedIntType;
            case 'float':
                return THREE.FloatType;
            case 'halffloat':
                return THREE.HalfFloatType;
            case 'unsignedshort4444':
                return THREE.UnsignedShort4444Type;
            case 'unsignedshort5551':
                return THREE.UnsignedShort5551Type;
            case 'unsignedshort565':
                return THREE.UnsignedShort565Type;
            case 'unsignedint248':
                return THREE.UnsignedInt248Type;
            case 'unsignedbyte':
            default:
                return THREE.UnsignedByteType;
        }
    };
    TextureComponent.prototype.getAnisotropy = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.anisotropy, def);
    };
    TextureComponent.prototype.getEncoding = function (def) {
        var encoding = interface_1.ThreeUtil.getTypeSafe(this.encoding, def, '');
        switch (encoding.toLowerCase()) {
            case 'srgb':
                return THREE.sRGBEncoding;
            case 'gamma':
                return THREE.GammaEncoding;
            case 'rgbe':
                return THREE.RGBEEncoding;
            case 'logluv':
                return THREE.LogLuvEncoding;
            case 'rgbm7':
                return THREE.RGBM7Encoding;
            case 'rgbm16':
                return THREE.RGBM16Encoding;
            case 'rgbd':
                return THREE.RGBDEncoding;
            case 'linear':
            default:
                return THREE.LinearEncoding;
        }
    };
    TextureComponent.prototype.getRepeat = function (defX, defY) {
        return interface_1.ThreeUtil.getVector2Safe(this.repeatX, this.repeatY, new THREE.Vector2(defX, defY));
    };
    TextureComponent.prototype.getOffset = function (defX, defY) {
        return interface_1.ThreeUtil.getVector2Safe(this.offsetX, this.offsetY, new THREE.Vector2(defX, defY));
    };
    TextureComponent.prototype.getTextureImage = function (image, cubeImage, program) {
        return TextureComponent_1.getTextureImage(image, cubeImage, program, this.textureWidth, this.textureHeight);
    };
    TextureComponent.getTextureImage = function (image, cubeImage, program, canvasWidth, canvasHeight) {
        if (cubeImage !== null && cubeImage !== undefined && cubeImage.length > 0) {
            if (this.cubeTextureLoader === null) {
                this.cubeTextureLoader = new THREE.CubeTextureLoader();
            }
            if (image !== null && image !== '') {
                this.cubeTextureLoader.setPath(image);
            }
            return this.cubeTextureLoader.load(cubeImage);
        }
        else if (image !== null && image !== '') {
            if (this.textureLoader === null) {
                this.textureLoader = new THREE.TextureLoader();
            }
            return this.textureLoader.load(image);
        }
        else {
            var canvas = document.createElement('canvas');
            canvas.width = canvasWidth ? canvasWidth : 35;
            canvas.height = canvasHeight ? canvasHeight : 35;
            if (program !== null && program !== undefined) {
                var _context = canvas.getContext('2d', {
                    alpha: true
                });
                // _context.save();
                program(_context);
                // _context.restore();
            }
            return new THREE.CanvasTexture(canvas);
        }
    };
    TextureComponent.prototype.setTexture = function (refTexture) {
        if (this.refTexture !== refTexture) {
            this.refTexture = refTexture;
            this.refTexture.copy(this.getTexture());
        }
    };
    TextureComponent.prototype.setReferTexture = function (texture) {
        if (texture instanceof HTMLVideoElement) {
            this.texture = new THREE.VideoTexture(texture);
        }
        else if (texture instanceof THREE.Texture) {
            this.texture = texture;
        }
        if (texture !== null && this.texture !== null && this.refTexture !== null) {
            this.refTexture.copy(this.getTexture());
        }
    };
    TextureComponent.prototype.getTexture = function (changes) {
        var _this = this;
        if (this.texture === null || (changes && (changes.image || changes.program))) {
            if (this._textureSubscribe !== null) {
                this._textureSubscribe.unsubscribe();
                this._textureSubscribe = null;
            }
            if (this.refer !== null) {
                if (this.refer instanceof TextureComponent_1) {
                    this.texture = this.getTextureImage(this.refer.getImage(null), this.refer.getCubeImage(null), this.refer.getProgram(null));
                    this.texture.repeat.copy(this.refer.getRepeat(1, 1));
                    this.texture.offset.copy(this.refer.getOffset(0, 0));
                }
                else if (this.refer.getTexture && this.refer.textureSubscribe) {
                    this.setReferTexture(this.refer.getTexture());
                    this._textureSubscribe = this.refer.textureSubscribe().subscribe(function (texture) {
                        if (texture instanceof THREE.Texture) {
                            _this.setReferTexture(texture);
                        }
                        else {
                            _this.setReferTexture(_this.refer.getTexture());
                        }
                    });
                }
                else {
                    this.texture = new THREE.Texture();
                }
            }
            else {
                this.texture = this.getTextureImage(this.getImage(null), this.getCubeImage(null), this.getProgram(null));
            }
        }
        if (this.texture != null && changes) {
            for (var propName in changes) {
                switch (propName) {
                    case 'wrapS':
                        this.texture.wrapS = this.getWrapS('clamptoedge');
                        break;
                    case 'wrapT':
                        this.texture.wrapT = this.getWrapT('clamptoedge');
                        break;
                    case 'magFilter':
                        this.texture.magFilter = this.getMagFilter('linear');
                        break;
                    case 'minFilter':
                        this.texture.minFilter = this.getMinFilter('linearmipmaplinear');
                        break;
                    case 'format':
                        this.texture.format = this.getFormat('rgba');
                        break;
                    case 'type':
                        this.texture.type = this.getType('unsignedbyte');
                        break;
                    case 'anisotropy':
                        this.texture.anisotropy = this.getAnisotropy(1);
                        break;
                    case 'encoding':
                        this.texture.encoding = this.getEncoding('linear');
                        break;
                    case 'repeatX':
                    case 'repeatY':
                        this.texture.repeat.copy(this.getRepeat(1, 1));
                        break;
                    case 'offsetX':
                    case 'offsetY':
                        this.texture.offset.copy(this.getOffset(0, 0));
                        break;
                }
            }
        }
        return this.texture;
    };
    var TextureComponent_1;
    TextureComponent.textureLoader = null;
    TextureComponent.cubeTextureLoader = null;
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "refer");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "textureType");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "image");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "cubeImage");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "program");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "mapping");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "wrapS");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "wrapT");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "magFilter");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "minFilter");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "format");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "anisotropy");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "encoding");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "repeatX");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "repeatY");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "offsetX");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "offsetY");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "textureWidth");
    __decorate([
        core_1.Input()
    ], TextureComponent.prototype, "textureHeight");
    TextureComponent = TextureComponent_1 = __decorate([
        core_1.Component({
            selector: 'ngx3js-texture',
            templateUrl: './texture.component.html',
            styleUrls: ['./texture.component.scss']
        })
    ], TextureComponent);
    return TextureComponent;
}());
exports.TextureComponent = TextureComponent;
