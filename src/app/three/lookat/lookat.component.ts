import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * LookatComponent
 * 
 * vector - A vector representing a position in world space.<br /><br />
 * Optionally, the [page:.x x], [page:.y y] and [page:.z z] components of the world space position.<br /><br />
 * 
 * Rotates the object to face a point in world space.<br /><br />
 * 
 * This method does not support objects having non-uniformly-scaled parent(s).
 * 
 * @see THREE.Object3D.lookAt
 */
@Component({
  selector: 'ngx3js-lookat',
  templateUrl: './lookat.component.html',
  styleUrls: ['./lookat.component.scss'],
})
export class LookatComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * Input  of lookat component
   */
  @Input() private refer: any = null;

  /**
   * The current value of the x component. Default value is *0*.
   */
  @Input() private x: number = 0;

  /**
   * The current value of the y component. Default value is *0*.
   */
  @Input() private y: number = 0;

  /**
   * The current value of the z component. Default value is *0*.
   */
  @Input() private z: number = 0;

  /**
   * Creates an instance of lookat component.
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
    super.ngOnInit('lookat');
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
    if (changes && this.lookat) {
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
   * Lookat  of lookat component
   */
  private lookat: THREE.Vector3 = null;

  /**
   * Object3d  of lookat component
   */
  private _object3d: THREE.Object3D = null;

  /**
   * Sets object3d
   * @param object3d
   */
  public setObject3d(object3d: THREE.Object3D) {
    if (this.lookat === null) {
      this.getLookAt();
    }
    if (ThreeUtil.isNotNull(object3d)) {
      this._object3d = object3d;
      this.synkObject3d(this.lookat);
    }
  }

  /**
   * Synks object3d
   * @param [lookat]
   */
  public synkObject3d(lookat: THREE.Vector3 = null) {
    if (ThreeUtil.isNotNull(lookat) && this.enabled) {
      if (ThreeUtil.isNotNull(this._object3d)) {
        if (this.isIdEuals(this._object3d.userData.lookat)) {
          this._object3d.userData.lookat = this.id;
          this._object3d.lookAt(this.lookat);
          this._object3d.updateMatrixWorld();
        }
      } else {
        this.lookat.copy(lookat);
      }
    }
  }

  /**
   * Sets scale
   * @param [x]
   * @param [y]
   * @param [z]
   */
  public setScale(x?: number, y?: number, z?: number) {
    if (this.lookat !== null) {
      this.x = ThreeUtil.getTypeSafe(x, this.lookat.x);
      this.y = ThreeUtil.getTypeSafe(y, this.lookat.y);
      this.z = ThreeUtil.getTypeSafe(z, this.lookat.z);
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
      tag: 'ngx3js-lookat',
      attributes: [],
    };
    if (ThreeUtil.isNotNull(options.lookat)) {
      tagAttributes.attributes.push({ name: 'x', value: options.lookat.x });
      tagAttributes.attributes.push({ name: 'y', value: options.lookat.y });
      tagAttributes.attributes.push({ name: 'z', value: options.lookat.z });
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
    if (this.lookat !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getLookAt();
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
   * Gets look at
   * @returns look at
   */
  private _getLookAt(): THREE.Vector3 {
    let lookat: THREE.Vector3 = null;
    if (this.refer !== null) {
      this.unSubscribeRefer('refer');
      lookat = ThreeUtil.getLookAt(this.refer);
      this.subscribeRefer(
        'refer',
        ThreeUtil.getSubscribe(
          this.refer,
          () => {
            this.needUpdate = true;
          },
          'lookat'
        )
      );
    }
    if (lookat === null) {
      lookat = ThreeUtil.getVector3Safe(this.x, this.y, this.z, null, null, true);
    }
    return lookat;
  }

  /**
   * Gets look at
   * @returns look at
   */
  public getLookAt(): THREE.Vector3 {
    if (this._needUpdate) {
      this.needUpdate = false;
      this.lookat = this._getLookAt();
      this.synkObject3d(this.lookat);
      this.setObject(this.lookat);
    }
    return this.lookat;
  }
}
