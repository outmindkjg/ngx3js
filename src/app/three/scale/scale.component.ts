import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * ScaleComponent
 */
@Component({
  selector: 'ngx3js-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss'],
})
export class ScaleComponent extends AbstractSubscribeComponent implements OnInit {

  /**
   * Input  of scale component
   */
  @Input() private refer: any = null;

  /**
   * The current value of the x component. Default value is *1*.
   */
  @Input() private x: number = 1;

  /**
   * The current value of the y component. Default value is *1*.
   */
  @Input() private y: number = 1;

  /**
   * The current value of the z component. Default value is *1*.
   */
  @Input() private z: number = 1;

  /**
   * Multiplies this vector by scalar [page:Float s].
   */
  @Input() private multiply: number = null;

  /**
   * Input  of scale component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private scaleMode: string = 'max';

  /**
   * Creates an instance of scale component.
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
    super.ngOnInit('scale');
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
    if (changes && this.scale) {
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
   * Scale  of scale component
   */
  private scale: THREE.Vector3 = null;

  /**
   * Object3d  of scale component
   */
  private _object3d: THREE.Object3D = null;

  /**
   * Sets object3d
   * @param object3d 
   */
  public setObject3d(object3d: THREE.Object3D) {
    if (this.scale === null) {
      this.getScale();
    }
    if (ThreeUtil.isNotNull(object3d)) {
      this._object3d = object3d;
      this.synkObject3d(this.scale);
    }
  }

  /**
   * Synks object3d
   * @param [rotation] 
   */
  public synkObject3d(rotation: THREE.Vector3 = null) {
    if (ThreeUtil.isNotNull(rotation) && this.enabled) {
      if (ThreeUtil.isNotNull(this._object3d)) {
        if (this.isIdEuals(this._object3d.userData.scale)) {
          this._object3d.userData.scale = this.id;
          this._object3d.scale.copy(this.scale);
        }
      } else {
        this.scale.copy(rotation);
      }
    }
  }

  /**
   * Sets scale
   * @param [x] 
   * @param [y] 
   * @param [z] 
   */
  public setScale(x?: number, y? : number, z? : number) {
    if (this.scale !== null) {
      this.x = ThreeUtil.getTypeSafe(x, this.scale.x);
      this.y = ThreeUtil.getTypeSafe(y, this.scale.y);
      this.z = ThreeUtil.getTypeSafe(z, this.scale.z);
    } else {
      this.x = ThreeUtil.getTypeSafe(x, 0);
      this.y = ThreeUtil.getTypeSafe(y, 0);
      this.z = ThreeUtil.getTypeSafe(z, 0);
    }
    this.needUpdate = true;
  }

  /**
   * Gets tag attribute
   * @param [options] 
   * @returns tag attribute 
   */
  public getTagAttribute(options?: any): TagAttributes {
    const tagAttributes: TagAttributes = {
      tag: 'ngx3js-scale',
      attributes: [],
    };
    if (ThreeUtil.isNotNull(options.scale)) {
      tagAttributes.attributes.push({ name: 'x', value: options.scale.x });
      tagAttributes.attributes.push({ name: 'y', value: options.scale.y });
      tagAttributes.attributes.push({ name: 'z', value: options.scale.z });
    } else {
      tagAttributes.attributes.push({ name: 'x', value: this.x });
      tagAttributes.attributes.push({ name: 'y', value: this.y });
      tagAttributes.attributes.push({ name: 'z', value: this.z });
    }
    return tagAttributes;
  }

  /**
   * Gets scale from size
   * @param size 
   * @returns scale from size 
   */
  private getScaleFromSize(size: THREE.Vector2): THREE.Vector3 {
    switch (this.scaleMode) {
      case 'max':
        const maxSize = Math.max(size.x, size.y);
        return new THREE.Vector3(maxSize * this.x, maxSize * this.y, this.z);
      case 'min':
        const minSize = Math.min(size.x, size.y);
        return new THREE.Vector3(minSize * this.x, minSize * this.y, this.z);
      default:
        return new THREE.Vector3(size.x * this.x, size.y * this.y, this.z);
    }
  }

  /**
   * Applys changes
   * @param changes 
   * @returns  
   */
  protected applyChanges(changes: string[]) {
    if (this.scale !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getScale();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['init','type','enabled'])) {
        this.needUpdate = true;
        return ;
      }
      super.applyChanges(changes);
    }
  }

  /**
   * Gets scale
   * @returns scale 
   */
  private _getScale(): THREE.Vector3 {
    let scale : THREE.Vector3 = null;
    if (this.refer !== null && this.refer !== undefined) {
      if (this.refer.getSize) {
        scale = this.getScaleFromSize(this.refer.getSize());
      } else {
        scale = ThreeUtil.getScale(this.refer);
      }
    }
    if (scale === null) {
      scale = ThreeUtil.getVector3Safe(this.x, this.y, this.z, null, null, true);
    }
    if (ThreeUtil.isNotNull(this.multiply)) {
      scale.multiplyScalar(this.multiply);
    }
    return scale;
  }

  /**
   * Gets scale
   * @returns scale 
   */
  public getScale(): THREE.Vector3 {
    if (this.scale === null || this._needUpdate) {
      this.needUpdate = false;
      this.scale = this._getScale();
      this.synkObject3d(this.scale);
      this.setObject(this.scale);
    }
    return this.scale;
  }
}
