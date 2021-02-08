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
exports.ThreeGui = exports.ThreeStats = exports.ThreeClock = exports.ThreeUtil = exports.AbstractMeshComponent = exports.AbstractSvgGeometry = exports.AbstractComposerComponent = exports.AbstractGetGeometry = exports.AbstractThreeComponent = exports.AbstractThreeController = void 0;
var controller_component_1 = require("./controller/controller.component");
var core_1 = require("@angular/core");
var CHROMA = require("chroma-js");
var GSAP = require("gsap");
var THREE = require("three");
var dat_gui_module_1 = require("three/examples/jsm/libs/dat.gui.module");
var stats_module_1 = require("three/examples/jsm/libs/stats.module");
var tween_component_1 = require("./tween/tween.component");
var AbstractThreeController = /** @class */ (function () {
    function AbstractThreeController(refObject) {
        this.refObject = null;
        this.setObject3d(refObject);
    }
    AbstractThreeController.prototype.setObject3d = function (refObject) {
        this.refObject = refObject;
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
            return undefined;
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
            return undefined;
        },
        enumerable: false,
        configurable: true
    });
    AbstractThreeController.prototype.getGeometry = function () {
        if (this.refObject instanceof THREE.Mesh) {
            return this.refObject.geometry;
        }
        return undefined;
    };
    Object.defineProperty(AbstractThreeController.prototype, "scene", {
        get: function () {
            if (this.refObject !== null) {
                var lastObj = this.refObject;
                while (!(lastObj instanceof THREE.Scene) && lastObj.parent) {
                    lastObj = lastObj.parent;
                }
                if (lastObj instanceof THREE.Scene) {
                    return lastObj;
                }
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(AbstractThreeController.prototype, "camera", {
        get: function () {
            var scene = this.scene;
            if (scene !== null) {
                var sceneComp = scene.userData.component;
                return sceneComp.getRenderer().cameras.first.getCamera();
            }
            return null;
        },
        enumerable: false,
        configurable: true
    });
    AbstractThreeController.prototype.getCameraByName = function (name) {
        var scene = this.scene;
        if (scene !== null) {
            var sceneComp = scene.userData.component;
            var camara = sceneComp.getRenderer().cameras.find(function (camera) {
                return camera.name == name;
            });
            if (ThreeUtil.isNotNull(camara)) {
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
    AbstractThreeController.prototype.getObjectByFunction = function (name, fn, fromTop, obj3d) {
        if (fromTop === void 0) { fromTop = false; }
        if (obj3d === void 0) { obj3d = null; }
        if (obj3d === null) {
            obj3d = fromTop ? this.scene : this.refObject;
        }
        if (fn(obj3d[name]))
            return obj3d;
        for (var i = 0, l = obj3d.children.length; i < l; i++) {
            var child = obj3d.children[i];
            var object = this.getObjectByFunction(name, fn, false, child);
            if (object !== undefined) {
                return object;
            }
        }
        return undefined;
    };
    return AbstractThreeController;
}());
exports.AbstractThreeController = AbstractThreeController;
var AbstractThreeComponent = /** @class */ (function () {
    function AbstractThreeComponent() {
        this.tweenStart = true;
        this.refObject3d = null;
        this.tweenTarget = null;
        this.tweenTimer = null;
    }
    AbstractThreeComponent.prototype.ngOnInit = function () { };
    AbstractThreeComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.tweenStart && this.tweenTarget) {
            this.resetTween();
        }
    };
    AbstractThreeComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.tween !== null && this.tween !== undefined) {
            this.tween.changes.subscribe(function (e) {
                _this.resetTween();
            });
        }
        if (this.controller !== null && this.controller !== undefined) {
            this.controller.changes.subscribe(function (e) {
                _this.resetController();
            });
        }
    };
    AbstractThreeComponent.prototype.resetController = function () {
        var _this = this;
        if (this.controller !== null && this.controller !== undefined && this.refObject3d !== null && this.refObject3d instanceof THREE.Object3D) {
            this.controller.forEach(function (controller) {
                controller.setObject3D(_this.refObject3d);
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
        if (this.tweenTarget !== null &&
            this.tween !== null &&
            this.tween.length > 0 &&
            this.tweenStart) {
            this.tweenTimer = new GSAP.TimelineLite();
            this.tween.forEach(function (tween) {
                tween.getTween(_this.tweenTimer, _this.tweenTarget, _this);
            });
            this.tweenTimer.play();
        }
        else if (this.tweenTimer !== null) {
            this.tweenTimer.kill();
            this.tweenTimer = null;
        }
    };
    AbstractThreeComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.Input()
    ], AbstractThreeComponent.prototype, "tweenStart");
    __decorate([
        core_1.ContentChildren(tween_component_1.TweenComponent, { descendants: false })
    ], AbstractThreeComponent.prototype, "tween");
    __decorate([
        core_1.ContentChildren(controller_component_1.ControllerComponent, { descendants: false })
    ], AbstractThreeComponent.prototype, "controller");
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
var AbstractComposerComponent = /** @class */ (function (_super) {
    __extends(AbstractComposerComponent, _super);
    function AbstractComposerComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return AbstractComposerComponent;
}(AbstractThreeComponent));
exports.AbstractComposerComponent = AbstractComposerComponent;
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
    ThreeUtil.cssInject = function (cssContent, id, indoc) {
        var doc = indoc || document;
        var cssParent = doc.getElementsByTagName('head')[0];
        if (cssParent === null || cssParent == undefined) {
            cssParent = doc.getElementsByTagName('body')[0];
        }
        if (cssParent !== null && cssParent !== undefined) {
            if (id !== null && id !== undefined) {
                var oldcss = doc.getElementById(id);
                if (oldcss !== null && oldcss !== undefined) {
                    oldcss.parentElement.removeChild(oldcss);
                }
            }
            else {
            }
            try {
                var injected = document.createElement('style');
                injected.type = 'text/css';
                if (id !== null && id !== undefined) {
                    injected.id = id;
                }
                injected.innerHTML = cssContent;
                cssParent.appendChild(injected);
                return true;
            }
            catch (e) { }
        }
        return false;
    };
    ThreeUtil.cssEject = function (id, indoc) {
        var doc = indoc || document;
        var oldcss = doc.getElementById(id);
        if (oldcss !== null && oldcss !== undefined) {
            oldcss.parentElement.removeChild(oldcss);
            return true;
        }
        else {
            return false;
        }
    };
    ThreeUtil.makeUUID = function (len, pre) {
        var result = '';
        var characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
        var maxLen = characters.length;
        for (var i = 0; i < len; i++) {
            result += characters.charAt(Math.floor(Math.random() * maxLen));
        }
        return (pre ? pre : 'tmp') + '_' + result;
    };
    ThreeUtil.camelCaseToDash = function (myStr) {
        return myStr.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    };
    ThreeUtil.removeCssStyle = function (ele, clazzName) {
        if (this.isNotNull(clazzName)) {
            this.cssEject(clazzName);
            if (ele.classList.contains(clazzName)) {
                ele.classList.remove(clazzName);
            }
            if (this.isNotNull(this._elementEvents[clazzName])) {
                var eleEvents = this._elementEvents[clazzName];
                Object.entries(eleEvents).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    ele.removeEventListener(key, value, false);
                });
                delete this._elementEvents[clazzName];
            }
        }
        return true;
    };
    ThreeUtil.toggleCssStyle = function (ele, clazzName, isActive) {
        if (this.isNotNull(clazzName)) {
            if (!isActive) {
                if (ele.classList.contains(clazzName)) {
                    ele.classList.remove(clazzName);
                }
                if (this.isNotNull(this._elementEvents[clazzName])) {
                    var eleEvents = this._elementEvents[clazzName];
                    Object.entries(eleEvents).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        ele.removeEventListener(key, value, false);
                    });
                }
            }
            else {
                if (!ele.classList.contains(clazzName)) {
                    ele.classList.add(clazzName);
                }
                if (this.isNotNull(this._elementEvents[clazzName])) {
                    var eleEvents = this._elementEvents[clazzName];
                    Object.entries(eleEvents).forEach(function (_a) {
                        var key = _a[0], value = _a[1];
                        ele.addEventListener(key, value, false);
                    });
                }
            }
        }
        return true;
    };
    ThreeUtil.getChildElementSave = function (parentEle) {
        var ele = parentEle.cloneNode(true);
        var childNodes = [];
        ele.childNodes.forEach(function (child) {
            childNodes.push(child);
        });
        childNodes.forEach(function (child) {
            switch (child.nodeType) {
                case Node.ELEMENT_NODE:
                    var childEle = child;
                    switch (childEle.tagName) {
                        case 'P':
                        case 'DIV':
                        case 'FONT':
                        case 'SPAN':
                        case 'IMG':
                        case 'I':
                        case 'B':
                        case 'STRONG':
                        case 'IFRAME':
                        case 'H1':
                        case 'H2':
                        case 'H3':
                        case 'H4':
                        case 'H5':
                            break;
                        default:
                            ele.removeChild(childEle);
                            break;
                    }
                    break;
                default:
                    break;
            }
        });
        return ele;
    };
    ThreeUtil.addCssStyle = function (ele, styles, clazzName, classPrefix, vertualClass) {
        var _this = this;
        if (clazzName == null || clazzName == undefined) {
            clazzName = this.makeUUID(15, classPrefix);
        }
        if (typeof styles == 'string') {
            styles = {
                innerHtml: styles
            };
        }
        if (styles === null || styles === undefined) {
            styles = {};
        }
        var eventList = {};
        var styleList = {};
        Object.entries(styles).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (_this.isNotNull(value)) {
                switch (key) {
                    case 'change':
                    case 'click':
                    case 'dblclick':
                    case 'focus':
                    case 'keyup':
                    case 'keydown':
                    case 'load':
                    case 'select':
                    case 'mousedown':
                    case 'mouseout':
                    case 'mouseover':
                    case 'mousemove':
                    case 'mouseup':
                        if (typeof value === 'function') {
                            eventList[key] = value;
                        }
                        else {
                            eventList[key] = null;
                        }
                        break;
                    case 'innerHTML':
                        ele.innerHTML = value;
                        break;
                    case 'innerText':
                        ele.innerText = value;
                        break;
                    case 'textContent':
                        ele.textContent = value;
                        break;
                    case 'zIndex':
                    case 'opacity':
                    case 'borderImageSlice':
                        if (typeof value == 'number') {
                            styleList[key] = value.toString();
                        }
                        else if (typeof value == 'string') {
                            styleList[key] = parseFloat(value).toString();
                        }
                        break;
                    case 'transition':
                        if (typeof value === 'string' && value != '') {
                            styleList[key] = value;
                        }
                        else if (value instanceof Array && value.length > 0) {
                            styleList[key] = value.join(', ');
                        }
                        break;
                    case 'color':
                    case 'backgroundColor':
                    case 'borderColor':
                        if (typeof value == 'number' || typeof value == 'string') {
                            styleList[key] = _this.getColorSafe(value).getStyle();
                        }
                        else if (value instanceof THREE.Color) {
                            styleList[key] = value.getStyle();
                        }
                        else if (value instanceof THREE.Vector4) {
                            styleList[key] =
                                'rgba(' +
                                    value.x * 255 +
                                    ',' +
                                    value.y * 255 +
                                    ',' +
                                    value.z * 255 +
                                    ',' +
                                    value.w +
                                    ')';
                        }
                        break;
                    case 'transform':
                        if (value instanceof Array) {
                            if (value.length > 0) {
                                styleList[key] = value.join(' ');
                            }
                        }
                        else if (typeof value == 'string' && value !== '') {
                            styleList[key] = value;
                        }
                        break;
                    case 'backgroundImage':
                    case 'borderImageSource':
                        styleList[key] = 'url(' + value + ')';
                        break;
                    case 'content':
                        if (typeof value == 'string' && value !== '') {
                            styleList[key] = "'" + value + "'";
                        }
                        break;
                    case 'position':
                    case 'pointerEvents':
                    case 'overflow':
                    case 'width':
                    case 'height':
                    case 'minWidth':
                    case 'minHeight':
                    case 'maxWidth':
                    case 'maxHeight':
                    case 'left':
                    case 'right':
                    case 'top':
                    case 'bottom':
                    case 'borderWidth':
                    case 'borderRadius':
                    case 'backgroundRepeat':
                    case 'backgroundRepeatX':
                    case 'backgroundRepeatY':
                    case 'backgroundPosition':
                    case 'backgroundPositionX':
                    case 'backgroundPositionY':
                    case 'backgroundSize':
                    case 'backgroundSizeX':
                    case 'backgroundSizeY':
                    case 'backgroundClip':
                    case 'padding':
                    case 'paddingLeft':
                    case 'paddingTop':
                    case 'paddingRight':
                    case 'paddingBottom':
                    case 'margin':
                    case 'marginLeft':
                    case 'marginTop':
                    case 'marginRight':
                    case 'marginBottom':
                    case 'border':
                    case 'borderStyle':
                    case 'borderLeft':
                    case 'borderTop':
                    case 'borderRight':
                    case 'borderBottom':
                    case 'borderImage':
                    case 'borderImageOutset':
                    case 'borderImageRepeat':
                    case 'borderImageWidth':
                    case 'fontFamily':
                    case 'fontSize':
                    case 'fontStyle':
                    case 'fontWeight':
                    case 'textAlign':
                    case 'textTransform':
                    case 'textDecoration':
                    case 'letterSpacing':
                    case 'textIndent':
                    case 'textJustify':
                    case 'textSizeAdjust':
                    case 'whiteSpace':
                    case 'wordBreak':
                    case 'wordSpacing':
                    case 'transformOrigin':
                        if (typeof value == 'number') {
                            styleList[key] = value + 'px';
                        }
                        else if (typeof value == 'string') {
                            styleList[key] = value;
                        }
                        break;
                }
            }
        });
        switch (vertualClass) {
            case 'inline':
                ele.removeAttribute('style');
                Object.entries(styleList).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    ele.style[key] = value;
                });
                break;
            default:
                var cssStyleList_1 = [];
                Object.entries(styleList).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    cssStyleList_1.push(_this.camelCaseToDash(key) + ': ' + value);
                });
                this.cssInject('.' +
                    clazzName +
                    (vertualClass ? ':' + vertualClass : '') +
                    '{' +
                    cssStyleList_1.join(';') +
                    '}', clazzName);
                if (!ele.classList.contains(clazzName)) {
                    ele.classList.add(clazzName);
                }
                break;
        }
        if (eventList != {}) {
            var eleEvents_1 = null;
            if (this.isNotNull(this._elementEvents[clazzName])) {
                eleEvents_1 = this._elementEvents[clazzName];
            }
            else {
                eleEvents_1 = this._elementEvents[clazzName] = {};
            }
            Object.entries(eventList).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                var oldEvent = eleEvents_1[key];
                if (_this.isNotNull(value) && oldEvent !== value) {
                    if (_this.isNotNull(oldEvent)) {
                        ele.removeEventListener(key, oldEvent, false);
                    }
                    ele.addEventListener(key, value, false);
                    eleEvents_1[key] = value;
                }
                else if (_this.isNull(value) && _this.isNotNull(oldEvent)) {
                    ele.removeEventListener(key, oldEvent, false);
                    delete eleEvents_1[key];
                }
            });
            this._elementEvents[clazzName] = eleEvents_1;
        }
        return clazzName;
    };
    ThreeUtil.getChromaScale = function () {
        var scales = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            scales[_i] = arguments[_i];
        }
        return CHROMA.scale(scales);
    };
    ThreeUtil.setRenderer = function (lastRenderer) {
        this.lastRenderer = lastRenderer;
    };
    ThreeUtil.getRenderer = function () {
        return this.lastRenderer;
    };
    ThreeUtil.render = function (renderTimer) {
        if (this.renderTimer !== renderTimer) {
            this.renderTimer = renderTimer;
            // GSAP.update(renderTimer.elapsedTime * 1000);
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
    ThreeUtil.getColorAlphaSafe = function (color, alpha, altColor) {
        var defColor = this.getColorSafe(color, altColor);
        if (this.isNotNull(defColor)) {
            if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
                return new THREE.Vector4(defColor.r, defColor.g, defColor.b, alpha);
            }
            else {
                return defColor;
            }
        }
        else if (this.isNotNull(alpha) && alpha >= 0 && alpha <= 1) {
            return new THREE.Vector4(0, 0, 0, alpha);
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
    ThreeUtil.getAngleSafe = function (angle, altangle) {
        var defValue = this.getTypeSafe(angle, altangle);
        if (this.isNotNull(defValue)) {
            return (defValue / 180) * Math.PI;
        }
        return undefined;
    };
    ThreeUtil.getVector2Safe = function (x, y, altValue) {
        var defValue = this.isNotNull(x) || this.isNotNull(y)
            ? new THREE.Vector2(this.getTypeSafe(x, y), this.getTypeSafe(y, x))
            : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        return undefined;
    };
    ThreeUtil.getVector3Safe = function (x, y, z, altValue) {
        var defValue = this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z)
            ? new THREE.Vector3(this.getTypeSafe(x, y, z), this.getTypeSafe(y, x, z), this.getTypeSafe(z, x, y))
            : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        return undefined;
    };
    ThreeUtil.getEulerSafe = function (x, y, z, altValue) {
        var defValue = this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z)
            ? new THREE.Euler(this.getAngleSafe(this.getTypeSafe(x, y, z), 0), this.getAngleSafe(this.getTypeSafe(y, x, z), 0), this.getAngleSafe(this.getTypeSafe(z, x, y), 0))
            : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        return undefined;
    };
    ThreeUtil.getClock = function (autoStart) {
        return new ThreeClock(autoStart);
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
        return control;
    };
    ThreeUtil.setGuiEnabled = function (params, names, isEnable) {
        if (isEnable === void 0) { isEnable = true; }
        var control = this.getGuiController(params, names);
        if (control !== null && control !== undefined && control.domElement) {
            if (isEnable) {
                control.domElement.classList.add('no-pointer-events');
                control.domElement.classList.add('control-disabled');
            }
            else {
                control.domElement.classList.remove('no-pointer-events');
                control.domElement.classList.remove('control-disabled');
            }
        }
    };
    ThreeUtil.getGuiController = function (params, names) {
        var name = names.shift().toLowerCase();
        var param = params.find(function (param) {
            return name == param.name.toLowerCase();
        });
        if (names.length > 0 &&
            param &&
            param.children &&
            param.children.length > 0) {
            return this.getGuiController(param.children, names);
        }
        else {
            return param.controler;
        }
    };
    ThreeUtil.setupGui = function (control, gui, params) {
        var _this = this;
        params.forEach(function (param) {
            switch (param.type) {
                case 'color':
                    param.controler = _this.setupGuiChange(gui.addColor(param.control ? control[param.control] : control, param.name), param.finishChange, param.change, param.listen);
                    break;
                case 'folder':
                    var folder = gui.addFolder(param.name);
                    param.controler = _this.setupGui(param.control ? control[param.control] : control, folder, param.children);
                    if (param.isOpen) {
                        folder.open();
                    }
                    break;
                case 'number':
                    param.controler = _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name, param.min, param.max, param.step), param.finishChange, param.change, param.listen);
                    break;
                case 'listen':
                    param.controler = gui
                        .add(param.control ? control[param.control] : control, param.name)
                        .listen();
                    break;
                case 'select':
                    param.controler = _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name, param.select), param.finishChange, param.change, param.listen);
                    break;
                case 'button':
                default:
                    param.controler = _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name), param.finishChange, param.change, param.listen);
                    break;
            }
        });
        return gui;
    };
    ThreeUtil._elementEvents = {};
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
        if (ThreeGui.customCss !== null) {
            ThreeUtil.cssInject(ThreeGui.customCss);
            ThreeGui.customCss = null;
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
    ThreeGui.customCss = null;
    return ThreeGui;
}());
exports.ThreeGui = ThreeGui;
