"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Page0910Component = void 0;
var core_1 = require("@angular/core");
var Page0910Component = /** @class */ (function () {
    function Page0910Component() {
        this.controls = {
            model: true,
            skeleton: true,
            action: 'Idle',
            actionxbot: 'idle',
            girl: {
                sneak_pose: 0,
                sad_pose: 0,
                agree: 0,
                headShake: 0
            },
            duration: 1,
            rotate: true,
            wireframe: false
        };
        this.controlsParams = [
            { name: "model", type: "checkbox" },
            { name: "skeleton", type: "checkbox" },
            { name: "action", type: "select", select: ['Idle', 'Run', 'TPose', 'Walk'] },
            { name: "actionxbot", type: "select", select: ['None', 'idle', 'run', 'walk'] },
            { name: "Additive Action Weights", type: "folder", control: 'girl', children: [
                    { name: "sneak_pose", type: "number", min: 0.0, max: 1, step: 0.01 },
                    { name: "sad_pose", type: "number", min: 0.0, max: 1, step: 0.01 },
                    { name: "agree", type: "number", min: 0.0, max: 1, step: 0.01 },
                    { name: "headShake", type: "number", min: 0.0, max: 1, step: 0.01 },
                ], isOpen: true },
            { name: "duration", type: "number", min: 0.2, max: 5 },
            { name: "rotate", type: "checkbox" },
            { name: "wireframe", type: "checkbox" },
        ];
        this.rotation = {
            x: 0, y: 0, z: 0
        };
    }
    Page0910Component.prototype.ngOnInit = function () {
    };
    Page0910Component.prototype.onRender = function (timer) {
        if (this.controls.rotate) {
            this.rotation.y += timer.delta * 20;
            this.rotation.x = this.rotation.z = this.rotation.y;
        }
    };
    Page0910Component = __decorate([
        core_1.Component({
            selector: 'app-page0910',
            templateUrl: './page0910.component.html',
            styleUrls: ['./page0910.component.scss']
        })
    ], Page0910Component);
    return Page0910Component;
}());
exports.Page0910Component = Page0910Component;
