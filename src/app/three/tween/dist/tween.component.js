"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TweenComponent = void 0;
var core_1 = require("@angular/core");
var TWEEN = require("@tweenjs/tween.js");
var TweenComponent = /** @class */ (function () {
    function TweenComponent() {
    }
    TweenComponent.prototype.ngOnInit = function () {
    };
    TweenComponent.prototype.getTween = function (tween) {
        tween.to({ x: 10, y: 10 }, 5000)
            .easing(TWEEN.Easing.Quadratic.Out)
            .repeat(2);
        // .yoyo(true);
        return tween;
    };
    TweenComponent = __decorate([
        core_1.Component({
            selector: 'three-tween',
            templateUrl: './tween.component.html',
            styleUrls: ['./tween.component.scss']
        })
    ], TweenComponent);
    return TweenComponent;
}());
exports.TweenComponent = TweenComponent;
