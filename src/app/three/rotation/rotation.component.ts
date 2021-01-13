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
    if (this.refRotation != null) {
      this.refRotation.copy(this.getRotation());
    }
  }

  private rotation : THREE.Euler = null;
  private refRotation : THREE.Euler = null;

  setRotation(refRotation : THREE.Euler) {
    this.refRotation = refRotation;
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
