"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AudioComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var AudioComponent = /** @class */ (function () {
    function AudioComponent() {
        this.type = 'position';
        this.url = null;
        this.visible = true;
        this.autoplay = true;
        this.play = true;
        this.volume = 1;
        this.refDistance = 1;
        this.rolloffFactor = 1;
        this.distanceModel = "";
        this.maxDistance = 1;
        this.coneInnerAngle = 1;
        this.coneOuterAngle = 1;
        this.coneOuterGain = 1;
        this.audio = null;
        this.listener = null;
        this.analyser = null;
        this.refObject3d = null;
    }
    AudioComponent_1 = AudioComponent;
    AudioComponent.prototype.ngOnInit = function () { };
    AudioComponent.prototype.ngOnChanges = function (changes) {
        if (changes.type) {
            this.audio = null;
        }
        if (this.audio !== null && this.audio.buffer !== null && changes.url) {
            this.audio.buffer = null;
        }
        this.resetAudio();
    };
    AudioComponent.prototype.ngOnDestroy = function () {
        if (this.audio !== null) {
            if (this.audio.parent !== null) {
                this.audio.parent.remove(this.audio);
            }
            if (this.audio.source !== null) {
                this.audio.stop();
            }
        }
    };
    AudioComponent.prototype.loadAudio = function (url, onLoad) {
        AudioComponent_1.loadAudio(url, onLoad);
    };
    AudioComponent.loadAudio = function (url, onLoad) {
        if (this.audioLoader === null) {
            this.audioLoader = new THREE.AudioLoader();
        }
        this.audioLoader.load(url, function (audioBuffer) {
            onLoad(audioBuffer);
        }, function (request) { }, function (event) { });
    };
    AudioComponent.prototype.setListener = function (listener) {
        if (this.listener !== listener) {
            this.listener = listener;
            this.resetAudio();
        }
    };
    AudioComponent.prototype.setObject3D = function (refObject3d) {
        if (this.refObject3d !== refObject3d) {
            this.refObject3d = refObject3d;
            this.resetAudio();
        }
    };
    AudioComponent.prototype.resetAudio = function () {
        var _this = this;
        if (this.audio === null) {
            this.audio = this.getAudio();
        }
        if (this.audio !== null) {
            if (this.audio.listener !== this.listener) {
                this.audio.listener = this.listener;
            }
            if (this.refObject3d !== null) {
                if (this.audio.parent !== this.refObject3d) {
                    if (this.audio.parent !== null) {
                        this.audio.parent.remove(this.audio);
                    }
                    this.refObject3d.add(this.audio);
                }
            }
            if (this.audio.buffer === null && this.url !== null) {
                this.loadAudio(this.url, function (buffer) {
                    _this.audio.setBuffer(buffer);
                    _this.resetAudio();
                });
            }
            if (!this.visible) {
                if (this.audio.parent !== null) {
                    this.audio.parent.remove(this.audio);
                }
                this.audio.setVolume(0);
            }
            else if (this.visible) {
                if (this.audio.parent === null && this.audio.parent !== this.refObject3d) {
                    if (this.audio.parent !== null && this.audio.parent !== undefined) {
                        this.audio.parent.remove(this.audio);
                    }
                    this.refObject3d.add(this.audio);
                }
                this.audio.setVolume(this.volume);
                if (this.audio instanceof THREE.PositionalAudio) {
                    this.audio.setRefDistance(this.refDistance);
                    this.audio.setRolloffFactor(this.rolloffFactor);
                    // this.audio.setDistanceModel(this.distanceModel);
                    this.audio.setMaxDistance(this.maxDistance);
                    /*
                    this.audio.setDirectionalCone(
                      this.coneInnerAngle,
                      this.coneOuterAngle,
                      this.coneOuterGain
                    );
                    */
                    // this.audio.play();
                }
            }
            if (this.play && !this.audio.isPlaying) {
                this.audio.play();
            }
            else if (!this.play && this.audio.isPlaying) {
                this.audio.pause();
            }
            this.audio.visible = this.visible;
        }
    };
    AudioComponent.prototype.getAnalyser = function () {
        if (this.analyser == null && this.audio !== null) {
            this.analyser = new THREE.AudioAnalyser(this.audio);
        }
        return this.analyser;
    };
    AudioComponent.prototype.getAudio = function () {
        if (this.audio === null && this.listener !== null) {
            switch (this.type.toLowerCase()) {
                case 'audio':
                    this.audio = new THREE.Audio(this.listener);
                    break;
                case 'position':
                default:
                    this.audio = new THREE.PositionalAudio(this.listener);
                    break;
            }
            this.audio.autoplay = false;
        }
        return this.audio;
    };
    var AudioComponent_1;
    AudioComponent.audioLoader = null;
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "url");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "autoplay");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "play");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "volume");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "refDistance");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "rolloffFactor");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "distanceModel");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "maxDistance");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "coneInnerAngle");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "coneOuterAngle");
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "coneOuterGain");
    AudioComponent = AudioComponent_1 = __decorate([
        core_1.Component({
            selector: 'three-audio',
            templateUrl: './audio.component.html',
            styleUrls: ['./audio.component.scss']
        })
    ], AudioComponent);
    return AudioComponent;
}());
exports.AudioComponent = AudioComponent;
