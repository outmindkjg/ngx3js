"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.VisualComponent = void 0;
var core_1 = require("@angular/core");
var background_component_1 = require("../background/background.component");
var html_component_1 = require("../html/html.component");
var interface_1 = require("../interface");
var transform_component_1 = require("../transform/transform.component");
var THREE = require("three");
var controller_component_1 = require("../controller/controller.component");
var VisualComponent = /** @class */ (function () {
    function VisualComponent(ele) {
        this.ele = ele;
        this.type = "div";
        this.name = null;
        this.childType = 'innerHTML';
        this.src = null;
        this.value = '';
        this.inputType = 'text';
        this.checked = 'false';
        this.radioValues = null;
        this.selectOptions = null;
        this.change = new core_1.EventEmitter();
        this.click = new core_1.EventEmitter();
        this.dblclick = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.keyup = new core_1.EventEmitter();
        this.keydown = new core_1.EventEmitter();
        this.load = new core_1.EventEmitter();
        this.select = new core_1.EventEmitter();
        this.mousedown = new core_1.EventEmitter();
        this.mouseout = new core_1.EventEmitter();
        this.mouseover = new core_1.EventEmitter();
        this.mousemove = new core_1.EventEmitter();
        this.mouseup = new core_1.EventEmitter();
        this.collection = {
            html: null,
            name: null,
            component: this,
            children: []
        };
        this.parentNode = null;
        this.parentSize = null;
        this.eleSize = null;
        this.parentCollection = null;
        this.cssClazzName = null;
        this.visual = null;
    }
    VisualComponent_1 = VisualComponent;
    VisualComponent.prototype.ngOnInit = function () {
    };
    VisualComponent.prototype.ngOnDestroy = function () {
        if (this.visual !== null) {
            if (interface_1.ThreeUtil.isNotNull(this.visual.parentNode)) {
                this.visual.parentNode.removeChild(this.visual);
            }
            if (interface_1.ThreeUtil.isNotNull(this.cssClazzName)) {
                interface_1.ThreeUtil.removeCssStyle(this.visual, this.cssClazzName);
                this.cssClazzName = null;
            }
            this.visual = null;
        }
    };
    VisualComponent.prototype.ngAfterContentInit = function () {
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
        this.controller.changes.subscribe(function () {
            _this.synkObject2D(['controller']);
        });
    };
    VisualComponent.prototype.setParentNode = function (parentNode, parentSize, parentCollection) {
        if (this.parentNode !== parentNode) {
            this.parentNode = parentNode;
        }
        if (this.parentCollection !== parentCollection) {
            if (this.parentCollection !== null) {
                var idx = this.parentCollection.children.indexOf(this.collection);
                if (idx > -1)
                    this.parentCollection.children.splice(idx, 1);
            }
            this.parentCollection = parentCollection;
        }
        if (this.parentCollection !== null && this.parentCollection.children.indexOf(this.collection) === -1) {
            this.parentCollection.children.push(this.collection);
        }
        this.parentSize = parentSize;
        this.eleSize = new THREE.Vector2(this.parentSize.x, this.parentSize.y);
        this.getVisual();
    };
    VisualComponent.prototype.synkObject2D = function (synkTypes) {
        var _this = this;
        if (this.visual !== null) {
            synkTypes.forEach(function (synkType) {
                switch (synkType) {
                    case 'children':
                        _this.children.forEach(function (child) {
                            child.setParentNode(_this.visual, _this.eleSize, _this.collection);
                        });
                        break;
                    case 'html':
                        _this.html.forEach(function (html) {
                            html.setParent(_this.visual);
                        });
                        break;
                    case 'transform':
                        if (_this.parentSize !== null) {
                            _this.transform.forEach(function (transform) {
                                transform.setParentNode(_this.visual, _this.parentSize, _this.eleSize);
                            });
                        }
                        break;
                    case 'background':
                        _this.background.forEach(function (background) {
                            background.setParentNode(_this.visual);
                        });
                        break;
                    case 'controller':
                        _this.controller.forEach(function (controller) {
                            controller.setObject2D(_this.collection);
                        });
                        break;
                }
            });
        }
    };
    VisualComponent.prototype.getCollection = function () {
        return this.collection;
    };
    VisualComponent.prototype.getStyle = function () {
        var style = {
            width: '100%',
            height: '100%'
        };
        if (this.parentSize !== null) {
            style.width = this.parentSize.x;
            style.height = this.parentSize.y;
        }
        return style;
    };
    VisualComponent.prototype.applyHtmlStyle = function () {
        var _this = this;
        if (this.visual !== null) {
            var style = this.getStyle();
            if (this.click.observers.length > 0) {
                style.click = function (e) {
                    _this.click.emit(e);
                };
            }
            if (this.change.observers.length > 0) {
                style.change = function (e) {
                    _this.change.emit(e);
                };
            }
            if (this.dblclick.observers.length > 0) {
                style.dblclick = function (e) {
                    _this.dblclick.emit(e);
                };
            }
            if (this.focus.observers.length > 0) {
                style.focus = function (e) {
                    _this.focus.emit(e);
                };
            }
            if (this.keyup.observers.length > 0) {
                style.keyup = function (e) {
                    _this.keyup.emit(e);
                };
            }
            if (this.keydown.observers.length > 0) {
                style.keydown = function (e) {
                    _this.keydown.emit(e);
                };
            }
            if (this.load.observers.length > 0) {
                style.load = function (e) {
                    _this.load.emit(e);
                };
            }
            if (this.select.observers.length > 0) {
                style.select = function (e) {
                    _this.select.emit(e);
                };
            }
            if (this.mousedown.observers.length > 0) {
                style.mousedown = function (e) {
                    _this.mousedown.emit(e);
                };
            }
            if (this.mouseout.observers.length > 0) {
                style.mouseout = function (e) {
                    _this.mouseout.emit(e);
                };
            }
            if (this.mouseover.observers.length > 0) {
                style.mouseover = function (e) {
                    _this.mouseover.emit(e);
                };
            }
            if (this.mousemove.observers.length > 0) {
                style.mousemove = function (e) {
                    _this.mousemove.emit(e);
                };
            }
            if (this.mouseup.observers.length > 0) {
                style.mouseup = function (e) {
                    _this.mouseup.emit(e);
                };
            }
            switch (this.visual.tagName) {
                case 'FORM':
                case 'INPUT':
                case 'TEXTAREA':
                case 'BUTTON':
                    style.pointerEvents = 'auto';
                    style.zIndex = 1000;
                    break;
                default:
                    if (interface_1.ThreeUtil.isNotNull('change') ||
                        interface_1.ThreeUtil.isNotNull('click') ||
                        interface_1.ThreeUtil.isNotNull('dblclick') ||
                        interface_1.ThreeUtil.isNotNull('focus') ||
                        interface_1.ThreeUtil.isNotNull('keyup') ||
                        interface_1.ThreeUtil.isNotNull('keydown') ||
                        interface_1.ThreeUtil.isNotNull('load') ||
                        interface_1.ThreeUtil.isNotNull('select') ||
                        interface_1.ThreeUtil.isNotNull('mousedown') ||
                        interface_1.ThreeUtil.isNotNull('mouseout') ||
                        interface_1.ThreeUtil.isNotNull('mouseover') ||
                        interface_1.ThreeUtil.isNotNull('mouseover') ||
                        interface_1.ThreeUtil.isNotNull('mousemove') ||
                        interface_1.ThreeUtil.isNotNull('mouseup')) {
                        style.pointerEvents = 'auto';
                    }
            }
            this.cssClazzName = interface_1.ThreeUtil.addCssStyle(this.visual, style, this.cssClazzName, 'visual');
            this.synkObject2D(['transform', 'background', 'children', 'controller']);
        }
    };
    VisualComponent.prototype.getVisual = function () {
        var _this = this;
        if (this.visual === null) {
            var visual_1 = null;
            var texthold = null;
            switch (this.type.toLowerCase()) {
                case 'img':
                case 'iframe':
                    visual_1 = document.createElement(this.type);
                    visual_1.setAttribute('src', this.src);
                    break;
                case 'input':
                    visual_1 = document.createElement(this.type);
                    visual_1.setAttribute('type', (this.inputType || 'text').toString());
                    visual_1.setAttribute('value', (this.value || '').toString());
                    break;
                case 'textarea':
                    var textarea = document.createElement('textarea');
                    textarea.name = "textarea";
                    textarea.value = (this.value || '').toString();
                    visual_1 = textarea;
                    break;
                case 'checkbox':
                    visual_1 = document.createElement('label');
                    var checkbox = document.createElement('input');
                    checkbox.setAttribute('type', 'checkbox');
                    checkbox.setAttribute('value', (this.value || '').toString());
                    checkbox.setAttribute('checked', (this.checked || 'false').toString());
                    visual_1.appendChild(checkbox);
                    texthold = document.createElement('span');
                    visual_1.appendChild(texthold);
                    break;
                case 'radio':
                    visual_1 = document.createElement('form');
                    if (interface_1.ThreeUtil.isNotNull(this.radioValues) && this.radioValues.length > 0) {
                        this.radioValues.forEach(function (radioValue) {
                            var label = document.createElement('label');
                            var radio = document.createElement('input');
                            radio.setAttribute('type', 'radio');
                            radio.setAttribute('name', 'radio');
                            radio.setAttribute('value', (radioValue.value || '').toString());
                            if (_this.value !== null && radioValue.value == _this.value) {
                                radio.setAttribute('checked', 'checked');
                            }
                            label.appendChild(radio);
                            var radiotext = document.createElement('span');
                            radiotext.innerText = (radioValue.text || '');
                            label.appendChild(radiotext);
                            visual_1.appendChild(label);
                        });
                    }
                    texthold = document.createElement('span');
                    visual_1.appendChild(texthold);
                    break;
                case 'button':
                    visual_1 = document.createElement("button");
                    break;
                case 'div':
                default:
                    visual_1 = document.createElement("div");
                    break;
            }
            if (visual_1.tagName !== 'IMG' && visual_1.tagName !== 'IFRAME') {
                switch (this.childType.toLowerCase()) {
                    case 'innerhtml':
                        {
                            var ele = interface_1.ThreeUtil.getChildElementSave(this.ele.nativeElement);
                            if (texthold !== null) {
                                texthold.innerHTML = ele.innerHTML;
                            }
                            else {
                                visual_1.innerHTML = ele.innerHTML;
                            }
                        }
                        break;
                    case 'innertext':
                        {
                            var ele = interface_1.ThreeUtil.getChildElementSave(this.ele.nativeElement);
                            if (texthold !== null) {
                                texthold.innerText = ele.innerText;
                            }
                            else {
                                visual_1.innerText = ele.innerText;
                            }
                        }
                        break;
                }
            }
            if (this.visual !== null && this.visual.parentNode !== null) {
                this.visual.parentNode.removeChild(this.visual);
            }
            this.visual = visual_1;
            this.collection.component = this;
            this.collection.html = this.visual;
            this.collection.name = this.name;
            this.collection.children = [];
            this.visual.classList.add('three-visual');
        }
        if (this.parentNode !== null && this.visual.parentNode !== this.parentNode) {
            this.parentNode.appendChild(this.visual);
            this.applyHtmlStyle();
        }
        this.synkObject2D(['html', 'transform', 'background', 'children', 'controller']);
        return this.visual;
    };
    var VisualComponent_1;
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "name");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "childType");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "src");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "value");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "inputType");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "checked");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "radioValues");
    __decorate([
        core_1.Input()
    ], VisualComponent.prototype, "selectOptions");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "change");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "click");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "dblclick");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "focus");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "keyup");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "keydown");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "load");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "select");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "mousedown");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "mouseout");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "mouseover");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "mousemove");
    __decorate([
        core_1.Output()
    ], VisualComponent.prototype, "mouseup");
    __decorate([
        core_1.ContentChildren(VisualComponent_1)
    ], VisualComponent.prototype, "children");
    __decorate([
        core_1.ContentChildren(html_component_1.HtmlComponent)
    ], VisualComponent.prototype, "html");
    __decorate([
        core_1.ContentChildren(transform_component_1.TransformComponent)
    ], VisualComponent.prototype, "transform");
    __decorate([
        core_1.ContentChildren(background_component_1.BackgroundComponent)
    ], VisualComponent.prototype, "background");
    __decorate([
        core_1.ContentChildren(controller_component_1.ControllerComponent, { descendants: false })
    ], VisualComponent.prototype, "controller");
    VisualComponent = VisualComponent_1 = __decorate([
        core_1.Component({
            selector: 'three-visual',
            templateUrl: './visual.component.html',
            styleUrls: ['./visual.component.scss']
        })
    ], VisualComponent);
    return VisualComponent;
}());
exports.VisualComponent = VisualComponent;
