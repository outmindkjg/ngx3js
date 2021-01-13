import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.scss']
})
export class FogComponent implements OnInit {

  @Input() type : string = "fog";
  @Input() color : string | number = null;
  @Input() density : number = 0.00025;
  @Input() near : number = 1;
  @Input() far : number = 1000;
  

  constructor() { }

  ngOnInit(): void {
  }

  getColor(def : string | number) : string | number{
    if (this.color === null) {
      return def;
    } else {
      const color = this.color.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.color;
      }
    }
  }

  private fog : THREE.IFog = null;
  private refScene : THREE.Scene = null;

  setScene(refScene : THREE.Scene) {
    if (this.refScene !== refScene) {
      this.refScene = refScene;
      this.refScene.fog = this.getFog();
    }
  }

  getFog() : THREE.IFog{
    if (this.fog === null) {
      switch(this.type) {
        case 'exp2' :
        case 'fogexp2' :
          this.fog = new THREE.FogExp2(this.getColor(0xffffff), this.density);
          break;
        case 'fog' :
        default :
          this.fog = new THREE.Fog(this.getColor(0xffffff), this.near, this.far);
          break; 
      }
    }
    return this.fog;
  }
}
