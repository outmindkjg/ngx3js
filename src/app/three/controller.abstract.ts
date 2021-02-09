import { QueryList } from '@angular/core';
import * as THREE from 'three';
import * as GSAP from 'gsap';
import { CameraComponent } from './camera/camera.component';
import { CanvasComponent } from './canvas/canvas.component';
import { RendererTimer, ThreeUtil } from './interface';
import { MaterialComponent } from './material/material.component';
import { AbstractObject3dComponent } from './object3d.abstract';
import { SceneComponent } from './scene/scene.component';
import { HtmlCollection, VisualComponent } from './visual/visual.component';

export abstract class AbstractThreeController {
	enable: boolean = true;
  duration : number = 3;
  easing: string = null;
  template: string = null;
  repeat: number = null;
  yoyo: boolean = null;
  overshoot: number = null;
  amplitude: number = null;
  period: number = null;
  linearRatio: number = null;
  power: number = null;
  yoyoMode: boolean = null;
  steps: number = null;

	protected refObject: THREE.Object3D = null;
	protected refObject2d: HtmlCollection = null;
	protected _tweenTimer: GSAP.TimelineLite | GSAP.TimelineMax = null;

	constructor(refObject3D: THREE.Object3D, refObject2D: HtmlCollection) {
		this.setObject3d(refObject3D);
		this.setObject2d(refObject2D);
	}

  protected getDuration(def?: number): number {
    return ThreeUtil.getTypeSafe(this.duration, def, 3);
  }
  protected getRepeat(def?: number): number {
    return ThreeUtil.getTypeSafe(this.repeat, def, 0);
  }
  protected getYoyo(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyo, def, false);
  }
  private getOvershoot(def?: number): number {
    return ThreeUtil.getTypeSafe(this.overshoot, def, 1);
  }
  private getAmplitude(def?: number): number {
    return ThreeUtil.getTypeSafe(this.amplitude, def, 1);
  }
  private getPeriod(def?: number): number {
    return ThreeUtil.getTypeSafe(this.period, def, 1);
  }
  private getLinearRatio(def?: number): number {
    return ThreeUtil.getTypeSafe(this.linearRatio, def, 1);
  }
  private getPower(def?: number): number {
    return ThreeUtil.getTypeSafe(this.power, def, 1);
  }
  private getYoyoMode(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.yoyoMode, def, false);
  }

  private getSteps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.steps, def, 12);
  }

  protected getEasing(def?: string, isTemplate?: boolean): any {
    const easing = isTemplate
      ? ThreeUtil.getTypeSafe(this.template, def, '')
      : ThreeUtil.getTypeSafe(this.easing, def, '');
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
        return GSAP.Elastic.easeIn.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
      case 'Elastic.easeInOut':
        return GSAP.Elastic.easeInOut.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
      case 'Elastic.easeOut':
        return GSAP.Elastic.easeOut.config(
          this.getAmplitude(1),
          this.getPeriod(0.3)
        );
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

	_renderer : THREE.Renderer = null;
	_scenes : QueryList<SceneComponent> = null;
	_cameras : QueryList<CameraComponent> = null;
	_canvases : QueryList<CanvasComponent> = null;

	setRenderer(renderer : THREE.Renderer, scenes : QueryList<SceneComponent>, cameras : QueryList<CameraComponent>, canvases : QueryList<CanvasComponent>) {
		this._renderer = renderer;
		this._scenes = scenes;
		this._cameras = cameras;
		this._canvases = canvases;
		if (this._scene === null && this._scenes !== null && this._scenes.length > 0) {
			this._scene = this._scenes.first.getScene();
		}
		if (this._camera === null && this._cameras !== null && this._cameras.length > 0) {
			this._camera = this._cameras.first.getCamera();
		}
		if (this._canvas === null && this._canvases !== null && this._canvases.length > 0) {
			this._canvas = this._canvases.first.getCollection();
		}
	}

	_scene : THREE.Scene = null;
	_camera : THREE.Camera = null;
	_canvas : HtmlCollection = null;
	setScene(scene : THREE.Scene) {
		this._scene = scene;
	}

	setCanvas(canvas : HtmlCollection) {
		this._canvas = canvas;
	}


	setObject3d(refObject: THREE.Object3D) {
		this.refObject = refObject;
	}

	setObject2d(refObject: HtmlCollection) {
		this.refObject2d = refObject;
	}

	get position(): THREE.Vector3 {
		return this.refObject.position;
	}

	get scale(): THREE.Vector3 {
		return this.refObject.scale;
	}

	get rotation(): THREE.Euler {
		return this.refObject.rotation;
	}

	get material(): THREE.Material {
		if (this.refObject instanceof THREE.Mesh) {
			if (this.refObject.material instanceof Array) {
				return this.refObject.material[0];
			} else {
				return this.refObject.material;
			}
		}
		return new THREE.Material();
	}

	get materials(): THREE.Material[] {
		if (this.refObject instanceof THREE.Mesh) {
			if (this.refObject.material instanceof Array) {
				return this.refObject.material;
			} else {
				return [this.refObject.material];
			}
		}
		return [];
	}

	get geometry(): THREE.BufferGeometry {
		if (this.refObject instanceof THREE.Mesh) {
			return this.refObject.geometry;
		}
		return new THREE.BufferGeometry();
	}

	get scene(): THREE.Scene {
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

	get camera(): THREE.Camera {
		if (this._camera === null && this._cameras !== null && this._cameras.length > 0) {
			this._camera = this._cameras.first.getCamera();
		}
		return this._camera;
	}

	getCameraByName(name: string): THREE.Camera {
		if (this._cameras !== null) {
			const camara = this._cameras.find((camera) => {
				return camera.name == name;
			});
			if (ThreeUtil.isNotNull(camara)) {
				return camara.getCamera();
			}
		}
		return null;
	}

	getObjectByName(name: string, fromTop: boolean = false): THREE.Object3D {
		if (fromTop) {
			return this.scene.getObjectByName(name);
		} else {
			return this.refObject.getObjectByName(name);
		}
	}

	getObjectByProperty(name: string, value: string, fromTop: boolean = false): THREE.Object3D {
		if (fromTop) {
			return this.scene.getObjectByProperty(name, value);
		} else {
			return this.refObject.getObjectByProperty(name, value);
		}
	}

	getObjectByFunction(fn: (arg: any) => boolean, fromTop: boolean = false, obj3d: THREE.Object3D = null): THREE.Object3D {
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

	getObjectsByFunction(fn: (arg: any) => boolean, fromTop: boolean = false, obj3d: THREE.Object3D = null, result : THREE.Object3D[] = []): THREE.Object3D[] {
		if (obj3d === null) {
			obj3d = fromTop ? this.scene : this.refObject;
		}
		if (fn(obj3d))
			result.push(obj3d);
		for (let i = 0, l = obj3d.children.length; i < l; i++) {
			const child = obj3d.children[i];
			this.getObjectsByFunction(fn, false, child, result);
		}
		return result;
	}

	getComponent(refObject? : THREE.Object3D): AbstractObject3dComponent {
		const object3d = refObject || this.refObject;
		if (ThreeUtil.isNotNull(object3d) &&
			ThreeUtil.isNotNull(object3d.userData.component) &&
			object3d.userData.component instanceof AbstractObject3dComponent
		) {
			return object3d.userData.component;
		}
		return undefined;
	}

	getComponent2D(refObject? : HtmlCollection): VisualComponent {
		const object2d = refObject || this.refObject2d;
		if (ThreeUtil.isNotNull(object2d) &&
			ThreeUtil.isNotNull(object2d.component) &&
			object2d.component instanceof VisualComponent
		) {
			return object2d.component;
		}
		return undefined;
	}

	getHtmlElement(refObject? : HtmlCollection): HTMLElement {
		const object2d = refObject || this.refObject2d;
		if (ThreeUtil.isNotNull(object2d) &&
			ThreeUtil.isNotNull(object2d.html) &&
			object2d.html instanceof HTMLElement
		) {
			return object2d.html;
		}
		return undefined;
	}

	getMaterialComponent(refObject? : THREE.Object3D): MaterialComponent {
		const object3d = refObject || this.refObject;
		if (ThreeUtil.isNotNull(object3d) &&
			object3d instanceof THREE.Mesh &&
			ThreeUtil.isNotNull(object3d.material)
		) {
			let materialComp : any = null;
			if (
				object3d.material instanceof THREE.Material &&
				ThreeUtil.isNotNull(object3d.material.userData.component)
			) {
				materialComp = object3d.material.userData.component;
			} else if (
				object3d.material instanceof Array &&
				object3d.material.length > 0
			){
				materialComp = object3d.material[0].userData.component;
			}
			if (ThreeUtil.isNotNull(materialComp) && materialComp instanceof MaterialComponent) {
				return materialComp;
			}
		}
		return undefined;
	}

	getController<T extends AbstractThreeController>(type : { new(obj : any ) : T}, refObject? : THREE.Object3D):T {
		const component = this.getComponent(refObject);
		if (ThreeUtil.isNotNull(component.controller)) {
			const controller = component.controller.find(controller => {
				return controller.getController() instanceof type;
			})
			if (ThreeUtil.isNotNull(controller)) {
				return controller.getController() as T;
			}
		}
		return undefined;
	}

	getControllers<T extends AbstractThreeController>(type : { new(obj : any ) : T} = null, refObject? : THREE.Object3D):T[] {
		const controllers : T[] = [];
		const component = this.getComponent(refObject);
		if (ThreeUtil.isNotNull(component.controller)) {
			const controller = component.controller.filter(controller => {
				if (type == null) {
					return true;
				} else {
					return controller.getController() instanceof type;
				}
			})

			if (ThreeUtil.isNotNull(controller) && controller.length > 0) {
				controller.forEach(controller => {
					controllers.push(controller.getController() as T);
				})
			}
		}
		return controllers;
	}

	setVariables(variables: { [key: string]: any }) {
		if (variables !== null && typeof (variables) === 'object') {
			Object.entries(variables).forEach(([key, value]) => {
				if (this[key] !== undefined) {
					this[key] = value;
				}
			});
		}
	}

	awake(): void {
		console.log(this.getComponent2D());
		if (this.refObject !== null && this.refObject.visible) {
			this.onEnable();
		}
		this.reset();
		this.start();
		if (this.refObject !== null && !this.refObject.visible) {
			this.onDisable();
		}
	}

  get tweenTimer():GSAP.TimelineLite | GSAP.TimelineMax {
    if (this._tweenTimer === null) {
      this._tweenTimer = new GSAP.TimelineLite();
    }
    return this._tweenTimer;
  }
	onEnable(): void { }

	reset(): void { }

	start(): void { }

	fixedUpdate(): void { }

	update(rendererTimer: RendererTimer): void {}

	lateUpdate(): void { }

	onApplicationQuit(): void { }

	onDisable(): void {
		this.refObject.onBeforeRender
	}

	onDestory(): void { }
}

export class AutoRotationController extends AbstractThreeController {
	x: number = 0;
	y: number = 0;
	z: number = 0;

	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
      if (this.refObject !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const rotation = this.rotation.clone();
        tweenTimer.to(rotation,{
            ...ThreeUtil.getEulerSafe(this.x, this.y, this.z),
            duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo(),
            onUpdate : (e) => {
              this.rotation.copy(rotation);
            }
        });
        tweenTimer.play();
      } else if (this.refObject2d !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
        tweenTimer.to(this.refObject2d.html,{
            ...{ rotateX : target.x, rotateY : target.y, rotateZ : target.z },
            duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo()
        });
        tweenTimer.play();
      }
		} else {
      this.tweenTimer.pause();
		}
	}

}

export class AutoScaleController extends AbstractThreeController {
	x: number = null;
	y: number = null;
	z: number = null;

	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
      if (this.refObject !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const scale = this.scale.clone();
        tweenTimer.to(scale,{
            ...ThreeUtil.getVector3Safe(this.x, this.y, this.z),
            duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo(),
            onUpdate : (e) => {
              this.scale.copy(scale);
            }
        });
        tweenTimer.play();
      } else if (this.refObject2d !== null) {
        const tweenTimer = this.tweenTimer;
        if (tweenTimer !== null) {
          tweenTimer.clear();
        }
        const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
        tweenTimer.to(this.refObject2d.html,{
            ...{ scaleX : target.x, scaleY : target.y },
            duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo()
        });
        tweenTimer.play();
      }
		} else {
      this.tweenTimer.pause();
		}
	}

}

export class AutoPositionController extends AbstractThreeController {
	x: number = null;
	y: number = null;
	z: number = null;

	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
      if (this.refObject !== null) {
        const tweenTimer = this.tweenTimer;
        tweenTimer.clear();
        const position = this.position.clone();
        tweenTimer.to(position,{
            ...ThreeUtil.getVector3Safe(this.x, this.y, this.z),
            duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo(),
            onUpdate : (e) => {
              this.position.copy(position);
            }
        });
        tweenTimer.play();
      } else if (this.refObject2d !== null) {
        const tweenTimer = this.tweenTimer;
        tweenTimer.clear();
        const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
        tweenTimer.to(this.refObject2d.html,{
            ...{ translateX : target.x, translateY : target.y,translateZ : target.z },
            duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo()
        });
        tweenTimer.play();
      }
		} else {
      this.tweenTimer.pause();
		}
  }

}

export class AutoMaterialController extends AbstractThreeController {
	color: number | string | THREE.Color = null;
	opacity: number = null;
	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
      if (this.refObject !== null) {
        const material = this.material;
        if (
          material instanceof THREE.MeshBasicMaterial ||
          material instanceof THREE.MeshLambertMaterial
        ) {
          const tweenTimer = this.tweenTimer;
          tweenTimer.clear();
          const colorOpacity = {
            materialColor : material.color.clone(),
            materialOpacity : material.opacity
          }
          tweenTimer.to(colorOpacity,{
              materialColor : ThreeUtil.getColorSafe(this.color),
              materialOpacity : this.opacity,
              duration : this.getDuration(),
              ease: this.getEasing(),
              repeat: this.getRepeat(),
              yoyo: this.getYoyo(),
              onUpdate : (e) => {
                // material.color.setRGB(colorOpacity.materialColor.r,colorOpacity.materialColor.g,colorOpacity.materialColor.b);
                material.opacity = colorOpacity.materialOpacity;
              }
          });
          tweenTimer.play();
        }
      } else if (this.refObject2d !== null) {
        /*
        const tweenTimer = this.tweenTimer;
        tweenTimer.clear();
        const target = ThreeUtil.getVector3Safe(this.x, this.y, this.z);
        tweenTimer.to(this.refObject2d.html,{
            ...{ translateX : target.x, translateY : target.y,translateZ : target.z },
            duration : this.getDuration(),
            ease: this.getEasing(),
            repeat: this.getRepeat(),
            yoyo: this.getYoyo()
        });
        tweenTimer.play();
        */
      }
		} else {
      this.tweenTimer.pause();
		}
	}
}

