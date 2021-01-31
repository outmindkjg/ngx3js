"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0503Component = void 0;
var core_1 = require("@angular/core");
var Page0503Component = /** @class */ (function () {
    function Page0503Component() {
        this.controls = {
            radius: 4,
            thetaStart: 30,
            thetaLength: 90,
            segments: 10,
            wireframe: false
        };
        this.controlsParams = [
            { name: "radius", type: "number", min: 0, max: 40 },
            { name: "segments", type: "number", min: 0, max: 40, step: 1 },
            { name: "thetaStart", type: "number", min: 0, max: 360 },
            { name: "thetaLength", type: "number", min: 0, max: 360 },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0503Component.prototype.ngOnInit = function () {
    };
    Page0503Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
    };
    Page0503Component = __decorate([
        core_1.Component({
            selector: 'app-page0503',
            templateUrl: './page0503.component.html',
            styleUrls: ['./page0503.component.scss']
        })
    ], Page0503Component);
    return Page0503Component;
}());
exports.Page0503Component = Page0503Component;
