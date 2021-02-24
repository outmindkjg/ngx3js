"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0608Component = void 0;
var core_1 = require("@angular/core");
var Page0608Component = /** @class */ (function () {
    function Page0608Component() {
        var _this = this;
        this.controls = {
            sphere1: {
                x: -2,
                y: 0,
                z: 0,
                scale: 1
            },
            sphere2: {
                x: 3,
                y: 0,
                z: 0,
                scale: 1,
                typeCsg: 'subtract'
            },
            cube: {
                x: -7,
                y: 0,
                z: 0,
                scaleX: 1,
                scaleY: 1,
                scaleZ: 1,
                typeCsg: 'subtract'
            },
            showResult: function () {
                _this.sphere1.x = _this.controls.sphere1.x;
                _this.sphere1.y = _this.controls.sphere1.y;
                _this.sphere1.z = _this.controls.sphere1.z;
                _this.sphere1.scale = _this.controls.sphere1.scale;
                _this.sphere2.x = _this.controls.sphere2.x;
                _this.sphere2.y = _this.controls.sphere2.y;
                _this.sphere2.z = _this.controls.sphere2.z;
                _this.sphere2.scale = _this.controls.sphere2.scale;
                _this.sphere2.typeCsg = _this.controls.sphere2.typeCsg;
                _this.cube.x = _this.controls.cube.x;
                _this.cube.y = _this.controls.cube.y;
                _this.cube.z = _this.controls.cube.z;
                _this.cube.scaleX = _this.controls.cube.scaleX;
                _this.cube.scaleY = _this.controls.cube.scaleY;
                _this.cube.scaleZ = _this.controls.cube.scaleZ;
                _this.cube.typeCsg = _this.controls.cube.typeCsg;
                if (_this.result !== null && _this.result !== undefined) {
                    _this.result.resetMesh(true);
                }
            },
            rotateResult: false,
            hideWireframes: false
        };
        this.sphere1 = {
            x: -2,
            y: 0,
            z: 0,
            scale: 1
        };
        this.sphere2 = {
            x: 3,
            y: 0,
            z: 0,
            scale: 1,
            typeCsg: 'subtract'
        };
        this.cube = {
            x: -7,
            y: 0,
            z: 0,
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            typeCsg: 'subtract'
        };
        this.controlsParams = [
            { name: 'Sphere1', type: 'folder', control: 'sphere1', children: [
                    { name: 'x', type: 'number', min: -15, max: 15 },
                    { name: 'y', type: 'number', min: -15, max: 15 },
                    { name: 'z', type: 'number', min: -15, max: 15 },
                    { name: 'scale', type: 'number', min: 0, max: 10 }
                ], isOpen: true },
            { name: 'Sphere2', type: 'folder', control: 'sphere2', children: [
                    { name: 'x', type: 'number', min: -15, max: 15 },
                    { name: 'y', type: 'number', min: -15, max: 15 },
                    { name: 'z', type: 'number', min: -15, max: 15 },
                    { name: 'scale', type: 'number', min: 0, max: 10 },
                    { name: 'typeCsg', type: 'select', select: ['subtract', 'intersect', 'union', 'none'] },
                ], isOpen: true },
            { name: 'Cube', type: 'folder', control: 'cube', children: [
                    { name: 'x', type: 'number', min: -15, max: 15 },
                    { name: 'y', type: 'number', min: -15, max: 15 },
                    { name: 'z', type: 'number', min: -15, max: 15 },
                    { name: 'scaleX', type: 'number', min: 0, max: 10 },
                    { name: 'scaleY', type: 'number', min: 0, max: 10 },
                    { name: 'scaleZ', type: 'number', min: 0, max: 10 },
                    { name: 'typeCsg', type: 'select', select: ['subtract', 'intersect', 'union', 'none'] },
                ], isOpen: true },
            { name: "showResult", type: "button" },
            { name: "rotateResult", type: "checkbox" },
            { name: "hideWireframes", type: "checkbox" }
        ];
        this.result = null;
        this.points = [];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0608Component.prototype.ngOnInit = function () {
        this.controls.showResult();
    };
    Page0608Component.prototype.onRender = function (timer) {
        if (this.controls.rotateResult) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    __decorate([
        core_1.ViewChild('result')
    ], Page0608Component.prototype, "result");
    Page0608Component = __decorate([
        core_1.Component({
            selector: 'app-page0608',
            templateUrl: './page0608.component.html',
            styleUrls: ['./page0608.component.scss']
        })
    ], Page0608Component);
    return Page0608Component;
}());
exports.Page0608Component = Page0608Component;
