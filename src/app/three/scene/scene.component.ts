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
import { LightComponent } from '../light/light.component';
import { CameraComponent } from '../camera/camera.component';
import { Subscription } from 'rxjs';
import { HelperComponent } from '../helper/helper.component';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent
  extends AbstractObject3dComponent
  implements OnInit {
  @Input() private storageName:string = null;
  @Input() private background:string | number | MaterialComponent = null;

  @ContentChildren(MeshComponent, { descendants: false }) meshList: QueryList<MeshComponent>;
  @ContentChildren(PhysicsComponent, { descendants: false }) physicsList: QueryList<PhysicsComponent>;
  @ContentChildren(RigidbodyComponent, { descendants: true }) rigidbodyList: QueryList<RigidbodyComponent>;
  @ContentChildren(FogComponent, { descendants: false }) fogList: QueryList<FogComponent>;
  @ContentChildren(MaterialComponent, { descendants: false }) materialList: QueryList<MaterialComponent>;
  @ContentChildren(ListenerComponent, { descendants: false }) listnerList: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false }) audioList: QueryList<AudioComponent>;
  @ContentChildren(ControllerComponent, { descendants: true }) sceneControllerList: QueryList<ControllerComponent>;
  @ContentChildren(MixerComponent, { descendants: true }) mixerList: QueryList<MixerComponent>;
  @ContentChildren(HelperComponent, { descendants: false }) private helperList: QueryList<HelperComponent>;
  @ContentChildren(LightComponent, { descendants: false }) private lightList: QueryList<LightComponent>;
  @ContentChildren(CameraComponent, { descendants: false }) private cameraList: QueryList<CameraComponent>;

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
      if (changes.storageName || changes.background) {
        this.scene = null;
      }
    }
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    this.meshList.changes.subscribe((e) => {
      this.synkObject3D(['mesh']);
    });
    this.listnerList.changes.subscribe(() => {
      this.synkObject3D(['listner']);
    });
    this.audioList.changes.subscribe(() => {
      this.synkObject3D(['audio']);
    });
    this.sceneControllerList.changes.subscribe(() => {
      this.synkObject3D(['sceneController']);
    });
    this.mixerList.changes.subscribe(() => {
      this.synkObject3D(['mixer']);
    });
    this.physicsList.changes.subscribe(() => {
      this.synkObject3D(['physics']);
    });
    this.rigidbodyList.changes.subscribe(() => {
      this.synkObject3D(['rigidbody']);
    });
    this.lightList.changes.subscribe(() => {
      this.synkObject3D(['lights']);
    });
    this.helperList.changes.subscribe(() => {
      this.synkObject3D(['helpers']);
    });
    this.cameraList.changes.subscribe(() => {
      this.synkObject3D(['cameras']);
    });
    if (this.materialList !== null && this.materialList !== undefined) {
      this.setMaterialSubscribe();
      this.materialList.changes.subscribe((e) => {
        this.setMaterialSubscribe();
      });
		}
    super.ngAfterContentInit();
  }

  private _materialSubscribe: Subscription[] = [];

  private backgroundangularTryOutCnt: number = 0;

  setMaterial(material : MaterialComponent) {
    if (this.scene !== null) {
      const materialClone = material.getMaterial();
      const map: THREE.Texture = (materialClone['map'] && materialClone['map'] instanceof THREE.Texture) ? materialClone['map'] : null;
      const color: THREE.Color = (materialClone['color'] && materialClone['color'] instanceof THREE.Color) ? materialClone['color'] : null;
      switch(material.materialType) {
        case 'environment':
          if (map !== null) {
            this.scene.environment = map;
          } else {
            this.scene.environment = null;
          }
          break;
        case 'background':
          if (map !== null) {
            this.scene.background = map;
          } else if (color !== null) {
            this.scene.background = color;
          } else {
            this.scene.background = null;
          }
          break;
        case 'background-angular':
        case 'backgroundangular':
          if (map !== null) {
            if (map.image !== null && map.image !== undefined) {
              this.backgroundangularTryOutCnt = 0;
              const rt = new THREE.WebGLCubeRenderTarget(map.image.height);
              rt.fromEquirectangularTexture(ThreeUtil.getRenderer() as THREE.WebGLRenderer, map);
              this.scene.background = rt;
            } else {
              if (this.backgroundangularTryOutCnt < 10) {
                setTimeout(() => {
                  this.backgroundangularTryOutCnt++;
                  this.setMaterial(material);
                }, 200);
              }
            }
          } else if (color !== null) {
            this.scene.background = color;
          } else {
            this.scene.background = null;
          }
          break;
        case 'material':
        case 'overrideMaterial':
          this.scene.overrideMaterial = materialClone;
          this.scene.overrideMaterial.needsUpdate = true;
          break;              
      }
    }
  }

  setMaterialSubscribe() {
		if (this.materialList !== null && this.materialList !== undefined) {
      this._materialSubscribe = this.unSubscription(this._materialSubscribe);
      this.materialList.forEach(material => {
        this._materialSubscribe.push(material.materialSubscribe().subscribe(() => {
          this.setMaterial(material);
        }));
      });
    }
  }
   
  private _physics: PhysicsComponent = null;

  synkObject3D(synkTypes: string[]) {
    if (this.scene !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'mesh':
            this.meshList.forEach((mesh) => {
              mesh.setParent(this.scene);
            });
            break;
          case 'cameras':
            this.cameraList.forEach((camera) => {
              camera.setParent(this.scene);
            });
            break;
          case 'lights':
            this.lightList.forEach((light) => {
              light.setParent(this.scene);
            });
            break;
          case 'helpers':
            this.helperList.forEach((helper) => {
              helper.setParent(this.scene);
            });
            break;
          case 'rigidbody':
          case 'physics':
          case 'mixer':
            this._physics = this.physicsList.first;
            this.rigidbodyList.forEach((rigidbody) => {
              rigidbody.setPhysics(this._physics);
            });
            this.mixerList.forEach((mixer) => {
              mixer.setPhysics(this._physics);
            });
            break;
          case 'listner':
            this.listnerList.forEach((listner) => {
              listner.setParent(this.scene);
            });
            break;
          case 'audio':
            this.audioList.forEach((audio) => {
              audio.setParent(this.scene);
            });
            break;
          case 'fog':
            this.fogList.forEach((fog) => {
              fog.setScene(this.scene);
            });
            break;
          case 'sceneController':
            this.sceneControllerList.forEach((controller) => {
              controller.setScene(this.scene);
            });
            break;
          case 'materials':
            this.materialList.forEach((material) => {
              if (material.visible) {
                this.setMaterial(material);
              }
            });
            break;
          }
      });
    }
    super.synkObject3D(synkTypes);
  }

  update(timer: RendererTimer) {
    this.mixerList.forEach((mixer) => {
      mixer.update(timer);
    });
    this.physicsList.forEach((physics) => {
      physics.update(timer);
    });
    this.rigidbodyList.forEach((rigidbody) => {
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
            this.meshList.forEach((mesh) => {
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
          'lights',
          'helpers',
          'cameras',
          'physics',
          'fog',
          'sceneController',
        ]);
      }
      if (ThreeUtil.isNotNull(this.background)) {
        if (this.background instanceof MaterialComponent) {
          this.setMaterial(this.background);
        } else {
          this.scene.background = ThreeUtil.getColorSafe(
            this.background,
            0xffffff
          );
        }
      }
      if (ThreeUtil.isNull(this.scene.userData.component)) {
        this.scene.userData.component = this;
      }

    }
    return this.scene;
  }
}
