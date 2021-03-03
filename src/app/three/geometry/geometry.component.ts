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
import { CurveComponent } from '../curve/curve.component';
import { InterfaceGetGeometry, ThreeUtil } from '../interface';
import { LocalStorageService } from '../local-storage.service';
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
  @Input() private parametric:string | GeometriesParametric = null;
  @Input() private slices:number = null;
  @Input() private stacks:number = null;
  @Input() private text:string = null;
  @Input() private textAlign:string = null;
  
  @Input() private font:string = null;
  @Input() private size:number = null;
  @Input() private weight:number = null;
  @Input() private vertices:GeometriesVector3[] = null;
  @Input() private polyVertices:number[] = null;
  @Input() private polyIndices:number[] = null;
  @Input() private colors:(string | number)[] = null;
  @Input() private faces:GeometriesFace3[] = null;
  @Input() private thresholdAngle:number = null;
  @Input() private curveSegments:number = null;
  @Input() private steps:number = null;
  @Input() private bevelEnabled:boolean = null;
  @Input() private bevelThickness:number = null;
  @Input() private bevelSize:number = null;
  @Input() private bevelOffset:number = null;
  @Input() private bevelSegments:number = null;
  @Input() private closed:boolean = null;
  @Input() private position:number[] = null;
  @Input() private itemSize : number = null;
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
  @Input() private onInit : (geometry : THREE.BufferGeometry) => null = null;
 
  @Output() private onLoad:EventEmitter<GeometryComponent> = new EventEmitter<GeometryComponent>();

  @ContentChildren(GeometryComponent, { descendants: false }) private geometryList: QueryList<GeometryComponent>;
  @ContentChildren(ShapeComponent, { descendants: false }) private shapeList: QueryList<ShapeComponent>;
  @ContentChildren(CurveComponent, { descendants: false }) private curveList: QueryList<CurveComponent>;
  @ContentChildren(TranslationComponent, { descendants: false }) private translationList: QueryList<TranslationComponent>;

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
    return ThreeUtil.getTypeSafe(this.textAlign , def);
  }

  private getFont(def?: string, callBack?: (font: THREE.Font) => void) {
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

  private getSize(def?: number): number {
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
        if (parametric !== null && typeof parametric === 'function') {
          return (u: number, v: number, dest: THREE.Vector3) => {
            const ov = parametric(u, v);
            dest.set(ov.x, ov.y, ov.z);
          };
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
    return this.thresholdAngle === null ? def : this.thresholdAngle;
  }

  private getSubGeometry(): THREE.BufferGeometry {
    if (this.geometryList !== null && this.geometryList.length > 0) {
      return this.geometryList.first.getGeometry();
    } else {
      return new THREE.PlaneGeometry(1, 1, 1, 1);
    }
  }

  private getCurveSegments(def?: number): number {
    return this.curveSegments === null ? def : this.curveSegments;
  }

  private getSteps(def?: number): number {
    return this.steps === null ? def : this.steps;
  }

  private getBevelEnabled(def?: boolean): boolean {
    return this.bevelEnabled === null ? def : this.bevelEnabled;
  }

  private getBevelThickness(def?: number): number {
    return this.bevelThickness === null ? def : this.bevelThickness;
  }

  private getBevelSize(def?: number): number {
    return this.bevelSize === null ? def : this.bevelSize;
  }

  private getBevelOffset(def?: number): number {
    return this.bevelOffset === null ? def : this.bevelOffset;
  }

  private getBevelSegments(def?: number): number {
    return this.bevelSegments === null ? def : this.bevelSegments;
  }

  private getShapes(): THREE.Shape {
    const shape = new THREE.Shape();
    if (this.shapeList != null && this.shapeList.length > 0) {
      this.shapeList.forEach((path) => {
        path.getShape(shape);
      });
    }
    return shape;
  }

  private getClosed(def?: boolean): boolean {
    return this.closed === null ? def : this.closed;
  }

  private getCurve(def?:string): THREE.Curve<THREE.Vector3> {
    const curve = ThreeUtil.getTypeSafe(this.curve,def, '');
    switch(curve.toLowerCase()) {
      case 'grannyknot' :
        return new Curves.GrannyKnot();
      case 'heartcurve' :
        return new Curves.HeartCurve();
      case 'vivianicurve' :
        return new Curves.VivianiCurve();
      case 'knotcurve' :
        return new Curves.KnotCurve();
      case 'helixcurve' :
        return new Curves.HelixCurve();
      case 'helixcurve' :
        return new Curves.HelixCurve();
      case 'trefoilknot' :
        return new Curves.TrefoilKnot();
      case 'torusknot' :
        return new Curves.TorusKnot();
      case 'torusknot' :
        return new Curves.TorusKnot();
      case 'cinquefoilknot' :
        return new Curves.CinquefoilKnot();
      case 'trefoilpolynomialknot' :
        return new Curves.TrefoilPolynomialKnot();
      case 'decoratedtorusknot4b' :
        return new Curves.DecoratedTorusKnot4b();
      case 'decoratedtorusknot4a' :
        return new Curves.DecoratedTorusKnot4a();
      case 'figureeightpolynomialknot' :
        return new Curves.FigureEightPolynomialKnot();
      case 'decoratedtorusknot5a' :
        return new Curves.DecoratedTorusKnot5a();
      case 'decoratedtorusknot5c' :
        return new Curves.DecoratedTorusKnot5c();
      default :
        if (this.curveList !== null && this.curveList.length > 0) {
          return this.curveList.first.getCurve() as THREE.Curve<THREE.Vector3>;
        }
        break;
    }
    return new THREE.LineCurve3(
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0)
    );
  }

  private getPosition(def? : number[]): THREE.Float32BufferAttribute {
    const position = ThreeUtil.getTypeSafe(this.position, def);
    const itemSize = ThreeUtil.getTypeSafe(this.itemSize, 3);
    return new THREE.Float32BufferAttribute( position, itemSize )
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
  }

  private _geometrySubscribe: Subscription = null;

  private _geometrySubject: Subject<THREE.BufferGeometry> = new Subject<THREE.BufferGeometry>();

  geometrySubscribe(): Observable<THREE.BufferGeometry> {
    if (this.geometry === null) {
      this.geometry = this.getGeometry();
    }
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
    }
  }

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
              translation.setParent(this);
            });
            break;
        }
      })
    }
  }

  getGeometry(): THREE.BufferGeometry {
    if (this.geometry === null) {
      if (this.refer !== null && this.refer !== undefined) {
        if (this.refer.getGeometry) {
          this.geometry = this.refer.getGeometry();
        } else if (this.refer instanceof THREE.BufferGeometry) {
          this.geometry = this.refer;
        }
      }
      if (this.geometry === null) {
        switch (this.type.toLowerCase()) {
          case 'storage':
            this.geometry = new THREE.BufferGeometry();
            this.localStorageService.getGeometry(this.storageName, (geometry) => {
              this.geometry = geometry;
              this.resetGeometry();
            })
            break;
          case 'custom':
          case 'geometry':
            this.geometry = new THREE.BufferGeometry();
            if (ThreeUtil.isNotNull(this.position)) {
              this.geometry.setAttribute("position", this.getPosition([]));
            }
            if (ThreeUtil.isNotNull(this.points)) {
              this.geometry.setFromPoints(this.getPointsV3([]));
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
              extrudePath: new THREE.Curve<THREE.Vector3>(),
              UVGenerator: null // THREE.UVGenerator;
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
              extrudePath: new THREE.Curve<THREE.Vector3>(),
              UVGenerator: null // THREE.UVGenerator;
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
          case 'parametrictorusknot':
            this.geometry = new ParametricGeometries.TorusKnotGeometry( 
              this.getRadius(1),
              this.getTube(0.4),
              this.getRadialSegments(64),
              this.getTubularSegments(8),
              this.getP(2),
              this.getQ(3)
            ) as any;
            break;
          case 'parametricsphere':
            this.geometry = new ParametricGeometries.SphereGeometry( 
              this.getRadius(1),
              this.getWidthSegments(8),
              this.getHeightSegments(6)
            ) as any;
            break;
          case 'parametrictube':
            this.geometry = new ParametricGeometries.TubeGeometry(
              this.getCurve(),
              this.getTubularSegments(64),
              this.getRadius(1),
              this.getRadiusSegments(8),
              this.getClosed(false)
            ) as any;
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
              this.getRadius(1),
              this.getWidthSegments(8),
              this.getHeightSegments(6),
              this.getPhiStart(0),
              this.getPhiLength(360),
              this.getThetaStart(0),
              this.getThetaLength(180)
            );
            break;
          case 'sphere':
            // radius = 1, widthSegments = 8, heightSegments = 6, phiStart = 0, phiLength = Math.PI * 2, thetaStart = 0, thetaLength = Math.PI
            this.geometry = new THREE.SphereGeometry(
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
            this.geometry = new THREE.BufferGeometry();
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
              switch(this.getTextAlign('left')) {
                case 'left' :
                  break;
                case 'center' :
                  this.geometry.computeBoundingSphere();
                  this.geometry.translate( - this.geometry.boundingSphere.radius, 0, 0 )
                  break;
                case 'right' :
                  this.geometry.computeBoundingSphere();
                  this.geometry.translate(this.geometry.boundingSphere.radius * 2, 0, 0 )
                  break;
              }
              this.resetGeometry();
              if (this.visible) {
                this._geometrySubject.next(this.geometry);
              }
              this.onLoad.emit(this);
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
          case 'convex':
            this.geometry = new ConvexGeometry(this.getPointsV3([]));
            break;
          case 'decal' :
            this.geometry = new DecalGeometry(
              this.getMesh(this.parent), this.getPositionV3(), this.getOrientation(), this.getSizeV3()
            );
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
        if (ThreeUtil.isNotNull(this.onInit)) {
          this.onInit(this.geometry);
        }
        if (this.name !== null) {
          this.geometry.name = this.name;
        }

        if (ThreeUtil.isNull(this.geometry.userData.component)) {
          this.geometry.userData.component = this;
        }
        this.synkObject3D(['geometry', 'shape', 'curve', 'translation']);
      }
      this.onLoad.emit(this);
      if (this.visible) {
        this._geometrySubject.next(this.geometry);
      }
    }
    return this.geometry;
  }
}
