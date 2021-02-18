"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppRoutingModule = void 0;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var chapter01_component_1 = require("./chapter01/chapter01.component");
var page0101_component_1 = require("./chapter01/page0101/page0101.component");
var page0102_component_1 = require("./chapter01/page0102/page0102.component");
var page0103_component_1 = require("./chapter01/page0103/page0103.component");
var page0104_component_1 = require("./chapter01/page0104/page0104.component");
var page0105_component_1 = require("./chapter01/page0105/page0105.component");
var page0106_component_1 = require("./chapter01/page0106/page0106.component");
var chapter02_component_1 = require("./chapter02/chapter02.component");
var page0201_component_1 = require("./chapter02/page0201/page0201.component");
var page0202_component_1 = require("./chapter02/page0202/page0202.component");
var page0203_component_1 = require("./chapter02/page0203/page0203.component");
var page0204_component_1 = require("./chapter02/page0204/page0204.component");
var page0205_component_1 = require("./chapter02/page0205/page0205.component");
var page0206_component_1 = require("./chapter02/page0206/page0206.component");
var page0207_component_1 = require("./chapter02/page0207/page0207.component");
var page0208_component_1 = require("./chapter02/page0208/page0208.component");
var chapter03_component_1 = require("./chapter03/chapter03.component");
var page0301_component_1 = require("./chapter03/page0301/page0301.component");
var page0302_component_1 = require("./chapter03/page0302/page0302.component");
var page0303_component_1 = require("./chapter03/page0303/page0303.component");
var page0304_component_1 = require("./chapter03/page0304/page0304.component");
var page0305_component_1 = require("./chapter03/page0305/page0305.component");
var page0306_component_1 = require("./chapter03/page0306/page0306.component");
var page0307_component_1 = require("./chapter03/page0307/page0307.component");
var chapter04_component_1 = require("./chapter04/chapter04.component");
var page0401_component_1 = require("./chapter04/page0401/page0401.component");
var page0402_component_1 = require("./chapter04/page0402/page0402.component");
var page0403_component_1 = require("./chapter04/page0403/page0403.component");
var page0404_component_1 = require("./chapter04/page0404/page0404.component");
var page0405_component_1 = require("./chapter04/page0405/page0405.component");
var page0406_component_1 = require("./chapter04/page0406/page0406.component");
var page0407_component_1 = require("./chapter04/page0407/page0407.component");
var page0408_component_1 = require("./chapter04/page0408/page0408.component");
var page0409_component_1 = require("./chapter04/page0409/page0409.component");
var page0410_component_1 = require("./chapter04/page0410/page0410.component");
var chapter05_component_1 = require("./chapter05/chapter05.component");
var page0501_component_1 = require("./chapter05/page0501/page0501.component");
var page0502_component_1 = require("./chapter05/page0502/page0502.component");
var page0503_component_1 = require("./chapter05/page0503/page0503.component");
var page0504_component_1 = require("./chapter05/page0504/page0504.component");
var page0505_component_1 = require("./chapter05/page0505/page0505.component");
var page0506_component_1 = require("./chapter05/page0506/page0506.component");
var page0507_component_1 = require("./chapter05/page0507/page0507.component");
var page0508_component_1 = require("./chapter05/page0508/page0508.component");
var page0509_component_1 = require("./chapter05/page0509/page0509.component");
var page0510_component_1 = require("./chapter05/page0510/page0510.component");
var page0511_component_1 = require("./chapter05/page0511/page0511.component");
var chapter06_component_1 = require("./chapter06/chapter06.component");
var page0601_component_1 = require("./chapter06/page0601/page0601.component");
var page0602_component_1 = require("./chapter06/page0602/page0602.component");
var page0603_component_1 = require("./chapter06/page0603/page0603.component");
var page0604_component_1 = require("./chapter06/page0604/page0604.component");
var page0605_component_1 = require("./chapter06/page0605/page0605.component");
var page0606_component_1 = require("./chapter06/page0606/page0606.component");
var page0607_component_1 = require("./chapter06/page0607/page0607.component");
var page0608_component_1 = require("./chapter06/page0608/page0608.component");
var chapter07_component_1 = require("./chapter07/chapter07.component");
var page0701_component_1 = require("./chapter07/page0701/page0701.component");
var page0702_component_1 = require("./chapter07/page0702/page0702.component");
var page0703_component_1 = require("./chapter07/page0703/page0703.component");
var page0704_component_1 = require("./chapter07/page0704/page0704.component");
var page0705a_component_1 = require("./chapter07/page0705a/page0705a.component");
var page0705b_component_1 = require("./chapter07/page0705b/page0705b.component");
var page0706_component_1 = require("./chapter07/page0706/page0706.component");
var page0707_component_1 = require("./chapter07/page0707/page0707.component");
var page0708_component_1 = require("./chapter07/page0708/page0708.component");
var page0709_component_1 = require("./chapter07/page0709/page0709.component");
var page0710_component_1 = require("./chapter07/page0710/page0710.component");
var chapter08_component_1 = require("./chapter08/chapter08.component");
var page0801_component_1 = require("./chapter08/page0801/page0801.component");
var page0802_component_1 = require("./chapter08/page0802/page0802.component");
var page0803_component_1 = require("./chapter08/page0803/page0803.component");
var page0804_component_1 = require("./chapter08/page0804/page0804.component");
var page0805_component_1 = require("./chapter08/page0805/page0805.component");
var page0806_component_1 = require("./chapter08/page0806/page0806.component");
var page0807_component_1 = require("./chapter08/page0807/page0807.component");
var page0808_component_1 = require("./chapter08/page0808/page0808.component");
var page0809_component_1 = require("./chapter08/page0809/page0809.component");
var page0810_component_1 = require("./chapter08/page0810/page0810.component");
var page0811_component_1 = require("./chapter08/page0811/page0811.component");
var page0812_component_1 = require("./chapter08/page0812/page0812.component");
var page0813_component_1 = require("./chapter08/page0813/page0813.component");
var page0814_component_1 = require("./chapter08/page0814/page0814.component");
var page0815_component_1 = require("./chapter08/page0815/page0815.component");
var page0816_component_1 = require("./chapter08/page0816/page0816.component");
var page0817_component_1 = require("./chapter08/page0817/page0817.component");
var chapter09_component_1 = require("./chapter09/chapter09.component");
var page0901_component_1 = require("./chapter09/page0901/page0901.component");
var page0902_component_1 = require("./chapter09/page0902/page0902.component");
var page0903_component_1 = require("./chapter09/page0903/page0903.component");
var page0904_component_1 = require("./chapter09/page0904/page0904.component");
var page0905_component_1 = require("./chapter09/page0905/page0905.component");
var page0906_component_1 = require("./chapter09/page0906/page0906.component");
var page0907_component_1 = require("./chapter09/page0907/page0907.component");
var page0908_component_1 = require("./chapter09/page0908/page0908.component");
var page0909_component_1 = require("./chapter09/page0909/page0909.component");
var page0910_component_1 = require("./chapter09/page0910/page0910.component");
var page0911_component_1 = require("./chapter09/page0911/page0911.component");
var page0912_component_1 = require("./chapter09/page0912/page0912.component");
var page0913_component_1 = require("./chapter09/page0913/page0913.component");
var page0914_component_1 = require("./chapter09/page0914/page0914.component");
var page0915_component_1 = require("./chapter09/page0915/page0915.component");
var page0916_component_1 = require("./chapter09/page0916/page0916.component");
var chapter10_component_1 = require("./chapter10/chapter10.component");
var chapter11_component_1 = require("./chapter11/chapter11.component");
var page1101_component_1 = require("./chapter11/page1101/page1101.component");
var page1102_component_1 = require("./chapter11/page1102/page1102.component");
var page1103a_component_1 = require("./chapter11/page1103a/page1103a.component");
var page1103b_component_1 = require("./chapter11/page1103b/page1103b.component");
var page1104_component_1 = require("./chapter11/page1104/page1104.component");
var page1105_component_1 = require("./chapter11/page1105/page1105.component");
var page1106_component_1 = require("./chapter11/page1106/page1106.component");
var page1107_component_1 = require("./chapter11/page1107/page1107.component");
var chapter12_component_1 = require("./chapter12/chapter12.component");
var page1201_component_1 = require("./chapter12/page1201/page1201.component");
var page1202_component_1 = require("./chapter12/page1202/page1202.component");
var page1203_component_1 = require("./chapter12/page1203/page1203.component");
var page1204_component_1 = require("./chapter12/page1204/page1204.component");
var page1205_component_1 = require("./chapter12/page1205/page1205.component");
var page1206_component_1 = require("./chapter12/page1206/page1206.component");
var page1207_component_1 = require("./chapter12/page1207/page1207.component");
var chapter13_component_1 = require("./chapter13/chapter13.component");
var page1301_component_1 = require("./chapter13/page1301/page1301.component");
var page1302_component_1 = require("./chapter13/page1302/page1302.component");
var page1303_component_1 = require("./chapter13/page1303/page1303.component");
var page1304_component_1 = require("./chapter13/page1304/page1304.component");
var page1305_component_1 = require("./chapter13/page1305/page1305.component");
var page1306_component_1 = require("./chapter13/page1306/page1306.component");
var page1307_component_1 = require("./chapter13/page1307/page1307.component");
var examples_component_1 = require("./examples/examples.component");
var under_construction_component_1 = require("./examples/under-construction/under-construction.component");
var webgl_animation_cloth_component_1 = require("./examples/webgl-animation-cloth/webgl-animation-cloth.component");
var webgl_animation_keyframes_component_1 = require("./examples/webgl-animation-keyframes/webgl-animation-keyframes.component");
var webgl_animation_multiple_component_1 = require("./examples/webgl-animation-multiple/webgl-animation-multiple.component");
var webgl_animation_skinning_additive_blending_component_1 = require("./examples/webgl-animation-skinning-additive-blending/webgl-animation-skinning-additive-blending.component");
var webgl_animation_skinning_blending_component_1 = require("./examples/webgl-animation-skinning-blending/webgl-animation-skinning-blending.component");
var webgl_animation_skinning_morph_component_1 = require("./examples/webgl-animation-skinning-morph/webgl-animation-skinning-morph.component");
var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'ch01' },
    {
        path: 'ch01',
        component: chapter01_component_1.Chapter01Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0101_component_1.Page0101Component },
            { path: 'pg02', component: page0102_component_1.Page0102Component },
            { path: 'pg03', component: page0103_component_1.Page0103Component },
            { path: 'pg04', component: page0104_component_1.Page0104Component },
            { path: 'pg05', component: page0105_component_1.Page0105Component },
            { path: 'pg06', component: page0106_component_1.Page0106Component }
        ]
    },
    {
        path: 'ch02',
        component: chapter02_component_1.Chapter02Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0201_component_1.Page0201Component },
            { path: 'pg02', component: page0202_component_1.Page0202Component },
            { path: 'pg03', component: page0203_component_1.Page0203Component },
            { path: 'pg04', component: page0204_component_1.Page0204Component },
            { path: 'pg05', component: page0205_component_1.Page0205Component },
            { path: 'pg06', component: page0206_component_1.Page0206Component },
            { path: 'pg07', component: page0207_component_1.Page0207Component },
            { path: 'pg08', component: page0208_component_1.Page0208Component }
        ]
    },
    {
        path: 'ch03',
        component: chapter03_component_1.Chapter03Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0301_component_1.Page0301Component },
            { path: 'pg02', component: page0302_component_1.Page0302Component },
            { path: 'pg03', component: page0303_component_1.Page0303Component },
            { path: 'pg04', component: page0304_component_1.Page0304Component },
            { path: 'pg05', component: page0305_component_1.Page0305Component },
            { path: 'pg06', component: page0306_component_1.Page0306Component },
            { path: 'pg07', component: page0307_component_1.Page0307Component }
        ]
    },
    {
        path: 'ch04',
        component: chapter04_component_1.Chapter04Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0401_component_1.Page0401Component },
            { path: 'pg02', component: page0402_component_1.Page0402Component },
            { path: 'pg03', component: page0403_component_1.Page0403Component },
            { path: 'pg04', component: page0404_component_1.Page0404Component },
            { path: 'pg05', component: page0405_component_1.Page0405Component },
            { path: 'pg06', component: page0406_component_1.Page0406Component },
            { path: 'pg07', component: page0407_component_1.Page0407Component },
            { path: 'pg08', component: page0408_component_1.Page0408Component },
            { path: 'pg09', component: page0409_component_1.Page0409Component },
            { path: 'pg10', component: page0410_component_1.Page0410Component }
        ]
    },
    {
        path: 'ch05',
        component: chapter05_component_1.Chapter05Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0501_component_1.Page0501Component },
            { path: 'pg02', component: page0502_component_1.Page0502Component },
            { path: 'pg03', component: page0503_component_1.Page0503Component },
            { path: 'pg04', component: page0504_component_1.Page0504Component },
            { path: 'pg05', component: page0505_component_1.Page0505Component },
            { path: 'pg06', component: page0506_component_1.Page0506Component },
            { path: 'pg07', component: page0507_component_1.Page0507Component },
            { path: 'pg08', component: page0508_component_1.Page0508Component },
            { path: 'pg09', component: page0509_component_1.Page0509Component },
            { path: 'pg10', component: page0510_component_1.Page0510Component },
            { path: 'pg11', component: page0511_component_1.Page0511Component }
        ]
    },
    {
        path: 'ch06',
        component: chapter06_component_1.Chapter06Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0601_component_1.Page0601Component },
            { path: 'pg02', component: page0602_component_1.Page0602Component },
            { path: 'pg03', component: page0603_component_1.Page0603Component },
            { path: 'pg04', component: page0604_component_1.Page0604Component },
            { path: 'pg05', component: page0605_component_1.Page0605Component },
            { path: 'pg06', component: page0606_component_1.Page0606Component },
            { path: 'pg07', component: page0607_component_1.Page0607Component },
            { path: 'pg08', component: page0608_component_1.Page0608Component }
        ]
    },
    {
        path: 'ch07',
        component: chapter07_component_1.Chapter07Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0701_component_1.Page0701Component },
            { path: 'pg02', component: page0702_component_1.Page0702Component },
            { path: 'pg03', component: page0703_component_1.Page0703Component },
            { path: 'pg04', component: page0704_component_1.Page0704Component },
            { path: 'pg05a', component: page0705a_component_1.Page0705aComponent },
            { path: 'pg05b', component: page0705b_component_1.Page0705bComponent },
            { path: 'pg06', component: page0706_component_1.Page0706Component },
            { path: 'pg07', component: page0707_component_1.Page0707Component },
            { path: 'pg08', component: page0708_component_1.Page0708Component },
            { path: 'pg09', component: page0709_component_1.Page0709Component },
            { path: 'pg10', component: page0710_component_1.Page0710Component }
        ]
    },
    {
        path: 'ch08',
        component: chapter08_component_1.Chapter08Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0801_component_1.Page0801Component },
            { path: 'pg02', component: page0802_component_1.Page0802Component },
            { path: 'pg03', component: page0803_component_1.Page0803Component },
            { path: 'pg04', component: page0804_component_1.Page0804Component },
            { path: 'pg05', component: page0805_component_1.Page0805Component },
            { path: 'pg06', component: page0806_component_1.Page0806Component },
            { path: 'pg07', component: page0807_component_1.Page0807Component },
            { path: 'pg08', component: page0808_component_1.Page0808Component },
            { path: 'pg09', component: page0809_component_1.Page0809Component },
            { path: 'pg10', component: page0810_component_1.Page0810Component },
            { path: 'pg11', component: page0811_component_1.Page0811Component },
            { path: 'pg12', component: page0812_component_1.Page0812Component },
            { path: 'pg13', component: page0813_component_1.Page0813Component },
            { path: 'pg14', component: page0814_component_1.Page0814Component },
            { path: 'pg15', component: page0815_component_1.Page0815Component },
            { path: 'pg16', component: page0816_component_1.Page0816Component },
            { path: 'pg17', component: page0817_component_1.Page0817Component }
        ]
    },
    {
        path: 'ch09',
        component: chapter09_component_1.Chapter09Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page0901_component_1.Page0901Component },
            { path: 'pg02', component: page0902_component_1.Page0902Component },
            { path: 'pg03', component: page0903_component_1.Page0903Component },
            { path: 'pg04', component: page0904_component_1.Page0904Component },
            { path: 'pg05', component: page0905_component_1.Page0905Component },
            { path: 'pg06', component: page0906_component_1.Page0906Component },
            { path: 'pg07', component: page0907_component_1.Page0907Component },
            { path: 'pg08', component: page0908_component_1.Page0908Component },
            { path: 'pg09', component: page0909_component_1.Page0909Component },
            { path: 'pg10', component: page0910_component_1.Page0910Component },
            { path: 'pg11', component: page0911_component_1.Page0911Component },
            { path: 'pg12', component: page0912_component_1.Page0912Component },
            { path: 'pg13', component: page0913_component_1.Page0913Component },
            { path: 'pg14', component: page0914_component_1.Page0914Component },
            { path: 'pg15', component: page0915_component_1.Page0915Component },
            { path: 'pg16', component: page0916_component_1.Page0916Component }
        ]
    },
    { path: 'ch10', component: chapter10_component_1.Chapter10Component },
    {
        path: 'ch11',
        component: chapter11_component_1.Chapter11Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page1101_component_1.Page1101Component },
            { path: 'pg02', component: page1102_component_1.Page1102Component },
            { path: 'pg03a', component: page1103a_component_1.Page1103aComponent },
            { path: 'pg03b', component: page1103b_component_1.Page1103bComponent },
            { path: 'pg04', component: page1104_component_1.Page1104Component },
            { path: 'pg05', component: page1105_component_1.Page1105Component },
            { path: 'pg06', component: page1106_component_1.Page1106Component },
            { path: 'pg07', component: page1107_component_1.Page1107Component }
        ]
    },
    {
        path: 'ch12',
        component: chapter12_component_1.Chapter12Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page1201_component_1.Page1201Component },
            { path: 'pg02', component: page1202_component_1.Page1202Component },
            { path: 'pg03', component: page1203_component_1.Page1203Component },
            { path: 'pg04', component: page1204_component_1.Page1204Component },
            { path: 'pg05', component: page1205_component_1.Page1205Component },
            { path: 'pg06', component: page1206_component_1.Page1206Component },
            { path: 'pg07', component: page1207_component_1.Page1207Component }
        ]
    },
    {
        path: 'ch13',
        component: chapter13_component_1.Chapter13Component,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'pg01' },
            { path: 'pg01', component: page1301_component_1.Page1301Component },
            { path: 'pg02', component: page1302_component_1.Page1302Component },
            { path: 'pg03', component: page1303_component_1.Page1303Component },
            { path: 'pg04', component: page1304_component_1.Page1304Component },
            { path: 'pg05', component: page1305_component_1.Page1305Component },
            { path: 'pg06', component: page1306_component_1.Page1306Component },
            { path: 'pg07', component: page1307_component_1.Page1307Component }
        ]
    },
    {
        path: 'examples',
        component: examples_component_1.ExamplesComponent,
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'webgl_animation_cloth' },
            { path: 'webgl_animation_cloth', component: webgl_animation_cloth_component_1.WebglAnimationClothComponent },
            { path: 'webgl_animation_keyframes', component: webgl_animation_keyframes_component_1.WebglAnimationKeyframesComponent },
            { path: 'webgl_animation_skinning_blending', component: webgl_animation_skinning_blending_component_1.WebglAnimationSkinningBlendingComponent },
            { path: 'webgl_animation_skinning_additive_blending', component: webgl_animation_skinning_additive_blending_component_1.WebglAnimationSkinningAdditiveBlendingComponent },
            { path: 'webgl_animation_skinning_morph', component: webgl_animation_skinning_morph_component_1.WebglAnimationSkinningMorphComponent },
            { path: 'webgl_animation_multiple', component: webgl_animation_multiple_component_1.WebglAnimationMultipleComponent },
            { path: '**', component: under_construction_component_1.UnderConstructionComponent }
        ]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forRoot(routes)],
            exports: [router_1.RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
exports.AppRoutingModule = AppRoutingModule;
