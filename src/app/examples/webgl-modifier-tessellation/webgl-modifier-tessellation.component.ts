import { Component } from '@angular/core';
import { BaseComponent, GeometryComponent, RendererTimer } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-modifier-tessellation',
  templateUrl: './webgl-modifier-tessellation.component.html',
  styleUrls: ['./webgl-modifier-tessellation.component.scss']
})
export class WebglModifierTessellationComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  vertexShader = `
uniform float amplitude;

attribute vec3 customColor;
attribute vec3 displacement;

varying vec3 vNormal;
varying vec3 vColor;

void main() {

  vNormal = normal;
  vColor = customColor;

  vec3 newPosition = position + normal * amplitude * displacement;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );

}

`
  fragmentShader = `
varying vec3 vNormal;
varying vec3 vColor;

void main() {

  const float ambient = 0.4;

  vec3 light = vec3( 1.0 );
  light = normalize( light );

  float directional = max( dot( vNormal, light ), 0.0 );

  gl_FragColor = vec4( ( directional + ambient ) * vColor, 1.0 );

}
`

  uniforms = { amplitude: { value: 1.0 } }

  setGeometry(geometryCom : GeometryComponent) {
    const geometry = geometryCom.getGeometry();
    this.consoleLog('geometry', geometry);
    if (geometry.attributes.position !== undefined) {
      const numFaces = geometry.attributes.position.count / 3;
      const colors = new Float32Array( numFaces * 3 * 3 );
      const displacement = new Float32Array( numFaces * 3 * 3 );
      const color = new THREE.Color();
      for ( let f = 0; f < numFaces; f ++ ) {
        const index = 9 * f;
        const h = 0.2 * Math.random();
        const s = 0.5 + 0.5 * Math.random();
        const l = 0.5 + 0.5 * Math.random();
        color.setHSL( h, s, l );
        const d = 10 * ( 0.5 - Math.random() );
        for ( let i = 0; i < 3; i ++ ) {
          colors[ index + ( 3 * i ) ] = color.r;
          colors[ index + ( 3 * i ) + 1 ] = color.g;
          colors[ index + ( 3 * i ) + 2 ] = color.b;
          displacement[ index + ( 3 * i ) ] = d;
          displacement[ index + ( 3 * i ) + 1 ] = d;
          displacement[ index + ( 3 * i ) + 2 ] = d;
        }
      }
      geometry.setAttribute( 'customColor', new THREE.BufferAttribute( colors, 3 ) );
      geometry.setAttribute( 'displacement', new THREE.BufferAttribute( displacement, 3 ) );
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const time = timer.elapsedTime ;
    this.uniforms.amplitude.value = 1.0 + Math.sin( time * 0.5 );
  }
}
