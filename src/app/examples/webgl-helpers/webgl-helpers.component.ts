import { Component } from '@angular/core';
import { BaseComponent, THREE } from '../../three';

@Component({
  selector: 'app-webgl-helpers',
  templateUrl: './webgl-helpers.component.html',
  styleUrls: ['./webgl-helpers.component.scss']
})
export class WebglHelpersComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  selectStoreMesh(object : THREE.Object3D): THREE.Object3D {
    const mesh = object.children[ 0 ] as THREE.Mesh;
    if (mesh.geometry){
      // mesh.geometry.scale(30,30,30);
      mesh.geometry.computeTangents();
    }
    return mesh;
  }
}
