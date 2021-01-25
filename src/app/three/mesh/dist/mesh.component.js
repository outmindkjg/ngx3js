"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MeshComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var PHYSIJS = require("physijs");
var three_csg_ts_1 = require("three-csg-ts");
var RectAreaLightHelper_js_1 = require("three/examples/jsm/helpers/RectAreaLightHelper.js");
var Lensflare_1 = require("three/examples/jsm/objects/Lensflare");
var SceneUtils_1 = require("three/examples/jsm/utils/SceneUtils");
var geometry_component_1 = require("../geometry/geometry.component");
var lensflareelement_component_1 = require("../lensflareelement/lensflareelement.component");
var material_component_1 = require("../material/material.component");
var position_component_1 = require("../position/position.component");
var rotation_component_1 = require("../rotation/rotation.component");
var scale_component_1 = require("../scale/scale.component");
var svg_component_1 = require("../svg/svg.component");
var lookat_component_1 = require("./../lookat/lookat.component");
var MeshComponent = /** @class */ (function () {
    function MeshComponent(localStorageService) {
        this.localStorageService = localStorageService;
        this.type = 'mesh';
        this.physiType = 'none';
        this.mass = null;
        this.lightType = 'spot';
        this.helperType = 'axis';
        this.typeCsg = 'none';
        this.scaleStep = 1;
        this.visible = true;
        this.castShadow = true;
        this.receiveShadow = false;
        this.name = null;
        this.storageName = null;
        this.color = null;
        this.skyColor = null;
        this.groundColor = null;
        this.onlyShadow = null;
        this.intensity = null;
        this.distance = null;
        this.angle = null;
        this.penumbra = null;
        this.decay = null;
        this.width = null;
        this.height = null;
        this.exponent = null;
        this.shadowCameraVisible = false;
        this.shadowCameraNear = null;
        this.shadowMapSizeWidth = null;
        this.shadowMapSizeHeight = null;
        this.shadowCameraFar = null;
        this.shadowCameraFov = null;
        this.shadowCameraLeft = null;
        this.shadowCameraRight = null;
        this.shadowCameraTop = null;
        this.shadowCameraBottom = null;
        this.target = null;
        this.size = null;
        this.helperTarget = null;
        this.camera = null;
        this.geometry = null;
        this.position = null;
        this.rotation = null;
        this.scale = null;
        this.svg = null;
        this.lookat = null;
        this.mesh = null;
        this.helper = null;
        this._onChange = null;
        this.refObject3d = null;
    }
    MeshComponent_1 = MeshComponent;
    MeshComponent.prototype.getMass = function (def) {
        return this.mass === null ? def : this.mass;
    };
    MeshComponent.prototype.getIntensity = function (def) {
        return this.intensity === null ? def : this.intensity;
    };
    MeshComponent.prototype.getDistance = function (def) {
        return this.distance === null ? def : this.distance;
    };
    MeshComponent.prototype.getAngle = function (def) {
        return ((this.angle === null ? def : this.angle) / 180) * Math.PI;
    };
    MeshComponent.prototype.getPenumbra = function (def) {
        return this.penumbra === null ? def : this.penumbra;
    };
    MeshComponent.prototype.getDecay = function (def) {
        return this.decay === null ? def : this.decay;
    };
    MeshComponent.prototype.getWidth = function (def) {
        return this.width === null ? def : this.width;
    };
    MeshComponent.prototype.getHeight = function (def) {
        return this.height === null ? def : this.height;
    };
    MeshComponent.prototype.getColor = function (def) {
        if (this.color === null) {
            return def;
        }
        else {
            var color = this.color.toString();
            if (color.startsWith('0x')) {
                return parseInt(color, 16);
            }
            else {
                return this.color;
            }
        }
    };
    MeshComponent.prototype.getSkyColor = function (def) {
        if (this.skyColor === null) {
            return def;
        }
        else {
            var color = this.skyColor.toString();
            if (color.startsWith('0x')) {
                return parseInt(color, 16);
            }
            else {
                return this.skyColor;
            }
        }
    };
    MeshComponent.prototype.getGroundColor = function (def) {
        if (this.groundColor === null) {
            return def;
        }
        else {
            var color = this.groundColor.toString();
            if (color.startsWith('0x')) {
                return parseInt(color, 16);
            }
            else {
                return this.groundColor;
            }
        }
    };
    MeshComponent.prototype.getShadowMapSizeWidth = function (def) {
        return this.shadowMapSizeWidth === null ? def : this.shadowMapSizeWidth;
    };
    MeshComponent.prototype.getShadowMapSizeHeight = function (def) {
        return this.shadowMapSizeHeight === null ? def : this.shadowMapSizeHeight;
    };
    MeshComponent.prototype.getShadowCameraNear = function (def) {
        return this.shadowCameraNear === null ? def : this.shadowCameraNear;
    };
    MeshComponent.prototype.getShadowCameraFar = function (def) {
        return this.shadowCameraFar === null ? def : this.shadowCameraFar;
    };
    MeshComponent.prototype.getShadowCameraFov = function (def) {
        return this.shadowCameraFov === null ? def : this.shadowCameraFov;
    };
    MeshComponent.prototype.getShadowCameraLeft = function (def) {
        return this.shadowCameraLeft === null ? def : this.shadowCameraLeft;
    };
    MeshComponent.prototype.getShadowCameraRight = function (def) {
        return this.shadowCameraRight === null ? def : this.shadowCameraRight;
    };
    MeshComponent.prototype.getShadowCameraTop = function (def) {
        return this.shadowCameraTop === null ? def : this.shadowCameraTop;
    };
    MeshComponent.prototype.getShadowCameraBottom = function (def) {
        return this.shadowCameraBottom === null ? def : this.shadowCameraBottom;
    };
    MeshComponent.prototype.getTarget = function (def) {
        var target = this.target === null ? def : this.target;
        if (target !== null) {
            if (target.getObject3D) {
                return target.getObject3D();
            }
        }
        return null;
    };
    MeshComponent.prototype.getHelperTarget = function () {
        if (this.helperTarget !== null) {
            return this.helperTarget.getMesh();
        }
        else {
            return new THREE.Object3D();
        }
    };
    MeshComponent.prototype.getSize = function (def) {
        return this.size === null ? def : this.size;
    };
    MeshComponent.prototype.ngOnInit = function () { };
    MeshComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.meshes.changes.subscribe(function (e) {
            if (_this.mesh !== null) {
                _this.meshes.forEach(function (mesh) {
                    mesh.setObject3D(_this.mesh);
                });
            }
        });
        this.materials.changes.subscribe(function (e) {
            if (_this.mesh !== null) {
                _this.resetMesh(true);
            }
        });
    };
    MeshComponent.prototype.ngOnDestroy = function () {
        if (this.mesh != null && this.refObject3d != null) {
            this.refObject3d.remove(this.mesh);
        }
    };
    MeshComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            if (this.refObject3d !== null && this.mesh !== null) {
                this.refObject3d.remove(this.mesh);
                this.mesh = null;
            }
            if (changes.type || changes.storageName) {
                this.mesh = null;
            }
            if (this.mesh && changes.visible) {
                this.mesh.visible = this.visible;
            }
            this.resetMesh();
            if (this._onChange !== null) {
                this._onChange.onChange();
            }
        }
    };
    MeshComponent.prototype.getPosition = function () {
        if (this.mesh !== null) {
            return this.getMesh().position;
        }
        else if (this.position !== null && this.position !== undefined) {
            return this.position.getPosition();
        }
        else {
            return new THREE.Vector3(0, 0, 0);
        }
    };
    MeshComponent.prototype.getScale = function () {
        if (this.mesh !== null) {
            return this.getMesh().scale;
        }
        else if (this.scale !== null && this.scale !== undefined) {
            return this.scale.getScale();
        }
        else {
            return new THREE.Vector3(1, 1, 1);
        }
    };
    MeshComponent.prototype.getRotation = function () {
        if (this.mesh !== null) {
            return this.getMesh().rotation;
        }
        else if (this.scale !== null && this.scale !== undefined) {
            return this.rotation.getRotation();
        }
        else {
            return new THREE.Euler(1, 1, 1);
        }
    };
    MeshComponent.prototype.getGeometry = function () {
        if (this.mesh !== null && this.mesh instanceof THREE.Mesh) {
            return this.mesh.geometry;
        }
        else if (this.geometry !== null && this.geometry !== undefined) {
            return this.geometry.getGeometry();
        }
        else {
            return null;
        }
    };
    MeshComponent.prototype.getPhysiMesh = function () {
        if (this.mesh !== null && this.mesh instanceof PHYSIJS.Mesh) {
            return this.mesh;
        }
        else {
            return null;
        }
    };
    MeshComponent.prototype.getMaterials = function () {
        var materials = [];
        if (this.materials !== null && this.materials.length > 0) {
            this.materials.forEach(function (material) {
                materials.push(material.getMaterial());
            });
        }
        if (materials.length == 0) {
            materials.push(new THREE.MeshBasicMaterial());
        }
        return materials;
    };
    MeshComponent.prototype.setOnChange = function (onChange) {
        this._onChange = onChange;
    };
    MeshComponent.prototype.onChange = function () {
        if (this.mesh !== null) {
            if (this.refObject3d !== null && this.mesh !== null) {
                this.refObject3d.remove(this.mesh);
            }
            this.mesh = null;
            this.resetMesh();
        }
    };
    MeshComponent.prototype.setObject3D = function (refObject3d) {
        if (this.refObject3d !== refObject3d) {
            this.refObject3d = refObject3d;
            this.resetMesh();
        }
    };
    MeshComponent.prototype.setMesh = function (mesh, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        this.mesh = mesh;
        if (this.mesh !== null && isRestore) {
            if (this.position !== null && this.position !== undefined) {
                this.position.setPosition(this.mesh.position, true);
            }
            if (this.rotation !== null && this.rotation !== undefined) {
                this.rotation.setRotation(this.mesh.rotation, true);
            }
            if (this.scale !== null && this.scale !== undefined) {
                this.scale.setScale(this.mesh.scale, true);
            }
        }
    };
    MeshComponent.prototype.resetMesh = function (clearMesh) {
        if (clearMesh === void 0) { clearMesh = false; }
        if (this.refObject3d !== null) {
            if (clearMesh && this.mesh !== null) {
                this.refObject3d.remove(this.mesh);
                this.mesh = null;
            }
            if (clearMesh && this.helper != null) {
                this.refObject3d.remove(this.helper);
                this.helper = null;
            }
            if (this.mesh === null) {
                this.refObject3d.add(this.getMesh());
            }
        }
    };
    MeshComponent.prototype.getObject3D = function () {
        return this.getMesh();
    };
    MeshComponent.prototype.getJson = function () {
        return this.getMesh().toJSON();
    };
    MeshComponent.prototype.setSavelocalStorage = function (storageName) {
        return this.localStorageService.setObject(storageName, this.getMesh());
    };
    MeshComponent.prototype.getMesh = function () {
        var _this = this;
        if (this.mesh === null) {
            var geometry = null;
            if (this.geometry != null && this.geometry != undefined) {
                geometry = this.geometry.getGeometry();
            }
            var basemesh_1 = null;
            switch (this.type.toLowerCase()) {
                case 'light':
                    switch (this.lightType.toLowerCase()) {
                        case 'directional':
                            basemesh_1 = new THREE.DirectionalLight(this.getColor(0xffffff), this.getIntensity(1));
                            basemesh_1.castShadow = this.castShadow;
                            break;
                        case 'hemisphere':
                            basemesh_1 = new THREE.HemisphereLight(this.getSkyColor(0xffffff), this.getGroundColor(0xffffff), this.getIntensity(1));
                            break;
                        case 'point':
                            basemesh_1 = new THREE.PointLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(0), this.getDecay(1));
                            basemesh_1.castShadow = this.castShadow;
                            break;
                        case 'area':
                        case 'rectarea':
                            basemesh_1 = new THREE.RectAreaLight(this.getColor(0xffffff), this.getIntensity(1), this.getWidth(10), this.getHeight(10));
                            break;
                        case 'spot':
                            basemesh_1 = new THREE.SpotLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(0), this.getAngle(60), this.getPenumbra(0), this.getDecay(1));
                            basemesh_1.castShadow = this.castShadow;
                            break;
                        case 'ambient':
                        default:
                            basemesh_1 = new THREE.AmbientLight(this.getColor(0x0c0c0c), this.getIntensity(1));
                            break;
                    }
                    break;
                case 'helper':
                    switch (this.helperType.toLowerCase()) {
                        case 'arrow':
                            /**
                             * @param [dir=new THREE.Vector3( 0, 0, 1 )]
                             * @param [origin=new THREE.Vector3( 0, 0, 0 )]
                             * @param [length=1]
                             * @param [color=0xffff00]
                             * @param headLength
                             * @param headWidth
                             */
                            basemesh_1 = new THREE.ArrowHelper(null // dir: Vector3,
                            // origin?: Vector3,
                            // length?: number,
                            // color?: Color | string | number,
                            // headLength?: number,
                            // headWidth?: number
                            );
                            break;
                        case 'box':
                            /**
                             * @param object
                             * @param [color=0xffff00]
                             */
                            basemesh_1 = new THREE.BoxHelper(null, // object: Object3D,
                            null // color?: Color | string | number
                            );
                            break;
                        case 'box3':
                            basemesh_1 = new THREE.Box3Helper(null);
                            break;
                        case 'camera':
                            basemesh_1 = new THREE.CameraHelper(null);
                            break;
                        case 'directionallight':
                            basemesh_1 = new THREE.DirectionalLightHelper(null);
                            break;
                        case 'grid':
                            basemesh_1 = new THREE.GridHelper(0, 0); // todo
                            break;
                        case 'polargrid':
                            basemesh_1 = new THREE.PolarGridHelper(null, null, null, null, null, null);
                            break;
                        case 'hemispherelight':
                            basemesh_1 = new THREE.HemisphereLightHelper(this.getHelperTarget(), this.getSize(10), this.getColor(0x000000));
                            break;
                        case 'plane':
                            basemesh_1 = new THREE.PlaneHelper(null
                            // this.getHelperTarget() as THREE.Plane
                            );
                            break;
                        case 'pointlight':
                            basemesh_1 = new THREE.PointLightHelper(this.getHelperTarget());
                            break;
                        case 'skeleton':
                            basemesh_1 = new THREE.SkeletonHelper(this.getHelperTarget());
                            break;
                        case 'spotlight':
                            basemesh_1 = new THREE.SpotLightHelper(this.getHelperTarget(), this.getColor(0xffffff));
                            break;
                        case 'axes':
                        default:
                            basemesh_1 = new THREE.AxesHelper(this.getSize(5));
                            break;
                    }
                    break;
                case 'storage':
                    basemesh_1 = new THREE.Object3D();
                    this.localStorageService.getObject(this.storageName, function (loadedMesh) {
                        basemesh_1.add(loadedMesh);
                        if (_this.meshes) {
                            _this.meshes.forEach(function (mesh) {
                                if (mesh.name !== null &&
                                    mesh.name !== undefined &&
                                    mesh.name !== '') {
                                    var foundMesh = basemesh_1.getObjectByName(mesh.name);
                                    if (foundMesh instanceof THREE.Object3D) {
                                        mesh.setMesh(foundMesh, true);
                                    }
                                }
                            });
                        }
                    });
                    break;
                case 'lensflare':
                    var lensflare_1 = new Lensflare_1.Lensflare();
                    this.lensflareElements.forEach(function (lensflareElement) {
                        lensflareElement.setLensflare(lensflare_1);
                    });
                    basemesh_1 = lensflare_1;
                    break;
                case 'multi':
                case 'multimaterial':
                    basemesh_1 = SceneUtils_1.SceneUtils.createMultiMaterialObject(geometry, this.getMaterials());
                    basemesh_1.children.forEach(function (e) {
                        e.castShadow = true;
                    });
                    if (this.scaleStep != 1) {
                        var scaleStep_1 = this.scaleStep;
                        basemesh_1.children.forEach(function (mesh) {
                            mesh.scale.x *= scaleStep_1;
                            mesh.scale.y *= scaleStep_1;
                            mesh.scale.z *= scaleStep_1;
                            scaleStep_1 *= _this.scaleStep;
                        });
                    }
                    break;
                case 'sprite':
                    basemesh_1 = new THREE.Sprite(this.getMaterials()[0]);
                    break;
                case 'points':
                    basemesh_1 = new THREE.Points(geometry, this.getMaterials()[0]);
                    break;
                case 'line':
                    var mesh = new THREE.Line(geometry, this.getMaterials()[0]);
                    mesh.computeLineDistances();
                    basemesh_1 = mesh;
                    break;
                case 'mesh':
                default:
                    var materials = this.getMaterials();
                    if (geometry !== null) {
                        if (materials.length > 1) {
                            basemesh_1 = new THREE.Mesh(geometry, materials);
                        }
                        else if (materials.length == 1) {
                            basemesh_1 = new THREE.Mesh(geometry, materials[0]);
                        }
                        else {
                            basemesh_1 = new THREE.Mesh(geometry);
                        }
                    }
                    else {
                        basemesh_1 = new THREE.Mesh();
                    }
                    basemesh_1.castShadow = this.castShadow;
                    break;
            }
            if (this.meshes && this.meshes.length > 0) {
                var meshBSP_1 = [];
                this.meshes.forEach(function (mesh) {
                    switch (mesh.typeCsg.toLowerCase()) {
                        case 'subtract':
                        case 'intersect':
                        case 'union':
                            mesh.setOnChange(_this);
                            meshBSP_1.push(mesh);
                            break;
                        default:
                            mesh.setObject3D(basemesh_1);
                            break;
                    }
                });
                if (basemesh_1 instanceof THREE.Mesh) {
                    if (meshBSP_1.length > 0) {
                        basemesh_1.updateMatrix();
                        var sourceCsg_1 = geometry !== null ? three_csg_ts_1.CSG.fromMesh(basemesh_1) : null;
                        var matrix = basemesh_1.matrix;
                        meshBSP_1.forEach(function (mesh) {
                            var meshIns = mesh.getMesh();
                            if (meshIns instanceof THREE.Mesh) {
                                meshIns.updateMatrix();
                                var targetBsp = three_csg_ts_1.CSG.fromMesh(meshIns);
                                if (sourceCsg_1 != null) {
                                    switch (mesh.typeCsg) {
                                        case 'subtract':
                                            sourceCsg_1 = sourceCsg_1.subtract(targetBsp);
                                            break;
                                        case 'intersect':
                                            sourceCsg_1 = sourceCsg_1.intersect(targetBsp);
                                            break;
                                        case 'union':
                                            sourceCsg_1 = sourceCsg_1.union(targetBsp);
                                            break;
                                    }
                                }
                                else {
                                    sourceCsg_1 = targetBsp;
                                }
                            }
                        });
                        if (sourceCsg_1 != null) {
                            var mesh = three_csg_ts_1.CSG.toMesh(sourceCsg_1, matrix);
                            var materials_1 = this.getMaterials();
                            if (materials_1.length > 0) {
                                if (mesh.material instanceof Array) {
                                    mesh.material.forEach(function (material) {
                                        material.copy(materials_1[0]);
                                    });
                                }
                                else {
                                    mesh.material = materials_1[0];
                                }
                            }
                            basemesh_1 = mesh;
                        }
                    }
                }
            }
            if (basemesh_1 instanceof THREE.Mesh && basemesh_1.geometry instanceof THREE.Geometry && basemesh_1.material instanceof THREE.Material) {
                switch (this.physiType.toLowerCase()) {
                    case 'box':
                        this.mesh = new PHYSIJS.BoxMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'sphere':
                        this.mesh = new PHYSIJS.SphereMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'cylinder':
                        this.mesh = new PHYSIJS.CylinderMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'capsule':
                        this.mesh = new PHYSIJS.CapsuleMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'cone':
                        this.mesh = new PHYSIJS.ConeMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'concave':
                        this.mesh = new PHYSIJS.ConcaveMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'convex':
                        this.mesh = new PHYSIJS.ConvexMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'capsule':
                        this.mesh = new PHYSIJS.CapsuleMesh(basemesh_1.geometry, basemesh_1.material, this.getMass(1));
                        break;
                    case 'none':
                    default:
                        this.mesh = basemesh_1;
                }
            }
            else {
                this.mesh = basemesh_1;
            }
            if (this.name !== null) {
                this.mesh.name = this.name;
            }
            if (this.position !== null && this.position != undefined) {
                this.position.setPosition(this.mesh.position);
            }
            if (this.rotation !== null && this.rotation != undefined) {
                this.rotation.setRotation(this.mesh.rotation);
            }
            if (this.scale !== null && this.scale != undefined) {
                this.scale.setScale(this.mesh.scale);
            }
            this.mesh.visible = this.visible;
            if (this.svg !== null && this.svg !== undefined) {
                this.svg.setObject3D(this.mesh);
            }
            if (this.mesh instanceof THREE.Mesh ||
                this.mesh instanceof THREE.Points ||
                this.mesh instanceof THREE.Sprite) {
                var mesh_1 = this.mesh;
                if (this.mesh instanceof THREE.Mesh) {
                    mesh_1.castShadow = this.castShadow;
                    mesh_1.receiveShadow = this.receiveShadow;
                }
                if (geometry !== null) {
                    this.geometry.setMesh(mesh_1);
                }
                if (mesh_1.material instanceof Array) {
                    this.materials.forEach(function (material, idx) {
                        if (mesh_1.material[idx])
                            material.setMaterial(mesh_1.material[idx]);
                    });
                }
                else if (this.materials.length == 1) {
                    this.materials.first.setMaterial(mesh_1.material);
                }
            }
            else if (this.mesh instanceof THREE.Group) {
                var meshes = this.mesh.children;
                this.geometry.setMesh(meshes);
                meshes.forEach(function (mesh, idx) {
                    if (mesh.material instanceof Array) {
                        _this.materials[idx].setMaterial(mesh.material[idx]);
                    }
                    else if (_this.materials.length == 0) {
                        _this.materials[idx].setMaterial(mesh.material);
                    }
                });
            }
            else if (this.mesh instanceof THREE.Light) {
                if (this.lookat !== null && this.lookat != undefined) {
                    this.mesh.lookAt(this.lookat.getLookAt());
                    this.lookat.setObject3D(this.mesh);
                }
                if (this.mesh instanceof THREE.SpotLight) {
                    this.mesh.penumbra = this.exponent;
                    var target = this.getTarget(null);
                    if (target != null) {
                        this.mesh.target = target;
                    }
                }
                else if (this.mesh instanceof THREE.DirectionalLight) {
                    var target = this.getTarget(null);
                    if (target != null) {
                        this.mesh.target = target;
                    }
                }
                else if (this.mesh instanceof THREE.RectAreaLight) {
                    if (this.shadowCameraVisible) {
                        var rectLightHelper = new RectAreaLightHelper_js_1.RectAreaLightHelper(this.mesh);
                        this.mesh.add(rectLightHelper);
                    }
                }
                if (this.mesh.shadow) {
                    this.mesh.shadow.mapSize.width = this.getShadowMapSizeWidth(1024);
                    this.mesh.shadow.mapSize.height = this.getShadowMapSizeHeight(1024);
                    if (this.mesh.shadow.camera) {
                        if (this.shadowCameraVisible) {
                            this.helper = new THREE.CameraHelper(this.mesh.shadow.camera);
                        }
                        else {
                            this.helper = null;
                        }
                        if (this.mesh.shadow.camera instanceof THREE.PerspectiveCamera) {
                            this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
                            this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
                            this.mesh.shadow.camera.fov = this.getShadowCameraFov(50);
                        }
                        else if (this.mesh.shadow.camera instanceof THREE.OrthographicCamera) {
                            this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
                            this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
                            this.mesh.shadow.camera.left = this.getShadowCameraLeft(-50);
                            this.mesh.shadow.camera.right = this.getShadowCameraRight(50);
                            this.mesh.shadow.camera.top = this.getShadowCameraTop(50);
                            this.mesh.shadow.camera.bottom = this.getShadowCameraBottom(-50);
                        }
                    }
                    else {
                        this.helper = null;
                    }
                }
                else {
                    this.helper = null;
                }
            }
        }
        return this.mesh;
    };
    var MeshComponent_1;
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "physiType");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "mass");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "lightType");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "helperType");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "typeCsg");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "scaleStep");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "castShadow");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "receiveShadow");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "storageName");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyColor");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "groundColor");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "onlyShadow");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "intensity");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "distance");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "angle");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "penumbra");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "decay");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "exponent");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraVisible");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraNear");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowMapSizeWidth");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowMapSizeHeight");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraFar");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraFov");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraLeft");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraRight");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraTop");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "shadowCameraBottom");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "target");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "size");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "helperTarget");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "camera");
    __decorate([
        core_1.ContentChild(geometry_component_1.GeometryComponent, { descendants: false })
    ], MeshComponent.prototype, "geometry");
    __decorate([
        core_1.ContentChildren(material_component_1.MaterialComponent, { descendants: false })
    ], MeshComponent.prototype, "materials");
    __decorate([
        core_1.ContentChildren(MeshComponent_1, { descendants: false })
    ], MeshComponent.prototype, "meshes");
    __decorate([
        core_1.ContentChildren(lensflareelement_component_1.LensflareelementComponent, { descendants: false })
    ], MeshComponent.prototype, "lensflareElements");
    __decorate([
        core_1.ContentChild(position_component_1.PositionComponent, { descendants: false })
    ], MeshComponent.prototype, "position");
    __decorate([
        core_1.ContentChild(rotation_component_1.RotationComponent, { descendants: false })
    ], MeshComponent.prototype, "rotation");
    __decorate([
        core_1.ContentChild(scale_component_1.ScaleComponent, { descendants: false })
    ], MeshComponent.prototype, "scale");
    __decorate([
        core_1.ContentChild(svg_component_1.SvgComponent, { descendants: false })
    ], MeshComponent.prototype, "svg");
    __decorate([
        core_1.ContentChild(lookat_component_1.LookatComponent, { descendants: false })
    ], MeshComponent.prototype, "lookat");
    MeshComponent = MeshComponent_1 = __decorate([
        core_1.Component({
            selector: 'three-mesh',
            templateUrl: './mesh.component.html',
            styleUrls: ['./mesh.component.scss']
        })
    ], MeshComponent);
    return MeshComponent;
}());
exports.MeshComponent = MeshComponent;
