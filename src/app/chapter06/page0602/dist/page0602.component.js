"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0602Component = void 0;
var core_1 = require("@angular/core");
var Page0602Component = /** @class */ (function () {
    function Page0602Component() {
        var _this = this;
        this.controls = {
            len: 10,
            segments: 12,
            phiStart: 0,
            phiLength: 160,
            redraw: function () {
                _this.points = [];
                var height = 5;
                var count = _this.controls.len;
                for (var i = 0; i < count; i++) {
                    var randomX = (Math.sin(i * 0.2) + Math.cos(i * 0.3)) * height + 12;
                    var randomZ = 0;
                    var randomY = (i - count) + count / 2;
                    _this.points.push({ x: randomX, y: randomY, z: randomZ });
                }
            },
            wireframe: false
        };
        this.controlsParams = [
            { name: "len", type: "number", min: 3, max: 40 },
            { name: "segments", type: "number", min: 0, max: 50, step: 1 },
            { name: "phiStart", type: "number", min: 0, max: 360 },
            { name: "phiLength", type: "number", min: 0, max: 360 },
            { name: "redraw", type: "button" },
            { name: "wireframe", type: "button" },
        ];
        this.points = [];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0602Component.prototype.ngOnInit = function () {
        this.controls.redraw();
    };
    Page0602Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0602Component = __decorate([
        core_1.Component({
            selector: 'app-page0602',
            templateUrl: './page0602.component.html',
            styleUrls: ['./page0602.component.scss']
        })
    ], Page0602Component);
    return Page0602Component;
}());
exports.Page0602Component = Page0602Component;
