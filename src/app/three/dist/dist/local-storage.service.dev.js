"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

exports.__esModule = true;
exports.LocalStorageService = void 0;

var core_1 = require("@angular/core");

var THREE = require("three");

var LocalStorageService =
/** @class */
function () {
  function LocalStorageService() {
    this.objectLoader = null;
  }

  LocalStorageService.prototype.setItem = function (key, value) {
    localStorage.setItem(key, value);
  };

  LocalStorageService.prototype.getItem = function (key) {
    return localStorage.getItem(key);
  };

  LocalStorageService.prototype.setObject = function (key, mesh) {
    this.setItem(key, JSON.stringify(mesh.toJSON()));
  };

  LocalStorageService.prototype.getObjectFromKey = function (key, callBack) {
    if (this.objectLoader === null) {
      this.objectLoader = new THREE.ObjectLoader();
    }

    if (key.endsWith('.js') || key.endsWith('.json') || key.endsWith('.obj')) {
      this.objectLoader.load(key, callBack, null, function (e) {
        console.log(e);
      });
    } else {
      var json = this.getItem(key);
      var loadedGeometry = JSON.parse(json);

      if (json) {
        callBack(this.objectLoader.parse(loadedGeometry));
      } else {
        callBack(new THREE.Object3D());
      }
    }
  };

  LocalStorageService.prototype.getObject = function (key, callBack) {
    this.getObjectFromKey(key, callBack);
  };

  LocalStorageService.prototype.setScene = function (key, scene) {
    this.setItem(key, JSON.stringify(scene.toJSON()));
  };

  LocalStorageService.prototype.getScene = function (key, callBack) {
    this.getObjectFromKey(key, callBack);
  };

  LocalStorageService.prototype.removeItem = function (key) {
    localStorage.removeItem(key);
  };

  LocalStorageService.prototype.clear = function () {
    localStorage.clear();
  };

  LocalStorageService = __decorate([core_1.Injectable({
    providedIn: 'root'
  })], LocalStorageService);
  return LocalStorageService;
}();

exports.LocalStorageService = LocalStorageService;