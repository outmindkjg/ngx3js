"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RigidbodyComponent = void 0;
var interface_1 = require("./../interface");
var core_1 = require("@angular/core");
var THREE = require("three");
var RigidbodyComponent = /** @class */ (function () {
    function RigidbodyComponent() {
        this.type = 'auto';
        this.width = null;
        this.height = null;
        this.depth = null;
        this.radius = null;
        this.mass = null;
        this.margin = null;
        this.friction = null;
        this.rollingFriction = null;
        this.restitution = null;
        this.inertia = null;
        this.inertiaX = null;
        this.inertiaY = null;
        this.inertiaZ = null;
        this.linDamping = null;
        this.angDamping = null;
        this.onLoad = new core_1.EventEmitter();
        this.object3d = null;
        this.physics = null;
        this._ammo = null;
        this._physics = null;
        this.rigidBody = null;
        this.transformAux = null;
    }
    RigidbodyComponent.prototype.getBoxHalfExtents = function (geometry, def) {
        var boxHalfExtents = interface_1.ThreeUtil.getVector3Safe(this.width, this.height, this.depth);
        if (interface_1.ThreeUtil.isNull(boxHalfExtents)) {
            boxHalfExtents = this.getGeometrySize(geometry, def);
        }
        return new this._ammo.btVector3(boxHalfExtents.x / 2, boxHalfExtents.y / 2, boxHalfExtents.z / 2);
    };
    RigidbodyComponent.prototype.getRadius = function (geometry, def) {
        var radius = this.radius;
        if (interface_1.ThreeUtil.isNull(radius)) {
            var geometrySize = this.getGeometrySize(geometry, def);
            radius = Math.max(geometrySize.x, geometrySize.y, geometrySize.z);
        }
        return radius;
    };
    RigidbodyComponent.prototype.getHeight = function (geometry, def) {
        var height = this.height;
        if (interface_1.ThreeUtil.isNull(height)) {
            height = this.getGeometrySize(geometry, def).y;
        }
        return height;
    };
    RigidbodyComponent.prototype.getMass = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.mass, def);
    };
    RigidbodyComponent.prototype.getMargin = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.margin, def);
    };
    RigidbodyComponent.prototype.getFriction = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.friction, def);
    };
    RigidbodyComponent.prototype.getRollingFriction = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.rollingFriction, def);
    };
    RigidbodyComponent.prototype.getRestitution = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.restitution, def);
    };
    RigidbodyComponent.prototype.getInertia = function (def) {
        var inertia = interface_1.ThreeUtil.getTypeSafe(this.inertia, def);
        var inertiaX = interface_1.ThreeUtil.getTypeSafe(this.inertiaX, 0);
        var inertiaY = interface_1.ThreeUtil.getTypeSafe(this.inertiaY, inertia);
        var inertiaZ = interface_1.ThreeUtil.getTypeSafe(this.inertiaZ, 0);
        return new this._ammo.btVector3(inertiaX, inertiaY, inertiaZ);
    };
    RigidbodyComponent.prototype.getLinDamping = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.linDamping, def);
    };
    RigidbodyComponent.prototype.getAngDamping = function (def) {
        return interface_1.ThreeUtil.getTypeSafe(this.angDamping, def);
    };
    RigidbodyComponent.prototype.getGeometrySize = function (geometry, def) {
        if (interface_1.ThreeUtil.isNotNull(geometry)) {
            if (geometry instanceof THREE.BoxGeometry) {
                return new THREE.Vector3(geometry.parameters.width, geometry.parameters.height, geometry.parameters.depth);
            }
            else if (geometry instanceof THREE.SphereGeometry) {
                return new THREE.Vector3(geometry.parameters.radius, geometry.parameters.radius, geometry.parameters.radius);
            }
            else if (geometry instanceof THREE.PlaneGeometry) {
                return new THREE.Vector3(geometry.parameters.width, geometry.parameters.height, 0.001);
            }
        }
        if (interface_1.ThreeUtil.isNotNull(def)) {
            if (def instanceof THREE.Vector3) {
                return def;
            }
            else {
                return new THREE.Vector3(def, def, def);
            }
        }
        else {
            return new THREE.Vector3();
        }
    };
    RigidbodyComponent.prototype.ngOnInit = function () { };
    RigidbodyComponent.prototype.setObject3D = function (object3d) {
        this.object3d = object3d;
        this.resetRigidBody();
    };
    RigidbodyComponent.prototype.setPhysics = function (physics) {
        var _this = this;
        this.physics = physics;
        this._physics = this.physics.getPhysics();
        if (this._physics !== null) {
            this._ammo = this.physics.getAmmo();
            this.resetRigidBody();
        }
        else {
            var subscribe_1 = this.physics.physicsSubscribe().subscribe(function () {
                _this._physics = _this.physics.getPhysics();
                _this._ammo = _this.physics.getAmmo();
                _this.resetRigidBody();
                subscribe_1.unsubscribe();
            });
        }
    };
    RigidbodyComponent.prototype.setVelocity = function (x, y, z, type) {
        if (type === void 0) { type = 'linear'; }
        if (this.rigidBody !== null) {
            var velocity = new this._ammo.btVector3(x, y, z);
            switch (type.toLowerCase()) {
                case 'angular':
                    this.rigidBody.setAngularVelocity(velocity);
                    break;
                case 'linear':
                default:
                    this.rigidBody.setLinearVelocity(velocity);
                    break;
            }
        }
    };
    RigidbodyComponent.prototype.getVelocity = function (type) {
        if (type === void 0) { type = 'linear'; }
        if (this.rigidBody !== null) {
            var velocity = null;
            switch (type.toLowerCase()) {
                case 'angular':
                    velocity = this.rigidBody.getAngularVelocity();
                    break;
                case 'linear':
                default:
                    velocity = this.rigidBody.getLinearVelocity();
                    break;
            }
            return new THREE.Vector3(velocity.x(), velocity.y(), velocity.z());
        }
        return null;
    };
    RigidbodyComponent.prototype.setFactor = function (x, y, z, type) {
        if (type === void 0) { type = 'linear'; }
        if (this.rigidBody !== null) {
            var factor = new this._ammo.btVector3(x, y, z);
            switch (type.toLowerCase()) {
                case 'angular':
                    this.rigidBody.setAngularFactor(factor);
                    break;
                case 'linear':
                default:
                    this.rigidBody.setLinearFactor(factor);
                    break;
            }
        }
    };
    RigidbodyComponent.prototype.getFactor = function (type) {
        if (type === void 0) { type = 'linear'; }
        if (this.rigidBody !== null) {
            var factor = null;
            switch (type.toLowerCase()) {
                case 'angular':
                    factor = this.rigidBody.getAngularFactor();
                    break;
                case 'linear':
                default:
                    factor = this.rigidBody.getLinearFactor();
                    break;
            }
            return new THREE.Vector3(factor.x(), factor.y(), factor.z());
        }
        return null;
    };
    RigidbodyComponent.prototype.clearForces = function () {
        if (this.rigidBody !== null) {
            this.rigidBody.clearForces();
        }
    };
    RigidbodyComponent.prototype.applyTorque = function (x, y, z, type) {
        if (type === void 0) { type = 'torque'; }
        if (this.rigidBody !== null) {
            var torque = new this._ammo.btVector3(x, y, z);
            switch (type.toLowerCase()) {
                case 'local':
                    this.rigidBody.applyLocalTorque(torque);
                    break;
                case 'impulse':
                    this.rigidBody.applyTorqueImpulse(torque);
                    break;
                case 'torque':
                default:
                    this.rigidBody.applyTorque(torque);
                    break;
            }
        }
    };
    RigidbodyComponent.prototype.getMotionState = function () {
        if (this.rigidBody !== null) {
            return this.rigidBody.getMotionState();
        }
        return null;
    };
    RigidbodyComponent.prototype.setMotionState = function (motionState) {
        if (this.rigidBody !== null) {
            this.rigidBody.setMotionState(motionState);
        }
    };
    RigidbodyComponent.prototype.setMotionStatePosition = function (x, y, z, rx, ry, rz) {
        if (x === void 0) { x = null; }
        if (y === void 0) { y = null; }
        if (z === void 0) { z = null; }
        if (rx === void 0) { rx = null; }
        if (ry === void 0) { ry = null; }
        if (rz === void 0) { rz = null; }
        if (this.rigidBody !== null) {
            var transform = new this._ammo.btTransform();
            transform.setIdentity();
            var quaternion = this.object3d.quaternion;
            var relRotation = interface_1.ThreeUtil.getEulerSafe(rx, ry, rz);
            if (interface_1.ThreeUtil.isNotNull(relRotation)) {
                quaternion.setFromEuler(relRotation);
            }
            transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
            var position = this.object3d.position;
            var relPosition = interface_1.ThreeUtil.getVector3Safe(x, y, z);
            if (interface_1.ThreeUtil.isNotNull(relPosition)) {
                position.copy(relPosition);
            }
            transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
            var motionState = new this._ammo.btDefaultMotionState(transform);
            this.setMotionState(motionState);
        }
    };
    RigidbodyComponent.prototype.setMotionStateRotation = function (x, y, z) {
        if (this.rigidBody !== null) {
            var transform = new this._ammo.btTransform();
            transform.setIdentity();
            var quaternion = new THREE.Quaternion();
            quaternion.setFromEuler(interface_1.ThreeUtil.getEulerSafe(x, y, z));
            transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
            var position = this.object3d.position;
            transform.setOrigin(new this._ammo.btVector3(position.x, position.y, position.z));
            var motionState = new this._ammo.btDefaultMotionState(transform);
            this.setMotionState(motionState);
        }
    };
    RigidbodyComponent.prototype.applyForce = function (x, y, z, type, relX, relY, relZ) {
        if (type === void 0) { type = 'force'; }
        if (relX === void 0) { relX = 0; }
        if (relY === void 0) { relY = 0; }
        if (relZ === void 0) { relZ = 0; }
        if (this.rigidBody !== null) {
            var force = new this._ammo.btVector3(x, y, z);
            switch (type.toLowerCase()) {
                case 'centrallocal':
                    this.rigidBody.applyCentralLocalForce(force);
                    break;
                case 'central':
                    this.rigidBody.applyCentralForce(force);
                    break;
                case 'force':
                default:
                    var relPos = new this._ammo.btVector3(relX, relY, relZ);
                    this.rigidBody.applyForce(force, relPos);
                    break;
            }
        }
    };
    RigidbodyComponent.prototype.resetRigidBody = function () {
        if (this.rigidBody === null &&
            this.object3d !== null &&
            this._physics !== null &&
            interface_1.ThreeUtil.isNotNull(this._ammo) &&
            interface_1.ThreeUtil.isNotNull(this._physics)) {
            var shape = null;
            var type = this.type;
            var geometry = null;
            if (this.object3d instanceof THREE.Mesh) {
                geometry = this.object3d.geometry;
            }
            else {
                type = 'empty';
            }
            if (type.toLowerCase() === 'auto') {
                if (interface_1.ThreeUtil.isNotNull(geometry)) {
                    if (geometry instanceof THREE.BoxGeometry) {
                        type = 'box';
                    }
                    else if (geometry instanceof THREE.SphereGeometry) {
                        type = 'sphere';
                    }
                    else if (geometry instanceof THREE.ConeGeometry) {
                        type = 'cone';
                    }
                    else if (geometry instanceof THREE.CylinderGeometry) {
                        type = 'cylinder';
                    }
                    else if (geometry instanceof THREE.PlaneGeometry) {
                        type = 'staticplane';
                    }
                    else {
                        type = 'empty';
                    }
                }
                else {
                    type = 'empty';
                }
            }
            switch (type.toLowerCase()) {
                case 'convextriangle':
                    {
                        var meshInterface = null;
                        var calcAabb = false;
                        shape = new this._ammo.btConvexTriangleMeshShape(meshInterface, calcAabb);
                    }
                    break;
                case 'box':
                    {
                        shape = new this._ammo.btBoxShape(this.getBoxHalfExtents(geometry));
                    }
                    break;
                case 'capsule':
                    {
                        shape = new this._ammo.btCapsuleShape(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
                    }
                    break;
                case 'capsulex':
                    {
                        shape = new this._ammo.btCapsuleShapeX(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
                    }
                    break;
                case 'capsulez':
                    {
                        shape = new this._ammo.btCapsuleShapeZ(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
                    }
                    break;
                case 'cylinder':
                    {
                        shape = new this._ammo.btCylinderShape(this.getBoxHalfExtents(geometry));
                    }
                    break;
                case 'cylinderx':
                    {
                        shape = new this._ammo.btCylinderShapeX(this.getBoxHalfExtents(geometry));
                    }
                    break;
                case 'cylinderz':
                    {
                        shape = new this._ammo.btCylinderShapeZ(this.getBoxHalfExtents(geometry));
                    }
                    break;
                case 'sphere':
                    {
                        shape = new this._ammo.btSphereShape(this.getRadius(geometry, 0));
                    }
                    break;
                case 'multisphere':
                    {
                        var positions = null;
                        var radii = null;
                        var numPoints = null;
                        shape = new this._ammo.btMultiSphereShape(positions, radii, numPoints);
                    }
                    break;
                case 'cone':
                    {
                        shape = new this._ammo.btConeShape(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
                    }
                    break;
                case 'conex':
                    {
                        shape = new this._ammo.btConeShapeX(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
                    }
                    break;
                case 'conez':
                    {
                        shape = new this._ammo.btConeShapeZ(this.getRadius(geometry, 0), this.getHeight(geometry, 0));
                    }
                    break;
                case 'convexhull':
                    {
                        var points = null;
                        var numPoints = null;
                        shape = new this._ammo.btConvexHullShape(points, numPoints);
                    }
                    break;
                case 'compound':
                    {
                        var enableDynamicAabbTree = false;
                        shape = new this._ammo.btCompoundShape(enableDynamicAabbTree);
                    }
                    break;
                case 'staticplane':
                    {
                        var planeNormal = null;
                        var planeConstant = null;
                        shape = new this._ammo.btStaticPlaneShape(planeNormal, planeConstant);
                    }
                    break;
                case 'bvhtriangle':
                    {
                        var meshInterface = null;
                        var useQuantizedAabbCompression = null;
                        var buildBvh = null;
                        shape = new this._ammo.btBvhTriangleMeshShape(meshInterface, useQuantizedAabbCompression, buildBvh);
                    }
                    break;
                case 'heightfieldterrain':
                    {
                        var heightStickWidth = null;
                        var heightStickLength = null;
                        var heightfieldData = null;
                        var heightScale = null;
                        var minHeight = null;
                        var maxHeight = null;
                        var upAxis = null;
                        var hdt = null;
                        var flipQuadEdges = null;
                        shape = new this._ammo.btHeightfieldTerrainShape(heightStickWidth, heightStickLength, heightfieldData, heightScale, minHeight, maxHeight, upAxis, hdt, flipQuadEdges);
                    }
                    break;
                case 'empty':
                default:
                    shape = new this._ammo.btEmptyShape();
                    break;
            }
            var scale = this.object3d.scale;
            shape.setLocalScaling(new this._ammo.btVector3(scale.x, scale.y, scale.z));
            shape.setMargin(this.getMargin(0.05));
            var mass = this.getMass();
            var localInertia = this.getInertia(0);
            shape.calculateLocalInertia(mass, localInertia);
            var transform = new this._ammo.btTransform();
            transform.setIdentity();
            var quaternion = this.object3d.quaternion;
            transform.setRotation(new this._ammo.btQuaternion(quaternion.x, quaternion.y, quaternion.z, quaternion.w));
            var pos = this.object3d.position;
            transform.setOrigin(new this._ammo.btVector3(pos.x, pos.y, pos.z));
            var motionState = new this._ammo.btDefaultMotionState(transform);
            var rbInfo = new this._ammo.btRigidBodyConstructionInfo(mass, motionState, shape, localInertia);
            var body = new this._ammo.btRigidBody(rbInfo);
            if (mass > 0) {
                body.setActivationState(4);
            }
            body.setFriction(this.getFriction(0));
            body.setRollingFriction(this.getRollingFriction(0));
            body.setRestitution(this.getRestitution(0));
            body.setDamping(this.getLinDamping(0), this.getAngDamping(0));
            body['object3d'] = this.object3d;
            this.transformAux = new this._ammo.btTransform();
            this.rigidBody = body;
            this._physics.addRigidBody(body);
            this.object3d.userData.physicsBody = body;
            this.object3d.userData.physicsComponent = this;
            this.object3d.addEventListener('collision', function (e) {
                console.log('collision', e);
            });
            this.onLoad.emit(this);
        }
        return this.rigidBody;
    };
    RigidbodyComponent.prototype.update = function (timer) {
        if (this.rigidBody !== null) {
            var objThree = this.object3d;
            var objPhys = this.rigidBody;
            var ms = objPhys.getMotionState();
            if (ms) {
                var transformAux = this.transformAux;
                ms.getWorldTransform(transformAux);
                var p = transformAux.getOrigin();
                var q = transformAux.getRotation();
                objThree.position.set(p.x(), p.y(), p.z());
                objThree.quaternion.set(q.x(), q.y(), q.z(), q.w());
            }
        }
    };
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "width");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "height");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "depth");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "radius");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "mass");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "margin");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "friction");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "rollingFriction");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "restitution");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "inertia");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "inertiaX");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "inertiaY");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "inertiaZ");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "linDamping");
    __decorate([
        core_1.Input()
    ], RigidbodyComponent.prototype, "angDamping");
    __decorate([
        core_1.Output()
    ], RigidbodyComponent.prototype, "onLoad");
    RigidbodyComponent = __decorate([
        core_1.Component({
            selector: 'three-rigidbody',
            templateUrl: './rigidbody.component.html',
            styleUrls: ['./rigidbody.component.scss']
        })
    ], RigidbodyComponent);
    return RigidbodyComponent;
}());
exports.RigidbodyComponent = RigidbodyComponent;
