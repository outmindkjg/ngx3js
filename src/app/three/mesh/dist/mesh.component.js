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
exports.MeshComponent = void 0;
var mixer_component_1 = require("./../mixer/mixer.component");
var core_1 = require("@angular/core");
var PHYSIJS = require("./../physijs/src");
var THREE = require("three");
var three_csg_ts_1 = require("three-csg-ts");
var RectAreaLightHelper_js_1 = require("three/examples/jsm/helpers/RectAreaLightHelper.js");
var Lensflare_1 = require("three/examples/jsm/objects/Lensflare");
var SceneUtils_1 = require("three/examples/jsm/utils/SceneUtils");
var geometry_component_1 = require("../geometry/geometry.component");
var interface_1 = require("../interface");
var lensflareelement_component_1 = require("../lensflareelement/lensflareelement.component");
var material_component_1 = require("../material/material.component");
var position_component_1 = require("../position/position.component");
var rotation_component_1 = require("../rotation/rotation.component");
var scale_component_1 = require("../scale/scale.component");
var svg_component_1 = require("../svg/svg.component");
var lookat_component_1 = require("./../lookat/lookat.component");
var texture_component_1 = require("../texture/texture.component");
var MeshComponent = /** @class */ (function (_super) {
    __extends(MeshComponent, _super);
    function MeshComponent(localStorageService) {
        var _this = _super.call(this) || this;
        _this.localStorageService = localStorageService;
        _this.type = 'mesh';
        _this.physiType = 'none';
        _this.mass = null;
        _this.lightType = 'spot';
        _this.skyboxType = 'auto';
        _this.skyboxRate = 100;
        _this.skyboxImage = null;
        _this.skyboxCubeImage = null;
        _this.skyboxSunImage = null;
        _this.skyboxSunX = 0;
        _this.skyboxSunY = 0;
        _this.skyboxSunZ = 0;
        _this.helperType = 'axis';
        _this.typeCsg = 'none';
        _this.scaleStep = 1;
        _this.visible = true;
        _this.castShadow = true;
        _this.receiveShadow = false;
        _this.name = null;
        _this.storageName = null;
        _this.color = null;
        _this.skyColor = null;
        _this.groundColor = null;
        _this.onlyShadow = null;
        _this.intensity = null;
        _this.distance = null;
        _this.angle = null;
        _this.penumbra = null;
        _this.decay = null;
        _this.width = null;
        _this.height = null;
        _this.exponent = null;
        _this.shadowCameraVisible = false;
        _this.shadowCameraNear = null;
        _this.shadowMapSizeWidth = null;
        _this.shadowMapSizeHeight = null;
        _this.shadowCameraFar = null;
        _this.shadowCameraFov = null;
        _this.shadowCameraLeft = null;
        _this.shadowCameraRight = null;
        _this.shadowCameraTop = null;
        _this.shadowCameraBottom = null;
        _this.target = null;
        _this.size = null;
        _this.skeleton = null;
        _this.skeletonVisible = null;
        _this.helperTarget = null;
        _this.mesh = null;
        _this.clips = null;
        _this.helper = null;
        _this.refObject3d = null;
        return _this;
    }
    MeshComponent_1 = MeshComponent;
    MeshComponent.prototype.getMass = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.mass, def);
    };
    MeshComponent.prototype.getSkyboxSize = function (def) {
        var skyboxSize = interface_1.ThreeUtil.getTypeSafe(this.distance, def, 10000);
        if (interface_1.ThreeUtil.isNotNull(skyboxSize)) {
            return (skyboxSize * this.skyboxRate) / 100;
        }
        else {
            return 10000;
        }
    };
    MeshComponent.prototype.getSkySunPosition = function () {
        return new THREE.Euler(interface_1.ThreeUtil.getAngleSafe(this.skyboxSunX, 0), interface_1.ThreeUtil.getAngleSafe(this.skyboxSunY, 0), interface_1.ThreeUtil.getAngleSafe(this.skyboxSunZ, 0));
    };
    MeshComponent.prototype.getIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.intensity, def);
    };
    MeshComponent.prototype.getDistance = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.distance, def);
    };
    MeshComponent.prototype.getAngle = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.angle, def);
    };
    MeshComponent.prototype.getPenumbra = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.penumbra, def);
    };
    MeshComponent.prototype.getDecay = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.decay, def);
    };
    MeshComponent.prototype.getWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.width, def);
    };
    MeshComponent.prototype.getHeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.height, def);
    };
    MeshComponent.prototype.getColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color, def);
    };
    MeshComponent.prototype.getSkyColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.skyColor, def);
    };
    MeshComponent.prototype.getGroundColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.groundColor, def);
    };
    MeshComponent.prototype.getShadowMapSizeWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowMapSizeWidth, def);
    };
    MeshComponent.prototype.getShadowMapSizeHeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowMapSizeHeight, def);
    };
    MeshComponent.prototype.getShadowCameraNear = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraNear, def);
    };
    MeshComponent.prototype.getShadowCameraFar = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraFar, def);
    };
    MeshComponent.prototype.getShadowCameraFov = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraFov, def);
    };
    MeshComponent.prototype.getShadowCameraLeft = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraLeft, def);
    };
    MeshComponent.prototype.getShadowCameraRight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraRight, def);
    };
    MeshComponent.prototype.getShadowCameraTop = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraTop, def);
    };
    MeshComponent.prototype.getShadowCameraBottom = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraBottom, def);
    };
    MeshComponent.prototype.getTarget = function (def) {
        var target = interface_1.ThreeUtil.getTypeSafe(this.target, def);
        if (target !== null && target !== undefined) {
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
    MeshComponent.prototype.getSkeleton = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.skeleton, def);
    };
    MeshComponent.prototype.getSkeletonVisible = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.skeletonVisible, def);
    };
    MeshComponent.prototype.getSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.size, def);
    };
    MeshComponent.prototype.ngOnInit = function () { };
    MeshComponent.prototype.ngOnDestroy = function () {
        if (this.mesh != null && this.refObject3d != null) {
            this.refObject3d.remove(this.mesh);
        }
    };
    MeshComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes) {
            Object.entries(changes).forEach(function (_a) {
                var key = _a[0], value = _a[1];
                switch (key) {
                    case 'skeletonVisible':
                    case 'visible':
                        break;
                    default:
                        if (_this.refObject3d !== null && _this.mesh !== null) {
                            _this.refObject3d.remove(_this.mesh);
                            _this.mesh = null;
                        }
                        break;
                }
            });
            if (this.mesh) {
                if (changes.visible) {
                    this.mesh.visible = this.visible;
                }
                if (this.helper && changes.skeletonVisible) {
                    this.helper.visible = this.skeletonVisible;
                }
            }
            this.resetMesh();
        }
    };
    MeshComponent.prototype.getPosition = function () {
        if (this.mesh !== null) {
            return this.getMesh().position;
        }
        else if (this.position !== null && this.position.length > 0) {
            return this.position.first.getPosition();
        }
        else {
            return new THREE.Vector3(0, 0, 0);
        }
    };
    MeshComponent.prototype.getScale = function () {
        if (this.mesh !== null) {
            return this.getMesh().scale;
        }
        else if (this.scale !== null && this.scale.length > 0) {
            return this.scale.first.getScale();
        }
        else {
            return new THREE.Vector3(1, 1, 1);
        }
    };
    MeshComponent.prototype.getRotation = function () {
        if (this.mesh !== null) {
            return this.getMesh().rotation;
        }
        else if (this.scale !== null && this.scale.length > 0) {
            return this.rotation.first.getRotation();
        }
        else {
            return new THREE.Euler(0, 0, 0);
        }
    };
    MeshComponent.prototype.getGeometry = function () {
        if (this.mesh !== null && this.mesh instanceof THREE.Mesh) {
            return this.mesh.geometry;
        }
        else if (this.geometry !== null && this.geometry.length > 0) {
            return this.geometry.first.getGeometry();
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
    MeshComponent.prototype.setObject3D = function (refObject3d, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (isRestore) {
            if (this.refObject3d !== refObject3d.parent) {
                this.refObject3d = refObject3d.parent;
                this.mesh = refObject3d;
                this.synkObject3D([
                    'position',
                    'rotation',
                    'scale',
                    'lookat',
                    'mesh',
                    'geometry',
                    'material',
                    'svg',
                ]);
            }
        }
        else {
            if (this.refObject3d !== refObject3d) {
                this.refObject3d = refObject3d;
                this.resetMesh(true);
            }
        }
    };
    MeshComponent.prototype.ngAfterContentInit = function () {
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
        this.geometry.changes.subscribe(function (e) {
            _this.synkObject3D(['geometry']);
        });
        this.svg.changes.subscribe(function (e) {
            _this.synkObject3D(['svg']);
        });
        this.materials.changes.subscribe(function (e) {
            _this.synkObject3D(['material']);
        });
    };
    MeshComponent.prototype.synkObject3D = function (synkTypes) {
        var _this = this;
        if (this.mesh !== null) {
            synkTypes.forEach(function (synkType) {
                switch (synkType) {
                    case 'position':
                        _this.position.forEach(function (position) {
                            position.setObject3D(_this.mesh);
                        });
                        break;
                    case 'rotation':
                        _this.rotation.forEach(function (rotation) {
                            rotation.setObject3D(_this.mesh);
                        });
                        break;
                    case 'scale':
                        _this.scale.forEach(function (scale) {
                            scale.setObject3D(_this.mesh);
                        });
                        break;
                    case 'lookat':
                        _this.lookat.forEach(function (lookat) {
                            lookat.setObject3D(_this.mesh);
                        });
                        break;
                    case 'mesh':
                        _this.meshes.forEach(function (mesh) {
                            mesh.setObject3D(_this.mesh);
                        });
                    case 'geometry':
                        _this.geometry.forEach(function (geometry) {
                            geometry.setObject3D(_this.mesh);
                        });
                    case 'svg':
                        _this.svg.forEach(function (svg) {
                            svg.setObject3D(_this.mesh);
                        });
                    case 'material':
                        _this.materials.forEach(function (mesh, seqn) {
                            mesh.setObject3D(_this.mesh, seqn);
                        });
                        break;
                    case 'mixer':
                        if (_this.clips !== null && _this.clips !== undefined) {
                            _this.mixer.forEach(function (mixer) {
                                mixer.setModel(_this.mesh, _this.clips);
                            });
                        }
                        break;
                }
            });
        }
    };
    MeshComponent.prototype.resetMesh = function (clearMesh) {
        if (clearMesh === void 0) { clearMesh = false; }
        if (this.refObject3d !== null) {
            if (clearMesh && this.mesh !== null && this.mesh.parent) {
                this.mesh.parent.remove(this.mesh);
                this.mesh = null;
            }
            if (clearMesh && this.helper != null && this.helper.parent != null) {
                this.helper.parent.remove(this.helper);
                this.helper = null;
            }
            if (this.mesh === null && this.typeCsg == 'none') {
                this.refObject3d.add(this.getMesh());
                console.log('resetMesh');
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
            if (this.geometry != null && this.geometry.length > 0) {
                geometry = this.getGeometry();
            }
            var basemesh_1 = null;
            switch (this.type.toLowerCase()) {
                case 'skybox':
                    var skyboxSize = this.getSkyboxSize(1500);
                    switch (this.skyboxType.toLowerCase()) {
                        case 'sun':
                            var lensflare_1 = new Lensflare_1.Lensflare();
                            lensflare_1.addElement(new Lensflare_1.LensflareElement(texture_component_1.TextureComponent.getTextureImage(this.skyboxSunImage), this.getSize(100), 0, this.getColor(null)));
                            lensflare_1.position.set(0, 0, skyboxSize * 0.99);
                            lensflare_1.position.applyEuler(this.getSkySunPosition());
                            basemesh_1 = lensflare_1;
                            break;
                        case 'box':
                        case 'sphere':
                        default:
                            var skyGeometry = null;
                            var skyMaterial = null;
                            switch (this.skyboxType.toLowerCase()) {
                                case 'box':
                                    skyGeometry = new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize);
                                    break;
                                case 'sphere':
                                default:
                                    skyGeometry = new THREE.SphereGeometry(skyboxSize, 8, 6);
                                    break;
                            }
                            if (interface_1.ThreeUtil.isNotNull(this.skyboxImage) ||
                                interface_1.ThreeUtil.isNotNull(this.skyboxCubeImage)) {
                                var envMap = texture_component_1.TextureComponent.getTextureImage(this.skyboxImage, this.skyboxCubeImage);
                                // envMap.flipY = true;
                                skyMaterial = new THREE.MeshBasicMaterial({
                                    depthTest: false,
                                    // depthWrite : false,
                                    envMap: envMap,
                                    side: THREE.BackSide
                                });
                            }
                            else {
                                skyMaterial = new THREE.MeshBasicMaterial({
                                    depthTest: false,
                                    // depthWrite : false,
                                    color: this.getSkyColor(0xff0000),
                                    side: THREE.BackSide
                                });
                            }
                            basemesh_1 = new THREE.Mesh(skyGeometry, skyMaterial);
                            basemesh_1.receiveShadow = false;
                            basemesh_1.castShadow = false;
                            break;
                    }
                    break;
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
                case 'lensflare':
                    var lensflare_2 = new Lensflare_1.Lensflare();
                    this.lensflareElements.forEach(function (lensflareElement) {
                        lensflareElement.setLensflare(lensflare_2);
                    });
                    basemesh_1 = lensflare_2;
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
                    if (interface_1.ThreeUtil.isNotNull(this.storageName)) {
                        basemesh_1 = new THREE.Object3D();
                        this.localStorageService.getObject(this.storageName, function (loadedMesh, clips) {
                            if (_this.castShadow) {
                                loadedMesh.traverse(function (object) {
                                    if (object instanceof THREE.Mesh) {
                                        object.castShadow = true;
                                    }
                                });
                            }
                            console.log(clips);
                            if (_this.getSkeleton(false)) {
                                _this.helper = new THREE.SkeletonHelper(loadedMesh);
                                _this.helper.visible = _this.getSkeletonVisible(true);
                                _this.mesh.parent.add(_this.helper);
                            }
                            _this.mesh.add(loadedMesh);
                            if (_this.meshes) {
                                _this.meshes.forEach(function (mesh) {
                                    if (mesh.name !== null &&
                                        mesh.name !== undefined &&
                                        mesh.name !== '') {
                                        var foundMesh = basemesh_1.getObjectByName(mesh.name);
                                        if (foundMesh instanceof THREE.Object3D) {
                                            mesh.setObject3D(foundMesh, true);
                                        }
                                    }
                                });
                            }
                            if (clips !== null && clips !== undefined) {
                                _this.clips = clips;
                                console.log(clips);
                                _this.synkObject3D(['mixer']);
                            }
                        });
                    }
                    else {
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
                    }
            }
            if (this.meshes && this.meshes.length > 0) {
                var meshBSP_1 = [];
                this.meshes.forEach(function (mesh) {
                    switch (mesh.typeCsg.toLowerCase()) {
                        case 'subtract':
                        case 'intersect':
                        case 'union':
                            meshBSP_1.push(mesh);
                            break;
                        default:
                            // mesh.setObject3D(basemesh);
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
                                    switch (mesh.typeCsg.toLowerCase()) {
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
            if (basemesh_1 instanceof THREE.Mesh &&
                (basemesh_1.geometry instanceof THREE.Geometry ||
                    basemesh_1.geometry instanceof THREE.BufferGeometry) &&
                basemesh_1.material instanceof THREE.Material) {
                switch (this.physiType.toLowerCase()) {
                    case 'box':
                        this.mesh = new PHYSIJS.BoxMesh(basemesh_1.geometry, PHYSIJS.createMaterial(basemesh_1.material, 0.9, 0), this.getMass(1));
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
            this.mesh.visible = this.visible;
            if (this.mesh instanceof THREE.Mesh ||
                this.mesh instanceof THREE.Points ||
                this.mesh instanceof THREE.Sprite) {
                var mesh = this.mesh;
                if (this.mesh instanceof THREE.Mesh) {
                    mesh.castShadow = this.castShadow;
                    mesh.receiveShadow = this.receiveShadow;
                }
            }
            else if (this.mesh instanceof THREE.Light) {
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
            this.synkObject3D([
                'position',
                'rotation',
                'scale',
                'lookat',
                'mesh',
                'geometry',
                'material',
                'svg',
            ]);
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
    ], MeshComponent.prototype, "skyboxType");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyboxRate");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyboxImage");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyboxCubeImage");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyboxSunImage");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyboxSunX");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyboxSunY");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skyboxSunZ");
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
    ], MeshComponent.prototype, "skeleton");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "skeletonVisible");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "helperTarget");
    __decorate([
        core_1.ContentChildren(geometry_component_1.GeometryComponent, { descendants: false })
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
        core_1.ContentChildren(position_component_1.PositionComponent, { descendants: false })
    ], MeshComponent.prototype, "position");
    __decorate([
        core_1.ContentChildren(rotation_component_1.RotationComponent, { descendants: false })
    ], MeshComponent.prototype, "rotation");
    __decorate([
        core_1.ContentChildren(scale_component_1.ScaleComponent, { descendants: false })
    ], MeshComponent.prototype, "scale");
    __decorate([
        core_1.ContentChildren(lookat_component_1.LookatComponent, { descendants: false })
    ], MeshComponent.prototype, "lookat");
    __decorate([
        core_1.ContentChildren(svg_component_1.SvgComponent, { descendants: false })
    ], MeshComponent.prototype, "svg");
    __decorate([
        core_1.ContentChildren(mixer_component_1.MixerComponent, { descendants: false })
    ], MeshComponent.prototype, "mixer");
    MeshComponent = MeshComponent_1 = __decorate([
        core_1.Component({
            selector: 'three-mesh',
            templateUrl: './mesh.component.html',
            styleUrls: ['./mesh.component.scss']
        })
    ], MeshComponent);
    return MeshComponent;
}(interface_1.AbstractMeshComponent));
exports.MeshComponent = MeshComponent;
