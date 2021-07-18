"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LensflareelementComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var Lensflare_1 = require("three/examples/jsm/objects/Lensflare");
var texture_component_1 = require("../texture/texture.component");
var LensflareelementComponent = /** @class */ (function () {
    function LensflareelementComponent() {
        this.image = null;
        this.size = null;
        this.distance = null;
        this.color = null;
        this.lensflareElement = null;
        this.lensflare = null;
    }
    LensflareelementComponent.prototype.ngOnInit = function () {
    };
    LensflareelementComponent.prototype.getImage = function (def) {
        return (this.image === null) ? def : this.image;
    };
    LensflareelementComponent.prototype.getSize = function (def) {
        return (this.size === null) ? def : this.size;
    };
    LensflareelementComponent.prototype.getDistance = function (def) {
        return (this.distance === null) ? def : this.distance;
    };
    LensflareelementComponent.prototype.getColor = function (def) {
        var color = this.getConvColor(this.color, def);
        if (color !== null) {
            return new THREE.Color(color);
        }
        else {
            return null;
        }
    };
    LensflareelementComponent.prototype.getConvColor = function (paramColor, def) {
        var color = paramColor === null ? def : paramColor;
        if (typeof (color) === 'string') {
            if (color.startsWith('0x')) {
                return parseInt(color, 16);
            }
            else {
                return color;
            }
        }
        else {
            return color;
        }
    };
    LensflareelementComponent.prototype.getTexture = function () {
        return texture_component_1.TextureComponent.getTextureImage(this.getImage(''));
    };
    LensflareelementComponent.prototype.setLensflare = function (lensflare) {
        if (this.lensflare !== lensflare) {
            this.lensflare = lensflare;
            this.lensflare.addElement(this.getLensflareElement());
        }
    };
    LensflareelementComponent.prototype.getLensflareElement = function () {
        if (this.lensflareElement === null) {
            this.lensflareElement = new Lensflare_1.LensflareElement(this.getTexture(), this.getSize(100), this.getDistance(0), this.getColor(null));
        }
        return this.lensflareElement;
    };
    __decorate([
        core_1.Input()
    ], LensflareelementComponent.prototype, "image");
    __decorate([
        core_1.Input()
    ], LensflareelementComponent.prototype, "size");
    __decorate([
        core_1.Input()
    ], LensflareelementComponent.prototype, "distance");
    __decorate([
        core_1.Input()
    ], LensflareelementComponent.prototype, "color");
    LensflareelementComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-lensflareelement',
            templateUrl: './lensflareelement.component.html',
            styleUrls: ['./lensflareelement.component.scss']
        })
    ], LensflareelementComponent);
    return LensflareelementComponent;
}());
exports.LensflareelementComponent = LensflareelementComponent;
