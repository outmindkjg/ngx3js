import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractSvgGeometry } from '../interface';

@Component({
  selector: 'three-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {

  @Input() visible : boolean = true;
  @Input() x : number = 0;
  @Input() y : number = 0;
  @Input() z : number = 0;
 
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z) {
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
  
  resetRotation() {
    if (this.refObject3d !== null && this.visible) {
      if (this.refObject3d instanceof THREE.Object3D) {
        this.refObject3d.rotation.copy(this.getRotation())
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshRotations.forEach(rotation => {
          rotation.copy(this.getRotation());
        });
      }
    }
  }
 
  getRotation() : THREE.Euler {
    if (this.rotation === null) {
        this.rotation = new THREE.Euler(
          this.x / 180 * Math.PI, 
          this.y / 180 * Math.PI, 
          this.z / 180 * Math.PI
        );
    }
    return this.rotation;
  }

}
