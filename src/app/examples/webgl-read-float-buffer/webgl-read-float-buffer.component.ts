import { Component } from '@angular/core';
import { ShaderMaterial } from 'three';
import { BaseComponent, RendererTimer } from '../../three';
import { MaterialComponent } from '../../three/material/material.component';

@Component({
  selector: 'app-webgl-read-float-buffer',
  templateUrl: './webgl-read-float-buffer.component.html',
  styleUrls: ['./webgl-read-float-buffer.component.scss']
})
export class WebglReadFloatBufferComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  fragment_shader_screen = `
  varying vec2 vUv;
  uniform sampler2D tDiffuse;

  void main() {

    gl_FragColor = texture2D( tDiffuse, vUv );

  }
  `;

  fragment_shader_pass_1 = `
  varying vec2 vUv;
  uniform float time;

  void main() {

    float r = vUv.x;
    if( vUv.y < 0.5 ) r = 0.0;
    float g = vUv.y;
    if( vUv.x < 0.5 ) g = 0.0;

    gl_FragColor = vec4( r, g, time, 1.0 );

  }
  `;

  vertexShader = `
  varying vec2 vUv;

  void main() {

    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

  }
  `;

  setMaterial(material : MaterialComponent) {
    this.material = material.getMaterial() as ShaderMaterial;
  }

  material : ShaderMaterial = null;
  delta = 0.01;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const time = timer.elapsedTime * 1.5;
      const mesh = this.mesh.getObject3d();
      mesh.rotation.y = - time;
      if (this.material !== null) {
				if ( this.material.uniforms[ "time" ].value > 1 || this.material.uniforms[ "time" ].value < 0 ) {
					this.delta *= - 1;
				}
				this.material.uniforms[ "time" ].value += this.delta;
      }
    }
  }

}
