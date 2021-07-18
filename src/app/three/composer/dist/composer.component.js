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
exports.ComposerComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var EffectComposer_1 = require("three/examples/jsm/postprocessing/EffectComposer");
var interface_1 = require("../interface");
var pass_component_1 = require("../pass/pass.component");
var tween_abstract_1 = require("../tween.abstract");
var ComposerComponent = /** @class */ (function (_super) {
    __extends(ComposerComponent, _super);
    function ComposerComponent() {
        var _this = _super.call(this) || this;
        _this.scene = null;
        _this.camera = null;
        _this.clear = false;
        _this.viewport = false;
        _this.x = 0;
        _this.y = 0;
        _this.width = '100%';
        _this.height = '100%';
        _this.cameraWidth = 0;
        _this.cameraHeight = 0;
        _this.webGLRenderer = null;
        _this.effectCamera = null;
        _this.effectScene = null;
        _this.effectComposer = null;
        return _this;
    }
    ComposerComponent.prototype.getScene = function (def) {
        var scene = interface_1.ThreeUtil.getTypeSafe(this.scene, def);
        return interface_1.ThreeUtil.isNotNull(scene) ? scene : new THREE.Scene();
    };
    ComposerComponent.prototype.getCamera = function (def) {
        var camera = interface_1.ThreeUtil.getTypeSafe(this.camera, def);
        return interface_1.ThreeUtil.isNotNull(camera) ? camera : new THREE.Camera();
    };
    ComposerComponent.prototype.getX = function (def) {
        var x = interface_1.ThreeUtil.getTypeSafe(this.x, def);
        if (interface_1.ThreeUtil.isNotNull(x)) {
            if (typeof (x) == 'string') {
                if (x.endsWith('%')) {
                    return this.cameraWidth * parseFloat(x.slice(0, -1)) / 100;
                }
                else {
                    return parseFloat(x);
                }
            }
            else {
                return x;
            }
        }
        return 0;
    };
    ComposerComponent.prototype.getY = function (def) {
        var y = interface_1.ThreeUtil.getTypeSafe(this.y, def);
        if (interface_1.ThreeUtil.isNotNull(y)) {
            if (typeof (y) == 'string') {
                if (y.endsWith('%')) {
                    return this.cameraHeight * parseFloat(y.slice(0, -1)) / 100;
                }
                else {
                    return parseFloat(y);
                }
            }
            else {
                return y;
            }
        }
        return 0;
    };
    ComposerComponent.prototype.getWidth = function (def) {
        var width = interface_1.ThreeUtil.getTypeSafe(this.width, def);
        if (interface_1.ThreeUtil.isNotNull(width)) {
            if (typeof (width) == 'string') {
                if (width.endsWith('%')) {
                    return this.cameraWidth * parseFloat(width.slice(0, -1)) / 100;
                }
                else {
                    return parseFloat(width);
                }
            }
            else {
                return width;
            }
        }
        return 0;
    };
    ComposerComponent.prototype.getHeight = function (def) {
        var height = interface_1.ThreeUtil.getTypeSafe(this.height, def);
        if (interface_1.ThreeUtil.isNotNull(height)) {
            if (typeof (height) == 'string') {
                if (height.endsWith('%')) {
                    return this.cameraHeight * parseFloat(height.slice(0, -1)) / 100;
                }
                else {
                    return parseFloat(height);
                }
            }
            else {
                return height;
            }
        }
        return 0;
    };
    ComposerComponent.prototype.setCamera = function (cameraComponent) {
        if (cameraComponent.getCamera) {
            this.effectCamera = cameraComponent.getCamera();
            this.effectScene = cameraComponent.getScene();
            this.webGLRenderer = cameraComponent.getRenderer();
            this.resetEffectComposer();
        }
    };
    ComposerComponent.prototype.ngOnInit = function () {
    };
    ComposerComponent.prototype.resetEffectComposer = function () {
        this.effectComposer = null;
        if (this.effectCamera !== null && this.webGLRenderer) {
            this.effectComposer = this.getEffectComposer(this.webGLRenderer, this.effectCamera, this.effectScene);
        }
    };
    ComposerComponent.prototype.setCameraSize = function (width, height) {
        this.cameraWidth = width;
        this.cameraHeight = height;
    };
    ComposerComponent.prototype.render = function (webGLRenderer, renderTimer) {
        if (this.effectComposer !== null) {
            if (this.clear) {
                webGLRenderer.autoClear = false;
                webGLRenderer.clear();
            }
            if (this.viewport) {
                webGLRenderer.setViewport(this.getX(), this.getY(), this.getWidth(), this.getHeight());
            }
            this.effectComposer.render(renderTimer.delta);
        }
    };
    ComposerComponent.prototype.getWriteBuffer = function (webGLRenderer, camera, scene) {
        return this.getEffectComposer(webGLRenderer, camera, scene).writeBuffer;
    };
    ComposerComponent.prototype.getReadBuffer = function (webGLRenderer, camera, scene) {
        return this.getEffectComposer(webGLRenderer, camera, scene).readBuffer;
    };
    ComposerComponent.prototype.getRenderTarget1 = function (webGLRenderer, camera, scene) {
        return this.getEffectComposer(webGLRenderer, camera, scene).renderTarget1;
    };
    ComposerComponent.prototype.getRenderTarget2 = function (webGLRenderer, camera, scene) {
        return this.getEffectComposer(webGLRenderer, camera, scene).renderTarget2;
    };
    ComposerComponent.prototype.getEffectComposer = function (webGLRenderer, camera, scene) {
        var _this = this;
        if (this.effectComposer === null) {
            this.effectComposer = new EffectComposer_1.EffectComposer(webGLRenderer);
            this.pass.forEach(function (item) {
                item.getPass(_this.getScene(scene), _this.getCamera(camera), _this.effectComposer);
            });
        }
        return this.effectComposer;
    };
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "scene");
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "camera");
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "clear");
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "viewport");
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], ComposerComponent.prototype, "height");
    __decorate([
        core_1.ContentChildren(pass_component_1.PassComponent, { descendants: false })
    ], ComposerComponent.prototype, "pass");
    ComposerComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-composer',
            templateUrl: './composer.component.html',
            styleUrls: ['./composer.component.scss']
        })
    ], ComposerComponent);
    return ComposerComponent;
}(tween_abstract_1.AbstractTweenComponent));
exports.ComposerComponent = ComposerComponent;
