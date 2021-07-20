import { Component, ContentChildren, forwardRef, Input, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Line2 } from 'three/examples/jsm/lines/Line2';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { LineMaterial } from 'three/examples/jsm/lines/LineMaterial';
import { LineSegmentsGeometry } from 'three/examples/jsm/lines/LineSegmentsGeometry';
import { Wireframe } from 'three/examples/jsm/lines/Wireframe';
import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex';
import { MorphAnimMesh } from 'three/examples/jsm/misc/MorphAnimMesh';
import { Volume } from 'three/examples/jsm/misc/Volume';
import { VolumeSlice } from 'three/examples/jsm/misc/VolumeSlice';
import { Flow, InstancedFlow } from 'three/examples/jsm/modifiers/CurveModifier';
import { Lensflare, LensflareElement } from 'three/examples/jsm/objects/Lensflare';
import { MarchingCubes } from 'three/examples/jsm/objects/MarchingCubes';
import { Reflector } from 'three/examples/jsm/objects/Reflector';
import { Refractor } from 'three/examples/jsm/objects/Refractor';
import { Sky } from 'three/examples/jsm/objects/Sky';
import { Water } from 'three/examples/jsm/objects/Water';
import { Water as Water2 } from 'three/examples/jsm/objects/Water2';
import { CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';
import { CSS3DObject, CSS3DSprite } from 'three/examples/jsm/renderers/CSS3DRenderer';
import { SVGObject } from 'three/examples/jsm/renderers/SVGRenderer';
import { WaterRefractionShader } from 'three/examples/jsm/shaders/WaterRefractionShader';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { GeometryCompressionUtils } from 'three/examples/jsm/utils/GeometryCompressionUtils';
import { SceneUtils } from 'three/examples/jsm/utils/SceneUtils';
import { CurveComponent } from '../curve/curve.component';
import { AbstractGeometryComponent } from '../geometry.abstract';
import { HtmlComponent } from '../html/html.component';
import { CssStyle, ThreeColor, ThreeUtil } from '../interface';
import { LensflareelementComponent } from '../lensflareelement/lensflareelement.component';
import { AbstractMaterialComponent, MeshMaterialRaw } from '../material.abstract';
import { MaterialComponent } from '../material/material.component';
import { AbstractObject3dComponent } from '../object3d.abstract';
import { AbstractTextureComponent } from '../texture.abstract';
import { HelperComponent } from './../helper/helper.component';
import { LightComponent } from './../light/light.component';
import { LocalStorageService } from './../local-storage.service';

@Component({
  selector: 'ngx3js-mesh',
  templateUrl: './mesh.component.html',
  styleUrls: ['./mesh.component.scss'],
  providers: [{ provide: AbstractObject3dComponent, useExisting: forwardRef(() => MeshComponent) }],
})
export class MeshComponent extends AbstractObject3dComponent implements OnInit {

  /**
   * 
   */
  @Input() public type: string = 'mesh';

  /**
   * 
   */
  @Input() private lightOptions: any = null;

  /**
   * 
   */
  @Input() private cssTag: string | any = null;

  /**
   * 
   */
  @Input() private cssStyle: string | CssStyle = null;

  /**
   * 
   */
  @Input() private skyboxType: string = 'auto';

  /**
   * 
   */
  @Input() private skyboxRate: number = 100;

  /**
   * 
   */
  @Input() private skyboxImage: string = null;

  /**
   * 
   */
  @Input() private skyboxCubeImage: string[] = null;

  /**
   * 
   */
  @Input() private skyboxSunImage: string = null;

  /**
   * 
   */
  @Input() private skyboxSunX: number = 0;

  /**
   * 
   */
  @Input() private skyboxSunY: number = 0;

  /**
   * 
   */
  @Input() private skyboxSunZ: number = 0;

  /**
   * 
   */
  @Input() private helperType: string = null;

  /**
   * 
   */
  @Input() private helperOptions: any = null;

  /**
   * 
   */
  @Input() private scaleStep: number = 1;

  /**
   * 
   */
  @Input() private usePlaneStencil: boolean = false;

  /**
   * 
   */
  @Input() private storageName: string = null;

  /**
   * 
   */
  @Input() private storageOption: any = null;

  /**
   * 
   */
  @Input() private color: ThreeColor = null;

  /**
   * 
   */
  @Input() private textureWidth: number = null;

  /**
   * 
   */
  @Input() private textureHeight: number = null;

  /**
   * 
   */
  @Input() private clipBias: number = null;

  /**
   * 
   */
  @Input() private sunColor: ThreeColor = null;

  /**
   * 
   */
  @Input() private sunDirection: number[] | THREE.Vector3 = null;

  /**
   * 
   */
  @Input() private sunPosition: number[] | THREE.Vector3 = null;

  /**
   * 
   */
  @Input() private uniforms: { [uniform: string]: { type: string; value: any; options?: any } | THREE.IUniform } = null;

  /**
   * 
   */
  @Input() private distortionScale: number = null;

  /**
   * 
   */
  @Input() private alpha: number = null;

  /**
   * 
   */
  @Input() private compressPositions: boolean = null;

  /**
   * 
   */
  @Input() private compressNormals: string = null;

  /**
   * 
   */
  @Input() private compressUvs: boolean = null;

  /**
   * 
   */
  @Input() private skyColor: string | number = null;

  /**
   * 
   */
  @Input() private waterColor: string | number = null;

  /**
   * 
   */
  @Input() private distance: number = null;

  /**
   * 
   */
  @Input() private metalness: number = null;

  /**
   * 
   */
  @Input() private roughness: number = null;

  /**
   * 
   */
  @Input() private count: number = null;

  /**
   * 
   */
  @Input() private volume: Volume = null;

  /**
   * 
   */
  @Input() private axis: string = null;

  /**
   * 
   */
  @Input() private index: number = null;

  /**
   * 
   */
  @Input() private size: number = null;

  /**
   * 
   */
  @Input() private divisions: number = null;

  /**
   * 
   */
  @Input() private usage: string = null;

  /**
   * 
   */
  @Input() private enableUvs: boolean = null;

  /**
   * 
   */
  @Input() private enableColors: boolean = null;

  /**
   * 
   */
  @Input() private resolution: number = null;

  /**
   * 
   */
  @Input() private isolation: number = null;

  /**
   * 
   */
  @Input() private flowDirectionX: number = null;

  /**
   * 
   */
  @Input() private flowDirectionY: number = null;

  /**
   * 
   */
  @Input() private flowSpeed: number = null;

  /**
   * 
   */
  @Input() private reflectivity: number = null;

  /**
   * 
   */
  @Input() private waterScale: number = null;

  /**
   * 
   */
  @Input() private flowMap: string | THREE.Texture | AbstractTextureComponent = null;

  /**
   * 
   */
  @Input() private normalMap0: string | THREE.Texture | AbstractTextureComponent = null;

  /**
   * 
   */
  @Input() private normalMap1: string | THREE.Texture | AbstractTextureComponent = null;

  /**
   * 
   */
  @Input() private planeInfos: { type: string; strength: number; subtract: number }[] = null;

  /**
   * 
   */
  @Input() private blobInfos: { x: number; y: number; z: number; strength: number; subtract: number; colors?: any }[] = null;

  /**
   * 
   */
  @Input() private makeMatrix: (mat: THREE.Matrix4, index?: number) => void = null;

  /**
   * 
   */
  @Input() private makeColor: (color: THREE.Color, index?: number) => void = null;

  /**
   * 
   */
  @Input() private geometry: AbstractGeometryComponent | MeshComponent | THREE.BufferGeometry | any = null;

  /**
   * 
   */
  @Input() private material: AbstractMaterialComponent | THREE.Material = null;

  /**
   * 
   */
  @Input() private materialIsArray: boolean = null;

  /**
   * 
   */
  @Input() private texture: AbstractTextureComponent | THREE.Texture = null;

  /**
   * 
   */
  @Input() private curve: CurveComponent | THREE.Curve<THREE.Vector3> = null;

  /**
   * 
   */
  @Input() private morphTargets: boolean = null;

  /**
   * 
   */
  @Input() private centerX: number = null;

  /**
   * 
   */
  @Input() private centerY: number = null;

  /**
   * 
   */
  @Input() private shader: string = null;

  /**
   * 
   */
  @Input() private encoding: string = null;

  /**
   * 
   */
  @Input() private shareParts: MeshComponent = null;

  /**
   * 
   */
  @Input() private sharedMesh: MeshComponent = null;

  /**
   * 
   */
  @Input() private moveAlongCurve: number = null;

  /**
   * 
   */
  @Input() private moveIndividualAlongCurve: number[] | string = null;

  /**
   * 
   */
  @Input() private colors: number[] | string = null;


  /**
   * 
   */
  @ContentChildren(AbstractGeometryComponent, { descendants: false }) private geometryList: QueryList<AbstractGeometryComponent>;

  /**
   * 
   */
  @ContentChildren(AbstractTextureComponent, { descendants: false }) private textureList: QueryList<AbstractTextureComponent>;

  /**
   * 
   */
  @ContentChildren(LensflareelementComponent, { descendants: false }) private lensflareElementList: QueryList<LensflareelementComponent>;

  /**
   * 
   */
  @ContentChildren(HtmlComponent, { descendants: false }) private cssChildrenList: QueryList<HtmlComponent>;

  /**
   * 
   */
  @ContentChildren(CurveComponent, { descendants: false }) private curveList: QueryList<CurveComponent>;

  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('mesh');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.mesh) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.geometryList, 'geometryList', 'geometry');
    this.subscribeListQueryChange(this.textureList, 'textureList', 'texture');
    this.subscribeListQueryChange(this.lensflareElementList, 'lensflareElementList', 'lensflareElement');
    this.subscribeListQueryChange(this.cssChildrenList, 'cssChildrenList', 'cssChildren');
    this.subscribeListQueryChange(this.curveList, 'curveList', 'curve');
    super.ngAfterContentInit();
  }

  private getSkyboxSize(def?: number): number {
    const skyboxSize = ThreeUtil.getTypeSafe(this.distance, def, 10000);
    if (ThreeUtil.isNotNull(skyboxSize)) {
      return (skyboxSize * this.skyboxRate) / 100;
    } else {
      return 10000;
    }
  }

  private getCssTag(): any {
    const cssTag = ThreeUtil.getTypeSafe(this.cssTag, 'div');
    if (typeof cssTag === 'string') {
      return document.createElement(cssTag);
    } else if (cssTag instanceof Element) {
      return cssTag.cloneNode();
    }
    return document.createElement('div');
  }

  private getSkySunPosition(): THREE.Euler {
    return new THREE.Euler(ThreeUtil.getAngleSafe(this.skyboxSunX, 0), ThreeUtil.getAngleSafe(this.skyboxSunY, 0), ThreeUtil.getAngleSafe(this.skyboxSunZ, 0));
  }

  private getMetalness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.metalness, def);
  }

  private getRoughness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.roughness, def);
  }

  private getCount(def?: number): number {
    return ThreeUtil.getTypeSafe(this.count, def);
  }

  private getAxis(def?: string): string {
    return ThreeUtil.getTypeSafe(this.axis, def);
  }

  private getIndex(baseSize: number, def: number): number {
    const index = ThreeUtil.getTypeSafe(this.index, def);
    return Math.floor(baseSize * index);
  }

  private getColor(def?: ThreeColor): THREE.Color {
    return ThreeUtil.getColorSafe(this.color, this.waterColor, def);
  }

  private getTextureWidth(def?: number): number {
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

  private getUndateUniforms(orgUniforms?: { [uniform: string]: THREE.IUniform }): void {
    const uniforms = ThreeUtil.getTypeSafe(this.uniforms, {});
    Object.entries(uniforms).forEach(([key, value]) => {
      if (ThreeUtil.isNotNull(orgUniforms[key])) {
        const uniformsValue = orgUniforms[key];
        if (ThreeUtil.isNotNull(value['type']) && ThreeUtil.isNotNull(value['value'])) {
          switch (value['type'].toLowerCase()) {
            case 'vector2':
            case 'v2':
              uniformsValue.value = ThreeUtil.getVector2Safe(value['value'][0], value['value'][1]);
              break;
            case 'vector3':
            case 'vector':
            case 'v3':
              uniformsValue.value = ThreeUtil.getVector3Safe(value['value'][0], value['value'][1], value['value'][2]);
              break;
            case 'color':
              uniformsValue.value = ThreeUtil.getColorSafe(value['value'], 0xffffff);
              break;
            case 'texture':
              const texture = AbstractTextureComponent.getTextureImage(value['value']);
              if (ThreeUtil.isNotNull(value['options'])) {
                switch (value['options']) {
                  case 'wrapRepeat':
                    texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
                    break;
                }
              }
              uniformsValue.value = texture;
              break;
            case 'number':
              uniformsValue.value = parseFloat(value['value']);
              break;
          }
        } else {
          orgUniforms.value = value;
        }
      }
    });
  }

  private getSunDirection(def?: THREE.Vector3): THREE.Vector3 {
    let sunDirection: THREE.Vector3 = null;
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

  private getWaterColor(def?: string | number): THREE.Color {
    return ThreeUtil.getColorSafe(this.waterColor, def);
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
    switch (shader.toLowerCase()) {
      case 'waterrefractionshader':
      case 'waterrefraction':
        return WaterRefractionShader;
      default:
        break;
    }
    return undefined;
  }

  private getEncoding(def?: string): THREE.TextureEncoding {
    return ThreeUtil.getTextureEncodingSafe(this.encoding, def, '');
  }

  private clips: THREE.AnimationClip[] | any = null;
  private clipMesh: THREE.Object3D = null;
  public storageSource: any = null;

  getStorageSource(): any {
    return this.storageSource;
  }

  getGeometry(): THREE.BufferGeometry {
    if (this.geometry !== null) {
      return ThreeUtil.getGeometry(this.geometry);
    }
    if (this.geometryList !== null && this.geometryList.length > 0) {
      let geometry: THREE.BufferGeometry = null;
      this.geometryList.forEach((geometryCom) => {
        if (geometry === null && geometryCom.enabled) {
          geometry = geometryCom.getGeometry();
        }
      });
      if (geometry !== null) {
        return geometry;
      }
    } else if (this.mesh !== null) {
      if (ThreeUtil.isNotNull(this.mesh.userData.refTarget) && ThreeUtil.isNotNull(this.mesh.userData.refTarget.geometry)) {
        return this.mesh.userData.refTarget.geometry;
      } else if (ThreeUtil.isNotNull(this.mesh['geometry'])) {
        return this.mesh['geometry'];
      }
    }
    return new THREE.BufferGeometry();
  }

  getMaterial(): THREE.Material {
    if (this.mesh !== null && this.object3d instanceof THREE.Mesh) {
      if (Array.isArray(this.object3d.material)) {
        return this.object3d.material[0];
      } else if (this.object3d.material instanceof THREE.Material) {
        return this.object3d.material;
      }
    }
    return null;
  }

  getCurve(): THREE.Curve<THREE.Vector3> {
    if (this.curve !== null) {
      this.unSubscribeRefer('curve');
      if (this.curve instanceof THREE.Curve) {
        return this.curve;
      } else {
        const curve = this.curve.getCurve() as THREE.Curve<THREE.Vector3>;
        this.subscribeRefer(
          'curve',
          ThreeUtil.getSubscribe(
            this.curve,
            () => {
              this.needUpdate = true;
            },
            'curve'
          )
        );
        return curve;
      }
    }
    if (this.curveList !== null && this.curveList.length > 0) {
      return this.curveList.first.getCurve() as THREE.Curve<THREE.Vector3>;
    }
    return null;
  }

  private getMaterials(parameters?: THREE.MeshBasicMaterialParameters, required: boolean = true): THREE.Material | THREE.Material[] {
    const materials: THREE.Material[] = [];
    if (this.material !== null && this.material !== undefined) {
      const material = ThreeUtil.getMaterialByType(this.material, 'material');
      if (ThreeUtil.isNotNull(material)) {
        materials.push(material);
      }
    }
    if (this.materialList !== null && this.materialList.length > 0) {
      this.materialList.forEach((material) => {
        if (material.enabled && material.isMaterialType('material')) {
          materials.push(material.getMaterial());
        }
      });
    }
    if (materials.length == 0 && required) {
      materials.push(new THREE.MeshBasicMaterial(parameters));
    }
    if (ThreeUtil.isNotNull(this.materialIsArray)) {
      if (this.materialIsArray) {
        return materials;
      } else if (materials.length > 0) {
        return materials[0];
      }
    } else {
      if (materials.length == 1) {
        return materials[0];
      } else if (materials.length > 1) {
        return materials;
      }
    }
    return null;
  }

  private getMaterialOne(parameters?: THREE.MeshBasicMaterialParameters, required: boolean = true): THREE.Material {
    const materials = this.getMaterials(parameters, required);
    if (Array.isArray(materials)) {
      return materials[0];
    } else {
      return materials;
    }
  }

  private getMaterialsMulti(parameters?: THREE.MeshBasicMaterialParameters, required: boolean = true): THREE.Material[] {
    const materials = this.getMaterials(parameters, required);
    if (Array.isArray(materials)) {
      return materials;
    } else if (materials !== null) {
      return [materials];
    } else {
      return [];
    }
  }

  private getTexture(type: string, alterTexture?: string | THREE.Texture | AbstractTextureComponent, defImage?: string): THREE.Texture {
    if (this.texture !== null && this.texture !== undefined) {
      const texture = ThreeUtil.getTexture(this.texture, type, false);
      if (ThreeUtil.isNotNull(texture)) {
        return texture;
      }
    }
    if (this.textureList !== null && this.textureList.length > 0) {
      const foundTexture = this.textureList.find((texture) => {
        return texture.isTexture(type);
      });
      if (ThreeUtil.isNotNull(foundTexture)) {
        return foundTexture.getTexture();
      }
    }
    if (ThreeUtil.isNotNull(alterTexture)) {
      if (alterTexture instanceof THREE.Texture) {
        return alterTexture;
      } else if (alterTexture instanceof AbstractTextureComponent) {
        return alterTexture.getTexture();
      } else {
        return AbstractTextureComponent.getTextureImage(alterTexture);
      }
    }
    if (ThreeUtil.isNotNull(defImage)) {
      return AbstractTextureComponent.getTextureImage(defImage);
    }
    return undefined;
  }

  setParent(parent: THREE.Object3D): boolean {
    if (super.setParent(parent)) {
      this.getMesh();
      return true;
    }
    return false;
  }

  setWireFrame(wireframe: boolean, child: THREE.Object3D = null) {
    if (child === null) {
      child = this.object3d;
    }
    if (child instanceof THREE.Mesh) {
      if (child.material instanceof THREE.Material && child.material['wireframe'] !== undefined) {
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
    if (this.helperComponent !== null && helperVisible !== null && helperVisible !== undefined) {
      this.helperComponent.updateInputParams({ visible: helperVisible });
    }
  }

  applyChanges3d(changes: string[]) {
    if (this.mesh !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getObject3d();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, ['geometry', 'svg', 'listener', 'audio', 'csschildren', 'controller', 'material', 'mixer'], this.OBJECT3D_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['geometry', 'svg', 'listener', 'audio', 'csschildren', 'material', 'helper', 'mixer']);
      }
      if (ThreeUtil.isIndexOf(changes, 'html')) {
        changes = ThreeUtil.pushUniq(changes, ['csschildren']);
      }
      if (ThreeUtil.isIndexOf(changes, ['helpertype', 'helperoption'])) {
        changes = ThreeUtil.pushUniq(changes, ['helper']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'helper':
            this.resetHelper();
            break;
          case 'csschildren':
            this.unSubscribeReferList('cssChildrenList');
            if (ThreeUtil.isNotNull(this.cssChildrenList)) {
              this.cssChildrenList.forEach((cssChild) => {
                cssChild.setParent(this.mesh);
              });
              this.subscribeListQuery(this.cssChildrenList, 'cssChildrenList', 'html');
            }
            break;
          case 'material':
            this.unSubscribeRefer('material');
            switch (this.type.toLowerCase()) {
              case 'flow':
              case 'instancedflow':
                break;
              default:
                this.mesh.userData.material = null;
                if (ThreeUtil.isNull(this.storageName)) {
                  const meshMaterial = AbstractMaterialComponent.getMeshMaterial(this.mesh) as MeshMaterialRaw;
                  if (meshMaterial !== null) {
                    if (Array.isArray(meshMaterial.material)) {
                      meshMaterial.material = [];
                    }
                    if (this.material !== null) {
                      const material = ThreeUtil.getMaterialOne(this.material);
                      if (Array.isArray(meshMaterial.material)) {
                        if (meshMaterial.material.indexOf(material) === -1) {
                          meshMaterial.material.push(material);
                        }
                      } else {
                        this.mesh.userData.material = 'material';
                        if (meshMaterial.material !== material) {
                          meshMaterial.material = material;
                        }
                      }
                      this.subscribeRefer(
                        'material',
                        ThreeUtil.getSubscribe(
                          this.material,
                          (event) => {
                            this.addChanges(event);
                          },
                          'material'
                        )
                      );
                    }
                    if (ThreeUtil.isNotNull(this.materialList)) {
                      if (this.materialList.length > 0) {
                        this.materialList.forEach((material) => {
                          switch (material.materialType.toLowerCase()) {
                            case 'material':
                              material.setMesh(meshMaterial);
                              break;
                          }
                        });
                      }
                    }
                  }
                }
                break;
            }
            break;
          case 'geometry':
            this.unSubscribeRefer('geometry');
            this.unSubscribeReferList('materialList');
            switch (this.type.toLowerCase()) {
              case 'flow':
              case 'instancedflow':
                break;
              default:
                this.mesh.userData.geometry = null;
                const meshGeometry = AbstractGeometryComponent.getMeshGeometry(this.mesh);
                if (meshGeometry !== null) {
                  if (ThreeUtil.isNotNull(this.geometry)) {
                    this.mesh.userData.geometry = 'geometry';
                    const geometry = ThreeUtil.getGeometry(this.geometry);
                    if (meshGeometry.geometry !== geometry) {
                      meshGeometry.geometry = geometry;
                      if (ThreeUtil.isNotNull(meshGeometry.updateMorphTargets)) {
                        meshGeometry.updateMorphTargets();
                      }
                    }
                    this.subscribeRefer(
                      'geometry',
                      ThreeUtil.getSubscribe(
                        this.geometry,
                        (event) => {
                          this.addChanges(event);
                          this.setSubscribeNext('loaded');
                        },
                        'geometry'
                      )
                    );
                  }
                  if (ThreeUtil.isNotNull(this.geometryList)) {
                    if (this.geometryList.length > 0) {
                      this.geometryList.forEach((geometry) => {
                        geometry.setMesh(meshGeometry);
                      });
                    }
                    this.subscribeListQuery(this.geometryList, 'geometryList', 'geometry');
                  }
                }
                break;
            }
            break;
        }
      });
      super.applyChanges3d(changes);
    }
  }

  getJson(): any {
    return this.getObject3d().toJSON();
  }

  setSavelocalStorage(storageName: string) {
    return this.localStorageService.setObject(storageName, this.getObject3d());
  }

  private cssClazzName: string = null;
  private mesh: THREE.Object3D = null;

  getRealMesh(): THREE.Mesh | THREE.LineSegments | THREE.Line | THREE.Points {
    if (this.mesh instanceof THREE.Mesh || this.mesh instanceof THREE.LineSegments || this.mesh instanceof THREE.Line || this.mesh instanceof THREE.Points) {
      return this.mesh;
    }
    if (ThreeUtil.isNotNull(this.mesh.userData.refTarget) && (this.mesh.userData.refTarget instanceof THREE.Mesh || this.mesh.userData.refTarget instanceof THREE.LineSegments || this.mesh.userData.refTarget instanceof THREE.Line || this.mesh.userData.refTarget instanceof THREE.Points)) {
      return this.mesh.userData.refTarget;
    }
    let mesh: THREE.Object3D = this.mesh;
    while (mesh.children && mesh.children.length > 0) {
      mesh = mesh.children[0];
      if (mesh instanceof THREE.Mesh || mesh instanceof THREE.LineSegments || mesh instanceof THREE.Line || mesh instanceof THREE.Points) {
        return mesh;
      }
    }
    return null;
  }

  getClips(): THREE.AnimationClip[] | any {
    return this.clips;
  }

  getUniforms(): { [uniform: string]: THREE.IUniform } {
    const material = this.getMaterial();
    if (ThreeUtil.isNotNull(material) && ThreeUtil.isNotNull(material['uniforms'])) {
      return material['uniforms'];
    }
    return null;
  }

  getObject3d<T extends THREE.Object3D>(): T {
    return this.getMesh();
  }

  getMesh<T extends THREE.Object3D>(): T {
    if (this.mesh === null || this._needUpdate) {
      this.needUpdate = false;
      this.setUserData('refTarget', null);
      this.setUserData('storageSource', null);
      this.setUserData('clips', null);

      this.clips = null;
      if (this.clipMesh !== null) {
        this.removeObject3d(this.clipMesh);
        this.clipMesh = null;
      }
      this.unSubscribeRefer('customGeometry');
      let geometry: THREE.BufferGeometry = null;
      if ((this.geometryList != null && this.geometryList.length > 0) || this.geometry !== null) {
        geometry = this.getGeometry();
      }
      let basemesh: THREE.Object3D = null;
      switch (this.type.toLowerCase()) {
        case 'skybox':
          const skyboxSize = this.getSkyboxSize(1500);
          switch (this.skyboxType.toLowerCase()) {
            case 'sun':
              const lensflare = new Lensflare();
              lensflare.addElement(new LensflareElement(AbstractTextureComponent.getTextureImage(this.skyboxSunImage), this.getSize(100), 0, this.getColor(null)));
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
                  skyGeometry = new THREE.BoxGeometry(skyboxSize, skyboxSize, skyboxSize);
                  break;
                case 'sphere':
                default:
                  skyGeometry = new THREE.SphereGeometry(skyboxSize, 8, 6);
                  break;
              }
              if (ThreeUtil.isNotNull(this.skyboxImage) || ThreeUtil.isNotNull(this.skyboxCubeImage)) {
                const envMap = AbstractTextureComponent.getTextureImage(this.skyboxImage, this.skyboxCubeImage);
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
        case 'svg':
        case 'svgobject':
        case 'css':
        case 'css2d':
        case 'css2dobject':
        case 'css3d':
        case 'css3dobject':
        case 'css3dsprite':
          const cssElement: any = this.getCssTag();
          if (ThreeUtil.isNotNull(this.cssStyle)) {
            this.cssClazzName = ThreeUtil.addCssStyle(cssElement, this.cssStyle, this.cssClazzName, 'mesh', 'inline');
          }
          switch (this.type.toLowerCase()) {
            case 'svg':
            case 'svgobject':
              basemesh = new SVGObject(cssElement as SVGElement);
              break;
            case 'css2d':
            case 'css2dobject':
              basemesh = new CSS2DObject(cssElement);
              break;
            case 'css3dsprite':
              basemesh = new CSS3DSprite(cssElement);
              break;
            case 'css3dobject':
            case 'css3d':
            case 'css':
            default:
              basemesh = new CSS3DObject(cssElement);
              break;
          }
          break;
        case 'reflector':
          basemesh = new Reflector(geometry, {
            color: this.getColor(),
            textureWidth: this.getTextureWidth(1024) * window.devicePixelRatio,
            textureHeight: this.gettextureHeight(1024) * window.devicePixelRatio,
            clipBias: this.getClipBias(0.003),
            shader: this.getShader(),
            encoding: this.getEncoding(),
          });
          break;
        case 'refractor':
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
            switch (key.toLowerCase()) {
              case 'tdudv':
                value.value = this.getTexture('tdudv') || null;
                break;
            }
          });
          basemesh = refractor;
          break;
        case 'water':
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
            fog: false,
          });
          this.getUndateUniforms(water.material['uniforms']);
          basemesh = water;
          break;
        case 'water2':
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
            flowMap: this.getTexture('flowMap', this.flowMap),
            normalMap0: this.getTexture('normalMap0', this.normalMap0, 'textures/water/Water_1_M_Normal.jpg'),
            normalMap1: this.getTexture('normalMap1', this.normalMap1, 'textures/water/Water_2_M_Normal.jpg'),
            encoding: this.getEncoding(),
          });
          this.getUndateUniforms(water2.material['uniforms']);
          basemesh = water2;
          break;
        case 'sky':
          const sky = new Sky();
          this.getUndateUniforms(sky.material.uniforms);
          basemesh = sky;
          break;
        case 'flow':
          const flowMaterial = this.getMaterialOne();
          const objectToCurve = new THREE.Mesh(geometry, flowMaterial);
          const flow = new Flow(objectToCurve);
          const flowCurve = this.getCurve();
          if (ThreeUtil.isNotNull(flowCurve)) {
            flow.updateCurve(0, flowCurve);
          }
          this.setUserData('storageSource', flow);
          basemesh = flow.object3D;
          if (ThreeUtil.isNotNull(this.moveAlongCurve)) {
            basemesh.onBeforeRender = () => {
              flow.moveAlongCurve(ThreeUtil.getTypeSafe(this.moveAlongCurve, 0.001));
            };
          }
          this.subscribeRefer(
            'customGeometry',
            ThreeUtil.getSubscribe(
              geometry,
              () => {
                this.needUpdate = true;
              },
              'loaded'
            )
          );
          break;
        case 'instancedflow':
          const instancedFlowMaterial = this.getMaterialOne();
          const instancedFlowCount = this.getCount(1);
          const instancedFlow = new InstancedFlow(instancedFlowCount, 1, geometry, instancedFlowMaterial);
          const instancedFlowCurve = this.getCurve();
          if (ThreeUtil.isNotNull(instancedFlowCurve)) {
            instancedFlow.updateCurve(0, instancedFlowCurve);
            instancedFlow.setCurve(0, 0);
            const instancedFlowColor = ThreeUtil.getTypeSafe(this.colors, 'rand');
            const instancedFlowColors: THREE.Color[] = [];
            if (typeof instancedFlowColor === 'string') {
              switch (instancedFlowColor.toLowerCase()) {
                case 'null':
                  for (let i = 0; i < instancedFlowCount; i++) {
                    instancedFlowColors.push(null);
                  }
                  break;
                case 'rand':
                case 'random':
                  for (let i = 0; i < instancedFlowCount; i++) {
                    instancedFlowColors.push(new THREE.Color(0xffffff * Math.random()));
                  }
                  break;
                default:
                  const colorList = instancedFlowColor.split(',');
                  for (let i = 0; i < instancedFlowCount; i++) {
                    if (colorList.length > i) {
                      instancedFlowColors.push(ThreeUtil.getColorSafe(colorList[i]));
                    } else {
                      instancedFlowColors.push(null);
                    }
                  }
                  break;
              }
            } else if (Array.isArray(instancedFlowColor)) {
              const colorList = instancedFlowColor;
              for (let i = 0; i < instancedFlowCount; i++) {
                if (colorList.length > i) {
                  instancedFlowColors.push(ThreeUtil.getColorSafe(colorList[i]));
                } else {
                  instancedFlowColors.push(null);
                }
              }
            } else {
              for (let i = 0; i < instancedFlowCount; i++) {
                instancedFlowColors.push(null);
              }
            }
            const instancedFlowOffset = ThreeUtil.getTypeSafe(this.moveIndividualAlongCurve, 'equals');
            const instancedFlowOffsets: number[] = [];
            if (typeof instancedFlowOffset === 'string') {
              switch (instancedFlowOffset.toLowerCase()) {
                case 'equals':
                  for (let i = 0; i < instancedFlowCount; i++) {
                    instancedFlowOffsets.push(i / instancedFlowCount);
                  }
                  break;
                case 'rand':
                case 'random':
                  for (let i = 0; i < instancedFlowCount; i++) {
                    instancedFlowOffsets.push(Math.random());
                  }
                  break;
                default:
                  const offsetList = instancedFlowOffset.split(',');
                  for (let i = 0; i < instancedFlowCount; i++) {
                    if (offsetList.length > i) {
                      instancedFlowOffsets.push(Math.min(1, Math.max(0, parseFloat(offsetList[0]))));
                    } else {
                      instancedFlowOffsets.push(null);
                    }
                  }
                  break;
              }
            } else if (Array.isArray(instancedFlowOffset)) {
              const offsetList = instancedFlowOffset;
              for (let i = 0; i < instancedFlowCount; i++) {
                if (offsetList.length > i) {
                  instancedFlowOffsets.push(offsetList[i]);
                } else {
                  instancedFlowOffsets.push(null);
                }
              }
            } else {
              for (let i = 0; i < instancedFlowCount; i++) {
                instancedFlowOffsets.push(null);
              }
            }
            for (let i = 0; i < instancedFlowCount; i++) {
              if (ThreeUtil.isNotNull(instancedFlowOffsets[i])) {
                instancedFlow.moveIndividualAlongCurve(i, instancedFlowOffsets[i]);
              }
              if (ThreeUtil.isNotNull(instancedFlowColors[i])) {
                instancedFlow.object3D.setColorAt(i, instancedFlowColors[i]);
              }
            }
          }
          this.setUserData('storageSource', instancedFlow);
          basemesh = instancedFlow.object3D;
          if (ThreeUtil.isNotNull(this.moveAlongCurve)) {
            basemesh.onBeforeRender = () => {
              instancedFlow.moveAlongCurve(ThreeUtil.getTypeSafe(this.moveAlongCurve, 0.001));
            };
          }
          this.subscribeRefer(
            'customGeometry',
            ThreeUtil.getSubscribe(
              geometry,
              () => {
                this.needUpdate = true;
              },
              'loaded'
            )
          );
          break;
        case 'lineloop':
          let points = [];
          const lineloopCurve = this.getCurve();
          if (ThreeUtil.isNotNull(lineloopCurve)) {
            points = lineloopCurve.getPoints(this.getDivisions(50));
          }
          const lineLoop = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(points), this.getMaterials());
          basemesh = lineLoop;
          break;
        case 'light':
          const light = this.initLocalComponent('light', new LightComponent());
          light.updateInputParams(this.lightOptions);
          basemesh = light.getObject3d();
          break;
        case 'lensflareelement':
        case 'lensflare':
          const lensflare = new Lensflare();
          this.lensflareElementList.forEach((lensflareElement) => {
            lensflareElement.setLensflare(lensflare);
          });
          basemesh = lensflare;
          break;
        case 'volume':
          if (ThreeUtil.isNotNull(this.volume)) {
            let volumeSlice: VolumeSlice = null;
            switch (this.getAxis('z').toLowerCase()) {
              case 'x':
                volumeSlice = this.volume.extractSlice('x', this.getIndex(this.volume['RASDimensions'][0], 0.5));
                break;
              case 'y':
                volumeSlice = this.volume.extractSlice('y', this.getIndex(this.volume['RASDimensions'][1], 0.5));
                break;
              case 'z':
              default:
                volumeSlice = this.volume.extractSlice('z', this.getIndex(this.volume['RASDimensions'][2], 0.5));
                break;
            }
            this.setUserData('storageSource', volumeSlice);
            basemesh = volumeSlice.mesh;
          } else {
            basemesh = new THREE.Group();
          }
          break;
        case 'instancedmesh':
        case 'instanced':
          const instanced = new THREE.InstancedMesh(geometry, this.getMaterialOne(), this.getCount(1));
          if (ThreeUtil.isNotNull(this.usage)) {
            instanced.instanceMatrix.setUsage(this.getUsage('dynamicdraw'));
          }
          if (ThreeUtil.isNotNull(this.makeMatrix)) {
            const matrix = new THREE.Matrix4();
            for (let i = 0; i < instanced.count; i++) {
              this.makeMatrix(matrix, i);
              instanced.setMatrixAt(i, matrix);
            }
          }
          if (ThreeUtil.isNotNull(this.makeColor)) {
            const color = new THREE.Color();
            for (let i = 0; i < instanced.count; i++) {
              this.makeColor(color, i);
              instanced.setColorAt(i, color);
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
            const materials = this.getMaterials();
            const mergedGeometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
            basemesh = new THREE.Mesh(mergedGeometry, materials);
          }
          break;
        case 'naive':
          {
            basemesh = new THREE.Group();
            const matrix = new THREE.Matrix4();
            const material = this.getMaterials();
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
          basemesh = SceneUtils.createMultiMaterialObject(geometry, this.getMaterialsMulti());
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
          const sprite = new THREE.Sprite(this.getMaterialOne() as THREE.SpriteMaterial);
          if (ThreeUtil.isNotNull(this.centerX) && ThreeUtil.isNotNull(this.centerY)) {
            sprite.center.copy(ThreeUtil.getVector2Safe(this.centerX, this.centerY, new THREE.Vector2()));
          }
          basemesh = sprite;
          break;
        case 'wireframe':
          basemesh = new Wireframe(geometry as LineSegmentsGeometry, this.getMaterialOne() as LineMaterial);
          break;
        case 'lod':
          basemesh = new THREE.LOD();
          break;
        case 'marchingcubes':
          const effect = new MarchingCubes(this.getResolution(28), this.getMaterialOne(), this.getEnableUvs(false), this.getEnableColors(false));
          if (ThreeUtil.isNotNull(this.isolation)) {
            effect.isolation = this.getIsolation(80.0);
          }
          if (ThreeUtil.isNotNull(this.blobInfos) && this.blobInfos.length > 0) {
            this.blobInfos.forEach((blobInfo) => {
              effect.addBall(blobInfo.x, blobInfo.y, blobInfo.z, blobInfo.strength, blobInfo.subtract, ThreeUtil.getColorSafe(blobInfo.colors));
            });
          }
          if (ThreeUtil.isNotNull(this.planeInfos) && this.planeInfos.length > 0) {
            this.planeInfos.forEach((plane) => {
              switch (plane.type.toLowerCase()) {
                case 'x':
                  effect.addPlaneX(plane.strength, plane.subtract);
                  break;
                case 'y':
                  effect.addPlaneY(plane.strength, plane.subtract);
                  break;
                case 'z':
                  effect.addPlaneZ(plane.strength, plane.subtract);
                  break;
              }
            });
          }
          basemesh = effect;
          break;
        case 'points':
          basemesh = new THREE.Points(geometry, this.getMaterials());
          break;
        case 'line':
          const line = new THREE.Line(geometry, this.getMaterials());
          line.castShadow = this.castShadow;
          basemesh = line;
          break;
        case 'line2':
          const lineMaterial = this.getMaterialOne();
          if (geometry instanceof LineGeometry && lineMaterial instanceof LineMaterial) {
            const line2 = new Line2(geometry, lineMaterial);
            line2.computeLineDistances();
            line2.scale.set(1, 1, 1);
            basemesh = line2;
          } else {
            const line = new THREE.Line(geometry, this.getMaterials());
            line.computeLineDistances();
            line.castShadow = this.castShadow;
            basemesh = line;
          }
          break;
        case 'linesegments':
          const lineSegments = new THREE.LineSegments(geometry, this.getMaterials());
          if (geometry.index === null) {
            // lineSegments.computeLineDistances();
          }
          lineSegments.castShadow = this.castShadow;
          basemesh = lineSegments;
          break;
        case 'md2charactercomplex':
          basemesh = new THREE.Group();
          if (this.shareParts !== null) {
            const loadShareParts = () => {
              const shareParts = this.shareParts.getClips();
              if (shareParts instanceof MD2CharacterComplex) {
                const character = new MD2CharacterComplex();
                character.shareParts(shareParts);
                if (this.receiveShadow) {
                  character.enableShadows(this.receiveShadow);
                }
                basemesh.children.forEach((child) => {
                  child.parent.remove(child);
                });
                basemesh.add(character.root);
                this.clipMesh = character.root;
                this.clips = character;
                this.applyChanges3d(['mixer', 'material']);
                super.callOnLoad();
              }
            };
            this.unSubscribeReferList('shareParts');
            this.subscribeReferList(
              'shareParts',
              this.shareParts.getSubscribe().subscribe(() => {
                loadShareParts();
              })
            );
            this.shareParts.getObject3d();
            loadShareParts();
          }
          break;
        case 'mesh':
        default:
          if (ThreeUtil.isNotNull(this.storageName)) {
            basemesh = new THREE.Group();
            this.localStorageService.getObject(
              this.storageName,
              (loadedMesh: THREE.Object3D, clips?: THREE.AnimationClip[] | any, geometry?: THREE.BufferGeometry, morphTargets?: THREE.BufferAttribute[], source?: any) => {
                let assignMaterial = true;
                if (ThreeUtil.isNull(loadedMesh)) {
                  if (ThreeUtil.isNotNull(geometry)) {
                    geometry.computeVertexNormals();
                    if (geometry['animations'] !== null && geometry['animations'] !== undefined && geometry['animations'].length > 0) {
                      const morphAnim = new MorphAnimMesh(geometry, this.getMaterialOne());
                      loadedMesh = morphAnim;
                      if (geometry['animations'] !== null) {
                        clips = geometry['animations'];
                      }
                    } else {
                      loadedMesh = new THREE.Mesh(geometry, this.getMaterialOne());
                    }
                  } else if (ThreeUtil.isNotNull(morphTargets)) {
                    const baseGeometry = this.getGeometry();
                    baseGeometry.morphAttributes.position = morphTargets;
                    loadedMesh = new THREE.Mesh(baseGeometry, this.getMaterialOne());
                    assignMaterial = false;
                  }
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
                if (assignMaterial) {
                  const materials = this.getMaterialsMulti({}, false);
                  if (materials.length > 0) {
                    const materialType: string = this.storageOption?.materialType || 'seqn';
                    switch (materialType.toLowerCase()) {
                      case 'namelist':
                        this.materialList.forEach((material) => {
                          const nameList = material.nameList;
                          if (nameList !== null && nameList.length > 0) {
                            const matOfName = material.getMaterial();
                            nameList.forEach((name) => {
                              const object = loadedMesh.getObjectByName(name) as any;
                              if (object !== null && object !== undefined) {
                                object.material = matOfName;
                              }
                            });
                          }
                        });
                        break;
                      case 'map':
                        const texture = this.getMaterialOne()['map'];
                        loadedMesh.traverse((child) => {
                          if (child['isMesh']) child['material'].map = texture;
                        });
                        break;
                      default:
                        const loadedMeshes: THREE.Mesh[] = [];
                        loadedMesh.traverse((object3d) => {
                          if (object3d instanceof THREE.Mesh) {
                            loadedMeshes.push(object3d);
                          }
                        });
                        materials.forEach((material, idx) => {
                          if (loadedMeshes.length > idx) {
                            loadedMeshes[idx].material = material;
                          }
                        });
                        break;
                    }
                  }
                }
                this.setUserData('refTarget', loadedMesh);
                this.setUserData('clips', clips);
                this.setUserData('storageSource', source);
                loadedMesh.userData = this.getUserData();
                this.addChildObject3d(loadedMesh);
                this.setSubscribeNext(['loaded']);
              },
              this.storageOption
            );
          } else if (ThreeUtil.isNotNull(this.sharedMesh)) {
            this.unSubscribeReferList('shareParts');
            basemesh = new THREE.Group();
            const mesh = this.sharedMesh.getObject3d();
            const clips = this.sharedMesh.clips;
            if (ThreeUtil.isNotNull(clips)) {
              if (Array.isArray(clips)) {
                this.clips = [];
                clips.forEach((clip) => {
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
            this.subscribeReferList(
              'shareParts',
              this.sharedMesh.getSubscribe().subscribe(() => {
                this.needUpdate = true;
              })
            );
          } else {
            if (geometry !== null) {
              basemesh = new THREE.Mesh(geometry, this.getMaterials());
            } else {
              basemesh = new THREE.Mesh();
            }
            basemesh.castShadow = this.castShadow;
          }
      }
      this.setMesh(basemesh);
    }
    return this.mesh as T;
  }

  private setMesh(mesh: THREE.Object3D) {
    if (mesh !== null && this.mesh !== mesh) {
      if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Points || mesh instanceof THREE.Sprite) {
        if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Points) {
          if (this.geometry instanceof MeshComponent) {
            const realMesh = this.geometry.getRealMesh();
            if (realMesh !== null && realMesh instanceof THREE.Mesh) {
              mesh.morphTargetInfluences = realMesh.morphTargetInfluences;
              mesh.morphTargetDictionary = realMesh.morphTargetDictionary;
            }
          }
        }
        if (mesh instanceof THREE.Mesh) {
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
                meshStandardMaterialParameters.color = this.getColor(clippingMaterial['color']);
              }
              if (clippingMaterial['metalness'] !== undefined) {
                meshStandardMaterialParameters.metalness = this.getMetalness(clippingMaterial['metalness']);
              }
              if (clippingMaterial['roughness'] !== undefined) {
                meshStandardMaterialParameters.roughness = this.getRoughness(clippingMaterial['roughness']);
              }
              clippingPlanes.forEach((plane, idx) => {
                const group = this.createPlaneStencilGroup(mesh.geometry, plane, idx + 1);
                object.add(group);
                const materialComponent = this.initLocalComponent('clippingPlanes_' + idx, new MaterialComponent(null));
                materialComponent.updateInputParams(
                  Object.assign(meshStandardMaterialParameters, {
                    clippingPlanes: clippingPlanes.filter((p) => p !== plane),
                  })
                );
                const planeMat = materialComponent.getMaterial();
                const po = new THREE.Mesh(planeGeom, planeMat);
                po.onBeforeRender = () => {
                  plane.coplanarPoint(po.position);
                  const position = po.position;
                  po.lookAt(position.x - plane.normal.x, position.y - plane.normal.y, position.z - plane.normal.z);
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
          if (ThreeUtil.isNotNull(this.compressPositions) && this.compressPositions) {
            GeometryCompressionUtils.compressPositions(mesh);
          }
          if (ThreeUtil.isNotNull(this.compressNormals) && this.compressNormals !== 'None') {
            GeometryCompressionUtils.compressNormals(mesh, this.compressNormals);
          }
          if (ThreeUtil.isNotNull(this.compressNormals) && this.compressUvs) {
            GeometryCompressionUtils.compressUvs(mesh);
          }
        }
      }
      this.mesh = mesh;
      this.setObject3d(this.mesh);
    }
  }

  private createPlaneStencilGroup(geometry: THREE.BufferGeometry, plane: THREE.Plane, renderOrder: number): THREE.Group {
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

  public helperComponent: HelperComponent = null;

  resetHelper() {
    if (this.mesh !== null) {
      if (ThreeUtil.isNotNull(this.helperType)) {
        if (this.helperComponent === null) {
          this.helperComponent = this.initLocalComponent('helper', new HelperComponent());
        }
        this.helperComponent.updateInputParams(this.helperOptions, true, {}, this.helperType);
        this.helperComponent.setParent(this.mesh);
      } else if (this.helperComponent !== null) {
        this.helperComponent.ngOnDestroy();
        this.helperComponent = null;
      }
    }
  }
}
