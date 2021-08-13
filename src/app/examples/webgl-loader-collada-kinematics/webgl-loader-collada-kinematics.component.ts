import { Component } from '@angular/core';
import { BaseComponent, MeshComponent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-loader-collada-kinematics',
  templateUrl: './webgl-loader-collada-kinematics.component.html',
  styleUrls: ['./webgl-loader-collada-kinematics.component.scss']
})
export class WebglLoaderColladaKinematicsComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  setMesh(mesh : MeshComponent) {
    super.setMesh(mesh);
    const dae = mesh.getObject3d();
    console.log(dae);
    dae.traverse( ( child:any  ) => {
      if ( child.isMesh ) {
        child.material.flatShading = true;
        child.material.color = new THREE.Color(0xffffff);
      }
    });
  }
}
