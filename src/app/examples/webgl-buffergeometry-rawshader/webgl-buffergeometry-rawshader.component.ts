import { Component } from '@angular/core';
import { IUniform, Mesh } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry-rawshader',
  templateUrl: './webgl-buffergeometry-rawshader.component.html',
  styleUrls: ['./webgl-buffergeometry-rawshader.component.scss']
})
export class WebglBuffergeometryRawshaderComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  vertexShader = `
  precision mediump float;
  precision mediump int;

  uniform mat4 modelViewMatrix; // optional
  uniform mat4 projectionMatrix; // optional

  attribute vec3 position;
  attribute vec4 color;

  varying vec3 vPosition;
  varying vec4 vColor;

  void main()	{

    vPosition = position;
    vColor = color;

    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }
  `;

  fragmentShader = `
  precision mediump float;
  precision mediump int;

  uniform float time;

  varying vec3 vPosition;
  varying vec4 vColor;

  void main()	{

    vec4 color = vec4( vColor );
    color.r += sin( vPosition.x * 10.0 + time ) * 0.5;

    gl_FragColor = color;

  }
  `;

  ngOnInit() {
    const vertexCount = 200 * 3;
    const positions = [];
    const colors = [];

    for ( let i = 0; i < vertexCount; i ++ ) {

      // adding x,y,z
      positions.push( Math.random() - 0.5 );
      positions.push( Math.random() - 0.5 );
      positions.push( Math.random() - 0.5 );

      // adding r,g,b,a
      colors.push( Math.random() * 255 );
      colors.push( Math.random() * 255 );
      colors.push( Math.random() * 255 );
      colors.push( Math.random() * 255 );

    }

    this.positions = positions;
    this.colors = colors;
  }

  positions : number[] = [];
  colors : number[] = [];

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.object3d = mesh.getObject3D() as Mesh;
    this.uniforms = (this.object3d as any).material.uniforms;
  }

  object3d : Mesh = null;
  uniforms : { [uniform: string]: IUniform } = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.object3d !== null && this.uniforms !== null) {
      const time = timer.elapsedTime;
      this.uniforms[ "time" ].value = time * 5;
      this.object3d.rotation.x = time * 0.2;
      this.object3d.rotation.y = time * 0.4;
    }
  }

}
