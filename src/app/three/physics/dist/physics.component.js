"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PhysicsComponent = void 0;
var rxjs_1 = require("rxjs");
var interface_1 = require("./../interface");
var core_1 = require("@angular/core");
var ammojs_typed_1 = require("ammojs-typed");
var PhysicsComponent = /** @class */ (function () {
    function PhysicsComponent() {
        this.gravity = null;
        this.gravityX = null;
        this.gravityY = null;
        this.gravityZ = null;
        this.ammo = null;
        this.physics = null;
        this._physicsSubject = new rxjs_1.Subject();
        this.logSeq = 0;
    }
    PhysicsComponent.prototype.getGravity = function (def) {
        var gravity = interface_1.ThreeUtil.getTypeSafe(this.gravity, def);
        var gravityX = interface_1.ThreeUtil.getTypeSafe(this.gravityX, 0);
        var gravityY = interface_1.ThreeUtil.getTypeSafe(this.gravityY, gravity);
        var gravityZ = interface_1.ThreeUtil.getTypeSafe(this.gravityZ, 0);
        return new this.ammo.btVector3(gravityX, gravityY, gravityZ);
    };
    PhysicsComponent.prototype.ngOnInit = function () {
        var _this = this;
        ammojs_typed_1["default"]().then(function (AmmoLib) {
            _this.ammo = AmmoLib;
            _this.getPhysics();
        });
    };
    PhysicsComponent.prototype.getAmmo = function () {
        return this.ammo;
    };
    PhysicsComponent.prototype.physicsSubscribe = function () {
        return this._physicsSubject.asObservable();
    };
    PhysicsComponent.prototype.getPhysics = function () {
        if (this.physics === null && this.ammo !== null) {
            var collisionConfiguration = new this.ammo.btSoftBodyRigidBodyCollisionConfiguration();
            var dispatcher = new this.ammo.btCollisionDispatcher(collisionConfiguration);
            var broadphase = new this.ammo.btDbvtBroadphase();
            var solver = new this.ammo.btSequentialImpulseConstraintSolver();
            var softBodySolver = new this.ammo.btDefaultSoftBodySolver();
            var physics = new this.ammo.btSoftRigidDynamicsWorld(dispatcher, broadphase, solver, collisionConfiguration, softBodySolver);
            var gravity = this.getGravity(-9.8);
            physics.setGravity(gravity);
            physics.getWorldInfo().set_m_gravity(gravity);
            this.physics = physics;
            this._physicsSubject.next(this.physics);
        }
        return this.physics;
    };
    PhysicsComponent.prototype.getCollisionObject = function (body) {
        var btRigidBody = this.ammo['castObject'](body, this.ammo.btRigidBody);
        if (btRigidBody !== null && btRigidBody !== undefined && btRigidBody['object3d'] !== null && btRigidBody['object3d'] !== undefined) {
            return btRigidBody['object3d'];
        }
        return null;
    };
    PhysicsComponent.prototype.update = function (timer) {
        if (this.ammo !== null &&
            this.physics instanceof this.ammo.btSoftRigidDynamicsWorld) {
            this.physics.stepSimulation(timer.delta, 10);
            this.logSeq++;
            if (this.logSeq % 1000 === 0) {
                var dispatcher = this.physics.getDispatcher();
                var numManifolds = dispatcher.getNumManifolds();
                for (var i = 0; i < numManifolds; i++) {
                    var contactManifold = dispatcher.getManifoldByIndexInternal(i);
                    var body0 = this.getCollisionObject(contactManifold.getBody0());
                    var body1 = this.getCollisionObject(contactManifold.getBody1());
                    console.log(body0.name + ' => ' + body1.name);
                    var numContacts = contactManifold.getNumContacts();
                    var contactPoints = [];
                    for (var j = 0; j < numContacts; j++) {
                        contactPoints.push(contactManifold.getContactPoint(j));
                    }
                    if (body0 !== null) {
                        body0.dispatchEvent({
                            type: 'collision',
                            points: contactPoints,
                            collision: body1
                        });
                    }
                }
            }
        }
    };
    __decorate([
        core_1.Input()
    ], PhysicsComponent.prototype, "gravity");
    __decorate([
        core_1.Input()
    ], PhysicsComponent.prototype, "gravityX");
    __decorate([
        core_1.Input()
    ], PhysicsComponent.prototype, "gravityY");
    __decorate([
        core_1.Input()
    ], PhysicsComponent.prototype, "gravityZ");
    PhysicsComponent = __decorate([
        core_1.Component({
            selector: 'three-physics',
            templateUrl: './physics.component.html',
            styleUrls: ['./physics.component.scss']
        })
    ], PhysicsComponent);
    return PhysicsComponent;
}());
exports.PhysicsComponent = PhysicsComponent;
