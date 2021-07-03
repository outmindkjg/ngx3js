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
      case 0 : 
      case 3 : 
        type = 'box';
        break;
      case 1 : 
      case 2 : 
        type = 'SphereGeometry';
        break;
    }
    this.shapeInfos.push({
      x : Math.random() * 100 - 50,
      y : Math.random() * 10 + 10,
      z : Math.random() * 100 - 50,
      type : 'SphereGeometry',
      radius : 5,
      width : 10,
      height : 10,
      depth : 10,
      widthSegments : 20,
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