import {
  AfterContentInit,
  Component,
  ContentChildren,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { ControllerComponent } from './controller/controller.component';
import { ThreeUtil } from './interface';
import { LookatComponent } from './lookat/lookat.component';
import { PositionComponent } from './position/position.component';
import { RotationComponent } from './rotation/rotation.component';
import { ScaleComponent } from './scale/scale.component';
import { AbstractTweenComponent } from './tween.abstract';

@Component({
	template: '',
})
export abstract class AbstractObject3dComponent extends AbstractTweenComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {

	@Input() public visible:boolean = true;
  @Input() public name:string = "";
  @Input() private position : PositionComponent = null;
  @Input() private rotation : RotationComponent = null;
  @Input() private scale : ScaleComponent = null;
  @Input() private lookat : LookatComponent = null;
	@ContentChildren(ControllerComponent, { descendants: false }) public controllerList: QueryList<ControllerComponent>;
	@ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;
	@ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
	@ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
	@ContentChildren(LookatComponent, { descendants: false }) private lookatList: QueryList<LookatComponent>;

	ngOnInit(): void {
		super.ngOnInit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			if (this.object3d !== null) {
				if (changes.visible) {
					this.object3d.visible = this.visible;
				}
				if (changes.name) {
					this.object3d.name = this.name;
				}
			}
		}
		super.ngOnChanges(changes);
	}

	ngAfterContentInit(): void {
		if (this.controllerList !== null && this.controllerList !== undefined) {
			this.controllerList.changes.subscribe((e) => {
        this._controllerSubscribe = this.unSubscription(this._controllerSubscribe);
        this.controllerList.forEach(controller => {
          this._controllerSubscribe.push(controller.controllerSubscribe().subscribe(() => {

          }));
        });
				this.synkObject3D(['controller']);
			});
		}
		if (this.positionList !== null && this.positionList !== undefined) {
      this.setPositionSubscribe();
      this.positionList.changes.subscribe((e) => {
        this.setPositionSubscribe();
      });
		}
		if (this.rotationList !== null && this.rotationList !== undefined) {
      this.setRotationSubscribe();
      this.rotationList.changes.subscribe((e) => {
        this.setRotationSubscribe();
      });
		}
		if (this.scaleList !== null && this.scaleList !== undefined) {
      this.setScaleSubscribe();
      this.scaleList.changes.subscribe((e) => {
        this.setScaleSubscribe();
      });
		}
    if (this.lookatList !== null && this.lookatList !== undefined) {
      this.setLookatSubscribe();
      this.lookatList.changes.subscribe((e) => {
        this.setLookatSubscribe();
      });
		}
    super.ngAfterContentInit();
	}

  setPositionSubscribe() {
		if (this.positionList !== null && this.positionList !== undefined) {
      this._positionSubscribe = this.unSubscription(this._positionSubscribe);
      if (this.position !== null) {
        this._positionSubscribe.push(this.position.positionSubscribe().subscribe((pos) => {
          if (this.object3d !== null) {
            this.object3d.position.copy(pos);
          }
        }));
      }
      this.positionList.forEach(position => {
        this._positionSubscribe.push(position.positionSubscribe().subscribe((pos) => {
          if (this.object3d !== null) {
            this.object3d.position.copy(pos);
          }
        }));
      });
    }
  }

  setRotationSubscribe() {
		if (this.rotationList !== null && this.rotationList !== undefined) {
      this._rotationSubscribe = this.unSubscription(this._rotationSubscribe);
      if (this.rotation !== null) {
        this._rotationSubscribe.push(this.rotation.rotationSubscribe().subscribe((rot) => {
          if (this.object3d !== null) {
            this.object3d.rotation.copy(rot);
          }
        }));
      }
      this.rotationList.forEach(rotation => {
        this._rotationSubscribe.push(rotation.rotationSubscribe().subscribe((rot) => {
          if (this.object3d !== null) {
            this.object3d.rotation.copy(rot);
          }
        }));
      });
    }
  }

  setScaleSubscribe() {
		if (this.scaleList !== null && this.scaleList !== undefined) {
      this._scaleSubscribe = this.unSubscription(this._scaleSubscribe);
      if (this.scale !== null) {
        this._scaleSubscribe.push(this.scale.scaleSubscribe().subscribe((sca) => {
          if (this.object3d !== null) {
            this.object3d.scale.copy(sca);
          }
        }));
      }
      this.scaleList.forEach(scale => {
        this._scaleSubscribe.push(scale.scaleSubscribe().subscribe((sca) => {
          if (this.object3d !== null) {
            this.object3d.scale.copy(sca);
          }
        }));
      });
    }
  }

  setLookatSubscribe() {
		if (this.lookatList !== null && this.lookatList !== undefined) {
      this._lookatSubscribe = this.unSubscription(this._lookatSubscribe);
      if (this.lookat !== null) {
        this._lookatSubscribe.push(this.lookat.lookatSubscribe().subscribe((loat) => {
          if (this.object3d !== null) {
            this.object3d.lookAt(loat);
          }
        }));
      }
      this.lookatList.forEach(lookat => {
        this._lookatSubscribe.push(lookat.lookatSubscribe().subscribe((loat) => {
          if (this.object3d !== null) {
            this.object3d.lookAt(loat);
          }
        }));
      });
    }
  }

  private _controllerSubscribe: Subscription[] = [];
  private _positionSubscribe: Subscription[] = [];
  private _rotationSubscribe: Subscription[] = [];
  private _scaleSubscribe: Subscription[] = [];
  private _lookatSubscribe: Subscription[] = [];
  
	ngOnDestroy(): void {
		if (this.object3d != null) {
      if (this.object3d.parent !== null) {
        this.object3d.parent.remove(this.object3d);
        this.object3d.parent = null;
        this.object3d = null;
      }
		}
    this._controllerSubscribe = this.unSubscription(this._controllerSubscribe);
    this._positionSubscribe = this.unSubscription(this._positionSubscribe);
    this._rotationSubscribe = this.unSubscription(this._rotationSubscribe);
    this._scaleSubscribe = this.unSubscription(this._scaleSubscribe);
    this._lookatSubscribe = this.unSubscription(this._lookatSubscribe);
		super.ngOnDestroy();
	}

  unSubscription(subscriptions : Subscription[]) : Subscription[] {
    if (subscriptions !== null && subscriptions.length > 0) {
      subscriptions.forEach(subscription => {
        subscription.unsubscribe();
      })
    }
    return [];
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

  setPosition(x : number, y : number , z : number): this {
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

  addPosition(x : number, y : number , z : number): this {
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

  setScale(x : number, y : number , z : number): this {
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
		} else if (this.scaleList !== null && this.scaleList.length > 0) {
			return this.rotationList.first.getRotation();
		} else {
			return new THREE.Euler(0, 0, 0);
		}
	}

  setRotation(x : number, y : number , z : number): this {
    if (this.object3d !== null) {
      if (x === null) {
        x = this.object3d.rotation.x / Math.PI * 180;
      }
      if (y === null) {
        y = this.object3d.rotation.y / Math.PI * 180;
      }
      if (z === null) {
        z = this.object3d.rotation.z / Math.PI * 180;
      }
      const rotation = ThreeUtil.getEulerSafe(x, y, z);
      this.object3d.rotation.copy(rotation);
    }
    return this;
  }

  addRotation(x : number, y : number , z : number): this {
    if (this.object3d !== null) {
      x += this.object3d.rotation.x / Math.PI * 180;
      y += this.object3d.rotation.y / Math.PI * 180;
      z += this.object3d.rotation.z / Math.PI * 180;
      const rotation = ThreeUtil.getEulerSafe(x, y, z);
      this.object3d.rotation.copy(rotation);
    }
    return this;
  }

  setLookat(x : number, y : number , z : number): this {
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

  getObjectByName( name : string ): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectByName(name);
    }
    return null;
  }

  getObjectById( id : number ): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectById(id);
    }
    return null;
  }

  getObjectByProperty( name: string, value: string ): THREE.Object3D | undefined {
    if (this.object3d !== null) {
      return this.object3d.getObjectByProperty(name, value);
    }
    return null;
  }

	protected object3d: THREE.Object3D = null;

  getObject3D():THREE.Object3D{
    return this.object3d;
  }

  setObject3D(object3d : THREE.Object3D, add2Parent : boolean = true) {
    if (this.object3d !== object3d) {
      if (this.object3d !== null && this.object3d.parent !== null) {
        this.object3d.parent.remove(this.object3d);
      }
      this.object3d = object3d;
      if (this.object3d !== null) {
        this.object3d.name = this.name;
        this.object3d.visible = this.visible;
      }
      if (add2Parent && this.parent !== null && this.parent instanceof THREE.Object3D) {
        this.parent.add(this.object3d);
      }
    }
  }

  getObjectTop() : THREE.Object3D {
    let parent : THREE.Object3D = this.parent;
    while(parent.parent !== null) {
      parent = parent.parent;
    }
    return parent;
  }

	synkObject3D(synkTypes: string[]) {
		if (this.object3d !== null) {
			synkTypes.forEach((synkType) => {
				switch (synkType) {
					case 'position':
            if (this.position !== null && this.position.visible) {
                this.object3d.position.copy(this.position.getPosition());
            }
            if (this.positionList !== null && this.positionList !== undefined) {
              this.positionList.forEach((position) => {
                if (position.visible) {
                  this.object3d.position.copy(position.getPosition());
                }
              });
            }
						break;
					case 'rotation':
            if (this.rotation !== null && this.rotation.visible) {
              this.object3d.rotation.copy(this.rotation.getRotation());
            }
             if (this.rotationList !== null && this.rotationList !== undefined) {
              this.rotationList.forEach((rotation) => {
                if (rotation.visible) {
                  this.object3d.rotation.copy(rotation.getRotation());
                }
						  });
            }
						break;
					case 'scale':
            if (this.scale !== null && this.scale.visible) {
              this.object3d.scale.copy(this.scale.getScale());
            }
            if (this.scaleList !== null && this.scaleList !== undefined) {
              this.scaleList.forEach((scale) => {
                if (scale.visible) {
                  this.object3d.scale.copy(scale.getScale());
                }
						  });
            }
						break;
					case 'lookat':
            if (this.lookat !== null && this.lookat.visible) {
              this.object3d.lookAt(this.lookat.getLookAt());
            }
            if (this.lookatList !== null && this.lookatList !== undefined) {
              this.lookatList.forEach((lookat) => {
                if (lookat.visible) {
                  this.object3d.lookAt(lookat.getLookAt());
                }
						  });
            }
						break;
					case 'controller' :
            if (this.controllerList !== null && this.controllerList !== undefined) {
              this.controllerList.forEach((controller) => {
							  controller.setParent(this.object3d);
						  });
            }
						break;
				}
			});
		}
	}

}
