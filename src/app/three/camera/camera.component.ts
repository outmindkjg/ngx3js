import { Component, OnInit } from '@angular/core';

import * as THREE from 'three';

@Component({
  selector: 'three-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  private camera : THREE.Camera = null;

  getCamera(aspect : number) : THREE.Camera {
    if (this.camera === null) {
      this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
      this.camera.position.x = -30;
      this.camera.position.y = 40;
      this.camera.position.z = 50;
      this.camera.lookAt(new THREE.Vector3(10, 0, 0));
    }
    if (this.camera instanceof THREE.PerspectiveCamera) {
      if (this.camera.aspect != aspect) {
        this.camera.aspect = aspect;
        this.camera.updateProjectionMatrix();
      }
    }
    return this.camera;
  }
}
