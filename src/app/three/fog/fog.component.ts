import { ThreeUtil } from './../interface';
import { Component, Input, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.scss']
})
export class FogComponent implements OnInit {

  @Input() public type:string = "fog";
  @Input() private color:string | number = null;
  @Input() private density:number = 0.00025;
  @Input() private near:number = 1;
  @Input() private far:number = 1000;


  constructor() { }

  ngOnInit(): void {
  }

  private getColor(def? : number | string) : THREE.Color{
    return ThreeUtil.getColorSafe(this.color, def);
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
      switch(this.type.toLowerCase()) {
        case 'exp2' :
        case 'fogexp2' :
          this.fog = new THREE.FogExp2(
            this.getColor(0xffffff).getHexString(),
            this.density
          );
          break;
        case 'fog' :
        default :
          this.fog = new THREE.Fog(
            this.getColor(0xffffff),
            this.near,
            this.far
          );
          break;
      }
    }
    return this.fog;
  }
}
