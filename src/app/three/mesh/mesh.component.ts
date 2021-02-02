import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  SimpleChanges
} from '@angular/core';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import {
  Lensflare,
  LensflareElement
} from 'three/examples/jsm/objects/Lensflare';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { GeometryComponent } from '../geometry/geometry.component';
import { AbstractMeshComponent, ThreeUtil } from '../interface';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { SvgComponent } from '../svg/svg.component';
import { TextureComponent } from '../texture/texture.component';
import { AudioComponent } from './../audio/audio.component';
import { ListenerComponent } from './../listener/listener.component';
import { LocalStorageService } from './../local-storage.service';
import { LookatComponent } from './../lookat/lookat.component';
import { MixerComponent } from './../mixer/mixer.component';
import * as PHYSIJS from './../physijs/src';
import { MorphAnimMesh } from 'three/examples/jsm/misc/MorphAnimMesh';


@Component({
  selector: 'three-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
})
export class MeshComponent extends AbstractMeshComponent implements OnInit {
  @Input() type: string = 'mesh';
  @Input() physiType: string = 'none';
  @Input() mass: number = null;
  @Input() lightType: string = 'spot';
  @Input() skyboxType: string = 'auto';
  @Input() skyboxRate: number = 100;
  @Input() skyboxImage: string = null;
  @Input() skyboxCubeImage: string[] = null;
  @Input() skyboxSunImage: string = null;
  @Input() skyboxSunX: number = 0;
  @Input() skyboxSunY: number = 0;
  @Input() skyboxSunZ: number = 0;
  @Input() helperType: string = 'none';
  @Input() typeCsg: 'subtract' | 'intersect' | 'union' | 'none' = 'none';
  @Input() scaleStep: number = 1;
  @Input() visible: boolean = true;
  @Input() castShadow: boolean = true;
  @Input() receiveShadow: boolean = false;
  @Input() name: string = null;
  @Input() storageName: string = null;
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

  @ContentChildren(GeometryComponent, { descendants: false }) geometry: QueryList<GeometryComponent>;
  @ContentChildren(MaterialComponent, { descendants: false })
  materials: QueryList<MaterialComponent>;
  @ContentChildren(MeshComponent, { descendants: false })
  meshes: QueryList<MeshComponent>;
  @ContentChildren(LensflareelementComponent, { descendants: false })
  lensflareElements: QueryList<LensflareelementComponent>;
  @ContentChildren(PositionComponent, { descendants: false })
  position: QueryList<PositionComponent>;
  @ContentChildren(RotationComponent, { descendants: false })
  rotation: QueryList<RotationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false })
  scale: QueryList<ScaleComponent>;
  @ContentChildren(LookatComponent, { descendants: false })
  lookat: QueryList<LookatComponent>;
  @ContentChildren(SvgComponent, { descendants: false })
  svg: QueryList<SvgComponent>;
  @ContentChildren(MixerComponent, { descendants: false })
  mixer: QueryList<MixerComponent>;
  @ContentChildren(ListenerComponent, { descendants: false })
  listner: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false })
  audio: QueryList<AudioComponent>;

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  getMass(def?: number): number {
    return ThreeUtil.getTypeSafe(this.mass, def);
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


  ngOnInit(): void { }

  ngOnDestroy(): void {
    if (this.mesh != null && this.refObject3d != null) {
      this.refObject3d.remove(this.mesh);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      Object.entries(changes).forEach(([key, value]) => {
        switch (key) {
          case 'helperVisible':
          case 'visible':
            break;
          default:
            if (this.refObject3d !== null && this.mesh !== null) {
              this.refObject3d.remove(this.mesh);
              this.mesh = null;
            }
            break;
        }
      });
      if (this.mesh) {
        if (changes.visible) {
          this.mesh.visible = this.visible;
        }
        if (this.helper && changes.helperVisible) {
          this.helper.visible = this.getHelperVisible(true);
        }
      }
      this.resetMesh();
    }
  }

  private mesh: THREE.Object3D = null;
  private clips: THREE.AnimationClip[] = null;
  private clipMesh: THREE.Object3D = null;
  private helper: THREE.Object3D = null;

  getPosition(): THREE.Vector3 {
    if (this.mesh !== null) {
      return this.mesh.position;
    } else if (this.position !== null && this.position.length > 0) {
      return this.position.first.getPosition();
    } else {
      return new THREE.Vector3(0, 0, 0);
    }
  }

  getScale(): THREE.Vector3 {
    if (this.mesh !== null) {
      return this.mesh.scale;
    } else if (this.scale !== null && this.scale.length > 0) {
      return this.scale.first.getScale();
    } else {
      return new THREE.Vector3(1, 1, 1);
    }
  }

  getRotation(): THREE.Euler {
    if (this.mesh !== null) {
      return this.mesh.rotation;
    } else if (this.scale !== null && this.scale.length > 0) {
      return this.rotation.first.getRotation();
    } else {
      return new THREE.Euler(0, 0, 0);
    }
  }

  getGeometry(): THREE.Geometry | THREE.BufferGeometry {
    if (this.mesh !== null && this.mesh instanceof THREE.Mesh) {
      return this.mesh.geometry;
    } else if (this.geometry !== null && this.geometry.length > 0) {
      return this.geometry.first.getGeometry();
    } else {
      return null;
    }
  }

  getPhysiMesh(): PHYSIJS.Mesh {
    if (this.mesh !== null && this.mesh instanceof PHYSIJS.Mesh) {
      return this.mesh;
    } else {
      return null;
    }
  }

  private getMaterials(): THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.materials !== null && this.materials.length > 0) {
      this.materials.forEach((material) => {
        materials.push(material.getMaterial());
      });
    }
    if (materials.length == 0) {
      materials.push(new THREE.MeshBasicMaterial());
    }
    return materials;
  }

  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D, isRestore: boolean = false) {
    if (isRestore) {
      if (this.refObject3d !== refObject3d.parent) {
        this.refObject3d = refObject3d.parent;
        this.mesh = refObject3d;
        this.synkObject3D([
          'position',
          'rotation',
          'scale',
          'lookat',
          'mesh',
          'geometry',
          'material',
          'svg',
          'listner',
          'audio'
        ]);
      }
    } else {
      if (this.refObject3d !== refObject3d) {
        this.refObject3d = refObject3d;
        this.resetMesh(true);
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
  }

  synkObject3D(synkTypes: string[]) {
    if (this.mesh !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'position':
            this.position.forEach((position) => {
              position.setObject3D(this.mesh);
            });
            break;
          case 'rotation':
            this.rotation.forEach((rotation) => {
              rotation.setObject3D(this.mesh);
            });
            break;
          case 'scale':
            this.scale.forEach((scale) => {
              scale.setObject3D(this.mesh);
            });
            break;
          case 'lookat':
            this.lookat.forEach((lookat) => {
              lookat.setObject3D(this.mesh);
            });
            break;
          case 'mesh':
            this.meshes.forEach((mesh) => {
              mesh.setObject3D(this.mesh);
            });
            break;
          case 'geometry':
            this.geometry.forEach((geometry) => {
              geometry.setObject3D(this.mesh);
            });
            break;
          case 'svg':
            this.svg.forEach((svg) => {
              svg.setObject3D(this.mesh);
            });
            break;
          case 'material':
            if (this.clipMesh !== null) {
              this.materials.forEach((material) => {
                material.setObject3D(this.clipMesh);
              });
            } else {
              this.materials.forEach((material) => {
                material.setObject3D(this.mesh);
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
              listner.setObject3D(this.mesh);
            });
            break;
          case 'audio':
            this.audio.forEach((audio) => {
              audio.setObject3D(this.mesh);
            });
            break;
        }
      });
    }
  }

  resetMesh(clearMesh: boolean = false) {
    if (this.refObject3d !== null) {
      if (clearMesh && this.mesh !== null && this.mesh.parent) {
        this.mesh.parent.remove(this.mesh);
        this.mesh = null;
      }
      if (clearMesh && this.helper != null && this.helper.parent != null) {
        this.helper.parent.remove(this.helper);
        this.helper = null;
      }
      if (this.mesh === null && this.typeCsg == 'none') {
        this.refObject3d.add(this.getMesh());
      }
    }
  }

  getObject3D(): THREE.Object3D {
    return this.getMesh();
  }

  getJson(): any {
    return this.getMesh().toJSON();
  }

  setSavelocalStorage(storageName: string) {
    return this.localStorageService.setObject(storageName, this.getMesh());
  }

  getMesh(): THREE.Object3D {
    if (this.mesh === null) {
      let geometry: THREE.Geometry | THREE.BufferGeometry = null;
      if (this.geometry != null && this.geometry.length > 0) {
        geometry = this.getGeometry();
      }
      let basemesh: THREE.Object3D = null;
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
              let skyGeometry: THREE.Geometry | THREE.BufferGeometry = null;
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
        case 'light':
          switch (this.lightType.toLowerCase()) {
            case 'directional':
              basemesh = new THREE.DirectionalLight(
                this.getColor(0xffffff),
                this.getIntensity(1)
              );
              basemesh.castShadow = this.castShadow;
              break;
            case 'hemisphere':
              basemesh = new THREE.HemisphereLight(
                this.getSkyColor(0xffffff),
                this.getGroundColor(0xffffff),
                this.getIntensity(1)
              );
              break;
            case 'point':
              basemesh = new THREE.PointLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getDistance(),
                this.getDecay()
              );
              basemesh.castShadow = this.castShadow;
              break;
            case 'area':
            case 'rectarea':
              basemesh = new THREE.RectAreaLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getWidth(10),
                this.getHeight(10)
              );
              break;
            case 'spot':
              basemesh = new THREE.SpotLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getDistance(),
                this.getAngle(),
                this.getPenumbra(),
                this.getDecay()
              );
              basemesh.castShadow = this.castShadow;
              break;
            case 'ambient':
            default:
              basemesh = new THREE.AmbientLight(
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
        case 'multi':
        case 'multimaterial':
          basemesh = SceneUtils.createMultiMaterialObject(
            geometry as THREE.Geometry,
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
          basemesh = new THREE.Sprite(
            this.getMaterials()[0] as THREE.SpriteMaterial
          );
          break;
        case 'points':
          basemesh = new THREE.Points(geometry, this.getMaterials()[0]);
          break;
        case 'line':
          const mesh = new THREE.Line(geometry, this.getMaterials()[0]);
          mesh.computeLineDistances();
          basemesh = mesh;
          break;
        case 'mesh':
        default:
          if (ThreeUtil.isNotNull(this.storageName)) {
            basemesh = new THREE.Object3D();
            this.localStorageService.getObject(
              this.storageName,
              (loadedMesh: THREE.Object3D, clips?: THREE.AnimationClip[], geometry?: THREE.Geometry | THREE.BufferGeometry) => {
                if (loadedMesh !== null && loadedMesh !== undefined) {
                  if (this.castShadow) {
                    loadedMesh.traverse((object) => {
                      if (object instanceof THREE.Mesh) {
                        object.castShadow = true;
                      }
                    });
                  }
                  this.mesh.add(loadedMesh);
                } else if (geometry !== null) {
                  if (geometry['animations'] !== null && geometry['animations'] !== undefined && geometry['animations'].length > 0) {
                    const morphAnim = new MorphAnimMesh(geometry, this.getMaterials()[0]);
                    loadedMesh = morphAnim;
                    this.mesh.add(loadedMesh);
                    clips = geometry['animations'];
                  } else {
                    loadedMesh = new THREE.Mesh(geometry, this.getMaterials()[0]);
                    this.mesh.add(loadedMesh);
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
                        mesh.setObject3D(foundMesh, true);
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
              }
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
      if (this.meshes && this.meshes.length > 0) {
        const meshBSP: MeshComponent[] = [];
        this.meshes.forEach((mesh) => {
          switch (mesh.typeCsg.toLowerCase()) {
            case 'subtract':
            case 'intersect':
            case 'union':
              meshBSP.push(mesh);
              break;
            default:
              // mesh.setObject3D(basemesh);
              break;
          }
        });
        if (basemesh instanceof THREE.Mesh) {
          if (meshBSP.length > 0) {
            basemesh.updateMatrix();
            let sourceCsg: CSG =
              geometry !== null ? CSG.fromMesh(basemesh) : null;
            const matrix: THREE.Matrix4 = basemesh.matrix;
            meshBSP.forEach((mesh) => {
              const meshIns = mesh.getMesh();
              if (meshIns instanceof THREE.Mesh) {
                meshIns.updateMatrix();
                const targetBsp: CSG = CSG.fromMesh(meshIns);
                if (sourceCsg != null) {
                  switch (mesh.typeCsg.toLowerCase()) {
                    case 'subtract':
                      sourceCsg = sourceCsg.subtract(targetBsp);
                      break;
                    case 'intersect':
                      sourceCsg = sourceCsg.intersect(targetBsp);
                      break;
                    case 'union':
                      sourceCsg = sourceCsg.union(targetBsp);
                      break;
                  }
                } else {
                  sourceCsg = targetBsp;
                }
              }
            });
            if (sourceCsg != null) {
              const mesh = CSG.toMesh(sourceCsg, matrix);
              const materials = this.getMaterials();
              if (materials.length > 0) {
                if (mesh.material instanceof Array) {
                  mesh.material.forEach((material) => {
                    material.copy(materials[0]);
                  });
                } else {
                  mesh.material = materials[0];
                }
              }
              basemesh = mesh;
            }
          }
        }
      }
      if (
        basemesh instanceof THREE.Mesh &&
        (basemesh.geometry instanceof THREE.Geometry ||
          basemesh.geometry instanceof THREE.BufferGeometry) &&
        basemesh.material instanceof THREE.Material
      ) {
        switch (this.physiType.toLowerCase()) {
          case 'box':
            this.mesh = new PHYSIJS.BoxMesh(
              basemesh.geometry,
              PHYSIJS.createMaterial(basemesh.material, 0.9, 0),
              this.getMass(1)
            );
            break;
          case 'sphere':
            this.mesh = new PHYSIJS.SphereMesh(
              basemesh.geometry,
              basemesh.material,
              this.getMass(1)
            );
            break;
          case 'cylinder':
            this.mesh = new PHYSIJS.CylinderMesh(
              basemesh.geometry,
              basemesh.material,
              this.getMass(1)
            );
            break;
          case 'capsule':
            this.mesh = new PHYSIJS.CapsuleMesh(
              basemesh.geometry,
              basemesh.material,
              this.getMass(1)
            );
            break;
          case 'cone':
            this.mesh = new PHYSIJS.ConeMesh(
              basemesh.geometry,
              basemesh.material,
              this.getMass(1)
            );
            break;
          case 'concave':
            this.mesh = new PHYSIJS.ConcaveMesh(
              basemesh.geometry,
              basemesh.material,
              this.getMass(1)
            );
            break;
          case 'convex':
            this.mesh = new PHYSIJS.ConvexMesh(
              basemesh.geometry,
              basemesh.material,
              this.getMass(1)
            );
            break;
          case 'capsule':
            this.mesh = new PHYSIJS.CapsuleMesh(
              basemesh.geometry,
              basemesh.material,
              this.getMass(1)
            );
            break;
          case 'none':
          default:
            this.mesh = basemesh;
        }
      } else {
        this.mesh = basemesh;
      }

      if (this.name !== null) {
        this.mesh.name = this.name;
      }
      this.mesh.visible = this.visible;
      if (
        this.mesh instanceof THREE.Mesh ||
        this.mesh instanceof THREE.Points ||
        this.mesh instanceof THREE.Sprite
      ) {
        const mesh = this.mesh;
        if (this.mesh instanceof THREE.Mesh) {
          mesh.castShadow = this.castShadow;
          mesh.receiveShadow = this.receiveShadow;
        }
      } else if (this.mesh instanceof THREE.Light) {
        if (this.mesh instanceof THREE.SpotLight || this.mesh instanceof THREE.DirectionalLight) {
          const target = this.getTarget(null);
          if (target != null) {
            this.mesh.target = target;
          }
        }
        if (this.mesh.shadow) {
          this.mesh.shadow.mapSize.width = this.getShadowMapSizeWidth(512);
          this.mesh.shadow.mapSize.height = this.getShadowMapSizeHeight(512);
          if (this.mesh.shadow.camera) {
            if (this.mesh.shadow.camera instanceof THREE.PerspectiveCamera) {
              this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
              this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
              this.mesh.shadow.camera.fov = this.getShadowCameraFov(50);
            } else if (
              this.mesh.shadow.camera instanceof THREE.OrthographicCamera
            ) {
              this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
              this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
              this.mesh.shadow.camera.left = this.getShadowCameraLeft(-1);
              this.mesh.shadow.camera.right = this.getShadowCameraRight(1);
              this.mesh.shadow.camera.top = this.getShadowCameraTop(1);
              this.mesh.shadow.camera.bottom = this.getShadowCameraBottom(-1);
            }
          }
         this.mesh.shadow.updateMatrices(this.mesh);
        }
      }
      if (this.helper == null) {
        this.resetHelper();
      }

      this.synkObject3D([
        'position',
        'rotation',
        'scale',
        'lookat',
        'mesh',
        'geometry',
        'material',
        'svg',
        'listner',
        'audio'
      ]);
    }
    return this.mesh;
  }

  resetHelper() {
    if (this.refObject3d !== null) {
      if (this.helper !== null && this.helper.parent !== null) {
        this.helper.parent.remove(this.helper);
      }
      let basemesh: THREE.Object3D = null;
      switch (this.helperType.toLowerCase()) {
        case 'arrow':
          /**
           * @param [dir=new THREE.Vector3( 0, 0, 1 )]
           * @param [origin=new THREE.Vector3( 0, 0, 0 )]
           * @param [length=1]
           * @param [color=0xffff00]
           * @param headLength
           * @param headWidth
           */
          basemesh = new THREE.ArrowHelper(
            null // dir: Vector3,
            // origin?: Vector3,
            // length?: number,
            // color?: Color | string | number,
            // headLength?: number,
            // headWidth?: number
          );
          break;
        case 'box':
          /**
           * @param object
           * @param [color=0xffff00]
           */
          basemesh = new THREE.BoxHelper(
            null, // object: Object3D,
            null // color?: Color | string | number
          );
          break;
        case 'box3':
          basemesh = new THREE.Box3Helper(null);
          break;
        case 'grid':
          basemesh = new THREE.GridHelper(0, 0); // todo
          break;
        case 'polargrid':
          basemesh = new THREE.PolarGridHelper(
            null,
            null,
            null,
            null,
            null,
            null
          );
          break;
        case 'camera': {
            let helperTarget = this.getHelperTarget(this.mesh);
            if (helperTarget instanceof THREE.Light && helperTarget.shadow.camera) {
              basemesh = new THREE.CameraHelper(helperTarget.shadow.camera);
            } else if (helperTarget instanceof THREE.Camera) {
              basemesh = new THREE.CameraHelper(helperTarget);
            }
          }
          break;
        case 'directionallight':
        case 'hemispherelight':
        case 'pointlight':
        case 'spotlight':
        case 'light': {
            let helperTarget = this.getHelperTarget(this.mesh);
            if (helperTarget instanceof THREE.DirectionalLight) {
              basemesh = new THREE.DirectionalLightHelper(
                helperTarget,
                this.getSize(10),
                this.getHelperColor(0xff0000)
              );
            } else if (helperTarget instanceof THREE.HemisphereLight) {
              basemesh = new THREE.HemisphereLightHelper(
                helperTarget,
                this.getSize(10),
                this.getHelperColor(0xff0000)
              );
            } else if (helperTarget instanceof THREE.PointLight) {
              basemesh = new THREE.PointLightHelper(
                helperTarget,
                this.getSize(10),
                this.getHelperColor(0xff0000)
              );
            } else if (helperTarget instanceof THREE.SpotLight) {
              basemesh = new THREE.SpotLightHelper(
                helperTarget,
                this.getHelperColor(0xff0000)
              );
            }
          }
          break;
        case 'plane':
          basemesh = new THREE.PlaneHelper(
            null
            // this.getHelperTarget() as THREE.Plane
          );
          break;
        case 'skeleton':
          if (this.clipMesh !== null) {
            basemesh = new THREE.SkeletonHelper(this.clipMesh);
          } else {
            basemesh = new THREE.SkeletonHelper(this.mesh);
          }
          break;
        case 'axes':
          basemesh = new THREE.AxesHelper(this.getSize(10));
          this.mesh.add(basemesh);
          break;
      }
      if (basemesh !== null) {
        this.helper = basemesh;
        this.helper.visible = this.getHelperVisible(true);
        if (this.refObject3d !== null && (this.helper.parent == null || this.helper.parent == undefined)) {
          this.refObject3d.add(this.helper);
        }
      } else {
        this.helper = null;
      }
    }
  }

}
