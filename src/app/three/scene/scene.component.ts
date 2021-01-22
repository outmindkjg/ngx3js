import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { LightComponent } from './../light/light.component';
import { MeshComponent } from './../mesh/mesh.component';
import { LineComponent } from './../line/line.component';
import { FogComponent } from '../fog/fog.component';
import { MaterialComponent } from '../material/material.component';
import { LocalStorageService } from './../local-storage.service';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @Input() storageName:string = null;
  @ContentChildren(LightComponent,{descendants: false}) lights: QueryList<LightComponent>;
  @ContentChildren(MeshComponent,{descendants: false}) meshes: QueryList<MeshComponent>;
  @ContentChildren(LineComponent,{descendants: false}) lines: QueryList<LineComponent>;
  @ContentChild(FogComponent,{descendants: false}) fog: FogComponent = null;
  @ContentChild(MaterialComponent,{descendants: false}) overrideMaterial: MaterialComponent = null;
  @ContentChild(PositionComponent, { descendants: false }) position: PositionComponent = null;
  @ContentChild(RotationComponent, { descendants: false }) rotation: RotationComponent = null;
  @ContentChild(ScaleComponent, { descendants: false }) scale: ScaleComponent = null;

  constructor(private localStorageService: LocalStorageService) { }

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
 
  getJson() : any {
    return this.getScene().toJSON();
  }

  setClear() : void {
    const scene = this.getScene();
    scene.clear();
  }

  setSavelocalStorage(storageName : string) {
    return this.localStorageService.setScene(storageName, this.getScene());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.storageName) {
        this.scene = null;
      }
      if (this.meshes) {
        this.getScene();
      }
    }
  }
 
  getScene(): THREE.Scene {
    if (this.scene === null) {
      if (this.storageName !== null) {
        this.scene = this.localStorageService.getScene(this.storageName);
      } else {
        this.scene = new THREE.Scene();
        this.meshes.forEach(mesh => {
          mesh.setObject3D(this.scene);
        });
        this.lines.forEach(line => {
          line.setObject3D(this.scene);
        });
        this.lights.forEach(light => {
          light.setObject3D(this.scene);
        });
        if (this.fog !== null && this.fog !== undefined) {
          this.fog.setScene(this.scene);
        }
      }
      if (this.position !== null && this.position != undefined) {
        this.position.setPosition(this.scene.position);
      }
      if (this.rotation !== null && this.rotation != undefined) {
        this.rotation.setRotation(this.scene.rotation);
      }
      if (this.scale !== null && this.scale != undefined) {
        this.scale.setScale(this.scene.scale);
      }
      if (this.overrideMaterial !== null && this.overrideMaterial !== undefined) {
        this.scene.overrideMaterial = this.overrideMaterial.getMaterial();
        this.overrideMaterial.setMaterial(this.scene.overrideMaterial);
      }
    }
    return this.scene;
  }

}
