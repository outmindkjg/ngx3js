import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ControllerComponent } from '../controller/controller.component';
import { FogComponent } from '../fog/fog.component';
import { TextureOption, ThreeUtil } from '../interface';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { PhysicsComponent } from '../physics/physics.component';
import { RendererComponent } from '../renderer/renderer.component';
import { TextureComponent } from '../texture/texture.component';
import { ViewerComponent } from '../viewer/viewer.component';
import { RendererTimer } from './../interface';
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
  @Input() private background: string | TextureComponent | MaterialComponent | THREE.Texture | TextureOption | any = null;
  @Input() private backgroundType: string = 'background';
  @Input() private environment: string | MaterialComponent | MeshComponent = null;

  @ContentChildren(PhysicsComponent, { descendants: false }) private physicsList: QueryList<PhysicsComponent>;
  @ContentChildren(RigidbodyComponent, { descendants: true }) private rigidbodyList: QueryList<RigidbodyComponent>;
  @ContentChildren(FogComponent, { descendants: false }) private fogList: QueryList<FogComponent>;
  @ContentChildren(ControllerComponent, { descendants: true }) private sceneControllerList: QueryList<ControllerComponent>;
  @ContentChildren(MixerComponent, { descendants: true }) private mixerList: QueryList<MixerComponent>;
  @ContentChildren(ViewerComponent, { descendants: true }) private viewerList: QueryList<ViewerComponent>;

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('scene');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.scene) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.physicsList, 'physicsList', 'physics');
    this.subscribeListQueryChange(this.rigidbodyList, 'rigidbodyList', 'rigidbody');
    this.subscribeListQueryChange(this.fogList, 'fogList', 'fog');
    this.subscribeListQueryChange(this.sceneControllerList, 'sceneControllerList', 'sceneController');
    this.subscribeListQueryChange(this.mixerList, 'mixerList', 'mixer');
    this.subscribeListQueryChange(this.viewerList, 'viewerList', 'viewer');
    super.ngAfterContentInit();
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

  getObject3d(): THREE.Object3D {
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
          this.subscribeRefer(
            'background',
            ThreeUtil.getSubscribe(
              material,
              () => {
                this.setMaterial(material, materialTypeHint);
              },
              'material'
            )
          );
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

  applyChanges3d(changes: string[]) {
    if (this.scene !== null) {
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['material', 'mesh', 'viewer', 'light', 'camera', 'physics', 'fog', 'scenecontroller']);
      }
      changes.forEach((change) => {
        switch (change) {
          case 'viewer':
            this.unSubscribeReferList('viewerList');
            if (ThreeUtil.isNotNull(this.viewerList)) {
              this.viewerList.forEach((viewer) => {
                viewer.setParent(this.scene);
              });
              this.subscribeListQuery(this.viewerList, 'viewerList', 'viewer');
            }
            break;
          case 'rigidbody':
          case 'physics':
          case 'mixer':
            this.unSubscribeReferList('physicsList');
            this.unSubscribeReferList('rigidbodyList');
            this.unSubscribeReferList('mixerList');
            if (ThreeUtil.isNotNull(this.rigidbodyList) && ThreeUtil.isNotNull(this.physicsList) && this.physicsList.length > 0) {
              this._physics = this.physicsList.first;
              this.rigidbodyList.forEach((rigidbody) => {
                rigidbody.setPhysics(this._physics);
              });
              this.subscribeListQuery(this.physicsList, 'physicsList', 'physics');
              this.subscribeListQuery(this.rigidbodyList, 'rigidbodyList', 'rigidbody');
            }
            if (ThreeUtil.isNotNull(this._physics) && ThreeUtil.isNotNull(this.mixerList)) {
              this.mixerList.forEach((mixer) => {
                mixer.setPhysics(this._physics);
              });
              this.subscribeListQuery(this.mixerList, 'mixerList', 'mixer');
            }
            break;
          case 'fog':
            this.unSubscribeReferList('fogList');
            if (ThreeUtil.isNotNull(this.fogList)) {
              this.fogList.forEach((fog) => {
                fog.setScene(this.scene);
              });
              this.subscribeListQuery(this.fogList, 'fogList', 'fog');
            }
            break;
          case 'controller' :
          case 'scenecontroller':
            this.unSubscribeReferList('sceneControllerList');
            if (ThreeUtil.isNotNull(this.sceneControllerList)) {
              this.sceneControllerList.forEach((controller) => {
                controller.setScene(this.scene);
              });
              this.subscribeListQuery(this.sceneControllerList, 'sceneControllerList', 'controller');
            }
            break;
          case 'material':
            this.unSubscribeReferList('materialList');
            if (ThreeUtil.isNotNull(this.materialList)) {
              this.materialList.forEach((material) => {
                this.setMaterial(material);
              });
              this.subscribeListQuery(this.materialList, 'materialList', 'material');
            }
            break;
        }
      });
    }
    super.applyChanges3d(changes);
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
    if (this.scene === null || this._needUpdate) {
      this.getSceneDumpy();
    }
    if (!this._sceneSynked) {
      this._sceneSynked = true;
      if (ThreeUtil.isNotNull(this.storageName)) {
        this.scene = new THREE.Scene();
        this.localStorageService.getScene(this.storageName, (scene: THREE.Scene) => {
          this.scene = scene;
          this.setObject3d(scene);
        });
      } else {
        this.unSubscribeRefer('background');
        if (ThreeUtil.isNotNull(this.background)) {
          if (this.background instanceof MaterialComponent) {
            const materialBackground = this.background;
            this.setMaterial(materialBackground, this.backgroundType);
            this.subscribeRefer(
              'background',
              ThreeUtil.getSubscribe(
                this.background,
                () => {
                  this.setMaterial(materialBackground, this.backgroundType);
                },
                'loaded'
              )
            );
          } else if (ThreeUtil.isNotNull(this.background['getTexture'])) {
            const textureBackground:TextureComponent = this.background as any;
            this.setBackgroundTexture(textureBackground.getTexture(), this.backgroundType);
            this.subscribeRefer(
              'background',
              ThreeUtil.getSubscribe(
                this.background,
                () => {
                  this.setBackgroundTexture(textureBackground.getTexture(), this.backgroundType);
                },
                'loaded'
              )
            );
          } else if (typeof this.background === 'string' || typeof this.background === 'number' || this.background instanceof THREE.Color){
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
            const mesh = this.environment.getObject3d() as THREE.Scene;
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
        this.setObject3d(this.scene);
      }
    }
    return this.scene;
  }

  getSceneDumpy(): THREE.Scene {
    if (this.scene === null || this._needUpdate) {
      this.needUpdate = false;
      this.scene = new THREE.Scene();
      this._sceneSynked = false;
    }
    return this.scene;
  }
}
