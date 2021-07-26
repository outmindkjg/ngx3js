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
exports.RendererComponent = void 0;
var core_1 = require("@angular/core");
var GSAP = require("gsap");
var rxjs_1 = require("rxjs");
var THREE = require("three");
var CSS2DRenderer_1 = require("three/examples/jsm/renderers/CSS2DRenderer");
var CSS3DRenderer_1 = require("three/examples/jsm/renderers/CSS3DRenderer");
var SVGRenderer_1 = require("three/examples/jsm/renderers/SVGRenderer");
var WebGL_1 = require("three/examples/jsm/WebGL");
var canvas_component_1 = require("../canvas/canvas.component");
var composer_component_1 = require("../composer/composer.component");
var control_component_1 = require("../control/control.component");
var controller_component_1 = require("../controller/controller.component");
var interface_1 = require("../interface");
var plane_component_1 = require("../plane/plane.component");
var shared_component_1 = require("../shared/shared.component");
var subscribe_abstract_1 = require("../subscribe.abstract");
var viewer_component_1 = require("../viewer/viewer.component");
var audio_component_1 = require("./../audio/audio.component");
var camera_component_1 = require("./../camera/camera.component");
var listener_component_1 = require("./../listener/listener.component");
var lookat_component_1 = require("./../lookat/lookat.component");
var scene_component_1 = require("./../scene/scene.component");
/**
 * RendererComponent
 */
var RendererComponent = /** @class */ (function (_super) {
    __extends(RendererComponent, _super);
    /**
     * Creates an instance of renderer component.
     */
    function RendererComponent() {
        var _this = _super.call(this) || this;
        /**
         * Input  of renderer component
         *
         * Notice - case insensitive.
         *
         */
        _this.type = 'webgl';
        /**
         * Input  of renderer component
         *
         * Notice - case insensitive.
         *
         */
        _this.cssType = 'none';
        /**
         * Input  of renderer component
         *
         * Notice - case insensitive.
         *
         */
        _this.controlType = 'none';
        /**
         * Input  of renderer component
         */
        _this.controlOptions = null;
        /**
         * If set, use shadow maps in the scene. Default is *true*.
         */
        _this.shadowMapEnabled = true;
        /**
         * Whether to use physically correct lighting mode. Default is *false*.
         * See the [example:webgl_lights_physical lights / physical] example.
         */
        _this.physicallyCorrectLights = false;
        /**
         * Defines shadow map type (unfiltered, percentage close filtering, percentage close filtering with bilinear filtering in shader)
         * Options are THREE.BasicShadowMap, THREE.PCFShadowMap (default), THREE.PCFSoftShadowMap and THREE.VSMShadowMap. See [page:Renderer Renderer constants] for details.
         *
         * Notice - case insensitive.
         *
         */
        _this.shadowMapType = null;
        /**
         * Sets the clear color
         */
        _this.clearColor = null;
        /**
         * Sets the alpha of the clear color
         */
        _this.clearAlpha = null;
        /**
         * Default is [page:Renderer NoToneMapping]. See the [page:Renderer Renderer constants] for other choices.
         *
         * Notice - case insensitive.
         *
         */
        _this.toneMapping = null;
        /**
         * Exposure level of tone mapping. Default is *1*.
         */
        _this.toneMappingExposure = null;
        /**
         * Defines whether the renderer respects object-level clipping planes. Default is *false*.
         */
        _this.localClippingEnabled = false;
        /**
         * User-defined clipping planes specified as THREE.Plane objects in world space.
         */
        _this.globalClippingEnabled = true;
        /**
         * whether to perform antialiasing. Default is *false*.
         */
        _this.antialias = false;
        /**
         * Input  of renderer component
         *
         * Notice - case insensitive.
         *
         */
        _this.quality = null;
        /**
         * Input  of renderer component
         *
         * Notice - case insensitive.
         *
         */
        _this.sizeType = 'auto';
        /**
         * Input  of renderer component
         */
        _this.width = -1;
        /**
         * Input  of renderer component
         */
        _this.height = -1;
        /**
         * Input  of renderer component
         */
        _this.x = 0;
        /**
         * Input  of renderer component
         */
        _this.y = 0;
        /**
         * Input  of renderer component
         */
        _this.statsMode = -1;
        /**
         * Defines whether the renderer should automatically clear its output before rendering a frame.
         */
        _this.autoClear = true;
        /**
         * If [page:.autoClear autoClear] is true, defines whether the renderer should clear the color buffer.
         * 	Default is *true*.
         */
        _this.autoClearColor = true;
        /**
         * Defines the output encoding of the renderer. Default is [page:Textures THREE.LinearEncoding].
         * If a render target has been set using [page:WebGLRenderer.setRenderTarget .setRenderTarget] then renderTarget.texture.encoding will be used instead.
         * See the [page:Textures texture constants] page for details of other formats.
         *
         * Notice - case insensitive.
         *
         */
        _this.outputEncoding = null;
        /**
         * Input  of renderer component
         */
        _this.guiControl = null;
        /**
         * Input  of renderer component
         */
        _this.guiParams = [];
        /**
         * whether to use a logarithmic depth buffer. It may
         * be neccesary to use this if dealing with huge differences in scale in a single scene. Note that this setting
         * uses gl_FragDepth if available which disables the [link:https://www.khronos.org/opengl/wiki/Early_Fragment_Test Early Fragment Test]
         * optimization and can cause a decrease in performance.
         * Default is *false*. See the [example:webgl_camera_logarithmicdepthbuffer camera / logarithmicdepthbuffer] example.
         */
        _this.logarithmicDepthBuffer = false;
        /**
         * whether to preserve the buffers until manually cleared
         * or overwritten. Default is *false*.
         */
        _this.preserveDrawingBuffer = false;
        /**
         * Input  of renderer component
         *
         * Notice - case insensitive.
         *
         */
        _this.useEvent = null;
        /**
         * Input  of renderer component
         */
        _this.camera = null;
        /**
         * Input  of renderer component
         */
        _this.scene = null;
        /**
         * Input  of renderer component
         */
        _this.beforeRender = null;
        /**
         * Output  of renderer component
         */
        _this.eventListener = new core_1.EventEmitter();
        /**
         * Output  of renderer component
         */
        _this.onRender = new core_1.EventEmitter();
        /**
         * View child of renderer component
         */
        _this.canvasEle = null;
        /**
         * View child of renderer component
         */
        _this.debugEle = null;
        /**
         * View child of renderer component
         */
        _this.rendererEle = null;
        /**
         * Events  of renderer component
         */
        _this.events = {
            type: 'none',
            client: new THREE.Vector2(),
            clientX: 0,
            clientY: 0,
            offset: new THREE.Vector2(),
            offsetX: 0,
            offsetY: 0,
            rate: new THREE.Vector2(),
            rateX: 0,
            rateY: 0,
            size: new THREE.Vector2(),
            width: 0,
            height: 0,
            mouse: new THREE.Vector2(),
            direction: new THREE.Vector2(),
            keyInfo: {
                code: null,
                ctrlKey: false,
                altKey: false,
                shiftKey: false,
                key: '',
                timeStamp: 0,
                timeRepeat: 0,
                xy: new THREE.Vector2()
            },
            event: {}
        };
        /**
         * Offset top of renderer component
         */
        _this.offsetTop = 0;
        /**
         * Offset left of renderer component
         */
        _this.offsetLeft = 0;
        /**
         * Offset right of renderer component
         */
        _this.offsetRight = 0;
        /**
         * Offset bottom of renderer component
         */
        _this.offsetBottom = 0;
        /**
         * Event listener of renderer component
         */
        _this._eventListener = {};
        /**
         * Size subject of renderer component
         */
        _this._sizeSubject = new rxjs_1.Subject();
        /**
         * Update subject of renderer component
         */
        _this._updateSubject = new rxjs_1.Subject();
        /**
         * User gesture subject of renderer component
         */
        _this._userGestureSubject = new rxjs_1.Subject();
        /**
         * Last confirm html of renderer component
         */
        _this._lastConfirmHtml = null;
        /**
         * User gesture shown of renderer component
         */
        _this._userGestureShown = false;
        /**
         * Renderlistener  of renderer component
         */
        _this.renderlistener = null;
        /**
         * Renderer  of renderer component
         */
        _this.renderer = null;
        /**
         * Css renderer of renderer component
         */
        _this.cssRenderer = null;
        /**
         * Renderer width of renderer component
         */
        _this.rendererWidth = 1024;
        /**
         * Renderer height of renderer component
         */
        _this.rendererHeight = 768;
        /**
         * Stats  of renderer component
         */
        _this.stats = null;
        /**
         * Gui  of renderer component
         */
        _this.gui = null;
        /**
         * Clock  of renderer component
         */
        _this.clock = null;
        /**
         * Controls  of renderer component
         */
        _this.controls = null;
        /**
         * Render control of renderer component
         */
        _this.renderControl = null;
        /**
         * Render caller of renderer component
         */
        _this._renderCaller = null;
        /**
         * Cameras  of renderer component
         */
        _this._cameras = null;
        /**
         * Scenes  of renderer component
         */
        _this._scenes = null;
        /**
         * Determines whether paused is
         */
        _this._isPaused = false;
        return _this;
    }
    /**
     * Gets shadow map type
     * @param [def]
     * @returns shadow map type
     */
    RendererComponent.prototype.getShadowMapType = function (def) {
        var shadowMapType = interface_1.ThreeUtil.getTypeSafe(this.shadowMapType, def, '');
        switch (shadowMapType.toLowerCase()) {
            case 'basicshadowmap':
            case 'basic':
                return THREE.BasicShadowMap;
            case 'pcfshadowmap':
            case 'pcf':
                return THREE.PCFShadowMap;
            case 'vsmshadowmap':
            case 'vsm':
                return THREE.VSMShadowMap;
            case 'pcfsoftshadowmap':
            case 'pcfsoft':
            default:
                return THREE.PCFSoftShadowMap;
        }
    };
    /**
     * Gets clipping planes
     * @param [def]
     * @returns clipping planes
     */
    RendererComponent.prototype.getClippingPlanes = function (def) {
        if (this.clippingPlanesList !== null && this.clippingPlanesList !== undefined) {
            var clippingPlanes_1 = [];
            this.clippingPlanesList.forEach(function (plane) {
                clippingPlanes_1.push(plane.getWorldPlane());
            });
            return clippingPlanes_1;
        }
        else {
            return def;
        }
    };
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    RendererComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this, 'renderer');
    };
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * before a directive, pipe, or service instance is destroyed.
     */
    RendererComponent.prototype.ngOnDestroy = function () {
        var _this = this;
        this.dispose();
        if (this.stats !== null) {
            this.stats.dom.parentNode.removeChild(this.stats.dom);
        }
        if (this.renderControl !== null) {
            this.renderControl.ngOnDestroy();
        }
        Object.entries(this._eventListener).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            _this.removeEvent(key, value);
            delete _this._eventListener[key];
        });
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
    RendererComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes && this.renderer) {
            this.addChanges(changes);
        }
    };
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of all of the directive's
     * content.
     * It is invoked only once when the directive is instantiated.
     */
    RendererComponent.prototype.ngAfterContentInit = function () {
        this.subscribeListQueryChange(this.sceneList, 'sceneList', 'scene');
        this.subscribeListQueryChange(this.cameraList, 'cameraList', 'camera');
        this.subscribeListQueryChange(this.composerList, 'composerList', 'composer');
        this.subscribeListQueryChange(this.viewerList, 'viewerList', 'viewer');
        this.subscribeListQueryChange(this.listenerList, 'listenerList', 'listener');
        this.subscribeListQueryChange(this.audioList, 'audioList', 'audio');
        this.subscribeListQueryChange(this.controllerList, 'controllerList', 'controller');
        this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
        this.subscribeListQueryChange(this.controlList, 'controlList', 'control');
        this.subscribeListQueryChange(this.clippingPlanesList, 'clippingPlanesList', 'clippingPlanes');
        this.subscribeListQueryChange(this.canvas2dList, 'canvas2dList', 'canvas2d');
        this.subscribeListQueryChange(this.sharedList, 'sharedList', 'shared');
        _super.prototype.ngAfterContentInit.call(this);
    };
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of a component's view.
     * It is invoked only once when the view is instantiated.
     */
    RendererComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        switch (this.type.toLowerCase()) {
            case 'gl2':
            case 'webgl2':
                if (WebGL_1.WEBGL.isWebGL2Available() === false) {
                    this.dispose();
                    this.renderer = null;
                    this.userGestureSubscribe(WebGL_1.WEBGL.getWebGL2ErrorMessage()).subscribe(function () {
                        _this.ngAfterViewInit();
                    });
                    return;
                }
        }
        this.clock = interface_1.ThreeUtil.getClock(true);
        this.renderer = this.getRenderer();
    };
    /**
     * Disposes renderer component
     */
    RendererComponent.prototype.dispose = function () {
        if (this.renderer !== null && this.renderer instanceof THREE.WebGLRenderer) {
            if (this.renderer.domElement && this.renderer.domElement.parentNode) {
                this.renderer.domElement.parentNode.removeChild(this.renderer.domElement);
            }
            this.renderer.dispose();
            this.renderer = null;
        }
        if (this.cssRenderer !== null) {
            if (this.cssRenderer.domElement && this.cssRenderer.domElement.parentNode) {
                this.cssRenderer.domElement.parentNode.removeChild(this.cssRenderer.domElement);
            }
            this.cssRenderer = null;
        }
    };
    /**
     * Removes event
     * @param type
     * @param listener
     * @returns
     */
    RendererComponent.prototype.removeEvent = function (type, listener) {
        if (interface_1.ThreeUtil.isNotNull(listener)) {
            switch (type) {
                case 'keydown':
                case 'keyup':
                case 'keypress':
                    window.removeEventListener(type, listener);
                    break;
                default:
                    this.rendererEle.nativeElement.removeEventListener(type, listener);
                    break;
            }
        }
        return null;
    };
    /**
     * Sets events
     * @param type
     * @param event
     */
    RendererComponent.prototype.setEvents = function (type, event) {
        var clientX = 0;
        var clientY = 0;
        if (event instanceof KeyboardEvent) {
            clientX = this.offsetLeft;
            clientY = this.offsetTop;
            var keyInfo = this.events.keyInfo;
            if (event.type == 'keyup') {
                keyInfo.code = null;
                keyInfo.ctrlKey = false;
                keyInfo.altKey = false;
                keyInfo.shiftKey = false;
                keyInfo.key = '';
                keyInfo.timeStamp = 0;
                keyInfo.timeRepeat = 0;
                keyInfo.xy.set(0, 0);
            }
            else if (this.events.keyInfo.code === event.code) {
                keyInfo.timeRepeat = event.timeStamp - keyInfo.timeStamp;
                switch (event.code) {
                    case 'ArrowRight':
                        keyInfo.xy.x += keyInfo.timeRepeat;
                        break;
                    case 'ArrowLeft':
                        keyInfo.xy.x -= keyInfo.timeRepeat;
                        break;
                    case 'ArrowUp':
                        keyInfo.xy.y += keyInfo.timeRepeat;
                        break;
                    case 'ArrowDown':
                        keyInfo.xy.y -= keyInfo.timeRepeat;
                        break;
                }
            }
            else {
                keyInfo.code = event.code;
                keyInfo.ctrlKey = event.ctrlKey;
                keyInfo.altKey = event.altKey;
                keyInfo.shiftKey = event.shiftKey;
                keyInfo.key = event.key;
                keyInfo.timeStamp = event.timeStamp;
                keyInfo.timeRepeat = 0;
                keyInfo.xy.set(0, 0);
            }
        }
        else {
            clientX = event.clientX;
            clientY = event.clientY;
        }
        var offsetX = clientX - this.offsetLeft;
        var offsetY = clientY - this.offsetTop;
        this.events.type = type;
        this.events.clientX = clientX;
        this.events.clientY = clientY;
        this.events.client.set(clientX, clientY);
        this.events.offsetX = offsetX;
        this.events.offsetY = offsetY;
        this.events.offset.set(offsetX, offsetY);
        this.events.rateX = offsetX / this.rendererWidth;
        this.events.rateY = offsetY / this.rendererHeight;
        this.events.rate.set(this.events.rateX, this.events.rateY);
        this.events.mouse.set((offsetX / this.rendererWidth) * 2 - 1, -(offsetY / this.rendererHeight) * 2 + 1);
        this.events.event = event;
        this.eventListener.emit(this.events);
    };
    /**
     * Adds event
     * @param type
     * @param listener
     * @returns
     */
    RendererComponent.prototype.addEvent = function (type, listener) {
        var _this = this;
        if (interface_1.ThreeUtil.isNull(listener)) {
            listener = function (event) {
                _this.setEvents(type, event);
            };
            switch (type) {
                case 'keydown':
                case 'keyup':
                case 'keypress':
                    window.addEventListener(type, listener);
                    break;
                default:
                    this.rendererEle.nativeElement.addEventListener(type, listener);
                    break;
            }
        }
        return listener;
    };
    /**
     * Gets clear color
     * @param [def]
     * @returns clear color
     */
    RendererComponent.prototype.getClearColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.clearColor, def);
    };
    /**
     * Gets clear alpha
     * @param [def]
     * @returns clear alpha
     */
    RendererComponent.prototype.getClearAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clearAlpha, def);
    };
    /**
     * Gets tone mapping
     * @param [def]
     * @returns tone mapping
     */
    RendererComponent.prototype.getToneMapping = function (def) {
        var toneMapping = interface_1.ThreeUtil.getTypeSafe(this.toneMapping, def, '');
        switch (toneMapping.toLowerCase()) {
            case 'lineartonemapping':
            case 'linear':
                return THREE.LinearToneMapping;
            case 'reinhardtonemapping':
            case 'reinhard':
                return THREE.ReinhardToneMapping;
            case 'cineontonemapping':
            case 'cineon':
                return THREE.CineonToneMapping;
            case 'acesfilmictonemapping':
            case 'acesfilmic':
                return THREE.ACESFilmicToneMapping;
            case 'notonemapping':
            case 'no':
            default:
                return THREE.NoToneMapping;
        }
    };
    /**
     * Gets render size
     * @param size
     * @param renderSize
     * @param [def]
     * @returns render size
     */
    RendererComponent.prototype.getRenderSize = function (size, renderSize, def) {
        var baseSize = interface_1.ThreeUtil.getTypeSafe(size, def);
        if (interface_1.ThreeUtil.isNotNull(baseSize)) {
            if (typeof baseSize == 'string') {
                if (baseSize.indexOf('%') > 0) {
                    var _a = baseSize.split('%'), percent = _a[0], extra = _a[1];
                    var viewSize = Math.ceil((renderSize * parseFloat(percent)) / 100);
                    if (extra === '') {
                        return viewSize;
                    }
                    else {
                        return viewSize + parseInt(extra);
                    }
                }
                else {
                    return parseFloat(baseSize);
                }
            }
            else if (baseSize >= 0) {
                return baseSize;
            }
        }
        return renderSize;
    };
    /**
     * Sets size
     * @param width
     * @param height
     */
    RendererComponent.prototype.setSize = function (width, height) {
        var _this = this;
        var rendererWidth = this.getRenderSize(this.width, width);
        var rendererHeight = this.getRenderSize(this.height, height);
        var left = this.getRenderSize(this.x, width);
        var top = this.getRenderSize(this.y, height);
        if (this._lastConfirmHtml !== null) {
            this._lastConfirmHtml.style.width = rendererWidth + 'px';
            this._lastConfirmHtml.style.height = rendererHeight + 'px';
            this._lastConfirmHtml.style.left = left + 'px';
            this._lastConfirmHtml.style.top = top + 'px';
        }
        if (this.canvasEle !== null) {
            this.canvasEle.nativeElement.style.width = rendererWidth + 'px';
            this.canvasEle.nativeElement.style.height = rendererHeight + 'px';
            this.canvasEle.nativeElement.style.left = left + 'px';
            this.canvasEle.nativeElement.style.top = top + 'px';
        }
        this.rendererWidth = rendererWidth;
        this.rendererHeight = rendererHeight;
        if (this.renderer !== null) {
            this.events.width = this.rendererWidth;
            this.events.height = this.rendererHeight;
            this.offsetTop = 0;
            this.offsetLeft = 0;
            var offsetParent = this.rendererEle.nativeElement;
            while (offsetParent) {
                this.offsetLeft += offsetParent.offsetLeft;
                this.offsetTop += offsetParent.offsetTop;
                offsetParent = offsetParent.offsetParent;
            }
            this.offsetRight = this.offsetLeft + this.rendererWidth;
            this.offsetBottom = this.offsetTop + this.rendererHeight;
            this.events.size.set(this.rendererWidth, this.rendererHeight);
            this.renderer.setSize(this.rendererWidth, this.rendererHeight);
            this.composerList.forEach(function (composer) {
                composer.setComposerSize(_this.rendererWidth, _this.rendererHeight);
            });
            this.cameraList.forEach(function (camera) {
                camera.setCameraSize(_this.rendererWidth, _this.rendererHeight);
            });
            this.viewerList.forEach(function (viewer) {
                viewer.setViewerSize(_this.rendererWidth, _this.rendererHeight);
            });
            if (this.cssRenderer !== null) {
                this.cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
            }
            var rendererSize_1 = this.getSize();
            this.canvas2dList.forEach(function (canvas2d) {
                canvas2d.setSize(rendererSize_1);
            });
            this._sizeSubject.next(rendererSize_1);
        }
    };
    /**
     * Sizes subscribe
     * @returns subscribe
     */
    RendererComponent.prototype.sizeSubscribe = function () {
        return this._sizeSubject.asObservable();
    };
    /**
     * Updates subscribe
     * @returns subscribe
     */
    RendererComponent.prototype.updateSubscribe = function () {
        return this._updateSubject.asObservable();
    };
    /**
     * Users gesture subscribe
     * @param [ele]
     * @returns gesture subscribe
     */
    RendererComponent.prototype.userGestureSubscribe = function (ele) {
        var _this = this;
        var observable = this._userGestureSubject.asObservable();
        if (!this._userGestureShown) {
            this._userGestureShown = true;
            window.setTimeout(function () {
                _this.drawGesture(ele);
            }, 100);
        }
        return observable;
    };
    /**
     * Draws gesture
     * @param [ele]
     */
    RendererComponent.prototype.drawGesture = function (ele) {
        var _this = this;
        if (this._lastConfirmHtml !== null) {
            this._lastConfirmHtml.parentNode.removeChild(this._lastConfirmHtml);
            this._lastConfirmHtml = null;
        }
        this._userGestureShown = true;
        var confirm = document.createElement('div');
        confirm.className = 'message-info';
        var button = document.createElement('button');
        button.className = 'message-button';
        button.innerHTML = '<b>Re</b>try';
        button.addEventListener('click', function () {
            confirm.parentNode.removeChild(confirm);
            _this._lastConfirmHtml = null;
            _this._userGestureShown = false;
            _this._userGestureSubject.next(true);
        });
        if (interface_1.ThreeUtil.isNotNull(ele)) {
            var message = document.createElement('div');
            message.className = 'message';
            message.append(ele);
            confirm.append(message);
        }
        confirm.append(button);
        this.canvasEle.nativeElement.appendChild(confirm);
        this._lastConfirmHtml = confirm;
        this.resizeRender();
    };
    /**
     * Gets size
     * @returns size
     */
    RendererComponent.prototype.getSize = function () {
        return new THREE.Vector2(this.rendererWidth, this.rendererHeight);
    };
    /**
     * Applys changes
     * @param changes
     * @returns
     */
    RendererComponent.prototype.applyChanges = function (changes) {
        var _this = this;
        if (this.renderer !== null) {
            if (interface_1.ThreeUtil.isIndexOf(changes, 'clearinit')) {
                this.getRenderer();
                return;
            }
            if (!interface_1.ThreeUtil.isOnlyIndexOf(changes, [
                'useevent',
                'shared',
                'width',
                'height',
                'x',
                'y',
                'resize',
                'scene',
                'camera',
                'control',
                'composer',
                'viewer',
                'listener',
                'audio',
                'controller',
                'lookat',
                'control',
                'localclippingenabled',
                'globalclippingenabled',
                'clearcolor',
                'clearalpha',
                'tonemapping',
                'tonemappingexposure',
                'shadowmapenabled',
                'physicallycorrectlights',
                'shadowmaptype',
                'autoclear',
                'autoclearcolor',
                'outputencoding',
                'clippingplanes',
                'canvas2d',
                'controltype',
                'controloptions',
                'guiparams',
                'guicontrol',
            ], this.OBJECT_ATTR)) {
                this.needUpdate = true;
                return;
            }
            if (interface_1.ThreeUtil.isIndexOf(changes, 'init')) {
                changes = interface_1.ThreeUtil.pushUniq(changes, ['useevent', 'shared', 'resize', 'scene', 'camera', 'control', 'composer', 'viewer', 'listener', 'audio', 'controller', 'lookat', 'control', 'clippingPlanes', 'canvas2d', 'statsmode', 'guicontrol', 'webglrenderer']);
            }
            if (interface_1.ThreeUtil.isIndexOf(changes, ['width', 'height', 'x', 'y'])) {
                changes = interface_1.ThreeUtil.pushUniq(changes, ['resize']);
            }
            this.consoleLog('render', changes, 'error');
            if (interface_1.ThreeUtil.isIndexOf(changes, 'guiparams')) {
                changes = interface_1.ThreeUtil.pushUniq(changes, ['guicontrol']);
            }
            if (interface_1.ThreeUtil.isIndexOf(changes, ['localclippingenabled', 'globalclippingenabled', 'clearcolor', 'clearalpha', 'tonemapping', 'tonemappingexposure', 'shadowmapenabled', 'physicallycorrectlights', 'shadowmaptype', 'autoclear', 'autoclearcolor', 'outputencoding', 'clippingplanes'])) {
                changes = interface_1.ThreeUtil.pushUniq(changes, ['webglrenderer']);
            }
            if (interface_1.ThreeUtil.isIndexOf(changes, ['camera', 'controltype', 'controloptions'])) {
                changes = interface_1.ThreeUtil.pushUniq(changes, ['control']);
            }
            changes.forEach(function (change) {
                switch (change.toLowerCase()) {
                    case 'guicontrol':
                        if (_this.gui !== null) {
                            _this.gui.domElement.parentNode.removeChild(_this.gui.domElement);
                            _this.gui = null;
                        }
                        if (interface_1.ThreeUtil.isNotNull(_this.guiControl) && interface_1.ThreeUtil.isNotNull(_this.guiParams) && _this.guiParams.length > 0) {
                            interface_1.ThreeUtil.setupGui(_this.guiControl, _this.getGui(), _this.guiParams);
                        }
                        break;
                    case 'useevent':
                        var useEvents = interface_1.ThreeUtil.isNotNull(_this.useEvent) ? _this.useEvent.toLowerCase().split(',') : [];
                        if (useEvents.indexOf('change') > -1) {
                            _this._eventListener.change = _this.addEvent('change', _this._eventListener.change);
                        }
                        else {
                            _this._eventListener.change = _this.removeEvent('change', _this._eventListener.change);
                        }
                        if (useEvents.indexOf('pointerdown') > -1 || useEvents.indexOf('mousedown') > -1 || useEvents.indexOf('down') > -1) {
                            _this._eventListener.pointerdown = _this.addEvent('pointerdown', _this._eventListener.pointerdown);
                        }
                        else {
                            _this._eventListener.pointerdown = _this.removeEvent('pointerdown', _this._eventListener.pointerdown);
                        }
                        if (useEvents.indexOf('pointerup') > -1 || useEvents.indexOf('mouseup') > -1 || useEvents.indexOf('up') > -1 || useEvents.indexOf('click') > -1) {
                            _this._eventListener.pointerup = _this.addEvent('pointerup', _this._eventListener.pointerup);
                        }
                        else {
                            _this._eventListener.pointerup = _this.removeEvent('pointerup', _this._eventListener.pointerup);
                        }
                        if (useEvents.indexOf('pointermove') > -1 || useEvents.indexOf('mousemove') > -1 || useEvents.indexOf('move') > -1) {
                            _this._eventListener.pointermove = _this.addEvent('pointermove', _this._eventListener.pointermove);
                        }
                        else {
                            _this._eventListener.pointermove = _this.removeEvent('pointermove', _this._eventListener.pointermove);
                        }
                        if (useEvents.indexOf('keydown') > -1) {
                            _this._eventListener.keydown = _this.addEvent('keydown', _this._eventListener.keydown);
                        }
                        else {
                            _this._eventListener.keydown = _this.removeEvent('keydown', _this._eventListener.keydown);
                        }
                        if (useEvents.indexOf('keyup') > -1) {
                            _this._eventListener.keyup = _this.addEvent('keyup', _this._eventListener.keyup);
                        }
                        else {
                            _this._eventListener.keyup = _this.removeEvent('keyup', _this._eventListener.keyup);
                        }
                        if (useEvents.indexOf('keypress') > -1) {
                            _this._eventListener.keypress = _this.addEvent('keypress', _this._eventListener.keypress);
                        }
                        else {
                            _this._eventListener.keypress = _this.removeEvent('keypress', _this._eventListener.keypress);
                        }
                        if (useEvents.indexOf('click') > -1) {
                            _this._eventListener.click = _this.addEvent('click', _this._eventListener.click);
                        }
                        else {
                            _this._eventListener.click = _this.removeEvent('click', _this._eventListener.click);
                        }
                        if (useEvents.indexOf('mouseover') > -1) {
                            _this._eventListener.mouseover = _this.addEvent('mouseover', _this._eventListener.mouseover);
                        }
                        else {
                            _this._eventListener.mouseover = _this.removeEvent('mouseover', _this._eventListener.mouseover);
                        }
                        if (useEvents.indexOf('mouseout') > -1) {
                            _this._eventListener.mouseout = _this.addEvent('mouseout', _this._eventListener.mouseout);
                        }
                        else {
                            _this._eventListener.mouseout = _this.removeEvent('mouseout', _this._eventListener.mouseout);
                        }
                        break;
                    case 'resize':
                        _this.resizeRender();
                        break;
                    case 'webglrenderer':
                        if (_this.renderer instanceof THREE.WebGLRenderer) {
                            if (interface_1.ThreeUtil.isNotNull(_this.clearColor)) {
                                _this.renderer.setClearColor(_this.getClearColor());
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.clearAlpha)) {
                                _this.renderer.setClearAlpha(_this.getClearAlpha());
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.toneMapping)) {
                                _this.renderer.toneMapping = _this.getToneMapping();
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.toneMappingExposure)) {
                                _this.renderer.toneMappingExposure = _this.toneMappingExposure;
                            }
                            _this.renderer.setPixelRatio(window.devicePixelRatio);
                            if (interface_1.ThreeUtil.isNotNull(_this.shadowMapEnabled)) {
                                _this.renderer.shadowMap.enabled = _this.shadowMapEnabled;
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.physicallyCorrectLights)) {
                                _this.renderer.physicallyCorrectLights = _this.physicallyCorrectLights;
                            }
                            if (_this.renderer.shadowMap.enabled && interface_1.ThreeUtil.isNotNull(_this.shadowMapType)) {
                                _this.renderer.shadowMap.type = _this.getShadowMapType('pcfsoft');
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.autoClear)) {
                                _this.renderer.autoClear = _this.autoClear;
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.autoClearColor)) {
                                _this.renderer.autoClearColor = _this.autoClearColor;
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.outputEncoding)) {
                                _this.renderer.outputEncoding = interface_1.ThreeUtil.getTextureEncodingSafe(_this.outputEncoding, 'linear');
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.localClippingEnabled)) {
                                _this.renderer.localClippingEnabled = _this.localClippingEnabled;
                            }
                            if (interface_1.ThreeUtil.isNotNull(_this.globalClippingEnabled)) {
                                _this.renderer.clippingPlanes = !_this.globalClippingEnabled ? [] : _this.getClippingPlanes();
                            }
                        }
                        break;
                    case 'statsmode':
                        if (_this.statsMode >= 0) {
                            if (_this.stats === null) {
                                _this.getStats();
                            }
                            _this.stats.showPanel(_this.statsMode);
                        }
                        else {
                            if (_this.stats !== null) {
                                _this.debugEle.nativeElement.removeChild(_this.stats.dom);
                            }
                            _this.stats = null;
                        }
                        break;
                    case 'control':
                        _this.controls = _this.getControls(_this.cameraList, _this.sceneList, _this.canvasEle.nativeElement);
                        break;
                    case 'scene':
                        _this.unSubscribeReferList('sceneList');
                        if (interface_1.ThreeUtil.isNotNull(_this.sceneList)) {
                            _this.sceneList.forEach(function (scene) {
                                scene.setRenderer(_this);
                            });
                            _this.subscribeListQuery(_this.sceneList, 'sceneList', 'scene');
                        }
                        break;
                    case 'camera':
                        _this.unSubscribeReferList('cameraList');
                        if (interface_1.ThreeUtil.isNotNull(_this.cameraList)) {
                            _this.cameraList.forEach(function (camera) {
                                camera.setRenderer(_this.renderer, _this.cssRenderer, _this.sceneList);
                            });
                            _this.subscribeListQuery(_this.cameraList, 'cameraList', 'camera');
                        }
                        break;
                    case 'composer':
                        _this.unSubscribeReferList('composerList');
                        if (interface_1.ThreeUtil.isNotNull(_this.composerList)) {
                            if (_this.composerList.length > 0 && _this.cameraList.length > 0 && _this.sceneList.length > 0 && _this.renderer instanceof THREE.WebGLRenderer) {
                                var camera_1 = _this.cameraList.first.getCamera();
                                var scene_1 = _this.sceneList.first.getScene();
                                _this.composerList.forEach(function (composer) {
                                    composer.setRenderer(_this.renderer, camera_1, scene_1);
                                });
                            }
                            _this.subscribeListQuery(_this.composerList, 'composerList', 'composer');
                        }
                        break;
                    case 'viewer':
                        _this.unSubscribeReferList('viewerList');
                        if (interface_1.ThreeUtil.isNotNull(_this.viewerList)) {
                            _this.viewerList.forEach(function (viewer) {
                                viewer.setRenderer(_this.renderer);
                            });
                            _this.subscribeListQuery(_this.viewerList, 'viewerList', 'viewer');
                        }
                        break;
                    case 'listener':
                        _this.unSubscribeReferList('listenerList');
                        if (interface_1.ThreeUtil.isNotNull(_this.listenerList)) {
                            _this.listenerList.forEach(function (listener) {
                                _this.renderlistener = listener.getListener();
                            });
                            _this.subscribeListQuery(_this.listenerList, 'listenerList', 'listener');
                        }
                        break;
                    case 'audio':
                        _this.unSubscribeReferList('audioList');
                        if (interface_1.ThreeUtil.isNotNull(_this.audioList)) {
                            _this.audioList.forEach(function (audio) {
                                audio.setListener(_this.renderlistener, _this);
                            });
                            _this.subscribeListQuery(_this.audioList, 'audioList', 'audio');
                        }
                        break;
                    case 'controller':
                        _this.unSubscribeReferList('controllerList');
                        if (interface_1.ThreeUtil.isNotNull(_this.controllerList)) {
                            _this.controllerList.forEach(function (controller) {
                                controller.setRenderer(_this.renderer, _this.sceneList, _this.cameraList, _this.canvas2dList);
                            });
                            _this.subscribeListQuery(_this.controllerList, 'controllerList', 'controller');
                        }
                        break;
                    case 'canvas2d':
                        _this.unSubscribeReferList('canvas2dList');
                        if (interface_1.ThreeUtil.isNotNull(_this.canvas2dList)) {
                            _this.canvas2dList.forEach(function (canvas2d) {
                                canvas2d.setParentNode(_this.canvasEle.nativeElement);
                            });
                            _this.subscribeListQuery(_this.canvas2dList, 'canvas2dList', 'canvas2d');
                        }
                    case 'shared':
                        _this.unSubscribeReferList('sharedList');
                        if (interface_1.ThreeUtil.isNotNull(_this.sharedList)) {
                            _this.sharedList.forEach(function (shared) {
                                shared.getShared();
                            });
                            _this.subscribeListQuery(_this.sharedList, 'sharedList', 'shared');
                        }
                        break;
                }
            });
            _super.prototype.applyChanges.call(this, changes);
        }
    };
    /**
     * Gets controls
     * @param cameras
     * @param scenes
     * @param domElement
     * @returns controls
     */
    RendererComponent.prototype.getControls = function (cameras, scenes, domElement) {
        var cameraComp = null;
        var controlType = this.controlType.toLowerCase();
        if (this.renderControl !== null) {
            this.renderControl.ngOnDestroy();
            this.renderControl = null;
        }
        if (cameras !== null && cameras.length > 0) {
            var cameraCompFounded_1 = false;
            cameraComp = cameras.find(function (camera) {
                if (camera.controlType.toLowerCase() !== 'none') {
                    controlType = camera.controlType;
                    cameraCompFounded_1 = true;
                    return true;
                }
                else if (!cameraCompFounded_1) {
                    cameraCompFounded_1 = true;
                    return true;
                }
                return false;
            });
        }
        var controls = [];
        if (cameraComp !== null && cameraComp !== undefined) {
            var camera_2 = cameraComp.getCamera();
            switch (controlType.toLowerCase()) {
                case 'orbit':
                case 'fly':
                case 'firstperson':
                case 'transform':
                case 'trackball':
                case 'plane':
                    var control = this.initLocalComponent('control', new control_component_1.ControlComponent());
                    var controlOptions = this.controlOptions || {};
                    controlOptions.lookatList = this.lookatList;
                    control.updateInputParams(controlOptions, true, {}, controlType);
                    control.setCameraDomElement(camera_2, domElement, scenes);
                    controls.push(control);
                    this.renderControl = control;
            }
            if (this.controlList !== null && this.controlList !== undefined) {
                this.controlList.forEach(function (control) {
                    control.setCameraDomElement(camera_2, domElement, scenes);
                    controls.push(control);
                });
            }
        }
        return controls;
    };
    /**
     * Gets stats
     * @returns stats
     */
    RendererComponent.prototype.getStats = function () {
        if (this.stats === null) {
            this.stats = interface_1.ThreeUtil.getStats({
                position: 'absolute',
                left: '0px',
                top: '0px'
            });
            this.debugEle.nativeElement.appendChild(this.stats.dom);
        }
        return this.stats;
    };
    /**
     * Gets gui
     * @returns gui
     */
    RendererComponent.prototype.getGui = function () {
        if (this.gui === null) {
            this.gui = new interface_1.ThreeGui({
                position: 'absolute',
                marginRight: '0px',
                right: '0px',
                top: '0px'
            });
            this.debugEle.nativeElement.appendChild(this.gui.domElement);
        }
        return this.gui;
    };
    /**
     * Gets Object
     * @returns Object
     */
    RendererComponent.prototype.getObject = function () {
        return this.getRenderer();
    };
    /**
     * Gets Renderer
     * @returns Renderer
     */
    RendererComponent.prototype.getRenderer = function () {
        var _this = this;
        if (this.renderer === null || this._needUpdate) {
            console.clear();
            this.needUpdate = false;
            this.dispose();
            if (this.renderer !== null) {
                this.renderer = null;
            }
            if (this.cssRenderer !== null) {
                this.cssRenderer = null;
            }
            GSAP.gsap.ticker.fps(60);
            if (this._renderCaller !== null) {
                GSAP.gsap.ticker.remove(this._renderCaller);
            }
            this._renderCaller = function () {
                _this.render();
            };
            switch (this.cssType.toLowerCase()) {
                case '3d':
                case 'css3d':
                    this.cssRenderer = new CSS3DRenderer_1.CSS3DRenderer();
                    break;
                case '2d':
                case 'css2d':
                    this.cssRenderer = new CSS2DRenderer_1.CSS2DRenderer();
                    break;
                default:
                    this.cssRenderer = null;
                    break;
            }
            switch (this.type.toLowerCase()) {
                case 'svg':
                case 'svgrenderer':
                    var svgRenderer = new SVGRenderer_1.SVGRenderer();
                    if (interface_1.ThreeUtil.isNotNull(this.quality)) {
                        svgRenderer.setQuality(interface_1.ThreeUtil.getTypeSafe(this.quality, 'high').toLowerCase());
                    }
                    this.renderer = svgRenderer;
                    break;
                case 'gl2':
                case 'webgl2':
                case 'webgl2renderer':
                case 'gl':
                case 'webgl':
                case 'webglrenderer':
                default:
                    var webGLRenderer = new THREE.WebGLRenderer({
                        alpha: false,
                        antialias: this.antialias,
                        logarithmicDepthBuffer: this.logarithmicDepthBuffer,
                        preserveDrawingBuffer: this.preserveDrawingBuffer
                    });
                    // webGLRenderer.xr.enabled = true;
                    this.renderer = webGLRenderer;
                    break;
            }
            if (this.cssRenderer !== null) {
                this.cssRenderer.domElement.style.position = 'absolute';
                this.cssRenderer.domElement.style.top = '0px';
                this.cssRenderer.domElement.style.left = '0px';
                this.cssRenderer.domElement.style.pointerEvents = 'none';
                this.canvasEle.nativeElement.appendChild(this.cssRenderer.domElement);
            }
            this.renderer.domElement.style.position = 'relative';
            this.canvasEle.nativeElement.appendChild(this.renderer.domElement);
            interface_1.ThreeUtil.setRenderer(this);
            this.renderer['userData'] = {};
            _super.prototype.setObject.call(this, this.renderer);
            this.resizeRender();
            this._renderCaller();
            // GSAP.gsap.ticker.add(this._renderCaller);
        }
        return this.renderer;
    };
    /**
     * Gets render info
     * @param timer
     * @returns render info
     */
    RendererComponent.prototype.getRenderInfo = function (timer) {
        var _this = this;
        if (this._cameras === null) {
            this._cameras = [];
            this.cameraList.forEach(function (camera) {
                _this._cameras.push(camera.getObject3d());
            });
        }
        if (this._scenes === null) {
            this._scenes = [];
            this.sceneList.forEach(function (scene) {
                _this._scenes.push(scene.getScene());
            });
        }
        return {
            timer: timer,
            innerWidth: this.rendererWidth,
            innerHeight: this.rendererHeight,
            renderer: this.renderer,
            cssRenderer: this.cssRenderer,
            cameras: this._cameras,
            scenes: this._scenes
        };
    };
    /**
     * Renders once
     * @returns
     */
    RendererComponent.prototype._renderOnce = function () {
        var _this = this;
        if (this.renderer === null) {
            return;
        }
        if (this.stats !== null) {
            this.stats.begin();
        }
        var renderTimer = this.clock.getTimer(this.renderer, this.events);
        this.events.direction.lerp(this.events.keyInfo.xy, renderTimer.delta / 3);
        this.onRender.emit(renderTimer);
        this.controllerList.forEach(function (controller) {
            controller.update(renderTimer);
        });
        this.sceneList.forEach(function (scene) {
            scene.update(renderTimer);
        });
        interface_1.ThreeUtil.render(renderTimer);
        if (this.controls !== null) {
            this.controls.forEach(function (control) {
                control.render(renderTimer);
            });
        }
        if (interface_1.ThreeUtil.isNull(this.beforeRender) || !this.beforeRender(this.getRenderInfo(renderTimer))) {
            // if (this.composerList.length > 0 && this.renderer instanceof THREE.WebGLRenderer && this.panSpeed ) {
            this._updateSubject.next(renderTimer);
            if (this.composerList.length > 0 && this.renderer instanceof THREE.WebGLRenderer) {
                this.composerList.forEach(function (composer) {
                    composer.render(_this.renderer, renderTimer);
                });
            }
            else if (this.cameraList && this.cameraList.length > 0) {
                this.cameraList.forEach(function (camera) {
                    camera.render(_this.renderer, _this.cssRenderer, _this.scene || _this.sceneList, renderTimer);
                });
            }
            else if (interface_1.ThreeUtil.isNotNull(this.camera)) {
                this.camera.render(this.renderer, this.cssRenderer, this.scene || this.sceneList, renderTimer);
            }
            this.viewerList.forEach(function (viewer) {
                viewer.render(_this.renderer, _this.scene || _this.sceneList, _this.camera || _this.cameraList, renderTimer);
            });
        }
        if (this.stats !== null) {
            this.stats.end();
        }
    };
    /**
     * Renders renderer component
     * @returns
     */
    RendererComponent.prototype.render = function () {
        if (this.renderer === null) {
            return;
        }
        if (!this._isPaused) {
            this._renderOnce();
        }
        requestAnimationFrame(this._renderCaller);
    };
    /**
     * Hosts listener
     */
    RendererComponent.prototype.resizeRender = function () {
        if (typeof this.width === 'string' || typeof this.height === 'string' || this.width <= 0 || this.height <= 0) {
            if (this.sizeType === 'auto') {
                this.setSize(this.rendererEle.nativeElement.clientWidth, this.rendererEle.nativeElement.clientHeight);
            }
            else {
                this.setSize(window.innerWidth, window.innerHeight);
            }
        }
        else {
            this.setSize(this.width, this.height);
        }
    };
    /**
     * Gets canvas json
     * @param callback
     * @param [options]
     */
    RendererComponent.prototype.getCanvasJson = function (callback, options) {
        var _this = this;
        if (this.renderer !== null && this.renderer.domElement !== null && interface_1.ThreeUtil.isNotNull(this.renderer.domElement.toDataURL)) {
            this._isPaused = true;
            this._renderOnce();
            options = options || {};
            var imageType_1 = interface_1.ThreeUtil.getTypeSafe(options.type, 'png');
            var contentType = 'image/png';
            switch (imageType_1.toLowerCase()) {
                case 'jpg':
                case 'jpeg':
                    contentType = 'image/jpeg';
                    break;
                case 'png':
                default:
                    imageType_1 = 'png';
                    contentType = 'image/png';
                    break;
            }
            var imageName = interface_1.ThreeUtil.getTypeSafe(options.name, 'auto');
            if (imageName == '' || imageName == 'auto') {
                imageName = window.location.hash.substr(window.location.hash.lastIndexOf('/') + 1);
            }
            var resultJson_1 = {
                content: null,
                contentType: contentType,
                size: 0,
                name: imageName + '.' + imageType_1
            };
            if (interface_1.ThreeUtil.isNotNull(options.width) && interface_1.ThreeUtil.isNotNull(options.height) && options.width > 0 && options.height > 0) {
                var canvas_1 = document.createElement('canvas');
                canvas_1.width = options.width;
                canvas_1.height = options.height;
                var context_1 = canvas_1.getContext('2d', {
                    alpha: true
                });
                var canvasImage_1 = document.createElement('img');
                canvasImage_1.src = this.renderer.domElement.toDataURL('png');
                canvasImage_1.addEventListener('load', function () {
                    var sx = 0;
                    var sy = 0;
                    var sw = 0;
                    var sh = 0;
                    var canvasImageRate = canvasImage_1.naturalWidth / canvasImage_1.naturalHeight;
                    var thumbRate = options.width / options.height;
                    if (canvasImageRate > thumbRate) {
                        sw = canvasImage_1.naturalHeight * thumbRate;
                        sh = canvasImage_1.naturalHeight;
                        sx = (canvasImage_1.naturalWidth - sw) / 2;
                    }
                    else {
                        sh = canvasImage_1.naturalWidth / thumbRate;
                        sw = canvasImage_1.naturalWidth;
                        sy = (canvasImage_1.naturalHeight - sh) / 2;
                    }
                    var dx = 0;
                    var dy = 0;
                    var dw = options.width;
                    var dh = options.height;
                    context_1.drawImage(canvasImage_1, sx, sy, sw, sh, dx, dy, dw, dh);
                    resultJson_1.content = canvas_1.toDataURL(imageType_1);
                    if (interface_1.ThreeUtil.isNotNull(options.name)) {
                        _this.getDownloadFile(resultJson_1);
                    }
                    else {
                        var blob = _this.dataURLtoBlob(resultJson_1.content);
                        resultJson_1.size = blob.size;
                    }
                    _this._isPaused = false;
                    callback(resultJson_1);
                });
                canvasImage_1.addEventListener('error', function () {
                    _this._isPaused = false;
                });
            }
            else {
                resultJson_1.content = this.renderer.domElement.toDataURL(imageType_1);
                if (interface_1.ThreeUtil.isNotNull(options.name)) {
                    this.getDownloadFile(resultJson_1);
                }
                else {
                    var blob = this.dataURLtoBlob(resultJson_1.content);
                    resultJson_1.size = blob.size;
                }
                this._isPaused = false;
                callback(resultJson_1);
            }
        }
    };
    /**
     * Gets download file
     * @param result
     */
    RendererComponent.prototype.getDownloadFile = function (result) {
        if (result && result.content !== null && result.content !== '') {
            var blob = this.dataURLtoBlob(result.content);
            result.size = blob.size;
            var tempUrl = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            link.setAttribute('download', result.name);
            link.setAttribute('href', tempUrl);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    };
    /**
     * 서버로 부터 파일 다운 받기 - Blob
     *
     * @param dataUrl {{ string }}
     *
     * @returns {{Blob}}
     */
    RendererComponent.prototype.dataURLtoBlob = function (dataUrl) {
        var arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };
    /**
     * Changes auto size
     */
    RendererComponent.prototype.changeAutoSize = function () { };
    /**
     * Resizes canvas
     * @param width
     * @param height
     */
    RendererComponent.prototype.resizeCanvas = function (width, height) {
        if (width <= 0 || height <= 0) {
            this.width = 0;
            this.height = 0;
            this.sizeType = 'auto';
            this.resizeRender();
        }
        else {
            this.width = width;
            this.height = height;
            this.setSize(this.width, this.height);
        }
    };
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "cssType");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "controlType");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "controlOptions");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "shadowMapEnabled");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "physicallyCorrectLights");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "shadowMapType");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "clearColor");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "clearAlpha");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "toneMapping");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "toneMappingExposure");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "localClippingEnabled");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "globalClippingEnabled");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "antialias");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "quality");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "sizeType");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "statsMode");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "autoClear");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "autoClearColor");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "outputEncoding");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "guiControl");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "guiParams");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "logarithmicDepthBuffer");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "preserveDrawingBuffer");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "useEvent");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "camera");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "scene");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "beforeRender");
    __decorate([
        core_1.Output()
    ], RendererComponent.prototype, "eventListener");
    __decorate([
        core_1.Output()
    ], RendererComponent.prototype, "onRender");
    __decorate([
        core_1.ContentChildren(scene_component_1.SceneComponent, { descendants: false })
    ], RendererComponent.prototype, "sceneList");
    __decorate([
        core_1.ContentChildren(camera_component_1.CameraComponent, { descendants: true })
    ], RendererComponent.prototype, "cameraList");
    __decorate([
        core_1.ContentChildren(composer_component_1.ComposerComponent, { descendants: true })
    ], RendererComponent.prototype, "composerList");
    __decorate([
        core_1.ContentChildren(viewer_component_1.ViewerComponent, { descendants: true })
    ], RendererComponent.prototype, "viewerList");
    __decorate([
        core_1.ContentChildren(listener_component_1.ListenerComponent, { descendants: true })
    ], RendererComponent.prototype, "listenerList");
    __decorate([
        core_1.ContentChildren(audio_component_1.AudioComponent, { descendants: true })
    ], RendererComponent.prototype, "audioList");
    __decorate([
        core_1.ContentChildren(controller_component_1.ControllerComponent, { descendants: true })
    ], RendererComponent.prototype, "controllerList");
    __decorate([
        core_1.ContentChildren(lookat_component_1.LookatComponent, { descendants: false })
    ], RendererComponent.prototype, "lookatList");
    __decorate([
        core_1.ContentChildren(control_component_1.ControlComponent, { descendants: false })
    ], RendererComponent.prototype, "controlList");
    __decorate([
        core_1.ContentChildren(plane_component_1.PlaneComponent)
    ], RendererComponent.prototype, "clippingPlanesList");
    __decorate([
        core_1.ContentChildren(canvas_component_1.CanvasComponent)
    ], RendererComponent.prototype, "canvas2dList");
    __decorate([
        core_1.ContentChildren(shared_component_1.SharedComponent, { descendants: true })
    ], RendererComponent.prototype, "sharedList");
    __decorate([
        core_1.ViewChild('canvas')
    ], RendererComponent.prototype, "canvasEle");
    __decorate([
        core_1.ViewChild('debug')
    ], RendererComponent.prototype, "debugEle");
    __decorate([
        core_1.ViewChild('renderer')
    ], RendererComponent.prototype, "rendererEle");
    __decorate([
        core_1.HostListener('window:resize')
    ], RendererComponent.prototype, "resizeRender");
    RendererComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-renderer',
            templateUrl: './renderer.component.html',
            styleUrls: ['./renderer.component.scss']
        })
    ], RendererComponent);
    return RendererComponent;
}(subscribe_abstract_1.AbstractSubscribeComponent));
exports.RendererComponent = RendererComponent;
