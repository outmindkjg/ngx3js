"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0504Component = void 0;
var core_1 = require("@angular/core");
var Page0504Component = /** @class */ (function () {
    function Page0504Component() {
        this.controls = {
            innerRadius: 0,
            outerRadius: 50,
            thetaSegments: 8,
            phiSegments: 8,
            thetaStart: 0,
            thetaLength: 90,
            wireframe: false
        };
        this.controlsParams = [
            { name: "innerRadius", type: "number", min: 0, max: 40 },
            { name: "outerRadius", type: "number", min: 0, max: 40 },
            { name: "thetaSegments", type: "number", min: 0, max: 40, step: 1 },
            { name: "phiSegments", type: "number", min: 0, max: 40, step: 1 },
            { name: "thetaStart", type: "number", min: 0, max: 360 },
            { name: "thetaLength", type: "number", min: 0, max: 360 },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0504Component.prototype.ngOnInit = function () {
    };
    Page0504Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
    };
    Page0504Component = __decorate([
        core_1.Component({
            selector: 'app-page0504',
            templateUrl: './page0504.component.html',
            styleUrls: ['./page0504.component.scss']
        })
    ], Page0504Component);
    return Page0504Component;
}());
exports.Page0504Component = Page0504Component;
