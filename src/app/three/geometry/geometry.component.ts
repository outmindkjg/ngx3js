import {
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  Output,
  OnInit,
  QueryList,
  SimpleChanges
} from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import * as THREE from 'three';
import { ConvexGeometry } from 'three/examples/jsm/geometries/ConvexGeometry';
import { DecalGeometry } from 'three/examples/jsm/geometries/DecalGeometry';
import { Curves } from 'three/examples/jsm/curves/CurveExtras';
import { ParametricGeometries } from 'three/examples/jsm/geometries/ParametricGeometries';
import { BufferGeometryUtils } from 'three/examples/jsm/utils/BufferGeometryUtils';
import { LineGeometry } from 'three/examples/jsm/lines/LineGeometry';
import { WireframeGeometry2 } from 'three/examples/jsm/lines/WireframeGeometry2';
import { CurveComponent } from '../curve/curve.component';
import { InterfaceGetGeometry, ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
import { ShapeComponent } from '../shape/shape.component';
import { TranslationComponent } from '../translation/translation.component';
import { SvgComponent } from '../svg/svg.component';
import { PlanePerlinGeometry } from './plane-perlin-geometry';
import { ScaleComponent } from '../scale/scale.component';
import { RotationComponent } from '../rotation/rotation.component';

export interface GeometriesParametric {
  (u: number, v: number, target? : any): GeometriesVector3;
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
export class GeometryComponent implements OnInit, InterfaceGetGeometry {

  constructor(private localStorageService: LocalStorageService) {
  }

  @Input() public visible:boolean = true;
  @Input() private refer:any = null;
  @Input() private referRef:boolean = true;
  @Input() private params:GeometryParams = null;
  @Input() public type:string = 'sphere';
  @Input() private storageName:string = null;
  @Input() private action:string = 'none';
  @Input() private perlinType:string = 'minecraft';
  @Input() private light:string|number = null;
  @Input() private shadow:string|number = null;
  @Input() public name:string = null;
  @Input() private radius:number = null;
  @Input() private radiusSegments:number = null;
  @Input() private radialSegments:number = null;
  @Input() private width:number = null;
  @Input() private widthSegments:number = null;
  @Input() private height:number = null;
  @Input() private heightSegments:number = null;
  @Input() private depth:number = null;
  @Input() private depthSegments:number = null;
  @Input() private quality:number = null;
  @Input() private thetaStart:number = null;
  @Input() private thetaLength:number = null;
  @Input() private thetaSegments:number = null;
  @Input() private radiusTop:number = null;
  @Input() private radiusBottom:number = null;
  @Input() private detail:number = null;
  @Input() private innerRadius:number = null;
  @Input() private outerRadius:number = null;
  @Input() private openEnded:boolean = null;
  @Input() private phiStart:number = null;
  @Input() private phiLength:number = null;
  @Input() private segments:number = null;
  @Input() private phiSegments:number = null;
  @Input() private tube:number = null;
  @Input() private tubularSegments:number = null;
  @Input() private arc:number = null;
  @Input() private p:number = null;
  @Input() private q:number = null;
  @Input() private points:GeometriesVector3[] = null;
  @Input() private shapes:GeometriesVector3[]| THREE.Shape = null;
  @Input() private extrudePath:GeometriesVector3[] = null;
  @Input() private extrudePathType:string = null;
  @Input() private curvePath:GeometriesVector3[] = null;
  @Input() private curvePathType:string = null;
  @Input() private curveType:string = null;
  @Input() private addGroup:boolean = null;

  @Input() private uVGenerator:string = null;
  @Input() private pointsGeometry:GeometryComponent = null;
  @Input() private parametric:string | GeometriesParametric | any = null;
  @Input() private slices:number = null;
  @Input() private stacks:number = null;
  @Input() private text:string = null;
  @Input() private textAlign:string = null;
  @Input() private align:string = null;
  
  @Input() private center:boolean = false;
  @Input() private computeVertexNormals:boolean = false;
  @Input() private computeBoundingBox:boolean = false;
  @Input() private computeBoundingSphere:boolean = false;
  
  @Input() private font:string = null;
  @Input() private size:number = null;
  @Input() private weight:string = null;
  @Input() private vertices:GeometriesVector3[] = null;
  @Input() private polyVertices:number[] = null;
  @Input() private polyIndices:number[] = null;
  @Input() private colors:(string | number)[] = null;

  @Input() private faces:GeometriesFace3[] = null;
  @Input() private thresholdAngle:number = null;
  @Input() private curveSegments:number = null;
  @Input() private tension:number = null;
  @Input() private steps:number = null;
  @Input() private bevelEnabled:boolean = null;
  @Input() private bevelThickness:number = null;
  @Input() private bevelSize:number = null;
  @Input() private bevelOffset:number = null;
  @Input() private bevelSegments:number = null;
  @Input() private closed:boolean = null;
  @Input() private scale:number = null;
  @Input() private geometryScale:number = null;
  @Input() private sphereScale:number = null;
  @Input() private attributes : { [key : string] : number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute } = null;
  @Input() private position: number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute = null;
  @Input() private normal: number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute = null;
  @Input() private color: number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute = null;
  @Input() private customColor: number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute = null;
  @Input() private customSize:number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute = null;
  @Input() private index:number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute = null;
  
  @Input() private mesh : THREE.Mesh | any = null;
  @Input() private positionX : number = null;
  @Input() private positionY : number = null;
  @Input() private positionZ : number = null;
  @Input() private orientationX : number = null;
  @Input() private orientationY : number = null;
  @Input() private orientationZ : number = null;
  @Input() private sizeX : number = null;
  @Input() private sizeY : number = null;
  @Input() private sizeZ : number = null;
  @Input() private curve : string = null;
  @Input() private refSize : any = null;
  @Input() private toNonIndexed : boolean = null;
  @Input() private refGeometry : any = null;
  @Input() private onInit : (geometry : THREE.BufferGeometry) => void = null;
  @Output() private onLoad:EventEmitter<GeometryComponent> = new EventEmitter<GeometryComponent>();
  @ContentChildren(GeometryComponent, { descendants: false }) private geometryList: QueryList<GeometryComponent>;
  @ContentChildren(ShapeComponent, { descendants: false }) private shapeList: QueryList<ShapeComponent>;
  @ContentChildren(CurveComponent, { descendants: false }) private curveList: QueryList<CurveComponent>;
  @ContentChildren(TranslationComponent, { descendants: false }) private translationList: QueryList<TranslationComponent>;
  @ContentChildren(ScaleComponent, { descendants: false }) private scaleList: QueryList<ScaleComponent>;
  @ContentChildren(RotationComponent, { descendants: false }) private rotationList: QueryList<RotationComponent>;
  @ContentChildren(SvgComponent, { descendants: false }) private svgList: QueryList<SvgComponent>;

  private getRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radius , def);
  }

  private getRadiusSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radiusSegments , def);
  }

  private getRadialSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radialSegments , def);
  }

  private getWidth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.width , def);
  }

  private getWidthSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.widthSegments , def);
  }

  private getHeight(def?: number): number {
    return ThreeUtil.getTypeSafe(this.height , def);
  }

  private getHeightSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.heightSegments , def);
  }

  private getDepth(def?: number): number {
    return ThreeUtil.getTypeSafe(this.depth , def);
  }

  private getDepthSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.depthSegments , def);
  }

  private getQuality(def?: number): number {
    return ThreeUtil.getTypeSafe(this.quality , def);
  }

  private getThetaStart(def?: number): number {
    return ThreeUtil.getAngleSafe(this.thetaStart , def);
  }

  private getThetaLength(def?: number): number {
    return ThreeUtil.getAngleSafe(this.thetaLength , def);
  }

  private getThetaSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.thetaSegments , def);
  }

  private getRadiusTop(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radiusTop , def);
  }

  private getRadiusBottom(def?: number): number {
    return ThreeUtil.getTypeSafe(this.radiusBottom , def);
  }

  private getDetail(def?: number): number {
    return ThreeUtil.getTypeSafe(this.detail , def);
  }

  private getInnerRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.innerRadius , def);
  }

  private getOuterRadius(def?: number): number {
    return ThreeUtil.getTypeSafe(this.outerRadius , def);
  }

  private getOpenEnded(def?: boolean): boolean {
    return ThreeUtil.getTypeSafe(this.openEnded , def);
  }

  private getPhiStart(def?: number): number {
    return ThreeUtil.getAngleSafe(this.phiStart , def);
  }

  private getPhiLength(def?: number): number {
    return ThreeUtil.getAngleSafe(this.phiLength , def);
  }

  private getSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.segments , def);
  }

  private getPhiSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.phiSegments , def);
  }

  private getTube(def?: number): number {
    return ThreeUtil.getTypeSafe(this.tube , def);
  }

  private getTubularSegments(def?: number): number {
    return ThreeUtil.getTypeSafe(this.tubularSegments , def);
  }

  private getArc(def?: number): number {
    return ThreeUtil.getAngleSafe(this.arc , def);
  }

  private getP(def?: number): number {
    return ThreeUtil.getTypeSafe(this.p , def);
  }
  
  private getQ(def?: number): number {
    return ThreeUtil.getTypeSafe(this.q , def);
  }

  private getSlices(def?: number): number {
    return ThreeUtil.getTypeSafe(this.slices , def);
  }
  private getStacks(def?: number): number {
    return ThreeUtil.getTypeSafe(this.stacks , def);
  }

  private getText(def?: string): string {
    return ThreeUtil.getTypeSafe(this.text , def);
  }

  private getTextAlign(def?: string): string {
    return ThreeUtil.getTypeSafe(this.textAlign , this.align, def);
  }

  private getFont(def?: string, callBack?: (font: THREE.Font) => void) {
    const font = ThreeUtil.getTypeSafe(this.font,def,'helvetiker');
    const weight = ThreeUtil.getTypeSafe(this.weight,'');
    this.localStorageService.getFont(callBack, font, weight);
  }

  private getSize(def?: number): number {
    return ThreeUtil.getTypeSafe(this.size, def);
  }

  private getPointsV3(
    def: { x: number; y: number; z: number }[]
  ): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    if (this.pointsGeometry !== null) {
      let pointsGeometry = this.pointsGeometry.getGeometry().clone();
      pointsGeometry.deleteAttribute( 'normal' );
      pointsGeometry.deleteAttribute( 'uv' );
      pointsGeometry = BufferGeometryUtils.mergeVertices( pointsGeometry );
      const positionAttribute = pointsGeometry.getAttribute( 'position' );
      for ( let i = 0; i < positionAttribute.count; i ++ ) {
        const vertex = new THREE.Vector3();
        vertex.fromBufferAttribute( positionAttribute, i );
        points.push( vertex );
      }
    } else if (ThreeUtil.isNotNull(this.text)) {
      points.push(new THREE.Vector3(0, 0, 0));
      points.push(new THREE.Vector3(0, 0, 0));
      this.getFont('helvetiker', (font: THREE.Font) => {
        const shapes = font.generateShapes( this.getText('test'), this.getSize(100));
        const points : THREE.Vector2[] = [];
        shapes.forEach(shape => {
          shape.getPoints().forEach(p => {
            points.push(p);
          });
          if ( shape.holes && shape.holes.length > 0 ) {
            shape.holes.forEach(hole => {
              hole.getPoints().forEach(p => {
                points.push(p);
              })
            });
          }
        });
        if (this.geometry !== null) {
          this.geometry.setFromPoints(points);
          this.applyTextAlign();          
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


  /*
   private getFaces(def?: GeometriesVector3[]): THREE.Face3[] {
     const faces: THREE.Face3[] = [];
     (this.faces === null ? def : this.faces).forEach((p) => {
       faces.push(new THREE.Face3(p.a, p.b, p.c));
     });
     return faces;
   }
 */
  private getThresholdAngle(def?: number): number {
    return ThreeUtil.getTypeSafe(this.thresholdAngle, def);
  }

  private targetMesh : THREE.Mesh = null;
  private getSubGeometry(): THREE.BufferGeometry {
    if (this.targetMesh !== null) {
      return this.targetMesh.geometry;
    } else if (this.refGeometry !== null) {
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

  private getLight(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.light, def);
  }

  private getShadow(def?: number | string): THREE.Color {
    return ThreeUtil.getColorSafe(this.shadow, def);
  }

  private getShapes(onload :(data : THREE.Shape[] | THREE.Shape) => void): void {
    if (ThreeUtil.isNotNull(this.svgList) && this.svgList.length > 0) {
      setTimeout(() => {
        this.svgList.forEach(svg => {
          svg.getShapes((shapes) => {
            onload(shapes);
          })
        });
      }, 1);
  } else if (ThreeUtil.isNotNull(this.shapes)) {
      if (this.shapes instanceof THREE.Shape) {
        setTimeout(() => {
          onload(this.shapes as THREE.Shape);
        }, 1);
      } else {
        const shapes :THREE.Shape[] = [];
        const shape = new THREE.Shape();
        const vectors : THREE.Vector2[] = [];
        this.shapes.forEach(p => {
          vectors.push(new THREE.Vector2( p.x, p.y));
        })
        shape.setFromPoints(vectors);
        shapes.push(shape);
        setTimeout(() => {
          onload(shapes);
        }, 1);
      }
    } else if (ThreeUtil.isNotNull(this.text)) {
      this.getFont('helvetiker', (font: THREE.Font) => {
        const shapes = font.generateShapes( this.getText('test'), this.getSize(100));
        onload(shapes);
      });
    } else {
      const shapes :THREE.Shape[] = [];
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
      const vectors : THREE.Vector3[] = [];
      if (ThreeUtil.isNotNull(this.extrudePath)) {
        this.extrudePath.forEach(p => {
          vectors.push(new THREE.Vector3( p.x, p.y, p.z));
        })
      }
      if (ThreeUtil.isNotNull(this.curvePath)) {
        this.curvePath.forEach(p => {
          vectors.push(new THREE.Vector3( p.x, p.y, p.z));
        })
      }
      switch(ThreeUtil.getTypeSafe(this.extrudePathType,this.curvePathType,'catmullromcurve3').toLowerCase()) {
        case 'catmullromcurve3' :
        default :
          return new THREE.CatmullRomCurve3(
            vectors , 
            this.getClosed(false), 
            ThreeUtil.getTypeSafe(this.curveType, 'catmullrom'),
            ThreeUtil.getTypeSafe(this.tension, 0.5)
          );
      }
    }
    return undefined;
  }

  private getUVGenerator(def? : string): THREE.UVGenerator {
    const uVGenerator = ThreeUtil.getTypeSafe(this.uVGenerator, def, '');
    switch(uVGenerator.toLowerCase()) {
      case 'world' :
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

  private getCurve(def?:string): THREE.Curve<THREE.Vector3> {
    const curve = ThreeUtil.getTypeSafe(this.curve,def, '');
    switch(curve.toLowerCase()) {
      case 'grannyknot' :
        return new Curves.GrannyKnot();
      case 'heartcurve' :
        return new Curves.HeartCurve(this.getScale());
      case 'vivianicurve' :
        return new Curves.VivianiCurve(this.getScale());
      case 'knotcurve' :
        return new Curves.KnotCurve();
      case 'helixcurve' :
        return new Curves.HelixCurve();
      case 'helixcurve' :
        return new Curves.HelixCurve();
      case 'trefoilknot' :
        return new Curves.TrefoilKnot(this.getScale());
      case 'torusknot' :
        return new Curves.TorusKnot(this.getScale());
      case 'cinquefoilknot' :
        return new Curves.CinquefoilKnot(this.getScale());
      case 'trefoilpolynomialknot' :
        return new Curves.TrefoilPolynomialKnot(this.getScale());
      case 'decoratedtorusknot4b' :
        return new Curves.DecoratedTorusKnot4b(this.getScale());
      case 'decoratedtorusknot4a' :
        return new Curves.DecoratedTorusKnot4a(this.getScale());
      case 'figureeightpolynomialknot' :
        return new Curves.FigureEightPolynomialKnot(this.getScale());
      case 'decoratedtorusknot5a' :
        return new Curves.DecoratedTorusKnot5a(this.getScale());
      case 'decoratedtorusknot5c' :
        return new Curves.DecoratedTorusKnot5c(this.getScale());
      default :
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
    return new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    );
  }

  private getAttribute(value : number[] | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Float32Array | Float64Array | THREE.BufferAttribute , itemSize : number): THREE.BufferAttribute {
    const attribute = ThreeUtil.getTypeSafe(value, []);
    if (attribute instanceof THREE.BufferAttribute) {
      return attribute;
    } else if (attribute instanceof Int8Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else if (attribute instanceof Int16Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else if (attribute instanceof Int32Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else if (attribute instanceof Uint8Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else if (attribute instanceof Uint16Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else if (attribute instanceof Uint32Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else if (attribute instanceof Float32Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else if (attribute instanceof Float64Array ) {
      return new THREE.BufferAttribute( attribute, itemSize )
    } else {
      const floatArray = new Float32Array( attribute.length );
      attribute.forEach((v,i) => {
        floatArray[i] = v;
      });
      return new THREE.BufferAttribute( floatArray, itemSize );
    }
  }
  
  private getAttributes(): { key : string, value : THREE.BufferAttribute}[] {
      const attributes = [];
      if (ThreeUtil.isNotNull(this.position)) {
        attributes.push({ key : 'position', value : this.getAttribute(this.position, 3)})
      }
      if (ThreeUtil.isNotNull(this.color)) {
        attributes.push({ key : 'color', value : this.getAttribute(this.color, 3)})
      }
      if (ThreeUtil.isNotNull(this.normal)) {
        attributes.push({ key : 'normal', value : this.getAttribute(this.normal, 3)})
      }
      if (ThreeUtil.isNotNull(this.customColor)) {
        attributes.push({ key : 'customColor', value : this.getAttribute(this.customColor, 3)})
      }
      if (ThreeUtil.isNotNull(this.customSize)) {
        attributes.push({ key : 'size', value : this.getAttribute(this.customSize, 1)})
      }
      if (ThreeUtil.isNotNull(this.index)) {
        attributes.push({ key : 'index', value : this.getAttribute(this.index, 1)})
      }
      if (ThreeUtil.isNotNull(this.attributes)) {
        Object.entries(this.attributes).forEach(([key, value]) => {
          switch(key) {
            case 'size' :
            case 'index' :
                attributes.push({ key : key, value : this.getAttribute(value, 1)})
              break;
            case 'position' :
            case 'color' :
            case 'normal' :
            case 'customColor' :
            default :
              attributes.push({ key : key, value : this.getAttribute(value, 3)})
              break;
          }
        });
      }
      return attributes;
  }

  private getMesh(def? : THREE.Mesh | any): THREE.Mesh {
    let value = ThreeUtil.getTypeSafe(this.mesh, def);
    let mesh : THREE.Object3D = null;
    if (value.getMesh) {
      mesh = value.getMesh();
    } else {
      mesh = value;
    }
    while(mesh instanceof THREE.Group) {
      mesh = mesh.children[0];
    }
    if (mesh instanceof THREE.Mesh) {
      return mesh;
    } else if (mesh.children.length > 0 && mesh.children[0] instanceof THREE.Mesh){
      return mesh.children[0] as THREE.Mesh;
    } else {
      return null;
    }
  }

  private getPositionV3(def? : THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.positionX, this.positionY, this.positionZ, def);
  }

  private getOrientation(def? : THREE.Euler): THREE.Euler {
    return ThreeUtil.getEulerSafe(this.orientationX, this.orientationY, this.orientationZ, def);
  }

  private getSizeV3(def? : THREE.Vector3): THREE.Vector3 {
    return ThreeUtil.getVector3Safe(this.sizeX, this.sizeY, this.sizeZ, def);
  }

  ngOnInit(): void { }

  ngAfterContentInit(): void {
    this.curveList.changes.subscribe((e) => {
      this.resetGeometry(true);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes) {
      this.needUpdate = true;
      if (changes.refGeometry && this.refGeometry !== null && this.refGeometry.meshSubscribe) {
        this.refGeometry.meshSubscribe().subscribe((mesh) => {
          this.targetMesh = mesh;
          this.needUpdate = true;
          this.resetGeometry();
        })
      }
      if (changes.refSize && this.refSize !== null) {
        if (this.refSize.getMesh && this.refSize.meshSubscribe) {
          this.refSize.meshSubscribe().subscribe(() => {
            this.needUpdate = true;
            this.resetGeometry();
          });
        }
      }
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
  }

  private _geometrySubscribe: Subscription = null;

  private _geometrySubject: Subject<THREE.BufferGeometry> = new Subject<THREE.BufferGeometry>();

  geometrySubscribe(): Observable<THREE.BufferGeometry> {
    return this._geometrySubject.asObservable();
  }

  resetGeometry(clearGeometry = false) {
    if (this.parent !== null && this.visible) {
      if (this.parent instanceof THREE.Mesh) {
        if (clearGeometry && this.geometry !== null) {
          this.geometry = null;
        }
        if (this._geometrySubscribe !== null) {
          this._geometrySubscribe.unsubscribe();
          this._geometrySubscribe = null;
        }
        if (this.refer !== null && this.referRef && this.refer.geometrySubscribe) {
          this._geometrySubscribe = this.refer.geometrySubscribe().subscribe(geometry => {
            if (this.parent instanceof THREE.Mesh && this.visible) {
              if (this.parent.geometry !== geometry) {
                this.parent.geometry = geometry;
              }
            }
          })
        } else {
          this.parent.geometry = this.getGeometry();
        }
        this.parent.geometry = this.getGeometry();
      } else if (this.parent instanceof THREE.Points) {
        this.parent.geometry = this.getGeometry();
      } else if (this.parent instanceof THREE.Group) {
        this.parent.children.forEach(mesh => {
          if (mesh instanceof THREE.Mesh) {
            mesh.geometry = this.getGeometry();
          }
        });
      } else if (this.parent.resetMesh) {
        this.parent.resetMesh(true);
      }
    } else if (this.geometry === null && this.geometryList !== null && this.geometryList !== undefined) {
      this.geometry = this.getGeometry();
    } else if (this.geometry !== null && this.needUpdate === true) {
      this.geometry = this.getGeometry();
    }
  }

  private needUpdate: boolean = true;
  private geometry: THREE.BufferGeometry = null;

  private parent: THREE.Object3D | any = null;

  setParent(parent: THREE.Object3D | any, isRestore: boolean = false) {
    if (isRestore) {
      if (this.parent !== parent) {
        this.parent = parent;
        if (this.parent instanceof THREE.Mesh) {
          this.geometry = this.parent.geometry;
        }
      }
    } else {
      if (this.parent !== parent) {
        this.parent = parent;
        this.resetGeometry();
      }
    }
  }

  synkObject3D(synkTypes: string[]) {
    if (this.geometry !== null && this.geometryList !== null && this.geometryList !== undefined) {
      synkTypes.forEach((synkType) => {
        switch (synkType) {
          case 'geometry':
            this.geometryList.forEach((subGeometry) => {
              subGeometry.setParent(this);
            });
            break;
          case 'shape':
            this.shapeList.forEach((shape) => {
              shape.setParent(this);
            });
            break;
          case 'curve':
            this.curveList.forEach((curve) => {
              curve.setParent(this);
            });
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
            this.scaleList.forEach((scale) => {
              const sca = scale.getScale();
              this.geometry.scale(sca.x, sca.y, sca.z);
            });
            break;
        }
      })
    }
  }

  applyTextAlign(def : string = 'left') {
    if (this.geometry !== null) {
      if (this.computeBoundingSphere) {
        this.geometry.computeBoundingSphere();
      }
      if (this.geometry.boundingSphere !== null) {
        const sphereScale = this.getSphereScale();
        if (ThreeUtil.isNotNull(sphereScale) && sphereScale > 0) {
          const scaleFactor = sphereScale / this.geometry.boundingSphere.radius;
          this.geometry.scale( scaleFactor, scaleFactor, scaleFactor );
        }
        switch(this.getTextAlign(def)) {
          case 'left' :
            break;
          case 'center' :
            this.geometry.translate( - this.geometry.boundingSphere.radius, 0, 0 )
            break;
          case 'right' :
            this.geometry.translate(this.geometry.boundingSphere.radius * 2, 0, 0 )
            break;
        }
      }
    }
  }

  setGeometry(geometry : THREE.BufferGeometry) {
    if (ThreeUtil.isNotNull(geometry) && this.geometry !== geometry) {
      if (this.geometry !== null) {
        this.geometry.dispose();
      }
      this.geometry = geometry;
      if (this.center) {
        this.geometry.center();
      }
      if (this.computeVertexNormals) {
        this.geometry.computeVertexNormals();
      }
      if (this.computeBoundingBox) {
        this.geometry.computeBoundingBox();
      }
      if (this.toNonIndexed) {
        this.geometry.toNonIndexed();
      }
      
      if (ThreeUtil.isNull(this.geometry.userData.component)) {
        // this.geometry.userData.component = this;
      }
      const geometryScale = this.getGeometryScale();
      if (ThreeUtil.isNotNull(geometryScale) && geometryScale > 0) {
        this.geometry.scale( geometryScale, geometryScale, geometryScale );
      }
      this.applyTextAlign();
      this.synkObject3D(['geometry', 'shape', 'curve', 'translation', 'rotation', 'scale']);
      if (this.name !== null) {
        this.geometry.name = this.name;
      }
      if (ThreeUtil.isNotNull(this.onInit)) {
        this.onInit(this.geometry);
      }
      this.onLoad.emit(this);
      if (ThreeUtil.isNull(this.geometry.userData.component)) {
        // this.geometry.userData.component = this;
      }
      if (this.visible) {
        this._geometrySubject.next(this.geometry);
      }
    }
  }

  private perlinGeometry : PlanePerlinGeometry = null;

  getPerlinGeometry():PlanePerlinGeometry {
    if (this.perlinGeometry === null) {
      this.perlinGeometry = new PlanePerlinGeometry(this.getWidthSegments(128),this.getDepthSegments(128),this.getQuality(2));
    }
    return this.perlinGeometry;
  }

  getGeometry(): THREE.BufferGeometry {
    if (this.geometry === null || this.needUpdate) {
      this.needUpdate = false;
      this.geometry = null;
      let geometry : THREE.BufferGeometry = null;
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getGeometry) {
          geometry = this.refer.getGeometry();
        } else if (this.refer instanceof THREE.BufferGeometry) {
          geometry = this.refer;
        }
      } else if (ThreeUtil.isNotNull(this.storageName)) {
        geometry = new THREE.BufferGeometry();
        this.localStorageService.getGeometry(this.storageName, (geometry) => {
          this.setGeometry(geometry);
        })
      }
      if (geometry === null) {
        switch (this.type.toLowerCase()) {
          case 'custom':
          case 'geometry':
          case 'buffer':
            geometry = new THREE.BufferGeometry();
            const attributes = this.getAttributes();
            if (ThreeUtil.isNotNull(attributes) && attributes.length > 0) {
              attributes.forEach(attribute => {
                switch(attribute.key.toLowerCase()) {
                  case 'index' :
                    geometry.setIndex(attribute.value);
                    if (this.addGroup) {
                      geometry.addGroup(0, attribute.value.count);
                    }
                    break;
                  default :
                    attribute.value.needsUpdate = true;
                    geometry.setAttribute(attribute.key, attribute.value);
                    break;
                }
              })
            } else {
              const points = this.getPointsV3([]);
              if (ThreeUtil.isNotNull(points) && points.length > 0) {
                geometry.setFromPoints(points);
              } else {
                const curve = this.getCurve();
                const curveSegments = this.getCurveSegments(10);
                geometry.setAttribute( 'position', new THREE.BufferAttribute( new Float32Array( curveSegments * 3 ), 3 ) );
                const position = geometry.attributes.position;
                const point = new THREE.Vector3();
                for ( let i = 0; i < curveSegments; i ++ ) {
                  const t = i / ( curveSegments - 1 );
                  curve.getPoint( t, point );
                  position.setXYZ( i, point.x, point.y, point.z );
                }
                position.needsUpdate = true;
              }
            }
            break;
          case 'perlin':
            const planePerlin = this.getPerlinGeometry();
            switch(this.perlinType.toLowerCase()) {
              case 'minecraftao' :
              case 'minecraft_ao' :
                geometry = planePerlin.getMinecraftAo(this.getWidth(100), this.getHeight(100), this.getDepth(100), this.getLight(0xffffff), this.getShadow(0x505050));
                break;
              case 'terrain' :
                geometry = planePerlin.getTerrain(this.getWidth(100), this.getHeight(100), this.getDepth(100));
                break;
              case 'minecraft' :
              default :
                geometry = planePerlin.getMinecraft(this.getWidth(100), this.getHeight(100), this.getDepth(100));
                break;
            }
            break;
          case 'line' :
            const lineGeometry = new LineGeometry();
            if (this.position instanceof Float32Array || this.position instanceof Array) {
              lineGeometry.setPositions( this.position );
            }
            if (this.color instanceof Float32Array || this.color instanceof Array) {
              lineGeometry.setColors( this.color );
            }
            geometry = lineGeometry;
            break;
          case 'boxbuffer':
          case 'box':
            geometry = new THREE.BoxGeometry(
              this.getWidth(1),
              this.getHeight(1),
              this.getDepth(1),
              this.getWidthSegments(1),
              this.getHeightSegments(1),
              this.getDepthSegments(1)
            );
            break;
          case 'circlebuffer':
          case 'circle':
            geometry = new THREE.CircleGeometry(
              this.getRadius(1),
              this.getSegments(8),
              this.getThetaStart(0),
              this.getThetaLength(360)
            );
            break;
          case 'conebuffer':
          case 'cone':
            geometry = new THREE.ConeGeometry(
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
          case 'cylinder':
            geometry = new THREE.CylinderGeometry(
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
          case 'dodecahedron':
            geometry = new THREE.DodecahedronGeometry(
              this.getRadius(1),
              this.getDetail(0)
            );
            break;
          case 'edges':
            geometry = new THREE.EdgesGeometry(
              this.getSubGeometry(),
              this.getThresholdAngle(0)
            );
            break;
          case 'shapebuffer':
          case 'shape':
          case 'extrudebuffer':
          case 'extrude':
              geometry = new THREE.ShapeGeometry(
                [],
                this.getCurveSegments()
              );
              this.getShapes((shapes) => {
                let shapeGeometry : THREE.BufferGeometry = null;
                switch (this.type.toLowerCase()) {
                  case 'shapebuffer':
                  case 'shape':
                    shapeGeometry = new THREE.ShapeGeometry(
                      shapes,
                      this.getCurveSegments()
                    );
                    break;
                  case 'extrudebuffer':
                  case 'extrude':
                  default :
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
                      UVGenerator: this.getUVGenerator()
                    });
                    break;
                }
                this.setGeometry(shapeGeometry);
              });
              break;
          case 'icosahedronbuffer':
          case 'icosahedron':
            geometry = new THREE.IcosahedronGeometry(
              this.getRadius(1),
              this.getDetail(0)
            );
            break;
          case 'lathebuffer':
          case 'lathe':
            geometry = new THREE.LatheGeometry(
              this.getPointsV2([]),
              this.getSegments(12),
              this.getPhiStart(0),
              this.getPhiLength(360)
            );
            break;
          case 'octahedronbuffer':
          case 'octahedron':
            geometry = new THREE.OctahedronGeometry(
              this.getRadius(1),
              this.getDetail(0)
            );
            break;
            case 'parametric' :
            case 'parametricbuffer' :
            geometry = new THREE.ParametricBufferGeometry(
              this.getParametric('mobius3d'),
              this.getSlices(20),
              this.getStacks(20)
            );
            break;
          case 'parametrictorusknot':
            geometry = new ParametricGeometries.TorusKnotGeometry( 
              this.getRadius(1),
              this.getTube(0.4),
              this.getRadialSegments(64),
              this.getTubularSegments(8),
              this.getP(2),
              this.getQ(3)
            ) as any;
            break;
          case 'parametricsphere':
            geometry = new ParametricGeometries.SphereGeometry( 
              this.getRadius(1),
              this.getWidthSegments(8),
              this.getHeightSegments(6)
            ) as any;
            break;
          case 'parametrictube':
            geometry = new ParametricGeometries.TubeGeometry(
              this.getCurve(),
              this.getTubularSegments(64),
              this.getRadius(1),
              this.getRadiusSegments(8),
              this.getClosed(false)
            ) as any;
            break;
          case 'parametricbuffer':
          case 'parametric':
            geometry = new THREE.ParametricGeometry(
              this.getParametric('mobius3d'),
              this.getSlices(20),
              this.getStacks(10)
            );
            break;
          case 'planebuffer':
          case 'plane':
            geometry = new THREE.PlaneGeometry(
              this.getWidth(1),
              this.getHeight(1),
              this.getWidthSegments(1),
              this.getHeightSegments(1)
            );
            break;
          case 'polyhedronbuffer':
          case 'polyhedron':
            geometry = new THREE.PolyhedronGeometry(
              this.getPolyVertices([]),
              this.getPolyIndices([]),
              this.getRadius(1),
              this.getDetail(0)
            );
            break;
          case 'ringbuffer':
          case 'ring':
            geometry = new THREE.RingGeometry(
              this.getInnerRadius(0.5),
              this.getOuterRadius(1),
              this.getThetaSegments(8),
              this.getPhiSegments(1),
              this.getThetaStart(0),
              this.getThetaLength(360)
            );
            break;
          case 'spherebuffer':
          case 'sphere':
            geometry = new THREE.SphereGeometry(
              this.getRadius(1),
              this.getWidthSegments(8),
              this.getHeightSegments(6),
              this.getPhiStart(0),
              this.getPhiLength(360),
              this.getThetaStart(0),
              this.getThetaLength(180)
            );
            break;
          case 'tetrahedronbuffer':
          case 'tetrahedron':
            geometry = new THREE.TetrahedronGeometry(
              this.getRadius(1),
              this.getDetail(0)
            );
            break;
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
                case 'textbuffer':
                case 'text':
                default :
                  geometry = new THREE.TextBufferGeometry(
                    this.getText('test'),
                    textParameters
                  );
                  break;
              }
              this.setGeometry(geometry);
            });
            break;
          case 'torusbuffer':
          case 'torus':
            geometry = new THREE.TorusGeometry(
              this.getRadius(1),
              this.getTube(0.4),
              this.getRadialSegments(8),
              this.getTubularSegments(6),
              this.getArc(360)
            );
            break;
          case 'torusknotbuffer':
          case 'torusknot':
            geometry = new THREE.TorusKnotGeometry(
              this.getRadius(1),
              this.getTube(0.4),
              this.getRadialSegments(64),
              this.getTubularSegments(8),
              this.getP(2),
              this.getQ(3)
            );
            break;
          case 'tubebuffer':
          case 'tube':
            geometry = new THREE.TubeGeometry(
              this.getCurve(),
              this.getTubularSegments(64),
              this.getRadius(1),
              this.getRadiusSegments(8),
              this.getClosed(false)
            );
            break;
          case 'wireframe':
            geometry = new THREE.WireframeGeometry(this.getSubGeometry());
            break;
          case 'wireframe2':
          case 'wireframegeometry2':
            geometry = new WireframeGeometry2(this.getSubGeometry());
            break;
          case 'convexbuffer':
          case 'convex':
            geometry = new ConvexGeometry(this.getPointsV3([]));
            break;
          case 'decal' :
            geometry = new DecalGeometry(
              this.getMesh(this.parent), this.getPositionV3(), this.getOrientation(), this.getSizeV3()
            );
            break;
          default:
            geometry = new THREE.PlaneGeometry(
              this.getWidth(1),
              this.getHeight(1),
              this.getWidthSegments(1),
              this.getHeightSegments(1)
            );
            break;
        }
      }
      this.setGeometry(geometry);
    }
    return this.geometry;
  }
}

