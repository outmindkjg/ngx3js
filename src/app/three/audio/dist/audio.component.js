"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AudioComponent = void 0;
var mixer_component_1 = require("./../mixer/mixer.component");
var core_1 = require("@angular/core");
var rxjs_1 = require("rxjs");
var THREE = require("three");
var interface_1 = require("../interface");
var AudioComponent = /** @class */ (function () {
    function AudioComponent() {
        this.type = 'position';
        this.url = null;
        this.videoUrl = null;
        this.visible = true;
        this.autoplay = true;
        this.play = true;
        this.loop = true;
        this.volume = 1;
        this.refDistance = 1;
        this.rolloffFactor = 1;
        this.distanceModel = "";
        this.maxDistance = 1;
        this.coneInnerAngle = 1;
        this.coneOuterAngle = 1;
        this.coneOuterGain = 1;
        this.fftSize = 128;
        this.onLoad = new core_1.EventEmitter();
        this.audio = null;
        this.video = null;
        this.listener = null;
        this.analyser = null;
        this._renderer = null;
        this.parent = null;
        this._textureSubject = new rxjs_1.Subject();
        this.loadedVideoTexture = null;
        this.loadedUrl = null;
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
            if (this.video !== null) {
                this.video.pause();
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
        }, function (request) {
        }, function (event) {
        });
    };
    AudioComponent.prototype.setListener = function (listener, renderer) {
        if (this.listener !== listener) {
            this.listener = listener;
            this._renderer = renderer;
            this.resetAudio();
        }
    };
    AudioComponent.prototype.setParent = function (parent) {
        if (this.parent !== parent) {
            this.parent = parent;
            this.resetAudio();
        }
    };
    AudioComponent.prototype.textureSubscribe = function () {
        return this._textureSubject.asObservable();
    };
    AudioComponent.prototype.getTexture = function () {
        if (this.loadedVideoTexture === null && this.video !== null) {
            this.loadedVideoTexture = new THREE.VideoTexture(this.video);
        }
        return this.loadedVideoTexture;
    };
    AudioComponent.prototype.checkAudioPlay = function () {
        var _this = this;
        var hasError = false;
        if (this.video !== null && this.play) {
            if (this.video.played.length === 0) {
                hasError = true;
            }
        }
        else if (this.audio !== null && this.play) {
            if (this.audio.source.context.currentTime === 0) {
                hasError = true;
            }
        }
        if (hasError && this._renderer && this._renderer.userGestureSubscribe) {
            var userGestureSubscribe_1 = this._renderer.userGestureSubscribe().subscribe(function (result) {
                if (result) {
                    _this.video = null;
                    _this.audio = null;
                    _this.loadedUrl = null;
                    _this.resetAudio();
                }
                userGestureSubscribe_1.unsubscribe();
            });
        }
        else {
            this.applyChanges3D(['mixer']);
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
            if (this.parent !== null) {
                if (this.audio.parent !== this.parent) {
                    if (this.audio.parent !== null) {
                        this.audio.parent.remove(this.audio);
                    }
                    this.parent.add(this.audio);
                }
            }
            if (this.url !== null && this.loadedUrl !== this.url) {
                this.loadedUrl = this.url;
                this.loadedVideoTexture = null;
                this.video = null;
                if (interface_1.ThreeUtil.isNotNull(this.videoUrl)) {
                    var video = document.createElement('video');
                    video.src = this.videoUrl;
                    video.loop = this.loop;
                    video.autoplay = this.autoplay;
                    this.audio.setMediaElementSource(video);
                    this.video = video;
                    if (this.autoplay || this.play) {
                        this.video.play().then(function () {
                            _this.resetAudio();
                            _this.onLoad.emit(_this);
                            _this._textureSubject.next(_this.video);
                        })["catch"](function () {
                            setTimeout(function () {
                                _this.checkAudioPlay();
                            }, 1000);
                        });
                    }
                    else {
                        this.resetAudio();
                        this.onLoad.emit(this);
                        this._textureSubject.next(this.video);
                    }
                }
                else {
                    this.loadAudio(this.url, function (buffer) {
                        _this.audio.setBuffer(buffer);
                        _this.resetAudio();
                        _this.onLoad.emit(_this);
                    });
                }
            }
            if (!this.visible) {
                if (this.audio.parent !== null) {
                    this.audio.parent.remove(this.audio);
                }
                this.audio.setVolume(0);
            }
            else if (this.visible) {
                if (this.audio.parent === null && this.audio.parent !== this.parent) {
                    if (this.audio.parent !== null && this.audio.parent !== undefined) {
                        this.audio.parent.remove(this.audio);
                    }
                    this.parent.add(this.audio);
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
            this.audio.loop = true;
            if (this.video !== null) {
                this.video.loop = this.loop;
                if (this.video.currentSrc) {
                    if (this.play && this.video.paused) {
                        this.video.play();
                    }
                    else if (!this.play && !this.video.paused) {
                        this.video.pause();
                    }
                    setTimeout(function () {
                        _this.checkAudioPlay();
                    }, 1000);
                }
            }
            else {
                if (this.audio.sourceType !== 'empty') {
                    if (this.play && !this.audio.isPlaying) {
                        this.audio.play();
                    }
                    else if (!this.play && this.audio.isPlaying) {
                        this.audio.pause();
                    }
                    setTimeout(function () {
                        _this.checkAudioPlay();
                    }, 1000);
                }
            }
            this.audio.visible = this.visible;
        }
    };
    AudioComponent.prototype.getAnalyser = function (fftSize) {
        if (this.analyser == null && this.audio !== null) {
            this.analyser = new THREE.AudioAnalyser(this.audio, fftSize || this.fftSize);
        }
        return this.analyser;
    };
    AudioComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.mixer.changes.subscribe(function () {
            _this.applyChanges3D(['mixer']);
        });
    };
    AudioComponent.prototype.applyChanges3D = function (changes) {
        var _this = this;
        if (this.audio !== null) {
            changes.forEach(function (change) {
                switch (change) {
                    case 'mixer':
                        _this.mixer.forEach(function (mixer) {
                            mixer.setModel(_this.audio, null);
                        });
                        break;
                }
            });
        }
    };
    AudioComponent.prototype.getAudio = function () {
        if (this.audio === null && this.listener !== null) {
            this.loadedVideoTexture = null;
            this.video = null;
            switch (this.type.toLowerCase()) {
                case 'audio':
                    this.audio = new THREE.Audio(this.listener);
                    break;
                case 'position':
                default:
                    this.audio = new THREE.PositionalAudio(this.listener);
                    break;
            }
            this.audio.autoplay = this.autoplay;
            if (interface_1.ThreeUtil.isNull(this.audio.userData.component)) {
                this.audio.userData.component = this;
            }
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
    ], AudioComponent.prototype, "videoUrl");
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
    ], AudioComponent.prototype, "loop");
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
    __decorate([
        core_1.Input()
    ], AudioComponent.prototype, "fftSize");
    __decorate([
        core_1.Output()
    ], AudioComponent.prototype, "onLoad");
    __decorate([
        core_1.ContentChildren(mixer_component_1.MixerComponent, { descendants: false })
    ], AudioComponent.prototype, "mixer");
    AudioComponent = AudioComponent_1 = __decorate([
        core_1.Component({
            selector: 'ngx3js-audio',
            templateUrl: './audio.component.html',
            styleUrls: ['./audio.component.scss']
        })
    ], AudioComponent);
    return AudioComponent;
}());
exports.AudioComponent = AudioComponent;
