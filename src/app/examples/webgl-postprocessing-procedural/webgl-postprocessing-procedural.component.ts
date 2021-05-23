import { Component } from '@angular/core';
import { BaseComponent, MeshComponent } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-procedural',
  templateUrl: './webgl-postprocessing-procedural.component.html',
  styleUrls: ['./webgl-postprocessing-procedural.component.scss']
})
export class WebglPostprocessingProceduralComponent extends BaseComponent<{
  procedure: string;
}> {

  constructor() {
    super({
      procedure: 'noiseRandom3D'
    },[
      { name : 'procedure', type : 'select', select : ['noiseRandom1D', 'noiseRandom2D', 'noiseRandom3D'], change : () => {
        this.changeFragmentShader();
      }}
    ]);
  }

  ngOnInit() {
    this.changeFragmentShader();
  }

  changeFragmentShader() {
    switch(this.controls.procedure) {
      case 'noiseRandom1D' :
        this.fragmentShader = this.noiseRandom1D;
        break;
      case 'noiseRandom2D' :
        this.fragmentShader = this.noiseRandom2D;
        break;
      case 'noiseRandom3D' :
        this.fragmentShader = this.noiseRandom3D;
        break;
    }
  }
  vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
  `;

  fragmentShader = '';

  noiseRandom1D = `
  #include <common>

  varying vec2 vUv;

  void main() {
    gl_FragColor.xyz = vec3( rand( vUv ) );
    gl_FragColor.w = 1.0;
  }
  `;

  noiseRandom2D = `
  #include <common>

  varying vec2 vUv;

  void main() {
    vec2 rand2 = vec2( rand( vUv ), rand( vUv + vec2( 0.4, 0.6 ) ) );
    gl_FragColor.xyz = mix( mix( vec3( 1.0, 1.0, 1.0 ), vec3( 0.0, 0.0, 1.0 ), rand2.x ), vec3( 0.0 ), rand2.y );
    gl_FragColor.w = 1.0;
  }
  `;

  noiseRandom3D = `
  #include <common>

  varying vec2 vUv;

  void main() {
    vec3 rand3 = vec3( rand( vUv ), rand( vUv + vec2( 0.4, 0.6 ) ), rand( vUv + vec2( 0.6, 0.4 ) ) );
    gl_FragColor.xyz = rand3;
    gl_FragColor.w = 1.0;
  }
  `;

}
