"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0905Component = void 0;
var core_1 = require("@angular/core");
var Page0905Component = /** @class */ (function () {
    function Page0905Component() {
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
    Page0905Component.prototype.ngOnInit = function () {
    };
    Page0905Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0905Component = __decorate([
        core_1.Component({
            selector: 'app-page0905',
            templateUrl: './page0905.component.html',
            styleUrls: ['./page0905.component.scss']
        })
    ], Page0905Component);
    return Page0905Component;
}());
exports.Page0905Component = Page0905Component;
