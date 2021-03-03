import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  @Input() public visible:boolean = true;
  @Input() private refer:any = null;
  @Input() private referRef:boolean = true;
  @Input() private x:number = null;
  @Input() private y:number = null;
  @Input() private z:number = null;
  @Input() private scaleMode:string = "max";
  @Output() private onLoad:EventEmitter<ScaleComponent> = new EventEmitter<ScaleComponent>();

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
  private parent: THREE.Object3D | any = null;

  setParent(parent: THREE.Object3D | any, isRestore: boolean = false) : boolean {
    if (this.parent !== parent) {
      this.parent = parent;
      if (isRestore && this.parent !== null && this.parent instanceof THREE.Object3D) {
        this.scale = null;
        this.x = this.parent.scale.x;
        this.y = this.parent.scale.y;
        this.z = this.parent.scale.z;
      }
      this.resetScale();
      return true;
    }
    return false;
  }

  resetScale() {
    if (this.parent !== null && this.visible) {
      if (this._scaleSubscribe !== null) {
        this._scaleSubscribe.unsubscribe();
        this._scaleSubscribe = null;
      }
      if (this._sizeSubscribe !== null) {
        this._sizeSubscribe.unsubscribe();
        this._sizeSubscribe = null;
      }
      if (this.parent instanceof THREE.Object3D) {
        this.parent.scale.copy(this.getScale())
        if (this.refer !== null && this.referRef) {
          if (this.refer.sizeSubscribe) {
            this._scaleSubscribe = this.refer.sizeSubscribe().subscribe(size => {
              if (this.parent instanceof THREE.Object3D && this.visible) {
                this.parent.scale.copy(this.getScaleFromSize(size));
              }
            })
          } else if (this.refer.scaleSubscribe) {
            this._scaleSubscribe = this.refer.scaleSubscribe().subscribe(scale => {
              if (this.parent instanceof THREE.Object3D && this.visible) {
                this.parent.scale.copy(scale);
              }
            })
          }
        }
      } else if (this.parent.meshScales) {
        this.parent.meshScales.forEach(scale => {
          scale.copy(this.getScale());
        });
      }
    }
  }

  private _sizeSubscribe: Subscription = null;
  private _scaleSubscribe: Subscription = null;

  private _scaleSubject:Subject<THREE.Vector3> = new Subject<THREE.Vector3>();

  scaleSubscribe() : Observable<THREE.Vector3>{
    if (this.scale === null) {
      this.scale = this.getScale();
    }
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
      if (this.visible) {
        this._scaleSubject.next(this.scale);
      }
      this.onLoad.emit(this);
    }
    return this.scale;
  }

}
