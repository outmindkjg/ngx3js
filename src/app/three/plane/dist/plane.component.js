"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PlaneComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var interface_1 = require("../interface");
var PlaneComponent = /** @class */ (function () {
    function PlaneComponent() {
        this.x = null;
        this.y = null;
        this.z = null;
        this.w = null;
        this.plane = null;
        this.worldPlane = null;
        this.needUpdate = false;
    }
    PlaneComponent.prototype.ngOnInit = function () {
    };
    PlaneComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.needUpdate = true;
            this.getPlane();
        }
    };
    PlaneComponent.prototype.getWorldPlane = function (matrixWorld) {
        if (this.worldPlane === null) {
            this.worldPlane = new THREE.Plane();
        }
        this.worldPlane.copy(this.getPlane());
        if (matrixWorld !== null && matrixWorld !== undefined) {
            this.worldPlane.applyMatrix4(matrixWorld);
        }
        return this.worldPlane;
    };
    PlaneComponent.prototype.getPlane = function () {
        if (this.plane === null) {
            this.plane = new THREE.Plane(interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z), interface_1.ThreeUtil.getTypeSafe(this.w, 0));
            this.needUpdate = false;
        }
        else if (this.needUpdate) {
            this.plane.set(interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z), interface_1.ThreeUtil.getTypeSafe(this.w, 0));
            this.needUpdate = false;
        }
        return this.plane;
    };
    __decorate([
        core_1.Input()
    ], PlaneComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], PlaneComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], PlaneComponent.prototype, "z");
    __decorate([
        core_1.Input()
    ], PlaneComponent.prototype, "w");
    PlaneComponent = __decorate([
        core_1.Component({
            selector: 'three-plane',
            templateUrl: './plane.component.html',
            styleUrls: ['./plane.component.scss']
        })
    ], PlaneComponent);
    return PlaneComponent;
}());
exports.PlaneComponent = PlaneComponent;
