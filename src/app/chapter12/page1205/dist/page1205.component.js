"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1205Component = void 0;
var core_1 = require("@angular/core");
var Page1205Component = /** @class */ (function () {
    function Page1205Component() {
        this.controls = {
            anchorSeparat: true,
            x: 0,
            y: 0,
            z: 0,
            width: 100,
            height: 199,
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            anchors: {
                min: {
                    x: 0.2,
                    y: 0.2
                },
                max: {
                    x: 0.8,
                    y: 0.8
                }
            },
            pivot: {
                x: 0.5,
                y: 0.5
            },
            rotation: {
                x: 0,
                y: 0,
                z: 0
            },
            scale: {
                x: 1,
                y: 1,
                z: 1
            },
            padding: {
                padding: 0,
                paddingLeft: 0,
                paddingTop: 0,
                paddingRight: 0,
                paddingBottom: 0
            },
            margin: {
                margin: 0,
                marginLeft: 0,
                marginTop: 0,
                marginRight: 0,
                marginBottom: 0
            },
            background: {
                backgroundColor: 0xffffff,
                backgroundOpacity: 1,
                backgroundImage: null,
                backgroundRepeat: null,
                backgroundRepeatX: null,
                backgroundRepeatY: null,
                backgroundPosition: null,
                backgroundPositionX: null,
                backgroundPositionY: null,
                backgroundSize: null,
                backgroundSizeX: null,
                backgroundSizeY: null,
                backgroundClip: null
            },
            border: {
                border: '3px solid red',
                borderColor: 0xff1111,
                borderStyle: 'dashed',
                borderWidth: 30,
                borderRadius: 2,
                borderLeft: null,
                borderTop: null,
                borderRight: null,
                borderBottom: null,
                borderImage: null,
                borderImageSource: 'unnamed.png',
                borderImageSlice: 27,
                borderImageWidth: 36,
                borderImageOutset: 18,
                borderImageRepeat: 'round'
            },
            text: {
                opacity: 1,
                color: 0xff0000,
                fontFamily: null,
                fontSize: null,
                fontStyle: null,
                fontWeight: null,
                textAlign: null,
                textTransform: null,
                textDecoration: null,
                letterSpacing: null,
                textIndent: null,
                textJustify: null,
                textSizeAdjust: null,
                whiteSpace: null,
                wordBreak: null,
                wordSpacing: null
            },
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            {
                name: 'Transform',
                type: 'folder',
                children: [
                    { name: 'anchorSeparat', type: 'checkbox' },
                    {
                        name: 'Abs position',
                        type: 'folder',
                        children: [
                            { name: 'x', type: 'number', min: -100, max: 100 },
                            { name: 'y', type: 'number', min: -100, max: 100 },
                            { name: 'z', type: 'number', min: -100, max: 100 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Rel position',
                        type: 'folder',
                        children: [
                            { name: 'left', type: 'number', min: -100, max: 100 },
                            { name: 'top', type: 'number', min: -100, max: 100 },
                            { name: 'right', type: 'number', min: -100, max: 100 },
                            { name: 'bottom', type: 'number', min: -100, max: 100 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'size',
                        type: 'folder',
                        children: [
                            { name: 'width', type: 'number', min: 0, max: 300 },
                            { name: 'height', type: 'number', min: 0, max: 300 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Anchors',
                        type: 'folder',
                        control: 'anchors',
                        children: [
                            {
                                name: 'Min',
                                type: 'folder',
                                control: 'min',
                                children: [
                                    { name: 'x', type: 'number', min: 0, max: 1, step: 0.01 },
                                    { name: 'y', type: 'number', min: 0, max: 1, step: 0.01 },
                                ]
                            },
                            {
                                name: 'Max',
                                type: 'folder',
                                control: 'max',
                                children: [
                                    { name: 'x', type: 'number', min: 0, max: 1, step: 0.01 },
                                    { name: 'y', type: 'number', min: 0, max: 1, step: 0.01 },
                                ]
                            },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Pivot',
                        type: 'folder',
                        control: 'pivot',
                        children: [
                            { name: 'x', type: 'number', min: -1, max: 2, step: 0.01 },
                            { name: 'y', type: 'number', min: -1, max: 2, step: 0.01 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Rotation',
                        type: 'folder',
                        control: 'rotation',
                        children: [
                            { name: 'x', type: 'number', min: 0, max: 360 },
                            { name: 'y', type: 'number', min: 0, max: 360 },
                            { name: 'z', type: 'number', min: 0, max: 360 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Scale',
                        type: 'folder',
                        control: 'scale',
                        children: [
                            { name: 'x', type: 'number', min: 0.01, max: 2, step: 0.01 },
                            { name: 'y', type: 'number', min: 0.01, max: 2, step: 0.01 },
                            { name: 'z', type: 'number', min: 0.01, max: 2, step: 0.01 },
                        ],
                        isOpen: false
                    },
                ]
            },
            {
                name: 'Background',
                type: 'folder',
                children: [
                    {
                        name: 'Padding',
                        type: 'folder',
                        control: 'padding',
                        children: [
                            { name: 'padding', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'paddingLeft', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'paddingTop', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'paddingRight', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'paddingBottom', type: 'number', min: 0, max: 10, step: 0.01 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Margin',
                        type: 'folder',
                        control: 'margin',
                        children: [
                            { name: 'margin', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'marginLeft', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'marginTop', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'marginRight', type: 'number', min: 0, max: 10, step: 0.01 },
                            { name: 'marginBottom', type: 'number', min: 0, max: 10, step: 0.01 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Background',
                        type: 'folder',
                        control: 'background',
                        children: [
                            { name: 'backgroundColor', type: 'color' },
                            { name: 'backgroundOpacity', type: 'number', min: 0, max: 1, step: 0.01 },
                        ],
                        isOpen: false
                    },
                    {
                        name: 'Border',
                        type: 'folder',
                        control: 'border',
                        children: [
                            { name: 'borderColor', type: 'color' },
                            { name: 'borderStyle', type: 'select', select: ['none', 'solid', 'dotted', 'dashed'] },
                            { name: 'borderWidth', type: 'number', min: 0, max: 30, step: 0.02 },
                            { name: 'borderRadius', type: 'number', min: 0, max: 30, step: 0.02 },
                            { name: 'borderImageSource', type: 'select', select: ['unnamed.png', 'border-diamonds.png', 'border-image-6.svg'] },
                            { name: 'borderImageSlice', type: 'number', min: 0, max: 50, step: 0.02 },
                            { name: 'borderImageWidth', type: 'number', min: 0, max: 50, step: 0.02 },
                            { name: 'borderImageOutset', type: 'number', min: 0, max: 30, step: 0.02 },
                            { name: 'borderImageRepeat', type: 'select', select: ['stretch', 'repeat', 'round', 'space', 'round stretch'] },
                        ],
                        isOpen: true
                    },
                    {
                        name: 'Text',
                        type: 'folder',
                        control: 'text',
                        children: [
                            { name: 'color', type: 'color' },
                            { name: 'opacity', type: 'number', min: 0, max: 1, step: 0.01 },
                        ],
                        isOpen: false
                    },
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
    Page1205Component.prototype.ngOnInit = function () { };
    Page1205Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1205Component = __decorate([
        core_1.Component({
            selector: 'app-page1205',
            templateUrl: './page1205.component.html',
            styleUrls: ['./page1205.component.scss']
        })
    ], Page1205Component);
    return Page1205Component;
}());
exports.Page1205Component = Page1205Component;
