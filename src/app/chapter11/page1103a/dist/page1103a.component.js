"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page1103aComponent = void 0;
var core_1 = require("@angular/core");
var Page1103aComponent = /** @class */ (function () {
    function Page1103aComponent() {
        this.controls = {
            dtSize: 64,
            goWild: false,
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "dtSize", type: "number", min: 1, max: 256 },
            { name: "goWild", type: "checkbox" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page1103aComponent.prototype.ngOnInit = function () {
    };
    Page1103aComponent.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page1103aComponent = __decorate([
        core_1.Component({
            selector: 'app-page1103a',
            templateUrl: './page1103a.component.html',
            styleUrls: ['./page1103a.component.scss']
        })
    ], Page1103aComponent);
    return Page1103aComponent;
}());
exports.Page1103aComponent = Page1103aComponent;
