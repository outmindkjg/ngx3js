"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ControllerItemComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var curveUtils_1 = require("../../curve/curveUtils");
var interface_1 = require("../../interface");
var subscribe_abstract_1 = require("../../subscribe.abstract");
/**
 * ControllerItemComponent
 */
var ControllerItemComponent = /** @class */ (function (_super) {
    __extends(ControllerItemComponent, _super);
    /**
     * Creates an instance of controller item component.
     */
    function ControllerItemComponent() {
        var _this = _super.call(this) || this;
        /**
         * Input  of controller item component
         */
        _this.type = 'position';
        /**
         * Input  of controller item component
         */
        _this.lookathead = null;
        /**
         * Input  of controller item component
         *
         * Notice - case insensitive.
         *
         */
        _this.curve = null;
        /**
         * Input  of controller item component
         */
        _this.scale = null;
        /**
         * Input  of controller item component
         */
        _this.radius = null;
        /**
         * Input  of controller item component
         */
        _this.radiusInner = null;
        /**
         * Input  of controller item component
         */
        _this.radiusX = null;
        /**
         * Input  of controller item component
         */
        _this.radiusY = null;
        /**
         * Input  of controller item component
         */
        _this.radiusZ = null;
        /**
         * Input  of controller item component
         */
        _this.rotation = null;
        /**
         * Input  of controller item component
         */
        _this.rotationX = null;
        /**
         * Input  of controller item component
         */
        _this.rotationY = null;
        /**
         * Input  of controller item component
         */
        _this.rotationZ = null;
        /**
         * Input  of controller item component
         */
        _this.center = null;
        /**
         * Input  of controller item component
         */
        _this.centerX = null;
        /**
         * Input  of controller item component
         */
        _this.centerY = null;
        /**
         * Input  of controller item component
         */
        _this.centerZ = null;
        /**
         * Input  of controller item component
         */
        _this.duration = 1;
        /**
         * Input  of controller item component
         */
        _this.delta = null;
        /**
         * Input  of controller item component
         */
        _this.multiply = null;
        /**
         * Input  of controller item component
         *
         * Notice - case insensitive.
         *
         */
        _this.options = null;
        /**
         * Input  of controller item component
         */
        _this.visible = null;
        /**
         * Input  of controller item component
         */
        _this.color = null;
        /**
         * Input  of controller item component
         */
        _this.opacity = null;
        /**
         * Input  of controller item component
         */
        _this.tubularSegments = null;
        /**
         * Input  of controller item component
         */
        _this.tubeRadius = null;
        /**
         * Input  of controller item component
         */
        _this.tubeRadiusSegments = null;
        /**
         * Input  of controller item component
         */
        _this.closed = null;
        /**
         * Input  of controller item component
         */
        _this.material = null;
        /**
         * Input  of controller item component
         */
        _this.uniform = null;
        /**
         * Input  of controller item component
         */
        _this.wave = 0;
        /**
         * Input  of controller item component
         */
        _this.waveR = 0;
        /**
         * Input  of controller item component
         */
        _this.waveH = 0;
        /**
         * Input  of controller item component
         */
        _this.rate = 1;
        /**
         * Input  of controller item component
         */
        _this.rateX = null;
        /**
         * Input  of controller item component
         */
        _this.rateY = null;
        /**
         * Input  of controller item component
         */
        _this.rateZ = null;
        /**
         * Input  of controller item component
         *
         * Notice - case insensitive.
         *
         */
        _this.valueType = 'auto';
        /**
         * Input  of controller item component
         */
        _this.refValue = null;
        /**
         * Input  of controller item component
         */
        _this.minValue = 0;
        /**
         * Input  of controller item component
         */
        _this.maxValue = 1;
        /**
         * Input  of controller item component
         *
         * Notice - case insensitive.
         *
         */
        _this.colorType = 'rgb';
        /**
         * Input  of controller item component
         */
        _this.refRate = null;
        /**
         * Helper  of controller item component
         */
        _this._helper = null;
        /**
         * Helper point of controller item component
         */
        _this._helperPoint = null;
        /**
         * Curve  of controller item component
         */
        _this._curve = null;
        /**
         * Lookat  of controller item component
         */
        _this._lookat = false;
        /**
         * Duration  of controller item component
         */
        _this._duration = 60;
        /**
         * Delta  of controller item component
         */
        _this._delta = 60;
        /**
         * Lookathead  of controller item component
         */
        _this._lookathead = 0.05;
        /**
         * Control item of controller item component
         */
        _this._controlItem = {};
        /**
         * Rate call back of controller item component
         */
        _this._rateCallBack = null;
        /**
         * Last look at of controller item component
         */
        _this._lastLookAt = null;
        /**
         * Tmp color of controller item component
         */
        _this._tmpColor = new THREE.Color();
        return _this;
    }
    /**
     * Gets curve
     * @returns curve
     */
    ControllerItemComponent.prototype.getCurve = function () {
        var curve = 'line';
        switch (this.type.toLowerCase()) {
            case 'tween':
                curve = interface_1.ThreeUtil.getTypeSafe(this.curve, 'linearinout');
                break;
            case 'position':
            default:
                curve = interface_1.ThreeUtil.getTypeSafe(this.curve, 'line');
                break;
        }
        return curveUtils_1.CurveUtils.getCurve(curve, 1, {
            radiusInner: interface_1.ThreeUtil.getTypeSafe(this.radiusInner, 0),
            waveH: interface_1.ThreeUtil.getTypeSafe(this.waveH, this.wave, 0),
            waveR: interface_1.ThreeUtil.getTypeSafe(this.waveR, this.wave, 0),
            rateX: interface_1.ThreeUtil.getTypeSafe(this.rateX, this.rate, 1),
            rateY: interface_1.ThreeUtil.getTypeSafe(this.rateY, this.rate, 1),
            rateZ: interface_1.ThreeUtil.getTypeSafe(this.rateZ, this.rate, 1)
        });
    };
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked the directive's
     * data-bound properties for the first time,
     * and before any of the view or content children have been checked.
     * It is invoked only once when the directive is instantiated.
     */
    ControllerItemComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this, 'controllerItem');
    };
    /**
     * A callback method that performs custom clean-up, invoked immediately
     * before a directive, pipe, or service instance is destroyed.
     */
    ControllerItemComponent.prototype.ngOnDestroy = function () {
        _super.prototype.ngOnDestroy.call(this);
    };
    /**
     * A callback method that is invoked immediately after the
     * default change detector has checked data-bound properties
     * if at least one has changed, and before the view and content
     * children are checked.
     *
     * @param changes The changed properties.
     */
    ControllerItemComponent.prototype.ngOnChanges = function (changes) {
        _super.prototype.ngOnChanges.call(this, changes);
        if (changes && this._curve) {
            this.addChanges(changes);
        }
    };
    /**
     * A callback method that is invoked immediately after
     * Angular has completed initialization of all of the directive's
     * content.
     * It is invoked only once when the directive is instantiated.
     */
    ControllerItemComponent.prototype.ngAfterContentInit = function () {
        _super.prototype.ngAfterContentInit.call(this);
    };
    /**
     * Gets options
     * @returns options
     */
    ControllerItemComponent.prototype.getOptions = function () {
        switch (this.type.toLowerCase()) {
            case 'tween':
                return interface_1.ThreeUtil.getTypeSafe(this.options, '') + ',once';
            default:
                return interface_1.ThreeUtil.getTypeSafe(this.options, 'yoyo');
        }
    };
    /**
     * Applys changes
     * @param changes
     * @returns
     */
    ControllerItemComponent.prototype.applyChanges = function (changes) {
        if (this._curve !== null && this._parent !== null) {
            if (interface_1.ThreeUtil.isIndexOf(changes, 'clearinit')) {
                this.getController(this._controlItem, this._parent);
                return;
            }
            if (!interface_1.ThreeUtil.isOnlyIndexOf(changes, ['init', 'type', 'enabled'])) {
                this.needUpdate = true;
                return;
            }
            _super.prototype.applyChanges.call(this, changes);
        }
    };
    /**
     * Gets object
     * @returns
     */
    ControllerItemComponent.prototype.getObject = function () {
        return this.getController(this._controlItem, this._parent);
    };
    /**
     * Gets controller
     * @param controlItem
     * @param parent
     * @returns controller
     */
    ControllerItemComponent.prototype.getController = function (controlItem, parent) {
        if (this._curve === null || this._needUpdate) {
            this._needUpdate = false;
            this._lookat = false;
            if (this._helper !== null && this._helper.parent === null) {
                this._helper.parent.remove(this._helper);
            }
            if (this._helperPoint !== null && this._helperPoint.parent === null) {
                this._helperPoint.parent.remove(this._helperPoint);
            }
            this._helper = null;
            this._helperPoint = null;
            this._rateCallBack = null;
            if (interface_1.ThreeUtil.isNotNull(this.refRate)) {
                if (typeof this.refRate === 'function') {
                    this._rateCallBack = this.refRate;
                }
                else if (interface_1.ThreeUtil.isNotNull(this.refRate.getNumber)) {
                    this._rateCallBack = this.refRate.getNumber();
                }
            }
            var curve = this.getCurve();
            var scale = interface_1.ThreeUtil.getVector3Safe(interface_1.ThreeUtil.getTypeSafe(this.radiusX, this.radius, 1), interface_1.ThreeUtil.getTypeSafe(this.radiusY, this.radius, 1), interface_1.ThreeUtil.getTypeSafe(this.radiusZ, this.radius, 1));
            var rotation = interface_1.ThreeUtil.getEulerSafe(interface_1.ThreeUtil.getTypeSafe(this.rotationX, this.rotation, 0), interface_1.ThreeUtil.getTypeSafe(this.rotationY, this.rotation, 0), interface_1.ThreeUtil.getTypeSafe(this.rotationZ, this.rotation, 0));
            var center = interface_1.ThreeUtil.getVector3Safe(interface_1.ThreeUtil.getTypeSafe(this.centerX, this.center, 0), interface_1.ThreeUtil.getTypeSafe(this.centerY, this.center, 0), interface_1.ThreeUtil.getTypeSafe(this.centerZ, this.center, 0));
            this._lookathead = Math.min(1, Math.max(0.001, interface_1.ThreeUtil.getTypeSafe(this.lookathead, 0.05)));
            this._curve = new curveUtils_1.CurvesNormal(curve, {
                scale: scale,
                rotation: rotation,
                center: center,
                multiply: interface_1.ThreeUtil.getTypeSafe(this.multiply, 1),
                options: this.getOptions()
            });
            this._duration = interface_1.ThreeUtil.getTypeSafe(this.duration, 60);
            this._delta = interface_1.ThreeUtil.getTypeSafe(this.delta, 0);
            switch (this.type.toLowerCase()) {
                case 'position':
                    this._curve.referCenter = parent.position;
                    this._lookat = false;
                    break;
                case 'positionlookat':
                    this._curve.referCenter = parent.position;
                    this._lookat = true;
                    break;
            }
            if (this.visible) {
                this._helper = new THREE.Mesh(new THREE.TubeGeometry(this._curve, interface_1.ThreeUtil.getTypeSafe(this.tubularSegments, 64), interface_1.ThreeUtil.getTypeSafe(this.tubeRadius, 0.01), interface_1.ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8), interface_1.ThreeUtil.getTypeSafe(this.closed, false)), new THREE.MeshBasicMaterial({
                    color: interface_1.ThreeUtil.getColorSafe(this.color, 0xff0000),
                    opacity: interface_1.ThreeUtil.getTypeSafe(this.opacity, 0.2),
                    depthTest: true,
                    transparent: true,
                    side: THREE.DoubleSide
                }));
                this._helperPoint = new THREE.Mesh(new THREE.SphereGeometry(interface_1.ThreeUtil.getTypeSafe(this.tubeRadius, 0.01) * 10, interface_1.ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 8), interface_1.ThreeUtil.getTypeSafe(this.tubeRadiusSegments, 4)), new THREE.MeshBasicMaterial({
                    color: interface_1.ThreeUtil.getColorSafe(this.color, 0x0000ff),
                    opacity: interface_1.ThreeUtil.getTypeSafe(this.opacity, 0.7),
                    depthTest: true,
                    transparent: true,
                    side: THREE.DoubleSide
                }));
                this._helperPoint.visible = false;
                switch (this.type.toLowerCase()) {
                    case 'position':
                        this._helper.scale.set(1, 1, 1);
                        this._helperPoint.visible = false;
                    case 'positionlookat':
                        this._helper.scale.set(1, 1, 1);
                        this._helperPoint.visible = true;
                        break;
                    default:
                        this._helper.scale.set(1, 1, 1).multiplyScalar(interface_1.ThreeUtil.getTypeSafe(this.scale, 1));
                        this._helperPoint.scale.set(1, 1, 1).multiplyScalar(interface_1.ThreeUtil.getTypeSafe(this.scale, 1));
                        this._helperPoint.visible = true;
                        break;
                }
            }
            this.setObject(this._curve);
        }
        if (this._parent !== parent && parent !== null) {
            this._parent = parent;
            this._controlItem = controlItem;
            if (this._parent !== null) {
                if (this._helper !== null) {
                    if (this._helper.parent !== this._parent.children[0]) {
                        this._parent.children[0].add(this._helper);
                    }
                }
                if (this._helperPoint !== null) {
                    if (this._helperPoint.parent !== this._parent) {
                        this._parent.add(this._helperPoint);
                    }
                }
            }
        }
        return this;
    };
    /**
     * Updates helper point
     * @param itemTimer
     * @param [scale]
     */
    ControllerItemComponent.prototype.updateHelperPoint = function (itemTimer, scale) {
        if (scale === void 0) { scale = null; }
        if (this._helperPoint !== null) {
            this._curve.getPointV3(itemTimer, this._helperPoint.position);
            switch (this.type.toLowerCase()) {
                case 'positionlookat':
                case 'position':
                    break;
                default:
                    this._helperPoint.position.multiplyScalar(interface_1.ThreeUtil.getTypeSafe(this.scale, 1));
                    if (scale !== null) {
                        this._helperPoint.scale.set(scale, scale, scale);
                    }
                    break;
            }
        }
    };
    /**
     * Updates color
     * @param targetColor
     * @param srcColor
     */
    ControllerItemComponent.prototype.updateColor = function (targetColor, srcColor) {
        switch (this.colorType) {
            case 'rate':
                if (this._rateCallBack !== null) {
                    targetColor.b = this._rateCallBack();
                }
                break;
            case 'rgb':
                targetColor.setRGB(srcColor.r, srcColor.g, srcColor.b);
                break;
            case 'gray':
                var avgColor = (srcColor.r + srcColor.g + srcColor.b) / 3;
                targetColor.setRGB(avgColor, avgColor, avgColor);
                break;
            default:
                if (this.colorType.indexOf('r') > -1) {
                    targetColor.r = srcColor.r;
                }
                if (this.colorType.indexOf('g') > -1) {
                    targetColor.g = srcColor.g;
                }
                if (this.colorType.indexOf('b') > -1) {
                    targetColor.b = srcColor.b;
                }
                break;
        }
    };
    /**
     * Gets lerp float
     * @param s
     * @param e
     * @param alpha
     * @returns lerp float
     */
    ControllerItemComponent.prototype.getLerpFloat = function (s, e, alpha) {
        return s + (e - s) * alpha;
    };
    /**
     * Updates controller item component
     * @param timer
     * @param events
     * @returns true if update
     */
    ControllerItemComponent.prototype.update = function (timer, events) {
        var _this = this;
        if (this._curve !== null && this._controlItem.object3d !== null && this._controlItem.object3d.userData.initPosition) {
            var itemTimer = {
                elapsedTime: timer.elapsedTime / this._duration + this._delta,
                delta: timer.delta / this._duration
            };
            switch (this.type.toLowerCase()) {
                case 'positionlookat':
                case 'position':
                    if (events.indexOf('position') === -1 && this._controlItem.position !== null) {
                        this._curve.getPointV3(itemTimer, this._controlItem.position);
                        events.push('position');
                        if (this._lookat) {
                            itemTimer.elapsedTime += this._lookathead;
                            itemTimer.delta += this._lookathead;
                            if (this._lastLookAt === null) {
                                this._lastLookAt = this._curve.getPointV3(itemTimer, new THREE.Vector3());
                            }
                            else {
                                this._curve.getPointV3(itemTimer, this._lastLookAt);
                                this._controlItem.object3d.lookAt(this._lastLookAt);
                            }
                            this.updateHelperPoint(itemTimer);
                            events.push('lookat');
                        }
                        return true;
                    }
                    else {
                        return false;
                    }
                case 'scale':
                    if (events.indexOf('scale') === -1 && this._controlItem.scale !== null) {
                        this._curve.getPointV3(itemTimer, this._controlItem.scale);
                        this.updateHelperPoint(itemTimer);
                        events.push('scale');
                        return true;
                    }
                    else {
                        return false;
                    }
                case 'rotation':
                    if (events.indexOf('rotation') === -1 && this._controlItem.rotation !== null) {
                        this._curve.getPointEuler(itemTimer, this._controlItem.rotation);
                        this.updateHelperPoint(itemTimer);
                        events.push('rotation');
                        return true;
                    }
                    else {
                        return false;
                    }
                case 'lookat':
                    if (events.indexOf('lookat') === -1) {
                        if (this._lastLookAt === null) {
                            this._lastLookAt = this._curve.getPointV3(itemTimer, new THREE.Vector3());
                        }
                        else {
                            this._curve.getPointV3(itemTimer, this._lastLookAt);
                            this._controlItem.object3d.lookAt(this._lastLookAt);
                        }
                        this.updateHelperPoint(itemTimer);
                        events.push('lookat');
                        return true;
                    }
                    else {
                        return false;
                    }
                case 'material':
                    if (interface_1.ThreeUtil.isNotNull(this.material) && this._controlItem.material !== null) {
                        var material = this._controlItem.material;
                        if (interface_1.ThreeUtil.isNotNull(material) && interface_1.ThreeUtil.isNotNull(material[this.material])) {
                            var scale = 1;
                            var oldValue = material[this.material];
                            if (oldValue instanceof THREE.Color) {
                                this._curve.getPointColor(itemTimer, this._tmpColor);
                                this.updateColor(oldValue, this._tmpColor);
                            }
                            else if (oldValue instanceof THREE.Vector2) {
                                this._curve.getPointV2(itemTimer, oldValue);
                            }
                            else if (oldValue instanceof THREE.Vector3) {
                                this._curve.getPointV3(itemTimer, oldValue);
                            }
                            else if (typeof oldValue === 'number') {
                                switch (this.material.toLowerCase()) {
                                    case 'opacity':
                                        material.opacity = this._curve.getPointFloat(itemTimer, 0, 1);
                                        scale = material.opacity * 3;
                                        break;
                                    default:
                                        material[this.material] = this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue);
                                        break;
                                }
                            }
                            this.updateHelperPoint(itemTimer, scale);
                        }
                    }
                    break;
                case 'uniform':
                case 'uniforms':
                    if (interface_1.ThreeUtil.isNotNull(this.uniform) && this._controlItem.uniforms !== null) {
                        var uniforms = this._controlItem.uniforms;
                        if (interface_1.ThreeUtil.isNotNull(uniforms[this.uniform])) {
                            var uniform = uniforms[this.uniform];
                            var oldValue = uniform.value;
                            switch (this.valueType.toLowerCase()) {
                                case 'copyposition':
                                    if (oldValue instanceof THREE.Vector3 && interface_1.ThreeUtil.isNotNull(this.refValue)) {
                                        oldValue.copy(interface_1.ThreeUtil.getPosition(this.refValue));
                                    }
                                    break;
                                case 'int':
                                case 'integer':
                                    uniform.value = Math.round(this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue));
                                    break;
                                case 'float':
                                case 'double':
                                case 'number':
                                    uniform.value = this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue);
                                    break;
                                default:
                                    if (oldValue instanceof THREE.Color) {
                                        this._curve.getPointColor(itemTimer, oldValue);
                                    }
                                    else if (oldValue instanceof THREE.Vector2) {
                                        this._curve.getPointV2(itemTimer, oldValue);
                                    }
                                    else if (oldValue instanceof THREE.Vector3) {
                                        this._curve.getPointV3(itemTimer, oldValue);
                                    }
                                    else if (typeof oldValue === 'number') {
                                        switch (this.uniform.toLowerCase()) {
                                            default:
                                                uniform.value = this._curve.getPointFloat(itemTimer, this.minValue, this.maxValue);
                                                break;
                                        }
                                    }
                                    break;
                            }
                        }
                    }
                    break;
                case 'update':
                case 'autoupdate':
                    if (this._controlItem.component !== null) {
                        if (interface_1.ThreeUtil.isNotNull(this._controlItem.component.update)) {
                            this._controlItem.component.update();
                        }
                    }
                    break;
                case 'tween':
                    var tween = this._controlItem.object3d.userData.tween;
                    if (interface_1.ThreeUtil.isNotNull(tween) && tween.elapsedTime < 1) {
                        tween.elapsedTime = Math.min(1, tween.elapsedTime + timer.delta / this._duration);
                        var lastElapsedAlpha = Math.min(0.99999, tween.elapsedAlpha || 0);
                        var tweenTimer = { elapsedTime: tween.elapsedTime, delta: timer.delta / this._duration };
                        tween.elapsedAlpha = this._curve.getPointFloat(tweenTimer, 0, 1);
                        var elapsedAlpha_1 = Math.max(0, Math.min(1, (tween.elapsedAlpha - lastElapsedAlpha) / (1 - lastElapsedAlpha)));
                        this.updateHelperPoint(tweenTimer);
                        Object.entries(tween).forEach(function (_a) {
                            var key = _a[0], value = _a[1];
                            if (interface_1.ThreeUtil.isNotNull(value)) {
                                switch (key) {
                                    case 'position':
                                        _this._controlItem.position.lerp(value, elapsedAlpha_1);
                                        break;
                                    case 'scale':
                                        _this._controlItem.scale.lerp(value, elapsedAlpha_1);
                                        break;
                                    case 'rotation':
                                        var rotationX = _this.getLerpFloat(_this._controlItem.rotation.x, value['x'], elapsedAlpha_1);
                                        var rotationY = _this.getLerpFloat(_this._controlItem.rotation.y, value['y'], elapsedAlpha_1);
                                        var rotationZ = _this.getLerpFloat(_this._controlItem.rotation.z, value['z'], elapsedAlpha_1);
                                        _this._controlItem.rotation.set(rotationX, rotationY, rotationZ);
                                        break;
                                }
                            }
                        });
                    }
                    break;
            }
        }
        return false;
    };
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "lookathead");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "curve");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "scale");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "radius");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "radiusInner");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "radiusX");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "radiusY");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "radiusZ");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rotation");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rotationX");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rotationY");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rotationZ");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "center");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "centerX");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "centerY");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "centerZ");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "duration");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "delta");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "multiply");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "options");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "color");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "opacity");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "tubularSegments");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "tubeRadius");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "tubeRadiusSegments");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "closed");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "material");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "uniform");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "wave");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "waveR");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "waveH");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rate");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rateX");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rateY");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "rateZ");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "valueType");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "refValue");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "minValue");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "maxValue");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "colorType");
    __decorate([
        core_1.Input()
    ], ControllerItemComponent.prototype, "refRate");
    ControllerItemComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-controller-item',
            templateUrl: './controller-item.component.html',
            styleUrls: ['./controller-item.component.scss']
        })
    ], ControllerItemComponent);
    return ControllerItemComponent;
}(subscribe_abstract_1.AbstractSubscribeComponent));
exports.ControllerItemComponent = ControllerItemComponent;
