import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() private onLoad: EventEmitter<PlaneComponent> = new EventEmitter<PlaneComponent>();

  constructor() {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.needUpdate = true;
      this.getPlane();
    }
    super.ngOnChanges(changes);
  }

  private plane: THREE.Plane = null;
  private worldPlane: THREE.Plane = null;

  set needUpdate(value : boolean) {
    if (value && this.plane !== null) {
      this.plane = null;
      this.getPlane();
    }
  }
  
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
    if (this.plane === null) {
      this.plane = new THREE.Plane(ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
      this.needUpdate = false;
      this.onLoad.emit(this);
    } else if (this.needUpdate) {
      this.plane.set(ThreeUtil.getVector3Safe(this.x, this.y, this.z), ThreeUtil.getTypeSafe(this.w, 0));
      this.needUpdate = false;
    }
    return this.plane;
  }
}
