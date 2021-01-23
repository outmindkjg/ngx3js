"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0510Component = void 0;
var core_1 = require("@angular/core");
var Page0510Component = /** @class */ (function () {
    function Page0510Component() {
        this.controls = {
            radius: 10,
            tube: 1,
            radialSegments: 64,
            tubularSegments: 8,
            p: 2,
            q: 3,
            wireframe: false
        };
        this.controlsParams = [
            { name: "radius", type: "number", min: 0, max: 40 },
            { name: "tube", type: "number", min: 0, max: 40 },
            { name: "radialSegments", type: "number", min: 0, max: 400, step: 1 },
            { name: "tubularSegments", type: "number", min: 1, max: 20, step: 1 },
            { name: "p", type: "number", min: 1, max: 10, step: 1 },
            { name: "q", type: "number", min: 1, max: 15, step: 1 },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0510Component.prototype.ngOnInit = function () {
    };
    Page0510Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0510Component = __decorate([
        core_1.Component({
            selector: 'app-page0510',
            templateUrl: './page0510.component.html',
            styleUrls: ['./page0510.component.scss']
        })
    ], Page0510Component);
    return Page0510Component;
}());
exports.Page0510Component = Page0510Component;
