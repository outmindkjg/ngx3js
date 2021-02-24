"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1302Component = void 0;
var core_1 = require("@angular/core");
var controller_abstract_1 = require("../../three/controller.abstract");
var Page1302Component = /** @class */ (function () {
    function Page1302Component() {
        var _this = this;
        this.rotationController = controller_abstract_1.AutoRotationController;
        this.rotationParam = {
            x: 30, y: 0, z: 0, enable: true
        };
        this.scaleController = controller_abstract_1.AutoScaleController;
        this.scaleParam = {
            x: 1, y: 1, z: 1, enable: true
        };
        this.positionController = controller_abstract_1.AutoPositionController;
        this.positionParam = {
            x: 0, y: 0, z: 0, enable: true
        };
        this.materialController = controller_abstract_1.AutoMaterialController;
        this.materialParam = {
            color: 0x000000, opacity: 0, enable: true
        };
        this.controls = {
            rotation: {
                x: 0, y: 0, z: 0, enable: true,
                reset: function () {
                    _this.controls.rotation.x = 0;
                    _this.controls.rotation.y = 0;
                    _this.controls.rotation.z = 0;
                    _this.controls.rotationApply();
                }
            },
            rotationApply: function () {
                _this.rotationParam = {
                    x: _this.controls.rotation.x,
                    y: _this.controls.rotation.y,
                    z: _this.controls.rotation.z,
                    enable: _this.controls.rotation.enable
                };
            },
            scale: {
                x: 1, y: 1, z: 1, enable: true,
                reset: function () {
                    _this.controls.scale.x = 1;
                    _this.controls.scale.y = 1;
                    _this.controls.scale.z = 1;
                    _this.controls.scaleApply();
                }
            },
            scaleApply: function () {
                _this.scaleParam = {
                    x: _this.controls.scale.x,
                    y: _this.controls.scale.y,
                    z: _this.controls.scale.z,
                    enable: _this.controls.scale.enable
                };
            },
            position: {
                x: 0, y: 0, z: 0, enable: true,
                reset: function () {
                    _this.controls.position.x = 0;
                    _this.controls.position.y = 0;
                    _this.controls.position.z = 0;
                    _this.controls.positionApply();
                }
            },
            positionApply: function () {
                _this.positionParam = {
                    x: _this.controls.position.x,
                    y: _this.controls.position.y,
                    z: _this.controls.position.z,
                    enable: _this.controls.position.enable
                };
            },
            material: {
                color: 0xff0000, opacity: 1, enable: true,
                reset: function () {
                    _this.controls.material.color = 0xff0000;
                    _this.controls.material.opacity = 1;
                    _this.controls.materialApply();
                }
            },
            materialApply: function () {
                _this.materialParam = {
                    color: _this.controls.material.color,
                    opacity: _this.controls.material.opacity,
                    enable: _this.controls.material.enable
                };
            },
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            {
                name: "Rotation", type: "folder", control: 'rotation',
                children: [
                    { name: "enable", type: "checkbox", change: function () { return (_this.controls.rotationApply()); } },
                    { name: "x", type: "number", min: -360, max: 360, step: 1, listen: true, change: function () { return (_this.controls.rotationApply()); } },
                    { name: "y", type: "number", min: -360, max: 360, step: 1, listen: true, change: function () { return (_this.controls.rotationApply()); } },
                    { name: "z", type: "number", min: -360, max: 360, step: 1, listen: true, change: function () { return (_this.controls.rotationApply()); } },
                    { name: "reset", type: "button" }
                ],
                isOpen: false
            },
            {
                name: "Scale", type: "folder", control: 'scale',
                children: [
                    { name: "enable", type: "checkbox", change: function () { return (_this.controls.scaleApply()); } },
                    { name: "x", type: "number", min: -0.3, max: 0.3, step: 0.001, listen: true, change: function () { return (_this.controls.scaleApply()); } },
                    { name: "y", type: "number", min: -0.3, max: 0.3, step: 0.001, listen: true, change: function () { return (_this.controls.scaleApply()); } },
                    { name: "z", type: "number", min: -0.3, max: 0.3, step: 0.001, listen: true, change: function () { return (_this.controls.scaleApply()); } },
                    { name: "reset", type: "button" }
                ],
                isOpen: false
            },
            {
                name: "Position", type: "folder", control: 'position',
                children: [
                    { name: "enable", type: "checkbox", change: function () { return (_this.controls.positionApply()); } },
                    { name: "x", type: "number", min: -2.3, max: 2.3, step: 0.001, listen: true, change: function () { return (_this.controls.positionApply()); } },
                    { name: "y", type: "number", min: -2.3, max: 2.3, step: 0.001, listen: true, change: function () { return (_this.controls.positionApply()); } },
                    { name: "z", type: "number", min: -2.3, max: 2.3, step: 0.001, listen: true, change: function () { return (_this.controls.positionApply()); } },
                    { name: "reset", type: "button" }
                ],
                isOpen: false
            },
            {
                name: "Material", type: "folder", control: 'material',
                children: [
                    { name: "enable", type: "checkbox", change: function () { return (_this.controls.materialApply()); } },
                    { name: "color", type: "color", listen: true, finishChange: function () { return (_this.controls.materialApply()); } },
                    { name: "opacity", type: "number", min: 0, max: 1, step: 0.001, listen: true, change: function () { return (_this.controls.materialApply()); } },
                    { name: "reset", type: "button" }
                ],
                isOpen: false
            },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page1302Component.prototype.ngOnInit = function () {
        this.controls.rotationApply();
        this.controls.scaleApply();
        this.controls.positionApply();
        this.controls.materialApply();
    };
    Page1302Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1302Component = __decorate([
        core_1.Component({
            selector: 'app-page1302',
            templateUrl: './page1302.component.html',
            styleUrls: ['./page1302.component.scss']
        })
    ], Page1302Component);
    return Page1302Component;
}());
exports.Page1302Component = Page1302Component;
