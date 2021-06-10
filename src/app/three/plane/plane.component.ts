import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'three-plane',
  templateUrl: './plane.component.html',
  styleUrls: ['./plane.component.scss'],
})
export class PlaneComponent extends AbstractSubscribeComponent implements OnInit {
  @Input() private x: number = null;
  @Input() private y: number = null;
  @Input() private z: number = null;
  @Input() private w: number = null;

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('plane');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.plane) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private plane: THREE.Plane = null;
  private worldPlane: THREE.Plane = null;
  
  setPlane(x: number, y: number, z: number, w: number) {
    if (ThreeUtil.isNotNull(x)) {
      this.x = x;
    }
    if (ThreeUtil.isNotNull(y)) {
      this.y = y;
    }
    if (ThreeUtil.isNotNull(z)) {
      this.z = z;
    }
    if (ThreeUtil.isNotNull(w)) {
      this.w = w;
    }
    this.needUpdate = true;
    this.getPlane();
    if (this.worldPlane !== null) {
      this.worldPlane.copy(this.plane);
    }
  }

  getWorldPlane(matrixWorld?: THREE.Matrix4): THREE.Plane {
    if (this.worldPlane === null) {
      this.worldPlane = new THREE.Plane();
    }
    this.worldPlane.copy(this.getPlane());
    if (matrixWorld !== null && matrixWorld !== undefined) {
      this.worldPlane.applyMatrix4(matrixWorld);
    }
    return this.worldPlane;
  }

  getPlane(): THREE.Plane {
    if (this.plane === null || this._needUpdate) {
      this.needUpdate = false;
      this.plane = new THREE.Plane(ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
      this.setObject(this.plane);
    }
    this.plane.set(ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
    return this.plane;
  }
}
