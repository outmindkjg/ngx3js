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
  numTypes = 4;

  addShape() {
    if (this.shapeInfos.length > 120) {
      this.shapeInfos.shift();
    }
    const objectType = Math.ceil( Math.random() * this.numTypes );
    const objectSize = 3;
    const terrainWidth = 128;
    const terrainMaxHeight = 8;
    const terrainDepth = 128;
    const margin = 0.05;
    const x = ( Math.random() - 0.5 ) * terrainWidth * 0.6;
    const y = terrainMaxHeight + objectSize + 2;
    const z = ( Math.random() - 0.5 ) * terrainDepth * 0.6
    const color = Math.random() * 0xffffff
    switch(objectType) {
      case 1 : {
          const radius = 1 + Math.random() * objectSize;
          this.shapeInfos.push({
            x : x,
            y : y,
            z : z,
            type : 'SphereGeometry',
            radius : radius,
            widthSegments : 20,
            heightSegments : 20,
            color : color
          })
        }
        break;
      case 2 : {
          const sx = 1 + Math.random() * objectSize;
          const sy = 1 + Math.random() * objectSize;
          const sz = 1 + Math.random() * objectSize;
          this.shapeInfos.push({
            x : x,
            y : y,
            z : z,
            type : 'BoxGeometry',
            width : sx,
            height : sy,
            depth : sz,
            widthSegments : 1,
            heightSegments : 1,
            depthSegments : 1,
            color : color
          });
        }
        break;
      case 3 : {
          const radius = 1 + Math.random() * objectSize;
          const height = 1 + Math.random() * objectSize;
          this.shapeInfos.push({
            x : x,
            y : y,
            z : z,
            type : 'CylinderGeometry',
            radiusTop : radius,
            radiusBottom : radius,
            height : height,
            radialSegments : 20,
            heightSegments : 1,
            color : color
          });
        }
        break;
      default : {
          const radius = 1 + Math.random() * objectSize;
          const height = 2 + Math.random() * objectSize;
          this.shapeInfos.push({
            x : x,
            y : y,
            z : z,
            type : 'ConeGeometry',
            radius : radius,
            height : height,
            radialSegments : 20,
            heightSegments : 2,
            color : color
          });
        }
        break;
    }
  }

  shapeInfos : {
    x : number,
    y : number,
    z : number,
    type : string;
    radius? : number;
    width? : number;
    height? : number;
    depth? : number;
    radiusTop? : number;
    radiusBottom ? : number;
    radialSegments? : number;
    widthSegments? : number;
    heightSegments? : number;
    depthSegments? : number;
    color : number;
  }[] = [];

}
