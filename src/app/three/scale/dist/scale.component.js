"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ScaleComponent = void 0;
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var THREE = require("three");
var interface_1 = require("../interface");
var ScaleComponent = /** @class */ (function () {
    function ScaleComponent() {
        this.visible = true;
        this.refer = null;
        this.referRef = true;
        this.x = null;
        this.y = null;
        this.z = null;
        this.scaleMode = "max";
        this.scale = null;
        this.parent = null;
        this._sizeSubscribe = null;
        this._scaleSubscribe = null;
        this._scaleSubject = new rxjs_1.Subject();
    }
    ScaleComponent.prototype.ngOnInit = function () {
    };
    ScaleComponent.prototype.ngOnChanges = function (changes) {
        if (changes.x || changes.y || changes.z) {
            this.scale = null;
        }
        this.resetScale();
    };
    ScaleComponent.prototype.setParent = function (parent, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (this.parent !== parent) {
            this.parent = parent;
            if (isRestore && this.parent !== null && this.parent instanceof THREE.Object3D) {
                this.scale = null;
                this.x = this.parent.scale.x;
                this.y = this.parent.scale.y;
                this.z = this.parent.scale.z;
            }
            this.resetScale();
            return true;
        }
        return false;
    };
    ScaleComponent.prototype.resetScale = function () {
        var _this = this;
        if (this.parent !== null && this.visible) {
            if (this._scaleSubscribe !== null) {
                this._scaleSubscribe.unsubscribe();
                this._scaleSubscribe = null;
            }
            if (this._sizeSubscribe !== null) {
                this._sizeSubscribe.unsubscribe();
                this._sizeSubscribe = null;
            }
            if (this.parent instanceof THREE.Object3D) {
                this.parent.scale.copy(this.getScale());
                if (this.refer !== null && this.referRef) {
                    if (this.refer.sizeSubscribe) {
                        this._scaleSubscribe = this.refer.sizeSubscribe().subscribe(function (size) {
                            if (_this.parent instanceof THREE.Object3D && _this.visible) {
                                _this.parent.scale.copy(_this.getScaleFromSize(size));
                            }
                        });
                    }
                    else if (this.refer.scaleSubscribe) {
                        this._scaleSubscribe = this.refer.scaleSubscribe().subscribe(function (scale) {
                            if (_this.parent instanceof THREE.Object3D && _this.visible) {
                                _this.parent.scale.copy(scale);
                            }
                        });
                    }
                }
            }
            else if (this.parent.meshScales) {
                this.parent.meshScales.forEach(function (scale) {
                    scale.copy(_this.getScale());
                });
            }
        }
    };
    ScaleComponent.prototype.scaleSubscribe = function () {
        return this._scaleSubject.asObservable();
    };
    ScaleComponent.prototype.getScaleFromSize = function (size) {
        switch (this.scaleMode) {
            case "max":
                var maxSize = Math.max(size.x, size.y);
                return new THREE.Vector3(maxSize * this.x, maxSize * this.y, this.z);
            case "min":
                var minSize = Math.min(size.x, size.y);
                return new THREE.Vector3(minSize * this.x, minSize * this.y, this.z);
            default:
                return new THREE.Vector3(size.x * this.x, size.y * this.y, this.z);
        }
    };
    ScaleComponent.prototype.getScale = function () {
        if (this.scale === null) {
            if (this.refer !== null && this.refer !== undefined) {
                if (this.refer.getSize) {
                    this.scale = this.getScaleFromSize(this.refer.getSize());
                }
                else if (this.refer.getScale) {
                    this.scale = this.refer.getScale();
                }
                else if (this.refer instanceof THREE.Vector3) {
                    this.scale = this.refer;
                }
            }
            if (this.scale === null) {
                this.scale = interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(this.x, this.y, this.z));
            }
            this._scaleSubject.next(this.scale);
        }
        return this.scale;
    };
    __decorate([
        core_1.Input()
    ], ScaleComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], ScaleComponent.prototype, "refer");
    __decorate([
        core_1.Input()
    ], ScaleComponent.prototype, "referRef");
    __decorate([
        core_1.Input()
    ], ScaleComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], ScaleComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], ScaleComponent.prototype, "z");
    __decorate([
        core_1.Input()
    ], ScaleComponent.prototype, "scaleMode");
    ScaleComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-scale',
            templateUrl: './scale.component.html',
            styleUrls: ['./scale.component.scss']
        })
    ], ScaleComponent);
    return ScaleComponent;
}());
exports.ScaleComponent = ScaleComponent;
