import { Component, Input, OnInit, SimpleChanges } from '@angular/core';

import * as THREE from 'three';

@Component({
  selector: 'three-light',
  templateUrl: './light.component.html',
  styleUrls: ['./light.component.scss']
})
export class LightComponent implements OnInit {

  @Input() type : string = "spot";

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.light = null;
  }

  private light : THREE.Light = null;
  
  getLight(): THREE.Light {
    if (this.light === null) {
      switch(this.type) {
        case 'spot' :
          this.light = new THREE.SpotLight(0xffffff);
          this.light.position.set(-40, 60, -10);
          this.light.castShadow = true;
          break;
        case 'ambient' :
        default :
          this.light = new THREE.AmbientLight(0x0c0c0c);
          break;
      }
    }
    return this.light;
  }
  ngOnInit(): void {
  }

}
