import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ControllerComponent } from './controller/controller.component';
import { TagAttributes, ThreeUtil } from './interface';
import { LookatComponent } from './lookat/lookat.component';
import { PositionComponent } from './position/position.component';
import { RotationComponent } from './rotation/rotation.component';
import { ScaleComponent } from './scale/scale.component';
import { AbstractTweenComponent } from './tween.abstract';

@Component({
  template: ''
})
export abstract class AbstractObject3dComponent extends AbstractTweenComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  @Input() public visible: boolean = true;
  @Input() public name: string = '';
  @Input() protected matrixAutoUpdate: boolean = null;
  @Input() private layers: number[] = null;
  @Input() protected castShadow: boolean = null;
  @Input() protected receiveShadow: boolean = null;
  @Input() protected frustumCulled: boolean = null;
  @Input() private renderOrder: number = null;
  
  @Input() private controller: ControllerComponent = null;
  @Input() private position: THREE.Vector3 | number[] | PositionComponent | any = null;
  @Input() private rotation: THREE.Vector3 | number[] | RotationComponent | any = null;
  @Input() private scale: THREE.Vector3 | number[] | ScaleComponent | any = null;
  @Input() private lookat: THREE.Vector3 | number[] | LookatComponent | any = null;
  @Input() private loDistance: number = null;

  @ContentChildren(ControllerComponent, { descendants: false }) public controllerList: QueryList<ControllerComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;

  private getLoDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.loDistance, def);
  }

  constructor();

  constructor() {
    super();
  }

  ngOnInit(subscribeType?: string): void {
    super.ngOnInit(subscribeType || 'object3d');
  }

  ngOnDestroy(): void {
    if (this.object3d != null) {
      if (this.object3d.parent !== null) {
        this.object3d.parent.remove(this.object3d);
        this.object3d.parent = null;
        this.object3d = null;
      }
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.object3d !== null) {
      if (changes.visible) {
        if (ThreeUtil.isNotNull(this.visible)) {
          this.object3d.visible = this.visible;
        }
        delete changes.visible;
      }
      if (changes.name) {
        if (ThreeUtil.isNotNull(this.name)) {
          this.object3d.name = this.name;
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
    this.subscribeListQuery(this.controllerList, 'controllerList', 'controller');
    this.subscribeListQuery(this.positionList, 'positionList', 'position');
    this.subscribeListQuery(this.rotationList, 'rotationList', 'rotation');
    this.subscribeListQuery(this.scaleList, 'scaleList', 'scale');
    this.subscribeListQuery(this.lookatList, 'lookatList', 'lookat');
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

  getObject3d(): THREE.Object3D {
    return this.object3d;
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
      this.parentObject3d = parent;
      if (this.object3d !== null && this.parentObject3d !== null && this.parentObject3d instanceof THREE.Object3D) {
        if (this.parentObject3d instanceof THREE.LOD) {
          this.parentObject3d.addLevel(this.object3d, this.getLoDistance(0));
        } else {
          this.parentObject3d.add(this.object3d);
        }
        return false;
      } else {
        return true;
      }
    }
    return false;
  }

  setObject3d(object3d: THREE.Object3D) {
    if (this.object3d !== object3d) {
      if (this.object3d !== null && this.object3d.parent !== null) {
        if (object3d !== null) {
          this.object3d.children.forEach(child => {
            object3d.children.push(child);
          });
          if (object3d.parent === null) {
            this.object3d.parent.add(object3d);
          }
        }
        this.object3d.parent.remove(this.object3d);
      } else if (object3d !== null && object3d.parent === null && this.parentObject3d !== null) {
        this.parentObject3d.add(object3d);
      }
      this.object3d = object3d;
      if (this.object3d !== null) {
        if (ThreeUtil.isNull(this.object3d.userData.component)) {
          this.object3d.userData.component = this;
        }
        this.setTweenTarget(this.object3d);
        this.setSubscribeNext('object3d');
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

  protected applyChanges() {
    this.synkObject3d(this.getChanges());
  }

  protected synkObject(synkTypes: string[]) {
    this.synkObject3d(synkTypes);
  }

  protected synkObject3d(synkTypes: string[]) {
    if (this.object3d !== null) {
      if (ThreeUtil.isIndexOf(synkTypes, ['clearinit'])) {
        return ;
      }
      if (ThreeUtil.isIndexOf(synkTypes, ['object3d','init'])) {
        synkTypes = ThreeUtil.pushUniq(synkTypes, [
          'position', 
          'rotation', 
          'scale', 
          'lookat', 
          'controller',
          'visible',
          'name',
          'matrixAutoUpdate',
          'layers',
          'castShadow',
          'receiveShadow',
          'frustumCulled',
          'renderOrder',
          'loDistance',
        ]);
      }
      synkTypes.forEach((synkType) => {
        switch (synkType.toLowerCase()) {
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
          case 'matrixAutoUpdate' :
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
          case 'castShadow' :
            if (ThreeUtil.isNotNull(this.castShadow)) {
              this.object3d.castShadow = this.castShadow;
            }
            break;
          case 'receiveShadow' :
            if (ThreeUtil.isNotNull(this.receiveShadow)) {
              this.object3d.receiveShadow = this.receiveShadow;
            }
            break;
          case 'frustumCulled' :
            if (ThreeUtil.isNotNull(this.frustumCulled)) {
              this.object3d.frustumCulled = this.frustumCulled;
            }
            break;
          case 'renderOrder' :
            if (ThreeUtil.isNotNull(this.renderOrder)) {
              this.object3d.renderOrder = this.renderOrder;
            }
            break;
          case 'loDistance' :
            break;
          case 'position':
            this.unSubscribeRefer('position');
            if (ThreeUtil.isNotNull(this.position)) {
              this.object3d.position.copy(ThreeUtil.getPosition(this.position));
              this.subscribeRefer(
                'position',
                ThreeUtil.getSubscribe(this.position, (event) => {
                  this.addChanges(event);
                }, 'position')
              );
            }
            if (ThreeUtil.isNotNull(this.positionList)) {
              this.positionList.forEach((position) => {
                switch (position.type) {
                  case 'up':
                    position.setPosition(this.object3d.up);
                    break;
                  case 'lookat':
                    this.object3d.lookAt(position.getPosition());
                    break;
                  case 'position':
                  default:
                    position.setPosition(this.object3d.position);
                    break;
                }
              });
            }
            if (!this.object3d.matrixAutoUpdate) {
              this.object3d.updateMatrix();
            }
            this.object3d.userData.position = this.object3d.position.clone();
            this.setSubscribeNext('position');
            break;
          case 'rotation':
            this.unSubscribeRefer('rotation');
            if (ThreeUtil.isNotNull(this.rotation)) {
              this.object3d.rotation.copy(ThreeUtil.getRotation(this.rotation));
              this.subscribeRefer(
                'rotation',
                ThreeUtil.getSubscribe(this.rotation, (event) => {
                  this.addChanges(event);
                },'rotation')
              );
            }
            if (ThreeUtil.isNotNull(this.rotationList)) {
              this.rotationList.forEach((rotation) => {
                rotation.setRotation(this.object3d.rotation);
              });
            }
            if (!this.object3d.matrixAutoUpdate) {
              this.object3d.updateMatrix();
            }
            this.setSubscribeNext('rotation');
            break;
          case 'scale':
            this.unSubscribeRefer('scale');
            if (ThreeUtil.isNotNull(this.scale)) {
              this.object3d.scale.copy(ThreeUtil.getScale(this.scale));
              this.subscribeRefer(
                'scale',
                ThreeUtil.getSubscribe(this.scale, (event) => {
                  this.addChanges(event);
                }, 'scale')
              );
            } else {
              if (ThreeUtil.isNotNull(this.scaleList)) {
                this.scaleList.forEach((scale) => {
                  scale.setScale(this.object3d.scale);
                });
                this.object3d.updateMatrix();
              }
            }
            if (!this.object3d.matrixAutoUpdate) {
              this.object3d.updateMatrix();
            }
            this.setSubscribeNext('scale');
            break;
          case 'lookat':
            this.unSubscribeRefer('lookat');
            if (ThreeUtil.isNotNull(this.lookat)) {
              this.object3d.lookAt(ThreeUtil.getLookAt(this.lookat));
              this.subscribeRefer(
                'lookat',
                ThreeUtil.getSubscribe(this.lookat, (event) => {
                  this.addChanges(event);
                }, 'lookat')
              );
            } else {
              if (ThreeUtil.isNotNull(this.lookatList)) {
                this.lookatList.forEach((lookat) => {
                  this.object3d.lookAt(lookat.getLookAt());
                });
              }
            }
            if (!this.matrixAutoUpdate) {
              this.object3d.updateMatrix();
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
            if (ThreeUtil.isNotNull(this.controllerList)) {
              this.controllerList.forEach((controller) => {
                controller.setObject3d(this.object3d);
              });
            }
            break;
        }
      });
      super.synkObject(synkTypes);
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
