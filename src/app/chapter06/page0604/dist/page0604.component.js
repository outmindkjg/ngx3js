"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0604Component = void 0;
var core_1 = require("@angular/core");
var Page0604Component = /** @class */ (function () {
    function Page0604Component() {
        var _this = this;
        this.controls = {
            numberOfPoints: 5,
            segments: 64,
            radius: 1,
            radiusSegments: 8,
            closed: false,
            redraw: function () {
                _this.points = [];
                var count = _this.controls.numberOfPoints;
                for (var i = 0; i < count; i++) {
                    var randomX = -20 + Math.round(Math.random() * 50);
                    var randomY = -15 + Math.round(Math.random() * 40);
                    var randomZ = -20 + Math.round(Math.random() * 40);
                    _this.points.push({ x: randomX, y: randomY, z: randomZ });
                }
            },
            wireframe: false
        };
        this.controlsParams = [
            { name: "numberOfPoints", type: "number", min: 2, max: 15 },
            { name: "segments", type: "number", min: 0, max: 50, step: 1 },
            { name: "radius", type: "number", min: 0, max: 10 },
            { name: "radiusSegments", type: "number", min: 0, max: 100, step: 1 },
            { name: "closed", type: "button" },
            { name: "redraw", type: "button" },
            { name: "wireframe", type: "button" },
        ];
        this.points = [];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0604Component.prototype.ngOnInit = function () {
        this.controls.redraw();
    };
    Page0604Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0604Component = __decorate([
        core_1.Component({
            selector: 'app-page0604',
            templateUrl: './page0604.component.html',
            styleUrls: ['./page0604.component.scss']
        })
    ], Page0604Component);
    return Page0604Component;
}());
exports.Page0604Component = Page0604Component;
