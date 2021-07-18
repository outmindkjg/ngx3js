"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.FogComponent = void 0;
var interface_1 = require("./../interface");
var core_1 = require("@angular/core");
var THREE = require("three");
var FogComponent = /** @class */ (function () {
    function FogComponent() {
        this.type = "fog";
        this.color = null;
        this.density = 0.00025;
        this.near = 1;
        this.far = 1000;
        this.fog = null;
        this.refScene = null;
    }
    FogComponent.prototype.ngOnInit = function () {
    };
    FogComponent.prototype.getColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color, def);
    };
    FogComponent.prototype.setScene = function (refScene) {
        if (this.refScene !== refScene) {
            this.refScene = refScene;
            this.refScene.fog = this.getFog();
        }
    };
    FogComponent.prototype.getFog = function () {
        if (this.fog === null) {
            switch (this.type) {
                case 'exp2':
                case 'fogexp2':
                    this.fog = new THREE.FogExp2(this.getColor(0xffffff).getHexString(), this.density);
                    break;
                case 'fog':
                default:
                    this.fog = new THREE.Fog(this.getColor(0xffffff), this.near, this.far);
                    break;
            }
        }
        return this.fog;
    };
    __decorate([
        core_1.Input()
    ], FogComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], FogComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], FogComponent.prototype, "density");
    __decorate([
        core_1.Input()
    ], FogComponent.prototype, "near");
    __decorate([
        core_1.Input()
    ], FogComponent.prototype, "far");
    FogComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-fog',
            templateUrl: './fog.component.html',
            styleUrls: ['./fog.component.scss']
        })
    ], FogComponent);
    return FogComponent;
}());
exports.FogComponent = FogComponent;
