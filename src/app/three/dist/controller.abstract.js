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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.AutoMaterialController = exports.AutoPositionController = exports.AutoScaleController = exports.AutoRotationController = exports.AbstractThreeController = void 0;
var THREE = require("three");
var GSAP = require("gsap");
var interface_1 = require("./interface");
var material_component_1 = require("./material/material.component");
var object3d_abstract_1 = require("./object3d.abstract");
var visual_component_1 = require("./visual/visual.component");
var AbstractThreeController = /** @class */ (function () {
    function AbstractThreeController(refObject3D, refObject2D) {
        this.enable = true;
        this.duration = 3;
        this.easing = null;
        this.template = null;
        this.repeat = null;
        this.yoyo = null;
        this.overshoot = null;
        this.amplitude = null;
        this.period = null;
        this.linearRatio = null;
        this.power = null;
        this.yoyoMode = null;
        this.steps = null;
        this.refObject = null;
        this.refObject2d = null;
        this._tweenTimer = null;
        this._renderer = null;
        this._scenes = null;
        this._cameras = null;
        this._canvases = null;
        this._scene = null;
        this._camera = null;
        this._canvas = null;
        this.setObject3d(refObject3D);
        this.setObject2d(refObject2D);
    }
    AbstractThreeController.prototype.getDuration = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.duration, def, 3);
    };
    AbstractThreeController.prototype.getRepeat = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.repeat, def, 0);
    };
    AbstractThreeController.prototype.getYoyo = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.yoyo, def, false);
    };
    AbstractThreeController.prototype.getOvershoot = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.overshoot, def, 1);
    };
    AbstractThreeController.prototype.getAmplitude = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.amplitude, def, 1);
    };
    AbstractThreeController.prototype.getPeriod = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.period, def, 1);
    };
    AbstractThreeController.prototype.getLinearRatio = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.linearRatio, def, 1);
    };
    AbstractThreeController.prototype.getPower = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.power, def, 1);
    };
    AbstractThreeController.prototype.getYoyoMode = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.yoyoMode, def, false);
    };
    AbstractThreeController.prototype.getSteps = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.steps, def, 12);
    };
    AbstractThreeController.prototype.getEasing = function (def, isTemplate) {
        var easing = isTemplate
            ? interface_1.ThreeUtil.getTypeSafe(this.template, def, '')
            : interface_1.ThreeUtil.getTypeSafe(this.easing, def, '');
        switch (easing.toLowerCase()) {
            case 'power1':
            case 'power1.easein':
                return GSAP.Power1.easeIn;
            case 'Power1.easeInOut':
                return GSAP.Power1.easeInOut;
            case 'Power1.easeOut':
                return GSAP.Power1.easeOut;
            case 'Power2':
            case 'Power2.easeIn':
                return GSAP.Power2.easeIn;
            case 'Power2.easeInOut':
                return GSAP.Power2.easeInOut;
            case 'Power2.easeOut':
                return GSAP.Power2.easeOut;
            case 'Power3':
            case 'Power3.easeIn':
                return GSAP.Power3.easeIn;
            case 'Power3.easeInOut':
                return GSAP.Power3.easeInOut;
            case 'Power3.easeOut':
                return GSAP.Power3.easeOut;
            case 'Power4':
            case 'Power4.easeIn':
                return GSAP.Power4.easeIn;
            case 'Power4.easeInOut':
                return GSAP.Power4.easeInOut;
            case 'Power4.easeOut':
                return GSAP.Power4.easeOut;
            case 'Back':
            case 'Back.easeIn':
                return GSAP.Back.easeIn.config(this.getOvershoot(1.7));
            case 'Back.easeInOut':
                return GSAP.Back.easeInOut.config(this.getOvershoot(1.7));
            case 'Back.easeOut':
                return GSAP.Back.easeOut.config(this.getOvershoot(1.7));
            case 'Elastic':
            case 'Elastic.easeIn':
                return GSAP.Elastic.easeIn.config(this.getAmplitude(1), this.getPeriod(0.3));
            case 'Elastic.easeInOut':
                return GSAP.Elastic.easeInOut.config(this.getAmplitude(1), this.getPeriod(0.3));
            case 'Elastic.easeOut':
                return GSAP.Elastic.easeOut.config(this.getAmplitude(1), this.getPeriod(0.3));
            case 'Bounce':
            case 'Bounce.easeIn':
                return GSAP.Bounce.easeIn;
            case 'Bounce.easeInOut':
                return GSAP.Bounce.easeInOut;
            case 'Bounce.easeOut':
                return GSAP.Bounce.easeOut;
            case 'Rough':
            case 'Rough.easeIn':
            case 'Rough.easeInOut':
            case 'Rough.easeOut':
            /*
            return GSAP.RoughEase.config({
              template: this.getEasing(null, true),
              strength: 1,
              points: 20,
              taper: 'none',
              randomize: true,
              clamp: false,
            });
            */
            case 'SlowMo':
            case 'SlowMo.easeIn':
            case 'SlowMo.easeInOut':
            case 'SlowMo.easeOut':
            /*
            return GSAP.SlowMo.ease.config(
              this.getLinearRatio(0.7),
              this.getPower(0.7),
              this.getYoyoMode(false)
            );
            */
            case 'Stepped':
            case 'Stepped.easeIn':
            case 'Stepped.easeInOut':
            case 'Stepped.easeOut':
                //  return GSAP.SteppedEase;
                return GSAP.SteppedEase.config(this.getSteps(12));
            case 'Circ':
            case 'Circ.easeIn':
                return GSAP.Circ.easeIn;
            case 'Circ.easeInOut':
                return GSAP.Circ.easeInOut;
            case 'Circ.easeOut':
                return GSAP.Circ.easeOut;
            case 'Expo':
            case 'Expo.easeIn':
                return GSAP.Expo.easeIn;
            case 'Expo.easeInOut':
                return GSAP.Expo.easeInOut;
            case 'Expo.easeOut':
                return GSAP.Expo.easeOut;
            case 'Sine':
            case 'Sine.easeIn':
                return GSAP.Sine.easeIn;
            case 'Sine.easeInOut':
                return GSAP.Sine.easeInOut;
            case 'Sine.easeOut':
                return GSAP.Sine.easeOut;
            case 'Custom':
            case 'Custom.easeIn':
            case 'Custom.easeInOut':
            case 'Custom.easeOut':
                return GSAP.Power0.easeNone;
            //  return GSAP.CustomEase.create();
            case 'Power0':
            case 'Power0.easeIn':
            case 'Power0.easeInOut':
            case 'Power0.easeOut':
            default:
                return GSAP.Power0.easeNone;
        }
    };
    AbstractThreeController.prototype.setRenderer = function (renderer, scenes, cameras, canvases) {
        this._renderer = renderer;
        this._scenes = scenes;
        this._cameras = cameras;
        this._canvases = canvases;
        if (this._scene === null && this._scenes !== null && this._scenes.length > 0) {
            this._scene = this._scenes.first.getScene();
        }
        if (this._camera === null && this._cameras !== null && this._cameras.length > 0) {
            this._camera = this._cameras.first.getCamera();
        }
        if (this._canvas === null && this._canvases !== null && this._canvases.length > 0) {
            this._canvas = this._canvases.first.getCollection();
        }
    };
    AbstractThreeController.prototype.setScene = function (scene) {
        this._scene = scene;
    };
    AbstractThreeController.prototype.setCanvas = function (canvas) {
        this._canvas = canvas;
    };
    AbstractThreeController.prototype.setObject3d = function (refObject) {
        this.refObject = refObject;
    };
    AbstractThreeController.prototype.setObject2d = function (refObject) {
        this.refObject2d = refObject;
    };
    Object.defineProperty(AbstractThreeController.prototype, "position", {
        get: function () {
            return this.refObject.position;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "scale", {
        get: function () {
            return this.refObject.scale;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "rotation", {
        get: function () {
            return this.refObject.rotation;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "material", {
        get: function () {
            if (this.refObject instanceof THREE.Mesh) {
                if (this.refObject.material instanceof Array) {
                    return this.refObject.material[0];
                }
                else {
                    return this.refObject.material;
                }
            }
            return new THREE.Material();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "materials", {
        get: function () {
            if (this.refObject instanceof THREE.Mesh) {
                if (this.refObject.material instanceof Array) {
                    return this.refObject.material;
                }
                else {
                    return [this.refObject.material];
                }
            }
            return [];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "geometry", {
        get: function () {
            if (this.refObject instanceof THREE.Mesh) {
                return this.refObject.geometry;
            }
            return new THREE.BufferGeometry();
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "scene", {
        get: function () {
            if (this._scene === null && this.refObject !== null) {
                var lastObj = this.refObject;
                while (!(lastObj instanceof THREE.Scene) && lastObj.parent) {
                    lastObj = lastObj.parent;
                }
                if (lastObj instanceof THREE.Scene) {
                    this._scene = lastObj;
                }
            }
            if (this._scene !== null) {
                return this._scene;
            }
            else {
                return new THREE.Scene();
            }
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "camera", {
        get: function () {
            if (this._camera === null && this._cameras !== null && this._cameras.length > 0) {
                this._camera = this._cameras.first.getCamera();
            }
            return this._camera;
        },
        enumerable: false,
        configurable: true
    });
    AbstractThreeController.prototype.getCameraByName = function (name) {
        if (this._cameras !== null) {
            var camara = this._cameras.find(function (camera) {
                return camera.name == name;
            });
            if (interface_1.ThreeUtil.isNotNull(camara)) {
                return camara.getCamera();
            }
        }
        return null;
    };
    AbstractThreeController.prototype.getObjectByName = function (name, fromTop) {
        if (fromTop === void 0) { fromTop = false; }
        if (fromTop) {
            return this.scene.getObjectByName(name);
        }
        else {
            return this.refObject.getObjectByName(name);
        }
    };
    AbstractThreeController.prototype.getObjectByProperty = function (name, value, fromTop) {
        if (fromTop === void 0) { fromTop = false; }
        if (fromTop) {
            return this.scene.getObjectByProperty(name, value);
        }
        else {
            return this.refObject.getObjectByProperty(name, value);
        }
    };
    AbstractThreeController.prototype.getObjectByFunction = function (fn, fromTop, obj3d) {
        if (fromTop === void 0) { fromTop = false; }
        if (obj3d === void 0) { obj3d = null; }
        if (obj3d === null) {
            obj3d = fromTop ? this.scene : this.refObject;
        }
        if (fn(obj3d))
            return obj3d;
        for (var i = 0, l = obj3d.children.length; i < l; i++) {
            var child = obj3d.children[i];
            var object = this.getObjectByFunction(fn, false, child);
            if (object !== undefined) {
                return object;
            }
        }
        return undefined;
    };
    AbstractThreeController.prototype.getObjectsByFunction = function (fn, fromTop, obj3d, result) {
        if (fromTop === void 0) { fromTop = false; }
        if (obj3d === void 0) { obj3d = null; }
        if (result === void 0) { result = []; }
        if (obj3d === null) {
            obj3d = fromTop ? this.scene : this.refObject;
        }
        if (fn(obj3d))
            result.push(obj3d);
        for (var i = 0, l = obj3d.children.length; i < l; i++) {
            var child = obj3d.children[i];
            this.getObjectsByFunction(fn, false, child, result);
        }
        return result;
    };
    AbstractThreeController.prototype.getComponent = function (refObject) {
        var object3d = refObject || this.refObject;
        if (interface_1.ThreeUtil.isNotNull(object3d) &&
            interface_1.ThreeUtil.isNotNull(object3d.userData.component) &&
            object3d.userData.component instanceof object3d_abstract_1.AbstractObject3dComponent) {
            return object3d.userData.component;
        }
        return undefined;
    };
    AbstractThreeController.prototype.getComponent2D = function (refObject) {
        var object2d = refObject || this.refObject2d;
        if (interface_1.ThreeUtil.isNotNull(object2d) &&
            interface_1.ThreeUtil.isNotNull(object2d.component) &&
            object2d.component instanceof visual_component_1.VisualComponent) {
            return object2d.component;
        }
        return undefined;
    };
    AbstractThreeController.prototype.getHtmlElement = function (refObject) {
        var object2d = refObject || this.refObject2d;
        if (interface_1.ThreeUtil.isNotNull(object2d) &&
            interface_1.ThreeUtil.isNotNull(object2d.html) &&
            object2d.html instanceof HTMLElement) {
            return object2d.html;
        }
        return undefined;
    };
    AbstractThreeController.prototype.getMaterialComponent = function (refObject) {
        var object3d = refObject || this.refObject;
        if (interface_1.ThreeUtil.isNotNull(object3d) &&
            object3d instanceof THREE.Mesh &&
            interface_1.ThreeUtil.isNotNull(object3d.material)) {
            var materialComp = null;
            if (object3d.material instanceof THREE.Material &&
                interface_1.ThreeUtil.isNotNull(object3d.material.userData.component)) {
                materialComp = object3d.material.userData.component;
            }
            else if (object3d.material instanceof Array &&
                object3d.material.length > 0) {
                materialComp = object3d.material[0].userData.component;
            }
            if (interface_1.ThreeUtil.isNotNull(materialComp) && materialComp instanceof material_component_1.MaterialComponent) {
                return materialComp;
            }
        }
        return undefined;
    };
    AbstractThreeController.prototype.getController = function (type, refObject) {
        var component = this.getComponent(refObject);
        if (interface_1.ThreeUtil.isNotNull(component.controller)) {
            var controller = component.controller.find(function (controller) {
                return controller.getController() instanceof type;
            });
            if (interface_1.ThreeUtil.isNotNull(controller)) {
                return controller.getController();
            }
        }
        return undefined;
    };
    AbstractThreeController.prototype.getControllers = function (type, refObject) {
        if (type === void 0) { type = null; }
        var controllers = [];
        var component = this.getComponent(refObject);
        if (interface_1.ThreeUtil.isNotNull(component.controller)) {
            var controller = component.controller.filter(function (controller) {
                if (type == null) {
                    return true;
                }
                else {
                    return controller.getController() instanceof type;
                }
            });
            if (interface_1.ThreeUtil.isNotNull(controller) && controller.length > 0) {
                controller.forEach(function (controller) {
                    controllers.push(controller.getController());
                });
            }
        }
        return controllers;
    };
    AbstractThreeController.prototype.setVariables = function (variables) {
        var _this = this;
        if (variables !== null && typeof (variables) === 'object') {
            Object.entries(variables).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                if (_this[key] !== undefined) {
                    _this[key] = value;
                }
            });
        }
    };
    AbstractThreeController.prototype.awake = function () {
        console.log(this.getComponent2D());
        if (this.refObject !== null && this.refObject.visible) {
            this.onEnable();
        }
        this.reset();
        this.start();
        if (this.refObject !== null && !this.refObject.visible) {
            this.onDisable();
        }
    };
    Object.defineProperty(AbstractThreeController.prototype, "tweenTimer", {
        get: function () {
            if (this._tweenTimer === null) {
                this._tweenTimer = new GSAP.TimelineLite();
            }
            return this._tweenTimer;
        },
        enumerable: false,
        configurable: true
    });
    AbstractThreeController.prototype.onEnable = function () { };
    AbstractThreeController.prototype.reset = function () { };
    AbstractThreeController.prototype.start = function () { };
    AbstractThreeController.prototype.fixedUpdate = function () { };
    AbstractThreeController.prototype.update = function (rendererTimer) { };
    AbstractThreeController.prototype.lateUpdate = function () { };
    AbstractThreeController.prototype.onApplicationQuit = function () { };
    AbstractThreeController.prototype.onDisable = function () {
        this.refObject.onBeforeRender;
    };
    AbstractThreeController.prototype.onDestory = function () { };
    return AbstractThreeController;
}());
exports.AbstractThreeController = AbstractThreeController;
var AutoRotationController = /** @class */ (function (_super) {
    __extends(AutoRotationController, _super);
    function AutoRotationController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = 0;
        _this.y = 0;
        _this.z = 0;
        return _this;
    }
    AutoRotationController.prototype.setVariables = function (variables) {
        var _this = this;
        _super.prototype.setVariables.call(this, variables);
        if (this.enable) {
            if (this.refObject !== null) {
                var tweenTimer = this.tweenTimer;
                if (tweenTimer !== null) {
                    tweenTimer.clear();
                }
                var rotation_1 = this.rotation.clone();
                tweenTimer.to(rotation_1, __assign(__assign({}, interface_1.ThreeUtil.getEulerSafe(this.x, this.y, this.z)), { duration: this.getDuration(), ease: this.getEasing(), repeat: this.getRepeat(), yoyo: this.getYoyo(), onUpdate: function (e) {
                        _this.rotation.copy(rotation_1);
                    } }));
                tweenTimer.play();
            }
            else if (this.refObject2d !== null) {
                var tweenTimer = this.tweenTimer;
                if (tweenTimer !== null) {
                    tweenTimer.clear();
                }
                var target = interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z);
                tweenTimer.to(this.refObject2d.html, __assign({ rotateX: target.x, rotateY: target.y, rotateZ: target.z }, { duration: this.getDuration(), ease: this.getEasing(), repeat: this.getRepeat(), yoyo: this.getYoyo() }));
                tweenTimer.play();
            }
        }
        else {
            this.tweenTimer.pause();
        }
    };
    return AutoRotationController;
}(AbstractThreeController));
exports.AutoRotationController = AutoRotationController;
var AutoScaleController = /** @class */ (function (_super) {
    __extends(AutoScaleController, _super);
    function AutoScaleController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = null;
        _this.y = null;
        _this.z = null;
        return _this;
    }
    AutoScaleController.prototype.setVariables = function (variables) {
        var _this = this;
        _super.prototype.setVariables.call(this, variables);
        if (this.enable) {
            if (this.refObject !== null) {
                var tweenTimer = this.tweenTimer;
                if (tweenTimer !== null) {
                    tweenTimer.clear();
                }
                var scale_1 = this.scale.clone();
                tweenTimer.to(scale_1, __assign(__assign({}, interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z)), { duration: this.getDuration(), ease: this.getEasing(), repeat: this.getRepeat(), yoyo: this.getYoyo(), onUpdate: function (e) {
                        _this.scale.copy(scale_1);
                    } }));
                tweenTimer.play();
            }
            else if (this.refObject2d !== null) {
                var tweenTimer = this.tweenTimer;
                if (tweenTimer !== null) {
                    tweenTimer.clear();
                }
                var target = interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z);
                tweenTimer.to(this.refObject2d.html, __assign({ scaleX: target.x, scaleY: target.y }, { duration: this.getDuration(), ease: this.getEasing(), repeat: this.getRepeat(), yoyo: this.getYoyo() }));
                tweenTimer.play();
            }
        }
        else {
            this.tweenTimer.pause();
        }
    };
    return AutoScaleController;
}(AbstractThreeController));
exports.AutoScaleController = AutoScaleController;
var AutoPositionController = /** @class */ (function (_super) {
    __extends(AutoPositionController, _super);
    function AutoPositionController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.x = null;
        _this.y = null;
        _this.z = null;
        return _this;
    }
    AutoPositionController.prototype.setVariables = function (variables) {
        var _this = this;
        _super.prototype.setVariables.call(this, variables);
        if (this.enable) {
            if (this.refObject !== null) {
                var tweenTimer = this.tweenTimer;
                tweenTimer.clear();
                var position_1 = this.position.clone();
                tweenTimer.to(position_1, __assign(__assign({}, interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z)), { duration: this.getDuration(), ease: this.getEasing(), repeat: this.getRepeat(), yoyo: this.getYoyo(), onUpdate: function (e) {
                        _this.position.copy(position_1);
                    } }));
                tweenTimer.play();
            }
            else if (this.refObject2d !== null) {
                var tweenTimer = this.tweenTimer;
                tweenTimer.clear();
                var target = interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z);
                tweenTimer.to(this.refObject2d.html, __assign({ translateX: target.x, translateY: target.y, translateZ: target.z }, { duration: this.getDuration(), ease: this.getEasing(), repeat: this.getRepeat(), yoyo: this.getYoyo() }));
                tweenTimer.play();
            }
        }
        else {
            this.tweenTimer.pause();
        }
    };
    return AutoPositionController;
}(AbstractThreeController));
exports.AutoPositionController = AutoPositionController;
var AutoMaterialController = /** @class */ (function (_super) {
    __extends(AutoMaterialController, _super);
    function AutoMaterialController() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.color = null;
        _this.opacity = null;
        return _this;
    }
    AutoMaterialController.prototype.setVariables = function (variables) {
        _super.prototype.setVariables.call(this, variables);
        if (this.enable) {
            if (this.refObject !== null) {
                var material_1 = this.material;
                if (material_1 instanceof THREE.MeshBasicMaterial ||
                    material_1 instanceof THREE.MeshLambertMaterial) {
                    var tweenTimer = this.tweenTimer;
                    tweenTimer.clear();
                    var colorOpacity_1 = {
                        materialColor: material_1.color.clone(),
                        materialOpacity: material_1.opacity
                    };
                    tweenTimer.to(colorOpacity_1, {
                        materialColor: interface_1.ThreeUtil.getColorSafe(this.color),
                        materialOpacity: this.opacity,
                        duration: this.getDuration(),
                        ease: this.getEasing(),
                        repeat: this.getRepeat(),
                        yoyo: this.getYoyo(),
                        onUpdate: function (e) {
                            // material.color.setRGB(colorOpacity.materialColor.r,colorOpacity.materialColor.g,colorOpacity.materialColor.b);
                            material_1.opacity = colorOpacity_1.materialOpacity;
                        }
                    });
                    tweenTimer.play();
                }
            }
            else if (this.refObject2d !== null) {
                /*
                const tweenTimer = this.tweenTimer;
                tweenTimer.clear();
                const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
                tweenTimer.to(this.refObject2d.html,{
                    ...{ translateX : target.x, translateY : target.y,translateZ : target.z },
                    duration : this.getDuration(),
                    ease: this.getEasing(),
                    repeat: this.getRepeat(),
                    yoyo: this.getYoyo()
                });
                tweenTimer.play();
                */
            }
        }
        else {
            this.tweenTimer.pause();
        }
    };
    return AutoMaterialController;
}(AbstractThreeController));
exports.AutoMaterialController = AutoMaterialController;
