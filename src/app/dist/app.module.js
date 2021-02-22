"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var app_routing_module_1 = require("./app-routing.module");
var app_component_1 = require("./app.component");
var chapter01_component_1 = require("./chapter01/chapter01.component");
var chapter02_component_1 = require("./chapter02/chapter02.component");
var chapter03_component_1 = require("./chapter03/chapter03.component");
var chapter04_component_1 = require("./chapter04/chapter04.component");
var chapter05_component_1 = require("./chapter05/chapter05.component");
var chapter06_component_1 = require("./chapter06/chapter06.component");
var chapter07_component_1 = require("./chapter07/chapter07.component");
var chapter08_component_1 = require("./chapter08/chapter08.component");
var chapter09_component_1 = require("./chapter09/chapter09.component");
var chapter10_component_1 = require("./chapter10/chapter10.component");
var chapter11_component_1 = require("./chapter11/chapter11.component");
var chapter12_component_1 = require("./chapter12/chapter12.component");
var page0101_component_1 = require("./chapter01/page0101/page0101.component");
var page0102_component_1 = require("./chapter01/page0102/page0102.component");
var page0103_component_1 = require("./chapter01/page0103/page0103.component");
var page0104_component_1 = require("./chapter01/page0104/page0104.component");
var page0105_component_1 = require("./chapter01/page0105/page0105.component");
var page0106_component_1 = require("./chapter01/page0106/page0106.component");
var page0201_component_1 = require("./chapter02/page0201/page0201.component");
var page0202_component_1 = require("./chapter02/page0202/page0202.component");
var page0203_component_1 = require("./chapter02/page0203/page0203.component");
var page0204_component_1 = require("./chapter02/page0204/page0204.component");
var page0205_component_1 = require("./chapter02/page0205/page0205.component");
var page0206_component_1 = require("./chapter02/page0206/page0206.component");
var page0207_component_1 = require("./chapter02/page0207/page0207.component");
var page0208_component_1 = require("./chapter02/page0208/page0208.component");
var page0301_component_1 = require("./chapter03/page0301/page0301.component");
var page0302_component_1 = require("./chapter03/page0302/page0302.component");
var page0303_component_1 = require("./chapter03/page0303/page0303.component");
var page0304_component_1 = require("./chapter03/page0304/page0304.component");
var page0305_component_1 = require("./chapter03/page0305/page0305.component");
var page0306_component_1 = require("./chapter03/page0306/page0306.component");
var page0307_component_1 = require("./chapter03/page0307/page0307.component");
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
var page0601_component_1 = require("./chapter06/page0601/page0601.component");
var page0602_component_1 = require("./chapter06/page0602/page0602.component");
var page0603_component_1 = require("./chapter06/page0603/page0603.component");
var page0604_component_1 = require("./chapter06/page0604/page0604.component");
var page0605_component_1 = require("./chapter06/page0605/page0605.component");
var page0606_component_1 = require("./chapter06/page0606/page0606.component");
var page0607_component_1 = require("./chapter06/page0607/page0607.component");
var page0608_component_1 = require("./chapter06/page0608/page0608.component");
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
var page1101_component_1 = require("./chapter11/page1101/page1101.component");
var page1102_component_1 = require("./chapter11/page1102/page1102.component");
var page1103a_component_1 = require("./chapter11/page1103a/page1103a.component");
var page1103b_component_1 = require("./chapter11/page1103b/page1103b.component");
var page1104_component_1 = require("./chapter11/page1104/page1104.component");
var page1105_component_1 = require("./chapter11/page1105/page1105.component");
var page1106_component_1 = require("./chapter11/page1106/page1106.component");
var page1107_component_1 = require("./chapter11/page1107/page1107.component");
var page1201_component_1 = require("./chapter12/page1201/page1201.component");
var page1202_component_1 = require("./chapter12/page1202/page1202.component");
var page1203_component_1 = require("./chapter12/page1203/page1203.component");
var page1204_component_1 = require("./chapter12/page1204/page1204.component");
var page1205_component_1 = require("./chapter12/page1205/page1205.component");
var page1206_component_1 = require("./chapter12/page1206/page1206.component");
var page1207_component_1 = require("./chapter12/page1207/page1207.component");
var scene_component_1 = require("./three/scene/scene.component");
var camera_component_1 = require("./three/camera/camera.component");
var renderer_component_1 = require("./three/renderer/renderer.component");
var geometry_component_1 = require("./three/geometry/geometry.component");
var material_component_1 = require("./three/material/material.component");
var mesh_component_1 = require("./three/mesh/mesh.component");
var position_component_1 = require("./three/position/position.component");
var rotation_component_1 = require("./three/rotation/rotation.component");
var scale_component_1 = require("./three/scale/scale.component");
var menu_component_1 = require("./menu/menu.component");
var lookat_component_1 = require("./three/lookat/lookat.component");
var fog_component_1 = require("./three/fog/fog.component");
var texture_component_1 = require("./three/texture/texture.component");
var lensflareelement_component_1 = require("./three/lensflareelement/lensflareelement.component");
var shader_component_1 = require("./three/shader/shader.component");
var shape_component_1 = require("./three/shape/shape.component");
var curve_component_1 = require("./three/curve/curve.component");
var svg_component_1 = require("./three/svg/svg.component");
var translation_component_1 = require("./three/translation/translation.component");
var pass_component_1 = require("./three/pass/pass.component");
var composer_component_1 = require("./three/composer/composer.component");
var tween_component_1 = require("./three/tween/tween.component");
var shared_component_1 = require("./three/shared/shared.component");
var mixer_component_1 = require("./three/mixer/mixer.component");
var clip_component_1 = require("./three/clip/clip.component");
var listener_component_1 = require("./three/listener/listener.component");
var audio_component_1 = require("./three/audio/audio.component");
var plane_component_1 = require("./three/plane/plane.component");
var html_component_1 = require("./three/html/html.component");
var canvas_component_1 = require("./three/canvas/canvas.component");
var visual_component_1 = require("./three/visual/visual.component");
var transform_component_1 = require("./three/transform/transform.component");
var background_component_1 = require("./three/background/background.component");
var light_component_1 = require("./three/light/light.component");
var helper_component_1 = require("./three/helper/helper.component");
var chapter13_component_1 = require("./chapter13/chapter13.component");
var page1301_component_1 = require("./chapter13/page1301/page1301.component");
var page1302_component_1 = require("./chapter13/page1302/page1302.component");
var page1303_component_1 = require("./chapter13/page1303/page1303.component");
var page1304_component_1 = require("./chapter13/page1304/page1304.component");
var page1305_component_1 = require("./chapter13/page1305/page1305.component");
var page1306_component_1 = require("./chapter13/page1306/page1306.component");
var page1307_component_1 = require("./chapter13/page1307/page1307.component");
var controller_component_1 = require("./three/controller/controller.component");
var physics_component_1 = require("./three/physics/physics.component");
var rigidbody_component_1 = require("./three/rigidbody/rigidbody.component");
var examples_component_1 = require("./examples/examples.component");
var webgl_animation_cloth_component_1 = require("./examples/webgl-animation-cloth/webgl-animation-cloth.component");
var webgl_animation_keyframes_component_1 = require("./examples/webgl-animation-keyframes/webgl-animation-keyframes.component");
var webgl_animation_skinning_blending_component_1 = require("./examples/webgl-animation-skinning-blending/webgl-animation-skinning-blending.component");
var webgl_animation_skinning_additive_blending_component_1 = require("./examples/webgl-animation-skinning-additive-blending/webgl-animation-skinning-additive-blending.component");
var under_construction_component_1 = require("./examples/under-construction/under-construction.component");
var webgl_animation_skinning_morph_component_1 = require("./examples/webgl-animation-skinning-morph/webgl-animation-skinning-morph.component");
var webgl_animation_multiple_component_1 = require("./examples/webgl-animation-multiple/webgl-animation-multiple.component");
var webgl_camera_component_1 = require("./examples/webgl-camera/webgl-camera.component");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            declarations: [
                app_component_1.AppComponent,
                chapter01_component_1.Chapter01Component,
                chapter02_component_1.Chapter02Component,
                chapter03_component_1.Chapter03Component,
                chapter04_component_1.Chapter04Component,
                chapter05_component_1.Chapter05Component,
                chapter06_component_1.Chapter06Component,
                chapter07_component_1.Chapter07Component,
                chapter08_component_1.Chapter08Component,
                chapter09_component_1.Chapter09Component,
                chapter10_component_1.Chapter10Component,
                chapter11_component_1.Chapter11Component,
                chapter12_component_1.Chapter12Component,
                page0101_component_1.Page0101Component,
                page0102_component_1.Page0102Component,
                page0103_component_1.Page0103Component,
                page0104_component_1.Page0104Component,
                page0105_component_1.Page0105Component,
                page0106_component_1.Page0106Component,
                page0201_component_1.Page0201Component,
                page0202_component_1.Page0202Component,
                page0203_component_1.Page0203Component,
                page0204_component_1.Page0204Component,
                page0205_component_1.Page0205Component,
                page0206_component_1.Page0206Component,
                page0207_component_1.Page0207Component,
                page0208_component_1.Page0208Component,
                page0301_component_1.Page0301Component,
                page0302_component_1.Page0302Component,
                page0303_component_1.Page0303Component,
                page0304_component_1.Page0304Component,
                page0305_component_1.Page0305Component,
                page0306_component_1.Page0306Component,
                page0307_component_1.Page0307Component,
                page0401_component_1.Page0401Component,
                page0402_component_1.Page0402Component,
                page0403_component_1.Page0403Component,
                page0404_component_1.Page0404Component,
                page0405_component_1.Page0405Component,
                page0406_component_1.Page0406Component,
                page0407_component_1.Page0407Component,
                page0408_component_1.Page0408Component,
                page0409_component_1.Page0409Component,
                page0410_component_1.Page0410Component,
                page0501_component_1.Page0501Component,
                page0502_component_1.Page0502Component,
                page0503_component_1.Page0503Component,
                page0504_component_1.Page0504Component,
                page0505_component_1.Page0505Component,
                page0506_component_1.Page0506Component,
                page0507_component_1.Page0507Component,
                page0508_component_1.Page0508Component,
                page0509_component_1.Page0509Component,
                page0601_component_1.Page0601Component,
                page0602_component_1.Page0602Component,
                page0603_component_1.Page0603Component,
                page0604_component_1.Page0604Component,
                page0605_component_1.Page0605Component,
                page0606_component_1.Page0606Component,
                page0607_component_1.Page0607Component,
                page0608_component_1.Page0608Component,
                scene_component_1.SceneComponent,
                camera_component_1.CameraComponent,
                renderer_component_1.RendererComponent,
                geometry_component_1.GeometryComponent,
                material_component_1.MaterialComponent,
                mesh_component_1.MeshComponent,
                position_component_1.PositionComponent,
                rotation_component_1.RotationComponent,
                scale_component_1.ScaleComponent,
                menu_component_1.MenuComponent,
                lookat_component_1.LookatComponent,
                fog_component_1.FogComponent,
                texture_component_1.TextureComponent,
                lensflareelement_component_1.LensflareelementComponent,
                shader_component_1.ShaderComponent,
                page0510_component_1.Page0510Component,
                page0511_component_1.Page0511Component,
                shape_component_1.ShapeComponent,
                curve_component_1.CurveComponent,
                svg_component_1.SvgComponent,
                translation_component_1.TranslationComponent,
                page0701_component_1.Page0701Component,
                page0702_component_1.Page0702Component,
                page0703_component_1.Page0703Component,
                page0704_component_1.Page0704Component,
                page0705a_component_1.Page0705aComponent,
                page0705b_component_1.Page0705bComponent,
                page0706_component_1.Page0706Component,
                page0707_component_1.Page0707Component,
                page0708_component_1.Page0708Component,
                page0709_component_1.Page0709Component,
                page0710_component_1.Page0710Component,
                page0801_component_1.Page0801Component,
                page0802_component_1.Page0802Component,
                page0803_component_1.Page0803Component,
                page0804_component_1.Page0804Component,
                page0805_component_1.Page0805Component,
                page0806_component_1.Page0806Component,
                page0807_component_1.Page0807Component,
                page0808_component_1.Page0808Component,
                page0809_component_1.Page0809Component,
                page0810_component_1.Page0810Component,
                page0811_component_1.Page0811Component,
                page0812_component_1.Page0812Component,
                page0813_component_1.Page0813Component,
                page0814_component_1.Page0814Component,
                page0815_component_1.Page0815Component,
                page0816_component_1.Page0816Component,
                page0817_component_1.Page0817Component,
                page1101_component_1.Page1101Component,
                page1102_component_1.Page1102Component,
                page1103a_component_1.Page1103aComponent,
                page1103b_component_1.Page1103bComponent,
                page1104_component_1.Page1104Component,
                page1105_component_1.Page1105Component,
                page1106_component_1.Page1106Component,
                page1107_component_1.Page1107Component,
                page0901_component_1.Page0901Component,
                page0902_component_1.Page0902Component,
                page0903_component_1.Page0903Component,
                page0904_component_1.Page0904Component,
                page0905_component_1.Page0905Component,
                page0906_component_1.Page0906Component,
                page0907_component_1.Page0907Component,
                page0908_component_1.Page0908Component,
                page0909_component_1.Page0909Component,
                page0910_component_1.Page0910Component,
                page0911_component_1.Page0911Component,
                page0912_component_1.Page0912Component,
                page0913_component_1.Page0913Component,
                page0914_component_1.Page0914Component,
                page0915_component_1.Page0915Component,
                page0916_component_1.Page0916Component,
                pass_component_1.PassComponent,
                composer_component_1.ComposerComponent,
                tween_component_1.TweenComponent,
                shared_component_1.SharedComponent,
                mixer_component_1.MixerComponent,
                clip_component_1.ClipComponent,
                listener_component_1.ListenerComponent,
                audio_component_1.AudioComponent,
                plane_component_1.PlaneComponent,
                page1201_component_1.Page1201Component,
                page1202_component_1.Page1202Component,
                page1203_component_1.Page1203Component,
                page1204_component_1.Page1204Component,
                page1205_component_1.Page1205Component,
                page1206_component_1.Page1206Component,
                page1207_component_1.Page1207Component,
                html_component_1.HtmlComponent,
                canvas_component_1.CanvasComponent,
                visual_component_1.VisualComponent,
                transform_component_1.TransformComponent,
                background_component_1.BackgroundComponent,
                chapter13_component_1.Chapter13Component,
                page1301_component_1.Page1301Component,
                page1302_component_1.Page1302Component,
                page1303_component_1.Page1303Component,
                page1304_component_1.Page1304Component,
                page1305_component_1.Page1305Component,
                page1306_component_1.Page1306Component,
                page1307_component_1.Page1307Component,
                controller_component_1.ControllerComponent,
                physics_component_1.PhysicsComponent,
                rigidbody_component_1.RigidbodyComponent,
                examples_component_1.ExamplesComponent,
                webgl_animation_cloth_component_1.WebglAnimationClothComponent,
                webgl_animation_keyframes_component_1.WebglAnimationKeyframesComponent,
                webgl_animation_skinning_blending_component_1.WebglAnimationSkinningBlendingComponent,
                webgl_animation_skinning_additive_blending_component_1.WebglAnimationSkinningAdditiveBlendingComponent,
                under_construction_component_1.UnderConstructionComponent,
                webgl_animation_skinning_morph_component_1.WebglAnimationSkinningMorphComponent,
                webgl_animation_multiple_component_1.WebglAnimationMultipleComponent,
                light_component_1.LightComponent,
                helper_component_1.HelperComponent,
                webgl_camera_component_1.WebglCameraComponent
            ],
            imports: [
                platform_browser_1.BrowserModule,
                app_routing_module_1.AppRoutingModule
            ],
            providers: [],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
