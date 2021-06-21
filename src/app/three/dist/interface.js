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
exports.ThreeGui = exports.ThreeGeometryCustom = exports.ThreeStats = exports.ThreeClock = exports.ThreeUtil = exports.BaseComponent = exports.THREE = void 0;
var core_1 = require("@angular/core");
var CHROMA = require("chroma-js");
var THREE = require("three");
exports.THREE = THREE;
var dat_gui_module_1 = require("three/examples/jsm/libs/dat.gui.module");
var stats_module_1 = require("three/examples/jsm/libs/stats.module");
var DDSLoader_1 = require("three/examples/jsm/loaders/DDSLoader");
var BaseComponent = /** @class */ (function () {
    function BaseComponent(controls, controlsParams) {
        if (controlsParams === void 0) { controlsParams = []; }
        this._logTimeSeqn = 0;
        this._subscribe = {};
        this.renderer = null;
        this.scene = null;
        this.camera = null;
        this.mesh = null;
        this.meshObject3d = null;
        this.meshChildren = null;
        this.controls = ThreeUtil.getControls(controls, this);
        this.setControlsParams(controlsParams);
    }
    BaseComponent.prototype.setControlsParams = function (controlsParams) {
        if (controlsParams === void 0) { controlsParams = []; }
        this.controlsParams = ThreeUtil.getControlsParams(controlsParams, this);
    };
    BaseComponent.prototype.ngOnInit = function () { };
    BaseComponent.prototype.ngAfterViewInit = function () {
        this.controls.meshRotate.applyAutoRotate();
    };
    BaseComponent.prototype.ngOnDestroy = function () {
        if (this._subscribe !== null) {
            for (var key in this._subscribe) {
                this._subscribe[key].unsubscribe();
            }
            this._subscribe = {};
        }
    };
    BaseComponent.prototype.consoleLogTime = function (key, object, repeat) {
        if (repeat === void 0) { repeat = 300; }
        this._logTimeSeqn++;
        if (this._logTimeSeqn % repeat === 0) {
            this.consoleLog(key, object, 'info');
        }
    };
    BaseComponent.prototype.consoleLog = function (key, object, level) {
        if (level === void 0) { level = 'log'; }
        switch (level) {
            case 'error':
                console.error(key, object);
                break;
            case 'info':
                console.info(key, object);
                break;
            case 'trace':
                console.trace(key, object);
                break;
            case 'log':
            default:
                // console.log(key, object);
                break;
        }
    };
    BaseComponent.prototype.unSubscribeRefer = function (key) {
        if (ThreeUtil.isNotNull(this._subscribe[key])) {
            this._subscribe[key].unsubscribe();
            delete this._subscribe[key];
        }
    };
    BaseComponent.prototype.subscribeRefer = function (key, subscription) {
        if (ThreeUtil.isNotNull(this._subscribe[key])) {
            this.unSubscribeRefer(key);
        }
        if (ThreeUtil.isNotNull(subscription)) {
            this._subscribe[key] = subscription;
        }
    };
    BaseComponent.prototype.setRender = function (renderer) {
        this.renderer = renderer;
    };
    BaseComponent.prototype.setScene = function (scene) {
        this.scene = scene;
    };
    BaseComponent.prototype.setCamera = function (camera) {
        this.camera = camera;
    };
    BaseComponent.prototype.updateGuiController = function () {
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
                x: (rotation.x / Math.PI) * 180,
                y: (rotation.y / Math.PI) * 180,
                z: (rotation.z / Math.PI) * 180
            };
            this.controls.meshRotate.x = this.controls.meshRotateOrg.x;
            this.controls.meshRotate.y = this.controls.meshRotateOrg.y;
            this.controls.meshRotate.z = this.controls.meshRotateOrg.z;
            if (this.controls.meshScale.x !== 1) {
                var controlsParams_1 = ThreeUtil.getGuiControlParam(this.controlsParams, 'Mesh Scale');
                var minScale_1 = this.controls.meshScale.x * 0.01;
                var maxScale_1 = this.controls.meshScale.x * 1.5;
                var stepScale_1 = (maxScale_1 - minScale_1) / 30;
                controlsParams_1.children.forEach(function (child) {
                    if (ThreeUtil.isNotNull(child.controller['min'])) {
                        child.controller['min'](minScale_1);
                    }
                    if (ThreeUtil.isNotNull(child.controller['max'])) {
                        child.controller['max'](maxScale_1);
                    }
                    if (ThreeUtil.isNotNull(child.controller['step'])) {
                        child.controller['step'](stepScale_1);
                    }
                });
            }
            var controlsParams = ThreeUtil.getGuiControlParam(this.controlsParams, 'Mesh Visible');
            if (ThreeUtil.isNotNull(controlsParams) && ThreeUtil.isNotNull(this.controls.meshShape)) {
                this.controls.meshShape.visible = this.mesh.getObject3d().visible;
                var helperParams = ThreeUtil.getGuiControlParam(controlsParams.children, 'helperVisible');
                var helper = this.mesh.helperComponent;
                if (helperParams && helperParams.controller) {
                    if (ThreeUtil.isNotNull(helper)) {
                        if (helper instanceof THREE.SkeletonHelper) {
                            helperParams.controller.name('Skeleton');
                        }
                        else {
                            helperParams.controller.name('Helper');
                        }
                        this.controls.meshShape.helperVisible = helper.visible;
                        ThreeUtil.setGuiEnabled(helperParams.controller, true);
                    }
                    else {
                        this.controls.meshShape.helperVisible = false;
                        helperParams.controller.name('Not Supported');
                        ThreeUtil.setGuiEnabled(helperParams.controller, false);
                    }
                }
                else {
                    console.log(helperParams);
                }
            }
        }
    };
    BaseComponent.prototype.setMesh = function (mesh) {
        var _this = this;
        this.mesh = mesh;
        if (this.mesh !== null) {
            this.meshObject3d = this.mesh.getObject3d();
            this.meshChildren = this.meshObject3d.children;
            setTimeout(function () {
                _this.updateGuiController();
            }, 100);
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
                    case 'src':
                        if (ele instanceof HTMLImageElement || ele instanceof HTMLIFrameElement || ele instanceof HTMLVideoElement || ele instanceof HTMLAudioElement) {
                            ele.src = ThreeUtil.getStoreUrl(value);
                        }
                        break;
                    case 'draggable':
                        ele.draggable = value;
                        break;
                    case 'innerHtml':
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
                    case 'background':
                    case 'backgroundColor':
                    case 'borderColor':
                        if (typeof value == 'number' || typeof value == 'string') {
                            if (typeof value == 'string' && (value.indexOf('rgba') > -1 || value.indexOf('rgb') > -1 || value.indexOf('#') > -1)) {
                                styleList[key] = value;
                            }
                            else {
                                styleList[key] = _this.getColorSafe(value).getStyle();
                            }
                        }
                        else if (value instanceof THREE.Color) {
                            styleList[key] = value.getStyle();
                        }
                        else if (value instanceof THREE.Vector4) {
                            styleList[key] = 'rgba(' + value.x * 255 + ',' + value.y * 255 + ',' + value.z * 255 + ',' + value.w + ')';
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
                if (this.isNotNull(styles.className)) {
                    ele.className = styles.className;
                }
                break;
            default:
                var cssStyleList_1 = [];
                Object.entries(styleList).forEach(function (_a) {
                    var key = _a[0], value = _a[1];
                    cssStyleList_1.push(_this.camelCaseToDash(key) + ': ' + value);
                });
                this.cssInject('.' + clazzName + (vertualClass ? ':' + vertualClass : '') + '{' + cssStyleList_1.join(';') + '}', clazzName);
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
        if (this.lastRenderer !== null && ThreeUtil.isNotNull(this.lastRenderer.renderer)) {
            return this.lastRenderer.renderer;
        }
        else {
            return new THREE.WebGLRenderer();
        }
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
    ThreeUtil.isArray = function (value) {
        return Array.isArray(value);
    };
    ThreeUtil.getFirst = function (value) {
        if (Array.isArray(value)) {
            return value[0] || null;
        }
        else {
            return value;
        }
    };
    ThreeUtil.isIndexOf = function (data, findMe) {
        if (Array.isArray(findMe)) {
            var result_1 = false;
            findMe.forEach(function (txt) {
                if (data.indexOf(txt) > -1) {
                    result_1 = true;
                }
            });
            return result_1;
        }
        else {
            return data.indexOf(findMe) > -1;
        }
    };
    ThreeUtil.isOnlyIndexOf = function (data, findMe, addedFindMe) {
        if (data.length === 0) {
            return true;
        }
        else {
            if (this.isNotNull(addedFindMe)) {
                findMe = this.pushUniq(findMe, addedFindMe);
            }
            var result_2 = true;
            data.forEach(function (txt) {
                if (findMe.indexOf(txt) === -1) {
                    result_2 = false;
                }
            });
            return result_2;
        }
    };
    ThreeUtil.pushUniq = function (data, addMe) {
        if (Array.isArray(addMe)) {
            addMe.forEach(function (obj) {
                if (data.indexOf(obj) === -1) {
                    data.push(obj);
                }
            });
        }
        else if (ThreeUtil.isNotNull(addMe)) {
            if (data.indexOf(addMe) === -1) {
                data.push(addMe);
            }
        }
        return data;
    };
    ThreeUtil.getStoreUrl = function (url) {
        if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        else {
            return '/assets/examples/' + url;
        }
    };
    ThreeUtil.getLoadingManager = function () {
        if (this._manager === null) {
            this._manager = new THREE.LoadingManager(function () {
                console.log('loaded');
            }, function (url, loaded, total) {
                console.log(url, loaded, total);
            }, function (url) {
                console.error(url);
            });
            this._manager.addHandler(/\.dds$/i, new DDSLoader_1.DDSLoader());
        }
        return this._manager;
    };
    ThreeUtil.getHtmlCode = function (info, preTab) {
        var _this = this;
        if (preTab === void 0) { preTab = ''; }
        var tag = info.tag;
        var attributes = info.attributes;
        var tags = [];
        tags.push(preTab + '<' + tag);
        attributes.forEach(function (attr) {
            var key = attr.name;
            var value = attr.value;
            if (_this.isNotNull(value)) {
                if (value instanceof THREE.Color) {
                    tags.push(preTab + '\t[' + key + ']="\'#' + value.getHexString() + '\'"');
                }
                else if (typeof value == 'number') {
                    if (Math.round(value) !== value) {
                        tags.push(preTab + '\t[' + key + ']="' + parseFloat(value.toFixed(4)) + '"');
                    }
                    else {
                        tags.push(preTab + '\t[' + key + ']="' + value + '"');
                    }
                }
                else if (typeof value == 'string') {
                    tags.push(preTab + '\t[' + key + ']="\'' + value + '\'"');
                }
            }
        });
        tags.push(preTab + '>');
        if (info.children && info.children.length > 0) {
            info.children.forEach(function (child) {
                tags.push(_this.getHtmlCode(child.getTagAttribute(info.options), preTab + '\t'));
            });
        }
        tags.push(preTab + '</' + tag + '>');
        return tags.join('\n');
    };
    ThreeUtil.getColor = function (color) {
        if (this.isNotNull(color)) {
            if (color instanceof THREE.Color) {
                return color;
            }
            else if (typeof color === 'string') {
                return this.getColorSafe(color, null);
            }
            else if (typeof color === 'object') {
                if (this.isNotNull(color.r) && this.isNotNull(color.g) && this.isNotNull(color.b)) {
                    return new THREE.Color(color.r, color.g, color.b);
                }
            }
            else {
                return new THREE.Color(color);
            }
        }
        return undefined;
    };
    ThreeUtil.getColorRGB = function (r, g, b, color) {
        var colorObj = this.isNotNull(color) ? this.getColor(color) : new THREE.Color(0x000000);
        if (this.isNotNull(colorObj)) {
            return colorObj.setRGB(this.isNotNull(r) ? r : colorObj.r, this.isNotNull(g) ? g : colorObj.g, this.isNotNull(b) ? b : colorObj.b);
        }
        return undefined;
    };
    ThreeUtil.getColorHSL = function (h, s, l, color) {
        var colorObj = this.isNotNull(color) ? this.getColor(color) : new THREE.Color(0x000000);
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
    ThreeUtil.getColorMultiplySafe = function (color, altColor, multiply) {
        var safeColor = this.getColorSafe(color, altColor);
        if (this.isNotNull(safeColor) && this.isNotNull(multiply)) {
            safeColor.multiplyScalar(multiply);
            if (safeColor.r < 0 || safeColor.r > 1) {
                safeColor.r = Math.min(1, Math.max(0, safeColor.r));
            }
            if (safeColor.g < 0 || safeColor.g > 1) {
                safeColor.g = Math.min(1, Math.max(0, safeColor.g));
            }
            if (safeColor.b < 0 || safeColor.b > 1) {
                safeColor.b = Math.min(1, Math.max(0, safeColor.b));
            }
        }
        return safeColor;
    };
    ThreeUtil.getParseFloat = function (value, max) {
        if (max === void 0) { max = 1; }
        if (/^(\+|\-|)[0-9]+(\.|)[0-9]*$/.test(value)) {
            return parseFloat(value);
        }
        else {
            switch (value.toLowerCase()) {
                case 'random':
                default:
                    return Math.random() * max;
            }
        }
    };
    ThreeUtil.getColorSafe = function (color, altColor, nullColor) {
        var defColor = this.isNotNull(color) ? color : this.isNotNull(altColor) ? altColor : nullColor;
        if (this.isNotNull(defColor)) {
            if (defColor instanceof THREE.Color) {
                return defColor;
            }
            else if (typeof defColor === 'string') {
                var colorStr = defColor;
                if (colorStr.startsWith('#')) {
                    return new THREE.Color(colorStr);
                }
                else if (colorStr === 'random') {
                    return new THREE.Color(Math.random() * 0xffffff);
                }
                else if (colorStr.startsWith('0x')) {
                    return new THREE.Color(parseInt(colorStr, 16));
                }
                else if (colorStr.indexOf(':') > 0 || colorStr.indexOf('(') > 0) {
                    var _a = (colorStr + ',,,')
                        .replace('(', ',')
                        .replace(')', ',')
                        .replace(':', ',')
                        .replace(/[^A-Za-z\-0-9\.,]/g, '')
                        .split(','), type = _a[0], val1 = _a[1], val2 = _a[2], val3 = _a[3];
                    switch (type.toLowerCase()) {
                        case 'hsl':
                            var h = this.getParseFloat(val1);
                            var s = this.getParseFloat(val2);
                            var l = this.getParseFloat(val3);
                            return new THREE.Color().setHSL(h, s, l);
                        case 'rgb':
                            var r = this.getParseFloat(val1, 255);
                            var g = this.getParseFloat(val2, 255);
                            var b = this.getParseFloat(val3, 255);
                            return new THREE.Color(r / 255, g / 255, b / 255);
                    }
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
            if (typeof angle === 'string') {
                return Math.random() * 2 * Math.PI;
            }
            else {
                return (defValue / 180) * Math.PI;
            }
        }
        return undefined;
    };
    ThreeUtil.getBooleanSafe = function (bl, altbl) {
        var defValue = this.getTypeSafe(bl, altbl);
        if (typeof defValue === 'boolean') {
            return defValue;
        }
        else if (typeof defValue === 'string') {
            switch (defValue.toLowerCase()) {
                case '1':
                case 'y':
                case 'yes':
                case 'true':
                case 't':
                case 'on':
                    return true;
                case '':
                case '0':
                case 'n':
                case 'no':
                case 'false':
                case 'f':
                case 'off':
                    return false;
            }
        }
        else if (typeof defValue === 'number') {
            if (defValue > 0) {
                return true;
            }
            else {
                return false;
            }
        }
        return undefined;
    };
    ThreeUtil.getAngle2RadianSafe = function (angle, altangle) {
        var defValue = this.getTypeSafe(angle, altangle);
        if (this.isNotNull(defValue)) {
            return (defValue / 180) * Math.PI;
        }
        return undefined;
    };
    ThreeUtil.getRadian2AngleSafe = function (angle, altangle) {
        var defValue = this.getTypeSafe(angle, altangle);
        if (this.isNotNull(defValue)) {
            return (defValue / Math.PI) * 180;
        }
        return undefined;
    };
    ThreeUtil.getVector2VSafe = function (v2, altValue) {
        if (v2 instanceof THREE.Vector2) {
            return v2;
        }
        else if (this.isNotNull(v2) && v2.length >= 2) {
            return this.getVector2Safe(v2[0], v2[1], altValue);
        }
        return undefined;
    };
    ThreeUtil.getVector2Safe = function (x, y, altValue, v2, isRequired) {
        var defValue = this.isNotNull(x) || this.isNotNull(y) ? new THREE.Vector2(this.getTypeSafe(x, y), this.getTypeSafe(y, x)) : null;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        if (this.isNotNull(v2)) {
            return this.getVector2VSafe(v2, altValue);
        }
        if (this.isNotNull(altValue)) {
            return altValue;
        }
        if (isRequired) {
            return new THREE.Vector2();
        }
        return undefined;
    };
    ThreeUtil.getVector3VSafe = function (v3, altValue) {
        if (v3 instanceof THREE.Vector3) {
            return v3;
        }
        else if (this.isNotNull(v3) && v3.length >= 3) {
            return this.getVector3Safe(v3[0], v3[1], v3[2], altValue);
        }
        return undefined;
    };
    ThreeUtil.getVector3Safe = function (x, y, z, altValue, v3, isRequired) {
        var defValue = this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z) ? new THREE.Vector3(this.getTypeSafe(x, y, z), this.getTypeSafe(y, z, x), this.getTypeSafe(z, x, y)) : null;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        if (this.isNotNull(v3)) {
            return this.getVector3VSafe(v3, altValue);
        }
        if (this.isNotNull(altValue)) {
            return altValue;
        }
        if (isRequired) {
            return new THREE.Vector3();
        }
        return undefined;
    };
    ThreeUtil.getMatrix4Safe = function (obj, matrixType) {
        if (matrixType === void 0) { matrixType = 'maxtix'; }
        if (this.isNotNull(obj)) {
            switch (matrixType.toLowerCase()) {
                case 'projectionmatrixinverse':
                    if (this.isNotNull(obj['projectionMatrixInverse'])) {
                        return new THREE.Matrix4().copy(obj['projectionMatrixInverse']);
                    }
                    break;
                case 'projectionmatrix':
                    if (this.isNotNull(obj['projectionMatrix'])) {
                        return obj['projectionMatrix'];
                    }
                    break;
                case 'matrixworldinverse':
                    if (this.isNotNull(obj['matrixWorldInverse'])) {
                        return obj['matrixWorldInverse'];
                    }
                    break;
                case 'matrixworld':
                    return obj.matrixWorld;
                case 'matrix':
                default:
                    return obj.matrix;
            }
        }
        return new THREE.Matrix4();
    };
    ThreeUtil.getEulerSafe = function (x, y, z, altValue, isRequired) {
        var defValue = this.isNotNull(x) || this.isNotNull(y) || this.isNotNull(z) ? new THREE.Euler(this.getAngleSafe(this.getTypeSafe(x, y, z), 0), this.getAngleSafe(this.getTypeSafe(y, x, z), 0), this.getAngleSafe(this.getTypeSafe(z, x, y), 0)) : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        if (isRequired) {
            return new THREE.Euler(0, 0, 0);
        }
        return undefined;
    };
    ThreeUtil.getWrappingSafe = function (baseWrap, altWrap, def) {
        var wrap = this.getTypeSafe(baseWrap, altWrap, def || '');
        switch (wrap.toLowerCase()) {
            case 'wraprepeat':
            case 'repeatwrapping':
            case 'repeat':
                return THREE.RepeatWrapping;
            case 'mirroredrepeatwrapping':
            case 'mirroredrepeat':
                return THREE.MirroredRepeatWrapping;
            case 'clamptoedgewrapping':
            case 'clamptoedge':
            default:
                return THREE.ClampToEdgeWrapping;
        }
    };
    ThreeUtil.getTextureFilterSafe = function (baseFilter, altFilter, def) {
        var filter = this.getTypeSafe(baseFilter, altFilter, def || '');
        switch (filter) {
            case 'nearestfilter':
            case 'nearest':
                return THREE.NearestFilter;
            case 'nearestmipmapnearestfilter':
            case 'nearestmipmapnearest':
                return THREE.NearestMipmapNearestFilter;
            case 'nearestmipmaplinearfilter':
            case 'nearestmipmaplinear':
                return THREE.NearestMipmapLinearFilter;
            case 'linearmipmapnearestfilter':
            case 'linearmipmapnearest':
                return THREE.LinearMipmapNearestFilter;
            case 'linearmipmaplinearfilter':
            case 'linearmipmaplinear':
                return THREE.LinearMipmapLinearFilter;
            case 'linearfilter':
            case 'linear':
            default:
                return THREE.LinearFilter;
        }
    };
    ThreeUtil.getBlendingSafe = function (baseBlending, altBlending, def) {
        var blending = this.getTypeSafe(baseBlending, altBlending, def || '');
        switch (blending.toLowerCase()) {
            case 'noblending':
            case 'no':
                return THREE.NoBlending;
            case 'normalblending':
            case 'normal':
                return THREE.NormalBlending;
            case 'additiveblending':
            case 'additive':
                return THREE.AdditiveBlending;
            case 'subtractiveblending':
            case 'subtractive':
                return THREE.SubtractiveBlending;
            case 'multiplyblending':
            case 'multiply':
                return THREE.MultiplyBlending;
            case 'customblending':
            case 'custom':
                return THREE.CustomBlending;
        }
        return undefined;
    };
    ThreeUtil.getPixelFormatSafe = function (baseFormat, altFormat, def) {
        var format = this.getTypeSafe(baseFormat, altFormat, def || '');
        switch (format.toLowerCase()) {
            case 'alphaformat':
            case 'alpha':
                return THREE.AlphaFormat;
            case 'redformat':
            case 'red':
                return THREE.RedFormat;
            case 'redintegerformat':
            case 'redinteger':
                return THREE.RedIntegerFormat;
            case 'rgformat':
            case 'rg':
                return THREE.RGFormat;
            case 'rgintegerformat':
            case 'rginteger':
                return THREE.RGIntegerFormat;
            case 'rgbformat':
            case 'rgb':
                return THREE.RGBFormat;
            case 'rgbintegerformat':
            case 'rgbinteger':
                return THREE.RGBIntegerFormat;
            case 'rgbaintegerformat':
            case 'rgbainteger':
                return THREE.RGBAIntegerFormat;
            case 'luminanceformat':
            case 'luminance':
                return THREE.LuminanceFormat;
            case 'luminancealphaformat':
            case 'luminancealpha':
                return THREE.LuminanceAlphaFormat;
            case 'rgbeformat':
            case 'rgbe':
                return THREE.RGBEFormat;
            case 'depthformat':
            case 'depth':
                return THREE.DepthFormat;
            case 'depthstencilformat':
            case 'depthstencil':
                return THREE.DepthStencilFormat;
            case 'rgbaformat':
            case 'rgba':
                return THREE.RGBAFormat;
            default:
                break;
        }
        return undefined;
    };
    ThreeUtil.getTextureDataTypeSafe = function (baseFormat, altFormat, def) {
        var type = this.getTypeSafe(baseFormat, altFormat, def || '');
        switch (type.toLowerCase()) {
            case 'bytetype':
            case 'byte':
                return THREE.ByteType;
            case 'shorttype':
            case 'short':
                return THREE.ShortType;
            case 'unsignedshorttype':
            case 'unsignedshort':
                return THREE.UnsignedShortType;
            case 'inttype':
            case 'int':
                return THREE.IntType;
            case 'unsignedinttype':
            case 'unsignedint':
                return THREE.UnsignedIntType;
            case 'floattype':
            case 'float':
                return THREE.FloatType;
            case 'halffloattype':
            case 'halffloat':
                return THREE.HalfFloatType;
            case 'unsignedshort4444type':
            case 'unsignedshort4444':
                return THREE.UnsignedShort4444Type;
            case 'unsignedshort5551type':
            case 'unsignedshort5551':
                return THREE.UnsignedShort5551Type;
            case 'unsignedshort565type':
            case 'unsignedshort565':
                return THREE.UnsignedShort565Type;
            case 'unsignedint248type':
            case 'unsignedint248':
                return THREE.UnsignedInt248Type;
            case 'unsignedbytetype':
            case 'unsignedbyte':
            default:
                return THREE.UnsignedByteType;
        }
    };
    ThreeUtil.getObject3d = function (object3d, isRequired) {
        if (isRequired === void 0) { isRequired = true; }
        if (object3d instanceof THREE.Object3D) {
            return object3d;
        }
        else if (this.isNotNull(object3d.getMesh)) {
            return object3d.getObject3d();
        }
        else if (this.isNotNull(object3d.getLight)) {
            return object3d.getObject3d();
        }
        else if (this.isNotNull(object3d.getHelper)) {
            return object3d.getHelper();
        }
        else if (this.isNotNull(object3d.getAudio)) {
            return object3d.getAudio();
        }
        else if (this.isNotNull(object3d.getCamera)) {
            return object3d.getObject3d();
        }
        else if (this.isNotNull(object3d.getScene)) {
            return object3d.getScene();
        }
        else if (this.isNotNull(object3d.getObject3d)) {
            return object3d.getObject3d();
        }
        if (!isRequired) {
            return null;
        }
        return new THREE.Object3D();
    };
    ThreeUtil.getMeshFind = function (mesh) {
        if (mesh instanceof THREE.Mesh) {
            return mesh;
        }
        else if (this.isNotNull(mesh.getHelper)) {
            mesh = mesh.getHelper();
        }
        else if (this.isNotNull(mesh.getMesh)) {
            mesh = mesh.getObject3d();
        }
        else if (this.isNotNull(mesh)) {
            mesh = this.getObject3d(mesh);
        }
        if (mesh instanceof THREE.Mesh) {
            return mesh;
        }
        else if (mesh instanceof THREE.Group) {
            var childMesh_1 = null;
            mesh.children.forEach(function (child) {
                if (childMesh_1 === null && child instanceof THREE.Mesh) {
                    childMesh_1 = child;
                }
            });
            if (childMesh_1 !== null) {
                return childMesh_1;
            }
        }
        return null;
    };
    ThreeUtil.getMesh = function (mesh) {
        var findedMesh = this.getMeshFind(mesh);
        if (findedMesh !== null) {
            return findedMesh;
        }
        return new THREE.Mesh();
    };
    ThreeUtil.getLight = function (light) {
        if (light instanceof THREE.Light) {
            return light;
        }
        else if (this.isNotNull(light)) {
            var mesh = this.getObject3d(light);
            if (mesh instanceof THREE.Light) {
                return mesh;
            }
        }
        return new THREE.Light();
    };
    ThreeUtil.getMaterialByType = function (material, materialType) {
        var _this = this;
        var matchedMat = null;
        if (this.isNotNull(materialType) && materialType != '') {
            var matList = this.getMaterial(material);
            if (Array.isArray(matList)) {
                matList.forEach(function (mat) {
                    if (_this.isNull(mat.userData.materialType) || materialType.toLowerCase() === mat.userData.materialType) {
                        matchedMat = mat;
                    }
                });
            }
            else if (this.isNull(matList.userData.materialType) || materialType.toLowerCase() === matList.userData.materialType) {
                matchedMat = matList;
            }
        }
        else {
            var matList = this.getMaterial(material);
            if (Array.isArray(matList)) {
                if (matList.length > 0) {
                    matchedMat = matList[0];
                }
            }
            else {
                matchedMat = matList;
            }
        }
        return matchedMat;
    };
    ThreeUtil.getMaterial = function (material) {
        if (material instanceof THREE.Material) {
            return material;
        }
        else if (Array.isArray(material)) {
            return material;
        }
        else if (this.isNotNull(material.getMaterial)) {
            return material.getMaterial();
        }
        else if (this.isNotNull(material)) {
            var mesh = this.getObject3d(material);
            if (mesh instanceof THREE.Mesh) {
                if (this.isNotNull(material.material)) {
                    return material.material;
                }
            }
        }
        return new THREE.Material();
    };
    ThreeUtil.getMaterialOne = function (material) {
        var materialList = this.getMaterial(material);
        if (Array.isArray(materialList)) {
            if (materialList.length > 0) {
                materialList[0];
            }
        }
        else {
            return materialList;
        }
        return new THREE.Material();
    };
    ThreeUtil.getGeometry = function (geometry) {
        if (geometry instanceof THREE.BufferGeometry) {
            return geometry;
        }
        else if (this.isNotNull(geometry.getGeometry)) {
            return geometry.getGeometry();
        }
        else if (this.isNotNull(geometry)) {
            var mesh = this.getObject3d(geometry);
            if (mesh instanceof THREE.Mesh) {
                if (this.isNotNull(mesh.geometry)) {
                    return mesh.geometry;
                }
            }
        }
        return new THREE.BufferGeometry();
    };
    ThreeUtil.setThreeComponent = function (key, object) {
        if (this.isNotNull(object)) {
            this.loadedComponent[key] = object;
        }
        else {
            delete this.loadedComponent[key];
        }
    };
    ThreeUtil.isThreeComponent = function (object) {
        if (this.isNotNull(object.userData) && this.isNotNull(object.userData.component)) {
            return true;
        }
        else {
            return false;
        }
    };
    ThreeUtil.getThreeComponent = function (object) {
        if (this.isThreeComponent(object)) {
            return this.loadedComponent[object.userData.component] || {};
        }
        else {
            return null;
        }
    };
    ThreeUtil.setSubscribeNext = function (object, key) {
        if (this.isNotNull(object.setSubscribeNext)) {
            object.setSubscribeNext(key);
        }
        else if (this.isThreeComponent(object)) {
            var threeComponent = this.getThreeComponent(object);
            if (this.isNotNull(threeComponent.setSubscribeNext)) {
                threeComponent.setSubscribeNext(key);
            }
        }
    };
    ThreeUtil.getSubscribe = function (object, callBack, nextKey) {
        var _this = this;
        if (this.isThreeComponent(object)) {
            var threeComponent = this.getThreeComponent(object);
            if (this.isNotNull(threeComponent.getSubscribe)) {
                object = threeComponent;
            }
        }
        if (this.isNotNull(object.getSubscribe)) {
            return object.getSubscribe().subscribe(function (keyList) {
                if (_this.isNull(nextKey)) {
                    callBack('anyevent');
                }
                else {
                    switch (nextKey.toLowerCase()) {
                        case 'lookat':
                            if (_this.isIndexOf(keyList, ['object3d', 'mesh', 'position', 'lookat'])) {
                                callBack('lookat');
                            }
                            break;
                        case 'position':
                            if (_this.isIndexOf(keyList, ['object3d', 'mesh', 'position'])) {
                                callBack('position');
                            }
                            break;
                        case 'rotation':
                            if (_this.isIndexOf(keyList, ['object3d', 'mesh', 'rotation'])) {
                                callBack('rotation');
                            }
                            break;
                        case 'scale':
                            if (_this.isIndexOf(keyList, ['object3d', 'mesh', 'scale'])) {
                                callBack('scale');
                            }
                            break;
                        case 'geometry':
                            if (_this.isIndexOf(keyList, ['object3d', 'mesh', 'geometry'])) {
                                callBack('geometry');
                            }
                            break;
                        case 'material':
                            if (_this.isIndexOf(keyList, ['object3d', 'mesh', 'material'])) {
                                callBack('material');
                            }
                            break;
                        case 'texture':
                            if (_this.isIndexOf(keyList, ['object3d', 'mesh', 'material', 'texture', 'loaded'])) {
                                callBack('texture');
                            }
                            break;
                        default:
                            if (keyList.indexOf(nextKey.toLowerCase()) > -1) {
                                callBack(nextKey);
                            }
                            break;
                    }
                }
            });
        }
        return null;
    };
    ThreeUtil.getTexture = function (texture, refType, isRequired) {
        if (refType === void 0) { refType = 'map'; }
        if (isRequired === void 0) { isRequired = true; }
        if (texture instanceof THREE.Texture) {
            return texture;
        }
        else if (this.isNotNull(texture.getTexture)) {
            return texture.getTexture();
        }
        else if (this.isNotNull(texture)) {
            var material = this.getMaterial(texture);
            if (Array.isArray(material) && material.length > 0) {
                var firstMaterial = material[0];
                if (this.isNotNull(firstMaterial[refType]) && firstMaterial[refType] instanceof THREE.Texture) {
                    return firstMaterial[refType];
                }
            }
            else {
                if (this.isNotNull(material[refType]) && material[refType] instanceof THREE.Texture) {
                    return material[refType];
                }
            }
        }
        if (!isRequired) {
            return null;
        }
        return new THREE.Texture();
    };
    ThreeUtil.getPosition = function (position) {
        if (this.isNotNull(position)) {
            if (position instanceof THREE.Vector3) {
                return position;
            }
            else if (Array.isArray(position) && position.length >= 3) {
                return this.getVector3Safe(position[0], position[1], position[2], null, null, true);
            }
            else if (this.isNotNull(position.getPosition)) {
                return position.getPosition();
            }
            else if (this.isNotNull(position.getLookAt)) {
                return position.getLookAt();
            }
            else if (this.isNotNull(position.x) && this.isNotNull(position.y) && this.isNotNull(position.z)) {
                return this.getVector3Safe(position.x, position.y, position.z, null, null, true);
            }
            else {
                var object3d = this.getObject3d(position);
                return object3d.position;
            }
        }
        return new THREE.Vector3();
    };
    ThreeUtil.getRotation = function (rotation) {
        if (this.isNotNull(rotation)) {
            if (rotation instanceof THREE.Euler) {
                return rotation;
            }
            else if (Array.isArray(rotation) && rotation.length >= 3) {
                return this.getEulerSafe(rotation[0], rotation[1], rotation[2], null, true);
            }
            else if (this.isNotNull(rotation.getRotation)) {
                return rotation.getRotation();
            }
            else if (this.isNotNull(rotation.x) && this.isNotNull(rotation.y) && this.isNotNull(rotation.z)) {
                if (this.isNotNull(rotation.isEuler) && rotation.isEuler) {
                    return new THREE.Euler(rotation.x, rotation.y, rotation.z);
                }
                else {
                    return this.getEulerSafe(rotation.x, rotation.y, rotation.z, null, true);
                }
            }
            else {
                var object3d = this.getObject3d(rotation);
                return object3d.rotation;
            }
        }
        return new THREE.Euler();
    };
    ThreeUtil.getScale = function (scale) {
        if (this.isNotNull(scale)) {
            if (scale instanceof THREE.Vector3) {
                return scale;
            }
            else if (Array.isArray(scale) && scale.length >= 3) {
                return this.getVector3Safe(scale[0], scale[1], scale[2], null, null, true);
            }
            else if (this.isNotNull(scale.getScale)) {
                return scale.getScale();
            }
            else if (this.isNotNull(scale.x) && this.isNotNull(scale.y) && this.isNotNull(scale.z)) {
                return this.getVector3Safe(scale.x, scale.y, scale.z, null, null, true);
            }
            else {
                var object3d = this.getObject3d(scale);
                return object3d.scale;
            }
        }
        return new THREE.Vector3();
    };
    ThreeUtil.getLookAt = function (lookat) {
        if (this.isNotNull(lookat)) {
            if (lookat instanceof THREE.Vector3) {
                return lookat;
            }
            else if (Array.isArray(lookat) && lookat.length >= 3) {
                return this.getVector3Safe(lookat[0], lookat[1], lookat[2], null, null, true);
            }
            else if (this.isNotNull(lookat.getLookAt)) {
                return lookat.getLookAt();
            }
            else if (this.isNotNull(lookat.getPosition)) {
                return lookat.getPosition();
            }
            else if (this.isNotNull(lookat.x) && this.isNotNull(lookat.y) && this.isNotNull(lookat.z)) {
                return this.getVector3Safe(lookat.x, lookat.y, lookat.z, null, null, true);
            }
            else {
                return this.getObject3d(lookat).position;
            }
        }
        return new THREE.Vector3();
    };
    ThreeUtil.isTextureLoaded = function (texture) {
        if (texture instanceof THREE.CubeTexture || texture['isCubeTexture']) {
            if (this.isNotNull(texture.image) && texture.image.length === 6) {
                return true;
            }
        }
        if (texture instanceof THREE.DataTexture || texture['isDataTexture']) {
            if (this.isNotNull(texture.image) && this.isNotNull(texture.image.data) && texture.image.data.length > 0) {
                return true;
            }
        }
        else if (texture instanceof THREE.VideoTexture || texture['isVideoTexture']) {
            if (this.isNotNull(texture.image) && texture.image instanceof HTMLVideoElement && texture.image.error === null) {
                return true;
            }
        }
        else if (texture instanceof THREE.Texture && this.isNotNull(texture.image)) {
            if (texture.image instanceof HTMLImageElement || texture.image instanceof HTMLCanvasElement || texture.image instanceof HTMLVideoElement) {
                return true;
            }
            if (Array.isArray(texture.image) && texture.image.length >= 6) {
                return true;
            }
            if (ThreeUtil.isNotNull(texture.image.data) && texture.image.data.length > 0) {
                return true;
            }
        }
        return false;
    };
    ThreeUtil.getTextureEncodingSafe = function (baseEncoding, altEncoding, def) {
        var encoding = this.getTypeSafe(baseEncoding, altEncoding, def || '');
        switch (encoding.toLowerCase()) {
            case 'srgbencoding':
            case 'srgb':
                return THREE.sRGBEncoding;
            case 'gammaencoding':
            case 'gamma':
                return THREE.GammaEncoding;
            case 'rgbeencoding':
            case 'rgbe':
                return THREE.RGBEEncoding;
            case 'logluvencoding':
            case 'logluv':
                return THREE.LogLuvEncoding;
            case 'rgbm7encoding':
            case 'rgbm7':
                return THREE.RGBM7Encoding;
            case 'rgbm16encoding':
            case 'rgbm16':
                return THREE.RGBM16Encoding;
            case 'rgbdencoding':
            case 'rgbd':
                return THREE.RGBDEncoding;
            case 'linearencoding':
            case 'linear':
                return THREE.LinearEncoding;
            default:
                break;
        }
        return undefined;
    };
    ThreeUtil.getMappingSafe = function (baseMapping, altMapping, def) {
        var mapping = this.getTypeSafe(baseMapping, altMapping, def || '');
        switch (mapping.toLowerCase()) {
            case 'uvmapping':
            case 'uv':
                return THREE.UVMapping;
            case 'cubereflectionmapping':
            case 'cubereflection':
                return THREE.CubeReflectionMapping;
            case 'cuberefractionmapping':
            case 'cuberefraction':
                return THREE.CubeRefractionMapping;
            case 'equirectangularreflectionmapping':
            case 'equirectangularreflection':
                return THREE.EquirectangularReflectionMapping;
            case 'equirectangularrefractionmapping':
            case 'equirectangularrefraction':
                return THREE.EquirectangularRefractionMapping;
            case 'cubeuvreflectionmapping':
            case 'cubeuvreflection':
                return THREE.CubeUVReflectionMapping;
            case 'cubeuvrefractionmapping':
            case 'cubeuvrefraction':
                return THREE.CubeUVRefractionMapping;
            default:
                return THREE.Texture.DEFAULT_MAPPING;
        }
    };
    ThreeUtil.getCubeImage = function (cubeImage) {
        if (ThreeUtil.isNotNull(cubeImage) && cubeImage.length !== 6 && cubeImage.length >= 1) {
            var prefix = cubeImage[0];
            var postfix = cubeImage[1] || 'png';
            var prefix1 = cubeImage[2] || 'p';
            var prefix2 = cubeImage[3] || 'n';
            return [prefix + prefix1 + 'x.' + postfix, prefix + prefix2 + 'x.' + postfix, prefix + prefix1 + 'y.' + postfix, prefix + prefix2 + 'y.' + postfix, prefix + prefix1 + 'z.' + postfix, prefix + prefix2 + 'z.' + postfix];
        }
        else {
            return cubeImage;
        }
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
                                _this.setGuiEnabled(controlsParams.children[1].controller, false);
                                _this.setGuiEnabled(controlsParams.children[4].controller, true);
                            }
                            else {
                                if (_this.isNotNull(component.mesh)) {
                                    var meshRotate = component.mesh.getRotation();
                                    component.controls.meshRotate.x = ((meshRotate.x / Math.PI) * 180) % 360;
                                    component.controls.meshRotate.y = ((meshRotate.y / Math.PI) * 180) % 360;
                                    component.controls.meshRotate.z = ((meshRotate.z / Math.PI) * 180) % 360;
                                }
                                _this.setGuiEnabled(controlsParams.children[1].controller, true);
                                _this.setGuiEnabled(controlsParams.children[4].controller, false);
                            }
                        }
                    }
                },
                update: function () {
                    if (_this.isNotNull(component.mesh) && _this.isNotNull(component.controls.meshRotate)) {
                        component.mesh.setRotation(component.controls.meshRotate.x, component.controls.meshRotate.autoRotate ? null : component.controls.meshRotate.y, component.controls.meshRotate.z);
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
        params.push({
            name: 'Mesh Visible',
            type: 'folder',
            control: 'meshShape',
            children: [
                {
                    name: 'visible',
                    type: 'checkbox',
                    listen: true,
                    change: function () {
                        if (_this.isNotNull(component.mesh)) {
                            component.mesh.setVisible(component.controls.meshShape.visible, null);
                        }
                    }
                },
                {
                    name: 'helperVisible',
                    type: 'checkbox',
                    listen: true,
                    change: function () {
                        if (_this.isNotNull(component.mesh)) {
                            component.mesh.setVisible(null, component.controls.meshShape.helperVisible);
                        }
                    }
                },
                {
                    name: 'wireframe',
                    type: 'checkbox',
                    listen: true,
                    change: function () {
                        if (_this.isNotNull(component.mesh)) {
                            component.mesh.setWireFrame(component.controls.meshShape.wireframe);
                        }
                    }
                },
            ],
            isOpen: false
        });
        params.push({
            name: 'Mesh Rotation',
            type: 'folder',
            control: 'meshRotate',
            children: [
                {
                    name: 'x',
                    type: 'number',
                    min: -360,
                    max: 360,
                    step: 5,
                    listen: true,
                    change: function () {
                        component.controls.meshRotate.update();
                    }
                },
                {
                    name: 'y',
                    type: 'number',
                    min: -360,
                    max: 360,
                    step: 5,
                    listen: true,
                    change: function () {
                        component.controls.meshRotate.update();
                    }
                },
                {
                    name: 'z',
                    type: 'number',
                    min: -360,
                    max: 360,
                    step: 5,
                    listen: true,
                    change: function () {
                        component.controls.meshRotate.update();
                    }
                },
                {
                    name: 'autoRotate',
                    type: 'checkbox',
                    title: 'Auto Rotation',
                    listen: true,
                    change: function () {
                        component.controls.meshRotate.applyAutoRotate();
                    }
                },
                {
                    name: 'speed',
                    type: 'number',
                    min: -90,
                    max: 90,
                    step: 1,
                    listen: true,
                    title: 'Auto DegPSec'
                },
                { name: 'reset', type: 'button', title: 'Reset Rotation' },
            ],
            isOpen: false
        });
        params.push({
            name: 'Mesh Position',
            type: 'folder',
            control: 'meshPosition',
            children: [
                {
                    name: 'x',
                    type: 'number',
                    min: -3,
                    max: 3,
                    step: 0.01,
                    listen: true,
                    change: function () {
                        component.controls.meshPosition.update();
                    }
                },
                {
                    name: 'y',
                    type: 'number',
                    min: -3,
                    max: 3,
                    step: 0.01,
                    listen: true,
                    change: function () {
                        component.controls.meshPosition.update();
                    }
                },
                {
                    name: 'z',
                    type: 'number',
                    min: -3,
                    max: 3,
                    step: 0.01,
                    listen: true,
                    change: function () {
                        component.controls.meshPosition.update();
                    }
                },
                { name: 'reset', type: 'button', title: 'Reset Position' },
            ],
            isOpen: false
        });
        params.push({
            name: 'Mesh Scale',
            type: 'folder',
            control: 'meshScale',
            children: [
                {
                    name: 'x',
                    type: 'number',
                    min: 0.001,
                    max: 5,
                    step: 0.001,
                    listen: true,
                    change: function () {
                        component.controls.meshScale.update();
                    }
                },
                {
                    name: 'y',
                    type: 'number',
                    min: 0.001,
                    max: 5,
                    step: 0.001,
                    listen: true,
                    change: function () {
                        component.controls.meshScale.update();
                    }
                },
                {
                    name: 'z',
                    type: 'number',
                    min: 0.001,
                    max: 5,
                    step: 0.001,
                    listen: true,
                    change: function () {
                        component.controls.meshScale.update();
                    }
                },
                { name: 'reset', type: 'button', title: 'Reset Scale' },
            ],
            isOpen: false
        });
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
            var params = param.control ? control[param.control] : control;
            if (_this.isNotNull(params)) {
                switch (param.type) {
                    case 'color':
                        param.controller = _this.setupGuiChange(gui.addColor(params, param.name), param.finishChange, param.change, param.listen, param.title);
                        break;
                    case 'folder':
                        var folder = gui.addFolder(param.name);
                        param.controller = _this.setupGui(params, folder, param.children);
                        if (param.isOpen) {
                            folder.open();
                        }
                        break;
                    case 'number':
                        param.controller = _this.setupGuiChange(gui.add(params, param.name, param.min, param.max, param.step), param.finishChange, param.change, param.listen, param.title);
                        break;
                    case 'listen':
                        param.controller = gui.add(params, param.name).listen();
                        break;
                    case 'select':
                        param.controller = _this.setupGuiChange(gui.add(params, param.name, param.select), param.finishChange, param.change, param.listen, param.title);
                        break;
                    case 'button':
                    default:
                        param.controller = _this.setupGuiChange(gui.add(params, param.name), param.finishChange, param.change, param.listen, param.title);
                        break;
                }
            }
        });
        return gui;
    };
    ThreeUtil._elementEvents = {};
    ThreeUtil.lastRenderer = null;
    ThreeUtil._manager = null;
    ThreeUtil.loadedComponent = {};
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
var ThreeGeometryCustom = /** @class */ (function () {
    function ThreeGeometryCustom() {
        this.scale = null;
        this.geometry = null;
    }
    ThreeGeometryCustom.prototype.initGeometry = function () {
        return new THREE.BufferGeometry();
    };
    ThreeGeometryCustom.prototype.setGeometry = function (geometry) {
        if (ThreeUtil.isNotNull(this.scale)) {
            var scale = ThreeUtil.getTypeSafe(this.scale, 1);
            geometry.scale(scale, scale, scale);
        }
        this.geometry = geometry;
    };
    ThreeGeometryCustom.prototype.getGeometry = function () {
        if (this.geometry == null) {
            this.setGeometry(this.initGeometry());
        }
        return this.geometry;
    };
    __decorate([
        core_1.Input()
    ], ThreeGeometryCustom.prototype, "scale");
    ThreeGeometryCustom = __decorate([
        core_1.Component({
            template: ''
        })
    ], ThreeGeometryCustom);
    return ThreeGeometryCustom;
}());
exports.ThreeGeometryCustom = ThreeGeometryCustom;
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
    ThreeGui.customCss = '.no-pointer-events {pointer-events: none;}.control-disabled {color: #888;text-decoration: line-through;}';
    return ThreeGui;
}());
exports.ThreeGui = ThreeGui;
