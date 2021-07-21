import { Component } from '@angular/core';
import { Object3D } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-mirror-nodes',
  templateUrl: './webgl-mirror-nodes.component.html',
  styleUrls: ['./webgl-mirror-nodes.component.scss']
})
export class WebglMirrorNodesComponent extends BaseComponent<{ blur : number}> {

  constructor() {
    super({
      blur : 0
    },[
      { name : 'blur', type : 'number', min : 0, max : 25 }
    ]);
  }

  setSphereGroup(mesh : MeshComponent) {
    this.sphereGroup = mesh.getObject3d();
  }
  sphereGroup : Object3D = null;

  setSmallSphere(mesh : MeshComponent) {
    this.smallSphere = mesh.getObject3d();
  }
  smallSphere : Object3D = null;

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.sphereGroup !== null && this.smallSphere !== null) {
      const elapsedTime = timer.elapsedTime * 10;
      this.sphereGroup.rotation.y -= 0.02;
      this.smallSphere.position.set(
        Math.cos( elapsedTime * 0.1 ) * 30,
        Math.abs( Math.cos( elapsedTime * 0.2 ) ) * 20 + 5,
        Math.sin( elapsedTime * 0.1 ) * 30
      );
      this.smallSphere.rotation.y = ( Math.PI / 2 ) - elapsedTime * 0.1;
      this.smallSphere.rotation.z = elapsedTime * 0.8;
    }
  }  
}
