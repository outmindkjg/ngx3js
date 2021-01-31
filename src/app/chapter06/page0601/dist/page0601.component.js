"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0601Component = void 0;
var core_1 = require("@angular/core");
var Page0601Component = /** @class */ (function () {
    function Page0601Component() {
        var _this = this;
        this.controls = {
            len: 10,
            redraw: function () {
                _this.points = [];
                for (var i = 0; i < _this.controls.len; i++) {
                    var randomX = -15 + Math.round(Math.random() * 30);
                    var randomY = -15 + Math.round(Math.random() * 30);
                    var randomZ = -15 + Math.round(Math.random() * 30);
                    _this.points.push({ x: randomX, y: randomY, z: randomZ });
                }
            },
            wireframe: false
        };
        this.controlsParams = [
            { name: "len", type: "number", min: 3, max: 40 },
            { name: "redraw", type: "button" },
            { name: "wireframe", type: "button" },
        ];
        this.points = [];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0601Component.prototype.ngOnInit = function () {
        this.controls.redraw();
    };
    Page0601Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0601Component = __decorate([
        core_1.Component({
            selector: 'app-page0601',
            templateUrl: './page0601.component.html',
            styleUrls: ['./page0601.component.scss']
        })
    ], Page0601Component);
    return Page0601Component;
}());
exports.Page0601Component = Page0601Component;
