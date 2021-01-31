"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0707Component = void 0;
var core_1 = require("@angular/core");
var Page0707Component = /** @class */ (function () {
    function Page0707Component() {
        var _this = this;
        this.controls = {
            dotCnt: 1500,
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
                for (var j = 0; j < 4; j++) {
                    var partPos = [];
                    for (var i = 0; i < _this.controls.dotCnt; i++) {
                        partPos.push({
                            x: Math.random() * range - range / 2,
                            y: Math.random() * range - range / 2,
                            z: Math.random() * range - range / 2,
                            velocityY: 0.1 + Math.random() / 5,
                            velocityX: (Math.random() - 0.5) / 3,
                            velocityZ: (Math.random() - 0.5) / 3
                        });
                    }
                    _this.positions.push(partPos);
                }
            }
        };
        this.controlsParams = [
            { name: "dotCnt", type: "number", min: 50, max: 2000, step: 1 },
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
    Page0707Component.prototype.ngOnInit = function () {
        this.controls.reDraw();
    };
    Page0707Component.prototype.onRender = function (timer) {
        var newpositions = [];
        this.positions.forEach(function (part) {
            var partpositions = [];
            part.forEach(function (v) {
                v.y = v.y - (v.velocityY);
                v.x = v.x - (v.velocityX);
                v.z = v.z - (v.velocityZ);
                if (v.y <= 0)
                    v.y = 60;
                if (v.x <= -20 || v.x >= 20)
                    v.velocityX = v.velocityX * -1;
                if (v.z <= -20 || v.z >= 20)
                    v.velocityZ = v.velocityZ * -1;
                partpositions.push(v);
            });
            newpositions.push(partpositions);
        });
        this.positions = newpositions;
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0707Component = __decorate([
        core_1.Component({
            selector: 'app-page0707',
            templateUrl: './page0707.component.html',
            styleUrls: ['./page0707.component.scss']
        })
    ], Page0707Component);
    return Page0707Component;
}());
exports.Page0707Component = Page0707Component;
