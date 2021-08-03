import { Component, ContentChildren, forwardRef, Input, OnDestroy, OnInit, QueryList, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry';
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { CurveComponent } from '../curve/curve.component';
import { CurveUtils } from '../curve/curveUtils';
import { AbstractGeometryComponent, GeometriesParametric } from '../geometry.abstract';
import { ThreeColor, ThreeUtil, ThreeVector } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { ShapeComponent } from '../shape/shape.component';
import { SvgComponent } from '../svg/svg.component';
import { CapsuleGeometry } from './geometry.capsule';
import { CircleDepthGeometry } from './geometry.circle-depth';
import { GridGeometry } from './geometry.grid';
import { PlaneDepthGeometry } from './geometry.plane-depth';
import { PlanePerlinGeometry } from './geometry.plane_perlin';
import { RingDepthGeometry } from './geometry.ring-depth';
import { RopeGeometry } from './geometry.rope';
import { StarGeometry } from './geometry.star';
import { StarDepthGeometry } from './geometry.star-depth';

/**
 * GeometryComponent
 *
 * A representation of mesh, line, or point geometry. Includes vertex positions, face
 * indices, normals, colors, UVs, and custom attributes within buffers, reducing the cost of
 * passing all this data to the GPU.
 *
 * To read and edit data in BufferGeometry attributes, see [page:BufferAttribute] documentation.
 *
 * @see THREE.BufferGeometry
 */
@Component({
  selector: 'ngx3js-geometry',
  templateUrl: './geometry.component.html',
  styleUrls: ['./geometry.component.scss'],
  providers: [{ provide: AbstractGeometryComponent, useExisting: forwardRef(() => GeometryComponent) }],
})
export class GeometryComponent extends AbstractGeometryComponent implements OnInit, OnDestroy {
  /**
   * The type  of geometry
   *
   * Notice - case insensitive.
   *
   * @see THREE.BufferGeometry
   * @see THREE.BufferGeometry - BufferGeometry, CustomGeometry,  Custom, Buffer
   * @see THREE.InstancedBufferGeometry - InstancedBufferGeometry, InstancedBuffer, Instanced,
   * @see TeapotGeometry - TeapotGeometry, Teapot,
   * @see PerlinGeometry - PerlinBufferGeometry, PerlinGeometry, Perlin, PerlinBuffer
   * @see RopeGeometry - RopeBufferGeometry, RopeGeometry, Rope, RopeBuffer
   * @see CapsuleGeometry - CapsuleGeometry, Capsule,
   * @see LineGeometry - LineGeometry, Line,
   * @see THREE.BoxGeometry - BoxGeometry, Box,
   * @see THREE.CircleGeometry - CircleGeometry, Circle,
   * @see THREE.ConeGeometry - ConeGeometry, Cone,
   * @see THREE.CylinderGeometry - CylinderGeometry, Cylinder,
   * @see THREE.DodecahedronGeometry - DodecahedronGeometry, Dodecahedron,
   * @see MergeGeometry - mergebuffergeometries,  mergebuffergeometry, mergebuffer, merge
   * @see THREE.ShapeGeometry - ShapeGeometry, Shape,
   * @see THREE.IcosahedronGeometry - IcosahedronGeometry, Icosahedron,
   * @see THREE.LatheGeometry - LatheGeometry, Lathe,
   * @see THREE.OctahedronGeometry - OctahedronGeometry, Octahedron,
   * @see THREE.ParametricBufferGeometry - ParametricBufferGeometry, ParametricBuffer, ParametricBuffer
   * @see ParametricGeometries.TorusKnotGeometry - ,
   * @see ParametricGeometries.SphereGeometry - ,
   * @see ParametricGeometries.TubeGeometry - ,
   * @see THREE.ParametricGeometry - ParametricGeometry , Parametric,
   * @see THREE.PlaneGeometry - PlaneGeometry, Plane,
   * @see THREE.RingGeometry - RingGeometry, Ring,
   * @see THREE.SphereGeometry - SphereGeometry, Sphere,
   * @see THREE.TetrahedronGeometry - TetrahedronGeometry, Tetrahedron,
   * @see THREE.TextBufferGeometry - TextBufferGeometry, TextBuffer, Text
   * @see THREE.TorusGeometry - TorusGeometry, Torus,
   * @see THREE.TorusKnotGeometry - TorusKnotGeometry, TorusKnot
   * @see THREE.TubeGeometry - TubeGeometry, Tube,
   * @see ConvexGeometry - ConvexGeometry, Convex,
   * @see DecalGeometry - DecalGeometry, Decal,
   */
  @Input() public type: string = 'sphere';

  /**
   * Input  of geometry component
   */
  @Input() private refer: any = null;

  /**
   * Input  of geometry component
   */
  @Input() private storageName: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private storage2Buffer: boolean = false;

  /**
   * Input  of geometry component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private perlinType: string = 'minecraft';

  /**
   * Input  of geometry component
   */
  @Input() private light: string | number = null;

  /**
   * Input  of geometry component
   */
  @Input() private shadow: string | number = null;

  /**
   * Radius of the circle/cone/dodecahedron/sphere..., default = 1.
   */
  @Input() private radius: number = null;

  /**
   * Number of segmented faces around the circumference of the cone/cylinder/torus/tube. Default is 8
   */
  @Input() private radiusSegments: number = null;

  /**
   * Number of segmented faces around the circumference of the cone/cylinder/torus/tube. Default is 8
   */
  @Input() private radialSegments: number = null;

  /**
   * Width; that is, the length of the edges parallel to the X axis. Optional; defaults to 1.
   */
  @Input() private width: number = null;

  /**
   * Number of segmented rectangular faces along the width of the sides. Optional; defaults to 1.
   */
  @Input() private widthSegments: number = null;

  /**
   * Height; that is, the length of the edges parallel to the Y axis. Optional; defaults to 1.
   */
  @Input() private height: number = null;

  /**
   * Number of segmented rectangular faces along the height of the sides. Optional; defaults to 1.
   */
  @Input() private heightSegments: number = null;

  /**
   * Depth; that is, the length of the edges parallel to the Z axis. Optional; defaults to 1.
   */
  @Input() private depth: number = null;

  /**
   * Number of segmented rectangular faces along the depth of the sides. Optional; defaults to 1.
   */
  @Input() private depthSegments: number = null;

  /**
   * The Sharpen Rate of Depth
   */
  @Input() private depthRate: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private quality: number = null;

  /**
   * Start angle for first segment, default = 0 (three o'clock position).
   */
  @Input() private thetaStart: number = null;

  /**
   * The central angle, often called theta, of the circular sector. The default is 360, which makes for a complete circle.
   */
  @Input() private thetaLength: number = null;

  /**
   * Number of segments.  A higher number means the ring will be more round.  Minimum is 3.  Default is 8.
   */
  @Input() private thetaSegments: number = null;

  /**
   * Radius of the cylinder at the top. Default is 1.
   */
  @Input() private radiusTop: number = null;

  /**
   * Radius of the cylinder at the bottom. Default is 1.
   */
  @Input() private radiusBottom: number = null;

  /**
   * Default is 0.  Setting this to a value greater than 0 adds more vertices making it no longer an icosahedron.  When detail is greater than 1, it's effectively a sphere
   */
  @Input() private detail: number = null;

  /**
   * Default is 0.5.
   */
  @Input() private innerRadius: number = null;

  /**
   * Default is 1.
   */
  @Input() private outerRadius: number = null;

  /**
   * A Boolean indicating whether the base of the cone is open or capped. Default is false, meaning capped.
   */
  @Input() private openEnded: boolean = null;

  /**
   * the starting angle in radians. Default is 0.
   */
  @Input() private phiStart: number = null;

  /**
   * the radian (0 to 2PI : 0 to 360) range of the lathed section 2PI(360) is a closed lathe, less than 2PI is a portion. Default is 2PI.
   */
  @Input() private phiLength: number = null;

  /**
   * the number of circumference segments to generate. Default is 12.
   */
  @Input() private segments: number = null;

  /**
   * Minimum is 1.  Default is 1.
   */
  @Input() private phiSegments: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private tube: number = null;

  /**
   * Radius of the tube.  Default is 0.4.
   */
  @Input() private tubularSegments: number = null;

  /**
   * Central angle.  Default is Math.PI * 2.
   */
  @Input() private arc: number = null;

  /**
   * This value determines, how many times the geometry winds around its axis of rotational symmetry. Default is 2.
   */
  @Input() private p: number = null;

  /**
   * This value determines, how many times the geometry winds around a circle in the interior of the torus. Default is 3.
   */
  @Input() private q: number = null;

  /**
   * Grid Color axis X
   */
  @Input() private color1: ThreeColor = null;

  /**
   * Grid Color axis Y
   */
  @Input() private color2: ThreeColor = null;

  /**
   * Input  of geometry component
   */
  @Input() private points: ThreeVector[] = null;

  /**
   * Input  of geometry component
   */
  @Input() private shapes: ThreeVector[] | THREE.Shape = null;

  /**
   * Input  of geometry component
   */
  @Input() private extrudePath: ThreeVector[] = null;

  /**
   * Input  of geometry component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private extrudePathType: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private curvePath: ThreeVector[] = null;

  /**
   * Input  of geometry component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private curvePathType: string = null;

  /**
   * Input  of geometry component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private curveType: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private addGroup: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private bottom: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private lid: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private body: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private fitLid: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private blinn: boolean = null;

  /**
   * Input  of geometry component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private uVGenerator: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private pointsGeometry: GeometryComponent = null;

  /**
   * Input  of geometry component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private parametric: string | GeometriesParametric | any = null;

  /**
   * Input  of geometry component
   */
  @Input() private slices: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private stacks: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private text: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private font: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private size: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private weight: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private polyVertices: number[] = null;

  /**
   * Input  of geometry component
   */
  @Input() private polyIndices: number[] = null;

  /**
   * Input  of geometry component
   */
  @Input() private curveSegments: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private tension: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private steps: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private bevelEnabled: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private bevelThickness: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private bevelSize: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private bevelOffset: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private bevelSegments: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private closed: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private instanceCount: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private mesh: THREE.Mesh | any = null;

  /**
   * Input  of geometry component
   */
  @Input() private positionX: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private positionY: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private positionZ: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private orientationX: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private orientationY: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private orientationZ: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private sizeX: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private sizeY: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private sizeZ: number = null;

  /**
   * Input  of geometry component
   */
  @Input() private curve: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private curveOption: any = null;

  /**
   * Input  of geometry component
   */
  @Input() private curveNormal: boolean = null;

  /**
   * Input  of geometry component
   */
  @Input() private curveNormalOption: string = null;

  /**
   * Input  of geometry component
   */
  @Input() private refGeometry: any = null;

  /**
   * Input  of geometry component
   *
   * Notice - case insensitive.
   *
   */
  @Input() private refType: string = 'targetMesh';

  /**
   * Content children of geometry component
   */
  @ContentChildren(GeometryComponent, { descendants: false }) private geometryList: QueryList<GeometryComponent>;

  /**
   * Content children of geometry component
   */
  @ContentChildren(ShapeComponent, { descendants: false }) private shapeList: QueryList<ShapeComponent>;

  /**
   * Content children of geometry component
   */
  @ContentChildren(CurveComponent, { descendants: false }) private curveList: QueryList<CurveComponent>;

  /**
   * Content children of geometry component
   */
  @ContentChildren(SvgComponent, { descendants: false }) private svgList: QueryList<SvgComponent>;

  /**
   * Creates an instance of geometry component.
   * @param localStorageService
   */
  constructor(private localStorageService: LocalStorageService) {
    super();
  }

  /**
   * Gets font
   * @param [def]
   * @param [callBack]
   */
  private getFont(def?: string, callBack?: (font: THREE.Font) => void) {
    const font = ThreeUtil.getTypeSafe(this.font, def, 'helvetiker');
    const weight = ThreeUtil.getTypeSafe(this.weight, '');
    this.localStorageService.getFont(callBack, font, weight);
  }

  /**
   * Gets points v3
   * @param def
   * @returns points v3
   */
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
        const shapes = font.generateShapes(ThreeUtil.getTypeSafe(this.text, 'test'), ThreeUtil.getTypeSafe(this.size, 1));
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
          this.applyChanges(['align']);
        }
      });
    } else {
      (this.points === null ? def : this.points).forEach((p) => {
        points.push(new THREE.Vector3(p.x, p.y, p.z));
      });
    }
    return points;
  }

  /**
   * Gets points v2
   * @param [def]
   * @returns points v2
   */
  private getPointsV2(def?: ThreeVector[]): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];
    (this.points === null ? def : this.points).forEach((p) => {
      points.push(new THREE.Vector2(p.x, p.y));
    });
    return points;
  }

  /**
   * Gets parametric
   * @param def
   * @returns parametric
   */
  private getParametric(def: string | GeometriesParametric): (u: number, v: number, dest: THREE.Vector3) => void {
    const parametric = this.parametric === null ? def : this.parametric;
    switch (parametric) {
      case 'mobius3d':
        return ParametricGeometries.mobius3d;
      case 'klein':
        return ParametricGeometries.klein;
      case 'plane':
        return ParametricGeometries.plane(ThreeUtil.getTypeSafe(this.width, this.height, 10), ThreeUtil.getTypeSafe(this.height, this.width, 10), null) as any;
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

  /**
   * Gets poly vertices
   * @param [def]
   * @returns poly vertices
   */
  private getPolyVertices(def?: number[]): number[] {
    const vertices: number[] = [];
    (this.polyVertices === null ? def : this.polyVertices).forEach((p) => {
      vertices.push(p);
    });
    return vertices;
  }

  /**
   * Gets poly indices
   * @param [def]
   * @returns poly indices
   */
  private getPolyIndices(def?: number[]): number[] {
    const indices: number[] = [];
    (this.polyIndices === null ? def : this.polyIndices).forEach((p) => {
      indices.push(p);
    });
    return indices;
  }

  /**
   * Gets shapes
   * @param onload
   */
  private getShapes(onload: (data: THREE.Shape[] | THREE.Shape) => void): void {
    if (ThreeUtil.isNotNull(this.svgList) && this.svgList.length > 0) {
      window.setTimeout(() => {
        this.svgList.forEach((svg) => {
          svg.getShapes((shapes) => {
            onload(shapes);
          });
        });
      }, 1);
    } else if (ThreeUtil.isNotNull(this.shapes)) {
      if (this.shapes instanceof THREE.Shape) {
        window.setTimeout(() => {
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
        window.setTimeout(() => {
          onload(shapes);
        }, 1);
      }
    } else if (ThreeUtil.isNotNull(this.text)) {
      this.getFont('helvetiker', (font: THREE.Font) => {
        const shapes = font.generateShapes(ThreeUtil.getTypeSafe(this.text, 'test'), ThreeUtil.getTypeSafe(this.size, 1));
        onload(shapes);
      });
    } else {
      const shapes: THREE.Shape[] = [];
      if (this.shapeList !== null && this.shapeList.length > 0) {
        const shape = new THREE.Shape();
        this.shapeList.forEach((path) => {
          path.getShape(shape);
        });
        shapes.push(shape);
      }
      window.setTimeout(() => {
        onload(shapes);
      }, 1);
    }
  }

  /**
   * Gets extrude path
   * @returns extrude path
   */
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
          return new THREE.CatmullRomCurve3(vectors, ThreeUtil.getTypeSafe(this.closed, false), ThreeUtil.getTypeSafe(this.curveType, 'catmullrom'), ThreeUtil.getTypeSafe(this.tension, 0.5));
      }
    }
    return undefined;
  }

  /**
   * Gets uvgenerator
   * @param [def]
   * @returns uvgenerator
   */
  private getUVGenerator(def?: string): THREE.UVGenerator {
    const uVGenerator = ThreeUtil.getTypeSafe(this.uVGenerator, def, '');
    switch (uVGenerator.toLowerCase()) {
      case 'world':
        // return THREE.WorldUVGenerator;
        break;
    }
    return undefined;
  }

  /**
   * Gets curve
   * @param [def]
   * @returns curve
   */
  private getCurve(def?: string): THREE.Curve<THREE.Vector3> {
    const curve = ThreeUtil.getTypeSafe(this.curve, def, '');
    let curveLine: THREE.Curve<THREE.Vector3> = null;
    if (ThreeUtil.isNotNull(curve) && curve !== '') {
      curveLine = CurveUtils.getCurve(curve, ThreeUtil.getTypeSafe(this.scale, 1), this.curveOption);
    }
    if (curveLine === null) {
      if (this.curveList !== null && this.curveList.length > 0) {
        curveLine = this.curveList.first.getCurve() as THREE.Curve<THREE.Vector3>;
      } else {
        const extrudePath = this.getExtrudePath();
        if (ThreeUtil.isNotNull(extrudePath)) {
          curveLine = extrudePath;
        }
      }
    }
    if (curveLine !== null) {
      if (ThreeUtil.isNotNull(this.curveNormal) && this.curveNormal) {
        return CurveUtils.getCurveNormal(curveLine, { options: this.curveNormalOption });
      } else {
        return curveLine;
      }
    } else {
      return new THREE.LineCurve3(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
    }
  }

  /**
   * Gets mesh
   * @param [def]
   * @returns mesh
   */
  private getMesh(def?: THREE.Mesh | any): THREE.Mesh {
    let value = ThreeUtil.getTypeSafe(this.mesh, def);
    let mesh: THREE.Object3D = null;
    if (ThreeUtil.isNotNull(value)) {
      if (ThreeUtil.isNotNull(value.getObject3d)) {
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
      }
    }
    return null;
  }

  /**
   * Gets position v3
   * @param [def]
   * @returns position v3
   */
  private getPositionV3(def?: THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.positionX, this.positionY, this.positionZ, def);
  }

  /**
   * Gets orientation
   * @param [def]
   * @returns orientation
   */
  private getOrientation(def?: THREE.Euler): THREE.Euler {
    return ThreeUtil.getEulerSafe(this.orientationX, this.orientationY, this.orientationZ, def);
  }

  /**
   * Gets size v3
   * @param [def]
   * @returns size v3
   */
  private getSizeV3(def?: THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.sizeX, this.sizeY, this.sizeZ, def);
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('geometry');
  }

  /**
   * A callback method that performs custom clean-up, invoked immediately
   * before a directive, pipe, or service instance is destroyed.
   */
  ngOnDestroy(): void {
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
    if (changes && this.geometry) {
      this.addChanges(changes);
    }
  }

  /**
   * A callback method that is invoked immediately after
   * Angular has completed initialization of all of the directive's
   * content.
   * It is invoked only once when the directive is instantiated.
   */
  ngAfterContentInit(): void {
    this.subscribeListQueryChange(this.geometryList, 'geometryList', 'geometry');
    this.subscribeListQueryChange(this.shapeList, 'shapeList', 'shape');
    this.subscribeListQueryChange(this.curveList, 'curveList', 'curve');
    this.subscribeListQueryChange(this.svgList, 'svgList', 'svg');
    super.ngAfterContentInit();
  }

  /**
   * Perlin geometry of geometry component
   */
  private perlinGeometry: PlanePerlinGeometry = null;

  /**
   * Gets perlin geometry
   * @returns perlin geometry
   */
  private getPerlinGeometry(): PlanePerlinGeometry {
    if (this.perlinGeometry === null) {
      this.perlinGeometry = new PlanePerlinGeometry(ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 128), ThreeUtil.getTypeSafe(this.depthSegments, this.segments, 128), ThreeUtil.getTypeSafe(this.quality, 2));
    }
    return this.perlinGeometry;
  }

  /**
   * Gets geometry
   * @template T
   * @returns geometry
   */
  public getGeometry<T extends THREE.BufferGeometry>(): T {
    if (this.geometry === null || this._needUpdate) {
      this.needUpdate = false;
      let geometry: THREE.BufferGeometry = null;
      this.unSubscribeRefer('refGeometry')
      if (this.refer !== null && this.refer !== undefined) {
        geometry = ThreeUtil.getGeometry(this.refer);
        this.subscribeRefer('refGeometry', ThreeUtil.getSubscribe(this.refer, () => {
          this.needUpdate = true; 
        }, 'geometry'))
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
          this.setSubscribeNext(['loaded']);
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
                const curveSegments = ThreeUtil.getTypeSafe(this.curveSegments, this.segments, 10);
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
            const teapot = new TeapotGeometry(
              ThreeUtil.getTypeSafe(this.size),
              ThreeUtil.getTypeSafe(this.segments, this.radiusSegments),
              ThreeUtil.getTypeSafe(this.bottom),
              ThreeUtil.getTypeSafe(this.lid),
              ThreeUtil.getTypeSafe(this.body),
              ThreeUtil.getTypeSafe(this.fitLid),
              ThreeUtil.getTypeSafe(this.blinn)
            );
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
                geometry = planePerlin.getMinecraftAo(ThreeUtil.getTypeSafe(this.width, this.height, 100), ThreeUtil.getTypeSafe(this.height, this.width, 100), ThreeUtil.getTypeSafe(this.depth, this.width, 100), ThreeUtil.getColorSafe(this.light, 0xffffff), ThreeUtil.getColorSafe(this.shadow));
                break;
              case 'terrain':
                geometry = planePerlin.getTerrain(ThreeUtil.getTypeSafe(this.width, this.height, 100), ThreeUtil.getTypeSafe(this.height, this.width, 100), ThreeUtil.getTypeSafe(this.depth, this.width, 100));
                break;
              case 'minecraft':
              default:
                geometry = planePerlin.getMinecraft(ThreeUtil.getTypeSafe(this.width, this.height, 100), ThreeUtil.getTypeSafe(this.height, this.width, 100), ThreeUtil.getTypeSafe(this.depth, this.width, 100));
                break;
            }
            break;
          case 'ropebuffergeometry':
          case 'ropegeometry':
          case 'ropebuffer':
          case 'rope':
            const ropeGeometry = new RopeGeometry(ThreeUtil.getTypeSafe(this.width, this.height, 1), ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1));
            geometry = ropeGeometry;
            break;
          case 'gridbuffergeometry':
          case 'gridgeometry':
          case 'gridbuffer':
          case 'grid':
            const gridGeometry = new GridGeometry(
              ThreeUtil.getTypeSafe(this.width, this.height, 1),
              ThreeUtil.getTypeSafe(this.height, this.width, 1),
              ThreeUtil.getTypeSafe(this.depth, 0),
              ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
              ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
              ThreeUtil.getColorSafe(this.color1, 0x444444),
              ThreeUtil.getColorSafe(this.color2, 0x888888)
            );
            geometry = gridGeometry;
            break;
          case 'capsulebuffergeometry':
          case 'capsulegeometry':
          case 'capsulebuffer':
          case 'capsule':
            const capsuleGeometry = new CapsuleGeometry(
              ThreeUtil.getTypeSafe(this.radius, 1),
              ThreeUtil.getTypeSafe(this.radiusSegments, this.radialSegments, 8),
              ThreeUtil.getTypeSafe(this.height, this.width, 10),
              ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 3),
              ThreeUtil.getAngleSafe(this.phiStart, 0),
              ThreeUtil.getAngleSafe(this.phiLength, 360)
            );
            geometry = capsuleGeometry;
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
            geometry = new RoundedBoxGeometry(
              ThreeUtil.getTypeSafe(this.width, this.height, 1),
              ThreeUtil.getTypeSafe(this.height, this.width, 1),
              ThreeUtil.getTypeSafe(this.depth, this.width, 1),
              ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 2),
              ThreeUtil.getTypeSafe(this.radius, 0.1)
            );
            break;
          case 'boxbuffergeometry':
          case 'boxgeometry':
          case 'boxbuffer':
          case 'box':
            geometry = new THREE.BoxBufferGeometry(
              ThreeUtil.getTypeSafe(this.width, this.height, 1),
              ThreeUtil.getTypeSafe(this.height, this.width, 1),
              ThreeUtil.getTypeSafe(this.depth, this.width, 1),
              ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1),
              ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
              ThreeUtil.getTypeSafe(this.depthSegments, this.segments, 1)
            );
            break;
          case 'circlebuffergeometry':
          case 'circlegeometry':
          case 'circlebuffer':
          case 'circle':
            if (ThreeUtil.isNotNull(this.depth) && this.depth > 0) {
              geometry = new CircleDepthGeometry(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.depth, 1), ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 8), ThreeUtil.getAngleSafe(this.thetaStart, 0), ThreeUtil.getAngleSafe(this.thetaLength, 360), ThreeUtil.getTypeSafe(this.depthRate, 1));
            } else {
              geometry = new THREE.CircleBufferGeometry(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 8), ThreeUtil.getAngleSafe(this.thetaStart, 0), ThreeUtil.getAngleSafe(this.thetaLength, 360));
            }
            break;
          case 'starbuffergeometry':
          case 'stargeometry':
          case 'starbuffer':
          case 'star':
            if (ThreeUtil.isNotNull(this.depth) && this.depth > 0) {
              geometry = new StarDepthGeometry(ThreeUtil.getTypeSafe(this.innerRadius, 0.5), ThreeUtil.getTypeSafe(this.outerRadius, 1), ThreeUtil.getTypeSafe(this.depth, 1), ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 5), ThreeUtil.getAngleSafe(this.thetaStart, 0), ThreeUtil.getAngleSafe(this.thetaLength, 360), ThreeUtil.getTypeSafe(this.depthRate, 1));
            } else {
              geometry = new StarGeometry(ThreeUtil.getTypeSafe(this.innerRadius, 0.5), ThreeUtil.getTypeSafe(this.outerRadius, 1), ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 5), ThreeUtil.getAngleSafe(this.thetaStart, 0), ThreeUtil.getAngleSafe(this.thetaLength, 360));
            }
            break;
          case 'conebuffergeometry':
          case 'conegeometry':
          case 'conebuffer':
          case 'cone':
            geometry = new THREE.ConeBufferGeometry(
              ThreeUtil.getTypeSafe(this.radius, 1),
              ThreeUtil.getTypeSafe(this.height, this.width, 1),
              ThreeUtil.getTypeSafe(this.radialSegments, this.radiusSegments, 8),
              ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
              ThreeUtil.getTypeSafe(this.openEnded, false),
              ThreeUtil.getAngleSafe(this.thetaStart, 0),
              ThreeUtil.getAngleSafe(this.thetaLength, 360)
            );
            break;
          case 'cylinderbuffergeometry':
          case 'cylindergeometry':
          case 'cylinderbuffer':
          case 'cylinder':
            geometry = new THREE.CylinderBufferGeometry(
              ThreeUtil.getTypeSafe(this.radiusTop, this.radiusBottom, 1),
              ThreeUtil.getTypeSafe(this.radiusBottom, this.radiusTop, 1),
              ThreeUtil.getTypeSafe(this.height, this.width, 1),
              ThreeUtil.getTypeSafe(this.radialSegments, this.radiusSegments, 8),
              ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
              ThreeUtil.getTypeSafe(this.openEnded, false),
              ThreeUtil.getAngleSafe(this.thetaStart, 0),
              ThreeUtil.getAngleSafe(this.thetaLength, 360)
            );
            break;
          case 'dodecahedronbuffergeometry':
          case 'dodecahedrongeometry':
          case 'dodecahedronbuffer':
          case 'dodecahedron':
            geometry = new THREE.DodecahedronBufferGeometry(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.detail, 0));
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
            geometry = new THREE.ShapeBufferGeometry([], ThreeUtil.getTypeSafe(this.curveSegments, this.segments));
            this.getShapes((shapes) => {
              let shapeGeometry: THREE.BufferGeometry = null;
              switch (this.type.toLowerCase()) {
                case 'shapebuffergeometry':
                case 'shapegeometry':
                case 'shapebuffer':
                case 'shape':
                  shapeGeometry = new THREE.ShapeBufferGeometry(shapes, ThreeUtil.getTypeSafe(this.curveSegments, this.segments));
                  break;
                case 'extrudebuffergeometry':
                case 'extrudegeometry':
                case 'extrudebuffer':
                case 'extrude':
                default:
                  shapeGeometry = new THREE.ExtrudeBufferGeometry(shapes, {
                    curveSegments: ThreeUtil.getTypeSafe(this.curveSegments, this.segments),
                    steps: ThreeUtil.getTypeSafe(this.steps),
                    depth: ThreeUtil.getTypeSafe(this.depth, this.width),
                    bevelEnabled: ThreeUtil.getTypeSafe(this.bevelEnabled),
                    bevelThickness: ThreeUtil.getTypeSafe(this.bevelThickness),
                    bevelSize: ThreeUtil.getTypeSafe(this.bevelSize),
                    bevelOffset: ThreeUtil.getTypeSafe(this.bevelOffset),
                    bevelSegments: ThreeUtil.getTypeSafe(this.bevelSegments),
                    extrudePath: this.getExtrudePath(),
                    UVGenerator: this.getUVGenerator(),
                  });
                  break;
              }
              this.setGeometry(shapeGeometry);
              this.setSubscribeNext('loaded');
            });
            break;
          case 'icosahedronbuffergeometry':
          case 'icosahedrongeometry':
          case 'icosahedronbuffer':
          case 'icosahedron':
            geometry = new THREE.IcosahedronBufferGeometry(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.detail, 0));
            break;
          case 'lathebuffergeometry':
          case 'lathegeometry':
          case 'lathebuffer':
          case 'lathe':
            geometry = new THREE.LatheBufferGeometry(this.getPointsV2([]), ThreeUtil.getTypeSafe(this.segments, this.radiusSegments, 12), ThreeUtil.getAngleSafe(this.phiStart, 0), ThreeUtil.getAngleSafe(this.phiLength, 360));
            break;
          case 'octahedronbuffergeometry':
          case 'octahedrongeometry':
          case 'octahedronbuffer':
          case 'octahedron':
            geometry = new THREE.OctahedronBufferGeometry(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.detail, 0));
            break;
          case 'parametricgeometry':
          case 'parametric':
          case 'parametricbuffergeometry':
          case 'parametricbuffer':
            geometry = new THREE.ParametricBufferGeometry(this.getParametric('mobius3d'), ThreeUtil.getTypeSafe(this.slices, 20), ThreeUtil.getTypeSafe(this.stacks, 20));
            break;
          case 'parametrictorusknotgeometry':
          case 'parametrictorusknot':
            geometry = new ParametricGeometries.TorusKnotGeometry(
              ThreeUtil.getTypeSafe(this.radius, 1),
              ThreeUtil.getTypeSafe(this.tube, 0.4),
              ThreeUtil.getTypeSafe(this.radialSegments, this.radiusSegments, 64),
              ThreeUtil.getTypeSafe(this.tubularSegments, 8),
              ThreeUtil.getTypeSafe(this.p, 2),
              ThreeUtil.getTypeSafe(this.q, 3)
            ) as any;
            break;
          case 'parametricspheregeometry':
          case 'parametricsphere':
            geometry = new ParametricGeometries.SphereGeometry(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 8), ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 6)) as any;
            break;
          case 'parametrictubegeometry':
          case 'parametrictube':
            geometry = new ParametricGeometries.TubeGeometry(this.getCurve(), ThreeUtil.getTypeSafe(this.tubularSegments, 64), ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.radiusSegments, this.radialSegments, 8), ThreeUtil.getTypeSafe(this.closed, false)) as any;
            break;
          case 'parametricbuffergeometry':
          case 'parametricbuffer':
          case 'parametricgeometry':
          case 'parametric':
            geometry = new THREE.ParametricBufferGeometry(this.getParametric('mobius3d'), ThreeUtil.getTypeSafe(this.slices, 20), ThreeUtil.getTypeSafe(this.stacks, 10));
            break;
          case 'planebuffergeometry':
          case 'planebuffer':
          case 'planegeometry':
          case 'plane':
            if (ThreeUtil.isNotNull(this.depth) && this.depth > 0) {
              geometry = new PlaneDepthGeometry(
                ThreeUtil.getTypeSafe(this.width, this.height, 1), 
                ThreeUtil.getTypeSafe(this.height, this.width, 1), 
                ThreeUtil.getTypeSafe(this.depth, this.width, 1), 
                ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1), 
                ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1),
                ThreeUtil.getTypeSafe(this.depthRate, 1)
              );
            } else {
              geometry = new THREE.PlaneBufferGeometry(ThreeUtil.getTypeSafe(this.width, this.height, 1), ThreeUtil.getTypeSafe(this.height, this.width, 1), ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1), ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1));
            }
            break;
          case 'polyhedronbuffergeometry':
          case 'polyhedrongeometry':
          case 'polyhedronbuffer':
          case 'polyhedron':
            geometry = new THREE.PolyhedronBufferGeometry(this.getPolyVertices([]), this.getPolyIndices([]), ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.detail, 0));
            break;
          case 'ringbuffergeometry':
          case 'ringgeometry':
          case 'ringbuffer':
          case 'ring':
            if (ThreeUtil.isNotNull(this.depth) && this.depth > 0) {
              geometry = new RingDepthGeometry(
                ThreeUtil.getTypeSafe(this.innerRadius, 0.5),
                ThreeUtil.getTypeSafe(this.outerRadius, 1),
                ThreeUtil.getTypeSafe(this.depth, 1),
                ThreeUtil.getTypeSafe(this.thetaSegments, 8),
                ThreeUtil.getTypeSafe(this.phiSegments, 1),
                ThreeUtil.getAngleSafe(this.thetaStart, 0),
                ThreeUtil.getAngleSafe(this.thetaLength, 360),
                ThreeUtil.getTypeSafe(this.depthRate, 1)
              );
            } else {
              geometry = new THREE.RingBufferGeometry(
                ThreeUtil.getTypeSafe(this.innerRadius, 0.5),
                ThreeUtil.getTypeSafe(this.outerRadius, 1),
                ThreeUtil.getTypeSafe(this.thetaSegments, 8),
                ThreeUtil.getTypeSafe(this.phiSegments, 1),
                ThreeUtil.getAngleSafe(this.thetaStart, 0),
                ThreeUtil.getAngleSafe(this.thetaLength, 360)
              );
            }
            break;
          case 'spherebuffergeometry':
          case 'spheregeometry':
          case 'spherebuffer':
          case 'sphere':
            geometry = new THREE.SphereBufferGeometry(
              ThreeUtil.getTypeSafe(this.radius, 1),
              ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 8),
              ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 6),
              ThreeUtil.getAngleSafe(this.phiStart, 0),
              ThreeUtil.getAngleSafe(this.phiLength, 360),
              ThreeUtil.getAngleSafe(this.thetaStart, 0),
              ThreeUtil.getAngleSafe(this.thetaLength, 180)
            );
            break;
          case 'tetrahedronbuffergeometry':
          case 'tetrahedrongeometry':
          case 'tetrahedronbuffer':
          case 'tetrahedron':
            geometry = new THREE.TetrahedronBufferGeometry(
              ThreeUtil.getTypeSafe(this.radius, 1), 
              ThreeUtil.getTypeSafe(this.detail, 0)
            );
            break;
          case 'textbuffergeometry':
          case 'textgeometry':
          case 'textbuffer':
          case 'text':
            geometry = new THREE.BufferGeometry();
            this.getFont('helvetiker', (font: THREE.Font) => {
              const textParameters: THREE.TextGeometryParameters = {
                font: font,
                size: ThreeUtil.getTypeSafe(this.size, 1),
                height: ThreeUtil.getTypeSafe(this.height, this.width),
                curveSegments: ThreeUtil.getTypeSafe(this.curveSegments, this.segments),
                bevelEnabled: ThreeUtil.getTypeSafe(this.bevelEnabled),
                bevelThickness: ThreeUtil.getTypeSafe(this.bevelThickness),
                bevelSize: ThreeUtil.getTypeSafe(this.bevelSize),
                bevelOffset: ThreeUtil.getTypeSafe(this.bevelOffset),
                bevelSegments: ThreeUtil.getTypeSafe(this.bevelSegments),
              };
              switch (this.type.toLowerCase()) {
                case 'textbuffergeometry':
                case 'textgeometry':
                case 'textbuffer':
                case 'text':
                default:
                  this.setGeometry(new THREE.TextBufferGeometry(ThreeUtil.getTypeSafe(this.text, 'test'), textParameters));
                  this.setSubscribeNext('loaded');
                  break;
              }
            });
            break;
          case 'torusbuffergeometry':
          case 'torusgeometry':
          case 'torusbuffer':
          case 'torus':
            geometry = new THREE.TorusBufferGeometry(ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.tube, 0.4), ThreeUtil.getTypeSafe(this.radialSegments, this.radiusSegments, 8), ThreeUtil.getTypeSafe(this.tubularSegments, 6), ThreeUtil.getAngleSafe(this.arc, 360));
            break;
          case 'torusknotbuffergeometry':
          case 'torusknotgeometry':
          case 'torusknotbuffer':
          case 'torusknot':
            geometry = new THREE.TorusKnotBufferGeometry(
              ThreeUtil.getTypeSafe(this.radius, 1),
              ThreeUtil.getTypeSafe(this.tube, 0.4),
              ThreeUtil.getTypeSafe(this.radialSegments, this.radiusSegments, 64),
              ThreeUtil.getTypeSafe(this.tubularSegments, 8),
              ThreeUtil.getTypeSafe(this.p, 2),
              ThreeUtil.getTypeSafe(this.q, 3)
            );
            break;
          case 'tubebuffergeometry':
          case 'tubegeometry':
          case 'tubebuffer':
          case 'tube':
            geometry = new THREE.TubeBufferGeometry(this.getCurve(), ThreeUtil.getTypeSafe(this.tubularSegments, 64), ThreeUtil.getTypeSafe(this.radius, 1), ThreeUtil.getTypeSafe(this.radiusSegments, this.radialSegments, 8), ThreeUtil.getTypeSafe(this.closed, false));
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
            geometry = new THREE.PlaneBufferGeometry(ThreeUtil.getTypeSafe(this.width, this.height, 1), ThreeUtil.getTypeSafe(this.height, this.width, 1), ThreeUtil.getTypeSafe(this.widthSegments, this.segments, 1), ThreeUtil.getTypeSafe(this.heightSegments, this.segments, 1));
            break;
        }
      }
      this.setGeometry(geometry);
    }
    return this.geometry as T;
  }
}
