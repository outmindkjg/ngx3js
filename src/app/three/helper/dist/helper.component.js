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
exports.HelperComponent = void 0;
var interface_1 = require("./../interface");
var core_1 = require("@angular/core");
var object3d_abstract_1 = require("../object3d.abstract");
var RectAreaLightHelper_js_1 = require("three/examples/jsm/helpers/RectAreaLightHelper.js");
var THREE = require("three");
var HelperComponent = /** @class */ (function (_super) {
    __extends(HelperComponent, _super);
    function HelperComponent() {
        var _this = _super.call(this) || this;
        _this.type = 'spot';
        _this.color = null;
        _this.target = null;
        _this.size = null;
        _this.radius = null;
        _this.radials = null;
        _this.circles = null;
        _this.divisions = null;
        _this.color1 = null;
        _this.color2 = null;
        _this.opacity = null;
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
        _this.helper = null;
        return _this;
    }
    HelperComponent.prototype.getTarget = function (target) {
        if (this.target !== null) {
            return this.target.getMesh();
        }
        else {
            return target;
        }
    };
    HelperComponent.prototype.getVisible = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.visible, def);
    };
    HelperComponent.prototype.getSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.size, def);
    };
    HelperComponent.prototype.getColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color, def);
    };
    HelperComponent.prototype.getRadius = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.radius, def);
    };
    HelperComponent.prototype.getRadials = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.radials, def);
    };
    HelperComponent.prototype.getCircles = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.circles, def);
    };
    HelperComponent.prototype.getDivisions = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.divisions, def);
    };
    HelperComponent.prototype.getColor1 = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color1, def);
    };
    HelperComponent.prototype.getColor2 = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color2, def);
    };
    HelperComponent.prototype.getOpacity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.opacity, def);
    };
    HelperComponent.prototype.getDir = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(interface_1.ThreeUtil.getVector3Safe(this.dirX, this.dirY, this.dirZ), def);
    };
    HelperComponent.prototype.getOrigin = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(interface_1.ThreeUtil.getVector3Safe(this.originX, this.originY, this.originZ), def);
    };
    HelperComponent.prototype.getLength = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.length, def);
    };
    HelperComponent.prototype.getHeadLength = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.headLength, def);
    };
    HelperComponent.prototype.getHeadWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.headWidth, def);
    };
    HelperComponent.prototype.ngOnInit = function () {
    };
    HelperComponent.prototype.setHelperParams = function (params) {
        var _this = this;
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (_this[key] !== undefined) {
                _this[key] = value;
            }
        });
    };
    HelperComponent.prototype.setParent = function (parent, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (_super.prototype.setParent.call(this, parent, isRestore)) {
            this.resetHelper(true);
            return true;
        }
        return false;
    };
    HelperComponent.prototype.resetHelper = function (clearMesh) {
        if (clearMesh === void 0) { clearMesh = false; }
        if (this.parent !== null) {
            if (clearMesh && this.helper !== null && this.helper.parent) {
                this.helper.parent.remove(this.helper);
                this.helper = null;
            }
            if (this.parent instanceof THREE.Object3D) {
                if (this.parent.parent !== null) {
                    this.parent.parent.add(this.getHelper());
                }
                else {
                    this.parent.add(this.getHelper());
                }
            }
        }
    };
    HelperComponent.prototype.getHelper = function () {
        var _this = this;
        if (this.helper === null) {
            var basemesh_1 = null;
            switch (this.type.toLowerCase()) {
                case 'arrow':
                    basemesh_1 = new THREE.ArrowHelper(this.getDir(new THREE.Vector3(0, 0, 1)), this.getOrigin(new THREE.Vector3(0, 0, 0)), this.getLength(1), this.getColor(0xffff00), this.getHeadLength(), this.getHeadWidth());
                    break;
                case 'box':
                    basemesh_1 = new THREE.BoxHelper(this.getTarget(this.parent), this.getColor(0xffff00));
                    break;
                case 'box3':
                    basemesh_1 = new THREE.Box3Helper(null);
                    break;
                case 'grid':
                    basemesh_1 = new THREE.GridHelper(this.getSize(10), this.getDivisions(10), this.getColor1(0x444444), this.getColor2(0x888888));
                    break;
                case 'polargrid':
                    basemesh_1 = new THREE.PolarGridHelper(this.getRadius(10), this.getRadials(16), this.getCircles(8), this.getDivisions(64), this.getColor1(0x444444), this.getColor2(0x888888));
                    basemesh_1.receiveShadow = true;
                    break;
                case 'camera':
                    var cameraTarget = this.getTarget(this.parent);
                    if (cameraTarget instanceof THREE.Light && cameraTarget.shadow.camera) {
                        basemesh_1 = new THREE.CameraHelper(cameraTarget.shadow.camera);
                    }
                    else if (cameraTarget instanceof THREE.Camera) {
                        basemesh_1 = new THREE.CameraHelper(cameraTarget);
                    }
                    else {
                        basemesh_1 = new THREE.AxesHelper(this.getSize(10));
                    }
                    break;
                case 'directionallight':
                case 'hemispherelight':
                case 'rectarealight':
                case 'pointlight':
                case 'spotlight':
                case 'light':
                    var liightTarget = this.getTarget(this.parent);
                    if (liightTarget instanceof THREE.DirectionalLight) {
                        basemesh_1 = new THREE.DirectionalLightHelper(liightTarget, this.getSize(10), this.getColor(0xff0000));
                    }
                    else if (liightTarget instanceof THREE.HemisphereLight) {
                        basemesh_1 = new THREE.HemisphereLightHelper(liightTarget, this.getSize(10), this.getColor(0xff0000));
                    }
                    else if (liightTarget instanceof THREE.PointLight) {
                        basemesh_1 = new THREE.PointLightHelper(liightTarget, this.getSize(10), this.getColor(0xff0000));
                    }
                    else if (liightTarget instanceof THREE.SpotLight) {
                        basemesh_1 = new THREE.SpotLightHelper(liightTarget, this.getColor(0xff0000));
                    }
                    else if (liightTarget instanceof THREE.RectAreaLight) {
                        basemesh_1 = new RectAreaLightHelper_js_1.RectAreaLightHelper(liightTarget, this.getColor(0xff0000));
                    }
                    break;
                case 'plane':
                    if (this.parent instanceof THREE.Mesh && this.parent.material instanceof THREE.Material) {
                        basemesh_1 = new THREE.Group();
                        var clippingPlanes = this.parent.material.clippingPlanes;
                        if (clippingPlanes !== null && clippingPlanes !== undefined) {
                            clippingPlanes.forEach(function (clippingPlane) {
                                basemesh_1.add(new THREE.PlaneHelper(clippingPlane, _this.getSize(10), _this.getColor(0xff0000).getHex()));
                            });
                        }
                    }
                    else {
                        basemesh_1 = null;
                    }
                    break;
                case 'skeleton':
                    basemesh_1 = new THREE.SkeletonHelper(this.getTarget(this.parent));
                    break;
                case 'axes':
                default:
                    basemesh_1 = new THREE.AxesHelper(this.getSize(10));
                    this.parent.add(basemesh_1);
                    break;
            }
            if (basemesh_1 !== null) {
                this.helper = basemesh_1;
                if (this.helper instanceof THREE.Line && interface_1.ThreeUtil.isNotNull(this.helper.material) && this.helper.material instanceof THREE.Material) {
                    var opacity = this.getOpacity(1);
                    if (opacity >= 0 && opacity < 1) {
                        this.helper.material.opacity = opacity;
                        this.helper.material.transparent = true;
                    }
                }
                this.helper.visible = this.getVisible(true);
                this.setObject3D(this.helper);
            }
            else {
                this.helper = null;
            }
        }
        return this.helper;
    };
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "target");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "size");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "radius");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "radials");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "circles");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "divisions");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "color1");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "color2");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "opacity");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "dirX");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "dirY");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "dirZ");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "originX");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "originY");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "originZ");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "length");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "headLength");
    __decorate([
        core_1.Input()
    ], HelperComponent.prototype, "headWidth");
    __decorate([
        core_1.Output()
    ], HelperComponent.prototype, "onLoad");
    HelperComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-helper',
            templateUrl: './helper.component.html',
            styleUrls: ['./helper.component.scss']
        })
    ], HelperComponent);
    return HelperComponent;
}(object3d_abstract_1.AbstractObject3dComponent));
exports.HelperComponent = HelperComponent;
