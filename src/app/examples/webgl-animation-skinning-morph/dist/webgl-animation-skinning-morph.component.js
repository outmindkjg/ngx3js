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
exports.WebglAnimationSkinningMorphComponent = void 0;
var interface_1 = require("./../../three/interface");
var core_1 = require("@angular/core");
var three_1 = require("../../three");
var WebglAnimationSkinningMorphComponent = /** @class */ (function (_super) {
    __extends(WebglAnimationSkinningMorphComponent, _super);
    function WebglAnimationSkinningMorphComponent() {
        var _this = _super.call(this, {
            status: 'Walking',
            jump: function () { _this.fadeToAction('Jump', 0.2); },
            yes: function () { _this.fadeToAction('yes', 0.2); },
            no: function () { _this.fadeToAction('no', 0.2); },
            wave: function () { _this.fadeToAction('wave', 0.2); },
            punch: function () { _this.fadeToAction('punch', 0.2); },
            thumbsUp: function () { _this.fadeToAction('thumbsUp', 0.2); },
            angry: 0,
            surprised: 0,
            sad: 0
        }, [
            { name: 'status', type: 'select', select: ['Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing'] },
            { name: 'Emotes', type: 'folder', children: [
                    { name: 'jump', type: 'button' },
                    { name: 'yes', type: 'button' },
                    { name: 'no', type: 'button' },
                    { name: 'wave', type: 'button' },
                    { name: 'punch', type: 'button' },
                    { name: 'thumbsUp', type: 'button' },
                ], isOpen: true },
            { name: 'Expressions', type: 'folder', children: [
                    { name: 'angry', type: 'number', min: 0, max: 1, step: 0.01, change: function () { _this.updateExpressions(); } },
                    { name: 'surprised', type: 'number', min: 0, max: 1, step: 0.01, change: function () { _this.updateExpressions(); } },
                    { name: 'sad', type: 'number', min: 0, max: 1, step: 0.01, change: function () { _this.updateExpressions(); } },
                ], isOpen: true },
        ]) || this;
        _this.mixer = null;
        return _this;
    }
    WebglAnimationSkinningMorphComponent.prototype.fadeToAction = function (endAction, duration, restoreAction, restoreDuration) {
        if (this.mixer !== null) {
            restoreAction = interface_1.ThreeUtil.getTypeSafe(restoreAction, this.controls.status);
            restoreDuration = interface_1.ThreeUtil.getTypeSafe(restoreDuration, 0.2);
            this.mixer.fadeToAction(endAction, duration, restoreAction, restoreDuration);
        }
    };
    WebglAnimationSkinningMorphComponent.prototype.updateExpressions = function () {
        if (this.mixer !== null && this.mesh !== null) {
            var face = this.mesh.getObjectByName('Head_4');
            if (interface_1.ThreeUtil.isNotNull(face)) {
                console.log(face);
                // face.morphTargetInfluences
            }
        }
    };
    WebglAnimationSkinningMorphComponent.prototype.setMixer = function (mixer) {
        this.mixer = mixer;
    };
    WebglAnimationSkinningMorphComponent = __decorate([
        core_1.Component({
            selector: 'app-webgl-animation-skinning-morph',
            templateUrl: './webgl-animation-skinning-morph.component.html',
            styleUrls: ['./webgl-animation-skinning-morph.component.scss']
        })
    ], WebglAnimationSkinningMorphComponent);
    return WebglAnimationSkinningMorphComponent;
}(three_1.BaseComponent));
exports.WebglAnimationSkinningMorphComponent = WebglAnimationSkinningMorphComponent;
