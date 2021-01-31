"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LocalStorageService = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var OBJLoader_1 = require("three/examples/jsm/loaders/OBJLoader");
var ColladaLoader_1 = require("three/examples/jsm/loaders/ColladaLoader");
var STLLoader_1 = require("three/examples/jsm/loaders/STLLoader");
var VTKLoader_1 = require("three/examples/jsm/loaders/VTKLoader");
var PLYLoader_1 = require("three/examples/jsm/loaders/PLYLoader");
var PDBLoader_1 = require("three/examples/jsm/loaders/PDBLoader");
var _3MFLoader_1 = require("three/examples/jsm/loaders/3MFLoader");
var BasisTextureLoader_1 = require("three/examples/jsm/loaders/BasisTextureLoader");
var DRACOLoader_1 = require("three/examples/jsm/loaders/DRACOLoader");
var GLTFLoader_1 = require("three/examples/jsm/loaders/GLTFLoader");
var MMDLoader_1 = require("three/examples/jsm/loaders/MMDLoader");
var PCDLoader_1 = require("three/examples/jsm/loaders/PCDLoader");
var PRWMLoader_1 = require("three/examples/jsm/loaders/PRWMLoader");
var SVGLoader_1 = require("three/examples/jsm/loaders/SVGLoader");
var TGALoader_1 = require("three/examples/jsm/loaders/TGALoader");
var CSS2DRenderer_js_1 = require("three/examples/jsm/renderers/CSS2DRenderer.js");
var LocalStorageService = /** @class */ (function () {
    function LocalStorageService() {
        this.objectLoader = null;
        this.objLoader = null;
        this.colladaLoader = null;
        this.stlLoader = null;
        this.vtkLoader = null;
        this.pdbLoader = null;
        this.plyLoader = null;
        this.rhino3dmLoader = null;
        this.basisTextureLoader = null;
        this.dracoLoader = null;
        this.gltfLoader = null;
        this.mmdLoader = null;
        this.mtlLoader = null;
        this.objLoader2 = null;
        this.objLoader2Parallel = null;
        this.pcdLoader = null;
        this.prwmLoader = null;
        this.svgLoader = null;
        this.tgaLoader = null;
    }
    LocalStorageService.prototype.setItem = function (key, value) {
        localStorage.setItem(key, value);
    };
    LocalStorageService.prototype.getItem = function (key) {
        return localStorage.getItem(key);
    };
    LocalStorageService.prototype.setObject = function (key, mesh) {
        this.setItem(key, JSON.stringify(mesh.toJSON()));
    };
    LocalStorageService.prototype.getObjectFromKey = function (key, callBack) {
        if (key.endsWith('.dae')) {
            if (this.colladaLoader === null) {
                this.colladaLoader = new ColladaLoader_1.ColladaLoader();
            }
            this.colladaLoader.load(key, function (result) {
                callBack({
                    object: result.scene
                });
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.obj')) {
            if (this.objLoader === null) {
                this.objLoader = new OBJLoader_1.OBJLoader();
            }
            this.objLoader.load(key, function (result) {
                callBack({
                    object: result
                });
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.3dm')) {
            if (this.rhino3dmLoader === null) {
                this.rhino3dmLoader = new _3MFLoader_1.ThreeMFLoader();
            }
            this.rhino3dmLoader.load(key, function (result) {
                callBack({
                    object: result
                });
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.basis')) {
            if (this.basisTextureLoader === null) {
                this.basisTextureLoader = new BasisTextureLoader_1.BasisTextureLoader();
            }
            this.basisTextureLoader.load(key, function () {
                // todo
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.drc')) {
            if (this.dracoLoader === null) {
                this.dracoLoader = new DRACOLoader_1.DRACOLoader();
            }
            this.dracoLoader.load(key, function (geometry) {
                callBack({
                    geometry: geometry
                });
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.gltf') || key.endsWith('.glb')) {
            if (this.gltfLoader === null) {
                this.gltfLoader = new GLTFLoader_1.GLTFLoader();
            }
            this.gltfLoader.load(key, function (result) {
                callBack({
                    object: result.scene,
                    clips: result.animations
                });
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.pmd') || key.endsWith('.pmx')) {
            if (this.mmdLoader === null) {
                this.mmdLoader = new MMDLoader_1.MMDLoader();
            }
            this.mmdLoader.load(key, function (result) {
                callBack({
                    object: result
                });
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.pcd')) {
            if (this.pcdLoader === null) {
                this.pcdLoader = new PCDLoader_1.PCDLoader();
            }
            this.pcdLoader.load(key, function () {
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.prwm')) {
            if (this.prwmLoader === null) {
                this.prwmLoader = new PRWMLoader_1.PRWMLoader();
            }
            this.prwmLoader.load(key, function (geometry) {
                var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
                //callBack(mesh);
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.tga')) {
            if (this.tgaLoader === null) {
                this.tgaLoader = new TGALoader_1.TGALoader();
            }
            this.tgaLoader.load(key, function (texture) {
                // const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
                // callBack(mesh);
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.svg')) {
            if (this.svgLoader === null) {
                this.svgLoader = new SVGLoader_1.SVGLoader();
            }
            this.svgLoader.load(key, function (data) {
                // const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
                // callBack(mesh);
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.ply')) {
            if (this.plyLoader === null) {
                this.plyLoader = new PLYLoader_1.PLYLoader();
            }
            this.plyLoader.load(key, function (geometry) {
                var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
                // callBack(mesh);
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.vtk')) {
            if (this.vtkLoader === null) {
                this.vtkLoader = new VTKLoader_1.VTKLoader();
            }
            this.vtkLoader.load(key, function (geometry) {
                var mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0xaaffaa }));
                // callBack(mesh);
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.pdb')) {
            if (this.pdbLoader === null) {
                this.pdbLoader = new PDBLoader_1.PDBLoader();
            }
            this.pdbLoader.load(key, function (pdb) {
                var geometryAtoms = pdb.geometryAtoms;
                var geometryBonds = pdb.geometryBonds;
                var json = pdb.json;
                var group = new THREE.Mesh();
                var boxGeometry = new THREE.BoxBufferGeometry(1, 1, 1);
                var sphereGeometry = new THREE.IcosahedronBufferGeometry(1, 3);
                var positions = geometryAtoms.getAttribute('position');
                var colors = geometryAtoms.getAttribute('color');
                var position = new THREE.Vector3();
                var color = new THREE.Color();
                for (var i = 0; i < positions.count; i++) {
                    position.x = positions.getX(i);
                    position.y = positions.getY(i);
                    position.z = positions.getZ(i);
                    color.r = colors.getX(i);
                    color.g = colors.getY(i);
                    color.b = colors.getZ(i);
                    var material = new THREE.MeshPhongMaterial({ color: color });
                    var object = new THREE.Mesh(sphereGeometry, material);
                    object.position.copy(position);
                    object.position.multiplyScalar(75);
                    object.scale.multiplyScalar(25);
                    group.add(object);
                    var atom = json.atoms[i];
                    var text = document.createElement('div');
                    text.className = 'label';
                    text.style.color = 'rgb(' + atom[3][0] + ',' + atom[3][1] + ',' + atom[3][2] + ')';
                    text.textContent = atom[4];
                    var label = new CSS2DRenderer_js_1.CSS2DObject(text);
                    label.position.copy(object.position);
                    group.add(label);
                }
                positions = geometryBonds.getAttribute('position');
                var start = new THREE.Vector3();
                var end = new THREE.Vector3();
                for (var i = 0; i < positions.count; i += 2) {
                    start.x = positions.getX(i);
                    start.y = positions.getY(i);
                    start.z = positions.getZ(i);
                    end.x = positions.getX(i + 1);
                    end.y = positions.getY(i + 1);
                    end.z = positions.getZ(i + 1);
                    start.multiplyScalar(75);
                    end.multiplyScalar(75);
                    var object = new THREE.Mesh(boxGeometry, new THREE.MeshPhongMaterial({ color: 0xffffff }));
                    object.position.copy(start);
                    object.position.lerp(end, 0.5);
                    object.scale.set(5, 5, start.distanceTo(end));
                    object.lookAt(end);
                    group.add(object);
                }
                // callBack(group);
            }, null, function (e) {
                console.log(e);
            });
        }
        else if (key.endsWith('.stl')) {
            if (this.stlLoader === null) {
                this.stlLoader = new STLLoader_1.STLLoader();
            }
            this.stlLoader.load(key, function (geometry) {
                var mesh = new THREE.Mesh();
                mesh.geometry = geometry;
                mesh.material = new THREE.MeshLambertMaterial({ color: 0x7777ff });
                // callBack(mesh);
            }, null, function (e) {
                console.log(e);
            });
        }
        else {
            if (this.objectLoader === null) {
                this.objectLoader = new THREE.ObjectLoader();
            }
            if (key.endsWith('.js') ||
                key.endsWith('.json')) {
                this.objectLoader.load(key, function () {
                }, null, function (e) {
                    console.log(e);
                });
            }
            else {
                var json = this.getItem(key);
                var loadedGeometry = JSON.parse(json);
                if (json) {
                    // callBack(this.objectLoader.parse(loadedGeometry));
                }
                else {
                    // callBack(new THREE.Object3D());
                }
            }
        }
    };
    LocalStorageService.prototype.getObject = function (key, callBack) {
        this.getObjectFromKey(key, function (result) {
            if (result.object instanceof THREE.Object3D) {
                callBack(result.object, result.clips);
            }
            else {
                var scene = new THREE.Group();
                scene.add(result.object);
                callBack(scene);
            }
        });
    };
    LocalStorageService.prototype.setScene = function (key, scene) {
        this.setItem(key, JSON.stringify(scene.toJSON()));
    };
    LocalStorageService.prototype.getScene = function (key, callBack) {
        this.getObjectFromKey(key, function (result) {
            if (result.object instanceof THREE.Scene) {
                callBack(result.object);
            }
            else {
                var scene = new THREE.Scene();
                scene.add(result.object);
                callBack(scene);
            }
        });
    };
    LocalStorageService.prototype.removeItem = function (key) {
        localStorage.removeItem(key);
    };
    LocalStorageService.prototype.clear = function () {
        localStorage.clear();
    };
    LocalStorageService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LocalStorageService);
    return LocalStorageService;
}());
exports.LocalStorageService = LocalStorageService;
