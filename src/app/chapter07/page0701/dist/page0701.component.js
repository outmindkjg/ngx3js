"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0701Component = void 0;
var core_1 = require("@angular/core");
var Page0701Component = /** @class */ (function () {
    function Page0701Component() {
        var _this = this;
        this.controls = {
            x: 10,
            y: 10,
            rotate: true,
            wireframe: false,
            reDraw: function () {
                _this.positions = [];
                var maxSize = 100;
                var distX = maxSize / _this.controls.x;
                var distY = maxSize / _this.controls.y;
                for (var x = 0; x < _this.controls.x; x++) {
                    for (var y = 0; y < _this.controls.y; y++) {
                        _this.positions.push({ x: x * distX - maxSize / 2, y: y * distY - maxSize / 2, z: 0 });
                    }
                }
            }
        };
        this.controlsParams = [
            { name: "x", type: "number", min: 1, max: 10, step: 1 },
            { name: "y", type: "number", min: 1, max: 10, step: 1 },
            { name: "reDraw", type: "button" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
        this.positions = [];
    }
    Page0701Component.prototype.ngOnInit = function () {
        this.controls.reDraw();
    };
    Page0701Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0701Component = __decorate([
        core_1.Component({
            selector: 'app-page0701',
            templateUrl: './page0701.component.html',
            styleUrls: ['./page0701.component.scss']
        })
    ], Page0701Component);
    return Page0701Component;
}());
exports.Page0701Component = Page0701Component;
