import { Component, ContentChildren, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';
import { ControllerComponent } from '../controller/controller.component';
import { FogComponent } from '../fog/fog.component';
import { ThreeTexture, ThreeUtil } from '../interface';
import { AbstractMaterialComponent } from '../material.abstract';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { PhysicsComponent } from '../physics/physics.component';
import { RendererComponent } from '../renderer/renderer.component';
import { AbstractTextureComponent } from '../texture.abstract';
import { ViewerComponent } from '../viewer/viewer.component';
import { RendererTimer } from './../interface';
import { LocalStorageService } from './../local-storage.service';
import { MeshComponent } from './../mesh/mesh.component';
import { MixerComponent } from './../mixer/mixer.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';

/**
 * SceneComponent
 */
@Component({
  selector: 'ngx3js-scene',
  templateUrl: './scene.component.html',
  styleUrls: ['./scene.component.scss'],
})
export class SceneComponent extends AbstractObject3dComponent implements OnInit {
  /**
   * Input  of scene component
   */
  @Input() private storageName: string = null;

  /**
   * If not null, sets the background used when rendering the scene, and is always rendered first.
   * Can be set to a [page:Color] which sets the clear color, a [page:Texture] covering the canvas, a cubemap as a [page:CubeTexture] or an equirectangular as a [page:Texture] . Default is null.
   */
  @Input() private background: ThreeTexture = null;

  /**
   * Input  of scene component
   *
   * Notice - case insensitive.
   * 
   */
  @Input() private backgroundType: string = 'background';

  /**
   * If not null, this texture is set as the environment map for all physical materials in the scene.
   * However, it's not possible to overwrite an existing texture assigned to [page:MeshStandardMaterial.envMap]. Default is null.
   */
  @Input() private environment: ThreeTexture = null;

  /**
   * Content children of scene component
   */
  @ContentChildren(PhysicsComponent, { descendants: false }) private physicsList: QueryList<PhysicsComponent>;

  /**
   * Content children of scene component
   */
  @ContentChildren(RigidbodyComponent, { descendants: true }) private sceneRigidbodyList: QueryList<RigidbodyComponent>;

  /**
   * Content children of scene component
   */
  @ContentChildren(FogComponent, { descendants: false }) private fogList: QueryList<FogComponent>;

  /**
   * Content children of scene component
   */
  @ContentChildren(ControllerComponent, { descendants: true }) private sceneControllerList: QueryList<ControllerComponent>;

  /**
   * Content children of scene component
   */
  @ContentChildren(MixerComponent, { descendants: true }) private sceneMixerList: QueryList<MixerComponent>;

  /**
   * Content children of scene component
   */
  @ContentChildren(ViewerComponent, { descendants: true }) private viewerList: QueryList<ViewerComponent>;

  /**
   * Creates an instance of scene component.
   * @param localStorageService
   */
  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('scene');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked data-bound properties
   * if at least one has changed, and before the view and content
   * children are checked.
   *
   * @param changes The changed properties.
   */
  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.scene) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.physicsList, 'physicsList', 'physics');
    this.subscribeListQueryChange(this.sceneRigidbodyList, 'sceenrigidbodyList', 'rigidbody');
    this.subscribeListQueryChange(this.fogList, 'fogList', 'fog');
    this.subscribeListQueryChange(this.sceneControllerList, 'sceneControllerList', 'sceneController');
    this.subscribeListQueryChange(this.sceneMixerList, 'sceneMixerList', 'mixer');
    this.subscribeListQueryChange(this.viewerList, 'viewerList', 'viewer');
    super.ngAfterContentInit();
  }

  /**
   * Scene  of scene component
   */
  private scene: THREE.Scene = null;

  /**
   * Renderer  of scene component
   */
  private renderer: RendererComponent = null;

  /**
   * Sets renderer
   * @param renderer
   */
  public setRenderer(renderer: RendererComponent) {
    this.renderer = renderer;
  }

  /**
   * Gets renderer
   * @returns renderer
   */
  public getRenderer(): RendererComponent {
    return this.renderer;
  }

  /**
   * Gets three renderer
   * @returns three renderer
   */
  public getThreeRenderer(): THREE.Renderer {
    if (ThreeUtil.isNotNull(this.renderer)) {
      return this.renderer.getRenderer();
    } else {
      return ThreeUtil.getRenderer();
    }
  }

  /**
   * Gets object3d
   * @template T
   * @returns object3d
   */
  public getObject3d<T extends THREE.Object3D>(): T {
    return this.getScene() as any;
  }

  /**
   * Gets json
   * @returns json
   */
  public getJson(): any {
    return this.getScene().toJSON();
  }

  /**
   * Sets clear
   */
  public setClear(): void {
    const scene = this.getScene();
    if (scene['clear']) {
      scene['clear']();
    } else {
      scene.children = [];
    }
  }

  /**
   * Sets savelocal storage
   * @param storageName
   * @returns
   */
  public setSavelocalStorage(storageName: string) {
    return this.localStorageService.setScene(storageName, this.getScene());
  }

  /**
   * Sets background texture
   * @param background
   * @param backgroundType
   */
  public setBackgroundTexture(background: THREE.Texture, backgroundType: string) {
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
      case 'background-environment':
      case 'backgroundenvironment':
        this.scene.environment = background;
        this.scene.background = background;
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

  /**
   * Sets material
   * @param material
   * @param [materialTypeHint]
   */
  public setMaterial(material: AbstractMaterialComponent | THREE.Material, materialTypeHint: string = null) {
    if (this.scene !== null) {
      const materialClone = material instanceof AbstractMaterialComponent ? material.getMaterial() : material;
      const map: THREE.Texture = materialClone['map'] && materialClone['map'] instanceof THREE.Texture ? materialClone['map'] : null;
      const color: THREE.Color = materialClone['color'] && materialClone['color'] instanceof THREE.Color ? materialClone['color'] : null;
      const materialType = material instanceof AbstractMaterialComponent ? ThreeUtil.getTypeSafe(materialTypeHint, material.materialType, 'material') : materialTypeHint;
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

  /**
   * Pmrem generator of scene component
   */
  private _pmremGenerator: THREE.PMREMGenerator = null;

  /**
   * Gets pmrem generator
   * @returns pmrem generator
   */
  private getPmremGenerator(): THREE.PMREMGenerator {
    if (this._pmremGenerator === null) {
      this._pmremGenerator = new THREE.PMREMGenerator(this.getThreeRenderer() as THREE.WebGLRenderer);
      this._pmremGenerator.compileEquirectangularShader();
    }
    return this._pmremGenerator;
  }

  /**
   * Gets texture from equirectangular
   * @param texture
   * @returns texture from equirectangular
   */
  public getTextureFromEquirectangular(texture: THREE.Texture): THREE.Texture {
    return this.getPmremGenerator().fromEquirectangular(texture).texture;
  }

  /**
   * Gets texture from scene
   * @param scene
   * @returns texture from scene
   */
  public getTextureFromScene(scene: THREE.Scene): THREE.Texture {
    return this.getPmremGenerator().fromScene(scene).texture;
  }

  /**
   * Gets texture from cubemap
   * @param texture
   * @returns texture from cubemap
   */
  public getTextureFromCubemap(texture: THREE.CubeTexture): THREE.Texture {
    return this.getPmremGenerator().fromCubemap(texture).texture;
  }

  /**
   * Physics  of scene component
   */
  private _physics: PhysicsComponent = null;

  /**
   * Applys changes3d
   * @param changes
   */
  public applyChanges3d(changes: string[]) {
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
            if (ThreeUtil.isNotNull(this.sceneRigidbodyList) && ThreeUtil.isNotNull(this.physicsList) && this.physicsList.length > 0) {
              this._physics = this.physicsList.first;
              this.sceneRigidbodyList.forEach((rigidbody) => {
                rigidbody.setPhysics(this._physics);
              });
              this.subscribeListQuery(this.physicsList, 'physicsList', 'physics');
              this.subscribeListQuery(this.sceneRigidbodyList, 'rigidbodyList', 'rigidbody');
            }
            if (ThreeUtil.isNotNull(this._physics) && ThreeUtil.isNotNull(this.sceneMixerList)) {
              this.sceneMixerList.forEach((mixer) => {
                mixer.setPhysics(this._physics);
              });
              this.subscribeListQuery(this.sceneMixerList, 'sceneMixerList', 'mixer');
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
          case 'controller':
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

  /**
   * Updates scene component
   * @param timer
   */
  public update(timer: RendererTimer) {
    this.viewerList.forEach((viewer) => {
      viewer.update(timer);
    });
    this.sceneMixerList.forEach((mixer) => {
      mixer.update(timer);
    });
    this.physicsList.forEach((physics) => {
      physics.update(timer);
    });
    this.sceneRigidbodyList.forEach((rigidbody) => {
      rigidbody.update(timer);
    });
  }

  /**
   * Scene synked of scene component
   */
  private _sceneSynked: boolean = false;

  /**
   * Gets scene
   * @returns scene
   */
  public getScene(): THREE.Scene {
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
          if (this.background instanceof AbstractMaterialComponent) {
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
            const textureBackground: AbstractTextureComponent = this.background as any;
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
          } else if (typeof this.background === 'string' || typeof this.background === 'number' || this.background instanceof THREE.Color) {
            this.scene.background = ThreeUtil.getColorSafe(this.background, 0xffffff);
          }
        }
        this.unSubscribeRefer('environment');
        if (ThreeUtil.isNotNull(this.environment)) {
          if (this.environment instanceof AbstractMaterialComponent) {
            this.setMaterial(this.environment, 'environment');
            this.subscribeRefer(
              'environment',
              this.environment.getSubscribe().subscribe(() => {
                this.setMaterial(this.environment as AbstractMaterialComponent, 'environment');
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

  /**
   * Gets scene dumpy
   * @returns scene dumpy
   */
  public getSceneDumpy(): THREE.Scene {
    if (this.scene === null || this._needUpdate) {
      this.needUpdate = false;
      this.scene = new THREE.Scene();
      this._sceneSynked = false;
    }
    return this.scene;
  }
}
