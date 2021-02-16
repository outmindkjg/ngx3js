"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1305Component = void 0;
var core_1 = require("@angular/core");
var Page1305Component = /** @class */ (function () {
    function Page1305Component() {
        var _this = this;
        this.controls = {
            velocity: {
                x: 0,
                y: 0,
                z: 0,
                apply: function () {
                    if (_this.sphereRigidBody !== null) {
                        _this.sphereRigidBody.setMotionStatePosition(0, 5, 0);
                        _this.sphereRigidBody.setVelocity(_this.controls.velocity.x, _this.controls.velocity.y, _this.controls.velocity.z, 'linear');
                    }
                }
            },
            rotate: true,
            wireframe: false
        };
        this.sphereRigidBody = null;
        this.controlsParams = [
            { name: "Velocity", type: "folder", control: 'velocity', children: [
                    { name: "x", type: "number", min: -10, max: 10, step: 0.1 },
                    { name: "y", type: "number", min: -10, max: 10, step: 0.1 },
                    { name: "z", type: "number", min: -10, max: 10, step: 0.1 },
                    { name: "apply", type: "button" },
                ] },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page1305Component.prototype.loadSphereRigidBody = function (sphereRigidBody) {
        this.sphereRigidBody = sphereRigidBody;
    };
    Page1305Component.prototype.ngOnInit = function () {
    };
    Page1305Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1305Component = __decorate([
        core_1.Component({
            selector: 'app-page1305',
            templateUrl: './page1305.component.html',
            styleUrls: ['./page1305.component.scss']
        })
    ], Page1305Component);
    return Page1305Component;
}());
exports.Page1305Component = Page1305Component;
