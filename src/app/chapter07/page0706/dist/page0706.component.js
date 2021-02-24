"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0706Component = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var Page0706Component = /** @class */ (function () {
    function Page0706Component() {
        var _this = this;
        this.controls = {
            dotCnt: 15,
            size: 4,
            transparent: true,
            opacity: 0.6,
            color: 0xffffff,
            sizeAttenuation: true,
            rotate: false,
            wireframe: false,
            reDraw: function () {
                _this.positions = [];
                _this.colors = [];
                var range = 500;
                for (var i = 0; i < _this.controls.dotCnt; i++) {
                    _this.positions.push({
                        x: Math.random() * range - range / 2,
                        y: Math.random() * range - range / 2,
                        z: Math.random() * range - range / 2,
                        velocityY: 0.1 + Math.random() / 5,
                        velocityX: (Math.random() - 0.5) / 3
                    });
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
    Page0706Component.prototype.ngOnInit = function () {
        this.controls.reDraw();
    };
    Page0706Component.prototype.onRender = function (timer) {
        var newpositions = [];
        this.positions.forEach(function (v) {
            v.y = v.y - (v.velocityY);
            v.x = v.x - (v.velocityX);
            if (v.y <= 0)
                v.y = 60;
            if (v.x <= -20 || v.x >= 20)
                v.velocityX = v.velocityX * -1;
            newpositions.push(v);
        });
        this.positions = newpositions;
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0706Component = __decorate([
        core_1.Component({
            selector: 'app-page0706',
            templateUrl: './page0706.component.html',
            styleUrls: ['./page0706.component.scss']
        })
    ], Page0706Component);
    return Page0706Component;
}());
exports.Page0706Component = Page0706Component;
