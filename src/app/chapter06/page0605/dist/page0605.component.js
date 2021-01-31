"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0605Component = void 0;
var core_1 = require("@angular/core");
var Page0605Component = /** @class */ (function () {
    function Page0605Component() {
        this.controls = {
            amount: 2,
            bevelThickness: 2,
            bevelSize: 0.5,
            bevelEnabled: true,
            bevelSegments: 3,
            curveSegments: 12,
            steps: 1,
            redraw: function () {
            },
            wireframe: false
        };
        this.controlsParams = [
            { name: "amount", type: "number", min: 0, max: 20 },
            { name: "bevelThickness", type: "number", min: 0, max: 10 },
            { name: "bevelSize", type: "number", min: 0, max: 10 },
            { name: "bevelSegments", type: "number", min: 0, max: 30, step: 1 },
            { name: "bevelEnabled", type: "button" },
            { name: "curveSegments", type: "number", min: 0, max: 30, step: 1 },
            { name: "steps", type: "number", min: 0, max: 30, step: 1 },
            { name: "redraw", type: "button" },
            { name: "wireframe", type: "button" },
        ];
        this.points = [];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0605Component.prototype.ngOnInit = function () {
        this.controls.redraw();
    };
    Page0605Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0605Component = __decorate([
        core_1.Component({
            selector: 'app-page0605',
            templateUrl: './page0605.component.html',
            styleUrls: ['./page0605.component.scss']
        })
    ], Page0605Component);
    return Page0605Component;
}());
exports.Page0605Component = Page0605Component;
