import { QueryList } from '@angular/core';
import * as GSAP from 'gsap';
import * as THREE from 'three';
import { IUniform } from 'three';
import { CameraComponent } from './camera/camera.component';
import { CanvasComponent } from './canvas/canvas.component';
import { RendererTimer, ThreeUtil } from './interface';
import { AbstractMaterialComponent } from './material.abstract';
import { SceneComponent } from './scene/scene.component';
import { HtmlCollection, VisualComponent } from './visual/visual.component';

/**
 * Abstract three controller
 */
export abstract class AbstractThreeController {
  /**
   * Enable This Controller
   */
  protected enable: boolean = true;

  /**
   * The duration run animation in sec
   */
  protected duration: number = 3;

  /**
   * The Easing method
   */
  protected easing: string = null;

  protected template: string = null;

  /**
   * The Repeat Count
   */
  protected repeat: number = null;

  /**
   *
   */
  protected yoyo: boolean = null;

  /**
   * Overshoot  of abstract three controller
   */
  protected overshoot: number = null;

  /**
   * Amplitude  of abstract three controller
   */
  protected amplitude: number = null;

  /**
   * Period  of abstract three controller
   */
  protected period: number = null;

  /**
   * Linear ratio of abstract three controller
   */
  protected linearRatio: number = null;

  /**
   * Power  of abstract three controller
   */
  protected power: number = null;

  /**
   * Yoyo mode of abstract three controller
   */
  protected yoyoMode: boolean = null;

  /**
   * Steps  of abstract three controller
   */
  protected steps: number = null;

  /**
   * Ref object of abstract three controller
   */
  protected refObject: THREE.Object3D = null;

  /**
   * Ref object2d of abstract three controller
   */
  protected refObject2d: HtmlCollection = null;

  /**
   * Tween timer of abstract three controller
   */
  protected _tweenTimer: GSAP.TimelineLite | GSAP.TimelineMax = null;

  /**
   * Creates an instance of abstract three controller.
   *
   * @param refObject3D
   * @param refObject2D
   */
  constructor(refObject3D: THREE.Object3D, refObject2D: HtmlCollection) {
    this.setObject3d(refObject3D);
    this.setObject2d(refObject2D);
  }

  /**
   * Gets duration
   *
   * @param [def]
   * @returns duration
   */
  protected getDuration(def?: number): number {
    return ThreeUtil.getTypeSafe(this.duration, def, 3);
  }

  /**
   * Gets repeat
   *
   * @param [def]
   * @returns repeat
   */
  protected getRepeat(def?: number): number {
    return ThreeUtil.getTypeSafe(this.repeat, def, 0);
  }

  /**
   * Gets yoyo
   *
   * @param [def]
   * @returns true if yoyo
   */
  protected getYoyo(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyo, def, false);
  }

  /**
   * Gets overshoot
   *
   * @param [def]
   * @returns overshoot
   */
  private getOvershoot(def?: number): number {
    return ThreeUtil.getTypeSafe(this.overshoot, def, 1);
  }

  /**
   * Gets amplitude
   *
   * @param [def]
   * @returns amplitude
   */
  protected getAmplitude(def?: number): number {
    return ThreeUtil.getTypeSafe(this.amplitude, def, 1);
  }

  /**
   * Gets period
   *
   * @param [def]
   * @returns period
   */
  protected getPeriod(def?: number): number {
    return ThreeUtil.getTypeSafe(this.period, def, 1);
  }

  /**
   * Gets linear ratio
   *
   * @param [def]
   * @returns linear ratio
   */
  protected getLinearRatio(def?: number): number {
    return ThreeUtil.getTypeSafe(this.linearRatio, def, 1);
  }

  /**
   * Gets power
   *
   * @param [def]
   * @returns power
   */
  protected getPower(def?: number): number {
    return ThreeUtil.getTypeSafe(this.power, def, 1);
  }

  /**
   * Gets yoyo mode
   *
   * @param [def]
   * @returns true if yoyo mode
   */
  protected getYoyoMode(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyoMode, def, false);
  }

  /**
   * Gets steps
   *
   * @param [def]
   * @returns steps
   */
  protected getSteps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.steps, def, 12);
  }

  /**
   * Gets easing
   *
   * @param [def]
   * @param [isTemplate]
   * @returns easing
   */
  protected getEasing(def?: string, isTemplate?: boolean): any {
    const easing = isTemplate ? ThreeUtil.getTypeSafe(this.template, def, '') : ThreeUtil.getTypeSafe(this.easing, def, '');
    switch (easing.toLowerCase()) {
      case 'power1':
      case 'power1.easein':
        return GSAP.Power1.easeIn;
      case 'Power1.easeInOut':
        return GSAP.Power1.easeInOut;
      case 'Power1.easeOut':
        return GSAP.Power1.easeOut;
      case 'Power2':
      case 'Power2.easeIn':
        return GSAP.Power2.easeIn;
      case 'Power2.easeInOut':
        return GSAP.Power2.easeInOut;
      case 'Power2.easeOut':
        return GSAP.Power2.easeOut;
      case 'Power3':
      case 'Power3.easeIn':
        return GSAP.Power3.easeIn;
      case 'Power3.easeInOut':
        return GSAP.Power3.easeInOut;
      case 'Power3.easeOut':
        return GSAP.Power3.easeOut;
      case 'Power4':
      case 'Power4.easeIn':
        return GSAP.Power4.easeIn;
      case 'Power4.easeInOut':
        return GSAP.Power4.easeInOut;
      case 'Power4.easeOut':
        return GSAP.Power4.easeOut;
      case 'Back':
      case 'Back.easeIn':
        return GSAP.Back.easeIn.config(this.getOvershoot(1.7));
      case 'Back.easeInOut':
        return GSAP.Back.easeInOut.config(this.getOvershoot(1.7));
      case 'Back.easeOut':
        return GSAP.Back.easeOut.config(this.getOvershoot(1.7));
      case 'Elastic':
      case 'Elastic.easeIn':
        return GSAP.Elastic.easeIn.config(this.getAmplitude(1), this.getPeriod(0.3));
      case 'Elastic.easeInOut':
        return GSAP.Elastic.easeInOut.config(this.getAmplitude(1), this.getPeriod(0.3));
      case 'Elastic.easeOut':
        return GSAP.Elastic.easeOut.config(this.getAmplitude(1), this.getPeriod(0.3));
      case 'Bounce':
      case 'Bounce.easeIn':
        return GSAP.Bounce.easeIn;
      case 'Bounce.easeInOut':
        return GSAP.Bounce.easeInOut;
      case 'Bounce.easeOut':
        return GSAP.Bounce.easeOut;
      case 'Rough':
      case 'Rough.easeIn':
      case 'Rough.easeInOut':
      case 'Rough.easeOut':

      /*
        return GSAP.RoughEase.config({
          template: this.getEasing(null, true),
          strength: 1,
          points: 20,
          taper: 'none',
          randomize: true,
          clamp: false,
        });
        */
      case 'SlowMo':
      case 'SlowMo.easeIn':
      case 'SlowMo.easeInOut':
      case 'SlowMo.easeOut':
      /*
        return GSAP.SlowMo.ease.config(
          this.getLinearRatio(0.7),
          this.getPower(0.7),
          this.getYoyoMode(false)
        );
        */
      case 'Stepped':
      case 'Stepped.easeIn':
      case 'Stepped.easeInOut':
      case 'Stepped.easeOut':
        //  return GSAP.SteppedEase;
        return GSAP.SteppedEase.config(this.getSteps(12));
      case 'Circ':
      case 'Circ.easeIn':
        return GSAP.Circ.easeIn;
      case 'Circ.easeInOut':
        return GSAP.Circ.easeInOut;
      case 'Circ.easeOut':
        return GSAP.Circ.easeOut;
      case 'Expo':
      case 'Expo.easeIn':
        return GSAP.Expo.easeIn;
      case 'Expo.easeInOut':
        return GSAP.Expo.easeInOut;
      case 'Expo.easeOut':
        return GSAP.Expo.easeOut;
      case 'Sine':
      case 'Sine.easeIn':
        return GSAP.Sine.easeIn;
      case 'Sine.easeInOut':
        return GSAP.Sine.easeInOut;
      case 'Sine.easeOut':
        return GSAP.Sine.easeOut;
      case 'Custom':
      case 'Custom.easeIn':
      case 'Custom.easeInOut':
      case 'Custom.easeOut':
        return GSAP.Power0.easeNone;
      //  return GSAP.CustomEase.create();
      case 'Power0':
      case 'Power0.easeIn':
      case 'Power0.easeInOut':
      case 'Power0.easeOut':
      default:
        return GSAP.Power0.easeNone;
    }
  }

  /**
   * Renderer  of abstract three controller
   */
  _renderer: THREE.Renderer = null;

  /**
   * Scenes  of abstract three controller
   */
  _scenes: QueryList<SceneComponent> = null;

  /**
   * Cameras  of abstract three controller
   */
  _cameras: QueryList<CameraComponent> = null;

  /**
   * Canvases  of abstract three controller
   */
  _canvases: QueryList<CanvasComponent> = null;

  /**
   * Sets renderer
   * @param renderer
   * @param scenes
   * @param cameras
   * @param canvases
   */
  public setRenderer(renderer: THREE.Renderer, scenes: QueryList<SceneComponent>, cameras: QueryList<CameraComponent>, canvases: QueryList<CanvasComponent>) {
    this._renderer = renderer;
    this._scenes = scenes;
    this._cameras = cameras;
    this._canvases = canvases;
    if (this._scene === null && this._scenes !== null && this._scenes.length > 0) {
      this._scene = this._scenes.first.getScene();
    }
    if (this._camera === null && this._cameras !== null && this._cameras.length > 0) {
      this._camera = this._cameras.first.getObject3d();
    }
    if (this._canvas === null && this._canvases !== null && this._canvases.length > 0) {
      this._canvas = this._canvases.first.getCollection();
    }
  }

  /**
   * Scene  of abstract three controller
   */
  private _scene: THREE.Scene = null;

  /**
   * Camera  of abstract three controller
   */
  private _camera: THREE.Camera = null;

  /**
   * Canvas  of abstract three controller
   */
  private _canvas: HtmlCollection = null;

  /**
   * Sets scene
   *
   * @param scene
   */
  public setScene(scene: THREE.Scene) {
    this._scene = scene;
  }

  /**
   * Sets canvas
   * @param canvas
   */
  public setCanvas(canvas: HtmlCollection) {
    this._canvas = canvas;
  }

  /**
   * Sets object3d
   * @param refObject
   */
  public setObject3d(refObject: THREE.Object3D) {
    this.refObject = refObject;
  }

  /**
   * Sets object2d
   * @param refObject
   */
  public setObject2d(refObject: HtmlCollection) {
    this.refObject2d = refObject;
  }

  /**
   * Gets position
   */
  protected get position(): THREE.Vector3 {
    return this.refObject.position;
  }

  /**
   * Gets scale
   */
  protected get scale(): THREE.Vector3 {
    return this.refObject.scale;
  }

  /**
   * Gets rotation
   */
  protected get rotation(): THREE.Euler {
    return this.refObject.rotation;
  }

  /**
   * Gets material
   */
  protected get material(): THREE.Material {
    if (this.refObject instanceof THREE.Mesh) {
      if (this.refObject.material instanceof Array) {
        return this.refObject.material[0];
      } else {
        return this.refObject.material;
      }
    }
    return new THREE.Material();
  }

  /**
   * Gets materials
   */
  protected get materials(): THREE.Material[] {
    if (this.refObject instanceof THREE.Mesh) {
      if (this.refObject.material instanceof Array) {
        return this.refObject.material;
      } else {
        return [this.refObject.material];
      }
    }
    return [];
  }

  /**
   * Gets geometry
   */
  protected get geometry(): THREE.BufferGeometry {
    if (this.refObject instanceof THREE.Mesh) {
      return this.refObject.geometry;
    }
    return new THREE.BufferGeometry();
  }

  /**
   * Gets scene
   */
  protected get scene(): THREE.Scene {
    if (this._scene === null && this.refObject !== null) {
      let lastObj: THREE.Object3D = this.refObject;
      while (!(lastObj instanceof THREE.Scene) && lastObj.parent) {
        lastObj = lastObj.parent;
      }
      if (lastObj instanceof THREE.Scene) {
        this._scene = lastObj;
      }
    }
    if (this._scene !== null) {
      return this._scene;
    } else {
      return new THREE.Scene();
    }
  }

  /**
   * Gets camera
   */
  protected get camera(): THREE.Camera {
    if (this._camera === null && this._cameras !== null && this._cameras.length > 0) {
      this._camera = this._cameras.first.getObject3d();
    }
    return this._camera;
  }

  /**
   * Gets camera by name
   * @param name  The name of the object (doesn't need to be unique). Default is an empty string.
   * @returns camera by name
   */
  protected getCameraByName(name: string): THREE.Camera {
    if (this._cameras !== null) {
      const camara = this._cameras.find((camera) => {
        return camera.name == name;
      });
      if (ThreeUtil.isNotNull(camara)) {
        return camara.getObject3d();
      }
    }
    return null;
  }

  /**
   * Gets object by name
   * @param name The name of the object (doesn't need to be unique). Default is an empty string.
   * @param [fromTop]
   * @returns object by name
   */
  protected getObjectByName(name: string, fromTop: boolean = false): THREE.Object3D {
    if (fromTop) {
      return this.scene.getObjectByName(name);
    } else {
      return this.refObject.getObjectByName(name);
    }
  }

  /**
   * Gets object by property
   * @param name The name of the object (doesn't need to be unique). Default is an empty string.
   * @param value
   * @param [fromTop]
   * @returns object by property
   */
  protected getObjectByProperty(name: string, value: string, fromTop: boolean = false): THREE.Object3D {
    if (fromTop) {
      return this.scene.getObjectByProperty(name, value);
    } else {
      return this.refObject.getObjectByProperty(name, value);
    }
  }

  /**
   * Gets object by function
   * @param fn
   * @param [fromTop]
   * @param [obj3d]
   * @returns object by function
   */
  protected getObjectByFunction(fn: (arg: any) => boolean, fromTop: boolean = false, obj3d: THREE.Object3D = null): THREE.Object3D {
    if (obj3d === null) {
      obj3d = fromTop ? this.scene : this.refObject;
    }
    if (fn(obj3d)) return obj3d;
    for (let i = 0, l = obj3d.children.length; i < l; i++) {
      const child = obj3d.children[i];
      const object = this.getObjectByFunction(fn, false, child);
      if (object !== undefined) {
        return object;
      }
    }
    return undefined;
  }

  /**
   * Gets objects by function
   * @param fn
   * @param [fromTop]
   * @param [obj3d]
   * @param [result]
   * @returns objects by function
   */
  protected getObjectsByFunction(fn: (arg: any) => boolean, fromTop: boolean = false, obj3d: THREE.Object3D = null, result: THREE.Object3D[] = []): THREE.Object3D[] {
    if (obj3d === null) {
      obj3d = fromTop ? this.scene : this.refObject;
    }
    if (fn(obj3d)) result.push(obj3d);
    for (let i = 0, l = obj3d.children.length; i < l; i++) {
      const child = obj3d.children[i];
      this.getObjectsByFunction(fn, false, child, result);
    }
    return result;
  }

  /**
   * Gets component
   * @param [refObject]
   * @returns component
   */
  protected getComponent(refObject?: THREE.Object3D): any {
    const object3d = refObject || this.refObject;
    if (ThreeUtil.isNotNull(object3d) && ThreeUtil.isNotNull(object3d.userData.component)) {
      return object3d.userData.component;
    }
    return undefined;
  }

  /**
   * Gets component2 d
   * @param [refObject]
   * @returns component2 d
   */
  protected getComponent2D(refObject?: HtmlCollection): VisualComponent {
    const object2d = refObject || this.refObject2d;
    if (ThreeUtil.isNotNull(object2d) && ThreeUtil.isNotNull(object2d.component) && object2d.component instanceof VisualComponent) {
      return object2d.component;
    }
    return undefined;
  }

  /**
   * Gets html element
   * @param [refObject]
   * @returns html element
   */
  protected getHtmlElement(refObject?: HtmlCollection): HTMLElement {
    const object2d = refObject || this.refObject2d;
    if (ThreeUtil.isNotNull(object2d) && ThreeUtil.isNotNull(object2d.html) && object2d.html instanceof HTMLElement) {
      return object2d.html;
    }
    return undefined;
  }

  /**
   * Gets abstract material component
   * @param [refObject]
   * @returns abstract material component
   */
  protected getAbstractMaterialComponent(refObject?: THREE.Object3D): AbstractMaterialComponent {
    const object3d = refObject || this.refObject;
    if (ThreeUtil.isNotNull(object3d) && object3d instanceof THREE.Mesh && ThreeUtil.isNotNull(object3d.material)) {
      let materialComp: any = null;
      if (object3d.material instanceof THREE.Material && ThreeUtil.isNotNull(object3d.material.userData.component)) {
        materialComp = object3d.material.userData.component;
      } else if (object3d.material instanceof Array && object3d.material.length > 0) {
        materialComp = object3d.material[0].userData.component;
      }
      if (ThreeUtil.isNotNull(materialComp) && materialComp instanceof AbstractMaterialComponent) {
        return materialComp;
      }
    }
    return undefined;
  }

  /**
   * Gets controller
   * @template T
   * @param type
   * @param [refObject]
   * @returns controller
   */
  protected getController<T extends AbstractThreeController>(type: { new (obj: any): T }, refObject?: THREE.Object3D): T {
    const component = this.getComponent(refObject);
    if (ThreeUtil.isNotNull(component.controllerList)) {
      const controller = component.controllerList.find((controller) => {
        return controller.getController() instanceof type;
      });
      if (ThreeUtil.isNotNull(controller)) {
        return controller.getController() as T;
      }
    }
    return undefined;
  }

  /**
   * Gets controllers
   * @template T
   * @param [type]
   * @param [refObject]
   * @returns controllers
   */
  protected getControllers<T extends AbstractThreeController>(type: { new (obj: any): T } = null, refObject?: THREE.Object3D): T[] {
    const controllers: T[] = [];
    const component = this.getComponent(refObject);
    if (ThreeUtil.isNotNull(component.controllerList)) {
      const controller = component.controllerList.filter((controller) => {
        if (type === null) {
          return true;
        } else {
          return controller.getController() instanceof type;
        }
      });

      if (ThreeUtil.isNotNull(controller) && controller.length > 0) {
        controller.forEach((controller) => {
          controllers.push(controller.getController() as T);
        });
      }
    }
    return controllers;
  }

  /**
   * Sets variables
   * @param variables
   */
  public setVariables(variables: { [key: string]: any }) {
    if (variables !== null && typeof variables === 'object') {
      Object.entries(variables).forEach(([key, value]) => {
        if (this[key] !== undefined) {
          this[key] = value;
        }
      });
    }
  }

  /**
   * Awakes abstract three controller
   */
  public awake(): void {
    if (this.refObject !== null && this.refObject.visible) {
      this.onEnable();
    }
    this.reset();
    this.start();
    if (this.refObject !== null && !this.refObject.visible) {
      this.onDisable();
    }
  }

  /**
   * Gets tween timer
   */
  protected get tweenTimer(): GSAP.TimelineLite | GSAP.TimelineMax {
    if (this._tweenTimer === null) {
      this._tweenTimer = new GSAP.TimelineLite();
    }
    return this._tweenTimer;
  }

  /**
   * Determines whether enable on
   */
  public onEnable(): void {}

  /**
   * Resets abstract three controller
   */
  public reset(): void {}

  /**
   * Starts abstract three controller
   */
  public start(): void {}

  /**
   * Fixed update
   */
  public fixedUpdate(): void {}

  /**
   * Updates abstract three controller
   * @param rendererTimer
   */
  public update(rendererTimer: RendererTimer): void {}

  /**
   * Lates update
   */
  public lateUpdate(): void {}

  /**
   * Determines whether application quit on
   */
  public onApplicationQuit(): void {}

  /**
   * Determines whether disable on
   */
  public onDisable(): void {
    this.refObject.onBeforeRender;
  }

  /**
   * Determines whether destory on
   */
  public onDestory(): void {}
}

/**
 * Auto rotation controller
 */
export class AutoRotationController extends AbstractThreeController {
  /**
   * X  of auto rotation controller
   */
  protected x: number = 0;

  /**
   * Y  of auto rotation controller
   */
  protected y: number = 0;

  /**
   * Z  of auto rotation controller
   */
  protected z: number = 0;

  /**
   * Sets variables
   * @param variables
   */
  public setVariables(variables: { [key: string]: any }) {
    super.setVariables(variables);
    if (this.enable) {
      if (this.refObject !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const rotation = this.rotation.clone();
        tweenTimer.to(rotation, {
          ...ThreeUtil.getEulerSafe(this.x, this.y, this.z),
          duration: this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
          onUpdate: (e) => {
            this.rotation.copy(rotation);
          },
        });
        tweenTimer.play();
      } else if (this.refObject2d !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
        tweenTimer.to(this.refObject2d.html, {
          ...{ rotateX: target.x, rotateY: target.y, rotateZ: target.z },
          duration: this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
        });
        tweenTimer.play();
      }
    } else {
      this.tweenTimer.pause();
    }
  }
}

/**
 * Auto scale controller
 */
export class AutoScaleController extends AbstractThreeController {
  /**
   * X  of auto scale controller
   */
  protected x: number = null;

  /**
   * Y  of auto scale controller
   */
  protected y: number = null;

  /**
   * Z  of auto scale controller
   */
  protected z: number = null;

  /**
   * Sets variables
   * @param variables
   */
  public setVariables(variables: { [key: string]: any }) {
    super.setVariables(variables);
    if (this.enable) {
      if (this.refObject !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const scale = this.scale.clone();
        tweenTimer.to(scale, {
          ...ThreeUtil.getVector3Safe(this.x, this.y, this.z),
          duration: this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
          onUpdate: (e) => {
            this.scale.copy(scale);
          },
        });
        tweenTimer.play();
      } else if (this.refObject2d !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
        tweenTimer.to(this.refObject2d.html, {
          ...{ scaleX: target.x, scaleY: target.y },
          duration: this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
        });
        tweenTimer.play();
      }
    } else {
      this.tweenTimer.pause();
    }
  }
}

/**
 * Auto position controller
 */
export class AutoPositionController extends AbstractThreeController {
  /**
   * X  of auto position controller
   */
  protected x: number = null;

  /**
   * Y  of auto position controller
   */
  protected y: number = null;

  /**
   * Z  of auto position controller
   */
  protected z: number = null;

  /**
   * Sets variables
   * @param variables
   */
  public setVariables(variables: { [key: string]: any }) {
    super.setVariables(variables);
    if (this.enable) {
      if (this.refObject !== null) {
        const tweenTimer = this.tweenTimer;
        tweenTimer.clear();
        const position = this.position.clone();
        tweenTimer.to(position, {
          ...ThreeUtil.getVector3Safe(this.x, this.y, this.z),
          duration: this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
          onUpdate: (e) => {
            this.position.copy(position);
          },
        });
        tweenTimer.play();
      } else if (this.refObject2d !== null) {
        const tweenTimer = this.tweenTimer;
        tweenTimer.clear();
        const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
        tweenTimer.to(this.refObject2d.html, {
          ...{ left: target.x, top: target.y },
          duration: this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
        });
        tweenTimer.play();
      }
    } else {
      this.tweenTimer.pause();
    }
  }
}

/**
 * Auto material controller
 */
export class AutoMaterialController extends AbstractThreeController {
  /**
   * Color  of auto material controller
   */
  protected color: number | string | THREE.Color = null;

  /**
   * Opacity  of auto material controller
   */
  protected opacity: number = null;

  /**
   * Sets variables
   * @param variables
   */
  public setVariables(variables: { [key: string]: any }) {
    super.setVariables(variables);
    if (this.enable) {
      if (this.refObject !== null) {
        const material = this.material;
        if (material instanceof THREE.MeshBasicMaterial || material instanceof THREE.MeshLambertMaterial) {
          const tweenTimer = this.tweenTimer;
          tweenTimer.clear();
          const colorOpacity = {
            ...material.color.clone(),
            materialOpacity: material.opacity,
          };
          tweenTimer.to(colorOpacity, {
            ...ThreeUtil.getColorSafe(this.color),
            materialOpacity: this.opacity,
            duration: this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo(),
            onUpdate: (e) => {
              this.material['color'].setRGB(colorOpacity.r, colorOpacity.g, colorOpacity.b);
              material.opacity = colorOpacity.materialOpacity;
            },
          });
          tweenTimer.play();
        }
      } else if (this.refObject2d !== null) {
        const tweenTimer = this.tweenTimer;
        tweenTimer.clear();
        tweenTimer.to(this.refObject2d.html, {
          backgroundColor: ThreeUtil.getColorSafe(this.color).getStyle(),
          opacity: this.opacity,
          duration: this.getDuration(),
          ease: this.getEasing(),
          repeat: this.getRepeat(),
          yoyo: this.getYoyo(),
        });
        tweenTimer.play();
      }
    } else {
      this.tweenTimer.pause();
    }
  }
}

/**
 * Auto uniforms controller
 */
export class AutoUniformsController extends AbstractThreeController {
  /**
   * Key  of auto uniforms controller
   */
  protected key: string = null;

  /**
   * Value type of auto uniforms controller
   */
  protected valueType: string = 'elapsedTime';

  /**
   * Speed  of auto uniforms controller
   */
  protected speed: number = 1;

  /**
   * Sets object3d
   * @param refObject
   */
  public setObject3d(refObject: THREE.Object3D) {
    super.setObject3d(refObject);
  }

  /**
   * Sets variables
   * @param variables
   */
  public setVariables(variables: { [key: string]: any }) {
    super.setVariables(variables);
    this.uniform = null;
    if (ThreeUtil.isNotNull(this.key) && this.refObject['material']) {
      const material = this.refObject['material'];
      if (material instanceof THREE.ShaderMaterial) {
        this.uniform = material.uniforms[this.key];
      }
    }
  }

  /**
   * Uniform  of auto uniforms controller
   */
  private uniform: IUniform = null;

  /**
   * Updates auto uniforms controller
   * @param rendererTimer
   */
  public update(rendererTimer: RendererTimer): void {
    if (this.uniform !== null) {
      switch (this.valueType.toLowerCase()) {
        default:
          this.uniform.value = rendererTimer.elapsedTime * this.speed;
          break;
      }
    }
  }
}
