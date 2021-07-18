"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.HtmlComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var CSS2DRenderer_js_1 = require("three/examples/jsm/renderers/CSS2DRenderer.js");
var CSS3DRenderer_js_1 = require("three/examples/jsm/renderers/CSS3DRenderer.js");
var interface_1 = require("../interface");
var tween_abstract_1 = require("../tween.abstract");
var HtmlComponent = /** @class */ (function (_super) {
    __extends(HtmlComponent, _super);
    function HtmlComponent(ele) {
        var _this = _super.call(this) || this;
        _this.ele = ele;
        _this.type = 'div';
        _this.childType = 'innerHTML';
        _this.src = null;
        _this.style = null;
        _this.list = null;
        _this.table = null;
        _this.tableHead = null;
        _this.tableFoot = null;
        _this.dlList = null;
        _this.parentElement = null;
        _this.cssClazzName = null;
        _this.html = null;
        _this.needUpdate = false;
        return _this;
    }
    HtmlComponent_1 = HtmlComponent;
    HtmlComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    HtmlComponent.prototype.ngOnChanges = function (changes) {
        if (changes && this.parentElement !== null) {
            this.needUpdate = true;
            this.getHtml();
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    HtmlComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.children.changes.subscribe(function () {
            _this.applyChanges3D(['children']);
        });
        _super.prototype.ngAfterContentInit.call(this);
    };
    HtmlComponent.prototype.applyChanges3D = function (changes) {
        var _this = this;
        if (this.html !== null) {
            changes.forEach(function (change) {
                switch (change) {
                    case 'children':
                        _this.children.forEach(function (child) {
                            child.setParent(_this.html);
                        });
                        break;
                    case 'tween':
                        _super.prototype.setTweenTarget.call(_this, _this.html);
                        break;
                }
            });
        }
    };
    HtmlComponent.prototype.setParent = function (refObject3d, isRestore) {
        if (isRestore === void 0) { isRestore = false; }
        if (_super.prototype.setParent.call(this, refObject3d, isRestore)) {
            var parentElement_1 = null;
            if (refObject3d instanceof CSS3DRenderer_js_1.CSS3DObject || refObject3d instanceof CSS2DRenderer_js_1.CSS2DObject) {
                parentElement_1 = refObject3d.element;
            }
            else if (refObject3d instanceof THREE.Mesh) {
                refObject3d.children.forEach(function (child) {
                    if (child instanceof CSS3DRenderer_js_1.CSS3DObject || child instanceof CSS2DRenderer_js_1.CSS2DObject) {
                        parentElement_1 = child.element;
                    }
                });
            }
            else if (refObject3d instanceof HTMLElement) {
                parentElement_1 = refObject3d;
            }
            if (this.parentElement !== parentElement_1) {
                if (this.parentElement !== null && this.html !== null && this.html.parentNode !== null) {
                    this.html.parentNode.removeChild(this.html);
                }
                this.parentElement = parentElement_1;
                if (this.parentElement !== null) {
                    this.getHtml();
                }
            }
            return true;
        }
        return false;
    };
    HtmlComponent.prototype.applyHtmlStyle = function (ele, style) {
        this.cssClazzName = interface_1.ThreeUtil.addCssStyle(ele, style, this.cssClazzName, 'html', 'inline');
    };
    HtmlComponent.prototype.getHtml = function () {
        var _this = this;
        if (this.html === null || this.needUpdate) {
            this.needUpdate = false;
            var html_1 = null;
            switch (this.type.toLowerCase()) {
                case 'ul':
                case 'ol':
                    html_1 = document.createElement(this.type);
                    if (interface_1.ThreeUtil.isNotNull(this.list) && this.list.length > 0) {
                        this.list.forEach(function (list) {
                            var li = document.createElement('li');
                            _this.applyHtmlStyle(li, list);
                            html_1.appendChild(li);
                        });
                    }
                    break;
                case 'dl':
                    html_1 = document.createElement(this.type);
                    if (interface_1.ThreeUtil.isNotNull(this.dlList) && this.dlList.length > 0) {
                        this.dlList.forEach(function (dlList) {
                            var dl = document.createElement('dl');
                            if (interface_1.ThreeUtil.isNotNull(dlList.dt)) {
                                var dt = document.createElement('dt');
                                _this.applyHtmlStyle(dt, dlList.dt);
                                dl.appendChild(dt);
                            }
                            if (interface_1.ThreeUtil.isNotNull(dlList.dd)) {
                                var dt = document.createElement('dd');
                                _this.applyHtmlStyle(dt, dlList.dd);
                                dl.appendChild(dt);
                            }
                            html_1.appendChild(dl);
                        });
                    }
                    break;
                case 'img':
                case 'iframe':
                    html_1 = document.createElement(this.type);
                    html_1.setAttribute('src', this.src);
                    break;
                case 'table':
                    html_1 = document.createElement(this.type);
                    if (interface_1.ThreeUtil.isNotNull(this.tableHead) && this.tableHead.length > 0) {
                        var tableHead = document.createElement('thead');
                        var tableHeadTr_1 = document.createElement('tr');
                        tableHead.appendChild(tableHeadTr_1);
                        this.tableHead.forEach(function (tdHtml) {
                            var td = document.createElement('td');
                            _this.applyHtmlStyle(td, tdHtml);
                            tableHeadTr_1.appendChild(td);
                        });
                        html_1.appendChild(tableHead);
                    }
                    if (interface_1.ThreeUtil.isNotNull(this.table) && this.table.length > 0) {
                        var tableBody_1 = document.createElement('tbody');
                        this.table.forEach(function (rowData) {
                            if (interface_1.ThreeUtil.isNotNull(rowData) && rowData.length > 0) {
                                var tableBodyTr_1 = document.createElement('tr');
                                rowData.forEach(function (tdHtml) {
                                    var td = document.createElement('td');
                                    _this.applyHtmlStyle(td, tdHtml);
                                    tableBodyTr_1.appendChild(td);
                                });
                                tableBody_1.appendChild(tableBodyTr_1);
                            }
                        });
                        html_1.appendChild(tableBody_1);
                    }
                    if (interface_1.ThreeUtil.isNotNull(this.tableFoot) && this.tableFoot.length > 0) {
                        var tableFoot = document.createElement('tfoot');
                        var tableFootTr_1 = document.createElement('tr');
                        tableFoot.appendChild(tableFootTr_1);
                        this.tableFoot.forEach(function (tdHtml) {
                            var td = document.createElement('td');
                            _this.applyHtmlStyle(td, tdHtml);
                            tableFootTr_1.appendChild(td);
                        });
                        html_1.appendChild(tableFoot);
                    }
                    break;
                default:
                    html_1 = document.createElement(this.type);
                    break;
            }
            if (interface_1.ThreeUtil.isNotNull(this.style)) {
                this.applyHtmlStyle(html_1, this.style);
            }
            if (html_1.tagName !== 'IMG' && html_1.tagName !== 'IFRAME' && html_1.innerHTML == '') {
                switch (this.childType.toLowerCase()) {
                    case 'innerhtml':
                        {
                            var ele = interface_1.ThreeUtil.getChildElementSave(this.ele.nativeElement);
                            html_1.innerHTML = ele.innerHTML;
                        }
                        break;
                    case 'innertext':
                        {
                            var ele = interface_1.ThreeUtil.getChildElementSave(this.ele.nativeElement);
                            html_1.innerText = ele.innerText;
                        }
                        break;
                }
            }
            if (this.html !== null && this.parentElement !== null && this.parentElement.childNodes) {
                this.parentElement.childNodes.forEach(function (ele) {
                    if (ele == _this.html) {
                        _this.parentElement.insertBefore(html_1, ele);
                        _this.parentElement.removeChild(ele);
                    }
                });
            }
            if (this.html !== null && this.html.parentNode !== null) {
                this.html.parentNode.removeChild(this.html);
            }
            this.html = html_1;
            this.applyChanges3D(['children', 'tween']);
        }
        if (this.html !== null && this.parentElement !== null) {
            if (interface_1.ThreeUtil.isNotNull(this.html.parentNode) || this.html.parentNode !== this.parentElement) {
                this.parentElement.appendChild(this.html);
            }
        }
        return this.html;
    };
    var HtmlComponent_1;
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "type");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "childType");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "src");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "style");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "list");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "table");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "tableHead");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "tableFoot");
    __decorate([
        core_1.Input()
    ], HtmlComponent.prototype, "dlList");
    __decorate([
        core_1.ContentChildren(HtmlComponent_1, { descendants: false })
    ], HtmlComponent.prototype, "children");
    HtmlComponent = HtmlComponent_1 = __decorate([
        core_1.Component({
            selector: 'ngx3js-html',
            templateUrl: './html.component.html',
            styleUrls: ['./html.component.scss']
        })
    ], HtmlComponent);
    return HtmlComponent;
}(tween_abstract_1.AbstractTweenComponent));
exports.HtmlComponent = HtmlComponent;
