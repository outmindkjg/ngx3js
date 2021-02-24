import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import * as THREE from 'three';
import { ThreeUtil } from '../interface';

@Component({
  selector: 'three-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss']
})
export class PlaneComponent implements OnInit {

  @Input() private x: number = null;
  @Input() private y: number = null;
  @Input() private z: number = null;
  @Input() private w: number = null;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.needUpdate = true;
      this.getPlane();
    }
  }

  private plane : THREE.Plane = null;
  private worldPlane : THREE.Plane = null;
  private needUpdate : boolean = false;

  getWorldPlane(matrixWorld? : THREE.Matrix4) : THREE.Plane {
    if (this.worldPlane === null) {
      this.worldPlane = new THREE.Plane();
    }
    this.worldPlane.copy(this.getPlane());
    if (matrixWorld !== null && matrixWorld !== undefined) {
      this.worldPlane.applyMatrix4(matrixWorld);
    }
    return this.worldPlane;
  }

  getPlane() : THREE.Plane {
    if (this.plane === null) {
      this.plane = new THREE.Plane( ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
      this.needUpdate = false;
    } else if (this.needUpdate) {
      this.plane.set(ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
      this.needUpdate = false;
    }
    return this.plane;
  }
}
