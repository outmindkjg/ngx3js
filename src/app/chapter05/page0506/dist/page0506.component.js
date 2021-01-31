"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0506Component = void 0;
var core_1 = require("@angular/core");
var Page0506Component = /** @class */ (function () {
    function Page0506Component() {
        this.controls = {
            radius: 4,
            widthSegments: 10,
            heightSegments: 10,
            phiStart: 0,
            phiLength: 360,
            thetaStart: 0,
            thetaLength: 180,
            wireframe: false
        };
        this.controlsParams = [
            { name: "radius", type: "number", min: 0, max: 40 },
            { name: "widthSegments", type: "number", min: 0, max: 20, step: 1 },
            { name: "heightSegments", type: "number", min: 0, max: 20, step: 1 },
            { name: "phiStart", type: "number", min: 0, max: 360 },
            { name: "phiLength", type: "number", min: 0, max: 360 },
            { name: "thetaStart", type: "number", min: 0, max: 360 },
            { name: "thetaLength", type: "number", min: 0, max: 360 },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0506Component.prototype.ngOnInit = function () {
    };
    Page0506Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0506Component = __decorate([
        core_1.Component({
            selector: 'app-page0506',
            templateUrl: './page0506.component.html',
            styleUrls: ['./page0506.component.scss']
        })
    ], Page0506Component);
    return Page0506Component;
}());
exports.Page0506Component = Page0506Component;
