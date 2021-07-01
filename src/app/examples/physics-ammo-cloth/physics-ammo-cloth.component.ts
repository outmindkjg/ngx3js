import { Component } from '@angular/core';
import { BaseComponent, RendererEvent } from '../../three';

@Component({
  selector: 'app-physics-ammo-cloth',
  templateUrl: './physics-ammo-cloth.component.html',
  styleUrls: ['./physics-ammo-cloth.component.scss']
})
export class PhysicsAmmoClothComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    this.wallInfos = [];
    const brickMass = 0.5;
    const brickLength = 1.2;
    const brickDepth = 0.6;
    const brickHeight = brickLength * 0.5;
    const numBricksLength = 6;
    const numBricksHeight = 8;
    const z0 = - numBricksLength * brickLength * 0.5;
    const pos = {x : 0, y : brickHeight * 0.5, z : z0 };
    for ( let j = 0; j < numBricksHeight; j ++ ) {
      const oddRow = ( j % 2 ) == 1;
      pos.z = z0;
      if ( oddRow ) {
        pos.z -= 0.25 * brickLength;
      }
      const nRow = oddRow ? numBricksLength + 1 : numBricksLength;
      for ( let i = 0; i < nRow; i ++ ) {
        let brickLengthCurrent = brickLength;
        let brickMassCurrent = brickMass;
        if ( oddRow && ( i == 0 || i == nRow - 1 ) ) {
          brickLengthCurrent *= 0.5;
          brickMassCurrent *= 0.5;
        }
        this.wallInfos.push({
          x : pos.x,
          y : pos.y,
          z : pos.z,
          mass : brickMassCurrent,
          width : brickDepth,
          height : brickHeight,
          depth : brickLengthCurrent,
          color : Math.floor( Math.random() * ( 1 << 24 ) ),
        });
        if ( oddRow && ( i == 0 || i == nRow - 2 ) ) {
          pos.z += 0.75 * brickLength;
        } else {
          pos.z += brickLength;
        }
      }
      pos.y += brickHeight;
    }

  }

  clothPos = { x : -3, y : 3, z : 2}
  clothWidth = 4;
  clothHeight = 3;
  clothNumSegmentsZ = this.clothWidth * 5;
  clothNumSegmentsY = this.clothHeight * 5;
  armMass = 2;
  armLength = 3 + this.clothWidth;
  pylonHeight = this.clothPos.y + this.clothHeight;

  wallInfos : {
    x : number;
    y : number;
    z : number;
    mass : number;
    width : number;
    height : number;
    depth : number;
    color : number;
  }[] = [];

  armMovement : number = 0;
  onKeyDown(event : RendererEvent) {
    switch(event.type) {
      case 'keydown' :
        switch(event.keyInfo.code) {
          case "KeyQ" : 
            this.armMovement = 1;
            break;
          case "KeyA" :
            this.armMovement = -1;
            break;
          default :
            break;
        }
        break;
      case 'keyup' :
        this.armMovement = 0;
        break;
    }
  }
}
