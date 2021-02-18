import { HelperComponent } from './../helper/helper.component';
import { CameraComponent } from './../camera/camera.component';
import {
  Component,
  ContentChildren,
  Input,
  Output,
  OnInit,
  QueryList,
  EventEmitter,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { MorphAnimMesh } from 'three/examples/jsm/misc/MorphAnimMesh';
import {
  Lensflare,
  LensflareElement,
} from 'three/examples/jsm/objects/Lensflare';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { GeometryComponent } from '../geometry/geometry.component';
import { HtmlComponent } from '../html/html.component';
import { CssStyle, InterfaceMeshComponent, ThreeUtil } from '../interface';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { SvgComponent } from '../svg/svg.component';
import { TextureComponent } from '../texture/texture.component';
import { AudioComponent } from './../audio/audio.component';
import { ListenerComponent } from './../listener/listener.component';
import { LocalStorageService } from './../local-storage.service';
import { MixerComponent } from './../mixer/mixer.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';

@Component({
  selector: 'three-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
})
export class MeshComponent
  extends AbstractObject3dComponent
  implements OnInit, InterfaceMeshComponent {
  @Input() type: string = 'mesh';
  @Input() lightType: string = 'spot';
  @Input() cssStyle: string | CssStyle = null;
  @Input() skyboxType: string = 'auto';
  @Input() skyboxRate: number = 100;
  @Input() skyboxImage: string = null;
  @Input() skyboxCubeImage: string[] = null;
  @Input() skyboxSunImage: string = null;
  @Input() skyboxSunX: number = 0;
  @Input() skyboxSunY: number = 0;
  @Input() skyboxSunZ: number = 0;
  @Input() helperType: string = 'none';
  @Input() scaleStep: number = 1;
  @Input() castShadow: boolean = true;
  @Input() receiveShadow: boolean = false;
  @Input() storageName: string = null;
  @Input() storageOption: any = null;
  @Input() color: string | number = null;
  @Input() skyColor: string | number = null;
  @Input() groundColor: string | number = null;
  @Input() onlyShadow: boolean = null;
  @Input() intensity: number = null;
  @Input() distance: number = null;
  @Input() angle: number = null;
  @Input() penumbra: number = null;
  @Input() decay: number = null;
  @Input() width: number = null;
  @Input() height: number = null;
  @Input() exponent: number = null;
  @Input() count: number = null;

  @Input() shadowCameraVisible: boolean = false;
  @Input() shadowCameraNear: number = null;
  @Input() shadowMapSizeWidth: number = null;
  @Input() shadowMapSizeHeight: number = null;
  @Input() shadowCameraFar: number = null;
  @Input() shadowCameraFov: number = null;
  @Input() shadowCameraLeft: number = null;
  @Input() shadowCameraRight: number = null;
  @Input() shadowCameraTop: number = null;
  @Input() shadowCameraBottom: number = null;
  @Input() target: any = null;
  @Input() size: number = null;
  @Input() helperVisible: boolean = null;
  @Input() helperTarget: MeshComponent = null;
  @Input() helperColor: string | number = null;
  @Input() radius: number = null;
  @Input() radials: number = null;
  @Input() circles: number = null;
  @Input() divisions: number = null;
  @Input() color1: string | number = null;
  @Input() color2: string | number = null;
  @Input() helperOpacity: number = null;
  @Input() private dirX: number = null;
  @Input() private dirY: number = null;
  @Input() private dirZ: number = null;
  @Input() private originX: number = null;
  @Input() private originY: number = null;
  @Input() private originZ: number = null;
  @Input() private length: number = null;
  @Input() private headLength: number = null;
  @Input() private headWidth: number = null;

  @Output()
  onLoad: EventEmitter<MeshComponent> = new EventEmitter<MeshComponent>();

  @ContentChildren(GeometryComponent, { descendants: false })
  geometry: QueryList<GeometryComponent>;
  @ContentChildren(MaterialComponent, { descendants: false })
  materials: QueryList<MaterialComponent>;
  @ContentChildren(LensflareelementComponent, { descendants: false })
  lensflareElements: QueryList<LensflareelementComponent>;
  @ContentChildren(SvgComponent, { descendants: false })
  svg: QueryList<SvgComponent>;
  @ContentChildren(MixerComponent, { descendants: false })
  mixer: QueryList<MixerComponent>;
  @ContentChildren(ListenerComponent, { descendants: false })
  listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false })
  audio: QueryList<AudioComponent>;
  @ContentChildren(HtmlComponent, { descendants: false })
  cssChildren: QueryList<HtmlComponent>;
  @ContentChildren(RigidbodyComponent, { descendants: false })
  rigidbody: QueryList<RigidbodyComponent>;
  @ContentChildren(MeshComponent, { descendants: false })
  meshes: QueryList<MeshComponent>;
  @ContentChildren(CameraComponent, { descendants: false })
  cameras: QueryList<CameraComponent>;
  @ContentChildren(HelperComponent, { descendants: false })
  helpers: QueryList<HelperComponent>;

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  getSkyboxSize(def?: number): number {
    const skyboxSize = ThreeUtil.getTypeSafe(this.distance, def, 10000);
    if (ThreeUtil.isNotNull(skyboxSize)) {
      return (skyboxSize * this.skyboxRate) / 100;
    } else {
      return 10000;
    }
  }

  getSkySunPosition(): THREE.Euler {
    return new THREE.Euler(
      ThreeUtil.getAngleSafe(this.skyboxSunX, 0),
      ThreeUtil.getAngleSafe(this.skyboxSunY, 0),
      ThreeUtil.getAngleSafe(this.skyboxSunZ, 0)
    );
  }

  getIntensity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.intensity, def);
  }

  getDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.distance, def);
  }

  getAngle(def?: number): number {
    return ThreeUtil.getAngleSafe(this.angle, def);
  }

  getPenumbra(def?: number): number {
    return ThreeUtil.getTypeSafe(this.penumbra, def);
  }

  getDecay(def?: number): number {
    return ThreeUtil.getTypeSafe(this.decay, def);
  }

  getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width, def);
  }

  getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height, def);
  }

  getCount(def?: number): number {
    return ThreeUtil.getTypeSafe(this.count, def);
  }

  getColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  getSkyColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.skyColor, def);
  }

  getGroundColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.groundColor, def);
  }

  getShadowMapSizeWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowMapSizeWidth, def);
  }

  getShadowMapSizeHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowMapSizeHeight, def);
  }

  getShadowCameraNear(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraNear, def);
  }

  getShadowCameraFar(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraFar, def);
  }

  getShadowCameraFov(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraFov, def);
  }

  getShadowCameraLeft(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraLeft, def);
  }

  getShadowCameraRight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraRight, def);
  }

  getShadowCameraTop(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraTop, def);
  }

  getShadowCameraBottom(def?: number): number {
    return ThreeUtil.getTypeSafe(this.shadowCameraBottom, def);
  }

  getTarget(def?: number): THREE.Object3D {
    const target = ThreeUtil.getTypeSafe(this.target, def);
    if (target !== null && target !== undefined) {
      if (target.getObject3D) {
        return target.getObject3D();
      }
    }
    return null;
  }

  private getHelperTarget(target?: THREE.Object3D): THREE.Object3D {
    if (this.helperTarget !== null) {
      return this.helperTarget.getMesh();
    } else {
      return target;
    }
  }

  private getHelperVisible(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.helperVisible, def);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getHelperColor(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.helperColor, def);
  }

  private getRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radius, def);
  }

  private getRadials(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radials, def);
  }

  private getCircles(def?: number): number {
    return ThreeUtil.getTypeSafe(this.circles, def);
  }

  private getDivisions(def?: number): number {
    return ThreeUtil.getTypeSafe(this.divisions, def);
  }

  private getColor1(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorSafe(this.color1, def);
  }

  private getColor2(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorSafe(this.color2, def);
  }

  private getHelperOpacity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.helperOpacity, def);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      Object.entries(changes).forEach(([key, value]) => {
        switch (key) {
          case 'helperVisible':
          case 'visible':
            break;
          default:
            if (this.parent !== null && this.object3d !== null) {
              this.parent.remove(this.object3d);
              this.object3d = null;
            }
            break;
        }
      });
      if (this.object3d) {
        if (changes.visible) {
          this.object3d.visible = this.visible;
        }
        if (this.helper && changes.helperVisible) {
          this.helper.visible = this.getHelperVisible(true);
        }
      }
      this.resetMesh();
    }
    super.ngOnChanges(changes);
  }

  private clips: THREE.AnimationClip[] = null;
  private clipMesh: THREE.Object3D = null;
  public helper: THREE.Object3D = null;

  getGeometry(): THREE.BufferGeometry {
    if (this.object3d !== null && this.object3d instanceof THREE.Mesh) {
      return this.object3d.geometry;
    } else if (this.geometry !== null && this.geometry.length > 0) {
      return this.geometry.first.getGeometry();
    } else {
      return null;
    }
  }

  private getMaterials(
    parameters?: THREE.MeshBasicMaterialParameters
  ): THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.materials !== null && this.materials.length > 0) {
      this.materials.forEach((material) => {
        if (material.materialType === 'material') {
          materials.push(material.getMaterial());
        }
      });
    }
    if (materials.length == 0) {
      materials.push(new THREE.MeshPhongMaterial(parameters));
    }
    return materials;
  }

  setParent(parent: THREE.Object3D, isRestore: boolean = false): boolean {
    if (super.setParent(parent, isRestore)) {
      if (isRestore) {
        this.object3d = parent;
        this.synkObject3D([
          'position',
          'rotation',
          'scale',
          'lookat',
          'rigidbody',
          'meshes',
          'cameras',
          'helpers',
          'geometry',
          'material',
          'svg',
          'listner',
          'audio',
          'controller',
        ]);
      } else {
        this.resetMesh(true);
      }
      return true;
    }
    return false;
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
      this.synkObject3D(['meshes']);
    });
    this.cameras.changes.subscribe((e) => {
      this.synkObject3D(['cameras']);
    });
    this.helpers.changes.subscribe((e) => {
      this.synkObject3D(['helpers']);
    });
    this.rigidbody.changes.subscribe((e) => {
      this.synkObject3D(['rigidbody']);
    });
    this.geometry.changes.subscribe((e) => {
      this.synkObject3D(['geometry']);
    });
    this.svg.changes.subscribe((e) => {
      this.synkObject3D(['svg']);
    });
    this.materials.changes.subscribe((e) => {
      this.synkObject3D(['material']);
    });
    this.listner.changes.subscribe(() => {
      this.synkObject3D(['listner']);
    });
    this.audio.changes.subscribe(() => {
      this.synkObject3D(['audio']);
    });
    this.cssChildren.changes.subscribe(() => {
      this.synkObject3D(['cssChildren']);
    });
    super.ngAfterContentInit();
  }

  setWireFrame(wireframe: boolean, child: THREE.Object3D = null) {
    if (child === null) {
      child = this.object3d;
    }
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.Material &&
      child.material['wireframe'] !== undefined
    ) {
      child.material['wireframe'] = wireframe;
    }
    child.children.forEach((obj) => {
      this.setWireFrame(wireframe, obj);
    });
  }

  setVisible(visible: boolean, helperVisible: boolean = null) {
    if (visible !== null && visible !== undefined) {
      this.object3d.visible = visible;
    }
    if (
      this.helper !== null &&
      helperVisible !== null &&
      helperVisible !== undefined
    ) {
      this.helper.visible = helperVisible;
    }
  }

  synkObject3D(synkTypes: string[]) {
    if (this.mesh !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'meshes':
            this.meshes.forEach((mesh) => {
              mesh.setParent(this.mesh);
            });
            break;
          case 'cameras':
            this.cameras.forEach((camera) => {
              camera.setParent(this.mesh);
            });
            break;
          case 'helpers':
            this.helpers.forEach((helper) => {
              helper.setParent(this.mesh);
            });
            break;
          case 'rigidbody':
            this.rigidbody.forEach((rigidbody) => {
              rigidbody.setParent(this.mesh);
            });
            break;
          case 'geometry':
            this.geometry.forEach((geometry) => {
              geometry.setParent(this.mesh);
            });
            break;
          case 'svg':
            this.svg.forEach((svg) => {
              svg.setParent(this.mesh);
            });
            break;
          case 'material':
            if (this.clipMesh !== null) {
              this.materials.forEach((material) => {
                material.setParent(this.clipMesh);
              });
            } else {
              this.materials.forEach((material) => {
                material.setParent(this.mesh);
              });
            }
            break;
          case 'mixer':
            if (this.clips !== null && this.clips !== undefined) {
              if (this.clipMesh !== null && this.clipMesh !== undefined) {
                this.mixer.forEach((mixer) => {
                  mixer.setModel(this.clipMesh, this.clips);
                });
              } else {
                this.mixer.forEach((mixer) => {
                  mixer.setModel(this.mesh, this.clips);
                });
              }
            }
            break;
          case 'listner':
            this.listner.forEach((listner) => {
              listner.setParent(this.mesh);
            });
            break;
          case 'audio':
            this.audio.forEach((audio) => {
              audio.setParent(this.mesh);
            });
            break;
          case 'cssChildren':
            this.cssChildren.forEach((cssChild) => {
              cssChild.setParent(this.mesh);
            });
            break;
        }
      });
      super.synkObject3D(synkTypes);
    }
  }

  resetMesh(clearMesh: boolean = false) {
    if (this.parent !== null) {
      if (clearMesh && this.mesh !== null && this.mesh.parent) {
        this.mesh.parent.remove(this.mesh);
        this.mesh = null;
      }
      if (clearMesh && this.helper != null && this.helper.parent != null) {
        this.helper.parent.remove(this.helper);
        this.helper = null;
      }
      this.parent.add(this.getMesh());
    }
  }

  getJson(): any {
    return this.getMesh().toJSON();
  }

  setSavelocalStorage(storageName: string) {
    return this.localStorageService.setObject(storageName, this.getMesh());
  }

  private cssClazzName: string = null;
  private mesh: THREE.Mesh | THREE.Group = null;
  getMesh(): THREE.Mesh | THREE.Group {
    if (this.mesh === null) {
      let geometry: THREE.BufferGeometry = null;
      if (this.geometry != null && this.geometry.length > 0) {
        geometry = this.getGeometry();
      }
      let basemesh: THREE.Mesh | THREE.Group = null;
      let object3d: THREE.Object3D = null;
      switch (this.type.toLowerCase()) {
        case 'skybox':
          const skyboxSize = this.getSkyboxSize(1500);
          switch (this.skyboxType.toLowerCase()) {
            case 'sun':
              const lensflare = new Lensflare();
              lensflare.addElement(
                new LensflareElement(
                  TextureComponent.getTextureImage(this.skyboxSunImage),
                  this.getSize(100),
                  0,
                  this.getColor(null)
                )
              );
              lensflare.position.set(0, 0, skyboxSize * 0.99);
              lensflare.position.applyEuler(this.getSkySunPosition());
              basemesh = lensflare;
              break;
            case 'box':
            case 'sphere':
            default:
              let skyGeometry: THREE.BufferGeometry = null;
              let skyMaterial: THREE.Material = null;
              switch (this.skyboxType.toLowerCase()) {
                case 'box':
                  skyGeometry = new THREE.BoxGeometry(
                    skyboxSize,
                    skyboxSize,
                    skyboxSize
                  );
                  break;
                case 'sphere':
                default:
                  skyGeometry = new THREE.SphereGeometry(skyboxSize, 8, 6);
                  break;
              }
              if (
                ThreeUtil.isNotNull(this.skyboxImage) ||
                ThreeUtil.isNotNull(this.skyboxCubeImage)
              ) {
                const envMap = TextureComponent.getTextureImage(
                  this.skyboxImage,
                  this.skyboxCubeImage
                );
                // envMap.flipY = true;
                skyMaterial = new THREE.MeshBasicMaterial({
                  depthTest: false,
                  // depthWrite : false,
                  envMap: envMap,
                  side: THREE.BackSide,
                });
              } else {
                skyMaterial = new THREE.MeshBasicMaterial({
                  depthTest: false,
                  // depthWrite : false,
                  color: this.getSkyColor(0xff0000),
                  side: THREE.BackSide,
                });
              }
              basemesh = new THREE.Mesh(skyGeometry, skyMaterial);
              basemesh.receiveShadow = false;
              basemesh.castShadow = false;
              break;
          }
          break;
        case 'css':
        case 'css3d':
        case 'css2d':
          const cssElement: HTMLElement = document.createElement('div');
          let cssGeometry: THREE.BufferGeometry = null;
          let cssMaterials: THREE.Material[] = this.getMaterials({
            opacity: 0.15,
            transparent: true,
            color: this.getGroundColor(0x111111),
            blending: THREE.NoBlending,
            side: THREE.DoubleSide,
          });
          if (geometry !== null) {
            cssGeometry = geometry;
          } else {
            cssGeometry = new THREE.BoxGeometry(
              this.getWidth(1),
              this.getHeight(1),
              this.getDistance(0.1)
            );
          }
          if (
            cssGeometry instanceof THREE.BoxGeometry ||
            cssGeometry instanceof THREE.PlaneGeometry
          ) {
            this.cssClazzName = ThreeUtil.addCssStyle(
              cssElement,
              {
                width: cssGeometry.parameters.width,
                height: cssGeometry.parameters.height,
                overflow: 'hidden',
              },
              this.cssClazzName,
              'mesh',
              'inline'
            );
          } else if (cssGeometry instanceof THREE.CircleGeometry) {
            this.cssClazzName = ThreeUtil.addCssStyle(
              cssElement,
              {
                width: cssGeometry.parameters.radius,
                height: cssGeometry.parameters.radius,
                overflow: 'hidden',
              },
              this.cssClazzName,
              'mesh',
              'inline'
            );
          }
          if (ThreeUtil.isNotNull(this.cssStyle)) {
            this.cssClazzName = ThreeUtil.addCssStyle(
              cssElement,
              this.cssStyle,
              this.cssClazzName,
              'mesh',
              'inline'
            );
          }
          let cssObject: THREE.Object3D = null;
          switch (this.type.toLowerCase()) {
            case 'css2d':
              cssObject = new CSS2DObject(cssElement);
              break;
            case 'css3d':
            case 'css':
            default:
              cssObject = new CSS3DObject(cssElement);
              break;
          }
          cssObject.castShadow = this.castShadow;
          cssObject.receiveShadow = this.receiveShadow;
          basemesh = new THREE.Mesh(cssGeometry, cssMaterials[0]);
          basemesh.add(cssObject);
          break;
        case 'light':
          switch (this.lightType.toLowerCase()) {
            case 'directional':
              object3d = new THREE.DirectionalLight(
                this.getColor(0xffffff),
                this.getIntensity(1)
              );
              object3d.castShadow = this.castShadow;
              break;
            case 'hemisphere':
              object3d = new THREE.HemisphereLight(
                this.getSkyColor(0xffffff),
                this.getGroundColor(0xffffff),
                this.getIntensity(1)
              );
              break;
            case 'point':
              object3d = new THREE.PointLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getDistance(),
                this.getDecay()
              );
              object3d.castShadow = this.castShadow;
              break;
            case 'area':
            case 'rectarea':
              object3d = new THREE.RectAreaLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getWidth(10),
                this.getHeight(10)
              );
              break;
            case 'spot':
              object3d = new THREE.SpotLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getDistance(),
                this.getAngle(),
                this.getPenumbra(),
                this.getDecay()
              );
              object3d.castShadow = this.castShadow;
              break;
            case 'ambient':
            default:
              object3d = new THREE.AmbientLight(
                this.getColor(0x0c0c0c),
                this.getIntensity(1)
              );
              break;
          }
          break;
        case 'lensflare':
          const lensflare = new Lensflare();
          this.lensflareElements.forEach((lensflareElement) => {
            lensflareElement.setLensflare(lensflare);
          });
          basemesh = lensflare;
          break;
        case 'instanced':
          basemesh = new THREE.InstancedMesh(
            geometry,
            this.getMaterials(),
            this.getCount(1)
          );
          break;
        case 'multi':
        case 'multimaterial':
          basemesh = SceneUtils.createMultiMaterialObject(
            geometry,
            this.getMaterials()
          );
          basemesh.children.forEach(function (e) {
            e.castShadow = true;
          });
          if (this.scaleStep != 1) {
            let scaleStep = this.scaleStep;
            basemesh.children.forEach((mesh) => {
              mesh.scale.x *= scaleStep;
              mesh.scale.y *= scaleStep;
              mesh.scale.z *= scaleStep;
              scaleStep *= this.scaleStep;
            });
          }
          break;
        case 'sprite':
          object3d = new THREE.Sprite(
            this.getMaterials()[0] as THREE.SpriteMaterial
          );
          break;
        case 'points':
          object3d = new THREE.Points(geometry, this.getMaterials()[0]);
          break;
        case 'line':
          const mesh = new THREE.Line(geometry, this.getMaterials()[0]);
          mesh.computeLineDistances();
          object3d = mesh;
          break;
        case 'mesh':
        default:
          if (ThreeUtil.isNotNull(this.storageName)) {
            basemesh = new THREE.Group();
            this.localStorageService.getObject(
              this.storageName,
              (
                loadedMesh: THREE.Object3D,
                clips?: THREE.AnimationClip[],
                geometry?: THREE.BufferGeometry
              ) => {
                if (loadedMesh !== null && loadedMesh !== undefined) {
                  if (this.castShadow) {
                    loadedMesh.traverse((object) => {
                      if (object instanceof THREE.Mesh) {
                        object.castShadow = true;
                      }
                    });
                  }
                  this.object3d.add(loadedMesh);
                  if (this.castShadow) {
                    loadedMesh.castShadow = this.castShadow;
                    loadedMesh.receiveShadow = this.receiveShadow;
                    loadedMesh.children.forEach((child) => {
                      child.castShadow = this.castShadow;
                      child.receiveShadow = this.receiveShadow;
                    });
                  }
                } else if (geometry !== null) {
                  if (
                    geometry['animations'] !== null &&
                    geometry['animations'] !== undefined &&
                    geometry['animations'].length > 0
                  ) {
                    const morphAnim = new MorphAnimMesh(
                      geometry,
                      this.getMaterials()[0]
                    );
                    loadedMesh = morphAnim;
                    this.object3d.add(loadedMesh);
                    if (geometry['animations'] !== null) {
                      clips = geometry['animations'];
                    }
                  } else {
                    loadedMesh = new THREE.Mesh(
                      geometry,
                      this.getMaterials()[0]
                    );
                    this.object3d.add(loadedMesh);
                  }
                }
                if (this.meshes) {
                  this.meshes.forEach((mesh) => {
                    if (
                      mesh.name !== null &&
                      mesh.name !== undefined &&
                      mesh.name !== ''
                    ) {
                      const foundMesh = basemesh.getObjectByName(mesh.name);
                      if (foundMesh instanceof THREE.Object3D) {
                        mesh.setParent(foundMesh, true);
                      }
                    }
                  });
                }
                if (clips !== null && clips !== undefined) {
                  this.clips = clips;
                }
                this.clipMesh = loadedMesh;
                this.synkObject3D(['mixer', 'material']);
                this.resetHelper();
              },
              this.storageOption
            );
          } else {
            const materials = this.getMaterials();
            if (geometry !== null) {
              if (materials.length > 1) {
                basemesh = new THREE.Mesh(geometry, materials);
              } else if (materials.length == 1) {
                basemesh = new THREE.Mesh(geometry, materials[0]);
              } else {
                basemesh = new THREE.Mesh(geometry);
              }
            } else {
              basemesh = new THREE.Mesh();
            }
            basemesh.castShadow = this.castShadow;
          }
      }
      if (ThreeUtil.isNotNull(object3d)) {
        basemesh = new THREE.Group();
        basemesh.add(object3d);
      }
      this.mesh = basemesh;
      if (this.meshes && this.meshes.length > 0) {
        this.meshes.forEach((mesh) => {
          mesh.setParent(basemesh);
        });
      }
      this.setObject3D(this.mesh);
      if (this.name !== null) {
        this.object3d.name = this.name;
      }
      this.object3d.visible = this.visible;
      if (
        this.object3d instanceof THREE.Mesh ||
        this.object3d instanceof THREE.Points ||
        this.object3d instanceof THREE.Sprite
      ) {
        const mesh = this.object3d;
        if (this.object3d instanceof THREE.Mesh) {
          mesh.castShadow = this.castShadow;
          mesh.receiveShadow = this.receiveShadow;
        }
      } else if (this.object3d instanceof THREE.Light) {
        if (
          this.object3d instanceof THREE.SpotLight ||
          this.object3d instanceof THREE.DirectionalLight
        ) {
          const target = this.getTarget(null);
          if (target != null) {
            this.object3d.target = target;
          }
        }
        if (this.object3d.shadow) {
          this.object3d.shadow.mapSize.width = this.getShadowMapSizeWidth(512);
          this.object3d.shadow.mapSize.height = this.getShadowMapSizeHeight(
            512
          );
          if (this.object3d.shadow.camera) {
            if (
              this.object3d.shadow.camera instanceof THREE.PerspectiveCamera
            ) {
              this.object3d.shadow.camera.near = this.getShadowCameraNear(0.1);
              this.object3d.shadow.camera.far = this.getShadowCameraFar(2000);
              this.object3d.shadow.camera.fov = this.getShadowCameraFov(50);
            } else if (
              this.object3d.shadow.camera instanceof THREE.OrthographicCamera
            ) {
              this.object3d.shadow.camera.near = this.getShadowCameraNear(0.1);
              this.object3d.shadow.camera.far = this.getShadowCameraFar(2000);
              this.object3d.shadow.camera.left = this.getShadowCameraLeft(-1);
              this.object3d.shadow.camera.right = this.getShadowCameraRight(1);
              this.object3d.shadow.camera.top = this.getShadowCameraTop(1);
              this.object3d.shadow.camera.bottom = this.getShadowCameraBottom(
                -1
              );
            }
          }
          this.object3d.shadow.updateMatrices(this.object3d);
        }
      }
      if (ThreeUtil.isNull(this.object3d.userData.component)) {
        this.object3d.userData.component = this;
      }
      if (this.helper == null) {
        this.resetHelper();
      }
      this.synkObject3D([
        'position',
        'rotation',
        'scale',
        'lookat',
        'rigidbody',
        'meshes',
        'cameras',
        'helpers',
        'geometry',
        'material',
        'svg',
        'listner',
        'audio',
        'cssChildren',
        'controller',
      ]);
      this.onLoad.emit(this);
    }
    return this.mesh;
  }

  resetHelper() {
    if (this.parent !== null) {
      if (this.helper !== null && this.helper.parent !== null) {
        this.helper.parent.remove(this.helper);
      }
      let basemesh: THREE.Object3D = null;
      const helperType = this.helperType.toLowerCase();
      if (helperType !== '' && helperType !== 'none') {
        const helper = new HelperComponent();
        helper.setHelperParams({
          type : this.helperType,
          color : this.color,
          target : this.target,
          size : this.size,
          radius : this.radius,
          radials : this.radials,
          circles : this.circles,
          divisions : this.divisions,
          color1 : this.color1,
          color2 : this.color2,
          opacity : this.helperOpacity,
          dirX : this.dirX,
          dirY : this.dirY,
          dirZ : this.dirZ,
          originX : this.originX,
          originY : this.originY,
          originZ : this.originZ,
          length : this.length,
          headLength : this.headLength,
          headWidth : this.headWidth,
        });
        basemesh = helper.getHelper();
      }
      if (basemesh !== null) {
        this.helper = basemesh;
        this.helper.visible = this.getHelperVisible(true);
        if (
          this.parent !== null &&
          (this.helper.parent == null || this.helper.parent == undefined)
        ) {
          this.parent.add(this.helper);
        }
      } else {
        this.helper = null;
      }
    }
  }
}
