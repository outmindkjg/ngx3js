import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import * as PHYSIJS from './../physijs/src';
import { MeshComponent } from './../mesh/mesh.component';
import { FogComponent } from '../fog/fog.component';
import { MaterialComponent } from '../material/material.component';
import { LocalStorageService } from './../local-storage.service';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { LookatComponent } from '../lookat/lookat.component';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss']
})
export class SceneComponent implements OnInit {

  @Input() storageName:string = null;
  @Input() physiType: string = 'none';
  @ContentChildren(MeshComponent,{descendants: false}) meshes: QueryList<MeshComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) position: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) rotation: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) scale: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false }) lookat: QueryList<LookatComponent>;
  @ContentChildren(FogComponent, { descendants: false }) fog: QueryList<FogComponent>;
  @ContentChildren(MaterialComponent, { descendants: false }) overrideMaterial: QueryList<MaterialComponent>;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit(): void {

  }

  private scene: THREE.Scene = null;

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
    if (scene['clear']) {
      scene['clear']();
    } else {
      scene.children = [];
    }
  }

  setSavelocalStorage(storageName : string) {
    return this.localStorageService.setScene(storageName, this.getScene());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.storageName || changes.physiType) {
        this.scene = null;
      }
    }
  }

  ngAfterContentInit(): void {
    this.position.changes.subscribe(() => {
      this.synkObject3D(['position']);
    });
    this.rotation.changes.subscribe(() => {
      this.synkObject3D(['rotation']);
    });
    this.scale.changes.subscribe(() => {
      this.synkObject3D(['scale']);
    });
    this.lookat.changes.subscribe(() => {
      this.synkObject3D(['lookat']);
    });
    this.meshes.changes.subscribe((e) => {
      this.synkObject3D(['mesh']);
    });
    this.overrideMaterial.changes.subscribe((e) => {
      this.synkObject3D(['overrideMaterial']);
    });
  }

  synkObject3D(synkTypes: string[]) {
    if (this.scene !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'position':
            this.position.forEach((position) => {
              position.setObject3D(this.scene);
            });
            break;
            case 'rotation':
              this.rotation.forEach((rotation) => {
                rotation.setObject3D(this.scene);
              });
              break;
            case 'scale':
            this.scale.forEach((scale) => {
              scale.setObject3D(this.scene);
            });
            break;
          case 'lookat':
            this.lookat.forEach((lookat) => {
              lookat.setObject3D(this.scene);
            });
            break;
            case 'mesh':
            this.meshes.forEach(mesh => {
              mesh.setObject3D(this.scene);
            });
          case 'overrideMaterial' :
            this.overrideMaterial.forEach(mesh => {
              mesh.setObject3D(this.scene);
            });
            break;
        }
      })
    }
  }

  getScene(): THREE.Scene {
    if (this.scene === null) {
      if (this.storageName !== null) {
        this.scene = new THREE.Scene();
        this.localStorageService.getScene(this.storageName, (scene : THREE.Scene) => {
          this.scene.copy(scene);
          this.meshes.forEach(mesh => {
            if (mesh.name !== null && mesh.name !== undefined && mesh.name !== '') {
              const foundMesh = this.scene.getObjectByName(mesh.name);
              if (foundMesh !== null && foundMesh !== undefined) {
                mesh.setObject3D(foundMesh, true);
              }
            }
          });
        });
      } else {
        switch(this.physiType.toLowerCase()) {
          case 'physi' :
            PHYSIJS.scripts.worker = "/assets/physijs_worker.js";
            PHYSIJS.scripts.ammo = "/assets/ammo.js";
            const scene = new PHYSIJS.Scene();
            scene.setGravity(new THREE.Vector3(0, -50, 0));
            scene.addEventListener('update', () => {
              scene.simulate(undefined, 2);
            });
            scene.simulate();
            this.scene.fog
            this.scene = scene;
            break;
          case 'none' :
          default :
            this.scene = new THREE.Scene();
            break;
        }
        this.synkObject3D(['position','rotation','scale','lookat','overrideMaterial','mesh','fog']);
      }
    }
    return this.scene;
  }

}
