import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { ControllerComponent } from './controller/controller.component';
import { TagAttributes, ThreeUtil } from './interface';
import { LookatComponent } from './lookat/lookat.component';
import { MaterialComponent, MeshMaterialRaw } from './material/material.component';
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
 
  @Input() public visible: boolean = true;
  @Input() public name: string = '';
  @Input() protected matrixAutoUpdate: boolean = null;
  @Input() private layers: number[] = null;
  @Input() protected castShadow: boolean = true;
  @Input() protected receiveShadow: boolean = null;
  @Input() protected frustumCulled: boolean = null;
  @Input() private renderOrder: number = null;
  
  @Input() private controller: ControllerComponent = null;
  @Input() private position: THREE.Vector3 | number[] | PositionComponent | any = null;
  @Input() private rotation: THREE.Vector3 | number[] | RotationComponent | any = null;
  @Input() private scale: THREE.Vector3 | number[] | ScaleComponent | any = null;
  @Input() private lookat: THREE.Vector3 | number[] | LookatComponent | any = null;
  @Input() private loDistance: number = null;
  @Input() private customDepth: MaterialComponent | THREE.Material | any = null;
  @Input() private customDistance: MaterialComponent | THREE.Material | any  = null;
  @Input() private animationGroup: AnimationGroupComponent | THREE.AnimationObjectGroup  = null;

  @ContentChildren(ControllerComponent, { descendants: false }) public controllerList: QueryList<ControllerComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;
  @ContentChildren(MaterialComponent, { descendants: false }) protected materialList: QueryList<MaterialComponent>;
  @ContentChildren(AbstractObject3dComponent, { descendants: false }) protected object3dList: QueryList<AbstractObject3dComponent>;
  @ContentChildren(RigidbodyComponent, { descendants: false }) private rigidbodyList: QueryList<RigidbodyComponent>;
  @ContentChildren(MixerComponent, { descendants: false }) private mixerList: QueryList<MixerComponent>;

  protected OBJECT3D_ATTR : string[] = ['init','name','position','rotation','scale','layers','visible','castshadow','receiveshadow','frustumculled','renderorder','customdepthmaterial','customdistancematerial','material','helper','lodistance','debug','enabled','overrideparams','windowexport','helper','mixer','animationgroup','tween'];

  private getLoDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.loDistance, def);
  }

  protected getVisible(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.visible, def);
  }

  protected getName(def?: string): string {
    return ThreeUtil.getTypeSafe(this.name, def);
  }

  constructor() {
    super();
  }

  ngOnInit(subscribeType?: string): void {
    super.ngOnInit(subscribeType || 'object3d');
  }

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

  getPosition(): THREE.Vector3 {
    if (this.object3d !== null) {
      return this.object3d.position;
    } else if (this.positionList !== null && this.positionList.length > 0) {
      return this.positionList.first.getPosition();
    } else {
      return new THREE.Vector3(0, 0, 0);
    }
  }

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

  getScale(): THREE.Vector3 {
    if (this.object3d !== null) {
      return this.object3d.scale;
    } else if (this.scaleList !== null && this.scaleList.length > 0) {
      return this.scaleList.first.getScale();
    } else {
      return new THREE.Vector3(1, 1, 1);
    }
  }

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

  setScaleScalar(scalar: number): this {
    if (this.object3d !== null) {
      this.object3d.scale.setScalar(scalar);
    }
    return this;
  }

  getRotation(): THREE.Euler {
    if (this.object3d !== null) {
      return this.object3d.rotation;
    } else if (this.rotationList !== null && this.rotationList.length > 0) {
      return this.rotationList.first.getRotation();
    } else {
      return new THREE.Euler(0, 0, 0);
    }
  }

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

  setLookat(x: number, y: number, z: number): this {
    if (this.object3d !== null) {
      const position = ThreeUtil.getVector3Safe(x, y, z);
      this.object3d.lookAt(position);
      this.object3d.updateMatrixWorld();
    }
    return this;
  }

  setVisible(visible: boolean, _: boolean = null) {
    if (this.object3d !== null && visible !== null && visible !== undefined) {
      this.object3d.visible = visible;
      this.visible = visible;
    }
  }

  getObjectByName(name: string): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectByName(name);
    }
    return null;
  }

  getObjectById(id: number): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectById(id);
    }
    return null;
  }

  getObjectByProperty(name: string, value: string): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectByProperty(name, value);
    }
    return null;
  }

  protected object3d: THREE.Object3D = null;

  getObject3d<T extends THREE.Object3D>(): T {
    return this.object3d as T;
  }

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

  protected parentObject3d : THREE.Object3D = null;

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

  private _addedReferChild : THREE.Object3D[] = [];
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
  
  setParentObject3d(object3d: THREE.Object3D) {
    if (ThreeUtil.isNotNull(object3d) && this.object3d !== object3d) {
      this.setObject3d(object3d);
      if (this.parentObject3d !== null && this.parentObject3d.parent !== null) {
        this.parentObject3d.parent.add(this.object3d);
      }
    }
  }

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

  getObjectTop(): THREE.Object3D {
    let parent: THREE.Object3D = this.parent;
    while (parent.parent !== null) {
      parent = parent.parent;
    }
    return parent;
  }

  protected applyChanges(changes : string[]) {
    this.applyChanges3d(changes);
  }

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
              const meshMaterial = MaterialComponent.getMeshMaterial(this.object3d) as MeshMaterialRaw;
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

  showDebug(obj: THREE.Object3D) {
    const lines: string[] = [];
    lines.push(obj.name || obj.id.toString());
    this.addDebugLine(obj.children, lines, '\t');
    this.consoleLog('object : ',lines.join('\n'));
  }

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
