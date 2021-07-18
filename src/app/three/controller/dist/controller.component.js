"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ControllerComponent = void 0;
var core_1 = require("@angular/core");
var ControllerComponent = /** @class */ (function () {
    function ControllerComponent() {
        this.controller = null;
        this.params = null;
        this._controller = null;
        this.parent = null;
        this.refObject2d = null;
        this._renderer = null;
        this._scenes = null;
        this._cameras = null;
        this._canvas2ds = null;
        this._scene = null;
        this._canvas = null;
        this.logSeqn = 0;
    }
    ControllerComponent.prototype.ngOnInit = function () {
    };
    ControllerComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            if (changes.controller) {
                this.resetController();
            }
            else if (changes.params && this._controller !== null) {
                this._controller.setVariables(this.params);
            }
        }
    };
    ControllerComponent.prototype.setParent = function (parent) {
        if (this.parent !== parent) {
            this.parent = parent;
            this.resetController();
        }
    };
    ControllerComponent.prototype.setObject2D = function (refObject2d) {
        if (this.refObject2d !== refObject2d) {
            this.refObject2d = refObject2d;
            this.resetController();
        }
    };
    ControllerComponent.prototype.setRenderer = function (renderer, scenes, cameras, canvas2ds) {
        this._renderer = renderer;
        this._scenes = scenes;
        this._cameras = cameras;
        this._canvas2ds = canvas2ds;
        this.resetRenderer();
    };
    ControllerComponent.prototype.setScene = function (scene) {
        this._scene = scene;
        this.resetRenderer();
    };
    ControllerComponent.prototype.setCanvas = function (canvas) {
        this._canvas = canvas;
        this.resetRenderer();
    };
    ControllerComponent.prototype.resetRenderer = function () {
        if (this._controller !== null && this._renderer !== null) {
            this._controller.setRenderer(this._renderer, this._scenes, this._cameras, this._canvas2ds);
            if (this._scene !== null) {
                this._controller.setScene(this._scene);
            }
            if (this._canvas !== null) {
                this._controller.setCanvas(this._canvas);
            }
        }
    };
    ControllerComponent.prototype.resetController = function () {
        this._controller = null;
        this.getController();
    };
    ControllerComponent.prototype.getController = function () {
        if ((this.parent !== null || this.refObject2d) && this._controller === null) {
            this._controller = new this.controller(this.parent, this.refObject2d);
            this.resetRenderer();
            this._controller.setVariables(this.params);
            this._controller.awake();
        }
        return this._controller;
    };
    ControllerComponent.prototype.update = function (rendererTimer) {
        if (this._controller !== null) {
            this._controller.update(rendererTimer);
        }
        else {
            this.logSeqn++;
            if (this.logSeqn % 300 === 0) {
                console.log(rendererTimer);
            }
        }
    };
    __decorate([
        core_1.Input()
    ], ControllerComponent.prototype, "controller");
    __decorate([
        core_1.Input()
    ], ControllerComponent.prototype, "params");
    ControllerComponent = __decorate([
        core_1.Component({
            selector: 'ngx3js-controller',
            templateUrl: './controller.component.html',
            styleUrls: ['./controller.component.scss']
        })
    ], ControllerComponent);
    return ControllerComponent;
}());
exports.ControllerComponent = ControllerComponent;
