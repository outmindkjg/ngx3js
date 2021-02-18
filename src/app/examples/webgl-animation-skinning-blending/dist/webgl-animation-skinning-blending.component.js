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
exports.WebglAnimationSkinningBlendingComponent = void 0;
var core_1 = require("@angular/core");
var three_1 = require("./../../three");
var WebglAnimationSkinningBlendingComponent = /** @class */ (function (_super) {
    __extends(WebglAnimationSkinningBlendingComponent, _super);
    function WebglAnimationSkinningBlendingComponent() {
        var _this = _super.call(this, {
            activate: true,
            "continue": true,
            singleStep: false,
            stepSize: 0.05,
            fromWalkToIdle: function () {
                _this.fadeToAction('walk', 'idle', 1.0);
            },
            fromIdleToWalk: function () {
                _this.fadeToAction('idle', 'walk', 0.5);
            },
            fromWalkToRun: function () {
                _this.fadeToAction('walk', 'run', 2.5);
            },
            fromRunToWalk: function () {
                _this.fadeToAction('run', 'walk', 5.0);
            },
            useDefaultDuration: true,
            setCustomDuration: 3.5,
            modifyIdleWeight: 0.0,
            modifyWalkWeight: 1.0,
            modifyRunWeight: 0.0,
            modifyTimeScale: 1.0
        }, [
            { name: 'Pausing/Stepping', type: 'folder', children: [
                    { name: 'continue', type: 'checkbox', title: 'pause/continue' },
                    { name: 'singleStep', type: 'checkbox', title: 'make single step' },
                    { name: 'stepSize', type: 'number', title: 'modify step size', min: 0.01, max: 0.1, step: 0.001 },
                ] },
            { name: 'Crossfading', type: 'folder', children: [
                    { name: 'fromWalkToIdle', type: 'button', title: 'from walk to idle' },
                    { name: 'fromIdleToWalk', type: 'button', title: 'from idle to walk' },
                    { name: 'fromWalkToRun', type: 'button', title: 'from walk to run' },
                    { name: 'fromRunToWalk', type: 'button', title: 'from run to walk' },
                    { name: 'useDefaultDuration', type: 'button', title: 'use default duration' },
                    { name: 'setCustomDuration', type: 'number', min: 0, max: 10, step: 0.01, title: 'set custom duration' },
                ] },
            { name: 'Blend Weights', type: 'folder', children: [
                    { name: 'modifyIdleWeight', type: 'number', min: 0.0, max: 1.0, step: 0.01, title: 'modify idle weight' },
                    { name: 'modifyWalkWeight', type: 'number', min: 0.0, max: 1.0, step: 0.01, title: 'modify walk weight' },
                    { name: 'modifyRunWeight', type: 'number', min: 0.0, max: 1.0, step: 0.01, title: 'modify run weight' },
                ] },
            { name: 'General Speed', type: 'folder', children: [
                    { name: 'modifyTimeScale', type: 'number', min: 0.0, max: 1.5, step: 0.01, title: 'modify time scale' },
                ] },
        ]) || this;
        _this.mixer = null;
        return _this;
    }
    WebglAnimationSkinningBlendingComponent.prototype.setMixer = function (mixer) {
        this.mixer = mixer;
    };
    WebglAnimationSkinningBlendingComponent.prototype.fadeToAction = function (endAction, restoreAction, duration) {
        if (this.mixer !== null) {
            this.mixer.fadeToAction(endAction, duration, restoreAction, duration);
        }
    };
    WebglAnimationSkinningBlendingComponent = __decorate([
        core_1.Component({
            selector: 'app-webgl-animation-skinning-blending',
            templateUrl: './webgl-animation-skinning-blending.component.html',
            styleUrls: ['./webgl-animation-skinning-blending.component.scss']
        })
    ], WebglAnimationSkinningBlendingComponent);
    return WebglAnimationSkinningBlendingComponent;
}(three_1.BaseComponent));
exports.WebglAnimationSkinningBlendingComponent = WebglAnimationSkinningBlendingComponent;
