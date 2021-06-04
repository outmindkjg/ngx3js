import { Component, ContentChildren, EventEmitter, Input, OnInit, OnDestroy, Output, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';
import { Volume } from 'three/examples/jsm/misc/Volume';
import { EdgeSplitModifier } from 'three/examples/jsm/modifiers/EdgeSplitModifier';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier';
import { TessellateModifier } from 'three/examples/jsm/modifiers/TessellateModifier';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { CurveComponent } from '../curve/curve.component';
import { ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { PositionComponent } from '../position/position.component';
import { RotationComponent } from '../rotation/rotation.component';
import { ScaleComponent } from '../scale/scale.component';
import { ShapeComponent } from '../shape/shape.component';
import { AbstractSubscribeComponent } from '../subscribe.abstract';
import { SvgComponent } from '../svg/svg.component';
import { TranslationComponent } from '../translation/translation.component';
import { PlanePerlinGeometry } from './plane-perlin-geometry';

type AttrBufferAttribute = number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute;

export interface GeometriesParametric {
  (u: number, v: number, target?: any): GeometriesVector3;
}

export interface GeometriesVector3 {
  x: number;
  y: number;
  z?: number;
}

export interface GeometriesFace3 {
  a: number;
  b: number;
  c: number;
}

export interface MeshGeometry {
  geometry: THREE.BufferGeometry;
  material?: THREE.Material | THREE.Material[];
}


@Component({
  selector: 'three-geometry',
  templateUrl: './geometry.component.html',
  styleUrls: ['./geometry.component.scss'],
})
export class GeometryComponent extends AbstractSubscribeComponent implements OnInit, OnDestroy {
  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  @Input() private refer: any = null;
  @Input() private params: any = null;
  @Input() public type: string = 'sphere';
  @Input() private storageName: string = null;
  @Input() private storage2Buffer: boolean = false;
  @Input() private action: string = 'none';
  @Input() private perlinType: string = 'minecraft';
  @Input() private light: string | number = null;
  @Input() private shadow: string | number = null;
  @Input() public name: string = null;
  @Input() private radius: number = null;
  @Input() private radiusSegments: number = null;
  @Input() private radialSegments: number = null;
  @Input() private width: number = null;
  @Input() private widthSegments: number = null;
  @Input() private height: number = null;
  @Input() private heightSegments: number = null;
  @Input() private depth: number = null;
  @Input() private depthSegments: number = null;
  @Input() private quality: number = null;
  @Input() private thetaStart: number = null;
  @Input() private thetaLength: number = null;
  @Input() private thetaSegments: number = null;
  @Input() private radiusTop: number = null;
  @Input() private radiusBottom: number = null;
  @Input() private detail: number = null;
  @Input() private innerRadius: number = null;
  @Input() private outerRadius: number = null;
  @Input() private openEnded: boolean = null;
  @Input() private phiStart: number = null;
  @Input() private phiLength: number = null;
  @Input() private segments: number = null;
  @Input() private phiSegments: number = null;
  @Input() private tube: number = null;
  @Input() private tubularSegments: number = null;
  @Input() private arc: number = null;
  @Input() private p: number = null;
  @Input() private q: number = null;
  @Input() private points: GeometriesVector3[] = null;
  @Input() private shapes: GeometriesVector3[] | THREE.Shape = null;
  @Input() private extrudePath: GeometriesVector3[] = null;
  @Input() private extrudePathType: string = null;
  @Input() private curvePath: GeometriesVector3[] = null;
  @Input() private curvePathType: string = null;
  @Input() private curveType: string = null;
  @Input() private addGroup: boolean = null;

  @Input() private bottom: boolean = null;
  @Input() private lid: boolean = null;
  @Input() private body: boolean = null;
  @Input() private fitLid: boolean = null;
  @Input() private blinn: boolean = null;

  @Input() private uVGenerator: string = null;
  @Input() private pointsGeometry: GeometryComponent = null;
  @Input() private parametric: string | GeometriesParametric | any = null;
  @Input() private slices: number = null;
  @Input() private stacks: number = null;
  @Input() private text: string = null;
  @Input() private textAlign: string = null;
  @Input() private align: string = null;

  @Input() private center: boolean = false;
  @Input() private computeVertexNormals: boolean = false;
  @Input() private computeBoundingBox: boolean = false;
  @Input() private computeBoundingSphere: boolean = false;

  @Input() private font: string = null;
  @Input() private size: number = null;
  @Input() private weight: string = null;
  @Input() private vertices: GeometriesVector3[] = null;
  @Input() private polyVertices: number[] = null;
  @Input() private polyIndices: number[] = null;
  @Input() private colors: (string | number)[] = null;

  @Input() private faces: GeometriesFace3[] = null;
  @Input() private thresholdAngle: number = null;
  @Input() private curveSegments: number = null;
  @Input() private tension: number = null;
  @Input() private steps: number = null;
  @Input() private bevelEnabled: boolean = null;
  @Input() private bevelThickness: number = null;
  @Input() private bevelSize: number = null;
  @Input() private bevelOffset: number = null;
  @Input() private bevelSegments: number = null;
  @Input() private closed: boolean = null;
  @Input() private scale: number = null;
  @Input() private geometryScale: number = null;
  @Input() private sphereScale: number = null;
  @Input() private attributes: { [key: string]: AttrBufferAttribute } = null;
  @Input() private morphAttributes: { [key: string]: AttrBufferAttribute[] } = null;
  @Input() private autoDisplacement: boolean = null;
  @Input() private autoDisplacementSize: number = 3;
  @Input() private autoCustomColor: boolean = null;
  @Input() private autoCustomColorSize: number = 3;
  @Input() private autoCustomColorKey: string = null;
  @Input() private autoSize: boolean = null;
  @Input() private autoSizeSize: number = 1;

  @Input() private attrPosition: AttrBufferAttribute = null;
  @Input() private attrPositionUsage: string = null;

  @Input() private attrUv: AttrBufferAttribute = null;
  @Input() private attrUvUsage: string = null;

  @Input() private attrTextureIndex: AttrBufferAttribute = null;
  @Input() private attrTextureIndexUsage: string = null;

  @Input() private attrVertColor: AttrBufferAttribute = null;

  @Input() private attrVisible: AttrBufferAttribute = null;

  @Input() private instanceCount: number = null;
  @Input() private vertexBuffer: Float32Array | THREE.InterleavedBuffer | number[] = null;
  @Input() private vertexBufferStride: number = null;

  @Input() private attrOffset: AttrBufferAttribute = null;
  @Input() private attrOffsetUsage: string = null;
  @Input() private attrTranslate: AttrBufferAttribute = null;
  @Input() private attrTranslateUsage: string = null;
  @Input() private attrOrientationStart: AttrBufferAttribute = null;
  @Input() private attrOrientationStartUsage: string = null;
  @Input() private attrOrientationEnd: AttrBufferAttribute = null;
  @Input() private attrOrientationEndUsage: string = null;

  @Input() private attrNormal: AttrBufferAttribute = null;
  @Input() private attrNormalUsage: string = null;
  @Input() private attrNormalNormalized: boolean = false;

  @Input() private attrColor: AttrBufferAttribute = null;
  @Input() private attrColorUsage: string = null;
  @Input() private attrColorSize: number = null;
  @Input() private attrColorKey: string = null;
  @Input() private attrColorNormalized: boolean = false;

  @Input() private attrCustomColor: AttrBufferAttribute = null;
  @Input() private attrCustomColorUsage: string = null;
  @Input() private attrSize: AttrBufferAttribute = null;
  @Input() private attrSizeUsage: string = null;
  @Input() private attrScale: AttrBufferAttribute = null;
  @Input() private attrScaleUsage: string = null;
  @Input() private attrIndex: AttrBufferAttribute = null;
  @Input() private attrIndexUsage: string = null;
  @Input() private mesh: THREE.Mesh | any = null;
  @Input() private positionX: number = null;
  @Input() private positionY: number = null;
  @Input() private positionZ: number = null;
  @Input() private orientationX: number = null;
  @Input() private orientationY: number = null;
  @Input() private orientationZ: number = null;
  @Input() private sizeX: number = null;
  @Input() private sizeY: number = null;
  @Input() private sizeZ: number = null;
  @Input() private curve: string = null;
  @Input() private toNonIndexed: boolean = null;
  @Input() private flipY: boolean = null;
  @Input() private refGeometry: any = null;
  @Input() private refType: string = 'targetMesh';
  @Input() private onInit: (geometry: THREE.BufferGeometry) => void = null;
  @Input() private mergeVertices: boolean = null;
  @Input() private edgeSplit: boolean = null;
  @Input() private cutOffAngle: number = null;
  @Input() private tryKeepNormals: boolean = null;
  @Input() private simplify: boolean = null;
  @Input() private count: number = null;
  @Input() private tessellate: boolean = null;
  @Input() private maxEdgeLength: number = null;
  @Input() private maxIterations: number = null;

  @ContentChildren(GeometryComponent, { descendants: false }) private geometryList: QueryList<GeometryComponent>;
  @ContentChildren(ShapeComponent, { descendants: false }) private shapeList: QueryList<ShapeComponent>;
  @ContentChildren(CurveComponent, { descendants: false }) private curveList: QueryList<CurveComponent>;
  @ContentChildren(TranslationComponent, { descendants: false }) private translationList: QueryList<TranslationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
  @ContentChildren(SvgComponent, { descendants: false }) private svgList: QueryList<SvgComponent>;
  @ContentChildren(PositionComponent, { descendants: false }) private positionList: QueryList<PositionComponent>;

  private getRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radius, def);
  }

  private getRadiusSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radiusSegments, this.radialSegments, def);
  }

  private getRadialSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radialSegments, this.radiusSegments, def);
  }

  private getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width, this.height, def);
  }

  private getWidthSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.widthSegments, this.segments, def);
  }

  private getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height, this.width, def);
  }

  private getHeightSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.heightSegments, this.segments, def);
  }

  private getDepth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.depth, this.width, def);
  }

  private getDepthSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.depthSegments, this.segments, def);
  }

  private getQuality(def?: number): number {
    return ThreeUtil.getTypeSafe(this.quality, def);
  }

  private getThetaStart(def?: number): number {
    return ThreeUtil.getAngleSafe(this.thetaStart, def);
  }

  private getThetaLength(def?: number): number {
    return ThreeUtil.getAngleSafe(this.thetaLength, def);
  }

  private getThetaSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.thetaSegments, def);
  }

  private getRadiusTop(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radiusTop, this.radiusBottom, def);
  }

  private getRadiusBottom(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radiusBottom, this.radiusTop, def);
  }

  private getDetail(def?: number): number {
    return ThreeUtil.getTypeSafe(this.detail, def);
  }

  private getInnerRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.innerRadius, def);
  }

  private getOuterRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.outerRadius, def);
  }

  private getOpenEnded(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.openEnded, def);
  }

  private getPhiStart(def?: number): number {
    return ThreeUtil.getAngleSafe(this.phiStart, def);
  }

  private getPhiLength(def?: number): number {
    return ThreeUtil.getAngleSafe(this.phiLength, def);
  }

  private getSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.segments, def);
  }

  private getPhiSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.phiSegments, def);
  }

  private getTube(def?: number): number {
    return ThreeUtil.getTypeSafe(this.tube, def);
  }

  private getTubularSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.tubularSegments, def);
  }

  private getArc(def?: number): number {
    return ThreeUtil.getAngleSafe(this.arc, def);
  }

  private getP(def?: number): number {
    return ThreeUtil.getTypeSafe(this.p, def);
  }

  private getQ(def?: number): number {
    return ThreeUtil.getTypeSafe(this.q, def);
  }

  private getSlices(def?: number): number {
    return ThreeUtil.getTypeSafe(this.slices, def);
  }

  private getStacks(def?: number): number {
    return ThreeUtil.getTypeSafe(this.stacks, def);
  }

  private getText(def?: string): string {
    return ThreeUtil.getTypeSafe(this.text, def);
  }

  private getTextAlign(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textAlign, this.align, def);
  }

  private getFont(def?: string, callBack?: (font: THREE.Font) => void) {
    const font = ThreeUtil.getTypeSafe(this.font, def, 'helvetiker');
    const weight = ThreeUtil.getTypeSafe(this.weight, '');
    this.localStorageService.getFont(callBack, font, weight);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getPointsV3(def: { x: number; y: number; z: number }[]): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    if (this.pointsGeometry !== null) {
      let pointsGeometry = this.pointsGeometry.getGeometry().clone();
      pointsGeometry.deleteAttribute('normal');
      pointsGeometry.deleteAttribute('uv');
      pointsGeometry = BufferGeometryUtils.mergeVertices(pointsGeometry);
      const positionAttribute = pointsGeometry.getAttribute('position');
      for (let i = 0; i < positionAttribute.count; i++) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute(positionAttribute, i);
        points.push(vertex);
      }
    } else if (ThreeUtil.isNotNull(this.text)) {
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(0, 0, 0));
      this.getFont('helvetiker', (font: THREE.Font) => {
        const shapes = font.generateShapes(this.getText('test'), this.getSize(100));
        const points: THREE.Vector2[] = [];
        shapes.forEach((shape) => {
          shape.getPoints().forEach((p) => {
            points.push(p);
          });
          if (shape.holes && shape.holes.length > 0) {
            shape.holes.forEach((hole) => {
              hole.getPoints().forEach((p) => {
                points.push(p);
              });
            });
          }
        });
        if (this.geometry !== null) {
          this.geometry.setFromPoints(points);
          this.synkObject(['align']);
        }
      });
    } else {
      (this.points === null ? def : this.points).forEach((p) => {
        points.push(new THREE.Vector3(p.x, p.y, p.z));
      });
    }
    return points;
  }

  private getPointsV2(def?: GeometriesVector3[]): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];
    (this.points === null ? def : this.points).forEach((p) => {
      points.push(new THREE.Vector2(p.x, p.y));
    });
    return points;
  }

  private getParametric(def: string | GeometriesParametric): (u: number, v: number, dest: THREE.Vector3) => void {
    const parametric = this.parametric === null ? def : this.parametric;
    switch (parametric) {
      case 'mobius3d':
        return ParametricGeometries.mobius3d;
      case 'klein':
        return ParametricGeometries.klein;
      case 'plane':
        return ParametricGeometries.plane(this.getWidth(10), this.getHeight(10), null) as any;
      case 'mobius':
        return ParametricGeometries.mobius;
      default:
        if (parametric !== null) {
          if (typeof parametric === 'function') {
            return (u: number, v: number, dest: THREE.Vector3) => {
              const ov = parametric(u, v, dest);
              if (ov !== null && ov !== undefined) {
                dest.set(ov.x, ov.y, ov.z);
              }
            };
          } else if (typeof parametric.getPoint === 'function') {
            return (u: number, v: number, dest: THREE.Vector3) => {
              const ov = parametric.getPoint(u, v, dest);
              if (ov !== null && ov !== undefined) {
                dest.set(ov.x, ov.y, ov.z);
              }
            };
          }
        }
    }
    return ParametricGeometries.klein;
  }

  private getVertices(def?: GeometriesVector3[]): THREE.Vector3[] {
    const vertices: THREE.Vector3[] = [];
    (this.vertices === null ? def : this.vertices).forEach((p) => {
      vertices.push(new THREE.Vector3(p.x, p.y, p.z));
    });
    return vertices;
  }

  private getPolyVertices(def?: number[]): number[] {
    const vertices: number[] = [];
    (this.polyVertices === null ? def : this.polyVertices).forEach((p) => {
      vertices.push(p);
    });
    return vertices;
  }

  private getPolyIndices(def?: number[]): number[] {
    const indices: number[] = [];
    (this.polyIndices === null ? def : this.polyIndices).forEach((p) => {
      indices.push(p);
    });
    return indices;
  }

  private getColors(def?: (string | number)[]): THREE.Color[] {
    const colors: THREE.Color[] = [];
    (this.colors === null ? def : this.colors).forEach((c) => {
      colors.push(new THREE.Color(c));
    });
    return colors;
  }

  private getThresholdAngle(def?: number): number {
    return ThreeUtil.getTypeSafe(this.thresholdAngle, def);
  }

  private targetMesh: THREE.Mesh = null;

  private getSubGeometry(): THREE.BufferGeometry {
    if (this.targetMesh !== null && this.targetMesh.geometry) {
      return this.targetMesh.geometry;
    } else if (this.refGeometry !== null && this.refType.toLowerCase() === 'geometry') {
      if (this.refGeometry.getGeometry) {
        const geometry = this.refGeometry.getGeometry();
        if (geometry !== null) {
          return geometry;
        }
      }
    } else if (this.geometryList !== null && this.geometryList.length > 0) {
      return this.geometryList.first.getGeometry();
    }
    return new THREE.PlaneGeometry(1, 1, 1, 1);
  }

  private getCurveSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.curveSegments, def);
  }

  private getSteps(def?: number): number {
    return ThreeUtil.getTypeSafe(this.steps, def);
  }

  private getBevelEnabled(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.bevelEnabled, def);
  }

  private getBevelThickness(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelThickness, def);
  }

  private getBevelSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelSize, def);
  }

  private getBevelOffset(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelOffset, def);
  }

  private getBevelSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.bevelSegments, def);
  }

  private getObject3d(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.light, def);
  }

  private getShadow(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.shadow, def);
  }

  private getShapes(onload: (data: THREE.Shape[] | THREE.Shape) => void): void {
    if (ThreeUtil.isNotNull(this.svgList) && this.svgList.length > 0) {
      setTimeout(() => {
        this.svgList.forEach((svg) => {
          svg.getShapes((shapes) => {
            onload(shapes);
          });
        });
      }, 1);
    } else if (ThreeUtil.isNotNull(this.shapes)) {
      if (this.shapes instanceof THREE.Shape) {
        setTimeout(() => {
          onload(this.shapes as THREE.Shape);
        }, 1);
      } else {
        const shapes: THREE.Shape[] = [];
        const shape = new THREE.Shape();
        const vectors: THREE.Vector2[] = [];
        this.shapes.forEach((p) => {
          vectors.push(new THREE.Vector2(p.x, p.y));
        });
        shape.setFromPoints(vectors);
        shapes.push(shape);
        setTimeout(() => {
          onload(shapes);
        }, 1);
      }
    } else if (ThreeUtil.isNotNull(this.text)) {
      this.getFont('helvetiker', (font: THREE.Font) => {
        const shapes = font.generateShapes(this.getText('test'), this.getSize(100));
        onload(shapes);
      });
    } else {
      const shapes: THREE.Shape[] = [];
      if (this.shapeList != null && this.shapeList.length > 0) {
        const shape = new THREE.Shape();
        this.shapeList.forEach((path) => {
          path.getShape(shape);
        });
        shapes.push(shape);
      }
      setTimeout(() => {
        onload(shapes);
      }, 1);
    }
  }

  private getExtrudePath(): THREE.Curve<THREE.Vector3> {
    if (ThreeUtil.isNotNull(this.extrudePath) || ThreeUtil.isNotNull(this.curvePath)) {
      const vectors: THREE.Vector3[] = [];
      if (ThreeUtil.isNotNull(this.extrudePath)) {
        this.extrudePath.forEach((p) => {
          vectors.push(new THREE.Vector3(p.x, p.y, p.z));
        });
      }
      if (ThreeUtil.isNotNull(this.curvePath)) {
        this.curvePath.forEach((p) => {
          vectors.push(new THREE.Vector3(p.x, p.y, p.z));
        });
      }
      switch (ThreeUtil.getTypeSafe(this.extrudePathType, this.curvePathType, 'catmullromcurve3').toLowerCase()) {
        case 'catmullromcurve3':
        default:
          return new THREE.CatmullRomCurve3(vectors, this.getClosed(false), ThreeUtil.getTypeSafe(this.curveType, 'catmullrom'), ThreeUtil.getTypeSafe(this.tension, 0.5));
      }
    }
    return undefined;
  }

  private getUVGenerator(def?: string): THREE.UVGenerator {
    const uVGenerator = ThreeUtil.getTypeSafe(this.uVGenerator, def, '');
    switch (uVGenerator.toLowerCase()) {
      case 'world':
        // return THREE.WorldUVGenerator;
        break;
    }
    return undefined;
  }

  private getClosed(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.closed, def);
  }

  private getScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.scale, def);
  }

  private getSphereScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.sphereScale, def);
  }

  private getGeometryScale(def?: number): number {
    return ThreeUtil.getTypeSafe(this.geometryScale, def);
  }

  private getCurve(def?: string): THREE.Curve<THREE.Vector3> {
    const curve = ThreeUtil.getTypeSafe(this.curve, def, '');
    switch (curve.toLowerCase()) {
      case 'grannyknot':
        return new Curves.GrannyKnot();
      case 'heartcurve':
        return new Curves.HeartCurve(this.getScale());
      case 'vivianicurve':
        return new Curves.VivianiCurve(this.getScale());
      case 'knotcurve':
        return new Curves.KnotCurve();
      case 'helixcurve':
        return new Curves.HelixCurve();
      case 'trefoilknot':
        return new Curves.TrefoilKnot(this.getScale());
      case 'torusknot':
        return new Curves.TorusKnot(this.getScale());
      case 'cinquefoilknot':
        return new Curves.CinquefoilKnot(this.getScale());
      case 'trefoilpolynomialknot':
        return new Curves.TrefoilPolynomialKnot(this.getScale());
      case 'decoratedtorusknot4b':
        return new Curves.DecoratedTorusKnot4b(this.getScale());
      case 'decoratedtorusknot4a':
        return new Curves.DecoratedTorusKnot4a(this.getScale());
      case 'figureeightpolynomialknot':
        return new Curves.FigureEightPolynomialKnot(this.getScale());
      case 'decoratedtorusknot5a':
        return new Curves.DecoratedTorusKnot5a(this.getScale());
      case 'decoratedtorusknot5c':
        return new Curves.DecoratedTorusKnot5c(this.getScale());
      default:
        if (this.curveList !== null && this.curveList.length > 0) {
          return this.curveList.first.getCurve() as THREE.Curve<THREE.Vector3>;
        } else {
          const extrudePath = this.getExtrudePath();
          if (ThreeUtil.isNotNull(extrudePath)) {
            return extrudePath;
          }
        }
        break;
    }
    return new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
  }

  private getAttribute(value: AttrBufferAttribute, itemSize: number, usage?: string, bufferType?: string, normalized?: boolean): THREE.BufferAttribute {
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
    return bufferAttribute;
  }

  private getAttributes(colorType: string = ''): { key: string; value: THREE.BufferAttribute }[] {
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

  private getMorphAttributes(): { key: string; value: THREE.BufferAttribute[] }[] {
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

  private getMesh(def?: THREE.Mesh | any): THREE.Mesh {
    let value = ThreeUtil.getTypeSafe(this.mesh, def);
    let mesh: THREE.Object3D = null;
    if (value.getMesh) {
      mesh = value.getObject3d();
    } else {
      mesh = value;
    }
    while (mesh instanceof THREE.Group) {
      mesh = mesh.children[0];
    }
    if (mesh instanceof THREE.Mesh) {
      return mesh;
    } else if (mesh.children.length > 0 && mesh.children[0] instanceof THREE.Mesh) {
      return mesh.children[0] as THREE.Mesh;
    } else {
      return null;
    }
  }

  private getPositionV3(def?: THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.positionX, this.positionY, this.positionZ, def);
  }

  private getOrientation(def?: THREE.Euler): THREE.Euler {
    return ThreeUtil.getEulerSafe(this.orientationX, this.orientationY, this.orientationZ, def);
  }

  private getSizeV3(def?: THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.sizeX, this.sizeY, this.sizeZ, def);
  }

  ngOnInit(): void {
    super.ngOnInit('geometry');
  }

  ngOnDestroy(): void {
    if (this.geometry !== null) {
      this.geometry.dispose();
    }
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.geometry) {
      this.addChanges(changes);
    }
  }

  ngOnChangesTodo(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes) {
      this.unSubscribeRefer('refGeometry');
      if (changes.refGeometry && this.refGeometry !== null) {
        this.subscribeRefer(
          'refGeometry',
          ThreeUtil.getSubscribe(
            this.refGeometry,
            () => {
              switch (this.refType.toLowerCase()) {
                case 'size':
                  if (this.refGeometry.getStorageSource) {
                    const source = this.refGeometry.getStorageSource();
                    if (source !== null && source instanceof Volume) {
                      this.width = source.xLength;
                      this.height = source.yLength;
                      this.depth = source.zLength;
                      this.needUpdate = true;
                    }
                  }
                  break;
                case 'target':
                case 'targetmesh':
                default:
                  this.targetMesh = ThreeUtil.getMesh(this.refGeometry);
                  this.needUpdate = true;
                  break;
              }
            },
            'geometry'
          )
        );
      }
    }
    if (changes.params) {
      this.updateInputParams(this.params,false);
    }
    this.needUpdate = true;
  }

  ngAfterContentInit(): void {
    this.subscribeListQuery(this.geometryList, 'geometryList', 'geometry');
    this.subscribeListQuery(this.shapeList, 'shapeList', 'shape');
    this.subscribeListQuery(this.curveList, 'curveList', 'curve');
    this.subscribeListQuery(this.translationList, 'translationList', 'translation');
    this.subscribeListQuery(this.scaleList, 'scaleList', 'scale');
    this.subscribeListQuery(this.rotationList, 'rotationList', 'rotation');
    this.subscribeListQuery(this.svgList, 'svgList', 'svg');
    this.subscribeListQuery(this.positionList, 'positionList', 'position');
    super.ngAfterContentInit();
  }

  private geometry: THREE.BufferGeometry = null;

  synkObject(synkTypes: string[]) {
    if (this.geometry !== null) {
      if (ThreeUtil.isIndexOf(synkTypes, 'clearinit')) {
        this.getGeometry();
        return ;
      }
      if (ThreeUtil.isIndexOf(synkTypes, 'type')) {
        this.needUpdate = true;
        return ;
      }
      if (ThreeUtil.isIndexOf(synkTypes, 'init')) {
        synkTypes = ThreeUtil.pushUniq(synkTypes, ['geometry', 'shape', 'curve', 'translation', 'rotation', 'scale', 'align']);
      }
      synkTypes.forEach((synkType) => {
        switch (synkType.toLowerCase()) {
          case 'geometry':
            break;
          case 'shape':
            break;
          case 'curve':
            break;
          case 'translation':
            this.translationList.forEach((translation) => {
              const trans = translation.getTranslation();
              this.geometry.applyMatrix4(trans);
            });
            break;
          case 'rotation':
            this.rotationList.forEach((rotation) => {
              const rotat = rotation.getRotation();
              this.geometry.rotateX(rotat.x);
              this.geometry.rotateY(rotat.y);
              this.geometry.rotateZ(rotat.z);
            });
            break;
          case 'scale':
            const geometryScale = this.getGeometryScale();
            if (ThreeUtil.isNotNull(geometryScale) && geometryScale > 0) {
              this.geometry.scale(geometryScale, geometryScale, geometryScale);
            }
            if (this.geometry.boundingSphere !== null) {
              const sphereScale = this.getSphereScale();
              if (ThreeUtil.isNotNull(sphereScale) && sphereScale > 0) {
                const scaleFactor = sphereScale / this.geometry.boundingSphere.radius;
                this.geometry.scale(scaleFactor, scaleFactor, scaleFactor);
              }
            }
            this.scaleList.forEach((scale) => {
              const sca = scale.getScale();
              this.geometry.scale(sca.x, sca.y, sca.z);
            });
            break;
          case 'align':
            if (this.geometry.boundingSphere !== null) {
              switch (this.getTextAlign('').toLowerCase()) {
                case 'left':
                  break;
                case 'center':
                  this.geometry.translate(-this.geometry.boundingSphere.radius, 0, 0);
                  break;
                case 'right':
                  this.geometry.translate(this.geometry.boundingSphere.radius * 2, 0, 0);
                  break;
              }
            }
            break;
        }
      });
      super.synkObject(synkTypes);
    }
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
    if (this._meshGeometry !== meshGeometry && ThreeUtil.isNotNull(meshGeometry)) {
      this._meshGeometry = meshGeometry;
      if (this.geometry !== null) {
        this._meshGeometry.geometry = this.geometry;
      } else {
        this.getGeometry();
      }
    }
  }

  protected setGeometry(geometry: THREE.BufferGeometry) {
    if (ThreeUtil.isNotNull(geometry) && this.geometry !== geometry) {
      if (this.geometry !== null) {
        this.geometry.dispose();
      }
      if (ThreeUtil.isNotNull(geometry.getAttribute('position'))) {
        if (this.center) {
          geometry.center();
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
        if (this.computeBoundingBox) {
          geometry.computeBoundingBox();
        }
        if (this.computeBoundingSphere || ThreeUtil.isNotNull(this.textAlign)) {
          geometry.computeBoundingSphere();
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
      if (ThreeUtil.isNotNull(this.name)) {
        this.geometry.name = this.name;
      }
      if (ThreeUtil.isNotNull(this.onInit)) {
        this.onInit(this.geometry);
      }
      if (this._meshGeometry !== null) {
        this._meshGeometry.geometry = this.geometry;
      }
      super.setObject(this.geometry);
    }
  }

  private perlinGeometry: PlanePerlinGeometry = null;

  getPerlinGeometry(): PlanePerlinGeometry {
    if (this.perlinGeometry === null) {
      this.perlinGeometry = new PlanePerlinGeometry(this.getWidthSegments(128), this.getDepthSegments(128), this.getQuality(2));
    }
    return this.perlinGeometry;
  }

  getGeometry(): THREE.BufferGeometry {
    if (this.geometry === null || this._needUpdate) {
      this.needUpdate = false;
      let geometry: THREE.BufferGeometry = null;
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getGeometry) {
          geometry = this.refer.getGeometry();
        } else if (this.refer instanceof THREE.BufferGeometry) {
          geometry = this.refer;
        }
      } else if (ThreeUtil.isNotNull(this.storageName)) {
        geometry = new THREE.BufferGeometry();
        this.localStorageService.getGeometry(this.storageName, (loadGeometry, model: THREE.Object3D) => {
          if (model !== null && this.storage2Buffer) {
            let count = 0;
            model.traverse((child: THREE.Mesh) => {
              if (child.isMesh) {
                const buffer = child.geometry.attributes['position'];
                count += buffer.array.length;
              }
            });
            const combined = new Float32Array(count);
            let offset = 0;
            model.traverse((child: THREE.Mesh) => {
              if (child.isMesh) {
                const buffer = child.geometry.attributes['position'];
                combined.set(buffer.array, offset);
                offset += buffer.array.length;
              }
            });
            const positions = new THREE.BufferAttribute(combined, 3);
            const loadGeometry = new THREE.BufferGeometry();
            loadGeometry.setAttribute('position', positions.clone());
            this.setGeometry(loadGeometry);
          } else {
            this.setGeometry(loadGeometry);
          }
        });
      }
      if (geometry === null) {
        switch (this.type.toLowerCase()) {
          case 'buffergeometry':
          case 'customgeometry':
          case 'custom':
          case 'geometry':
          case 'buffer':
            geometry = new THREE.BufferGeometry();
            const attributes = this.getAttributes();
            if (ThreeUtil.isNotNull(attributes) && attributes.length > 0) {
              attributes.forEach((attribute) => {
                switch (attribute.key.toLowerCase()) {
                  case 'index':
                    geometry.setIndex(attribute.value);
                    if (this.addGroup) {
                      geometry.addGroup(0, attribute.value.count);
                    }
                    attribute.value.needsUpdate = true;
                    break;
                  default:
                    geometry.setAttribute(attribute.key, attribute.value);
                    // attribute.value.needsUpdate = true;
                    break;
                }
              });
            } else {
              const points = this.getPointsV3([]);
              if (ThreeUtil.isNotNull(points) && points.length > 0) {
                geometry.setFromPoints(points);
              } else {
                const curve = this.getCurve();
                const curveSegments = this.getCurveSegments(10);
                geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(curveSegments * 3), 3));
                const position = geometry.attributes.position;
                const point = new THREE.Vector3();
                for (let i = 0; i < curveSegments; i++) {
                  const t = i / (curveSegments - 1);
                  curve.getPoint(t, point);
                  position.setXYZ(i, point.x, point.y, point.z);
                }
                position.needsUpdate = true;
              }
            }
            break;
          case 'instancedbuffergeometry':
          case 'instancedbuffer':
          case 'instanced':
            const instancedBufferGeometry = new THREE.InstancedBufferGeometry();
            if (ThreeUtil.isNotNull(this.instanceCount)) {
              instancedBufferGeometry.instanceCount = ThreeUtil.getTypeSafe(this.instanceCount, Infinity);
            }
            const instancedAttributes = this.getAttributes('instanced');
            if (ThreeUtil.isNotNull(instancedAttributes) && instancedAttributes.length > 0) {
              instancedAttributes.forEach((attribute) => {
                switch (attribute.key.toLowerCase()) {
                  case 'index':
                    instancedBufferGeometry.setIndex(attribute.value);
                    attribute.value.needsUpdate = true;
                    break;
                  default:
                    instancedBufferGeometry.setAttribute(attribute.key, attribute.value);
                    attribute.value.needsUpdate = true;
                    break;
                }
              });
            }
            geometry = instancedBufferGeometry;
            break;
          case 'teapotbuffergeometry':
          case 'teapotgeometry':
          case 'teapotbuffer':
          case 'teapot':
            const teapot = new TeapotGeometry(this.getSize(), this.getSegments(), ThreeUtil.getTypeSafe(this.bottom), ThreeUtil.getTypeSafe(this.lid), ThreeUtil.getTypeSafe(this.body), ThreeUtil.getTypeSafe(this.fitLid), ThreeUtil.getTypeSafe(this.blinn));
            geometry = teapot;
            break;
          case 'perlinbuffergeometry':
          case 'perlingeometry':
          case 'perlinbuffer':
          case 'perlin':
            const planePerlin = this.getPerlinGeometry();
            switch (this.perlinType.toLowerCase()) {
              case 'minecraftao':
              case 'minecraft_ao':
                geometry = planePerlin.getMinecraftAo(this.getWidth(100), this.getHeight(100), this.getDepth(100), this.getObject3d(0xffffff), this.getShadow(0x505050));
                break;
              case 'terrain':
                geometry = planePerlin.getTerrain(this.getWidth(100), this.getHeight(100), this.getDepth(100));
                break;
              case 'minecraft':
              default:
                geometry = planePerlin.getMinecraft(this.getWidth(100), this.getHeight(100), this.getDepth(100));
                break;
            }
            break;
          case 'linebuffergeometry':
          case 'linegeometry':
          case 'linebuffer':
          case 'line':
            const lineGeometry = new LineGeometry();
            if (this.attrPosition instanceof Float32Array || this.attrPosition instanceof Array) {
              lineGeometry.setPositions(this.attrPosition);
            }
            if (this.attrColor instanceof Float32Array || this.attrColor instanceof Array) {
              lineGeometry.setColors(this.attrColor);
            }
            geometry = lineGeometry;
            break;
          case 'roundedboxbuffergeometry':
          case 'roundedboxgeometry':
          case 'roundedboxbuffer':
          case 'roundedbox':
            geometry = new RoundedBoxGeometry(this.getWidth(1), this.getHeight(1), this.getDepth(1), this.getSegments(2), this.getRadius(0.1));
            break;
          case 'boxbuffergeometry':
          case 'boxgeometry':
          case 'boxbuffer':
          case 'box':
            geometry = new THREE.BoxGeometry(this.getWidth(1), this.getHeight(1), this.getDepth(1), this.getWidthSegments(1), this.getHeightSegments(1), this.getDepthSegments(1));
            break;
          case 'circlebuffergeometry':
          case 'circlegeometry':
          case 'circlebuffer':
          case 'circle':
            geometry = new THREE.CircleGeometry(this.getRadius(1), this.getSegments(8), this.getThetaStart(0), this.getThetaLength(360));
            break;
          case 'conebuffergeometry':
          case 'conegeometry':
          case 'conebuffer':
          case 'cone':
            geometry = new THREE.ConeGeometry(this.getRadius(1), this.getHeight(1), this.getRadialSegments(8), this.getHeightSegments(1), this.getOpenEnded(false), this.getThetaStart(0), this.getThetaLength(360));
            break;
          case 'cylinderbuffergeometry':
          case 'cylindergeometry':
          case 'cylinderbuffer':
          case 'cylinder':
            geometry = new THREE.CylinderGeometry(this.getRadiusTop(1), this.getRadiusBottom(1), this.getHeight(1), this.getRadialSegments(8), this.getHeightSegments(1), this.getOpenEnded(false), this.getThetaStart(0), this.getThetaLength(360));
            break;
          case 'dodecahedronbuffergeometry':
          case 'dodecahedrongeometry':
          case 'dodecahedronbuffer':
          case 'dodecahedron':
            geometry = new THREE.DodecahedronGeometry(this.getRadius(1), this.getDetail(0));
            break;
          case 'edgesbuffergeometry':
          case 'edgesbuffer':
          case 'edgesgeometry':
          case 'edges':
            geometry = new THREE.EdgesGeometry(this.getSubGeometry(), this.getThresholdAngle(0));
            break;
          case 'mergebuffergeometries':
          case 'mergebuffergeometry':
          case 'mergebuffer':
          case 'merge':
            const geometries: THREE.BufferGeometry[] = [];
            if (this.geometryList !== null && this.geometryList.length > 0) {
              this.geometryList.forEach((geometryComponent) => {
                const geometry = geometryComponent.getGeometry().clone();
                geometry.deleteAttribute('normal');
                geometry.deleteAttribute('uv');
                geometries.push(BufferGeometryUtils.mergeVertices(geometry));
              });
            }
            geometry = BufferGeometryUtils.mergeBufferGeometries(geometries);
            break;
          case 'shapebuffergeometry':
          case 'extrudebuffergeometry':
          case 'extrudegeometry':
          case 'shapegeometry':
          case 'shapebuffer':
          case 'shape':
          case 'extrudebuffer':
          case 'extrude':
            geometry = new THREE.ShapeGeometry([], this.getCurveSegments());
            this.getShapes((shapes) => {
              let shapeGeometry: THREE.BufferGeometry = null;
              switch (this.type.toLowerCase()) {
                case 'shapebuffergeometry':
                case 'shapegeometry':
                case 'shapebuffer':
                case 'shape':
                  shapeGeometry = new THREE.ShapeGeometry(shapes, this.getCurveSegments());
                  break;
                case 'extrudebuffergeometry':
                case 'extrudegeometry':
                case 'extrudebuffer':
                case 'extrude':
                default:
                  shapeGeometry = new THREE.ExtrudeGeometry(shapes, {
                    curveSegments: this.getCurveSegments(),
                    steps: this.getSteps(),
                    depth: this.getDepth(),
                    bevelEnabled: this.getBevelEnabled(),
                    bevelThickness: this.getBevelThickness(),
                    bevelSize: this.getBevelSize(),
                    bevelOffset: this.getBevelOffset(),
                    bevelSegments: this.getBevelSegments(),
                    extrudePath: this.getExtrudePath(),
                    UVGenerator: this.getUVGenerator(),
                  });
                  break;
              }
              this.setGeometry(shapeGeometry);
            });
            break;
          case 'icosahedronbuffergeometry':
          case 'icosahedrongeometry':
          case 'icosahedronbuffer':
          case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(this.getRadius(1), this.getDetail(0));
            break;
          case 'lathebuffergeometry':
          case 'lathegeometry':
          case 'lathebuffer':
          case 'lathe':
            geometry = new THREE.LatheGeometry(this.getPointsV2([]), this.getSegments(12), this.getPhiStart(0), this.getPhiLength(360));
            break;
          case 'octahedronbuffergeometry':
          case 'octahedrongeometry':
          case 'octahedronbuffer':
          case 'octahedron':
            geometry = new THREE.OctahedronGeometry(this.getRadius(1), this.getDetail(0));
            break;
          case 'parametricgeometry':
          case 'parametric':
          case 'parametricbuffergeometry':
          case 'parametricbuffer':
            geometry = new THREE.ParametricBufferGeometry(this.getParametric('mobius3d'), this.getSlices(20), this.getStacks(20));
            break;
          case 'parametrictorusknotgeometry':
          case 'parametrictorusknot':
            geometry = new ParametricGeometries.TorusKnotGeometry(this.getRadius(1), this.getTube(0.4), this.getRadialSegments(64), this.getTubularSegments(8), this.getP(2), this.getQ(3)) as any;
            break;
          case 'parametricspheregeometry':
          case 'parametricsphere':
            geometry = new ParametricGeometries.SphereGeometry(this.getRadius(1), this.getWidthSegments(8), this.getHeightSegments(6)) as any;
            break;
          case 'parametrictubegeometry':
          case 'parametrictube':
            geometry = new ParametricGeometries.TubeGeometry(this.getCurve(), this.getTubularSegments(64), this.getRadius(1), this.getRadiusSegments(8), this.getClosed(false)) as any;
            break;
          case 'parametricbuffergeometry':
          case 'parametricbuffer':
          case 'parametricgeometry':
          case 'parametric':
            geometry = new THREE.ParametricGeometry(this.getParametric('mobius3d'), this.getSlices(20), this.getStacks(10));
            break;
          case 'planebuffergeometry':
          case 'planebuffer':
          case 'planegeometry':
          case 'plane':
            geometry = new THREE.PlaneGeometry(this.getWidth(1), this.getHeight(1), this.getWidthSegments(1), this.getHeightSegments(1));
            break;
          case 'polyhedronbuffergeometry':
          case 'polyhedrongeometry':
          case 'polyhedronbuffer':
          case 'polyhedron':
            geometry = new THREE.PolyhedronGeometry(this.getPolyVertices([]), this.getPolyIndices([]), this.getRadius(1), this.getDetail(0));
            break;
          case 'ringbuffergeometry':
          case 'ringgeometry':
          case 'ringbuffer':
          case 'ring':
            geometry = new THREE.RingGeometry(this.getInnerRadius(0.5), this.getOuterRadius(1), this.getThetaSegments(8), this.getPhiSegments(1), this.getThetaStart(0), this.getThetaLength(360));
            break;
          case 'spherebuffergeometry':
          case 'spheregeometry':
          case 'spherebuffer':
          case 'sphere':
            geometry = new THREE.SphereGeometry(this.getRadius(1), this.getWidthSegments(8), this.getHeightSegments(6), this.getPhiStart(0), this.getPhiLength(360), this.getThetaStart(0), this.getThetaLength(180));
            break;
          case 'tetrahedronbuffergeometry':
          case 'tetrahedrongeometry':
          case 'tetrahedronbuffer':
          case 'tetrahedron':
            geometry = new THREE.TetrahedronGeometry(this.getRadius(1), this.getDetail(0));
            break;
          case 'textbuffergeometry':
          case 'textgeometry':
          case 'textbuffer':
          case 'text':
            geometry = new THREE.BufferGeometry();
            this.getFont('helvetiker', (font: THREE.Font) => {
              const textParameters: THREE.TextGeometryParameters = {
                font: font,
                size: this.getSize(),
                height: this.getHeight(),
                curveSegments: this.getCurveSegments(),
                bevelEnabled: this.getBevelEnabled(),
                bevelThickness: this.getBevelThickness(),
                bevelSize: this.getBevelSize(),
                bevelOffset: this.getBevelOffset(),
                bevelSegments: this.getBevelSegments(),
              };
              switch (this.type.toLowerCase()) {
                case 'textbuffergeometry':
                case 'textgeometry':
                case 'textbuffer':
                case 'text':
                default:
                  this.setGeometry(new THREE.TextBufferGeometry(this.getText('test'), textParameters));
                  break;
              }
            });
            break;
          case 'torusbuffergeometry':
          case 'torusgeometry':
          case 'torusbuffer':
          case 'torus':
            geometry = new THREE.TorusGeometry(this.getRadius(1), this.getTube(0.4), this.getRadialSegments(8), this.getTubularSegments(6), this.getArc(360));
            break;
          case 'torusknotbuffergeometry':
          case 'torusknotgeometry':
          case 'torusknotbuffer':
          case 'torusknot':
            geometry = new THREE.TorusKnotGeometry(this.getRadius(1), this.getTube(0.4), this.getRadialSegments(64), this.getTubularSegments(8), this.getP(2), this.getQ(3));
            break;
          case 'tubebuffergeometry':
          case 'tubegeometry':
          case 'tubebuffer':
          case 'tube':
            geometry = new THREE.TubeGeometry(this.getCurve(), this.getTubularSegments(64), this.getRadius(1), this.getRadiusSegments(8), this.getClosed(false));
            break;
          case 'wireframebuffergeometry':
          case 'wireframegeometry':
          case 'wireframebuffer':
          case 'wireframe':
            geometry = new THREE.WireframeGeometry(this.getSubGeometry());
            break;
          case 'wireframe2buffergeometry':
          case 'wireframe2geometry':
          case 'wireframe2buffer':
          case 'wireframe2':
          case 'wireframebuffergeometry2':
          case 'wireframegeometry2':
          case 'wireframebuffer2':
            geometry = new WireframeGeometry2(this.getSubGeometry());
            break;
          case 'convexbuffergeometry':
          case 'convexgeometry':
          case 'convexbuffer':
          case 'convex':
            geometry = new ConvexGeometry(this.getPointsV3([]));
            break;
          case 'decalbuffergeometry':
          case 'decalgeometry':
          case 'decalbuffer':
          case 'decal':
            geometry = new DecalGeometry(this.getMesh(), this.getPositionV3(), this.getOrientation(), this.getSizeV3());
            break;
          default:
            geometry = new THREE.PlaneGeometry(this.getWidth(1), this.getHeight(1), this.getWidthSegments(1), this.getHeightSegments(1));
            break;
        }
      }
      this.setGeometry(geometry);
    } else if (this._meshGeometry !== null && this._meshGeometry.geometry !== this.geometry) {
      this._meshGeometry.geometry = this.geometry;
    }
    return this.geometry;
  }
}
