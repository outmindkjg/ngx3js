import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl2-volume-instancing',
  templateUrl: './webgl2-volume-instancing.component.html',
  styleUrls: ['./webgl2-volume-instancing.component.scss']
})
export class Webgl2VolumeInstancingComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const mesh = new THREE.PlaneGeometry();
    const clone = mesh.clone();
    
    console.log(mesh, clone instanceof THREE.PlaneGeometry);
  }

}
