import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-physics-ammo-volume',
  templateUrl: './physics-ammo-volume.component.html',
  styleUrls: ['./physics-ammo-volume.component.scss']
})
export class PhysicsAmmoVolumeComponent extends BaseComponent<{
  addShape : () => void
}> {

  constructor() {
    super({
      addShape : () => {
        this.addShape();
      }
    },[
      { name : 'addShape', title : 'add', type : 'button'}
    ]);
  }

  ngOnInit() {
    for(let i = 0 ; i < 1; i++) {
      this.addShape();
    }
  }

  addShape() {
    if (this.shapeInfos.length > 20) {
      this.shapeInfos.shift();
    }
    let type = 'box';
    switch(Math.round(Math.random() * 3)) {
      // case 0 : 
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
      x : Math.random() * 70 - 35,
      y : Math.random() * 10 + 50,
      z : Math.random() * 70 - 35,
      type : 'SphereGeometry',
      softBody : (Math.random() > 0.5) ? true : false,
      radius : (Math.random() * 15 + 5),
      width : (Math.random() * 10 + 10),
      height : (Math.random() * 10 + 10),
      depth : (Math.random() * 20 + 30),
      widthSegments : 40,
      heightSegments : 20,
      depthSegments : 20,
      pressure : 250,
      color : Math.random() * 0xffffff
    })
  }

  shapeInfos : {
    x : number,
    y : number,
    z : number,
    softBody : boolean,
    type : string;
    radius : number;
    width : number;
    height : number;
    depth : number;
    widthSegments : number;
    heightSegments : number;
    depthSegments : number;
    color : number;
    pressure : number;
  }[] = [];

}