"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShapeComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var ShapeComponent = /** @class */ (function () {
    function ShapeComponent() {
        this.type = 'fromPoints';
        this.points = null;
        this.x = null;
        this.y = null;
        this.aCPx = null;
        this.aCPy = null;
        this.aX = null;
        this.aY = null;
        this.aCP1x = null;
        this.aCP1y = null;
        this.aCP2x = null;
        this.aCP2y = null;
        this.aRadius = null;
        this.aStartAngle = null;
        this.aEndAngle = null;
        this.aClockwise = null;
        this.xRadius = null;
        this.yRadius = null;
        this.aRotation = null;
        this.parent = null;
    }
    ShapeComponent_1 = ShapeComponent;
    ShapeComponent.prototype.ngOnInit = function () {
    };
    ShapeComponent.prototype.getPoints = function (def) {
        var points = [];
        (this.points === null ? def : this.points).forEach(function (p) {
            points.push(new THREE.Vector2(p.x, p.y));
        });
        return points;
    };
    ShapeComponent.prototype.getX = function (def) {
        var x = this.x === null ? def : this.x;
        return x;
    };
    ShapeComponent.prototype.getY = function (def) {
        var y = this.y === null ? def : this.y;
        return y;
    };
    ShapeComponent.prototype.getACPx = function (def) {
        var aCPx = this.aCPx === null ? def : this.aCPx;
        return aCPx;
    };
    ShapeComponent.prototype.getACPy = function (def) {
        var aCPy = this.aCPy === null ? def : this.aCPy;
        return aCPy;
    };
    ShapeComponent.prototype.getAX = function (def) {
        var aX = this.aX === null ? def : this.aX;
        return aX;
    };
    ShapeComponent.prototype.getAY = function (def) {
        var aY = this.aY === null ? def : this.aY;
        return aY;
    };
    ShapeComponent.prototype.getACP1x = function (def) {
        var aCP1x = this.aCP1x === null ? def : this.aCP1x;
        return aCP1x;
    };
    ShapeComponent.prototype.getACP1y = function (def) {
        var aCP1y = this.aCP1y === null ? def : this.aCP1y;
        return aCP1y;
    };
    ShapeComponent.prototype.getACP2x = function (def) {
        var aCP2x = this.aCP2x === null ? def : this.aCP2x;
        return aCP2x;
    };
    ShapeComponent.prototype.getACP2y = function (def) {
        var aCP2y = this.aCP2y === null ? def : this.aCP2y;
        return aCP2y;
    };
    ShapeComponent.prototype.getARadius = function (def) {
        var aRadius = this.aRadius === null ? def : this.aRadius;
        return aRadius;
    };
    ShapeComponent.prototype.getAStartAngle = function (def) {
        var aStartAngle = this.aStartAngle === null ? def : this.aStartAngle;
        return aStartAngle / 180 * Math.PI;
    };
    ShapeComponent.prototype.getAEndAngle = function (def) {
        var aEndAngle = this.aEndAngle === null ? def : this.aEndAngle;
        return aEndAngle / 180 * Math.PI;
    };
    ShapeComponent.prototype.getAClockwise = function (def) {
        var aClockwise = this.aClockwise === null ? def : this.aClockwise;
        return aClockwise;
    };
    ShapeComponent.prototype.getXRadius = function (def) {
        var xRadius = this.xRadius === null ? def : this.xRadius;
        return xRadius;
    };
    ShapeComponent.prototype.getYRadius = function (def) {
        var yRadius = this.yRadius === null ? def : this.yRadius;
        return yRadius;
    };
    ShapeComponent.prototype.getARotation = function (def) {
        var aRotation = this.aRotation === null ? def : this.aRotation;
        return aRotation;
    };
    ShapeComponent.prototype.getHoles = function () {
        var holes = new THREE.Path();
        if (this.holes !== null && this.holes.length > 0) {
            this.holes.forEach(function (hole) {
                hole.getShape(holes);
            });
        }
        return holes;
    };
    ShapeComponent.prototype.setParent = function (parent) {
        if (this.parent !== parent) {
            this.parent = parent;
        }
    };
    ShapeComponent.prototype.getShape = function (shape) {
        switch (this.type.toLowerCase()) {
            case 'frompoints':
                shape.setFromPoints(this.getPoints([]));
                break;
            case 'moveto':
                shape.moveTo(this.getX(0), this.getY(0));
                break;
            case 'lineto':
                shape.lineTo(this.getX(0), this.getY(0));
                break;
            case 'quadraticcurveto':
                shape.quadraticCurveTo(this.getACPx(0), this.getACPy(0), this.getAX(0), this.getAY(0));
                break;
            case 'beziercurveto':
                shape.bezierCurveTo(this.getACP1x(0), this.getACP1y(0), this.getACP2x(0), this.getACP2y(0), this.getAX(0), this.getAY(0));
                break;
            case 'splinethru':
                shape.splineThru(this.getPoints([]));
                break;
            case 'arc':
                shape.arc(this.getAX(0), this.getAY(0), this.getARadius(0), this.getAStartAngle(0), this.getAEndAngle(0), this.getAClockwise(false));
                break;
            case 'absarc':
                shape.absarc(this.getAX(0), this.getAY(0), this.getARadius(0), this.getAStartAngle(0), this.getAEndAngle(0), this.getAClockwise(false));
                break;
            case 'ellipse':
                shape.ellipse(this.getAX(0), this.getAY(0), this.getXRadius(0), this.getYRadius(0), this.getAStartAngle(0), this.getAEndAngle(0), this.getAClockwise(false), this.getARotation(0));
                break;
            case 'absellipse':
                shape.absellipse(this.getAX(0), this.getAY(0), this.getXRadius(0), this.getYRadius(0), this.getAStartAngle(0), this.getAEndAngle(0), this.getAClockwise(false), this.getARotation(0));
                break;
            case 'holes':
            case 'hole':
                if (shape instanceof THREE.Shape) {
                    shape.holes.push(this.getHoles());
                }
                break;
        }
        return shape;
    };
    var ShapeComponent_1;
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "points");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "x");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "y");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aCPx");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aCPy");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aX");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aY");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aCP1x");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aCP1y");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aCP2x");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aCP2y");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aRadius");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aStartAngle");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aEndAngle");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aClockwise");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "xRadius");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "yRadius");
    __decorate([
        core_1.Input()
    ], ShapeComponent.prototype, "aRotation");
    __decorate([
        core_1.ContentChildren(ShapeComponent_1, { descendants: false })
    ], ShapeComponent.prototype, "holes");
    ShapeComponent = ShapeComponent_1 = __decorate([
        core_1.Component({
            selector: 'ngx3js-shape',
            templateUrl: './shape.component.html',
            styleUrls: ['./shape.component.scss']
        })
    ], ShapeComponent);
    return ShapeComponent;
}());
exports.ShapeComponent = ShapeComponent;
