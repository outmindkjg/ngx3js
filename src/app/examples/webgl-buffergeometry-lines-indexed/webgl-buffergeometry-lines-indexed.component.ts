import { Component } from '@angular/core';
import { Vector3 } from 'three';
import { BaseComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry-lines-indexed',
  templateUrl: './webgl-buffergeometry-lines-indexed.component.html',
  styleUrls: ['./webgl-buffergeometry-lines-indexed.component.scss']
})
export class WebglBuffergeometryLinesIndexedComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  iteration_count = 4;
  rangle = 60 * Math.PI / 180.0;
  next_positions_index = 0;
  indices : number[] = [];
  positions : number[] = [];
  colors : number[] = [];

  add_vertex( v ) {
    if ( this.next_positions_index == 0xffff ) console.error( 'Too many points.' );
    this.positions.push( v.x, v.y, v.z );
    this.colors.push( Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1 );
    return this.next_positions_index ++;
  }

  snowflake_iteration( p0, p4, depth ) {

    if ( -- depth < 0 ) {
      const i = this.next_positions_index - 1; // p0 already there
      this.add_vertex( p4 );
      this.indices.push( i, i + 1 );

      return;

    }

    const v = p4.clone().sub( p0 );
    const v_tier = v.clone().multiplyScalar( 1 / 3 );
    const p1 = p0.clone().add( v_tier );

    const angle = Math.atan2( v.y, v.x ) + this.rangle;
    const length = v_tier.length();
    const p2 = p1.clone();
    p2.x += Math.cos( angle ) * length;
    p2.y += Math.sin( angle ) * length;

    const p3 = p0.clone().add( v_tier ).add( v_tier );

    this.snowflake_iteration( p0, p1, depth );
    this.snowflake_iteration( p1, p2, depth );
    this.snowflake_iteration( p2, p3, depth );
    this.snowflake_iteration( p3, p4, depth );

  }

  snowflake( points, loop, x_offset ) {
    for ( let iteration = 0; iteration != this.iteration_count; iteration ++ ) {

      this.add_vertex( points[ 0 ] );

      for ( let p_index = 0, p_count = points.length - 1; p_index != p_count; p_index ++ ) {

        this.snowflake_iteration( points[ p_index ], points[ p_index + 1 ], iteration );

      }

      if ( loop ) this.snowflake_iteration( points[ points.length - 1 ], points[ 0 ], iteration );

      // translate input curve for next iteration

      for ( let p_index = 0, p_count = points.length; p_index != p_count; p_index ++ ) {

        points[ p_index ].x += x_offset;

      }

    }

  }

  ngOnInit() {
    this.indices = [];
    this.positions = [];
    this.colors = [];
  
    let y = 0;

    this.snowflake(
      [
        new Vector3( 0, y, 0 ),
        new Vector3( 500, y, 0 )
      ],
      false, 600
    );

    y += 600;
    this.snowflake(
      [
        new Vector3( 0, y, 0 ),
        new Vector3( 250, y + 400, 0 ),
        new Vector3( 500, y, 0 )
      ],
      true, 600
    );

    y += 600;
    this.snowflake(
      [
        new Vector3( 0, y, 0 ),
        new Vector3( 500, y, 0 ),
        new Vector3( 500, y + 500, 0 ),
        new Vector3( 0, y + 500, 0 )
      ],
      true, 600
    );

    y += 1000;
    this.snowflake(
      [
        new Vector3( 250, y, 0 ),
        new Vector3( 500, y, 0 ),
        new Vector3( 250, y, 0 ),
        new Vector3( 250, y + 250, 0 ),
        new Vector3( 250, y, 0 ),
        new Vector3( 0, y, 0 ),
        new Vector3( 250, y, 0 ),
        new Vector3( 250, y - 250, 0 ),
        new Vector3( 250, y, 0 )
      ],
      false, 600
    );
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const object3d = this.mesh.getObject3d();
      const time = timer.elapsedTime;
      object3d.rotation.z = time * 0.5;
    }
  }

}
