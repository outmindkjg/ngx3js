import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-physics-ammo-terrain',
  templateUrl: './physics-ammo-terrain.component.html',
  styleUrls: ['./physics-ammo-terrain.component.scss']
})
export class PhysicsAmmoTerrainComponent extends BaseComponent<{
  addShape : () => void
}> {

  constructor() {
    super({
      addShape : () => {
        for(let i = 0 ; i < 10; i++) {
          this.addShape();
        }
      }
    },[
      { name : 'addShape', title : 'add', type : 'button'}
    ]);
  }

  ngOnInit() {
    for(let i = 0 ; i < 10; i++) {
      this.addShape();
    }
  }

  addShape() {
    if (this.shapeInfos.length > 120) {
      this.shapeInfos.shift();
    }
    let type = 'box';
    switch(Math.round(Math.random() * 3)) {
      //case 0 : 
      // case 3 : 
      //  type = 'box';
      //  break;
      case 1 : 
      case 2 : 
      default :
        type = 'SphereGeometry';
        break;
    }
    this.shapeInfos.push({
      x : Math.random() * 100 - 50,
      y : Math.random() * 10 + 10,
      z : Math.random() * 100 - 50,
      type : type,
      color : Math.random() * 0xffffff,
    })
  }

  shapeInfos : {
    x : number,
    y : number,
    z : number,
    type : string;
    color : number;
  }[] = [];

}
