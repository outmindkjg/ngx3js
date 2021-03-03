import { LightComponent } from './../light/light.component';
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
import { Subscription } from 'rxjs';

@Component({
  selector: 'three-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
})
export class MeshComponent
  extends AbstractObject3dComponent
  implements OnInit, InterfaceMeshComponent {
  @Input() public type:string = 'mesh';
  @Input() private lightType:string = 'spot';
  @Input() private cssStyle:string | CssStyle = null;
  @Input() private skyboxType:string = 'auto';
  @Input() private skyboxRate:number = 100;
  @Input() private skyboxImage:string = null;
  @Input() private skyboxCubeImage:string[] = null;
  @Input() private skyboxSunImage:string = null;
  @Input() private skyboxSunX:number = 0;
  @Input() private skyboxSunY:number = 0;
  @Input() private skyboxSunZ:number = 0;
  @Input() private helperType:string = 'none';
  @Input() private scaleStep:number = 1;
  @Input() private castShadow:boolean = true;
  @Input() private renderOrder:number = null;
  @Input() private usePlaneStencil:boolean = false;
  @Input() private receiveShadow:boolean = false;
  @Input() private storageName:string = null;
  @Input() private storageOption:any = null;
  @Input() private color:string | number = null;
  @Input() private skyColor:string | number = null;
  @Input() private groundColor:string | number = null;
  @Input() private intensity:number = null;
  @Input() private distance:number = null;
  @Input() private metalness:number = null;
  @Input() private roughness:number = null;
  @Input() private angle:number = null;
  @Input() private penumbra:number = null;
  @Input() private decay:number = null;
  @Input() private width:number = null;
  @Input() private height:number = null;
  @Input() private count:number = null;

  @Input() private shadowCameraNear:number = null;
  @Input() private shadowMapSizeWidth:number = null;
  @Input() private shadowMapSizeHeight:number = null;
  @Input() private shadowCameraFar:number = null;
  @Input() private shadowCameraFov:number = null;
  @Input() private shadowCameraLeft:number = null;
  @Input() private shadowCameraRight:number = null;
  @Input() private shadowCameraTop:number = null;
  @Input() private shadowCameraBottom:number = null;
  @Input() private target:any = null;
  @Input() private size:number = null;
  @Input() private helperVisible:boolean = null;
  @Input() private radius:number = null;
  @Input() private radials:number = null;
  @Input() private circles:number = null;
  @Input() private divisions:number = null;
  @Input() private color1:string | number = null;
  @Input() private color2:string | number = null;
  @Input() private helperOpacity:number = null;
  @Input() private dirX: number = null;
  @Input() private dirY: number = null;
  @Input() private dirZ: number = null;
  @Input() private originX: number = null;
  @Input() private originY: number = null;
  @Input() private originZ: number = null;
  @Input() private length: number = null;
  @Input() private headLength: number = null;
  @Input() private headWidth: number = null;
  @Input() private geometry: GeometryComponent = null;
  @Input() private material: MaterialComponent = null;

  @Output() private onLoad:EventEmitter<MeshComponent> = new EventEmitter<MeshComponent>();

  @ContentChildren(GeometryComponent, { descendants: false }) private geometryList: QueryList<GeometryComponent>;
  @ContentChildren(MaterialComponent, { descendants: false }) private materialList: QueryList<MaterialComponent>;
  @ContentChildren(LensflareelementComponent, { descendants: false }) private lensflareElementList: QueryList<LensflareelementComponent>;
  @ContentChildren(SvgComponent, { descendants: false }) private svgList: QueryList<SvgComponent>;
  @ContentChildren(MixerComponent, { descendants: false }) private mixerList: QueryList<MixerComponent>;
  @ContentChildren(ListenerComponent, { descendants: false }) private listnerList: QueryList<ListenerComponent>;
  @ContentChildren(AudioComponent, { descendants: false }) private audioList: QueryList<AudioComponent>;
  @ContentChildren(HtmlComponent, { descendants: false }) private cssChildrenList: QueryList<HtmlComponent>;
  @ContentChildren(RigidbodyComponent, { descendants: false }) private rigidbodyList: QueryList<RigidbodyComponent>;
  @ContentChildren(MeshComponent, { descendants: false }) private meshList: QueryList<MeshComponent>;
  @ContentChildren(CameraComponent, { descendants: false }) private cameraList: QueryList<CameraComponent>;
  @ContentChildren(HelperComponent, { descendants: false }) private helperList: QueryList<HelperComponent>;
  @ContentChildren(LightComponent, { descendants: false }) private lightList: QueryList<LightComponent>;

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  private getSkyboxSize(def?: number): number {
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

  private getDistance(def?: number): number {
    return ThreeUtil.getTypeSafe(this.distance, def);
  }

  private getMetalness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.metalness, def);
  }

  private getRoughness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.roughness, def);
  }

  private getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width, def);
  }

  private getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height, def);
  }

  private getCount(def?: number): number {
    return ThreeUtil.getTypeSafe(this.count, def);
  }

  private getColor(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, def);
  }

  private getSkyColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.skyColor, def);
  }

  private getGroundColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.groundColor, def);
  }

  private getHelperVisible(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.helperVisible, def);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
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

  private _materialSubscribe: Subscription[] = [];
  private _geometrySubscribe: Subscription[] = [];

	ngOnDestroy(): void {
    this._materialSubscribe = this.unSubscription(this._materialSubscribe);
    this._geometrySubscribe = this.unSubscription(this._geometrySubscribe);
		super.ngOnDestroy();
	}

  private clips: THREE.AnimationClip[] = null;
  private clipMesh: THREE.Object3D = null;
  public helper: THREE.Object3D = null;

  getGeometry(): THREE.BufferGeometry {
    if (this.object3d !== null && this.object3d instanceof THREE.Mesh) {
      return this.object3d.geometry;
    } else if (this.geometry !== null) {
      return this.geometry.getGeometry();
    } else if (this.geometryList !== null && this.geometryList.length > 0) {
      return this.geometryList.first.getGeometry();
    } else {
      return null;
    }
  }

  private getMaterials(
    parameters?: THREE.MeshBasicMaterialParameters
  ): THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.material !== null && this.material !== undefined) {
      if (this.material.materialType === 'material') {
        materials.push(this.material.getMaterial());
      }
    } 
    if (this.materialList !== null && this.materialList.length > 0) {
      this.materialList.forEach((material) => {
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
          'lights',
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
    this.meshList.changes.subscribe((e) => {
      this.synkObject3D(['meshes']);
    });
    this.cameraList.changes.subscribe((e) => {
      this.synkObject3D(['cameras']);
    });
    this.helperList.changes.subscribe((e) => {
      this.synkObject3D(['helpers']);
    });
    this.lightList.changes.subscribe((e) => {
      this.synkObject3D(['lights']);
    });
    this.rigidbodyList.changes.subscribe((e) => {
      this.synkObject3D(['rigidbody']);
    });
    this.svgList.changes.subscribe((e) => {
      this.synkObject3D(['svg']);
    });
    this.listnerList.changes.subscribe(() => {
      this.synkObject3D(['listner']);
    });
    this.audioList.changes.subscribe(() => {
      this.synkObject3D(['audio']);
    });
    this.cssChildrenList.changes.subscribe(() => {
      this.synkObject3D(['cssChildren']);
    });
    if (this.geometryList !== null && this.geometryList !== undefined) {
      this.setGeometrySubscribe();
      this.geometryList.changes.subscribe((e) => {
        this.setGeometrySubscribe();
      });
		}
    if (this.materialList !== null && this.materialList !== undefined) {
      this.setMaterialSubscribe();
      this.materialList.changes.subscribe((e) => {
        this.setMaterialSubscribe();
      });
		}
    super.ngAfterContentInit();
  }

  setGeometry(geometry : GeometryComponent) {
    const meshGeometry = (this.mesh instanceof THREE.Group) ? this.mesh.children[0] : this.mesh;
    if (meshGeometry !== null && meshGeometry instanceof THREE.Mesh) {
      const mainGeometry = meshGeometry.geometry;
      const geometryClone = geometry.getGeometry();
      if (mainGeometry !== geometryClone ) {
        mainGeometry.copy(geometryClone);
      }
    }
  }

  setGeometrySubscribe() {
		if (this.geometryList !== null && this.geometryList !== undefined) {
      this._geometrySubscribe = this.unSubscription(this._geometrySubscribe);
      if (this.geometry !== null) {
        this._geometrySubscribe.push(this.geometry.geometrySubscribe().subscribe(() => {
          if (this.geometry.visible) {
            this.setGeometry(this.geometry);
          }
        }));
      }
      this.geometryList.forEach(geometry => {
        this._geometrySubscribe.push(geometry.geometrySubscribe().subscribe(() => {
          if (geometry.visible) {
            this.setGeometry(geometry);
          }
        }));
      });
    }
  }

  setMaterial(material : MaterialComponent, seqn : number) {
    if (this.mesh instanceof THREE.Mesh) {
      const materialClone = material.getMaterial();
      switch (material.materialType.toLowerCase()) {
        case 'customdepth' :
          this.mesh.customDepthMaterial = materialClone;
          break;
        default :
          if (this.mesh.material instanceof Array) {
            if (this.mesh.material.length > seqn && this.mesh.material[seqn] !== materialClone) {
              this.mesh.material[seqn] = materialClone;
              this.mesh.material[seqn].needsUpdate = true;
            }
          } else if (this.mesh.material !== materialClone) {
            this.mesh.material = materialClone;
            this.mesh.material.needsUpdate = true;
          }
          break
      }
    }
  }

  setMaterialSubscribe() {
		if (this.materialList !== null && this.materialList !== undefined) {
      this._materialSubscribe = this.unSubscription(this._materialSubscribe);
      if (this.material !== null) {
        this._materialSubscribe.push(this.material.materialSubscribe().subscribe((e) => {
          this.setMaterial(this.material, 0);
        }));
      }
      this.materialList.forEach((material, idx) => {
        this._materialSubscribe.push(material.materialSubscribe().subscribe(() => {
          this.setMaterial(material, idx);
        }));
      });
    }
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
    super.setVisible(visible);
    if (
      this.helper !== null &&
      helperVisible !== null &&
      helperVisible !== undefined
    ) {
      this.helper.visible = helperVisible;
      this.helperList.forEach(helper => {
        helper.setVisible(helperVisible);
      })
      this.helperVisible = helperVisible;
    }
  }

  synkObject3D(synkTypes: string[]) {
    if (this.mesh !== null) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'meshes':
            this.meshList.forEach((mesh) => {
              mesh.setParent(this.mesh);
            });
            break;
          case 'cameras':
            this.cameraList.forEach((camera) => {
              camera.setParent(this.mesh);
            });
            break;
          case 'helpers':
            this.helperList.forEach((helper) => {
              helper.setParent(this.mesh);
            });
            break;
          case 'lights':
            this.lightList.forEach((light) => {
              light.setParent(this.mesh);
            });
            break;
          case 'rigidbody':
            this.rigidbodyList.forEach((rigidbody) => {
              rigidbody.setParent(this.mesh);
            });
            break;
          case 'svg':
            this.svgList.forEach((svg) => {
              svg.setParent(this.mesh);
            });
            break;
          case 'mixer':
            if (this.clips !== null && this.clips !== undefined) {
              if (this.clipMesh !== null && this.clipMesh !== undefined) {
                this.mixerList.forEach((mixer) => {
                  mixer.setModel(this.clipMesh, this.clips);
                });
              } else {
                this.mixerList.forEach((mixer) => {
                  mixer.setModel(this.mesh, this.clips);
                });
              }
            }
            break;
          case 'listner':
            this.listnerList.forEach((listner) => {
              listner.setParent(this.mesh);
            });
            break;
          case 'audio':
            this.audioList.forEach((audio) => {
              audio.setParent(this.mesh);
            });
            break;
          case 'cssChildren':
            this.cssChildrenList.forEach((cssChild) => {
              cssChild.setParent(this.mesh);
            });
            break;
          case 'material':
            if (this.material !== null && this.material.visible) {
              this.setMaterial(this.material, 0);
            } else {
              this.materialList.forEach((material, idx) => {
                if (material.visible) {
                  this.setMaterial(material, idx);
                }
              });
            }
            break;
          case 'geometry':
            const meshGeometry = (this.mesh instanceof THREE.Group) ? this.mesh.children[0] : this.mesh;
            if (meshGeometry !== null && meshGeometry instanceof THREE.Mesh) {
              const mainGeometry = meshGeometry.geometry;
              if (this.geometry !== null && this.geometry.visible) {
                this.setGeometry(this.geometry);
              } else {
                this.geometryList.forEach((geometry) => {
                  if (geometry.visible) {
                    this.setGeometry(geometry);
                  }
                });
              }
            }
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
      if ((this.geometryList != null && this.geometryList.length > 0) || this.geometry !== null) {
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
          const light = new LightComponent();
          light.setLightParams({
            name : this.name,
            visible : this.visible,
            type: this.lightType,
            color: this.color,
            skyColor: this.skyColor,
            groundColor: this.groundColor,
            intensity: this.intensity,
            distance: this.distance,
            angle: this.angle,
            penumbra: this.penumbra,
            decay: this.decay,
            width: this.width,
            height: this.height,
            castShadow: this.castShadow,
            shadowCameraNear: this.shadowCameraNear,
            shadowMapSizeWidth: this.shadowMapSizeWidth,
            shadowMapSizeHeight: this.shadowMapSizeHeight,
            shadowCameraFar: this.shadowCameraFar,
            shadowCameraFov: this.shadowCameraFov,
            shadowCameraLeft: this.shadowCameraLeft,
            shadowCameraRight: this.shadowCameraRight,
            shadowCameraTop: this.shadowCameraTop,
            shadowCameraBottom: this.shadowCameraBottom,
            target: this.target
          });
          object3d = light.getLight();
          break;
        case 'lensflare':
          const lensflare = new Lensflare();
          this.lensflareElementList.forEach((lensflareElement) => {
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
                  this.mesh.add(loadedMesh);
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
                    this.mesh.add(loadedMesh);
                    if (geometry['animations'] !== null) {
                      clips = geometry['animations'];
                    }
                  } else {
                    loadedMesh = new THREE.Mesh(
                      geometry,
                      this.getMaterials()[0]
                    );
                    this.mesh.add(loadedMesh);
                  }
                }
                if (ThreeUtil.isNotNull(this.materialList) && this.materialList.length > 0) {
                  const loadedMeshed : THREE.Object3D[] = (loadedMesh instanceof THREE.Group) ? loadedMesh.children : [ loadedMesh ];
                  const materials = this.getMaterials();
                  materials.forEach((material, idx) => {
                    if (loadedMeshed.length > idx && loadedMeshed[idx] instanceof THREE.Mesh) {
                      const childMesh = loadedMeshed[idx] as THREE.Mesh;
                      childMesh.material = material;
                    }
                  })
                }

                if (this.meshList) {
                  this.meshList.forEach((mesh) => {
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
      if (this.meshList && this.meshList.length > 0) {
        this.meshList.forEach((mesh) => {
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
          if (this.usePlaneStencil && mesh.material instanceof THREE.Material) {
            const clippingMaterial = mesh.material;
            const clippingPlanes = clippingMaterial.clippingPlanes as THREE.Plane[];
            if (clippingPlanes !== null && clippingPlanes.length > 0) {
              const planeGeom = new THREE.PlaneGeometry( 4, 4 );
              const poGroup = new THREE.Group();
              const object = new THREE.Group();
              const meshStandardMaterialParameters = {
                type : 'MeshStandard',
                color: this.getColor(0x0000ff),
                metalness: this.getMetalness(0.1),
                roughness: this.getRoughness(0.75),
                clippingPlanes: [],
                stencilWrite: true,
                stencilRef: 0,
                stencilFunc: 'notequal',
                stencilFail: 'replace',
                stencilZFail: 'replace',
                stencilZPass: 'replace',
              }
              if (clippingMaterial['color'] !== undefined) {
                meshStandardMaterialParameters.color = this.getColor(clippingMaterial['color'])
              }
              if (clippingMaterial['metalness'] !== undefined) {
                meshStandardMaterialParameters.metalness = this.getMetalness(clippingMaterial['metalness'])
              }
              if (clippingMaterial['roughness'] !== undefined) {
                meshStandardMaterialParameters.roughness = this.getRoughness(clippingMaterial['roughness'])
              }
              clippingPlanes.forEach((plane, idx) => {
                const group =this.createPlaneStencilGroup(mesh.geometry, plane, idx + 1);
                object.add(group);
                const materialComponent = new MaterialComponent(null);
                materialComponent.setMaterialParams(Object.assign(meshStandardMaterialParameters, {
                  clippingPlanes: clippingPlanes.filter( p => p !== plane )
                }));
                const planeMat = materialComponent.getMaterial();
                const po = new THREE.Mesh( planeGeom, planeMat );
                po.onBeforeRender = () => {
                  plane.coplanarPoint( po.position );
                  const position = po.position;
                  po.lookAt(
                    position.x - plane.normal.x,
                    position.y - plane.normal.y,
                    position.z - plane.normal.z,
                  );
                }
                po.onAfterRender = ( renderer ) => {
                  renderer.clearStencil();
                };
                po.renderOrder = idx + 1.1;
                poGroup.add(po);
              });
              if (poGroup.children.length > 0) {
                mesh.add(poGroup);
                mesh.add(object);
              }
            }
          }
        }
      }
      if (this.renderOrder !== null) {
        this.object3d.renderOrder = this.renderOrder;
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

  private createPlaneStencilGroup( geometry : THREE.BufferGeometry, plane : THREE.Plane, renderOrder : number ): THREE.Group {
    const group = new THREE.Group();
    const baseMat = new THREE.MeshBasicMaterial();
    baseMat.depthWrite = false;
    baseMat.depthTest = false;
    baseMat.colorWrite = false;
    baseMat.stencilWrite = true;
    baseMat.stencilFunc = THREE.AlwaysStencilFunc;
    const mat0 = baseMat.clone();
    mat0.side = THREE.BackSide;
    mat0.clippingPlanes = [ plane ];
    mat0.stencilFail = THREE.IncrementWrapStencilOp;
    mat0.stencilZFail = THREE.IncrementWrapStencilOp;
    mat0.stencilZPass = THREE.IncrementWrapStencilOp;
    const mesh0 = new THREE.Mesh( geometry, mat0 );
    mesh0.renderOrder = renderOrder;
    group.add( mesh0 );
    const mat1 = baseMat.clone();
    mat1.side = THREE.FrontSide;
    mat1.clippingPlanes = [ plane ];
    mat1.stencilFail = THREE.DecrementWrapStencilOp;
    mat1.stencilZFail = THREE.DecrementWrapStencilOp;
    mat1.stencilZPass = THREE.DecrementWrapStencilOp;
    const mesh1 = new THREE.Mesh( geometry, mat1 );
    mesh1.renderOrder = renderOrder;
    group.add( mesh1 );
    return group;
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
          type: this.helperType,
          color: this.color,
          target: this.target,
          size: this.size,
          radius: this.radius,
          radials: this.radials,
          circles: this.circles,
          divisions: this.divisions,
          color1: this.color1,
          color2: this.color2,
          opacity: this.helperOpacity,
          dirX: this.dirX,
          dirY: this.dirY,
          dirZ: this.dirZ,
          originX: this.originX,
          originY: this.originY,
          originZ: this.originZ,
          length: this.length,
          headLength: this.headLength,
          headWidth: this.headWidth,
          parent : this.mesh
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
