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
var light_component_1 = require("./../light/light.component");
var helper_component_1 = require("./../helper/helper.component");
var camera_component_1 = require("./../camera/camera.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var MorphAnimMesh_1 = require("three/examples/jsm/misc/MorphAnimMesh");
var Lensflare_1 = require("three/examples/jsm/objects/Lensflare");
var CSS2DRenderer_js_1 = require("three/examples/jsm/renderers/CSS2DRenderer.js");
var CSS3DRenderer_js_1 = require("three/examples/jsm/renderers/CSS3DRenderer.js");
var SceneUtils_1 = require("three/examples/jsm/utils/SceneUtils");
var geometry_component_1 = require("../geometry/geometry.component");
var html_component_1 = require("../html/html.component");
var interface_1 = require("../interface");
var lensflareelement_component_1 = require("../lensflareelement/lensflareelement.component");
var material_component_1 = require("../material/material.component");
var object3d_abstract_1 = require("../object3d.abstract");
var svg_component_1 = require("../svg/svg.component");
var texture_component_1 = require("../texture/texture.component");
var audio_component_1 = require("./../audio/audio.component");
var listener_component_1 = require("./../listener/listener.component");
var mixer_component_1 = require("./../mixer/mixer.component");
var rigidbody_component_1 = require("./../rigidbody/rigidbody.component");
var MeshComponent = /** @class */ (function (_super) {
    __extends(MeshComponent, _super);
    function MeshComponent(localStorageService) {
        var _this = _super.call(this) || this;
        _this.localStorageService = localStorageService;
        _this.type = 'mesh';
        _this.lightType = 'spot';
        _this.cssStyle = null;
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
        _this.castShadow = true;
        _this.receiveShadow = false;
        _this.storageName = null;
        _this.storageOption = null;
        _this.color = null;
        _this.skyColor = null;
        _this.groundColor = null;
        _this.intensity = null;
        _this.distance = null;
        _this.angle = null;
        _this.penumbra = null;
        _this.decay = null;
        _this.width = null;
        _this.height = null;
        _this.count = null;
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
        _this.radius = null;
        _this.radials = null;
        _this.circles = null;
        _this.divisions = null;
        _this.color1 = null;
        _this.color2 = null;
        _this.helperOpacity = null;
        _this.dirX = null;
        _this.dirY = null;
        _this.dirZ = null;
        _this.originX = null;
        _this.originY = null;
        _this.originZ = null;
        _this.length = null;
        _this.headLength = null;
        _this.headWidth = null;
        _this.onLoad = new core_1.EventEmitter();
        _this.clips = null;
        _this.clipMesh = null;
        _this.helper = null;
        _this.cssClazzName = null;
        _this.mesh = null;
        return _this;
    }
    MeshComponent_1 = MeshComponent;
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
    MeshComponent.prototype.getDistance = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.distance, def);
    };
    MeshComponent.prototype.getWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.width, def);
    };
    MeshComponent.prototype.getHeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.height, def);
    };
    MeshComponent.prototype.getCount = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.count, def);
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
    MeshComponent.prototype.getHelperVisible = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.helperVisible, def);
    };
    MeshComponent.prototype.getSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.size, def);
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
                        if (_this.parent !== null && _this.object3d !== null) {
                            _this.parent.remove(_this.object3d);
                            _this.object3d = null;
                        }
                        break;
                }
            });
            if (this.object3d) {
                if (changes.visible) {
                    this.object3d.visible = this.visible;
                }
                if (this.helper && changes.helperVisible) {
                    this.helper.visible = this.getHelperVisible(true);
                }
            }
            this.resetMesh();
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    MeshComponent.prototype.getGeometry = function () {
        if (this.object3d !== null && this.object3d instanceof THREE.Mesh) {
            return this.object3d.geometry;
        }
        else if (this.geometry !== null && this.geometry.length > 0) {
            return this.geometry.first.getGeometry();
        }
        else {
            return null;
        }
    };
    MeshComponent.prototype.getMaterials = function (parameters) {
        var materials = [];
        if (this.materials !== null && this.materials.length > 0) {
            this.materials.forEach(function (material) {
                if (material.materialType === 'material') {
                    materials.push(material.getMaterial());
                }
            });
        }
        if (materials.length == 0) {
            materials.push(new THREE.MeshPhongMaterial(parameters));
        }
        return materials;
    };
    MeshComponent.prototype.setParent = function (parent, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (_super.prototype.setParent.call(this, parent, isRestore)) {
            if (isRestore) {
                this.object3d = parent;
                this.applyChanges3D([
                    'position',
                    'rotation',
                    'scale',
                    'lookat',
                    'rigidbody',
                    'meshes',
                    'cameras',
                    'helpers',
                    'lights',
                    'geometry',
                    'material',
                    'svg',
                    'listner',
                    'audio',
                    'controller',
                ]);
            }
            else {
                this.resetMesh(true);
            }
            return true;
        }
        return false;
    };
    MeshComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.meshes.changes.subscribe(function (e) {
            _this.applyChanges3D(['meshes']);
        });
        this.cameras.changes.subscribe(function (e) {
            _this.applyChanges3D(['cameras']);
        });
        this.helpers.changes.subscribe(function (e) {
            _this.applyChanges3D(['helpers']);
        });
        this.lights.changes.subscribe(function (e) {
            _this.applyChanges3D(['lights']);
        });
        this.rigidbody.changes.subscribe(function (e) {
            _this.applyChanges3D(['rigidbody']);
        });
        this.geometry.changes.subscribe(function (e) {
            _this.applyChanges3D(['geometry']);
        });
        this.svg.changes.subscribe(function (e) {
            _this.applyChanges3D(['svg']);
        });
        this.materials.changes.subscribe(function (e) {
            _this.applyChanges3D(['material']);
        });
        this.listner.changes.subscribe(function () {
            _this.applyChanges3D(['listner']);
        });
        this.audio.changes.subscribe(function () {
            _this.applyChanges3D(['audio']);
        });
        this.cssChildren.changes.subscribe(function () {
            _this.applyChanges3D(['cssChildren']);
        });
        _super.prototype.ngAfterContentInit.call(this);
    };
    MeshComponent.prototype.setWireFrame = function (wireframe, child) {
        var _this = this;
        if (child === void 0) { child = null; }
        if (child === null) {
            child = this.object3d;
        }
        if (child instanceof THREE.Mesh &&
            child.material instanceof THREE.Material &&
            child.material['wireframe'] !== undefined) {
            child.material['wireframe'] = wireframe;
        }
        child.children.forEach(function (obj) {
            _this.setWireFrame(wireframe, obj);
        });
    };
    MeshComponent.prototype.setVisible = function (visible, helperVisible) {
        if (helperVisible === void 0) { helperVisible = null; }
        if (visible !== null && visible !== undefined) {
            this.object3d.visible = visible;
        }
        if (this.helper !== null &&
            helperVisible !== null &&
            helperVisible !== undefined) {
            this.helper.visible = helperVisible;
        }
    };
    MeshComponent.prototype.applyChanges3D = function (changes) {
        var _this = this;
        if (this.mesh !== null) {
            changes.forEach(function (change) {
                switch (change) {
                    case 'meshes':
                        _this.meshes.forEach(function (mesh) {
                            mesh.setParent(_this.mesh);
                        });
                        break;
                    case 'cameras':
                        _this.cameras.forEach(function (camera) {
                            camera.setParent(_this.mesh);
                        });
                        break;
                    case 'helpers':
                        _this.helpers.forEach(function (helper) {
                            helper.setParent(_this.mesh);
                        });
                        break;
                    case 'lights':
                        _this.lights.forEach(function (light) {
                            light.setParent(_this.mesh);
                        });
                        break;
                    case 'rigidbody':
                        _this.rigidbody.forEach(function (rigidbody) {
                            rigidbody.setParent(_this.mesh);
                        });
                        break;
                    case 'geometry':
                        _this.geometry.forEach(function (geometry) {
                            geometry.setParent(_this.mesh);
                        });
                        break;
                    case 'svg':
                        _this.svg.forEach(function (svg) {
                            svg.setParent(_this.mesh);
                        });
                        break;
                    case 'material':
                        if (_this.clipMesh !== null) {
                            _this.materials.forEach(function (material) {
                                material.setParent(_this.clipMesh);
                            });
                        }
                        else {
                            _this.materials.forEach(function (material) {
                                material.setParent(_this.mesh);
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
                            listner.setParent(_this.mesh);
                        });
                        break;
                    case 'audio':
                        _this.audio.forEach(function (audio) {
                            audio.setParent(_this.mesh);
                        });
                        break;
                    case 'cssChildren':
                        _this.cssChildren.forEach(function (cssChild) {
                            cssChild.setParent(_this.mesh);
                        });
                        break;
                }
            });
            _super.prototype.applyChanges3D.call(this, changes);
        }
    };
    MeshComponent.prototype.resetMesh = function (clearMesh) {
        if (clearMesh === void 0) { clearMesh = false; }
        if (this.parent !== null) {
            if (clearMesh && this.mesh !== null && this.mesh.parent) {
                this.mesh.parent.remove(this.mesh);
                this.mesh = null;
            }
            if (clearMesh && this.helper != null && this.helper.parent != null) {
                this.helper.parent.remove(this.helper);
                this.helper = null;
            }
            this.parent.add(this.getMesh());
        }
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
            var object3d = null;
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
                case 'css':
                case 'css3d':
                case 'css2d':
                    var cssElement = document.createElement('div');
                    var cssGeometry = null;
                    var cssMaterials = this.getMaterials({
                        opacity: 0.15,
                        transparent: true,
                        color: this.getGroundColor(0x111111),
                        blending: THREE.NoBlending,
                        side: THREE.DoubleSide
                    });
                    if (geometry !== null) {
                        cssGeometry = geometry;
                    }
                    else {
                        cssGeometry = new THREE.BoxGeometry(this.getWidth(1), this.getHeight(1), this.getDistance(0.1));
                    }
                    if (cssGeometry instanceof THREE.BoxGeometry ||
                        cssGeometry instanceof THREE.PlaneGeometry) {
                        this.cssClazzName = interface_1.ThreeUtil.addCssStyle(cssElement, {
                            width: cssGeometry.parameters.width,
                            height: cssGeometry.parameters.height,
                            overflow: 'hidden'
                        }, this.cssClazzName, 'mesh', 'inline');
                    }
                    else if (cssGeometry instanceof THREE.CircleGeometry) {
                        this.cssClazzName = interface_1.ThreeUtil.addCssStyle(cssElement, {
                            width: cssGeometry.parameters.radius,
                            height: cssGeometry.parameters.radius,
                            overflow: 'hidden'
                        }, this.cssClazzName, 'mesh', 'inline');
                    }
                    if (interface_1.ThreeUtil.isNotNull(this.cssStyle)) {
                        this.cssClazzName = interface_1.ThreeUtil.addCssStyle(cssElement, this.cssStyle, this.cssClazzName, 'mesh', 'inline');
                    }
                    var cssObject = null;
                    switch (this.type.toLowerCase()) {
                        case 'css2d':
                            cssObject = new CSS2DRenderer_js_1.CSS2DObject(cssElement);
                            break;
                        case 'css3d':
                        case 'css':
                        default:
                            cssObject = new CSS3DRenderer_js_1.CSS3DObject(cssElement);
                            break;
                    }
                    cssObject.castShadow = this.castShadow;
                    cssObject.receiveShadow = this.receiveShadow;
                    basemesh_1 = new THREE.Mesh(cssGeometry, cssMaterials[0]);
                    basemesh_1.add(cssObject);
                    break;
                case 'light':
                    var light = new light_component_1.LightComponent();
                    light.setLightParams({
                        name: this.name,
                        visible: this.visible,
                        type: this.lightType,
                        color: this.color,
                        skyColor: this.skyColor,
                        groundColor: this.groundColor,
                        intensity: this.intensity,
                        distance: this.distance,
                        angle: this.angle,
                        penumbra: this.penumbra,
                        decay: this.decay,
                        width: this.width,
                        height: this.height,
                        castShadow: this.castShadow,
                        shadowCameraNear: this.shadowCameraNear,
                        shadowMapSizeWidth: this.shadowMapSizeWidth,
                        shadowMapSizeHeight: this.shadowMapSizeHeight,
                        shadowCameraFar: this.shadowCameraFar,
                        shadowCameraFov: this.shadowCameraFov,
                        shadowCameraLeft: this.shadowCameraLeft,
                        shadowCameraRight: this.shadowCameraRight,
                        shadowCameraTop: this.shadowCameraTop,
                        shadowCameraBottom: this.shadowCameraBottom,
                        target: this.target
                    });
                    object3d = light.getLight();
                    break;
                case 'lensflare':
                    var lensflare_2 = new Lensflare_1.Lensflare();
                    this.lensflareElements.forEach(function (lensflareElement) {
                        lensflareElement.setLensflare(lensflare_2);
                    });
                    basemesh_1 = lensflare_2;
                    break;
                case 'instanced':
                    basemesh_1 = new THREE.InstancedMesh(geometry, this.getMaterials(), this.getCount(1));
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
                    object3d = new THREE.Sprite(this.getMaterials()[0]);
                    break;
                case 'points':
                    object3d = new THREE.Points(geometry, this.getMaterials()[0]);
                    break;
                case 'line':
                    var mesh = new THREE.Line(geometry, this.getMaterials()[0]);
                    mesh.computeLineDistances();
                    object3d = mesh;
                    break;
                case 'mesh':
                default:
                    if (interface_1.ThreeUtil.isNotNull(this.storageName)) {
                        basemesh_1 = new THREE.Group();
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
                                if (_this.castShadow) {
                                    loadedMesh.castShadow = _this.castShadow;
                                    loadedMesh.receiveShadow = _this.receiveShadow;
                                    loadedMesh.children.forEach(function (child) {
                                        child.castShadow = _this.castShadow;
                                        child.receiveShadow = _this.receiveShadow;
                                    });
                                }
                            }
                            else if (geometry !== null) {
                                if (geometry['animations'] !== null &&
                                    geometry['animations'] !== undefined &&
                                    geometry['animations'].length > 0) {
                                    var morphAnim = new MorphAnimMesh_1.MorphAnimMesh(geometry, _this.getMaterials()[0]);
                                    loadedMesh = morphAnim;
                                    _this.mesh.add(loadedMesh);
                                    if (geometry['animations'] !== null) {
                                        clips = geometry['animations'];
                                    }
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
                                            mesh.setParent(foundMesh, true);
                                        }
                                    }
                                });
                            }
                            if (clips !== null && clips !== undefined) {
                                _this.clips = clips;
                            }
                            _this.clipMesh = loadedMesh;
                            _this.applyChanges3D(['mixer', 'material']);
                            _this.resetHelper();
                        }, this.storageOption);
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
            if (interface_1.ThreeUtil.isNotNull(object3d)) {
                basemesh_1 = new THREE.Group();
                basemesh_1.add(object3d);
            }
            this.mesh = basemesh_1;
            if (this.meshes && this.meshes.length > 0) {
                this.meshes.forEach(function (mesh) {
                    mesh.setParent(basemesh_1);
                });
            }
            this.setObject3D(this.mesh);
            if (this.name !== null) {
                this.object3d.name = this.name;
            }
            this.object3d.visible = this.visible;
            if (this.object3d instanceof THREE.Mesh ||
                this.object3d instanceof THREE.Points ||
                this.object3d instanceof THREE.Sprite) {
                var mesh = this.object3d;
                if (this.object3d instanceof THREE.Mesh) {
                    mesh.castShadow = this.castShadow;
                    mesh.receiveShadow = this.receiveShadow;
                }
            }
            if (interface_1.ThreeUtil.isNull(this.object3d.userData.component)) {
                this.object3d.userData.component = this;
            }
            if (this.helper == null) {
                this.resetHelper();
            }
            this.applyChanges3D([
                'position',
                'rotation',
                'scale',
                'lookat',
                'rigidbody',
                'meshes',
                'cameras',
                'helpers',
                'geometry',
                'material',
                'svg',
                'listner',
                'audio',
                'cssChildren',
                'controller',
            ]);
            this.onLoad.emit(this);
        }
        return this.mesh;
    };
    MeshComponent.prototype.resetHelper = function () {
        if (this.parent !== null) {
            if (this.helper !== null && this.helper.parent !== null) {
                this.helper.parent.remove(this.helper);
            }
            var basemesh = null;
            var helperType = this.helperType.toLowerCase();
            if (helperType !== '' && helperType !== 'none') {
                var helper = new helper_component_1.HelperComponent();
                helper.setHelperParams({
                    type: this.helperType,
                    color: this.color,
                    target: this.target,
                    size: this.size,
                    radius: this.radius,
                    radials: this.radials,
                    circles: this.circles,
                    divisions: this.divisions,
                    color1: this.color1,
                    color2: this.color2,
                    opacity: this.helperOpacity,
                    dirX: this.dirX,
                    dirY: this.dirY,
                    dirZ: this.dirZ,
                    originX: this.originX,
                    originY: this.originY,
                    originZ: this.originZ,
                    length: this.length,
                    headLength: this.headLength,
                    headWidth: this.headWidth,
                    parent: this.mesh
                });
                basemesh = helper.getHelper();
            }
            if (basemesh !== null) {
                this.helper = basemesh;
                this.helper.visible = this.getHelperVisible(true);
                if (this.parent !== null &&
                    (this.helper.parent == null || this.helper.parent == undefined)) {
                    this.parent.add(this.helper);
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
    ], MeshComponent.prototype, "lightType");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "cssStyle");
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
    ], MeshComponent.prototype, "castShadow");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "receiveShadow");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "storageName");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "storageOption");
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
    ], MeshComponent.prototype, "count");
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
    ], MeshComponent.prototype, "radius");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "radials");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "circles");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "divisions");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "color1");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "color2");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "helperOpacity");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "dirX");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "dirY");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "dirZ");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "originX");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "originY");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "originZ");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "length");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "headLength");
    __decorate([
        core_1.Input()
    ], MeshComponent.prototype, "headWidth");
    __decorate([
        core_1.Output()
    ], MeshComponent.prototype, "onLoad");
    __decorate([
        core_1.ContentChildren(geometry_component_1.GeometryComponent, { descendants: false })
    ], MeshComponent.prototype, "geometry");
    __decorate([
        core_1.ContentChildren(material_component_1.MaterialComponent, { descendants: false })
    ], MeshComponent.prototype, "materials");
    __decorate([
        core_1.ContentChildren(lensflareelement_component_1.LensflareelementComponent, { descendants: false })
    ], MeshComponent.prototype, "lensflareElements");
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
    __decorate([
        core_1.ContentChildren(html_component_1.HtmlComponent, { descendants: false })
    ], MeshComponent.prototype, "cssChildren");
    __decorate([
        core_1.ContentChildren(rigidbody_component_1.RigidbodyComponent, { descendants: false })
    ], MeshComponent.prototype, "rigidbody");
    __decorate([
        core_1.ContentChildren(MeshComponent_1, { descendants: false })
    ], MeshComponent.prototype, "meshes");
    __decorate([
        core_1.ContentChildren(camera_component_1.CameraComponent, { descendants: false })
    ], MeshComponent.prototype, "cameras");
    __decorate([
        core_1.ContentChildren(helper_component_1.HelperComponent, { descendants: false })
    ], MeshComponent.prototype, "helpers");
    __decorate([
        core_1.ContentChildren(light_component_1.LightComponent, { descendants: false })
    ], MeshComponent.prototype, "lights");
    MeshComponent = MeshComponent_1 = __decorate([
        core_1.Component({
            selector: 'three-mesh',
            templateUrl: './mesh.component.html',
            styleUrls: ['./mesh.component.scss']
        })
    ], MeshComponent);
    return MeshComponent;
}(object3d_abstract_1.AbstractObject3dComponent));
exports.MeshComponent = MeshComponent;
