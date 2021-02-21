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
exports.ThreeGui = exports.ThreeStats = exports.ThreeClock = exports.ThreeUtil = exports.BaseComponent = void 0;
var core_1 = require("@angular/core");
var CHROMA = require("chroma-js");
var THREE = require("three");
var dat_gui_module_1 = require("three/examples/jsm/libs/dat.gui.module");
var stats_module_1 = require("three/examples/jsm/libs/stats.module");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(controls, controlsParams) {
        if (controlsParams === void 0) { controlsParams = []; }
        this.mesh = null;
        this.controls = ThreeUtil.getControls(controls, this);
        this.controlsParams = ThreeUtil.getControlsParams(controlsParams, this);
    }
    BaseComponent.prototype.ngOnInit = function () { };
    BaseComponent.prototype.ngAfterViewInit = function () {
        this.controls.meshRotate.applyAutoRotate();
    };
    BaseComponent.prototype.setMesh = function (mesh) {
        this.mesh = mesh;
        if (this.mesh !== null) {
            var position = this.mesh.getPosition();
            this.controls.meshPositionOrg = {
                x: position.x,
                y: position.y,
                z: position.z
            };
            this.controls.meshPosition.x = this.controls.meshPositionOrg.x;
            this.controls.meshPosition.y = this.controls.meshPositionOrg.y;
            this.controls.meshPosition.z = this.controls.meshPositionOrg.z;
            var scale = this.mesh.getScale();
            this.controls.meshScaleOrg = {
                x: scale.x,
                y: scale.y,
                z: scale.z
            };
            this.controls.meshScale.x = this.controls.meshScaleOrg.x;
            this.controls.meshScale.y = this.controls.meshScaleOrg.y;
            this.controls.meshScale.z = this.controls.meshScaleOrg.z;
            var rotation = this.mesh.getRotation();
            this.controls.meshRotateOrg = {
                x: rotation.x / Math.PI * 180,
                y: rotation.y / Math.PI * 180,
                z: rotation.z / Math.PI * 180
            };
            this.controls.meshRotate.x = this.controls.meshRotateOrg.x;
            this.controls.meshRotate.y = this.controls.meshRotateOrg.y;
            this.controls.meshRotate.z = this.controls.meshRotateOrg.z;
            var controlsParams = ThreeUtil.getGuiControlParam(this.controlsParams, 'Mesh Visible');
            if (ThreeUtil.isNotNull(controlsParams) && ThreeUtil.isNotNull(this.controls.meshShape)) {
                this.controls.meshShape.visible = this.mesh.getMesh().visible;
                var helperParams = ThreeUtil.getGuiControlParam(controlsParams.children, 'helperVisible');
                var helper = this.mesh.helper;
                if (ThreeUtil.isNotNull(helper)) {
                    if (helper instanceof THREE.SkeletonHelper) {
                        helperParams.controler.name('Skeleton');
                    }
                    else {
                        helperParams.controler.name('Helper');
                    }
                    this.controls.meshShape.helperVisible = helper.visible;
                    ThreeUtil.setGuiEnabled(helperParams.controler, true);
                }
                else {
                    this.controls.meshShape.helperVisible = false;
                    helperParams.controler.name('Not Supported');
                    ThreeUtil.setGuiEnabled(helperParams.controler, false);
                }
            }
        }
    };
    BaseComponent.prototype.onRender = function (timer) {
        ThreeUtil.getControlsOnRender(timer, this);
    };
    BaseComponent = __decorate([
        core_1.Injectable()
    ], BaseComponent);
    return BaseComponent;
}());
exports.BaseComponent = BaseComponent;
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
                // ele.removeAttribute('style');
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
            ? new THREE.Vector3(this.getTypeSafe(x, y, z), this.getTypeSafe(y, z, x), this.getTypeSafe(z, x, y))
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
    ThreeUtil.getControls = function (param, component) {
        var _this = this;
        var baseControl = {
            meshShape: {
                visible: true,
                helperVisible: false,
                wireframe: false
            },
            meshRotate: {
                x: 0,
                y: 0,
                z: 0,
                autoRotate: false,
                speed: 10,
                reset: function () {
                    if (_this.isNotNull(component.controls) && _this.isNotNull(component.controls.meshRotate) && _this.isNotNull(component.controls.meshRotateOrg)) {
                        component.controls.meshRotate.x = component.controls.meshRotateOrg.x;
                        component.controls.meshRotate.y = component.controls.meshRotateOrg.y;
                        component.controls.meshRotate.z = component.controls.meshRotateOrg.z;
                        component.controls.meshRotate.autoRotate = true;
                        component.controls.meshRotate.applyAutoRotate();
                        component.controls.meshRotate.update();
                    }
                },
                applyAutoRotate: function () {
                    if (_this.isNotNull(component.controlsParams)) {
                        var controlsParams = _this.getGuiControlParam(component.controlsParams, 'Mesh Rotation');
                        if (_this.isNotNull(controlsParams)) {
                            if (component.controls.meshRotate.autoRotate) {
                                _this.setGuiEnabled(controlsParams.children[1].controler, false);
                                _this.setGuiEnabled(controlsParams.children[4].controler, true);
                            }
                            else {
                                if (_this.isNotNull(component.mesh)) {
                                    var meshRotate = component.mesh.getRotation();
                                    component.controls.meshRotate.x = (meshRotate.x / Math.PI * 180) % 360;
                                    component.controls.meshRotate.y = (meshRotate.y / Math.PI * 180) % 360;
                                    component.controls.meshRotate.z = (meshRotate.z / Math.PI * 180) % 360;
                                }
                                _this.setGuiEnabled(controlsParams.children[1].controler, true);
                                _this.setGuiEnabled(controlsParams.children[4].controler, false);
                            }
                        }
                    }
                },
                update: function () {
                    if (_this.isNotNull(component.mesh) && _this.isNotNull(component.controls.meshRotate)) {
                        component.mesh.setRotation(component.controls.meshRotate.x, (component.controls.meshRotate.autoRotate) ? null : component.controls.meshRotate.y, component.controls.meshRotate.z);
                    }
                }
            },
            meshPosition: {
                x: 0,
                y: 0,
                z: 0,
                reset: function () {
                    if (_this.isNotNull(component.controls) && _this.isNotNull(component.controls.meshPosition) && _this.isNotNull(component.controls.meshPositionOrg)) {
                        component.controls.meshPosition.x = component.controls.meshPositionOrg.x;
                        component.controls.meshPosition.y = component.controls.meshPositionOrg.y;
                        component.controls.meshPosition.z = component.controls.meshPositionOrg.z;
                        component.controls.meshPosition.update();
                    }
                },
                update: function () {
                    if (_this.isNotNull(component.mesh) && _this.isNotNull(component.controls.meshPosition)) {
                        component.mesh.setPosition(component.controls.meshPosition.x, component.controls.meshPosition.y, component.controls.meshPosition.z);
                    }
                }
            },
            meshScale: {
                x: 1,
                y: 1,
                z: 1,
                reset: function () {
                    if (_this.isNotNull(component.controls) && _this.isNotNull(component.controls.meshScale) && _this.isNotNull(component.controls.meshScaleOrg)) {
                        component.controls.meshScale.x = component.controls.meshScaleOrg.x;
                        component.controls.meshScale.y = component.controls.meshScaleOrg.y;
                        component.controls.meshScale.z = component.controls.meshScaleOrg.z;
                        component.controls.meshScale.update();
                    }
                },
                update: function () {
                    if (_this.isNotNull(component.mesh) && _this.isNotNull(component.controls.meshScale)) {
                        component.mesh.setScale(component.controls.meshScale.x, component.controls.meshScale.y, component.controls.meshScale.z);
                    }
                }
            }
        };
        return Object.assign(param, baseControl);
    };
    ThreeUtil.getControlsParams = function (params, component) {
        var _this = this;
        params.push({ name: 'Mesh Visible', type: 'folder', control: 'meshShape', children: [
                { name: 'visible', type: 'checkbox', listen: true, change: function () {
                        if (_this.isNotNull(component.mesh)) {
                            component.mesh.setVisible(component.controls.meshShape.visible, null);
                        }
                    } },
                { name: 'helperVisible', type: 'checkbox', listen: true, change: function () {
                        if (_this.isNotNull(component.mesh)) {
                            component.mesh.setVisible(null, component.controls.meshShape.helperVisible);
                        }
                    } },
                { name: 'wireframe', type: 'checkbox', listen: true, change: function () {
                        if (_this.isNotNull(component.mesh)) {
                            component.mesh.setWireFrame(component.controls.meshShape.wireframe);
                        }
                    } },
            ], isOpen: true });
        params.push({ name: 'Mesh Rotation', type: 'folder', control: 'meshRotate', children: [
                { name: 'x', type: 'number', min: -360, max: 360, step: 5, listen: true, change: function () {
                        component.controls.meshRotate.update();
                    } },
                { name: 'y', type: 'number', min: -360, max: 360, step: 5, listen: true, change: function () {
                        component.controls.meshRotate.update();
                    } },
                { name: 'z', type: 'number', min: -360, max: 360, step: 5, listen: true, change: function () {
                        component.controls.meshRotate.update();
                    } },
                { name: 'autoRotate', type: 'checkbox', title: 'Auto Rotation', listen: true, change: function () {
                        component.controls.meshRotate.applyAutoRotate();
                    } },
                { name: 'speed', type: 'number', min: -90, max: 90, step: 1, listen: true, title: 'Auto DegPSec' },
                { name: 'reset', type: 'button', title: 'Reset Rotation' }
            ], isOpen: false });
        params.push({ name: 'Mesh Position', type: 'folder', control: 'meshPosition', children: [
                { name: 'x', type: 'number', min: -3, max: 3, step: 0.01, listen: true, change: function () {
                        component.controls.meshPosition.update();
                    } },
                { name: 'y', type: 'number', min: -3, max: 3, step: 0.01, listen: true, change: function () {
                        component.controls.meshPosition.update();
                    } },
                { name: 'z', type: 'number', min: -3, max: 3, step: 0.01, listen: true, change: function () {
                        component.controls.meshPosition.update();
                    } },
                { name: 'reset', type: 'button', title: 'Reset Position' }
            ], isOpen: false });
        params.push({ name: 'Mesh Scale', type: 'folder', control: 'meshScale', children: [
                { name: 'x', type: 'number', min: 0.001, max: 5, step: 0.001, listen: true, change: function () {
                        component.controls.meshScale.update();
                    } },
                { name: 'y', type: 'number', min: 0.001, max: 5, step: 0.001, listen: true, change: function () {
                        component.controls.meshScale.update();
                    } },
                { name: 'z', type: 'number', min: 0.001, max: 5, step: 0.001, listen: true, change: function () {
                        component.controls.meshScale.update();
                    } },
                { name: 'reset', type: 'button', title: 'Reset Scale' }
            ], isOpen: false });
        return params;
    };
    ThreeUtil.getControlsOnRender = function (timer, component) {
        if (this.isNotNull(component.controls) && this.isNotNull(component.mesh)) {
            if (component.controls.meshRotate.autoRotate && component.controls.meshRotate.speed !== 0) {
                component.mesh.addRotation(0, component.controls.meshRotate.speed * timer.delta, 0);
            }
        }
    };
    ThreeUtil.setupGuiChange = function (control, onFinishChange, onChange, listen, title) {
        if (listen != null && listen !== undefined && listen) {
            control.listen();
        }
        if (onFinishChange != null && onFinishChange !== undefined) {
            control.onFinishChange(onFinishChange);
        }
        if (onChange != null && onChange !== undefined) {
            control.onChange(onChange);
        }
        if (title != null && title !== undefined) {
            control.name(title);
        }
        return control;
    };
    ThreeUtil.setGuiEnabled = function (control, isEnable) {
        if (isEnable === void 0) { isEnable = true; }
        if (control !== null && control !== undefined && control.domElement) {
            var parentElement = control.domElement.parentElement.parentElement;
            var previousElementSibling = control.domElement.previousElementSibling;
            if (isEnable) {
                if (parentElement) {
                    parentElement.classList.remove('no-pointer-events');
                }
                if (previousElementSibling) {
                    previousElementSibling.classList.remove('control-disabled');
                }
            }
            else {
                if (parentElement) {
                    parentElement.classList.add('no-pointer-events');
                }
                if (previousElementSibling) {
                    previousElementSibling.classList.add('control-disabled');
                }
            }
        }
        else {
            console.log('error', control);
        }
    };
    ThreeUtil.getGuiControlParam = function (children, name) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (child.name === name) {
                return child;
            }
            if (child.type === 'folder' && child.children && child.children.length > 0) {
                var foundChild = this.getGuiControlParam(child.children, name);
                if (foundChild !== null) {
                    return foundChild;
                }
            }
        }
        return null;
    };
    ThreeUtil.setupGui = function (control, gui, params) {
        var _this = this;
        params.forEach(function (param) {
            switch (param.type) {
                case 'color':
                    param.controler = _this.setupGuiChange(gui.addColor(param.control ? control[param.control] : control, param.name), param.finishChange, param.change, param.listen, param.title);
                    break;
                case 'folder':
                    var folder = gui.addFolder(param.name);
                    param.controler = _this.setupGui(param.control ? control[param.control] : control, folder, param.children);
                    if (param.isOpen) {
                        folder.open();
                    }
                    break;
                case 'number':
                    param.controler = _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name, param.min, param.max, param.step), param.finishChange, param.change, param.listen, param.title);
                    break;
                case 'listen':
                    param.controler = gui
                        .add(param.control ? control[param.control] : control, param.name)
                        .listen();
                    break;
                case 'select':
                    param.controler = _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name, param.select), param.finishChange, param.change, param.listen, param.title);
                    break;
                case 'button':
                default:
                    param.controler = _this.setupGuiChange(gui.add(param.control ? control[param.control] : control, param.name), param.finishChange, param.change, param.listen, param.title);
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
        if (style instanceof dat_gui_module_1.GUI) {
            this.gui = style;
            this.domElement = this.gui.domElement;
        }
        else {
            this.gui = new dat_gui_module_1.GUI(pars);
            this.domElement = this.gui.domElement;
            this.setStyle(style);
        }
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
        this.gui.destroy();
        return this;
    };
    ThreeGui.prototype.removeFolder = function (folder) {
        this.gui.removeFolder(folder);
        return this;
    };
    ThreeGui.prototype.listen = function () {
        this.gui.listen();
        return this;
    };
    ThreeGui.prototype.name = function (name) {
        this.gui.name(name);
        return this;
    };
    ThreeGui.prototype.onFinishChange = function (callBack) {
        this.gui.onFinishChange(callBack);
        return this;
    };
    ThreeGui.prototype.onChange = function (callBack) {
        this.gui.onChange(callBack);
        return this;
    };
    ThreeGui.prototype.open = function () {
        this.gui.open();
        return this;
    };
    ThreeGui.prototype.close = function () {
        this.gui.close();
        return this;
    };
    ThreeGui.prototype.hide = function () {
        this.gui.hide();
        return this;
    };
    ThreeGui.prototype.show = function () {
        this.gui.show();
        return this;
    };
    ThreeGui.prototype.remove = function (controller) {
        this.gui.remove(controller);
        return this;
    };
    ThreeGui.customCss = ".no-pointer-events {pointer-events: none;}.control-disabled {color: #888;text-decoration: line-through;}";
    return ThreeGui;
}());
exports.ThreeGui = ThreeGui;
