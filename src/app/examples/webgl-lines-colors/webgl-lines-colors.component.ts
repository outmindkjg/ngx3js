import { Component } from '@angular/core';
import { BaseComponent, GeometryUtils, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-lines-colors',
  templateUrl: './webgl-lines-colors.component.html',
  styleUrls: ['./webgl-lines-colors.component.scss']
})
export class WebglLinesColorsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const hilbertPoints = GeometryUtils.hilbert3D( new THREE.Vector3( 0, 0, 0 ), 200.0, 1, 0, 1, 2, 3, 4, 5, 6, 7 );
    const point = new THREE.Vector3();
    const color = new THREE.Color();
    const subdivisions = 6;
    const spline = new THREE.CatmullRomCurve3( hilbertPoints );
    let vertices = [];
    let colors1 = [];
    let colors2 = [];
    let colors3 = [];

    for ( let i = 0; i < hilbertPoints.length * subdivisions; i ++ ) {
      const t = i / ( hilbertPoints.length * subdivisions );
      spline.getPoint( t, point );

      vertices.push( point.x, point.y, point.z );
      color.setHSL( 0.6, 1.0, Math.max( 0, - point.x / 200 ) + 0.5 );
      colors1.push( color.r, color.g, color.b );

      color.setHSL( 0.9, 1.0, Math.max( 0, - point.y / 200 ) + 0.5 );
      colors2.push( color.r, color.g, color.b );

      color.setHSL( i / ( hilbertPoints.length * subdivisions ), 1.0, 0.5 );
      colors3.push( color.r, color.g, color.b );
    }
    const scale = 0.3, d = 225;
    this.geometryInfos.push({
      scale : scale * 1.5,
      x :- d, 
      y : - d / 2, 
      z : 0,
      color : colors1,
      position : vertices
    });
    this.geometryInfos.push({
      scale : scale * 1.5,
      x : 0, 
      y : - d / 2, 
      z : 0,
      color : colors2,
      position : vertices
    });
    this.geometryInfos.push({
      scale : scale * 1.5,
      x : d, 
      y : - d / 2, 
      z : 0,
      color : colors3,
      position : vertices
    });

    vertices = [];
    colors1 = [];
    colors2 = [];
    colors3 = [];

    for ( let i = 0; i < hilbertPoints.length; i ++ ) {

      const point = hilbertPoints[ i ];

      vertices.push( point.x, point.y, point.z );

      color.setHSL( 0.6, 1.0, Math.max( 0, ( 200 - hilbertPoints[ i ].x ) / 400 ) * 0.5 + 0.5 );
      colors1.push( color.r, color.g, color.b );

      color.setHSL( 0.3, 1.0, Math.max( 0, ( 200 + hilbertPoints[ i ].x ) / 400 ) * 0.5 );
      colors2.push( color.r, color.g, color.b );

      color.setHSL( i / hilbertPoints.length, 1.0, 0.5 );
      colors3.push( color.r, color.g, color.b );

    }

    this.geometryInfos.push({
      scale : scale * 1.5,
      x : - d, 
      y : d / 2, 
      z : 0,
      color : colors1,
      position : vertices
    });
    this.geometryInfos.push({
      scale : scale * 1.5,
      x : 0, 
      y : d / 2, 
      z : 0,
      color : colors2,
      position : vertices
    });
    this.geometryInfos.push({
      scale : scale * 1.5,
      x : d, 
      y : d / 2, 
      z : 0,
      color : colors3,
      position : vertices
    });

  }

  geometryInfos : {
    scale : number,
    x : number,
    y : number,
    z : number,
    color : number[],
    position : number[]
  }[] = [];


}
