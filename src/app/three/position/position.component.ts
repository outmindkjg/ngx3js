import { TweenComponent } from './../tween/tween.component';
import { Component, Input, OnInit, SimpleChanges, ContentChildren, QueryList, Output, EventEmitter } from '@angular/core';
import * as THREE from 'three';
import { TagAttributes, ThreeUtil } from '../interface';
import { Observable, Subject, Subscription } from 'rxjs';
import { AbstractTweenComponent } from '../tween.abstract';

@Component({
  selector: 'three-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent extends AbstractTweenComponent implements OnInit {

  @Input() public visible:boolean = true;
  @Input() private refer:any = null;
  @Input() private referRef:boolean = true;
  @Input() private x:number = null;
  @Input() private y:number = null;
  @Input() private z:number = null;
  @Input() private multiply:number = null;
  @Input() private normalize:boolean = false;
  
  @Output() private onLoad:EventEmitter<PositionComponent> = new EventEmitter<PositionComponent>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer || changes.multiply) {
      this.needUpdate = true;
    }
    this.resetPosition();
  }

  private position: THREE.Vector3 = null;
  private needUpdate : boolean = true;
  setParent(parent: THREE.Object3D | any, isRestore: boolean = false) : boolean {
    if (super.setParent(parent, isRestore)) {
      if (isRestore && parent instanceof THREE.Object3D) {
        this.position = null;
        this.x = this.parent.position.x;
        this.y = this.parent.position.y;
        this.z = this.parent.position.z;
      }
      this.resetPosition();
      return true;
    }
    return false;
  }

  private _positionSubscribe: Subscription = null;

  private _positionSubject:Subject<THREE.Vector3> = new Subject<THREE.Vector3>();

  positionSubscribe() : Observable<THREE.Vector3>{
    return this._positionSubject.asObservable();
  }

  resetPosition() {
    if (this.parent !== null && this.visible) {
      if (this._positionSubscribe !== null) {
        this._positionSubscribe.unsubscribe();
        this._positionSubscribe = null;
      }
      if (this.parent instanceof THREE.Object3D) {
        this.parent.position.copy(this.getPosition());
        if (this.refer !== null && this.referRef && this.refer.positionSubscribe) {
          this._positionSubscribe = this.refer.positionSubscribe().subscribe(position => {
            if (this.parent instanceof THREE.Object3D && this.visible) {
              this.parent.position.copy(position);
            }
          })
        }
        this.setTweenTarget(this.parent.position);
      } else if (this.parent.meshPositions) {
        this.parent.meshPositions.forEach(position => {
          position.copy(this.getPosition());
        });
      }
    } else if (this.needUpdate && this.position !== null) {
      this.getPosition();
    }
  }

  getTagAttribute(options? : any) : TagAttributes {
    const tagAttributes: TagAttributes = {
      tag: 'three-position',
      attributes: [],
    };
    if (ThreeUtil.isNotNull(options.position)) {
      tagAttributes.attributes.push({ name : 'x', value : options.position.x });
      tagAttributes.attributes.push({ name : 'y', value : options.position.y });
      tagAttributes.attributes.push({ name : 'z', value : options.position.z });
    } else {
      tagAttributes.attributes.push({ name : 'x', value : this.x });
      tagAttributes.attributes.push({ name : 'y', value : this.y });
      tagAttributes.attributes.push({ name : 'z', value : this.z });
    }
    return tagAttributes;
  }

  getPosition(): THREE.Vector3 {
    if (this.position === null || this.needUpdate) {
      this.needUpdate = false;
      this.position = null;
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getPosition) {
          this.position = this.refer.getPosition();
        } else if (this.refer instanceof THREE.Vector3) {
          this.position = this.refer;
        }
      }
      if (this.position === null) {
        this.position = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(0, 0, 0));
        if (this.multiply !== null) {
          this.position.multiplyScalar(this.multiply);
        }
        if (this.normalize) {
          this.position.normalize();
        }
      }
      if (this.visible) {
        this._positionSubject.next(this.position);
      }
      this.onLoad.emit(this);
    }
    return this.position;
  }
}
