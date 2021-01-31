"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RendererComponent = void 0;
var audio_component_1 = require("./../audio/audio.component");
var listener_component_1 = require("./../listener/listener.component");
var mixer_component_1 = require("./../mixer/mixer.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var OrbitControls_1 = require("three/examples/jsm/controls/OrbitControls");
var FlyControls_1 = require("three/examples/jsm/controls/FlyControls");
var FirstPersonControls_1 = require("three/examples/jsm/controls/FirstPersonControls");
var TrackballControls_1 = require("three/examples/jsm/controls/TrackballControls");
var TransformControls_1 = require("three/examples/jsm/controls/TransformControls");
var camera_component_1 = require("./../camera/camera.component");
var scene_component_1 = require("./../scene/scene.component");
var interface_1 = require("../interface");
var rxjs_1 = require("rxjs");
var RendererComponent = /** @class */ (function () {
    function RendererComponent() {
        this.type = "webgl";
        this.controlType = "none";
        this.controlAutoRotate = false;
        this.shadowMapEnabled = true;
        this.clearColor = null;
        this.antialias = false;
        this.width = -1;
        this.height = -1;
        this.statsMode = -1;
        this.guiControl = null;
        this.guiParams = [];
        this.onRender = new core_1.EventEmitter();
        this.sizeSubject = new rxjs_1.Subject();
        this.renderListner = null;
        this.renderer = null;
        this.rendererWidth = 100;
        this.rendererHeight = 100;
        this.stats = null;
        this.gui = null;
        this.clock = null;
        this.control = null;
        interface_1.ThreeUtil.setupGui;
    }
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
        }
    };
    RendererComponent.prototype.getClearColor = function (def) {
        if (this.clearColor === null) {
            return def;
        }
        else {
            var clearColor = this.clearColor.toString();
            if (clearColor.startsWith('0x')) {
                return parseInt(clearColor, 16);
            }
            else {
                return this.clearColor;
            }
        }
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
            this.sizeSubject.next(new THREE.Vector2(this.rendererWidth, this.rendererHeight));
        }
    };
    RendererComponent.prototype.sizeSubscribe = function () {
        var _this = this;
        setTimeout(function () {
            _this.sizeSubject.next(new THREE.Vector2(_this.rendererWidth, _this.rendererHeight));
        }, 1);
        return this.sizeSubject.asObservable();
    };
    RendererComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.listner.changes.subscribe(function () {
            _this.synkObject3D(['listner']);
        });
        this.audio.changes.subscribe(function () {
            _this.synkObject3D(['audio']);
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
                            audio.setListener(_this.renderListner);
                        });
                        break;
                }
            });
        }
    };
    RendererComponent.prototype.getControls = function (cameras, renderer) {
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
                    var controls = new OrbitControls_1.OrbitControls(camera, renderer.domElement);
                    controls.autoRotate = controlAutoRotate;
                    return controls;
                case "fly":
                    return new FlyControls_1.FlyControls(camera, renderer.domElement);
                case "firstperson":
                    return new FirstPersonControls_1.FirstPersonControls(camera, renderer.domElement);
                case "transform":
                    return new TransformControls_1.TransformControls(camera, renderer.domElement);
                case "trackball":
                    return new TrackballControls_1.TrackballControls(camera, renderer.domElement);
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
            camera.setRenderer(_this.renderer, _this.scenes);
            camera.setCameraSize(_this.rendererWidth, _this.rendererHeight);
        });
        this.control = this.getControls(this.cameras, this.renderer);
        this.synkObject3D(['listner', 'audio']);
        this.render();
    };
    RendererComponent.prototype.getRenderer = function () {
        if (this.renderer === null) {
            switch (this.type.toLowerCase()) {
                case 'webgl':
                default:
                    this.renderer = new THREE.WebGLRenderer({ antialias: this.antialias });
                    break;
            }
            var _a = (this.width > 0 && this.height > 0) ? [this.width, this.height] : [window.innerWidth, window.innerHeight], width = _a[0], height = _a[1];
            this.rendererWidth = width;
            this.rendererHeight = height;
            this.renderer.setSize(width, height);
            if (this.renderer instanceof THREE.WebGLRenderer) {
                this.renderer.setClearColor(new THREE.Color(this.getClearColor(0xEEEEEE)));
                this.renderer.setPixelRatio(window.devicePixelRatio);
                this.renderer.shadowMap.enabled = this.shadowMapEnabled;
                this.renderer.shadowMap.enabled = true;
                this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
                this.renderer.outputEncoding = THREE.sRGBEncoding;
            }
            this.canvas.nativeElement.appendChild(this.renderer.domElement);
            interface_1.ThreeUtil.setRenderer(this.renderer);
        }
        return this.renderer;
    };
    RendererComponent.prototype.render = function () {
        var _this = this;
        if (this.stats != null) {
            this.stats.begin();
        }
        var renderTimer = this.clock.getTimer();
        this.onRender.emit(renderTimer);
        this.mixer.forEach(function (mixer) {
            mixer.update(renderTimer);
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
            camera.render(_this.renderer, _this.scenes, renderTimer);
        });
        if (this.stats != null) {
            this.stats.end();
        }
        requestAnimationFrame(function () { _this.render(); });
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
        core_1.ContentChildren(mixer_component_1.MixerComponent, { descendants: true })
    ], RendererComponent.prototype, "mixer");
    __decorate([
        core_1.ContentChildren(listener_component_1.ListenerComponent, { descendants: true })
    ], RendererComponent.prototype, "listner");
    __decorate([
        core_1.ContentChildren(audio_component_1.AudioComponent, { descendants: true })
    ], RendererComponent.prototype, "audio");
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
