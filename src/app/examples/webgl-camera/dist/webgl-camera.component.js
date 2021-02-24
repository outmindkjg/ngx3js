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
exports.WebglCameraComponent = void 0;
var core_1 = require("@angular/core");
var three_1 = require("../../three");
var THREE = require("three");
var WebglCameraComponent = /** @class */ (function (_super) {
    __extends(WebglCameraComponent, _super);
    function WebglCameraComponent() {
        var _this = _super.call(this, {}, []) || this;
        _this.vertices = [];
        _this.sphere1 = null;
        _this.sphere2 = null;
        _this.sphere3 = null;
        _this.cameraRig = null;
        return _this;
    }
    WebglCameraComponent.prototype.ngOnInit = function () {
        this.vertices = [];
        for (var i = 0; i < 10000; i++) {
            this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // x
            this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // y
            this.vertices.push(THREE.MathUtils.randFloatSpread(2000)); // z
        }
    };
    WebglCameraComponent.prototype.setSphere1 = function (sphere1) {
        this.sphere1 = sphere1;
    };
    WebglCameraComponent.prototype.setSphere2 = function (sphere2) {
        this.sphere2 = sphere2;
    };
    WebglCameraComponent.prototype.setSphere3 = function (sphere3) {
        this.sphere3 = sphere3;
    };
    WebglCameraComponent.prototype.setCameraRig = function (cameraRig) {
        this.cameraRig = cameraRig;
    };
    WebglCameraComponent.prototype.onRender = function (timer) {
        _super.prototype.onRender.call(this, timer);
        var r = timer.elapsedTime * 0.5;
        if (this.sphere1 !== null) {
            this.sphere1.setPosition(700 * Math.cos(r), 700 * Math.sin(r), 700 * Math.sin(r));
        }
        if (this.sphere2 !== null) {
            this.sphere2.setPosition(70 * Math.cos(2 * r), 150, 70 * Math.sin(r));
        }
        if (this.cameraRig !== null && this.sphere1 !== null) {
            var sphere1Position = this.sphere1.getPosition();
            this.cameraRig.setLookat(sphere1Position.x, sphere1Position.y, sphere1Position.z);
        }
    };
    WebglCameraComponent = __decorate([
        core_1.Component({
            selector: 'app-webgl-camera',
            templateUrl: './webgl-camera.component.html',
            styleUrls: ['./webgl-camera.component.scss']
        })
    ], WebglCameraComponent);
    return WebglCameraComponent;
}(three_1.BaseComponent));
exports.WebglCameraComponent = WebglCameraComponent;
