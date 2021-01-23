import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.scss']
})
export class PositionComponent implements OnInit {

  @Input() x : number = 0;
  @Input() y : number = 0;
  @Input() z : number = 0;
  
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.x || changes.y || changes.z) {
      this.position = null;
    }
    this.resetPosition();
  }

  private position : THREE.Vector3 = null;
  private refPosition : THREE.Vector3 | THREE.Vector3[] = null;
  
  setPosition(refPosition : THREE.Vector3 | THREE.Vector3[], isRestore : boolean = false){
    if (this.refPosition !== refPosition) {
      this.refPosition = refPosition;
      if (isRestore) {

      } else {
        this.resetPosition();
      }
    }
  }

  resetPosition() {
    if (this.refPosition !== null) {
      if (this.refPosition instanceof Array) {
        this.refPosition.forEach(refPosition => {
          refPosition.copy(this.getPosition());
        });
      } else if(this.refPosition instanceof THREE.Vector3) {
        this.refPosition.copy(this.getPosition())
      }
    }
  }

  getPosition() : THREE.Vector3 {
    if (this.position === null) {
        this.position = new THREE.Vector3(this.x, this.y, this.z);
    }
    return this.position;
  }
}
