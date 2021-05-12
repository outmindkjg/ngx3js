import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-shaders-vector',
  templateUrl: './webgl-shaders-vector.component.html',
  styleUrls: ['./webgl-shaders-vector.component.scss']
})
export class WebglShadersVectorComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  fragmentShader = `
  varying vec2 vUv;
  varying float flip;
  uniform vec3 color;

  float inCurve(vec2 uv) {
    return uv.x * uv.x - uv.y;
  }

  float delta = 0.1;

  void main() {
    float x = inCurve(vUv);

    if (x * flip > 0.) discard;
    gl_FragColor = vec4(color, 1.);
  }
  `;
  vertexShader = `
  varying vec2 vUv;
  attribute float invert;
  varying float flip;

  void main() {

    vUv = uv;
    flip = invert;
    vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
    gl_Position = projectionMatrix * mvPosition;

  }
  `;
}
