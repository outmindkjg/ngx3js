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

  @Output() private onLoad: EventEmitter<PositionComponent> = new EventEmitter<PositionComponent>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer || changes.multiply) {
      this.needUpdate = true;
    }
    super.ngOnChanges(changes);
  }

  private position: THREE.Vector3 = null;
  private _needUpdate: boolean = true;
  set needUpdate(value : boolean) {
    if (value && this.position !== null) {
      this._needUpdate = true;
      this.getPosition();
    }
  }

  setPosition(position: THREE.Vector3 | number, y? : number, z? : number) {
    if (position instanceof THREE.Vector3) {
      if (this.position !== position && ThreeUtil.isNotNull(position)) {
        if (this.position !== null) {
          position.copy(this.position);
          this.position = position;
        } else {
          this.position = position;
          this._needUpdate = true;
          this.getPosition();
        }
      }
    } else if (this.position !== null){
      this.x = ThreeUtil.getTypeSafe(position, this.position.x);
      this.y = ThreeUtil.getTypeSafe(y, this.position.y);
      this.z = ThreeUtil.getTypeSafe(z, this.position.z);
      this.needUpdate = true;
    }
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
  getPosition(): THREE.Vector3 {
    if (this.position === null) {
      this.position = new THREE.Vector3();
    }
    if (this._needUpdate) {
      this._needUpdate = false;
      let position : THREE.Vector3 = null;
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
          const camera: THREE.Camera = ThreeUtil.isNotNull(this.camera.getCamera) ? this.camera.getCamera() : this.camera;
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
      if (ThreeUtil.isNotNull(position)) {
        this.position.copy(position);
        this.setSubscribeNext('position');
        this.onLoad.emit(this);
      }
    }
    return this.position;
  }
}
