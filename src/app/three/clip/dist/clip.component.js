"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ClipComponent = void 0;
var interface_1 = require("./../interface");
var core_1 = require("@angular/core");
var THREE = require("three");
var ClipComponent = /** @class */ (function () {
    function ClipComponent() {
        this.name = "";
        this.index = -1;
        this.blendMode = "";
        this.additive = false;
        this.subclip = false;
        this.startFrame = 2;
        this.endFrame = 3;
        this.fps = null;
        this.weight = 1;
        this.timeScale = 1;
        this.clampWhenFinished = false;
        this.loop = null;
        this.mixer = null;
        this.clips = null;
        this.clip = null;
        this.action = null;
    }
    ClipComponent.prototype.getBlendMode = function (def) {
        var blendMode = interface_1.ThreeUtil.getTypeSafe(this.blendMode, def, '');
        switch (blendMode.toLowerCase()) {
            case 'normal':
                return THREE.NormalAnimationBlendMode;
            case 'additive':
                return THREE.AdditiveAnimationBlendMode;
        }
        return undefined;
    };
    ClipComponent.prototype.getFps = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.fps, def);
    };
    ClipComponent.prototype.getClampWhenFinished = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.clampWhenFinished, def);
    };
    ClipComponent.prototype.getLoop = function (def) {
        var loop = interface_1.ThreeUtil.getTypeSafe(this.loop, def, '');
        switch (loop.toLowerCase()) {
            case 'once':
                return THREE.LoopOnce;
            case 'pingpong':
                return THREE.LoopPingPong;
            case 'repeat':
            default:
                return THREE.LoopRepeat;
        }
    };
    ClipComponent.prototype.ngOnInit = function () {
    };
    ClipComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.resetAnimation();
        }
    };
    ClipComponent.prototype.setMixer = function (mixer, clips, fps) {
        if (this.mixer !== mixer) {
            this.mixer = mixer;
            this.clips = clips;
            this.resetAnimation();
        }
        if (fps !== null && fps !== undefined) {
            this.setFps(fps);
        }
    };
    ClipComponent.prototype.setFps = function (fps) {
        if (this.action !== null && this.clip !== null) {
            this.action.timeScale = (this.clip.tracks.length * this.getFps(fps)) / this.clip.duration;
        }
    };
    ClipComponent.prototype.resetAnimation = function () {
        if (this.clips !== null) {
            var clip = (this.index > -1) ? this.clips[this.index] : THREE.AnimationClip.findByName(this.clips, this.name);
            if (clip !== null) {
                if (this.action !== null) {
                    this.action.stop();
                }
                if (this.additive) {
                    THREE.AnimationUtils.makeClipAdditive(clip);
                    if (this.subclip) {
                        var subClip = THREE.AnimationUtils.subclip(clip, clip.name, this.startFrame, this.endFrame, this.getFps());
                        this.action = this.mixer.clipAction(subClip, null, this.getBlendMode());
                        this.clip = subClip;
                    }
                    else {
                        this.action = this.mixer.clipAction(clip, null, this.getBlendMode());
                        this.clip = clip;
                    }
                    this.action.enabled = true;
                    this.action.setEffectiveTimeScale(this.timeScale);
                    this.action.setEffectiveWeight(this.weight);
                    this.action.play();
                }
                else {
                    this.clip = clip;
                    this.action = this.mixer.clipAction(clip, null, this.getBlendMode());
                }
                if (this.getClampWhenFinished(false)) {
                    this.action.clampWhenFinished = true;
                }
                this.action.loop = this.getLoop('repeat');
            }
            else {
                this.action = null;
            }
        }
    };
    ClipComponent.prototype.play = function () {
        if (this.action !== null && !this.additive) {
            this.action.play();
        }
    };
    ClipComponent.prototype.crossFadeTo = function (endAction, duration) {
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
    ClipComponent.prototype.resetAction = function () {
        if (this.action !== null) {
            this.action.time = 0;
            this.action.enabled = true;
            // this.action.setEffectiveTimeScale( this.timeScale );
            // this.action.setEffectiveWeight( this.weight );
        }
    };
    ClipComponent.prototype.fadeIn = function (duration) {
        if (this.isPlayable()) {
            this.resetAction();
            this.action.fadeIn(duration).play();
        }
    };
    ClipComponent.prototype.fadeOut = function (duration) {
        if (this.isPlayable()) {
            this.action.fadeOut(duration).play();
        }
    };
    ClipComponent.prototype.isPlayable = function () {
        return this.action !== null && !this.additive;
    };
    ClipComponent.prototype.stop = function () {
        if (this.action !== null) {
            this.action.stop();
        }
    };
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "index");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "blendMode");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "additive");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "subclip");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "startFrame");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "endFrame");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "fps");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "weight");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "timeScale");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "clampWhenFinished");
    __decorate([
        core_1.Input()
    ], ClipComponent.prototype, "loop");
    ClipComponent = __decorate([
        core_1.Component({
            selector: 'three-clip',
            templateUrl: './clip.component.html',
            styleUrls: ['./clip.component.scss']
        })
    ], ClipComponent);
    return ClipComponent;
}());
exports.ClipComponent = ClipComponent;
