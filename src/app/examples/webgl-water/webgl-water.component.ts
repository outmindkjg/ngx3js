import { Component } from '@angular/core';
import { IUniform, Mesh, ShaderMaterial } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-water',
  templateUrl: './webgl-water.component.html',
  styleUrls: ['./webgl-water.component.scss']
})
export class WebglWaterComponent extends BaseComponent<{
  color: string,
  scale: number,
  flowX: number,
  flowY: number,
  reflectivity : number
}> {
  constructor() {
    super({
      color: '#ffffff',
      scale: 4,
      flowX: 1,
      flowY: 1,
      reflectivity : 0.02
    },[
      { name : 'color', type : 'color', change : () => {
        if (this.uniforms !== null) {
          this.uniforms['color'].value.set(this.controls.color);
        }
      }},
      { name : 'scale', type : 'number', min : 1, max : 10, change : () => {
        if (this.uniforms !== null) {
					this.uniforms[ 'config' ].value.w = this.controls.scale;
        }
      }},
      { name : 'flowX', type : 'number', min : -1, max : 1 , step : 0.01, change : () => {
        if (this.uniforms !== null) {
          this.uniforms['flowDirection'].value.x = this.controls.flowX;
          this.uniforms['flowDirection'].value.normalize();
        }
      }},
      { name : 'flowY', type : 'number', min : -1, max : 1 , step : 0.01, change : () => {
        if (this.uniforms !== null) {
          this.uniforms['flowDirection'].value.y = this.controls.flowY;
          this.uniforms['flowDirection'].value.normalize();
        }
      } },
      { name : 'reflectivity', type : 'number', min : 0.001, max : 1 , step : 0.01, change : () => {
        if (this.uniforms !== null) {
          this.uniforms['reflectivity'].value = this.controls.reflectivity;
        }
      }},
    ]);
  }

  setWater(mesh : MeshComponent) {
    this.uniforms = (mesh.getObject3d() as any).material.uniforms;
  }
  
  uniforms : { [uniform: string]: IUniform } = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const delta = timer.delta;
      const torusKnot = this.mesh.getObject3d();
      torusKnot.rotation.x += delta;
      torusKnot.rotation.y += delta * 0.5;
    }
  }
}
