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
var interface_1 = require("../interface");
var ListenerComponent = /** @class */ (function () {
    function ListenerComponent() {
        this.volume = 1;
        this.visible = true;
        this.listener = null;
        this.parent = null;
    }
    ListenerComponent.prototype.ngOnInit = function () {
    };
    ListenerComponent.prototype.ngOnDestroy = function () {
        if (this.listener !== null && this.listener.parent !== null) {
            this.listener.parent.remove(this.listener);
        }
    };
    ListenerComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.resetListener();
        }
    };
    ListenerComponent.prototype.setParent = function (parent) {
        if (this.parent !== parent) {
            this.parent = parent;
            this.resetListener();
        }
    };
    ListenerComponent.prototype.resetListener = function () {
        if (this.listener === null) {
            this.listener = this.getListener();
        }
        if (this.listener !== null && this.parent !== null) {
            this.listener.setMasterVolume(this.volume);
            if (!this.visible && this.listener.parent !== null) {
                this.listener.parent.remove(this.listener);
                this.listener.setMasterVolume(0);
            }
            else if (this.visible && this.listener.parent === null) {
                if (this.listener.parent !== this.parent) {
                    if (this.listener.parent !== null && this.listener.parent !== undefined) {
                        this.listener.parent.remove(this.listener);
                    }
                    this.parent.add(this.listener);
                }
                this.listener.setMasterVolume(this.volume);
            }
            this.listener.visible = this.visible;
        }
    };
    ListenerComponent.prototype.getListener = function () {
        if (this.listener === null) {
            this.listener = new THREE.AudioListener();
            if (interface_1.ThreeUtil.isNull(this.listener.userData.component)) {
                this.listener.userData.component = this;
            }
        }
        return this.listener;
    };
    __decorate([
        core_1.Input()
    ], ListenerComponent.prototype, "volume");
    __decorate([
        core_1.Input()
    ], ListenerComponent.prototype, "visible");
    ListenerComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-listener',
            templateUrl: './listener.component.html',
            styleUrls: ['./listener.component.scss']
        })
    ], ListenerComponent);
    return ListenerComponent;
}());
exports.ListenerComponent = ListenerComponent;
