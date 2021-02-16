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
exports.CameraComponent = void 0;
var mixer_component_1 = require("./../mixer/mixer.component");
var audio_component_1 = require("./../audio/audio.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var EffectComposer_1 = require("three/examples/jsm/postprocessing/EffectComposer");
var pass_component_1 = require("../pass/pass.component");
var interface_1 = require("./../interface");
var composer_component_1 = require("../composer/composer.component");
var listener_component_1 = require("../listener/listener.component");
var object3d_abstract_1 = require("../object3d.abstract");
var CameraComponent = /** @class */ (function (_super) {
    __extends(CameraComponent, _super);
    function CameraComponent(localStorageService) {
        var _this = _super.call(this) || this;
        _this.localStorageService = localStorageService;
        _this.type = 'perspective';
        _this.name = null;
        _this.fov = 45;
        _this.near = null;
        _this.far = null;
        _this.left = -0.5;
        _this.right = 0.5;
        _this.top = 0.5;
        _this.bottom = -0.5;
        _this.autoClear = null;
        _this.controlType = 'none';
        _this.controlAutoRotate = null;
        _this.scene = null;
        _this.scenes = null;
        _this.storageName = null;
        _this.camera = null;
        _this.clips = null;
        _this.renderer = null;
        _this.cssRenderer = null;
        _this.effectComposer = null;
        _this.cameraWidth = 0;
        _this.cameraHeight = 0;
        return _this;
    }
    CameraComponent.prototype.ngOnInit = function () { };
    CameraComponent.prototype.ngOnChanges = function (changes) {
        if (changes.type) {
            this.camera = null;
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    CameraComponent.prototype.getRenderer = function () {
        return this.renderer;
    };
    CameraComponent.prototype.setRenderer = function (renderer, cssRenderer, rendererScenes) {
        var _this = this;
        if (this.cssRenderer !== cssRenderer) {
            this.cssRenderer = cssRenderer;
        }
        if (this.renderer !== renderer) {
            this.renderer = renderer;
            this.rendererScenes = rendererScenes;
            this.effectComposer = this.getEffectComposer();
            if (this.composer !== null && this.composer.length > 0) {
                this.composer.forEach(function (composer) {
                    composer.setCamera(_this);
                });
            }
        }
    };
    CameraComponent.prototype.resetEffectComposer = function () {
        this.effectComposer = this.getEffectComposer();
    };
    CameraComponent.prototype.getEffectComposer = function () {
        var _this = this;
        if (this.pass != null && this.pass.length > 0) {
            if (this.renderer instanceof THREE.WebGLRenderer) {
                var effectComposer_1 = new EffectComposer_1.EffectComposer(this.renderer);
                this.pass.forEach(function (item) {
                    item.getPass(_this.getScene(), _this.getCamera(), effectComposer_1);
                });
                return effectComposer_1;
            }
        }
        return null;
    };
    CameraComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.listner.changes.subscribe(function () {
            _this.synkObject3D(['listner']);
        });
        this.audio.changes.subscribe(function () {
            _this.synkObject3D(['audio']);
        });
        this.mixer.changes.subscribe(function () {
            _this.synkObject3D(['mixer']);
        });
        _super.prototype.ngAfterContentInit.call(this);
    };
    CameraComponent.prototype.synkObject3D = function (synkTypes) {
        var _this = this;
        if (this.camera !== null) {
            synkTypes.forEach(function (synkType) {
                switch (synkType) {
                    case 'listner':
                        _this.listner.forEach(function (listner) {
                            listner.setObject3D(_this.camera);
                        });
                        break;
                    case 'audio':
                        _this.audio.forEach(function (audio) {
                            audio.setObject3D(_this.camera);
                        });
                        break;
                    case 'mixer':
                        if (_this.clips !== null && _this.clips.length > 0) {
                            _this.mixer.forEach(function (mixer) {
                                mixer.setModel(_this.camera, _this.clips);
                            });
                        }
                        break;
                }
            });
            _super.prototype.synkObject3D.call(this, synkTypes);
        }
    };
    CameraComponent.prototype.getFov = function (def) {
        return this.fov === null ? def : this.fov;
    };
    CameraComponent.prototype.getNear = function (def) {
        return this.near === null ? def : this.near;
    };
    CameraComponent.prototype.getFar = function (def) {
        return this.far === null ? def : this.far;
    };
    CameraComponent.prototype.getLeft = function (width) {
        return width * this.left;
    };
    CameraComponent.prototype.getRight = function (width) {
        return width * this.right;
    };
    CameraComponent.prototype.getTop = function (height) {
        return height * this.top;
    };
    CameraComponent.prototype.getBottom = function (height) {
        return height * this.bottom;
    };
    CameraComponent.prototype.getAspect = function (width, height) {
        return width > 0 && height > 0 ? width / height : 1;
    };
    CameraComponent.prototype.getObject3D = function () {
        return this.getCamera();
    };
    CameraComponent.prototype.getRaycaster = function (event) {
        var vector = new THREE.Vector3((event.clientX / this.cameraWidth) * 2 - 1, -(event.clientY / this.cameraHeight) * 2 + 1, 0.5);
        var camera = this.getCamera();
        var v = vector.unproject(camera);
        var raycaster = new THREE.Raycaster(camera.position, v.sub(camera.position).normalize());
        return raycaster;
    };
    CameraComponent.prototype.setCameraSize = function (width, height) {
        var _this = this;
        this.cameraWidth = width;
        this.cameraHeight = height;
        if (this.camera !== null) {
            if (this.camera instanceof THREE.OrthographicCamera) {
                this.camera.left = this.getLeft(width);
                this.camera.right = this.getRight(width);
                this.camera.top = this.getTop(height);
                this.camera.bottom = this.getBottom(height);
                this.camera.updateProjectionMatrix();
            }
            else if (this.camera instanceof THREE.PerspectiveCamera) {
                this.camera.aspect = this.getAspect(width, height);
                this.camera.updateProjectionMatrix();
            }
        }
        if (this.composer !== null && this.composer.length > 0) {
            this.composer.forEach(function (composer) {
                composer.setCameraSize(_this.cameraWidth, _this.cameraHeight);
            });
        }
    };
    CameraComponent.prototype.getCamera = function () {
        var _this = this;
        if (this.camera === null) {
            var width = this.cameraWidth;
            var height = this.cameraHeight;
            switch (this.type.toLowerCase()) {
                case 'orthographic':
                    this.camera = new THREE.OrthographicCamera(this.getLeft(width), this.getRight(width), this.getTop(height), this.getBottom(height), this.getNear(-200), this.getFar(2000));
                    break;
                case 'perspective':
                default:
                    this.camera = new THREE.PerspectiveCamera(this.getFov(50), this.getAspect(width, height), this.getNear(0.1), this.getFar(2000));
                    break;
            }
            if (interface_1.ThreeUtil.isNotNull(this.name)) {
                this.camera.name = this.name;
            }
            if (interface_1.ThreeUtil.isNull(this.camera.userData.component)) {
                this.camera.userData.component = this;
            }
            this.object3d = this.camera;
            if (interface_1.ThreeUtil.isNotNull(this.storageName)) {
                this.localStorageService.getObject(this.storageName, function (loadedMesh, clips, geometry) {
                    _this.clips = clips;
                    _this.synkObject3D(['mixer']);
                }, { object: this.camera });
            }
            this.synkObject3D(['position', 'rotation', 'scale', 'lookat', 'listner', 'audio', 'mixer']);
        }
        return this.camera;
    };
    CameraComponent.prototype.getScene = function (scenes) {
        if (this.scene !== null) {
            return this.scene.getScene();
        }
        else if (scenes && scenes.length > 0) {
            return scenes.first.getScene();
        }
        else if (this.rendererScenes && this.rendererScenes.length > 0) {
            return this.rendererScenes.first.getScene();
        }
        else {
            return new THREE.Scene();
        }
    };
    CameraComponent.prototype.render = function (renderer, cssRenderer, scenes, renderTimer) {
        var _this = this;
        if (this.scenes !== null && this.scenes.length > 0) {
            this.scenes.forEach(function (sceneCom) {
                var scene = sceneCom.getScene();
                if (scene !== null) {
                    if (_this.autoClear !== null) {
                        if (renderer instanceof THREE.WebGLRenderer) {
                            renderer.autoClear = _this.autoClear;
                        }
                    }
                    if (renderer instanceof THREE.WebGLRenderer && _this.composer && _this.composer.length > 0) {
                        _this.composer.forEach(function (composer) {
                            composer.render(renderer, renderTimer);
                        });
                    }
                    else {
                        if (_this.effectComposer !== null) {
                            _this.effectComposer.render(renderTimer.delta);
                        }
                        else {
                            renderer.render(scene, _this.getCamera());
                        }
                    }
                }
            });
        }
        else {
            var scene = this.getScene(scenes);
            if (scene !== null) {
                if (this.autoClear !== null) {
                    if (renderer instanceof THREE.WebGLRenderer) {
                        renderer.autoClear = this.autoClear;
                    }
                }
                if (renderer instanceof THREE.WebGLRenderer) {
                    this.composer.forEach(function (composer) {
                        composer.render(renderer, renderTimer);
                    });
                }
                if (this.effectComposer !== null) {
                    this.effectComposer.render(renderTimer.delta);
                }
                else {
                    renderer.render(scene, this.getCamera());
                }
            }
        }
        if (cssRenderer !== null) {
            if (this.scenes !== null && this.scenes.length > 0) {
                this.scenes.forEach(function (sceneCom) {
                    var scene = sceneCom.getScene();
                    if (scene !== null) {
                        cssRenderer.render(scene, _this.getCamera());
                    }
                });
            }
            else {
                var scene = this.getScene(scenes);
                if (scene !== null) {
                    cssRenderer.render(scene, this.getCamera());
                }
            }
        }
    };
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "fov");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "near");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "far");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "left");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "right");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "top");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "bottom");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "autoClear");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "controlType");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "controlAutoRotate");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "scene");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "scenes");
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "storageName");
    __decorate([
        core_1.ContentChildren(pass_component_1.PassComponent, { descendants: false })
    ], CameraComponent.prototype, "pass");
    __decorate([
        core_1.ContentChildren(composer_component_1.ComposerComponent, { descendants: false })
    ], CameraComponent.prototype, "composer");
    __decorate([
        core_1.ContentChildren(listener_component_1.ListenerComponent, { descendants: false })
    ], CameraComponent.prototype, "listner");
    __decorate([
        core_1.ContentChildren(audio_component_1.AudioComponent, { descendants: false })
    ], CameraComponent.prototype, "audio");
    __decorate([
        core_1.ContentChildren(mixer_component_1.MixerComponent, { descendants: false })
    ], CameraComponent.prototype, "mixer");
    CameraComponent = __decorate([
        core_1.Component({
            selector: 'three-camera',
            templateUrl: './camera.component.html',
            styleUrls: ['./camera.component.scss']
        })
    ], CameraComponent);
    return CameraComponent;
}(object3d_abstract_1.AbstractObject3dComponent));
exports.CameraComponent = CameraComponent;
