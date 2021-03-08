import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-geometry-spline-editor',
  templateUrl: './webgl-geometry-spline-editor.component.html',
  styleUrls: ['./webgl-geometry-spline-editor.component.scss']
})
export class WebglGeometrySplineEditorComponent extends BaseComponent<{
  uniform: boolean,
  tension: number,
  centripetal: boolean,
  chordal: boolean,
  addPoint: () => void,
  removePoint: () => void,
  exportSpline: () => void
}> {

  constructor() {
    super({
      uniform: true,
      tension: 0.5,
      centripetal: true,
      chordal: true,
      addPoint: () => {
        this.addPoint();
      },
      removePoint: () => {
        this.removePoint();
      },
      exportSpline: () => {
				const strplace = [];
				for ( let i = 0; i < this.splinePointsLength; i ++ ) {
					const p = this.positions[i];
					strplace.push( `new THREE.Vector3(${p.x}, ${p.y}, ${p.z})` );
				}
				console.log( strplace.join( ',\n' ) );
				const code = '[' + ( strplace.join( ',\n\t' ) ) + ']';
				prompt( 'copy and paste code', code );
      }
    },[
      { name : 'uniform', type : 'checkbox'},
      { name : 'tension', type : 'number', min : 0, max : 1, step : 0.01, change : () =>{

      }},
      { name : 'centripetal', type : 'checkbox'},
      { name : 'chordal', type : 'checkbox'},
      { name : 'addPoint', type : 'button'},
      { name : 'removePoint', type : 'button'},
      { name : 'exportSpline', type : 'button'},
    ]);
  }

  ngOnInit() {
    this.load( [
      {x : 289.76843686945404, y : 452.51481137238443, z : 56.10018915737797 },
      {x : - 53.56300074753207, y : 171.49711742836848, z : - 14.495472686253045 },
      {x : - 91.40118730204415, y : 176.4306956436485, z : - 6.958271935582161 },
      {x : - 383.785318791128, y : 491.1365363371675, z : 47.869296953772746 } 
    ]);
    this.updateSplineOutline();
  }

  addSplineObject( ) {
    return { x : Math.random() * 1000 - 500, y : Math.random() * 600, z : Math.random() * 800 - 400, color : Math.random() * 0xffffff }
  }

  addPoint() {
    this.splinePointsLength ++;
    this.positions.push( this.addSplineObject());
    this.updateSplineOutline();
  }

  splinePointsLength : number = 0;
  removePoint() {
    if ( this.splinePointsLength <= 4 ) {
      return;
    }
    this.splinePointsLength --;
    this.positions.pop();
    this.updateSplineOutline();
  }

  catmullRomCurves : {
    curvePath : { x : number, y : number, z : number}[],
    curveType : string,
    color : number,
    visible : boolean
  }[] = [];
  updateSplineOutline() {
    this.catmullRomCurves = [];
    const curveTypes = [{
      curveType : 'catmullrom',
      color : 0xff0000,
      visible : this.controls.uniform
    },{
      curveType : 'centripetal',
      color : 0x00ff00,
      visible : this.controls.centripetal
    },{
      curveType : 'chordal',
      color : 0x0000ff,
      visible : this.controls.chordal
    }];
    const curvePath : { x : number, y : number, z : number}[] = [];
    this.positions.forEach(p => {
      curvePath.push({ x : p.x, y : p.y, z : p.z })
    })
    curveTypes.forEach(curveInfo => {
      this.catmullRomCurves.push({
        curvePath : curvePath,
        curveType : curveInfo.curveType,
        color : curveInfo.color,
        visible : curveInfo.visible
      })
    });
  }
  
  positions : { x: number, y : number , z : number, color : number }[] = [];

  load( new_positions : { x: number, y : number , z : number}[] ) {
    while ( new_positions.length > this.positions.length ) {
      this.addPoint();
    }
    while ( new_positions.length < this.positions.length ) {
      this.removePoint();
    }
    for ( let i = 0; i < this.positions.length; i ++ ) {
      this.positions[ i ].x = new_positions[ i ].x;
      this.positions[ i ].y = new_positions[ i ].y;
      this.positions[ i ].z = new_positions[ i ].z;
    }
  }

}
