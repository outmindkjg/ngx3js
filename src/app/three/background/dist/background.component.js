"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BackgroundComponent = void 0;
var core_1 = require("@angular/core");
var interface_1 = require("../interface");
var BackgroundComponent = /** @class */ (function () {
    function BackgroundComponent() {
        this.visible = true;
        this.virtualClass = null;
        this.backgroundColor = null;
        this.backgroundOpacity = null;
        this.backgroundImage = null;
        this.backgroundRepeat = null;
        this.backgroundRepeatX = null;
        this.backgroundRepeatY = null;
        this.backgroundPosition = null;
        this.backgroundPositionX = null;
        this.backgroundPositionY = null;
        this.backgroundSize = null;
        this.backgroundSizeX = null;
        this.backgroundSizeY = null;
        this.backgroundClip = null;
        this.border = null;
        this.borderColor = null;
        this.borderStyle = null;
        this.borderWidth = null;
        this.borderRadius = null;
        this.borderLeft = null;
        this.borderTop = null;
        this.borderRight = null;
        this.borderBottom = null;
        this.borderImage = null;
        this.borderImageSource = null;
        this.borderImageSlice = null;
        this.borderImageOutset = null;
        this.borderImageRepeat = null;
        this.borderImageWidth = null;
        this.opacity = null;
        this.color = null;
        this.fontFamily = null;
        this.fontSize = null;
        this.fontStyle = null;
        this.fontWeight = null;
        this.textAlign = null;
        this.textTransform = null;
        this.textDecoration = null;
        this.letterSpacing = null;
        this.textIndent = null;
        this.textJustify = null;
        this.textSizeAdjust = null;
        this.whiteSpace = null;
        this.wordBreak = null;
        this.wordSpacing = null;
        this.parentNode = null;
        this.cssClazzName = null;
    }
    BackgroundComponent.prototype.getBackgroundColor = function (def) {
        return interface_1.ThreeUtil.getColorAlphaSafe(this.backgroundColor, this.backgroundOpacity, def);
    };
    BackgroundComponent.prototype.getBackgroundImage = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.backgroundImage, def);
    };
    BackgroundComponent.prototype.getBackgroundRepeat = function (def) {
        if (interface_1.ThreeUtil.isNotNull(this.backgroundRepeatX) && interface_1.ThreeUtil.isNotNull(this.backgroundRepeatX)) {
            return this.backgroundRepeatX + ' ' + this.backgroundRepeatY;
        }
        return interface_1.ThreeUtil.getTypeSafe(this.backgroundRepeat, def);
    };
    BackgroundComponent.prototype.getBackgroundPosition = function (def) {
        if (interface_1.ThreeUtil.isNotNull(this.backgroundPositionX) && interface_1.ThreeUtil.isNotNull(this.backgroundPositionY)) {
            return this.backgroundPositionX + ' ' + this.backgroundPositionY;
        }
        return interface_1.ThreeUtil.getTypeSafe(this.backgroundPosition, def);
    };
    BackgroundComponent.prototype.getBackgroundSize = function (def) {
        if (interface_1.ThreeUtil.isNotNull(this.backgroundSizeX) && interface_1.ThreeUtil.isNotNull(this.backgroundSizeY)) {
            return this.backgroundSizeX + ' ' + this.backgroundSizeY;
        }
        return interface_1.ThreeUtil.getTypeSafe(this.backgroundSize, def);
    };
    BackgroundComponent.prototype.getBackgroundClip = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.backgroundClip, def);
    };
    BackgroundComponent.prototype.getBorder = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.border, def);
    };
    BackgroundComponent.prototype.getBorderColor = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderColor, def);
    };
    BackgroundComponent.prototype.getBorderStyle = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderStyle, def);
    };
    BackgroundComponent.prototype.getBorderWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderWidth, def);
    };
    BackgroundComponent.prototype.getBorderRadius = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderRadius, def);
    };
    BackgroundComponent.prototype.getBorderLeft = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderLeft, def);
    };
    BackgroundComponent.prototype.getBorderTop = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderTop, def);
    };
    BackgroundComponent.prototype.getBorderRight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderRight, def);
    };
    BackgroundComponent.prototype.getBorderBottom = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderBottom, def);
    };
    BackgroundComponent.prototype.getBorderImage = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderImage, def);
    };
    BackgroundComponent.prototype.getBorderImageSource = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderImageSource, def);
    };
    BackgroundComponent.prototype.getBorderImageSlice = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderImageSlice, def);
    };
    BackgroundComponent.prototype.getBorderImageOutset = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderImageOutset, def);
    };
    BackgroundComponent.prototype.getBorderImageRepeat = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderImageRepeat, def);
    };
    BackgroundComponent.prototype.getBorderImageWidth = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.borderImageWidth, def);
    };
    BackgroundComponent.prototype.getOpacity = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.opacity, def);
    };
    BackgroundComponent.prototype.getColor = function (def) {
        return interface_1.ThreeUtil.getColorSafe(this.color, def);
    };
    BackgroundComponent.prototype.getFontFamily = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.fontFamily, def);
    };
    BackgroundComponent.prototype.getFontSize = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.fontSize, def);
    };
    BackgroundComponent.prototype.getFontStyle = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.fontStyle, def);
    };
    BackgroundComponent.prototype.getFontWeight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.fontWeight, def);
    };
    BackgroundComponent.prototype.getTextAlign = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textAlign, def);
    };
    BackgroundComponent.prototype.getTextTransform = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textTransform, def);
    };
    BackgroundComponent.prototype.getTextDecoration = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textDecoration, def);
    };
    BackgroundComponent.prototype.getLetterSpacing = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.letterSpacing, def);
    };
    BackgroundComponent.prototype.getTextIndent = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textIndent, def);
    };
    BackgroundComponent.prototype.getTextJustify = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textJustify, def);
    };
    BackgroundComponent.prototype.getTextSizeAdjust = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.textSizeAdjust, def);
    };
    BackgroundComponent.prototype.getWhiteSpace = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.whiteSpace, def);
    };
    BackgroundComponent.prototype.getWordBreak = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.wordBreak, def);
    };
    BackgroundComponent.prototype.getWordSpacing = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.wordSpacing, def);
    };
    BackgroundComponent.prototype.ngOnInit = function () {
    };
    BackgroundComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.applyHtmlStyle();
        }
    };
    BackgroundComponent.prototype.ngOnDestroy = function () {
        if (this.parentNode !== null) {
            if (interface_1.ThreeUtil.isNotNull(this.cssClazzName)) {
                interface_1.ThreeUtil.removeCssStyle(this.parentNode, this.cssClazzName);
                this.cssClazzName = null;
            }
            this.parentNode = null;
        }
    };
    BackgroundComponent.prototype.setParentNode = function (parentNode) {
        if (this.parentNode !== parentNode) {
            this.parentNode = parentNode;
        }
        this.applyHtmlStyle();
    };
    BackgroundComponent.prototype.getStyle = function () {
        return {
            backgroundColor: this.getBackgroundColor(),
            backgroundImage: this.getBackgroundImage(),
            backgroundRepeat: this.getBackgroundRepeat(),
            backgroundPosition: this.getBackgroundPosition(),
            backgroundSize: this.getBackgroundSize(),
            backgroundClip: this.getBackgroundClip(),
            border: this.getBorder(),
            borderColor: this.getBorderColor(),
            borderStyle: this.getBorderStyle(),
            borderWidth: this.getBorderWidth(),
            borderRadius: this.getBorderRadius(),
            borderLeft: this.getBorderLeft(),
            borderTop: this.getBorderTop(),
            borderRight: this.getBorderRight(),
            borderBottom: this.getBorderBottom(),
            borderImage: this.getBorderImage(),
            borderImageSource: this.getBorderImageSource(),
            borderImageSlice: this.getBorderImageSlice(),
            borderImageOutset: this.getBorderImageOutset(),
            borderImageRepeat: this.getBorderImageRepeat(),
            borderImageWidth: this.getBorderImageWidth(),
            opacity: this.getOpacity(),
            color: this.getColor(),
            fontFamily: this.getFontFamily(),
            fontSize: this.getFontSize(),
            fontStyle: this.getFontStyle(),
            fontWeight: this.getFontWeight(),
            textAlign: this.getTextAlign(),
            textTransform: this.getTextTransform(),
            textDecoration: this.getTextDecoration(),
            letterSpacing: this.getLetterSpacing(),
            textIndent: this.getTextIndent(),
            textJustify: this.getTextJustify(),
            textSizeAdjust: this.getTextSizeAdjust(),
            whiteSpace: this.getWhiteSpace(),
            wordBreak: this.getWordBreak(),
            wordSpacing: this.getWordSpacing()
        };
    };
    BackgroundComponent.prototype.applyHtmlStyle = function () {
        if (this.parentNode !== null) {
            if (this.visible) {
                var style = this.getStyle();
                this.cssClazzName = interface_1.ThreeUtil.addCssStyle(this.parentNode, style, this.cssClazzName, 'background', this.virtualClass);
            }
            else {
                interface_1.ThreeUtil.toggleCssStyle(this.parentNode, this.cssClazzName, false);
            }
        }
    };
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "virtualClass");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundColor");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundOpacity");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundImage");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundRepeat");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundRepeatX");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundRepeatY");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundPosition");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundPositionX");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundPositionY");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundSize");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundSizeX");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundSizeY");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "backgroundClip");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "border");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderColor");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderStyle");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderWidth");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderRadius");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderLeft");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderTop");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderRight");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderBottom");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderImage");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderImageSource");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderImageSlice");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderImageOutset");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderImageRepeat");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "borderImageWidth");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "opacity");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "fontFamily");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "fontSize");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "fontStyle");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "fontWeight");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "textAlign");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "textTransform");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "textDecoration");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "letterSpacing");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "textIndent");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "textJustify");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "textSizeAdjust");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "whiteSpace");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "wordBreak");
    __decorate([
        core_1.Input()
    ], BackgroundComponent.prototype, "wordSpacing");
    BackgroundComponent = __decorate([
        core_1.Component({
            selector: 'three-background',
            templateUrl: './background.component.html',
            styleUrls: ['./background.component.scss']
        })
    ], BackgroundComponent);
    return BackgroundComponent;
}());
exports.BackgroundComponent = BackgroundComponent;
