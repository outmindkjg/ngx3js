import { Component } from '@angular/core';
import { Color, Vector3 } from 'three';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry',
  templateUrl: './webgl-buffergeometry.component.html',
  styleUrls: ['./webgl-buffergeometry.component.scss']
})
export class WebglBuffergeometryComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const positions = [];
    const normals = [];
    const colors = [];

    const color = new Color();

    const n = 800, n2 = n / 2;	// triangles spread in the cube
    const d = 12, d2 = d / 2;	// individual triangle size

    const pA = new Vector3();
    const pB = new Vector3();
    const pC = new Vector3();

    const cb = new Vector3();
    const ab = new Vector3();
    const triangles = 160000;

    for ( let i = 0; i < triangles; i ++ ) {

      // positions

      const x = Math.random() * n - n2;
      const y = Math.random() * n - n2;
      const z = Math.random() * n - n2;

      const ax = x + Math.random() * d - d2;
      const ay = y + Math.random() * d - d2;
      const az = z + Math.random() * d - d2;

      const bx = x + Math.random() * d - d2;
      const by = y + Math.random() * d - d2;
      const bz = z + Math.random() * d - d2;

      const cx = x + Math.random() * d - d2;
      const cy = y + Math.random() * d - d2;
      const cz = z + Math.random() * d - d2;

      positions.push( ax, ay, az );
      positions.push( bx, by, bz );
      positions.push( cx, cy, cz );

      // flat face normals

      pA.set( ax, ay, az );
      pB.set( bx, by, bz );
      pC.set( cx, cy, cz );

      cb.subVectors( pC, pB );
      ab.subVectors( pA, pB );
      cb.cross( ab );

      cb.normalize();

      const nx = cb.x;
      const ny = cb.y;
      const nz = cb.z;

      normals.push( nx, ny, nz );
      normals.push( nx, ny, nz );
      normals.push( nx, ny, nz );

      // colors

      const vx = ( x / n ) + 0.5;
      const vy = ( y / n ) + 0.5;
      const vz = ( z / n ) + 0.5;
      color.setRGB( vx, vy, vz );
      colors.push( color.r, color.g, color.b );
      colors.push( color.r, color.g, color.b );
      colors.push( color.r, color.g, color.b );
    }
    this.positions = positions;
    this.normals = normals;
    this.colors = colors;
  }

  positions : number[] = [];
  normals : number[]  = [];
  colors : number[]  = [];

}
