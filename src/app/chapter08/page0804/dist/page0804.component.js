"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0804Component = void 0;
var core_1 = require("@angular/core");
var Page0804Component = /** @class */ (function () {
    function Page0804Component() {
        var _this = this;
        this.savedName = 'localStorage0804';
        this.saveSeqn = 0;
        this.loadedName = null;
        this.controls = {
            exportScene: function () {
                if (_this.targetObj !== null && _this.targetObj !== undefined) {
                    _this.saveSeqn++;
                    _this.saveSeqn = (_this.saveSeqn % 5) + 1;
                    _this.targetObj.setSavelocalStorage(_this.savedName + '_' + _this.saveSeqn);
                }
            },
            clearScene: function () {
                if (_this.targetObj !== null && _this.targetObj !== undefined) {
                    _this.targetObj.setClear();
                }
            },
            importScene: function () {
                if (_this.saveSeqn > 0) {
                    _this.loadedName = _this.savedName + '_' + _this.saveSeqn;
                    _this.saveSeqn--;
                    console.log(_this.loadedName);
                }
            },
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "exportScene", type: "button" },
            { name: "clearScene", type: "button" },
            { name: "importScene", type: "button" },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0804Component.prototype.ngOnInit = function () {
    };
    Page0804Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    __decorate([
        core_1.ViewChild('target')
    ], Page0804Component.prototype, "targetObj");
    Page0804Component = __decorate([
        core_1.Component({
            selector: 'app-page0804',
            templateUrl: './page0804.component.html',
            styleUrls: ['./page0804.component.scss']
        })
    ], Page0804Component);
    return Page0804Component;
}());
exports.Page0804Component = Page0804Component;
