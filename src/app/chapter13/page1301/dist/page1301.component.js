"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1301Controller = exports.Page1301Component = void 0;
var core_1 = require("@angular/core");
var three_1 = require("./../../three");
var Page1301Component = /** @class */ (function () {
    function Page1301Component() {
        this.controller = Page1301Controller;
        this.controls = {
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page1301Component.prototype.buttonClick = function (e) {
        console.log(e);
    };
    Page1301Component.prototype.ngOnInit = function () {
    };
    Page1301Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1301Component = __decorate([
        core_1.Component({
            selector: 'app-page1301',
            templateUrl: './page1301.component.html',
            styleUrls: ['./page1301.component.scss']
        })
    ], Page1301Component);
    return Page1301Component;
}());
exports.Page1301Component = Page1301Component;
var Page1301Controller = /** @class */ (function (_super) {
    __extends(Page1301Controller, _super);
    function Page1301Controller() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Page1301Controller;
}(three_1.AbstractThreeController));
exports.Page1301Controller = Page1301Controller;
