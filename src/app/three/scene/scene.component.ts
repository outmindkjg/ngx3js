import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { CameraComponent } from '../camera/camera.component';
import { ControllerComponent } from '../controller/controller.component';
import { FogComponent } from '../fog/fog.component';
import { HelperComponent } from '../helper/helper.component';
import { ThreeUtil } from '../interface';
import { LightComponent } from '../light/light.component';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { PhysicsComponent } from '../physics/physics.component';
import { RendererComponent } from '../renderer/renderer.component';
import { TextureComponent } from '../texture/texture.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { AudioComponent } from './../audio/audio.component';
import { RendererTimer } from './../interface';
import { ListenerComponent } from './../listener/listener.component';
import { LocalStorageService } from './../local-storage.service';
import { MeshComponent } from './../mesh/mesh.component';
import { MixerComponent } from './../mixer/mixer.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';

@Component({
  selector: 'three-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent extends AbstractObject3dComponent implements OnInit {
  @Input() private storageName: string = null;
  @Input() private background: string | number | MaterialComponent | TextureComponent = null;
  @Input() private backgroundType: string = 'background';
  @Input() private environment: string | MaterialComponent | MeshComponent = null;

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
  @ContentChildren(ViewerComponent, { descendants: true }) private viewerList: QueryList<ViewerComponent>;

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

  getThreeRenderer(): THREE.Renderer {
    if (ThreeUtil.isNotNull(this.renderer)) {
      return this.renderer.getRenderer();
    } else {
      return ThreeUtil.getRenderer();
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
      if (changes.storageName || changes.background) {
        this.scene = null;
      }
    }
    super.ngOnChanges(changes);
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.meshList, 'meshList', 'meshes');
    this.subscribeListQuery(this.listnerList, 'listnerList', 'listner');
    this.subscribeListQuery(this.audioList, 'audioList', 'audio');
    this.subscribeListQuery(this.sceneControllerList, 'sceneControllerList', 'sceneController');
    this.subscribeListQuery(this.mixerList, 'mixerList', 'mixer');
    this.subscribeListQuery(this.physicsList, 'physicsList', 'physics');
    this.subscribeListQuery(this.rigidbodyList, 'rigidbodyList', 'rigidbody');
    this.subscribeListQuery(this.lightList, 'lightList', 'lights');
    this.subscribeListQuery(this.helperList, 'helperList', 'helpers');
    this.subscribeListQuery(this.cameraList, 'cameraList', 'cameras');
    this.subscribeListQuery(this.materialList, 'materialList', 'material');
    super.ngAfterContentInit();
  }

  setBackgroundTexture(background: THREE.Texture, backgroundType: string) {
    switch (backgroundType.toLowerCase()) {
      case 'background-angular':
      case 'backgroundangular':
      case 'background-environment-angular':
      case 'backgroundenvironmentangular':
      case 'environment-angular':
      case 'environmentangular':
        if (ThreeUtil.isTextureLoaded(background)) {
          const envMap = this.getTextureFromEquirectangular(background);
          switch (backgroundType.toLowerCase()) {
            case 'background-environment-angular':
            case 'backgroundenvironmentangular':
              this.scene.background = envMap;
              this.scene.environment = envMap;
              break;
            case 'environment-angular':
            case 'environmentangular':
              this.scene.environment = envMap;
              break;
            case 'background-angular':
            case 'backgroundangular':
            default:
              this.scene.background = envMap;
              break;
          }
        } else {
          switch (backgroundType.toLowerCase()) {
            case 'background-environment-angular':
            case 'backgroundenvironmentangular':
              this.scene.background = background;
              this.scene.environment = background;
              break;
            case 'environment-angular':
            case 'environmentangular':
              this.scene.environment = background;
              break;
            case 'background-angular':
            case 'backgroundangular':
            default:
              this.scene.background = background;
              break;
          }
        }
        break;
      case 'background-environment-cubemap':
      case 'backgroundenvironmentcubemap':
      case 'background-cubemap':
      case 'backgroundcubemap':
      case 'environment-cubemap':
      case 'environmentcubemap':
        if (ThreeUtil.isTextureLoaded(background)) {
          const envMap = this.getTextureFromCubemap(background as THREE.CubeTexture);
          switch (backgroundType.toLowerCase()) {
            case 'background-environment-cubemap':
            case 'backgroundenvironmentcubemap':
              this.scene.background = envMap;
              this.scene.environment = envMap;
              break;
            case 'environment-cubemap':
            case 'environmentcubemap':
              this.scene.environment = envMap;
              break;
            case 'background-cubemap':
            case 'backgroundcubemap':
            default:
              this.scene.background = envMap;
              break;
          }
        } else {
          switch (backgroundType.toLowerCase()) {
            case 'background-environment-cubemap':
            case 'backgroundenvironmentcubemap':
              this.scene.background = background;
              this.scene.environment = background;
              break;
            case 'environment-cubemap':
            case 'environmentcubemap':
              this.scene.environment = background;
              break;
            case 'background-cubemap':
            case 'backgroundcubemap':
            default:
              this.scene.background = background;
              break;
          }
        }
        break;
      case 'environment':
        this.scene.environment = background;
        break;
      case 'background':
      default:
        this.scene.background = background;
        break;
    }
  }

  setMaterial(material: MaterialComponent | THREE.Material, materialTypeHint: string = null) {
    if (this.scene !== null) {
      const materialClone = material instanceof MaterialComponent ? material.getMaterial() : material;
      const map: THREE.Texture = materialClone['map'] && materialClone['map'] instanceof THREE.Texture ? materialClone['map'] : null;
      const color: THREE.Color = materialClone['color'] && materialClone['color'] instanceof THREE.Color ? materialClone['color'] : null;
      const materialType = material instanceof MaterialComponent ? ThreeUtil.getTypeSafe(materialTypeHint, material.materialType, 'material') : materialTypeHint;
      switch (materialType.toLowerCase()) {
        case 'environment':
        case 'background':
        case 'background-angular':
        case 'backgroundangular':
        case 'environment-angular':
        case 'environmentangular':
        case 'background-environment-angular':
        case 'environment-background-angular':
        case 'backgroundenvironmentangular':
        case 'environmentbackgroundangular':
          this.unSubscribeRefer('background');
          if (map) {
            this.setBackgroundTexture(map, materialType);
          } else {
            switch (materialType.toLowerCase()) {
              case 'environment':
                case 'background':
                case 'background-angular':
                case 'backgroundangular':
                case 'background-environment-angular':
                case 'backgroundenvironmentangular':
                  if (ThreeUtil.isNotNull(color)) {
                    this.scene.background = color;
                  }
                  break;
            }
          }
          this.subscribeRefer('background', ThreeUtil.getSubscribe(material, () => {
            this.setMaterial(material, materialTypeHint);              
          },'material'));
          break;
        case 'material':
        case 'overrideMaterial':
          this.scene.overrideMaterial = materialClone;
          this.scene.overrideMaterial.needsUpdate = true;
          break;
      }
    }
  }
  _pmremGenerator: THREE.PMREMGenerator = null;

  private getPmremGenerator(): THREE.PMREMGenerator {
    if (this._pmremGenerator == null) {
      this._pmremGenerator = new THREE.PMREMGenerator(this.getThreeRenderer() as THREE.WebGLRenderer);
      this._pmremGenerator.compileEquirectangularShader();
    }
    return this._pmremGenerator;
  }

  getTextureFromEquirectangular(texture: THREE.Texture): THREE.Texture {
    return this.getPmremGenerator().fromEquirectangular(texture).texture;
  }

  getTextureFromScene(scene: THREE.Scene): THREE.Texture {
    return this.getPmremGenerator().fromScene(scene).texture;
  }

  getTextureFromCubemap(texture: THREE.CubeTexture): THREE.Texture {
    return this.getPmremGenerator().fromCubemap(texture).texture;
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
          case 'viewer':
            this.viewerList.forEach((viewer) => {
              viewer.setParent(this.scene);
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
          case 'scenecontroller':
            this.sceneControllerList.forEach((controller) => {
              controller.setScene(this.scene);
            });
            break;
          case 'material':
            this.materialList.forEach((material) => {
              this.setMaterial(material);
            });
            break;
        }
      });
    }
    super.synkObject3D(synkTypes);
  }

  update(timer: RendererTimer) {
    this.viewerList.forEach((viewer) => {
      viewer.update(timer);
    });
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
  private _sceneSynked: boolean = false;

  getScene(): THREE.Scene {
    if (this.scene === null) {
      this.getSceneDumpy();
    }
    if (!this._sceneSynked) {
      this._sceneSynked = true;
      this.synkObject3D(['position', 'rotation', 'scale', 'lookat', 'material', 'mesh', 'viewer', 'lights', 'helpers', 'cameras', 'physics', 'fog', 'scenecontroller']);
    }
    return this.scene;
  }

  getSceneDumpy(): THREE.Scene {
    if (this.scene === null) {
      if (this.storageName !== null) {
        this.scene = new THREE.Scene();
        this.localStorageService.getScene(this.storageName, (scene: THREE.Scene) => {
          this.scene.copy(scene);
          this.meshList.forEach((mesh) => {
            if (mesh.name !== null && mesh.name !== undefined && mesh.name !== '') {
              const foundMesh = this.scene.getObjectByName(mesh.name);
              if (foundMesh !== null && foundMesh !== undefined) {
                mesh.setParent(foundMesh, true);
              }
            }
          });
        });
        this.setObject3D(this.scene);
      } else {
        this.scene = new THREE.Scene();
        this.setObject3D(this.scene);
      }
      this.unSubscribeRefer('background');
      if (ThreeUtil.isNotNull(this.background)) {
        if (this.background instanceof MaterialComponent) {
          this.setMaterial(this.background, this.backgroundType);
          this.subscribeRefer(
            'background',
            ThreeUtil.getSubscribe(this.background, () => {
              this.setMaterial(this.background as MaterialComponent, this.backgroundType);
            }, 'textureloaded')
          );
        } else if (this.background instanceof TextureComponent) {
          this.setBackgroundTexture((this.background as TextureComponent).getTexture(), this.backgroundType);
          this.subscribeRefer(
            'background',
            ThreeUtil.getSubscribe(this.background, () => {
              this.setBackgroundTexture((this.background as TextureComponent).getTexture(), this.backgroundType);
            }, 'textureloaded')
          );
        } else {
          this.scene.background = ThreeUtil.getColorSafe(this.background, 0xffffff);
        }
      }
      this.unSubscribeRefer('environment');
      if (ThreeUtil.isNotNull(this.environment)) {
        if (this.environment instanceof MaterialComponent) {
          this.setMaterial(this.environment, 'environment');
          this.subscribeRefer(
            'environment',
            this.environment.getSubscribe().subscribe(() => {
              this.setMaterial(this.environment as MaterialComponent, 'environment');
            })
          );
        } else if (this.environment instanceof MeshComponent) {
          const mesh = this.environment.getMesh() as THREE.Scene;
          this.scene.environment = this.getTextureFromScene(mesh);
        } else {
          switch (this.environment) {
            case 'room':
              const renderer = this.getThreeRenderer();
              if (renderer instanceof THREE.WebGLRenderer) {
                const roomEnvironment = new RoomEnvironment();
                const pmremGenerator = new THREE.PMREMGenerator(renderer);
                this.scene.environment = pmremGenerator.fromScene(roomEnvironment).texture;
              }
              break;
          }
        }
      }

      if (ThreeUtil.isNull(this.scene.userData.component)) {
        this.scene.userData.component = this;
      }
      this._sceneSynked = false;
    }
    return this.scene;
  }
}
