"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1102Component = void 0;
var core_1 = require("@angular/core");
var Page1102Component = /** @class */ (function () {
    function Page1102Component() {
        this.controls = {
            rotate: true,
            wireframe: false,
            film: {
                scanlinesCount: 256,
                grayscale: false,
                scanlinesIntensity: 0.3,
                noiseIntensity: 0.8
            },
            bloompass: {
                strength: 3,
                kernelSize: 25,
                sigma: 5.0,
                resolution: 256
            },
            dotscreen: {
                centerX: 0.5,
                centerY: 0.5,
                angle: 1.57,
                scale: 1
            }
        };
        this.controlsParams = [
            { name: "BloomPass", type: "folder", control: 'bloompass', children: [
                    { name: "strength", type: "number", min: 1, max: 10 },
                    { name: "kernelSize", type: "number", min: 1, max: 100 },
                    { name: "sigma", type: "number", min: 0, max: 10 },
                    { name: "resolution", type: "number", min: 0, max: 1024 }
                ], isOpen: false },
            { name: "FilmPass", type: "folder", control: 'film', children: [
                    { name: "scanlinesCount", type: "number", min: 0, max: 1 },
                    { name: "scanlinesIntensity", type: "number", min: 0, max: 3 },
                    { name: "grayscale", type: "checkbox" },
                    { name: "noiseIntensity", type: "number", min: 0, max: 2048 }
                ], isOpen: false },
            { name: "DotScreenPass", type: "folder", control: 'dotscreen', children: [
                    { name: "centerX", type: "number", min: 0, max: 1 },
                    { name: "centerY", type: "number", min: 0, max: 1 },
                    { name: "angle", type: "number", min: 0, max: 180 },
                    { name: "scale", type: "number", min: 0, max: 10 }
                ], isOpen: false },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: -20
        };
    }
    Page1102Component.prototype.ngOnInit = function () {
    };
    Page1102Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 30;
            // this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1102Component = __decorate([
        core_1.Component({
            selector: 'app-page1102',
            templateUrl: './page1102.component.html',
            styleUrls: ['./page1102.component.scss']
        })
    ], Page1102Component);
    return Page1102Component;
}());
exports.Page1102Component = Page1102Component;
