import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { AbstractTweenComponent } from '../tween.abstract';

@Component({
  selector: 'three-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss'],
})
export class PositionComponent extends AbstractTweenComponent implements OnInit {
  @Input() public type: string = 'position';
  @Input() private refer: any = null;
  @Input() private x: number = null;
  @Input() private y: number = null;
  @Input() private z: number = null;
  @Input() private multiply: number = null;
  @Input() private normalize: boolean = false;
  @Input() public camera: any = null;

  ngOnInit(): void {
    super.ngOnInit('position');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.position) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private position: THREE.Vector3 = null;

  private _object3d: THREE.Object3D = null;

  setObject3d(object3d: THREE.Object3D) {
    if (ThreeUtil.isNotNull(object3d)) {
      this.getPosition();
      this._object3d = object3d;
      this.synkObject3d(this._getPosition());
    } else {
      this.synkObject3d(this.position);
    }
  }

  synkObject3d(position: THREE.Vector3 = null) {
    if (ThreeUtil.isNotNull(position) && this.enabled) {
      if (ThreeUtil.isNotNull(this._object3d)) {
        let idKey = 'position';
        switch (this.type.toLowerCase()) {
          case 'up':
            idKey = 'positionUp';
            this.position = this._object3d.up;
            break;
          case 'lookat':
            idKey = 'positionLookat';
            this.position = this.position.clone();
            break;
          default:
            idKey = 'position';
            this.position = this._object3d.position;
            break;
        }
        if (this.isIdEuals(this._object3d.userData[idKey])) {
          this._object3d.userData[idKey] = this.id;
          this.position.copy(position);
          if (idKey === 'positionLookat') {
            this._object3d.lookAt(this.position);
          }
        }
      } else {
        this.position.copy(position);
      }
    }
  }

  setPosition(x: number, y?: number, z?: number) {
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

  getTagAttribute(options?: any): TagAttributes {
    const tagAttributes: TagAttributes = {
      tag: 'three-position',
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

  _lastRefCamera: THREE.Camera = null;
  _lastRefCameraBind: any = null;

  protected applyChanges(changes: string[]) {
    if (this.position !== null) {
      if (ThreeUtil.isIndexOf(changes, 'enabled')) {
        this.setSubscribeNext('position');
      }
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getPosition();
        return;
      }
      if (!ThreeUtil.isIndexOf(changes, ['init'])) {
        this.needUpdate = true;
        return;
      }
      super.applyChanges(changes);
    }
  }

  _getPosition(): THREE.Vector3 {
    let position: THREE.Vector3 = null;
    if (this.refer !== null && this.refer !== undefined) {
      position = ThreeUtil.getPosition(this.refer);
    }
    if (position === null) {
      position = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(0, 0, 0));
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
                setTimeout(() => {
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

  getPosition(): THREE.Vector3 {
    if (this.position === null) {
      this.position = new THREE.Vector3();
    }
    if (this._needUpdate) {
      this.needUpdate = false;
      const position = this._getPosition();
      if (ThreeUtil.isNotNull(position)) {
        this.synkObject3d(position);
        this.setObject(position);
      }
    }
    return this.position;
  }
}
