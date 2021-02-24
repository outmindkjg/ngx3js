"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0708Component = void 0;
var core_1 = require("@angular/core");
var Page0708Component = /** @class */ (function () {
    function Page0708Component() {
        this.controls = {
            size: 150,
            sprite: 0,
            transparent: true,
            opacity: 0.6,
            color: 0xffffff,
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "sprite", type: "number", min: 0, max: 4, step: 1 },
            { name: "size", type: "number", min: 0, max: 120 },
            { name: "transparent", type: "checkbox" },
            { name: "opacity", type: "number", min: 0, max: 1 },
            { name: "color", type: "color" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
        this.cameraPosition = {
            x: 0, y: 0, z: 50
        };
        this.spritePosition = {
            x: 100, y: 50, z: -10
        };
        this.spriteVelocityX = -5;
    }
    Page0708Component.prototype.ngOnInit = function () {
    };
    Page0708Component.prototype.onRender = function (timer) {
        this.cameraPosition.y = Math.sin(timer.elapsedTime) * 20;
        this.spritePosition.x = this.spritePosition.x + this.spriteVelocityX;
        if (this.spritePosition.x > window.innerWidth) {
            this.spriteVelocityX = -5;
        }
        else if (this.spritePosition.x < 0) {
            this.spriteVelocityX = 5;
        }
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0708Component = __decorate([
        core_1.Component({
            selector: 'app-page0708',
            templateUrl: './page0708.component.html',
            styleUrls: ['./page0708.component.scss']
        })
    ], Page0708Component);
    return Page0708Component;
}());
exports.Page0708Component = Page0708Component;
