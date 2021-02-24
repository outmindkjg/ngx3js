"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ExamplesComponent = void 0;
var core_1 = require("@angular/core");
var ExamplesComponent = /** @class */ (function () {
    function ExamplesComponent() {
        this.menuList = [
            { url: 'pg01', name: 'Side Menu' },
            { url: 'pg02', name: 'test2' },
            { url: 'pg03', name: 'test3' },
            { url: 'pg04', name: 'test4' },
            { url: 'pg05', name: 'test5' },
            { url: 'pg06', name: 'test6' },
            { url: 'pg07', name: 'test7' }
        ];
    }
    ExamplesComponent.prototype.ngOnInit = function () {
    };
    ExamplesComponent = __decorate([
        core_1.Component({
            selector: 'app-examples',
            templateUrl: './examples.component.html',
            styleUrls: ['./examples.component.scss']
        })
    ], ExamplesComponent);
    return ExamplesComponent;
}());
exports.ExamplesComponent = ExamplesComponent;
