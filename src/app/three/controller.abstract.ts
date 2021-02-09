import { QueryList } from '@angular/core';
import * as THREE from 'three';
import { CameraComponent } from './camera/camera.component';
import { CanvasComponent } from './canvas/canvas.component';
import { RendererTimer, ThreeUtil } from './interface';
import { MaterialComponent } from './material/material.component';
import { AbstractObject3dComponent } from './object3d.abstract';
import { SceneComponent } from './scene/scene.component';
import { HtmlCollection, VisualComponent } from './visual/visual.component';

export abstract class AbstractThreeController {
	protected refObject: THREE.Object3D = null;
	protected refObject2d: HtmlCollection = null;

	constructor(refObject3D: THREE.Object3D, refObject2D: HtmlCollection) {
		this.setObject3d(refObject3D);
		this.setObject2d(refObject2D);
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
	enable: boolean = true;
	x: number = 0;
	y: number = 0;
	z: number = 0;

	private _rotation : THREE.Vector3 = null;

	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			this._rotation = ThreeUtil.getVector3Safe(
				ThreeUtil.getAngleSafe(this.x, 0), 
				ThreeUtil.getAngleSafe(this.y, 0), 
				ThreeUtil.getAngleSafe(this.z, 0) 
			);
		} else {
			this._rotation = null;
		}
	}

	update(rendererTimer: RendererTimer): void {
		if (this._rotation !== null) {
			if (this.refObject !== null) {
				if (this._rotation.x !== 0) {
					this.refObject.rotateX(this._rotation.x * rendererTimer.delta);
				}
				if (this._rotation.y !== 0) {
					this.refObject.rotateY(this._rotation.y * rendererTimer.delta);
				}
				if (this._rotation.z !== 0) {
					this.refObject.rotateZ(this._rotation.z * rendererTimer.delta);
				}
			}
		}
		super.update(rendererTimer);
	}

}

export class AutoScaleController extends AbstractThreeController {
	enable: boolean = true;
	x: number = null;
	y: number = null;
	z: number = null;

	private _scale : THREE.Vector3 = null;

	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			this._scale = ThreeUtil.getVector3Safe(
				this.x,
				this.y,
				this.z
			, new THREE.Vector3(0,0,0));
		} else {
			this._scale = null;
		}
	}

	update(rendererTimer: RendererTimer): void {
		if (this._scale !== null) {
			if (this.refObject !== null) {
				this.refObject.scale.add(this._scale.clone().multiplyScalar(rendererTimer.delta));
			}
		}
		super.update(rendererTimer);
	}

}

export class AutoPositionController extends AbstractThreeController {
	enable: boolean = true;
	x: number = null;
	y: number = null;
	z: number = null;

	private _position : THREE.Vector3 = null;

	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			this._position = ThreeUtil.getVector3Safe(
				this.x,
				this.y,
				this.z
			, new THREE.Vector3(0,0,0));
		} else {
			this._position = null;
		}
	}

	update(rendererTimer: RendererTimer): void {
		if (this._position !== null) {
			if (this.refObject !== null) {
				this.refObject.position.add(this._position.clone().multiplyScalar(rendererTimer.delta));
			}
		}
		super.update(rendererTimer);
	}

}

export class AutoMaterialController extends AbstractThreeController {
	enable: boolean = true;
	color: number | string | THREE.Color = null;
	opacity: number = null;
	duration : number = 10;
	private _color : THREE.Color = null;
	private _colorLerp : number = 0; 
	setVariables(variables: { [key: string]: any }) {
		super.setVariables(variables);
		if (this.enable) {
			this._color = ThreeUtil.getColorSafe(
				this.color
			);
			this._colorLerp = 0;
		} else {
			this._color = null;
		}
	}

	update(rendererTimer: RendererTimer): void {
		if (this.enable && this._colorLerp <= 1) {
			if (this.refObject !== null) {
				const material = this.material;
				if (this._color !== null) {
					if (
						this.material instanceof THREE.MeshBasicMaterial ||
						this.material instanceof THREE.MeshLambertMaterial
					) {
						this.material.color.lerp(this._color, this._colorLerp);
					}
				}
				if (ThreeUtil.isNotNull(this.opacity)) {
					material.opacity = THREE.MathUtils.lerp(material.opacity, this.opacity, this._colorLerp);
				}
			}
			this._colorLerp += rendererTimer.delta / this.duration;
		}
		super.update(rendererTimer);
	}

}

