"use strict";
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
var FirstPersonControls_1 = require("three/examples/jsm/controls/FirstPersonControls");
var FlyControls_1 = require("three/examples/jsm/controls/FlyControls");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var TrackballControls_1 = require("three/examples/jsm/controls/TrackballControls");
var TransformControls_1 = require("three/examples/jsm/controls/TransformControls");
var CSS2DRenderer_1 = require("three/examples/jsm/renderers/CSS2DRenderer");
var CSS3DRenderer_1 = require("three/examples/jsm/renderers/CSS3DRenderer");
var canvas_component_1 = require("../canvas/canvas.component");
var controller_component_1 = require("../controller/controller.component");
var interface_1 = require("../interface");
var plane_component_1 = require("../plane/plane.component");
var audio_component_1 = require("./../audio/audio.component");
var camera_component_1 = require("./../camera/camera.component");
var listener_component_1 = require("./../listener/listener.component");
var scene_component_1 = require("./../scene/scene.component");
var RendererComponent = /** @class */ (function () {
    function RendererComponent() {
        this.type = "webgl";
        this.css3dType = "none";
        this.controlType = "none";
        this.controlAutoRotate = false;
        this.shadowMapEnabled = true;
        this.clearColor = null;
        this.clearAlpha = null;
        this.localClippingEnabled = false;
        this.antialias = false;
        this.width = -1;
        this.height = -1;
        this.statsMode = -1;
        this.guiControl = null;
        this.guiParams = [];
        this.onRender = new core_1.EventEmitter();
        this._sizeSubject = new rxjs_1.Subject();
        this._userGestureSubject = new rxjs_1.Subject();
        this._userGestureShown = false;
        this.renderListner = null;
        this.renderer = null;
        this.cssRenderer = null;
        this.rendererWidth = 100;
        this.rendererHeight = 100;
        this.stats = null;
        this.gui = null;
        this.clock = null;
        this.control = null;
        this._renderCaller = null;
    }
    RendererComponent.prototype.getClippingPlanes = function (def) {
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
    RendererComponent.prototype.ngOnInit = function () {
    };
    RendererComponent.prototype.ngOnChanges = function (changes) {
        if (changes.type && this.renderer) {
            this.canvas.nativeElement.removeChild(this.renderer.domElement);
            this.renderer = null;
            this.renderer = this.getRenderer();
        }
        if (this.renderer !== null) {
            if (changes.width || changes.height) {
                if (this.width > 0 && this.height > 0) {
                    this.setSize(this.width, this.height);
                }
                else {
                    this.setSize(window.innerWidth, window.innerHeight);
                }
            }
            if (changes.statsMode) {
                if (this.statsMode >= 0) {
                    if (this.stats === null) {
                        this.getStats();
                    }
                    this.stats.showPanel(this.statsMode);
                }
                else {
                    if (this.stats != null) {
                        this.debug.nativeElement.removeChild(this.stats.dom);
                    }
                    this.stats = null;
                }
            }
            if (changes.guiControl || changes.guiParams) {
                if (this.gui != null) {
                    this.debug.nativeElement.removeChild(this.gui.domElement);
                    this.gui = null;
                }
                if (this.guiControl != null) {
                    interface_1.ThreeUtil.setupGui(this.guiControl, this.getGui(), this.guiParams);
                }
            }
            if (changes.localClippingEnabled) {
                if (this.renderer instanceof THREE.WebGLRenderer) {
                    this.renderer.localClippingEnabled = this.localClippingEnabled;
                }
            }
        }
    };
    RendererComponent.prototype.getClearColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.clearColor, def);
    };
    RendererComponent.prototype.getClearAlpha = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clearAlpha, def);
    };
    RendererComponent.prototype.setSize = function (width, height) {
        var _this = this;
        if (this.renderer !== null) {
            this.rendererWidth = width;
            this.rendererHeight = height;
            this.renderer.setSize(this.rendererWidth, this.rendererHeight);
            this.cameras.forEach(function (camera) {
                camera.setCameraSize(_this.rendererWidth, _this.rendererHeight);
            });
            if (this.cssRenderer !== null) {
                this.cssRenderer.setSize(this.rendererWidth, this.rendererHeight);
            }
            var rendererSize_1 = this.getSize();
            this.canvas2d.forEach(function (canvas2d) {
                canvas2d.setSize(rendererSize_1);
            });
            this._sizeSubject.next(rendererSize_1);
        }
    };
    RendererComponent.prototype.sizeSubscribe = function () {
        return this._sizeSubject.asObservable();
    };
    RendererComponent.prototype.userGestureSubscribe = function () {
        var _this = this;
        var observable = this._userGestureSubject.asObservable();
        if (!this._userGestureShown) {
            this._userGestureShown = true;
            setTimeout(function () {
                _this.drawGesture();
            }, 100);
        }
        return observable;
    };
    RendererComponent.prototype.drawGesture = function () {
        var _this = this;
        this._userGestureShown = true;
        var confirm = document.createElement('div');
        confirm.style.position = 'absolute';
        confirm.style.left = '0px';
        confirm.style.top = '0px';
        confirm.style.right = '0px';
        confirm.style.bottom = '0px';
        confirm.style.zIndex = '1000';
        confirm.style.backgroundColor = 'rgba(0,0,0,0.7)';
        var button = document.createElement('button');
        button.style.position = 'absolute';
        button.style.left = '50%';
        button.style.top = '50%';
        button.style.right = 'auto';
        button.style.bottom = 'auto';
        button.style.backgroundColor = 'black';
        button.style.color = 'white';
        button.innerHTML = '<b>P</b>lay';
        button.addEventListener('click', function () {
            _this._userGestureSubject.next(true);
            confirm.parentNode.removeChild(confirm);
            _this._userGestureShown = false;
        });
        confirm.append(button);
        this.canvas.nativeElement.appendChild(confirm);
    };
    RendererComponent.prototype.getSize = function () {
        return new THREE.Vector2(this.rendererWidth, this.rendererHeight);
    };
    RendererComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.listner.changes.subscribe(function () {
            _this.synkObject3D(['listner']);
        });
        this.audio.changes.subscribe(function () {
            _this.synkObject3D(['audio']);
        });
        this.canvas2d.changes.subscribe(function () {
            _this.synkObject3D(['canvas2d']);
        });
        this.controller.changes.subscribe(function () {
            _this.synkObject3D(['controller']);
        });
    };
    RendererComponent.prototype.synkObject3D = function (synkTypes) {
        var _this = this;
        if (this.renderer !== null) {
            synkTypes.forEach(function (synkType) {
                switch (synkType) {
                    case 'listner':
                        _this.listner.forEach(function (listner) {
                            _this.renderListner = listner.getListener();
                        });
                        break;
                    case 'audio':
                        _this.audio.forEach(function (audio) {
                            audio.setListener(_this.renderListner, _this);
                        });
                        break;
                    case 'canvas2d':
                        _this.canvas2d.forEach(function (canvas2d) {
                            canvas2d.setParentNode(_this.canvas.nativeElement);
                        });
                        break;
                    case 'controller':
                        _this.controller.forEach(function (controller) {
                            controller.setRenderer(_this.renderer, _this.scenes, _this.cameras, _this.canvas2d);
                        });
                        break;
                }
            });
        }
    };
    RendererComponent.prototype.getControls = function (cameras, domElement) {
        var cameraComp = null;
        var controlType = this.controlType.toLowerCase();
        var controlAutoRotate = this.controlAutoRotate;
        if (cameras !== null && cameras.length > 0) {
            cameraComp = cameras.find(function (camera) {
                if (camera.controlType.toLowerCase() !== 'none') {
                    controlType = camera.controlType;
                    if (camera.controlAutoRotate !== null && camera.controlAutoRotate !== undefined) {
                        controlAutoRotate = camera.controlAutoRotate;
                    }
                    return true;
                }
                else if (controlType !== 'none') {
                    return true;
                }
                return false;
            });
        }
        if (cameraComp !== null && cameraComp !== undefined) {
            var camera = cameraComp.getCamera();
            switch (controlType.toLowerCase()) {
                case "orbit":
                    var controls = new OrbitControls_1.OrbitControls(camera, domElement);
                    controls.autoRotate = controlAutoRotate;
                    return controls;
                case "fly":
                    return new FlyControls_1.FlyControls(camera, domElement);
                case "firstperson":
                    return new FirstPersonControls_1.FirstPersonControls(camera, domElement);
                case "transform":
                    return new TransformControls_1.TransformControls(camera, domElement);
                case "trackball":
                    return new TrackballControls_1.TrackballControls(camera, domElement);
            }
        }
        return null;
    };
    RendererComponent.prototype.getStats = function () {
        if (this.stats === null) {
            this.stats = interface_1.ThreeUtil.getStats({
                position: 'absolute',
                left: '10px',
                top: '25px'
            });
            this.debug.nativeElement.appendChild(this.stats.dom);
        }
        return this.stats;
    };
    RendererComponent.prototype.getGui = function () {
        if (this.gui == null) {
            this.gui = new interface_1.ThreeGui({
                position: 'absolute',
                right: '0px',
                top: '0px'
            });
            this.debug.nativeElement.appendChild(this.gui.domElement);
        }
        return this.gui;
    };
    RendererComponent.prototype.ngOnDestroy = function () {
        this.renderer = null;
    };
    RendererComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        if (this.guiControl != null) {
            interface_1.ThreeUtil.setupGui(this.guiControl, this.getGui(), this.guiParams);
        }
        this.clock = interface_1.ThreeUtil.getClock(true);
        if (this.statsMode >= 0) {
            if (this.stats === null) {
                this.getStats();
            }
            this.stats.showPanel(this.statsMode);
        }
        else {
            this.stats = null;
        }
        this.renderer = this.getRenderer();
        this.cameras.forEach(function (camera) {
            camera.setRenderer(_this.renderer, _this.cssRenderer, _this.scenes);
            camera.setCameraSize(_this.rendererWidth, _this.rendererHeight);
        });
        this.control = this.getControls(this.cameras, this.canvas.nativeElement);
        // this.control = this.getControls(this.cameras, this.renderer);
    };
    RendererComponent.prototype.getRenderer = function () {
        var _this = this;
        if (this.renderer === null) {
            GSAP.gsap.ticker.fps(60);
            if (this._renderCaller !== null) {
                GSAP.gsap.ticker.remove(this._renderCaller);
            }
            this._renderCaller = function () {
                _this.render();
            };
            switch (this.css3dType.toLowerCase()) {
                case 'css3d':
                    this.cssRenderer = new CSS3DRenderer_1.CSS3DRenderer();
                    break;
                case 'css2d':
                    this.cssRenderer = new CSS2DRenderer_1.CSS2DRenderer();
                    break;
                default:
                    this.cssRenderer = null;
                    break;
            }
            switch (this.type.toLowerCase()) {
                default:
                    this.renderer = new THREE.WebGLRenderer({ alpha: this.cssRenderer !== null ? true : false, antialias: this.antialias });
                    break;
            }
            var _a = (this.width > 0 && this.height > 0) ? [this.width, this.height] : [window.innerWidth, window.innerHeight], width = _a[0], height = _a[1];
            this.rendererWidth = width;
            this.rendererHeight = height;
            if (this.renderer instanceof THREE.WebGLRenderer) {
                this.renderer.setClearColor(this.getClearColor(0xEEEEEE));
                this.renderer.setClearAlpha(this.getClearAlpha(1));
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.shadowMap.enabled = this.shadowMapEnabled;
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                // this.renderer.outputEncoding = THREE.sRGBEncoding;
                this.renderer.localClippingEnabled = this.localClippingEnabled;
                this.renderer.clippingPlanes = this.getClippingPlanes([]);
            }
            if (this.cssRenderer !== null) {
                this.cssRenderer.domElement.style.position = 'absolute';
                this.cssRenderer.domElement.style.top = '0px';
                this.cssRenderer.domElement.style.left = '0px';
                this.cssRenderer.domElement.style.pointerEvents = 'none';
                this.canvas.nativeElement.appendChild(this.cssRenderer.domElement);
            }
            this.renderer.domElement.style.position = 'relative';
            this.canvas.nativeElement.appendChild(this.renderer.domElement);
            this.synkObject3D(['listner', 'audio', 'canvas2d', 'controller']);
            this.setSize(width, height);
            interface_1.ThreeUtil.setRenderer(this.renderer);
            // GSAP.gsap.ticker.add(this._renderCaller);
            this._renderCaller();
        }
        return this.renderer;
    };
    RendererComponent.prototype.render = function () {
        var _this = this;
        if (this.renderer === null) {
            return;
        }
        if (this.stats != null) {
            this.stats.begin();
        }
        var renderTimer = this.clock.getTimer();
        this.onRender.emit(renderTimer);
        this.controller.forEach(function (controller) {
            controller.update(renderTimer);
        });
        this.scenes.forEach(function (scene) {
            scene.update(renderTimer);
        });
        interface_1.ThreeUtil.render(renderTimer);
        if (this.control !== null) {
            if (this.control instanceof OrbitControls_1.OrbitControls) {
                this.control.update();
            }
            else if (this.control instanceof FlyControls_1.FlyControls) {
                this.control.update(renderTimer.delta);
            }
            else if (this.control instanceof FirstPersonControls_1.FirstPersonControls) {
                this.control.update(renderTimer.delta);
            }
            else if (this.control instanceof TrackballControls_1.TrackballControls) {
                this.control.update();
            }
        }
        this.cameras.forEach(function (camera) {
            camera.render(_this.renderer, _this.cssRenderer, _this.scenes, renderTimer);
        });
        if (this.stats != null) {
            this.stats.end();
        }
        requestAnimationFrame(this._renderCaller);
    };
    RendererComponent.prototype.resizeRender = function (e) {
        if (this.width <= 0 || this.height <= 0) {
            this.setSize(window.innerWidth, window.innerHeight);
        }
    };
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "css3dType");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "controlType");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "controlAutoRotate");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "shadowMapEnabled");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "clearColor");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "clearAlpha");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "localClippingEnabled");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "antialias");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "statsMode");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "guiControl");
    __decorate([
        core_1.Input()
    ], RendererComponent.prototype, "guiParams");
    __decorate([
        core_1.Output()
    ], RendererComponent.prototype, "onRender");
    __decorate([
        core_1.ContentChildren(scene_component_1.SceneComponent, { descendants: false })
    ], RendererComponent.prototype, "scenes");
    __decorate([
        core_1.ContentChildren(camera_component_1.CameraComponent, { descendants: false })
    ], RendererComponent.prototype, "cameras");
    __decorate([
        core_1.ContentChildren(listener_component_1.ListenerComponent, { descendants: true })
    ], RendererComponent.prototype, "listner");
    __decorate([
        core_1.ContentChildren(audio_component_1.AudioComponent, { descendants: true })
    ], RendererComponent.prototype, "audio");
    __decorate([
        core_1.ContentChildren(controller_component_1.ControllerComponent, { descendants: true })
    ], RendererComponent.prototype, "controller");
    __decorate([
        core_1.ContentChildren(plane_component_1.PlaneComponent)
    ], RendererComponent.prototype, "clippingPlanes");
    __decorate([
        core_1.ContentChildren(canvas_component_1.CanvasComponent)
    ], RendererComponent.prototype, "canvas2d");
    __decorate([
        core_1.ViewChild('canvas')
    ], RendererComponent.prototype, "canvas");
    __decorate([
        core_1.ViewChild('debug')
    ], RendererComponent.prototype, "debug");
    __decorate([
        core_1.HostListener('window:resize')
    ], RendererComponent.prototype, "resizeRender");
    RendererComponent = __decorate([
        core_1.Component({
            selector: 'three-renderer',
            templateUrl: './renderer.component.html',
            styleUrls: ['./renderer.component.scss']
        })
    ], RendererComponent);
    return RendererComponent;
}());
exports.RendererComponent = RendererComponent;
