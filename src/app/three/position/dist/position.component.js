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
exports.PositionComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var interface_1 = require("../interface");
var PositionComponent = /** @class */ (function (_super) {
    __extends(PositionComponent, _super);
    function PositionComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visible = true;
        _this.x = 0;
        _this.y = 0;
        _this.z = 0;
        _this.position = null;
        _this.refObject3d = null;
        return _this;
    }
    PositionComponent.prototype.ngOnChanges = function (changes) {
        if (changes.x || changes.y || changes.z) {
            this.position = null;
        }
        this.resetPosition();
    };
    PositionComponent.prototype.setObject3D = function (refObject3d, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (this.refObject3d !== refObject3d) {
            this.refObject3d = refObject3d;
            if (isRestore && this.refObject3d !== null && this.refObject3d instanceof THREE.Object3D) {
                this.position = null;
                this.x = this.refObject3d.position.x;
                this.y = this.refObject3d.position.y;
                this.z = this.refObject3d.position.z;
            }
            this.resetPosition();
        }
    };
    PositionComponent.prototype.resetPosition = function () {
        var _this = this;
        if (this.refObject3d !== null && this.visible) {
            if (this.refObject3d instanceof THREE.Object3D) {
                this.refObject3d.position.copy(this.getPosition());
                this.setTweenTarget(this.refObject3d.position);
            }
            else if (this.refObject3d instanceof interface_1.AbstractSvgGeometry) {
                this.refObject3d.meshPositions.forEach(function (position) {
                    position.copy(_this.getPosition());
                });
            }
        }
    };
    PositionComponent.prototype.getPosition = function () {
        if (this.position === null) {
            this.position = new THREE.Vector3(this.x, this.y, this.z);
        }
        return this.position;
    };
    __decorate([
        core_1.Input()
    ], PositionComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], PositionComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], PositionComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], PositionComponent.prototype, "z");
    PositionComponent = __decorate([
        core_1.Component({
            selector: 'three-position',
            templateUrl: './position.component.html',
            styleUrls: ['./position.component.scss']
        })
    ], PositionComponent);
    return PositionComponent;
}(interface_1.AbstractThreeComponent));
exports.PositionComponent = PositionComponent;
