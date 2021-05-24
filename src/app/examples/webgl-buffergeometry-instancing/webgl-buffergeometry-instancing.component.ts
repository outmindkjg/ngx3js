import { Component } from '@angular/core';
import { IUniform, Object3D, Vector4 } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry-instancing',
  templateUrl: './webgl-buffergeometry-instancing.component.html',
  styleUrls: ['./webgl-buffergeometry-instancing.component.scss']
})
export class WebglBuffergeometryInstancingComponent extends BaseComponent<{
  instanceCount : number;
}> {

  constructor() {
    super({instanceCount : 50000},[
      { name : 'instanceCount', type : 'number', min : 0, max : 50000, step : 1, change : () => {
        if (this.object3d !== null) {
          (this.object3d as any).geometry.instanceCount = this.controls.instanceCount;
        }
      }}
    ]);
  }

  vertexShader = `
  precision highp float;

  uniform float sineTime;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  attribute vec3 position;
  attribute vec3 offset;
  attribute vec4 color;
  attribute vec4 orientationStart;
  attribute vec4 orientationEnd;

  varying vec3 vPosition;
  varying vec4 vColor;

  void main(){

    vPosition = offset * max( abs( sineTime * 2.0 + 1.0 ), 0.5 ) + position;
    vec4 orientation = normalize( mix( orientationStart, orientationEnd, sineTime ) );
    vec3 vcV = cross( orientation.xyz, vPosition );
    vPosition = vcV * ( 2.0 * orientation.w ) + ( cross( orientation.xyz, vcV ) * 2.0 + vPosition );

    vColor = color;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( vPosition, 1.0 );

  }

  `;

  fragmentShader = `
  precision highp float;

  uniform float time;

  varying vec3 vPosition;
  varying vec4 vColor;

  void main() {

    vec4 color = vec4( vColor );
    color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

    gl_FragColor = color;

  }
  `;

  ngOnInit() {
    const vector = new Vector4();
    const instances = 50000;
    const positions = [];
    const offsets = [];
    const colors = [];
    const orientationsStart = [];
    const orientationsEnd = [];

    positions.push( 0.025, - 0.025, 0 );
    positions.push( - 0.025, 0.025, 0 );
    positions.push( 0, 0, 0.025 );

    // instanced attributes

    for ( let i = 0; i < instances; i ++ ) {

      // offsets

      offsets.push( Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5 );

      // colors

      colors.push( Math.random(), Math.random(), Math.random(), Math.random() );

      // orientation start

      vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
      vector.normalize();

      orientationsStart.push( vector.x, vector.y, vector.z, vector.w );

      // orientation end

      vector.set( Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1 );
      vector.normalize();
      orientationsEnd.push( vector.x, vector.y, vector.z, vector.w );
    }
    this.positions = positions;
    this.offsets = offsets;
    this.colors = colors;
    this.orientationsStart = orientationsStart;
    this.orientationsEnd = orientationsEnd;
  }
 
  positions = [];
  offsets = [];
  colors = [];
  orientationsStart = [];
  orientationsEnd = [];

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.object3d = mesh.getObject3D();
    this.uniforms = (this.object3d as any).material.uniforms;
  }

  object3d : Object3D = null;
  uniforms : { [uniform: string]: IUniform } = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.object3d !== null && this.uniforms !== null) {
			const time = timer.elapsedTime * 1000;
			this.object3d.rotation.y = time * 0.0005;
			this.uniforms[ "time" ].value = time * 0.005;
			this.uniforms[ "sineTime" ].value = Math.sin( this.uniforms[ "time" ].value * 0.05 );
    }
  }
}
