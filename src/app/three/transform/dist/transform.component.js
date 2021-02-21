"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.TransformComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var interface_1 = require("../interface");
var TransformComponent = /** @class */ (function () {
    function TransformComponent() {
        this.visible = true;
        this.anchorSeparat = false;
        this.x = null;
        this.y = null;
        this.z = null;
        this.width = null;
        this.height = null;
        this.left = null;
        this.top = null;
        this.right = null;
        this.bottom = null;
        this.anchorMinX = null;
        this.anchorMinY = null;
        this.anchorMaxX = null;
        this.anchorMaxY = null;
        this.pivotX = null;
        this.pivotY = null;
        this.rotationX = null;
        this.rotationY = null;
        this.rotationZ = null;
        this.scaleX = null;
        this.scaleY = null;
        this.scaleZ = null;
        this.parentNode = null;
        this.parentSize = null;
        this.eleSize = null;
        this.cssClazzName = null;
    }
    TransformComponent.prototype.getLeft = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.left, def);
    };
    TransformComponent.prototype.getTop = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.top, def);
    };
    TransformComponent.prototype.getRight = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.right, def);
    };
    TransformComponent.prototype.getBottom = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.bottom, def);
    };
    TransformComponent.prototype.getPosition = function (def) {
        return interface_1.ThreeUtil.getVector3Safe(this.x, this.y, this.z, def);
    };
    TransformComponent.prototype.getSize = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.width, this.height, def);
    };
    TransformComponent.prototype.getAnchorMin = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.anchorMinX, this.anchorMinY, def);
    };
    TransformComponent.prototype.getAnchorMax = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.anchorMaxX, this.anchorMaxY, def);
    };
    TransformComponent.prototype.getPivot = function (def) {
        return interface_1.ThreeUtil.getVector2Safe(this.pivotX, this.pivotY, def);
    };
    TransformComponent.prototype.getRotation = function (def) {
        return interface_1.ThreeUtil.getEulerSafe(this.rotationX, this.rotationY, this.rotationZ, def);
    };
    TransformComponent.prototype.getScale = function (def) {
        return interface_1.ThreeUtil.getVector3Safe(this.scaleX, this.scaleY, this.scaleZ, def);
    };
    TransformComponent.prototype.ngOnInit = function () {
    };
    TransformComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.applyHtmlStyle();
        }
    };
    TransformComponent.prototype.ngOnDestroy = function () {
        if (this.parentNode !== null) {
            if (interface_1.ThreeUtil.isNotNull(this.cssClazzName)) {
                interface_1.ThreeUtil.removeCssStyle(this.parentNode, this.cssClazzName);
                this.cssClazzName = null;
            }
            this.parentNode = null;
        }
    };
    TransformComponent.prototype.setParentNode = function (parentNode, parentSize, eleSize) {
        if (this.parentNode !== parentNode) {
            this.parentNode = parentNode;
        }
        this.parentSize = parentSize;
        this.eleSize = eleSize;
        this.applyHtmlStyle();
    };
    TransformComponent.prototype.getStyle = function () {
        var style = {};
        if (this.parentSize !== null) {
            var anchorMin = this.getAnchorMin(new THREE.Vector2(0, 0)).multiply(this.parentSize);
            var anchorMax = this.getAnchorMax(new THREE.Vector2(1, 1)).multiply(this.parentSize);
            if (this.anchorSeparat) {
                var left = this.getLeft(0);
                var top = this.getTop(0);
                var right = this.getRight(0);
                var bottom = this.getBottom(0);
                var size = anchorMax.clone().sub(anchorMin);
                this.eleSize.x = (size.x + left - right);
                this.eleSize.y = (size.y + top - bottom);
                style.width = this.eleSize.x;
                style.height = this.eleSize.y;
                style.left = (anchorMin.x + left);
                style.top = (this.parentSize.y - anchorMax.y + top);
            }
            else {
                var size = this.getSize(this.parentSize);
                this.eleSize.x = size.x;
                this.eleSize.y = size.y;
                style.width = this.eleSize.x;
                style.height = this.eleSize.y;
                style.left = anchorMin.x;
                style.top = (this.parentSize.y - anchorMax.y);
            }
            var transform = [];
            var scale = this.getScale(new THREE.Vector3(1, 1, 1));
            if (scale.x !== 1 || scale.y !== 1 || scale.z !== 1) {
                transform.push('scale3d(' + scale.x + ',' + scale.y + ',' + scale.z + ')');
            }
            var rotation = this.getRotation(new THREE.Euler(0, 0, 0));
            if (rotation.x !== 0 || rotation.y !== 0 || rotation.z !== 0) {
                var quaternion = new THREE.Quaternion();
                quaternion.setFromEuler(rotation);
                transform.push('rotate3d(' + quaternion.x + ',' + quaternion.y + ',' + quaternion.z + ',' + quaternion.w + 'rad)');
            }
            if (transform.length > 0) {
                style.transform = transform;
            }
            var pivot = this.getPivot(new THREE.Vector2(0.5, 0.5));
            if (pivot.x !== 0.5 || pivot.y !== 0.5) {
                style.transformOrigin = (pivot.x * 100) + '% ' + (pivot.y * 100) + '%';
            }
        }
        return style;
    };
    TransformComponent.prototype.applyHtmlStyle = function () {
        if (this.parentNode !== null && this.parentSize !== null) {
            if (this.visible) {
                var style = this.getStyle();
                this.cssClazzName = interface_1.ThreeUtil.addCssStyle(this.parentNode, style, this.cssClazzName, 'transform', 'inline');
            }
            else {
                interface_1.ThreeUtil.toggleCssStyle(this.parentNode, this.cssClazzName, false);
            }
        }
    };
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "anchorSeparat");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "z");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "left");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "top");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "right");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "bottom");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "anchorMinX");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "anchorMinY");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "anchorMaxX");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "anchorMaxY");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "pivotX");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "pivotY");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "rotationX");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "rotationY");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "rotationZ");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "scaleX");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "scaleY");
    __decorate([
        core_1.Input()
    ], TransformComponent.prototype, "scaleZ");
    TransformComponent = __decorate([
        core_1.Component({
            selector: 'three-transform',
            templateUrl: './transform.component.html',
            styleUrls: ['./transform.component.scss']
        })
    ], TransformComponent);
    return TransformComponent;
}());
exports.TransformComponent = TransformComponent;
