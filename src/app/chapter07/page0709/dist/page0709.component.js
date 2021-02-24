"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0709Component = void 0;
var core_1 = require("@angular/core");
var Page0709Component = /** @class */ (function () {
    function Page0709Component() {
        var _this = this;
        this.controls = {
            spriteCnt: 100,
            reDraw: function () {
                _this.spritePosition = [];
                var range = 200;
                for (var i = 0; i < _this.controls.spriteCnt; i++) {
                    _this.spritePosition.push({
                        x: Math.random() * range - range / 2,
                        y: Math.random() * range - range / 2,
                        z: Math.random() * range - range / 2,
                        size: 10,
                        sprite: i % 5
                    });
                }
            },
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "spriteCnt", type: "number", min: 10, max: 500, step: 1 },
            { name: "reDraw", type: "button" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
        this.spritePosition = [];
    }
    Page0709Component.prototype.ngOnInit = function () {
        this.controls.reDraw();
    };
    Page0709Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0709Component = __decorate([
        core_1.Component({
            selector: 'app-page0709',
            templateUrl: './page0709.component.html',
            styleUrls: ['./page0709.component.scss']
        })
    ], Page0709Component);
    return Page0709Component;
}());
exports.Page0709Component = Page0709Component;
