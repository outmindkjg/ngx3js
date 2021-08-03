import { Component } from '@angular/core';
import { BaseComponent } from '../../three';
import * as THREE from 'three';

@Component({
  selector: 'app-webgl-materials-video-webcam',
  templateUrl: './webgl-materials-video-webcam.component.html',
  styleUrls: ['./webgl-materials-video-webcam.component.scss']
})
export class WebglMaterialsVideoWebcamComponent extends BaseComponent<{}> {

  constructor() {
    super({},[]);
  }

  ngOnInit() {
    const count = 128;
    const radius = 32;
    this.planePostion = [];
    for ( let i = 1, l = count; i <= l; i ++ ) {
      const phi = Math.acos( - 1 + ( 2 * i ) / l );
      const theta = Math.sqrt( l * Math.PI ) * phi;
      const position = new THREE.Vector3(); 
      position.setFromSphericalCoords( radius, phi, theta );
      this.planePostion.push(position);
    }
  }

  planePostion : THREE.Vector3[] = [];
}
