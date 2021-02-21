import { RendererTimer } from './../interface';
import { MixerComponent } from './../mixer/mixer.component';
import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { ControllerComponent } from '../controller/controller.component';
import { FogComponent } from '../fog/fog.component';
import { ThreeUtil } from '../interface';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { PhysicsComponent } from '../physics/physics.component';
import { RendererComponent } from '../renderer/renderer.component';
import { AudioComponent } from './../audio/audio.component';
import { ListenerComponent } from './../listener/listener.component';
import { LocalStorageService } from './../local-storage.service';
import { MeshComponent } from './../mesh/mesh.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent
  extends AbstractObject3dComponent
  implements OnInit {
  @Input() private storageName:string = null;
  @Input() private background:string | number = null;

  @ContentChildren(MeshComponent, { descendants: false })
  meshes: QueryList<MeshComponent>;
  @ContentChildren(PhysicsComponent, { descendants: false })
  physics: QueryList<PhysicsComponent>;
  @ContentChildren(RigidbodyComponent, { descendants: true })
  rigidbody: QueryList<RigidbodyComponent>;
  @ContentChildren(FogComponent, { descendants: false })
  fog: QueryList<FogComponent>;
  @ContentChildren(MaterialComponent, { descendants: false })
  materials: QueryList<MaterialComponent>;
  @ContentChildren(ListenerComponent, { descendants: false })
  listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false })
  audio: QueryList<AudioComponent>;
  @ContentChildren(ControllerComponent, { descendants: true })
  sceneController: QueryList<ControllerComponent>;
  @ContentChildren(MixerComponent, { descendants: true })
  mixer: QueryList<MixerComponent>;

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit();
  }

  private scene: THREE.Scene = null;

  private renderer: RendererComponent = null;
  setRenderer(renderer: RendererComponent) {
    this.renderer = renderer;
  }

  getRenderer(): RendererComponent {
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
    this.mixer.changes.subscribe(() => {
      this.synkObject3D(['mixer']);
    });
    this.physics.changes.subscribe(() => {
      this.synkObject3D(['physics']);
    });
    this.rigidbody.changes.subscribe(() => {
      this.synkObject3D(['rigidbody']);
    });
    super.ngAfterContentInit();
  }

  private _physics: PhysicsComponent = null;

  synkObject3D(synkTypes: string[]) {
    if (this.scene !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'mesh':
            this.meshes.forEach((mesh) => {
              mesh.setParent(this.scene);
            });
            break;
          case 'rigidbody':
          case 'physics':
          case 'mixer':
            this._physics = this.physics.first;
            this.rigidbody.forEach((rigidbody) => {
              rigidbody.setPhysics(this._physics);
            });
            this.mixer.forEach((mixer) => {
              mixer.setPhysics(this._physics);
            });
            break;
          case 'materials':
            this.materials.forEach((material) => {
              material.setParent(this.scene);
            });
            break;
          case 'listner':
            this.listner.forEach((listner) => {
              listner.setParent(this.scene);
            });
            break;
          case 'audio':
            this.audio.forEach((audio) => {
              audio.setParent(this.scene);
            });
            break;
          case 'fog':
            this.fog.forEach((fog) => {
              fog.setScene(this.scene);
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

  update(timer: RendererTimer) {
    this.mixer.forEach((mixer) => {
      mixer.update(timer);
    });
    this.physics.forEach((physics) => {
      physics.update(timer);
    });
    this.rigidbody.forEach((rigidbody) => {
      rigidbody.update(timer);
    });
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
                  mesh.setParent(foundMesh, true);
                }
              }
            });
          }
        );
        this.setObject3D(this.scene);
      } else {
        this.scene = new THREE.Scene();
        this.setObject3D(this.scene);
        this.synkObject3D([
          'position',
          'rotation',
          'scale',
          'lookat',
          'materials',
          'mesh',
          'physics',
          'fog',
          'sceneController',
        ]);
      }
      if (ThreeUtil.isNotNull(this.background)) {
        this.scene.background = ThreeUtil.getColorSafe(
          this.background,
          0xffffff
        );
      }
      if (ThreeUtil.isNull(this.scene.userData.component)) {
        this.scene.userData.component = this;
      }
    }
    return this.scene;
  }
}
