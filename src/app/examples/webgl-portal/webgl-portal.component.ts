import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-portal',
  templateUrl: './webgl-portal.component.html',
  styleUrls: ['./webgl-portal.component.scss']
})
export class WebglPortalComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  smallSphereOne : THREE.Object3D = null;
  setSmallSphereOne(mesh : MeshComponent) {
    this.smallSphereOne = mesh.getObject3d();
  }
  smallSphereTwo : THREE.Object3D = null;
  setSmallSphereTwo(mesh : MeshComponent) {
    this.smallSphereTwo = mesh.getObject3d();
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.smallSphereOne !== null && this.smallSphereTwo !== null) {
      const timerOne = timer.elapsedTime * 1000 * 0.01;
      const timerTwo = timerOne + Math.PI * 10.0;
      const smallSphereOne = this.smallSphereOne;
      const smallSphereTwo = this.smallSphereTwo;
      
      smallSphereOne.position.set(
        Math.cos( timerOne * 0.1 ) * 30,
        Math.abs( Math.cos( timerOne * 0.2 ) ) * 20 + 5,
        Math.sin( timerOne * 0.1 ) * 30
      );
      smallSphereOne.rotation.y = ( Math.PI / 2 ) - timerOne * 0.1;
      smallSphereOne.rotation.z = timerOne * 0.8;

      smallSphereTwo.position.set(
        Math.cos( timerTwo * 0.1 ) * 30,
        Math.abs( Math.cos( timerTwo * 0.2 ) ) * 20 + 5,
        Math.sin( timerTwo * 0.1 ) * 30
      );
      smallSphereTwo.rotation.y = ( Math.PI / 2 ) - timerTwo * 0.1;
      smallSphereTwo.rotation.z = timerTwo * 0.8;
    }

  }

}
