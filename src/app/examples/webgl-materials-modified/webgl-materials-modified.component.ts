import { Component } from '@angular/core';
import { BaseComponent, MaterialComponent, RendererTimer, THREE } from 'ngx3js';

@Component({
  selector: 'app-webgl-materials-modified',
  templateUrl: './webgl-materials-modified.component.html',
  styleUrls: ['./webgl-materials-modified.component.scss']
})
export class WebglMaterialsModifiedComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMaterial(matCom : MaterialComponent, amount : number) {
    const material : THREE.MeshNormalMaterial = matCom.getMaterial() as THREE.MeshNormalMaterial;
    material.onBeforeCompile = ( shader ) => {
      shader.uniforms.time = { value: 0 };
      shader.vertexShader = 'uniform float time;\n' + shader.vertexShader;
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        [
          `float theta = sin( time + position.y ) / ${ amount.toFixed( 1 ) };`,
          'float c = cos( theta );',
          'float s = sin( theta );',
          'mat3 m = mat3( c, 0, s, 0, 1, 0, -s, 0, c );',
          'vec3 transformed = vec3( position ) * m;',
          'vNormal = vNormal * m;'
        ].join( '\n' )
      );
      material.userData.shader = shader;
    };

    // Make sure WebGLRenderer doesnt reuse a single program

    material.customProgramCacheKey = () => {
      return amount.toString();
    };
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.meshChildren != null && this.meshChildren.length > 0) {
      const time = timer.elapsedTime;
      this.meshChildren.forEach(child => {
        const shader = (child as any).material.userData.shader;
        if (shader) {
          shader.uniforms.time.value = time;
        }
      });
    }
  }
}
