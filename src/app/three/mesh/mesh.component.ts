import {
  Component,
  ContentChildren,
  EventEmitter, Input,
  OnInit, Output,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import { MorphAnimMesh } from 'three/examples/jsm/misc/MorphAnimMesh';
import { Volume } from 'three/examples/jsm/misc/Volume';
import {
  Lensflare,
  LensflareElement
} from 'three/examples/jsm/objects/Lensflare';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { Refractor } from 'three/examples/jsm/objects/Refractor';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';
import { Flow, InstancedFlow } from "three/examples/jsm/modifiers/CurveModifier";
import { Water } from 'three/examples/jsm/objects/Water';
import { Water as Water2} from 'three/examples/jsm/objects/Water2';

import { Sky } from 'three/examples/jsm/objects/Sky';

import { GeometryComponent } from '../geometry/geometry.component';
import { HtmlComponent } from '../html/html.component';
import { CssStyle, InterfaceMeshComponent, ThreeUtil } from '../interface';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { SvgComponent } from '../svg/svg.component';
import { TextureComponent } from '../texture/texture.component';
import { AudioComponent } from './../audio/audio.component';
import { CameraComponent } from './../camera/camera.component';
import { HelperComponent } from './../helper/helper.component';
import { LightComponent } from './../light/light.component';
import { ListenerComponent } from './../listener/listener.component';
import { LocalStorageService } from './../local-storage.service';
import { MixerComponent } from './../mixer/mixer.component';
import { RigidbodyComponent } from './../rigidbody/rigidbody.component';
import { CurveComponent } from '../curve/curve.component';

@Component({
  selector: 'three-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
})
export class MeshComponent
  extends AbstractObject3dComponent
  implements OnInit, InterfaceMeshComponent {
  @Input() public type: string = 'mesh';
  @Input() private lightType: string = 'spot';
  @Input() private cssStyle: string | CssStyle = null;
  @Input() private skyboxType: string = 'auto';
  @Input() private skyboxRate: number = 100;
  @Input() private skyboxImage: string = null;
  @Input() private skyboxCubeImage: string[] = null;
  @Input() private skyboxSunImage: string = null;
  @Input() private skyboxSunX: number = 0;
  @Input() private skyboxSunY: number = 0;
  @Input() private skyboxSunZ: number = 0;
  @Input() private helperType: string = 'none';
  @Input() private scaleStep: number = 1;
  @Input() private castShadow: boolean = true;
  @Input() private renderOrder: number = null;
  @Input() private usePlaneStencil: boolean = false;
  @Input() private receiveShadow: boolean = false;
  @Input() private useCustomDistanceMaterial: boolean = false;
  @Input() private storageName: string = null;
  @Input() private storageOption: any = null;
  @Input() private color: string | number = null;
  @Input() private textureWidth: number = null;
  @Input() private textureHeight: number = null;
  @Input() private clipBias: number = null;
  @Input() private sunColor: string | number = null;
  @Input() private sunDirection: number[] | THREE.Vector3 = null;
  @Input() private sunPosition: number[] | THREE.Vector3 = null;
  @Input() private uniforms:{ [uniform: string]: ({ type : string, value : any, options? : any } | THREE.IUniform) } = null;
  @Input() private distortionScale: number = null;
  @Input() private alpha: number = null;
  
  @Input() private skyColor: string | number = null;
  @Input() private groundColor: string | number = null;
  @Input() private waterColor: string | number = null;
  @Input() private intensity: number = null;
  @Input() private distance: number = null;
  @Input() private metalness: number = null;
  @Input() private roughness: number = null;
  @Input() private angle: number = null;
  @Input() private penumbra: number = null;
  @Input() private decay: number = null;
  @Input() private width: number = null;
  @Input() private height: number = null;
  @Input() private count: number = null;
  @Input() private volume: Volume = null;
  @Input() private axis: string = null;
  @Input() private index: number = null;
  @Input() private shadowBias: number = null;
  @Input() private shadowFocus: number = null;
  @Input() private shadowCameraNear: number = null;
  @Input() private shadowMapSizeWidth: number = null;
  @Input() private shadowMapSizeHeight: number = null;
  @Input() private shadowCameraFar: number = null;
  @Input() private shadowCameraFov: number = null;
  @Input() private shadowCameraLeft: number = null;
  @Input() private shadowCameraRight: number = null;
  @Input() private shadowCameraTop: number = null;
  @Input() private shadowCameraBottom: number = null;
  @Input() private target: any = null;
  @Input() private size: number = null;
  @Input() private helperVisible: boolean = null;
  @Input() private radius: number = null;
  @Input() private radials: number = null;
  @Input() private circles: number = null;
  @Input() private divisions: number = null;
  @Input() private color1: string | number = null;
  @Input() private color2: string | number = null;
  @Input() private helperOpacity: number = null;
  @Input() private dirX: number = null;
  @Input() private dirY: number = null;
  @Input() private dirZ: number = null;
  @Input() private originX: number = null;
  @Input() private originY: number = null;
  @Input() private originZ: number = null;
  @Input() private length: number = null;
  @Input() private headLength: number = null;
  @Input() private headWidth: number = null;
  @Input() private usage: string = null;
  @Input() private enableUvs: boolean = null;
  @Input() private enableColors: boolean = null;
  @Input() private resolution: number = null;
  @Input() private isolation:number = null;
  @Input() private flowDirectionX:number = null;
  @Input() private flowDirectionY:number = null;
  @Input() private flowSpeed:number = null;
  @Input() private reflectivity:number = null;
  @Input() private waterScale:number = null;
  @Input() private flowMap : string | THREE.Texture | TextureComponent = null;
  @Input() private normalMap0 : string | THREE.Texture | TextureComponent = null;
  @Input() private normalMap1 : string | THREE.Texture | TextureComponent = null;
  @Input() private planeInfos: { type : string, strength: number, subtract: number }[] = null;
  @Input() private blobInfos: { x : number, y : number, z : number, strength: number, subtract: number, colors? : any }[] = null;
  @Input() private makeMatrix: (mat: THREE.Matrix4) => void = null;
  @Input() private geometry: GeometryComponent | MeshComponent | THREE.BufferGeometry = null;
  @Input() private material: MaterialComponent | THREE.Material = null;
  @Input() private texture: TextureComponent | THREE.Texture = null;
  @Input() private curve: CurveComponent | THREE.Curve<THREE.Vector3> = null;
  @Input() private morphTargets:boolean = null;
  @Input() private centerX: number = null;
  @Input() private centerY: number = null;
  @Input() private shader: string = null;
  @Input() private encoding:string = null;
  @Input() private shareParts: MeshComponent = null;
  @Input() private sharedMesh: MeshComponent = null;
  
  @Output() private onLoad: EventEmitter<MeshComponent> = new EventEmitter<MeshComponent>();
  @Output() private onDestory: EventEmitter<MeshComponent> = new EventEmitter<MeshComponent>();
  @ContentChildren(GeometryComponent, { descendants: false }) private geometryList: QueryList<GeometryComponent>;
  @ContentChildren(MaterialComponent, { descendants: false }) private materialList: QueryList<MaterialComponent>;
  @ContentChildren(TextureComponent, { descendants: false }) private textureList: QueryList<TextureComponent>;
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
  @ContentChildren(CurveComponent, { descendants: false }) private curveList: QueryList<CurveComponent>;

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

  private getAxis(def?: string): string {
    return ThreeUtil.getTypeSafe(this.axis, def);
  }

  private getIndex(baseSize : number , def: number): number {
    const index = ThreeUtil.getTypeSafe(this.index, def);
    return Math.floor(baseSize * index);
  }

  private getColor(def?: string | number | THREE.Color): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, this.waterColor, def);
  }

  private getTextureWidth(def?: number ): number {
    return ThreeUtil.getTypeSafe(this.textureWidth, def);
  }

  private gettextureHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.textureHeight, def);
  }

  private getClipBias(def?: number): number {
    return ThreeUtil.getTypeSafe(this.clipBias, def);
  }

  private getSunColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.sunColor, def);
  }

  private getSunPosition(def?: THREE.Vector3): THREE.Vector3 {
    if (ThreeUtil.isNotNull(this.sunPosition)) {
      return ThreeUtil.getVector3VSafe(this.sunPosition, def);
    } else {
      return ThreeUtil.getVector3VSafe(this.sunDirection, def);
    }
  }
  
  private getUndateUniforms(orgUniforms?: { [uniform: string]: THREE.IUniform }): void {
    const uniforms = ThreeUtil.getTypeSafe(this.uniforms, {});
    Object.entries(uniforms).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(orgUniforms[key])) {
        const uniformsValue = orgUniforms[key];
        if (ThreeUtil.isNotNull(value['type']) && ThreeUtil.isNotNull(value['value'])) {
          switch(value['type'].toLowerCase()) {
            case 'vector2' :
            case 'v2' :
              uniformsValue.value = ThreeUtil.getVector2Safe( value['value'][0] , value['value'][1]);
              break;
            case 'vector3' :
            case 'vector' :
            case 'v3' :
              uniformsValue.value = ThreeUtil.getVector3Safe( value['value'][0] , value['value'][1], value['value'][2]);
              break;
            case 'color' :
              uniformsValue.value = ThreeUtil.getColorSafe( value['value'] , 0xffffff);
              break;
            case 'texture' :
              const texture = TextureComponent.getTextureImage( value['value'] );
              if (ThreeUtil.isNotNull(value['options'])) {
                switch(value['options']) {
                  case 'wrapRepeat' :
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    break;
                }
              }
              uniformsValue.value = texture;
              break;
            case 'number' :
              uniformsValue.value = parseFloat(value['value']);
              break;
          }
        } else {
          orgUniforms.value = value;
        }
      }
    })
  }

  private getSunDirection(def?: THREE.Vector3): THREE.Vector3 {
    let sunDirection : THREE.Vector3 = null;
    if (ThreeUtil.isNotNull(this.sunDirection)) {
      sunDirection = ThreeUtil.getVector3VSafe(this.sunDirection, def);
    } else {
      sunDirection = ThreeUtil.getVector3VSafe(this.sunPosition, def);
    }
    if (ThreeUtil.isNotNull(sunDirection)) {
      return sunDirection.normalize();
    } else {
      return undefined;
    }
  }

  private getAlpha(def?: number): number {
    return ThreeUtil.getTypeSafe(this.alpha, def);
  }

  private getDistortionScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.distortionScale, def);
  }

  private getSkyColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.skyColor, def);
  }

  private getGroundColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.groundColor, def);
  }

  private getWaterColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.waterColor, def);
  }

  private getHelperVisible(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.helperVisible, def);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getDivisions(def?: number): number {
    return ThreeUtil.getTypeSafe(this.divisions, def);
  }

  private getUsage(def?: string): THREE.Usage {
    const usage = ThreeUtil.getTypeSafe(this.usage, def, '');
    switch (usage.toLowerCase()) {
      case 'staticdraw':
        return THREE.StaticDrawUsage;
      case 'dynamicdraw':
        return THREE.DynamicDrawUsage;
      case 'streamdraw':
        return THREE.StreamDrawUsage;
      case 'staticread':
        return THREE.StaticReadUsage;
      case 'dynamicread':
        return THREE.DynamicReadUsage;
      case 'streamread':
        return THREE.StreamReadUsage;
      case 'staticcopy':
        return THREE.StaticCopyUsage;
      case 'dynamiccopy':
        return THREE.DynamicCopyUsage;
      case 'streamcopy':
        return THREE.StreamCopyUsage;
    }
  }

  private getEnableColors(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.enableColors, def);
  }

  private getEnableUvs(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.enableUvs, def);
  }

  private getResolution(def?: number): number {
    return ThreeUtil.getTypeSafe(this.resolution, def);
  }

  private getIsolation(def?: number): number {
    return ThreeUtil.getTypeSafe(this.isolation, def);
  }

  private getFlowDirection(def?: THREE.Vector2): THREE.Vector2 {
    return ThreeUtil.getVector2Safe(this.flowDirectionX, this.flowDirectionY, def);
  }

  private getFlowSpeed(def?: number): number {
    return ThreeUtil.getTypeSafe(this.flowSpeed, def);
  }

  private getReflectivity(def?: number): number {
    return ThreeUtil.getTypeSafe(this.reflectivity, def);
  }

  private getWaterScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.waterScale, def);
  }

  private getShader(def?: string) {
    const shader = ThreeUtil.getTypeSafe(this.shader, def, '');
    switch(shader.toLowerCase()) {
      case 'waterrefractionshader' :
      case 'waterrefraction' :
        return WaterRefractionShader;
      default:
        break;
    }
    return undefined;
  }

  private getEncoding(def?: string): THREE.TextureEncoding {
    const encoding = ThreeUtil.getTypeSafe(this.encoding, def, '');
    switch (encoding.toLowerCase()) {
      case 'srgb':
        return THREE.sRGBEncoding;
      case 'gamma':
        return THREE.GammaEncoding;
      case 'rgbe':
        return THREE.RGBEEncoding;
      case 'logluv':
        return THREE.LogLuvEncoding;
      case 'rgbm7':
        return THREE.RGBM7Encoding;
      case 'rgbm16':
        return THREE.RGBM16Encoding;
      case 'rgbd':
        return THREE.RGBDEncoding;
      case 'linear':
        return THREE.LinearEncoding;
      default:
        break;
    }
    return undefined;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      Object.entries(changes).forEach(([key, value]) => {
        switch (key) {
          case 'helperVisible':
          case 'visible':
            break;
          default:
            if (this.mesh !== null) {
              this.mesh = null;
            }
            break;
        }
      });
      if (this.helper !== null && changes.helperVisible) {
        this.helper.visible = this.getHelperVisible(true);
      }
      this.resetMesh();
    }
    super.ngOnChanges(changes);
  }

  private _meshSubject: Subject<THREE.Object3D> = new Subject<THREE.Object3D>();

  meshSubscribe(): Observable<THREE.Object3D> {
    return this._meshSubject.asObservable();
  }

  private _materialSubscribe: Subscription[] = [];
  private _geometrySubscribe: Subscription[] = [];
  private _curveSubscribe: Subscription[] = [];
  private _sharedMeshSubscribe: Subscription[] = [];
    

  ngOnDestroy(): void {
    this._materialSubscribe = this.unSubscription(this._materialSubscribe);
    this._geometrySubscribe = this.unSubscription(this._geometrySubscribe);
    super.ngOnDestroy();
    this.onDestory.emit(this);
  }

  private clips: THREE.AnimationClip[] | any = null;
  private clipMesh: THREE.Object3D = null;
  public storageSource : any = null;
  private _referGeometry : any = null;
  private _referMateral : any = null;
  
  public helper: THREE.Object3D = null;
  getStorageSource(): any {
    return this.storageSource;
  }

  getGeometry(): THREE.BufferGeometry {
    if (this.mesh !== null) {
      const mesh = this.getRealMesh();
      if (mesh !== null) {
        return mesh.geometry;
      }
    }
    if (this.geometry !== null) {
      if (this.geometry instanceof THREE.BufferGeometry) {
        return this.geometry;
      } else if (this.geometry instanceof MeshComponent) {
        return this.geometry.getGeometry();
      } else {
        return this.geometry.getGeometry();
      }
    }
    if (this.geometryList !== null && this.geometryList.length > 0) {
      return this.geometryList.first.getGeometry();
    }
    return new THREE.BufferGeometry();
  }

  getCurve(): THREE.Curve<THREE.Vector3> {
    if (this.curve !== null) {
      if (this.curve instanceof THREE.Curve) {
        return this.curve;
      } else {
        return this.curve.getCurve() as THREE.Curve<THREE.Vector3>;
      }
    }
    if (this.curveList !== null && this.curveList.length > 0) {
      return this.curveList.first.getCurve() as THREE.Curve<THREE.Vector3>;
    }
    return null;
  }

  getMaterial(): THREE.Material {
    if (this.mesh !== null && this.object3d instanceof THREE.Mesh) {
      const mesh = this.getRealMesh();
      if (mesh !== null) {
        if (mesh.material instanceof THREE.Material) {
          return mesh.material;
        }
      }
    }
    if (this.material !== null) {
      if (this.material instanceof MaterialComponent) {
        return this.material.getMaterial();
      } else if (this.material instanceof THREE.Material) {
        return this.material;
      }
    }
    if (this.materialList !== null && this.materialList.length > 0) {
      return this.materialList.first.getMaterial();
    }
    return null;
  }

  private getMaterials(
    parameters?: THREE.MeshBasicMaterialParameters
  ): THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.material !== null && this.material !== undefined) {
      if (
        this.material instanceof MaterialComponent &&
        this.material.isMaterialType('material')
      ) {
        materials.push(this.material.getMaterial());
      } else if (this.material instanceof THREE.Material) {
        materials.push(this.material);
      }
    }
    if (this.materialList !== null && this.materialList.length > 0) {
      this.materialList.forEach((material) => {
        if (material.isMaterialType('material') && material.visible) {
          materials.push(material.getMaterial());
        }
      });
    }
    if (materials.length == 0) {
      materials.push(new THREE.MeshPhongMaterial(parameters));
    }
    return materials;
  }

  private getCustomDistanceMaterial(): THREE.Material {
    let customDistanceMaterial: THREE.Material = null;
    if (this.material !== null && this.material !== undefined) {
      if (
        this.material instanceof MaterialComponent &&
        this.material.isMaterialType('customdistance')
      ) {
        customDistanceMaterial = this.material.getMaterial();
      }
    }
    if (this.materialList !== null && this.materialList.length > 0) {
      this.materialList.forEach((material) => {
        if (material.isMaterialType('customdistance') && material.visible) {
          customDistanceMaterial = material.getMaterial();
        }
      });
    }
    return customDistanceMaterial;
  }

  

  private getTexture(type : string, alterTexture? : string | THREE.Texture | TextureComponent , defImage?: string): THREE.Texture {
    if (this.texture !== null && this.texture !== undefined) {
      if (
        this.texture instanceof TextureComponent &&
        this.texture.textureType.toLowerCase() === type.toLowerCase()
      ) {
        return this.texture.getTexture();
      } else if (this.texture instanceof THREE.Texture) {
       return this.texture;
      }
    }
    if (this.textureList !== null && this.textureList.length > 0) {
      let foundTexture: THREE.Texture = null
      this.textureList.forEach((texture) => {
        if (texture.textureType.toLowerCase() === type.toLowerCase()) {
          foundTexture = texture.getTexture();
        }
      });
      if (ThreeUtil.isNotNull(foundTexture)) {
        return foundTexture;
      }
    }
    if (ThreeUtil.isNotNull(alterTexture)) {
      if (alterTexture instanceof THREE.Texture) {
        return alterTexture;
      } else if (alterTexture instanceof TextureComponent) {
        return alterTexture.getTexture();
      } else {
        return TextureComponent.getTextureImage(alterTexture);
      }
    }
    if (ThreeUtil.isNotNull(defImage)) {
      return TextureComponent.getTextureImage(defImage);
    }
    return undefined;
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
      this.geometryList.changes.subscribe(() => {
        this.setGeometrySubscribe();
      });
    }
    if (this.materialList !== null && this.materialList !== undefined) {
      this.setMaterialSubscribe();
      this.materialList.changes.subscribe(() => {
        this.setMaterialSubscribe();
      });
    }
    if (this.curveList !== null && this.curveList !== undefined) {
      this.setCurveSubscribe();
      this.curveList.changes.subscribe(() => {
        this.setCurveSubscribe();
      });
    }
    super.ngAfterContentInit();
  }

  setGeometry(geometry: GeometryComponent | THREE.BufferGeometry) {
    if (this.object3d !== null) {
      const meshGeometry = this.getRealMesh();
      if (meshGeometry !== null) {
        const geometryClone =
          geometry instanceof THREE.BufferGeometry
            ? geometry
            : geometry.getGeometry();
        switch(this.type.toLowerCase()) {
          case 'flow' :
          case 'instancedflow' :
            if (this.storageSource === null || this._referGeometry !== geometryClone) {
              this.resetMesh(true);
            }
            return ;
          default :
            break;
        }
        if (meshGeometry.geometry !== geometryClone) {
          meshGeometry.geometry = geometryClone;
          if (!this.matrixAutoUpdate) {
            meshGeometry.updateMatrix();
          }
          this._meshSubject.next(meshGeometry);
          this.onLoad.emit(this);
        }
      } else {
        this.resetMesh(true);
      }
    }
  }
  
  setGeometrySubscribe() {
    if (this.geometryList !== null && this.geometryList !== undefined) {
      this._geometrySubscribe = this.unSubscription(this._geometrySubscribe);
      if (
        this.geometry !== null
      ) {
        if (this.geometry instanceof GeometryComponent) {
          this._geometrySubscribe.push(
            this.geometry.geometrySubscribe().subscribe(() => {
              if (
                this.geometry instanceof GeometryComponent &&
                this.geometry.visible
              ) {
                this.setGeometry(this.geometry);
              }
            })
          );
        } else if (this.geometry instanceof MeshComponent) {
          this.geometry.meshSubscribe().subscribe(() => {
            if (
              this.geometry instanceof MeshComponent &&
              this.geometry.visible
            ) {
              this.setGeometry(this.geometry.getGeometry());
            }
          })
        }
      }
      this.geometryList.forEach((geometry) => {
        this._geometrySubscribe.push(
          geometry.geometrySubscribe().subscribe(() => {
            if (geometry.visible) {
              this.setGeometry(geometry);
            }
          })
        );
      });
    }
  }

  setCurveSubscribe() {
    if (this.curveList !== null && this.curveList !== undefined) {
      this._curveSubscribe = this.unSubscription(this._curveSubscribe);
      if (
        this.curve !== null &&
        this.curve instanceof CurveComponent
      ) {
        this._curveSubscribe.push(
          this.curve.curveSubscribe().subscribe(() => {
            if (
              this.curve instanceof CurveComponent
            ) {
              this.resetMesh(true);
            }
          })
        );
      }
      this.curveList.forEach((curve) => {
        this._curveSubscribe.push(
          curve.curveSubscribe().subscribe(() => {
            this.resetMesh(true);
          })
        );
      });
    }
  }

  setMaterial(material: MaterialComponent, seqn: number) {
    if (this.mesh instanceof THREE.Mesh) {
      const materialClone = material.getMaterial();
      switch(this.type.toLowerCase()) {
        case 'flow' :
        case 'instancedflow' :
          if (this.storageSource === null || this._referMateral !== materialClone) {
            this.resetMesh(true);
          }
          return ;
      }
      switch (material.materialType.toLowerCase()) {
        case 'customdepth':
          this.mesh.customDepthMaterial = materialClone;
          break;
        case 'customdistance':
          this.mesh.customDistanceMaterial = materialClone;
          break;
        default:
          if (this.mesh.material instanceof Array) {
            if (
              this.mesh.material.length > seqn &&
              this.mesh.material[seqn] !== materialClone
            ) {
              this.mesh.material[seqn] = materialClone;
              this.mesh.material[seqn].needsUpdate = true;
            }
          } else if (this.mesh.material !== materialClone) {
            this.mesh.material = materialClone;
            this.mesh.material.needsUpdate = true;
            this.onLoad.emit(this);
          }
          break;
      }
    } else if (this.mesh !== null && this.mesh['material'] !== undefined) {
      this.mesh['material'] = material.getMaterial();
    } else {
      const materialType:string = (this.storageOption?.materialType || 'seqn');
      switch(materialType.toLowerCase()) {
        case 'namelist' :
          const nameList = material.nameList;
          if (nameList !== null && nameList.length > 0) {
            const matOfName = material.getMaterial();
            nameList.forEach(name => {
              const object = this.mesh.getObjectByName( name ) as any;
              if (object !== null && object !== undefined) {
                object.material = matOfName;
              }
            })
          }
          break;        
        default :
          if (this.mesh instanceof THREE.Group) {
            const childMeshes = this.mesh.children;
            if (childMeshes.length > 0) {
              const firstMesh = childMeshes[0];
              if (firstMesh instanceof THREE.Mesh) {
                firstMesh.material = material.getMaterial();
              }
            }
          }
        break;
      }
    }
  }

  setMaterialSubscribe() {
    if (this.materialList !== null && this.materialList !== undefined) {
      this._materialSubscribe = this.unSubscription(this._materialSubscribe);
      if (
        this.material !== null &&
        this.material instanceof MaterialComponent
      ) {
        this._materialSubscribe.push(
          this.material.materialSubscribe().subscribe((e) => {
            if (this.material instanceof MaterialComponent) {
              this.setMaterial(this.material, 0);
            }
          })
        );
      }
      this.materialList.forEach((material, idx) => {
        this._materialSubscribe.push(
          material.materialSubscribe().subscribe(() => {
            this.setMaterial(material, 0);
          })
        );
      });
    }
  }

  setWireFrame(wireframe: boolean, child: THREE.Object3D = null) {
    if (child === null) {
      child = this.object3d;
    }
    if (child instanceof THREE.Mesh) {
      if (
        child.material instanceof THREE.Material &&
        child.material['wireframe'] !== undefined
      ) {
        child.material['wireframe'] = wireframe;
      } else if (child.material instanceof Array) {
        child.material.forEach((material) => {
          if (material['wireframe'] !== undefined) {
            material['wireframe'] = wireframe;
          }
        });
      }
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
      this.helperList.forEach((helper) => {
        helper.setVisible(helperVisible);
      });
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
            if (this.clipMesh !== null) {
              this.helperList.forEach((helper) => {
                helper.setParent(this.clipMesh);
              });
            } else {
              this.helperList.forEach((helper) => {
                helper.setParent(this.mesh);
              });
            }
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
            if (this.material !== null) {
              if (
                this.material instanceof MaterialComponent &&
                this.material.visible
              ) {
                this.setMaterial(this.material, 0);
              }
            } else {
              this.materialList.forEach((material, idx) => {
                if (material.visible) {
                  this.setMaterial(material, idx);
                }
              });
            }
            break;
          case 'geometry':
            const meshGeometry =
              this.mesh instanceof THREE.Group
                ? this.mesh.children[0]
                : this.mesh;
            if (meshGeometry !== null && meshGeometry instanceof THREE.Mesh) {
              if (
                this.geometry !== null &&
                this.geometry instanceof THREE.BufferGeometry
              ) {
                this.setGeometry(this.geometry);
              } else if (
                this.geometry !== null &&
                this.geometry instanceof GeometryComponent &&
                this.geometry.visible
              ) {
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
      if (clearMesh && this.mesh !== null) {
        if (this.mesh.parent) {
          this.mesh.parent.remove(this.mesh);
        }
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
  private mesh: THREE.Object3D = null;

  getRealMesh(): THREE.Mesh | THREE.LineSegments | THREE.Line {
    if (
      this.mesh instanceof THREE.Mesh ||
      this.mesh instanceof THREE.LineSegments ||
      this.mesh instanceof THREE.Line
    ) {
      return this.mesh;
    }
    let mesh: THREE.Object3D = this.mesh;
    while (mesh.children && mesh.children.length > 0) {
      mesh = mesh.children[0];
      if (
        mesh instanceof THREE.Mesh ||
        mesh instanceof THREE.LineSegments ||
        mesh instanceof THREE.Line
      ) {
        return mesh as THREE.Mesh;
      }
    }
    return null;
  }

  getClips() : THREE.AnimationClip[] | any{
    return this.clips;
  }

  getMesh(): THREE.Object3D {
    if (this.mesh === null) {
      if (this.object3d !== null && this.object3d !== undefined && this.object3d.parent !== null) {
        if (this.clipMesh !== null) {
          while(this.clipMesh.children.length > 0) {
            const object = this.clipMesh.children[ 0 ];
            object.parent.remove( object );
          }
          this.clipMesh.parent.remove(this.clipMesh);
        }
        while(this.object3d.children.length > 0) {
          const object = this.object3d.children[ 0 ];
          object.parent.remove( object );
        }
        this.object3d.parent.remove(this.object3d);
        this.object3d = null;
        this.clipMesh = null;
      }
      let geometry: THREE.BufferGeometry = null;
      if (
        (this.geometryList != null && this.geometryList.length > 0) ||
        this.geometry !== null
      ) {
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
        case 'reflector' :
          basemesh = new Reflector(geometry, {
            color: this.getColor(),
            textureWidth: this.getTextureWidth(1024) * window.devicePixelRatio,
            textureHeight: this.gettextureHeight(1024) * window.devicePixelRatio,
            clipBias: this.getClipBias(0.003),
            shader: this.getShader(),
            encoding: this.getEncoding(),
          });
          break;
        case 'refractor' :
          const refractor = new Refractor(geometry, {
            color: this.getColor(),
            textureWidth: this.getTextureWidth(1024) * window.devicePixelRatio,
            textureHeight: this.gettextureHeight(1024) * window.devicePixelRatio,
            clipBias: this.getClipBias(0.003),
            shader: this.getShader(),
            encoding: this.getEncoding(),
          });
          const refractorMaterial = refractor.material as THREE.ShaderMaterial;
          Object.entries(refractorMaterial.uniforms).forEach(([key, value]) => {
              switch(key.toLowerCase()) {
                case 'tdudv' :
                  value.value = this.getTexture('tdudv') || null;
                  break;
              }
          });
          basemesh = refractor;
          break;
        case 'water' :
          const water = new Water(geometry, {
            textureWidth: this.getTextureWidth(1024) * window.devicePixelRatio,
            textureHeight: this.gettextureHeight(1024) * window.devicePixelRatio,
            clipBias: this.getClipBias(0.003),
            alpha: this.getAlpha(),
            time: 0,
            waterNormals: this.getTexture('waterNormals'),
            sunDirection: this.getSunDirection(),
            sunColor: this.getSunColor(),
            waterColor: this.getWaterColor(),
            distortionScale: this.getDistortionScale(),
            fog: false
          });
          this.getUndateUniforms(water.material['uniforms']);
          basemesh = water;
          break;
        case 'water2' :
          const water2 = new Water2(geometry, {
            textureWidth: this.getTextureWidth(1024) * window.devicePixelRatio,
            textureHeight: this.gettextureHeight(1024) * window.devicePixelRatio,
            clipBias: this.getClipBias(0.003),
            color: this.getColor(),
            flowDirection: this.getFlowDirection(),
            flowSpeed: this.getFlowSpeed(),
            reflectivity: this.getReflectivity(),
            scale: this.getWaterScale(),
            shader: this.getShader(),
            flowMap: this.getTexture('flowMap', this.flowMap ),
            normalMap0: this.getTexture('normalMap0', this.normalMap0, 'textures/water/Water_1_M_Normal.jpg'),
            normalMap1: this.getTexture('normalMap1', this.normalMap1, 'textures/water/Water_2_M_Normal.jpg'),
            encoding: this.getEncoding()
          });
          this.getUndateUniforms(water2.material['uniforms']);
          basemesh = water2;
          break;
        case 'sky' :
          const sky = new Sky();
          this.getUndateUniforms(sky.material.uniforms);
          basemesh = sky;
          break;
        case 'flow' :
          const flowMaterial = this.getMaterials()[0];
					const objectToCurve = new THREE.Mesh( geometry, flowMaterial);
          const flow = new Flow( objectToCurve );
          const flowCurve = this.getCurve();
          if (ThreeUtil.isNotNull(flowCurve)) {
            flow.updateCurve( 0, flowCurve);
          }
          this.storageSource = flow;
          this._referGeometry = geometry;
          this._referMateral = flowMaterial;
          basemesh = flow.object3D;
          basemesh.onBeforeRender = () => {
            flow.moveAlongCurve(0.001);
          };
          break;
          case 'instancedflow' :
            const instancedFlowMaterial = this.getMaterials()[0];
            const instancedFlow = new InstancedFlow( this.getCount(1), 1, geometry,  instancedFlowMaterial);
            const instancedFlowCurve = this.getCurve();
            if (ThreeUtil.isNotNull(instancedFlowCurve)) {
              instancedFlow.updateCurve( 0, instancedFlowCurve);
              instancedFlow.setCurve( 0, 0 );
              for ( let i = 0; i < this.getCount(1); i ++ ) {
                instancedFlow.moveIndividualAlongCurve( i, i * 1 / this.getCount(1) );
                instancedFlow.object3D.setColorAt( i, new THREE.Color( 0xffffff * Math.random() ) );
              }
            }

            this.storageSource = instancedFlow;
            this._referGeometry = geometry;
            this._referMateral = instancedFlowMaterial;
            basemesh = instancedFlow.object3D;
            basemesh.onBeforeRender = () => {
              instancedFlow.moveAlongCurve(0.001);
            };
            break;
            
        case 'lineloop' :
          let points = [];
          const lineloopCurve = this.getCurve();
          if (ThreeUtil.isNotNull(lineloopCurve)) {
            points = lineloopCurve.getPoints( this.getDivisions(50));
          }
          const lineLoop = new THREE.LineLoop(
            new THREE.BufferGeometry().setFromPoints( points ),
            this.getMaterials()
          );
          basemesh = lineLoop;
          break;
        case 'light':
          const light = new LightComponent();
          light.setLightParams({
            name: this.name,
            visible: this.visible,
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
            shadowBias: this.shadowBias,
            shadowFocus: this.shadowFocus,
            shadowCameraNear: this.shadowCameraNear,
            shadowMapSizeWidth: this.shadowMapSizeWidth,
            shadowMapSizeHeight: this.shadowMapSizeHeight,
            shadowCameraFar: this.shadowCameraFar,
            shadowCameraFov: this.shadowCameraFov,
            shadowCameraLeft: this.shadowCameraLeft,
            shadowCameraRight: this.shadowCameraRight,
            shadowCameraTop: this.shadowCameraTop,
            shadowCameraBottom: this.shadowCameraBottom,
            target: this.target,
          });
          basemesh = light.getLight();
          break;
        case 'lensflare':
          const lensflare = new Lensflare();
          this.lensflareElementList.forEach((lensflareElement) => {
            lensflareElement.setLensflare(lensflare);
          });
          basemesh = lensflare;
          break;
        case 'volume' :
          if (ThreeUtil.isNotNull(this.volume)) {
            switch(this.getAxis('z').toLowerCase()) {
              case 'x' :
                this.storageSource = this.volume.extractSlice('x', this.getIndex(this.volume['RASDimensions'][ 0 ], 0.5));
                break;
              case 'y' :
                this.storageSource = this.volume.extractSlice('y', this.getIndex(this.volume['RASDimensions'][ 1 ], 0.5));
                break;
              case 'z' :
              default :
                this.storageSource = this.volume.extractSlice('z', this.getIndex(this.volume['RASDimensions'][ 2 ], 0.5));
                break;
            }
            basemesh = this.storageSource.mesh; 
          } else {
            basemesh = new THREE.Group();
          }
          break;
        case 'instanced':
          const instanced = new THREE.InstancedMesh(
            geometry,
            this.getMaterials()[0],
            this.getCount(1)
          );
          if (ThreeUtil.isNotNull(this.usage)) {
            instanced.instanceMatrix.setUsage(this.getUsage('dynamicdraw'));
          }
          if (ThreeUtil.isNotNull(this.makeMatrix)) {
            const matrix = new THREE.Matrix4();
            for (let i = 0; i < instanced.count; i++) {
              this.makeMatrix(matrix);
              instanced.setMatrixAt(i, matrix);
            }
          }
          basemesh = instanced;
          break;
        case 'merged':
          {
            const geometries = [];
            const count = this.getCount(1);
            for (let i = 0; i < count; i++) {
              const instanceGeometry = geometry.clone();
              if (ThreeUtil.isNotNull(this.makeMatrix)) {
                const matrix = new THREE.Matrix4();
                this.makeMatrix(matrix);
                instanceGeometry.applyMatrix4(matrix);
              }
              geometries.push(instanceGeometry);
            }
            const materials = this.getMaterials()[0];
            const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(
              geometries
            );
            basemesh = new THREE.Mesh(mergedGeometry, materials);
          }
          break;
        case 'naive':
          {
            basemesh = new THREE.Group();
            const matrix = new THREE.Matrix4();
            const material = this.getMaterials()[0];
            const count = this.getCount(1);
            for (let i = 0; i < count; i++) {
              if (ThreeUtil.isNotNull(this.makeMatrix)) {
                this.makeMatrix(matrix);
              }
              const mesh = new THREE.Mesh(geometry, material);
              mesh.applyMatrix4(matrix);
              basemesh.add(mesh);
            }
          }
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
          const sprite = new THREE.Sprite(
            this.getMaterials()[0] as THREE.SpriteMaterial
          );
          if (ThreeUtil.isNotNull(this.centerX) && ThreeUtil.isNotNull(this.centerY)) {
            sprite.center.copy(ThreeUtil.getVector2Safe(this.centerX, this.centerY, new THREE.Vector2()));
          }
          basemesh = sprite;
          break;
        case 'wireframe':
          basemesh = new Wireframe(
            geometry as LineSegmentsGeometry,
            this.getMaterials()[0] as LineMaterial
          );
          break;
        case 'lod' :
          basemesh = new THREE.LOD();
          break;
        case 'marchingcubes' :
          const effect = new MarchingCubes( this.getResolution(28), this.getMaterials()[0] , this.getEnableUvs(false), this.getEnableColors(false));
          if (ThreeUtil.isNotNull(this.isolation)) {
            effect.isolation = this.getIsolation(80.0);
          }
          if (ThreeUtil.isNotNull(this.blobInfos) && this.blobInfos.length > 0) {
            this.blobInfos.forEach(blobInfo => {
              effect.addBall( blobInfo.x, blobInfo.y, blobInfo.z, blobInfo.strength, blobInfo.subtract, ThreeUtil.getColorSafe(blobInfo.colors));
            });
          }
          if (ThreeUtil.isNotNull(this.planeInfos) && this.planeInfos.length > 0) {
            this.planeInfos.forEach(plane => {
              switch(plane.type.toLowerCase()) {
                case 'x' :
                  effect.addPlaneX( plane.strength, plane.subtract );
                  break;
                case 'y' :
                  effect.addPlaneY( plane.strength, plane.subtract );
                  break;
                case 'z' :
                  effect.addPlaneZ( plane.strength, plane.subtract );
                  break;
              }
            })
          }
          // effect.reset();
          // effect.addBall(ballx: number, bally: number, ballz: number, strength: number, subtract: number, colors: any);
          basemesh = effect;
          break;
        case 'points':
          basemesh = new THREE.Points(geometry, this.getMaterials()[0]);
          break;
        case 'line':
          const line = new THREE.Line(geometry, this.getMaterials()[0]);
          line.computeLineDistances();
          line.castShadow = this.castShadow;
          basemesh = line;
          break;
        case 'line2':
          const lineMaterial = this.getMaterials()[0];
          if (
            geometry instanceof LineGeometry &&
            lineMaterial instanceof LineMaterial
          ) {
            const line2 = new Line2(geometry, lineMaterial);
            line2.computeLineDistances();
            line2.scale.set(1, 1, 1);
            basemesh = line2;
          }
          break;
        case 'linesegments':
          const lineSegments = new THREE.LineSegments(
            geometry,
            this.getMaterials()[0]
          );
          lineSegments.computeLineDistances();
          lineSegments.castShadow = this.castShadow;
          basemesh = lineSegments;
          break;
        case 'md2charactercomplex' :
          basemesh = new THREE.Group();
          if (this.shareParts != null) {
            const loadShareParts = () => {
              const shareParts = this.shareParts.getClips();
              if (shareParts instanceof MD2CharacterComplex) {
                const character = new MD2CharacterComplex();
                character.shareParts( shareParts );
                if (this.receiveShadow) {
                  character.enableShadows( this.receiveShadow );
                }
                basemesh.children.forEach(child => {
                  child.parent.remove(child);
                });
                basemesh.add(character.root);
                this.clipMesh = character.root;
                this.clips = character;
                this.resetHelper();
                this.synkObject3D(['mixer', 'material', 'helpers']);
                this._meshSubject.next(character.root);
                this.onLoad.emit(this);
              }
            }
            this.shareParts.meshSubscribe().subscribe(() => {
              loadShareParts();
            }); 
            this.shareParts.getMesh();
            loadShareParts();
          }
          break;
        case 'mesh':
        default:
          if (ThreeUtil.isNotNull(this.storageName)) {
            basemesh = new THREE.Group();
            basemesh.updateMatrixWorld(true);
            this.localStorageService.getObject(
              this.storageName,
              (
                loadedMesh: THREE.Object3D,
                clips?: THREE.AnimationClip[] | any,
                geometry?: THREE.BufferGeometry,
                morphTargets? : THREE.BufferAttribute[],
                source? : any 
              ) => {
                let assignMaterial = true;
                if (ThreeUtil.isNotNull(loadedMesh)) {
                  this.mesh.add(loadedMesh);
                } else if (ThreeUtil.isNotNull(geometry )) {
                  geometry.computeVertexNormals();
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
                } else if (ThreeUtil.isNotNull(morphTargets)) {
                  const baseGeometry = this.getGeometry();
                  baseGeometry.morphAttributes.position = morphTargets;
                  loadedMesh = new THREE.Mesh( baseGeometry, this.getMaterials()[0]);
                  this.mesh.add(loadedMesh);
                  assignMaterial = false;
                }
                if (this.castShadow && loadedMesh) {
                  loadedMesh.traverse((object) => {
                    if (object instanceof THREE.Mesh) {
                      object.castShadow = this.castShadow;
                      object.receiveShadow = this.receiveShadow;
                    }
                  });
                }
                if (ThreeUtil.isNotNull(this.morphTargets) && loadedMesh instanceof THREE.Mesh) {
                  if (loadedMesh.material instanceof THREE.Material) {
                    loadedMesh.material['morphTargets'] = this.morphTargets;
                  }
                }
                if (
                  assignMaterial &&
                  ThreeUtil.isNotNull(this.materialList) &&
                  this.materialList.length > 0
                ) {
                  const materialType:string = (this.storageOption?.materialType || 'seqn');
                  switch(materialType.toLowerCase()) {
                    case 'namelist' :
                      this.materialList.forEach(material => {
                        const nameList = material.nameList;
                        if (nameList !== null && nameList.length > 0) {
                          const matOfName = material.getMaterial();
                          nameList.forEach(name => {
                            const object = loadedMesh.getObjectByName( name ) as any;
                            if (object !== null && object !== undefined) {
                              object.material = matOfName;
                            }
                          })
                        }
                      });
                      break;
                    case 'map' :
                      const texture = this.getMaterials()[0]['map'];
                      loadedMesh.traverse( child  => {
                        if ( child['isMesh']) child['material'].map = texture;
                      });
                      break;
                    default :
                      const loadedMeshed: THREE.Object3D[] = loadedMesh instanceof THREE.Group ? loadedMesh.children : [loadedMesh];
                      const materials = this.getMaterials();
                      materials.forEach((material, idx) => {
                        if (
                          loadedMeshed.length > idx &&
                          loadedMeshed[idx] instanceof THREE.Mesh
                        ) {
                          const childMesh = loadedMeshed[idx] as THREE.Mesh;
                          childMesh.material = material;
                        }
                      });
                      break;
                  }
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
                this.storageSource = source;
                this.resetHelper();
                this.synkObject3D(['mixer', 'helpers']);
                this._meshSubject.next(loadedMesh);
                this.onLoad.emit(this);
                if (this.debug) {
                  this.showDebug(this.mesh);
                }
              },
              this.storageOption
            );
          } else if (ThreeUtil.isNotNull(this.sharedMesh)) {
            this.unSubscription(this._sharedMeshSubscribe);
            basemesh = new THREE.Group();
            const mesh = this.sharedMesh.getMesh();
            const clips = this.sharedMesh.clips;
            if (ThreeUtil.isNotNull(clips)) {
              if (Array.isArray(clips)) {
                this.clips = [];
                clips.forEach(clip => {
                  this.clips.push(clip.clone());
                });
              } else {
                this.clips = clips;
              }
            } else {
              this.clips = null;
            }
            const clipMesh = this.sharedMesh.clipMesh;
            this.clipMesh = clipMesh !== null ? clipMesh.clone(true) : null;
            if (this.clipMesh === null && !(mesh instanceof THREE.Group)) {
              this.clipMesh = mesh.clone(true);
            }
            if (this.clipMesh !== null) {
              this.storageSource = this.sharedMesh.storageSource;
              basemesh.add(this.clipMesh);
              if (ThreeUtil.isNotNull(this.clipMesh['material'])) {
                this.clipMesh['material'] = this.clipMesh['material'].clone();
              }
            } else {
              this.clipMesh = null;
              this.storageSource = null;
            }
            this._sharedMeshSubscribe.push(
              this.sharedMesh.meshSubscribe().subscribe(() => {
                this.resetMesh(true);
              })
            )
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
      this.mesh = basemesh;
      if (this.meshList && this.meshList.length > 0) {
        this.meshList.forEach((mesh) => {
          mesh.setParent(basemesh);
        });
      }
      this.setObject3D(this.mesh);
      if (this.useCustomDistanceMaterial) {
        this.mesh.customDistanceMaterial = this.getCustomDistanceMaterial();
      }
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
        if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Points) {
          if (this.geometry instanceof MeshComponent) {
            const realMesh = this.geometry.getRealMesh();
            if (realMesh !== null && realMesh instanceof THREE.Mesh) {
              mesh.morphTargetInfluences = realMesh.morphTargetInfluences;
              mesh.morphTargetDictionary = realMesh.morphTargetDictionary;
            }
          }
        }
        if (this.object3d instanceof THREE.Mesh) {
          mesh.castShadow = this.castShadow;
          mesh.receiveShadow = this.receiveShadow;
          if (this.usePlaneStencil && mesh.material instanceof THREE.Material) {
            const clippingMaterial = mesh.material;
            const clippingPlanes = clippingMaterial.clippingPlanes as THREE.Plane[];
            if (clippingPlanes !== null && clippingPlanes.length > 0) {
              const planeGeom = new THREE.PlaneGeometry(4, 4);
              const poGroup = new THREE.Group();
              const object = new THREE.Group();
              const meshStandardMaterialParameters = {
                type: 'MeshStandard',
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
              };
              if (clippingMaterial['color'] !== undefined) {
                meshStandardMaterialParameters.color = this.getColor(
                  clippingMaterial['color']
                );
              }
              if (clippingMaterial['metalness'] !== undefined) {
                meshStandardMaterialParameters.metalness = this.getMetalness(
                  clippingMaterial['metalness']
                );
              }
              if (clippingMaterial['roughness'] !== undefined) {
                meshStandardMaterialParameters.roughness = this.getRoughness(
                  clippingMaterial['roughness']
                );
              }
              clippingPlanes.forEach((plane, idx) => {
                const group = this.createPlaneStencilGroup(
                  mesh.geometry,
                  plane,
                  idx + 1
                );
                object.add(group);
                const materialComponent = new MaterialComponent(null);
                materialComponent.setMaterialParams(
                  Object.assign(meshStandardMaterialParameters, {
                    clippingPlanes: clippingPlanes.filter((p) => p !== plane),
                  })
                );
                const planeMat = materialComponent.getMaterial();
                const po = new THREE.Mesh(planeGeom, planeMat);
                po.onBeforeRender = () => {
                  plane.coplanarPoint(po.position);
                  const position = po.position;
                  po.lookAt(
                    position.x - plane.normal.x,
                    position.y - plane.normal.y,
                    position.z - plane.normal.z
                  );
                };
                po.onAfterRender = (renderer) => {
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
      const realMesh = this.getRealMesh();
      this._meshSubject.next(realMesh);
      if (this.helper == null) {
        this.resetHelper();
      }
      this.synkObject3D([
        'position',
        'rotation',
        'scale',
        'lookat',
        'rigidbody',
        'lights',
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
      if (ThreeUtil.isNotNull(this.clips)) {
        this.synkObject3D(['mixer', 'helpers']);
      }
      this.onLoad.emit(this);
    }
    return this.mesh;
  }

  private createPlaneStencilGroup(
    geometry: THREE.BufferGeometry,
    plane: THREE.Plane,
    renderOrder: number
  ): THREE.Group {
    const group = new THREE.Group();
    const baseMat = new THREE.MeshBasicMaterial();
    baseMat.depthWrite = false;
    baseMat.depthTest = false;
    baseMat.colorWrite = false;
    baseMat.stencilWrite = true;
    baseMat.stencilFunc = THREE.AlwaysStencilFunc;
    const mat0 = baseMat.clone();
    mat0.side = THREE.BackSide;
    mat0.clippingPlanes = [plane];
    mat0.stencilFail = THREE.IncrementWrapStencilOp;
    mat0.stencilZFail = THREE.IncrementWrapStencilOp;
    mat0.stencilZPass = THREE.IncrementWrapStencilOp;
    const mesh0 = new THREE.Mesh(geometry, mat0);
    mesh0.renderOrder = renderOrder;
    group.add(mesh0);
    const mat1 = baseMat.clone();
    mat1.side = THREE.FrontSide;
    mat1.clippingPlanes = [plane];
    mat1.stencilFail = THREE.DecrementWrapStencilOp;
    mat1.stencilZFail = THREE.DecrementWrapStencilOp;
    mat1.stencilZPass = THREE.DecrementWrapStencilOp;
    const mesh1 = new THREE.Mesh(geometry, mat1);
    mesh1.renderOrder = renderOrder;
    group.add(mesh1);
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
          parent: this.mesh,
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
