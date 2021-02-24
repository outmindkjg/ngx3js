"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0702Component = void 0;
var core_1 = require("@angular/core");
var Page0702Component = /** @class */ (function () {
    function Page0702Component() {
        var _this = this;
        this.controls = {
            x: 10,
            y: 10,
            rotate: true,
            wireframe: false,
            reDraw: function () {
                _this.positions = [];
                _this.colors = [];
                var maxSize = 100;
                var distX = maxSize / _this.controls.x;
                var distY = maxSize / _this.controls.y;
                for (var x = 0; x < _this.controls.x; x++) {
                    for (var y = 0; y < _this.controls.y; y++) {
                        _this.positions.push({ x: x * distX - maxSize / 2, y: y * distY - maxSize / 2, z: 0 });
                        _this.colors.push(Math.random() * 0x00ffff);
                    }
                }
            }
        };
        this.controlsParams = [
            { name: "x", type: "number", min: 1, max: 10, step: 1 },
            { name: "y", type: "number", min: 1, max: 10, step: 1 },
            { name: "reDraw", type: "button" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
        this.positions = [];
        this.colors = [];
    }
    Page0702Component.prototype.ngOnInit = function () {
        this.controls.reDraw();
    };
    Page0702Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0702Component = __decorate([
        core_1.Component({
            selector: 'app-page0702',
            templateUrl: './page0702.component.html',
            styleUrls: ['./page0702.component.scss']
        })
    ], Page0702Component);
    return Page0702Component;
}());
exports.Page0702Component = Page0702Component;
