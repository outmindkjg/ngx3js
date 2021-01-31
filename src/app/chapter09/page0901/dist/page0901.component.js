"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0901Component = void 0;
var core_1 = require("@angular/core");
var Page0901Component = /** @class */ (function () {
    function Page0901Component() {
        this.controls = {
            rotationSpeed: 0.02,
            bouncingSpeed: 0.03,
            scalingSpeed: 0.03,
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "rotationSpeed", type: "number", min: 0, max: 0.5 },
            { name: "bouncingSpeed", type: "number", min: 0, max: 0.5 },
            { name: "scalingSpeed", type: "number", min: 0, max: 0.5 },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
        this.spherePosition = {
            x: 0, y: 0, z: 0
        };
        this.scalingStep = {
            x: 0, y: 0, z: 0
        };
    }
    Page0901Component.prototype.ngOnInit = function () {
    };
    Page0901Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += this.controls.rotationSpeed * timer.delta * 250;
            this.rotation.x = this.rotation.z = this.rotation.y;
            var step = this.controls.bouncingSpeed * timer.elapsedTime * 60;
            this.spherePosition.x = 20 + (10 * (Math.cos(step)));
            this.spherePosition.y = 2 + (10 * Math.abs(Math.sin(step)));
            var scalingStep = this.controls.scalingSpeed * timer.elapsedTime * 60;
            this.scalingStep.x = Math.abs(Math.sin(scalingStep / 4));
            this.scalingStep.y = Math.abs(Math.cos(scalingStep / 5));
            this.scalingStep.z = Math.abs(Math.sin(scalingStep / 7));
        }
    };
    Page0901Component = __decorate([
        core_1.Component({
            selector: 'app-page0901',
            templateUrl: './page0901.component.html',
            styleUrls: ['./page0901.component.scss']
        })
    ], Page0901Component);
    return Page0901Component;
}());
exports.Page0901Component = Page0901Component;
