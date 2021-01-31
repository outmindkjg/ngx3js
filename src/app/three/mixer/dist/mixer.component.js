"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MixerComponent = void 0;
var clip_component_1 = require("./../clip/clip.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var MixerComponent = /** @class */ (function () {
    function MixerComponent() {
        this.action = "";
        this.duration = 0.5;
        this.mixer = null;
        this.model = null;
        this.clips = null;
        this.lastAction = null;
        this.lastPlayedClip = null;
    }
    MixerComponent.prototype.ngOnChanges = function (changes) {
        if (changes.action) {
            this.play(this.action.toLowerCase());
        }
    };
    MixerComponent.prototype.ngOnInit = function () {
    };
    MixerComponent.prototype.setModel = function (model, clips) {
        if (this.model !== model) {
            this.model = model;
            this.clips = clips;
            this.resetMixer();
            if (this.lastAction !== this.action) {
                this.play(this.action);
            }
        }
    };
    MixerComponent.prototype.resetMixer = function () {
        var _this = this;
        this.mixer = new THREE.AnimationMixer(this.model);
        this.clip.forEach(function (clip) {
            clip.setMixer(_this.mixer, _this.clips);
        });
    };
    MixerComponent.prototype.play = function (name) {
        var _this = this;
        if (this.clip !== null && this.clip !== undefined && this.clip.length > 0) {
            this.lastAction = name.toLowerCase();
            var foundAction_1 = null;
            this.clip.forEach(function (clip) {
                if (clip.isPlayable()) {
                    clip.action.paused = false;
                    if (clip.name.toLowerCase() == _this.lastAction) {
                        foundAction_1 = clip;
                    }
                }
            });
            console.log("----------");
            console.log(foundAction_1);
            console.log(this.lastPlayedClip);
            if (this.lastPlayedClip !== null) {
                if (foundAction_1 !== null) {
                    this.lastPlayedClip.crossFadeTo(foundAction_1, this.duration);
                }
                else {
                    this.lastPlayedClip.fadeOut(this.duration);
                }
            }
            else if (foundAction_1 !== null) {
                foundAction_1.fadeIn(this.duration);
            }
            this.lastPlayedClip = foundAction_1;
        }
    };
    MixerComponent.prototype.update = function (timer) {
        if (this.mixer !== null) {
            this.mixer.update(timer.delta);
        }
    };
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "action");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "duration");
    __decorate([
        core_1.ContentChildren(clip_component_1.ClipComponent, { descendants: false })
    ], MixerComponent.prototype, "clip");
    MixerComponent = __decorate([
        core_1.Component({
            selector: 'three-mixer',
            templateUrl: './mixer.component.html',
            styleUrls: ['./mixer.component.scss']
        })
    ], MixerComponent);
    return MixerComponent;
}());
exports.MixerComponent = MixerComponent;
