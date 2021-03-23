import { Component } from '@angular/core';
import { BaseComponent, RendererTimer } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-instancing-dynamic',
  templateUrl: './webgl-instancing-dynamic.component.html',
  styleUrls: ['./webgl-instancing-dynamic.component.scss'],
})
export class WebglInstancingDynamicComponent extends BaseComponent<{
  amount : number,
  count : number
}> {
  constructor() {
    super({
      amount : 10,
      count : 1000
    }, [
      { name : 'count', type : 'number', min : 10, max : 1000, step : 1}
    ]);
  }

  onRender(timer: RendererTimer) {
    super.onRender(timer);
    if (this.mesh !== null) {
      const mesh = this.mesh.getRealMesh() as THREE.InstancedMesh;
      const dummy = new THREE.Object3D();
      const amount = this.controls.amount;
      const time = Date.now() * 0.001;
      mesh.rotation.x = Math.sin(time / 4);
      mesh.rotation.y = Math.sin(time / 2);
      let i = 0;
      const offset = (amount - 1) / 2;
      for (let x = 0; x < amount; x++) {
        for (let y = 0; y < amount; y++) {
          for (let z = 0; z < amount; z++) {
            dummy.position.set(offset - x, offset - y, offset - z);
            dummy.rotation.y =
              Math.sin(x / 4 + time) +
              Math.sin(y / 4 + time) +
              Math.sin(z / 4 + time);
            dummy.rotation.z = dummy.rotation.y * 2;
            dummy.updateMatrix();
            mesh.setMatrixAt(i++, dummy.matrix);
          }
        }
      }
      mesh.instanceMatrix.needsUpdate = true;
    }
  }
}
