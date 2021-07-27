import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AnimationGroupComponent } from './animation-group/animation-group.component';
import { AudioComponent } from './audio/audio.component';
import { BackgroundComponent } from './background/background.component';
import { CameraComponent } from './camera/camera.component';
import { CanvasComponent } from './canvas/canvas.component';
import { ChartComponent } from './chart/chart.component';
import { ClipComponent } from './clip/clip.component';
import { ComposerComponent } from './composer/composer.component';
import { ControlComponent } from './control/control.component';
import { ControllerItemComponent } from './controller/controller-item/controller-item.component';
import { ControllerComponent } from './controller/controller.component';
import { CurveComponent } from './curve/curve.component';
import { DrawingCanvasDirective } from './drawing-canvas.directive';
import { FogComponent } from './fog/fog.component';
import { GeometryBirdComponent } from './geometry/bird/bird.component';
import { GeometryComponent } from './geometry/geometry.component';
import { HelperComponent } from './helper/helper.component';
import { HtmlComponent } from './html/html.component';
import { KeyframeComponent } from './keyframe/keyframe.component';
import { LensflareelementComponent } from './lensflareelement/lensflareelement.component';
import { LightComponent } from './light/light.component';
import { ListenerComponent } from './listener/listener.component';
import { LocalStorageService } from './local-storage.service';
import { LookatComponent } from './lookat/lookat.component';
import { MaterialComponent } from './material/material.component';
import { MeshComponent } from './mesh/mesh.component';
import { MixerComponent } from './mixer/mixer.component';
import { PassComponent } from './pass/pass.component';
import { PhysicsConstraintComponent } from './physics/physics-constraint/physics-constraint.component';
import { PhysicsComponent } from './physics/physics.component';
import { PlaneComponent } from './plane/plane.component';
import { PositionComponent } from './position/position.component';
import { RenderTargetComponent } from './render-target/render-target.component';
import { RendererComponent } from './renderer/renderer.component';
import { RigidbodyNodeComponent } from './rigidbody/rigidbody-node/rigidbody-node.component';
import { RigidbodyComponent } from './rigidbody/rigidbody.component';
import { RotationComponent } from './rotation/rotation.component';
import { ScaleComponent } from './scale/scale.component';
import { SceneComponent } from './scene/scene.component';
import { ShaderComponent } from './shader/shader.component';
import { ShapeComponent } from './shape/shape.component';
import { SharedComponent } from './shared/shared.component';
import { SvgComponent } from './svg/svg.component';
import { TextureComponent } from './texture/texture.component';
import { ToolsComponent } from './tools/tools.component';
import { TransformComponent } from './transform/transform.component';
import { TranslationComponent } from './translation/translation.component';
import { TweenComponent } from './tween/tween.component';
import { ViewerComponent } from './viewer/viewer.component';
import { VisualComponent } from './visual/visual.component';

const COMMON_PIPES = [];
const COMMON_DIRECTIVES = [DrawingCanvasDirective];
const MODULE_COMPONENTS = [
  LookatComponent,
  FogComponent,
  TextureComponent,
  LensflareelementComponent,
  ShaderComponent,
  SceneComponent,
  CameraComponent,
  RendererComponent,
  GeometryComponent,
  MaterialComponent,
  MeshComponent,
  PositionComponent,
  RotationComponent,
  ScaleComponent,
  ShapeComponent,
  CurveComponent,
  SvgComponent,
  TranslationComponent,
  PassComponent,
  ComposerComponent,
  TweenComponent,
  SharedComponent,
  MixerComponent,
  ClipComponent,
  ListenerComponent,
  AudioComponent,
  PlaneComponent,
  HtmlComponent,
  CanvasComponent,
  VisualComponent,
  TransformComponent,
  BackgroundComponent,
  ControllerComponent,
  PhysicsComponent,
  RigidbodyComponent,
  ControlComponent,
  ToolsComponent,
  LightComponent,
  HelperComponent,
  ViewerComponent,
  GeometryBirdComponent,
  AnimationGroupComponent,
  ControllerItemComponent,
  KeyframeComponent,
  PhysicsConstraintComponent,
  RigidbodyNodeComponent,
  RenderTargetComponent,
  ChartComponent
];

/**
 * Ngx3Js
 *
 * @export
 * @class Ngx3JsModule
 */
@NgModule({
  declarations: [...COMMON_PIPES, ...COMMON_DIRECTIVES, ...MODULE_COMPONENTS],
  entryComponents: [...MODULE_COMPONENTS],
  imports: [BrowserModule],
  exports: [...COMMON_PIPES, ...COMMON_DIRECTIVES, ...MODULE_COMPONENTS],
  providers: [LocalStorageService],
})
export class Ngx3JsModule {}
