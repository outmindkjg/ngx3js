"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TranslationComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var TranslationComponent = /** @class */ (function () {
    function TranslationComponent() {
        this.visible = true;
        this.x = 0;
        this.y = 0;
        this.z = 0;
        this.translation = null;
        this.parent = null;
    }
    TranslationComponent.prototype.ngOnInit = function () {
    };
    TranslationComponent.prototype.setParent = function (parent) {
        if (this.parent !== parent) {
            this.parent = parent;
            this.resetTranslation();
        }
    };
    TranslationComponent.prototype.resetTranslation = function () {
        if (this.parent !== null && this.visible) {
            var refTranslation_1 = [];
            if (this.parent instanceof THREE.BufferGeometry) {
                refTranslation_1.push(this.parent);
            }
            else if (this.parent.getGeometry) {
                refTranslation_1.push(this.parent.getGeometry());
            }
            else if (this.parent.meshTranslations) {
                this.parent.meshTranslations.forEach(function (translations) {
                    refTranslation_1.push(translations);
                });
            }
            if (refTranslation_1.length > 0) {
                var translation_1 = this.getTranslation();
                refTranslation_1.forEach(function (refTranslation) {
                    refTranslation.applyMatrix4(translation_1);
                });
            }
        }
    };
    TranslationComponent.prototype.getTranslation = function () {
        if (this.translation === null) {
            this.translation = new THREE.Matrix4().makeTranslation(this.x, this.y, this.z);
        }
        return this.translation;
    };
    __decorate([
        core_1.Input()
    ], TranslationComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], TranslationComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], TranslationComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], TranslationComponent.prototype, "z");
    TranslationComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-translation',
            templateUrl: './translation.component.html',
            styleUrls: ['./translation.component.scss']
        })
    ], TranslationComponent);
    return TranslationComponent;
}());
exports.TranslationComponent = TranslationComponent;
