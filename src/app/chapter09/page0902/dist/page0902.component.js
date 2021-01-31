"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0902Component = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var Page0902Component = /** @class */ (function () {
    function Page0902Component() {
        this.controls = {
            rotationSpeed: 0.02,
            bouncingSpeed: 0.03,
            scalingSpeed: 0.03,
            showRay: true,
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "rotationSpeed", type: "number", min: 0, max: 0.5 },
            { name: "bouncingSpeed", type: "number", min: 0, max: 0.5 },
            { name: "scalingSpeed", type: "number", min: 0, max: 0.5 },
            { name: "showRay", type: "checkbox" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.camera = null;
        this.cylinder = null;
        this.sphere = null;
        this.box = null;
        this.lastMaterial = null;
        this.tubePoints = null;
        this.rotation = {
            x: 0, y: 0, z: 0
        };
        this.spherePosition = {
            x: 0, y: 0, z: 0
        };
        this.scalingStep = {
            x: 1, y: 1, z: 1
        };
    }
    Page0902Component.prototype.ngOnInit = function () {
    };
    Page0902Component.prototype.getObjects = function () {
        var objects = [];
        if (this.cylinder !== null && this.cylinder !== undefined) {
            objects.push(this.cylinder.getObject3D());
        }
        if (this.sphere !== null && this.sphere !== undefined) {
            objects.push(this.sphere.getObject3D());
        }
        if (this.box !== null && this.box !== undefined) {
            objects.push(this.box.getObject3D());
        }
        return objects;
    };
    Page0902Component.prototype.hasPressed = function (event) {
        if (this.camera !== null && this.camera !== undefined) {
            var v = this.camera.getRaycaster(event);
            var intersects = v.intersectObjects(this.getObjects());
            if (intersects.length > 0) {
                if (intersects[0].object instanceof THREE.Mesh) {
                    if (this.lastMaterial !== null) {
                        this.lastMaterial.transparent = false;
                        this.lastMaterial.opacity = 1;
                    }
                    if (intersects[0].object.material instanceof THREE.Material) {
                        this.lastMaterial = intersects[0].object.material;
                        this.lastMaterial.transparent = true;
                        this.lastMaterial.opacity = 0.1;
                    }
                }
            }
        }
    };
    Page0902Component.prototype.hasReleased = function (event) {
        if (this.controls.showRay) {
            if (this.camera !== null && this.camera !== undefined) {
                var v = this.camera.getRaycaster(event);
                var intersects = v.intersectObjects(this.getObjects());
                if (intersects.length > 0) {
                    this.tubePoints = [];
                    this.tubePoints.push({ x: -30, y: 39.8, z: 30 });
                    this.tubePoints.push(intersects[0].point);
                }
                else {
                    this.tubePoints = null;
                }
            }
            else {
                this.tubePoints = null;
            }
        }
        else {
            this.tubePoints = null;
        }
    };
    Page0902Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += this.controls.rotationSpeed * timer.delta * 250;
            this.rotation.x = this.rotation.z = this.rotation.y;
            var step = this.controls.bouncingSpeed * timer.elapsedTime * 60;
            this.spherePosition.x = 20 + (10 * (Math.cos(step)));
            this.spherePosition.y = 2 + (10 * Math.abs(Math.sin(step)));
            var scalingStep = this.controls.scalingSpeed * timer.elapsedTime * 60;
            this.scalingStep.x = Math.abs(Math.sin(scalingStep / 4));
            this.scalingStep.y = Math.abs(Math.cos(scalingStep / 5));
            this.scalingStep.z = Math.abs(Math.sin(scalingStep / 7));
        }
    };
    __decorate([
        core_1.ViewChild('camera')
    ], Page0902Component.prototype, "camera");
    __decorate([
        core_1.ViewChild('cylinder')
    ], Page0902Component.prototype, "cylinder");
    __decorate([
        core_1.ViewChild('sphere')
    ], Page0902Component.prototype, "sphere");
    __decorate([
        core_1.ViewChild('box')
    ], Page0902Component.prototype, "box");
    __decorate([
        core_1.HostListener('document:mousedown', ['$event'])
    ], Page0902Component.prototype, "hasPressed");
    __decorate([
        core_1.HostListener('document:mousemove', ['$event'])
    ], Page0902Component.prototype, "hasReleased");
    Page0902Component = __decorate([
        core_1.Component({
            selector: 'app-page0902',
            templateUrl: './page0902.component.html',
            styleUrls: ['./page0902.component.scss']
        })
    ], Page0902Component);
    return Page0902Component;
}());
exports.Page0902Component = Page0902Component;
