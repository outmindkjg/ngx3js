"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0501Component = void 0;
var core_1 = require("@angular/core");
var Page0501Component = /** @class */ (function () {
    function Page0501Component() {
        this.controls = {
            width: 10,
            height: 14,
            widthSegments: 4,
            heightSegments: 4,
            wireframe: false
        };
        this.controlsParams = [
            { name: "width", type: "number", min: 0, max: 40 },
            { name: "height", type: "number", min: 0, max: 40 },
            { name: "widthSegments", type: "number", min: 0, max: 10, step: 1 },
            { name: "heightSegments", type: "number", min: 0, max: 10, step: 1 },
            { name: "wireframe", type: "button" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0501Component.prototype.ngOnInit = function () {
    };
    Page0501Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
    };
    Page0501Component = __decorate([
        core_1.Component({
            selector: 'app-page0501',
            templateUrl: './page0501.component.html',
            styleUrls: ['./page0501.component.scss']
        })
    ], Page0501Component);
    return Page0501Component;
}());
exports.Page0501Component = Page0501Component;
