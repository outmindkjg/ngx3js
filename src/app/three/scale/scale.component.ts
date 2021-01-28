import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';
import { AbstractSvgGeometry } from '../interface';

@Component({
  selector: 'three-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() refer: any = null;
  @Input() x: number = 1;
  @Input() y: number = 1;
  @Input() z: number = 1;
  @Input() scaleMode: string = "max";

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z) {
      this.scale = null;
    }
    this.resetScale();
  }

  private scale: THREE.Vector3 = null;
  private refObject3d: THREE.Object3D | AbstractSvgGeometry = null;

  setObject3D(refObject3d: THREE.Object3D | AbstractSvgGeometry, isRestore: boolean = false) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (isRestore && this.refObject3d !== null && this.refObject3d instanceof THREE.Object3D) {
        this.scale = null;
        this.x = this.refObject3d.scale.x;
        this.y = this.refObject3d.scale.y;
        this.z = this.refObject3d.scale.z;
      }
      this.resetScale();
    }
  }

  resetScale() {
    if (this.refObject3d !== null && this.visible) {
      if (this.refObject3d instanceof THREE.Object3D) {
        this.refObject3d.scale.copy(this.getScale())
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshScales.forEach(scale => {
          scale.copy(this.getScale());
        });
      }
    }
  }

  _sizeSubscribe: Subscription = null;

  getScale(): THREE.Vector3 {
    if (this.scale === null) {
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.sizeSubscribe) {
          this.scale = new THREE.Vector3(1, 1, 1);
          this._sizeSubscribe = this.refer.sizeSubscribe().subscribe((v: THREE.Vector2) => {
            switch (this.scaleMode) {
              case "max":
                const maxSize = Math.max(v.x, v.y);
                this.scale = new THREE.Vector3(maxSize * this.x, maxSize * this.y, this.z);
                break;
              case "min":
                const minSize = Math.min(v.x, v.y);
                this.scale = new THREE.Vector3(minSize * this.x, minSize * this.y, this.z);
                break;
              default:
                this.scale = new THREE.Vector3(v.x * this.x, v.y * this.y, this.z);
                break;
            }
            this.resetScale();
            this._sizeSubscribe.unsubscribe();
          });
        } else if (this.refer.getScale) {
          this.scale = this.refer.getScale();
        } else if (this.refer instanceof THREE.Vector3) {
          this.scale = this.refer;
        }
      }
      if (this.scale === null) {
        if (this._sizeSubscribe !== null) {
          this._sizeSubscribe.unsubscribe();
        }
        this.scale = new THREE.Vector3(this.x, this.y, this.z);
      }
    }
    return this.scale;
  }

}
