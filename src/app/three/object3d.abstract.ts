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
  @Input() protected frustumCulled: boolean = null;
  @Input() private controller: ControllerComponent = null;
  @Input() private position: THREE.Vector3 | number[] | PositionComponent | any = null;
  @Input() private rotation: THREE.Vector3 | number[] | RotationComponent | any = null;
  @Input() private scale: THREE.Vector3 | number[] | ScaleComponent | any = null;
  @Input() private lookat: THREE.Vector3 | number[] | LookatComponent | any = null;
  @Input() private loDistance: number = null;
  @Input() protected debug: boolean = false;

  @ContentChildren(ControllerComponent, { descendants: false }) public controllerList: QueryList<ControllerComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;

  private getLoDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.loDistance, def);
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.object3d !== null) {
      if (changes.visible) {
        this.object3d.visible = this.visible;
      }
      if (changes.name) {
        this.object3d.name = this.name;
      }
      if (changes.position) {
        this.addChanges('position');
      }
      if (changes.rotation) {
        this.addChanges('rotation');
      }
      if (changes.scale) {
        this.addChanges('scale');
      }
      if (changes.lookat) {
        this.addChanges('lookat');
      }
      if (changes.loDistance) {
        this.addChanges('loDistance');
      }
    }
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.controllerList, 'controllerList', 'controller');
    this.subscribeListQuery(this.positionList, 'positionList', 'position');
    this.subscribeListQuery(this.rotationList, 'rotationList', 'rotation');
    this.subscribeListQuery(this.scaleList, 'scaleList', 'scale');
    this.subscribeListQuery(this.lookatList, 'lookatList', 'lookat');
    super.ngAfterContentInit();
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

  setVisible(visible: boolean, helperVisible: boolean = null) {
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

  getObject3D(): THREE.Object3D {
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

  setParent(parent: THREE.Object3D, isRestore: boolean = false): boolean {
    if (super.setParent(parent)) {
      if (this.object3d !== null && this.parent !== null && this.parent instanceof THREE.Object3D) {
        if (this.parent instanceof THREE.LOD) {
          this.parent.addLevel(this.object3d, this.getLoDistance(0));
        } else {
          this.parent.add(this.object3d);
        }
      } else {
        return true;
      }
    }
    return false;
  }

  setObject3D(object3d: THREE.Object3D, add2Parent: boolean = true) {
    if (this.object3d !== object3d) {
      if (this.object3d !== null && this.object3d.parent !== null) {
        this.object3d.parent.remove(this.object3d);
      }
      this.object3d = object3d;
      if (this.object3d !== null) {
        if (ThreeUtil.isNotNull(this.matrixAutoUpdate)) {
          this.object3d.matrixAutoUpdate = this.matrixAutoUpdate;
          this.object3d.updateMatrix();
        }
        if (ThreeUtil.isNotNull(this.layers) && this.layers.length > 0) {
          if (this.layers.length == 1) {
            this.object3d.layers.set(this.layers[0]);
          } else {
            this.layers.forEach((layer) => {
              this.object3d.layers.enable(layer);
            });
          }
        }
        if (ThreeUtil.isNotNull(this.name) && this.name !== '') {
          this.object3d.name = this.name;
        }
        if (ThreeUtil.isNotNull(this.visible)) {
          this.object3d.visible = this.visible;
        }
        if (ThreeUtil.isNotNull(this.frustumCulled)) {
          this.object3d.frustumCulled = this.frustumCulled;
        }
        if (add2Parent && this.parent !== null && this.parent instanceof THREE.Object3D) {
          if (this.parent instanceof THREE.LOD) {
            this.parent.addLevel(this.object3d, this.getLoDistance(0));
          } else {
            this.parent.add(this.object3d);
          }
        }
        this.setTweenTarget(this.object3d);
        this.setSubscribeNext('object3d');
        if (this.debug) {
          console.log('object3d', this.object3d);
        }
      }
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
    this.synkObject3D(this.getChanges());
  }

  private _lookAt : THREE.Vector3 = null;

  protected synkObject3D(synkTypes: string[]) {
    if (this.object3d !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType.toLowerCase()) {
          case 'position':
            this.unSubscribeRefer('position');
            if (this.position !== null) {
              this.object3d.position.copy(ThreeUtil.getPosition(this.position));
              this.subscribeRefer(
                'position',
                ThreeUtil.getSubscribe(this.position, () => {
                  this.addChanges('position');
                })
              );
            }
            if (this.positionList !== null && this.positionList !== undefined) {
              this.positionList.forEach((position) => {
                switch (position.type) {
                  case 'up':
                    position.setPosition(this.object3d.up);
                    break;
                  case 'position':
                    position.setPosition(this.object3d.position);
                    break;
                  case 'lookat':
                    this.unSubscribeRefer('lookAtList');
                    if (ThreeUtil.isNull(this._lookAt)) {
                      this._lookAt = new THREE.Vector3();
                    }
                    position.setPosition(this._lookAt);
                    this.object3d.lookAt(this._lookAt);
                    this.object3d.updateMatrixWorld();
                    this.subscribeRefer('lookAtList', ThreeUtil.getSubscribe(position, () => {
                      this.object3d.lookAt(this._lookAt);
                      this.object3d.updateMatrixWorld();
                    }, 'position'))
                    break;
                  default:
                    break;
                }
              });
            }
            if (!this.object3d.matrixAutoUpdate) {
              this.object3d.updateMatrix();
            }
            break;
          case 'rotation':
            this.unSubscribeRefer('rotation');
            if (this.position !== null) {
              this.object3d.rotation.copy(ThreeUtil.getRotation(this.rotation));
              this.subscribeRefer(
                'rotation',
                ThreeUtil.getSubscribe(this.rotation, () => {
                  this.addChanges('rotation');
                })
              );
            }
            if (this.rotationList !== null && this.rotationList !== undefined) {
              this.rotationList.forEach((rotation) => {
                // rotation.setRotation(this.object3d.rotation);
              });
            }
            if (!this.object3d.matrixAutoUpdate) {
              this.object3d.updateMatrix();
            }
            break;
          case 'scale':
            this.unSubscribeRefer('scale');
            if (this.scale !== null) {
              this.object3d.scale.copy(ThreeUtil.getScale(this.scale));
              this.subscribeRefer(
                'scale',
                ThreeUtil.getSubscribe(this.scale, () => {
                  this.addChanges('scale');
                })
              );
            }
            if (this.scaleList !== null && this.scaleList !== undefined) {
              this.scaleList.forEach((scale) => {
                scale.setScale(this.object3d.scale);
              });
            }
            if (!this.object3d.matrixAutoUpdate) {
              this.object3d.updateMatrix();
            }
            break;
          case 'lookat':
            this.unSubscribeRefer('lookat');
            this.unSubscribeRefer('lookAtList');
            if (this.lookat !== null) {
              this.object3d.lookAt(ThreeUtil.getLookAt(this.lookat));
              this.subscribeRefer(
                'lookat',
                ThreeUtil.getSubscribe(this.lookat, () => {
                  this.addChanges('lookat');
                })
              );
            }
            if (this.lookatList !== null && this.lookatList !== undefined) {
              if (ThreeUtil.isNull(this._lookAt)) {
                this._lookAt = new THREE.Vector3();
              }
              this.lookatList.forEach((lookat) => {
                lookat.setLookAt(this._lookAt);
                this.object3d.lookAt(this._lookAt);
              });
            }
            if (!this.matrixAutoUpdate) {
              this.object3d.updateMatrix();
            }
            break;
          case 'controller':
            this.unSubscribeRefer('controller');
            if (this.controller !== null) {
              this.controller.setObject3D(this.object3d);
              this.subscribeRefer(
                'controller',
                ThreeUtil.getSubscribe(this.controller, () => {
                  this.addChanges('controller');
                })
              );
            }
            if (this.controllerList !== null && this.controllerList !== undefined) {
              this.controllerList.forEach((controller) => {
                controller.setObject3D(this.object3d);
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
    console.log(lines.join('\n'));
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
