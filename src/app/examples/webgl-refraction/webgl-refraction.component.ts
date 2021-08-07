import { Component } from '@angular/core';
import { Mesh, ShaderMaterial } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-refraction',
  templateUrl: './webgl-refraction.component.html',
  styleUrls: ['./webgl-refraction.component.scss']
})
export class WebglRefractionComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setSmallSphere(smallSphere : MeshComponent) {
    this.smallSphere = smallSphere.getObject3d();
  }

  smallSphere : THREE.Object3D = null;

  setRefractor(refractor : MeshComponent) {
    this.refractorMaterial = (refractor.getObject3d() as Mesh).material as ShaderMaterial;
    // this.refractorMaterial.side = DoubleSide;
  }

  refractorMaterial : ShaderMaterial;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.refractorMaterial !== null) {
      this.refractorMaterial.uniforms[ "time" ].value += timer.delta;
    }
    if (this.smallSphere !== null) {
      const time = timer.elapsedTime;
      this.smallSphere.position.set(
        Math.cos( time ) * 30,
        Math.abs( Math.cos( time * 2 ) ) * 20 + 5,
        Math.sin( time ) * 30
      )
      this.smallSphere.rotation.y = ( Math.PI / 2 ) - time;
      this.smallSphere.rotation.z = time * 8;
    }
  }
}
