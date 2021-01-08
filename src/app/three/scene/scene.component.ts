import { Component, ContentChildren, OnInit, QueryList } from '@angular/core';
import * as THREE from 'three';
import { LightComponent } from './../light/light.component';
import { MeshComponent } from './../mesh/mesh.component';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @ContentChildren(LightComponent) lights: QueryList<LightComponent>;
  @ContentChildren(MeshComponent) meshes: QueryList<MeshComponent>;

  constructor() { }

  ngOnInit(): void {
  }

  private scene: THREE.Scene = null;

  getScene(): THREE.Scene {
    if (this.scene === null) {
      this.scene = new THREE.Scene();
      this.lights.forEach(light => {
        this.scene.add(light.getLight());
      });
      this.meshes.forEach(mesh => {
        this.scene.add(mesh.getMesh());
      })
      console.log(this.scene.children);
    }
    return this.scene;
  }

}
