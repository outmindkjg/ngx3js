"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LookatComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var interface_1 = require("../interface");
var LookatComponent = /** @class */ (function () {
    function LookatComponent() {
        this.visible = true;
        this.refer = null;
        this.x = null;
        this.y = null;
        this.z = null;
        this.lookat = null;
        this.refObject3d = null;
    }
    LookatComponent.prototype.ngOnInit = function () {
    };
    LookatComponent.prototype.ngOnChanges = function (changes) {
        if (changes.x || changes.y || changes.z || changes.refer) {
            this.lookat = null;
        }
        this.resetLookAt();
    };
    LookatComponent.prototype.setObject3D = function (refObject3d) {
        if (this.refObject3d !== refObject3d) {
            this.refObject3d = refObject3d;
            this.resetLookAt();
        }
    };
    LookatComponent.prototype.resetLookAt = function () {
        if (this.refObject3d !== null && this.visible) {
            if (this.refObject3d instanceof THREE.Object3D) {
                this.refObject3d.lookAt(this.getLookAt());
            }
            else if (this.refObject3d['target']) {
                this.refObject3d['target'] = this.getLookAt();
            }
        }
    };
    LookatComponent.prototype.getLookAt = function () {
        if (this.lookat === null) {
            if (this.refer !== null) {
                if (this.refer.getPosition) {
                    this.lookat = this.refer.getPosition();
                }
                else if (this.refer.getLookAt) {
                    this.lookat = this.refer.getLookAt();
                }
                else if (this.refer instanceof THREE.Vector3) {
                    this.lookat = this.refer;
                }
            }
            if (this.lookat === null) {
                this.lookat = interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(0, 0, 0));
            }
        }
        return this.lookat;
    };
    __decorate([
        core_1.Input()
    ], LookatComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], LookatComponent.prototype, "refer");
    __decorate([
        core_1.Input()
    ], LookatComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], LookatComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], LookatComponent.prototype, "z");
    LookatComponent = __decorate([
        core_1.Component({
            selector: 'three-lookat',
            templateUrl: './lookat.component.html',
            styleUrls: ['./lookat.component.scss']
        })
    ], LookatComponent);
    return LookatComponent;
}());
exports.LookatComponent = LookatComponent;
