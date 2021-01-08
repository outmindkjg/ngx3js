import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit, OnChanges {

  @Input() type: string = "lambert";
  @Input() color: string | number = 0xffffff;
 
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.type) {
      this.material = null;
    }
  }

  private material : THREE.Material = null;

  getMaterial() : THREE.Material {
    if (this.material === null) {
      switch(this.type) {
        case 'lambert' :
        default :
          console.log(this.color);
          this.material = new THREE.MeshLambertMaterial({color: this.color});
          break;
      }
    }
    return this.material;
  }
}
