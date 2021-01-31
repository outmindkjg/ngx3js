import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'three-listener',
  templateUrl: './listener.component.html',
  styleUrls: ['./listener.component.scss']
})
export class ListenerComponent implements OnInit {


  constructor() { }


  ngOnInit(): void {
  }

  private listener : THREE.AudioListener;

  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetListener();
    }
  }

  resetListener() {
    if (this.listener === null) {
      this.listener = this.getListener();
    }
    if (this.listener !== null && this.refObject3d !== null) {
      if (this.listener.parent !== this.refObject3d) {
        if (this.listener.parent !== null) {
          this.listener.parent.remove(this.listener);
        }
        this.refObject3d.add(this.listener);
      }
    }
  }

  getListener() : THREE.AudioListener {
    if (this.listener === null) {
      this.listener = new THREE.AudioListener();
    }
    return this.listener;
  }
}
