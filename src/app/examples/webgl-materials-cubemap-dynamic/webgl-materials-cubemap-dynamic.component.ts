import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, ThreeUtil } from '../../three';

@Component({
  selector: 'app-webgl-materials-cubemap-dynamic',
  templateUrl: './webgl-materials-cubemap-dynamic.component.html',
  styleUrls: ['./webgl-materials-cubemap-dynamic.component.scss']
})
export class WebglMaterialsCubemapDynamicComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  cube : any = null;
  setCube(mesh : MeshComponent) {
    this.cube = mesh.getMesh();
  }

  torus : any = null;
  setTorus(mesh : MeshComponent) {
    this.torus = mesh.getMesh();
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    const time = timer.elapsedTime * 1000;
    if (this.cube !== null) {
      this.cube.position.x = Math.cos( time * 0.001 ) * 35;
      this.cube.position.y = Math.sin( time * 0.001 ) * 35;
      this.cube.position.z = Math.sin( time * 0.001 ) * 35;
      this.cube.rotation.x += 0.02;
      this.cube.rotation.y += 0.03;
    }
    if (this.torus !== null) {
      this.torus.position.x = Math.cos( time * 0.001 + 10 ) * 35;
      this.torus.position.y = Math.sin( time * 0.001 + 10 ) * 35;
      this.torus.position.z = Math.sin( time * 0.001 + 10 ) * 35;
      this.torus.rotation.x += 0.02;
      this.torus.rotation.y += 0.03;
    }

  }
}