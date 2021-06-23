import { Component } from '@angular/core';
import { BufferAttribute, BufferGeometry, Color } from 'three';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-multiple-canvases-circle',
  templateUrl: './webgl-multiple-canvases-circle.component.html',
  styleUrls: ['./webgl-multiple-canvases-circle.component.scss']
})
export class WebglMultipleCanvasesCircleComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }


  ngOnInit() {
    this.ballInfos = [];
    const noof_balls = 51;
    for ( let i = 0; i < noof_balls; i ++ ) { 
      this.ballInfos.push({
        x : - ( noof_balls - 1 ) / 2 * 400 + i * 400,
        rx : i * 0.5
      })
    }  
  }

  setIcosahedronGeometry(geometry1 : BufferGeometry) {
    const count = geometry1.attributes.position.count;
    geometry1.setAttribute( 'color', new BufferAttribute( new Float32Array( count * 3 ), 3 ) );
    const color = new Color();
    const positions = geometry1.attributes.position;
    const colors = geometry1.attributes.color;
    for ( let i = 0; i < count; i ++ ) {
      color.setHSL( ( positions.getY( i ) / 200 + 1 ) / 2, 1.0, 0.5 );
      colors.setXYZ( i, color.r, color.g, color.b );
    }
  }

  ballInfos : {
    x : number;
    rx : number;
  }[] = [];
}
