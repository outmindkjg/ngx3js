"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0710Component = void 0;
var core_1 = require("@angular/core");
var Page0710Component = /** @class */ (function () {
    function Page0710Component() {
        var _this = this;
        this.controls = {
            radius: 13,
            tube: 1.7,
            radialSegments: 156,
            tubularSegments: 12,
            p: 5,
            q: 4,
            heightScale: 3.5,
            asParticles: true,
            rotate: false,
            wireframe: false
        };
        this.controlsParams = [
            { name: "radius", type: "number", min: 0, max: 40 },
            { name: "tube", type: "number", min: 0, max: 40 },
            { name: "radialSegments", type: "number", min: 0, max: 400, step: 1 },
            { name: "tubularSegments", type: "number", min: 1, max: 20, step: 1 },
            { name: "p", type: "number", min: 1, max: 10, step: 1 },
            { name: "q", type: "number", min: 1, max: 15, step: 1 },
            { name: "heightScale", type: "number", min: 0, max: 5 },
            { name: "asParticles", type: "checkbox" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" }
        ];
        this.textureSize = { width: 16, height: 16 };
        this.textureProgram = function (context) {
            var gradient = context.createRadialGradient(_this.textureSize.width / 2, _this.textureSize.height / 2, 0, _this.textureSize.width / 2, _this.textureSize.height / 2, _this.textureSize.width / 2);
            gradient.addColorStop(0, 'rgba(255,255,255,1)');
            gradient.addColorStop(0.2, 'rgba(0,255,255,1)');
            gradient.addColorStop(0.4, 'rgba(0,0,64,1)');
            gradient.addColorStop(1, 'rgba(0,0,0,1)');
            context.fillStyle = gradient;
            context.fillRect(0, 0, _this.textureSize.width, _this.textureSize.height);
        };
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0710Component.prototype.ngOnInit = function () {
    };
    Page0710Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0710Component = __decorate([
        core_1.Component({
            selector: 'app-page0710',
            templateUrl: './page0710.component.html',
            styleUrls: ['./page0710.component.scss']
        })
    ], Page0710Component);
    return Page0710Component;
}());
exports.Page0710Component = Page0710Component;
