import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap',
  templateUrl: './webgl-shadowmap.component.html',
  styleUrls: ['./webgl-shadowmap.component.scss']
})
export class WebglShadowmapComponent extends BaseComponent<{
  hudEnable : boolean;
}> {

  constructor() {
    super({
      hudEnable : true
    },[
      { name : 'hudEnable', title : 'show HUD', type : 'checkbox'}
    ]);
  }

  ngOnInit() {
    this.horsePositions = [
      { x : 100 - Math.random() * 1000, y : this.floor, z : 300, delay : Math.random() * 1000 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : 450, delay : Math.random() * 1000 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : 600, delay : Math.random() * 1000 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -300, delay : Math.random() * 1000 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -450, delay : Math.random() * 1000 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -600, delay : Math.random() * 1000 },
    ]
    this.flamingoPositions = [
      { x : 100 - Math.random() * 1000, y : this.floor + 350, z : 40, delay : Math.random() * 1000 },
      { x : 100 - Math.random() * 1000, y : this.floor + 350, z : 140, delay : Math.random() * 1000 },
      { x : 100 - Math.random() * 1000, y : this.floor + 350, z : -140, delay : Math.random() * 1000 },
    ]
  }
  floor : number = -250;

  horsePositions : { x : number, y : number, z : number, delay : number }[] = [];
  flamingoPositions : { x : number, y : number, z : number, delay : number }[] = [];

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const children  = this.mesh.getObject3d().children;
      const delta = timer.delta ;

      children.forEach((morph) => {
        if (morph.userData.speed == undefined) {
          morph.userData.speed = 300 + Math.random() * 200;
        }
        morph.position.x += morph.userData.speed * delta;
        if ( morph.position.x > 2000 ) {
          morph.position.x = - 1000 - Math.random() * 500;
        }

      })
    }
  }
}
