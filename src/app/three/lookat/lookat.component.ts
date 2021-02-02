import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-lookat',
  templateUrl: './lookat.component.html',
  styleUrls: ['./lookat.component.scss']
})
export class LookatComponent implements OnInit {

  @Input() visible : boolean = true;
  @Input() refer : any = null;
  @Input() x : number = null;
  @Input() y : number = null;
  @Input() z : number = null;
  

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

  private refObject3d : THREE.Object3D = null;
  setObject3D(refObject3d : THREE.Object3D){
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetLookAt();
    }
  }

  resetLookAt() {
    if (this.refObject3d != null && this.visible) {
      this.refObject3d.lookAt(this.getLookAt());
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
    }
    return this.lookat;
  }
}
