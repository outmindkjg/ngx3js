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
import { ThreeUtil } from '../interface';
import { RendererComponent } from '../renderer/renderer.component';
import { ControllerComponent } from '../controller/controller.component';
import { AbstractObject3dComponent } from '../object3d.abstract';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent extends AbstractObject3dComponent implements OnInit {
  @Input() storageName: string = null;
  @ContentChildren(MeshComponent, { descendants: false }) meshes: QueryList<MeshComponent>;
  @ContentChildren(FogComponent, { descendants: false }) fog: QueryList<FogComponent>;
  @ContentChildren(MaterialComponent, { descendants: false }) materials: QueryList<MaterialComponent>;
  @ContentChildren(ListenerComponent, { descendants: false }) listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false }) audio: QueryList<AudioComponent>;
  @ContentChildren(ControllerComponent, { descendants: true }) sceneController: QueryList<ControllerComponent>;

  constructor(private localStorageService: LocalStorageService) {
    super()
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  private scene: THREE.Scene = null;
  
  private renderer : RendererComponent = null;
  setRenderer(renderer : RendererComponent) {
    this.renderer = renderer;
  }

  getRenderer():RendererComponent {
    return this.renderer;
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
    super.ngOnChanges(changes);
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
    this.sceneController.changes.subscribe(() => {
      this.synkObject3D(['sceneController']);
    });
    super.ngAfterContentInit();
  }

  synkObject3D(synkTypes: string[]) {
    if (this.scene !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
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
          case 'sceneController':
            this.sceneController.forEach((controller) => {
              controller.setScene(this.scene);
            });
            break;
          }
      });
    }
    super.synkObject3D(synkTypes);
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
          'sceneController'
        ]);
      }
      if (ThreeUtil.isNull(this.scene.userData.component)) {
        this.scene.userData.component = this;
      }
      this.object3d = this.scene;
    }
    return this.scene;
  }
}
