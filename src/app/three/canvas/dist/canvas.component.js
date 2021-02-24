"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CanvasComponent = void 0;
var interface_1 = require("./../interface");
var core_1 = require("@angular/core");
var html_component_1 = require("../html/html.component");
var visual_component_1 = require("../visual/visual.component");
var THREE = require("three");
var transform_component_1 = require("../transform/transform.component");
var background_component_1 = require("../background/background.component");
var controller_component_1 = require("../controller/controller.component");
var CanvasComponent = /** @class */ (function () {
    function CanvasComponent() {
        this.name = null;
        this.collection = {
            html: null,
            name: null,
            component: this,
            children: []
        };
        this.canvas = null;
        this.parentNode = null;
        this.canvasSize = null;
        this.eleSize = null;
        this.cssClazzName = null;
    }
    CanvasComponent.prototype.ngOnInit = function () {
    };
    CanvasComponent.prototype.ngOnDestroy = function () {
        if (this.canvas !== null) {
            if (interface_1.ThreeUtil.isNotNull(this.canvas.parentNode)) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
            if (interface_1.ThreeUtil.isNotNull(this.cssClazzName)) {
                interface_1.ThreeUtil.removeCssStyle(this.canvas, this.cssClazzName);
                this.cssClazzName = null;
            }
            this.canvas = null;
        }
    };
    CanvasComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () {
            _this.synkObject2D(['children']);
        });
        this.html.changes.subscribe(function () {
            _this.synkObject2D(['html']);
        });
        this.transform.changes.subscribe(function () {
            _this.synkObject2D(['transform']);
        });
        this.background.changes.subscribe(function () {
            _this.synkObject2D(['background']);
        });
    };
    CanvasComponent.prototype.setSize = function (size) {
        this.canvasSize = size;
        this.eleSize = new THREE.Vector2(this.canvasSize.x, this.canvasSize.y);
        this.applyHtmlStyle();
    };
    CanvasComponent.prototype.setParentNode = function (parentNode) {
        if (this.parentNode !== parentNode) {
            this.parentNode = parentNode;
            this.getCanvas();
        }
    };
    CanvasComponent.prototype.synkObject2D = function (synkTypes) {
        var _this = this;
        if (this.canvas !== null) {
            synkTypes.forEach(function (synkType) {
                switch (synkType) {
                    case 'children':
                        if (_this.eleSize !== null) {
                            _this.children.forEach(function (child) {
                                child.setParentNode(_this.canvas, _this.eleSize, _this.collection);
                            });
                        }
                        break;
                    case 'html':
                        _this.html.forEach(function (html) {
                            html.setParent(_this.canvas);
                        });
                        break;
                    case 'transform':
                        if (_this.canvasSize !== null) {
                            _this.transform.forEach(function (transform) {
                                transform.setParentNode(_this.canvas, _this.canvasSize, _this.eleSize);
                            });
                        }
                        break;
                    case 'background':
                        _this.background.forEach(function (background) {
                            background.setParentNode(_this.canvas);
                        });
                        break;
                    case 'controller':
                        _this.controller.forEach(function (controller) {
                            controller.setCanvas(_this.collection);
                        });
                        break;
                }
            });
        }
    };
    CanvasComponent.prototype.getCollection = function () {
        return this.collection;
    };
    CanvasComponent.prototype.getStyle = function () {
        var style = {
            width: '100%',
            height: '100%'
        };
        if (this.canvasSize !== null) {
            style.width = this.canvasSize.x;
            style.height = this.canvasSize.y;
        }
        return style;
    };
    CanvasComponent.prototype.applyHtmlStyle = function () {
        if (this.canvas !== null) {
            var style = this.getStyle();
            this.cssClazzName = interface_1.ThreeUtil.addCssStyle(this.canvas, style, this.cssClazzName, 'canvas');
            this.synkObject2D(['transform', 'background', 'children']);
        }
    };
    CanvasComponent.prototype.getCanvas = function () {
        if (this.canvas === null) {
            var canvas = document.createElement("div");
            canvas.classList.add('three-canvas');
            if (this.canvas !== null && this.canvas.parentNode !== null) {
                this.canvas.parentNode.removeChild(this.canvas);
            }
            this.canvas = canvas;
            this.collection.html = this.canvas;
            this.collection.children = [];
            this.collection.component = this;
            this.collection.name = this.name;
            this.synkObject2D(['html', 'transform', 'background', 'children']);
        }
        if (this.parentNode !== null && this.canvas.parentNode !== this.parentNode) {
            this.parentNode.appendChild(this.canvas);
            this.applyHtmlStyle();
        }
        return this.canvas;
    };
    __decorate([
        core_1.Input()
    ], CanvasComponent.prototype, "name");
    __decorate([
        core_1.ContentChildren(visual_component_1.VisualComponent)
    ], CanvasComponent.prototype, "children");
    __decorate([
        core_1.ContentChildren(html_component_1.HtmlComponent)
    ], CanvasComponent.prototype, "html");
    __decorate([
        core_1.ContentChildren(transform_component_1.TransformComponent)
    ], CanvasComponent.prototype, "transform");
    __decorate([
        core_1.ContentChildren(background_component_1.BackgroundComponent)
    ], CanvasComponent.prototype, "background");
    __decorate([
        core_1.ContentChildren(controller_component_1.ControllerComponent, { descendants: true })
    ], CanvasComponent.prototype, "controller");
    CanvasComponent = __decorate([
        core_1.Component({
            selector: 'three-canvas',
            templateUrl: './canvas.component.html',
            styleUrls: ['./canvas.component.scss']
        })
    ], CanvasComponent);
    return CanvasComponent;
}());
exports.CanvasComponent = CanvasComponent;
