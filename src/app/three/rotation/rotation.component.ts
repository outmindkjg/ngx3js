import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { AbstractSvgGeometry, ThreeUtil } from '../interface';

@Component({
  selector: 'three-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {

  @Input() visible : boolean = true;
  @Input() refer: any = null;
  @Input() referRef: boolean = true;
  @Input() x : number = 0;
  @Input() y : number = 0;
  @Input() z : number = 0;
 
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer) {
      this.rotation = null;
    }
    this.resetRotation();
  }

  private rotation : THREE.Euler = null;
  private refObject3d : THREE.Object3D | AbstractSvgGeometry = null;

  setObject3D(refObject3d : THREE.Object3D | AbstractSvgGeometry , isRestore : boolean = false){
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (isRestore && this.refObject3d !== null && this.refObject3d instanceof THREE.Object3D) {
        this.rotation = null;
        this.x = this.refObject3d.rotation.x;
        this.y = this.refObject3d.rotation.y;
        this.z = this.refObject3d.rotation.z;
      }
      this.resetRotation();
    }
  }
 
  private _rotationSubscribe: Subscription = null;

  private _rotationSubject:Subject<THREE.Euler> = new Subject<THREE.Euler>();

  rotationSubscribe() : Observable<THREE.Euler>{
    return this._rotationSubject.asObservable();
  }

  resetRotation() {
    if (this.refObject3d !== null && this.visible) {
      if (this.refObject3d instanceof THREE.Object3D) {
        if (this._rotationSubscribe !== null) {
          this._rotationSubscribe.unsubscribe();
          this._rotationSubscribe = null;
        }
        this.refObject3d.rotation.copy(this.getRotation())
        if (this.refer !== null && this.referRef && this.refer.rotationSubscribe) {
          this._rotationSubscribe = this.refer.rotationSubscribe().subscribe(rotation => {
            if (this.refObject3d instanceof THREE.Object3D && this.visible) {
              this.refObject3d.rotation.copy(rotation);
            }
          })
        }
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshRotations.forEach(rotation => {
          rotation.copy(this.getRotation());
        });
      }
    } else if (this.rotation === null){
      this.rotation = this.getRotation();
    }
  }
 
  getRotation() : THREE.Euler {
    if (this.rotation === null) {
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getRotation) {
          this.rotation = this.refer.getRotation();
        } else if (this.refer instanceof THREE.Euler) {
          this.rotation = this.refer;
        }
      }
      if (this.rotation === null) {
        this.rotation = ThreeUtil.getEulerSafe(this.x,this.y,this.z,new THREE.Euler(0,0,0));
      }
      this._rotationSubject.next(this.rotation);
    }
    return this.rotation;
  }

}
