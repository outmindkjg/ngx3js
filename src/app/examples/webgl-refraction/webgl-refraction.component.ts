import { Component } from '@angular/core';
import { ShaderMaterial, Mesh, DoubleSide } from 'three';
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

  setRefractor(refractor : MeshComponent) {
    this.refractorMaterial = (refractor.getMesh() as Mesh).material as ShaderMaterial;
    // this.refractorMaterial.side = DoubleSide;
  }

  refractorMaterial : ShaderMaterial;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.refractorMaterial !== null) {
      this.refractorMaterial.uniforms[ "time" ].value += timer.delta;
    }
  }
}
