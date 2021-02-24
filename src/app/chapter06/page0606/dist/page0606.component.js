"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0606Component = void 0;
var core_1 = require("@angular/core");
var Page0606Component = /** @class */ (function () {
    function Page0606Component() {
        var _this = this;
        this.controls = {
            parametric: 'radialWave',
            slices: 20,
            stacks: 10,
            wireframe: false
        };
        this.parametric = 'mobius3d';
        this.controlsParams = [
            {
                name: "parametric", type: "select", select: ["klein", "mobius", "plane", "radialWave", "mobius3d"],
                change: function (e) {
                    switch (e) {
                        case 'klein':
                            _this.parametric = _this.klein;
                            break;
                        case 'radialWave':
                            _this.parametric = _this.radialWave;
                            break;
                        default:
                            _this.parametric = e;
                            break;
                    }
                }
            },
            { name: "slices", type: "number", min: 0, max: 30, step: 1 },
            { name: "stacks", type: "number", min: 0, max: 20, step: 1 },
            { name: "wireframe", type: "button" },
        ];
        this.klein = function (u, v) {
            u *= Math.PI;
            v *= 2 * Math.PI;
            u = u * 2;
            var x, y, z;
            if (u < Math.PI) {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(u) * Math.cos(v);
                z = -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
            }
            else {
                x = 3 * Math.cos(u) * (1 + Math.sin(u)) + (2 * (1 - Math.cos(u) / 2)) * Math.cos(v + Math.PI);
                z = -8 * Math.sin(u);
            }
            y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);
            return { x: x, y: y, z: z };
        };
        this.radialWave = function (u, v) {
            var r = 50;
            var x = Math.sin(u) * r;
            var z = Math.sin(v / 2) * 2 * r;
            var y = (Math.sin(u * 4 * Math.PI) + Math.cos(v * 2 * Math.PI)) * 2.8;
            return { x: x, y: y, z: z };
        };
        this.points = [];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0606Component.prototype.ngOnInit = function () {
        this.parametric = this.radialWave;
    };
    Page0606Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0606Component = __decorate([
        core_1.Component({
            selector: 'app-page0606',
            templateUrl: './page0606.component.html',
            styleUrls: ['./page0606.component.scss']
        })
    ], Page0606Component);
    return Page0606Component;
}());
exports.Page0606Component = Page0606Component;
