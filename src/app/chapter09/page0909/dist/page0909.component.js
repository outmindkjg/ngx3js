"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0909Component = void 0;
var core_1 = require("@angular/core");
var Page0909Component = /** @class */ (function () {
    function Page0909Component() {
        this.controls = {
            rotate: true,
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
    Page0909Component.prototype.ngOnInit = function () {
    };
    Page0909Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0909Component = __decorate([
        core_1.Component({
            selector: 'app-page0909',
            templateUrl: './page0909.component.html',
            styleUrls: ['./page0909.component.scss']
        })
    ], Page0909Component);
    return Page0909Component;
}());
exports.Page0909Component = Page0909Component;
