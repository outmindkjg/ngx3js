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
var core_1 = require("@angular/core");
var THREE = require("three");
var RectAreaLightHelper_js_1 = require("three/examples/jsm/helpers/RectAreaLightHelper.js");
var CSS3DRenderer_js_1 = require("three/examples/jsm/renderers/CSS3DRenderer.js");
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
var texture_component_1 = require("../texture/texture.component");
var audio_component_1 = require("./../audio/audio.component");
var listener_component_1 = require("./../listener/listener.component");
var lookat_component_1 = require("./../lookat/lookat.component");
var mixer_component_1 = require("./../mixer/mixer.component");
var MorphAnimMesh_1 = require("three/examples/jsm/misc/MorphAnimMesh");
var MeshComponent = /** @class */ (function (_super) {
    __extends(MeshComponent, _super);
    function MeshComponent(localStorageService) {
        var _this = _super.call(this) || this;
        _this.localStorageService = localStorageService;
        _this.type = 'mesh';
        _this.mass = null;
        _this.lightType = 'spot';
        _this.css3dType = 'div';
        _this.skyboxType = 'auto';
        _this.skyboxRate = 100;
        _this.skyboxImage = null;
        _this.skyboxCubeImage = null;
        _this.skyboxSunImage = null;
        _this.skyboxSunX = 0;
        _this.skyboxSunY = 0;
        _this.skyboxSunZ = 0;
        _this.helperType = 'none';
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
        _this.helperVisible = null;
        _this.helperTarget = null;
        _this.helperColor = null;
        _this.mesh = null;
        _this.clips = null;
        _this.clipMesh = null;
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
        return interface_1.ThreeUtil.getAngleSafe(this.angle, def);
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
    MeshComponent.prototype.getHelperTarget = function (target) {
        if (this.helperTarget !== null) {
            return this.helperTarget.getMesh();
        }
        else {
            return target;
        }
    };
    MeshComponent.prototype.getHelperVisible = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.helperVisible, def);
    };
    MeshComponent.prototype.getSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.size, def);
    };
    MeshComponent.prototype.getHelperColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.helperColor, def);
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
                    case 'helperVisible':
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
                if (this.helper && changes.helperVisible) {
                    this.helper.visible = this.getHelperVisible(true);
                }
            }
            this.resetMesh();
        }
    };
    MeshComponent.prototype.getPosition = function () {
        if (this.mesh !== null) {
            return this.mesh.position;
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
            return this.mesh.scale;
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
            return this.mesh.rotation;
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
                    'listner',
                    'audio'
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
        this.listner.changes.subscribe(function () {
            _this.synkObject3D(['listner']);
        });
        this.audio.changes.subscribe(function () {
            _this.synkObject3D(['audio']);
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
                        break;
                    case 'geometry':
                        _this.geometry.forEach(function (geometry) {
                            geometry.setObject3D(_this.mesh);
                        });
                        break;
                    case 'svg':
                        _this.svg.forEach(function (svg) {
                            svg.setObject3D(_this.mesh);
                        });
                        break;
                    case 'material':
                        if (_this.clipMesh !== null) {
                            _this.materials.forEach(function (material) {
                                material.setObject3D(_this.clipMesh);
                            });
                        }
                        else {
                            _this.materials.forEach(function (material) {
                                material.setObject3D(_this.mesh);
                            });
                        }
                        break;
                    case 'mixer':
                        if (_this.clips !== null && _this.clips !== undefined) {
                            if (_this.clipMesh !== null && _this.clipMesh !== undefined) {
                                _this.mixer.forEach(function (mixer) {
                                    mixer.setModel(_this.clipMesh, _this.clips);
                                });
                            }
                            else {
                                _this.mixer.forEach(function (mixer) {
                                    mixer.setModel(_this.mesh, _this.clips);
                                });
                            }
                        }
                        break;
                    case 'listner':
                        _this.listner.forEach(function (listner) {
                            listner.setObject3D(_this.mesh);
                        });
                        break;
                    case 'audio':
                        _this.audio.forEach(function (audio) {
                            audio.setObject3D(_this.mesh);
                        });
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
            this.refObject3d.add(this.getMesh());
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
                case 'css3d':
                    var element = null;
                    switch (this.css3dType.toLowerCase()) {
                        case 'img':
                            element = document.createElement('img');
                            break;
                        case 'span':
                            element = document.createElement('span');
                            break;
                        case 'button':
                            element = document.createElement('button');
                            break;
                        case 'div':
                        default:
                            element = document.createElement('div');
                            break;
                    }
                    element.style.width = this.getWidth(1) + 'px';
                    element.style.overflow = 'hidden';
                    element.classList.add('test');
                    element.innerHTML = "우리는민족중흥의";
                    var cssele = new CSS3DRenderer_js_1.CSS3DObject(element);
                    var cssgeo = new THREE.BoxGeometry(this.getWidth(1), this.getHeight(1), 0.1);
                    var cssmat = new THREE.MeshPhongMaterial({
                        opacity: 0.15,
                        transparent: true,
                        color: new THREE.Color(0x111111),
                        blending: THREE.NoBlending
                    });
                    basemesh_1 = new THREE.Mesh(cssgeo, cssmat);
                    basemesh_1.receiveShadow = true;
                    basemesh_1.castShadow = true;
                    basemesh_1.add(cssele);
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
                            basemesh_1 = new THREE.PointLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(), this.getDecay());
                            basemesh_1.castShadow = this.castShadow;
                            break;
                        case 'area':
                        case 'rectarea':
                            basemesh_1 = new THREE.RectAreaLight(this.getColor(0xffffff), this.getIntensity(1), this.getWidth(10), this.getHeight(10));
                            break;
                        case 'spot':
                            basemesh_1 = new THREE.SpotLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(), this.getAngle(), this.getPenumbra(), this.getDecay());
                            basemesh_1.castShadow = this.castShadow;
                            break;
                        case 'ambient':
                        default:
                            basemesh_1 = new THREE.AmbientLight(this.getColor(0x0c0c0c), this.getIntensity(1));
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
                        this.localStorageService.getObject(this.storageName, function (loadedMesh, clips, geometry) {
                            if (loadedMesh !== null && loadedMesh !== undefined) {
                                if (_this.castShadow) {
                                    loadedMesh.traverse(function (object) {
                                        if (object instanceof THREE.Mesh) {
                                            object.castShadow = true;
                                        }
                                    });
                                }
                                _this.mesh.add(loadedMesh);
                            }
                            else if (geometry !== null) {
                                if (geometry['animations'] !== null && geometry['animations'] !== undefined && geometry['animations'].length > 0) {
                                    var morphAnim = new MorphAnimMesh_1.MorphAnimMesh(geometry, _this.getMaterials()[0]);
                                    loadedMesh = morphAnim;
                                    _this.mesh.add(loadedMesh);
                                    clips = geometry['animations'];
                                }
                                else {
                                    loadedMesh = new THREE.Mesh(geometry, _this.getMaterials()[0]);
                                    _this.mesh.add(loadedMesh);
                                }
                            }
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
                            }
                            _this.clipMesh = loadedMesh;
                            _this.synkObject3D(['mixer', 'material']);
                            _this.resetHelper();
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
                this.meshes.forEach(function (mesh) {
                    mesh.setObject3D(basemesh_1);
                });
            }
            this.mesh = basemesh_1;
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
                if (this.mesh instanceof THREE.SpotLight || this.mesh instanceof THREE.DirectionalLight) {
                    var target = this.getTarget(null);
                    if (target != null) {
                        this.mesh.target = target;
                    }
                }
                if (this.mesh.shadow) {
                    this.mesh.shadow.mapSize.width = this.getShadowMapSizeWidth(512);
                    this.mesh.shadow.mapSize.height = this.getShadowMapSizeHeight(512);
                    if (this.mesh.shadow.camera) {
                        if (this.mesh.shadow.camera instanceof THREE.PerspectiveCamera) {
                            this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
                            this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
                            this.mesh.shadow.camera.fov = this.getShadowCameraFov(50);
                        }
                        else if (this.mesh.shadow.camera instanceof THREE.OrthographicCamera) {
                            this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
                            this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
                            this.mesh.shadow.camera.left = this.getShadowCameraLeft(-1);
                            this.mesh.shadow.camera.right = this.getShadowCameraRight(1);
                            this.mesh.shadow.camera.top = this.getShadowCameraTop(1);
                            this.mesh.shadow.camera.bottom = this.getShadowCameraBottom(-1);
                        }
                    }
                    this.mesh.shadow.updateMatrices(this.mesh);
                }
            }
            if (this.helper == null) {
                this.resetHelper();
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
                'listner',
                'audio'
            ]);
        }
        return this.mesh;
    };
    MeshComponent.prototype.resetHelper = function () {
        var _this = this;
        if (this.refObject3d !== null) {
            if (this.helper !== null && this.helper.parent !== null) {
                this.helper.parent.remove(this.helper);
            }
            var basemesh_2 = null;
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
                    basemesh_2 = new THREE.ArrowHelper(null // dir: Vector3,
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
                    basemesh_2 = new THREE.BoxHelper(null, // object: Object3D,
                    null // color?: Color | string | number
                    );
                    break;
                case 'box3':
                    basemesh_2 = new THREE.Box3Helper(null);
                    break;
                case 'grid':
                    basemesh_2 = new THREE.GridHelper(0, 0); // todo
                    break;
                case 'polargrid':
                    basemesh_2 = new THREE.PolarGridHelper(null, null, null, null, null, null);
                    break;
                case 'camera':
                    {
                        var helperTarget = this.getHelperTarget(this.mesh);
                        if (helperTarget instanceof THREE.Light && helperTarget.shadow.camera) {
                            basemesh_2 = new THREE.CameraHelper(helperTarget.shadow.camera);
                        }
                        else if (helperTarget instanceof THREE.Camera) {
                            basemesh_2 = new THREE.CameraHelper(helperTarget);
                        }
                    }
                    break;
                case 'directionallight':
                case 'hemispherelight':
                case 'rectarealight':
                case 'pointlight':
                case 'spotlight':
                case 'light':
                    {
                        var helperTarget = this.getHelperTarget(this.mesh);
                        if (helperTarget instanceof THREE.DirectionalLight) {
                            basemesh_2 = new THREE.DirectionalLightHelper(helperTarget, this.getSize(10), this.getHelperColor(0xff0000));
                        }
                        else if (helperTarget instanceof THREE.HemisphereLight) {
                            basemesh_2 = new THREE.HemisphereLightHelper(helperTarget, this.getSize(10), this.getHelperColor(0xff0000));
                        }
                        else if (helperTarget instanceof THREE.PointLight) {
                            basemesh_2 = new THREE.PointLightHelper(helperTarget, this.getSize(10), this.getHelperColor(0xff0000));
                        }
                        else if (helperTarget instanceof THREE.SpotLight) {
                            basemesh_2 = new THREE.SpotLightHelper(helperTarget, this.getHelperColor(0xff0000));
                        }
                        else if (helperTarget instanceof THREE.RectAreaLight) {
                            basemesh_2 = new RectAreaLightHelper_js_1.RectAreaLightHelper(helperTarget, this.getHelperColor(0xff0000));
                        }
                    }
                    break;
                case 'plane':
                    if (this.mesh instanceof THREE.Mesh && this.mesh.material instanceof THREE.Material) {
                        basemesh_2 = new THREE.Group();
                        var clippingPlanes = this.mesh.material.clippingPlanes;
                        if (clippingPlanes !== null && clippingPlanes !== undefined) {
                            clippingPlanes.forEach(function (clippingPlane) {
                                basemesh_2.add(new THREE.PlaneHelper(clippingPlane, _this.getSize(10), _this.getHelperColor(0xff0000).getHex()));
                            });
                        }
                    }
                    else {
                        basemesh_2 = null;
                    }
                    break;
                case 'skeleton':
                    if (this.clipMesh !== null) {
                        basemesh_2 = new THREE.SkeletonHelper(this.clipMesh);
                    }
                    else {
                        basemesh_2 = new THREE.SkeletonHelper(this.mesh);
                    }
                    break;
                case 'axes':
                    basemesh_2 = new THREE.AxesHelper(this.getSize(10));
                    this.mesh.add(basemesh_2);
                    break;
            }
            if (basemesh_2 !== null) {
                this.helper = basemesh_2;
                this.helper.visible = this.getHelperVisible(true);
                if (this.refObject3d !== null && (this.helper.parent == null || this.helper.parent == undefined)) {
                    this.refObject3d.add(this.helper);
                }
            }
            else {
                this.helper = null;
            }
        }
    };
    var MeshComponent_1;
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "mass");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "lightType");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "css3dType");
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
    ], MeshComponent.prototype, "helperVisible");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "helperTarget");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "helperColor");
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
    __decorate([
        core_1.ContentChildren(listener_component_1.ListenerComponent, { descendants: false })
    ], MeshComponent.prototype, "listner");
    __decorate([
        core_1.ContentChildren(audio_component_1.AudioComponent, { descendants: false })
    ], MeshComponent.prototype, "audio");
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
