import { Component } from '@angular/core';
import { BaseComponent, MeshComponent, RendererTimer, THREE } from 'ngx3js';

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
    this.target = mesh.getObject3d();
    this.generateTarget();
  }

  setCone(mesh : MeshComponent) {
    this.corn = mesh.getObject3d();
    this.generateTarget();
  }

  target : THREE.Object3D = null;
  corn : THREE.Object3D = null;
  targetQuaternion : THREE.Quaternion = new THREE.Quaternion();
  spherical : THREE.Spherical = new THREE.Spherical();
  rotationMatrix : THREE.Matrix4 = new THREE.Matrix4();

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
      const targetMaterial = this.target['material'] as THREE.MeshBasicMaterial;
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
