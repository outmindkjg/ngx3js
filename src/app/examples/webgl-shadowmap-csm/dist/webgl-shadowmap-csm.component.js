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
exports.WebglShadowmapCsmComponent = void 0;
var core_1 = require("@angular/core");
var three_1 = require("../../three");
var WebglShadowmapCsmComponent = /** @class */ (function (_super) {
    __extends(WebglShadowmapCsmComponent, _super);
    function WebglShadowmapCsmComponent() {
        var _this = _super.call(this, {
            orthographic: false,
            fade: false,
            far: 1000,
            mode: 'practical',
            lightX: -1,
            lightY: -1,
            lightZ: -1,
            margin: 100,
            lightFar: 5000,
            lightNear: 1,
            autoUpdateHelper: true,
            helper: {
                visible: false,
                displayFrustum: true,
                displayPlanes: true,
                displayShadowBounds: true,
                updateHelper: function () {
                    // csmHelper.update();
                }
            }
        }, [
            { name: 'orthographic', type: 'checkbox', change: function () {
                    if (_this.csm !== null && _this.oCamera !== null && _this.pCamera !== null) {
                        _this.csm.camera = _this.controls.orthographic ? _this.oCamera : _this.pCamera;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'fade', type: 'checkbox', change: function () {
                    if (_this.csm !== null) {
                        _this.csm.fade = _this.controls.fade;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'far', title: 'shadow far', type: 'number', min: 1, max: 5000, change: function () {
                    if (_this.csm !== null) {
                        _this.csm.maxFar = _this.controls.far;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'mode', title: 'frustum split mode', type: 'select', select: ['uniform', 'logarithmic', 'practical'], change: function () {
                    if (_this.csm !== null) {
                        _this.csm.mode = _this.controls.mode;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'lightX', title: 'light direction x', type: 'number', min: -1, max: 1, change: function () {
                    if (_this.csm !== null) {
                        _this.csm.lightDirection.x = _this.controls.lightX;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'lightY', title: 'light direction y', type: 'number', min: -1, max: 1, change: function () {
                    if (_this.csm !== null) {
                        _this.csm.lightDirection.y = _this.controls.lightY;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'lightZ', title: 'light direction z', type: 'number', min: -1, max: 1, change: function () {
                    if (_this.csm !== null) {
                        _this.csm.lightDirection.z = _this.controls.lightZ;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'margin', title: 'light margin', type: 'number', min: 0, max: 200, change: function () {
                    if (_this.csm !== null) {
                        _this.csm.lightMargin = _this.controls.margin;
                        _this.csm.updateFrustums();
                    }
                } },
            { name: 'lightNear', title: 'light near', type: 'number', min: 0, max: 10000, change: function () {
                    if (_this.csm !== null) {
                        for (var i = 0; i < _this.csm.lights.length; i++) {
                            _this.csm.lights[i].shadow.camera.near = _this.controls.lightNear;
                            _this.csm.lights[i].shadow.camera.updateProjectionMatrix();
                        }
                    }
                } },
            { name: 'lightFar', title: 'light far', type: 'number', min: 0, max: 10000, change: function () {
                    if (_this.csm !== null) {
                        for (var i = 0; i < _this.csm.lights.length; i++) {
                            _this.csm.lights[i].shadow.camera.far = _this.controls.lightFar;
                            _this.csm.lights[i].shadow.camera.updateProjectionMatrix();
                        }
                    }
                } },
            { name: 'helper', type: 'folder', control: 'helper', children: [
                    { name: 'visible', type: 'checkbox', change: function () {
                            _this.changeHelper();
                        } },
                    { name: 'displayFrustum', type: 'checkbox', change: function () {
                            _this.changeHelper();
                        } },
                    { name: 'displayShadowBounds', type: 'checkbox', change: function () {
                            _this.changeHelper();
                        } }
                ], isOpen: true }
        ]) || this;
        _this.csm = null;
        _this.helper = null;
        _this.oCamera = null;
        _this.pCamera = null;
        _this.cubeInfos = [];
        return _this;
    }
    WebglShadowmapCsmComponent.prototype.setCsm = function (control) {
        this.csm = control.getControl();
    };
    WebglShadowmapCsmComponent.prototype.changeHelper = function () {
        if (this.helper !== null) {
            this.helper['visible'] = this.controls.helper.visible;
            this.helper.displayFrustum = this.controls.helper.displayFrustum;
            this.helper.displayPlanes = this.controls.helper.displayPlanes;
            this.helper.displayShadowBounds = this.controls.helper.displayShadowBounds;
            this.helper.updateVisibility();
        }
    };
    WebglShadowmapCsmComponent.prototype.setHelper = function (helper) {
        this.helper = helper.getHelper();
    };
    WebglShadowmapCsmComponent.prototype.ngOnInit = function () {
        this.cubeInfos = [];
        for (var i = 0; i < 40; i++) {
            this.cubeInfos.push({
                px: -i * 25,
                pz: 30,
                sy: Math.random() * 2 + 6,
                matrial: i % 2 === 0
            });
            this.cubeInfos.push({
                px: -i * 25,
                pz: -30,
                sy: Math.random() * 2 + 6,
                matrial: i % 2 !== 0
            });
        }
    };
    WebglShadowmapCsmComponent = __decorate([
        core_1.Component({
            selector: 'app-webgl-shadowmap-csm',
            templateUrl: './webgl-shadowmap-csm.component.html',
            styleUrls: ['./webgl-shadowmap-csm.component.scss']
        })
    ], WebglShadowmapCsmComponent);
    return WebglShadowmapCsmComponent;
}(three_1.BaseComponent));
exports.WebglShadowmapCsmComponent = WebglShadowmapCsmComponent;
