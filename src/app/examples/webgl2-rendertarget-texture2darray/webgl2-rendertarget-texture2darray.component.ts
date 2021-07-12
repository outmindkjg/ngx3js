import { Component } from '@angular/core';
import { IUniform, Mesh, ShaderMaterial } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl2-rendertarget-texture2darray',
  templateUrl: './webgl2-rendertarget-texture2darray.component.html',
  styleUrls: ['./webgl2-rendertarget-texture2darray.component.scss']
})
export class Webgl2RendertargetTexture2darrayComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

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