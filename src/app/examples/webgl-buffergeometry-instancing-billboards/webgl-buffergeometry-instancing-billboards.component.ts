import { Component } from '@angular/core';
import { CircleGeometry, IUniform, Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-buffergeometry-instancing-billboards',
  templateUrl: './webgl-buffergeometry-instancing-billboards.component.html',
  styleUrls: ['./webgl-buffergeometry-instancing-billboards.component.scss']
})
export class WebglBuffergeometryInstancingBillboardsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  vshader = `
  precision highp float;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  uniform float time;

  attribute vec3 position;
  attribute vec2 uv;
  attribute vec3 translate;

  varying vec2 vUv;
  varying float vScale;

  void main() {

    vec4 mvPosition = modelViewMatrix * vec4( translate, 1.0 );
    vec3 trTime = vec3(translate.x + time,translate.y + time,translate.z + time);
    float scale =  sin( trTime.x * 2.1 ) + sin( trTime.y * 3.2 ) + sin( trTime.z * 4.3 );
    vScale = scale;
    scale = scale * 10.0 + 10.0;
    mvPosition.xyz += position * scale;
    vUv = uv;
    gl_Position = projectionMatrix * mvPosition;

  }
  `;

  fshader = `
  precision highp float;

  uniform sampler2D map;

  varying vec2 vUv;
  varying float vScale;

  // HSL to RGB Convertion helpers
  vec3 HUEtoRGB(float H){
    H = mod(H,1.0);
    float R = abs(H * 6.0 - 3.0) - 1.0;
    float G = 2.0 - abs(H * 6.0 - 2.0);
    float B = 2.0 - abs(H * 6.0 - 4.0);
    return clamp(vec3(R,G,B),0.0,1.0);
  }

  vec3 HSLtoRGB(vec3 HSL){
    vec3 RGB = HUEtoRGB(HSL.x);
    float C = (1.0 - abs(2.0 * HSL.z - 1.0)) * HSL.y;
    return (RGB - 0.5) * C + HSL.z;
  }

  void main() {
    vec4 diffuseColor = texture2D( map, vUv );
    gl_FragColor = vec4( diffuseColor.xyz * HSLtoRGB(vec3(vScale/5.0, 1.0, 0.5)), diffuseColor.w );

    if ( diffuseColor.w < 0.5 ) discard;
  }
  `;

  ngOnInit() {
    const circleGeometry = new CircleGeometry( 1, 6 );
    const particleCount = 75000;
    const translateArray : number[] = [];
    for ( let i = 0, i3 = 0, l = particleCount; i < l; i ++, i3 += 3 ) {
      translateArray.push(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    }
    this.index = circleGeometry.index;
    this.attributes = circleGeometry.attributes;
    this.translateArray = translateArray;
  }
  index : any = null;
  attributes : any = null;
  translateArray : number[] = [];

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
      const time = timer.elapsedTime * 0.5;
      this.uniforms[ "time" ].value = time;
      this.object3d.rotation.x = time * 0.2;
      this.object3d.rotation.y = time * 0.4;
    }
  }
}
