import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {

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
  private refRotation : THREE.Euler | THREE.Euler[] = null;

  setRotation(refRotation : THREE.Euler | THREE.Euler[], isRestore : boolean = false) {
    if (this.refRotation !== refRotation) {
      this.refRotation = refRotation;
      if (isRestore) {
        console.log('restored')
      } else {
        this.resetRotation();
      }
    }
  }

  resetRotation() {
    if (this.refRotation !== null) {
      if (this.refRotation instanceof Array) {
        this.refRotation.forEach(refRotation => {
          refRotation.copy(this.getRotation());
        });
      } else if(this.refRotation instanceof THREE.Euler) {
        this.refRotation.copy(this.getRotation())
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
