import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { GeometriesVector3 } from '../geometry/geometry.component';
import { ThreeUtil } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

@Component({
  selector: 'ngx3js-curve',
  templateUrl: './curve.component.html',
  styleUrls: ['./curve.component.scss']
})
export class CurveComponent extends AbstractSubscribeComponent implements OnInit {

  @Input() public type:string = 'spline';
  @Input() private aX:number = null;
  @Input() private aY:number = null;
  @Input() private aRadius:number = null;
  @Input() private aStartAngle:number = null;
  @Input() private aEndAngle:number = null;
  @Input() private aClockwise:boolean = null;
  @Input() private points:GeometriesVector3[] = null;
  @Input() private closed:boolean = null;
  @Input() private curveType:string = null;
  @Input() private tension:number = null;
  @Input() private xRadius:number = null;
  @Input() private yRadius:number = null;
  @Input() private aRotation:number = null;

  private getAX(def: number): number {
    const aX = this.aX === null ? def : this.aX;
    return aX;
  }

  private getAY(def: number): number {
    const aY = this.aY === null ? def : this.aY;
    return aY;
  }

  private getARadius(def: number): number {
    const aRadius = this.aRadius === null ? def : this.aRadius;
    return aRadius;
  }

  private getAStartAngle(def: number): number {
    const aStartAngle = this.aStartAngle === null ? def : this.aStartAngle;
    return aStartAngle;
  }

  private getAEndAngle(def: number): number {
    const aEndAngle = this.aEndAngle === null ? def : this.aEndAngle;
    return aEndAngle;
  }

  private getAClockwise(def: boolean): boolean {
    const aClockwise = this.aClockwise === null ? def : this.aClockwise;
    return aClockwise;
  }

  private getPointsV3(def: GeometriesVector3[], min: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    (this.points === null ? def : this.points).forEach(p => {
      points.push(new THREE.Vector3(p.x, p.y, p.z))
    });
    if (points.length < min) {
      for (let i = 0; i < min - points.length; i++) {
        points.push(new THREE.Vector3(0, 0, 0))
      }
    }
    return points;
  }

  private getPointsV2(def: GeometriesVector3[], min: number): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];
    (this.points === null ? def : this.points).forEach(p => {
      points.push(new THREE.Vector2(p.x, p.y))
    });
    if (points.length < min) {
      for (let i = 0; i < min - points.length; i++) {
        points.push(new THREE.Vector2(0, 0))
      }
    }
    return points;
  }

  private getClosed(def: boolean): boolean {
    const closed = this.closed === null ? def : this.closed;
    return closed;
  }

  private getCurveType(def: string): string {
    const curveType = this.curveType === null ? def : this.curveType;
    return curveType;
  }

  private getTension(def: number): number {
    const tension = this.tension === null ? def : this.tension;
    return tension;
  }

  private getXRadius(def: number): number {
    const xRadius = this.xRadius === null ? def : this.xRadius;
    return xRadius;
  }

  private getYRadius(def: number): number {
    const yRadius = this.yRadius === null ? def : this.yRadius;
    return yRadius;
  }

  private getARotation(def: number): number {
    const aRotation = this.aRotation === null ? def : this.aRotation;
    return aRotation;
  }

  constructor() { 
    super();
  }

  ngOnInit(): void {
    super.ngOnInit('curve');
  }

  ngOnDestroy(): void {
    super.ngOnDestroy();
  }

  ngOnChanges(changes: SimpleChanges): void {
    super.ngOnChanges(changes);
    if (changes && this.curve) {
      this.addChanges(changes);
    }
  }

  ngAfterContentInit(): void {
    super.ngAfterContentInit();
  }

  private curve: THREE.Curve<THREE.Vector> = null;

  applyChanges(changes: string[]) {
    if (this.curve !== null) {
      if (ThreeUtil.isIndexOf(changes, 'clearinit')) {
        this.getCurve();
        return;
      }
      if (!ThreeUtil.isOnlyIndexOf(changes, [], this.OBJECT_ATTR)) {
        this.needUpdate = true;
        return;
      }
      if (ThreeUtil.isIndexOf(changes, 'init')) {
        changes = ThreeUtil.pushUniq(changes, []);
      }
      changes.forEach((change) => {
        switch (change.toLowerCase()) {
          default:
            break;
        }
      });
      super.applyChanges(changes);
    }
  }

  getCurve(): THREE.Curve<THREE.Vector> {
    if (this.curve === null || this._needUpdate) {
      this.needUpdate = false;
      switch (this.type.toLowerCase()) {
        case 'arc':
          this.curve = new THREE.ArcCurve(
            this.getAX(1),
            this.getAY(1),
            this.getARadius(1),
            this.getAStartAngle(1),
            this.getAEndAngle(1),
            this.getAClockwise(false)
          );
          break;
        case 'spline3':
        case 'catmullrom':
          this.curve = new THREE.CatmullRomCurve3(
            this.getPointsV3([], 3),
            this.getClosed(false),
            this.getCurveType('centripetal'),
            this.getTension(0.5)
          );
          break;
        case 'cubicbezier':
          const cubicbezierV2 = this.getPointsV2([], 4);
          this.curve = new THREE.CubicBezierCurve(
            cubicbezierV2[0],
            cubicbezierV2[1],
            cubicbezierV2[2],
            cubicbezierV2[3]
          );
          break;
        case 'cubicbezier3':
          const cubicbezierV3 = this.getPointsV3([], 4);
          this.curve = new THREE.CubicBezierCurve3(
            cubicbezierV3[0],
            cubicbezierV3[1],
            cubicbezierV3[2],
            cubicbezierV3[3]
          );
          break;
        case 'ellipse':
          this.curve = new THREE.EllipseCurve(
            this.getAX(0),
            this.getAY(0),
            this.getXRadius(1),
            this.getYRadius(1),
            this.getAStartAngle(0),
            this.getAEndAngle(360),
            this.getAClockwise(false),
            this.getARotation(0),
          );
          break;
        case 'line':
          const lineV2 = this.getPointsV2([], 2);
          this.curve = new THREE.LineCurve(
            lineV2[0],
            lineV2[1],
          );
          break;
        case 'line3':
          const lineV3 = this.getPointsV3([], 2);
          this.curve = new THREE.LineCurve3(
            lineV3[0],
            lineV3[1],
          );
          break;
        case 'quadraticbezier':
          const quadraticbezierV2 = this.getPointsV2([], 3);
          this.curve = new THREE.QuadraticBezierCurve(
            quadraticbezierV2[0],
            quadraticbezierV2[1],
            quadraticbezierV2[2]
          );
          break;
        case 'quadraticbezier':
          const quadraticbezierV3 = this.getPointsV3([], 3);
          this.curve = new THREE.QuadraticBezierCurve3(
            quadraticbezierV3[0],
            quadraticbezierV3[1],
            quadraticbezierV3[2]
          );
          break;
        case 'spline':
          this.curve = new THREE.SplineCurve(
            this.getPointsV2([], 1)
          );
          break;
      }
      this.setObject(this.curve);
      this.setSubscribeNext('curve');
    }
    return this.curve;
  }

}
