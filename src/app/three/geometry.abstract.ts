import { AfterContentInit, Component, ContentChildren, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { EdgeSplitModifier } from 'three/examples/jsm/modifiers/EdgeSplitModifier';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { GeometryUtils } from './geometry/geometryUtils';
import { ThreeUtil, ThreeVector } from './interface';
import { PositionComponent } from './position/position.component';
import { RotationComponent } from './rotation/rotation.component';
import { ScaleComponent } from './scale/scale.component';
import { AbstractSubscribeComponent } from './subscribe.abstract';
import { TranslationComponent } from './translation/translation.component';

export type AttrBufferAttribute = number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute;

export interface GeometriesParametric {
  (u: number, v: number, target?: any): ThreeVector;
}

export interface MeshGeometry {
  geometry: THREE.BufferGeometry;
  userData?: any;
  material?: THREE.Material | THREE.Material[];
  updateMorphTargets?: () => void;
  computeLineDistances?: () => void;
}

@Component({
  template: '',
})
export abstract class AbstractGeometryComponent extends AbstractSubscribeComponent implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  /**
   *
   */
  @Input() private name: string = null;

  /**
   *
   */
  @Input() private align: string = null;

  /**
   *
   */
  @Input() private center: boolean = false;

  /**
   *
   */
  @Input() private computeVertexNormals: boolean = false;

  /**
   *
   */
  @Input() private computeBoundingBox: boolean = false;

  /**
   *
   */
  @Input() private computeBoundingSphere: boolean = false;

  /**
   *
   */
  @Input() private computeTangents: boolean = false;

  /**
   *
   */
  @Input() protected scale: number = null;

  /**
   *
   */
  @Input() private sphereScale: number = null;

  /**
   *
   */
  @Input() private attributes: { [key: string]: AttrBufferAttribute } = null;

  /**
   *
   */
  @Input() private morphAttributes: { [key: string]: AttrBufferAttribute[] } = null;

  /**
   *
   */
  @Input() private autoDisplacement: boolean = null;

  /**
   *
   */
  @Input() private autoDisplacementSize: number = 3;

  /**
   *
   */
  @Input() private autoCustomColor: boolean = null;

  /**
   *
   */
  @Input() private autoCustomColorSize: number = 3;

  /**
   *
   */
  @Input() private autoCustomColorKey: string = null;

  /**
   *
   */
  @Input() private autoSize: boolean = null;

  /**
   *
   */
  @Input() private autoSizeSize: number = 1;

  /**
   *
   */
  @Input() protected attrPosition: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrPositionUsage: string = null;

  /**
   *
   */
  @Input() private attrUv: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrUvUsage: string = null;

  /**
   *
   */
  @Input() private attrTextureIndex: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrTextureIndexUsage: string = null;

  /**
   *
   */
  @Input() private attrVertColor: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrVisible: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private vertexBuffer: Float32Array | THREE.InterleavedBuffer | number[] = null;

  /**
   *
   */
  @Input() private vertexBufferStride: number = null;

  /**
   *
   */
  @Input() private attrOffset: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrOffsetUsage: string = null;

  /**
   *
   */
  @Input() private attrTranslate: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrTranslateUsage: string = null;

  /**
   *
   */
  @Input() private attrOrientationStart: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrOrientationStartUsage: string = null;

  /**
   *
   */
  @Input() private attrOrientationEnd: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrOrientationEndUsage: string = null;

  /**
   *
   */
  @Input() private attrNormal: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrNormalUsage: string = null;

  /**
   *
   */
  @Input() private attrNormalNormalized: boolean = false;

  /**
   *
   */
  @Input() protected attrColor: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrColorUsage: string = null;

  /**
   *
   */
  @Input() private attrColorSize: number = null;

  /**
   *
   */
  @Input() private attrColorKey: string = null;

  /**
   *
   */
  @Input() private attrColorNormalized: boolean = false;

  /**
   *
   */
  @Input() private attrCustomColor: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrCustomColorUsage: string = null;

  /**
   *
   */
  @Input() private attrSize: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrSizeUsage: string = null;

  /**
   *
   */
  @Input() private attrScale: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrScaleUsage: string = null;

  /**
   *
   */
  @Input() private attrIndex: AttrBufferAttribute = null;

  /**
   *
   */
  @Input() private attrIndexUsage: string = null;

  /**
   *
   */
  @Input() private toNonIndexed: boolean = null;

  /**
   *
   */
  @Input() private flipY: boolean = null;

  /**
   *
   */
  @Input() private mergeVertices: boolean = null;

  /**
   *
   */
  @Input() private edgeSplit: boolean = null;

  /**
   *
   */
  @Input() private cutOffAngle: number = null;

  /**
   *
   */
  @Input() private tryKeepNormals: boolean = null;

  /**
   *
   */
  @Input() private simplify: boolean = null;

  /**
   *
   */
  @Input() private count: number = null;

  /**
   *
   */
  @Input() private tessellate: boolean = null;

  /**
   *
   */
  @Input() private maxEdgeLength: number = null;

  /**
   *
   */
  @Input() private maxIterations: number = null;

  /**
   *
   */
  @Input() private program: string = null;

  /**
   *
   */
  @Input() private programParam: any = null;

  /**
   *
   */
  @Input() private onInit: (geometry: THREE.BufferGeometry) => void = null;

  /**
   *
   */
  @ContentChildren(TranslationComponent, { descendants: false }) private translationList: QueryList<TranslationComponent>;

  /**
   *
   */
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;

  /**
   *
   */
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;

  /**
   *
   */
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;

  /**
   *
   */
  protected GEOMETRY_ATTR: string[] = ['name', 'align'];

  constructor() {
    super();
    this.GEOMETRY_ATTR.push(...this.OBJECT_ATTR);
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   *
   * @param subscribeType
   */
  ngOnInit(subscribeType?: string): void {
    super.ngOnInit(subscribeType || 'geometry');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
    if (this.geometry != null) {
      this.geometry.dispose();
    }
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
    if (changes && this.geometry !== null) {
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.translationList, 'translationList', 'translation');
    this.subscribeListQueryChange(this.scaleList, 'scaleList', 'scale');
    this.subscribeListQueryChange(this.rotationList, 'rotationList', 'rotation');
    this.subscribeListQueryChange(this.positionList, 'positionList', 'position');
    super.ngAfterContentInit();
  }

  protected getMorphAttributes(): { key: string; value: THREE.BufferAttribute[] }[] {
    const attributes: { key: string; value: THREE.BufferAttribute[] }[] = [];
    if (ThreeUtil.isNotNull(this.morphAttributes)) {
      Object.entries(this.morphAttributes).forEach(([key, value]) => {
        switch (key) {
          case 'position':
          case 'color':
          case 'normal':
          case 'customColor':
          default:
            const valueList: THREE.BufferAttribute[] = [];
            value.forEach((val) => {
              valueList.push(this.getAttribute(val, 3));
            });
            attributes.push({ key: key, value: valueList });
            break;
        }
      });
    }
    return attributes;
  }

  protected getAttributes(colorType: string = ''): { key: string; value: THREE.BufferAttribute }[] {
    const attributes = [];
    if (ThreeUtil.isNotNull(this.attrPosition)) {
      attributes.push({
        key: 'position',
        value: this.getAttribute(this.attrPosition, 3, this.attrPositionUsage),
      });
    }
    if (ThreeUtil.isNotNull(this.attrColor)) {
      if (colorType == 'instanced') {
        attributes.push({
          key: ThreeUtil.getTypeSafe(this.attrColorKey, 'color'),
          value: this.getAttribute(this.attrColor, ThreeUtil.getTypeSafe(this.attrColorSize, 4), this.attrColorUsage, 'instanced', this.attrColorNormalized),
        });
      } else {
        attributes.push({
          key: ThreeUtil.getTypeSafe(this.attrColorKey, 'color'),
          value: this.getAttribute(this.attrColor, ThreeUtil.getTypeSafe(this.attrColorSize, 3), this.attrColorUsage, 'float', this.attrColorNormalized),
        });
      }
    } else if (ThreeUtil.isNotNull(this.attrVertColor)) {
      attributes.push({
        key: 'vertColor',
        value: this.getAttribute(this.attrVertColor, ThreeUtil.getTypeSafe(this.attrColorSize, 3), this.attrColorUsage, 'float', this.attrColorNormalized),
      });
    }
    if (ThreeUtil.isNotNull(this.attrVisible)) {
      attributes.push({
        key: 'visible',
        value: this.getAttribute(this.attrVisible, 1),
      });
    }
    if (ThreeUtil.isNotNull(this.attrOffset)) {
      attributes.push({
        key: 'offset',
        value: this.getAttribute(this.attrOffset, 3, this.attrOffsetUsage, 'instanced'),
      });
    }
    if (ThreeUtil.isNotNull(this.attrTranslate)) {
      attributes.push({
        key: 'translate',
        value: this.getAttribute(this.attrTranslate, 3, this.attrTranslateUsage, 'instanced'),
      });
    }
    if (ThreeUtil.isNotNull(this.attrOrientationStart)) {
      attributes.push({
        key: 'orientationStart',
        value: this.getAttribute(this.attrOrientationStart, 4, this.attrOrientationStartUsage, 'instanced'),
      });
    }
    if (ThreeUtil.isNotNull(this.attrOrientationEnd)) {
      attributes.push({
        key: 'orientationEnd',
        value: this.getAttribute(this.attrOrientationEnd, 4, this.attrOrientationEndUsage, 'instanced'),
      });
    }
    if (ThreeUtil.isNotNull(this.attrNormal)) {
      attributes.push({
        key: 'normal',
        value: this.getAttribute(this.attrNormal, 3, this.attrNormalUsage, 'float', this.attrNormalNormalized),
      });
    }
    if (ThreeUtil.isNotNull(this.attrCustomColor)) {
      attributes.push({
        key: 'customColor',
        value: this.getAttribute(this.attrCustomColor, 3, this.attrCustomColorUsage),
      });
    }
    if (ThreeUtil.isNotNull(this.attrSize)) {
      attributes.push({
        key: 'size',
        value: this.getAttribute(this.attrSize, 1, this.attrSizeUsage),
      });
    }
    if (ThreeUtil.isNotNull(this.attrScale)) {
      attributes.push({
        key: 'scale',
        value: this.getAttribute(this.attrScale, 1, this.attrScaleUsage),
      });
    }
    if (ThreeUtil.isNotNull(this.attrIndex)) {
      attributes.push({
        key: 'index',
        value: this.getAttribute(this.attrIndex, 1, this.attrIndexUsage, 'int'),
      });
    }
    if (ThreeUtil.isNotNull(this.attrTextureIndex)) {
      attributes.push({
        key: 'textureIndex',
        value: this.getAttribute(this.attrTextureIndex, 1, this.attrTextureIndexUsage, 'int'),
      });
    }
    if (ThreeUtil.isNotNull(this.attrUv)) {
      attributes.push({
        key: 'uv',
        value: this.getAttribute(this.attrUv, 2, this.attrUvUsage),
      });
    }
    if (ThreeUtil.isNotNull(this.vertexBuffer)) {
      let vertexBuffer: THREE.InterleavedBuffer = null;
      if (this.vertexBuffer instanceof THREE.InterleavedBuffer) {
        vertexBuffer = this.vertexBuffer;
      } else if (this.vertexBuffer instanceof Float32Array) {
        vertexBuffer = new THREE.InterleavedBuffer(this.vertexBuffer, ThreeUtil.getTypeSafe(this.vertexBufferStride, 8));
      } else {
        vertexBuffer = new THREE.InterleavedBuffer(new Float32Array(this.vertexBuffer), ThreeUtil.getTypeSafe(this.vertexBufferStride, 8));
      }
      attributes.push({ key: 'position', value: new THREE.InterleavedBufferAttribute(vertexBuffer, 3, 0) });
      attributes.push({ key: 'uv', value: new THREE.InterleavedBufferAttribute(vertexBuffer, 2, 4) });
    }

    if (ThreeUtil.isNotNull(this.attributes)) {
      Object.entries(this.attributes).forEach(([key, value]) => {
        switch (key) {
          case 'size':
            attributes.push({ key: key, value: this.getAttribute(value, 1) });
            break;
          case 'index':
            attributes.push({ key: key, value: this.getAttribute(value, 1, this.attrIndexUsage, 'int') });
            break;
          case 'textureIndex':
            attributes.push({ key: key, value: this.getAttribute(value, 1, this.attrTextureIndexUsage, 'int') });
            break;
          case 'offset':
            attributes.push({
              key: 'offset',
              value: this.getAttribute(value, 3, null, 'instanced'),
            });
          case 'orientationStart':
          case 'orientationEnd':
            attributes.push({ key: key, value: this.getAttribute(value, 4, null, 'instanced') });
            break;
          case 'uv':
            attributes.push({ key: key, value: this.getAttribute(value, 2, this.attrUvUsage) });
            break;
          case 'position':
            attributes.push({ key: key, value: this.getAttribute(value, 3) });
            break;
          case 'color':
            attributes.push({ key: key, value: this.getAttribute(value, 3, this.attrColorUsage) });
            break;
          case 'normal':
            attributes.push({ key: key, value: this.getAttribute(value, 3, this.attrNormalUsage, null, this.attrNormalNormalized) });
            break;
          case 'customColor':
            attributes.push({ key: key, value: this.getAttribute(value, 3, this.attrCustomColorUsage) });
            break;
          default:
            attributes.push({ key: key, value: this.getAttribute(value, 3) });
            break;
        }
      });
    }
    return attributes;
  }

  protected getAttribute(value: AttrBufferAttribute, itemSize: number, usage?: string, bufferType?: string, normalized?: boolean): THREE.BufferAttribute {
    if (value instanceof THREE.BufferAttribute) {
      return value;
    }
    const attribute = ThreeUtil.getTypeSafe(value, []);
    let bufferAttribute: THREE.BufferAttribute = null;
    if (attribute instanceof THREE.BufferAttribute) {
      return attribute;
    } else if (attribute instanceof Int8Array) {
      bufferAttribute = new THREE.Int8BufferAttribute(attribute, itemSize);
    } else if (attribute instanceof Int16Array) {
      bufferAttribute = new THREE.Int16BufferAttribute(attribute, itemSize);
    } else if (attribute instanceof Int32Array) {
      bufferAttribute = new THREE.Int32BufferAttribute(attribute, itemSize);
    } else if (attribute instanceof Uint8Array) {
      bufferAttribute = new THREE.Uint8BufferAttribute(attribute, itemSize);
    } else if (attribute instanceof Uint16Array) {
      bufferAttribute = new THREE.Uint16BufferAttribute(attribute, itemSize);
    } else if (attribute instanceof Uint32Array) {
      bufferAttribute = new THREE.Uint32BufferAttribute(attribute, itemSize);
    } else if (attribute instanceof Float32Array) {
      bufferAttribute = new THREE.Float32BufferAttribute(attribute, itemSize);
    } else if (attribute instanceof Float64Array) {
      bufferAttribute = new THREE.Float64BufferAttribute(attribute, itemSize);
    } else {
      switch ((bufferType || 'float').toLowerCase()) {
        case 'int':
          const intArray = new Uint32Array(attribute.length);
          attribute.forEach((v, i) => {
            intArray[i] = v;
          });
          bufferAttribute = new THREE.Uint32BufferAttribute(intArray, itemSize);
          break;
        case 'instanced':
          const instancedFloatArray = new Float32Array(attribute.length);
          attribute.forEach((v, i) => {
            instancedFloatArray[i] = v;
          });
          bufferAttribute = new THREE.InstancedBufferAttribute(instancedFloatArray, itemSize);
          break;
        case 'float':
        default:
          if (ThreeUtil.isNotNull(normalized) && normalized) {
            const normalizedIntArray = new Uint8Array(attribute.length);
            attribute.forEach((v, i) => {
              normalizedIntArray[i] = v;
            });
            bufferAttribute = new THREE.Uint8BufferAttribute(normalizedIntArray, itemSize);
            bufferAttribute.normalized = true;
          } else {
            const floatArray = new Float32Array(attribute.length);
            attribute.forEach((v, i) => {
              floatArray[i] = v;
            });
            bufferAttribute = new THREE.Float32BufferAttribute(floatArray, itemSize);
          }
      }
    }
    if (bufferAttribute !== null && ThreeUtil.isNotNull(usage)) {
      switch (usage.toLowerCase()) {
        case 'staticdrawusage':
        case 'staticdraw':
          bufferAttribute.setUsage(THREE.StaticDrawUsage);
          break;
        case 'dynamicdrawusage':
        case 'dynamicdraw':
          bufferAttribute.setUsage(THREE.DynamicDrawUsage);
          break;
        case 'streamdrawusage':
        case 'streamdraw':
          bufferAttribute.setUsage(THREE.StreamDrawUsage);
          break;
        case 'staticreadusage':
        case 'staticread':
          bufferAttribute.setUsage(THREE.StaticReadUsage);
          break;
        case 'dynamicreadusage':
        case 'dynamicread':
          bufferAttribute.setUsage(THREE.DynamicReadUsage);
          break;
        case 'streamreadusage':
        case 'streamread':
          bufferAttribute.setUsage(THREE.StreamReadUsage);
          break;
        case 'staticcopyusage':
        case 'staticcopy':
          bufferAttribute.setUsage(THREE.StaticCopyUsage);
          break;
        case 'dynamiccopyusage':
        case 'dynamiccopy':
          bufferAttribute.setUsage(THREE.DynamicCopyUsage);
          break;
        case 'streamcopyusage':
        case 'streamcopy':
          bufferAttribute.setUsage(THREE.StreamCopyUsage);
          break;
      }
    }
    bufferAttribute.needsUpdate = true;
    return bufferAttribute;
  }
  
  private _meshGeometry: MeshGeometry = null;

  static isMeshGeometry(mesh: any): boolean {
    if (mesh instanceof THREE.Mesh || mesh instanceof THREE.Points || mesh instanceof THREE.Line || mesh instanceof THREE.Sprite) {
      return true;
    } else {
      return false;
    }
  }

  static getMeshGeometry(mesh: any): MeshGeometry {
    if (this.isMeshGeometry(mesh)) {
      return mesh;
    }
    const object3d = ThreeUtil.getObject3d(mesh, false) as any;
    if (object3d !== null) {
      if (this.isMeshGeometry(object3d)) {
        return object3d;
      }
      if (object3d instanceof THREE.Group) {
        let childMesh: MeshGeometry = null;
        mesh.children.forEach((child) => {
          if (childMesh === null && this.isMeshGeometry(child)) {
            childMesh = child;
          }
        });
        if (childMesh !== null) {
          return childMesh;
        }
      }
    }
    return null;
  }

  setMesh(meshGeometry: MeshGeometry) {
    if (this.geometry === null) {
      this.getGeometry();
    }
    if (ThreeUtil.isNotNull(meshGeometry)) {
      this._meshGeometry = meshGeometry;
      this.synkMesh(this.geometry);
    }
  }

  protected synkMesh(geometry: THREE.BufferGeometry = null) {
    if (ThreeUtil.isNotNull(geometry) && this.enabled) {
      if (ThreeUtil.isNotNull(this._meshGeometry)) {
        if (this.isIdEuals(this._meshGeometry.userData.geometry)) {
          this._meshGeometry.userData.geometry = this.id;
          if (this._meshGeometry instanceof THREE.Line) {
            if (this.geometry.getIndex() === null) {
              this._meshGeometry.computeLineDistances();
            }
          }
          if (this._meshGeometry instanceof THREE.LineSegments) {
            if (this._meshGeometry.geometry !== this.geometry) {
              const threeComponent = ThreeUtil.getThreeComponent(this._meshGeometry);
              if (threeComponent !== null) {
                threeComponent.needUpdate = true;
              }
            }
          } else {
            this._meshGeometry.geometry = this.geometry;
          }
          if (ThreeUtil.isNotNull(this._meshGeometry.updateMorphTargets)) {
            this._meshGeometry.updateMorphTargets();
          }
          ThreeUtil.setSubscribeNext(this._meshGeometry, this.subscribeType);
        }
      } else if (this.geometry !== geometry) {
        this.geometry = geometry;
      }
    }
  }

  protected geometry: THREE.BufferGeometry = null;

  protected setGeometry(geometry: THREE.BufferGeometry) {
    if (ThreeUtil.isNotNull(geometry) && this.geometry !== geometry) {
      if (this.geometry !== null) {
        this.geometry.dispose();
      }
      if (ThreeUtil.isNotNull(geometry.getAttribute('position'))) {
        if (ThreeUtil.isNotNull(this.program)) {
          GeometryUtils.getGeometry(this.program, geometry, this.programParam);
        }
        if (this.center) {
          geometry.center();
        }
        if (ThreeUtil.isNotNull(this.translationList) && this.translationList.length > 0) {
          this.translationList.forEach((translation) => {
            const matrix = translation.getTranslation();
            geometry.applyMatrix4(matrix);
          });
        }
        if (ThreeUtil.isNotNull(this.rotationList) && this.rotationList.length > 0) {
          this.rotationList.forEach((rotation) => {
            const euler = rotation.getRotation();
            geometry.rotateX(euler.x);
            geometry.rotateY(euler.y);
            geometry.rotateZ(euler.z);
          });
        }
        if (ThreeUtil.isNotNull(this.scale)) {
          const geometryScale = ThreeUtil.getTypeSafe(this.scale, 1);
          if (ThreeUtil.isNotNull(geometryScale) && geometryScale > 0) {
            geometry.scale(geometryScale, geometryScale, geometryScale);
          }
        }
        if (ThreeUtil.isNotNull(this.sphereScale)) {
          const sphereScale = ThreeUtil.getTypeSafe(this.sphereScale, 1);
          if (ThreeUtil.isNotNull(sphereScale) && sphereScale > 0) {
            if (geometry.boundingSphere === null) {
              geometry.computeBoundingSphere();
            }
            const scaleFactor = sphereScale / geometry.boundingSphere.radius;
            geometry.scale(scaleFactor, scaleFactor, scaleFactor);
          }
        }
        if (ThreeUtil.isNotNull(this.scaleList) && this.scaleList.length > 0) {
          this.scaleList.forEach((scale) => {
            const vector = scale.getScale();
            geometry.scale(vector.x, vector.y, vector.z);
          });
        }
        if (ThreeUtil.isNotNull(this.positionList) && this.positionList.length > 0) {
          this.positionList.forEach((pos) => {
            const position = pos.getPosition();
            switch (pos.type.toLowerCase()) {
              case 'rotate':
                if (position.x !== 0) {
                  geometry.rotateX(ThreeUtil.getAngleSafe(position.x));
                }
                if (position.y !== 0) {
                  geometry.rotateY(ThreeUtil.getAngleSafe(position.y));
                }
                if (position.z !== 0) {
                  geometry.rotateZ(ThreeUtil.getAngleSafe(position.z));
                }
                break;
              case 'scale':
                geometry.scale(position.x, position.y, position.z);
                break;
              case 'position':
              case 'translate':
              default:
                geometry.translate(position.x, position.y, position.z);
                break;
            }
          });
        }
        if (ThreeUtil.isNotNull(this.morphAttributes)) {
          const attributes = this.getMorphAttributes();
          if (attributes.length > 0) {
            attributes.forEach((attribute) => {
              switch (attribute.key.toLowerCase()) {
                default:
                  geometry.morphAttributes[attribute.key] = attribute.value;
                  break;
              }
            });
          }
        }
        if (ThreeUtil.isNotNull(this.autoDisplacement) && this.autoDisplacement) {
          const itemCount = geometry.attributes.position.count;
          const itemSize = ThreeUtil.getTypeSafe(this.autoDisplacementSize, 3);
          geometry.setAttribute('displacement', new THREE.Float32BufferAttribute(itemCount * itemSize, itemSize));
        }
        if (ThreeUtil.isNotNull(this.autoCustomColor) && this.autoCustomColor) {
          const itemCount = geometry.attributes.position.count;
          const itemSize = ThreeUtil.getTypeSafe(this.autoCustomColorSize, 3);
          geometry.setAttribute(ThreeUtil.getTypeSafe(this.autoCustomColorKey, 'customColor'), new THREE.Float32BufferAttribute(itemCount * itemSize, itemSize));
        }
        if (ThreeUtil.isNotNull(this.autoSize) && this.autoSize) {
          const itemCount = geometry.attributes.position.count;
          const itemSize = ThreeUtil.getTypeSafe(this.autoSizeSize, 1);
          geometry.setAttribute('size', new THREE.Float32BufferAttribute(itemCount * itemSize, itemSize));
        }
        if (this.mergeVertices) {
          geometry = BufferGeometryUtils.mergeVertices(geometry);
        }
        if (this.edgeSplit) {
          const modifier = new EdgeSplitModifier();
          geometry = modifier.modify(geometry, ThreeUtil.getAngleSafe(this.cutOffAngle, 0), ThreeUtil.getTypeSafe(this.tryKeepNormals, false));
        }
        if (this.simplify) {
          const modifier = new SimplifyModifier();
          const count = Math.floor(geometry.attributes.position.count * Math.max(0, Math.min(1, ThreeUtil.getTypeSafe(this.count, 1))));
          geometry = modifier.modify(geometry, count);
          geometry.computeVertexNormals();
        }
        if (this.tessellate) {
          const modifier = new TessellateModifier(ThreeUtil.getTypeSafe(this.maxEdgeLength, 8), ThreeUtil.getTypeSafe(this.maxIterations, 6));
          geometry = modifier.modify(geometry);
        }
        if (this.computeVertexNormals) {
          geometry.computeVertexNormals();
        }
        if (this.computeTangents) {
          geometry.computeTangents();
        }
        if (this.computeBoundingSphere) {
          geometry.computeBoundingSphere();
        }
        if (this.computeBoundingBox) {
          geometry.computeBoundingBox();
        }
        if (this.toNonIndexed) {
          geometry.toNonIndexed();
        }
        if (this.flipY && ThreeUtil.isNotNull(geometry.getAttribute('uv'))) {
          const uv = geometry.attributes.uv;
          for (let i = 0; i < uv.count; i++) {
            uv.setY(i, 1 - uv.getY(i));
          }
        }
      }
      this.geometry = geometry;
      // this.geometry = GeometryUtils.mergeVertices(geometry);
      if (ThreeUtil.isNotNull(this.name)) {
        this.geometry.name = this.name;
      }
      if (ThreeUtil.isNotNull(this.onInit)) {
        this.onInit(this.geometry);
      }
      this.synkMesh(this.geometry);
      super.setObject(this.geometry);
    }
  }

  getGeometry<T extends THREE.BufferGeometry>(): T {
    return this.geometry as T;
  }

  protected applyChanges(changes: string[]) {
    if (this.geometry !== null) {
      if (!ThreeUtil.isOnlyIndexOf(changes, ['name', 'refgeometry', 'align'], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, ['name', 'refgeometry', 'align']);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          case 'name':
            if (ThreeUtil.isNotNull(this.name)) {
              this.geometry.name = ThreeUtil.getTypeSafe(this.name, 'No Name');
            }
            break;
          case 'align':
            if (ThreeUtil.isNotNull(this.align) && ThreeUtil.isNotNull(this.geometry.getAttribute('position'))) {
              this.geometry.center();
              this.geometry.computeBoundingBox();
              const boundingBox = this.geometry.boundingBox;
              const alignSides = ['left', 'center', 'right', 'top', 'middle', 'bottom', 'front', 'back', 'double'];
              const alignGeometry = this.align.toLowerCase();
              alignSides.forEach((side) => {
                if (alignGeometry.indexOf(side) > -1) {
                  switch (side.toLowerCase()) {
                    case 'left':
                      this.geometry.translate(-boundingBox.max.x, 0, 0);
                      break;
                    case 'center':
                      this.geometry.translate(-(boundingBox.max.x + boundingBox.min.x) / 2, 0, 0);
                      break;
                    case 'right':
                      this.geometry.translate(-boundingBox.min.x, 0, 0);
                      break;
                    case 'top':
                      this.geometry.translate(0, -boundingBox.max.y, 0);
                      break;
                    case 'middle':
                      this.geometry.translate(0, -(boundingBox.max.y + boundingBox.min.y) / 2, 0);
                      break;
                    case 'bottom':
                      this.geometry.translate(0, -boundingBox.min.y, 0);
                      break;
                    case 'front':
                      this.geometry.translate(0, 0, -boundingBox.max.z);
                      break;
                    case 'double':
                      this.geometry.translate(0, 0, -(boundingBox.max.z + boundingBox.min.z) / 2);
                      break;
                    case 'back':
                      this.geometry.translate(0, 0, -boundingBox.min.z);
                      break;
                  }
                }
              });
            }
            break;
        }
      });
      super.applyChanges(changes);
    }
  }
}
