import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ConvexGeometry, ConvexBufferGeometry } from 'three/examples/jsm/geometries/ConvexGeometry'
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries'

export interface GeometriesParametric {
  (u: number, v: number, dest: THREE.Vector3): void;
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
  styleUrls: ['./geometry.component.scss']
})
export class GeometryComponent implements OnInit {

  @Input() params: GeometryParams = null;
  @Input() type: string = "sphere";
  @Input() name: string = null;
  @Input() radius: number = null;
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
  @Input() vertices: GeometriesVector3[] = null;
  @Input() faces: GeometriesFace3[] = null;

  constructor() { }

  getRadius(def: number): number {
    return this.radius === null ? def : this.radius;
  }

  getRadialSegments(def: number): number {
    return this.radialSegments === null ? def : this.radialSegments;
  }
  getWidth(def: number): number {
    return this.width === null ? def : this.width;
  }
  getWidthSegments(def: number): number {
    return this.widthSegments === null ? def : this.widthSegments;
  }
  getHeight(def: number): number {
    return this.height === null ? def : this.height;
  }
  getHeightSegments(def: number): number {
    return this.heightSegments === null ? def : this.heightSegments;
  }
  getDepth(def: number): number {
    return this.depth === null ? def : this.depth;
  }
  getDepthSegments(def: number): number {
    return this.depthSegments === null ? def : this.depthSegments;
  }
  getThetaStart(def: number): number {
    return (this.thetaStart === null ? def : this.thetaStart) / 180 * Math.PI;
  }
  getThetaLength(def: number): number {
    return (this.thetaLength === null ? def : this.thetaLength) / 180 * Math.PI;
  }
  getThetaSegments(def: number): number {
    return this.thetaSegments === null ? def : this.thetaSegments;
  }
  getRadiusTop(def: number): number {
    return this.radiusTop === null ? def : this.radiusTop;
  }
  getRadiusBottom(def: number): number {
    return this.radiusBottom === null ? def : this.radiusBottom;
  }
  getDetail(def: number): number {
    return this.detail === null ? def : this.detail;
  }
  getInnerRadius(def: number): number {
    return this.innerRadius === null ? def : this.innerRadius;
  }
  getOuterRadius(def: number): number {
    return this.outerRadius === null ? def : this.outerRadius;
  }
  getOpenEnded(def: boolean): boolean {
    return this.openEnded === null ? def : this.openEnded;
  }
  getPhiStart(def: number): number {
    return (this.phiStart === null ? def : this.phiStart) / 180 * Math.PI;
  }
  getPhiLength(def: number): number {
    return (this.phiLength === null ? def : this.phiLength) / 180 * Math.PI;
  }
  getSegments(def: number): number {
    return this.segments === null ? def : this.segments;
  }
  getPhiSegments(def: number): number {
    return this.phiSegments === null ? def : this.phiSegments;
  }
  getTube(def: number): number {
    return this.tube === null ? def : this.tube;
  }
  getTubularSegments(def: number): number {
    return this.tubularSegments === null ? def : this.tubularSegments;
  }
  getArc(def: number): number {
    return (this.arc === null ? def : this.arc) / 180 * Math.PI;;
  }
  getP(def: number): number {
    return this.p === null ? def : this.p;
  }
  getQ(def: number): number {
    return this.q === null ? def : this.q;
  }
  getSlices(def: number): number {
    return this.slices === null ? def : this.slices;
  }
  getStacks(def: number): number {
    return this.stacks === null ? def : this.stacks;
  }
  getPointsV3(def: { x: number, y: number, z: number }[]): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    (this.points === null ? def : this.points).forEach(p => {
      points.push(new THREE.Vector3(p.x, p.y, p.z))
    });
    return points;
  }

  getPointsV2(def: GeometriesVector3[]): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];
    (this.points === null ? def : this.points).forEach(p => {
      points.push(new THREE.Vector2(p.x, p.y))
    });
    return points;
  }

  getParametric(def: string | GeometriesParametric): GeometriesParametric {
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
    }
    return parametric as GeometriesParametric;
  }

  getVertices(def: GeometriesVector3[]): THREE.Vector3[] {
    const vertices: THREE.Vector3[] = [];
    (this.vertices === null ? def : this.vertices).forEach(p => {
      vertices.push(new THREE.Vector3(p.x, p.y, p.z))
    });
    return vertices;
  }

  getFaces(def: GeometriesVector3[]): THREE.Face3[] {
    const faces: THREE.Face3[] = [];
    (this.faces === null ? def : this.faces).forEach(p => {
      faces.push(new THREE.Face3(p.a, p.b, p.c))
    });
    return faces;
  }

  ngOnInit(): void {
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
            this.points = value as { x: number, y: number, z: number }[];
            break;
          case 'parametric':
            this.parametric = value as (string | GeometriesParametric);
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
    if (this.mesh !== null) {
      if (this.mesh instanceof Array) {
        const geometry = this.getGeometry();
        this.mesh.forEach(mesh => {
          mesh.geometry.dispose();
          mesh.geometry = geometry;
        });
      } else {
        this.mesh.geometry.dispose();
        this.mesh.geometry = this.getGeometry();
      }
    }
  }

  private geometry: THREE.Geometry | THREE.BufferGeometry = null;
  private mesh: { geometry : THREE.Geometry | THREE.BufferGeometry } | { geometry : THREE.Geometry | THREE.BufferGeometry }[] = null;

  setMesh(mesh: { geometry : THREE.Geometry | THREE.BufferGeometry } | { geometry : THREE.Geometry | THREE.BufferGeometry }[]) {
    this.mesh = mesh;
  }

  getGeometry(): THREE.Geometry | THREE.BufferGeometry {
    if (this.geometry === null) {
      switch (this.type.toLowerCase()) {
        case 'custom' :
        case 'geometry' :
          this.geometry = new THREE.Geometry();
          this.geometry.vertices = this.getVertices([]);
          this.geometry.faces = this.getFaces([]);
          this.geometry.computeFaceNormals();
          break;
        case 'boxbuffer':
          this.geometry = new THREE.BoxBufferGeometry(4, 4, 4);
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
          this.geometry = new THREE.CircleBufferGeometry(4, 4, 4);
          break;
        case 'circle':
          this.geometry = new THREE.CircleGeometry(4, 4, 4);
          break;
        case 'conebuffer':
          this.geometry = new THREE.ConeBufferGeometry(4, 4, 4);
          break;
        case 'cone':
          this.geometry = new THREE.ConeGeometry(4, 4, 4);
          break;
        case 'convexbuffer':
          this.geometry = new ConvexBufferGeometry(this.getPointsV3([]));
          break;
        case 'convex':
          this.geometry = new ConvexGeometry(this.getPointsV3([]));
          break;
        case 'lathebuffer':
          this.geometry = new THREE.LatheBufferGeometry(
            this.getPointsV2([]),
            this.getSegments(12),
            this.getPhiStart(0),
            this.getPhiLength(360),
          );
          break;
        case 'lathe':
          this.geometry = new THREE.LatheGeometry(
            this.getPointsV2([]),
            this.getSegments(12),
            this.getPhiStart(0),
            this.getPhiLength(360),
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
        case 'ringbuffer':
          this.geometry = new THREE.RingBufferGeometry(60, 20, 1, 1);
          break;
        case 'ring':
          this.geometry = new THREE.RingGeometry(60, 20, 1, 1);
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
          );;
          break;
        case 'torusknot':
          this.geometry = new THREE.TorusKnotGeometry(
            this.getRadius(1),
            this.getTube(0.4),
            this.getRadialSegments(64),
            this.getTubularSegments(8),
            this.getP(2),
            this.getQ(3)
          );;
          break;
        case 'plane':
        default:
          this.geometry = new THREE.PlaneGeometry(
            this.getWidth(1),
            this.getHeight(1),
            this.getWidthSegments(1),
            this.getHeightSegments(1)
          );
          break;
      }
      if (this.name !== null) {
        this.geometry.name = this.name;
      }
    }
    return this.geometry;
  }
}
