import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'ngx3js-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss'],
})
export class RotationComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * 
   */
  @Input() private refer: any = null;

  /**
   * The current value of the x component.
   */
  @Input() private x: number | string = 0;

  /**
   * The current value of the y component.
   */
  @Input() private y: number | string = 0;

  /**
   * The current value of the z component.
   */
  @Input() private z: number | string = 0;

  /**
   * The value type is radian. Default value is *false*.
   */
  @Input() private isRadian: boolean = false;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('rotation');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.rotation) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private rotation: THREE.Euler = null;

  private _object3d: THREE.Object3D = null;

  setObject3d(object3d: THREE.Object3D) {
    if (this.rotation === null) {
      this.getRotation();
    }
    if (ThreeUtil.isNotNull(object3d)) {
      this._object3d = object3d;
      this.synkObject3d(this.rotation);
    }
  }

  synkObject3d(rotation: THREE.Euler = null) {
    if (ThreeUtil.isNotNull(rotation) && this.enabled) {
      if (ThreeUtil.isNotNull(this._object3d)) {
        if (this.isIdEuals(this._object3d.userData.rotation)) {
          this._object3d.userData.rotation = this.id;
          this._object3d.rotation.copy(this.rotation);
        }
      } else {
        this.rotation.copy(rotation);
      }
    }
  }

  setRotation(x? : number, y? : number, z? : number) {
    if (this.rotation !== null) {
      this.x = ThreeUtil.getTypeSafe(x, this.rotation.x);
      this.y = ThreeUtil.getTypeSafe(y, this.rotation.y);
      this.z = ThreeUtil.getTypeSafe(z, this.rotation.z);
    } else {
      this.x = ThreeUtil.getTypeSafe(x, 0);
      this.y = ThreeUtil.getTypeSafe(y, 0);
      this.z = ThreeUtil.getTypeSafe(z, 0);
    }
    this.isRadian = false;
    this.needUpdate = true;
  }

  getTagAttribute(options?: any): TagAttributes {
    const tagAttributes: TagAttributes = {
      tag: 'ngx3js-rotation',
      attributes: [],
    };
    if (ThreeUtil.isNotNull(options.rotation)) {
      tagAttributes.attributes.push({ name: 'x', value: ThreeUtil.getRadian2AngleSafe(options.rotation.x) });
      tagAttributes.attributes.push({ name: 'y', value: ThreeUtil.getRadian2AngleSafe(options.rotation.y) });
      tagAttributes.attributes.push({ name: 'z', value: ThreeUtil.getRadian2AngleSafe(options.rotation.z) });
    } else {
      tagAttributes.attributes.push({ name: 'x', value: this.x });
      tagAttributes.attributes.push({ name: 'y', value: this.y });
      tagAttributes.attributes.push({ name: 'z', value: this.z });
    }
    return tagAttributes;
  }

  protected applyChanges(changes: string[]) {
    if (this.rotation !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getRotation();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init','type','enabled'])) {
        this.needUpdate = true;
        return;
      }
      super.applyChanges(changes);
    }
  }

  private _getRotation(): THREE.Euler {
    let rotation : THREE.Euler = null;
    if (ThreeUtil.isNotNull(this.refer)) {
      rotation = ThreeUtil.getRotation(this.refer);
    }
    if (rotation === null) {
      if (this.isRadian && typeof this.x === 'number' && typeof this.y === 'number' && typeof this.z === 'number') {
        rotation = new THREE.Euler(this.x, this.y, this.z);
      } else {
        rotation = ThreeUtil.getEulerSafe(this.x, this.y, this.z, null, true);
      }
    }
    return rotation;
  }

  getRotation(): THREE.Euler {
    if (this.rotation === null || this._needUpdate) {
      this.needUpdate = false;
      this.rotation = this._getRotation();
      this.synkObject3d(this.rotation);
      this.setObject(this.rotation);
    }
    return this.rotation;
  }
}
