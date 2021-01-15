import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.scss']
})
export class ScaleComponent implements OnInit {

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
    if (this.refScale != null) {
      this.refScale.copy(this.getScale());
    }
  }

  private scale : THREE.Vector3 = null;
  private refScale : THREE.Vector3 = null;
  
  setScale(refScale : THREE.Vector3) {
    if (this.refScale !== refScale) {
      this.refScale = refScale;
      this.refScale.copy(this.getScale());
    }
  }

  getScale() : THREE.Vector3 {
    if (this.scale === null) {
        this.scale = new THREE.Vector3(this.x, this.y, this.z);
    }
    return this.scale;
  }

}
