"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AbstractTweenComponent = void 0;
var core_1 = require("@angular/core");
var GSAP = require("gsap");
var tween_component_1 = require("./tween/tween.component");
var AbstractTweenComponent = /** @class */ (function () {
    function AbstractTweenComponent() {
        this.tweenStart = true;
        this.parent = null;
        this.tweenTarget = null;
        this.tweenTimer = null;
    }
    AbstractTweenComponent.prototype.ngOnInit = function () { };
    AbstractTweenComponent.prototype.ngOnChanges = function (changes) {
        if (changes && changes.tweenStart && this.tweenTarget) {
            this.resetTween();
        }
    };
    AbstractTweenComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.tween !== null && this.tween !== undefined) {
            this.tween.changes.subscribe(function (e) {
                _this.resetTween();
            });
        }
    };
    AbstractTweenComponent.prototype.setParent = function (parent, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (isRestore) {
            if (this.parent !== parent.parent) {
                this.parent = parent.parent;
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.parent !== parent) {
            this.parent = parent;
            return true;
        }
        else {
            return false;
        }
    };
    AbstractTweenComponent.prototype.setTweenTarget = function (tweenTarget) {
        if (this.tweenTarget !== tweenTarget) {
            this.tweenTarget = tweenTarget;
            this.resetTween();
        }
    };
    AbstractTweenComponent.prototype.resetTween = function () {
        var _this = this;
        if (this.tweenTarget !== null &&
            this.tween !== null &&
            this.tween.length > 0 &&
            this.tweenStart) {
            this.tweenTimer = new GSAP.TimelineLite();
            this.tween.forEach(function (tween) {
                tween.getTween(_this.tweenTimer, _this.tweenTarget, _this);
            });
            this.tweenTimer.play();
        }
        else if (this.tweenTimer !== null) {
            this.tweenTimer.kill();
            this.tweenTimer = null;
        }
    };
    AbstractTweenComponent.prototype.ngOnDestroy = function () { };
    __decorate([
        core_1.Input()
    ], AbstractTweenComponent.prototype, "tweenStart");
    __decorate([
        core_1.ContentChildren(tween_component_1.TweenComponent, { descendants: false })
    ], AbstractTweenComponent.prototype, "tween");
    AbstractTweenComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], AbstractTweenComponent);
    return AbstractTweenComponent;
}());
exports.AbstractTweenComponent = AbstractTweenComponent;
