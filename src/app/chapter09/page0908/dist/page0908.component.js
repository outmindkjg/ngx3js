"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0908Component = void 0;
var core_1 = require("@angular/core");
var Page0908Component = /** @class */ (function () {
    function Page0908Component() {
        this.controls = {
            rotate: false,
            wireframe: false
        };
        this.controlsParams = [
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0908Component.prototype.ngOnInit = function () {
    };
    Page0908Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0908Component = __decorate([
        core_1.Component({
            selector: 'app-page0908',
            templateUrl: './page0908.component.html',
            styleUrls: ['./page0908.component.scss']
        })
    ], Page0908Component);
    return Page0908Component;
}());
exports.Page0908Component = Page0908Component;
