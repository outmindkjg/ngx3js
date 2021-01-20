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
import {
  ConvexGeometry,
  ConvexBufferGeometry,
} from 'three/examples/jsm/geometries/ConvexGeometry';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { ThreeBSP } from 'three-js-csg';

import { CurveComponent } from '../curve/curve.component';
import { ShapeComponent } from '../shape/shape.component';
import { TranslationComponent } from '../translation/translation.component';

export interface GeometriesParametric {
  (u: number, v: number): GeometriesVector3;
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

export interface GeometryParams {
  type?: string;
  radius?: number;
  radialSegments?: number;
  width?: number;
  widthSegments?: number;
  height?: number;
  heightSegments?: number;
  depth?: number;
  depthSegments?: number;
  thetaStart?: number;
  thetaLength?: number;
  thetaSegments?: number;
  radiusTop?: number;
  radiusBottom?: number;
  detail?: number;
  innerRadius?: number;
  openEnded?: boolean;
  outerRadius?: number;
  phiStart?: number;
  phiLength?: number;
  segments?: number;
  phiSegments?: number;
  tube?: number;
  tubularSegments?: number;
  arc?: number;
  p?: number;
  q?: number;
  points?: GeometriesVector3[];
  parametric?: string | GeometriesParametric;
  slices?: number;
  stacks?: number;
  vertices?: GeometriesVector3[];
  faces?: GeometriesFace3[];
}

@Component({
  selector: 'three-geometry',
  templateUrl: './geometry.component.html',
  styleUrls: ['./geometry.component.scss'],
})
export class GeometryComponent implements OnInit {
  @Input() params: GeometryParams = null;
  @Input() type: string = 'sphere';
  @Input() action: string = 'none';
  @Input() name: string = null;
  @Input() radius: number = null;
  @Input() radiusSegments: number = null;
  @Input() radialSegments: number = null;
  @Input() width: number = null;
  @Input() widthSegments: number = null;
  @Input() height: number = null;
  @Input() heightSegments: number = null;
  @Input() depth: number = null;
  @Input() depthSegments: number = null;
  @Input() thetaStart: number = null;
  @Input() thetaLength: number = null;
  @Input() thetaSegments: number = null;
  @Input() radiusTop: number = null;
  @Input() radiusBottom: number = null;
  @Input() detail: number = null;
  @Input() innerRadius: number = null;
  @Input() outerRadius: number = null;
  @Input() openEnded: boolean = null;
  @Input() phiStart: number = null;
  @Input() phiLength: number = null;
  @Input() segments: number = null;
  @Input() phiSegments: number = null;
  @Input() tube: number = null;
  @Input() tubularSegments: number = null;
  @Input() arc: number = null;
  @Input() p: number = null;
  @Input() q: number = null;
  @Input() points: GeometriesVector3[] = null;
  @Input() parametric: string | GeometriesParametric = null;
  @Input() slices: number = null;
  @Input() stacks: number = null;
  @Input() text: string = null;
  @Input() font: string = null;
  @Input() size: number = null;
  @Input() weight: number = null;
  @Input() vertices: GeometriesVector3[] = null;
  @Input() polyVertices: number[] = null;
  @Input() polyIndices: number[] = null;
  @Input() colors: (string | number)[] = null;
  @Input() faces: GeometriesFace3[] = null;
  @Input() thresholdAngle: number = null;
  @Input() curveSegments: number = null;
  @Input() steps: number = null;
  @Input() bevelEnabled: boolean = null;
  @Input() bevelThickness: number = null;
  @Input() bevelSize: number = null;
  @Input() bevelOffset: number = null;
  @Input() bevelSegments: number = null;
  @Input() closed: boolean = null;

  @ContentChildren(GeometryComponent, { descendants: false })
  subGeometry: QueryList<GeometryComponent>;
  @ContentChildren(ShapeComponent, { descendants: false })
  shapes: QueryList<ShapeComponent>;
  @ContentChildren(CurveComponent, { descendants: false })
  curves: QueryList<CurveComponent>;
  @ContentChild(TranslationComponent, { descendants: false })
  translation: TranslationComponent = null;

  constructor() {}

  private getRadius(def: number): number {
    return this.radius === null ? def : this.radius;
  }
  private getRadiusSegments(def: number): number {
    return this.radiusSegments === null ? def : this.radiusSegments;
  }
  private getRadialSegments(def: number): number {
    return this.radialSegments === null ? def : this.radialSegments;
  }
  private getWidth(def: number): number {
    return this.width === null ? def : this.width;
  }
  private getWidthSegments(def: number): number {
    return this.widthSegments === null ? def : this.widthSegments;
  }
  private getHeight(def: number): number {
    return this.height === null ? def : this.height;
  }
  private getHeightSegments(def: number): number {
    return this.heightSegments === null ? def : this.heightSegments;
  }
  private getDepth(def: number): number {
    return this.depth === null ? def : this.depth;
  }
  private getDepthSegments(def: number): number {
    return this.depthSegments === null ? def : this.depthSegments;
  }
  private getThetaStart(def: number): number {
    return ((this.thetaStart === null ? def : this.thetaStart) / 180) * Math.PI;
  }
  private getThetaLength(def: number): number {
    return (
      ((this.thetaLength === null ? def : this.thetaLength) / 180) * Math.PI
    );
  }
  private getThetaSegments(def: number): number {
    return this.thetaSegments === null ? def : this.thetaSegments;
  }
  private getRadiusTop(def: number): number {
    return this.radiusTop === null ? def : this.radiusTop;
  }
  private getRadiusBottom(def: number): number {
    return this.radiusBottom === null ? def : this.radiusBottom;
  }
  private getDetail(def: number): number {
    return this.detail === null ? def : this.detail;
  }
  private getInnerRadius(def: number): number {
    return this.innerRadius === null ? def : this.innerRadius;
  }
  private getOuterRadius(def: number): number {
    return this.outerRadius === null ? def : this.outerRadius;
  }
  private getOpenEnded(def: boolean): boolean {
    return this.openEnded === null ? def : this.openEnded;
  }
  private getPhiStart(def: number): number {
    return ((this.phiStart === null ? def : this.phiStart) / 180) * Math.PI;
  }
  private getPhiLength(def: number): number {
    return ((this.phiLength === null ? def : this.phiLength) / 180) * Math.PI;
  }
  private getSegments(def: number): number {
    return this.segments === null ? def : this.segments;
  }
  private getPhiSegments(def: number): number {
    return this.phiSegments === null ? def : this.phiSegments;
  }
  private getTube(def: number): number {
    return this.tube === null ? def : this.tube;
  }
  private getTubularSegments(def: number): number {
    return this.tubularSegments === null ? def : this.tubularSegments;
  }
  private getArc(def: number): number {
    return ((this.arc === null ? def : this.arc) / 180) * Math.PI;
  }
  private getP(def: number): number {
    return this.p === null ? def : this.p;
  }
  private getQ(def: number): number {
    return this.q === null ? def : this.q;
  }
  private getSlices(def: number): number {
    return this.slices === null ? def : this.slices;
  }
  private getStacks(def: number): number {
    return this.stacks === null ? def : this.stacks;
  }

  private getText(def: string): string {
    return this.text === null ? def : this.text;
  }

  private getFont(def: string, callBack: (font: THREE.Font) => void) {
    const font = this.font === null ? def : this.font;
    const weight = this.weight === null ? '' : this.weight;
    let fontPath: string = '';
    switch ((font + '_' + weight).toLowerCase()) {
      case 'helvetiker_':
      case 'helvetiker_regular':
        fontPath = '/assets/fonts/helvetiker_regular.typeface.json';
        break;
      case 'helvetiker_bold':
        fontPath = '/assets/fonts/helvetiker_bold.typeface.json';
        break;
      case 'gentilis_':
      case 'gentilis_regular':
        fontPath = '/assets/fonts/gentilis_regular.typeface.json';
        break;
      case 'gentilis_bold':
        fontPath = '/assets/fonts/gentilis_bold.typeface.json';
        break;
      case 'optimer_':
      case 'optimer_regular':
        fontPath = '/assets/fonts/optimer_regular.typeface.json';
        break;
      case 'optimer_bold':
        fontPath = '/assets/fonts/optimer_bold.typeface.json';
        break;
      case 'sans_bold':
      case 'droid_sans_bold':
        fontPath = '/assets/fonts/droid/droid_sans_bold.typeface.json';
        break;
      case 'sans_mono_':
      case 'sans_mono_regular':
      case 'sans_mono_bold':
      case 'droid_sans_mono_':
      case 'droid_sans_mono_regular':
      case 'droid_sans_mono_bold':
        fontPath = '/assets/fonts/droid/droid_sans_mono_regular.typeface.json';
        break;
      case 'serif_':
      case 'serif_regular':
      case 'droid_serif_':
      case 'droid_serif_regular':
        fontPath = '/assets/fonts/droid/droid_serif_regular.typeface.json';
        break;
      case 'serif_bold':
      case 'droid_serif_bold':
        fontPath = '/assets/fonts/droid/droid_serif_bold.typeface.json';
        break;
      case 'nanumgothic_':
      case 'nanumgothic_regular':
      case 'nanumgothic_bold':
        fontPath = '/assets/fonts/nanum/nanumgothic_regular.typeface.json';
        break;
      case 'do_hyeon_':
      case 'do_hyeon_regular':
      case 'do_hyeon_bold':
        fontPath = '/assets/fonts/nanum/do_hyeon_regular.typeface.json';
        break;
      case 'sans_':
      case 'sans_regular':
      case 'droid_sans_':
      case 'droid_sans_regular':
      default:
        fontPath = '/assets/fonts/droid/droid_sans_regular.typeface.json';
        break;
    }
    const loader = new THREE.FontLoader();
    loader.load(fontPath, (responseFont: THREE.Font) => {
      callBack(responseFont);
    });
  }

  private getSize(def: number): number {
    return this.size === null ? def : this.size;
  }

  private getPointsV3(
    def: { x: number; y: number; z: number }[]
  ): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    (this.points === null ? def : this.points).forEach((p) => {
      points.push(new THREE.Vector3(p.x, p.y, p.z));
    });
    return points;
  }

  private getPointsV2(def: GeometriesVector3[]): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];
    (this.points === null ? def : this.points).forEach((p) => {
      points.push(new THREE.Vector2(p.x, p.y));
    });
    return points;
  }

  private getParametric(
    def: string | GeometriesParametric
  ): (u: number, v: number, dest: THREE.Vector3) => void {
    const parametric = this.parametric === null ? def : this.parametric;
    switch (parametric) {
      case 'mobius3d':
        return ParametricGeometries.mobius3d;
      case 'klein':
        return ParametricGeometries.klein;
      case 'plane':
        return ParametricGeometries.plane;
      case 'mobius':
        return ParametricGeometries.mobius;
      default:
        if (parametric !== null && typeof parametric === 'function') {
          return (u: number, v: number, dest: THREE.Vector3) => {
            const ov = parametric(u, v);
            dest.set(ov.x, ov.y, ov.z);
          };
        }
    }
    return ParametricGeometries.klein;
  }

  private getVertices(def: GeometriesVector3[]): THREE.Vector3[] {
    const vertices: THREE.Vector3[] = [];
    (this.vertices === null ? def : this.vertices).forEach((p) => {
      vertices.push(new THREE.Vector3(p.x, p.y, p.z));
    });
    return vertices;
  }

  private getPolyVertices(def: number[]): number[] {
    const vertices: number[] = [];
    (this.polyVertices === null ? def : this.polyVertices).forEach((p) => {
      vertices.push(p);
    });
    return vertices;
  }

  private getPolyIndices(def: number[]): number[] {
    const indices: number[] = [];
    (this.polyIndices === null ? def : this.polyIndices).forEach((p) => {
      indices.push(p);
    });
    return indices;
  }

  private getColors(def: (string | number)[]): THREE.Color[] {
    const colors: THREE.Color[] = [];
    (this.colors === null ? def : this.colors).forEach((c) => {
      colors.push(new THREE.Color(c));
    });
    return colors;
  }

  private getFaces(def: GeometriesVector3[]): THREE.Face3[] {
    const faces: THREE.Face3[] = [];
    (this.faces === null ? def : this.faces).forEach((p) => {
      faces.push(new THREE.Face3(p.a, p.b, p.c));
    });
    return faces;
  }

  private getThresholdAngle(def: number): number {
    return this.thresholdAngle === null ? def : this.thresholdAngle;
  }

  private _onChange: {
    onChange(): void;
  } = null;

  setOnChange(onChange: { onChange(): void }) {
    this._onChange = onChange;
  }

  private getSubGeometry(): THREE.Geometry | THREE.BufferGeometry {
    if (this.subGeometry !== null && this.subGeometry.length > 0) {
      return this.subGeometry.first.getGeometry();
    } else {
      return new THREE.PlaneGeometry(1, 1, 1, 1);
    }
  }

  private getCurveSegments(def: number): number {
    return this.curveSegments === null ? def : this.curveSegments;
  }

  private getSteps(def: number): number {
    return this.steps === null ? def : this.steps;
  }

  private getBevelEnabled(def: boolean): boolean {
    return this.bevelEnabled === null ? def : this.bevelEnabled;
  }

  private getBevelThickness(def: number): number {
    return this.bevelThickness === null ? def : this.bevelThickness;
  }

  private getBevelSize(def: number): number {
    return this.bevelSize === null ? def : this.bevelSize;
  }

  private getBevelOffset(def: number): number {
    return this.bevelOffset === null ? def : this.bevelOffset;
  }

  private getBevelSegments(def: number): number {
    return this.bevelSegments === null ? def : this.bevelSegments;
  }

  private getShapes(): THREE.Shape {
    const shape = new THREE.Shape();
    if (this.shapes != null && this.shapes.length > 0) {
      this.shapes.forEach((path) => {
        path.getShape(shape);
      });
    }
    return shape;
  }

  private getClosed(def: boolean): boolean {
    return this.closed === null ? def : this.closed;
  }

  private getCurve(): THREE.Curve<THREE.Vector3> {
    if (this.curves !== null && this.curves.length > 0) {
      this.curves.first.setOnChange(this);
      return this.curves.first.getCurve() as THREE.Curve<THREE.Vector3>;
    }
    return new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    );
  }

  ngOnInit(): void {}

  ngAfterContentInit(): void {
    this.curves.changes.subscribe((e) => {
      this.geometry = null;
      if (this.mesh !== null) {
        this.resetGeometry();
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.geometry = null;
    }
    if (changes.params) {
      Object.entries(this.params).forEach(([key, value]) => {
        switch (key) {
          case 'type':
            this.type = value as string;
            break;
          case 'radius':
            this.radius = value as number;
            break;
          case 'radialSegments':
            this.radialSegments = value as number;
            break;
          case 'width':
            this.width = value as number;
            break;
          case 'widthSegments':
            this.widthSegments = value as number;
            break;
          case 'height':
            this.height = value as number;
            break;
          case 'heightSegments':
            this.heightSegments = value as number;
            break;
          case 'depth':
            this.depth = value as number;
            break;
          case 'depthSegments':
            this.depthSegments = value as number;
            break;
          case 'thetaStart':
            this.thetaStart = value as number;
            break;
          case 'thetaLength':
            this.thetaLength = value as number;
            break;
          case 'thetaSegments':
            this.thetaSegments = value as number;
            break;
          case 'radiusTop':
            this.radiusTop = value as number;
            break;
          case 'radiusBottom':
            this.radiusBottom = value as number;
            break;
          case 'detail':
            this.detail = value as number;
            break;
          case 'innerRadius':
            this.innerRadius = value as number;
            break;
          case 'openEnded':
            this.openEnded = value as boolean;
            break;
          case 'outerRadius':
            this.outerRadius = value as number;
            break;
          case 'phiStart':
            this.phiStart = value as number;
            break;
          case 'phiLength':
            this.phiLength = value as number;
            break;
          case 'segments':
            this.segments = value as number;
            break;
          case 'phiSegments':
            this.phiSegments = value as number;
            break;
          case 'tube':
            this.tube = value as number;
            break;
          case 'tubularSegments':
            this.tubularSegments = value as number;
            break;
          case 'arc':
            this.arc = value as number;
            break;
          case 'p':
            this.p = value as number;
            break;
          case 'q':
            this.q = value as number;
            break;
          case 'points':
            this.points = value as { x: number; y: number; z: number }[];
            break;
          case 'parametric':
            this.parametric = value as string | GeometriesParametric;
            break;
          case 'slices':
            this.slices = value as number;
            break;
          case 'stacks':
            this.stacks = value as number;
            break;
          case 'vertices':
            this.vertices = value as GeometriesVector3[];
            break;
          case 'faces':
            this.faces = value as GeometriesFace3[];
            break;
        }
      });
    }
    this.resetGeometry();
    if (this._onChange !== null) {
      this._onChange.onChange();
    }
  }

  private resetGeometry() {
    if (this.mesh !== null) {
      if (this.mesh instanceof Array) {
        const geometry = this.getGeometry();
        this.mesh.forEach((mesh) => {
          mesh.geometry.dispose();
          mesh.geometry = geometry;
        });
      } else {
        this.mesh.geometry.dispose();
        this.mesh.geometry = this.getGeometry();
      }
    }
  }

  onChange(): void {
    if (this.geometry !== null) {
      this.geometry = null;
      this.resetGeometry();
    }
  }

  private geometry: THREE.Geometry | THREE.BufferGeometry = null;
  private mesh:
    | { geometry: THREE.Geometry | THREE.BufferGeometry }
    | { geometry: THREE.Geometry | THREE.BufferGeometry }[] = null;

  setMesh(
    mesh:
      | { geometry: THREE.Geometry | THREE.BufferGeometry }
      | { geometry: THREE.Geometry | THREE.BufferGeometry }[]
  ) {
    this.mesh = mesh;
  }

  getGeometry(): THREE.Geometry | THREE.BufferGeometry {
    if (this.geometry === null) {
      switch (this.type.toLowerCase()) {
        case 'custom':
        case 'geometry':
          this.geometry = new THREE.Geometry();
          this.geometry.vertices = this.getVertices([]);
          this.geometry.faces = this.getFaces([]);
          this.geometry.colors = this.getColors([]);
          if (this.geometry.faces && this.geometry.faces.length > 0) {
            this.geometry.computeFaceNormals();
          }
          break;
        case 'boxbuffer':
          this.geometry = new THREE.BoxBufferGeometry(
            this.getWidth(1),
            this.getHeight(1),
            this.getDepth(1),
            this.getWidthSegments(1),
            this.getHeightSegments(1),
            this.getDepthSegments(1)
          );
          break;
        case 'box':
          this.geometry = new THREE.BoxGeometry(
            this.getWidth(1),
            this.getHeight(1),
            this.getDepth(1),
            this.getWidthSegments(1),
            this.getHeightSegments(1),
            this.getDepthSegments(1)
          );
          break;
        case 'circlebuffer':
          this.geometry = new THREE.CircleBufferGeometry(
            this.getRadius(1),
            this.getSegments(8),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'circle':
          this.geometry = new THREE.CircleGeometry(
            this.getRadius(1),
            this.getSegments(8),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'conebuffer':
          this.geometry = new THREE.ConeBufferGeometry(
            this.getRadius(1),
            this.getHeight(1),
            this.getRadialSegments(8),
            this.getHeightSegments(1),
            this.getOpenEnded(false),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'cone':
          this.geometry = new THREE.ConeGeometry(
            this.getRadius(1),
            this.getHeight(1),
            this.getRadialSegments(8),
            this.getHeightSegments(1),
            this.getOpenEnded(false),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'cylinderbuffer':
          this.geometry = new THREE.CylinderBufferGeometry(
            this.getRadiusTop(1),
            this.getRadiusBottom(1),
            this.getHeight(1),
            this.getRadialSegments(8),
            this.getHeightSegments(1),
            this.getOpenEnded(false),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'cylinder':
          this.geometry = new THREE.CylinderGeometry(
            this.getRadiusTop(1),
            this.getRadiusBottom(1),
            this.getHeight(1),
            this.getRadialSegments(8),
            this.getHeightSegments(1),
            this.getOpenEnded(false),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'dodecahedronbuffer':
          this.geometry = new THREE.DodecahedronBufferGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'dodecahedron':
          this.geometry = new THREE.DodecahedronGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'edges':
          this.geometry = new THREE.EdgesGeometry(
            this.getSubGeometry(),
            this.getThresholdAngle(0)
          );
          break;
        case 'extrudebuffer':
          this.geometry = new THREE.ExtrudeBufferGeometry(this.getShapes(), {
            curveSegments: this.getCurveSegments(12),
            steps: this.getSteps(1),
            depth: this.getDepth(100),
            bevelEnabled: this.getBevelEnabled(true),
            bevelThickness: this.getBevelThickness(6),
            bevelSize: this.getBevelSize(0),
            bevelOffset: this.getBevelOffset(0),
            bevelSegments: this.getBevelSegments(3),
            // extrudePath: new THREE.Curve<THREE.Vector3>(),
            // UVGenerator: null // THREE.UVGenerator;
          });
          break;
        case 'extrude':
          this.geometry = new THREE.ExtrudeGeometry(this.getShapes(), {
            curveSegments: this.getCurveSegments(12),
            steps: this.getSteps(1),
            depth: this.getDepth(100),
            bevelEnabled: this.getBevelEnabled(true),
            bevelThickness: this.getBevelThickness(6),
            bevelSize: this.getBevelSize(0),
            bevelOffset: this.getBevelOffset(0),
            bevelSegments: this.getBevelSegments(3),
            // extrudePath: new THREE.Curve<THREE.Vector3>(),
            // UVGenerator: null // THREE.UVGenerator;
          });
          break;
        case 'icosahedronbuffer':
          this.geometry = new THREE.IcosahedronBufferGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'icosahedron':
          this.geometry = new THREE.IcosahedronGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'lathebuffer':
          this.geometry = new THREE.LatheBufferGeometry(
            this.getPointsV2([]),
            this.getSegments(12),
            this.getPhiStart(0),
            this.getPhiLength(360)
          );
          break;
        case 'lathe':
          this.geometry = new THREE.LatheGeometry(
            this.getPointsV2([]),
            this.getSegments(12),
            this.getPhiStart(0),
            this.getPhiLength(360)
          );
          break;
        case 'octahedronbuffer':
          this.geometry = new THREE.OctahedronBufferGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'octahedron':
          this.geometry = new THREE.OctahedronGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'parametricbuffer':
          this.geometry = new THREE.ParametricBufferGeometry(
            this.getParametric('mobius3d'),
            this.getSlices(20),
            this.getStacks(10)
          );
          break;
        case 'parametric':
          this.geometry = new THREE.ParametricGeometry(
            this.getParametric('mobius3d'),
            this.getSlices(20),
            this.getStacks(10)
          );
          break;
        case 'planebuffer':
          this.geometry = new THREE.PlaneBufferGeometry(
            this.getWidth(1),
            this.getHeight(1),
            this.getWidthSegments(1),
            this.getHeightSegments(1)
          );
          break;
        case 'plane':
          this.geometry = new THREE.PlaneGeometry(
            this.getWidth(1),
            this.getHeight(1),
            this.getWidthSegments(1),
            this.getHeightSegments(1)
          );
          break;
        case 'polyhedronbuffer':
          this.geometry = new THREE.PolyhedronBufferGeometry(
            this.getPolyVertices([]),
            this.getPolyIndices([]),
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'polyhedron':
          this.geometry = new THREE.PolyhedronGeometry(
            this.getPolyVertices([]),
            this.getPolyIndices([]),
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'ringbuffer':
          this.geometry = new THREE.RingBufferGeometry(
            this.getInnerRadius(0.5),
            this.getOuterRadius(1),
            this.getThetaSegments(8),
            this.getPhiSegments(1),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'ring':
          this.geometry = new THREE.RingGeometry(
            this.getInnerRadius(0.5),
            this.getOuterRadius(1),
            this.getThetaSegments(8),
            this.getPhiSegments(1),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'shapebuffer':
          this.geometry = new THREE.ShapeBufferGeometry(
            this.getShapes(),
            this.getCurveSegments(12)
          );
          break;
        case 'shape':
          this.geometry = new THREE.ShapeGeometry(
            this.getShapes(),
            this.getCurveSegments(12)
          );
          break;
        case 'spherebuffer':
          this.geometry = new THREE.SphereBufferGeometry(
            this.getRadius(50),
            this.getWidthSegments(8),
            this.getHeightSegments(6),
            this.getPhiStart(0),
            this.getPhiLength(360),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'sphere':
          this.geometry = new THREE.SphereGeometry(
            this.getRadius(50),
            this.getWidthSegments(8),
            this.getHeightSegments(6),
            this.getPhiStart(0),
            this.getPhiLength(360),
            this.getThetaStart(0),
            this.getThetaLength(360)
          );
          break;
        case 'tetrahedronbuffer':
          this.geometry = new THREE.TetrahedronBufferGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'tetrahedron':
          this.geometry = new THREE.TetrahedronGeometry(
            this.getRadius(1),
            this.getDetail(0)
          );
          break;
        case 'textbuffer':
        case 'text':
          this.geometry = new THREE.Geometry();
          this.getFont('helvetiker', (font: THREE.Font) => {
            const textParameters: THREE.TextGeometryParameters = {
              font: font,
              size: this.getSize(1),
              height: this.getHeight(1),
              curveSegments: this.getCurveSegments(1),
              bevelEnabled: this.getBevelEnabled(true),
              bevelThickness: this.getBevelThickness(1),
              bevelSize: this.getBevelSize(1),
              bevelOffset: this.getBevelOffset(1),
              bevelSegments: this.getBevelSegments(1),
            };
            switch (this.type.toLowerCase()) {
              case 'textbuffer':
                this.geometry = new THREE.TextBufferGeometry(
                  this.getText('test'),
                  textParameters
                );
                break;
              case 'text':
                this.geometry = new THREE.TextGeometry(
                  this.getText('test'),
                  textParameters
                );
                break;
            }
            if (this.mesh instanceof Array) {
              const geometry = this.geometry;
              this.mesh.forEach((mesh) => {
                mesh.geometry.dispose();
                mesh.geometry = geometry;
              });
            } else {
              this.mesh.geometry.dispose();
              this.mesh.geometry = this.geometry;
            }
          });
          break;
        case 'torusbuffer':
          this.geometry = new THREE.TorusBufferGeometry(
            this.getRadius(1),
            this.getTube(0.4),
            this.getRadialSegments(8),
            this.getTubularSegments(6),
            this.getArc(360)
          );
          break;
        case 'torus':
          this.geometry = new THREE.TorusGeometry(
            this.getRadius(1),
            this.getTube(0.4),
            this.getRadialSegments(8),
            this.getTubularSegments(6),
            this.getArc(360)
          );
          break;
        case 'torusknotbuffer':
          this.geometry = new THREE.TorusKnotBufferGeometry(
            this.getRadius(1),
            this.getTube(0.4),
            this.getRadialSegments(64),
            this.getTubularSegments(8),
            this.getP(2),
            this.getQ(3)
          );
          break;
        case 'torusknot':
          this.geometry = new THREE.TorusKnotGeometry(
            this.getRadius(1),
            this.getTube(0.4),
            this.getRadialSegments(64),
            this.getTubularSegments(8),
            this.getP(2),
            this.getQ(3)
          );
          break;
        case 'tubebuffer':
          this.geometry = new THREE.TubeBufferGeometry(
            this.getCurve(),
            this.getTubularSegments(64),
            this.getRadius(1),
            this.getRadiusSegments(8),
            this.getClosed(false)
          );
          break;
        case 'tube':
          this.geometry = new THREE.TubeGeometry(
            this.getCurve(),
            this.getTubularSegments(64),
            this.getRadius(1),
            this.getRadiusSegments(8),
            this.getClosed(false)
          );
          break;
        case 'wireframe':
          this.geometry = new THREE.WireframeGeometry(this.getSubGeometry());
          break;
        case 'convexbuffer':
          this.geometry = new ConvexBufferGeometry(this.getPointsV3([]));
          break;
        case 'convex':
          this.geometry = new ConvexGeometry(this.getPointsV3([]));
          break;
        default:
          this.geometry = new THREE.PlaneGeometry(
            this.getWidth(1),
            this.getHeight(1),
            this.getWidthSegments(1),
            this.getHeightSegments(1)
          );
          break;
      }
      if (this.translation !== null && this.translation !== undefined) {
        this.translation.setTranslation(this.geometry);
      }
      if (this.name !== null) {
        this.geometry.name = this.name;
      }
      if (this.subGeometry !== null && this.subGeometry.length > 0) {
        let lastBSP: ThreeBSP = new ThreeBSP(this.geometry);
        this.subGeometry.forEach((subGeometry) => {
          subGeometry.setOnChange(this);
          switch (subGeometry.action.toLowerCase()) {
            case 'subtract':
              lastBSP = lastBSP.subtract(
                new ThreeBSP(subGeometry.getGeometry())
              );
              break;
            case 'intersect':
              lastBSP = lastBSP.intersect(
                new ThreeBSP(subGeometry.getGeometry())
              );
              break;
            case 'union':
              lastBSP = lastBSP.union(new ThreeBSP(subGeometry.getGeometry()));
              break;
            case 'none':
            default:
              break;
          }
        });
        this.geometry = lastBSP.toMesh();
      }
    }
    return this.geometry;
  }
}
