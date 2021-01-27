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
exports.ThreeGui = exports.ThreeStats = exports.ThreeClock = exports.ThreeUtil = exports.AbstractMeshComponent = exports.AbstractSvgGeometry = exports.AbstractGetGeometry = exports.AbstractThreeComponent = void 0;
var tween_component_1 = require("./tween/tween.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var dat_gui_module_1 = require("three/examples/jsm/libs/dat.gui.module");
var stats_module_1 = require("three/examples/jsm/libs/stats.module");
var TWEEN = require("@tweenjs/tween.js");
var AbstractThreeComponent = /** @class */ (function () {
    function AbstractThreeComponent() {
        this.tweenTarget = null;
        this.tweenTimer = null;
    }
    AbstractThreeComponent.prototype.ngOnInit = function () {
    };
    AbstractThreeComponent.prototype.ngOnChanges = function (changes) {
    };
    AbstractThreeComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.tween !== null && this.tween !== undefined) {
            this.tween.changes.subscribe(function (e) {
                _this.resetTween();
            });
        }
    };
    AbstractThreeComponent.prototype.setTweenTarget = function (tweenTarget) {
        if (this.tweenTarget !== tweenTarget) {
            this.tweenTarget = tweenTarget;
            this.resetTween();
        }
    };
    AbstractThreeComponent.prototype.resetTween = function () {
        var _this = this;
        if (this.tweenTarget !== null && this.tween !== null && this.tween.length > 0) {
            this.tweenTimer = new TWEEN.Tween(this.tweenTarget);
            this.tween.forEach(function (tween) {
                tween.getTween(_this.tweenTimer);
            });
            this.tweenTimer.onUpdate(function () {
            }).onComplete(function () {
                console.log(_this.tweenTarget);
            }).start();
        }
        else if (this.tweenTimer !== null) {
            this.tweenTimer.stop();
        }
    };
    AbstractThreeComponent.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.ContentChildren(tween_component_1.TweenComponent, { descendants: false })
    ], AbstractThreeComponent.prototype, "tween");
    AbstractThreeComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], AbstractThreeComponent);
    return AbstractThreeComponent;
}());
exports.AbstractThreeComponent = AbstractThreeComponent;
var AbstractGetGeometry = /** @class */ (function (_super) {
    __extends(AbstractGetGeometry, _super);
    function AbstractGetGeometry() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractGetGeometry;
}(AbstractThreeComponent));
exports.AbstractGetGeometry = AbstractGetGeometry;
var AbstractSvgGeometry = /** @class */ (function (_super) {
    __extends(AbstractSvgGeometry, _super);
    function AbstractSvgGeometry() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.meshPositions = [];
        _this.meshRotations = [];
        _this.meshScales = [];
        _this.meshTranslations = [];
        _this.meshMaterials = [];
        return _this;
    }
    return AbstractSvgGeometry;
}(AbstractThreeComponent));
exports.AbstractSvgGeometry = AbstractSvgGeometry;
var AbstractMeshComponent = /** @class */ (function (_super) {
    __extends(AbstractMeshComponent, _super);
    function AbstractMeshComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractMeshComponent;
}(AbstractThreeComponent));
exports.AbstractMeshComponent = AbstractMeshComponent;
var ThreeUtil = /** @class */ (function () {
    function ThreeUtil() {
    }
    ThreeUtil.render = function (renderTimer) {
        if (this.renderTimer !== renderTimer) {
            this.renderTimer = renderTimer;
            TWEEN.update(renderTimer.elapsedTime * 1000);
            // TWEEN.update();
        }
    };
    ThreeUtil.isNull = function (value) {
        return value === null || value === undefined;
    };
    ThreeUtil.isNotNull = function (value) {
        return !this.isNull(value);
    };
    ThreeUtil.getColor = function (color) {
        if (this.isNotNull(color)) {
            var colorStr = color.toString();
            if (colorStr.startsWith('0x')) {
                return new THREE.Color(parseInt(colorStr, 16));
            }
            else {
                return new THREE.Color(color);
            }
        }
        return undefined;
    };
    ThreeUtil.getColorRGB = function (r, g, b, color) {
        var colorObj = this.isNotNull(color)
            ? this.getColor(color)
            : new THREE.Color(0x000000);
        if (this.isNotNull(colorObj)) {
            return colorObj.setRGB(this.isNotNull(r) ? r : colorObj.r, this.isNotNull(g) ? g : colorObj.g, this.isNotNull(b) ? b : colorObj.b);
        }
        return undefined;
    };
    ThreeUtil.getColorHSL = function (h, s, l, color) {
        var colorObj = this.isNotNull(color)
            ? this.getColor(color)
            : new THREE.Color(0x000000);
        if (this.isNotNull(colorObj)) {
            var hsl = colorObj.getHSL({ h: 0, s: 0, l: 0 });
            return colorObj.setHSL(this.isNotNull(h) ? h : hsl.h, this.isNotNull(s) ? s : hsl.s, this.isNotNull(l) ? l : hsl.l);
        }
        return undefined;
    };
    ThreeUtil.getColorHex = function (color) {
        var colorObj = this.getColor(color);
        if (this.isNotNull(colorObj)) {
            return colorObj.getHex();
        }
        return undefined;
    };
    ThreeUtil.getColorHexString = function (color) {
        var colorObj = this.getColor(color);
        if (this.isNotNull(colorObj)) {
            return colorObj.getHexString();
        }
        return undefined;
    };
    ThreeUtil.getColorStyle = function (color) {
        var colorObj = this.getColor(color);
        if (this.isNotNull(colorObj)) {
            return colorObj.getStyle();
        }
        return undefined;
    };
    ThreeUtil.getColorSafe = function (color, altColor) {
        var defColor = this.isNotNull(color) ? color : altColor;
        if (this.isNotNull(defColor)) {
            if (defColor instanceof THREE.Color) {
                return defColor;
            }
            else if (typeof defColor === 'string') {
                var colorStr = defColor;
                if (colorStr.startsWith('0x')) {
                    return new THREE.Color(parseInt(colorStr, 16));
                }
            }
            return new THREE.Color(defColor);
        }
        return undefined;
    };
    ThreeUtil.getTypeSafe = function (value, altValue, nullValue) {
        var defValue = this.isNotNull(value) ? value : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        if (this.isNotNull(nullValue)) {
            return nullValue;
        }
        else {
            return undefined;
        }
    };
    ThreeUtil.getVector2Safe = function (x, y, altValue) {
        var defValue = this.isNotNull(x) && this.isNotNull(y)
            ? new THREE.Vector2(x, y)
            : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        return undefined;
    };
    ThreeUtil.getVector3Safe = function (x, y, z, altValue) {
        var defValue = this.isNotNull(x) && this.isNotNull(y) && this.isNotNull(z)
            ? new THREE.Vector3(x, y, z)
            : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        return undefined;
    };
    ThreeUtil.getClock = function (autoStart) {
        if (this.clock === null) {
            this.clock = new ThreeClock(autoStart);
        }
        return this.clock;
    };
    ThreeUtil.getStats = function (style) {
        return new ThreeStats(style);
    };
    ThreeUtil.setupGuiChange = function (control, onFinishChange, onChange, listen) {
        if (listen != null && listen) {
            control.listen();
        }
        if (onFinishChange != null) {
            control.onFinishChange(onFinishChange);
        }
        if (onChange != null) {
            control.onChange(onChange);
        }
    };
    ThreeUtil.setupGui = function (control, gui, params) {
        var _this = this;
        params.forEach(function (param) {
            switch (param.type) {
                case 'color':
                    _this.setupGuiChange(gui.addColor(param.control ? control[param.control] : control, param.name), param.finishChange, param.change, param.listen);
                    break;
                case 'folder':
                    var folder = gui.addFolder(param.name);
                    _this.setupGui(param.control ? control[param.control] : control, folder, param.children);
                    if (param.isOpen) {
                        folder.open();
                    }
                    break;
                case 'number':
                    _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name, param.min, param.max, param.step), param.finishChange, param.change, param.listen);
                    break;
                case 'listen':
                    gui
                        .add(param.control ? control[param.control] : control, param.name)
                        .listen();
                    break;
                case 'select':
                    _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name, param.select), param.finishChange, param.change, param.listen);
                    break;
                case 'button':
                default:
                    _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name), param.finishChange, param.change, param.listen);
                    break;
            }
        });
    };
    ThreeUtil.clock = null;
    ThreeUtil.stats = null;
    return ThreeUtil;
}());
exports.ThreeUtil = ThreeUtil;
var ThreeClock = /** @class */ (function (_super) {
    __extends(ThreeClock, _super);
    function ThreeClock() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ThreeClock.prototype.getTimer = function () {
        var delta = this.getDelta();
        var elapsedTime = this.getElapsedTime();
        return {
            delta: delta,
            elapsedTime: elapsedTime
        };
    };
    return ThreeClock;
}(THREE.Clock));
exports.ThreeClock = ThreeClock;
var ThreeStats = /** @class */ (function () {
    function ThreeStats(style) {
        this.stats = null;
        this.stats = stats_module_1["default"]();
        this.domElement = this.dom = this.stats.dom;
        this.REVISION = this.stats.REVISION;
        this.setStyle(style);
    }
    ThreeStats.prototype.setStyle = function (style) {
        var _this = this;
        if (style !== null && style !== undefined) {
            Object.entries(style).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                _this.stats.dom.style[key] = value;
            });
        }
    };
    ThreeStats.prototype.addPanel = function (panel) {
        return this.stats.addPanel(panel);
    };
    ThreeStats.prototype.showPanel = function (id) {
        this.stats.showPanel(id);
    };
    ThreeStats.prototype.begin = function () {
        this.stats.begin();
    };
    ThreeStats.prototype.end = function () {
        this.stats.end();
    };
    ThreeStats.prototype.update = function () {
        this.stats.update();
    };
    ThreeStats.prototype.setMode = function (id) {
        this.stats.setMode(id);
    };
    return ThreeStats;
}());
exports.ThreeStats = ThreeStats;
var ThreeGui = /** @class */ (function () {
    function ThreeGui(style, pars) {
        this.gui = null;
        this.gui = new dat_gui_module_1.GUI(pars);
        this.domElement = this.gui.domElement;
        this.setStyle(style);
    }
    ThreeGui.prototype.setStyle = function (style) {
        if (style !== null && style !== undefined) {
            var domElement_1 = this.domElement;
            Object.entries(style).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                domElement_1.style[key] = value;
            });
        }
        return this;
    };
    ThreeGui.prototype.addColor = function (object, property) {
        return this.gui.addColor(object, property);
    };
    ThreeGui.prototype.addFolder = function (name) {
        return this.gui.addFolder(name);
    };
    ThreeGui.prototype.add = function (object, property, option1, options2, options3) {
        return this.gui.add(object, property, option1, options2, options3);
    };
    ThreeGui.prototype.destroy = function () {
        return this.gui.destroy();
    };
    ThreeGui.prototype.removeFolder = function (folder) {
        return this.gui.removeFolder(folder);
    };
    ThreeGui.prototype.listen = function () {
        return this.gui.listen();
    };
    ThreeGui.prototype.onFinishChange = function (callBack) {
        return this.gui.onFinishChange(callBack);
    };
    ThreeGui.prototype.onChange = function (callBack) {
        return this.gui.onChange(callBack);
    };
    ThreeGui.prototype.open = function () {
        return this.gui.open();
    };
    ThreeGui.prototype.close = function () {
        return this.gui.close();
    };
    ThreeGui.prototype.hide = function () {
        return this.gui.hide();
    };
    ThreeGui.prototype.show = function () {
        return this.gui.show();
    };
    ThreeGui.prototype.remove = function (controller) {
        return this.gui.remove(controller);
    };
    return ThreeGui;
}());
exports.ThreeGui = ThreeGui;