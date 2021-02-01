"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1104Component = void 0;
var core_1 = require("@angular/core");
var Page1104Component = /** @class */ (function () {
    function Page1104Component() {
        var _this = this;
        this.controls = {
            select: 'none',
            brightness: {
                brightness: 0.01,
                contrast: 0.01
            },
            colorify: {
                color: 0xffffff
            },
            colorCorrection: {
                powRGB_R: 2,
                mulRGB_R: 1,
                powRGB_G: 2,
                mulRGB_G: 1,
                powRGB_B: 2,
                mulRGB_B: 1
            },
            sepia: {
                amount: 1
            },
            rgbShift: {
                rgbAmount: 0.005,
                angle: 0.0
            },
            mirror: {
                side: 1
            },
            vignette: {
                offset: 1,
                darkness: 1
            },
            hueSaturation: {
                hue: 0.01,
                saturation: 0.01
            },
            kaleidoscope: {
                kalAngle: 0,
                kalSides: 6
            },
            update: function () {
                _this.controlsValues.colorify.enabled = false;
                _this.controlsValues.sepia.enabled = false;
                _this.controlsValues.colorCorrection.enabled = false;
                _this.controlsValues.rgbShift.enabled = false;
                _this.controlsValues.mirror.enabled = false;
                _this.controlsValues.vignette.enabled = false;
                _this.controlsValues.hueSaturation.enabled = false;
                _this.controlsValues.kaleidoscope.enabled = false;
                _this.controlsValues.luminosity.enabled = false;
                _this.controlsValues.technicolor.enabled = false;
                switch (_this.controls.select) {
                    case 'none':
                        break;
                    case 'colorify':
                        _this.controlsValues.colorify = Object.assign({ enabled: true }, _this.controls.colorify);
                        break;
                    case 'sepia':
                        _this.controlsValues.sepia = Object.assign({ enabled: true }, _this.controls.sepia);
                        break;
                    case 'colorCorrection':
                        _this.controlsValues.colorCorrection = Object.assign({ enabled: true }, _this.controls.colorCorrection);
                        break;
                    case 'rgbShift':
                        _this.controlsValues.rgbShift = Object.assign({ enabled: true }, _this.controls.rgbShift);
                        break;
                    case 'mirror':
                        _this.controlsValues.mirror = Object.assign({ enabled: true }, _this.controls.mirror);
                        break;
                    case 'vignette':
                        _this.controlsValues.vignette = Object.assign({ enabled: true }, _this.controls.vignette);
                        break;
                    case 'hueAndSaturation':
                        _this.controlsValues.hueSaturation = Object.assign({ enabled: true }, _this.controls.hueSaturation);
                        break;
                    case 'kaleidoscope':
                        _this.controlsValues.kaleidoscope = Object.assign({ enabled: true }, _this.controls.kaleidoscope);
                        break;
                    case 'luminosity':
                        _this.controlsValues.luminosity = { enabled: true };
                        break;
                    case 'technicolor':
                        _this.controlsValues.technicolor = { enabled: true };
                        break;
                }
            },
            rotate: false,
            wireframe: false
        };
        this.controlsValues = {
            brightness: {
                enabled: false,
                brightness: 0.01,
                contrast: 0.01
            },
            colorify: {
                enabled: false,
                color: 0xffffff
            },
            colorCorrection: {
                enabled: false,
                powRGB_R: 2,
                mulRGB_R: 1,
                powRGB_G: 2,
                mulRGB_G: 1,
                powRGB_B: 2,
                mulRGB_B: 1
            },
            sepia: {
                enabled: false,
                amount: 1
            },
            rgbShift: {
                enabled: false,
                rgbAmount: 0.005,
                angle: 0.0
            },
            mirror: {
                enabled: false,
                side: 1
            },
            vignette: {
                enabled: false,
                offset: 1,
                darkness: 1
            },
            hueSaturation: {
                enabled: false,
                hue: 0.01,
                saturation: 0.01
            },
            kaleidoscope: {
                enabled: false,
                kalAngle: 0,
                kalSides: 6
            },
            luminosity: {
                enabled: false
            },
            technicolor: {
                enabled: false
            },
            unpackDepth: {
                enabled: false
            }
        };
        this.controlsParams = [
            {
                name: 'select',
                type: 'select',
                select: [
                    'none',
                    'colorify',
                    'brightness',
                    'sepia',
                    'colorCorrection',
                    'rgbShift',
                    'mirror',
                    'vignette',
                    'hueAndSaturation',
                    'kaleidoscope',
                    'luminosity',
                    'technicolor',
                ],
                finishChange: function (e) { _this.controls.update(); }
            },
            {
                name: 'Brightness',
                control: 'brightness',
                type: 'folder',
                children: [
                    { name: 'brightness', type: 'number', min: -1, max: 1, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'contrast', type: 'number', min: -1, max: 1, finishChange: function (e) { _this.controls.update(); } },
                ],
                isOpen: true
            },
            {
                name: 'Colorify',
                control: 'colorify',
                type: 'folder',
                children: [{ name: 'color', type: 'color', finishChange: function (e) { _this.controls.update(); } }],
                isOpen: true
            },
            {
                name: 'Color Correction',
                control: 'colorCorrection',
                type: 'folder',
                children: [
                    { name: 'powRGB_R', type: 'number', min: 0, max: 5, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'powRGB_G', type: 'number', min: 0, max: 5, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'powRGB_B', type: 'number', min: 0, max: 5, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'mulRGB_R', type: 'number', min: 0, max: 5, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'mulRGB_G', type: 'number', min: 0, max: 5, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'mulRGB_B', type: 'number', min: 0, max: 5, finishChange: function (e) { _this.controls.update(); } },
                ],
                isOpen: true
            },
            {
                name: 'Sepia',
                control: 'sepia',
                type: 'folder',
                children: [{ name: 'amount', type: 'number', min: 0, max: 2, step: 0.1, finishChange: function (e) { _this.controls.update(); } }],
                isOpen: true
            },
            {
                name: 'RGB Shift',
                control: 'rgbShift',
                type: 'folder',
                children: [
                    { name: 'rgbAmount', type: 'number', min: 0, max: 1, step: 0.001, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'angle', type: 'number', min: 1, max: 180, finishChange: function (e) { _this.controls.update(); } },
                ],
                isOpen: true
            },
            {
                name: 'mirror',
                control: 'mirror',
                type: 'folder',
                children: [{ name: 'side', type: 'number', min: 0, max: 3, step: 1, finishChange: function (e) { _this.controls.update(); } }],
                isOpen: true
            },
            {
                name: 'vignette',
                control: 'vignette',
                type: 'folder',
                children: [
                    { name: 'darkness', type: 'number', min: 0, max: 2, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'offset', type: 'number', min: 0, max: 2, finishChange: function (e) { _this.controls.update(); } },
                ],
                isOpen: true
            },
            {
                name: 'hue and saturation',
                control: 'hueSaturation',
                type: 'folder',
                children: [
                    { name: 'hue', type: 'number', min: -1, max: 1, step: 0.01, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'saturation', type: 'number', min: -1, max: 1, step: 0.01, finishChange: function (e) { _this.controls.update(); } },
                ],
                isOpen: true
            },
            {
                name: 'Kaleidoscope',
                control: 'kaleidoscope',
                type: 'folder',
                children: [
                    { name: 'kalAngle', type: 'number', min: -360, max: 360, finishChange: function (e) { _this.controls.update(); } },
                    { name: 'kalSides', type: 'number', min: 2, max: 20, finishChange: function (e) { _this.controls.update(); } },
                ],
                isOpen: true
            },
            { name: 'rotate', type: 'checkbox' },
            { name: 'wireframe', type: 'checkbox' },
        ];
        this.rotation = {
            x: 0,
            y: 0,
            z: 0
        };
    }
    Page1104Component.prototype.ngOnInit = function () { };
    Page1104Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1104Component = __decorate([
        core_1.Component({
            selector: 'app-page1104',
            templateUrl: './page1104.component.html',
            styleUrls: ['./page1104.component.scss']
        })
    ], Page1104Component);
    return Page1104Component;
}());
exports.Page1104Component = Page1104Component;
