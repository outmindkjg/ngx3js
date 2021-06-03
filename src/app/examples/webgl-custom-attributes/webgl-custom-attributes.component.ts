import { Component } from '@angular/core';
import { BufferGeometry, IUniform, MathUtils, Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-custom-attributes',
  templateUrl: './webgl-custom-attributes.component.html',
  styleUrls: ['./webgl-custom-attributes.component.scss']
})
export class WebglCustomAttributesComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  vertexshader = `
  uniform float amplitude;

  attribute float displacement;

  varying vec3 vNormal;
  varying vec2 vUv;

  void main() {

    vNormal = normal;
    vUv = ( 0.5 + amplitude ) * uv + vec2( amplitude );

    vec3 newPosition = position + amplitude * normal * vec3( displacement );
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

  }
  `;

  fragmentshader = `
  varying vec3 vNormal;
  varying vec2 vUv;

  uniform vec3 color;
  uniform sampler2D colorTexture;

  void main() {

    vec3 light = vec3( 0.5, 0.2, 1.0 );
    light = normalize( light );

    float dProd = dot( vNormal, light ) * 0.5 + 0.5;

    vec4 tcolor = texture2D( colorTexture, vUv );
    vec4 gray = vec4( vec3( tcolor.r * 0.3 + tcolor.g * 0.59 + tcolor.b * 0.11 ), 1.0 );

    gl_FragColor = gray * vec4( vec3( dProd ) * vec3( color ), 1.0 );

  }
  `;  

  noise: Float32Array = null;
  displacement : Float32Array = null;
  object3d : Object3D = null;
  geometry : BufferGeometry = null;
  uniforms : { [uniform: string]: IUniform } = null;
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.object3d = mesh.getObject3d();
    this.geometry = (this.object3d as any).geometry;
    this.uniforms = (this.object3d as any).material.uniforms;
    this.displacement = this.geometry.attributes.displacement.array as Float32Array;
    this.noise = new Float32Array( this.geometry.attributes.position.count );
    for ( let i = 0; i < this.geometry.attributes.position.count; i ++ ) {
      this.noise[ i ] = Math.random() * 5;
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.object3d !== null && this.displacement !== null && this.noise !== null && this.geometry !== null) {
      const time = timer.elapsedTime * 10;
      this.object3d.rotation.y = this.object3d.rotation.z = 0.01 * time;

      this.uniforms[ "amplitude" ].value = 2.5 * Math.sin( this.object3d.rotation.y * 0.125 );
      this.uniforms[ "color" ].value.offsetHSL( 0.0005, 0, 0 );

      for ( let i = 0; i < this.displacement.length; i ++ ) {
        this.displacement[ i ] = Math.sin( 0.1 * i + time );
        this.noise[ i ] += 0.5 * ( 0.5 - Math.random() );
        this.noise[ i ] = MathUtils.clamp( this.noise[ i ], - 5, 5 );
        this.displacement[ i ] += this.noise[ i ];
      }
      this.geometry.attributes.displacement.needsUpdate = true;
    }
  }

}
