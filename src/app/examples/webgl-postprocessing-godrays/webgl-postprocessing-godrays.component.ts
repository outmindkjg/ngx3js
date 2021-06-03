import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-postprocessing-godrays',
  templateUrl: './webgl-postprocessing-godrays.component.html',
  styleUrls: ['./webgl-postprocessing-godrays.component.scss']
})
export class WebglPostprocessingGodraysComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setSphere(mesh : MeshComponent) {
    this.sphere = mesh.getObject3d();
  }

  sphere : Object3D = null;
  orbitRadius :  number = 200;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.sphere !== null) {
      const time = timer.elapsedTime / 4;
      const sphereMesh = this.sphere;
      sphereMesh.position.x = this.orbitRadius * Math.cos( time );
      sphereMesh.position.z = this.orbitRadius * Math.sin( time ) - 100;
    }
  }
}
