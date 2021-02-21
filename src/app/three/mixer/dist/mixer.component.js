"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.MixerComponent = void 0;
var rxjs_1 = require("rxjs");
var MMDAnimationHelper_1 = require("three/examples/jsm/animation/MMDAnimationHelper");
var interface_1 = require("./../interface");
var clip_component_1 = require("./../clip/clip.component");
var core_1 = require("@angular/core");
var THREE = require("three");
var MixerComponent = /** @class */ (function () {
    function MixerComponent() {
        this.type = "mixer";
        this.action = "";
        this.fps = null;
        this.duration = 0.5;
        this.timeScale = 1;
        this.debug = false;
        this.sync = null;
        this.afterglow = null;
        this.resetPhysicsOnLoop = null;
        this.physics = null;
        this.warmup = null;
        this.unitStep = null;
        this.maxStepNum = null;
        this.gravity = null;
        this.delayTime = null;
        this.animationHelper = null;
        this.onLoad = new core_1.EventEmitter();
        this.mixer = null;
        this.helper = null;
        this.model = null;
        this.clips = null;
        this.lastAction = null;
        this._animationHelperSubscribe = null;
        this._animationHelperSubject = new rxjs_1.Subject();
        this._physics = null;
        this._ammo = null;
        this.isAdded = false;
        this.lastPlayedClip = null;
    }
    MixerComponent.prototype.getFps = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.fps, def);
    };
    MixerComponent.prototype.getTimeScale = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.timeScale, def);
    };
    MixerComponent.prototype.getSync = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.sync, def);
    };
    MixerComponent.prototype.getAfterglow = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.afterglow, def);
    };
    MixerComponent.prototype.getResetPhysicsOnLoop = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.resetPhysicsOnLoop, def);
    };
    MixerComponent.prototype.getPhysics = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.physics, def);
    };
    MixerComponent.prototype.getWarmup = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.warmup, def);
    };
    MixerComponent.prototype.getUnitStep = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.unitStep, def);
    };
    MixerComponent.prototype.getMaxStepNum = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.maxStepNum, def);
    };
    MixerComponent.prototype.getGravity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.gravity, def);
    };
    MixerComponent.prototype.getDelayTime = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.delayTime, def);
    };
    MixerComponent.prototype.ngOnChanges = function (changes) {
        var _this = this;
        if (changes.action) {
            this.play(this.action.toLowerCase());
        }
        if (changes.timeScale && this.mixer !== null) {
            this.mixer.timeScale = this.getTimeScale(1);
        }
        if (changes.fps && this.mixer !== null) {
            var fps_1 = this.getFps(20);
            this.clip.forEach(function (clip) {
                clip.setMixer(_this.mixer, _this.clips, fps_1);
            });
        }
    };
    MixerComponent.prototype.ngOnInit = function () {
    };
    MixerComponent.prototype.ngOnDestroy = function () {
        if (this.mixer !== null) {
            this.mixer.stopAllAction();
        }
    };
    MixerComponent.prototype.setModel = function (model, clips) {
        if (this.model !== model) {
            this.model = model;
            this.clips = clips;
            if (this.debug) {
                var clipsNames_1 = [];
                this.clips.forEach(function (clip) {
                    clipsNames_1.push(clip.name);
                });
                console.log(clipsNames_1);
            }
            this.resetMixer();
            if (this.lastAction !== this.action) {
                this.play(this.action);
            }
        }
    };
    MixerComponent.prototype.setPhysics = function (physics) {
        var _this = this;
        this._physics = physics;
        if (this._physics !== null && this._physics !== undefined) {
            var _physics = this._physics.getPhysics();
            if (_physics !== null) {
                this._ammo = this._physics.getAmmo();
                this.synkAnimationHelper(this.helper);
            }
            else {
                var subscribe_1 = this._physics.physicsSubscribe().subscribe(function () {
                    _this._ammo = _this._physics.getAmmo();
                    _this.synkAnimationHelper(_this.helper);
                    subscribe_1.unsubscribe();
                });
            }
        }
    };
    MixerComponent.prototype.animationHelperSubscribe = function () {
        return this._animationHelperSubject.asObservable();
    };
    MixerComponent.prototype.fadeToAction = function (endAction, duration, restoreAction, restoreDuration) {
        var _this = this;
        if (this.mixer !== null) {
            if (this.play(endAction, duration)) {
                if (interface_1.ThreeUtil.isNotNull(restoreAction)) {
                    var listener_1 = function () {
                        _this.mixer.removeEventListener('finished', listener_1);
                        _this.play(restoreAction, restoreDuration);
                    };
                    this.mixer.addEventListener('finished', listener_1);
                }
            }
        }
    };
    MixerComponent.prototype.synkAnimationHelper = function (helper) {
        var _this = this;
        if (helper !== null && !this.isAdded) {
            if (this.model instanceof THREE.SkinnedMesh || this.model instanceof THREE.Camera) {
                if (this._ammo || this.getPhysics(false) == false) {
                    var skinnedMesh_1 = this.model;
                    var oldParent = skinnedMesh_1.parent;
                    if (interface_1.ThreeUtil.isNotNull(oldParent)) {
                        skinnedMesh_1.parent.remove(skinnedMesh_1);
                        skinnedMesh_1.parent = null;
                    }
                    this.clips.forEach(function (clip) {
                        helper.add(skinnedMesh_1, {
                            animation: clip,
                            physics: _this.getPhysics()
                        });
                    });
                    if (interface_1.ThreeUtil.isNotNull(oldParent)) {
                        oldParent.add(skinnedMesh_1);
                    }
                    this.isAdded = true;
                }
            }
            else if (this.model instanceof THREE.Audio) {
                helper.add(this.model, {
                    delayTime: this.getDelayTime()
                });
            }
        }
    };
    MixerComponent.prototype.resetMixer = function () {
        var _this = this;
        switch (this.type.toLowerCase()) {
            case 'mmd':
            case 'mmdanimation':
            case 'mmdanimationhelper':
                if (this.helper === null) {
                    if (this.animationHelper === null) {
                        this.helper = new MMDAnimationHelper_1.MMDAnimationHelper({
                            sync: this.getSync(),
                            afterglow: this.getAfterglow(),
                            resetPhysicsOnLoop: this.getResetPhysicsOnLoop()
                        });
                        // this.helper.sharedPhysics = true;
                        this.synkAnimationHelper(this.helper);
                        this._animationHelperSubject.next(this.helper);
                    }
                    else {
                        this.animationHelper.animationHelperSubscribe().subscribe(function (helper) {
                            _this.synkAnimationHelper(helper);
                        });
                        if (this.animationHelper.helper !== null) {
                            this.synkAnimationHelper(this.animationHelper.helper);
                        }
                    }
                    this.onLoad.emit(this);
                }
                break;
            case 'mixer':
            default:
                if (this.mixer == null) {
                    this.mixer = new THREE.AnimationMixer(this.model);
                    this.mixer.timeScale = this.getTimeScale(1);
                    var fps_2 = this.getFps();
                    this.clip.forEach(function (clip) {
                        clip.setMixer(_this.mixer, _this.clips, fps_2);
                    });
                    this.onLoad.emit(this);
                }
                break;
        }
    };
    MixerComponent.prototype.play = function (name, duration) {
        var _this = this;
        if (duration === void 0) { duration = this.duration; }
        if (this.mixer !== null && this.clip !== null && this.clip !== undefined && this.clip.length > 0) {
            duration = interface_1.ThreeUtil.getTypeSafe(duration, this.duration);
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
            if (this.lastPlayedClip !== null) {
                if (foundAction_1 !== null) {
                    this.lastPlayedClip.crossFadeTo(foundAction_1, duration);
                }
                else {
                    this.lastPlayedClip.fadeOut(duration);
                }
            }
            else if (foundAction_1 !== null) {
                foundAction_1.fadeIn(duration);
            }
            this.lastPlayedClip = foundAction_1;
            return true;
        }
        else {
            return false;
        }
    };
    MixerComponent.prototype.update = function (timer) {
        if (this.helper !== null) {
            this.helper.update(timer.delta);
        }
        else if (this.mixer !== null) {
            this.mixer.update(timer.delta);
        }
    };
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "action");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "fps");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "duration");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "timeScale");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "debug");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "sync");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "afterglow");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "resetPhysicsOnLoop");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "physics");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "warmup");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "unitStep");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "maxStepNum");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "gravity");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "delayTime");
    __decorate([
        core_1.Input()
    ], MixerComponent.prototype, "animationHelper");
    __decorate([
        core_1.Output()
    ], MixerComponent.prototype, "onLoad");
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
