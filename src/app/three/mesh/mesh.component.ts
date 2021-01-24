import { CameraComponent } from './../camera/camera.component';
import {
  Component,
  ContentChild,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
} from '@angular/core';
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import { Lensflare } from 'three/examples/jsm/objects/Lensflare';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { GeometryComponent } from '../geometry/geometry.component';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { SvgComponent } from '../svg/svg.component';
import { LocalStorageService } from './../local-storage.service';
import { LookatComponent } from './../lookat/lookat.component';

@Component({
  selector: 'three-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
})
export class MeshComponent implements OnInit {
  @Input() type: string = 'mesh';
  @Input() lightType: string = 'spot';
  @Input() helperType: string = 'axis';
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
  @Input() helperTarget: MeshComponent = null;
  @Input() camera: CameraComponent = null;

  @ContentChild(GeometryComponent, { descendants: false })
  geometry: GeometryComponent = null;

  @ContentChildren(MaterialComponent, { descendants: false })
  materials: QueryList<MaterialComponent>;

  @ContentChildren(MeshComponent, { descendants: false })
  meshes: QueryList<MeshComponent>;

  @ContentChildren(LensflareelementComponent, { descendants: false })
  lensflareElements: QueryList<LensflareelementComponent>;

  @ContentChild(PositionComponent, { descendants: false })
  position: PositionComponent = null;

  @ContentChild(RotationComponent, { descendants: false })
  rotation: RotationComponent = null;

  @ContentChild(ScaleComponent, { descendants: false })
  scale: ScaleComponent = null;

  @ContentChild(SvgComponent, { descendants: false }) svg: SvgComponent = null;

  @ContentChild(LookatComponent, { descendants: false })
  lookat: LookatComponent = null;

  constructor(private localStorageService: LocalStorageService) {}

  getIntensity(def: number): number {
    return this.intensity === null ? def : this.intensity;
  }

  getDistance(def: number): number {
    return this.distance === null ? def : this.distance;
  }

  getAngle(def: number): number {
    return ((this.angle === null ? def : this.angle) / 180) * Math.PI;
  }

  getPenumbra(def: number): number {
    return this.penumbra === null ? def : this.penumbra;
  }

  getDecay(def: number): number {
    return this.decay === null ? def : this.decay;
  }

  getWidth(def: number): number {
    return this.width === null ? def : this.width;
  }

  getHeight(def: number): number {
    return this.height === null ? def : this.height;
  }

  getColor(def: string | number): string | number {
    if (this.color === null) {
      return def;
    } else {
      const color = this.color.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.color;
      }
    }
  }

  getSkyColor(def: string | number): string | number {
    if (this.skyColor === null) {
      return def;
    } else {
      const color = this.skyColor.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.skyColor;
      }
    }
  }

  getGroundColor(def: string | number): string | number {
    if (this.groundColor === null) {
      return def;
    } else {
      const color = this.groundColor.toString();
      if (color.startsWith('0x')) {
        return parseInt(color, 16);
      } else {
        return this.groundColor;
      }
    }
  }

  getShadowMapSizeWidth(def: number): number {
    return this.shadowMapSizeWidth === null ? def : this.shadowMapSizeWidth;
  }

  getShadowMapSizeHeight(def: number): number {
    return this.shadowMapSizeHeight === null ? def : this.shadowMapSizeHeight;
  }

  getShadowCameraNear(def: number): number {
    return this.shadowCameraNear === null ? def : this.shadowCameraNear;
  }

  getShadowCameraFar(def: number): number {
    return this.shadowCameraFar === null ? def : this.shadowCameraFar;
  }

  getShadowCameraFov(def: number): number {
    return this.shadowCameraFov === null ? def : this.shadowCameraFov;
  }

  getShadowCameraLeft(def: number): number {
    return this.shadowCameraLeft === null ? def : this.shadowCameraLeft;
  }

  getShadowCameraRight(def: number): number {
    return this.shadowCameraRight === null ? def : this.shadowCameraRight;
  }

  getShadowCameraTop(def: number): number {
    return this.shadowCameraTop === null ? def : this.shadowCameraTop;
  }

  getShadowCameraBottom(def: number): number {
    return this.shadowCameraBottom === null ? def : this.shadowCameraBottom;
  }

  getTarget(def: number): THREE.Object3D {
    const target = this.target === null ? def : this.target;
    if (target !== null) {
      if (target.getObject3D) {
        return target.getObject3D();
      }
    }
    return null;
  }

  private getHelperTarget(): THREE.Object3D {
    if (this.helperTarget !== null) {
      return this.helperTarget.getMesh();
    } else {
      return new THREE.Object3D();
    }
  }

  private getSize(def: number): number {
    return this.size === null ? def : this.size;
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.meshes.changes.subscribe((e) => {
      if (this.mesh !== null) {
        this.meshes.forEach((mesh) => {
          mesh.setObject3D(this.mesh);
        });
      }
    });
    this.materials.changes.subscribe((e) => {
      if (this.mesh !== null) {
        this.resetMesh(true);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.mesh != null && this.refObject3d != null) {
      this.refObject3d.remove(this.mesh);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      if (this.refObject3d !== null && this.mesh !== null) {
        this.refObject3d.remove(this.mesh);
        this.mesh = null;
      }
      if (changes.type || changes.storageName) {
        this.mesh = null;
      }
      if (this.mesh && changes.visible) {
        this.mesh.visible = this.visible;
      }
      this.resetMesh();
      if (this._onChange !== null) {
        this._onChange.onChange();
      }
    }
  }

  private mesh: THREE.Object3D = null;
  private helper: THREE.CameraHelper = null;

  getPosition(): THREE.Vector3 {
    if (this.mesh !== null) {
      return this.getMesh().position;
    } else if (this.position !== null && this.position !== undefined) {
      return this.position.getPosition();
    } else {
      return new THREE.Vector3(0, 0, 0);
    }
  }

  getScale(): THREE.Vector3 {
    if (this.mesh !== null) {
      return this.getMesh().scale;
    } else if (this.scale !== null && this.scale !== undefined) {
      return this.scale.getScale();
    } else {
      return new THREE.Vector3(1, 1, 1);
    }
  }

  getRotation(): THREE.Euler {
    if (this.mesh !== null) {
      return this.getMesh().rotation;
    } else if (this.scale !== null && this.scale !== undefined) {
      return this.rotation.getRotation();
    } else {
      return new THREE.Euler(1, 1, 1);
    }
  }

  getGeometry(): THREE.Geometry | THREE.BufferGeometry {
    if (this.mesh !== null && this.mesh instanceof THREE.Mesh) {
      return this.mesh.geometry;
    } else if (this.geometry !== null && this.geometry !== undefined) {
      return this.geometry.getGeometry();
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

  private _onChange: {
    onChange(): void;
  } = null;

  setOnChange(onChange: { onChange(): void }) {
    this._onChange = onChange;
  }

  onChange(): void {
    if (this.mesh !== null) {
      if (this.refObject3d !== null && this.mesh !== null) {
        this.refObject3d.remove(this.mesh);
      }
      this.mesh = null;
      this.resetMesh();
    }
  }

  private refObject3d: THREE.Object3D = null;

  setObject3D(refObject3d: THREE.Object3D) {
    if (this.refObject3d !== refObject3d) {
      this.refObject3d = refObject3d;
      this.resetMesh();
    }
  }

  setMesh(mesh: THREE.Object3D, isRestore: boolean = false) {
    this.mesh = mesh;
    if (this.mesh !== null && isRestore) {
      if (this.position !== null && this.position !== undefined) {
        this.position.setPosition(this.mesh.position, true);
      }
      if (this.rotation !== null && this.rotation !== undefined) {
        this.rotation.setRotation(this.mesh.rotation, true);
      }
      if (this.scale !== null && this.scale !== undefined) {
        this.scale.setScale(this.mesh.scale, true);
      }
    }
  }

  resetMesh(clearMesh = false) {
    if (this.refObject3d !== null) {
      if (clearMesh && this.mesh !== null) {
        this.refObject3d.remove(this.mesh);
        this.mesh = null;
      }
      if (clearMesh && this.helper != null) {
        this.refObject3d.remove(this.helper);
        this.helper = null;
      }

      if (this.mesh === null) {
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
      if (this.geometry != null && this.geometry != undefined) {
        geometry = this.geometry.getGeometry();
      }
      switch (this.type.toLowerCase()) {
        case 'light':
          switch (this.lightType.toLowerCase()) {
            case 'directional':
              this.mesh = new THREE.DirectionalLight(
                this.getColor(0xffffff),
                this.getIntensity(1)
              );
              this.mesh.castShadow = this.castShadow;
              break;
            case 'hemisphere':
              this.mesh = new THREE.HemisphereLight(
                this.getSkyColor(0xffffff),
                this.getGroundColor(0xffffff),
                this.getIntensity(1)
              );
              break;
            case 'point':
              this.mesh = new THREE.PointLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getDistance(0),
                this.getDecay(1)
              );
              this.mesh.castShadow = this.castShadow;
              break;
            case 'area':
            case 'rectarea':
              this.mesh = new THREE.RectAreaLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getWidth(10),
                this.getHeight(10)
              );
              break;
            case 'spot':
              this.mesh = new THREE.SpotLight(
                this.getColor(0xffffff),
                this.getIntensity(1),
                this.getDistance(0),
                this.getAngle(60),
                this.getPenumbra(0),
                this.getDecay(1)
              );
              this.mesh.castShadow = this.castShadow;
              break;
            case 'ambient':
            default:
              this.mesh = new THREE.AmbientLight(
                this.getColor(0x0c0c0c),
                this.getIntensity(1)
              );
              break;
          }
          break;
        case 'helper':
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
              this.mesh = new THREE.ArrowHelper(
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
              this.mesh = new THREE.BoxHelper(
                null, // object: Object3D,
                null // color?: Color | string | number
              );
              break;
            case 'box3':
              this.mesh = new THREE.Box3Helper(null);
              break;
            case 'camera':
              this.mesh = new THREE.CameraHelper(null);
              break;
            case 'directionallight':
              this.mesh = new THREE.DirectionalLightHelper(null);
              break;
            case 'grid':
              this.mesh = new THREE.GridHelper();
              break;
            case 'polargrid':
              this.mesh = new THREE.PolarGridHelper(
                null,
                null,
                null,
                null,
                null,
                null
              );
              break;
            case 'hemispherelight':
              this.mesh = new THREE.HemisphereLightHelper(
                this.getHelperTarget() as THREE.HemisphereLight,
                this.getSize(10),
                this.getColor(0x000000)
              );
              break;
            case 'plane':
              this.mesh = new THREE.PlaneHelper(
                null
                // this.getHelperTarget() as THREE.Plane
              );
              break;
            case 'pointlight':
              this.mesh = new THREE.PointLightHelper(
                this.getHelperTarget() as THREE.PointLight
              );
              break;
            case 'skeleton':
              this.mesh = new THREE.SkeletonHelper(this.getHelperTarget());
              break;
            case 'spotlight':
              this.mesh = new THREE.SpotLightHelper(
                this.getHelperTarget() as THREE.Light,
                this.getColor(0xffffff)
              );
              break;
            case 'axes':
            default:
              this.mesh = new THREE.AxesHelper(this.getSize(5));
              break;
          }
          break;
        case 'storage':
          this.mesh = new THREE.Object3D();
          this.localStorageService.getObject(this.storageName, (mesh) => {
            this.mesh.add(mesh);
            const oldMesh: THREE.Object3D =
              this.refObject3d ? this.refObject3d : this.mesh;
            oldMesh.add(mesh);
            if (this.meshes) {
              this.meshes.forEach((mesh) => {
                if (
                  mesh.name !== null &&
                  mesh.name !== undefined &&
                  mesh.name !== ''
                ) {
                  const foundMesh = oldMesh.getObjectByName(mesh.name);
                  if (foundMesh instanceof THREE.Object3D) {
                    mesh.setMesh(foundMesh, true);
                  }
                }
              });
            }
          });
          break;
        case 'lensflare':
          const lensflare = new Lensflare();
          this.lensflareElements.forEach((lensflareElement) => {
            lensflareElement.setLensflare(lensflare);
          });
          this.mesh = lensflare;
          break;
        case 'multi':
        case 'multimaterial':
          this.mesh = SceneUtils.createMultiMaterialObject(
            geometry as THREE.Geometry,
            this.getMaterials()
          );
          this.mesh.children.forEach(function (e) {
            e.castShadow = true;
          });
          if (this.scaleStep != 1) {
            let scaleStep = this.scaleStep;
            this.mesh.children.forEach((mesh) => {
              mesh.scale.x *= scaleStep;
              mesh.scale.y *= scaleStep;
              mesh.scale.z *= scaleStep;
              scaleStep *= this.scaleStep;
            });
          }
          break;
        case 'sprite':
          this.mesh = new THREE.Sprite(
            this.getMaterials()[0] as THREE.SpriteMaterial
          );
          break;
        case 'points':
          this.mesh = new THREE.Points(geometry, this.getMaterials()[0]);
          break;
        case 'line':
          const mesh = new THREE.Line(geometry, this.getMaterials()[0]);
          mesh.computeLineDistances();
          this.mesh = mesh;
          break;
        case 'mesh':
        default:
          const materials = this.getMaterials();
          if (geometry !== null) {
            if (materials.length > 1) {
              this.mesh = new THREE.Mesh(geometry, materials);
            } else if (materials.length == 1) {
              this.mesh = new THREE.Mesh(geometry, materials[0]);
            } else {
              this.mesh = new THREE.Mesh(geometry);
            }
          } else {
            this.mesh = new THREE.Mesh();
          }
          this.mesh.castShadow = this.castShadow;
          break;
      }
      if (this.meshes && this.meshes.length > 0) {
        const meshBSP: MeshComponent[] = [];
        this.meshes.forEach((mesh) => {
          switch (mesh.typeCsg.toLowerCase()) {
            case 'subtract':
            case 'intersect':
            case 'union':
              mesh.setOnChange(this);
              meshBSP.push(mesh);
              break;
            default:
              mesh.setObject3D(this.mesh);
              break;
          }
        });
        if (this.mesh instanceof THREE.Mesh) {
          if (meshBSP.length > 0) {
            this.mesh.updateMatrix();
            let sourceCsg: CSG =
              geometry !== null ? CSG.fromMesh(this.mesh) : null;
            const matrix: THREE.Matrix4 = this.mesh.matrix;
            meshBSP.forEach((mesh) => {
              const meshIns = mesh.getMesh();
              if (meshIns instanceof THREE.Mesh) {
                meshIns.updateMatrix();
                const targetBsp: CSG = CSG.fromMesh(meshIns);
                if (sourceCsg != null) {
                  switch (mesh.typeCsg) {
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
              this.mesh = mesh;
            }
          }
        }
      }
      if (this.name !== null) {
        this.mesh.name = this.name;
      }
      if (this.position !== null && this.position != undefined) {
        this.position.setPosition(this.mesh.position);
      }
      if (this.rotation !== null && this.rotation != undefined) {
        this.rotation.setRotation(this.mesh.rotation);
      }
      if (this.scale !== null && this.scale != undefined) {
        this.scale.setScale(this.mesh.scale);
      }
      this.mesh.visible = this.visible;
      if (this.svg !== null && this.svg !== undefined) {
        this.svg.setObject3D(this.mesh);
      }
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
        if (geometry !== null) {
          this.geometry.setMesh(mesh);
        }
        if (mesh.material instanceof Array) {
          this.materials.forEach((material, idx) => {
            if (mesh.material[idx]) material.setMaterial(mesh.material[idx]);
          });
        } else if (this.materials.length == 1) {
          this.materials.first.setMaterial(mesh.material);
        }
      } else if (this.mesh instanceof THREE.Group) {
        const meshes = this.mesh.children as THREE.Mesh[];
        this.geometry.setMesh(meshes);
        meshes.forEach((mesh, idx) => {
          if (mesh.material instanceof Array) {
            this.materials[idx].setMaterial(mesh.material[idx]);
          } else if (this.materials.length == 0) {
            this.materials[idx].setMaterial(mesh.material);
          }
        });
      } else if (this.mesh instanceof THREE.Light) {
        if (this.lookat !== null && this.lookat != undefined) {
          this.mesh.lookAt(this.lookat.getLookAt());
          this.lookat.setObject3D(this.mesh);
        }
        if (this.mesh instanceof THREE.SpotLight) {
          this.mesh.penumbra = this.exponent;
          const target = this.getTarget(null);
          if (target != null) {
            this.mesh.target = target;
          }
        } else if (this.mesh instanceof THREE.DirectionalLight) {
          const target = this.getTarget(null);
          if (target != null) {
            this.mesh.target = target;
          }
        } else if (this.mesh instanceof THREE.RectAreaLight) {
          if (this.shadowCameraVisible) {
            const rectLightHelper = new RectAreaLightHelper(this.mesh);
            this.mesh.add(rectLightHelper);
          }
        }
        if (this.mesh.shadow) {
          this.mesh.shadow.mapSize.width = this.getShadowMapSizeWidth(1024);
          this.mesh.shadow.mapSize.height = this.getShadowMapSizeHeight(1024);
          if (this.mesh.shadow.camera) {
            if (this.shadowCameraVisible) {
              this.helper = new THREE.CameraHelper(this.mesh.shadow.camera);
            } else {
              this.helper = null;
            }
            if (this.mesh.shadow.camera instanceof THREE.PerspectiveCamera) {
              this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
              this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
              this.mesh.shadow.camera.fov = this.getShadowCameraFov(50);
            } else if (
              this.mesh.shadow.camera instanceof THREE.OrthographicCamera
            ) {
              this.mesh.shadow.camera.near = this.getShadowCameraNear(0.1);
              this.mesh.shadow.camera.far = this.getShadowCameraFar(2000);
              this.mesh.shadow.camera.left = this.getShadowCameraLeft(-50);
              this.mesh.shadow.camera.right = this.getShadowCameraRight(50);
              this.mesh.shadow.camera.top = this.getShadowCameraTop(50);
              this.mesh.shadow.camera.bottom = this.getShadowCameraBottom(-50);
            }
          } else {
            this.helper = null;
          }
        } else {
          this.helper = null;
        }
      }
    }
    return this.mesh;
  }
}
