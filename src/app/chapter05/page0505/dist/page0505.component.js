"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0505Component = void 0;
var core_1 = require("@angular/core");
var Page0505Component = /** @class */ (function () {
    function Page0505Component() {
        this.controls = {
            width: 10,
            height: 10,
            depth: 10,
            widthSegments: 1,
            heightSegments: 1,
            depthSegments: 1,
            wireframe: false
        };
        this.controlsParams = [
            { name: "width", type: "number", min: 0, max: 40 },
            { name: "height", type: "number", min: 0, max: 40 },
            { name: "depth", type: "number", min: 0, max: 40, step: 1 },
            { name: "widthSegments", type: "number", min: 0, max: 10, step: 1 },
            { name: "heightSegments", type: "number", min: 0, max: 10, step: 1 },
            { name: "depthSegments", type: "number", min: 0, max: 10, step: 1 },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0505Component.prototype.ngOnInit = function () {
    };
    Page0505Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
    };
    Page0505Component = __decorate([
        core_1.Component({
            selector: 'app-page0505',
            templateUrl: './page0505.component.html',
            styleUrls: ['./page0505.component.scss']
        })
    ], Page0505Component);
    return Page0505Component;
}());
exports.Page0505Component = Page0505Component;
