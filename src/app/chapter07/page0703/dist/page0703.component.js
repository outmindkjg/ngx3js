"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0703Component = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var Page0703Component = /** @class */ (function () {
    function Page0703Component() {
        var _this = this;
        this.controls = {
            dotCnt: 15000,
            size: 4,
            transparent: true,
            opacity: 0.6,
            vertexColors: true,
            color: 0xffffff,
            sizeAttenuation: true,
            rotate: true,
            wireframe: false,
            reDraw: function () {
                _this.positions = [];
                _this.colors = [];
                var range = 500;
                for (var i = 0; i < _this.controls.dotCnt; i++) {
                    _this.positions.push({ x: Math.random() * range - range / 2, y: Math.random() * range - range / 2, z: Math.random() * range - range / 2 });
                    var color = new THREE.Color(0x00ff00);
                    var hsl = color.getHSL({ h: 0, s: 0, l: 0 });
                    color.setHSL(hsl.h, hsl.s, Math.random() * hsl.l);
                    _this.colors.push(color.getHex());
                }
            }
        };
        this.controlsParams = [
            { name: "dotCnt", type: "number", min: 50, max: 20000, step: 1 },
            { name: "size", type: "number", min: 0, max: 10, step: 1 },
            { name: "transparent", type: "checkbox" },
            { name: "opacity", type: "number", min: 0, max: 1 },
            { name: "vertexColors", type: "checkbox" },
            { name: "color", type: "color" },
            { name: "sizeAttenuation", type: "checkbox" },
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
    Page0703Component.prototype.ngOnInit = function () {
        this.controls.reDraw();
    };
    Page0703Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0703Component = __decorate([
        core_1.Component({
            selector: 'app-page0703',
            templateUrl: './page0703.component.html',
            styleUrls: ['./page0703.component.scss']
        })
    ], Page0703Component);
    return Page0703Component;
}());
exports.Page0703Component = Page0703Component;
