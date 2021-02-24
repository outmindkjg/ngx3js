"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0511Component = void 0;
var core_1 = require("@angular/core");
var Page0511Component = /** @class */ (function () {
    function Page0511Component() {
        this.controls = {
            radius: 10,
            detail: 0,
            type: 'Icosahedron',
            wireframe: false
        };
        this.controlsParams = [
            { name: "radius", type: "number", min: 0, max: 40 },
            { name: "detail", type: "number", min: 0, max: 3, step: 1 },
            { name: "type", type: "select", select: ['Icosahedron', 'Tetrahedron', 'Octahedron', 'Dodecahedron', 'Polyhedron'] },
            { name: "wireframe", type: "button" },
        ];
        this.verticesCustom = [
            1, 1, 1, -1, -1, 1, -1, 1, -1, 1, -1, -1
        ];
        this.indicesCustom = [
            2, 1, 0, 0, 3, 2, 1, 3, 0, 2, 3, 1
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0511Component.prototype.ngOnInit = function () {
    };
    Page0511Component.prototype.onRender = function (timer) {
        this.rotation.y += timer.delta * 20;
        this.rotation.x = this.rotation.z = this.rotation.y;
    };
    Page0511Component = __decorate([
        core_1.Component({
            selector: 'app-page0511',
            templateUrl: './page0511.component.html',
            styleUrls: ['./page0511.component.scss']
        })
    ], Page0511Component);
    return Page0511Component;
}());
exports.Page0511Component = Page0511Component;
