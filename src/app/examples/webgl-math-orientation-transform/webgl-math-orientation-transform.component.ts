import { Component } from '@angular/core';
import { Object3D, Quaternion, Spherical, Matrix4, MeshBasicMaterial } from 'three';
import { BaseComponent, MeshComponent, RendererTimer } from '../../three';

@Component({
  selector: 'app-webgl-math-orientation-transform',
  templateUrl: './webgl-math-orientation-transform.component.html',
  styleUrls: ['./webgl-math-orientation-transform.component.scss']
})
export class WebglMathOrientationTransformComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setTarget(mesh : MeshComponent) {
    this.target = mesh.getMesh();
    this.generateTarget();
  }

  setCone(mesh : MeshComponent) {
    this.corn = mesh.getMesh();
    this.generateTarget();
  }

  target : Object3D = null;
  corn : Object3D = null;
  targetQuaternion : Quaternion = new Quaternion();
  spherical : Spherical = new Spherical();
  rotationMatrix : Matrix4 = new Matrix4();

  generateTarget() {
    if (this.target !== null && this.corn !== null) {
      const spherical = this.spherical;
      spherical.theta = Math.random() * Math.PI * 2;
      spherical.phi = Math.acos( ( 2 * Math.random() ) - 1 );
      spherical.radius = 2;
      this.target.position.setFromSpherical( spherical );
      this.rotationMatrix.lookAt( this.target.position, this.corn.position, this.corn.up );
      this.targetQuaternion.setFromRotationMatrix( this.rotationMatrix );
      setTimeout( () => {
        this.generateTarget()
      }, 2000 );
    }
  }

  onRender(timer : RendererTimer) {
    super.onRender(timer);
    if (this.corn !== null && this.target !== null) {
      const targetMaterial = this.target['material'] as MeshBasicMaterial;
      if (!this.corn.quaternion.equals( this.targetQuaternion )) {
        const delta = timer.delta;
        const step = 2 * delta;
        this.corn.quaternion.rotateTowards( this.targetQuaternion, step );
        targetMaterial.color.setRGB(0,1,0);
      } else {
        targetMaterial.color.setRGB(1,0,0);
      }
    }
  }

}
