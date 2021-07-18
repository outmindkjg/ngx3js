"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AnimationComponent = void 0;
var interface_1 = require("./../interface");
var core_1 = require("@angular/core");
var THREE = require("three");
var AnimationComponent = /** @class */ (function () {
    function AnimationComponent() {
        this.name = "";
        this.blendMode = "";
        this.additive = false;
        this.subclip = false;
        this.startFrame = 2;
        this.endFrame = 3;
        this.fps = 30;
        this.weight = 1;
        this.timeScale = 1;
        this.mixer = null;
        this.clips = null;
        this.action = null;
    }
    AnimationComponent.prototype.ngOnInit = function () {
    };
    AnimationComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.resetAnimation();
        }
    };
    AnimationComponent.prototype.getBlendMode = function (def) {
        var blendMode = interface_1.ThreeUtil.getTypeSafe(this.blendMode, def, '');
        switch (blendMode.toLowerCase()) {
            case 'normal':
                return THREE.NormalAnimationBlendMode;
            case 'additive':
                return THREE.AdditiveAnimationBlendMode;
        }
        return undefined;
    };
    AnimationComponent.prototype.setMixer = function (mixer, clips) {
        if (this.mixer !== mixer) {
            this.mixer = mixer;
            this.clips = clips;
            this.resetAnimation();
        }
    };
    AnimationComponent.prototype.resetAnimation = function () {
        if (this.clips !== null) {
            var clip = THREE.AnimationClip.findByName(this.clips, this.name);
            if (clip !== null) {
                if (this.action !== null) {
                    this.action.stop();
                }
                if (this.additive) {
                    THREE.AnimationUtils.makeClipAdditive(clip);
                    if (this.subclip) {
                        this.action = this.mixer.clipAction(THREE.AnimationUtils.subclip(clip, clip.name, this.startFrame, this.endFrame, this.fps), null, this.getBlendMode());
                    }
                    else {
                        this.action = this.mixer.clipAction(clip, null, this.getBlendMode());
                    }
                    this.action.enabled = true;
                    this.action.setEffectiveTimeScale(this.timeScale);
                    this.action.setEffectiveWeight(this.weight);
                    this.action.play();
                }
                else {
                    this.action = this.mixer.clipAction(clip, null, this.getBlendMode());
                }
            }
            else {
                this.action = null;
            }
        }
    };
    AnimationComponent.prototype.play = function () {
        if (this.action !== null && !this.additive) {
            this.action.play();
        }
    };
    AnimationComponent.prototype.crossFadeTo = function (endAction, duration) {
        if (this.isPlayable()) {
            if (endAction !== null && endAction !== undefined && endAction.action !== null) {
                endAction.resetAction();
                this.action.crossFadeTo(endAction.action, duration, false).play();
            }
            else {
                this.fadeIn(duration);
            }
        }
    };
    AnimationComponent.prototype.resetAction = function () {
        if (this.action !== null) {
            this.action.time = 0;
            this.action.enabled = true;
            this.action.setEffectiveTimeScale(this.timeScale);
            this.action.setEffectiveWeight(this.weight);
        }
    };
    AnimationComponent.prototype.fadeIn = function (duration) {
        if (this.isPlayable()) {
            this.resetAction();
            this.action.fadeIn(duration).play();
        }
    };
    AnimationComponent.prototype.fadeOut = function (duration) {
        if (this.isPlayable()) {
            this.action.fadeOut(duration).play();
        }
    };
    AnimationComponent.prototype.isPlayable = function () {
        return this.action !== null && !this.additive;
    };
    AnimationComponent.prototype.stop = function () {
        if (this.action !== null) {
            this.action.stop();
        }
    };
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "blendMode");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "additive");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "subclip");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "startFrame");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "endFrame");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "fps");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "weight");
    __decorate([
        core_1.Input()
    ], AnimationComponent.prototype, "timeScale");
    AnimationComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-clip',
            templateUrl: './animation.component.html',
            styleUrls: ['./animation.component.scss']
        })
    ], AnimationComponent);
    return AnimationComponent;
}());
exports.AnimationComponent = AnimationComponent;
