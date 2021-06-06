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
exports.SceneComponent = void 0;
var mixer_component_1 = require("./../mixer/mixer.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var controller_component_1 = require("../controller/controller.component");
var fog_component_1 = require("../fog/fog.component");
var interface_1 = require("../interface");
var material_component_1 = require("../material/material.component");
var object3d_abstract_1 = require("../object3d.abstract");
var physics_component_1 = require("../physics/physics.component");
var audio_component_1 = require("./../audio/audio.component");
var listener_component_1 = require("./../listener/listener.component");
var mesh_component_1 = require("./../mesh/mesh.component");
var rigidbody_component_1 = require("./../rigidbody/rigidbody.component");
var SceneComponent = /** @class */ (function (_super) {
    __extends(SceneComponent, _super);
    function SceneComponent(localStorageService) {
        var _this = _super.call(this) || this;
        _this.localStorageService = localStorageService;
        _this.storageName = null;
        _this.background = null;
        _this.scene = null;
        _this.renderer = null;
        _this._physics = null;
        return _this;
    }
    SceneComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    SceneComponent.prototype.setRenderer = function (renderer) {
        this.renderer = renderer;
    };
    SceneComponent.prototype.getRenderer = function () {
        return this.renderer;
    };
    SceneComponent.prototype.getObject3D = function () {
        return this.getScene();
    };
    SceneComponent.prototype.getJson = function () {
        return this.getScene().toJSON();
    };
    SceneComponent.prototype.setClear = function () {
        var scene = this.getScene();
        if (scene['clear']) {
            scene['clear']();
        }
        else {
            scene.children = [];
        }
    };
    SceneComponent.prototype.setSavelocalStorage = function (storageName) {
        return this.localStorageService.setScene(storageName, this.getScene());
    };
    SceneComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            if (changes.storageName) {
                this.scene = null;
            }
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    SceneComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.meshes.changes.subscribe(function (e) {
            _this.applyChanges3D(['mesh']);
        });
        this.materials.changes.subscribe(function (e) {
            _this.applyChanges3D(['materials']);
        });
        this.listner.changes.subscribe(function () {
            _this.applyChanges3D(['listner']);
        });
        this.audio.changes.subscribe(function () {
            _this.applyChanges3D(['audio']);
        });
        this.sceneController.changes.subscribe(function () {
            _this.applyChanges3D(['sceneController']);
        });
        this.mixer.changes.subscribe(function () {
            _this.applyChanges3D(['mixer']);
        });
        this.physics.changes.subscribe(function () {
            _this.applyChanges3D(['physics']);
        });
        this.rigidbody.changes.subscribe(function () {
            _this.applyChanges3D(['rigidbody']);
        });
        _super.prototype.ngAfterContentInit.call(this);
    };
    SceneComponent.prototype.applyChanges3D = function (changes) {
        var _this = this;
        if (this.scene !== null) {
            changes.forEach(function (change) {
                switch (change) {
                    case 'mesh':
                        _this.meshes.forEach(function (mesh) {
                            mesh.setParent(_this.scene);
                        });
                        break;
                    case 'rigidbody':
                    case 'physics':
                    case 'mixer':
                        _this._physics = _this.physics.first;
                        _this.rigidbody.forEach(function (rigidbody) {
                            rigidbody.setPhysics(_this._physics);
                        });
                        _this.mixer.forEach(function (mixer) {
                            mixer.setPhysics(_this._physics);
                        });
                        break;
                    case 'materials':
                        _this.materials.forEach(function (material) {
                            material.setParent(_this.scene);
                        });
                        break;
                    case 'listner':
                        _this.listner.forEach(function (listner) {
                            listner.setParent(_this.scene);
                        });
                        break;
                    case 'audio':
                        _this.audio.forEach(function (audio) {
                            audio.setParent(_this.scene);
                        });
                        break;
                    case 'fog':
                        _this.fog.forEach(function (fog) {
                            fog.setScene(_this.scene);
                        });
                        break;
                    case 'sceneController':
                        _this.sceneController.forEach(function (controller) {
                            controller.setScene(_this.scene);
                        });
                        break;
                }
            });
        }
        _super.prototype.applyChanges3D.call(this, changes);
    };
    SceneComponent.prototype.update = function (timer) {
        this.mixer.forEach(function (mixer) {
            mixer.update(timer);
        });
        this.physics.forEach(function (physics) {
            physics.update(timer);
        });
        this.rigidbody.forEach(function (rigidbody) {
            rigidbody.update(timer);
        });
    };
    SceneComponent.prototype.getScene = function () {
        var _this = this;
        if (this.scene === null) {
            if (this.storageName !== null) {
                this.scene = new THREE.Scene();
                this.localStorageService.getScene(this.storageName, function (scene) {
                    _this.scene.copy(scene);
                    _this.meshes.forEach(function (mesh) {
                        if (mesh.name !== null &&
                            mesh.name !== undefined &&
                            mesh.name !== '') {
                            var foundMesh = _this.scene.getObjectByName(mesh.name);
                            if (foundMesh !== null && foundMesh !== undefined) {
                                mesh.setParent(foundMesh, true);
                            }
                        }
                    });
                });
                this.setObject3D(this.scene);
            }
            else {
                this.scene = new THREE.Scene();
                this.setObject3D(this.scene);
                this.applyChanges3D([
                    'position',
                    'rotation',
                    'scale',
                    'lookat',
                    'materials',
                    'mesh',
                    'physics',
                    'fog',
                    'sceneController',
                ]);
            }
            if (interface_1.ThreeUtil.isNotNull(this.background)) {
                this.scene.background = interface_1.ThreeUtil.getColorSafe(this.background, 0xffffff);
            }
            if (interface_1.ThreeUtil.isNull(this.scene.userData.component)) {
                this.scene.userData.component = this;
            }
        }
        return this.scene;
    };
    __decorate([
        core_1.Input()
    ], SceneComponent.prototype, "storageName");
    __decorate([
        core_1.Input()
    ], SceneComponent.prototype, "background");
    __decorate([
        core_1.ContentChildren(mesh_component_1.MeshComponent, { descendants: false })
    ], SceneComponent.prototype, "meshes");
    __decorate([
        core_1.ContentChildren(physics_component_1.PhysicsComponent, { descendants: false })
    ], SceneComponent.prototype, "physics");
    __decorate([
        core_1.ContentChildren(rigidbody_component_1.RigidbodyComponent, { descendants: true })
    ], SceneComponent.prototype, "rigidbody");
    __decorate([
        core_1.ContentChildren(fog_component_1.FogComponent, { descendants: false })
    ], SceneComponent.prototype, "fog");
    __decorate([
        core_1.ContentChildren(material_component_1.MaterialComponent, { descendants: false })
    ], SceneComponent.prototype, "materials");
    __decorate([
        core_1.ContentChildren(listener_component_1.ListenerComponent, { descendants: false })
    ], SceneComponent.prototype, "listner");
    __decorate([
        core_1.ContentChildren(audio_component_1.AudioComponent, { descendants: false })
    ], SceneComponent.prototype, "audio");
    __decorate([
        core_1.ContentChildren(controller_component_1.ControllerComponent, { descendants: true })
    ], SceneComponent.prototype, "sceneController");
    __decorate([
        core_1.ContentChildren(mixer_component_1.MixerComponent, { descendants: true })
    ], SceneComponent.prototype, "mixer");
    SceneComponent = __decorate([
        core_1.Component({
            selector: 'three-scene',
            templateUrl: './scene.component.html',
            styleUrls: ['./scene.component.scss']
        })
    ], SceneComponent);
    return SceneComponent;
}(object3d_abstract_1.AbstractObject3dComponent));
exports.SceneComponent = SceneComponent;
