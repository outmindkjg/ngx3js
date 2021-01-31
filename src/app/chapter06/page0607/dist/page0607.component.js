"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0607Component = void 0;
var core_1 = require("@angular/core");
var Page0607Component = /** @class */ (function () {
    function Page0607Component() {
        var _this = this;
        this.controls = {
            size: 10,
            text: 'ThreeJs',
            height: 10,
            bevelThickness: 2,
            bevelSize: 0.5,
            bevelEnabled: true,
            bevelSegments: 3,
            curveSegments: 12,
            steps: 1,
            font: "do_hyeon",
            weight: "regular",
            wireframe: false
        };
        this.text = "테스트";
        this.parametric = 'mobius3d';
        this.controlsParams = [
            { name: "size", type: "number", min: 0, max: 10 },
            { name: "text", type: "button", finishChange: function (e) {
                    _this.text = e;
                } },
            { name: "height", type: "number", min: 0, max: 10 },
            { name: "font", type: "select", select: ['helvetiker', 'gentilis', 'optimer', 'sans', 'sans_mono', 'nanumgothic', 'do_hyeon'] },
            { name: "weight", type: "select", select: ['regular', 'bold'] },
            { name: "bevelThickness", type: "number", min: 0, max: 10 },
            { name: "bevelSize", type: "number", min: 0, max: 10 },
            { name: "bevelSegments", type: "number", min: 0, max: 30, step: 1 },
            { name: "bevelEnabled", type: "checkbox" },
            { name: "curveSegments", type: "number", min: 0, max: 30, step: 1 },
            { name: "steps", type: "number", min: 0, max: 5, step: 1 },
            { name: "wireframe", type: "checkbox" },
        ];
        this.points = [];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0607Component.prototype.ngOnInit = function () {
    };
    Page0607Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0607Component = __decorate([
        core_1.Component({
            selector: 'app-page0607',
            templateUrl: './page0607.component.html',
            styleUrls: ['./page0607.component.scss']
        })
    ], Page0607Component);
    return Page0607Component;
}());
exports.Page0607Component = Page0607Component;
