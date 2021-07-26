import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import * as THREE from 'three';
import { ThreeUtil, ThreeVector } from '../interface';
import { AbstractSubscribeComponent } from '../subscribe.abstract';

/**
 * CurveComponent
 *
 * An abstract base class for creating a [name] object that contains methods for interpolation.
 * For an array of [name]s see [page:CurvePath].
 */
@Component({
  selector: 'ngx3js-curve',
  templateUrl: './curve.component.html',
  styleUrls: ['./curve.component.scss'],
})
export class CurveComponent extends AbstractSubscribeComponent implements OnInit {
  /**
   * The curve type
   *
   * Notice - case insensitive.
   *
   * @see THREE.Curve<THREE.Vector>
   * @see THREE.ArcCurve - ArcCurve, Arc
   * @see THREE.CatmullRomCurve3 - CatmullRomCurve3, Spline3, Catmullrom
   * @see THREE.CubicBezierCurve - CubicBezierCurve, CubicBezier
   * @see THREE.CubicBezierCurve3 - CubicBezierCurve3, CubicBezier3
   * @see THREE.EllipseCurve - EllipseCurve, Ellipse
   * @see THREE.LineCurve - LineCurve, Line
   * @see THREE.LineCurve3 - LineCurve3, Line3
   * @see THREE.QuadraticBezierCurve - QuadraticBezierCurve, QuadraticBezier
   * @see THREE.QuadraticBezierCurve3 - QuadraticBezierCurve3, QuadraticBezier3
   * @see THREE.SplineCurve - SplineCurve, Spline
   */
  @Input() public type: string = 'spline';

  /**
   * The X center of the ellipse. Default is *0*.
   */
  @Input() private aX: number = null;

  /**
   * The Y center of the ellipse. Default is *0*.
   */
  @Input() private aY: number = null;

  /**
   * Input  of curve component
   */
  @Input() private aRadius: number = null;

  /**
   * The start angle of the curve in radians starting from the positive X axis.  Default is *0*.
   */
  @Input() private aStartAngle: number = null;

  /**
   * The end angle of the curve in radians starting from the positive X axis. Default is *2 x Math.PI*.
   */
  @Input() private aEndAngle: number = null;

  /**
   * Whether the ellipse is drawn clockwise. Default is *false*.
   */
  @Input() private aClockwise: boolean = null;

  /**
   * array of [page:Vector2 Vector2s].
   * Creates a Path from the points. The first point defines the offset, then successive points
   * are added to the [page:CurvePath.curves curves] array as [page:LineCurve LineCurves].<br /><br />
   *
   * If no points are specified, an empty path is created and the [page:.currentPoint] is set to
   * the origin.
   */
  @Input() private points: ThreeVector[] = null;

  /**
   * Whether the curve is closed. Default is *false*.
   */
  @Input() private closed: boolean = null;

  /**
   * Possible values are *centripetal*, *chordal* and *catmullrom*.
   *
   * Notice - case insensitive.
   *
   */
  @Input() private curveType: string = null;

  /**
   * When [page:.curveType] is *catmullrom*, defines catmullrom's tension.
   */
  @Input() private tension: number = null;

  /**
   * The radius of the ellipse in the x direction. Default is *1*.
   */
  @Input() private xRadius: number = null;

  /**
   * The radius of the ellipse in the y direction. Default is *1*.
   */
  @Input() private yRadius: number = null;

  /**
   * The rotation angle of the ellipse in radians, counterclockwise from the positive X axis (optional). Default is *0*.
   */
  @Input() private aRotation: number = null;

  /**
   * Gets points v3
   * @param def
   * @param min
   * @returns points v3
   */
  private getPointsV3(def: ThreeVector[], min: number): THREE.Vector3[] {
    const points: THREE.Vector3[] = [];
    (this.points === null ? def : this.points).forEach((p) => {
      points.push(new THREE.Vector3(p.x, p.y, p.z));
    });
    if (points.length < min) {
      for (let i = 0; i < min - points.length; i++) {
        points.push(new THREE.Vector3(0, 0, 0));
      }
    }
    return points;
  }

  /**
   * Gets points v2
   * @param def
   * @param min
   * @returns points v2
   */
  private getPointsV2(def: ThreeVector[], min: number): THREE.Vector2[] {
    const points: THREE.Vector2[] = [];
    (this.points === null ? def : this.points).forEach((p) => {
      points.push(new THREE.Vector2(p.x, p.y));
    });
    if (points.length < min) {
      for (let i = 0; i < min - points.length; i++) {
        points.push(new THREE.Vector2(0, 0));
      }
    }
    return points;
  }

  /**
   * Creates an instance of curve component.
   */
  constructor() {
    super();
  }

  /**
   * A callback method that is invoked immediately after the
   * default change detector has checked the directive's
   * data-bound properties for the first time,
   * and before any of the view or content children have been checked.
   * It is invoked only once when the directive is instantiated.
   */
  ngOnInit(): void {
    super.ngOnInit('curve');
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
    if (changes && this.curve) {
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
    super.ngAfterContentInit();
  }

  /**
   * Curve  of curve component
   */
  private curve: THREE.Curve<THREE.Vector> = null;

  /**
   * Applys changes
   * @param changes
   * @returns
   */
  public applyChanges(changes: string[]) {
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

  /**
   * Gets curve
   * @returns curve
   */
  public getCurve(): THREE.Curve<THREE.Vector> {
    if (this.curve === null || this._needUpdate) {
      this.needUpdate = false;
      switch (this.type.toLowerCase()) {
        case 'arccurve':
        case 'arc':
          this.curve = new THREE.ArcCurve(ThreeUtil.getTypeSafe(this.aX, 1), ThreeUtil.getTypeSafe(this.aY, 1), ThreeUtil.getTypeSafe(this.aRadius, 1), ThreeUtil.getTypeSafe(this.aStartAngle, 1), ThreeUtil.getTypeSafe(this.aEndAngle, 1), ThreeUtil.getTypeSafe(this.aClockwise, false));
          break;
        case 'catmullromcurve3':
        case 'spline3':
        case 'catmullrom':
          this.curve = new THREE.CatmullRomCurve3(this.getPointsV3([], 3), ThreeUtil.getTypeSafe(this.closed, false), ThreeUtil.getTypeSafe(this.curveType, 'centripetal'), ThreeUtil.getTypeSafe(this.tension, 0.5));
          break;
        case 'cubicbeziercurve':
        case 'cubicbezier':
          const cubicbezierV2 = this.getPointsV2([], 4);
          this.curve = new THREE.CubicBezierCurve(cubicbezierV2[0], cubicbezierV2[1], cubicbezierV2[2], cubicbezierV2[3]);
          break;
        case 'cubicbeziercurve3':
        case 'cubicbezier3':
          const cubicbezierV3 = this.getPointsV3([], 4);
          this.curve = new THREE.CubicBezierCurve3(cubicbezierV3[0], cubicbezierV3[1], cubicbezierV3[2], cubicbezierV3[3]);
          break;
        case 'ellipsecurve':
        case 'ellipse':
          this.curve = new THREE.EllipseCurve(
            ThreeUtil.getTypeSafe(this.aX, 0),
            ThreeUtil.getTypeSafe(this.aY, 0),
            ThreeUtil.getTypeSafe(this.xRadius, 1),
            ThreeUtil.getTypeSafe(this.yRadius, 1),
            ThreeUtil.getTypeSafe(this.aStartAngle, 0),
            ThreeUtil.getTypeSafe(this.aEndAngle, 360),
            ThreeUtil.getTypeSafe(this.aClockwise, false),
            ThreeUtil.getTypeSafe(this.aRotation, 0)
          );
          break;
        case 'linecurve':
        case 'line':
          const lineV2 = this.getPointsV2([], 2);
          this.curve = new THREE.LineCurve(lineV2[0], lineV2[1]);
          break;
        case 'linecurve3':
        case 'line3':
          const lineV3 = this.getPointsV3([], 2);
          this.curve = new THREE.LineCurve3(lineV3[0], lineV3[1]);
          break;
        case 'quadraticbeziercurve':
        case 'quadraticbezier':
          const quadraticbezierV2 = this.getPointsV2([], 3);
          this.curve = new THREE.QuadraticBezierCurve(quadraticbezierV2[0], quadraticbezierV2[1], quadraticbezierV2[2]);
          break;
        case 'quadraticbeziercurve3':
        case 'quadraticbezier3':
          const quadraticbezierV3 = this.getPointsV3([], 3);
          this.curve = new THREE.QuadraticBezierCurve3(quadraticbezierV3[0], quadraticbezierV3[1], quadraticbezierV3[2]);
          break;
        case 'splinecurve':
        case 'spline':
          this.curve = new THREE.SplineCurve(this.getPointsV2([], 1));
          break;
      }
      this.setObject(this.curve);
      this.setSubscribeNext('curve');
    }
    return this.curve;
  }
}
