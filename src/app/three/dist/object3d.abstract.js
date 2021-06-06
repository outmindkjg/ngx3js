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
exports.AbstractObject3dComponent = void 0;
var core_1 = require("@angular/core");
var THREE = require("three");
var controller_component_1 = require("./controller/controller.component");
var interface_1 = require("./interface");
var lookat_component_1 = require("./lookat/lookat.component");
var position_component_1 = require("./position/position.component");
var rotation_component_1 = require("./rotation/rotation.component");
var scale_component_1 = require("./scale/scale.component");
var tween_abstract_1 = require("./tween.abstract");
var AbstractObject3dComponent = /** @class */ (function (_super) {
    __extends(AbstractObject3dComponent, _super);
    function AbstractObject3dComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.visible = true;
        _this.name = "";
        _this.object3d = null;
        return _this;
    }
    AbstractObject3dComponent.prototype.ngOnInit = function () {
        _super.prototype.ngOnInit.call(this);
    };
    AbstractObject3dComponent.prototype.ngOnChanges = function (changes) {
        if (changes) {
            if (this.object3d) {
                if (changes.visible) {
                    this.object3d.visible = this.visible;
                }
            }
        }
        _super.prototype.ngOnChanges.call(this, changes);
    };
    AbstractObject3dComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        if (this.controller !== null && this.controller !== undefined) {
            this.controller.changes.subscribe(function (e) {
                _this.applyChanges3D(['controller']);
            });
        }
        _super.prototype.ngAfterContentInit.call(this);
    };
    AbstractObject3dComponent.prototype.ngOnDestroy = function () {
        if (this.object3d != null) {
            if (this.object3d.parent !== null) {
                this.object3d.parent.remove(this.object3d);
                this.object3d = null;
            }
        }
        _super.prototype.ngOnDestroy.call(this);
    };
    AbstractObject3dComponent.prototype.getPosition = function () {
        if (this.object3d !== null) {
            return this.object3d.position;
        }
        else if (this.position !== null && this.position.length > 0) {
            return this.position.first.getPosition();
        }
        else {
            return new THREE.Vector3(0, 0, 0);
        }
    };
    AbstractObject3dComponent.prototype.setPosition = function (x, y, z) {
        if (this.object3d !== null) {
            if (x === null) {
                x = this.object3d.position.x;
            }
            if (y === null) {
                y = this.object3d.position.y;
            }
            if (z === null) {
                z = this.object3d.position.z;
            }
            var position = interface_1.ThreeUtil.getVector3Safe(x, y, z);
            this.object3d.position.copy(position);
        }
        return this;
    };
    AbstractObject3dComponent.prototype.getScale = function () {
        if (this.object3d !== null) {
            return this.object3d.scale;
        }
        else if (this.scale !== null && this.scale.length > 0) {
            return this.scale.first.getScale();
        }
        else {
            return new THREE.Vector3(1, 1, 1);
        }
    };
    AbstractObject3dComponent.prototype.setScale = function (x, y, z) {
        if (this.object3d !== null) {
            if (x === null) {
                x = this.object3d.scale.x;
            }
            if (y === null) {
                y = this.object3d.scale.y;
            }
            if (z === null) {
                z = this.object3d.scale.z;
            }
            var scale = interface_1.ThreeUtil.getVector3Safe(x, y, z);
            this.object3d.scale.copy(scale);
        }
        return this;
    };
    AbstractObject3dComponent.prototype.getRotation = function () {
        if (this.object3d !== null) {
            return this.object3d.rotation;
        }
        else if (this.scale !== null && this.scale.length > 0) {
            return this.rotation.first.getRotation();
        }
        else {
            return new THREE.Euler(0, 0, 0);
        }
    };
    AbstractObject3dComponent.prototype.setRotation = function (x, y, z) {
        if (this.object3d !== null) {
            if (x === null) {
                x = this.object3d.rotation.x / Math.PI * 180;
            }
            if (y === null) {
                y = this.object3d.rotation.y / Math.PI * 180;
            }
            if (z === null) {
                z = this.object3d.rotation.z / Math.PI * 180;
            }
            var rotation = interface_1.ThreeUtil.getEulerSafe(x, y, z);
            this.object3d.rotation.copy(rotation);
        }
        return this;
    };
    AbstractObject3dComponent.prototype.addRotation = function (x, y, z) {
        if (this.object3d !== null) {
            x += this.object3d.rotation.x / Math.PI * 180;
            y += this.object3d.rotation.y / Math.PI * 180;
            z += this.object3d.rotation.z / Math.PI * 180;
            var rotation = interface_1.ThreeUtil.getEulerSafe(x, y, z);
            this.object3d.rotation.copy(rotation);
        }
        return this;
    };
    AbstractObject3dComponent.prototype.setLookat = function (x, y, z) {
        if (this.object3d !== null) {
            if (x === null) {
                x = this.object3d.position.x;
            }
            if (y === null) {
                y = this.object3d.position.y;
            }
            if (z === null) {
                z = this.object3d.position.z;
            }
            var position = interface_1.ThreeUtil.getVector3Safe(x, y, z);
            this.object3d.lookAt(position);
        }
        return this;
    };
    AbstractObject3dComponent.prototype.getObjectByName = function (name) {
        if (this.object3d !== null) {
            return this.object3d.getObjectByName(name);
        }
        return null;
    };
    AbstractObject3dComponent.prototype.getObjectById = function (id) {
        if (this.object3d !== null) {
            return this.object3d.getObjectById(id);
        }
        return null;
    };
    AbstractObject3dComponent.prototype.getObjectByProperty = function (name, value) {
        if (this.object3d !== null) {
            return this.object3d.getObjectByProperty(name, value);
        }
        return null;
    };
    AbstractObject3dComponent.prototype.setObject3D = function (object3d) {
        if (this.object3d !== object3d) {
            if (this.object3d !== null && this.object3d.parent !== null) {
                this.object3d.parent.remove(this.object3d);
            }
            this.object3d = object3d;
            if (this.object3d !== null) {
                this.object3d.name = this.name;
                this.object3d.visible = this.visible;
            }
            if (this.parent !== null && this.parent instanceof THREE.Object3D) {
                this.parent.add(this.object3d);
            }
        }
    };
    AbstractObject3dComponent.prototype.applyChanges3D = function (changes) {
        var _this = this;
        if (this.object3d !== null) {
            changes.forEach(function (change) {
                switch (change) {
                    case 'position':
                        _this.position.forEach(function (position) {
                            position.setParent(_this.object3d);
                        });
                        break;
                    case 'rotation':
                        _this.rotation.forEach(function (rotation) {
                            rotation.setParent(_this.object3d);
                        });
                        break;
                    case 'scale':
                        _this.scale.forEach(function (scale) {
                            scale.setParent(_this.object3d);
                        });
                        break;
                    case 'lookat':
                        _this.lookat.forEach(function (lookat) {
                            lookat.setParent(_this.object3d);
                        });
                        break;
                    case 'controller':
                        _this.controller.forEach(function (controller) {
                            controller.setParent(_this.object3d);
                        });
                        break;
                }
            });
        }
    };
    __decorate([
        core_1.Input()
    ], AbstractObject3dComponent.prototype, "visible");
    __decorate([
        core_1.Input()
    ], AbstractObject3dComponent.prototype, "name");
    __decorate([
        core_1.ContentChildren(controller_component_1.ControllerComponent, { descendants: false })
    ], AbstractObject3dComponent.prototype, "controller");
    __decorate([
        core_1.ContentChildren(position_component_1.PositionComponent, { descendants: false })
    ], AbstractObject3dComponent.prototype, "position");
    __decorate([
        core_1.ContentChildren(rotation_component_1.RotationComponent, { descendants: false })
    ], AbstractObject3dComponent.prototype, "rotation");
    __decorate([
        core_1.ContentChildren(scale_component_1.ScaleComponent, { descendants: false })
    ], AbstractObject3dComponent.prototype, "scale");
    __decorate([
        core_1.ContentChildren(lookat_component_1.LookatComponent, { descendants: false })
    ], AbstractObject3dComponent.prototype, "lookat");
    AbstractObject3dComponent = __decorate([
        core_1.Component({
            template: ''
        })
    ], AbstractObject3dComponent);
    return AbstractObject3dComponent;
}(tween_abstract_1.AbstractTweenComponent));
exports.AbstractObject3dComponent = AbstractObject3dComponent;
