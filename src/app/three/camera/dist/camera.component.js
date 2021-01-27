"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CameraComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var EffectComposer_1 = require("three/examples/jsm/postprocessing/EffectComposer");
var lookat_component_1 = require("../lookat/lookat.component");
var position_component_1 = require("../position/position.component");
var rotation_component_1 = require("../rotation/rotation.component");
var scale_component_1 = require("../scale/scale.component");
var pass_component_1 = require("./../pass/pass.component");
/*
ArrayCamera
CubeCamera
StereoCamera
*/
var CameraComponent = /** @class */ (function () {
    function CameraComponent() {
        this.type = 'perspective';
        this.fov = 45;
        this.near = null;
        this.far = null;
        this.left = -0.5;
        this.right = 0.5;
        this.top = 0.5;
        this.bottom = -0.5;
        this.autoClear = null;
        this.controlType = "none";
        this.controlAutoRotate = null;
        this.scene = null;
        this.camera = null;
        this.renderer = null;
        this.effectComposer = null;
        this.cameraWidth = 0;
        this.cameraHeight = 0;
    }
    CameraComponent.prototype.ngOnInit = function () {
    };
    CameraComponent.prototype.ngOnChanges = function (changes) {
        if (changes.type) {
            this.camera = null;
        }
    };
    CameraComponent.prototype.setRenderer = function (renderer, rendererScenes) {
        if (this.renderer !== renderer) {
            this.renderer = renderer;
            this.rendererScenes = rendererScenes;
            this.effectComposer = this.getEffectComposer();
        }
    };
    CameraComponent.prototype.resetEffectComposer = function () {
        this.pass;
        this.effectComposer = this.getEffectComposer();
    };
    CameraComponent.prototype.getEffectComposer = function () {
        var _this = this;
        if (this.pass != null && this.pass.length > 0) {
            if (this.renderer instanceof THREE.WebGLRenderer) {
                var effectComposer_1 = new EffectComposer_1.EffectComposer(this.renderer);
                this.pass.forEach(function (item) {
                    var pass = item.getPass(_this.getScene(), _this.getCamera(), _this);
                    if (pass !== null) {
                        effectComposer_1.addPass(pass);
                    }
                });
                return effectComposer_1;
            }
        }
        return null;
    };
    CameraComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.position.changes.subscribe(function () {
            _this.synkObject3D(['position']);
        });
        this.rotation.changes.subscribe(function () {
            _this.synkObject3D(['rotation']);
        });
        this.scale.changes.subscribe(function () {
            _this.synkObject3D(['scale']);
        });
        this.lookat.changes.subscribe(function () {
            _this.synkObject3D(['lookat']);
        });
    };
    CameraComponent.prototype.synkObject3D = function (synkTypes) {
        var _this = this;
        if (this.camera !== null) {
            synkTypes.forEach(function (synkType) {
                switch (synkType) {
                    case 'position':
                        _this.position.forEach(function (position) {
                            position.setObject3D(_this.camera);
                        });
                        break;
                    case 'rotation':
                        _this.rotation.forEach(function (rotation) {
                            rotation.setObject3D(_this.camera);
                        });
                        break;
                    case 'scale':
                        _this.scale.forEach(function (scale) {
                            scale.setObject3D(_this.camera);
                        });
                        break;
                    case 'lookat':
                        _this.lookat.forEach(function (lookat) {
                            lookat.setObject3D(_this.camera);
                        });
                        break;
                }
            });
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
    };
    CameraComponent.prototype.getCamera = function () {
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
            this.synkObject3D(['position', 'rotation', 'scale', 'lookat']);
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
    CameraComponent.prototype.render = function (renderer, scenes, renderTimer) {
        var scene = this.getScene(scenes);
        if (scene !== null) {
            if (this.autoClear !== null) {
                if (renderer instanceof THREE.WebGLRenderer) {
                    renderer.autoClear = this.autoClear;
                }
            }
            if (this.effectComposer !== null) {
                this.effectComposer.render(renderTimer.delta);
            }
            else {
                renderer.render(scene, this.getCamera());
            }
        }
    };
    __decorate([
        core_1.Input()
    ], CameraComponent.prototype, "type");
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
        core_1.ContentChildren(position_component_1.PositionComponent, { descendants: false })
    ], CameraComponent.prototype, "position");
    __decorate([
        core_1.ContentChildren(rotation_component_1.RotationComponent, { descendants: false })
    ], CameraComponent.prototype, "rotation");
    __decorate([
        core_1.ContentChildren(scale_component_1.ScaleComponent, { descendants: false })
    ], CameraComponent.prototype, "scale");
    __decorate([
        core_1.ContentChildren(lookat_component_1.LookatComponent, { descendants: false })
    ], CameraComponent.prototype, "lookat");
    __decorate([
        core_1.ContentChildren(pass_component_1.PassComponent, { descendants: false })
    ], CameraComponent.prototype, "pass");
    CameraComponent = __decorate([
        core_1.Component({
            selector: 'three-camera',
            templateUrl: './camera.component.html',
            styleUrls: ['./camera.component.scss']
        })
    ], CameraComponent);
    return CameraComponent;
}());
exports.CameraComponent = CameraComponent;
