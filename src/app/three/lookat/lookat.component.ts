import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-lookat',
  templateUrl: './lookat.component.html',
  styleUrls: ['./lookat.component.scss']
})
export class LookatComponent implements OnInit {

  @Input() x : number = 0;
  @Input() y : number = 0;
  @Input() z : number = 0;
  @Input() position : any = null;
  

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z || changes.position) {
      this.lookat = null;
    }
    if (this.refObject3d != null) {
      this.refObject3d.lookAt(this.getLookAt());
    }
  }

  private lookat : THREE.Vector3 = null;
  private refObject3d : THREE.Object3D = null;
  setObject3D(refObject3d : THREE.Object3D){
    this.refObject3d = refObject3d;
  }

  getLookAt() : THREE.Vector3 {
    if (this.lookat === null) {
        if (this.position !== null) {
          if (this.position.getPosition) {
            this.lookat = this.position.getPosition();
          } else if (this.position instanceof THREE.Vector3) {
            this.lookat = this.position;
          }
        } 
        if (this.lookat === null) {
          this.lookat = new THREE.Vector3(this.x, this.y, this.z);
        }
    }
    return this.lookat;
  }
}
