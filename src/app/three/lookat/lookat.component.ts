import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-lookat',
  templateUrl: './lookat.component.html',
  styleUrls: ['./lookat.component.scss']
})
export class LookatComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() public visible:boolean = true;
  @Input() private refer:any = null;
  @Input() private x:number = null;
  @Input() private y:number = null;
  @Input() private z:number = null;
  @Output() private onLoad:EventEmitter<LookatComponent> = new EventEmitter<LookatComponent>();

  constructor() { 
    super();
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.refer) {
      if (this.lookat !== null) {
        if (this.parent !== null) {
          this.lookat = null;
        }
        this.resetLookAt();
      }
    }
    super.ngOnChanges(changes);
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

  resetLookAt() {
    if (this.parent !== null && this.visible) {
      if (this.parent instanceof  THREE.Object3D) {
        this.parent.lookAt(this.getLookAt());
        this.parent.updateMatrixWorld();
      } else if (this.parent['target'] !== undefined) {
        this.parent['target'] = this.getLookAt();
      }
    } else if (this.lookat !== null) {
      this.lookat = null;
      this.getLookAt();
    }
  }

  getLookAt() : THREE.Vector3 {
    if (this.lookat === null) {
      console.log('lookat');
      if (this.refer !== null) {
        this.unSubscribeRefer('refer');
        this.lookat = ThreeUtil.getLookAt(this.refer);
        this.subscribeRefer('refer', ThreeUtil.getSubscribe(this.refer, () => {
          this.resetLookAt();
        }, 'lookat'))
      }
      if (this.lookat === null) {
        this.lookat = ThreeUtil.getVector3Safe(this.x, this.y, this.z, null, null, true);
      }
      if (this.visible) {
        this.setSubscribeNext('lookat');
      }
      this.onLoad.emit(this);
    }
    return this.lookat;
  }
}
