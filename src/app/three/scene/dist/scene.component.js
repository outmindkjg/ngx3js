"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SceneComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var PHYSIJS = require("physijs");
var mesh_component_1 = require("./../mesh/mesh.component");
var fog_component_1 = require("../fog/fog.component");
var material_component_1 = require("../material/material.component");
var position_component_1 = require("../position/position.component");
var rotation_component_1 = require("../rotation/rotation.component");
var scale_component_1 = require("../scale/scale.component");
var SceneComponent = /** @class */ (function () {
    function SceneComponent(localStorageService) {
        this.localStorageService = localStorageService;
        this.storageName = null;
        this.physiType = 'none';
        this.fog = null;
        this.overrideMaterial = null;
        this.position = null;
        this.rotation = null;
        this.scale = null;
        this.scene = null;
    }
    SceneComponent.prototype.ngOnInit = function () {
    };
    SceneComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.meshes.changes.subscribe(function (e) {
            var scene = _this.getScene();
            _this.meshes.forEach(function (mesh) {
                mesh.setObject3D(scene);
            });
        });
    };
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
            scene.children.forEach(function (child) {
                scene.remove(child);
            });
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
            if (this.meshes) {
                this.getScene();
            }
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
                        if (mesh.name !== null && mesh.name !== undefined && mesh.name !== '') {
                            var foundMesh = _this.scene.getObjectByName(mesh.name);
                            if (foundMesh !== null && foundMesh !== undefined) {
                                mesh.setMesh(foundMesh, true);
                            }
                        }
                    });
                });
            }
            else {
                switch (this.physiType.toLowerCase()) {
                    case 'physi':
                        PHYSIJS.scripts.worker = "/assets/physijs_worker.js";
                        PHYSIJS.scripts.ammo = "/assets/ammo.js";
                        var scene_1 = new PHYSIJS.Scene();
                        scene_1.setGravity(new THREE.Vector3(0, -50, 0));
                        scene_1.addEventListener('update', function () {
                            scene_1.simulate(undefined, 2);
                        });
                        scene_1.simulate();
                        this.scene = scene_1;
                        break;
                    case 'none':
                    default:
                        this.scene = new THREE.Scene();
                        break;
                }
                this.meshes.forEach(function (mesh) {
                    mesh.setObject3D(_this.scene);
                });
                if (this.fog !== null && this.fog !== undefined) {
                    this.fog.setScene(this.scene);
                }
            }
            if (this.position !== null && this.position != undefined) {
                this.position.setPosition(this.scene.position);
            }
            if (this.rotation !== null && this.rotation != undefined) {
                this.rotation.setRotation(this.scene.rotation);
            }
            if (this.scale !== null && this.scale != undefined) {
                this.scale.setScale(this.scene.scale);
            }
            if (this.overrideMaterial !== null && this.overrideMaterial !== undefined) {
                this.scene.overrideMaterial = this.overrideMaterial.getMaterial();
                this.overrideMaterial.setMaterial(this.scene.overrideMaterial);
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
        core_1.ContentChild(fog_component_1.FogComponent, { descendants: false })
    ], SceneComponent.prototype, "fog");
    __decorate([
        core_1.ContentChild(material_component_1.MaterialComponent, { descendants: false })
    ], SceneComponent.prototype, "overrideMaterial");
    __decorate([
        core_1.ContentChild(position_component_1.PositionComponent, { descendants: false })
    ], SceneComponent.prototype, "position");
    __decorate([
        core_1.ContentChild(rotation_component_1.RotationComponent, { descendants: false })
    ], SceneComponent.prototype, "rotation");
    __decorate([
        core_1.ContentChild(scale_component_1.ScaleComponent, { descendants: false })
    ], SceneComponent.prototype, "scale");
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
