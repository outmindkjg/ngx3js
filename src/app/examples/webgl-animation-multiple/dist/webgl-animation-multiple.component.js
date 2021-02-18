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
exports.WebglAnimationMultipleComponent = void 0;
var core_1 = require("@angular/core");
var three_1 = require("../../three");
var WebglAnimationMultipleComponent = /** @class */ (function (_super) {
    __extends(WebglAnimationMultipleComponent, _super);
    function WebglAnimationMultipleComponent() {
        return _super.call(this, {}, []) || this;
    }
    WebglAnimationMultipleComponent = __decorate([
        core_1.Component({
            selector: 'app-webgl-animation-multiple',
            templateUrl: './webgl-animation-multiple.component.html',
            styleUrls: ['./webgl-animation-multiple.component.scss']
        })
    ], WebglAnimationMultipleComponent);
    return WebglAnimationMultipleComponent;
}(three_1.BaseComponent));
exports.WebglAnimationMultipleComponent = WebglAnimationMultipleComponent;
