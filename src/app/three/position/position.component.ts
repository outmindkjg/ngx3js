import { TweenComponent } from './../tween/tween.component';
import { Component, Input, OnInit, SimpleChanges, ContentChildren, QueryList } from '@angular/core';
import * as THREE from 'three';
import { AbstractSvgGeometry, AbstractThreeComponent } from '../interface';

@Component({
  selector: 'three-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent extends AbstractThreeComponent implements OnInit {

  @Input() visible: boolean = true;
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() z: number = 0;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z) {
      this.position = null;
    }
    this.resetPosition();
  }

  private position: THREE.Vector3 = null;
  private refObject3d: THREE.Object3D | AbstractSvgGeometry = null;

  setObject3D(refObject3d: THREE.Object3D | AbstractSvgGeometry, isRestore: boolean = false) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      if (isRestore && this.refObject3d !== null && this.refObject3d instanceof THREE.Object3D) {
        this.position = null;
        this.x = this.refObject3d.position.x;
        this.y = this.refObject3d.position.y;
        this.z = this.refObject3d.position.z;
      }
      this.resetPosition();
    }
  }

  resetPosition() {
    if (this.refObject3d !== null && this.visible) {
      if (this.refObject3d instanceof THREE.Object3D) {
        this.refObject3d.position.copy(this.getPosition())
        this.setTweenTarget(this.refObject3d.position);
      } else if (this.refObject3d instanceof AbstractSvgGeometry) {
        this.refObject3d.meshPositions.forEach(position => {
          position.copy(this.getPosition());
        });
      }
    }
  }

  getPosition(): THREE.Vector3 {
    if (this.position === null) {
      this.position = new THREE.Vector3(this.x, this.y, this.z);
    }
    return this.position;
  }
}
