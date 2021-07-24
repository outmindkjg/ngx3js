import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * RotationComponent
 */
@Component({
  selector: 'ngx3js-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss'],
})
export class RotationComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of rotation component
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

  /**
   * Creates an instance of rotation component.
   */
  constructor() {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('rotation');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
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
    if (changes && this.rotation) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  /**
   * Rotation  of rotation component
   */
  private rotation: THREE.Euler = null;

  /**
   * Object3d  of rotation component
   */
  private _object3d: THREE.Object3D = null;

  /**
   * Sets object3d
   * @param object3d
   */
  public setObject3d(object3d: THREE.Object3D) {
    if (this.rotation === null) {
      this.getRotation();
    }
    if (ThreeUtil.isNotNull(object3d)) {
      this._object3d = object3d;
      this.synkObject3d(this.rotation);
    }
  }

  /**
   * Synks object3d
   * @param [rotation]
   */
  public synkObject3d(rotation: THREE.Euler = null) {
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

  /**
   * Sets rotation
   * @param [x]
   * @param [y]
   * @param [z]
   */
  public setRotation(x?: number, y?: number, z?: number) {
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

  /**
   * Gets tag attribute
   * @param [options]
   * @returns tag attribute
   */
  public getTagAttribute(options?: any): TagAttributes {
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

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  protected applyChanges(changes: string[]) {
    if (this.rotation !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getRotation();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init', 'type', 'enabled'])) {
        this.needUpdate = true;
        return;
      }
      super.applyChanges(changes);
    }
  }

  /**
   * Gets rotation
   * @returns rotation
   */
  private _getRotation(): THREE.Euler {
    let rotation: THREE.Euler = null;
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

  /**
   * Gets rotation
   * @returns rotation
   */
  public getRotation(): THREE.Euler {
    if (this.rotation === null || this._needUpdate) {
      this.needUpdate = false;
      this.rotation = this._getRotation();
      this.synkObject3d(this.rotation);
      this.setObject(this.rotation);
    }
    return this.rotation;
  }
}
