import { AudioComponent } from './../audio/audio.component';
import { ListenerComponent } from './../listener/listener.component';
import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
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
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent implements OnInit {
  @Input() storageName: string = null;
  @ContentChildren(MeshComponent, { descendants: false })
  meshes: QueryList<MeshComponent>;
  @ContentChildren(PositionComponent, { descendants: false })
  position: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false })
  rotation: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false })
  scale: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false })
  lookat: QueryList<LookatComponent>;
  @ContentChildren(FogComponent, { descendants: false })
  fog: QueryList<FogComponent>;
  @ContentChildren(MaterialComponent, { descendants: false })
  materials: QueryList<MaterialComponent>;
  @ContentChildren(ListenerComponent, { descendants: false })
  listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false })
  audio: QueryList<AudioComponent>;

  constructor(private localStorageService: LocalStorageService) {}

  ngOnInit(): void {}

  private scene: THREE.Scene = null;

  getPosition(): THREE.Vector3 {
    if (this.scene !== null) {
      return this.scene.position;
    } else if (this.position !== null && this.position.length > 0) {
      return this.position.first.getPosition();
    } else {
      return new THREE.Vector3(0, 0, 0);
    }
  }

  getScale(): THREE.Vector3 {
    if (this.scene !== null) {
      return this.scene.scale;
    } else if (this.scale !== null && this.scale.length > 0) {
      return this.scale.first.getScale();
    } else {
      return new THREE.Vector3(1, 1, 1);
    }
  }

  getRotation(): THREE.Euler {
    if (this.scene !== null) {
      return this.scene.rotation;
    } else if (this.scale !== null && this.scale.length > 0) {
      return this.rotation.first.getRotation();
    } else {
      return new THREE.Euler(0, 0, 0);
    }
  }
  
  getObject3D(): THREE.Object3D {
    return this.getScene();
  }

  getJson(): any {
    return this.getScene().toJSON();
  }

  setClear(): void {
    const scene = this.getScene();
    if (scene['clear']) {
      scene['clear']();
    } else {
      scene.children = [];
    }
  }

  setSavelocalStorage(storageName: string) {
    return this.localStorageService.setScene(storageName, this.getScene());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (changes.storageName) {
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
    this.materials.changes.subscribe((e) => {
      this.synkObject3D(['materials']);
    });
    this.listner.changes.subscribe(() => {
      this.synkObject3D(['listner']);
    });
    this.audio.changes.subscribe(() => {
      this.synkObject3D(['audio']);
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
            this.meshes.forEach((mesh) => {
              mesh.setObject3D(this.scene);
            });
          case 'materials':
            this.materials.forEach((material) => {
              material.setObject3D(this.scene);
            });
            break;
          case 'listner':
            this.listner.forEach((listner) => {
              listner.setObject3D(this.scene);
            });
            break;
          case 'audio':
            this.audio.forEach((audio) => {
              audio.setObject3D(this.scene);
            });
            break;
          }
      });
    }
  }

  getScene(): THREE.Scene {
    if (this.scene === null) {
      if (this.storageName !== null) {
        this.scene = new THREE.Scene();
        this.localStorageService.getScene(
          this.storageName,
          (scene: THREE.Scene) => {
            this.scene.copy(scene);
            this.meshes.forEach((mesh) => {
              if (
                mesh.name !== null &&
                mesh.name !== undefined &&
                mesh.name !== ''
              ) {
                const foundMesh = this.scene.getObjectByName(mesh.name);
                if (foundMesh !== null && foundMesh !== undefined) {
                  mesh.setObject3D(foundMesh, true);
                }
              }
            });
          }
        );
      } else {
        this.scene = new THREE.Scene();
        this.synkObject3D([
          'position',
          'rotation',
          'scale',
          'lookat',
          'materials',
          'mesh',
          'fog',
        ]);
      }
    }
    return this.scene;
  }
}
