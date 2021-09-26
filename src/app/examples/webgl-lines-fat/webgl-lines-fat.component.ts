import { Component } from '@angular/core';
import { BaseComponent, GeometryUtils, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-lines-fat',
  templateUrl: './webgl-lines-fat.component.html',
  styleUrls: ['./webgl-lines-fat.component.scss']
})
export class WebglLinesFatComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const positions = [];
    const colors = [];

    const points = GeometryUtils.hilbert3D( new THREE.Vector3( 0, 0, 0 ), 20.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );

    const spline = new THREE.CatmullRomCurve3( points );
    const divisions = Math.round( 12 * points.length );
    const point = new THREE.Vector3();
    const color = new THREE.Color();
    for ( let i = 0, l = divisions; i < l; i ++ ) {
      const t = i / l;
      spline.getPoint( t, point );
      positions.push( point.x, point.y, point.z );
      color.setHSL( t, 1.0, 0.5 );
      colors.push( color.r, color.g, color.b );
    }
    this.positions = positions;
    this.colors = colors;
  }

  positions : number[] = [];
  colors : number[] = [];

}
