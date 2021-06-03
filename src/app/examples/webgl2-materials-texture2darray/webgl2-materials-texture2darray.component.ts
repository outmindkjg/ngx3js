import { Component } from '@angular/core';
import { IUniform, Mesh, ShaderMaterial } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl2-materials-texture2darray',
  templateUrl: './webgl2-materials-texture2darray.component.html',
  styleUrls: ['./webgl2-materials-texture2darray.component.scss']
})
export class Webgl2MaterialsTexture2darrayComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  vertexShader = `
	uniform vec2 size;
	out vec2 vUv;

	void main() {

		gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		// Convert position.xy to 1.0-0.0

		vUv.xy = position.xy / size + 0.5;
		vUv.y = 1.0 - vUv.y; // original data is upside down

	}
  `;

  fragmentShader = `
	precision highp float;
	precision highp int;
	precision highp sampler2DArray;

	uniform sampler2DArray diffuse;
	in vec2 vUv;
	uniform int depth;

	out vec4 outColor;

	void main() {

		vec4 color = texture( diffuse, vec3( vUv, depth ) );

		// lighten a bit
		outColor = vec4( color.rrr * 1.5, 1.0 );

	}
  `;

  uniformsDepth : IUniform = null;
  depthStep : number = 0.4;
  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    const object3d = mesh.getObject3d();
    if (object3d instanceof Mesh) {
      this.uniformsDepth = (object3d.material as ShaderMaterial).uniforms['depth'];
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.uniformsDepth !== null) {
      let value = this.uniformsDepth.value; 
      value += this.depthStep * timer.delta * 30;
      if ( value > 109.0 || value < 0.0 ) {
        if ( value > 1.0 ) value = 109.0 * 2.0 - value;
        if ( value < 0.0 ) value = - value;
        this.depthStep = - this.depthStep;
      }
      this.uniformsDepth.value = value;
    }
  }
}
