import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractSvgGeometry } from '../interface';

@Component({
  selector: 'three-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

  @Input() visible : boolean = true;
  @Input() x : number = 1;
  @Input() y : number = 1;
  @Input() z : number = 1;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z) {
      this.scale = null;
    }
    this.resetScale();
  }

  private scale : THREE.Vector3 = null;
  private refObject3d : THREE.Object3D | AbstractSvgGeometry= null;

  setObject3D(refObject3d : THREE.Object3D | AbstractSvgGeometry, isRestore : boolean = false){
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
      if (this.refObject3d instanceof THREE.Object3D) {
        this.refObject3d.scale.copy(this.getScale())
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshScales.forEach(scale => {
          scale.copy(this.getScale());
        });
      }
    }
  }

  getScale() : THREE.Vector3 {
    if (this.scale === null) {
        this.scale = new THREE.Vector3(this.x, this.y, this.z);
    }
    return this.scale;
  }

}
