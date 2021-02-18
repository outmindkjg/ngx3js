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
exports.WebglAnimationSkinningAdditiveBlendingComponent = void 0;
var core_1 = require("@angular/core");
var three_1 = require("./../../three");
var WebglAnimationSkinningAdditiveBlendingComponent = /** @class */ (function (_super) {
    __extends(WebglAnimationSkinningAdditiveBlendingComponent, _super);
    function WebglAnimationSkinningAdditiveBlendingComponent() {
        return _super.call(this, {
            action: 'idle',
            sneak_pose: 0,
            sad_pose: 0,
            agree: 0,
            head_shake: 0,
            duration: 1
        }, [
            { name: "action", type: "select", select: ['None', 'idle', 'run', 'walk'] },
            { name: "Additive Action Weights", type: "folder", children: [
                    { name: "sneak_pose", title: 'Sneak Pose', type: "number", min: 0.0, max: 2, step: 0.01 },
                    { name: "sad_pose", title: 'Sad Pose', type: "number", min: 0.0, max: 1, step: 0.01 },
                    { name: "agree", title: 'Agree', type: "number", min: 0.0, max: 1, step: 0.01 },
                    { name: "head_shake", title: 'Head Shake', type: "number", min: 0.0, max: 1, step: 0.01 },
                ], isOpen: true },
            { name: "duration", type: "number", min: 0.2, max: 5 },
        ]) || this;
    }
    WebglAnimationSkinningAdditiveBlendingComponent = __decorate([
        core_1.Component({
            selector: 'app-webgl-animation-skinning-additive-blending',
            templateUrl: './webgl-animation-skinning-additive-blending.component.html',
            styleUrls: ['./webgl-animation-skinning-additive-blending.component.scss']
        })
    ], WebglAnimationSkinningAdditiveBlendingComponent);
    return WebglAnimationSkinningAdditiveBlendingComponent;
}(three_1.BaseComponent));
exports.WebglAnimationSkinningAdditiveBlendingComponent = WebglAnimationSkinningAdditiveBlendingComponent;
