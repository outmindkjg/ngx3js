import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { AbstractSvgGeometry, ThreeUtil } from '../interface';

@Component({
  selector: 'three-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() refer: any = null;
  @Input() referRef: boolean = true;
  @Input() x: number = null;
  @Input() y: number = null;
  @Input() z: number = null;
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
      if (this._scaleSubscribe !== null) {
        this._scaleSubscribe.unsubscribe();
        this._scaleSubscribe = null;
      }
      if (this._sizeSubscribe !== null) {
        this._sizeSubscribe.unsubscribe();
        this._sizeSubscribe = null;
      }
      if (this.refObject3d instanceof THREE.Object3D) {
        this.refObject3d.scale.copy(this.getScale())
        if (this.refer !== null && this.referRef) {
          if (this.refer.sizeSubscribe) {
            this._scaleSubscribe = this.refer.sizeSubscribe().subscribe(size => {
              if (this.refObject3d instanceof THREE.Object3D && this.visible) {
                this.refObject3d.scale.copy(this.getScaleFromSize(size));
              }
            })
          } else if (this.refer.scaleSubscribe) {
            this._scaleSubscribe = this.refer.scaleSubscribe().subscribe(scale => {
              if (this.refObject3d instanceof THREE.Object3D && this.visible) {
                this.refObject3d.scale.copy(scale);
              }
            })
          }
        }
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshScales.forEach(scale => {
          scale.copy(this.getScale());
        });
      }
    }
  }

  private _sizeSubscribe: Subscription = null;
  private _scaleSubscribe: Subscription = null;

  private _scaleSubject:Subject<THREE.Vector3> = new Subject<THREE.Vector3>();

  scaleSubscribe() : Observable<THREE.Vector3>{
    return this._scaleSubject.asObservable();
  }

  private getScaleFromSize( size: THREE.Vector2) : THREE.Vector3 {
    switch (this.scaleMode) {
      case "max":
        const maxSize = Math.max(size.x, size.y);
        return new THREE.Vector3(maxSize * this.x, maxSize * this.y, this.z);
      case "min":
        const minSize = Math.min(size.x, size.y);
        return new THREE.Vector3(minSize * this.x, minSize * this.y, this.z);
      default:
        return new THREE.Vector3(size.x * this.x, size.y * this.y, this.z);
    }
  }

  getScale(): THREE.Vector3 {
    if (this.scale === null) {
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getSize) {
          this.scale = this.getScaleFromSize(this.refer.getSize());
        } else if (this.refer.getScale) {
          this.scale = this.refer.getScale();
        } else if (this.refer instanceof THREE.Vector3) {
          this.scale = this.refer;
        }
      }
      if (this.scale === null) {
        this.scale = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(this.x, this.y, this.z));
      }
      this._scaleSubject.next(this.scale);
    }
    return this.scale;
  }

}
