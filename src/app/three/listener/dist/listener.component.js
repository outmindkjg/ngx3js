"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListenerComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var ListenerComponent = /** @class */ (function () {
    function ListenerComponent() {
        this.refObject3d = null;
    }
    ListenerComponent.prototype.ngOnInit = function () {
    };
    ListenerComponent.prototype.setObject3D = function (refObject3d) {
        if (this.refObject3d !== refObject3d) {
            this.refObject3d = refObject3d;
            this.resetListener();
        }
    };
    ListenerComponent.prototype.resetListener = function () {
        if (this.listener === null) {
            this.listener = this.getListener();
        }
        if (this.listener !== null && this.refObject3d !== null) {
            if (this.listener.parent !== this.refObject3d) {
                if (this.listener.parent !== null) {
                    this.listener.parent.remove(this.listener);
                }
                this.refObject3d.add(this.listener);
            }
        }
    };
    ListenerComponent.prototype.getListener = function () {
        if (this.listener === null) {
            this.listener = new THREE.AudioListener();
        }
        return this.listener;
    };
    ListenerComponent = __decorate([
        core_1.Component({
            selector: 'three-listener',
            templateUrl: './listener.component.html',
            styleUrls: ['./listener.component.scss']
        })
    ], ListenerComponent);
    return ListenerComponent;
}());
exports.ListenerComponent = ListenerComponent;
