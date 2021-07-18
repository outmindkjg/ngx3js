"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CurveComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var CurveComponent = /** @class */ (function () {
    function CurveComponent() {
        this.type = 'spline';
        this.aX = null;
        this.aY = null;
        this.aRadius = null;
        this.aStartAngle = null;
        this.aEndAngle = null;
        this.aClockwise = null;
        this.points = null;
        this.closed = null;
        this.curveType = null;
        this.tension = null;
        this.xRadius = null;
        this.yRadius = null;
        this.aRotation = null;
        this.parent = null;
        this.curve = null;
    }
    CurveComponent.prototype.getAX = function (def) {
        var aX = this.aX === null ? def : this.aX;
        return aX;
    };
    CurveComponent.prototype.getAY = function (def) {
        var aY = this.aY === null ? def : this.aY;
        return aY;
    };
    CurveComponent.prototype.getARadius = function (def) {
        var aRadius = this.aRadius === null ? def : this.aRadius;
        return aRadius;
    };
    CurveComponent.prototype.getAStartAngle = function (def) {
        var aStartAngle = this.aStartAngle === null ? def : this.aStartAngle;
        return aStartAngle;
    };
    CurveComponent.prototype.getAEndAngle = function (def) {
        var aEndAngle = this.aEndAngle === null ? def : this.aEndAngle;
        return aEndAngle;
    };
    CurveComponent.prototype.getAClockwise = function (def) {
        var aClockwise = this.aClockwise === null ? def : this.aClockwise;
        return aClockwise;
    };
    CurveComponent.prototype.getPointsV3 = function (def, min) {
        var points = [];
        (this.points === null ? def : this.points).forEach(function (p) {
            points.push(new THREE.Vector3(p.x, p.y, p.z));
        });
        if (points.length < min) {
            for (var i = 0; i < min - points.length; i++) {
                points.push(new THREE.Vector3(0, 0, 0));
            }
        }
        return points;
    };
    CurveComponent.prototype.getPointsV2 = function (def, min) {
        var points = [];
        (this.points === null ? def : this.points).forEach(function (p) {
            points.push(new THREE.Vector2(p.x, p.y));
        });
        if (points.length < min) {
            for (var i = 0; i < min - points.length; i++) {
                points.push(new THREE.Vector2(0, 0));
            }
        }
        return points;
    };
    CurveComponent.prototype.getClosed = function (def) {
        var closed = this.closed === null ? def : this.closed;
        return closed;
    };
    CurveComponent.prototype.getCurveType = function (def) {
        var curveType = this.curveType === null ? def : this.curveType;
        return curveType;
    };
    CurveComponent.prototype.getTension = function (def) {
        var tension = this.tension === null ? def : this.tension;
        return tension;
    };
    CurveComponent.prototype.getXRadius = function (def) {
        var xRadius = this.xRadius === null ? def : this.xRadius;
        return xRadius;
    };
    CurveComponent.prototype.getYRadius = function (def) {
        var yRadius = this.yRadius === null ? def : this.yRadius;
        return yRadius;
    };
    CurveComponent.prototype.getARotation = function (def) {
        var aRotation = this.aRotation === null ? def : this.aRotation;
        return aRotation;
    };
    CurveComponent.prototype.ngOnInit = function () {
    };
    CurveComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            this.curve = null;
            if (this.parent !== null && this.parent.resetGeometry) {
                this.parent.resetGeometry(true);
            }
        }
    };
    CurveComponent.prototype.setParent = function (parent) {
        if (this.parent !== parent) {
            this.parent = parent;
        }
    };
    CurveComponent.prototype.getCurve = function () {
        if (this.curve === null) {
            switch (this.type.toLowerCase()) {
                case 'arc':
                    this.curve = new THREE.ArcCurve(this.getAX(1), this.getAY(1), this.getARadius(1), this.getAStartAngle(1), this.getAEndAngle(1), this.getAClockwise(false));
                    break;
                case 'spline3':
                case 'catmullrom':
                    this.curve = new THREE.CatmullRomCurve3(this.getPointsV3([], 3), this.getClosed(false), this.getCurveType('centripetal'), this.getTension(0.5));
                    break;
                case 'cubicbezier':
                    var cubicbezierV2 = this.getPointsV2([], 4);
                    this.curve = new THREE.CubicBezierCurve(cubicbezierV2[0], cubicbezierV2[1], cubicbezierV2[2], cubicbezierV2[3]);
                    break;
                case 'cubicbezier3':
                    var cubicbezierV3 = this.getPointsV3([], 4);
                    this.curve = new THREE.CubicBezierCurve3(cubicbezierV3[0], cubicbezierV3[1], cubicbezierV3[2], cubicbezierV3[3]);
                    break;
                case 'ellipse':
                    this.curve = new THREE.EllipseCurve(this.getAX(0), this.getAY(0), this.getXRadius(1), this.getYRadius(1), this.getAStartAngle(0), this.getAEndAngle(360), this.getAClockwise(false), this.getARotation(0));
                    break;
                case 'line':
                    var lineV2 = this.getPointsV2([], 2);
                    this.curve = new THREE.LineCurve(lineV2[0], lineV2[1]);
                    break;
                case 'line3':
                    var lineV3 = this.getPointsV3([], 2);
                    this.curve = new THREE.LineCurve3(lineV3[0], lineV3[1]);
                    break;
                case 'quadraticbezier':
                    var quadraticbezierV2 = this.getPointsV2([], 3);
                    this.curve = new THREE.QuadraticBezierCurve(quadraticbezierV2[0], quadraticbezierV2[1], quadraticbezierV2[2]);
                    break;
                case 'quadraticbezier':
                    var quadraticbezierV3 = this.getPointsV3([], 3);
                    this.curve = new THREE.QuadraticBezierCurve3(quadraticbezierV3[0], quadraticbezierV3[1], quadraticbezierV3[2]);
                    break;
                case 'spline':
                    this.curve = new THREE.SplineCurve(this.getPointsV2([], 1));
                    break;
            }
        }
        return this.curve;
    };
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "aX");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "aY");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "aRadius");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "aStartAngle");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "aEndAngle");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "aClockwise");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "points");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "closed");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "curveType");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "tension");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "xRadius");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "yRadius");
    __decorate([
        core_1.Input()
    ], CurveComponent.prototype, "aRotation");
    CurveComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-curve',
            templateUrl: './curve.component.html',
            styleUrls: ['./curve.component.scss']
        })
    ], CurveComponent);
    return CurveComponent;
}());
exports.CurveComponent = CurveComponent;
