"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TweenComponent = void 0;
var core_1 = require("@angular/core");
var GSAP = require("gsap");
var THREE = require("three");
var TweenComponent = /** @class */ (function () {
    function TweenComponent() {
        this.to = null;
        this.duration = null;
        this.easing = null;
        this.template = null;
        this.repeat = null;
        this.yoyo = null;
        this.overshoot = null;
        this.amplitude = null;
        this.period = null;
        this.linearRatio = null;
        this.power = null;
        this.yoyoMode = null;
        this.steps = null;
        this.parentEle = null;
        this.tweenTarget = null;
    }
    TweenComponent.prototype.isNull = function (value) {
        return value === null || value === undefined;
    };
    TweenComponent.prototype.isNotNull = function (value) {
        return !this.isNull(value);
    };
    TweenComponent.prototype.getTypeSafe = function (value, altValue, nullValue) {
        var defValue = this.isNotNull(value) ? value : altValue;
        if (this.isNotNull(defValue)) {
            return defValue;
        }
        if (this.isNotNull(nullValue)) {
            return nullValue;
        }
        else {
            return undefined;
        }
    };
    TweenComponent.prototype.getDuration = function (def) {
        return this.getTypeSafe(this.duration, def, 3);
    };
    TweenComponent.prototype.getRepeat = function (def) {
        return this.getTypeSafe(this.repeat, def, 1);
    };
    TweenComponent.prototype.getYoyo = function (def) {
        return this.getTypeSafe(this.yoyo, def, false);
    };
    TweenComponent.prototype.getOvershoot = function (def) {
        return this.getTypeSafe(this.overshoot, def, 1);
    };
    TweenComponent.prototype.getAmplitude = function (def) {
        return this.getTypeSafe(this.amplitude, def, 1);
    };
    TweenComponent.prototype.getPeriod = function (def) {
        return this.getTypeSafe(this.period, def, 1);
    };
    TweenComponent.prototype.getLinearRatio = function (def) {
        return this.getTypeSafe(this.linearRatio, def, 1);
    };
    TweenComponent.prototype.getPower = function (def) {
        return this.getTypeSafe(this.power, def, 1);
    };
    TweenComponent.prototype.getYoyoMode = function (def) {
        return this.getTypeSafe(this.yoyoMode, def, false);
    };
    TweenComponent.prototype.getSteps = function (def) {
        return this.getTypeSafe(this.steps, def, 12);
    };
    TweenComponent.prototype.getEasing = function (def, isTemplate) {
        var easing = isTemplate
            ? this.getTypeSafe(this.template, def, '')
            : this.getTypeSafe(this.easing, def, '');
        switch (easing.toLowerCase()) {
            case 'power1':
            case 'power1.easein':
                return GSAP.Power1.easeIn;
            case 'Power1.easeInOut':
                return GSAP.Power1.easeInOut;
            case 'Power1.easeOut':
                return GSAP.Power1.easeOut;
            case 'Power2':
            case 'Power2.easeIn':
                return GSAP.Power2.easeIn;
            case 'Power2.easeInOut':
                return GSAP.Power2.easeInOut;
            case 'Power2.easeOut':
                return GSAP.Power2.easeOut;
            case 'Power3':
            case 'Power3.easeIn':
                return GSAP.Power3.easeIn;
            case 'Power3.easeInOut':
                return GSAP.Power3.easeInOut;
            case 'Power3.easeOut':
                return GSAP.Power3.easeOut;
            case 'Power4':
            case 'Power4.easeIn':
                return GSAP.Power4.easeIn;
            case 'Power4.easeInOut':
                return GSAP.Power4.easeInOut;
            case 'Power4.easeOut':
                return GSAP.Power4.easeOut;
            case 'Back':
            case 'Back.easeIn':
                return GSAP.Back.easeIn.config(this.getOvershoot(1.7));
            case 'Back.easeInOut':
                return GSAP.Back.easeInOut.config(this.getOvershoot(1.7));
            case 'Back.easeOut':
                return GSAP.Back.easeOut.config(this.getOvershoot(1.7));
            case 'Elastic':
            case 'Elastic.easeIn':
                return GSAP.Elastic.easeIn.config(this.getAmplitude(1), this.getPeriod(0.3));
            case 'Elastic.easeInOut':
                return GSAP.Elastic.easeInOut.config(this.getAmplitude(1), this.getPeriod(0.3));
            case 'Elastic.easeOut':
                return GSAP.Elastic.easeOut.config(this.getAmplitude(1), this.getPeriod(0.3));
            case 'Bounce':
            case 'Bounce.easeIn':
                return GSAP.Bounce.easeIn;
            case 'Bounce.easeInOut':
                return GSAP.Bounce.easeInOut;
            case 'Bounce.easeOut':
                return GSAP.Bounce.easeOut;
            case 'Rough':
            case 'Rough.easeIn':
            case 'Rough.easeInOut':
            case 'Rough.easeOut':
            /*
            return GSAP.RoughEase.config({
              template: this.getEasing(null, true),
              strength: 1,
              points: 20,
              taper: 'none',
              randomize: true,
              clamp: false,
            });
            */
            case 'SlowMo':
            case 'SlowMo.easeIn':
            case 'SlowMo.easeInOut':
            case 'SlowMo.easeOut':
            /*
            return GSAP.SlowMo.ease.config(
              this.getLinearRatio(0.7),
              this.getPower(0.7),
              this.getYoyoMode(false)
            );
            */
            case 'Stepped':
            case 'Stepped.easeIn':
            case 'Stepped.easeInOut':
            case 'Stepped.easeOut':
                //  return GSAP.SteppedEase;
                return GSAP.SteppedEase.config(this.getSteps(12));
            case 'Circ':
            case 'Circ.easeIn':
                return GSAP.Circ.easeIn;
            case 'Circ.easeInOut':
                return GSAP.Circ.easeInOut;
            case 'Circ.easeOut':
                return GSAP.Circ.easeOut;
            case 'Expo':
            case 'Expo.easeIn':
                return GSAP.Expo.easeIn;
            case 'Expo.easeInOut':
                return GSAP.Expo.easeInOut;
            case 'Expo.easeOut':
                return GSAP.Expo.easeOut;
            case 'Sine':
            case 'Sine.easeIn':
                return GSAP.Sine.easeIn;
            case 'Sine.easeInOut':
                return GSAP.Sine.easeInOut;
            case 'Sine.easeOut':
                return GSAP.Sine.easeOut;
            case 'Custom':
            case 'Custom.easeIn':
            case 'Custom.easeInOut':
            case 'Custom.easeOut':
                return GSAP.Power0.easeNone;
            //  return GSAP.CustomEase.create();
            case 'Power0':
            case 'Power0.easeIn':
            case 'Power0.easeInOut':
            case 'Power0.easeOut':
            default:
                return GSAP.Power0.easeNone;
        }
    };
    TweenComponent.prototype.getColor = function (color) {
        if (this.isNotNull(color)) {
            var colorStr = color.toString();
            if (colorStr.startsWith('0x')) {
                return new THREE.Color(parseInt(colorStr, 16));
            }
            else {
                return new THREE.Color(color);
            }
        }
        return undefined;
    };
    TweenComponent.prototype.getTo = function (def) {
        var to = this.getTypeSafe(this.to, def, {});
        var result = {};
        Object.entries(to).forEach(function (_a) {
            var key = _a[0], value = _a[1];
            switch (key) {
                default:
                    result[key] = value;
                    break;
            }
        });
        return result;
    };
    TweenComponent.prototype.ngOnInit = function () { };
    TweenComponent.prototype.ngOnChanges = function (changes) {
        if (changes && this.parentEle !== null && this.parentEle.resetTween) {
            this.parentEle.resetTween();
        }
    };
    TweenComponent.prototype.getTween = function (tween, tweenTarget, parentEle) {
        this.parentEle = parentEle;
        this.tweenTarget = tweenTarget;
        if (this.isNotNull(this.to)) {
            tween.to(tweenTarget, __assign(__assign({}, this.getTo()), { duration: this.getDuration(), ease: this.getEasing(), repeat: this.getRepeat(), yoyo: this.getYoyo() }));
        }
        return tween;
    };
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "to");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "duration");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "easing");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "template");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "repeat");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "yoyo");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "overshoot");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "amplitude");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "period");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "linearRatio");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "power");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "yoyoMode");
    __decorate([
        core_1.Input()
    ], TweenComponent.prototype, "steps");
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
