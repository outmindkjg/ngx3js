"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0803Component = void 0;
var core_1 = require("@angular/core");
var Page0803Component = /** @class */ (function () {
    function Page0803Component() {
        var _this = this;
        this.savedName = 'localStorage0803';
        this.saveSeqn = 0;
        this.loadedName = null;
        this.controls = {
            save: function () {
                if (_this.targetObj !== null && _this.targetObj !== undefined) {
                    _this.saveSeqn++;
                    _this.saveSeqn = (_this.saveSeqn % 5) + 1;
                    _this.targetObj.setSavelocalStorage(_this.savedName + '_' + _this.saveSeqn);
                }
            },
            load: function () {
                if (_this.saveSeqn > 0) {
                    _this.loadedName = _this.savedName + '_' + _this.saveSeqn;
                    _this.saveSeqn--;
                }
            },
            mesh: {
                radius: 5,
                tube: 0.7,
                radialSegments: 96,
                tubularSegments: 12,
                p: 5,
                q: 4
            },
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: 'Save & Load', type: 'folder', children: [
                    { name: "save", type: "button" },
                    { name: "load", type: "button" },
                ], isOpen: true },
            { name: 'Mesh', type: 'folder', control: 'mesh', children: [
                    { name: "radius", type: "number", min: 0, max: 40 },
                    { name: "tube", type: "number", min: 0, max: 40 },
                    { name: "radialSegments", type: "number", min: 0, max: 400, step: 1 },
                    { name: "tubularSegments", type: "number", min: 1, max: 20, step: 1 },
                    { name: "p", type: "number", min: 1, max: 10, step: 1 },
                    { name: "q", type: "number", min: 1, max: 15, step: 1 },
                ], isOpen: true },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0803Component.prototype.ngOnInit = function () {
    };
    Page0803Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    __decorate([
        core_1.ViewChild('target')
    ], Page0803Component.prototype, "targetObj");
    Page0803Component = __decorate([
        core_1.Component({
            selector: 'app-page0803',
            templateUrl: './page0803.component.html',
            styleUrls: ['./page0803.component.scss']
        })
    ], Page0803Component);
    return Page0803Component;
}());
exports.Page0803Component = Page0803Component;
