"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ControllerComponent = void 0;
var core_1 = require("@angular/core");
var ControllerComponent = /** @class */ (function () {
    function ControllerComponent() {
        this.controller = null;
        this._controller = null;
    }
    ControllerComponent.prototype.ngOnInit = function () {
    };
    ControllerComponent.prototype.setObject3D = function (refObject3d) {
        if (this.refObject3d !== refObject3d) {
            this.refObject3d = refObject3d;
            if (this.refObject3d !== null) {
                this._controller = new this.controller(this.refObject3d);
            }
        }
    };
    __decorate([
        core_1.Input()
    ], ControllerComponent.prototype, "controller");
    ControllerComponent = __decorate([
        core_1.Component({
            selector: 'three-controller',
            templateUrl: './controller.component.html',
            styleUrls: ['./controller.component.scss']
        })
    ], ControllerComponent);
    return ControllerComponent;
}());
exports.ControllerComponent = ControllerComponent;
