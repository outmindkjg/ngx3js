import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeGeometryCustom, ThreeUtil } from '../../interface';

@Component({
  selector: 'three-geometry-bird',
  templateUrl: './bird.component.html',
  styleUrls: ['./bird.component.scss']
})
export class GeometryBirdComponent extends ThreeGeometryCustom implements OnInit{
  @Input() width : number = 32;

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngAfterContentInit(): void {
  }

  initGeometry():THREE.BufferGeometry {
    const birds : number = this.width * this.width;
    const triangles = birds * 3;
    const points = triangles * 3;
    const geometry = new THREE.BufferGeometry();
    this.vertices = new THREE.BufferAttribute( new Float32Array( points * 3 ), 3 );
    const birdColors : any = new THREE.BufferAttribute( new Float32Array( points * 3 ), 3 );
    const references : any = new THREE.BufferAttribute( new Float32Array( points * 2 ), 2 );
    const birdVertex : any = new THREE.BufferAttribute( new Float32Array( points ), 1 );
    geometry.setAttribute( 'position', this.vertices );
    geometry.setAttribute( 'birdColor', birdColors );
    geometry.setAttribute( 'reference', references );
    geometry.setAttribute( 'birdVertex', birdVertex );
    const wingsSpan = 20;

    for ( let f = 0; f < birds ; f ++ ) {

      // Body
      this.vertsPush(
        0, - 0, - 20,
        0, 4, - 20,
        0, 0, 30
      );

      // Left Wing
      this.vertsPush(
        0, 0, - 15,
        - wingsSpan, 0, 0,
        0, 0, 15
      );

      // Right Wing
      this.vertsPush(
        0, 0, 15,
        wingsSpan, 0, 0,
        0, 0, - 15
      );

    }

    for ( let v = 0; v < triangles * 3; v ++ ) {

      const i = ~ ~ ( v / 3 );
      const x = ( i % this.width ) / this.width;
      const y = ~ ~ ( i / this.width ) / this.width;
      const c = new THREE.Color(
        0x444444 +
        ~ ~ ( v / 9 ) / birds * 0x666666
      );

      birdColors.array[ v * 3 + 0 ] = c.r;
      birdColors.array[ v * 3 + 1 ] = c.g;
      birdColors.array[ v * 3 + 2 ] = c.b;
      references.array[ v * 2 ] = x;
      references.array[ v * 2 + 1 ] = y;
      birdVertex.array[ v ] = v % 9;
    }
    return geometry;
  }
  v : number = 0;
  vertices : any = null;
  vertsPush(...args) {
    for ( let i = 0; i < args.length; i ++ ) {
      this.vertices.array[ this.v ++ ] = args[ i ];
    }
  }

}
