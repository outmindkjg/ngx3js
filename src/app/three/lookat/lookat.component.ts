import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-lookat',
  templateUrl: './lookat.component.html',
  styleUrls: ['./lookat.component.scss']
})
export class LookatComponent implements OnInit {

  @Input() public visible:boolean = true;
  @Input() private refer:any = null;
  @Input() private x:number = null;
  @Input() private y:number = null;
  @Input() private z:number = null;
  @Output() private onLoad:EventEmitter<LookatComponent> = new EventEmitter<LookatComponent>();

  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer) {
      this.lookat = null;
    }
    this.resetLookAt();
  }

  private lookat : THREE.Vector3 = null;

  private parent : THREE.Object3D | any = null;
  setParent(parent : THREE.Object3D | any) : boolean{
    if (this.parent !== parent) {
      this.parent = parent;
      this.resetLookAt();
      return true;
    }
    return false;
  }

  private _lookatSubject:Subject<THREE.Vector3> = new Subject<THREE.Vector3>();

  lookatSubscribe() : Observable<THREE.Vector3>{
    if (this.lookat === null) {
      this.lookat = this.getLookAt();
    }
    return this._lookatSubject.asObservable();
  }
 
  resetLookAt() {
    if (this.parent !== null && this.visible) {
      if (this.parent instanceof  THREE.Object3D) {
        this.parent.lookAt(this.getLookAt());
        this.parent.updateMatrixWorld();
      } else if (this.parent['target']) {
        this.parent['target'] = this.getLookAt();
      }
    }
  }

  getLookAt() : THREE.Vector3 {
    if (this.lookat === null) {
        if (this.refer !== null) {
          if (this.refer.getPosition) {
            this.lookat = this.refer.getPosition();
          } else if (this.refer.getLookAt) {
            this.lookat = this.refer.getLookAt();
          } else if (this.refer instanceof THREE.Vector3) {
            this.lookat = this.refer;
          }
        }
        if (this.lookat === null) {
          this.lookat = ThreeUtil.getVector3Safe(this.x, this.y, this.z, new THREE.Vector3(0, 0, 0));
        }
        if (this.visible) {
          this._lookatSubject.next(this.lookat);
        }
        this.onLoad.emit(this);
    }
    return this.lookat;
  }
}
