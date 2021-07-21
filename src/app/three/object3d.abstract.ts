import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { ControllerComponent } from './controller/controller.component';
import { TagAttributes, ThreeUtil } from './interface';
import { LookatComponent } from './lookat/lookat.component';
import { AbstractMaterialComponent, MeshMaterialRaw } from './material.abstract';
import { PositionComponent } from './position/position.component';
import { RotationComponent } from './rotation/rotation.component';
import { ScaleComponent } from './scale/scale.component';
import { AbstractTweenComponent } from './tween.abstract';
import { RigidbodyComponent } from './rigidbody/rigidbody.component';
import { MixerComponent } from './mixer/mixer.component';
import { AnimationGroupComponent } from './animation-group/animation-group.component';

@Component({
  template: ''
})
export abstract class AbstractObject3dComponent extends AbstractTweenComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
 
  /**
   * Object gets rendered if *true*. Default is *true*.
   */
  @Input() public visible: boolean = true;
 
  /**
   * Optional name of the object (doesn't need to be unique). Default is an empty string.
   */
  @Input() public name: string = '';
 
  /**
   * When this is set, it calculates the matrix of position, (rotation or quaternion) and
   * scale every frame and also recalculates the matrixWorld property. Default is [page:Object3D.DefaultMatrixAutoUpdate] (true).
   */
  @Input() protected matrixAutoUpdate: boolean = null;
 
  /**
   * The layer membership of the object. The object is only visible if it has at least one
   * layer in common with the [page:Camera] in use. This property can also be used to filter out
   * unwanted objects in ray-intersection tests when using [page:Raycaster].
   */
  @Input() private layers: number[] = null;
 
  /**
   * Whether the object gets rendered into shadow map. Default is *false*.
   */
  @Input() protected castShadow: boolean = null;
 
  /**
   * Whether the material receives shadows. Default is *false*.
   */
  @Input() protected receiveShadow: boolean = null;
 
  /**
   * When this is set, it checks every frame if the object is in the frustum of the camera before rendering the object. If set to `false` the object gets rendered every frame even if it is not in the frustum of the camera. Default is `true`.
   */
  @Input() protected frustumCulled: boolean = null;
 
  /**
   * This value allows the default rendering order of [link:https://en.wikipedia.org/wiki/Scene_graph scene graph]
   * objects to be overridden although opaque and transparent objects remain sorted independently. When this property
   * is set for an instance of [page:Group Group], all descendants objects will be sorted and rendered together.
   * Sorting is from lowest to highest renderOrder. Default value is *0*.
   * 
   */
  @Input() private renderOrder: number = null;
 
  /**
   * 
   */
  @Input() private controller: ControllerComponent = null;
 
  /**
   * A [page:Vector3] representing the object's local position. Default is (0, 0, 0).
   */
  @Input() private position: THREE.Vector3 | number[] | PositionComponent | any = null;
 
  /**
   * Object's local rotation (see [link:https://en.wikipedia.org/wiki/Euler_angles Euler angles]), in radians.
   */
  @Input() private rotation: THREE.Vector3 | number[] | RotationComponent | any = null;
 
  /**
   * The object's local scale. Default is [page:Vector3]( 1, 1, 1 ).
   */
  @Input() private scale: THREE.Vector3 | number[] | ScaleComponent | any = null;
 
  /**
   * vector - A vector representing a position in world space.<br /><br />
   * Optionally, the [page:.x x], [page:.y y] and [page:.z z] components of the world space position.<br /><br />
   * Rotates the object to face a point in world space.<br /><br />
   * This method does not support objects having non-uniformly-scaled parent(s).
   */
  @Input() private lookat: THREE.Vector3 | number[] | LookatComponent | any = null;
 
  /**
   * 
   */
  @Input() private loDistance: number = null;
 
  /**
   * Custom depth material to be used when rendering to the depth map. Can only be used in context of meshes.
   * When shadow-casting with a [page:DirectionalLight] or [page:SpotLight], if you are (a) modifying vertex positions in the vertex shader,
   * (b) using a displacement map, (c) using an alpha map with alphaTest, or (d) using a transparent texture with alphaTest,
   * you must specify a customDepthMaterial for proper shadows. Default is *undefined*.
   * 
   */
  @Input() private customDepth: AbstractMaterialComponent | THREE.Material | any = null;
 
  /**
   * Same as [page:.customDepthMaterial customDepthMaterial], but used with [page:PointLight]. Default is *undefined*.
   */
  @Input() private customDistance: AbstractMaterialComponent | THREE.Material | any  = null;
 
  /**
   * 
   */
  @Input() private animationGroup: AnimationGroupComponent | THREE.AnimationObjectGroup  = null;

  /**
   * 
   */
  @ContentChildren(ControllerComponent, { descendants: false }) public controllerList: QueryList<ControllerComponent>;
 
  /**
   * 
   */
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;
 
  /**
   * 
   */
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
 
  /**
   * 
   */
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
 
  /**
   * 
   */
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;
 
  /**
   * 
   */
  @ContentChildren(AbstractMaterialComponent, { descendants: false }) protected materialList: QueryList<AbstractMaterialComponent>;
 
  /**
   * 
   */
  @ContentChildren(AbstractObject3dComponent, { descendants: false }) protected object3dList: QueryList<AbstractObject3dComponent>;
 
  /**
   * 
   */
  @ContentChildren(RigidbodyComponent, { descendants: false }) private rigidbodyList: QueryList<RigidbodyComponent>;
 
  /**
   * 
   */
  @ContentChildren(MixerComponent, { descendants: false }) private mixerList: QueryList<MixerComponent>;

 
  /**
   * 
   */
  protected OBJECT3D_ATTR : string[] = ['name','position','rotation','scale','layers','visible','castshadow','receiveshadow','frustumculled','renderorder','customdepthmaterial','customdistancematerial','material','helper','lodistance','helper','mixer','animationgroup'];

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private getLoDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.loDistance, def);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  protected getVisible(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.visible, def);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  protected getName(def?: string): string {
    return ThreeUtil.getTypeSafe(this.name, def);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  constructor() {
    super();
    this.OBJECT3D_ATTR.push(...this.OBJECT_ATTR);
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   * 
   * @param subscribeType
   */
  ngOnInit(subscribeType?: string): void {
    super.ngOnInit(subscribeType || 'object3d');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.object3d != null) {
      if (this.object3d.parent !== null) {
        this.removeObject3d(this.object3d);
        this.object3d.parent = null;
        this.object3d = null;
      }
    }
    if (this._addedReferChild !== null && this._addedReferChild.length > 0) {
      this._addedReferChild.forEach(child => {
        this.removeObject3d(child);
      });
      this._addedReferChild = [];
    }
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   * 
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.object3d !== null) {
      if (changes.visible) {
        if (ThreeUtil.isNotNull(this.visible)) {
          this.object3d.visible = this.getVisible(true);
        }
        delete changes.visible;
      }
      if (changes.name) {
        if (ThreeUtil.isNotNull(this.name)) {
          this.object3d.name = this.getName('no-name');
        }
        delete changes.name;
      }
      if (changes.visible) {
        if (ThreeUtil.isNotNull(this.visible)) {
          this.object3d.visible = this.visible;
        }
        delete changes.visible;
      }
      if (changes.frustumCulled) {
        if (ThreeUtil.isNotNull(this.frustumCulled)) {
          this.object3d.frustumCulled = this.frustumCulled;
        }
        delete changes.frustumCulled;
      }
      if (changes.castShadow) {
        if (ThreeUtil.isNotNull(this.castShadow)) {
          this.object3d.castShadow = this.castShadow;
        }
        delete changes.castShadow;
      }
      if (changes.receiveShadow) {
        if (ThreeUtil.isNotNull(this.receiveShadow)) {
          this.object3d.receiveShadow = this.receiveShadow;
        }
        delete changes.receiveShadow;
      }
      if (changes.renderOrder) {
        if (ThreeUtil.isNotNull(this.renderOrder)) {
          this.object3d.renderOrder = this.renderOrder;
        }
        delete changes.renderOrder;
      }
      if (changes.matrixAutoUpdate) {
        if (ThreeUtil.isNotNull(this.matrixAutoUpdate)) {
          this.object3d.matrixAutoUpdate = this.matrixAutoUpdate;
        }
        delete changes.matrixAutoUpdate;
      }
      if (changes.layers) {
        this.addChanges('layers');
        delete changes.layers;
      }
      if (changes.position) {
        this.addChanges('position');
        delete changes.position;
      }
      if (changes.rotation) {
        this.addChanges('rotation');
        delete changes.rotation;
      }
      if (changes.scale) {
        this.addChanges('scale');
        delete changes.scale;
      }
      if (changes.lookat) {
        this.addChanges('lookat');
        delete changes.lookat;
      }
      if (changes.controller) {
        this.addChanges('controller');
        delete changes.controller;
      }
      if (changes.loDistance) {
        this.addChanges('loDistance');
        delete changes.loDistance;
      }
      if (changes.debug) {
        delete changes.debug;
      }
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.object3dList, 'object3dList', 'object3d');
    this.subscribeListQueryChange(this.controllerList, 'controllerList', 'controller');
    this.subscribeListQueryChange(this.positionList, 'positionList', 'position');
    this.subscribeListQueryChange(this.rotationList, 'rotationList', 'rotation');
    this.subscribeListQueryChange(this.scaleList, 'scaleList', 'scale');
    this.subscribeListQueryChange(this.lookatList, 'lookatList', 'lookat');
    this.subscribeListQueryChange(this.materialList, 'materialList', 'material');
    this.subscribeListQueryChange(this.rigidbodyList, 'rigidbodyList', 'rigidbody');
    this.subscribeListQueryChange(this.mixerList, 'mixerList', 'mixer');
    super.ngAfterContentInit();
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getPosition(): THREE.Vector3 {
    if (this.object3d !== null) {
      return this.object3d.position;
    } else if (this.positionList !== null && this.positionList.length > 0) {
      return this.positionList.first.getPosition();
    } else {
      return new THREE.Vector3(0, 0, 0);
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setPosition(x: number, y: number, z: number): this {
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
      const position = ThreeUtil.getVector3Safe(x, y, z);
      this.object3d.position.copy(position);
    }
    return this;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  addPosition(x: number, y: number, z: number): this {
    if (this.object3d !== null) {
      if (x === null) {
        x = 0;
      }
      if (y === null) {
        y = 0;
      }
      if (z === null) {
        z = 0;
      }
      x += this.object3d.position.x;
      y += this.object3d.position.y;
      z += this.object3d.position.z;
      const position = ThreeUtil.getVector3Safe(x, y, z);
      this.object3d.position.copy(position);
    }
    return this;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getScale(): THREE.Vector3 {
    if (this.object3d !== null) {
      return this.object3d.scale;
    } else if (this.scaleList !== null && this.scaleList.length > 0) {
      return this.scaleList.first.getScale();
    } else {
      return new THREE.Vector3(1, 1, 1);
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setScale(x: number, y: number, z: number): this {
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
      const scale = ThreeUtil.getVector3Safe(x, y, z);
      this.object3d.scale.copy(scale);
    }
    return this;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setScaleScalar(scalar: number): this {
    if (this.object3d !== null) {
      this.object3d.scale.setScalar(scalar);
    }
    return this;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getRotation(): THREE.Euler {
    if (this.object3d !== null) {
      return this.object3d.rotation;
    } else if (this.rotationList !== null && this.rotationList.length > 0) {
      return this.rotationList.first.getRotation();
    } else {
      return new THREE.Euler(0, 0, 0);
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setRotation(x: number, y: number, z: number): this {
    if (this.object3d !== null) {
      if (x === null) {
        x = (this.object3d.rotation.x / Math.PI) * 180;
      }
      if (y === null) {
        y = (this.object3d.rotation.y / Math.PI) * 180;
      }
      if (z === null) {
        z = (this.object3d.rotation.z / Math.PI) * 180;
      }
      const rotation = ThreeUtil.getEulerSafe(x, y, z);
      this.object3d.rotation.copy(rotation);
    }
    return this;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  addRotation(x: number, y: number, z: number): this {
    if (this.object3d !== null) {
      x += (this.object3d.rotation.x / Math.PI) * 180;
      y += (this.object3d.rotation.y / Math.PI) * 180;
      z += (this.object3d.rotation.z / Math.PI) * 180;
      const rotation = ThreeUtil.getEulerSafe(x, y, z);
      this.object3d.rotation.copy(rotation);
    }
    return this;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setLookat(x: number, y: number, z: number): this {
    if (this.object3d !== null) {
      const position = ThreeUtil.getVector3Safe(x, y, z);
      this.object3d.lookAt(position);
      this.object3d.updateMatrixWorld();
    }
    return this;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setVisible(visible: boolean, _: boolean = null) {
    if (this.object3d !== null && visible !== null && visible !== undefined) {
      this.object3d.visible = visible;
      this.visible = visible;
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getObjectByName(name: string): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectByName(name);
    }
    return null;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getObjectById(id: number): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectById(id);
    }
    return null;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getObjectByProperty(name: string, value: string): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectByProperty(name, value);
    }
    return null;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  protected object3d: THREE.Object3D = null;

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getObject3d<T extends THREE.Object3D>(): T {
    return this.object3d as T;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getTagAttributeObject3d(tagAttributes: TagAttributes) {
    if (tagAttributes.options.position !== null && this.positionList && this.positionList.length > 0) {
      tagAttributes.options.position = this.object3d.position;
      tagAttributes.children.push(this.positionList.first);
    }
    if (tagAttributes.options.rotation !== null && this.rotationList && this.rotationList.length > 0) {
      tagAttributes.options.rotation = this.object3d.rotation;
      tagAttributes.children.push(this.rotationList.first);
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  protected parentObject3d : THREE.Object3D = null;

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      const oldParent = this.parentObject3d;
      this.parentObject3d = parent;
      if (this.object3d !== null && this.parentObject3d !== null && this.parentObject3d instanceof THREE.Object3D) {
        if (oldParent === this.object3d.parent || this.parentObject3d.parent === null) {
          if (this.parentObject3d instanceof THREE.LOD) {
            this.parentObject3d.addLevel(this.object3d, this.getLoDistance(0));
          } else {
            this.parentObject3d.add(this.object3d);
          }
        } else {
          this.parentObject3d.parent.add(this.object3d);
        }
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  removeObject3d(object3d : THREE.Object3D) {
    if (object3d !== null && object3d.parent !== null) {
      object3d.traverse(child => {
        if (child instanceof CSS2DObject || child instanceof CSS3DObject) {
          if (child.element.parentNode) {
            child.element.parentNode.removeChild(child.element);
          }
        }
      });
      object3d.parent.remove(object3d);
      object3d.parent = null;
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  private _addedReferChild : THREE.Object3D[] = [];

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  addParentObject3d(object3d : THREE.Object3D, changes? : string | string[]) {
    if (ThreeUtil.isNotNull(this.object3d) && ThreeUtil.isNotNull(object3d)) {
      if (this.object3d.parent !== null) {
        this.object3d.parent.add(object3d);
      } else {
        this.object3d.add(object3d);
      }
      this._addedReferChild.push(object3d);
      if (ThreeUtil.isNotNull(changes)) {
        this.addChanges(changes);
      }
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  addChildObject3d(object3d : THREE.Object3D, changes? : string | string[]) {
    if (ThreeUtil.isNotNull(this.object3d) && ThreeUtil.isNotNull(object3d)) {
      if (this._addedReferChild.length > 0) {
        this._addedReferChild.forEach(child => {
          this.removeObject3d(child);
        })
        this._addedReferChild = [];
      }
      this._addedReferChild.push(object3d);
      this.object3d.add(object3d);
      if (ThreeUtil.isNotNull(changes)) {
        this.addChanges(changes);
      }
    }
  }
  
  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setParentObject3d(object3d: THREE.Object3D) {
    if (ThreeUtil.isNotNull(object3d) && this.object3d !== object3d) {
      this.setObject3d(object3d);
      if (this.parentObject3d !== null && this.parentObject3d.parent !== null) {
        this.parentObject3d.parent.add(this.object3d);
      }
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  setObject3d(object3d: THREE.Object3D) {
    if (ThreeUtil.isNotNull(object3d) && this.object3d !== object3d) {
      if (this.object3d !== null && this.object3d.parent !== null) {
        this.object3d.parent.remove(this.object3d);
      }
      if (object3d !== null && object3d.parent === null && this.parentObject3d !== null) {
        this.parentObject3d.add(object3d);
      }
      if (this._addedReferChild !== null && this._addedReferChild.length > 0) {
        this._addedReferChild.forEach(child => {
          this.removeObject3d(child);
        });
        this._addedReferChild = [];
      }
      this.object3d = object3d;
      if (this.object3d !== null) {
        this.setTweenTarget(this.object3d);
      }
      super.setObject(this.object3d);
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  getObjectTop(): THREE.Object3D {
    let parent: THREE.Object3D = this.parent;
    while (parent.parent !== null) {
      parent = parent.parent;
    }
    return parent;
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  protected applyChanges(changes : string[]) {
    this.applyChanges3d(changes);
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  protected applyChanges3d(changes: string[]) {
    if (this.object3d !== null) {
      if (ThreeUtil.isIndexOf(changes, ['clearinit'])) {
        return ;
      }
      if (ThreeUtil.isIndexOf(changes, ['init'])) {
        changes = ThreeUtil.pushUniq(changes, [
          'object3d',
          'position', 
          'rotation', 
          'scale', 
          'lookat', 
          'visible',
          'name',
          'matrixautoupdate',
          'layers',
          'castshadow',
          'receiveshadow',
          'frustumculled',
          'renderorder',
          'lodistance',
          'material',
          'mixer',
          'animationgroup',
          'rigidbody',
          'controller',
        ]);
      }
      if (ThreeUtil.isIndexOf(changes, ['customdepth','customdistance'])) {
        changes = ThreeUtil.pushUniq(changes, ['material']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'visible' :
            if (ThreeUtil.isNotNull(this.visible)) {
              this.object3d.visible = this.visible;
            }
            break;
          case 'name' :
            if (ThreeUtil.isNotNull(this.name) && this.name !== '') {
              this.object3d.name = this.name;
            }
            break;
          case 'matrixautoupdate' :
            if (ThreeUtil.isNotNull(this.matrixAutoUpdate)) {
              this.object3d.matrixAutoUpdate = this.matrixAutoUpdate;
              this.object3d.updateMatrix();
            }
            break;
          case 'layers' :
            if (ThreeUtil.isNotNull(this.layers) && this.layers.length > 0) {
              if (this.layers.length == 1) {
                this.object3d.layers.set(this.layers[0]);
              } else {
                this.layers.forEach((layer) => {
                  this.object3d.layers.enable(layer);
                });
              }
            }
            break;
          case 'castshadow' :
            if (!(this.object3d instanceof THREE.Scene) && !(this.object3d instanceof THREE.Camera) && !(this.object3d instanceof THREE.HemisphereLight) && !(this.object3d instanceof THREE.AmbientLight) && !(this.object3d instanceof THREE.RectAreaLight)) {
              if (ThreeUtil.isNotNull(this.castShadow)) {
                this.object3d.castShadow = this.castShadow;
              }
            }
            break;
          case 'receiveshadow' :
            if (!(this.object3d instanceof THREE.Scene) && !(this.object3d instanceof THREE.Camera)) {
              if (ThreeUtil.isNotNull(this.receiveShadow)) {
                this.object3d.receiveShadow = this.receiveShadow;
              }
            }
            break;
          case 'frustumculled' :
            if (ThreeUtil.isNotNull(this.frustumCulled)) {
              this.object3d.frustumCulled = this.frustumCulled;
            }
            break;
          case 'renderorder' :
            if (ThreeUtil.isNotNull(this.renderOrder)) {
              this.object3d.renderOrder = this.renderOrder;
            }
            break;
          case 'lodistance' :
            if (ThreeUtil.isNotNull(this.loDistance) && this.parentObject3d instanceof THREE.LOD) {
              this.parentObject3d.addLevel(this.object3d, this.getLoDistance(0));
            }
            break;
          case 'object3d' :
            this.unSubscribeReferList('object3dList');
            if (ThreeUtil.isNotNull(this.object3dList)) {
              this.consoleLog('object3d', this.object3dList.length,'error');
              this.object3dList.forEach((object3d) => {
                object3d.setParent(this.object3d);
              });
              this.subscribeListQuery(this.object3dList, 'object3dList','object3d');
            }
            break;
          case 'position':
            this.setUserData('position',null);
            this.setUserData('positionUp',null);
            this.setUserData('positionLookat',null);
            this.unSubscribeRefer('position');
            if (ThreeUtil.isNotNull(this.position)) {
              this.setUserData('position', 'position');
              this.object3d.position.copy(ThreeUtil.getPosition(this.position));
              this.subscribeRefer(
                'position',
                ThreeUtil.getSubscribe(this.position, (event) => {
                  this.addChanges(event);
                }, 'position')
              );
            }
            this.unSubscribeReferList('positionList');
            if (ThreeUtil.isNotNull(this.positionList)) {
              this.positionList.forEach((position) => {
                position.setObject3d(this.object3d);
              });
              this.subscribeListQuery(this.positionList, 'positionList','position');
            }
            if (ThreeUtil.isNull(this.object3d.userData.initPosition)) {
              this.setUserData('initPosition', this.object3d.position.clone());
            }
            this.setSubscribeNext('position');
            break;
          case 'rotation':
            this.unSubscribeRefer('rotation');
            this.setUserData('rotation', null);
            if (ThreeUtil.isNotNull(this.rotation)) {
              this.setUserData('rotation', 'rotation');
              this.object3d.rotation.copy(ThreeUtil.getRotation(this.rotation));
              this.subscribeRefer(
                'rotation',
                ThreeUtil.getSubscribe(this.rotation, (event) => {
                  this.addChanges(event);
                },'rotation')
              );
            }
            this.unSubscribeReferList('rotationList');
            if (ThreeUtil.isNotNull(this.rotationList)) {
              this.rotationList.forEach((rotation) => {
                rotation.setObject3d(this.object3d);
              });
              this.subscribeListQuery(this.rotationList, 'rotationList','rotation');
            }
            this.setSubscribeNext('rotation');
            break;
          case 'scale':
            this.setUserData('scale', null);
            this.unSubscribeRefer('scale');
            if (ThreeUtil.isNotNull(this.scale)) {
              this.setUserData('scale', 'scale');
              this.object3d.scale.copy(ThreeUtil.getScale(this.scale));
              this.subscribeRefer(
                'scale',
                ThreeUtil.getSubscribe(this.scale, (event) => {
                  this.addChanges(event);
                }, 'scale')
              );
            }
            this.unSubscribeReferList('scaleList');
            if (ThreeUtil.isNotNull(this.scaleList)) {
              this.scaleList.forEach((scale) => {
                scale.setObject3d(this.object3d);
              });
              this.subscribeListQuery(this.scaleList, 'scaleList','scale');
            }
            this.setSubscribeNext('scale');
            break;
          case 'lookat':
            this.unSubscribeRefer('lookat');
            this.setUserData('lookat', null);
            if (ThreeUtil.isNotNull(this.lookat)) {
              this.setUserData('lookat', 'lookat');
              this.object3d.lookAt(ThreeUtil.getLookAt(this.lookat));
              this.subscribeRefer(
                'lookat',
                ThreeUtil.getSubscribe(this.lookat, (event) => {
                  this.addChanges(event);
                }, 'lookat')
              );
            }
            this.unSubscribeReferList('lookatList');
            if (ThreeUtil.isNotNull(this.lookatList)) {
              this.lookatList.forEach((lookat) => {
                lookat.setObject3d(this.object3d)
              });
              this.subscribeListQuery(this.lookatList, 'lookatList','lookat');
            }
            this.setSubscribeNext('lookat');
            break;
          case 'controller':
            this.unSubscribeRefer('controller');
            if (ThreeUtil.isNotNull(this.controller)) {
              this.controller.setObject3d(this.object3d);
              this.subscribeRefer(
                'controller',
                ThreeUtil.getSubscribe(this.controller, (event) => {
                  this.addChanges(event);
                }, 'controller')
              );
            }
            this.unSubscribeReferList('controllerList');
            if (ThreeUtil.isNotNull(this.controllerList)) {
              this.controllerList.forEach((controller) => {
                controller.setObject3d(this.object3d);
              });
              this.subscribeListQuery(this.controllerList, 'controllerList','controller');
            }
            break;
          case 'material':
            this.unSubscribeRefer('customDepth');
            this.unSubscribeRefer('customDistance');
            this.setUserData('customDepthMaterial', null);
            this.setUserData('customDistanceMaterial', null);

            this.object3d.userData.customDepthMaterial = null;
            this.object3d.userData.customDistanceMaterial = null;
            if (ThreeUtil.isNotNull(this.customDepth)) {
              this.setUserData('customDepthMaterial', 'customDepth');
                this.object3d.customDepthMaterial = ThreeUtil.getMaterialOne(this.customDepth);
              this.subscribeRefer('customDepth', ThreeUtil.getSubscribe(this.customDepth, (event) => {
                this.addChanges(event);
              },'material'));
            }
            if (ThreeUtil.isNotNull(this.customDistance)) {
              this.setUserData('customDistanceMaterial', 'customDistance');
              this.object3d.customDistanceMaterial = ThreeUtil.getMaterialOne(this.customDistance);
              this.subscribeRefer('customDistance', ThreeUtil.getSubscribe(this.customDistance, (event) => {
                this.addChanges(event);
              },'material'));
            }
            this.unSubscribeReferList('materialList');
            if (ThreeUtil.isNotNull(this.materialList) && this.materialList.length > 0) {
              const meshMaterial = AbstractMaterialComponent.getMeshMaterial(this.object3d) as MeshMaterialRaw;
              if (meshMaterial !== null) {
                this.materialList.forEach((material) => {
                  switch(material.materialType.toLowerCase()) {
                    case 'customdepthmaterial':
                    case 'customdepth':
                    case 'customdistancematerial':
                    case 'customdistance':
                      material.setMesh(meshMaterial);
                      break;
                  }
                });
              }
              this.subscribeListQuery(this.materialList, 'materialList','material');
            }
            break;
          case 'mixer':
            this.unSubscribeReferList('mixerList');
            if (ThreeUtil.isNotNull(this.mixerList)) {
              this.mixerList.forEach((mixer) => {
                mixer.setParent(this.object3d);
              });
              this.subscribeListQuery(this.mixerList, 'mixerList', 'mixer');
            }
            break;
          case 'animationgroup' :
            if (ThreeUtil.isNotNull(this.animationGroup)) {
              let animationGroup : THREE.AnimationObjectGroup = null;
              if (this.animationGroup instanceof AnimationGroupComponent) {
                animationGroup = this.animationGroup.getAnimationGroup();
              } else {
                animationGroup = this.animationGroup;
              }
              if (animationGroup !== null) {
                let oldObject : THREE.Object3D = null;
                animationGroup['_objects'].forEach(object => {
                  if (object.userData.component == this.id) {
                    oldObject = object;
                  }
                }); 
                if (oldObject !== null) {
                  animationGroup.remove(oldObject);
                }
                animationGroup.add(this.object3d);
              }
            }
            break;
          case 'rigidbody':
            this.unSubscribeReferList('rigidbodyList');
            if (ThreeUtil.isNotNull(this.rigidbodyList)) {
              this.rigidbodyList.forEach((rigidbody) => {
                rigidbody.setParent(this.object3d);
              });
              this.subscribeListQuery(this.rigidbodyList, 'rigidbodyList', 'rigidbody');
            }
            break;
        }
      });
      if (ThreeUtil.isIndexOf(changes, ['position','rotation','scale','lookat']) && !this.object3d.matrixAutoUpdate) {
        this.object3d.updateMatrix();
      }
      super.applyChanges(changes);
    }
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  showDebug(obj: THREE.Object3D) {
    const lines: string[] = [];
    lines.push(obj.name || obj.id.toString());
    this.addDebugLine(obj.children, lines, '\t');
    this.consoleLog('object : ',lines.join('\n'));
  }

  /**
   * todo
   * 
   * @param def 
   * @returns 
   */
  addDebugLine(objs: THREE.Object3D[], lines: string[], prefix: string): string[] {
    if (objs.length > 0) {
      objs.forEach((obj) => {
        lines.push(prefix + (obj.name || obj.id.toString()));
        this.addDebugLine(obj.children, lines, prefix + '\t');
      });
    }
    return lines;
  }
}
