"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1101Component = void 0;
var core_1 = require("@angular/core");
var Page1101Component = /** @class */ (function () {
    function Page1101Component() {
        this.controls = {
            scanlinesCount: 256,
            grayscale: false,
            scanlinesIntensity: 0.3,
            noiseIntensity: 0.8,
            updateEffectFilm: function () {
            },
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "scanlinesIntensity", type: "number", min: 0, max: 1 },
            { name: "noiseIntensity", type: "number", min: 0, max: 3 },
            { name: "grayscale", type: "checkbox" },
            { name: "scanlinesCount", type: "number", min: 0, max: 2048 },
            { name: "updateEffectFilm", type: "button" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: -20
        };
    }
    Page1101Component.prototype.ngOnInit = function () {
    };
    Page1101Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 30;
            // this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1101Component = __decorate([
        core_1.Component({
            selector: 'app-page1101',
            templateUrl: './page1101.component.html',
            styleUrls: ['./page1101.component.scss']
        })
    ], Page1101Component);
    return Page1101Component;
}());
exports.Page1101Component = Page1101Component;
