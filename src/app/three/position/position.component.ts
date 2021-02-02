import { TweenComponent } from './../tween/tween.component';
import { Component, Input, OnInit, SimpleChanges, ContentChildren, QueryList } from '@angular/core';
import * as THREE from 'three';
import { AbstractSvgGeometry, AbstractThreeComponent, ThreeUtil } from '../interface';
import { Observable, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'three-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent extends AbstractThreeComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() refer: any = null;
  @Input() referRef: boolean = true;
  @Input() x: number = null;
  @Input() y: number = null;
  @Input() z: number = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer) {
      this.position = null;
    }
    this.resetPosition();
  }

  private position: THREE.Vector3 = null;
  private refObject3d: THREE.Object3D | AbstractSvgGeometry = null;

  setObject3D(refObject3d: THREE.Object3D | AbstractSvgGeometry, isRestore: boolean = false) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (isRestore && this.refObject3d !== null && this.refObject3d instanceof THREE.Object3D) {
        this.position = null;
        this.x = this.refObject3d.position.x;
        this.y = this.refObject3d.position.y;
        this.z = this.refObject3d.position.z;
      }
      this.resetPosition();
    }
  }

  private _positionSubscribe: Subscription = null;

  private _positionSubject:Subject<THREE.Vector3> = new Subject<THREE.Vector3>();

  positionSubscribe() : Observable<THREE.Vector3>{
    return this._positionSubject.asObservable();
  }

  resetPosition() {
    if (this.refObject3d !== null && this.visible) {
      if (this._positionSubscribe !== null) {
        this._positionSubscribe.unsubscribe();
        this._positionSubscribe = null;
      }
      if (this.refObject3d instanceof THREE.Object3D) {
        this.refObject3d.position.copy(this.getPosition());
        if (this.refer !== null && this.referRef && this.refer.positionSubscribe) {
          this._positionSubscribe = this.refer.positionSubscribe().subscribe(position => {
            if (this.refObject3d instanceof THREE.Object3D && this.visible) {
              this.refObject3d.position.copy(position);
            }
          })
        }
        this.setTweenTarget(this.refObject3d.position);
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshPositions.forEach(position => {
          position.copy(this.getPosition());
        });
      }
    }
  }

  getPosition(): THREE.Vector3 {
    if (this.position === null) {
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getPosition) {
          this.position = this.refer.getPosition();
        } else if (this.refer instanceof THREE.Vector3) {
          this.position = this.refer;
        }
      }
      if (this.position === null) {
        this.position = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(0, 0, 0));
      }
      this._positionSubject.next(this.position);
    }
    return this.position;
  }
}
