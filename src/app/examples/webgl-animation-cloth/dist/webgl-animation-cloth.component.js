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
exports.WebglAnimationClothComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var interface_1 = require("./../../three/interface");
var WebglAnimationClothComponent = /** @class */ (function (_super) {
    __extends(WebglAnimationClothComponent, _super);
    function WebglAnimationClothComponent() {
        var _this = _super.call(this, {
            enableWind: true,
            showBall: false,
            togglePins: function () {
                _this.togglePins();
            }
        }, [
            { name: 'enableWind', type: 'checkbox', title: 'Enable wind' },
            { name: 'showBall', type: 'checkbox', title: 'Show ball' },
            { name: 'togglePins', type: 'button', title: 'Toggle pins' },
        ]) || this;
        _this.DAMPING = 0.03;
        _this.DRAG = 1 - _this.DAMPING;
        _this.MASS = 0.1;
        _this.restDistance = 25;
        _this.xSegs = 10;
        _this.ySegs = 10;
        _this.GRAVITY = 981 * 1.4;
        _this.gravity = null;
        _this.TIMESTEP = 18 / 1000;
        _this.TIMESTEP_SQ = _this.TIMESTEP * _this.TIMESTEP;
        _this.pins = [];
        _this.windForce = new THREE.Vector3(0, 0, 0);
        _this.ballPosition = new THREE.Vector3(0, -45, 0);
        _this.ballSize = 60; //40
        _this.tmpForce = new THREE.Vector3();
        _this.pinsFormation = [];
        _this.clothGeometry = null;
        _this.sphere = null;
        _this.cloth = null;
        _this.clothFunction = null;
        _this.diff = new THREE.Vector3();
        return _this;
    }
    WebglAnimationClothComponent.prototype.ngOnInit = function () {
        this.clothFunction = this.getPlane(this.restDistance * this.xSegs, this.restDistance * this.ySegs);
        this.cloth = new Cloth(this.xSegs, this.ySegs, this.restDistance, this.MASS, this.clothFunction, this.DRAG);
        this.gravity = new THREE.Vector3(0, -this.GRAVITY, 0).multiplyScalar(this.MASS);
        var pins = [6];
        this.pinsFormation.push(pins);
        pins = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        this.pinsFormation.push(pins);
        pins = [0];
        this.pinsFormation.push(pins);
        pins = []; // cut the rope ;)
        this.pinsFormation.push(pins);
        pins = [0, this.cloth.w]; // classic 2 pins
        this.pinsFormation.push(pins);
        this.pins = this.pinsFormation[1];
        _super.prototype.ngOnInit.call(this);
    };
    WebglAnimationClothComponent.prototype.setClothGeometry = function (geometry) {
        this.clothGeometry = geometry.getGeometry();
    };
    WebglAnimationClothComponent.prototype.setSphere = function (sphere) {
        this.sphere = sphere.getMesh();
    };
    WebglAnimationClothComponent.prototype.getPlane = function (width, height) {
        return function (u, v, target) {
            if (target === void 0) { target = null; }
            var x = (u - 0.5) * width;
            var y = (v + 0.5) * height;
            var z = 0;
            if (target)
                target.set(x, y, z);
            return { x: x, y: y, z: z };
        };
    };
    WebglAnimationClothComponent.prototype.togglePins = function () {
        this.pins = this.pinsFormation[~~(Math.random() * this.pinsFormation.length)];
        console.log(this.pins);
    };
    WebglAnimationClothComponent.prototype.satisfyConstraints = function (p1, p2, distance) {
        this.diff.subVectors(p2.position, p1.position);
        var currentDist = this.diff.length();
        if (currentDist === 0)
            return; // prevents division by 0
        var correction = this.diff.multiplyScalar(1 - distance / currentDist);
        var correctionHalf = correction.multiplyScalar(0.5);
        p1.position.add(correctionHalf);
        p2.position.sub(correctionHalf);
    };
    WebglAnimationClothComponent.prototype.simulate = function (now) {
        var windStrength = Math.cos(now / 7000) * 20 + 40;
        this.windForce.set(Math.sin(now / 2000), Math.cos(now / 3000), Math.sin(now / 1000));
        this.windForce.normalize();
        this.windForce.multiplyScalar(windStrength);
        var particles = this.cloth.particles;
        if (this.controls.enableWind) {
            var indx = void 0;
            var normal = new THREE.Vector3();
            var indices = this.clothGeometry.index;
            var normals = this.clothGeometry.attributes.normal;
            for (var i = 0, il_1 = indices.count; i < il_1; i += 3) {
                for (var j = 0; j < 3; j++) {
                    indx = indices.getX(i + j);
                    normal.fromBufferAttribute(normals, indx);
                    this.tmpForce
                        .copy(normal)
                        .normalize()
                        .multiplyScalar(normal.dot(this.windForce));
                    particles[indx].addForce(this.tmpForce);
                }
            }
        }
        for (var i = 0, il_2 = particles.length; i < il_2; i++) {
            var particle = particles[i];
            particle.addForce(this.gravity);
            particle.integrate(this.TIMESTEP_SQ);
        }
        var constraints = this.cloth.constraints;
        var il = constraints.length;
        for (var i = 0; i < il; i++) {
            var constraint = constraints[i];
            this.satisfyConstraints(constraint[0], constraint[1], constraint[2]);
        }
        this.ballPosition.z = -Math.sin(now / 600) * 90; //+ 40;
        this.ballPosition.x = Math.cos(now / 400) * 70;
        if (this.controls.showBall) {
            this.sphere.visible = true;
            for (var i = 0, il_3 = particles.length; i < il_3; i++) {
                var particle = particles[i];
                var pos = particle.position;
                this.diff.subVectors(pos, this.ballPosition);
                if (this.diff.length() < this.ballSize) {
                    // collided
                    this.diff.normalize().multiplyScalar(this.ballSize);
                    pos.copy(this.ballPosition).add(this.diff);
                }
            }
        }
        else {
            this.sphere.visible = false;
        }
        // Floor Constraints
        for (var i = 0, il_4 = particles.length; i < il_4; i++) {
            var particle = particles[i];
            var pos = particle.position;
            if (pos.y < -250) {
                pos.y = -250;
            }
        }
        // Pin Constraints
        for (var i = 0, il_5 = this.pins.length; i < il_5; i++) {
            var xy = this.pins[i];
            var p = particles[xy];
            p.position.copy(p.original);
            p.previous.copy(p.original);
        }
    };
    WebglAnimationClothComponent.prototype.onRender = function (timer) {
        if (this.cloth !== null &&
            this.clothGeometry !== null &&
            this.sphere !== null) {
            this.simulate(timer.elapsedTime * 1000);
            var p = this.cloth.particles;
            for (var i = 0, il = p.length; i < il; i++) {
                var v = p[i].position;
                this.clothGeometry.attributes.position.setXYZ(i, v.x, v.y, v.z);
            }
            this.clothGeometry.attributes.position.needsUpdate = true;
            this.clothGeometry.computeVertexNormals();
            this.sphere.position.copy(this.ballPosition);
        }
        _super.prototype.onRender.call(this, timer);
    };
    WebglAnimationClothComponent = __decorate([
        core_1.Component({
            selector: 'app-webgl-animation-cloth',
            templateUrl: './webgl-animation-cloth.component.html',
            styleUrls: ['./webgl-animation-cloth.component.scss']
        })
    ], WebglAnimationClothComponent);
    return WebglAnimationClothComponent;
}(interface_1.BaseComponent));
exports.WebglAnimationClothComponent = WebglAnimationClothComponent;
var Cloth = /** @class */ (function () {
    function Cloth(w, h, restDistance, mass, clothFunction, drag) {
        w = w || 10;
        h = h || 10;
        this.w = w;
        this.h = h;
        var particles = [];
        var constraints = [];
        // Create particles
        for (var v = 0; v <= h; v++) {
            for (var u = 0; u <= w; u++) {
                particles.push(new Particle(u / w, v / h, 0, mass, clothFunction, drag));
            }
        }
        for (var v = 0; v < h; v++) {
            for (var u = 0; u < w; u++) {
                constraints.push([
                    particles[this.index(u, v)],
                    particles[this.index(u, v + 1)],
                    restDistance,
                ]);
                constraints.push([
                    particles[this.index(u, v)],
                    particles[this.index(u + 1, v)],
                    restDistance,
                ]);
            }
        }
        for (var u = w, v = 0; v < h; v++) {
            constraints.push([
                particles[this.index(u, v)],
                particles[this.index(u, v + 1)],
                restDistance,
            ]);
        }
        for (var v = h, u = 0; u < w; u++) {
            constraints.push([
                particles[this.index(u, v)],
                particles[this.index(u + 1, v)],
                restDistance,
            ]);
        }
        this.particles = particles;
        this.constraints = constraints;
    }
    Cloth.prototype.index = function (u, v) {
        return u + v * (this.w + 1);
    };
    return Cloth;
}());
var Particle = /** @class */ (function () {
    function Particle(x, y, z, mass, clothFunction, drag) {
        this.position = new THREE.Vector3();
        this.previous = new THREE.Vector3();
        this.original = new THREE.Vector3();
        this.a = new THREE.Vector3(0, 0, 0); // acceleration
        this.mass = mass;
        this.invMass = 1 / mass;
        this.tmp = new THREE.Vector3();
        this.tmp2 = new THREE.Vector3();
        this.drag = drag;
        clothFunction(x, y, this.position); // position
        clothFunction(x, y, this.previous); // previous
        clothFunction(x, y, this.original);
    }
    Particle.prototype.addForce = function (force) {
        this.a.add(this.tmp2.copy(force).multiplyScalar(this.invMass));
    };
    Particle.prototype.integrate = function (timesq) {
        var newPos = this.tmp.subVectors(this.position, this.previous);
        newPos.multiplyScalar(this.drag).add(this.position);
        newPos.add(this.a.multiplyScalar(timesq));
        this.tmp = this.previous;
        this.previous = this.position;
        this.position = newPos;
        this.a.set(0, 0, 0);
    };
    return Particle;
}());
