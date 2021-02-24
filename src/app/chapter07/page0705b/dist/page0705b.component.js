"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0705bComponent = void 0;
var core_1 = require("@angular/core");
var Page0705bComponent = /** @class */ (function () {
    function Page0705bComponent() {
        var _this = this;
        this.getTexture = function (ctx) {
            ctx.translate(-81, -84);
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.moveTo(83, 116);
            ctx.lineTo(83, 102);
            ctx.bezierCurveTo(83, 94, 89, 88, 97, 88);
            ctx.bezierCurveTo(105, 88, 111, 94, 111, 102);
            ctx.lineTo(111, 116);
            ctx.lineTo(106.333, 111.333);
            ctx.lineTo(101.666, 116);
            ctx.lineTo(97, 111.333);
            ctx.lineTo(92.333, 116);
            ctx.lineTo(87.666, 111.333);
            ctx.lineTo(83, 116);
            ctx.fill();
            // the eyes
            ctx.fillStyle = "white";
            ctx.beginPath();
            ctx.moveTo(91, 96);
            ctx.bezierCurveTo(88, 96, 87, 99, 87, 101);
            ctx.bezierCurveTo(87, 103, 88, 106, 91, 106);
            ctx.bezierCurveTo(94, 106, 95, 103, 95, 101);
            ctx.bezierCurveTo(95, 99, 94, 96, 91, 96);
            ctx.moveTo(103, 96);
            ctx.bezierCurveTo(100, 96, 99, 99, 99, 101);
            ctx.bezierCurveTo(99, 103, 100, 106, 103, 106);
            ctx.bezierCurveTo(106, 106, 107, 103, 107, 101);
            ctx.bezierCurveTo(107, 99, 106, 96, 103, 96);
            ctx.fill();
            // the pupils
            ctx.fillStyle = "blue";
            ctx.beginPath();
            ctx.arc(101, 102, 2, 0, Math.PI * 2, true);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(89, 102, 2, 0, Math.PI * 2, true);
            ctx.fill();
        };
        this.controls = {
            dotCnt: 15000,
            size: 4,
            transparent: false,
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
                    _this.colors.push(Math.random() * 0x00ffff);
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
    Page0705bComponent.prototype.ngOnInit = function () {
        this.controls.reDraw();
    };
    Page0705bComponent.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0705bComponent = __decorate([
        core_1.Component({
            selector: 'app-page0705b',
            templateUrl: './page0705b.component.html',
            styleUrls: ['./page0705b.component.scss']
        })
    ], Page0705bComponent);
    return Page0705bComponent;
}());
exports.Page0705bComponent = Page0705bComponent;
