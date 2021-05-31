import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { ThreeUtil } from './../interface';

@Component({
  selector: 'three-fog',
  templateUrl: './fog.component.html',
  styleUrls: ['./fog.component.scss']
})
export class FogComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() public type:string = "fog";
  @Input() private color:string | number = null;
  @Input() private density:number = 0.00025;
  @Input() private near:number = 1;
  @Input() private far:number = 1000;

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  ngOnDestroy() : void {
    super.ngOnDestroy();
  }

  private getColor(def? : number | string) : THREE.Color{
    return ThreeUtil.getColorSafe(this.color, def);
  }

  private getDensity(def? : number) : number{
    return ThreeUtil.getTypeSafe(this.density, def);
  }
  
  private getNear(def? : number) : number{
    return ThreeUtil.getTypeSafe(this.near, def);
  }

  private getFar(def? : number) : number{
    return ThreeUtil.getTypeSafe(this.far, def);
  }

  private fog : THREE.IFog = null;
  
  private refScene : THREE.Scene = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && this.fog !== null) {
      this.needUpdate = true;
    }
    super.ngOnChanges(changes);
  }

  set needUpdate(value : boolean) {
    if (value && this.fog !== null) {
      this.fog = null;
      this.getFog();
    }
  }

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
            this.getColor(0xffffff).getHex(),
            this.getDensity()
          );
          break;
        case 'fog' :
        default :
          this.fog = new THREE.Fog(
            this.getColor(0xffffff),
            this.getNear(),
            this.getFar()
          );
          break;
      }
      this.setSubscribeNext('fox');
    }
    return this.fog;
  }
}
