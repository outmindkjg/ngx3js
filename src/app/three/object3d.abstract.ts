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
	@ContentChildren(ControllerComponent, { descendants: false }) public controller: QueryList<ControllerComponent>;
	@ContentChildren(PositionComponent, { descendants: false }) private position: QueryList<PositionComponent>;
	@ContentChildren(RotationComponent, { descendants: false }) private rotation: QueryList<RotationComponent>;
	@ContentChildren(ScaleComponent, { descendants: false }) private scale: QueryList<ScaleComponent>;
	@ContentChildren(LookatComponent, { descendants: false }) private lookat: QueryList<LookatComponent>;

	ngOnInit(): void {
		super.ngOnInit();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes) {
			if (this.object3d) {
				if (changes.visible) {
					this.object3d.visible = this.visible;
				}
			}
		}
		super.ngOnChanges(changes);
	}

	ngAfterContentInit(): void {
		if (this.controller !== null && this.controller !== undefined) {
			this.controller.changes.subscribe((e) => {
				this.synkObject3D(['controller']);
			});
		}
		super.ngAfterContentInit();
	}

	ngOnDestroy(): void {
		if (this.object3d != null) {
      if (this.object3d.parent !== null) {
        this.object3d.parent.remove(this.object3d);
        this.object3d = null;
      }
		}
		super.ngOnDestroy();
	}

	getPosition(): THREE.Vector3 {
		if (this.object3d !== null) {
      return this.object3d.position;
		} else if (this.position !== null && this.position.length > 0) {
      return this.position.first.getPosition();
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

	getScale(): THREE.Vector3 {
		if (this.object3d !== null) {
			return this.object3d.scale;
		} else if (this.scale !== null && this.scale.length > 0) {
			return this.scale.first.getScale();
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

	getRotation(): THREE.Euler {
		if (this.object3d !== null) {
			return this.object3d.rotation;
		} else if (this.scale !== null && this.scale.length > 0) {
			return this.rotation.first.getRotation();
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
      this.object3d.lookAt(position);
    }
    return this;
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

  setObject3D(object3d : THREE.Object3D) {
    if (this.object3d !== object3d) {
      if (this.object3d !== null && this.object3d.parent !== null) {
        this.object3d.parent.remove(this.object3d);
      }
      this.object3d = object3d;
      if (this.object3d !== null) {
        this.object3d.name = this.name;
        this.object3d.visible = this.visible;
      }
      if (this.parent !== null && this.parent instanceof THREE.Object3D) {
        this.parent.add(this.object3d);
      }
    }
  }

	synkObject3D(synkTypes: string[]) {
		if (this.object3d !== null) {
			synkTypes.forEach((synkType) => {
				switch (synkType) {
					case 'position':
						this.position.forEach((position) => {
							position.setParent(this.object3d);
						});
						break;
					case 'rotation':
						this.rotation.forEach((rotation) => {
							rotation.setParent(this.object3d);
						});
						break;
					case 'scale':
						this.scale.forEach((scale) => {
							scale.setParent(this.object3d);
						});
						break;
					case 'lookat':
						this.lookat.forEach((lookat) => {
							lookat.setParent(this.object3d);
						});
						break;
					case 'controller' :
						this.controller.forEach((controller) => {
							controller.setParent(this.object3d);
						});
						break;
				}
			});
		}
	}

}
