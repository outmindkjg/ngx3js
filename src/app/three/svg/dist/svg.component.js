"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SvgComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var SVGLoader_1 = require("three/examples/jsm/loaders/SVGLoader");
var material_component_1 = require("../material/material.component");
var position_component_1 = require("../position/position.component");
var rotation_component_1 = require("../rotation/rotation.component");
var scale_component_1 = require("../scale/scale.component");
var translation_component_1 = require("../translation/translation.component");
var SvgComponent = /** @class */ (function () {
    function SvgComponent(ele) {
        this.ele = ele;
        this.type = 'shape';
        this.visible = true;
        this.castShadow = true;
        this.receiveShadow = false;
        this.name = null;
        this.url = null;
        this.curveSegments = null;
        this.depth = null;
        this.steps = null;
        this.bevelEnabled = null;
        this.bevelThickness = null;
        this.bevelSize = null;
        this.bevelOffset = null;
        this.bevelSegments = null;
        this.closed = null;
        this.isCCW = null;
        this.noHoles = null;
        this.meshPositions = [];
        this.meshRotations = [];
        this.meshScales = [];
        this.meshTranslations = [];
        this.meshMaterials = [];
        this.meshes = null;
        this.parent = null;
    }
    SvgComponent.prototype.getCurveSegments = function (def) {
        return this.curveSegments === null ? def : this.curveSegments;
    };
    SvgComponent.prototype.getDepth = function (def) {
        return this.depth === null ? def : this.depth;
    };
    SvgComponent.prototype.getSteps = function (def) {
        return this.steps === null ? def : this.steps;
    };
    SvgComponent.prototype.getBevelEnabled = function (def) {
        return this.bevelEnabled === null ? def : this.bevelEnabled;
    };
    SvgComponent.prototype.getBevelThickness = function (def) {
        return this.bevelThickness === null ? def : this.bevelThickness;
    };
    SvgComponent.prototype.getBevelSize = function (def) {
        return this.bevelSize === null ? def : this.bevelSize;
    };
    SvgComponent.prototype.getBevelOffset = function (def) {
        return this.bevelOffset === null ? def : this.bevelOffset;
    };
    SvgComponent.prototype.getBevelSegments = function (def) {
        return this.bevelSegments === null ? def : this.bevelSegments;
    };
    SvgComponent.prototype.getIsCCW = function (def) {
        return this.isCCW === null ? def : this.isCCW;
    };
    SvgComponent.prototype.getNoHoles = function (def) {
        return this.noHoles === null ? def : this.noHoles;
    };
    SvgComponent.prototype.getMaterials = function () {
        var materials = [];
        if (this.materials !== null && this.materials.length > 0) {
            this.materials.forEach(function (material) {
                materials.push(material.getMaterial());
            });
        }
        return materials;
    };
    SvgComponent.prototype.ngOnInit = function () {
    };
    SvgComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes) {
            if (this.parent !== null && this.meshes !== null) {
                this.meshes.forEach(function (mesh) {
                    _this.parent.remove(mesh);
                });
            }
            this.meshes = null;
        }
        this.resetMeshes();
    };
    SvgComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.position.changes.subscribe(function () {
            _this.resetMeshes();
        });
        this.rotation.changes.subscribe(function () {
            _this.resetMeshes();
        });
        this.scale.changes.subscribe(function () {
            _this.resetMeshes();
        });
    };
    SvgComponent.prototype.applyChanges3D = function (changes) {
        var _this = this;
        if (this.meshes !== null) {
            changes.forEach(function (change) {
                switch (change) {
                    case 'position':
                        _this.position.forEach(function (position) {
                            position.setParent(_this);
                        });
                        break;
                    case 'rotation':
                        _this.rotation.forEach(function (rotation) {
                            rotation.setParent(_this);
                        });
                        break;
                    case 'scale':
                        _this.scale.forEach(function (scale) {
                            scale.setParent(_this);
                        });
                        break;
                    case 'material':
                        _this.materials.forEach(function (material, seqn) {
                            material.setParent(_this, seqn);
                        });
                        break;
                    case 'translation':
                        _this.translation.forEach(function (translation) {
                            translation.setParent(_this);
                        });
                        break;
                }
            });
        }
    };
    SvgComponent.prototype.setParent = function (parent) {
        if (this.parent !== parent) {
            this.parent = parent;
            this.meshes = null;
            this.resetMeshes();
        }
    };
    SvgComponent.prototype.resetMeshes = function () {
        var _this = this;
        if (this.parent !== null && this.meshes === null) {
            this.getPaths(function (result) {
                _this.meshes = [];
                _this.meshPositions = [];
                _this.meshRotations = [];
                _this.meshScales = [];
                _this.meshTranslations = [];
                _this.meshMaterials = [];
                var materials = _this.getMaterials();
                result.forEach(function (data, idx) {
                    var geom = data.geometry;
                    var meshMaterial = (materials.length > idx) ? materials[idx] : new THREE.MeshPhongMaterial({ color: 0x333333, shininess: 100 });
                    var mesh = new THREE.Mesh(geom, meshMaterial);
                    if (_this.name !== null) {
                        mesh.name = _this.name;
                    }
                    mesh.receiveShadow = _this.receiveShadow;
                    _this.meshPositions.push(mesh.position);
                    _this.meshRotations.push(mesh.rotation);
                    _this.meshScales.push(mesh.scale);
                    _this.meshTranslations.push(geom);
                    _this.meshMaterials.push(meshMaterial);
                    _this.meshes.push(mesh);
                    _this.parent.add(mesh);
                });
                _this.applyChanges3D(['translation', 'position', 'rotation', 'scale', 'material']);
            });
        }
    };
    SvgComponent.prototype.getGeometries = function (data) {
        var _this = this;
        var geometries = [];
        data.paths.forEach(function (path) {
            var shape = path.toShapes(_this.getIsCCW(true), _this.getNoHoles(false));
            var geometry = null;
            switch (_this.type.toLowerCase()) {
                case 'extrudebuffer':
                    geometry = new THREE.ExtrudeBufferGeometry(shape, {
                        curveSegments: _this.getCurveSegments(12),
                        steps: _this.getSteps(1),
                        depth: _this.getDepth(100),
                        bevelEnabled: _this.getBevelEnabled(true),
                        bevelThickness: _this.getBevelThickness(6),
                        bevelSize: _this.getBevelSize(0),
                        bevelOffset: _this.getBevelOffset(0),
                        bevelSegments: _this.getBevelSegments(3)
                    });
                    break;
                case 'extrude':
                    geometry = new THREE.ExtrudeGeometry(shape, {
                        curveSegments: _this.getCurveSegments(12),
                        steps: _this.getSteps(1),
                        depth: _this.getDepth(100),
                        bevelEnabled: _this.getBevelEnabled(true),
                        bevelThickness: _this.getBevelThickness(6),
                        bevelSize: _this.getBevelSize(0),
                        bevelOffset: _this.getBevelOffset(0),
                        bevelSegments: _this.getBevelSegments(3)
                    });
                    break;
                case 'shapebuffer':
                    geometry = new THREE.ShapeBufferGeometry(shape, _this.getCurveSegments(12));
                    break;
                case 'shape':
                default:
                    geometry = new THREE.ShapeGeometry(shape, _this.getCurveSegments(12));
                    break;
            }
            geometries.push({
                geometry: geometry,
                style: path['userData'] ? path['userData'] : null
            });
        });
        return geometries;
    };
    SvgComponent.prototype.getPaths = function (onload) {
        var _this = this;
        var loader = new SVGLoader_1.SVGLoader();
        if (this.url !== null) {
            loader.load(this.url, function (data) {
                onload(_this.getGeometries(data));
            });
        }
        else {
            var svgs = this.ele.nativeElement.getElementsByTagName('svg');
            if (svgs.length > 0) {
                onload(this.getGeometries(loader.parse(svgs[0].innerHTML.trim())));
            }
        }
    };
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "castShadow");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "receiveShadow");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "url");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "curveSegments");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "depth");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "steps");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "bevelEnabled");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "bevelThickness");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "bevelSize");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "bevelOffset");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "bevelSegments");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "closed");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "isCCW");
    __decorate([
        core_1.Input()
    ], SvgComponent.prototype, "noHoles");
    __decorate([
        core_1.ContentChildren(material_component_1.MaterialComponent, { descendants: false })
    ], SvgComponent.prototype, "materials");
    __decorate([
        core_1.ContentChildren(position_component_1.PositionComponent, { descendants: false })
    ], SvgComponent.prototype, "position");
    __decorate([
        core_1.ContentChildren(rotation_component_1.RotationComponent, { descendants: false })
    ], SvgComponent.prototype, "rotation");
    __decorate([
        core_1.ContentChildren(scale_component_1.ScaleComponent, { descendants: false })
    ], SvgComponent.prototype, "scale");
    __decorate([
        core_1.ContentChildren(translation_component_1.TranslationComponent, { descendants: false })
    ], SvgComponent.prototype, "translation");
    SvgComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-svg',
            templateUrl: './svg.component.html',
            styleUrls: ['./svg.component.scss']
        })
    ], SvgComponent);
    return SvgComponent;
}());
exports.SvgComponent = SvgComponent;
