"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0507Component = void 0;
var core_1 = require("@angular/core");
var Page0507Component = /** @class */ (function () {
    function Page0507Component() {
        this.controls = {
            radiusTop: 20,
            radiusBottom: 20,
            height: 20,
            radialSegments: 8,
            heightSegments: 8,
            openEnded: false,
            wireframe: false
        };
        this.controlsParams = [
            { name: "radiusTop", type: "number", min: -40, max: 40 },
            { name: "radiusBottom", type: "number", min: -40, max: 40 },
            { name: "height", type: "number", min: 0, max: 40 },
            { name: "radialSegments", type: "number", min: 0, max: 20, step: 1 },
            { name: "heightSegments", type: "number", min: 0, max: 20, step: 1 },
            { name: "openEnded", type: "button" },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0507Component.prototype.ngOnInit = function () {
    };
    Page0507Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0507Component = __decorate([
        core_1.Component({
            selector: 'app-page0507',
            templateUrl: './page0507.component.html',
            styleUrls: ['./page0507.component.scss']
        })
    ], Page0507Component);
    return Page0507Component;
}());
exports.Page0507Component = Page0507Component;
