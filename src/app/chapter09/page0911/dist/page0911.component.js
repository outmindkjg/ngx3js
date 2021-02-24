"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0911Component = void 0;
var core_1 = require("@angular/core");
var Page0911Component = /** @class */ (function () {
    function Page0911Component() {
        this.controls = {
            master: {
                volume: 1,
                visible: true
            },
            box: {
                volume: 1,
                refDistance: 3,
                rolloffFactor: 3,
                maxDistance: 3,
                play: true,
                visible: true
            },
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "Listener", type: "folder", control: "master", children: [
                    { name: "volume", type: "number", min: 0, max: 3 },
                    { name: "visible", type: "checkbox" },
                ], isOpen: true },
            { name: "Box", type: "folder", control: "box", children: [
                    { name: "volume", type: "number", min: 0, max: 3 },
                    { name: "refDistance", type: "number", min: 0, max: 3 },
                    { name: "rolloffFactor", type: "number", min: 0, max: 3 },
                    { name: "maxDistance", type: "number", min: 0, max: 3 },
                    { name: "play", type: "checkbox" },
                    { name: "visible", type: "checkbox" },
                ], isOpen: true },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0911Component.prototype.ngOnInit = function () {
    };
    Page0911Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0911Component = __decorate([
        core_1.Component({
            selector: 'app-page0911',
            templateUrl: './page0911.component.html',
            styleUrls: ['./page0911.component.scss']
        })
    ], Page0911Component);
    return Page0911Component;
}());
exports.Page0911Component = Page0911Component;
