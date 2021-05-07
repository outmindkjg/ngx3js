import { Component } from '@angular/core';
import * as THREE from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-morphtargets-sphere',
  templateUrl: './webgl-morphtargets-sphere.component.html',
  styleUrls: ['./webgl-morphtargets-sphere.component.scss']
})
export class WebglMorphtargetsSphereComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    this.realMesh = mesh.getRealMesh() as THREE.Mesh;
  }

  realMesh : THREE.Mesh = null;
  sign : number = 1;
  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.realMesh !== null) {
      const delta = timer.delta;
      const step = delta * 0.5;
      this.realMesh.rotation.y += step;
      const morphTargetInfluences = this.realMesh.morphTargetInfluences[ 1 ] + step * this.sign;
      this.realMesh.morphTargetInfluences[ 1 ] = morphTargetInfluences;
      if ( morphTargetInfluences <= 0 || morphTargetInfluences >= 1 ) {
        this.sign *= - 1;
      }
    }
  }
}
