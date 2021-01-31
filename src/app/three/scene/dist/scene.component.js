"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SceneComponent = void 0;
var audio_component_1 = require("./../audio/audio.component");
var listener_component_1 = require("./../listener/listener.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var PHYSIJS = require("./../physijs/src");
var mesh_component_1 = require("./../mesh/mesh.component");
var fog_component_1 = require("../fog/fog.component");
var material_component_1 = require("../material/material.component");
var position_component_1 = require("../position/position.component");
var rotation_component_1 = require("../rotation/rotation.component");
var scale_component_1 = require("../scale/scale.component");
var lookat_component_1 = require("../lookat/lookat.component");
var SceneComponent = /** @class */ (function () {
    function SceneComponent(localStorageService) {
        this.localStorageService = localStorageService;
        this.storageName = null;
        this.physiType = 'none';
        this.scene = null;
    }
    SceneComponent.prototype.ngOnInit = function () { };
    SceneComponent.prototype.getPosition = function () {
        return this.getScene().position;
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
            if (changes.storageName || changes.physiType) {
                this.scene = null;
            }
        }
    };
    SceneComponent.prototype.ngAfterContentInit = function () {
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
        this.meshes.changes.subscribe(function (e) {
            _this.synkObject3D(['mesh']);
        });
        this.materials.changes.subscribe(function (e) {
            _this.synkObject3D(['materials']);
        });
        this.listner.changes.subscribe(function () {
            _this.synkObject3D(['listner']);
        });
        this.audio.changes.subscribe(function () {
            _this.synkObject3D(['audio']);
        });
    };
    SceneComponent.prototype.synkObject3D = function (synkTypes) {
        var _this = this;
        if (this.scene !== null) {
            synkTypes.forEach(function (synkType) {
                switch (synkType) {
                    case 'position':
                        _this.position.forEach(function (position) {
                            position.setObject3D(_this.scene);
                        });
                        break;
                    case 'rotation':
                        _this.rotation.forEach(function (rotation) {
                            rotation.setObject3D(_this.scene);
                        });
                        break;
                    case 'scale':
                        _this.scale.forEach(function (scale) {
                            scale.setObject3D(_this.scene);
                        });
                        break;
                    case 'lookat':
                        _this.lookat.forEach(function (lookat) {
                            lookat.setObject3D(_this.scene);
                        });
                        break;
                    case 'mesh':
                        _this.meshes.forEach(function (mesh) {
                            mesh.setObject3D(_this.scene);
                        });
                    case 'materials':
                        _this.materials.forEach(function (material) {
                            material.setObject3D(_this.scene);
                        });
                        break;
                    case 'listner':
                        _this.listner.forEach(function (listner) {
                            listner.setObject3D(_this.scene);
                        });
                        break;
                    case 'audio':
                        _this.audio.forEach(function (audio) {
                            audio.setObject3D(_this.scene);
                        });
                        break;
                }
            });
        }
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
                                mesh.setObject3D(foundMesh, true);
                            }
                        }
                    });
                });
            }
            else {
                switch (this.physiType.toLowerCase()) {
                    case 'physi':
                        PHYSIJS.scripts.worker = '/assets/physijs_worker.js';
                        PHYSIJS.scripts.ammo = '/assets/ammo.js';
                        var scene_1 = new PHYSIJS.Scene();
                        scene_1.setGravity(new THREE.Vector3(0, -50, 0));
                        scene_1.addEventListener('update', function () {
                            scene_1.simulate(undefined, 2);
                        });
                        scene_1.simulate();
                        this.scene.fog;
                        this.scene = scene_1;
                        break;
                    case 'none':
                    default:
                        this.scene = new THREE.Scene();
                        break;
                }
                this.synkObject3D([
                    'position',
                    'rotation',
                    'scale',
                    'lookat',
                    'materials',
                    'mesh',
                    'fog',
                ]);
            }
        }
        return this.scene;
    };
    __decorate([
        core_1.Input()
    ], SceneComponent.prototype, "storageName");
    __decorate([
        core_1.Input()
    ], SceneComponent.prototype, "physiType");
    __decorate([
        core_1.ContentChildren(mesh_component_1.MeshComponent, { descendants: false })
    ], SceneComponent.prototype, "meshes");
    __decorate([
        core_1.ContentChildren(position_component_1.PositionComponent, { descendants: false })
    ], SceneComponent.prototype, "position");
    __decorate([
        core_1.ContentChildren(rotation_component_1.RotationComponent, { descendants: false })
    ], SceneComponent.prototype, "rotation");
    __decorate([
        core_1.ContentChildren(scale_component_1.ScaleComponent, { descendants: false })
    ], SceneComponent.prototype, "scale");
    __decorate([
        core_1.ContentChildren(lookat_component_1.LookatComponent, { descendants: false })
    ], SceneComponent.prototype, "lookat");
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
    SceneComponent = __decorate([
        core_1.Component({
            selector: 'three-scene',
            templateUrl: './scene.component.html',
            styleUrls: ['./scene.component.scss']
        })
    ], SceneComponent);
    return SceneComponent;
}());
exports.SceneComponent = SceneComponent;
