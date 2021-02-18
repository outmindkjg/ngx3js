"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RotationComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var THREE = require("three");
var interface_1 = require("../interface");
var RotationComponent = /** @class */ (function () {
    function RotationComponent() {
        this.visible = true;
        this.refer = null;
        this.referRef = true;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.rotation = null;
        this.parent = null;
        this._rotationSubscribe = null;
        this._rotationSubject = new rxjs_1.Subject();
    }
    RotationComponent.prototype.ngOnInit = function () {
    };
    RotationComponent.prototype.ngOnChanges = function (changes) {
        if (changes.x || changes.y || changes.z || changes.refer) {
            this.rotation = null;
        }
        this.resetRotation();
    };
    RotationComponent.prototype.setParent = function (parent, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (this.parent !== parent) {
            this.parent = parent;
            if (isRestore && this.parent !== null && this.parent instanceof THREE.Object3D) {
                this.rotation = null;
                this.x = this.parent.rotation.x;
                this.y = this.parent.rotation.y;
                this.z = this.parent.rotation.z;
            }
            this.resetRotation();
            return true;
        }
        return false;
    };
    RotationComponent.prototype.rotationSubscribe = function () {
        return this._rotationSubject.asObservable();
    };
    RotationComponent.prototype.resetRotation = function () {
        var _this = this;
        if (this.parent !== null && this.visible) {
            if (this.parent instanceof THREE.Object3D) {
                if (this._rotationSubscribe !== null) {
                    this._rotationSubscribe.unsubscribe();
                    this._rotationSubscribe = null;
                }
                this.parent.rotation.copy(this.getRotation());
                if (this.refer !== null && this.referRef && this.refer.rotationSubscribe) {
                    this._rotationSubscribe = this.refer.rotationSubscribe().subscribe(function (rotation) {
                        if (_this.parent instanceof THREE.Object3D && _this.visible) {
                            _this.parent.rotation.copy(rotation);
                        }
                    });
                }
            }
            else if (this.parent.meshRotations) {
                this.parent.meshRotations.forEach(function (rotation) {
                    rotation.copy(_this.getRotation());
                });
            }
        }
        else if (this.rotation === null) {
            this.rotation = this.getRotation();
        }
    };
    RotationComponent.prototype.getRotation = function () {
        if (this.rotation === null) {
            if (this.refer !== null && this.refer !== undefined) {
                if (this.refer.getRotation) {
                    this.rotation = this.refer.getRotation();
                }
                else if (this.refer instanceof THREE.Euler) {
                    this.rotation = this.refer;
                }
            }
            if (this.rotation === null) {
                this.rotation = interface_1.ThreeUtil.getEulerSafe(this.x, this.y, this.z, new THREE.Euler(0, 0, 0));
            }
            this._rotationSubject.next(this.rotation);
        }
        return this.rotation;
    };
    __decorate([
        core_1.Input()
    ], RotationComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], RotationComponent.prototype, "refer");
    __decorate([
        core_1.Input()
    ], RotationComponent.prototype, "referRef");
    __decorate([
        core_1.Input()
    ], RotationComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], RotationComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], RotationComponent.prototype, "z");
    RotationComponent = __decorate([
        core_1.Component({
            selector: 'three-rotation',
            templateUrl: './rotation.component.html',
            styleUrls: ['./rotation.component.scss']
        })
    ], RotationComponent);
    return RotationComponent;
}());
exports.RotationComponent = RotationComponent;
