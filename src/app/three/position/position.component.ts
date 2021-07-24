import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractTweenComponent } from '../tween.abstract';

/**
 * PositionComponent
 */
@Component({
  selector: 'ngx3js-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent extends AbstractTweenComponent implements OnInit {
  /**
   * Input  of position component
   */
  @Input() public type: string = 'position';

  /**
   * Input  of position component
   */
  @Input() private refer: any = null;

  /**
   * The current value of the x component.
   */
  @Input() private x: number = null;

  /**
   * The current value of the y component.
   */
  @Input() private y: number = null;

  /**
   * The current value of the z component.
   */
  @Input() private z: number = null;

  /**
   * Multiplies this vector by scalar [page:Float s].
   */
  @Input() private multiply: number = null;

  /**
   * Converts this vector to a [link:https://en.wikipedia.org/wiki/Unit_vector unit vector] - that is, sets it equal to a vector with the same direction
   * as this one, but [page:.length length] 1.
   */
  @Input() private normalize: boolean = false;

  /**
   * Input  of position component
   */
  @Input() public camera: any = null;

  /**
   * Input  of position component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() public setfrom: string = null;

  /**
   * Input  of position component
   */
  @Input() public radius: number = null;

  /**
   * Input  of position component
   */
  @Input() public phi: number = null;

  /**
   * Input  of position component
   */
  @Input() public theta: number = null;

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('position');
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
    if (changes && this.position) {
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
   * Position  of position component
   */
  private position: THREE.Vector3 = null;

  /**
   * Object3d  of position component
   */
  private _object3d: THREE.Object3D = null;

  /**
   * Sets object3d
   * @param object3d 
   */
  public setObject3d(object3d: THREE.Object3D) {
    if (this.position === null) {
      this.getPosition();
    }
    if (ThreeUtil.isNotNull(object3d)) {
      this._object3d = object3d;
      this.synkObject3d(this.position);
    }
  }

  /**
   * Synks object3d
   * @param [position] 
   */
  synkObject3d(position: THREE.Vector3 = null) {
    if (ThreeUtil.isNotNull(position) && this.enabled) {
      if (ThreeUtil.isNotNull(this._object3d)) {
        let idKey = 'position';
        let targetPosition: THREE.Vector3 = null;
        switch (this.type.toLowerCase()) {
          case 'up':
            idKey = 'positionUp';
            targetPosition = this._object3d.up;
            break;
          case 'lookat':
            idKey = 'positionLookat';
            targetPosition = this.position.clone();
            break;
          default:
            idKey = 'position';
            targetPosition = this._object3d.position;
            break;
        }
        if (this.isIdEuals(this._object3d.userData[idKey])) {
          this._object3d.userData[idKey] = this.id;
          targetPosition.copy(position);
          if (idKey === 'positionLookat') {
            this._object3d.lookAt(position);
          }
        }
      } else {
        this.position.copy(position);
      }
    }
  }

  /**
   * Sets position
   * @param [x] 
   * @param [y] 
   * @param [z] 
   */
  public setPosition(x?: number, y?: number, z?: number) {
    if (this.position !== null) {
      this.x = ThreeUtil.getTypeSafe(x, this.position.x);
      this.y = ThreeUtil.getTypeSafe(y, this.position.y);
      this.z = ThreeUtil.getTypeSafe(z, this.position.z);
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
      tag: 'ngx3js-position',
      attributes: [],
    };
    if (ThreeUtil.isNotNull(options.position)) {
      tagAttributes.attributes.push({ name: 'x', value: options.position.x });
      tagAttributes.attributes.push({ name: 'y', value: options.position.y });
      tagAttributes.attributes.push({ name: 'z', value: options.position.z });
    } else {
      tagAttributes.attributes.push({ name: 'x', value: this.x });
      tagAttributes.attributes.push({ name: 'y', value: this.y });
      tagAttributes.attributes.push({ name: 'z', value: this.z });
    }
    return tagAttributes;
  }

  /**
   * Last ref camera of position component
   */
  private _lastRefCamera: THREE.Camera = null;

  /**
   * Last ref camera bind of position component
   */
  private _lastRefCameraBind: any = null;

  /**
   * Applys changes
   * @param changes 
   * @returns  
   */
  protected applyChanges(changes: string[]) {
    if (this.position !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getPosition();
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
   * Gets position
   * @returns position 
   */
  private _getPosition(): THREE.Vector3 {
    let position: THREE.Vector3 = null;
    if (this.refer !== null && this.refer !== undefined) {
      position = ThreeUtil.getPosition(this.refer);
    }
    if (position === null) {
      position = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(0, 0, 0));
      if (ThreeUtil.isNotNull(this.setfrom)) {
        switch (this.setfrom.toLowerCase()) {
          case 'spherical':
          case 'sphericalcoords':
            position.setFromSphericalCoords(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getAngleSafe(this.phi, 0), ThreeUtil.getAngleSafe(this.theta, 0));
            break;
          case 'cylindrical':
          case 'cylindricalcoords':
            position.setFromCylindricalCoords(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getAngleSafe(this.phi, 0), ThreeUtil.getTypeSafe(this.y, 0));
            break;
        }
      }
      if (this.normalize) {
        position.normalize();
      }
      if (this.multiply !== null) {
        position.multiplyScalar(this.multiply);
      }
      if (this.camera !== null) {
        const camera: THREE.Camera = ThreeUtil.isNotNull(this.camera.getCamera) ? this.camera.getObject3d() : this.camera;
        if (camera !== null) {
          if (this._lastRefCamera !== camera) {
            if (this._lastRefCameraBind === null) {
              this._lastRefCameraBind = (e) => {
                this.needUpdate = true;
                this.position = null;
                window.setTimeout(() => {
                  if (this.position === null) {
                    this.getPosition();
                  }
                }, 10);
              };
            }
            if (this._lastRefCamera !== null) {
              camera.removeEventListener('change', this._lastRefCameraBind);
            }
            camera.addEventListener('change', this._lastRefCameraBind);
            this._lastRefCamera = camera;
          }
          if (camera instanceof THREE.OrthographicCamera) {
            position.x = ((camera.right - camera.left) / 2) * position.x + (camera.right + camera.left) / 2;
            position.y = ((camera.top - camera.bottom) / 2) * position.y + (camera.top + camera.bottom) / 2;
            position.applyQuaternion(camera.quaternion);
          }
        }
      }
    }
    return position;
  }

  /**
   * Gets position
   * @returns position 
   */
  public getPosition(): THREE.Vector3 {
    if (this.position === null || this._needUpdate) {
      this.needUpdate = false;
      this.position = this._getPosition();
      this.synkObject3d(this.position);
      this.setObject(this.position);
    }
    return this.position;
  }
}
