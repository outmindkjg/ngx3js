"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ShaderComponent = void 0;
var core_1 = require("@angular/core");
var ShaderComponent = /** @class */ (function () {
    function ShaderComponent(ele) {
        this.ele = ele;
        this.type = 'x-shader/x-fragment';
        this.refShader = null;
        this.shader = null;
    }
    ShaderComponent.prototype.ngOnInit = function () {
    };
    ShaderComponent.prototype.getShader = function () {
        if (this.shader === null) {
            if (this.refShader !== null) {
                this.shader = this.refShader.getShader();
            }
            else {
                this.shader = this.ele.nativeElement.innerText;
            }
        }
        return this.shader;
    };
    __decorate([
        core_1.Input()
    ], ShaderComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], ShaderComponent.prototype, "refShader");
    ShaderComponent = __decorate([
        core_1.Component({
            selector: 'three-shader',
            templateUrl: './shader.component.html',
            styleUrls: ['./shader.component.scss']
        })
    ], ShaderComponent);
    return ShaderComponent;
}());
exports.ShaderComponent = ShaderComponent;
