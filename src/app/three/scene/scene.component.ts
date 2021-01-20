import { Component, ContentChild, ContentChildren, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { LightComponent } from './../light/light.component';
import { MeshComponent } from './../mesh/mesh.component';
import { LineComponent } from './../line/line.component';
import { FogComponent } from '../fog/fog.component';
import { MaterialComponent } from '../material/material.component';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @ContentChildren(LightComponent,{descendants: false}) lights: QueryList<LightComponent>;
  @ContentChildren(MeshComponent,{descendants: false}) meshes: QueryList<MeshComponent>;
  @ContentChildren(LineComponent,{descendants: false}) lines: QueryList<LineComponent>;
  @ContentChild(FogComponent,{descendants: false}) fog: FogComponent = null;
  @ContentChild(MaterialComponent,{descendants: false}) overrideMaterial: MaterialComponent = null;

  constructor() { }

  ngOnInit(): void {
  }

  private scene: THREE.Scene = null;

  ngAfterContentInit(): void {
    this.meshes.changes.subscribe((e) => {
      const scene = this.getScene();
      this.meshes.forEach(mesh => {
        mesh.setObject3D(scene);
      });
    });
    this.lights.changes.subscribe((e) => {
      const scene = this.getScene();
      this.lights.forEach(light => {
        light.setObject3D(scene);
      });
    });
    this.lines.changes.subscribe((e) => {
      const scene = this.getScene();
      this.lines.forEach(light => {
        light.setObject3D(scene);
      });
    });
  }

  getPosition(): THREE.Vector3 {
    return this.getScene().position;
  }

  getObject3D() : THREE.Object3D {
    return this.getScene();
  }
 
  getScene(): THREE.Scene {
    if (this.scene === null) {
      this.scene = new THREE.Scene();
      this.lights.forEach(light => {
        light.setObject3D(this.scene);
      });
      this.meshes.forEach(mesh => {
        mesh.setObject3D(this.scene);
      });
      this.lines.forEach(line => {
        line.setObject3D(this.scene);
      });
      if (this.fog !== null && this.fog !== undefined) {
        this.fog.setScene(this.scene);
      }
      if (this.overrideMaterial !== null && this.overrideMaterial !== undefined) {
        this.scene.overrideMaterial = this.overrideMaterial.getMaterial();
        this.overrideMaterial.setMaterial(this.scene.overrideMaterial);
      }
    }
    return this.scene;
  }

}
