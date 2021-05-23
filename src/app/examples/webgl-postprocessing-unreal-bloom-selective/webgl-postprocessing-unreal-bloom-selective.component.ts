import { Component } from '@angular/core';
import { BaseComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-unreal-bloom-selective',
  templateUrl: './webgl-postprocessing-unreal-bloom-selective.component.html',
  styleUrls: ['./webgl-postprocessing-unreal-bloom-selective.component.scss']
})
export class WebglPostprocessingUnrealBloomSelectiveComponent extends BaseComponent<{
  exposure: number,
  bloomStrength: number,
  bloomThreshold: number,
  bloomRadius: number,
  scene: string
}> {

  constructor() {
    super({
      exposure: 1,
      bloomStrength: 5,
      bloomThreshold: 0,
      bloomRadius: 0,
      scene: "Scene with Glow"
    },[]);
  }

  vertexshader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }
  `;

  fragmentshader = `
  uniform sampler2D baseTexture;
  uniform sampler2D bloomTexture;
  varying vec2 vUv;
  void main() {
    gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
  }
  `;
}
