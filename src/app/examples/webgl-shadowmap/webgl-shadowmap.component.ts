import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-shadowmap',
  templateUrl: './webgl-shadowmap.component.html',
  styleUrls: ['./webgl-shadowmap.component.scss']
})
export class WebglShadowmapComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    this.horsePositions = [
      { x : 0, y : this.floor, z : 300 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : 450 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : 600 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -300 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -450 },
      { x : 100 - Math.random() * 1000, y : this.floor, z : -600 },
    ]
    this.flamingoPositions = [
      { x : 0, y : this.floor + 350, z : 40 },
      { x : 100 - Math.random() * 1000, y : this.floor + 350, z : 140 },
      { x : 100 - Math.random() * 1000, y : this.floor + 350, z : -140 },
    ]
  }
  floor : number = -250;

  horsePositions : { x : number, y : number, z : number }[] = [];
  flamingoPositions : { x : number, y : number, z : number }[] = [];

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const children  = this.mesh.getMesh().children;
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
