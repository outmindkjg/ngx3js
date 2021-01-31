"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0508Component = void 0;
var core_1 = require("@angular/core");
var Page0508Component = /** @class */ (function () {
    function Page0508Component() {
        this.controls = {
            radius: 10,
            tube: 10,
            radialSegments: 8,
            tubularSegments: 6,
            arc: 360,
            wireframe: false
        };
        this.controlsParams = [
            { name: "radius", type: "number", min: 0, max: 40 },
            { name: "tube", type: "number", min: 0, max: 40 },
            { name: "radialSegments", type: "number", min: 0, max: 40, step: 1 },
            { name: "tubularSegments", type: "number", min: 1, max: 20, step: 1 },
            { name: "arc", type: "number", min: 0, max: 360 },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0508Component.prototype.ngOnInit = function () {
    };
    Page0508Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0508Component = __decorate([
        core_1.Component({
            selector: 'app-page0508',
            templateUrl: './page0508.component.html',
            styleUrls: ['./page0508.component.scss']
        })
    ], Page0508Component);
    return Page0508Component;
}());
exports.Page0508Component = Page0508Component;
