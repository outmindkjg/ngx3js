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
exports.LightComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var object3d_abstract_1 = require("../object3d.abstract");
var interface_1 = require("./../interface");
var mixer_component_1 = require("./../mixer/mixer.component");
var LightComponent = /** @class */ (function (_super) {
    __extends(LightComponent, _super);
    function LightComponent() {
        var _this = _super.call(this) || this;
        _this.type = 'spot';
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
        _this.castShadow = true;
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
        _this.onLoad = new core_1.EventEmitter();
        _this.light = null;
        return _this;
    }
    LightComponent.prototype.getIntensity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.intensity, def);
    };
    LightComponent.prototype.getDistance = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.distance, def);
    };
    LightComponent.prototype.getAngle = function (def) {
        return interface_1.ThreeUtil.getAngleSafe(this.angle, def);
    };
    LightComponent.prototype.getPenumbra = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.penumbra, def);
    };
    LightComponent.prototype.getDecay = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.decay, def);
    };
    LightComponent.prototype.getWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.width, def);
    };
    LightComponent.prototype.getHeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.height, def);
    };
    LightComponent.prototype.getColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color, def);
    };
    LightComponent.prototype.getSkyColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.skyColor, def);
    };
    LightComponent.prototype.getGroundColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.groundColor, def);
    };
    LightComponent.prototype.getShadowMapSizeWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowMapSizeWidth, def);
    };
    LightComponent.prototype.getShadowMapSizeHeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowMapSizeHeight, def);
    };
    LightComponent.prototype.getShadowCameraNear = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraNear, def);
    };
    LightComponent.prototype.getShadowCameraFar = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraFar, def);
    };
    LightComponent.prototype.getShadowCameraFov = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraFov, def);
    };
    LightComponent.prototype.getShadowCameraLeft = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraLeft, def);
    };
    LightComponent.prototype.getShadowCameraRight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraRight, def);
    };
    LightComponent.prototype.getShadowCameraTop = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraTop, def);
    };
    LightComponent.prototype.getShadowCameraBottom = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.shadowCameraBottom, def);
    };
    LightComponent.prototype.getTarget = function (def) {
        var target = interface_1.ThreeUtil.getTypeSafe(this.target, def);
        if (target !== null && target !== undefined) {
            if (target.getObject3D) {
                return target.getObject3D();
            }
        }
        return null;
    };
    LightComponent.prototype.ngOnInit = function () { };
    LightComponent.prototype.setLightParams = function (params) {
        var _this = this;
        Object.entries(params).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            if (_this[key] !== undefined) {
                _this[key] = value;
            }
        });
    };
    LightComponent.prototype.setParent = function (parent, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (_super.prototype.setParent.call(this, parent)) {
            this.resetLight(true);
            return true;
        }
        return false;
    };
    LightComponent.prototype.applyChanges3D = function (changes) {
        if (this.light !== null) {
            _super.prototype.applyChanges3D.call(this, changes);
        }
    };
    LightComponent.prototype.resetLight = function (clearLight) {
        if (clearLight === void 0) { clearLight = false; }
        if (this.parent !== null) {
            if (clearLight && this.light !== null && this.light.parent) {
                this.light.parent.remove(this.light);
                this.light = null;
            }
            this.parent.add(this.getLight());
        }
    };
    LightComponent.prototype.getLight = function () {
        if (this.light === null) {
            var basemesh = null;
            switch (this.type.toLowerCase()) {
                case 'directional':
                    basemesh = new THREE.DirectionalLight(this.getColor(0xffffff), this.getIntensity(1));
                    basemesh.castShadow = this.castShadow;
                    break;
                case 'hemisphere':
                    basemesh = new THREE.HemisphereLight(this.getSkyColor(0xffffff), this.getGroundColor(0xffffff), this.getIntensity(1));
                    break;
                case 'point':
                    basemesh = new THREE.PointLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(), this.getDecay());
                    basemesh.castShadow = this.castShadow;
                    break;
                case 'area':
                case 'rectarea':
                    basemesh = new THREE.RectAreaLight(this.getColor(0xffffff), this.getIntensity(1), this.getWidth(10), this.getHeight(10));
                    break;
                case 'spot':
                    basemesh = new THREE.SpotLight(this.getColor(0xffffff), this.getIntensity(1), this.getDistance(), this.getAngle(), this.getPenumbra(), this.getDecay());
                    basemesh.castShadow = this.castShadow;
                    break;
                case 'ambient':
                default:
                    basemesh = new THREE.AmbientLight(this.getColor(0x0c0c0c), this.getIntensity(1));
                    break;
            }
            this.light = basemesh;
            if (this.name !== null) {
                this.light.name = this.name;
            }
            this.light.visible = this.visible;
            if (this.object3d instanceof THREE.SpotLight ||
                this.object3d instanceof THREE.DirectionalLight) {
                var target = this.getTarget(null);
                if (target != null) {
                    this.object3d.target = target;
                }
            }
            if (this.light.shadow) {
                this.light.shadow.mapSize.width = this.getShadowMapSizeWidth(512);
                this.light.shadow.mapSize.height = this.getShadowMapSizeHeight(512);
                if (this.light.shadow.camera) {
                    if (this.light.shadow.camera instanceof THREE.PerspectiveCamera) {
                        this.light.shadow.camera.near = this.getShadowCameraNear(0.1);
                        this.light.shadow.camera.far = this.getShadowCameraFar(2000);
                        this.light.shadow.camera.fov = this.getShadowCameraFov(50);
                    }
                    else if (this.light.shadow.camera instanceof THREE.OrthographicCamera) {
                        this.light.shadow.camera.near = this.getShadowCameraNear(0.1);
                        this.light.shadow.camera.far = this.getShadowCameraFar(2000);
                        this.light.shadow.camera.left = this.getShadowCameraLeft(-1);
                        this.light.shadow.camera.right = this.getShadowCameraRight(1);
                        this.light.shadow.camera.top = this.getShadowCameraTop(1);
                        this.light.shadow.camera.bottom = this.getShadowCameraBottom(-1);
                    }
                }
                this.light.shadow.updateMatrices(this.light);
            }
            if (interface_1.ThreeUtil.isNull(this.light.userData.component)) {
                this.light.userData.component = this;
            }
            this.applyChanges3D(['position', 'rotation', 'scale', 'lookat']);
            this.setObject3D(this.light);
            this.onLoad.emit(this);
        }
        return this.light;
    };
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "skyColor");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "groundColor");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "intensity");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "distance");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "angle");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "penumbra");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "decay");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "castShadow");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowCameraNear");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowMapSizeWidth");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowMapSizeHeight");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowCameraFar");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowCameraFov");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowCameraLeft");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowCameraRight");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowCameraTop");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "shadowCameraBottom");
    __decorate([
        core_1.Input()
    ], LightComponent.prototype, "target");
    __decorate([
        core_1.Output()
    ], LightComponent.prototype, "onLoad");
    __decorate([
        core_1.ContentChildren(mixer_component_1.MixerComponent, { descendants: false })
    ], LightComponent.prototype, "mixer");
    LightComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-light',
            templateUrl: './light.component.html',
            styleUrls: ['./light.component.scss']
        })
    ], LightComponent);
    return LightComponent;
}(object3d_abstract_1.AbstractObject3dComponent));
exports.LightComponent = LightComponent;
